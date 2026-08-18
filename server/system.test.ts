import { describe, expect, it, vi } from "vitest";

const { notifyOwner } = vi.hoisted(() => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/notification", () => ({ notifyOwner }));

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

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: role === "admin" ? 1 : 2,
    openId: role === "admin" ? "admin-open-id" : "user-open-id",
    email: role === "admin" ? "admin@ghazara.net" : "user@example.com",
    name: role === "admin" ? "مسؤول النظام" : "مستخدم عادي",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("systemRouter procedures", () => {
  describe("system.health", () => {
    it("returns ok: true for valid positive timestamp", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.system.health({ timestamp: Date.now() });

      expect(result).toEqual({ ok: true });
    });

    it("returns ok: true for zero timestamp", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.system.health({ timestamp: 0 });

      expect(result).toEqual({ ok: true });
    });

    it("rejects negative timestamps with schema validation error", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.system.health({ timestamp: -1 }),
      ).rejects.toThrow();
    });

    it("rejects non-numeric timestamps", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        // @ts-expect-error Testing invalid runtime types
        caller.system.health({ timestamp: "not-a-timestamp" }),
      ).rejects.toThrow();
    });
  });

  describe("system.notifyOwner", () => {
    it("rejects unauthenticated callers with FORBIDDEN", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.system.notifyOwner({
          title: "تنبيه تشغيلي",
          content: "فحص البنية التحتية",
        }),
      ).rejects.toMatchObject({
        code: "FORBIDDEN",
      });
    });

    it("rejects non-admin authenticated users with FORBIDDEN", async () => {
      const caller = appRouter.createCaller(createAuthContext("user"));

      await expect(
        caller.system.notifyOwner({
          title: "تنبيه تشغيلي",
          content: "فحص البنية التحتية",
        }),
      ).rejects.toMatchObject({
        code: "FORBIDDEN",
      });
    });

    it("allows administrators to send notifications and reports success", async () => {
      notifyOwner.mockResolvedValueOnce(true);
      const caller = appRouter.createCaller(createAuthContext("admin"));

      const result = await caller.system.notifyOwner({
        title: "إشعار طلب عرض سعر جديد",
        content: "تم استلام طلب جديد من قطاع التجارة والتسويق",
      });

      expect(result).toEqual({ success: true });
      expect(notifyOwner).toHaveBeenCalledWith({
        title: "إشعار طلب عرض سعر جديد",
        content: "تم استلام طلب جديد من قطاع التجارة والتسويق",
      });
    });

    it("rejects notifications with empty title or content", async () => {
      const caller = appRouter.createCaller(createAuthContext("admin"));

      await expect(
        caller.system.notifyOwner({
          title: "",
          content: "محتوى",
        }),
      ).rejects.toThrow();

      await expect(
        caller.system.notifyOwner({
          title: "عنوان",
          content: "",
        }),
      ).rejects.toThrow();
    });
  });
});
