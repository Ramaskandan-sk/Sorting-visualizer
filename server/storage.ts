import { CustomArray, InsertCustomArray } from "@shared/schema";

// Storage interface for custom array operations
export interface IStorage {
  getCustomArray(id: number): Promise<CustomArray | undefined>;
  getAllCustomArrays(): Promise<CustomArray[]>;
  createCustomArray(array: InsertCustomArray): Promise<CustomArray>;
  deleteCustomArray(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private customArrays: Map<number, CustomArray>;
  private currentId: number;

  constructor() {
    this.customArrays = new Map();
    this.currentId = 1;
  }

  async getCustomArray(id: number): Promise<CustomArray | undefined> {
    return this.customArrays.get(id);
  }

  async getAllCustomArrays(): Promise<CustomArray[]> {
    return Array.from(this.customArrays.values());
  }

  async createCustomArray(arrayData: InsertCustomArray): Promise<CustomArray> {
    const id = this.currentId++;
    const newArray: CustomArray = {
      ...arrayData,
      id,
      created_at: new Date().toISOString()
    };
    
    this.customArrays.set(id, newArray);
    return newArray;
  }

  async deleteCustomArray(id: number): Promise<boolean> {
    if (!this.customArrays.has(id)) {
      return false;
    }
    
    return this.customArrays.delete(id);
  }
}

// Create and export the storage instance
export const storage = new MemStorage();
