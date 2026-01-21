import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// Image generation types
export interface ImageGeneration {
  id: string;
  prompt: string;
  status: "pending" | "generating" | "completed";
  imageUrl?: string;
  createdAt: string;
}

export interface InsertGeneration {
  prompt: string;
  status: "pending" | "generating" | "completed";
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGeneration(generation: InsertGeneration): Promise<ImageGeneration>;
  getGeneration(id: string): Promise<ImageGeneration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private generations: Map<string, ImageGeneration>;

  constructor() {
    this.users = new Map();
    this.generations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<ImageGeneration> {
    const id = randomUUID();
    const generation: ImageGeneration = {
      ...insertGeneration,
      id,
      createdAt: new Date().toISOString(),
    };
    this.generations.set(id, generation);
    return generation;
  }

  async getGeneration(id: string): Promise<ImageGeneration | undefined> {
    return this.generations.get(id);
  }
}

export const storage = new MemStorage();
