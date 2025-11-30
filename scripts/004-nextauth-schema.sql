-- NextAuth.js compatible schema migration
-- Run this to update tables for NextAuth compatibility

-- Update users table if needed
ALTER TABLE users 
  ALTER COLUMN email_verified TYPE timestamp USING email_verified::timestamp;

-- Drop old accounts table and recreate for NextAuth
DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE accounts (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  PRIMARY KEY (provider, provider_account_id)
);

-- Drop old sessions table and recreate for NextAuth
DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  session_token VARCHAR(255) NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

-- Drop old verification_tokens table and recreate for NextAuth
DROP TABLE IF EXISTS verification_tokens CASCADE;

CREATE TABLE verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
