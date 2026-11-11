"use client";

import { useState } from "react";

export default function LoginForm({ next, initialError }: { next: string; initialError: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code.trim()) {
      setError("Enter your personal code.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, next }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        window.location.assign(data.next || "/members");
        return;
      }
      setError(data.error || "Something went wrong. Try again.");
    } catch {
      setError("Network error. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <form className="m-gate-form" method="post" action="/api/members/login" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="next" value={next} />
      <label htmlFor="member-code" className="m-label">Your personal code</label>
      <input
        id="member-code"
        name="code"
        className="m-input m-code-input"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "member-code-error" : undefined}
        maxLength={128}
        required
      />
      <button className="btn btn-primary m-full" type="submit" disabled={busy}>
        {busy ? "Checking…" : "Unlock the portal"}
      </button>
      <p id="member-code-error" className="m-error" role="alert" aria-live="assertive">{error}</p>
    </form>
  );
}
