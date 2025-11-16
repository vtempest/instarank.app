import { cookies } from "next/headers"
import { auth } from "@/lib/auth"

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
  return null
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
