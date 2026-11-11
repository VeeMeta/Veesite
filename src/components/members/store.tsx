"use client";

import { createContext, useContext } from "react";
import type { Block, WorkbookPart } from "@/data/workbooks/types";

export type Answers = Record<string, unknown>;

export interface StoreApi {
  answers: Answers;
  set: (key: string, value: unknown) => void;
}

export const StoreContext = createContext<StoreApi>({ answers: {}, set: () => {} });
export const useStore = () => useContext(StoreContext);

export const str = (v: unknown) => (typeof v === "string" ? v : "");
export const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const filled = (v: unknown) => typeof v === "string" && v.trim().length > 0;

export interface Scorecard {
  id: string;
  person: string;
  relationship: string;
  context: string;
  timeKnown: string;
  scores: Record<string, number>;
  evidence: Record<string, string>;
}
export interface RatingRow { id: string; name: string; r: Record<string, string> }
export interface AssignRow { id: string; name: string; action: string; note: string }

export const uid = () => Math.random().toString(36).slice(2, 10);

export function scoreTotal(card: Scorecard, dims: string[]) {
  let total = 0;
  let count = 0;
  for (const d of dims) {
    const s = card.scores?.[d];
    if (typeof s === "number" && s >= 1 && s <= 5) {
      total += s;
      count++;
    }
  }
  return { total, count };
}

/** [done, total] progress units for one block. */
export function blockProgress(b: Block, a: Answers): [number, number] {
  switch (b.type) {
    case "writeins":
    case "yesno":
      return [b.questions.filter((_, i) => filled(a[`${b.id}.${i}`])).length, b.questions.length];
    case "fields":
      return [
        b.fields.filter((f) =>
          f.multi ? Array.from({ length: f.multi }).some((_, j) => filled(a[`${b.id}.${f.key}.${j}`])) : filled(a[`${b.id}.${f.key}`]),
        ).length,
        b.fields.length,
      ];
    case "circleMap": {
      let done = 0;
      let total = 0;
      for (const l of b.layers) {
        total += 1 + l.questions.length;
        if (arr<string>(a[`${b.id}.${l.key}`]).some(filled)) done++;
        done += l.questions.filter((_, i) => filled(a[`${b.id}.${l.key}.q${i}`])).length;
      }
      return [done, total];
    }
    case "scorecards": {
      const cards = arr<Scorecard>(a[b.id]);
      if (!cards.length) return [0, 1];
      let done = 0;
      for (const c of cards) done += (filled(c.person) ? 1 : 0) + scoreTotal(c, b.dimensions).count;
      return [done, cards.length * (b.dimensions.length + 1)];
    }
    case "ratingTable": {
      const rows = arr<RatingRow>(a[b.id]).filter((r) => filled(r.name));
      if (!rows.length) return [0, 1];
      let done = 0;
      for (const r of rows) done += 1 + b.attributes.filter((at) => filled(r.r?.[at])).length;
      return [done, rows.length * (b.attributes.length + 1)];
    }
    case "choiceTable":
      return [b.rows.filter((_, i) => filled(a[`${b.id}.${i}`])).length, b.rows.length];
    case "matrix":
      return [b.rows.filter((_, i) => filled(a[`${b.id}.${i}`])).length, b.rows.length];
    case "assign": {
      const rows = arr<AssignRow>(a[b.id]).filter((r) => filled(r.name));
      if (!rows.length) return [0, 1];
      return [rows.filter((r) => filled(r.action)).length, rows.length];
    }
    case "checklist": {
      let done = 0;
      let total = 0;
      b.groups.forEach((g, gi) =>
        g.items.forEach((_, i) => {
          total++;
          if (a[`${b.id}.${gi}.${i}`] === true) done++;
        }),
      );
      return [done, total];
    }
    default:
      return [0, 0];
  }
}

export function partProgress(p: WorkbookPart, a: Answers) {
  let done = 0;
  let total = 0;
  for (const b of p.blocks) {
    const [d, t] = blockProgress(b, a);
    done += d;
    total += t;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** Plain-text summary of a member's answers for one Part (for "Ask Vee"). */
export function partAnswersText(p: WorkbookPart, a: Answers): string {
  const out: string[] = [];
  const line = (label: string, v: unknown) => {
    if (filled(v)) out.push(`• ${label} ${String(v).trim()}`);
  };
  for (const b of p.blocks) {
    switch (b.type) {
      case "writeins":
      case "yesno":
        b.questions.forEach((q, i) => line(q, a[`${b.id}.${i}`]));
        break;
      case "fields":
        b.fields.forEach((f) => {
          if (f.multi) {
            const vals = Array.from({ length: f.multi }, (_, j) => str(a[`${b.id}.${f.key}.${j}`]).trim()).filter(Boolean);
            if (vals.length) out.push(`• ${f.label} ${vals.join("; ")}`);
          } else line(f.label, a[`${b.id}.${f.key}`]);
        });
        break;
      case "circleMap":
        b.layers.forEach((l) => {
          const names = arr<string>(a[`${b.id}.${l.key}`]).filter(filled);
          if (names.length) out.push(`• ${l.title}: ${names.join(", ")}`);
          l.questions.forEach((q, i) => line(`  ${q}`, a[`${b.id}.${l.key}.q${i}`]));
        });
        break;
      case "scorecards":
        arr<Scorecard>(a[b.id]).forEach((c) => {
          const { total, count } = scoreTotal(c, b.dimensions);
          out.push(`• Scorecard — ${c.person || "Unnamed"}${c.relationship ? ` (${c.relationship})` : ""}: ${total}/50 (${count}/10 scored)`);
          b.dimensions.forEach((d) => c.scores?.[d] && out.push(`    ${d}: ${c.scores[d]}/5`));
          b.evidence.forEach((e) => filled(c.evidence?.[e.key]) && out.push(`    ${e.label} ${c.evidence[e.key].trim()}`));
        });
        break;
      case "ratingTable":
        arr<RatingRow>(a[b.id]).filter((r) => filled(r.name)).forEach((r) => {
          out.push(`• ${r.name}: ${b.attributes.map((at) => `${at} ${r.r?.[at] || "–"}`).join(", ")}`);
        });
        break;
      case "choiceTable":
        b.rows.forEach((row, i) => line(`${row}:`, a[`${b.id}.${i}`]));
        break;
      case "matrix":
        b.rows.forEach((row, i) => line(`${row.pattern} — who fits:`, a[`${b.id}.${i}`]));
        break;
      case "assign":
        arr<AssignRow>(a[b.id]).filter((r) => filled(r.name)).forEach((r) => out.push(`• ${r.name}: ${r.action || "–"}${r.note ? ` (${r.note})` : ""}`));
        break;
      case "checklist":
        b.groups.forEach((g, gi) => {
          const done = g.items.filter((_, i) => a[`${b.id}.${gi}.${i}`] === true);
          if (done.length) out.push(`• ${g.title} done: ${done.join(" ")}`);
        });
        break;
      case "flags":
        b.items.forEach((it, i) => a[`${b.id}.${i}`] === true && out.push(`• Sees pattern: ${it.title}`));
        break;
    }
  }
  return out.join("\n");
}
