import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

let _db: ReturnType<typeof drizzle> | null = null

export const getDb = () => {
  if (!_db) {
    const connectionString = process.env.NEON_NEON_DATABASE_URL || process.env.DATABASE_URL

    if (!connectionString) {
      // During build time, return a mock to prevent errors
      if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
        console.warn("[v0] Database connection not available during build")
        // Return a mock db object that won't be used during build
        return null as any
      }
      throw new Error("Database connection string is not defined")
    }

    const sql = neon(connectionString)
    _db = drizzle(sql, { schema })
  }

  return _db
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const database = getDb()
    if (!database) {
      throw new Error("Database not available - connection string not configured")
    }
    return database[prop as keyof typeof database]
  },
})
