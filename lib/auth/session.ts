import { auth } from "@/lib/auth"

export interface SessionUser {
  id: string
  email: string
  name: string | null
  image?: string | null
  subscriptionTier?: string | null
  subscriptionStatus?: string | null
  trialEndsAt?: Date | null
}

/**
 * Get the current session from better-auth
 * This function works in server components and API routes
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  })

  if (!session?.user) {
    return null
  }

  // Return session user data
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name || null,
    image: session.user.image || null,
    subscriptionTier: "starter",
    subscriptionStatus: "trial",
    trialEndsAt: null,
  } as SessionUser
}
