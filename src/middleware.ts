import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE, verifySessionToken } from "@/lib/members/auth";

// Gate for the members portal (/members/*) and its APIs (/api/members/*).
// The legacy /portal page is untouched.
const PUBLIC_PATHS = new Set(["/members/login", "/api/members/login", "/api/members/logout"]);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const session = await verifySessionToken(req.cookies.get(MEMBER_COOKIE)?.value);

  if (PUBLIC_PATHS.has(pathname)) {
    if (pathname === "/members/login" && session) {
      return NextResponse.redirect(new URL("/members", req.url));
    }
    return NextResponse.next();
  }

  if (session) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Members only. Enter your personal code first." }, { status: 401 });
  }
  const login = new URL("/members/login", req.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/members", "/members/:path*", "/api/members/:path*"],
};
