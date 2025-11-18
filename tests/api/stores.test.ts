import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { db } from "@/lib/db"
import { stores, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

describe("Stores API", () => {
  let testUserId: string
  let testStoreId: string

  beforeAll(async () => {
    // Create a test user
    const [user] = await db.insert(users).values({
      email: "test@example.com",
      name: "Test User",
    }).returning()
    testUserId = user.id
  })

  afterAll(async () => {
    // Cleanup test data
    if (testStoreId) {
      await db.delete(stores).where(eq(stores.id, testStoreId))
    }
    if (testUserId) {
      await db.delete(users).where(eq(users.id, testUserId))
    }
  })

  it("should create a new store", async () => {
    const [store] = await db.insert(stores).values({
      userId: testUserId,
      name: "Test Store",
      marketplace: "US",
    }).returning()

    testStoreId = store.id

    expect(store).toBeDefined()
    expect(store.name).toBe("Test Store")
    expect(store.marketplace).toBe("US")
    expect(store.userId).toBe(testUserId)
  })

  it("should fetch stores for a user", async () => {
    const userStores = await db.query.stores.findMany({
      where: eq(stores.userId, testUserId),
    })

    expect(userStores).toBeDefined()
    expect(userStores.length).toBeGreaterThan(0)
    expect(userStores[0].name).toBe("Test Store")
  })

  it("should update a store", async () => {
    const [updated] = await db.update(stores)
      .set({ name: "Updated Store Name" })
      .where(eq(stores.id, testStoreId))
      .returning()

    expect(updated.name).toBe("Updated Store Name")
  })

  it("should delete a store", async () => {
    await db.delete(stores).where(eq(stores.id, testStoreId))

    const deleted = await db.query.stores.findFirst({
      where: eq(stores.id, testStoreId),
    })

    expect(deleted).toBeUndefined()
    testStoreId = "" // Clear so cleanup doesn't fail
  })
})
