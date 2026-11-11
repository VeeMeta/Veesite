// Members portal session helpers.
// Runs in both the Edge runtime (middleware) and Node (route handlers), so it
// only uses Web Crypto — no Node-only imports.
//
// Each member has a personal code. Vercel stores only hashes, never plaintext:
//   PORTAL_MEMBER_CODES=memberId:hexSha256,memberId:hexSha256
// Hash = SHA-256 hex of  "bmcode1:" + normalizeCode(code)
// (prefix lets us rotate the scheme later). Must stay in sync with
// scripts/member-codes.mjs (box-side admin; not shipped in the Duck package).
//
// The session cookie carries the memberId. verifySessionToken re-checks that
// the id is still in PORTAL_MEMBER_CODES, so deleting a member and redeploying
// revokes them on the next request. Rotating PORTAL_COOKIE_SECRET signs
// everyone out but does not invalidate the codes themselves.

export const MEMBER_COOKIE = "bm_member";
export const SESSION_DAYS = 30;
export const MEMBER_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
export const CODE_HASH_PREFIX = "bmcode1:";

const HEX64_RE = /^[0-9a-f]{64}$/;
const enc = new TextEncoder();

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}

async function sha256hex(message: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(message));
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, "0");
  return hex;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

/** SHA-256 hex of the normalized personal code. Used by the admin script too. */
export async function hashMemberCode(code: string): Promise<string> {
  return sha256hex(CODE_HASH_PREFIX + normalizeCode(code));
}

/**
 * Parse PORTAL_MEMBER_CODES. Primary format is a comma (or whitespace) list of
 * memberId:hex pairs. A JSON object { memberId: hex, ... } is also accepted.
 * Invalid pairs are skipped.
 */
export function parseMemberCodes(raw: string | undefined | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!raw) return map;
  const trimmed = raw.trim();
  if (!trimmed) return map;

  const add = (id: string, hash: string) => {
    const h = hash.trim().toLowerCase();
    const i = id.trim().toLowerCase();
    if (MEMBER_ID_RE.test(i) && HEX64_RE.test(h)) map.set(i, h);
  };

  if (trimmed.startsWith("{")) {
    try {
      const obj = JSON.parse(trimmed) as Record<string, unknown>;
      for (const [id, hash] of Object.entries(obj)) {
        if (typeof hash === "string") add(id, hash);
      }
      return map;
    } catch {
      return map;
    }
  }

  for (const part of trimmed.split(/[,\s]+/)) {
    if (!part) continue;
    const i = part.indexOf(":");
    if (i <= 0) continue;
    add(part.slice(0, i), part.slice(i + 1));
  }
  return map;
}

export interface PortalConfig {
  secret: string;
  members: Map<string, string>;
}

export type MemberSession = { memberId: string };

/** Returns null when the portal is not configured (fails closed). */
export function getPortalConfig(): PortalConfig | null {
  const secret = process.env.PORTAL_COOKIE_SECRET;
  const members = parseMemberCodes(process.env.PORTAL_MEMBER_CODES);
  if (!secret || secret.length < 16 || members.size === 0) return null;
  return { secret, members };
}

/**
 * Check a submitted personal code against the hashed list.
 * Always scans every hash (no early exit) so timing does not leak which member
 * matched. Returns the memberId, or null if it didn't match anyone.
 */
export async function checkMemberCode(submitted: string, cfg: PortalConfig): Promise<string | null> {
  const submittedHash = await hashMemberCode(submitted);
  let found: string | null = null;
  cfg.members.forEach((hash, id) => {
    if (safeEqual(hash, submittedHash)) found = id;
  });
  return found;
}

export function isActiveMember(cfg: PortalConfig, memberId: string): boolean {
  return cfg.members.has(memberId);
}

// Cookie format: v2.{memberId}.{exp}.{HMAC-SHA256(secret, "v2.{memberId}.{exp}")}
// Bound to the memberId, not the code, so rotating a code (and its hash) while
// leaving the id in the list does not need to wait out the 30-day session —
// but removing the id does, on the next request after redeploy.
async function sign(memberId: string, exp: number, secret: string): Promise<string> {
  return hmac(secret, `v2.${memberId}.${exp}`);
}

export async function createSessionToken(cfg: PortalConfig, memberId: string): Promise<{ token: string; maxAge: number }> {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  return { token: `v2.${memberId}.${exp}.${await sign(memberId, exp, cfg.secret)}`, maxAge };
}

export async function verifySessionToken(token: string | undefined | null): Promise<MemberSession | null> {
  const cfg = getPortalConfig();
  if (!cfg || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v2") return null;
  const memberId = parts[1];
  const exp = Number(parts[2]);
  const sig = parts[3];
  if (!MEMBER_ID_RE.test(memberId) || !Number.isFinite(exp) || !sig || exp < Math.floor(Date.now() / 1000)) return null;
  if (!safeEqual(sig, await sign(memberId, exp, cfg.secret))) return null;
  if (!cfg.members.has(memberId)) return null;
  return { memberId };
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/** Only allow same-site relative redirects after login. */
export function safeNext(next: unknown): string {
  if (typeof next !== "string" || !next.startsWith("/members") || next.startsWith("//") || next.includes("\\")) {
    return "/members";
  }
  return next;
}
