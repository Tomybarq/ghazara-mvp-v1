/**
 * Auth service — business logic for email + password authentication.
 *
 * Designed with Dependency Injection: it receives its `IUserRepository` and
 * `SessionTokenService` through the constructor rather than importing concrete
 * singletons. This makes the service:
 *   - unit-testable (pass mock implementations — no DB or crypto needed),
 *   - decoupled from the storage engine and the token issuer,
 *   - the single place where auth rules live (validation, rate-relevant checks,
 *     password verification, session minting), so the tRPC layer stays thin.
 *
 * Security notes:
 *   - Passwords are hashed with scrypt (see ./password) before they ever touch
 *     the repository; plaintext never persists.
 *   - Login uses constant-time comparison so timing cannot leak account state.
 *   - On register we reject duplicate emails at the service level for a clear
 *     user message; the `openId` unique constraint backs this up at the DB.
 *   - Credentials users get a synthetic `openId` (`cred_<nanoid>`) so they share
 *     the same session/lookup path as OAuth users — the context's
 *     `authenticateRequest` needs no special-casing for credentials logins.
 */
import { randomBytes } from "node:crypto";
import { nanoid } from "nanoid";
import { hashPassword, verifyPassword } from "./password";
import { sendEmail } from "../_core/email";
import { logActivity } from "../db";
import type { IUserRepository } from "./userRepository";
import type { User } from "../../drizzle/schema";

/** Abstraction over the JWT issuer so the service isn't coupled to the SDK. */
export interface SessionTokenService {
  signSession(
    payload: { openId: string; appId: string; name: string },
    options: { expiresInMs?: number },
  ): Promise<string>;
}

/** Normalised auth result returned to the tRPC layer. */
export interface AuthResult {
  user: { id: number; openId: string; name: string | null; email: string | null; role: string; avatar: string | null };
  /** The JWT to set as the session cookie. */
  sessionToken: string;
}

const CRED_OPEN_ID_PREFIX = "cred_";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 365; // 1 year, matching OAuth sessions
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30; // 30 minutes — short-lived for security

export class AuthService {
  constructor(
    private readonly users: IUserRepository,
    private readonly tokens: SessionTokenService,
    private readonly appId: string,
  ) {}

  /**
   * Register a new credentials account.
   * Throws a typed error with a stable `code` the tRPC layer maps to a
   * `CONFLICT` (duplicate) or `INTERNAL_SERVER_ERROR` (storage) response.
   */
  async register(input: { name: string; email: string; password: string }): Promise<AuthResult> {
    const email = input.email.toLowerCase().trim();

    // Fail fast on duplicate email with a clear, non-leaky message. We do NOT
    // enumerate whether the email exists vs. is taken elsewhere — register is
    // the one place revealing "already registered" is expected UX.
    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new AuthError("CONFLICT", "An account with this email already exists");
    }

    const passwordHash = await hashPassword(input.password);
    const openId = `${CRED_OPEN_ID_PREFIX}${nanoid(21)}`;

    const created = await this.users.create({
      openId,
      name: input.name.trim(),
      email,
      loginMethod: "email",
      passwordHash,
      lastSignedIn: new Date(),
    });

    const sessionToken = await this.tokens.signSession(
      { openId: created.openId, appId: this.appId, name: created.name ?? "" },
      { expiresInMs: SESSION_TTL_MS },
    );

    await logActivity({
      userId: created.id,
      userOpenId: created.openId,
      userName: created.name,
      type: "register",
      description: `${created.name ?? "New user"} registered an account`,
    });

    return { user: toSafeUser(created), sessionToken };
  }

  /**
   * Verify credentials and mint a session.
   *
   * Deliberately returns a single generic message for both "no such account" and
   * "wrong password" so an attacker cannot enumerate registered emails from the
   * timing or wording of the error.
   */
  async login(input: { email: string; password: string }): Promise<AuthResult> {
    const email = input.email.toLowerCase().trim();
    const user = await this.users.findByEmail(email);

    // Run the password verification regardless of whether the user was found.
    // For a missing account we hash a throwaway value so the work factor matches
    // a real verification, keeping the response time constant and defeating
    // user-enumeration via timing. The result is simply discarded.
    const valid = user
      ? await verifyPassword(input.password, user.passwordHash)
      : (await verifyPassword(input.password, null), false);

    if (!user || !valid) {
      throw new AuthError("UNAUTHORIZED", "Invalid email or password");
    }

    await this.users.updateLastSignedIn(user.openId);

    const sessionToken = await this.tokens.signSession(
      { openId: user.openId, appId: this.appId, name: user.name ?? "" },
      { expiresInMs: SESSION_TTL_MS },
    );

    await logActivity({
      userId: user.id,
      userOpenId: user.openId,
      userName: user.name,
      type: "login",
      description: `${user.name ?? "User"} signed in`,
    });

    return { user: toSafeUser(user), sessionToken };
  }

  /**
   * Update the authenticated user's profile (name and email).
   * If the email is changing, reject duplicates so each account keeps a
   * unique address. Returns the stripped safe-user shape so the client can
   * refresh its cached session without an extra round-trip.
   */
  async updateProfile(
    user: User,
    input: { name: string; email: string },
  ): Promise<AuthResult["user"]> {
    const email = input.email.toLowerCase().trim();
    const name = input.name.trim();

    // Only check for duplicates when the email is actually changing.
    if (email !== (user.email ?? "")) {
      const existing = await this.users.findByEmail(email);
      if (existing && existing.openId !== user.openId) {
        throw new AuthError("CONFLICT", "An account with this email already exists");
      }
    }

    const updated = await this.users.updateProfile(user.openId, { name, email });
    if (!updated) {
      throw new AuthError("INTERNAL_SERVER_ERROR", "Failed to update profile");
    }

    await logActivity({
      userId: updated.id,
      userOpenId: updated.openId,
      userName: updated.name,
      type: "profile_update",
      description: `${updated.name ?? "User"} updated their profile`,
    });

    return toSafeUser(updated);
  }

  /**
   * Admin-only: create a new credentials user on behalf of someone else.
   * Does NOT mint a session — the admin isn't logging in as the new user.
   * Rejects duplicate emails. Logs the creation as a "user_created" activity
   * attributed to the admin actor.
   */
  async addUser(
    actor: User,
    input: { name: string; email: string; password: string },
  ): Promise<AuthResult["user"]> {
    const email = input.email.toLowerCase().trim();

    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new AuthError("CONFLICT", "An account with this email already exists");
    }

    const passwordHash = await hashPassword(input.password);
    const openId = `${CRED_OPEN_ID_PREFIX}${nanoid(21)}`;

    const created = await this.users.create({
      openId,
      name: input.name.trim(),
      email,
      loginMethod: "email",
      passwordHash,
      lastSignedIn: new Date(),
    });

    await logActivity({
      userId: created.id,
      userOpenId: created.openId,
      userName: created.name,
      type: "user_created",
      description: `${actor.name ?? "Admin"} created a new user: ${created.name ?? email}`,
    });

    return toSafeUser(created);
  }

  /**
   * Upload and set the authenticated user's avatar image.
   * Accepts a base64 data URL (e.g. "data:image/png;base64,..."), uploads the
   * decoded buffer to S3 via the storage helper, stores the resulting URL on
   * the user row, and returns the stripped safe-user shape.
   */
  async updateAvatar(
    user: User,
    input: { dataUrl: string },
  ): Promise<AuthResult["user"]> {
    const match = input.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      throw new AuthError("BAD_REQUEST", "Invalid image data");
    }

    const [, contentType, base64] = match;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
    if (!allowedTypes.includes(contentType)) {
      throw new AuthError("BAD_REQUEST", "Unsupported image format");
    }

    const buffer = Buffer.from(base64, "base64");

    if (buffer.length > 5 * 1024 * 1024) {
      throw new AuthError("BAD_REQUEST", "Image must be under 5 MB");
    }

    const ext = contentType.split("/")[1];
    const { storagePut } = await import("../storage");
    const { url } = await storagePut(
      `avatars/${user.openId}.${ext}`,
      buffer,
      contentType,
    );

    const updated = await this.users.updateAvatar(user.openId, url);
    if (!updated) {
      throw new AuthError("INTERNAL_SERVER_ERROR", "Failed to update avatar");
    }

    return toSafeUser(updated);
  }

  /**
   * Generate a single-use reset token for the given email and email it to the
   * user. Always resolves — never reveals whether the email has an account —
   * so an attacker cannot enumerate registered addresses. If no account
   * exists we still do a throwaway password hash to keep response time
   * consistent with the real path.
   */
  async requestPasswordReset(input: { email: string }): Promise<void> {
    const email = input.email.toLowerCase().trim();
    const user = await this.users.findByEmail(email);

    if (!user) {
      // Match the real path's timing so the endpoint can't be probed.
      await hashPassword("dummy-timing-padding-password");
      return;
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await this.users.createPasswordReset({ email, token, expiresAt });

    const resetUrl = `${process.env.PUBLIC_URL ?? ""}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your Ghazara password",
      html: `
        <p>Hello${user.name ? `, ${user.name}` : ""},</p>
        <p>We received a request to reset your password. Click the link below
        to choose a new one. The link expires in 30 minutes.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn't request this, you can safely ignore this email —
        your password won't change.</p>
      `,
    });
  }

  /**
   * Validate a reset token and set a new password. The token is consumed
   * (marked used) immediately on success so it cannot be replayed. Throws
   * UNAUTHORIZED for invalid/expired/consumed tokens — the only non-leaky
   * error path for this endpoint.
   */
  async resetPassword(input: { token: string; password: string }): Promise<void> {
    const reset = await this.users.findValidPasswordReset(input.token);
    if (!reset) {
      throw new AuthError("UNAUTHORIZED", "This reset link is invalid or has expired");
    }

    const passwordHash = await hashPassword(input.password);
    await this.users.updatePasswordHash(reset.email, passwordHash);
    await this.users.markPasswordResetUsed(input.token);
  }
}

/** Strip internal fields before returning a user to the client. */
function toSafeUser(user: User): AuthResult["user"] {
  return {
    id: user.id,
    openId: user.openId,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

/** Error carrying a tRPC-mappable code, so the router maps cleanly. */
export class AuthError extends Error {
  constructor(
    public readonly code: "CONFLICT" | "UNAUTHORIZED" | "INTERNAL_SERVER_ERROR" | "BAD_REQUEST",
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
