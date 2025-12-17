import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"
import { db } from "./db"
import * as schema from "./db/schema"
import { headers } from "next/headers"

const AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET ||
  process.env.AUTH_SECRET ||
  "development-secret-key-min-32-chars-CHANGE-IN-PRODUCTION-12345678"

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    trialDays: 14,
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || "",
    trialDays: 14,
  },
  {
    id: "professional",
    name: "Professional",
    price: 199,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "",
    trialDays: 14,
  },
]

export type Plan = (typeof plans)[number]

export const auth = betterAuth({
  secret: AUTH_SECRET, // Use the constant instead of function call
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  database: drizzleAdapter(db, {
    provider: "pg", // Changed from sqlite to pg for PostgreSQL
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verification, // Changed from verificationTokens to verification
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: plans,
        getCheckoutSessionParams: async ({ user, plan }) => {
          const checkoutSession: {
            params: {
              subscription_data?: {
                trial_period_days: number
              }
            }
          } = {
            params: {},
          }

          // @ts-ignore - trialAllowed may not be on user type yet
          if (user.trialAllowed) {
            checkoutSession.params.subscription_data = {
              trial_period_days: (plan as Plan).trialDays,
            }
          }

          return checkoutSession
        },
        onSubscriptionComplete: async ({ event }) => {
          const eventDataObject = event.data.object as Stripe.Checkout.Session
          // Handle subscription completion
          console.log("[v0] Subscription completed for user:", eventDataObject.metadata?.userId)
        },
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 days
    updateAge: 60 * 60 * 24 * 3, // 3 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
})

export type Session = typeof auth.$Infer.Session.session
export type User = typeof auth.$Infer.Session.user

export async function getActiveSubscription() {
  const nextHeaders = await headers()
  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: nextHeaders,
  })
  return subscriptions.find((s) => s.status === "active")
}
