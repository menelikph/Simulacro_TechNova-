// src/services/UserStore.ts
import { setDefaultUserProps } from "@/lib/decorators";
import type { User } from "../types/User";

/**
 * UserStore class: Executes CRUD operations for users.
 */
export class UserStore {
  // The user list is now a private property.
  private users: User[] = []; 

  constructor() {
    // We initialize the data inside the constructor for stability
    this.users = [
      {
        username: "admin",
        password: "123", 
        role: "admin",
        status: "active",
        createdAt: new Date(),
      },
      {
        username: "user",
        password: "123", 
        role: "user",
        status: "active",
        createdAt: new Date(),
      },
    ];
    console.log('[LOG - INIT] UserStore initialized with stable data.');
  }

  // --- C: CREATE (Uses the Decorator) ---
  @setDefaultUserProps()
  public create(userParams: {
    username: string;
    password?: string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
  }): User {
    // ... logic using this.users ...
    const newUser = userParams as User;

    if (this.findByUsername(newUser.username)) {
      throw new Error("User already exists.");
    }

    this.users.push(newUser); 
    console.log(`[LOG - POST] /api/users - User created: ${newUser.username}`);
    return newUser;
  }

  // --- R: READ (List/Find) ---
  public list(): User[] {
    console.log("[LOG - GET] /api/users - Listing all users.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.users.map(({ password, ...rest }) => rest as User);
  }

  public findByUsername(username: string): User | undefined {
    // CRITICAL: Must search in this.users
    return this.users.find((u) => u.username === username);
  }

  // --- U: UPDATE / D: DELETE ---
  // ... the rest of the class functions using this.users ...
  public update(username: string, updates: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex((u) => u.username === username); 
    // ...
    this.users[userIndex] = { ...this.users[userIndex], ...updates }; 
    // ...
    return this.users[userIndex];
  }

  public delete(username: string): boolean {
    const initialLength = this.users.length; 
    this.users = this.users.filter((u) => u.username !== username); 
    // ...
    return this.users.length < initialLength;
  }
}

export const userStore = new UserStore();