import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { stores } from "@/lib/db/schema"
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

    const store = await db.query.stores.findFirst({
      where: and(
        eq(stores.id, params.id),
        eq(stores.userId, session.user.id)
      ),
      with: {
        products: true,
      },
    })

    if (!store) {
      return errorResponse("Store not found", 404)
    }

    return successResponse(store)
  } catch (error: any) {
    console.error("[v0] Error fetching store:", error)
    return errorResponse("Failed to fetch store", 500)
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
    const { name, marketplace, sellerId, isActive } = body

    const updated = await db.update(stores)
      .set({
        ...(name && { name }),
        ...(marketplace && { marketplace }),
        ...(sellerId !== undefined && { sellerId }),
        ...(isActive !== undefined && { isActive }),
        updatedAt: new Date(),
      })
      .where(and(
        eq(stores.id, params.id),
        eq(stores.userId, session.user.id)
      ))
      .returning()

    if (!updated.length) {
      return errorResponse("Store not found", 404)
    }

    return successResponse(updated[0])
  } catch (error: any) {
    console.error("[v0] Error updating store:", error)
    return errorResponse("Failed to update store", 500)
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

    const deleted = await db.delete(stores)
      .where(and(
        eq(stores.id, params.id),
        eq(stores.userId, session.user.id)
      ))
      .returning()

    if (!deleted.length) {
      return errorResponse("Store not found", 404)
    }

    return successResponse({ message: "Store deleted successfully" })
  } catch (error: any) {
    console.error("[v0] Error deleting store:", error)
    return errorResponse("Failed to delete store", 500)
  }
}
