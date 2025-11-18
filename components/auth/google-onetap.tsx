"use client"

import { authClient } from "@/lib/auth-client"
import { useEffect } from "react"

export function GoogleOneTap() {
  useEffect(() => {
    // Trigger One Tap popup after component mounts
    const showOneTap = async () => {
      try {
        await authClient.oneTap()
      } catch (error) {
        console.log("[v0] One Tap error:", error)
      }
    }

    // Delay to allow page to load
    const timer = setTimeout(showOneTap, 1000)
    return () => clearTimeout(timer)
  }, [])

  return null // This component doesn't render anything visible
}
