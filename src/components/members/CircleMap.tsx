"use client";

import type { Block } from "@/data/workbooks/types";
import { arr, str, useStore } from "./store";
import { AutoTextarea } from "./Inputs";

type B = Extract<Block, { type: "circleMap" }>;

const RING_COLORS = ["#debcff", "#64ffff", "#ffe154", "#c9a6f5", "#7b8496"];
const RADII = [58, 98, 136, 170, 200]; // outer radius of each layer
const short = (s: string) => (s.length > 11 ? s.slice(0, 10) + "…" : s);

function RingMap({ b, layers }: { b: B; layers: string[][] }) {
  const c = 210;
  const summary = b.layers.map((l, i) => `${l.title}: ${layers[i].length ? layers[i].join(", ") : "empty"}`).join(". ");
  return (
    <svg className="m-ringmap" viewBox="0 0 420 420" role="img" aria-label={`Your circle map. ${summary}`}>
      {[...RADII].reverse().map((r, ri) => {
        const i = RADII.length - 1 - ri;
        return (
          <circle
            key={r}
            cx={c}
            cy={c}
            r={r}
            fill={i === 0 ? "rgba(222,188,255,0.14)" : "rgba(255,255,255,0.015)"}
            stroke={RING_COLORS[i]}
            strokeOpacity={i === 4 ? 0.45 : 0.6}
            strokeWidth={i === 0 ? 2 : 1.25}
            strokeDasharray={i === 4 ? "4 5" : undefined}
          />
        );
      })}
      {b.layers.map((l, i) => {
        const names = layers[i];
        const inner = i === 0 ? 0 : RADII[i - 1];
        const r = i === 0 ? (names.length <= 1 ? 0 : 30) : (inner + RADII[i]) / 2;
        return names.map((n, j) => {
          const ang = -Math.PI / 2 + (2 * Math.PI * j) / Math.max(names.length, 1) + (i % 2 ? Math.PI / Math.max(names.length, 1) : 0);
          const x = c + r * Math.cos(ang);
          const y = c + r * Math.sin(ang);
          return (
            <g key={`${l.key}-${j}`}>
              <circle cx={x} cy={y} r={3.2} fill={RING_COLORS[i]} />
              <text x={x} y={y - 6} textAnchor="middle" className="m-ring-label" fill="#f8fafc">
                {short(n)}
              </text>
            </g>
          );
        });
      })}
      {layers.every((l) => !l.length) ? (
        <text x={c} y={c + 4} textAnchor="middle" className="m-ring-empty" fill="#94a3b8">You</text>
      ) : null}
    </svg>
  );
}

export default function CircleMap({ b }: { b: B }) {
  const { answers, set } = useStore();
  const layerNames = b.layers.map((l) => arr<string>(answers[`${b.id}.${l.key}`]));
  const cleanNames = layerNames.map((ns) => ns.map((n) => n.trim()).filter(Boolean));

  return (
    <div className="m-circlemap">
      <div className="m-ring-sticky">
        <RingMap b={b} layers={cleanNames} />
        <ul className="m-ring-legend">
          {b.layers.map((l, i) => (
            <li key={l.key}>
              <span className="m-dot" style={{ background: RING_COLORS[i] }} aria-hidden="true" />
              {l.title.replace(/^Circle \w+: /, "")} <span className="m-muted">({cleanNames[i].length})</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="m-layers">
        {b.layers.map((l, i) => {
          const key = `${b.id}.${l.key}`;
          const names = layerNames[i];
          const shown = names.length < b.maxPerLayer ? [...names, ""] : names;
          const setName = (j: number, v: string) => {
            const next = [...names];
            next[j] = v;
            set(key, next);
          };
          const compact = () => {
            const next = names.filter((n) => n.trim());
            if (next.length !== names.length) set(key, next);
          };
          return (
            <section className="m-layer" key={l.key} style={{ borderColor: RING_COLORS[i] }} aria-labelledby={`${key}-t`}>
              <h4 id={`${key}-t`} className="m-layer-title" style={{ color: RING_COLORS[i] }}>{l.title}</h4>
              <p className="m-p">{l.description}</p>
              <fieldset className="m-names">
                <legend className="m-mini-label">People in this layer ({cleanNames[i].length}/{b.maxPerLayer})</legend>
                <div className="m-names-grid">
                  {shown.map((n, j) => (
                    <input
                      key={j}
                      className="m-input"
                      aria-label={`${l.title} — name ${j + 1}`}
                      placeholder={j === names.length ? "+ Add a name" : `Name ${j + 1}`}
                      value={n}
                      onChange={(e) => setName(j, e.target.value)}
                      onBlur={compact}
                    />
                  ))}
                </div>
              </fieldset>
              <p className="m-group-label">Questions:</p>
              {l.questions.map((q, qi) => {
                const k = `${key}.q${qi}`;
                return (
                  <div className="m-q" key={k}>
                    <label htmlFor={k} className="m-q-text">{q}</label>
                    <AutoTextarea id={k} rows={1} value={str(answers[k])} onChange={(e) => set(k, e.target.value)} />
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
