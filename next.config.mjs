/** @type {import('next').NextConfig} */
const CANONICAL = "https://www.veemeta.com";

// Exact hosts only. Preview deploys use other *.vercel.app names
// (branch and deployment URLs). A wildcard would send those to production.
const LEGACY_HOSTS = ["veemeta.com", "veesite.vercel.app"];

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Members portal: bundle the gated workbook PDFs with the route that serves them.
    outputFileTracingIncludes: {
      "/api/members/files/[slug]": ["./private/workbooks/**"],
    },
  },
  async redirects() {
    const toCanonical = LEGACY_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${CANONICAL}/:path*`,
      permanent: true,
    }));

    // Vercel already upgrades http→https at the edge. This covers a request
    // that still arrives on the public hosts with x-forwarded-proto: http.
    const httpsUpgrade = ["www.veemeta.com", ...LEGACY_HOSTS].map((host) => ({
      source: "/:path*",
      has: [
        { type: "host", value: host },
        { type: "header", key: "x-forwarded-proto", value: "http" },
      ],
      destination: `${CANONICAL}/:path*`,
      permanent: true,
    }));

    return [...toCanonical, ...httpsUpgrade];
  },
};

export default nextConfig;
