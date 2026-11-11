"use client";

import { useState } from "react";
import type { Block } from "@/data/workbooks/types";
import { arr, scoreTotal, uid, useStore, type Scorecard } from "./store";
import { AutoTextarea, Choice } from "./Inputs";

type B = Extract<Block, { type: "scorecards" }>;

const blank = (): Scorecard => ({ id: uid(), person: "", relationship: "", context: "", timeKnown: "", scores: {}, evidence: {} });

export function bandFor(total: number, bands: B["bands"]) {
  return bands.find((x) => total >= x.min && total <= x.max);
}

export default function Scorecards({ b }: { b: B }) {
  const { answers, set } = useStore();
  const cards = arr<Scorecard>(answers[b.id]);
  const [activeId, setActiveId] = useState<string | null>(cards[0]?.id ?? null);
  const active = cards.find((c) => c.id === activeId) || cards[0];

  const save = (next: Scorecard[]) => set(b.id, next);
  const patch = (p: Partial<Scorecard>) => active && save(cards.map((c) => (c.id === active.id ? { ...c, ...p } : c)));
  const add = () => {
    const c = blank();
    save([...cards, c]);
    setActiveId(c.id);
  };
  const remove = () => {
    if (!active) return;
    if (!window.confirm(`Delete the scorecard for ${active.person || "this person"}?`)) return;
    const next = cards.filter((c) => c.id !== active.id);
    save(next);
    setActiveId(next[0]?.id ?? null);
  };

  const { total, count } = active ? scoreTotal(active, b.dimensions) : { total: 0, count: 0 };
  const complete = count === b.dimensions.length;
  const band = complete ? bandFor(total, b.bands) : undefined;
  const lows = active ? b.dimensions.filter((d) => (active.scores?.[d] ?? 9) <= 2) : [];

  return (
    <div className="m-scorecards" id={`${b.id}-wrap`}>
      <div className="m-legend-row">
        <p className="m-group-label">Rate each dimension · Use a score from 1–5.</p>
        <ul className="m-scale">
          {b.scaleLegend.map((s) => (
            <li key={s.score}><strong>{s.score}</strong> = {s.label}</li>
          ))}
        </ul>
      </div>

      <div className="m-tabs m-noprint" role="tablist" aria-label="Your saved scorecards">
        {cards.map((c, i) => {
          const t = scoreTotal(c, b.dimensions);
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active?.id === c.id}
              className={`m-tab ${active?.id === c.id ? "is-on" : ""}`}
              onClick={() => setActiveId(c.id)}
            >
              {c.person.trim() || `Person ${i + 1}`} · {t.total}/50
            </button>
          );
        })}
        <button type="button" className="m-tab m-tab-add" onClick={add}>+ New scorecard</button>
      </div>

      {!active ? (
        <div className="m-empty">
          <p>No scorecards yet. Start one for the first significant person in your circle.</p>
          <button type="button" className="btn btn-primary" onClick={add}>Start a scorecard</button>
        </div>
      ) : (
        <div className="m-card" role="tabpanel" aria-label={`Scorecard for ${active.person || "this person"}`}>
          <div className="m-two">
            <div className="m-q">
              <label className="m-q-text" htmlFor={`sc-person-${active.id}`}>Person</label>
              <input id={`sc-person-${active.id}`} className="m-input" value={active.person} onChange={(e) => patch({ person: e.target.value })} />
            </div>
            <div className="m-q">
              <label className="m-q-text" htmlFor={`sc-rel-${active.id}`}>Relationship</label>
              <input id={`sc-rel-${active.id}`} className="m-input" value={active.relationship} onChange={(e) => patch({ relationship: e.target.value })} />
            </div>
          </div>
          <Choice name={`sc-ctx-${active.id}`} legend="Primary context" small options={b.contexts} value={active.context} onChange={(v) => patch({ context: v })} />
          <div className="m-q">
            <label className="m-q-text" htmlFor={`sc-time-${active.id}`}>Time known</label>
            <input id={`sc-time-${active.id}`} className="m-input" value={active.timeKnown} onChange={(e) => patch({ timeKnown: e.target.value })} />
          </div>

          <div className="m-dims">
            {b.dimensions.map((d) => (
              <div className="m-dim" key={d}>
                <Choice
                  name={`sc-${active.id}-${d}`}
                  legend={d}
                  small
                  options={["1", "2", "3", "4", "5"]}
                  value={active.scores?.[d] ? String(active.scores[d]) : ""}
                  onChange={(v) => {
                    const scores = { ...active.scores };
                    if (v) scores[d] = Number(v);
                    else delete scores[d];
                    patch({ scores });
                  }}
                />
              </div>
            ))}
          </div>

          <div className={`m-total ${band ? `band-${b.bands.indexOf(band)}` : ""}`} aria-live="polite">
            <p className="m-total-num">
              Total: <strong>{total}</strong> / 50
            </p>
            {band ? (
              <p className="m-total-band">{band.text}</p>
            ) : (
              <p className="m-total-band m-muted">
                {count} of {b.dimensions.length} scored. Score every dimension to see your interpretation.
              </p>
            )}
            {lows.length ? (
              <p className="m-total-low">Look closer: {lows.map((d) => `${d} (${active.scores[d]})`).join(", ")}</p>
            ) : null}
          </div>

          <div className="m-bands">
            <p className="m-group-label">Interpret the result</p>
            <ul>
              {b.bands.map((x) => (
                <li key={x.min} className={band === x ? "is-on" : ""}>
                  <strong>{x.min}–{x.max}:</strong> {x.text}
                </li>
              ))}
            </ul>
            <p className="m-disclaimer">{b.disclaimer}</p>
          </div>

          <p className="m-group-label">Behavioural evidence</p>
          {b.evidence.map((e) => {
            const k = `sc-ev-${active.id}-${e.key}`;
            return (
              <div className="m-q" key={k}>
                <label htmlFor={k} className="m-q-text">{e.label}</label>
                <AutoTextarea id={k} rows={e.rows || 2} value={active.evidence?.[e.key] || ""} onChange={(ev) => patch({ evidence: { ...active.evidence, [e.key]: ev.target.value } })} />
              </div>
            );
          })}
          <button type="button" className="m-link-btn m-danger m-noprint" onClick={remove}>Delete this scorecard</button>
        </div>
      )}

      {cards.length > 1 ? (
        <div className="m-sc-summary">
          <p className="m-group-label">All scorecards</p>
          <ul>
            {cards.map((c, i) => {
              const t = scoreTotal(c, b.dimensions);
              const bd = t.count === b.dimensions.length ? bandFor(t.total, b.bands) : undefined;
              return (
                <li key={c.id}>
                  <strong>{c.person.trim() || `Person ${i + 1}`}</strong> — {t.total}/50{bd ? ` · ${bd.text}` : ` · ${t.count}/10 scored`}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
