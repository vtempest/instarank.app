import dynamic from 'next/dynamic'
import type React from "react"
import { demoUser } from "@/lib/demo-data"

const DemoDashboardLayoutClient = dynamic(
  () => import("@/components/demo/layout-client").then(mod => ({ default: mod.DemoDashboardLayoutClient })),
  { ssr: false }
)

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoDashboardLayoutClient user={demoUser}>
      {children}
    </DemoDashboardLayoutClient>
  )
}
