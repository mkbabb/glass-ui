// rows.mjs · the row generators the witnesses share: which cells a witness needs, the glyph and indicator
// rows of a cell, and the compact per-cell summaries. Every number comes from lib.mjs's painted-pixel metrics.
import path from "node:path";
import { glyphRing, edgeContrast, readPng, pick, tag, f, LABEL } from "./lib.mjs";

// The cells a witness needs, per engine. A gate engine's missing or crashed cell is a FAIL row (an incomplete
// capture never passes); a Playwright WebKit crash is recorded as UNMEASURED.
export function need(cap, gate, want) {
  const have = [], lines = []; let missing = 0;
  const engines = [...new Set([...gate, ...cap.cells.map((c) => c.engine)])];
  for (const engine of engines) for (const theme of want.themes) for (const ground of want.grounds) for (const scene of want.scenes) {
    const c = pick(cap, { engine, theme, ground, scene, variant: want.variant || "base" })[0];
    const gated = gate.includes(engine);
    if (!c) { if (gated) { missing++; lines.push(`MISSING ${engine} ${theme} ${ground} ${scene}: not captured`); } continue; }
    if (c.crashed) { if (gated) { missing++; lines.push(`CRASH ${tag(c)}: ${c.error || "page crashed"}`); } else lines.push(`${tag(c)}: UNMEASURED (Playwright WebKit crashed: ${c.error || "page crash"})`); continue; }
    have.push({ cell: c, gated });
  }
  return { have, lines, missing };
}

export const inkClass = (id) => (id.includes("muted") ? "muted" : "fg");

const _ink = new Map();
export function inkRows(cap, cell) {
  const k = cap.capdir + "|" + cell.files.full;
  if (!_ink.has(k)) {
    const rows = [];
    for (const s of cell.specs) for (const ink of s.inks) {
      const r = glyphRing(cap, cell, ink, 1);
      rows.push({ spec: s.id, band: s.band, ink: ink.id, cls: inkClass(ink.id), well: ink.id.startsWith("well"), ...r });
    }
    _ink.set(k, rows);
  }
  return _ink.get(k);
}

export function indicatorRows(cap, cell) {
  const rows = [];
  const full = cap.img(cell, "full");
  for (const s of cell.specs) for (const e of s.edges) rows.push({ spec: s.id, band: s.band, kind: "perimeter", id: e.id, ...edgeContrast(full, e) });
  for (const r of cell.rings || []) {
    if (!r.painted || !r.file) { rows.push({ spec: r.spec, kind: "ring", id: r.id, p05: null, n: 0, note: r.note || "no ring" }); continue; }
    rows.push({ spec: r.spec, kind: "ring", id: r.id, focusVisible: r.focusVisible, ...edgeContrast(readPng(path.join(cap.capdir, r.file)), r, r.dx, r.dy) });
  }
  return rows;
}

// "a–b (worst: spec)" over a set of values.
export function span(rows, key = "p05") {
  const v = rows.filter((r) => r[key] != null);
  if (!v.length) return "—";
  const lo = v.reduce((a, b) => (b[key] < a[key] ? b : a)), hi = v.reduce((a, b) => (b[key] > a[key] ? b : a));
  return `${f(lo[key])}–${f(hi[key])} (min ${lo.spec}${lo.ink ? "·" + lo.ink : lo.id ? "·" + lo.id : ""})`;
}

// Tally: a row is gated when its cell's engine is a gate engine.
export function tally() {
  const t = { gateRows: 0, gateFails: 0, infoRows: 0, infoFails: 0 };
  t.add = (gated, ok, n = 1) => { if (gated) { t.gateRows += n; if (!ok) t.gateFails += n; } else { t.infoRows += n; if (!ok) t.infoFails += n; } };
  return t;
}
export const engineNote = (c) => (c.engine === "webkit" ? " [" + LABEL.webkit.split(" (")[0] + "]" : "");
