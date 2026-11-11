/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
