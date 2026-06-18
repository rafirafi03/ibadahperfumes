import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminPath = request.nextUrl.pathname.replace(/^\/admin/, "") || "/";
  const redirectUrl = new URL(adminPath, ADMIN_URL);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
