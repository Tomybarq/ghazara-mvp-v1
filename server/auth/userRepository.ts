/**
 * User repository — the single data-access layer for credentials auth.
 *
 * Implements the Repository Pattern: every persistence concern (Drizzle queries,
 * column mapping, connection handling) lives behind a narrow interface, so the
 * AuthService above it depends on an abstraction, not on Drizzle or the shared
 * `getDb()` singleton directly. That keeps the service unit-testable (inject a
 * mock repository) and lets us swap the storage engine without touching auth
 * logic.
 *
 * Methods return the raw `User` row or `null` — never `undefined` — for a
 * consistent null-or-object contract that callers can rely on without a third
 * "not loaded" state.
 */
import { and, eq, isNotNull } from "drizzle-orm";
import { getDb } from "../db";
import { users, type InsertUser, type User } from "../../drizzle/schema";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByOpenId(openId: string): Promise<User | null>;
  create(user: InsertUser): Promise<User>;
  updateLastSignedIn(openId: string): Promise<void>;
}

/**
 * Concrete Drizzle-backed repository. `getDb()` lazily initialises the MySQL
 * connection, so this is safe to construct at module load even when the DB is
 * not yet reachable (e.g. during tooling runs).
 */
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const db = await getDb();
    if (!db) return null;

    // Credentials users are the only rows with a passwordHash set; filtering on
    // it here means an OAuth-only user who happens to share an email is never
    // returned as a credentials account, preventing login-type confusion.
    const rows = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), isNotNull(users.passwordHash)))
      .limit(1);

    return rows[0] ?? null;
  }

  async findByOpenId(openId: string): Promise<User | null> {
    const db = await getDb();
    if (!db) return null;

    const rows = await db
      .select()
      .from(users)
      .where(eq(users.openId, openId))
      .limit(1);

    return rows[0] ?? null;
  }

  async create(user: InsertUser): Promise<User> {
    const db = await getDb();
    if (!db) throw new Error("Database unavailable");

    const [row] = await db.insert(users).values(user);
    // Drizzle returns an insertId on MySQL; re-fetch to return the full row so
    // the caller gets timestamps and defaults populated by the DB.
    const created = await this.findByOpenId(user.openId);
    return created ?? ({ ...user, id: row.insertId } as unknown as User);
  }

  async updateLastSignedIn(openId: string): Promise<void> {
    const db = await getDb();
    if (!db) return;

    await db
      .update(users)
      .set({ lastSignedIn: new Date() })
      .where(eq(users.openId, openId));
  }
}
