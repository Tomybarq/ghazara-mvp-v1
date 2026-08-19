import { describe, expect, it, vi } from "vitest";

const { createRfqRequest } = vi.hoisted(() => ({
  createRfqRequest: vi.fn().mockResolvedValue(true),
}));

vi.mock("./db", () => ({ createRfqRequest }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("rfq.submit conversion flow", () => {
  it("stores a valid request through the typed RFQ endpoint", async () => {
    const payload = {
      sector: "agriculture",
      service: "representation",
      region: "aden",
      clientName: "ليان أحمد",
      companyName: "شركة المسار للتجارة",
      notes: "نحتاج إلى دراسة أولية لقناة التوزيع في حضرموت وعدن.",
    };

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit(payload);

    expect(result).toEqual({ saved: true });
    expect(createRfqRequest).toHaveBeenCalledWith({
      sector: payload.sector,
      service: payload.service,
      region: payload.region,
      clientName: payload.clientName,
      companyName: payload.companyName,
      notes: payload.notes,
    });
  });

  it("accepts and processes submission with explicit consent flag", async () => {
    const payload = {
      sector: "industrial",
      service: "digital",
      region: "gcc",
      clientName: "فاطمة العمودي",
      companyName: "مجموعة الأفق الصناعية",
      notes: "طلب عرض سعر خاص بالتحول الرقمي",
      consent: true,
    };

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit(payload);

    expect(result).toEqual({ saved: true });
    expect(createRfqRequest).toHaveBeenCalledWith({
      sector: payload.sector,
      service: payload.service,
      region: payload.region,
      clientName: payload.clientName,
      companyName: payload.companyName,
      notes: payload.notes,
    });
  });

  it("handles submission without optional notes gracefully", async () => {
    const payload = {
      sector: "retail",
      service: "marketing",
      region: "hadramout",
      clientName: "أحمد بن طالب",
      companyName: "مؤسسة النخبة",
    };

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit(payload);

    expect(result).toEqual({ saved: true });
    expect(createRfqRequest).toHaveBeenCalledWith({
      sector: payload.sector,
      service: payload.service,
      region: payload.region,
      clientName: payload.clientName,
      companyName: payload.companyName,
      notes: null,
    });
  });

  it("trims whitespace from clientName, companyName, and notes", async () => {
    const payload = {
      sector: "b2b",
      service: "digital",
      region: "sanaa",
      clientName: "   محمد علي   ",
      companyName: "   شركة الريادة   ",
      notes: "   تفاصيل استشارة   ",
    };

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit(payload);

    expect(result).toEqual({ saved: true });
    expect(createRfqRequest).toHaveBeenCalledWith({
      sector: payload.sector,
      service: payload.service,
      region: payload.region,
      clientName: "محمد علي",
      companyName: "شركة الريادة",
      notes: "تفاصيل استشارة",
    });
  });

  it("rejects the request when persistence is unavailable", async () => {
    createRfqRequest.mockResolvedValueOnce(false);

    await expect(
      appRouter.createCaller(createPublicContext()).rfq.submit({
        sector: "agriculture",
        service: "representation",
        region: "aden",
        clientName: "ليان أحمد",
        companyName: "شركة المسار",
      }),
    ).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
  });

  it("rejects an incomplete RFQ request missing required fields", async () => {
    await expect(
      appRouter.createCaller(createPublicContext()).rfq.submit({
        sector: "agriculture",
        service: "representation",
        region: "aden",
        clientName: "A", // too short (min 2)
        companyName: "",
      }),
    ).rejects.toThrow();
  });

  it("accepts inputs at the exact maximum boundary lengths", async () => {
    createRfqRequest.mockResolvedValueOnce(true);
    const maxClientName = "A".repeat(120);
    const maxCompanyName = "B".repeat(160);
    const maxNotes = "C".repeat(1200);

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit({
      sector: "industry",
      service: "consulting",
      region: "mukalla",
      clientName: maxClientName,
      companyName: maxCompanyName,
      notes: maxNotes,
    });

    expect(result).toEqual({ saved: true });
  });

  it("rejects inputs that exceed maximum character limits", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    // ClientName exceeds 120 chars
    await expect(
      caller.rfq.submit({
        sector: "industry",
        service: "consulting",
        region: "mukalla",
        clientName: "A".repeat(121),
        companyName: "شركة مقبولة",
      }),
    ).rejects.toThrow();

    // CompanyName exceeds 160 chars
    await expect(
      caller.rfq.submit({
        sector: "industry",
        service: "consulting",
        region: "mukalla",
        clientName: "عميل مقبول",
        companyName: "B".repeat(161),
      }),
    ).rejects.toThrow();

    // Notes exceeds 1200 chars
    await expect(
      caller.rfq.submit({
        sector: "industry",
        service: "consulting",
        region: "mukalla",
        clientName: "عميل مقبول",
        companyName: "شركة مقبولة",
        notes: "C".repeat(1201),
      }),
    ).rejects.toThrow();
  });
});
