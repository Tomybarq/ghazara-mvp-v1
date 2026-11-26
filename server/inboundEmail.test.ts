import { createServer, type Server } from "http";
import type { AddressInfo } from "net";
import { afterEach, describe, expect, it, vi } from "vitest";

const { createIncomingEmail } = vi.hoisted(() => ({
  createIncomingEmail: vi.fn().mockResolvedValue({ id: 42 }),
}));

vi.mock("./blog", async importOriginal => {
  const actual = await importOriginal<typeof import("./blog")>();
  return { ...actual, createIncomingEmail };
});

import { createApp } from "./app";

let server: Server | undefined;

async function request(body: string, contentType: string, headers: Record<string, string> = {}) {
  server = createServer(createApp());
  await new Promise<void>(resolve => server?.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;

  return fetch(`http://127.0.0.1:${port}/api/email/inbound`, {
    method: "POST",
    headers: { "content-type": contentType, ...headers },
    body,
  });
}

const postJson = (payload: unknown, headers: Record<string, string> = {}) =>
  request(JSON.stringify(payload), "application/json", headers);

afterEach(async () => {
  delete process.env.INBOUND_EMAIL_WEBHOOK_TOKEN;
  await new Promise<void>(resolve => server?.close(() => resolve()));
  server = undefined;
  vi.clearAllMocks();
});

describe("inbound email webhook (/api/email/inbound)", () => {
  it("rejects requests when a webhook token is configured and missing", async () => {
    process.env.INBOUND_EMAIL_WEBHOOK_TOKEN = "test-secret";

    const response = await postJson({ sender: "a@b.c", subject: "s", body: "b" });

    expect(response.status).toBe(401);
    expect(createIncomingEmail).not.toHaveBeenCalled();
  });

  it("stores a JSON payload when the token matches", async () => {
    process.env.INBOUND_EMAIL_WEBHOOK_TOKEN = "test-secret";

    const response = await postJson(
      {
        sender: "client@example.com",
        recipient: "info@ghazara.net",
        subject: "استفسار تجاري",
        body: "مرحبًا، نحتاج إلى عرض سعر.",
      },
      { "x-webhook-token": "test-secret" },
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true, id: 42 });
    expect(createIncomingEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: "client@example.com",
        recipient: "info@ghazara.net",
        subject: "استفسار تجاري",
        body: "مرحبًا، نحتاج إلى عرض سعر.",
      }),
    );
  });

  it("accepts provider payloads, defaults the recipient and strips HTML", async () => {
    const response = await postJson({
      from: "Html Sender <html@example.com>",
      html: "<p>Hello <b>team</b></p><script>alert(1)</script>",
      subject: "HTML mail",
    });

    expect(response.status).toBe(201);
    expect(createIncomingEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: "Html Sender <html@example.com>",
        recipient: "info@ghazara.net",
        subject: "HTML mail",
        body: "Hello team",
      }),
    );
  });

  it("accepts form-encoded payloads and rejects empty bodies", async () => {
    const form = new URLSearchParams({
      from: "form@example.com",
      to: "sales@ghazara.net",
      subject: "Form subject",
      text: "Form body text",
    });

    const stored = await request(form.toString(), "application/x-www-form-urlencoded");
    expect(stored.status).toBe(201);
    expect(createIncomingEmail).toHaveBeenCalledWith(
      expect.objectContaining({ sender: "form@example.com", body: "Form body text" }),
    );

    const empty = await postJson({});
    expect(empty.status).toBe(400);
  });
});
