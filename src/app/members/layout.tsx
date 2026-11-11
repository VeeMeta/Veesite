import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./members.css";

// Same fonts as the root layout, under non-conflicting variable names.
// (globals.css defines --font-sans in terms of itself, which browsers treat as
// invalid, so the rest of the site currently falls back to a serif font.)
const outfit = Outfit({ subsets: ["latin"], variable: "--m-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--m-font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "BOW META Members",
  robots: { index: false, follow: false, nocache: true },
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <div className={`m-root ${outfit.variable} ${mono.variable}`}>{children}</div>;
}
