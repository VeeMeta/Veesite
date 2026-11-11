import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkbook } from "@/data/workbooks/registry";
import WorkbookClient from "@/components/members/WorkbookClient";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const wb = getWorkbook(params.slug);
  return { title: wb ? `${wb.title} · Members` : "Members", robots: { index: false, follow: false } };
}

export default function WorkbookPage({ params }: { params: { slug: string } }) {
  const wb = getWorkbook(params.slug);
  if (!wb) notFound();
  return <WorkbookClient workbook={wb} />;
}
