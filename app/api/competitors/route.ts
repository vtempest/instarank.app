import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { competitors, products, stores } from "@/lib/db/schema"
import { eq, and, desc, sql } from "drizzle-orm"
import { successResponse, errorResponse, paginatedResponse } from "@/lib/api/response"
import { getSession } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    if (!productId) {
      return errorResponse("Product ID is required", 400)
    }

    const competitorsList = await db.query.competitors.findMany({
      where: eq(competitors.productId, productId),
      limit,
      offset,
      orderBy: [desc(competitors.rank)],
    })

    const total = await db.select({ count: sql<number>`count(*)` })
      .from(competitors)
      .where(eq(competitors.productId, productId))

    return paginatedResponse(competitorsList, page, limit, Number(total[0]?.count || 0))
  } catch (error: any) {
    console.error("[v0] Error fetching competitors:", error)
    return errorResponse("Failed to fetch competitors", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { productId, asin, title, price, rating, reviewCount, rank, imageUrl } = body

    if (!productId || !asin) {
      return errorResponse("Product ID and ASIN are required", 400)
    }

    const newCompetitor = await db.insert(competitors).values({
      productId,
      asin,
      title,
      price,
      rating,
      reviewCount,
      rank,
      imageUrl,
      lastScrapedAt: new Date(),
    }).returning()

    return successResponse(newCompetitor[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating competitor:", error)
    return errorResponse("Failed to create competitor", 500)
  }
}
