import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG, ENTITY_FAQS, MEDIA_ASSETS, absoluteUrl } from "@/data/siteConfig";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "About Veronica Michelle Campbell (Vee Meta)",
  description:
    "Veronica Michelle Campbell, known as Vee Meta (@veemeta), is a Canadian host, speaker, and strategist from Toronto. Chief Roar Officer at Doginal Dogs and founding member of Crypto Spaces Network.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Vee (@veemeta)",
    description:
      "Professional identity of Vee (@veemeta), Chief Roar Officer at Doginal Dogs and founding member of Crypto Spaces Network (CSN).",
    images: [
      {
        url: MEDIA_ASSETS.headshot1.cardPath,
        width: MEDIA_ASSETS.headshot1.width,
        height: MEDIA_ASSETS.headshot1.height,
        alt: MEDIA_ASSETS.headshot1.alt,
      },
    ],
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.legalName,
    alternateName: [SITE_CONFIG.knownAs, SITE_CONFIG.handle],
    homeLocation: { "@type": "Place", name: "Toronto, Canada" },
    url: absoluteUrl("/about"),
    image: absoluteUrl(MEDIA_ASSETS.headshot1.cardPath),
    sameAs: [SITE_CONFIG.xUrl, SITE_CONFIG.doginalDogsUrl],
    jobTitle: "Chief Roar Officer",
    worksFor: {
      "@type": "Organization",
      name: "Doginal Dogs",
      url: SITE_CONFIG.doginalDogsUrl,
    },
    description:
      "Veronica Michelle Campbell, known as Vee Meta (@veemeta), is Chief Roar Officer at Doginal Dogs and a founding member of Crypto Spaces Network (CSN). Toronto, Canada.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ENTITY_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[personSchema, faqSchema]} />

      <div className="container">
        <section style={{ padding: "20px 0 40px" }}>
          <h1>Veronica Michelle Campbell</h1>
          <p style={{ marginBottom: "4px" }}><strong>Known as:</strong> Vee Meta (@veemeta)</p>
          <p><strong>Hometown:</strong> Toronto, Canada</p>
        </section>

        <section style={{ margin: "10px 0 40px" }}>
          <div className="grid-2" style={{ alignItems: "flex-start", gap: "32px" }}>
            <div className="article-body">
              <p>
                Veronica Michelle Campbell, known as Vee Meta, is a Canadian host, speaker, and strategist working at the intersection of media, markets, emerging technology, and culture.
              </p>
              <p>
                She builds communication systems and performance frameworks that strengthen leadership presence, narrative authority, and decision-making under complexity, with a focus on Web3 and fast-moving digital environments. Her work is outcome-driven: helping individuals and teams communicate clearly, lead decisively, and perform effectively in high-stakes, public-facing contexts.
              </p>
              <p>
                Vee is the host of Awakening Alpha, a live daily morning space on X covering markets, macroeconomics, geopolitics, emerging technology, and media. Through consistent live analysis, she has become known for translating complex, real-time developments into clear, actionable insight—earning a loyal audience that values signal over noise.
              </p>
              <p>
                In Web3, her work extends beyond commentary into ecosystem participation and cultural development, contributing to decentralized communities, live events, and emerging digital IP. She has been an active contributor to the Doginal Dogs ecosystem, attended DDNYC 2025 and DDVEGAS 2025, and will speak at DDNYC 2026 on Dog Talk.
              </p>
              <p>
                She is also the creator of the Story and Signal Workbook Series, a set of applied frameworks designed to improve narrative control, audience perception, and leadership communication. Through workshops and private coaching, she works with creators, founders, and emerging leaders to refine their public voice, strengthen authority, and increase effectiveness in digital-first environments.
              </p>
              <p>
                Her work is grounded in a core belief: clarity is a competitive advantage, and culture is shaped by those who communicate it best.
              </p>
              <p style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.25rem" }}>
                Clarity, Courage, Conviction.<br />
                Build what matters.
              </p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: 8 }}>
                <Link href="/work-with-me" className="btn btn-primary">
                  Work with Vee
                </Link>
              </div>
              <p className="space-line" style={{ marginLeft: 0 }}>
                <a href={SITE_CONFIG.spaceUrl} target="_blank" rel="noopener noreferrer">
                  {SITE_CONFIG.spaceLine}
                </a>
                {" "}We go live at 8:30 AM ET.
              </p>
            </div>

            <div style={{ position: "relative", width: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-color)", display: "flex", justifyContent: "center", background: "#000" }}>
              <Image
                src={MEDIA_ASSETS.headshot1.cardPath}
                alt={MEDIA_ASSETS.headshot1.alt}
                width={MEDIA_ASSETS.headshot1.width}
                height={MEDIA_ASSETS.headshot1.height}
                loading="lazy"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section style={{ margin: "30px 0" }}>
          <h2>Find Vee</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={{ marginBottom: "12px" }}>
              <strong>X:</strong>{" "}
              <a href={SITE_CONFIG.xUrl} target="_blank" rel="noopener noreferrer" className="descriptive-link">
                https://x.com/veemeta?s=20
              </a>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Doginal Dogs:</strong>{" "}
              <a href={SITE_CONFIG.doginalDogsUrl} target="_blank" rel="noopener noreferrer" className="descriptive-link">
                https://www.doginaldogs.com
              </a>
            </li>
          </ul>
        </section>

        {/* "In the Room" Photo Strip */}
        <section style={{ margin: "60px 0 40px" }}>
          <h2>In the Room &amp; Ecosystem Shots</h2>
          <p>A direct look at live events, community backdrops, and Doginal Dogs ecosystem art.</p>

          <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "24px" }}>
            <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <Image
                src={MEDIA_ASSETS.ddnyc1.cardPath}
                alt={MEDIA_ASSETS.ddnyc1.alt}
                width={MEDIA_ASSETS.ddnyc1.width}
                height={MEDIA_ASSETS.ddnyc1.height}
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {MEDIA_ASSETS.ddnyc1.caption}
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <Image
                src={MEDIA_ASSETS.cherryddl.cardPath}
                alt={MEDIA_ASSETS.cherryddl.alt}
                width={MEDIA_ASSETS.cherryddl.width}
                height={MEDIA_ASSETS.cherryddl.height}
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "contain", background: "#000" }}
              />
              <div style={{ padding: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {MEDIA_ASSETS.cherryddl.caption}
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <Image
                src={MEDIA_ASSETS.maryddl.cardPath}
                alt={MEDIA_ASSETS.maryddl.alt}
                width={MEDIA_ASSETS.maryddl.width}
                height={MEDIA_ASSETS.maryddl.height}
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "contain", background: "#000" }}
              />
              <div style={{ padding: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {MEDIA_ASSETS.maryddl.caption}
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <Image
                src={MEDIA_ASSETS.bowdao.cardPath}
                alt={MEDIA_ASSETS.bowdao.alt}
                width={MEDIA_ASSETS.bowdao.width}
                height={MEDIA_ASSETS.bowdao.height}
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "contain", background: "#000" }}
              />
              <div style={{ padding: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {MEDIA_ASSETS.bowdao.caption}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "-8px", marginBottom: "24px" }}>
            Direct verification footprints and project background definitions.
          </p>
          <div>
            {ENTITY_FAQS.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <p className="faq-question">{faq.question}</p>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
