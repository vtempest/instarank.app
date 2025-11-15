import { cookies } from "next/headers"
import { auth } from "@/auth"

const SESSION_COOKIE_NAME = "session"
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export interface SessionUser {
  id: string
  email: string
  name: string | null
  image?: string | null
  subscriptionTier: string | null
  subscriptionStatus: string | null
  trialEndsAt?: Date | null
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()

  // Set session cookie with user ID
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id as string,
    email: session.user.email as string,
    name: session.user.name || null,
    image: session.user.image || null,
    subscriptionTier: (session.user as any).subscriptionTier || null,
    subscriptionStatus: (session.user as any).subscriptionStatus || null,
    trialEndsAt: (session.user as any).trialEndsAt || null,
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
