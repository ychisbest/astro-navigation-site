import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Image generation schema
export const imageGenerationSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters").max(500, "Prompt must be less than 500 characters"),
});

export type ImageGenerationRequest = z.infer<typeof imageGenerationSchema>;

export interface ImageGenerationResponse {
  id: string;
  status: "pending" | "generating" | "completed";
  prompt: string;
  imageUrl?: string;
  createdAt: string;
}
