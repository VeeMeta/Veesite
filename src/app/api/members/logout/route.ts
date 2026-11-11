import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE, cookieOptions } from "@/lib/members/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const isForm = (req.headers.get("content-type") || "").includes("form");
  const res = isForm
    ? NextResponse.redirect(new URL("/members/login?bye=1", req.url), 303)
    : NextResponse.json({ ok: true });
  res.cookies.set(MEMBER_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
}
