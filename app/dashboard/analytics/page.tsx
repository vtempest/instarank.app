import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { usageTracking } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Search, FileText, Calendar, Share2 } from 'lucide-react'

export default async function AnalyticsPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  let currentUsage = {
    keywordSearches: 0,
    aiListingsGenerated: 0,
    blogPostsGenerated: 0,
    socialPostsScheduled: 0,
  }

  try {
    // Get current month's usage
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    const [usage] = await db
      .select()
      .from(usageTracking)
      .where(eq(usageTracking.userId, session.id))
      .orderBy(desc(usageTracking.month))
      .limit(1)

    if (usage && usage.month === currentMonth) {
      currentUsage = {
        keywordSearches: usage.keywordSearches || 0,
        aiListingsGenerated: usage.aiListingsGenerated || 0,
        blogPostsGenerated: usage.blogPostsGenerated || 0,
        socialPostsScheduled: usage.socialPostsScheduled || 0,
      }
    }
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  const usageStats = [
    {
      title: "Keyword Searches",
      value: currentUsage.keywordSearches,
      icon: Search,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "AI Listings Generated",
      value: currentUsage.aiListingsGenerated,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Blog Posts",
      value: currentUsage.blogPostsGenerated,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Social Posts",
      value: currentUsage.socialPostsScheduled,
      icon: Share2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-2 text-muted-foreground">Track your usage and performance metrics</p>
      </div>

      {/* Current Month Usage */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">This Month's Usage</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {usageStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your optimization results over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p>Performance charts will appear here</p>
              <p className="mt-2 text-xs">Start optimizing your products to see results</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Trends</CardTitle>
          <CardDescription>Track your product rankings over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p>Ranking data will appear here</p>
              <p className="mt-2 text-xs">Add products and keywords to start tracking</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Insights</CardTitle>
          <CardDescription>Compare your performance with competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <p>Competitor comparison data will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
