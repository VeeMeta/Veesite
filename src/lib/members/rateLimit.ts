// Best-effort in-memory rate limiter. On Vercel each warm function instance
// keeps its own memory, so this slows down guessing rather than guaranteeing a
// global limit. Swap for Upstash/Vercel KV if the portal ever needs a hard cap.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function hit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (buckets.size > 5000) {
    buckets.forEach((b, k) => {
      if (b.resetAt < now) buckets.delete(k);
    });
  }
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  return { ok: b.count <= limit, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
}

export function peek(key: string, limit: number): boolean {
  const b = buckets.get(key);
  return !b || b.resetAt < Date.now() || b.count < limit;
}

export function reset(key: string) {
  buckets.delete(key);
}

export function clientIp(headers: Headers): string {
  return (headers.get("x-forwarded-for") || "").split(",")[0].trim() || headers.get("x-real-ip") || "local";
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
