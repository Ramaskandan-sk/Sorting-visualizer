import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define custom array schema for saving arrays
export const customArrays = pgTable("custom_arrays", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  values: integer("values").array().notNull(),
  created_at: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertCustomArraySchema = createInsertSchema(customArrays).pick({
  name: true,
  values: true,
});

export type InsertCustomArray = z.infer<typeof insertCustomArraySchema>;
export type CustomArray = typeof customArrays.$inferSelect;
