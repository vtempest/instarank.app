import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { stores, products, keywords, generatedContent } from "@/lib/db/schema"
import { eq, count } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Store, Search, FileText, TrendingUp, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  let storesCount = { count: 0 }
  let productsCount = { count: 0 }
  let keywordsCount = { count: 0 }
  let contentCount = { count: 0 }

  try {
    // Fetch user stats
    const [storesResult] = await db.select({ count: count() }).from(stores).where(eq(stores.userId, session.id))
    storesCount = storesResult || { count: 0 }

    const [productsResult] = await db
      .select({ count: count() })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(stores.userId, session.id))
    productsCount = productsResult || { count: 0 }

    const [keywordsResult] = await db
      .select({ count: count() })
      .from(keywords)
      .innerJoin(products, eq(keywords.productId, products.id))
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(stores.userId, session.id))
    keywordsCount = keywordsResult || { count: 0 }

    const [contentResult] = await db
      .select({ count: count() })
      .from(generatedContent)
      .where(eq(generatedContent.userId, session.id))
    contentCount = contentResult || { count: 0 }
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  const stats = [
    {
      title: "Stores",
      value: storesCount?.count || 0,
      description: "Connected Amazon stores",
      icon: Store,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products",
      value: productsCount?.count || 0,
      description: "Products being tracked",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Keywords",
      value: keywordsCount?.count || 0,
      description: "Keywords discovered",
      icon: Search,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Content",
      value: contentCount?.count || 0,
      description: "AI-generated content",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {session.name}!</h1>
        <p className="mt-2 text-muted-foreground">Here's an overview of your Amazon optimization performance.</p>
      </div>

      {/* Trial Banner */}
      {session.subscriptionStatus === "trial" && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your 14-day free trial is active</h3>
                <p className="text-sm text-muted-foreground">
                  Explore all features with no limitations. Upgrade anytime to continue after your trial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with InstaRank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/dashboard/stores"
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
            >
              <Store className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Connect Your Store</div>
                <div className="text-sm text-muted-foreground">Add your Amazon store to get started</div>
              </div>
            </a>
            <a
              href="/dashboard/products"
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
            >
              <Package className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Add Products</div>
                <div className="text-sm text-muted-foreground">Import products to optimize</div>
              </div>
            </a>
            <a
              href="/dashboard/keywords"
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
            >
              <Search className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Discover Keywords</div>
                <div className="text-sm text-muted-foreground">Find high-value keywords</div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No recent activity yet. Start by connecting your store!
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your optimization progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
              <p>Performance data will appear here once you start optimizing products</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
