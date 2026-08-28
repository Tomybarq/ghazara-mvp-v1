import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { registerStorageProxy } from "./_core/storageProxy";
import { createContext } from "./_core/context";
import { sendDailyActivitySummary } from "./_core/activitySummary";
import { appRouter } from "./routers";

/**
 * Builds the request handler shared by Manus's long-running server and Vercel's
 * serverless function runtime. Starting a listener belongs to the caller.
 */
export function createApp(): Express {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Scheduled daily activity-summary endpoint (heartbeat-compatible).
  // POST /api/scheduled/daily-activity-summary — called by the Forge cron
  // service or the in-process timer in _core/index.ts.
  app.post("/api/scheduled/daily-activity-summary", async (_req, res) => {
    try {
      const ok = await sendDailyActivitySummary();
      res.status(ok ? 200 : 502).json({ ok });
    } catch (error) {
      console.error("[Scheduled] daily-activity-summary failed:", error);
      res.status(500).json({ ok: false, error: "Internal error" });
    }
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  return app;
}
