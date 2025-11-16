import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { getDb } from "./db"

let databaseAdapter
try {
  const db = getDb()
  if (db) {
    databaseAdapter = drizzleAdapter(db, {
      provider: "pg",
    })
  }
} catch (error) {
  console.log("[v0] Database not available during build, using fallback")
}

export const auth = betterAuth({
  database: databaseAdapter,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret-for-build-only-change-in-production",
})
