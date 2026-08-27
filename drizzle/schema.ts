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
