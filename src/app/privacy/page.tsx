import { SITE_CONFIG, absoluteUrl } from "@/data/siteConfig";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for www.veemeta.com. Email checkout, invited member portals, and limited analytics.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy policy for www.veemeta.com. Payment is arranged by email. Members and VIP portals are invite-only.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <section style={{ padding: "20px 0 60px" }}>
        <h1>Privacy Policy</h1>

        <div className="answer-lead">
          <p>
            This site is the personal brand page for Vee (@veemeta). We keep data collection small, and we say plainly where an account or a payment actually exists.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "32px" }}>
          <div>
            <h2>1. Accounts</h2>
            <p>
              The public pages do not ask you to create an account. The members portal and the VIP portal are for people we invite. Members sign in with a personal code we issue. We do not run a public signup, and we do not sell account data.
            </p>
          </div>

          <div>
            <h2>2. Contact, Email &amp; Payment</h2>
            <p>
              The contact path on this site is email (
              <a href={SITE_CONFIG.contactMailto} className="descriptive-link">
                {SITE_CONFIG.contactEmail}
              </a>
              ). Offers such as the HAP DIY Kit are paid that way: you email us, we reply with a payment link, and the kit follows once it is paid. We do not run a card checkout on this website. Messages you send are handled by your email provider and ours.
            </p>
          </div>

          <div>
            <h2>3. Newsletters &amp; Analytics</h2>
            <p>
              We do not run an email newsletter from this site. We do not deploy third-party advertising trackers. The site uses Vercel hosting analytics to see traffic and whether pages are healthy.
            </p>
          </div>

          <div>
            <h2>4. Compliance Note</h2>
            <p>
              This is a personal brand site with a few real offers and invited portals. We do not claim a formal GDPR certification or a corporate privacy seal.
            </p>
          </div>

          <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ fontSize: "0.95rem" }}>
              Questions about this privacy statement? Contact:{" "}
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
