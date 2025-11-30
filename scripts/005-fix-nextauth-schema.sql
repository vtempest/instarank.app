-- NextAuth.js compatible schema migration (fixed)
-- This properly handles the email_verified column type change

-- First, add a new column for the timestamp version
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP;

-- Copy any existing verified status (set to now() if true, null if false)
UPDATE users SET email_verified_at = CASE 
  WHEN email_verified = true THEN NOW() 
  ELSE NULL 
END WHERE email_verified_at IS NULL;

-- Drop the old boolean column
ALTER TABLE users DROP COLUMN IF EXISTS email_verified;

-- Rename the new column to email_verified
ALTER TABLE users RENAME COLUMN email_verified_at TO email_verified;

-- The accounts table already exists with the right structure based on the schema
-- Just ensure session_token column exists on sessions if needed
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS session_token VARCHAR(255);

-- Create unique constraint on session_token if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'sessions_session_token_key'
  ) THEN
    ALTER TABLE sessions ADD CONSTRAINT sessions_session_token_key UNIQUE (session_token);
  END IF;
END $$;

-- Ensure verification_tokens has proper primary key
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'verification_tokens_pkey'
  ) THEN
    -- Drop id column if it exists and create composite key
    ALTER TABLE verification_tokens DROP COLUMN IF EXISTS id;
    ALTER TABLE verification_tokens ADD PRIMARY KEY (identifier, token);
  END IF;
EXCEPTION WHEN others THEN
  -- Primary key already exists, ignore
  NULL;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_token ON sessions(session_token);
