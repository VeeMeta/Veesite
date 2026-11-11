# BOW META Members Portal — handoff for Duck

Hey Duck, this adds a **members-only, interactive workbook portal** to Vee's site (Duckxmeta/Veesite, Vercel project `veesite`).
Workbook 01, **The Power Circle Protocol**, is live inside it. The other four in the series show as "Coming soon" and plug in the same way.

**Update (personal codes):** every member now has their own personal code. A shared invite code can be passed around anonymously; a personal code is tied to a member id, and removing that id from the env list revokes them after a redeploy. The old shared test code `BOWTEST-M26DOI` will **stop working**. Your personal test code (member id `duck-test`) is being sent to you separately — it is not stored in this package.

Nothing in the existing site changes. The legacy `/portal` page, the header, the footer and `globals.css` are untouched.
The new code lives under `/members` and `/api/members`.

## What members get

| Route | What it is |
|---|---|
| `/members/login` | Code gate with BOW META branding. Each member enters their own personal code. |
| `/members` | Library of the 5 workbooks: Power Circle is unlocked, the other 4 are "Coming soon". |
| `/members/power-circle-protocol` | The interactive workbook: Parts I–X plus the Final Reflection, in Vee's own words, with fillable inputs everywhere. |
| `POST /api/members/login` | Checks the personal code against the hashed list and sets a signed httpOnly cookie that carries the member id. Works with JS (JSON) and without JS (form post, 303). |
| `POST /api/members/logout` | Clears the cookie and goes to `/members/login?bye=1`. |
| `POST /api/members/ask` | "Ask Vee a question". Emails Vee through Resend (member id is in the subject and body), or falls back to a mailto link. |
| `GET /api/members/files/power-circle-protocol` | The blank 17-page PDF. It's served from `/private/workbooks`, never `/public`, so it's gated. |

Workbook features:
- Circle map with 5 layers and a live SVG ring map.
- Write-ins and Y/N toggles.
- Multiple saved relationship scorecards, scored 1–5, with an auto total out of 50, the live band interpretation, and Vee's disclaimer.
- Influence map (H/M/L per person).
- Collective audit (Strong/Mixed/Weak).
- Discernment matrix plus a DEEPEN/DEVELOP/RECALIBRATE/DISTANCE assignment.
- 30-day checklist with progress, the commitments, and the Final Reflection.
- Autosaves to localStorage and shows progress per Part.
- Download/Import my answers (JSON), Print/Save as PDF (print stylesheet), and a Blank PDF link.
- An "Ask Vee" form inline on every Part (prefilled with that Part), plus a floating "Ask Vee" button.

## Files

**New**
```
src/middleware.ts                         # gates /members/* and /api/members/* (Edge, Web Crypto HMAC)
src/lib/members/auth.ts                   # hashed personal codes, signed session with memberId, cookie options, safe redirect
src/lib/members/rateLimit.ts              # best-effort in-memory limiter (per instance)
src/app/api/members/login/route.ts
src/app/api/members/logout/route.ts
src/app/api/members/ask/route.ts
src/app/api/members/files/[slug]/route.ts
src/app/members/layout.tsx                # noindex + fonts for the portal
src/app/members/members.css               # portal styles (scoped .m-*), incl. print stylesheet
src/app/members/login/page.tsx
src/app/members/page.tsx
src/app/members/[slug]/page.tsx
src/components/members/{WorkbookClient,Blocks,Inputs,CircleMap,Scorecards,AskVee,LoginForm,LogoutButton}.tsx
src/components/members/store.tsx          # answers context, progress + "include my answers" summaries
src/data/workbooks/types.ts               # content block model
src/data/workbooks/registry.ts            # series listing (5 workbooks) + which are available
src/data/workbooks/powerCircle.ts         # Vee's manuscript as data (verbatim)
private/workbooks/power-circle-protocol.pdf
```
**Changed**
- `next.config.mjs`: adds `experimental.outputFileTracingIncludes` so the private PDF is bundled with the file route on Vercel.
- `.env.example`: adds the portal and Resend variables.
- `.gitignore`: ignores `.env.duck-test` as well as `.env` / `.env.local`.

No new npm dependencies.

## How to apply

Use either of these:
- `git apply members-portal.patch` from the repo root. It applies cleanly to `main` @ `a2637a7` and includes the binary PDF.
- Or unzip `members-portal-changed-files.zip` over the repo root.

Then run `npm run build`.

## Env vars to set in Vercel (Project → Settings → Environment Variables)

| Name | Value | Notes |
|---|---|---|
| `PORTAL_MEMBER_CODES` | *(sent separately — hashes only)* | Compact list of `memberId:sha256hex` pairs, comma-separated. **No plaintext codes.** The first value includes your `duck-test` hash. When Vee adds or revokes a member, she'll send you an updated value — paste it over this one and redeploy. |
| `PORTAL_COOKIE_SECRET` | generate your own: `openssl rand -hex 32` | Must be at least 16 characters. Don't reuse anything from this package. Rotating it signs everyone out; it does **not** change their personal codes. |
| `RESEND_API_KEY` | from resend.com → API Keys | Optional. If it's empty, "Ask Vee" uses the mailto fallback. |
| `QUESTIONS_TO_EMAIL` | `veemetax@gmail.com` | Where questions are delivered (server-side only). Comma-separate for more than one. Required for both the Resend path and the mailto fallback. |
| `QUESTIONS_FROM_EMAIL` | `BOW META Portal <portal@veemeta.com>` | Sending address. Must be on a domain verified in Resend (see below). (`RESEND_FROM_EMAIL` is still accepted as a fallback name.) |

Set them for Production and Preview, then redeploy (env changes only apply on a new deploy).

If `PORTAL_MEMBER_CODES` or `PORTAL_COOKIE_SECRET` is missing (or the list is empty / the secret is under 16 characters), the portal **fails closed**: nobody gets in, and the gate says "isn't switched on yet".

### Adding or revoking members

Vee (via her Grok Bot) keeps the private roster and generates codes. You only ever paste hashes:

1. She'll send you a new `PORTAL_MEMBER_CODES=...` line (hashes only).
2. In Vercel, replace the existing `PORTAL_MEMBER_CODES` value with that line.
3. Redeploy. New codes work immediately after the deploy; a removed member is bounced on their **next** request (their existing cookie is no longer accepted, because middleware re-checks that the member id is still in the list).

A few hundred members fit comfortably in one Vercel env var (each hash is 64 hex chars). If the list ever gets large enough to be awkward, [Vercel Edge Config](https://vercel.com/docs/edge-config) could hold the same `memberId:hash` map and updates would apply without a redeploy — not wired up in this patch.

Hash format, if you ever need to check one: SHA-256 hex of the UTF-8 string `bmcode1:` + the code in uppercase, trimmed. Codes are case-insensitive.

### Resend domain verification
1. In Resend, go to Domains → Add `veemeta.com` (or a subdomain such as `mail.veemeta.com`).
2. Resend shows SPF (TXT), DKIM (TXT/CNAME) and optional DMARC/MX records. Add them in **Namecheap → Domain List → veemeta.com → Advanced DNS**. Vee's Grok Bot can do this, because it has manager access there. Send it the exact records.
3. Wait for Resend to show "Verified", then set `QUESTIONS_FROM_EMAIL` to `BOW META Portal <portal@veemeta.com>` (or another address on that domain).
4. Until it's verified, Resend's `onboarding@resend.dev` sender only delivers to the Resend account owner's own email, so keep `RESEND_API_KEY` empty or expect the mailto fallback.

Replies go straight to the member, because `reply_to` is set to their email. The member id is included in the subject and body so Vee can tell who asked. The destination address (`QUESTIONS_TO_EMAIL`) is not shipped in the client JavaScript bundle. Once Resend is live, members never see it; the mailto fallback does put the To: address in the link, so getting Resend verified first is better.

## Security notes
- Personal codes are only ever compared server-side, as SHA-256 hashes, with a constant-time scan of the whole list. Plaintext codes never appear in the repo, the env vars, or client JS.
- Cookie `bm_member` is `v2.{memberId}.{exp}.{HMAC-SHA256}`, httpOnly, SameSite=Lax, and Secure in production. Middleware and the gated API routes re-check that `memberId` is still in `PORTAL_MEMBER_CODES`.
- Wrong codes get a ~0.9 s delay, and there's a limit of 5 wrong tries per IP per 15 min (HTTP 429).
- The limiter is in-memory per serverless instance, so it's a speed bump rather than a hard global cap. Upstash/KV can come later if needed.
- Post-login redirects only go to `/members…` paths, so there's no open redirect.
- Members pages send `noindex` and `Cache-Control: private, no-store`.
- Ask Vee validates input server-side and has a hidden honeypot field (bots get a fake "ok"). It's rate limited to 6 per IP per 10 min, and you have to be signed in to post.
- Answers live **only in the member's browser** (localStorage). Nothing is stored server-side.
- Sessions last 30 days (`SESSION_DAYS` in `src/lib/members/auth.ts`). Rotating `PORTAL_COOKIE_SECRET` signs everyone out (they sign back in with the same personal code). Removing a member from the list revokes them after redeploy, even if their cookie hasn't expired.

## Adding workbooks 02–05
1. Copy `src/data/workbooks/powerCircle.ts` and fill in its `parts` with blocks (`p`, `h3`, `bullets`, `writeins`, `yesno`, `fields`, `scorecards`, `checklist`, etc.; see `types.ts`).
2. Register it in `WORKBOOKS` in `registry.ts` and set its listing `status: "available"`.
3. Optionally drop the blank PDF in `private/workbooks/` and set `pdfFile`.

The route `/members/<slug>` picks it up automatically.

## Test checklist (preview deploy)
- [ ] `/members` while signed out redirects to `/members/login?next=/members`.
- [ ] A wrong code shows "That code didn't work" after a short delay. The 6th wrong try within 15 min gets "Too many attempts".
- [ ] The old shared code `BOWTEST-M26DOI` is rejected.
- [ ] Your personal test code (any case) unlocks and lands on the library. There's 1 unlocked card and 4 "Coming soon".
- [ ] Open Power Circle. Add names to Circle One and see them on the ring map. Tick a Y/N.
- [ ] Start a scorecard and score all 10. The total out of 50 and the band update live, the disclaimer is shown, and a second scorecard can be added.
- [ ] Reload: everything is still filled in, and the Part nav shows % per Part.
- [ ] Download my answers gives a JSON file. Clear answers, then Import that file, and the answers are restored.
- [ ] Blank PDF downloads (17 pages). `/api/members/files/power-circle-protocol` in a private window returns 401.
- [ ] Ask Vee from the floating button has the current Part preselected. Sending works: email arrives if Resend is configured (subject includes `member duck-test`), otherwise there's a "Send it to Vee by email" mailto button.
- [ ] Print / save as PDF gives a clean white printout, one Part per page, with no nav or buttons.
- [ ] Sign out returns to the gate, and `/members` is locked again.
- [ ] `/portal` (the old page) still works as before.

All of the above passed locally (`next build` and `next start`, including a revoked-member bounce; see `qa/e2e_members.py`).

## FYI: a site-wide font bug (not changed in this patch)
`globals.css` defines `--font-sans: var(--font-sans), 'Outfit', …` (and the same for `--font-mono`).

A custom property that references itself is invalid, so the whole live site currently renders in the browser's default serif (Times), not Outfit. You can check this on veesite.vercel.app.

The portal works around it locally by loading Outfit/JetBrains Mono under `--m-font-sans`/`--m-font-mono`.

To fix the whole site:
1. Rename the `variable`s in `src/app/layout.tsx` to `--font-outfit` / `--font-jetbrains`.
2. Use those names in `globals.css`: `--font-sans: var(--font-outfit), 'Outfit', system-ui, …`.

Also consider pointing the header's "VIP Portal 🔒" link at `/members` once Vee is happy.
