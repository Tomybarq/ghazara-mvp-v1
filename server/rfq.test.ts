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
});
