import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  InsertRfqRequest,
  InsertActivityLog,
  activityLog,
  rfqRequests,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { ADMIN_EMAILS } from '@shared/const';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/** Set database instance for testing or custom runtime injection */
export function setDb(db: ReturnType<typeof drizzle> | null) {
  _db = db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    } else if (user.email && ADMIN_EMAILS.has(user.email.toLowerCase())) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createRfqRequest(request: InsertRfqRequest): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] RFQ request was not stored because the database is unavailable");
    return false;
  }

  await db.insert(rfqRequests).values(request);
  return true;
}

/**
 * Append an entry to the activity log. Never throws — a logging failure
 * must not break the user-facing operation that triggered it.
 */
export async function logActivity(entry: InsertActivityLog): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(activityLog).values(entry);
  } catch (error) {
    console.warn("[ActivityLog] Failed to log entry:", error);
  }
}

/** Fetch the most recent activity log entries for the admin dashboard. */
export async function getRecentActivities(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLog).orderBy(desc(activityLog.createdAt)).limit(limit);
}

/** Fetch all users ordered by most recently active, for the admin dashboard. */
export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: users.id,
      openId: users.openId,
      name: users.name,
      email: users.email,
      role: users.role,
      loginMethod: users.loginMethod,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastSignedIn: users.lastSignedIn,
    })
    .from(users)
    .orderBy(desc(users.lastSignedIn));
}
