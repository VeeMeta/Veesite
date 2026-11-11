// Members portal — workbook content model.
// Every workbook is plain data (serializable), rendered by the generic
// <WorkbookClient>. To add a workbook: create a content file like
// powerCircle.ts, then register it in registry.ts.

export type YesNo = "Y" | "N";

export type Block =
  | { type: "kicker"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[]; columns?: 1 | 2 }
  | { type: "chips"; items: string[] }
  | { type: "numbered"; items: { title: string; text?: string }[] }
  | { type: "principle"; label?: string; text: string }
  | { type: "watch"; text: string }
  | { type: "note"; text: string }
  | { type: "instruction"; text: string }
  // Fillable blocks ----------------------------------------------------
  // write-in line per question
  | { type: "writeins"; id: string; label?: string; questions: string[]; placeholder?: string }
  // Y/N toggle per question
  | { type: "yesno"; id: string; label?: string; questions: string[] }
  // labelled free-text fields
  | { type: "fields"; id: string; fields: { key: string; label: string; rows?: number; multi?: number }[] }
  // concentric circle map with names per layer
  | {
      type: "circleMap";
      id: string;
      layers: { key: string; title: string; description: string; questions: string[] }[];
      maxPerLayer: number;
    }
  // relationship scorecard(s) with auto total + band
  | {
      type: "scorecards";
      id: string;
      contexts: string[];
      scaleLegend: { score: number; label: string }[];
      dimensions: string[];
      bands: { min: number; max: number; text: string }[];
      disclaimer: string;
      evidence: { key: string; label: string; rows?: number }[];
    }
  // table of people x attributes rated H/M/L
  | { type: "ratingTable"; id: string; attributes: string[]; options: string[]; minRows: number; label?: string }
  // one choice per row (e.g. Strong / Mixed / Weak)
  | { type: "choiceTable"; id: string; measureLabel: string; rows: string[]; options: string[] }
  // pattern -> response matrix with "who fits" write-ins
  | { type: "matrix"; id: string; rows: { pattern: string; response: string }[] }
  // assign people to one of a fixed set of actions
  | { type: "assign"; id: string; actions: { key: string; text: string }[]; minRows: number }
  // weekly checklists with progress
  | { type: "checklist"; id: string; groups: { title: string; items: string[] }[] }
  // checkbox list ("I see this pattern")
  | { type: "flags"; id: string; label: string; items: { title: string; text: string }[] };

export interface WorkbookPart {
  id: string; // stable, used for storage + anchors
  label: string; // "Part I"
  title: string; // "The Foundation"
  blocks: Block[];
}

export interface Workbook {
  slug: string;
  number: number;
  title: string;
  brand: string;
  tagline: string;
  motto: string;
  parts: WorkbookPart[];
  closing: string[];
  pdfFile?: string; // file name in /private/workbooks (served through gated API)
  storageVersion: number;
}

export interface WorkbookListing {
  slug: string;
  number: number;
  title: string;
  blurb: string;
  status: "available" | "coming-soon";
}
