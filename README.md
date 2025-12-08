# InstaRank - Amazon Seller Analytics & AI Content Platform

InstaRank is a comprehensive SaaS platform designed for Amazon sellers to track rankings, analyze competitors, research keywords, and generate AI-powered content. Built with Next.js 16, React 19, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Store Management**: Connect and manage multiple Amazon seller stores
- **Product Tracking**: Monitor your product listings across different marketplaces
- **Competitor Analysis**: Track competitor products, prices, and rankings
- **Keyword Research**: Discover and track high-performing keywords
- **Analytics Dashboard**: Real-time sales data and ranking history visualization
- **AI Content Generation**: Create optimized product listings, blog posts, and social media content
- **Social Media Integration**: Connect and schedule posts across multiple platforms

### Authentication & Security
- **Better-Auth Integration**: Modern authentication system with enhanced security
- **Google OAuth**: Sign in with Google account
- **Google One Tap**: Seamless one-click authentication experience
- **Session Management**: Secure cookie-based sessions with configurable expiration
- **Email/Password**: Traditional authentication with password hashing

### API & Documentation
- **RESTful API**: Well-structured API endpoints for all platform features
- **OpenAPI 3.1 Specification**: Complete API documentation
- **Scalar UI**: Interactive API documentation with live testing
- **Type-Safe**: Full TypeScript support across the stack

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Authentication Setup](#authentication-setup)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.x
- **Components**: Radix UI primitives
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **State Management**: SWR for data fetching

### Backend
- **Runtime**: Node.js
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Vercel Postgres)
- **Authentication**: Better-Auth 1.4.3
- **API Documentation**: OpenAPI 3.1 + Scalar UI

### Development Tools
- **Language**: TypeScript 5
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **Package Manager**: npm

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use Vercel Postgres)
- Google OAuth credentials
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/v0-insta-rank-2.git
cd v0-insta-rank-2
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Run database migrations**
```bash
npm run db:migrate
```

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🔐 Authentication Setup

InstaRank uses [Better-Auth](https://better-auth.com) for authentication, providing a modern and secure authentication system.

### Features Implemented

1. **Email/Password Authentication**
   - Secure password hashing with bcrypt
   - Email verification (configurable)
   - Password reset functionality

2. **Google OAuth & One Tap**
   - Sign in with Google account
   - Google One Tap for seamless authentication
   - Automatic account creation on first sign-in

3. **Session Management**
   - Cookie-based sessions
   - 7-day session expiration (configurable)
   - Automatic session refresh
   - Session caching for performance

### Google OAuth Setup

1. **Create Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

2. **Configure Environment Variables**
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
```

3. **Google One Tap Configuration**
   - One Tap is automatically enabled when Google OAuth is configured
   - The prompt appears on the login page
   - Users can sign in with a single click
   - Supports automatic sign-in for returning users

### Better-Auth Configuration

The auth configuration is located at `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { /* ... */ }
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      oneTap: true, // Enable Google One Tap
    },
  },
  // ... more configuration
})
```

### Client-Side Usage

```typescript
import { authClient, useSession, signIn, signOut } from "@/lib/auth-client"

// In a component
function MyComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      <p>Welcome {session.user.name}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Server-Side Usage

```typescript
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers
  })

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Your authenticated logic here
}
```

## 🗄 Database Setup

InstaRank uses PostgreSQL with Drizzle ORM for type-safe database operations.

### Database Schema

The application includes comprehensive schemas for:
- **Users & Authentication**: User profiles, sessions, accounts
- **Stores**: Amazon seller store information
- **Products**: Product listings and metadata
- **Competitors**: Competitor tracking data
- **Keywords**: Keyword research and rankings
- **Analytics**: Sales data and rank history
- **Content**: AI-generated content storage
- **Social**: Social media account connections

### Running Migrations

```bash
# Generate migrations from schema
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Migration Scripts

The project includes SQL migration scripts in `/scripts`:
- `003-better-auth-schema.sql`: Sets up Better-Auth tables
- Additional migrations for app-specific tables

## 📚 API Documentation

InstaRank provides comprehensive API documentation using OpenAPI 3.1 and Scalar UI.

### Accessing Documentation

Visit `/api-docs` in your browser to access the interactive API documentation.

**Development**: `http://localhost:3000/api-docs`
**Production**: `https://yourdomain.com/api-docs`

### Features

- **Interactive Testing**: Test API endpoints directly from the documentation
- **Authentication Support**: Built-in authentication handling
- **Request/Response Examples**: Complete examples for all endpoints
- **Schema Definitions**: Detailed type definitions for all data models

### Available Endpoints

#### Authentication
- `POST /api/auth/sign-in` - Email/password sign in
- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-out` - Sign out user
- `GET /api/auth/session` - Get current session

#### Stores
- `GET /api/stores` - List all stores
- `POST /api/stores` - Create new store
- `GET /api/stores/{id}` - Get store details
- `PUT /api/stores/{id}` - Update store
- `DELETE /api/stores/{id}` - Delete store

#### Products
- `GET /api/products` - List all products
- `POST /api/products` - Add new product
- `GET /api/products/{id}` - Get product details
- `PUT /api/products/{id}` - Update product

#### Competitors
- `GET /api/competitors` - List competitors
- `POST /api/competitors` - Add competitor

#### Keywords
- `GET /api/keywords` - Get keywords
- `POST /api/keywords` - Research new keywords

#### Analytics
- `GET /api/analytics/rank-history` - Get ranking history
- `GET /api/analytics/sales` - Get sales data

### OpenAPI Specification

The OpenAPI spec is defined in `lib/openapi-spec.ts` and includes:
- Complete endpoint documentation
- Request/response schemas
- Authentication requirements
- Error responses
- Data model definitions

## 📁 Project Structure

```
v0-insta-rank-2/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...all]/       # Better-Auth endpoints
│   │   ├── stores/              # Store management
│   │   ├── products/            # Product management
│   │   ├── competitors/         # Competitor tracking
│   │   ├── keywords/            # Keyword research
│   │   └── analytics/           # Analytics endpoints
│   ├── dashboard/               # Dashboard pages
│   ├── demo/                    # Demo mode pages
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── api-docs/                # API documentation (Scalar UI)
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   └── ui/                      # UI components (Radix UI)
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Better-Auth configuration
│   ├── auth-client.ts           # Client-side auth helpers
│   ├── db/                      # Database configuration
│   │   ├── index.ts            # Drizzle client
│   │   └── schema.ts           # Database schema
│   ├── openapi-spec.ts         # OpenAPI specification
│   └── utils.ts                # Utility functions
├── scripts/                     # Database migration scripts
├── public/                      # Static files
├── .env.local                   # Environment variables (create this)
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
POSTGRES_URL="postgresql://user:password@host:5432/database"
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/database"

# Better-Auth
BETTER_AUTH_SECRET="your-random-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Optional: Email service (for verification emails)
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-email-password"
SMTP_FROM="noreply@yourdomain.com"
```

### Generating Secrets

```bash
# Generate BETTER_AUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Import your repository on [Vercel](https://vercel.com)
   - Configure environment variables
   - Deploy!

3. **Set up Vercel Postgres**
   - Add Vercel Postgres to your project
   - Environment variables are automatically configured
   - Run migrations: `npm run db:migrate`

### Environment Variables on Vercel

Add all environment variables from `.env.local` to your Vercel project settings:
- Go to Project Settings → Environment Variables
- Add each variable
- Redeploy after adding variables

### Post-Deployment

1. **Update Google OAuth redirect URIs**
   - Add `https://yourdomain.com/api/auth/callback/google`

2. **Update environment variables**
   - Set `BETTER_AUTH_URL` to your production URL
   - Set `NEXT_PUBLIC_APP_URL` to your production URL

3. **Test authentication**
   - Try signing in with Google
   - Test Google One Tap
   - Verify session persistence

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
npm test             # Run tests
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Better-Auth](https://better-auth.com)
- UI Components from [Radix UI](https://radix-ui.com)
- API Documentation by [Scalar](https://scalar.com)
- Database ORM by [Drizzle](https://orm.drizzle.team)

## 📞 Support

For support, email support@instarank.com or open an issue on GitHub.

## 🔗 Links

- **Documentation**: [/api-docs](/api-docs)
- **Live Demo**: [https://yourdomain.com/demo](https://yourdomain.com/demo)
- **GitHub**: [https://github.com/yourusername/v0-insta-rank-2](https://github.com/yourusername/v0-insta-rank-2)

---

Made with ❤️ by the InstaRank Team
