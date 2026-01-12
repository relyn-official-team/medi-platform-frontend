import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    const pathname = req.nextUrl.pathname;

    if (
      pathname.startsWith("/auth/admin") ||
      pathname.startsWith("/auth/hospital") ||
      pathname.startsWith("/auth/agency") ||
      pathname.startsWith("/auth/chat")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/admin/:path*",
    "/auth/hospital/:path*",
    "/auth/agency/:path*",
    "/auth/chat/:path*",
  ],
};
