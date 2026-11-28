import Link from "next/link";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function IncomeCta() {
  return (
    <aside className="income-cta" aria-label="Ways to work with Vee">
      <span className="eyebrow">Work with us</span>
      <h2>Lock it down, or come lock in with us.</h2>
      <p className="space-line" style={{ marginTop: 10 }}>
        The HAP DIY Kit is yours to run. Brand Lock-In Lab opens the workbooks. The Space is live every morning.
      </p>
      <div className="income-cta-actions">
        <Link href={SITE_CONFIG.hardlinePath} className="btn btn-primary">
          Get the DIY Kit — $497
        </Link>
        <a
          href={SITE_CONFIG.subsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Join Brand Lock-In Lab · $7/mo
        </a>
      </div>
      <div className="income-cta-links">
        <a href={SITE_CONFIG.spaceUrl} target="_blank" rel="noopener noreferrer">
          {SITE_CONFIG.spaceLine}
        </a>
        <a href={SITE_CONFIG.spaceUrl} target="_blank" rel="noopener noreferrer">
          Discuss on X (@veemeta)
        </a>
      </div>
    </aside>
  );
}
