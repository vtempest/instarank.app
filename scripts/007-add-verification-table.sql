-- Add verification table for better-auth
-- This table is used for email verification and other verification flows

CREATE TABLE IF NOT EXISTS verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create index on identifier for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_identifier ON verification(identifier);

-- Create index on expiresAt for cleanup queries
CREATE INDEX IF NOT EXISTS idx_verification_expires_at ON verification(expires_at);
