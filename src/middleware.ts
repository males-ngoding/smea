import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes and API
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/berita")
  ) {
    return NextResponse.next();
  }

  // Check session for protected routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    try {
      const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
          baseURL: request.nextUrl.origin,
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      // Jika tidak ada session, redirect ke login
      if (!session) {
        return NextResponse.redirect(new URL("/auth", request.url));
      }

      // Session valid, lanjutkan
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
