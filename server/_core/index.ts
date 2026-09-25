import "dotenv/config";
import { createServer } from "http";
import net from "net";
import { serveStatic, setupVite } from "./vite";
import { createApp } from "../app";

async function startServer() {
  console.log("[Server] Initializing Express & tRPC application...");
  const app = createApp();
  const server = createServer(app);

  if (process.env.NODE_ENV === "development") {
    console.log("[Server] Setting up Vite dev middleware...");
    await setupVite(app, server);
    console.log("[Server] Vite dev middleware ready.");
  } else {
    serveStatic(app);
  }

  const startPort = parseInt(process.env.PORT || "3000", 10);
  let currentPort = startPort;
  const maxPort = startPort + 20;

  function tryListen(port: number) {
    server.once("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.log(`[Server] Port ${port} is busy, trying port ${port + 1}...`);
        if (port < maxPort) {
          tryListen(port + 1);
        } else {
          console.error(`[Server] No available ports between ${startPort} and ${maxPort}`);
        }
      } else {
        console.error("[Server] Server error:", err);
      }
    });

    server.listen(port, "0.0.0.0", () => {
      console.log(`[Server] Ghazara app running at http://localhost:${port}/`);
    });
  }

  tryListen(currentPort);
}

startServer().catch((err) => {
  console.error("[Server] Fatal error during startup:", err);
});
