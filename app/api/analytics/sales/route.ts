import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { salesData, products, stores } from "@/lib/db/schema"
import { eq, and, desc, gte, lte } from "drizzle-orm"
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

    const conditions = [eq(salesData.productId, productId)]
    if (startDate) conditions.push(gte(salesData.date, new Date(startDate)))
    if (endDate) conditions.push(lte(salesData.date, new Date(endDate)))

    const sales = await db.query.salesData.findMany({
      where: and(...conditions),
      orderBy: [desc(salesData.date)],
      limit: 100,
    })

    return successResponse(sales)
  } catch (error: any) {
    console.error("[v0] Error fetching sales data:", error)
    return errorResponse("Failed to fetch sales data", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    const { productId, estimatedSales, revenue, date } = body

    if (!productId) {
      return errorResponse("Product ID is required", 400)
    }

    const newEntry = await db.insert(salesData).values({
      productId,
      estimatedSales,
      revenue,
      date: date ? new Date(date) : new Date(),
    }).returning()

    return successResponse(newEntry[0], 201)
  } catch (error: any) {
    console.error("[v0] Error creating sales data entry:", error)
    return errorResponse("Failed to create sales data", 500)
  }
}
