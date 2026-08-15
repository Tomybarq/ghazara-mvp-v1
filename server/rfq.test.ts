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

describe("rfq.submit", () => {
  it("stores a valid request through the typed RFQ endpoint", async () => {
    const payload = {
      sector: "agriculture",
      service: "representation",
      region: "aden",
      clientName: "ليان أحمد",
      companyName: "شركة المسار",
      notes: "نحتاج إلى دراسة أولية لقناة التوزيع.",
    };

    const result = await appRouter.createCaller(createPublicContext()).rfq.submit(payload);

    expect(result).toEqual({ saved: true });
    expect(createRfqRequest).toHaveBeenCalledWith({ ...payload, notes: payload.notes });
  });

  it("rejects an incomplete RFQ request", async () => {
    await expect(
      appRouter.createCaller(createPublicContext()).rfq.submit({
        sector: "agriculture",
        service: "representation",
        region: "aden",
        clientName: "A",
        companyName: "",
      }),
    ).rejects.toThrow();
  });
});
