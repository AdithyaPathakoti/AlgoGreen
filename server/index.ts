import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import type { Server } from "http";

// Simple logging middleware for requests
function requestLogger(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
}

export function createServer() {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Health check for orchestrators/load balancers
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/demo", handleDemo);

  return app;
}

export function attachGracefulShutdown(server: Server) {
  const shutdown = () => {
    console.log("Shutting down server gracefully...");
    server.close((err) => {
      if (err) {
        console.error("Error while shutting down:", err);
        process.exit(1);
      }
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
