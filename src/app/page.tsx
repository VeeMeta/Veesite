import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, ENTITY_FAQS, getSortedArticles, MEDIA_ASSETS, absoluteUrl } from "@/data/siteConfig";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  description:
    "Vee — @veemeta. Chief Roar Officer at Doginal Dogs. Founding member of Crypto Spaces Network. Toronto.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Vee (@veemeta) | Chief Roar Officer at Doginal Dogs",
    description:
      "Official website of Vee (@veemeta), Chief Roar Officer at Doginal Dogs and founding member of Crypto Spaces Network.",
    images: [
      {
        url: MEDIA_ASSETS.profpic.heroPath,
        width: MEDIA_ASSETS.profpic.width,
        height: MEDIA_ASSETS.profpic.height,
        alt: MEDIA_ASSETS.profpic.alt,
      },
    ],
  },
};

const FACE_FOCUS: Record<string, string> = {
  "personal-brand-without-getting-captured-by-the-audience": "50% 46%",
};

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.legalName,
    alternateName: [SITE_CONFIG.knownAs, SITE_CONFIG.handle],
    homeLocation: { "@type": "Place", name: "Toronto, Canada" },
    url: absoluteUrl("/"),
    image: absoluteUrl(MEDIA_ASSETS.profpic.heroPath),
    sameAs: [SITE_CONFIG.xUrl, SITE_CONFIG.doginalDogsUrl],
    jobTitle: "Chief Roar Officer",
    worksFor: {
      "@type": "Organization",
      name: "Doginal Dogs",
      url: SITE_CONFIG.doginalDogsUrl,
    },
    description:
      "Veronica Michelle Campbell, known as Vee Meta (@veemeta), is Chief Roar Officer at Doginal Dogs and a founding member of the Crypto Spaces Network (CSN). Toronto, Canada.",
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

  const latestArticles = getSortedArticles().slice(0, 3);

  return (
    <>
      <JsonLd data={[personSchema, faqSchema]} />

      <div className="container">
        {/* Full-width Centered Hero Section */}
        <section style={{ padding: "48px 0 48px", textAlign: "center", width: "100%", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.25rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "20px" }}>
            It started on the <span style={{ color: "#64ffff" }}>mic</span>.
          </h1>          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.15rem",
              maxWidth: "640px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Vee — @veemeta. Chief Roar Officer at Doginal Dogs. Founding member of Crypto Spaces Network. Toronto.
          </p>

          <div className="hero-actions">
            <Link href={SITE_CONFIG.hardlinePath} className="btn btn-primary">
              Get the DIY Kit — $497
            </Link>
            <a
              href={SITE_CONFIG.spaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Join us live · 8:30 AM ET
            </a>
          </div>
          <p className="space-line">{SITE_CONFIG.spaceLine}</p>
        </section>

        {/* Featured Initiatives */}
        <section style={{ margin: "40px 0" }}>
          <h2>Featured Initiatives</h2>
          <div className="grid-3">
            <div className="card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "16px" }}>
                  <Image
                    src={MEDIA_ASSETS.ddveephoto.cardPath}
                    alt={MEDIA_ASSETS.ddveephoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="lazy"
                    style={{ objectFit: "cover", objectPosition: "41% 59%" }}
                  />
                </div>
                <div className="card-header">
                  <h3>Doginal Dogs</h3>
                  <span className="badge">Community &amp; Voice</span>
                </div>
                <p>
                  Backing new voices and roaring in Spaces. Come bark with us.
                </p>
                {MEDIA_ASSETS.ddveephoto.caption && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    {MEDIA_ASSETS.ddveephoto.caption}
                  </p>
                )}
              </div>
              <a
                href={SITE_CONFIG.doginalDogsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="descriptive-link"
                style={{ marginTop: "16px" }}
              >
                Chief Roar Officer at Doginal Dogs {"→"}
              </a>
            </div>

            <div className="card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "16px" }}>
                  <Image
                    src={MEDIA_ASSETS.ddnyc1.cardPath}
                    alt={MEDIA_ASSETS.ddnyc1.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="lazy"
                    style={{ objectFit: "cover", objectPosition: "48% 52%" }}
                  />
                </div>
                <div className="card-header">
                  <h3>Crypto Spaces Network</h3>
                  <span className="badge badge-cyan">Live Audio</span>
                </div>
                <p>
                  Founding member. We spotlight projects where the Web3 world is already tuned in.
                </p>
                {MEDIA_ASSETS.ddnyc1.caption && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    {MEDIA_ASSETS.ddnyc1.caption}
                  </p>
                )}
              </div>
              <a
                href={SITE_CONFIG.csnPartnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="descriptive-link"
                style={{ marginTop: "16px" }}
              >
                Partner with us on CSN {"→"}
              </a>
            </div>

            <div className="card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "16px" }}>
                  <Image
                    src={MEDIA_ASSETS.headshot1.cardPath}
                    alt={MEDIA_ASSETS.headshot1.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="lazy"
                    style={{ objectFit: "cover", objectPosition: "74% 22%" }}
                  />
                </div>
                <div className="card-header">
                  <h3>Work with Vee</h3>
                  <span className="badge">Collaborations</span>
                </div>
                <p>
                  Got a project, a stage, or a big idea? Drop a note. Let's make some noise.
                </p>
              </div>
              <Link
                href="/work-with-me"
                className="descriptive-link"
                style={{ marginTop: "16px" }}
              >
                Get in touch {"→"}
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section style={{ margin: "60px 0 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2>Latest Articles</h2>
            <Link href="/articles" className="descriptive-link">
              View all essays {"→"}
            </Link>
          </div>

          {latestArticles.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", margin: "24px 0 40px" }}>
              {latestArticles.map((article) => (
                <article key={article.slug} className="card" style={{ flexDirection: "row", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
                  <Link href={`/articles/${article.slug}`} aria-label={article.title} style={{ display: "block", flex: "0 0 400px", maxWidth: "100%" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        loading="lazy"
                        style={{ objectFit: "cover", objectPosition: FACE_FOCUS[article.slug] || "center", transform: "scale(1.15)", transformOrigin: FACE_FOCUS[article.slug] || "center" }}
                      />
                    </div>
                  </Link>
                  <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                    <div className="card-header">
                      <span className="badge">{article.category}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{article.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", margin: "12px 0 8px" }}>
                      <Link href={`/articles/${article.slug}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                        {article.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "0.95rem" }}>{article.answerLead}</p>
                    <Link href={`/articles/${article.slug}`} className="descriptive-link" style={{ fontSize: "0.9rem" }}>
                      Read essay: {article.title} {"→"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic", marginTop: "16px" }}>
              Essays are added as they are published.
            </p>
          )}
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "-8px", marginBottom: "24px" }}>
            Quick answers. Fresh brew.
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
