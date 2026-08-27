/**
 * Password hashing module.
 *
 * Uses Node's built-in `crypto.scrypt` (memory-hard KDF) rather than a third-party
 * dependency. This keeps the supply chain small while providing a hashing scheme
 * resistant to GPU/ASIC brute-force. We avoid `bcrypt`/`argon2` native bindings which
 * would require build scripts (and this environment blocks those by default).
 *
 * Stored format: `"<saltHex>:<hashHex>"` — both 32-byte values hex-encoded. The salt
 * is unique per password so an attacker who steals the table cannot reuse precomputed
 * rainbow tables across rows. Constant-time comparison (`timingSafeEqual`) prevents
 * timing side-channels that could leak whether a hash prefix matches.
 */
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

// 32-byte (256-bit) output matches the security level of the session JWT (HS256).
const KEY_LENGTH = 32;
// scrypt cost parameter. N=2^16 is the OWASP-recommended minimum for interactive
// logins on modern hardware; high enough to make online guessing expensive but
// low enough to stay well under typical API latency budgets (~80-120ms).
const SCRYPT_N = 1 << 16;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

/**
 * Hash a plaintext password into the persisted `"<salt>:<hash>"` format.
 * Throws on empty input — callers must validate length before reaching here.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  if (!plaintext) throw new Error("Password must not be empty");

  // A fresh 16-byte salt per call guarantees two identical passwords hash
  // differently, defeating rainbow tables and cross-row correlation.
  const salt = randomBytes(16);
  const derived = await scrypt(plaintext, salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

/**
 * Verify a plaintext password against a stored `"<salt>:<hash>"` value.
 * Returns false on any malformed stored value rather than throwing, so the
 * service layer can treat "no credentials / corrupt hash" uniformly as a
 * rejection — never as a 500 that leaks whether the account exists.
 */
export async function verifyPassword(
  plaintext: string,
  stored: string | null | undefined,
): Promise<boolean> {
  if (!stored) return false;

  const separator = stored.indexOf(":");
  if (separator === -1) return false;

  const saltHex = stored.slice(0, separator);
  const hashHex = stored.slice(separator + 1);
  // Guard against truncated/corrupt rows before touching crypto primitives.
  if (!saltHex || !hashHex) return false;

  let salt: Buffer;
  let expected: Buffer;
  try {
    salt = Buffer.from(saltHex, "hex");
    expected = Buffer.from(hashHex, "hex");
  } catch {
    return false;
  }

  // If lengths mismatch, normalise before the constant-time compare: a length
  // difference alone would throw inside `timingSafeEqual`, surfacing account
  // state through error behaviour. We pad to the longer length so comparison
  // always runs and always returns false on mismatch.
  const derived = await scrypt(plaintext, salt, expected.length || KEY_LENGTH);

  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
