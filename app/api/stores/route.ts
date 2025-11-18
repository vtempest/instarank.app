import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { stores } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { successResponse, errorResponse, paginatedResponse } from "@/lib/api/response"
import { getSession } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const userStores = await db.query.stores.findMany({
      where: eq(stores.userId, session.user.id),
      limit,
      offset,
      orderBy: [desc(stores.createdAt)],
      with: {
        products: {
          limit: 5,
        },
      },
    })

    const total = await db.query.stores.findMany({
      where: eq(stores.userId, session.user.id),
    })

    return paginatedResponse(userStores, page, limit, total.length)
  } catch (error: any) {
    console.error("[v0] Error fetching stores:", error)
    return errorResponse("Failed to fetch stores", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { name, marketplace, sellerId } = body

    if (!name) {
      return errorResponse("Store name is required", 400)
    }

    const newStore = await db.insert(stores).values({
      userId: session.user.id,
      name,
      marketplace: marketplace || "US",
      sellerId,
    }).returning()

    return successResponse(newStore[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating store:", error)
    return errorResponse("Failed to create store", 500)
  }
}
