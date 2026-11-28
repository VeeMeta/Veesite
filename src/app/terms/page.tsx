import { SITE_CONFIG, absoluteUrl } from "@/data/siteConfig";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for www.veemeta.com. Plain-language terms for a personal brand site, email checkout, and invited portals.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms for www.veemeta.com. Offers are paid by email. Members and VIP portals are for people we invite.",
  },
};

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <section style={{ padding: "20px 0 60px" }}>
        <h1>Terms of Service</h1>

        <div className="answer-lead">
          <p>
            Welcome to {SITE_CONFIG.domainPlaceholder}. By visiting this site, you agree to these straightforward terms.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "32px" }}>
          <div>
            <h2>1. Personal Brand Page</h2>
            <p>
              This website is the personal brand page for Vee (@veemeta). It is not the official corporate website of Doginal Dogs or any other entity, though her role as Chief Roar Officer is accurately represented.
            </p>
          </div>

          <div>
            <h2>2. Offers &amp; Payment</h2>
            <p>
              Listed offers, including the HAP DIY Kit ($497 one-time) and Brand Lock-In Lab ($7 a month), are real. Payment is arranged by email: you write us, we reply with a payment link, and browsing this site does not charge you or finish a purchase. Custom consults are priced one by one after we hear what you need. The $497 DIY Kit is credited in full toward Guided Install when you upgrade within 30 days.
            </p>
          </div>

          <div>
            <h2>3. Members &amp; VIP Portals</h2>
            <p>
              A members portal and a VIP portal exist for people we have already invited. Walking the public site does not open an account. Access to those portals follows the invite we send you.
            </p>
          </div>

          <div>
            <h2>4. No Financial, Investment, or Legal Advice</h2>
            <p>
              Content, articles, briefings, and audio commentary linked or published on this site are for informational and cultural discussion. Nothing on this website is financial, investment, trading, or legal advice.
            </p>
          </div>

          <div>
            <h2>5. Content Updates</h2>
            <p>
              Information, articles, prices, and site content may be updated over time to match what we are actually offering.
            </p>
          </div>

          <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ fontSize: "0.95rem" }}>
              For legal or administrative inquiries, reach out to:{" "}
              <a href={SITE_CONFIG.contactMailto} className="descriptive-link">
                {SITE_CONFIG.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
