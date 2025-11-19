-- Better Auth schema for authentication tables
-- This creates the tables needed by better-auth with proper relationships

-- Users table already exists, but we need to ensure email is unique
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users(email);

-- Add email_verified column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='email_verified') THEN
    ALTER TABLE users ADD COLUMN email_verified boolean DEFAULT false;
  END IF;
END $$;

-- Add image column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='image') THEN
    ALTER TABLE users ADD COLUMN image text;
  END IF;
END $$;

-- Sessions table already exists, ensure it has the right structure
-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='sessions' AND column_name='updated_at') THEN
    ALTER TABLE sessions ADD COLUMN updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;
  END IF;
END $$;

-- Add ip_address and user_agent columns to sessions
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='sessions' AND column_name='ip_address') THEN
    ALTER TABLE sessions ADD COLUMN ip_address character varying;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='sessions' AND column_name='user_agent') THEN
    ALTER TABLE sessions ADD COLUMN user_agent text;
  END IF;
END $$;

-- Accounts table already exists, ensure it has all required columns
-- Add expires_in column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='accounts' AND column_name='expires_in') THEN
    ALTER TABLE accounts ADD COLUMN expires_in integer;
  END IF;
END $$;

-- Create verification tokens table for email verification
CREATE TABLE IF NOT EXISTS verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier character varying NOT NULL,
  token character varying NOT NULL,
  expires timestamp without time zone NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Create unique index on identifier and token
CREATE UNIQUE INDEX IF NOT EXISTS verification_tokens_identifier_token_key 
  ON verification_tokens(identifier, token);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_session_token_idx ON sessions(session_token);
CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions(expires);
CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON accounts(user_id);
CREATE INDEX IF NOT EXISTS accounts_provider_provider_account_id_idx ON accounts(provider, provider_account_id);

-- Add foreign key constraints if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'sessions_user_id_fkey'
  ) THEN
    ALTER TABLE sessions 
      ADD CONSTRAINT sessions_user_id_fkey 
      FOREIGN KEY (user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'accounts_user_id_fkey'
  ) THEN
    ALTER TABLE accounts 
      ADD CONSTRAINT accounts_user_id_fkey 
      FOREIGN KEY (user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE;
  END IF;
END $$;

-- Create a function to clean up expired sessions
CREATE OR REPLACE FUNCTION delete_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM sessions WHERE expires < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Insert a comment to track this migration
COMMENT ON TABLE verification_tokens IS 'Better Auth verification tokens - Created by migration 003';
