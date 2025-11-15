"use client"

import { useState } from "react"
import type { SessionUser } from "@/lib/auth/session"
import { DashboardSidebar } from "./sidebar"
import { DashboardHeader } from "./header"

interface DashboardLayoutClientProps {
  session: SessionUser
  children: React.ReactNode
}

export function DashboardLayoutClient({ session, children }: DashboardLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={session} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader user={session} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  )
}
