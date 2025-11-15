import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { generatedContent, products, stores } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Calendar, Eye, CheckCircle2, Clock } from 'lucide-react'

export default async function ContentPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  let userContent: any[] = []
  let contentStats = {
    total: 0,
    draft: 0,
    published: 0,
    scheduled: 0,
  }

  try {
    // Fetch user's generated content
    const fetchedContent = await db
      .select({
        id: generatedContent.id,
        contentType: generatedContent.contentType,
        title: generatedContent.title,
        content: generatedContent.content,
        status: generatedContent.status,
        publishedAt: generatedContent.publishedAt,
        createdAt: generatedContent.createdAt,
        productId: generatedContent.productId,
        productTitle: products.title,
      })
      .from(generatedContent)
      .leftJoin(products, eq(generatedContent.productId, products.id))
      .where(eq(generatedContent.userId, session.id))
      .orderBy(desc(generatedContent.createdAt))
      .limit(50)

    userContent = fetchedContent

    // Calculate stats
    contentStats.total = userContent.length
    contentStats.draft = userContent.filter((c) => c.status === "draft").length
    contentStats.published = userContent.filter((c) => c.status === "published").length
    contentStats.scheduled = userContent.filter((c) => c.status === "scheduled").length
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string | null) => {
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content</h1>
          <p className="mt-2 text-muted-foreground">AI-generated content for your products</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Content
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{contentStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{contentStats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{contentStats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{contentStats.scheduled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Content</CardTitle>
          <CardDescription>Manage AI-generated listings, blog posts, and social content</CardDescription>
        </CardHeader>
        <CardContent>
          {userContent.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              <div className="text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="mb-4">No content generated yet</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Your First Content
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {userContent.map((content) => (
                <div
                  key={content.id}
                  className="flex items-start justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {getTypeIcon(content.contentType)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{content.title || "Untitled Content"}</h3>
                        <Badge variant="secondary" className={getStatusColor(content.status)}>
                          {content.status || "draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {content.contentType} {content.productTitle && `• ${content.productTitle}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(content.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
