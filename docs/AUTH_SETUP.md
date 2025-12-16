# Better Auth Setup Guide

## Overview

InstaRank uses [better-auth](https://better-auth.com) for authentication with Google OAuth and Google One Tap integration.

## Database Schema

The following tables support authentication:

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `name`: User's display name
- `password_hash`: Hashed password (for email/password auth)
- `image`: Profile image URL
- `email_verified`: Email verification timestamp
- Plus subscription and billing fields

### Sessions Table
- `id`: UUID primary key
- `session_token`: Unique session identifier
- `user_id`: Foreign key to users table
- `expires`: Session expiration timestamp
- `ip_address`: User's IP address
- `user_agent`: Browser user agent

### Accounts Table
- `id`: UUID primary key
- `user_id`: Foreign key to users table
- `provider`: OAuth provider (e.g., "google")
- `provider_account_id`: Provider's user ID
- `access_token`: OAuth access token
- `refresh_token`: OAuth refresh token
- `expires_at`: Token expiration timestamp

### Verification Tokens Table
- `identifier`: Email or other identifier
- `token`: Verification token
- `expires`: Token expiration timestamp

## Authentication Flow

### Google OAuth Sign In (Standard Redirect Flow)

1. User clicks "Continue with Google" button
2. `GoogleSignInButton` calls `authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })`
3. User is redirected to Google's OAuth consent screen
4. After approval, Google redirects to `/api/auth/callback/google`
5. better-auth creates/updates user account and session
6. User is redirected to `/dashboard` (or callback URL)

### Google One Tap

1. `GoogleOneTap` component mounts on login/signup pages
2. After 1 second delay, it calls `authClient.oneTap()`
3. Google One Tap popup appears automatically
4. User can sign in with one click
5. Session is created automatically

## Environment Variables

Required environment variables:

```bash
# Better Auth
BETTER_AUTH_SECRET=<random-secret-key>
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>

# Database
DATABASE_URL=<your-neon-database-url>
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

## Files Structure

```
lib/
├── auth.ts                    # Server-side auth configuration
├── auth-client.ts            # Client-side auth client
└── db/
    └── schema.ts             # Database schema with auth tables

app/
├── api/
│   └── auth/
│       └── [...all]/
│           └── route.ts      # Auth API routes handler
├── login/
│   └── page.tsx             # Login page
└── signup/
    └── page.tsx             # Signup page

components/
└── auth/
    ├── google-signin-button.tsx  # Google sign in button
    └── google-onetap.tsx         # Google One Tap component

middleware.ts                 # Protects /dashboard routes

scripts/
└── 003-better-auth-schema.sql # Database migration for auth tables
```

## Usage in Code

### Check if user is signed in (Server Component)

```typescript
import { getSession } from "@/lib/auth"

export default async function Page() {
  const { user, session } = await getSession()
  
  if (!user) {
    // User is not signed in
    return <div>Please sign in</div>
  }
  
  return <div>Welcome, {user.name}!</div>
}
```

### Check if user is signed in (Client Component)

```typescript
"use client"

import { useSession } from "@/lib/auth-client"

export function UserProfile() {
  const { data: session, isPending } = useSession()
  
  if (isPending) {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return <div>Not signed in</div>
  }
  
  return <div>Welcome, {session.user.name}!</div>
}
```

### Sign Out

```typescript
"use client"

import { authClient } from "@/lib/auth-client"

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = "/"
  }
  
  return <button onClick={handleSignOut}>Sign Out</button>
}
```

## Middleware Protection

The `middleware.ts` file protects all `/dashboard` routes:

```typescript
export async function middleware(request: NextRequest) {
  if (pathname.startsWith("/dashboard")) {
    const sessionToken = request.cookies.get("better-auth.session_token")
    
    if (!sessionToken) {
      // Redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  
  return NextResponse.next()
}
```

## Testing

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to `/dashboard`

## Troubleshooting

### "Failed to initialize auth client"
- Check that all environment variables are set
- Verify Google OAuth credentials are correct

### Google One Tap doesn't appear
- Check browser console for errors
- Ensure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- One Tap may be blocked by browser settings or ad blockers

### Redirect URI mismatch
- Verify redirect URIs in Google Cloud Console match your app URL
- Format: `{BASE_URL}/api/auth/callback/google`

### Session not persisting
- Check that cookies are enabled
- Verify `BETTER_AUTH_SECRET` is set
- Check database connection
