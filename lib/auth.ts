import { betterAuth } from "better-auth"
import { oneTap } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import * as schema from "./db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verificationTokens,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/callback/google`,
    },
  },
  plugins: [
    oneTap(),
  ],
  secret: process.env.BETTER_AUTH_SECRET || "default-secret-for-development",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "http://localhost:3000",
  ],
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
