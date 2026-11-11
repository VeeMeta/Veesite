// Workbook series registry. To release a workbook:
// 1. add its content file (see powerCircle.ts), 2. import it into WORKBOOKS,
// 3. flip its listing status to "available", 4. (optional) drop its blank PDF
//    into /private/workbooks and set pdfFile.
import type { Workbook, WorkbookListing } from "./types";
import { POWER_CIRCLE } from "./powerCircle";

export const SERIES_LISTINGS: WorkbookListing[] = [
  { slug: "power-circle-protocol", number: 1, title: "The Power Circle Protocol", blurb: "Build stronger circles through alignment, trust and discernment.", status: "available" },
  { slug: "narrative-gravity", number: 2, title: "Narrative Gravity", blurb: "Workbook 02 of the BOW META series.", status: "coming-soon" },
  { slug: "building-atmosphere", number: 3, title: "Building Atmosphere", blurb: "Workbook 03 of the BOW META series.", status: "coming-soon" },
  { slug: "building-momentum", number: 4, title: "Building Momentum", blurb: "Workbook 04 of the BOW META series.", status: "coming-soon" },
  { slug: "building-authority", number: 5, title: "Building Authority", blurb: "Workbook 05 of the BOW META series.", status: "coming-soon" },
];

export const WORKBOOKS: Record<string, Workbook> = {
  [POWER_CIRCLE.slug]: POWER_CIRCLE,
};

export function getWorkbook(slug: string): Workbook | undefined {
  const listing = SERIES_LISTINGS.find((l) => l.slug === slug);
  if (!listing || listing.status !== "available") return undefined;
  return WORKBOOKS[slug];
}

export const BOW_META = {
  brand: "BOW META | Strategic Relationships & Leadership Development",
  motto: "Show up. Contribute. Connect. Amplify.",
  tagline: "Build stronger circles through alignment, trust and discernment.",
};
