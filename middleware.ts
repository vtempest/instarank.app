import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // For now, allow all requests through
  // Auth will be handled by the auth system in the app
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
