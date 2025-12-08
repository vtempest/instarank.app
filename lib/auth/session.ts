import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export interface SessionUser {
  id: string
  email: string
  name: string | null
  image?: string | null
  subscriptionTier?: string | null
  subscriptionStatus?: string | null
  trialEndsAt?: Date | null
}

export interface Session {
  user: SessionUser
  session: {
    sessionToken: string
    userId: string
    expiresAt: Date
  }
}

/**
 * Get the current session from better-auth
 * This function works in server components and API routes
 */
export async function getSession(): Promise<Session | null> {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      return null
    }

    return session as Session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}
