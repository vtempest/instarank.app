import type React from "react"
import { DemoDashboardLayoutClient } from "@/components/demo/layout-client"
import { demoUser } from "@/lib/demo-data"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoDashboardLayoutClient user={demoUser}>
      {children}
    </DemoDashboardLayoutClient>
  )
}
