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
import { nanoid } from "nanoid";
import { hashPassword, verifyPassword } from "./password";
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
  user: { id: number; openId: string; name: string | null; email: string | null; role: string };
  /** The JWT to set as the session cookie. */
  sessionToken: string;
}

const CRED_OPEN_ID_PREFIX = "cred_";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 365; // 1 year, matching OAuth sessions

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

    return { user: toSafeUser(user), sessionToken };
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
  };
}

/** Error carrying a tRPC-mappable code, so the router maps cleanly. */
export class AuthError extends Error {
  constructor(
    public readonly code: "CONFLICT" | "UNAUTHORIZED" | "INTERNAL_SERVER_ERROR",
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
