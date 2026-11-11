"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Workbook } from "@/data/workbooks/types";
import { BlockView } from "./Blocks";
import { AskVeeDialog, AskVeeForm } from "./AskVee";
import { StoreContext, partAnswersText, partProgress, type Answers } from "./store";
import LogoutButton from "./LogoutButton";

export default function WorkbookClient({ workbook }: { workbook: Workbook }) {
  const storageKey = `bowmeta:wb:${workbook.slug}:v${workbook.storageVersion}`;
  const [answers, setAnswers] = useState<Answers>({});
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [askPart, setAskPart] = useState(workbook.parts[0].id);
  const [currentPart, setCurrentPart] = useState(workbook.parts[0].id);
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.answers === "object") {
          setAnswers(parsed.answers);
          if (parsed.savedAt) setSavedAt(new Date(parsed.savedAt));
        }
      }
    } catch {
      setStorageError(true);
    }
    setLoaded(true);
  }, [storageKey]);

  // Debounced autosave.
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      try {
        const now = new Date();
        localStorage.setItem(storageKey, JSON.stringify({ workbook: workbook.slug, version: workbook.storageVersion, savedAt: now.toISOString(), answers }));
        setSavedAt(now);
        setStorageError(false);
      } catch {
        setStorageError(true);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [answers, loaded, storageKey, workbook.slug, workbook.storageVersion]);

  const set = useCallback((key: string, value: unknown) => setAnswers((prev) => ({ ...prev, [key]: value })), []);
  const store = useMemo(() => ({ answers, set }), [answers, set]);

  // Track which Part is on screen (default Part for the floating Ask button).
  useEffect(() => {
    if (!loaded) return;
    const els = workbook.parts.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setCurrentPart(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded, workbook.parts]);

  const progress = workbook.parts.map((p) => partProgress(p, answers));
  const totalDone = progress.reduce((s, p) => s + p.done, 0);
  const totalAll = progress.reduce((s, p) => s + p.total, 0);
  const overall = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;
  const askParts = workbook.parts.map((p) => ({ id: p.id, name: p.label === "Final" ? p.title : `${p.label} — ${p.title}` }));
  const getAnswers = useCallback((partId: string) => {
    const p = workbook.parts.find((x) => x.id === partId);
    return p ? partAnswersText(p, answers) : "";
  }, [answers, workbook.parts]);

  function exportJson() {
    const data = { workbook: workbook.slug, title: workbook.title, version: workbook.storageVersion, exportedAt: new Date().toISOString(), answers };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workbook.slug}-my-answers-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Your answers file is downloading.");
  }

  async function importJson(file: File) {
    try {
      const data = JSON.parse(await file.text());
      if (!data || data.workbook !== workbook.slug || typeof data.answers !== "object" || Array.isArray(data.answers)) {
        setNotice("That file isn’t a saved answers file for this workbook.");
        return;
      }
      if (Object.keys(answers).length && !window.confirm("Replace the answers on this device with the ones in this file?")) return;
      setAnswers(data.answers);
      setNotice("Answers imported.");
    } catch {
      setNotice("Couldn’t read that file.");
    }
  }

  function clearAll() {
    if (!window.confirm("Erase all your answers for this workbook on this device? Download them first if you want a copy.")) return;
    setAnswers({});
    setNotice("Answers cleared.");
  }

  const openAsk = (partId: string) => {
    setAskPart(partId);
    setAskOpen(true);
  };

  return (
    <StoreContext.Provider value={store}>
      <div className="container m-wb">
        <div className="m-topbar m-noprint">
          <Link href="/members" className="m-link-btn">← Library</Link>
          <LogoutButton />
        </div>

        <header className="m-wb-hero">
          <p className="m-brand">{workbook.brand}</p>
          <p className="m-kicker">Workbook {String(workbook.number).padStart(2, "0")} of 5</p>
          <h1>{workbook.title}</h1>
          <p className="m-tagline">{workbook.tagline}</p>
          <p className="m-motto">{workbook.motto}</p>
        </header>

        <section className="m-toolbar m-noprint" aria-label="Workbook tools">
          <div className="m-overall">
            <div className="m-bar" role="progressbar" aria-label="Overall progress" aria-valuenow={overall} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${overall}%` }} />
            </div>
            <p className="m-summary" aria-live="polite">
              {overall}% complete ·{" "}
              {storageError ? "Couldn’t save on this device (private browsing?). Download your answers to keep them." : savedAt ? `Saved on this device at ${savedAt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Answers save on this device as you type"}
            </p>
          </div>
          <div className="m-tools">
            <button type="button" className="btn btn-secondary m-small-btn" onClick={exportJson}>Download my answers</button>
            <button type="button" className="btn btn-secondary m-small-btn" onClick={() => fileRef.current?.click()}>Import answers</button>
            <button type="button" className="btn btn-secondary m-small-btn" onClick={() => window.print()}>Print / save as PDF</button>
            {workbook.pdfFile ? (
              <a className="btn btn-secondary m-small-btn" href={`/api/members/files/${workbook.slug}`} download>Blank PDF</a>
            ) : null}
            <button type="button" className="m-link-btn m-danger" onClick={clearAll}>Clear answers</button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Import answers file" tabIndex={-1} onChange={(e) => { const f = e.target.files?.[0]; if (f) importJson(f); e.target.value = ""; }} />
          </div>
          {notice ? <p className="m-ok" role="status">{notice}</p> : null}
        </section>

        <nav className="m-partnav m-noprint" aria-label="Workbook parts">
          <ol>
            {workbook.parts.map((p, i) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className={currentPart === p.id ? "is-on" : ""} aria-current={currentPart === p.id ? "location" : undefined}>
                  <span className="m-partnav-label">{p.label === "Final" ? "Final" : p.label.replace("Part ", "")}</span>
                  <span className="m-partnav-pct" aria-label={`${progress[i].pct}% complete`}>{progress[i].total ? `${progress[i].pct}%` : "·"}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {!loaded ? (
          <p className="m-loading" role="status">Loading your workbook…</p>
        ) : (
          workbook.parts.map((p, i) => (
            <section key={p.id} id={p.id} className="m-part" aria-labelledby={`${p.id}-title`}>
              <header className="m-part-head">
                <p className="m-kicker">{p.label === "Final" ? "Final" : p.label}</p>
                <h2 id={`${p.id}-title`}>{p.title}</h2>
                {progress[i].total ? (
                  <div className="m-part-progress m-noprint">
                    <div className="m-bar is-thin" aria-hidden="true"><span style={{ width: `${progress[i].pct}%` }} /></div>
                    <span className="m-summary">{progress[i].pct}% filled in</span>
                  </div>
                ) : null}
              </header>
              {p.blocks.map((b, bi) => (
                <BlockView key={bi} b={b} />
              ))}
              <details className="m-ask-inline m-noprint">
                <summary>Ask Vee about {p.label === "Final" ? "the Final Reflection" : `${p.label}: ${p.title}`}</summary>
                <AskVeeForm workbookTitle={workbook.title} parts={askParts} initialPart={p.id} getAnswers={getAnswers} />
              </details>
            </section>
          ))
        )}

        <footer className="m-closing">
          {workbook.closing.map((l, i) => (
            <p key={l} className={i === 0 ? "m-closing-brand" : i === workbook.closing.length - 1 ? "m-closing-last" : ""}>{l}</p>
          ))}
          <p className="m-next m-noprint">Next in the series: <strong>Narrative Gravity</strong> (coming soon)</p>
        </footer>
      </div>

      <button type="button" className="m-fab m-noprint" onClick={() => openAsk(currentPart)} aria-haspopup="dialog">
        <span aria-hidden="true">?</span> Ask Vee
      </button>
      <AskVeeDialog open={askOpen} onClose={() => setAskOpen(false)} workbookTitle={workbook.title} parts={askParts} initialPart={askPart} getAnswers={getAnswers} />
    </StoreContext.Provider>
  );
}
