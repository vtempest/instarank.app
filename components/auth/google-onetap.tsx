"use client"

import { useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from 'next/navigation'

export function GoogleOneTap() {
  const router = useRouter()

  useEffect(() => {
    const initOneTap = async () => {
      try {
        await authClient.oneTap({
          fetchOptions: {
            onSuccess: () => {
              router.push("/dashboard")
            },
          },
        })
      } catch (error) {
        console.error("[v0] One Tap error:", error)
      }
    }

    // Only show One Tap on login/signup pages
    if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
      initOneTap()
    }
  }, [router])

  return null
}
