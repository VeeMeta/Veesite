import Link from "next/link";
import { BOW_META, SERIES_LISTINGS } from "@/data/workbooks/registry";
import LogoutButton from "@/components/members/LogoutButton";

export const dynamic = "force-dynamic";

export default function MembersHome() {
  return (
    <div className="container">
      <div className="m-topbar">
        <p className="m-brand">{BOW_META.brand}</p>
        <LogoutButton />
      </div>
      <header className="m-hero">
        <h1>Your workbook library</h1>
        <p className="m-tagline">{BOW_META.tagline}</p>
        <p>
          Fill in each workbook right here. Your answers save to this device as you type, and you can ask Vee a question
          from any Part.
        </p>
      </header>
      <ol className="m-library" aria-label="BOW META workbook series">
        {SERIES_LISTINGS.map((wb) => {
          const open = wb.status === "available";
          const num = String(wb.number).padStart(2, "0");
          const inner = (
            <>
              <div className="m-lib-top">
                <span className="m-lib-num" aria-hidden="true">{num}</span>
                <span className={open ? "badge badge-cyan" : "badge"}>{open ? "Unlocked" : "Coming soon"}</span>
              </div>
              <h2 className="m-lib-title">{wb.title}</h2>
              <p className="m-lib-blurb">{wb.blurb}</p>
              {open ? <span className="m-lib-cta">Open workbook →</span> : <span className="m-lib-soon">Workbook {num} of 5</span>}
            </>
          );
          return (
            <li key={wb.slug} className={`m-lib-card ${open ? "is-open" : "is-soon"}`}>
              {open ? (
                <Link href={`/members/${wb.slug}`} className="m-lib-link" aria-label={`Open ${wb.title}`}>
                  {inner}
                </Link>
              ) : (
                <div className="m-lib-link" aria-disabled="true">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="m-motto">{BOW_META.motto}</p>
    </div>
  );
}
