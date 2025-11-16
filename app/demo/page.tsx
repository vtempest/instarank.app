import { demoStats, demoProducts, demoRecentActivity } from "@/lib/demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Store, Search, FileText, Clock, TrendingUp } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoPage() {
  const stats = [
    {
      title: "Stores",
      value: demoStats.stores,
      description: "Connected Amazon stores",
      icon: Store,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products",
      value: demoStats.products,
      description: "Products being tracked",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Keywords",
      value: demoStats.keywords,
      description: "Keywords discovered",
      icon: Search,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Content",
      value: demoStats.content,
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
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
        <p className="mt-2 text-muted-foreground">Here's an overview of your Amazon optimization performance.</p>
      </div>

      {/* Trial Banner */}
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

      {/* Products & Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
            <CardDescription>Products currently being optimized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{product.title}</div>
                  <div className="text-sm text-muted-foreground">ASIN: {product.asin}</div>
                </div>
                <Badge variant={product.status === "optimizing" ? "default" : "secondary"}>
                  {product.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest AI agent actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoRecentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {activity.icon === "search" && <Search className="h-5 w-5 text-primary" />}
                  {activity.icon === "file" && <FileText className="h-5 w-5 text-primary" />}
                  {activity.icon === "trending" && <TrendingUp className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{activity.action}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-white">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h3 className="text-2xl font-bold">Ready to Optimize Your Real Amazon Store?</h3>
          <p className="text-white/90">
            This demo shows sample data. Create your free account to connect your actual Amazon store and start
            ranking higher.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
