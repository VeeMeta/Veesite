import type { Metadata } from "next";
import HapModal from "@/components/HapModal";
import { SITE_CONFIG, absoluteUrl, hapCheckoutMailto } from "@/data/siteConfig";
import "./hardline.css";

const BUY_MAILTO = hapCheckoutMailto();
const QS_URL = SITE_CONFIG.quickScoreUrl;

export const metadata: Metadata = {
  title: "Hardline API Protocol (HAP) DIY Kit — $497",
  description:
    "Lock down API keys, bots, and AI agents yourself. 32-control checklist, policy YAML, attack-sim self-tests, Evidence Pack templates, and a 0–100 scorecard. $497, credited 100% toward Guided Install within 30 days.",
  alternates: { canonical: absoluteUrl("/hardline") },
  openGraph: {
    title: "HAP DIY Kit — lock down your API keys and agents",
    description:
      "Run the Hardline API Protocol yourself and walk away with an Evidence Pack. 100% credit toward Guided Install within 30 days.",
    url: absoluteUrl("/hardline"),
  },
};

export default function HardlinePage() {
  return (
    <div className="hl-page">


{/* HERO */}
<section className="hl-hero">
  <div className="hl-wrap hl-hero-grid">
    <div>
      <span className="hl-eyebrow">Hardline API Protocol · DIY Kit</span>
      <h1>Your API keys, bots, and AI agents — <em>locked down by you.</em></h1>
      <p className="hl-lead">You shipped fast. Now there are keys in places they shouldn’t be and agents with more access than any intern would get. HAP is the founder-sized playbook to fix that yourself in a weekend or two — and prove it with an Evidence Pack.</p>
      <div className="hl-hero-ctas">
        <a className="hl-btn hl-btn-primary" href={BUY_MAILTO}>Get the DIY Kit — $497</a>
        <a className="hl-btn hl-btn-ghost" href={QS_URL} target="_blank" rel="noopener">Free 20-min Quick-Score</a>
      </div>
      <div className="hl-hero-meta">
        <span>32 controls</span><span>Agent-surface layer</span><span>100% credit toward Guided Install</span>
      </div>
    </div>
    <div className="hl-terminal" aria-hidden="true">
      <div className="hl-bar"><i></i><i></i><i></i></div>
<pre><span className="hl-p">$</span>{` hap selftest --layer agent\nHAP-AG-01 agent identity ........ `}<span className="hl-ok">PASS</span>{`\nHAP-AG-02 scoped agent tokens ... `}<span className="hl-f">FAIL</span>{`  ttl=30d\nHAP-AG-04 no secrets in prompts . `}<span className="hl-f">FAIL</span>{`  key in memory\nHAP-AG-05 human-in-loop ......... `}<span className="hl-ok">PASS</span>{`\nHAP-AG-07 untrusted content ..... `}<span className="hl-f">FAIL</span>{`  email→tool\n\n`}<span className="hl-g">score 58/100</span>{`  → fix list written to\nevidence/fixes.md`}</pre>
    </div>
  </div>
</section>

{/* RISK */}
<section className="hl-alt hl-risk" id="risk">
  <div className="hl-wrap">
    <div className="hl-section-head">
      <span className="hl-eyebrow">The honest part</span>
      <h2>Most leaks aren’t hacks. <em>They’re shortcuts.</em></h2>
      <p>Nothing dramatic — just the stuff every fast team does. HAP finds these on purpose, before someone else finds them by accident.</p>
    </div>
    <div className="hl-grid hl-g4">
      <div className="hl-card"><span className="hl-k">01 · keys</span><h3>Keys that live forever</h3><p>No owner, no expiry, no idea who used it last. One in a repo or a Discord paste is all it takes.</p></div>
      <div className="hl-card"><span className="hl-k">02 · agents</span><h3>Agents with admin</h3><p>Bots running on a human’s master key, able to delete, pay, or post with no approval step.</p></div>
      <div className="hl-card"><span className="hl-k">03 · prompts</span><h3>Secrets in prompts</h3><p>Keys pasted into chat, memory, or tool configs — and content from the web steering tool calls.</p></div>
      <div className="hl-card"><span className="hl-k">04 · access</span><h3>“It’s my object” checks</h3><p>Endpoints that return any record if you change the ID. The #1 API bug, year after year.</p></div>
    </div>
  </div>
</section>

{/* KIT */}
<section id="kit" className="hl-kit">
  <div className="hl-wrap">
    <div className="hl-section-head">
      <span className="hl-eyebrow">What’s in the kit</span>
      <h2>Everything to run HAP <em>without hiring anyone.</em></h2>
      <p>Built for founders and the one engineer who ends up owning security. Plain language, copy-paste configs, and a clear pass/fail for every control.</p>
    </div>
    <div className="hl-grid hl-g3">
      <div className="hl-card"><span className="hl-k">PDF + MD</span><h3>The Protocol</h3><p>Seven layers — identity, authorization, traffic, data, agent surface, on-chain gates, evidence — with the why behind each control.</p></div>
      <div className="hl-card"><span className="hl-k">32 controls</span><h3>Assessor checklist</h3><p>Every control has a test, a PASS/FAIL, and the exact artifact that proves it. No vibes.</p></div>
      <div className="hl-card"><span className="hl-k">YAML</span><h3>Sample policy</h3><p>A starting policy for token TTLs, scopes, rate limits, agent allowlists, and approval thresholds. Edit, commit, done.</p></div>
      <div className="hl-card"><span className="hl-k">templates</span><h3>Evidence Pack</h3><p>Fill-in templates for key inventory, agent registry, approval logs, and audit samples — the proof, organized.</p></div>
      <div className="hl-card"><span className="hl-k">self-tests</span><h3>Attack-sim self-tests</h3><p>Safe drills you run on your own stack: object-ID swaps, token replay, prompt-to-tool injection, SSRF probes.</p></div>
      <div className="hl-card"><span className="hl-k">0–100</span><h3>Scorecard + 1 async Q&amp;A</h3><p>Score yourself before and after. Then send us one async question when you hit something weird.</p></div>
    </div>
    <div className="hl-layers" aria-label="HAP layers">
      <span>L1 Identity</span><span>L2 Authorization</span><span>L3 Traffic &amp; Abuse</span><span>L4 Data &amp; Schema</span><span className="hl-hl">L5 Agent Surface</span><span>L6 On-chain Gates</span><span>L7 Evidence</span>
    </div>
  </div>
</section>

{/* EVIDENCE */}
<section className="hl-alt" id="evidence">
  <div className="hl-wrap hl-ev-grid">
    <div>
      <span className="hl-eyebrow">The proof</span>
      <h2>Finish with an <em>Evidence Pack,</em> not a feeling.</h2>
      <p className="hl-lead">When an investor, exchange, partner, or new hire asks “how do you handle keys and agents?”, you send a folder — not a paragraph.</p>
      <ul className="hl-ev-list">
        <li><strong>Before/after score</strong> on the same 32 controls, same method.</li>
        <li><strong>An artifact per control</strong> — config export, log sample, test result.</li>
        <li><strong>A fix list</strong> ranked by blast radius, so the first hour goes to the scariest gap.</li>
        <li><strong>Re-runnable.</strong> Score again next quarter and see drift.</li>
      </ul>
    </div>
    <div className="hl-score" aria-label="Example scorecard (illustrative)">
      <div className="hl-score-row"><span>L1 Identity</span><span className="hl-meter"><b style={{ width: "80%" }}></b></span><span>4/5</span></div>
      <div className="hl-score-row"><span>L2 Authorization</span><span className="hl-meter"><b style={{ width: "60%" }}></b></span><span>3/5</span></div>
      <div className="hl-score-row"><span>L3 Traffic</span><span className="hl-meter"><b style={{ width: "75%" }}></b></span><span>3/4</span></div>
      <div className="hl-score-row"><span>L4 Data</span><span className="hl-meter"><b style={{ width: "100%" }}></b></span><span>4/4</span></div>
      <div className="hl-score-row"><span>L5 Agent surface</span><span className="hl-meter"><b style={{ width: "43%" }}></b></span><span>3/7</span></div>
      <div className="hl-score-row"><span>L6 On-chain</span><span className="hl-meter"><b style={{ width: "67%" }}></b></span><span>2/3</span></div>
      <div className="hl-score-row"><span>L7 Evidence</span><span className="hl-meter"><b style={{ width: "50%" }}></b></span><span>2/4</span></div>
      <div className="hl-score-total"><span>Hardline score</span><b>66 / 100</b></div>
      <p className="hl-score-note">Illustrative example layout — not a real client result.</p>
    </div>
  </div>
</section>

{/* WHO */}
<section id="who">
  <div className="hl-wrap">
    <div className="hl-section-head">
      <span className="hl-eyebrow">Who it’s for</span>
      <h2>Built for teams that <em>ship first</em> and secure second.</h2>
    </div>
    <div className="hl-grid hl-g2 hl-fit">
      <div className="hl-card hl-yes"><h3>Great fit</h3><ul>
        <li>Seed / Series A startups with public or partner APIs</li>
        <li>Teams running AI agents, Discord/Telegram bots, or MCP tools</li>
        <li>Crypto projects with wallets, mints, withdrawals, or treasury flows</li>
        <li>A founder or lead engineer who’d rather do it than outsource it</li>
        <li>Anyone prepping for a raise, listing, or partner security review</li>
      </ul></div>
      <div className="hl-card hl-no"><h3>Probably not yet</h3><ul>
        <li>You need a formal compliance certificate (SOC 2, ISO) — HAP isn’t one</li>
        <li>You have no APIs, keys, or bots in production</li>
        <li>You want someone else to do all of it — see Guided Install below</li>
      </ul></div>
    </div>
  </div>
</section>

{/* PRICING */}
<section className="hl-alt" id="pricing">
  <div className="hl-wrap">
    <div className="hl-section-head">
      <span className="hl-eyebrow">Pricing</span>
      <h2>One price. <em>Zero risk of wasting it.</em></h2>
      <p>Start DIY. If you decide you want hands-on help, every dollar moves with you.</p>
    </div>
    <div className="hl-price-wrap">
      <div className="hl-price-card">
        <span className="hl-tag">HAP DIY Kit · Seed</span>
        <div className="hl-price"><b>$497</b><small>one-time · USD</small></div>
        <div className="hl-credit"><strong>100% credit</strong> toward Guided Install ($4,500 Seed) if you upgrade within 30 days.</div>
        <ul className="hl-checks">
          <li>Protocol (PDF + Markdown)</li>
          <li>32-control assessor checklist</li>
          <li>Sample policy YAML</li>
          <li>Evidence Pack templates</li>
          <li>Attack-sim self-tests</li>
          <li>0–100 scorecard</li>
          <li>1 async Q&amp;A with Vee</li>
        </ul>
        <a className="hl-btn hl-btn-primary" href={BUY_MAILTO}>Get the DIY Kit — $497</a>
        <a className="hl-btn hl-btn-ghost" href={QS_URL} target="_blank" rel="noopener">Book a free Quick-Score first</a>
        <p className="hl-fine">How checkout works: email us and we’ll reply with a secure payment link the same day (ET business hours). The kit lands in your inbox once it’s paid.</p>
      </div>
      <div className="hl-ladder">
        <div className="hl-card">
          <h3>Where it can go from here</h3>
          <div className="hl-row hl-on"><span>DIY Kit (Seed)</span><span>$497</span></div>
          <div className="hl-row"><span>Guided Install — 30 days, weekly calls</span><span>$4,500</span></div>
          <div className="hl-row"><span>Full Audit + Fix</span><span>from $12,000</span></div>
          <div className="hl-row"><span>Quarterly re-test</span><span>$1,500/qtr</span></div>
          <p className="hl-fine">Larger team, exchange, wallet, or payments scope? The Growth DIY license is $997 — just mention it in your email.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* QUICK SCORE */}
<section id="quick-score">
  <div className="hl-wrap">
    <div className="hl-qs">
      <div>
        <span className="hl-eyebrow">Free · 20 minutes</span>
        <h2>Not sure where you stand? <em>Get a Quick-Score.</em></h2>
        <p>We’ll walk 10 of the 32 controls together on a call — keys, agent access, object checks, and secrets hygiene. You leave with a rough score and the top 3 things we’d fix first. No pitch deck, no pressure.</p>
        <p className="hl-meta">Weekdays 12–2 &amp; 3–5 PM ET · Google Meet</p>
      </div>
      <a className="hl-btn hl-btn-primary" href={QS_URL} target="_blank" rel="noopener">Book the Quick-Score</a>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="hl-alt" id="faq">
  <div className="hl-wrap">
    <div className="hl-section-head"><span className="hl-eyebrow">FAQ</span><h2>Straight answers.</h2></div>
    <div className="hl-faq">
      <details><summary>Is HAP an OWASP or NIST certification?</summary><p>No. HAP is an independent protocol built on public baselines (like the OWASP API Security Top 10 and NIST guidance). It’s not endorsed by or affiliated with either, and it doesn’t certify you. What it gives you is a measured score and evidence you can show.</p></details>
      <details><summary>How do I pay? Why not a checkout button?</summary><p>For now, checkout is personal: hit “Get the DIY Kit”, send the pre-filled email, and we’ll reply with a secure payment link the same day (ET business hours). Once it’s paid, the kit arrives by email.</p></details>
      <details><summary>How much time does it take?</summary><p>Most small teams can run the full checklist in a few focused sessions. Fixes depend on what you find — the scorecard ranks them so you start with the highest-impact gaps.</p></details>
      <details><summary>Do I need a security engineer?</summary><p>No. It’s written for founders and generalist engineers. If you can read your gateway config and your bot’s environment variables, you can run HAP.</p></details>
      <details><summary>How does the $497 credit work?</summary><p>If you upgrade to Guided Install (Seed, $4,500) within 30 days of buying the DIY Kit, the full $497 is credited toward it.</p></details>
      <details><summary>What’s the “agent surface” layer?</summary><p>Seven controls specifically for AI agents and bots: their own identities, short-lived scoped tokens, tool/MCP allowlists, no secrets in prompts, human approval for risky actions, audit trails, and a boundary so untrusted content can’t trigger privileged tools.</p></details>
      <details><summary>We’re a bigger team or run an exchange / wallet. Which version?</summary><p>The Growth DIY license is $997 and covers larger teams and higher-risk scopes like exchanges, wallets, and payments. Mention it in your email and we’ll send the right link.</p></details>
      <details><summary>Will this make us unhackable?</summary><p>No one can honestly promise that. HAP measures and tightens the controls that cause most API and agent incidents, and documents what you’ve done. That’s the goal.</p></details>
    </div>
  </div>
</section>

{/* ABOUT */}
<section>
  <div className="hl-wrap">
    <div className="hl-card hl-about">
      <div className="hl-avatar" aria-hidden="true">V</div>
      <div>
        <h3>Built by Vee (@veemeta)</h3>
        <p>Chief Roar Officer at Doginal Dogs and founding member of the Crypto Spaces Network. We spend our days around teams shipping bots, wallets, and APIs at crypto speed. HAP is the checklist we wish every one of them had on day one. Questions? <a href={SITE_CONFIG.contactMailto}>{SITE_CONFIG.contactEmail}</a> or <a href="https://x.com/veemeta" target="_blank" rel="noopener">@veemeta</a> on X.</p>
      </div>
    </div>
  </div>
</section>

{/* FINAL */}
<section className="hl-final">
  <div className="hl-wrap">
    <h2>Lock it down <em>before it matters.</em></h2>
    <p className="hl-lead">$497 today, fully credited if you want help later. Or start with a free 20-minute Quick-Score.</p>
    <div className="hl-hero-ctas">
      <a className="hl-btn hl-btn-primary" href={BUY_MAILTO}>Get the DIY Kit — $497</a>
      <a className="hl-btn hl-btn-ghost" href={QS_URL} target="_blank" rel="noopener">Free Quick-Score</a>
    </div>
  </div>
</section>


      <p className="hl-disclaimer">HAP is an independent protocol built on public security baselines. It is not affiliated with, endorsed by, or a certification from OWASP, NIST, or any standards body, and it does not guarantee against all attacks.</p>
      <div className="hl-mbar">
  <a className="hl-btn hl-btn-primary" href={BUY_MAILTO}>Get kit — $497</a>
  <a className="hl-btn hl-btn-ghost" href={QS_URL} target="_blank" rel="noopener">Free Quick-Score</a>
</div>
      <HapModal landingUrl="#kit" />
    </div>
  );
}
