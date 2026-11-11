import LoginForm from "@/components/members/LoginForm";
import { BOW_META } from "@/data/workbooks/registry";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  code: "That code didn’t work. Check it and try again.",
  rate: "Too many attempts. Please wait a few minutes and try again.",
  off: "The members portal isn’t switched on yet. Please check back soon.",
};

export default function MembersLoginPage({ searchParams }: { searchParams: { next?: string; error?: string; bye?: string } }) {
  return (
    <div className="container m-gate-wrap">
      <section className="m-gate" aria-labelledby="gate-title">
        <p className="m-brand">{BOW_META.brand}</p>
        <h1 id="gate-title">Members Portal</h1>
        <p className="m-tagline">{BOW_META.tagline}</p>
        <p className="m-gate-copy">
          The BOW META workbook series is for subscribers and BOW DAO members. Enter the personal code Vee shared with you.
        </p>
        {searchParams.bye ? <p className="m-ok" role="status">You’re signed out. Your answers stay saved on this device.</p> : null}
        <LoginForm next={searchParams.next || "/members"} initialError={searchParams.error ? ERRORS[searchParams.error] || ERRORS.code : ""} />
        <p className="m-motto">{BOW_META.motto}</p>
      </section>
    </div>
  );
}
