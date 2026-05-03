import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // NextAuth v5 uses "authjs.session-token" (dev) or "__Secure-authjs.session-token" (prod/https)
  const isSecure = req.nextUrl.protocol === "https:"
  const cookieName = isSecure ? "__Secure-authjs.session-token" : "authjs.session-token"

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName,
  })

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    if ((token as { role?: string }).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
