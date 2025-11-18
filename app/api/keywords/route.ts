import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { keywords, products, stores } from "@/lib/db/schema"
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

    const keywordsList = await db.query.keywords.findMany({
      where: eq(keywords.productId, productId),
      limit,
      offset,
      orderBy: [desc(keywords.searchVolume)],
    })

    const total = await db.select({ count: sql<number>`count(*)` })
      .from(keywords)
      .where(eq(keywords.productId, productId))

    return paginatedResponse(keywordsList, page, limit, Number(total[0]?.count || 0))
  } catch (error: any) {
    console.error("[v0] Error fetching keywords:", error)
    return errorResponse("Failed to fetch keywords", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { productId, keyword, searchVolume, competition, effectivenessScore, position } = body

    if (!productId || !keyword) {
      return errorResponse("Product ID and keyword are required", 400)
    }

    const newKeyword = await db.insert(keywords).values({
      productId,
      keyword,
      searchVolume,
      competition,
      effectivenessScore,
      position,
    }).returning()

    return successResponse(newKeyword[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating keyword:", error)
    return errorResponse("Failed to create keyword", 500)
  }
}
