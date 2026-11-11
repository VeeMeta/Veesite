import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./members.css";

// Portal-local font variables. The public site loads the same faces as
// --font-outfit / --font-jetbrains in src/app/layout.tsx. These --m-font-*
// names keep the workbook styles independent of that site-wide mapping.
const outfit = Outfit({ subsets: ["latin"], variable: "--m-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--m-font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "BOW META Members",
  robots: { index: false, follow: false, nocache: true },
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <div className={`m-root ${outfit.variable} ${mono.variable}`}>{children}</div>;
}
