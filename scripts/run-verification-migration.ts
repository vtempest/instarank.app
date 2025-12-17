import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

async function runVerificationMigration() {
  const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      "Database URL is not defined. Please set NEON_NEON_DATABASE_URL or DATABASE_URL environment variable.",
    )
  }

  const sql = neon(databaseUrl)

  console.log("Starting verification table migration...")

  try {
    // Read and execute the verification table migration
    const migrationSQL = readFileSync(
      join(process.cwd(), "scripts", "007-add-verification-table.sql"),
      "utf-8",
    )

    await sql(migrationSQL)

    console.log("✅ Verification table migration completed successfully!")
    console.log("   - Created verification table with all required fields (id, identifier, value, expires_at)")
    console.log("   - Added indexes for better performance")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    throw error
  }
}

runVerificationMigration()
  .then(() => {
    console.log("\n🎉 All migrations completed. You can now restart your application.")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Migration failed with error:", error)
    process.exit(1)
  })
