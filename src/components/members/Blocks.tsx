"use client";

import { AutoTextarea, Choice } from "./Inputs";
import type { Block } from "@/data/workbooks/types";
import { arr, str, uid, useStore, type AssignRow, type RatingRow } from "./store";
import CircleMap from "./CircleMap";
import Scorecards from "./Scorecards";

function Writeins({ b }: { b: Extract<Block, { type: "writeins" }> }) {
  const { answers, set } = useStore();
  return (
    <div className="m-group">
      {b.label ? <p className="m-group-label">{b.label}</p> : null}
      {b.questions.map((q, i) => {
        const k = `${b.id}.${i}`;
        return (
          <div className="m-q" key={k}>
            <label htmlFor={k} className="m-q-text">{q}</label>
            <AutoTextarea id={k} rows={1} value={str(answers[k])} placeholder={b.placeholder || "Write here…"} onChange={(e) => set(k, e.target.value)} />
          </div>
        );
      })}
    </div>
  );
}

function YesNo({ b }: { b: Extract<Block, { type: "yesno" }> }) {
  const { answers, set } = useStore();
  return (
    <div className="m-group">
      {b.label ? <p className="m-group-label">{b.label}</p> : null}
      {b.questions.map((q, i) => {
        const k = `${b.id}.${i}`;
        return (
          <div className="m-q m-q-yn" key={k}>
            <span className="m-q-text" id={`${k}-q`}>{q}</span>
            <Choice name={k} legend={q} hideLegend small options={["Y", "N"]} value={str(answers[k])} onChange={(v) => set(k, v)} />
          </div>
        );
      })}
    </div>
  );
}

function Fields({ b }: { b: Extract<Block, { type: "fields" }> }) {
  const { answers, set } = useStore();
  return (
    <div className="m-group">
      {b.fields.map((f) => {
        if (f.multi) {
          return (
            <fieldset className="m-q" key={f.key}>
              <legend className="m-q-text">{f.label}</legend>
              {Array.from({ length: f.multi }, (_, j) => {
                const k = `${b.id}.${f.key}.${j}`;
                return (
                  <input key={k} className="m-input m-mb" aria-label={`${f.label} ${j + 1}`} placeholder={`${j + 1}.`} value={str(answers[k])} onChange={(e) => set(k, e.target.value)} />
                );
              })}
            </fieldset>
          );
        }
        const k = `${b.id}.${f.key}`;
        return (
          <div className="m-q" key={k}>
            <label htmlFor={k} className="m-q-text">{f.label}</label>
            <AutoTextarea id={k} rows={f.rows || 2} value={str(answers[k])} onChange={(e) => set(k, e.target.value)} />
          </div>
        );
      })}
    </div>
  );
}

function RatingTable({ b }: { b: Extract<Block, { type: "ratingTable" }> }) {
  const { answers, set } = useStore();
  const stored = arr<RatingRow>(answers[b.id]);
  const rows: RatingRow[] = stored.length >= b.minRows ? stored : [...stored, ...Array.from({ length: b.minRows - stored.length }, () => ({ id: uid(), name: "", r: {} }))];
  const update = (next: RatingRow[]) => set(b.id, next);
  const patch = (i: number, p: Partial<RatingRow>) => update(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  return (
    <div className="m-group">
      <div className="m-rating-list">
        {rows.map((row, i) => (
          <div className="m-rating-card" key={row.id}>
            <div className="m-row-head">
              <label className="sr-only" htmlFor={`${b.id}-${row.id}`}>Person {i + 1}</label>
              <input id={`${b.id}-${row.id}`} className="m-input" placeholder={`Person ${i + 1}`} value={row.name} onChange={(e) => patch(i, { name: e.target.value })} />
              {rows.length > 1 ? (
                <button type="button" className="m-x m-noprint" aria-label={`Remove ${row.name || `person ${i + 1}`}`} onClick={() => update(rows.filter((_, j) => j !== i))}>×</button>
              ) : null}
            </div>
            <div className="m-rating-grid">
              {b.attributes.map((at) => (
                <label key={at} className="m-rating-cell">
                  <span>{at}</span>
                  <select className="m-input m-select" value={row.r?.[at] || ""} onChange={(e) => patch(i, { r: { ...row.r, [at]: e.target.value } })} data-val={row.r?.[at] || ""}>
                    <option value="">–</option>
                    {b.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-secondary m-small-btn m-noprint" onClick={() => update([...rows, { id: uid(), name: "", r: {} }])}>+ Add person</button>
    </div>
  );
}

function ChoiceTable({ b }: { b: Extract<Block, { type: "choiceTable" }> }) {
  const { answers, set } = useStore();
  const counts = b.options.map((o) => ({ o, n: b.rows.filter((_, i) => answers[`${b.id}.${i}`] === o).length }));
  return (
    <div className="m-group">
      {b.rows.map((row, i) => {
        const k = `${b.id}.${i}`;
        return (
          <div className="m-q m-q-yn" key={k}>
            <span className="m-q-text">{row}</span>
            <Choice name={k} legend={row} hideLegend small options={b.options} value={str(answers[k])} onChange={(v) => set(k, v)} />
          </div>
        );
      })}
      <p className="m-summary" aria-live="polite">
        {counts.map((c) => `${c.o}: ${c.n}`).join(" · ")}
      </p>
    </div>
  );
}

function Matrix({ b }: { b: Extract<Block, { type: "matrix" }> }) {
  const { answers, set } = useStore();
  return (
    <div className="m-matrix">
      <div className="m-matrix-head" aria-hidden="true">
        <span>Relationship pattern</span>
        <span>Appropriate response</span>
      </div>
      {b.rows.map((row, i) => {
        const k = `${b.id}.${i}`;
        return (
          <div className="m-matrix-row" key={k}>
            <p className="m-matrix-pattern">{row.pattern}</p>
            <p className="m-matrix-response">{row.response}</p>
            <div className="m-matrix-who">
              <label htmlFor={k} className="m-mini-label">Who fits this pattern?</label>
              <AutoTextarea id={k} rows={1} value={str(answers[k])} onChange={(e) => set(k, e.target.value)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Assign({ b }: { b: Extract<Block, { type: "assign" }> }) {
  const { answers, set } = useStore();
  const stored = arr<AssignRow>(answers[b.id]);
  const rows: AssignRow[] = stored.length >= b.minRows ? stored : [...stored, ...Array.from({ length: b.minRows - stored.length }, () => ({ id: uid(), name: "", action: "", note: "" }))];
  const update = (next: AssignRow[]) => set(b.id, next);
  const patch = (i: number, p: Partial<AssignRow>) => update(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  return (
    <div className="m-group">
      <div className="m-actions-legend">
        {b.actions.map((a) => {
          const names = rows.filter((r) => r.action === a.key && r.name.trim()).map((r) => r.name.trim());
          return (
            <div key={a.key} className="m-action-card" data-action={a.key}>
              <p className="m-action-key">{a.key}</p>
              <p className="m-action-text">{a.text}</p>
              {names.length ? <p className="m-action-names">{names.join(", ")}</p> : null}
            </div>
          );
        })}
      </div>
      <p className="m-group-label">Assign an action to each relationship</p>
      {rows.map((row, i) => (
        <div className="m-assign-row" key={row.id}>
          <input className="m-input" aria-label={`Relationship ${i + 1}`} placeholder={`Person ${i + 1}`} value={row.name} onChange={(e) => patch(i, { name: e.target.value })} />
          <select className="m-input m-select" aria-label={`Action for ${row.name || `relationship ${i + 1}`}`} value={row.action} data-val={row.action} onChange={(e) => patch(i, { action: e.target.value })}>
            <option value="">Choose action</option>
            {b.actions.map((a) => (
              <option key={a.key} value={a.key}>{a.key}</option>
            ))}
          </select>
          <input className="m-input" aria-label={`Next step for ${row.name || `relationship ${i + 1}`}`} placeholder="Next step" value={row.note} onChange={(e) => patch(i, { note: e.target.value })} />
          {rows.length > 1 ? (
            <button type="button" className="m-x m-noprint" aria-label={`Remove ${row.name || `relationship ${i + 1}`}`} onClick={() => update(rows.filter((_, j) => j !== i))}>×</button>
          ) : null}
        </div>
      ))}
      <button type="button" className="btn btn-secondary m-small-btn m-noprint" onClick={() => update([...rows, { id: uid(), name: "", action: "", note: "" }])}>+ Add relationship</button>
    </div>
  );
}

function Checklist({ b }: { b: Extract<Block, { type: "checklist" }> }) {
  const { answers, set } = useStore();
  let done = 0;
  let total = 0;
  b.groups.forEach((g, gi) => g.items.forEach((_, i) => { total++; if (answers[`${b.id}.${gi}.${i}`] === true) done++; }));
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="m-group">
      <div className="m-plan-progress">
        <div className="m-bar" role="progressbar" aria-label="30-day plan progress" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="m-summary" aria-live="polite">{done} of {total} done ({pct}%)</p>
      </div>
      <div className="m-weeks">
        {b.groups.map((g, gi) => {
          const gDone = g.items.filter((_, i) => answers[`${b.id}.${gi}.${i}`] === true).length;
          return (
            <fieldset className="m-week" key={g.title}>
              <legend className="m-week-title">
                {g.title} <span className="m-week-count">{gDone}/{g.items.length}</span>
              </legend>
              {g.items.map((it, i) => {
                const k = `${b.id}.${gi}.${i}`;
                return (
                  <label className="m-check" key={k}>
                    <input type="checkbox" checked={answers[k] === true} onChange={(e) => set(k, e.target.checked)} />
                    <span>{it}</span>
                  </label>
                );
              })}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

function Flags({ b }: { b: Extract<Block, { type: "flags" }> }) {
  const { answers, set } = useStore();
  return (
    <div className="m-flags">
      {b.items.map((it, i) => {
        const k = `${b.id}.${i}`;
        return (
          <div className="m-flag" key={k}>
            <p className="m-flag-title">{it.title}</p>
            <p className="m-flag-text">{it.text}</p>
            <label className="m-check is-small">
              <input type="checkbox" checked={answers[k] === true} onChange={(e) => set(k, e.target.checked)} />
              <span>{b.label}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "kicker":
      return <p className="m-kicker">{b.text}</p>;
    case "h3":
      return <h3 className="m-h3">{b.text}</h3>;
    case "p":
      return <p className="m-p">{b.text}</p>;
    case "bullets":
      return (
        <ul className={`m-bullets ${b.columns === 2 ? "is-2" : ""}`}>
          {b.items.map((it) => <li key={it}>{it}</li>)}
        </ul>
      );
    case "chips":
      return (
        <ul className="m-chips">
          {b.items.map((it) => <li key={it}>{it}</li>)}
        </ul>
      );
    case "numbered":
      return (
        <ol className="m-numbered">
          {b.items.map((it, i) => (
            <li key={it.title}>
              <span className="m-num" aria-hidden="true">{i + 1}</span>
              <span>
                <strong>{it.title}</strong>
                {it.text ? <span className="m-num-text">{it.text}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      );
    case "principle":
      return (
        <div className="m-principle">
          {b.label ? <p className="m-principle-label">{b.label}</p> : null}
          <p>{b.text}</p>
        </div>
      );
    case "watch":
      return <p className="m-watch"><strong>Watch for:</strong> {b.text}</p>;
    case "note":
      return <p className="m-note">{b.text}</p>;
    case "instruction":
      return <p className="m-instruction m-noprint">{b.text}</p>;
    case "writeins":
      return <Writeins b={b} />;
    case "yesno":
      return <YesNo b={b} />;
    case "fields":
      return <Fields b={b} />;
    case "circleMap":
      return <CircleMap b={b} />;
    case "scorecards":
      return <Scorecards b={b} />;
    case "ratingTable":
      return <RatingTable b={b} />;
    case "choiceTable":
      return <ChoiceTable b={b} />;
    case "matrix":
      return <Matrix b={b} />;
    case "assign":
      return <Assign b={b} />;
    case "checklist":
      return <Checklist b={b} />;
    case "flags":
      return <Flags b={b} />;
  }
}
