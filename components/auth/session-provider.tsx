"use client"

import type { ReactNode } from "react"

// Better Auth doesn't require a session provider wrapper like NextAuth
// Session is managed automatically via cookies and the authClient
export function SessionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
