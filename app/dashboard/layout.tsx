import type React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from 'next/navigation'
import { DashboardLayoutClient } from "@/components/dashboard/layout-client"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardLayoutClient session={session}>
      {children}
    </DashboardLayoutClient>
  )
}
