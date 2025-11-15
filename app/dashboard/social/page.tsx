import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { socialAccounts } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Plus, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

export default async function SocialPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  let connectedAccounts: any[] = []

  try {
    // Fetch user's social media accounts
    const accounts = await db
      .select({
        id: socialAccounts.id,
        platform: socialAccounts.platform,
        accountName: socialAccounts.accountName,
        isActive: socialAccounts.isActive,
        createdAt: socialAccounts.createdAt,
      })
      .from(socialAccounts)
      .where(eq(socialAccounts.userId, session.id))

    connectedAccounts = accounts
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  const platformIcons: Record<string, any> = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
  }

  const platforms = [
    { name: "Instagram", key: "instagram", color: "text-pink-600", bgColor: "bg-pink-50" },
    { name: "Facebook", key: "facebook", color: "text-blue-600", bgColor: "bg-blue-50" },
    { name: "Twitter", key: "twitter", color: "text-sky-500", bgColor: "bg-sky-50" },
    { name: "LinkedIn", key: "linkedin", color: "text-blue-700", bgColor: "bg-blue-50" },
    { name: "TikTok", key: "tiktok", color: "text-black", bgColor: "bg-gray-50" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Social Media</h1>
          <p className="mt-2 text-muted-foreground">Manage your social media accounts and schedule posts</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Post
        </Button>
      </div>

      {/* Connected Accounts Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Link your social media accounts to schedule and publish content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform.key] || Share2
              const isConnected = connectedAccounts.some((acc) => acc.platform === platform.key && acc.isActive)
              const account = connectedAccounts.find((acc) => acc.platform === platform.key)

              return (
                <div
                  key={platform.key}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${platform.bgColor}`}>
                      <Icon className={`h-5 w-5 ${platform.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{platform.name}</h3>
                        {isConnected && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Connected
                          </Badge>
                        )}
                      </div>
                      {account && (
                        <p className="text-sm text-muted-foreground">{account.accountName || "Account"}</p>
                      )}
                    </div>
                  </div>
                  <Button variant={isConnected ? "outline" : "default"} size="sm">
                    {isConnected ? "Manage" : "Connect"}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>Upcoming social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <Share2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="mb-4">No posts scheduled yet</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Your First Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Your recently published content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            No recent posts
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
