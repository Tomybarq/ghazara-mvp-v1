import { describe, expect, it, vi, beforeEach } from "vitest";
import { upsertUser, getUserByOpenId, createRfqRequest, setDb } from "./db";

const mockInsertValues = vi.fn();
const mockOnDuplicateKeyUpdate = vi.fn().mockResolvedValue(undefined);
const mockSelectLimit = vi.fn();
const mockSelectWhere = vi.fn().mockReturnValue({ limit: mockSelectLimit });
const mockSelectFrom = vi.fn().mockReturnValue({ where: mockSelectWhere });

const mockDrizzleDb = {
  insert: vi.fn(() => ({
    values: mockInsertValues.mockReturnValue({
      onDuplicateKeyUpdate: mockOnDuplicateKeyUpdate,
    }),
  })),
  select: vi.fn(() => ({
    from: mockSelectFrom,
  })),
};

describe("Database access layer (server/db.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setDb(null);
  });

  describe("upsertUser validation and behavior", () => {
    it("throws an error when user.openId is missing or empty", async () => {
      // @ts-expect-error Testing missing openId constraint
      await expect(upsertUser({})).rejects.toThrow("User openId is required for upsert");
      // @ts-expect-error Testing empty openId constraint
      await expect(upsertUser({ openId: "" })).rejects.toThrow("User openId is required for upsert");
    });

    it("returns gracefully without crashing when database is unavailable", async () => {
      setDb(null);

      await expect(
        upsertUser({
          openId: "user-offline-1",
          name: "مستخدم أوفلاين",
        }),
      ).resolves.toBeUndefined();
    });

    it("inserts/updates user with normalized fields when database is available", async () => {
      setDb(mockDrizzleDb as any);
      mockInsertValues.mockReturnValueOnce({
        onDuplicateKeyUpdate: mockOnDuplicateKeyUpdate,
      });

      await upsertUser({
        openId: "user-123",
        name: "محمد أحمد",
        email: "mohamed@example.com",
        loginMethod: "manus",
        role: "user",
      });

      expect(mockDrizzleDb.insert).toHaveBeenCalled();
      expect(mockInsertValues).toHaveBeenCalledWith(
        expect.objectContaining({
          openId: "user-123",
          name: "محمد أحمد",
          email: "mohamed@example.com",
          role: "user",
        }),
      );
      expect(mockOnDuplicateKeyUpdate).toHaveBeenCalled();
    });
  });

  describe("getUserByOpenId behavior", () => {
    it("returns undefined when database is not available", async () => {
      setDb(null);
      const user = await getUserByOpenId("non-existent-open-id");

      expect(user).toBeUndefined();
    });

    it("returns user record when found", async () => {
      setDb(mockDrizzleDb as any);
      const mockUser = {
        id: 1,
        openId: "user-test-id",
        name: "عميل تجاري",
        email: "client@example.com",
        role: "user",
      };

      mockSelectLimit.mockResolvedValueOnce([mockUser]);

      const result = await getUserByOpenId("user-test-id");
      expect(result).toEqual(mockUser);
    });

    it("returns undefined when user is not found in database", async () => {
      setDb(mockDrizzleDb as any);
      mockSelectLimit.mockResolvedValueOnce([]);

      const result = await getUserByOpenId("non-existent-user");
      expect(result).toBeUndefined();
    });
  });

  describe("createRfqRequest behavior", () => {
    it("returns false as a fail-safe when database is unavailable", async () => {
      setDb(null);
      const result = await createRfqRequest({
        sector: "trade",
        service: "marketing",
        region: "aden",
        clientName: "عميل تجريبي",
        companyName: "شركة تجريبية",
        notes: null,
      });

      expect(result).toBe(false);
    });

    it("inserts RFQ request and returns true when database is available", async () => {
      setDb(mockDrizzleDb as any);
      mockInsertValues.mockResolvedValueOnce(undefined);

      const payload = {
        sector: "agriculture",
        service: "representation",
        region: "hadramout",
        clientName: "سالم باعباد",
        companyName: "مزارع حضرموت",
        notes: "طلب استيراد أسمدة",
      };

      const result = await createRfqRequest(payload);

      expect(result).toBe(true);
      expect(mockDrizzleDb.insert).toHaveBeenCalled();
      expect(mockInsertValues).toHaveBeenCalledWith(payload);
    });
  });
});
