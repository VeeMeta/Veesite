import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE, verifySessionToken } from "@/lib/members/auth";
import { getWorkbook } from "@/data/workbooks/registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Serves a workbook's blank PDF from /private/workbooks (never from /public),
// so it can't be downloaded without a valid member session.
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await verifySessionToken(req.cookies.get(MEMBER_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Members only." }, { status: 401 });
  }
  const wb = getWorkbook(params.slug);
  if (!wb?.pdfFile) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  try {
    const file = await readFile(path.join(process.cwd(), "private", "workbooks", path.basename(wb.pdfFile)));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${wb.slug}-workbook.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "File unavailable." }, { status: 404 });
  }
}
