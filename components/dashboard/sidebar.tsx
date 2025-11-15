"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Users, Search, FileText, Share2, BarChart3, Settings, Store } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/lib/auth/session"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Stores", href: "/dashboard/stores", icon: Store },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Competitors", href: "/dashboard/competitors", icon: Users },
  { name: "Keywords", href: "/dashboard/keywords", icon: Search },
  { name: "Content", href: "/dashboard/content", icon: FileText },
  { name: "Social Media", href: "/dashboard/social", icon: Share2 },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface DashboardSidebarProps {
  user: SessionUser
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 border-r border-border bg-background lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image 
              src="/logo-instarank.png" 
              alt="InstaRank Logo" 
              width={32} 
              height={32}
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-xl font-bold text-foreground">InstaRank</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Subscription */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Plan</span>
              <span className="text-xs font-semibold capitalize text-foreground">
                {user.subscriptionTier || "Free"}
              </span>
            </div>
            {user.subscriptionStatus === "trial" && (
              <p className="text-xs text-muted-foreground">14-day trial active</p>
            )}
            <Link
              href="/dashboard/settings/billing"
              className="mt-2 block text-xs font-medium text-primary hover:underline"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
