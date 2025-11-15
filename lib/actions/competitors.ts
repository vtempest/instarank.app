"use server"

import { db } from "@/lib/db"
import { competitors, products, stores } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/session"
import { eq, and } from "drizzle-orm"
import { z } from "zod"

const addCompetitorSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  asin: z.string().min(10, "ASIN must be at least 10 characters").max(10, "ASIN must be 10 characters"),
})

export async function addCompetitor(formData: FormData) {
  try {
    const session = await getSession()

    if (!session) {
      return { error: "Unauthorized" }
    }

    // Validate input
    const rawData = {
      productId: formData.get("productId"),
      asin: formData.get("asin"),
    }

    const validatedData = addCompetitorSchema.parse(rawData)

    try {
      // Verify the product belongs to the user
      const [product] = await db
        .select()
        .from(products)
        .innerJoin(stores, eq(products.storeId, stores.id))
        .where(and(eq(products.id, validatedData.productId), eq(stores.userId, session.id)))
        .limit(1)

      if (!product) {
        return { error: "Product not found or unauthorized" }
      }

      // Check if competitor already exists for this product
      const [existingCompetitor] = await db
        .select()
        .from(competitors)
        .where(and(eq(competitors.productId, validatedData.productId), eq(competitors.asin, validatedData.asin)))
        .limit(1)

      if (existingCompetitor) {
        return { error: "This competitor is already being tracked for this product" }
      }

      // In a real app, you would scrape Amazon data here
      // For now, we'll create a placeholder competitor
      const mockCompetitorData = {
        title: `Competitor Product ${validatedData.asin}`,
        price: (Math.random() * 50 + 10).toFixed(2),
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 5000) + 100,
        rank: Math.floor(Math.random() * 10000) + 1,
        imageUrl: `/placeholder.svg?height=200&width=200&query=amazon product`,
      }

      // Add competitor
      await db.insert(competitors).values({
        productId: validatedData.productId,
        asin: validatedData.asin,
        ...mockCompetitorData,
        lastScrapedAt: new Date(),
      })

      return { success: true }
    } catch (dbError: any) {
      // Handle database not initialized error
      if (dbError?.code === '42P01') {
        return { error: "Database not initialized. Please run the migration script first." }
      }
      throw dbError
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("[v0] Add competitor error:", error)
    return { error: "Failed to add competitor. Please try again." }
  }
}

export async function deleteCompetitor(competitorId: string) {
  try {
    const session = await getSession()

    if (!session) {
      return { error: "Unauthorized" }
    }

    try {
      // Verify the competitor belongs to the user's product
      const [competitor] = await db
        .select()
        .from(competitors)
        .innerJoin(products, eq(competitors.productId, products.id))
        .innerJoin(stores, eq(products.storeId, stores.id))
        .where(and(eq(competitors.id, competitorId), eq(stores.userId, session.id)))
        .limit(1)

      if (!competitor) {
        return { error: "Competitor not found or unauthorized" }
      }

      // Delete competitor
      await db.delete(competitors).where(eq(competitors.id, competitorId))

      return { success: true }
    } catch (dbError: any) {
      // Handle database not initialized error
      if (dbError?.code === '42P01') {
        return { error: "Database not initialized. Please run the migration script first." }
      }
      throw dbError
    }
  } catch (error) {
    console.error("[v0] Delete competitor error:", error)
    return { error: "Failed to delete competitor. Please try again." }
  }
}
