import { RequestHandler } from "express";
import { DemoResponse } from "@shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : undefined;

  if (name && name.length > 50) {
    return res.status(400).json({ error: "name too long (max 50 chars)" });
  }

  const response: DemoResponse = {
    message: `Hello from Express server${name ? `, ${name}` : ""}`,
    timestamp: new Date().toISOString(),
    echo: name ?? undefined,
  };

  res.status(200).json(response);
};
