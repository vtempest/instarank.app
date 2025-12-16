# BetterAuth Setup Guide

This application uses [BetterAuth](https://www.better-auth.com/) for authentication with Google OAuth and Google One Tap sign-in.

## Features

- Google OAuth authentication
- Google One Tap sign-in for seamless login experience
- Session management with 7-day expiration
- Protected dashboard routes via middleware
- Secure server-side session handling

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# BetterAuth
BETTER_AUTH_SECRET=your-secret-key-here-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/dbname
NEON_DATABASE_URL=postgresql://user:password@host/dbname
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
8. Copy Client ID and Client Secret to your `.env.local`

## Database Schema

BetterAuth requires specific tables. The required schema is:

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table (for OAuth)
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  scope TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider_id, account_id)
);

-- Sessions table
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How It Works

### Server-Side Authentication

The auth configuration is in `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { oneTap } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), { provider: "pg" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [oneTap()],
})
```

### Client-Side Authentication

The client configuration is in `lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react"
import { oneTapClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }),
  ],
})
```

### Protected Routes

The `middleware.ts` file protects dashboard routes:

```typescript
export async function middleware(request: NextRequest) {
  if (pathname.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
}
```

### Google One Tap

The `GoogleOneTap` component automatically shows the One Tap dialog on login/signup pages:

```typescript
await authClient.oneTap({
  fetchOptions: {
    onSuccess: () => {
      router.push("/dashboard")
    },
  },
})
```

## Usage in Components

### Sign In

```typescript
import { authClient } from "@/lib/auth-client"

await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
})
```

### Sign Out

```typescript
import { logout } from "@/lib/auth/actions"

// In a server action or form
await logout()
```

### Get Session (Server)

```typescript
import { getSession } from "@/lib/auth/session"

const session = await getSession()
if (session) {
  console.log(session.user.email)
}
```

### Get Session (Client)

```typescript
import { useSession } from "@/lib/auth-client"

const { data: session, isPending } = useSession()
```

## Migration from NextAuth

If migrating from NextAuth:

1. Update `package.json` to use `better-auth`
2. Replace auth configuration files
3. Update all `signIn`, `signOut`, `useSession` imports
4. Update middleware to use BetterAuth's session API
5. Update database schema to match BetterAuth's requirements
6. Test all authentication flows

## Troubleshooting

### One Tap not showing

- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Check browser console for errors
- Ensure you're on an https:// domain (or localhost)
- Clear cookies and try again

### Redirect URI mismatch

- Verify redirect URIs in Google Cloud Console match exactly
- Include both http://localhost:3000 and your production URL
- Don't forget `/api/auth/callback/google` path

### Session not persisting

- Check `BETTER_AUTH_SECRET` is at least 32 characters
- Verify database connection is working
- Check browser cookies are enabled

## Resources

- [BetterAuth Documentation](https://www.better-auth.com/docs)
- [BetterAuth One Tap Plugin](https://www.better-auth.com/docs/plugins/one-tap)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
