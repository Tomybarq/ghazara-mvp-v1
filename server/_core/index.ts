import "dotenv/config";
import { createServer } from "http";
import net from "net";
import { serveStatic, setupVite } from "./vite";
import { createApp } from "../app";
import { sendDailyActivitySummary } from "./activitySummary";
import { ENV } from "./env";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = createApp();
  const server = createServer(app);
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    startDailySummaryScheduler();
  });
}

/**
 * In-process daily activity-summary scheduler.
 *
 * The Forge heartbeat service is the preferred trigger (it survives restarts
 * and runs even when the dev server is down), but it needs BUILT_IN_FORGE_API_URL
 * which is not configured in dev. This timer is the fallback: it fires once a
 * day at ACTIVITY_SUMMARY_RUN_HOUR (default 08:00 local). Safe to restart —
 * the last-run guard prevents duplicate sends on the same day.
 */
let lastSummaryRunDate: string | null = null;

function startDailySummaryScheduler() {
  const checkIntervalMs = 60 * 60 * 1000; // check every hour

  const tick = async () => {
    const now = new Date();
    const todayKey = now.toISOString().slice(0, 10);
    if (now.getHours() < ENV.activitySummaryRunHour) return;   // not time yet
    if (lastSummaryRunDate === todayKey) return;                 // already sent today

    lastSummaryRunDate = todayKey;
    console.log("[Scheduler] Firing daily activity summary…");
    try {
      await sendDailyActivitySummary();
    } catch (error) {
      console.error("[Scheduler] Daily activity summary failed:", error);
    }
  };

  // Run the first check shortly after boot (allows a quick test in dev),
  // then every hour. The last-run guard keeps it to once per day.
  setTimeout(tick, 10_000);
  setInterval(tick, checkIntervalMs);
  console.log(`[Scheduler] Daily activity summary scheduled for ${ENV.activitySummaryRunHour}:00 local time`);
}
