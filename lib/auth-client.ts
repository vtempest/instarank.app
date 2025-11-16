"use client"

export const authClient = {
  signIn: async () => ({ error: "Authentication temporarily disabled" }),
  signOut: async () => ({ error: "Authentication temporarily disabled" }),
  signUp: async () => ({ error: "Authentication temporarily disabled" }),
  useSession: () => ({ data: null, isPending: false }),
}

export const { signIn, signOut, signUp, useSession } = authClient
