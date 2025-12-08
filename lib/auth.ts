import { betterAuth } from "better-auth"
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
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Enable Google One Tap
      oneTap: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (update session every day)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      subscriptionTier: {
        type: "string",
        defaultValue: "starter",
      },
      subscriptionStatus: {
        type: "string",
        defaultValue: "trial",
      },
      stripeCustomerId: {
        type: "string",
        required: false,
      },
      stripeSubscriptionId: {
        type: "string",
        required: false,
      },
      trialEndsAt: {
        type: "date",
        required: false,
      },
    },
  },
  advanced: {
    generateId: false, // Use database default UUID generation
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET!,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
