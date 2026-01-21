import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { imageGenerationSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Image generation endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const result = imageGenerationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid prompt", 
          details: result.error.errors 
        });
      }

      const { prompt } = result.data;
      
      // Create a new generation request
      const generation = await storage.createGeneration({
        prompt,
        status: "generating",
      });

      return res.status(200).json({
        id: generation.id,
        status: generation.status,
        prompt: generation.prompt,
        createdAt: generation.createdAt,
      });
    } catch (error) {
      console.error("Generation error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get generation status endpoint
  app.get("/api/generate/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const generation = await storage.getGeneration(id);
      
      if (!generation) {
        return res.status(404).json({ error: "Generation not found" });
      }

      return res.status(200).json(generation);
    } catch (error) {
      console.error("Get generation error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
