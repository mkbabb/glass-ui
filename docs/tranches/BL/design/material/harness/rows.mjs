// rows.mjs · the row generators the witnesses share: which cells a witness needs, the glyph and indicator
// rows of a cell, and the compact per-cell summaries. Every number comes from lib.mjs's painted-pixel metrics.
import path from "node:path";
import { glyphRing, edgeContrast, readPng, pick, tag, f, LABEL, CELLS } from "./lib.mjs";

// The recurring-writer threshold (H-3): a custom property written in this many distinct animation frames of a live
// window is a per-frame signal, whatever its name and however it is written.
export const RECURRING_FRAMES = 3;

// The cells a witness needs, per engine. A gate engine's missing or crashed cell is a FAIL row (an incomplete
// capture never passes); a Playwright WebKit crash is recorded as UNMEASURED.
export function need(cap, gate, want) {
  const have = [], lines = []; let missing = 0;
  const engines = [...new Set([...gate, ...cap.cells.map((c) => c.engine)])];
  for (const engine of engines) for (const theme of want.themes) for (const ground of want.grounds) for (const scene of want.scenes) {
    if (CELLS && !CELLS.test(`${engine} ${theme} ${ground} ${scene}`)) continue;
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
      // H-8: the ring is read at R 1 (p05) and at R 3 (p05r3); M-2 gates both, the other witnesses read R 1.
      const r = glyphRing(cap, cell, ink, 1), r3 = glyphRing(cap, cell, ink, 3);
      rows.push({ spec: s.id, band: s.band, ink: ink.id, cls: inkClass(ink.id), well: ink.id.startsWith("well"), ...r, p05r3: r3.p05, nr3: r3.n });
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

// H-3: the behavioural signal leg (M-5 leg 1 and W-A leg 1). Over every live window: no main-thread readback
// (getImageData, readPixels, toDataURL) and no custom property written in RECURRING_FRAMES or more animation frames.
// A window is gated when its engine is a gate engine; a gate engine with no window is a FAIL row.
export function signalLeg(cap, t, lines, gate = ["chromium"]) {
  const wins = (cap.live || []).filter((x) => (x.variant || "base") === "base" && (!CELLS || CELLS.test(`${x.engine || "chromium"} ${x.theme} ${x.ground} ladder`)));
  for (const e of gate) if (!wins.some((x) => (x.engine || "chromium") === e)) {
    if (CELLS) { lines.push(`signal: no ${e} live window in the restricted cells (not read)`); continue; }
    t.add(true, false); lines.push(`signal: no ${e} live windows (capture with --live) ✗`); }
  for (const r of wins) {
    const gated = gate.includes(r.engine || "chromium");
    const cfg = `signal · live ${r.engine || "chromium"} ${r.theme} ${r.ground} (${r.liveMs} ms, ${r.frames ?? "?"} frames)${gated ? "" : " [info]"}`;
    if (r.error) { t.add(gated, false); lines.push(`${cfg}: ERROR ${r.error} ✗`); continue; }
    const rb = (r.getImageData || 0) + (r.readPixels || 0) + (r.toDataURL || 0);
    const rec = Object.entries(r.wframes || {}).filter(([, n]) => n >= RECURRING_FRAMES).sort((x, y) => y[1] - x[1]);
    const any = Object.entries(r.wframes || {}).sort((x, y) => y[1] - x[1]);
    const ok1 = rb === 0, ok2 = rec.length === 0;
    t.add(gated, ok1); t.add(gated, ok2);
    lines.push(`${cfg}: readbacks ${rb} (getImageData ${r.getImageData || 0}, readPixels ${r.readPixels || 0}, toDataURL ${r.toDataURL || 0})${ok1 ? "" : " ✗"} · custom-property writes: ${any.length ? any.slice(0, 6).map(([k, n]) => `${k} in ${n} frames`).join(", ") : "none"}${ok2 ? "" : ` · recurring writers (≥ ${RECURRING_FRAMES} frames): ${rec.map(([k]) => k).join(", ")} ✗`}`);
  }
}
