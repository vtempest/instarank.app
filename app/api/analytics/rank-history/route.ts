import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { rankHistory, products, stores } from "@/lib/db/schema"
import { eq, and, desc, gte, lte, sql } from "drizzle-orm"
import { successResponse, errorResponse } from "@/lib/api/response"
import { getSession } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!productId) {
      return errorResponse("Product ID is required", 400)
    }

    const conditions = [eq(rankHistory.productId, productId)]
    if (startDate) conditions.push(gte(rankHistory.date, new Date(startDate)))
    if (endDate) conditions.push(lte(rankHistory.date, new Date(endDate)))

    const history = await db.query.rankHistory.findMany({
      where: and(...conditions),
      orderBy: [desc(rankHistory.date)],
      limit: 100,
    })

    return successResponse(history)
  } catch (error: any) {
    console.error("[v0] Error fetching rank history:", error)
    return errorResponse("Failed to fetch rank history", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { productId, rank, date } = body

    if (!productId || !rank) {
      return errorResponse("Product ID and rank are required", 400)
    }

    const newEntry = await db.insert(rankHistory).values({
      productId,
      rank,
      date: date ? new Date(date) : new Date(),
    }).returning()

    return successResponse(newEntry[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating rank history entry:", error)
    return errorResponse("Failed to create rank history", 500)
  }
}
