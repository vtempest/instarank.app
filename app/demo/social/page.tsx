"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, TrendingUp } from 'lucide-react'

export default function DemoSocialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media Management</h1>
          <p className="text-muted-foreground">AI-powered social media content and scheduling</p>
        </div>
        <Button disabled>
          <Share2 className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Social platforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>Your social media accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Instagram", "Facebook", "Twitter"].map((platform) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Share2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{platform}</div>
                    <div className="text-sm text-muted-foreground">@yourbrand</div>
                  </div>
                </div>
                <Badge>Connected</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Latest social media activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 border-b pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Instagram</Badge>
                  <span className="text-sm text-muted-foreground">{i} days ago</span>
                </div>
                <p className="text-sm">New product launch! Check out our latest addition...</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>❤️ 245 likes</span>
                  <span>💬 18 comments</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
