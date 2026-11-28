import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG, WORK_FAQS, absoluteUrl } from "@/data/siteConfig";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Work with Vee",
  description:
    "Get the HAP DIY Kit ($497), join Brand Lock-In Lab ($7/mo), partner on CSN, or email Vee (@veemeta) for a custom consult.",
  alternates: {
    canonical: absoluteUrl("/work-with-me"),
  },
};

export default function WorkWithMePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WORK_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const renderAnswer = (answer: string) => {
    const token = SITE_CONFIG.contactEmail;
    if (!answer.includes(token)) return answer;
    const [before, after] = answer.split(token);
    return (
      <>
        {before}
        <a href={SITE_CONFIG.contactMailto} className="descriptive-link">
          {SITE_CONFIG.contactEmail}
        </a>
        {after}
      </>
    );
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="container">
        <section id="problem" className="work-hero">
          <span className="eyebrow">Work with Vee</span>
          <h1>
            Got the idea. <span style={{ color: "#64ffff" }}>Need the room.</span>
          </h1>
          <p className="work-deck">
            Start with the kit, join the lab, or tell us what you&apos;re building. A quick note is enough when the work is custom.
          </p>
          <div className="hero-actions">
            <Link href={SITE_CONFIG.hardlinePath} className="btn btn-primary">
              Get the HAP DIY Kit — $497
            </Link>
            <a href={SITE_CONFIG.contactMailto} className="btn btn-secondary">
              Email Vee
            </a>
          </div>
        </section>

        <section className="work-section" style={{ marginTop: 48 }}>
          <div className="work-section-head">
            <span className="eyebrow">Three ways in</span>
            <h2>Pick a door. <span style={{ color: "#ffe154" }}>We&apos;ll meet you there.</span></h2>
          </div>
          <div className="work-grid-3">
            <div id="lab" className="work-card">
              <div>
                <span className="badge">Brand Lock-In Lab</span>
                <h3>$7 a month</h3>
                <p>
                  All five brand workbooks unlock on day one. One new workbook every month. Cancel anytime.
                </p>
                <div style={{ width: "100%", maxWidth: "220px", aspectRatio: "1 / 1", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)", margin: "16px auto 0", background: "#debcff" }}>
                  <Image
                    src="/media/vee/subs/vee-microphone-check.gif"
                    alt="Pixel dog on the mic."
                    width={280}
                    height={280}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
              <a
                href={SITE_CONFIG.subsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join Brand Lock-In Lab · $7/mo
              </a>
            </div>

            <div id="csn" className="work-card">
              <div>
                <span className="badge badge-cyan">Crypto Spaces Network</span>
                <h3>Partner with us</h3>
                <p>
                  We partner with top hosts and put your project where the Web3 world is already tuned in.
                </p>
              </div>
              <a
                href={SITE_CONFIG.csnPartnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Partner with us on CSN
              </a>
            </div>

            <div id="space" className="work-card">
              <div>
                <span className="badge">Awakening Alpha</span>
                <h3>8:30 AM ET</h3>
                <p>{SITE_CONFIG.spaceLine}</p>
              </div>
              <a
                href={SITE_CONFIG.spaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Join us live · 8:30 AM ET
              </a>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="work-section">
          <div className="work-section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three easy steps</h2>
          </div>
          <div className="work-grid-3">
            <div className="work-card">
              <div>
                <span className="work-num">01</span>
                <h3 className="num-title">Tell us what you want</h3>
                <p>The kit, the lab, a CSN partnership, or a custom consult. One clear note is enough.</p>
              </div>
            </div>
            <div className="work-card">
              <div>
                <span className="work-num">02</span>
                <h3 className="num-title">We reply</h3>
                <p>Listed offers are paid by email. Custom work gets a price after we hear what you need.</p>
              </div>
            </div>
            <div className="work-card">
              <div>
                <span className="work-num">03</span>
                <h3 className="num-title">Make some noise</h3>
                <p>We get on the mic and get to work.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="ask" className="work-section" style={{ maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}>
          <div className="work-card" style={{ textAlign: "center", alignItems: "center", border: "1px solid rgba(222, 188, 255, 0.4)" }}>
            <span className="eyebrow">Custom consults</span>
            <h2 style={{ fontSize: "2.25rem", margin: 0 }}>Tell us what you&apos;re after.</h2>
            <p style={{ margin: 0 }}>
              Collectors, builders, campaigns, and stages. Pricing for custom work is one by one.
            </p>
            <a href={SITE_CONFIG.contactMailto} className="btn btn-primary">
              Email Vee
            </a>
          </div>
        </section>

        <section className="work-section" style={{ margin: "60px 0" }}>
          <h2>Fit</h2>
          <div className="grid-2">
            <div
              style={{
                background: "rgba(222, 188, 255, 0.06)",
                border: "1px solid rgba(222, 188, 255, 0.35)",
                padding: "28px",
                borderRadius: "var(--radius-md)",
              }}
            >
              <h3 style={{ color: "#debcff", marginTop: 0 }}>✓ Good fit</h3>
              <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "var(--text-secondary)" }}>
                <li style={{ marginBottom: "8px" }}>Collectors, builders, entrepreneurs, campaigns.</li>
                <li style={{ marginBottom: "8px" }}>Needing more reach.</li>
                <li style={{ marginBottom: "8px" }}>Ready for real results.</li>
              </ul>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px dashed rgba(255, 255, 255, 0.35)",
                padding: "28px",
                borderRadius: "var(--radius-md)",
              }}
            >
              <h3 style={{ color: "var(--text-primary)", marginTop: 0 }}>✕ Not a fit</h3>
              <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "var(--text-secondary)" }}>
                <li style={{ marginBottom: "8px" }}>Financial, investment, or legal advice.</li>
                <li style={{ marginBottom: "8px" }}>Fake hype.</li>
                <li style={{ marginBottom: "8px" }}>Speaking as Doginal Dogs corporate.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Work with Vee FAQ</h2>
          <div>
            {WORK_FAQS.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <p className="faq-question">{faq.question}</p>
                <p className="faq-answer">{renderAnswer(faq.answer)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
