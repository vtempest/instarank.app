import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { products, stores } from "@/lib/db/schema"
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
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const storeId = searchParams.get("storeId")
    const offset = (page - 1) * limit

    const whereConditions = []
    if (storeId) {
      whereConditions.push(eq(products.storeId, storeId))
    }

    const userProducts = await db.select({
      product: products,
      store: stores,
    })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(and(
        eq(stores.userId, session.user.id),
        ...whereConditions
      ))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(products.createdAt))

    const totalResult = await db.select({ count: sql<number>`count(*)` })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(and(
        eq(stores.userId, session.user.id),
        ...whereConditions
      ))

    return paginatedResponse(
      userProducts.map(p => ({ ...p.product, store: p.store })),
      page,
      limit,
      Number(totalResult[0]?.count || 0)
    )
  } catch (error: any) {
    console.error("[v0] Error fetching products:", error)
    return errorResponse("Failed to fetch products", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { storeId, asin, title, description, bulletPoints, price, imageUrl, category } = body

    if (!storeId || !asin) {
      return errorResponse("Store ID and ASIN are required", 400)
    }

    // Verify store belongs to user
    const store = await db.query.stores.findFirst({
      where: and(
        eq(stores.id, storeId),
        eq(stores.userId, session.user.id)
      ),
    })

    if (!store) {
      return errorResponse("Store not found", 404)
    }

    const newProduct = await db.insert(products).values({
      storeId,
      asin,
      title,
      description,
      bulletPoints,
      price,
      imageUrl,
      category,
    }).returning()

    return successResponse(newProduct[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating product:", error)
    return errorResponse("Failed to create product", 500)
  }
}
