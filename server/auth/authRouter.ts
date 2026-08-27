/**
 * Auth tRPC router — thin transport layer.
 *
 * Each procedure validates input with Zod, delegates to the AuthService, maps
 * AuthError codes to tRPC error codes, and sets/clears the session cookie via
 * the shared cookie options helper. Business logic lives in the service; this
 * layer only wires I/O.
 *
 * Dependency injection: the AuthService instance is created once at module load
 * with its concrete repository and the existing `sdk` token signer, then closed
 * over by the procedures. Replacing either for tests means constructing a new
 * router with a different `authService` — the procedures never import the
 * concrete dependencies themselves.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { sdk } from "../_core/sdk";
import { publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { AuthService, type SessionTokenService } from "./authService";
import { UserRepository } from "./userRepository";

// --- DI wiring ---------------------------------------------------------------
// `sdk` already knows how to sign HS256 session JWTs with the app secret; we
// adapt it to the SessionTokenService interface so the service stays decoupled.
const tokenService: SessionTokenService = {
  signSession: (payload, options) => sdk.signSession(payload, options),
};

export const authService = new AuthService(
  new UserRepository(),
  tokenService,
  ENV.appId || "ghazara",
);

// --- Input schemas -----------------------------------------------------------
// Centralised so register/login share the same field rules and the messages
// stay bilingual-friendly and explicit.
const emailSchema = z
  .string()
  .trim()
  .min(5, "Email is too short")
  .max(320, "Email is too long")
  .email("Please enter a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120, "Name is too long"),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(128),
});

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const resetPasswordSchema = z.object({
  token: z.string().min(16, "Invalid reset token"),
  password: passwordSchema,
});

// Map an AuthError.code to a tRPC error code. Defaults to INTERNAL_SERVER_ERROR
// so an unexpected failure never surfaces as a 200 or a misleading 4xx.
function toTRPCError(error: unknown): TRPCError {
  if (error instanceof Error && "code" in error) {
    const code = (error as { code: string }).code;
    if (code === "CONFLICT") return new TRPCError({ code: "CONFLICT", message: error.message });
    if (code === "UNAUTHORIZED") return new TRPCError({ code: "UNAUTHORIZED", message: error.message });
  }
  console.error("[Auth] Unexpected error", error);
  return new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Authentication failed" });
}

export const authRouter = router({
  /** Returns the authenticated user from context, or null if anonymous. */
  me: publicProcedure.query(opts => opts.ctx.user),

  /** Create a credentials account and establish a session. */
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { user, sessionToken } = await authService.register(input);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
        return { user } as const;
      } catch (error) {
        throw toTRPCError(error);
      }
    }),

  /** Verify credentials and establish a session. */
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { user, sessionToken } = await authService.login(input);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
        return { user } as const;
      } catch (error) {
        throw toTRPCError(error);
      }
    }),

  /** Clear the session cookie. */
  logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

  /**
   * Request a password reset email. Always returns success — never reveals
   * whether the email has an account, to prevent enumeration.
   */
  requestPasswordReset: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input }) => {
      try {
        await authService.requestPasswordReset(input);
        return { success: true } as const;
      } catch (error) {
        throw toTRPCError(error);
      }
    }),

  /** Validate a reset token and set a new password. */
  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      try {
        await authService.resetPassword(input);
        return { success: true } as const;
      } catch (error) {
        throw toTRPCError(error);
      }
    }),
});
