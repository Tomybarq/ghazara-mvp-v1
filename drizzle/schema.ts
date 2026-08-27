import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  /**
   * Credentials auth only. Stores a salted scrypt hash (format: "<salt>:<hash>",
   * both hex-encoded), never the plaintext password. Null for OAuth-only users,
   * which keeps the column optional and avoids a separate credentials table.
   */
  passwordHash: varchar("passwordHash", { length: 255 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const rfqRequests = mysqlTable("rfqRequests", {
  id: int("id").autoincrement().primaryKey(),
  sector: varchar("sector", { length: 64 }).notNull(),
  service: varchar("service", { length: 64 }).notNull(),
  region: varchar("region", { length: 64 }).notNull(),
  clientName: varchar("clientName", { length: 120 }).notNull(),
  companyName: varchar("companyName", { length: 160 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 24 }).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RfqRequest = typeof rfqRequests.$inferSelect;
export type InsertRfqRequest = typeof rfqRequests.$inferInsert;

/**
 * Password reset tokens.
 * Each row is a single-use, time-limited token bound to a user's email.
 * `usedAt` marks consumption so a token can never be replayed. The token itself
 * is a 64-char hex string (32 random bytes) — enough entropy to be unguessable.
 */
export const passwordResets = mysqlTable("passwordResets", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordReset = typeof passwordResets.$inferSelect;
export type InsertPasswordReset = typeof passwordResets.$inferInsert;

/**
 * Activity log — append-only audit trail of user and account events.
 * Each row records who did what and when, so the admin dashboard can show a
 * chronological feed of recent activity and account changes.
 */
export const activityLog = mysqlTable("activityLog", {
  id: int("id").autoincrement().primaryKey(),
  /** The user the activity concerns (may differ from the actor, e.g. admin creating a user). */
  userId: int("userId"),
  userOpenId: varchar("userOpenId", { length: 64 }),
  userName: varchar("userName", { length: 120 }),
  type: mysqlEnum("type", [
    "register",
    "login",
    "profile_update",
    "user_created",
    "role_change",
  ]).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = typeof activityLog.$inferInsert;
