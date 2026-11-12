import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/siteConfig";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath }: HeaderProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header" role="banner">
        <div className="container nav-wrapper">
          <div className="brand-group" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                    priority
                  />
                </div>
              </div>
            </a>
            <Link href="/" className="brand-name-link" aria-label="Vee Homepage">
              <span>{SITE_CONFIG.displayName}</span>
            </Link>
          </div>

          <nav className="nav-scroll" aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <Link
                  href="/"
                  className={`nav-link ${currentPath === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`nav-link ${currentPath === "/about" ? "active" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className={`nav-link ${
                    currentPath?.startsWith("/articles") ? "active" : ""
                  }`}
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/work-with-me"
                  className={`nav-link ${
                    currentPath === "/work-with-me" ? "active" : ""
                  }`}
                >
                  Work with Vee
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className={`nav-link ${
                    currentPath === "/portal" ? "active" : ""
                  }`}
                  style={{ color: "#debcff", fontWeight: 600 }}
                >
                  VIP Portal 🔒
                </Link>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  X @veemeta
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
