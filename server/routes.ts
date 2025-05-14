import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomArraySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints related to sorting arrays
  app.get("/api/arrays", async (req, res) => {
    try {
      const arrays = await storage.getAllCustomArrays();
      res.json(arrays);
    } catch (error) {
      console.error("Error fetching custom arrays:", error);
      res.status(500).json({ message: "Failed to fetch custom arrays" });
    }
  });

  app.get("/api/arrays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const array = await storage.getCustomArray(id);
      if (!array) {
        return res.status(404).json({ message: "Array not found" });
      }
      
      res.json(array);
    } catch (error) {
      console.error("Error fetching custom array:", error);
      res.status(500).json({ message: "Failed to fetch custom array" });
    }
  });

  app.post("/api/arrays", async (req, res) => {
    try {
      const result = insertCustomArraySchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const newArray = await storage.createCustomArray(result.data);
      res.status(201).json(newArray);
    } catch (error) {
      console.error("Error creating custom array:", error);
      res.status(500).json({ message: "Failed to create custom array" });
    }
  });

  app.delete("/api/arrays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteCustomArray(id);
      if (!success) {
        return res.status(404).json({ message: "Array not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting custom array:", error);
      res.status(500).json({ message: "Failed to delete custom array" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
