# Fix: Better Auth Verification Table Schema Error

## Problem

```
The field "value" does not exist in the "verification" Drizzle schema.
```

This error occurs when the Better Auth verification table in your database doesn't have the required `value` column.

## Root Cause

The verification table exists in your database but is missing the `value` field that Better Auth expects. This typically happens when:

1. The database was created with an older schema
2. Migrations weren't fully applied
3. The table was manually created without all required fields

## Solution

Run the verification table migration to add the missing field and create the proper schema:

### Option 1: Using npm script (Recommended)

```bash
npm run db:migrate:verification
```

### Option 2: Manual migration

If you have database access, run the SQL directly:

```sql
-- Drop the old verification table if it exists
DROP TABLE IF EXISTS verification;

-- Create the verification table with all required fields
CREATE TABLE IF NOT EXISTS verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verification_identifier ON verification(identifier);
CREATE INDEX IF NOT EXISTS idx_verification_expires_at ON verification(expires_at);
```

### Option 3: Using Drizzle Kit Push

```bash
# Generate the latest schema
npm run db:generate

# Push to database
npx drizzle-kit push
```

## Required Environment Variables

Make sure you have one of these environment variables set:

- `DATABASE_URL` - Your PostgreSQL/Neon database connection string
- `NEON_NEON_DATABASE_URL` - Your Neon database connection string

## Verification

After running the migration, restart your application and verify:

1. The error should no longer appear
2. Email verification and other auth flows should work correctly
3. You can verify the table exists with:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'verification';
```

Expected columns:
- `id` (uuid)
- `identifier` (character varying)
- `value` (character varying)
- `expires_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Files Created/Modified

- ✅ `scripts/run-verification-migration.ts` - Migration runner script
- ✅ `package.json` - Added `db:migrate:verification` script
- ✅ `drizzle/0000_tough_starjammers.sql` - Drizzle migration file with correct schema
- ℹ️ `scripts/007-add-verification-table.sql` - Existing migration (already correct)

## Related Documentation

- Better Auth Drizzle Adapter: https://www.better-auth.com/docs/adapters/drizzle
- Drizzle Kit: https://orm.drizzle.team/kit-docs/overview
