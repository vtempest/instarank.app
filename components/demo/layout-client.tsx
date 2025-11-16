"use client"

import type { SessionUser } from "@/lib/auth/session"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DemoDashboardLayoutClientProps {
  user: SessionUser
  children: React.ReactNode
}

export function DemoDashboardLayoutClient({ user, children }: DemoDashboardLayoutClientProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} isDemo={true} />
      <SidebarInset>
        <div className="border-b bg-primary/5">
          <div className="container mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">Demo Mode</Badge>
              <span className="text-sm text-muted-foreground">
                You're viewing a sample dashboard with demo data
              </span>
            </div>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started for Real</Link>
            </Button>
          </div>
        </div>
        
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
