import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(userOverrides?: Partial<AuthenticatedUser>): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "regular-user-id",
    email: "user@ghazara.net",
    name: "مستخدم تجريبي",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...userOverrides,
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("auth.me query procedure", () => {
  it("returns null when called by an unauthenticated visitor", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.me();

    expect(result).toBeNull();
  });

  it("returns the full authenticated user object for a standard user", async () => {
    const ctx = createAuthContext({
      id: 42,
      openId: "ghazara-client-42",
      name: "أحمد بن طالب",
      email: "ahmed@example.com",
      role: "user",
    });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();

    expect(result).not.toBeNull();
    expect(result?.id).toBe(42);
    expect(result?.openId).toBe("ghazara-client-42");
    expect(result?.name).toBe("أحمد بن طالب");
    expect(result?.email).toBe("ahmed@example.com");
    expect(result?.role).toBe("user");
  });

  it("returns the authenticated admin user object for an administrator", async () => {
    const ctx = createAuthContext({
      id: 1,
      openId: "ghazara-admin-01",
      name: "عدنان الحنشي",
      email: "info@ghazara.net",
      role: "admin",
    });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();

    expect(result).not.toBeNull();
    expect(result?.role).toBe("admin");
    expect(result?.name).toBe("عدنان الحنشي");
  });
});
