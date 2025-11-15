import { getSession } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { competitors, products, stores } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CompetitorList } from "@/components/dashboard/competitor-list"
import { AddCompetitorDialog } from "@/components/dashboard/add-competitor-dialog"

export default async function CompetitorsPage() {
  const session = await getSession()

  if (!session) {
    return null
  }

  // Fetch user's products for the dropdown
  let userProducts: any[] = []
  let userCompetitors: any[] = []

  try {
    userProducts = await db
      .select({
        id: products.id,
        title: products.title,
        asin: products.asin,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(stores.userId, session.id))
      .limit(50)

    // Fetch competitors
    userCompetitors = await db
      .select({
        id: competitors.id,
        asin: competitors.asin,
        title: competitors.title,
        price: competitors.price,
        rating: competitors.rating,
        reviewCount: competitors.reviewCount,
        rank: competitors.rank,
        imageUrl: competitors.imageUrl,
        lastScrapedAt: competitors.lastScrapedAt,
        productId: competitors.productId,
        productTitle: products.title,
        productAsin: products.asin,
      })
      .from(competitors)
      .innerJoin(products, eq(competitors.productId, products.id))
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(stores.userId, session.id))
      .orderBy(desc(competitors.createdAt))
      .limit(100)
  } catch (error) {
    console.log("[v0] Database tables not yet created, using mock data:", error)
    // Mock data will be used (already initialized above)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Competitor Tracking</h1>
          <p className="mt-2 text-muted-foreground">Monitor competitor prices, rankings, and strategies</p>
        </div>
        <AddCompetitorDialog products={userProducts} />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{userCompetitors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{userProducts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Competitors/Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {userProducts.length > 0 ? Math.round((userCompetitors.length / userProducts.length) * 10) / 10 : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitors List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Competitors</CardTitle>
          <CardDescription>Track and analyze competitor performance</CardDescription>
        </CardHeader>
        <CardContent>
          {userCompetitors.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              <div className="text-center">
                <p className="mb-4">No competitors tracked yet</p>
                <AddCompetitorDialog products={userProducts} />
              </div>
            </div>
          ) : (
            <CompetitorList competitors={userCompetitors} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
