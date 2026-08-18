import { describe, expect, it } from "vitest";
import { getSessionCookieOptions } from "./_core/cookies";
import type { Request } from "express";

function createMockReq(overrides: Partial<Request> = {}): Request {
  return {
    protocol: "https",
    headers: {},
    hostname: "ghazara.net",
    ...overrides,
  } as Request;
}

describe("getSessionCookieOptions utility", () => {
  it("marks cookies secure when request protocol is https", () => {
    const req = createMockReq({ protocol: "https" });
    const options = getSessionCookieOptions(req);

    expect(options.secure).toBe(true);
    expect(options.httpOnly).toBe(true);
    expect(options.path).toBe("/");
    expect(options.sameSite).toBe("none");
  });

  it("marks cookies non-secure when protocol is http and no forwarded header exists", () => {
    const req = createMockReq({ protocol: "http", headers: {} });
    const options = getSessionCookieOptions(req);

    expect(options.secure).toBe(false);
    expect(options.httpOnly).toBe(true);
  });

  it("detects https from single x-forwarded-proto string", () => {
    const req = createMockReq({
      protocol: "http",
      headers: { "x-forwarded-proto": "https" },
    });
    const options = getSessionCookieOptions(req);

    expect(options.secure).toBe(true);
  });

  it("detects https from comma-separated x-forwarded-proto header (reverse proxy chain)", () => {
    const req = createMockReq({
      protocol: "http",
      headers: { "x-forwarded-proto": "http, https" },
    });
    const options = getSessionCookieOptions(req);

    expect(options.secure).toBe(true);
  });

  it("detects https when x-forwarded-proto is passed as an array of protocols", () => {
    const req = createMockReq({
      protocol: "http",
      headers: { "x-forwarded-proto": ["http", "https"] as unknown as string },
    });
    const options = getSessionCookieOptions(req);

    expect(options.secure).toBe(true);
  });
});
