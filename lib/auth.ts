import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { oneTap } from "better-auth/plugins"
import { getDb } from "./db"

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    oneTap(),
  ],
  secret: process.env.BETTER_AUTH_SECRET || "default-secret-for-development",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})

export const authAPI = auth.api

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await import("next/headers").then(mod => mod.headers())
    })
    return session
  } catch (error) {
    console.log("[v0] Session error:", error)
    return { session: null, user: null }
  }
}
