import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { products, stores } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { successResponse, errorResponse } from "@/lib/api/response"
import { getSession } from "@/lib/auth/session"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, params.id),
      with: {
        store: true,
        competitors: true,
        keywords: true,
      },
    })

    if (!product) {
      return errorResponse("Product not found", 404)
    }

    // Verify product belongs to user's store
    if (product.store.userId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    return successResponse(product)
  } catch (error: any) {
    console.error("[v0] Error fetching product:", error)
    return errorResponse("Failed to fetch product", 500)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await request.json()
    
    const updated = await db.update(products)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(products.id, params.id))
      .returning()

    if (!updated.length) {
      return errorResponse("Product not found", 404)
    }

    return successResponse(updated[0])
  } catch (error: any) {
    console.error("[v0] Error updating product:", error)
    return errorResponse("Failed to update product", 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", 401)
    }

    const deleted = await db.delete(products)
      .where(eq(products.id, params.id))
      .returning()

    if (!deleted.length) {
      return errorResponse("Product not found", 404)
    }

    return successResponse({ message: "Product deleted successfully" })
  } catch (error: any) {
    console.error("[v0] Error deleting product:", error)
    return errorResponse("Failed to delete product", 500)
  }
}
