"use client";

import Script from "next/script";

/**
 * Loads the framework-agnostic HAP DIY pop-out (public/hap/hap-modal.js + .css).
 * Any element with data-hap-open (or data-hap-open="buy") opens it, as do
 * ?hap=1, #hap-diy and #buy. Mount once — e.g. in src/app/layout.tsx to make it site-wide.
 */
export default function HapModal({ landingUrl = "/hardline" }: { landingUrl?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/hap/hap-modal.css" />
      <Script id="hap-modal-config" strategy="afterInteractive">
        {`window.HAP_MODAL_CONFIG = Object.assign({ landingUrl: ${JSON.stringify(landingUrl)} }, window.HAP_MODAL_CONFIG || {});`}
      </Script>
      <Script src="/hap/hap-modal.js" strategy="afterInteractive" />
    </>
  );
}
