import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-content">
        <div className="footer-identity">
          <a
            href={SITE_CONFIG.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vee on X (@veemeta)"
            className="x-pfp-link"
          >
            <div className="x-spaces-ring">
              <div className="x-spaces-gap">
                <Image
                  src="/Veelogo.jpg"
                  alt="Vee Brand Logo"
                  width={36}
                  height={36}
                  className="brand-logo"
                />
              </div>
            </div>
          </a>
          <div className="footer-identity-copy">
            <p style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)" }}>
              {SITE_CONFIG.displayName} ({SITE_CONFIG.handle})
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              Chief Roar Officer at{" "}
              <a
                href={SITE_CONFIG.doginalDogsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="descriptive-link"
              >
                Doginal Dogs
              </a>
              {" "}
              Domain:{" "}
              <a href={SITE_CONFIG.canonicalHost} className="descriptive-link">
                {SITE_CONFIG.domainPlaceholder}
              </a>
            </p>
          </div>
        </div>
        <ul className="footer-links">
          <li>
            <a
              href={SITE_CONFIG.xUrl}
              target="_blank"
              rel="noopener noreferrer me"
              className="footer-link"
            >
              X (@veemeta)
            </a>
          </li>
          <li>
            <a
              href={SITE_CONFIG.doginalDogsUrl}
              target="_blank"
              rel="noopener noreferrer sameAs"
              className="footer-link"
            >
              Doginal Dogs
            </a>
          </li>
          <li>
            <Link href="/portal" className="footer-link" style={{ color: "var(--accent-gold)" }}>
              Subscriber Portal 🔒
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="footer-link">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="footer-link">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/sitemap.xml" className="footer-link">
              Sitemap
            </Link>
          </li>
          <li>
            <a href="/llms.txt" className="footer-link">
              llms.txt
            </a>
          </li>
        </ul>
      </div>

      <div className="container footer-attribution">
        <p style={{ margin: 0 }}>
          <Link href="/work-with-me" className="attribution-action">
            Want to work with us? Get in touch &rarr;
          </Link>
        </p>
        <p className="site-credit">
          Site by{" "}
          <a
            href={SITE_CONFIG.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="attribution-link"
          >
            {SITE_CONFIG.developerName}
          </a>
        </p>
      </div>
    </footer>
  );
}
