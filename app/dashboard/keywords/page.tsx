import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { keywords, products, stores } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Plus, Target } from 'lucide-react'

export default async function KeywordsPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  let userKeywords: any[] = []
  let keywordStats = {
    total: 0,
    highVolume: 0,
    lowCompetition: 0,
    used: 0,
  }

  try {
    // Fetch user's keywords
    const fetchedKeywords = await db
      .select({
        id: keywords.id,
        keyword: keywords.keyword,
        searchVolume: keywords.searchVolume,
        competition: keywords.competition,
        effectivenessScore: keywords.effectivenessScore,
        isUsed: keywords.isUsed,
        position: keywords.position,
        productId: keywords.productId,
        productTitle: products.title,
        productAsin: products.asin,
      })
      .from(keywords)
      .innerJoin(products, eq(keywords.productId, products.id))
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(stores.userId, session.id))
      .orderBy(desc(keywords.searchVolume))
      .limit(100)

    userKeywords = fetchedKeywords

    // Calculate stats
    keywordStats.total = userKeywords.length
    keywordStats.highVolume = userKeywords.filter((k) => (k.searchVolume || 0) > 1000).length
    keywordStats.lowCompetition = userKeywords.filter((k) => k.competition === "low").length
    keywordStats.used = userKeywords.filter((k) => k.isUsed).length
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  const getCompetitionColor = (competition: string | null) => {
    switch (competition) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Keywords</h1>
          <p className="mt-2 text-muted-foreground">Discover and track high-value keywords</p>
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Discover Keywords
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{keywordStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-sm font-medium text-muted-foreground">High Volume</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{keywordStats.highVolume}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Competition</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{keywordStats.lowCompetition}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{keywordStats.used}</div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords List */}
      <Card>
        <CardHeader>
          <CardTitle>Tracked Keywords</CardTitle>
          <CardDescription>Monitor keyword performance and rankings</CardDescription>
        </CardHeader>
        <CardContent>
          {userKeywords.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              <div className="text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="mb-4">No keywords tracked yet</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Discover Your First Keywords
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {userKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{keyword.keyword}</h3>
                      {keyword.isUsed && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          In Use
                        </Badge>
                      )}
                      <Badge variant="secondary" className={getCompetitionColor(keyword.competition)}>
                        {keyword.competition || "unknown"} competition
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {keyword.productTitle} • Volume: {keyword.searchVolume?.toLocaleString() || "N/A"}
                      {keyword.position && ` • Rank: #${keyword.position}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {keyword.effectivenessScore && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">{keyword.effectivenessScore}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
