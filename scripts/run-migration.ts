import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

async function runMigration() {
  if (!process.env.NEON_NEON_DATABASE_URL) {
    throw new Error("NEON_DATABASE_URL is not defined")
  }

  const sql = neon(process.env.NEON_DATABASE_URL)

  console.log("[v0] Starting database migration...")

  try {
    // Read and execute the SQL migration file
    const migrationSQL = readFileSync(join(process.cwd(), "scripts", "001_create_tables.sql"), "utf-8")

    await sql(migrationSQL)

    console.log("[v0] ✅ Database migration completed successfully!")
    console.log(
      "[v0] Tables created: users, stores, products, competitors, keywords, generated_content, social_accounts, usage_tracking",
    )
  } catch (error) {
    console.error("[v0] ❌ Migration failed:", error)
    throw error
  }
}

runMigration()
