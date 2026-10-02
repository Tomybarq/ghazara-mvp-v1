import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { registerStorageProxy } from "./_core/storageProxy";
import { createContext } from "./_core/context";
import { appRouter } from "./routers";

/**
 * Builds the request handler shared by Manus's long-running server and Vercel's
 * serverless function runtime. Starting a listener belongs to the caller.
 */
export function createApp(): Express {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Health check endpoints for Google Cloud Run, load balancers, and monitoring
  app.get(["/health", "/api/health"], (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "ghazara-website",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  return app;
}
