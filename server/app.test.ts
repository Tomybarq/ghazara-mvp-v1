import { createServer, type Server } from "http";
import type { AddressInfo } from "net";
import { afterEach, describe, expect, it } from "vitest";
import vercelHandler from "../api";

let server: Server | undefined;

afterEach(async () => {
  await new Promise<void>(resolve => server?.close(() => resolve()));
  server = undefined;
});

async function request(path: string) {
  server = createServer(vercelHandler);
  await new Promise<void>(resolve => server?.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;

  return fetch(`http://127.0.0.1:${port}${path}`, { redirect: "manual" });
}

describe("Vercel Express bridge", () => {
  it("serves tRPC and keeps OAuth and storage routes registered", async () => {
    const trpcResponse = await request(
      "/api/trpc/auth.me?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D",
    );

    expect(trpcResponse.status).toBe(200);

    const oauthResponse = await request("/api/oauth/callback");
    expect(oauthResponse.status).not.toBe(404);

    const storageResponse = await request("/manus-storage/health-check");
    expect(storageResponse.status).not.toBe(404);
  });
});
