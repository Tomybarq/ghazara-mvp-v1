import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

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
 * Blog taxonomy. Articles belong to one category and can carry several tags.
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  /** Optional English title. Falls back to `title` when empty. */
  titleEn: varchar("titleEn", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary"),
  summaryEn: text("summaryEn"),
  /** Markdown / rich text body. */
  content: text("content").notNull(),
  contentEn: text("contentEn"),
  featuredImage: varchar("featuredImage", { length: 1024 }),
  categoryId: int("categoryId"),
  author: varchar("author", { length: 160 }).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).notNull().default("draft"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

export const articleTags = mysqlTable(
  "articleTags",
  {
    articleId: int("articleId").notNull(),
    tagId: int("tagId").notNull(),
  },
  table => [primaryKey({ columns: [table.articleId, table.tagId] })],
);

export type ArticleTag = typeof articleTags.$inferSelect;

/**
 * Mail delivered to the ghazara.net domain through the inbound webhook.
 */
export const incomingEmails = mysqlTable("incomingEmails", {
  id: int("id").autoincrement().primaryKey(),
  sender: varchar("sender", { length: 320 }).notNull(),
  recipient: varchar("recipient", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  body: text("body"),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
  isRead: boolean("isRead").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IncomingEmail = typeof incomingEmails.$inferSelect;
export type InsertIncomingEmail = typeof incomingEmails.$inferInsert;
