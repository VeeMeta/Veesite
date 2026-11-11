import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE, checkMemberCode, cookieOptions, createSessionToken, getPortalConfig, safeNext } from "@/lib/members/auth";
import { clientIp, hit, peek, reset, sleep } from "@/lib/members/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILS = 5; // wrong codes per IP per window
const WINDOW_MS = 15 * 60 * 1000;
const WRONG_CODE_DELAY_MS = 900;

export async function POST(req: NextRequest) {
  const isForm = (req.headers.get("content-type") || "").includes("form");
  let code = "";
  let next = "/members";
  try {
    if (isForm) {
      const fd = await req.formData();
      code = String(fd.get("code") || "");
      next = safeNext(fd.get("next"));
    } else {
      const body = await req.json();
      code = String(body?.code || "");
      next = safeNext(body?.next);
    }
  } catch {
    return reply(isForm, req, 400, { ok: false, error: "Enter your personal code." });
  }

  const cfg = getPortalConfig();
  if (!cfg) {
    return reply(isForm, req, 503, { ok: false, error: "The members portal isn’t switched on yet. Please check back soon." });
  }

  const key = "login:" + clientIp(req.headers);
  if (!peek(key, MAX_FAILS)) {
    const r = hit(key, MAX_FAILS, WINDOW_MS);
    return reply(isForm, req, 429, { ok: false, error: `Too many attempts. Try again in ${Math.ceil(r.retryAfter / 60)} min.` }, r.retryAfter);
  }

  const memberId = code.length > 0 && code.length <= 128 ? await checkMemberCode(code, cfg) : null;
  if (memberId) {
    reset(key);
    const { token, maxAge } = await createSessionToken(cfg, memberId);
    const res = isForm
      ? NextResponse.redirect(new URL(next, req.url), 303)
      : NextResponse.json({ ok: true, next });
    res.cookies.set(MEMBER_COOKIE, token, cookieOptions(maxAge));
    return res;
  }

  hit(key, MAX_FAILS, WINDOW_MS);
  await sleep(WRONG_CODE_DELAY_MS);
  return reply(isForm, req, 401, { ok: false, error: "That code didn’t work. Check it and try again." });
}

function reply(isForm: boolean, req: NextRequest, status: number, body: { ok: boolean; error: string }, retryAfter?: number) {
  if (isForm) {
    const url = new URL("/members/login", req.url);
    url.searchParams.set("error", status === 429 ? "rate" : status === 503 ? "off" : "code");
    return NextResponse.redirect(url, 303);
  }
  const res = NextResponse.json(body, { status });
  if (retryAfter) res.headers.set("Retry-After", String(retryAfter));
  return res;
}
