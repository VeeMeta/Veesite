"use client";

import { useEffect, useId, useState } from "react";
import { AutoTextarea } from "./Inputs";

const PROFILE_KEY = "bowmeta:member-profile";

type Result = { kind: "email" } | { kind: "mailto"; href: string } | null;

export function AskVeeForm({
  workbookTitle,
  parts,
  initialPart,
  getAnswers,
  onDone,
}: {
  workbookTitle: string;
  parts: { id: string; name: string }[];
  initialPart: string;
  getAnswers: (partId: string) => string;
  onDone?: () => void;
}) {
  const uidp = useId();
  const [part, setPart] = useState(initialPart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  useEffect(() => setPart(initialPart), [initialPart]);
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
      if (p.name) setName(p.name);
      if (p.email) setEmail(p.email);
    } catch {}
  }, []);

  const partName = parts.find((p) => p.id === part)?.name || "General";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Add your name.";
    if (!/^\S+@\S+\.\S{2,}$/.test(email.trim())) errs.email = "Add a valid email so Vee can reply.";
    if (question.trim().length < 5) errs.question = "Write your question (at least a few words).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setFormError("");
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ name: name.trim(), email: email.trim() }));
    } catch {}
    try {
      const r = await fetch("/api/members/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          question,
          workbook: workbookTitle,
          part: partName,
          answers: includeAnswers ? getAnswers(part) : "",
          website,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.status === 401) {
        setFormError("Your session ended. Refresh and enter your personal code again.");
      } else if (!r.ok || !data.ok) {
        setErrors(data.errors || {});
        setFormError(data.error || "Couldn’t send. Try again.");
      } else if (data.mode === "mailto" && data.mailto) {
        setResult({ kind: "mailto", href: data.mailto });
      } else {
        setResult({ kind: "email" });
        setQuestion("");
      }
    } catch {
      setFormError("Network error. Check your connection and try again.");
    }
    setBusy(false);
  }

  if (result?.kind === "email") {
    return (
      <div className="m-ask-done" role="status">
        <p><strong>Sent to Vee.</strong> She’ll reply to {email}.</p>
        <button type="button" className="m-link-btn" onClick={() => { setResult(null); onDone?.(); }}>Ask another question</button>
      </div>
    );
  }
  if (result?.kind === "mailto") {
    return (
      <div className="m-ask-done" role="status">
        <p><strong>Almost there.</strong> Tap below to send your question from your own email app.</p>
        <a className="btn btn-primary" href={result.href}>Send it to Vee by email</a>
        <button type="button" className="m-link-btn" onClick={() => setResult(null)}>Back to my question</button>
      </div>
    );
  }

  const id = (s: string) => `${uidp}-${s}`;
  return (
    <form className="m-ask-form" onSubmit={submit} noValidate>
      <div className="m-q">
        <label className="m-q-text" htmlFor={id("part")}>Which Part is this about?</label>
        <select id={id("part")} className="m-input m-select" value={part} onChange={(e) => setPart(e.target.value)}>
          {parts.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div className="m-two">
        <div className="m-q">
          <label className="m-q-text" htmlFor={id("name")}>Your name</label>
          <input id={id("name")} className="m-input" autoComplete="name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? id("name-err") : undefined} />
          {errors.name ? <p id={id("name-err")} className="m-error">{errors.name}</p> : null}
        </div>
        <div className="m-q">
          <label className="m-q-text" htmlFor={id("email")}>Your email</label>
          <input id={id("email")} type="email" className="m-input" autoComplete="email" value={email} maxLength={200} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? id("email-err") : undefined} />
          {errors.email ? <p id={id("email-err")} className="m-error">{errors.email}</p> : null}
        </div>
      </div>
      <div className="m-q">
        <label className="m-q-text" htmlFor={id("q")}>Your question for Vee</label>
        <AutoTextarea id={id("q")} rows={3} maxLength={4000} value={question} onChange={(e) => setQuestion(e.target.value)} aria-invalid={!!errors.question || undefined} aria-describedby={errors.question ? id("q-err") : undefined} />
        {errors.question ? <p id={id("q-err")} className="m-error">{errors.question}</p> : null}
      </div>
      <div className="m-hp" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this empty</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <label className="m-check is-small">
        <input type="checkbox" checked={includeAnswers} onChange={(e) => setIncludeAnswers(e.target.checked)} />
        <span>Include my answers from this Part</span>
      </label>
      <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Send my question"}</button>
      {formError ? <p className="m-error" role="alert">{formError}</p> : null}
    </form>
  );
}

export function AskVeeDialog(props: Omit<React.ComponentProps<typeof AskVeeForm>, "onDone"> & { open: boolean; onClose: () => void }) {
  const { open, onClose, ...rest } = props;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.activeElement as HTMLElement | null;
    setTimeout(() => (document.querySelector(".m-dialog select, .m-dialog input") as HTMLElement | null)?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="m-overlay m-noprint" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="m-dialog" role="dialog" aria-modal="true" aria-labelledby="ask-dialog-title">
        <div className="m-dialog-head">
          <h2 id="ask-dialog-title">Ask Vee a question</h2>
          <button type="button" className="m-x" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <AskVeeForm {...rest} />
      </div>
    </div>
  );
}
