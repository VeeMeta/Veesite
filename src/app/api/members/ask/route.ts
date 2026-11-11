import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE, verifySessionToken } from "@/lib/members/auth";
import { clientIp, hit } from "@/lib/members/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(MEMBER_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Members only." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real members never see or fill this field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true, mode: "email" });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const question = clean(body.question, 4000);
  const workbook = clean(body.workbook, 120) || "BOW META workbook";
  const part = clean(body.part, 120) || "General";
  const answers = clean(body.answers, 12000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Add your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Add a valid email so Vee can reply.";
  if (question.length < 5) errors.question = "Write your question (at least a few words).";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 422 });

  const rl = hit("ask:" + clientIp(req.headers), 6, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "You’ve sent a few questions already. Try again in a few minutes." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });
  }

  const memberId = session.memberId;
  const subject = `Workbook question: ${workbook} · ${part} (member ${memberId}, from ${name})`;
  const text = [
    `From: ${name} <${email}>`,
    `Member ID: ${memberId}`,
    `Workbook: ${workbook}`,
    `About: ${part}`,
    "",
    "Question:",
    question,
    ...(answers ? ["", "— Their answers from this Part —", answers] : []),
    "",
    "Sent from the BOW META members portal.",
  ].join("\n");

  // Destination is server-side only (never imported into client components).
  const to = (process.env.QUESTIONS_TO_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUESTIONS_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "BOW META Portal <portal@veemeta.com>";

  if (apiKey && to.length) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject,
          text,
        }),
      });
      if (r.ok) return NextResponse.json({ ok: true, mode: "email" });
      console.error("Resend error", r.status, await r.text().catch(() => ""));
    } catch (e) {
      console.error("Resend request failed", e);
    }
  }

  // Fallback: hand the member a ready-to-send mailto link.
  // If QUESTIONS_TO_EMAIL isn't set, don't invent a destination (and never
  // fall back to a personal address from the public site config).
  if (!to.length) {
    return NextResponse.json({ ok: false, error: "Questions aren’t configured yet. Please try again later." }, { status: 503 });
  }
  const mailBody = text.length > 1800 ? text.slice(0, 1800) + "\n…(answers trimmed — attach your exported answers if needed)" : text;
  const mailto = `mailto:${to[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  return NextResponse.json({ ok: true, mode: "mailto", mailto });
}
