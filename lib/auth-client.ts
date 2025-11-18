"use client"

import { createAuthClient } from "better-auth/client"
import { oneTapClient } from "better-auth/client/plugins"

let _authClient: ReturnType<typeof createAuthClient> | null = null

function getAuthClient() {
  if (!_authClient) {
    try {
      _authClient = createAuthClient({
        baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
        plugins: [
          oneTapClient({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
          })
        ]
      })
    } catch (error) {
      console.error("[v0] Failed to initialize auth client:", error)
      // Return a mock client if initialization fails
      return {
        signIn: async () => { throw new Error("Auth not configured") },
        signOut: async () => { throw new Error("Auth not configured") },
        signUp: async () => { throw new Error("Auth not configured") },
        useSession: () => ({ data: null, isPending: false, error: null }),
        oneTap: async () => { console.warn("[v0] Auth not configured") }
      } as any
    }
  }
  return _authClient
}

export const authClient = new Proxy({} as any, {
  get(target, prop) {
    return getAuthClient()[prop]
  }
})

export const { signIn, signOut, signUp, useSession } = authClient
