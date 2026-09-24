#!/usr/bin/env node
// W-A · D3-A's witness: a guarantee with no signal. With no writer of `--glass-backdrop-luma` in `src`, every
// chrome level clears M-2 over black and white and every content level over its declared band, and the tokens'
// α equal the bound's solution.
//   Leg 1 (source): no writer of --glass-backdrop-luma in <worktree>/src (setProperty or a style-object key).
//   Leg 2: chrome levels (floating, overlay, dialog-rung, dock, popover, the real Dialog): every text run clears
//          4.5 on the 1 px ring over black and white, both themes.
//   Leg 3: content levels (wash, quiet, resting, card): every text run clears 4.5 over their declared band, the
//          fields the library itself ships (paper, the aurora at ceilings 1 and 0.5), both themes.
//   Leg 4: each level's painted α (from its composites over black and white) is within 0.03 of the bound's
//          least α: chrome over {black, white}; content over the raw field pixels under each ink's own text box
//          on paper and both aurora ceilings (p05 of the contrast of that ink over α·P + (1 − α)·field), with the
//          pole P read from the same paint. The analytic composite leaves blur and saturate out.
//   node wa-no-signal.mjs <capdir> [--worktree <path>] [--gate chromium[,webkit]]
import fs from "node:fs";
import path from "node:path";
import { cli, loadCapture, gateEngines, report, paintedAlpha, region, cr, pct, f, hex, tag, pick, THEMES, CONTENT } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const a = cli({ worktree: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const wt = a.worktree || cap.meta?.worktree;
const t = tally(), lines = [];
// Leg 1
const writers = [];
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p); else if (/\.(ts|vue|js|mjs)$/.test(e.name)) fs.readFileSync(p, "utf8").split("\n").forEach((l, i) => {
    if (/setProperty\(\s*["'`]--glass-backdrop-luma["'`]/.test(l) || /["'`]--glass-backdrop-luma["'`]\s*:/.test(l)) writers.push(`${path.relative(wt, p)}:${i + 1}`); }); } };
if (wt && fs.existsSync(path.join(wt, "src"))) walk(path.join(wt, "src")); else writers.push("(no worktree to read: pass --worktree)");
t.add(true, writers.length === 0);
lines.push(`source: ${writers.length ? `writers of --glass-backdrop-luma: ${writers.join(", ")} ✗` : "no writer of --glass-backdrop-luma in src"}`);
// Legs 2 and 3
const CH = ["floating", "overlay", "dialog-rung", "dock", "popover", "dialog"];
const legs = [["chrome", CH, ["black", "white"]], ["content", CONTENT, ["paper", "aurora", "aurora50"]]];
for (const [band, ids, grounds] of legs) {
  const n = need(cap, gate, { themes: THEMES, grounds, scenes: ["ladder", "dialog"] });
  t.add(true, false, n.missing); lines.push(...n.lines);
  for (const { cell, gated } of n.have) {
    const rows = inkRows(cap, cell).filter((r) => ids.includes(r.spec));
    if (!rows.length) continue;
    const bad = rows.filter((r) => !(r.p05 >= 4.5));
    for (const r of rows) t.add(gated, r.p05 >= 4.5);
    const w = rows.reduce((x, y) => ((y.p05 ?? 0) < (x.p05 ?? 0) ? y : x));
    lines.push(`${band} ${tag(cell)}${gated ? "" : " [info]"}: ${rows.length - bad.length}/${rows.length} runs ≥ 4.5 · worst ${w.spec}·${w.ink} ${f(w.p05)}${bad.length ? " ✗" : ""}`);
  }
}
// Leg 4
const solve = (ok) => { for (let x = 0; x <= 1.0001; x += 0.005) if (ok(x)) return +x.toFixed(3); return null; };
const mix = (P, G, x) => P.map((p, i) => x * p + (1 - x) * G[i]);
for (const engine of [...new Set(cap.cells.map((c) => c.engine))]) for (const theme of THEMES) for (const scene of ["ladder", "dialog"]) {
  const gated = gate.includes(engine);
  const B = pick(cap, { engine, theme, ground: "black", scene, variant: "base" })[0], W = pick(cap, { engine, theme, ground: "white", scene, variant: "base" })[0];
  if (!B || !W || B.crashed || W.crashed) { if (gated) { t.add(true, false); lines.push(`α ${engine} ${theme} ${scene}: black or white cell missing ✗`); } continue; }
  const parts = [];
  for (const s of B.specs.filter((s) => s.sample && s.id !== "opaque")) {
    const { alpha, pole } = paintedAlpha(cap, B, W, s);
    const inks = new Map();   // ink id → the painted glyph-core colour
    for (const r of [...inkRows(cap, B), ...inkRows(cap, W)]) if (r.spec === s.id && !r.well && r.rgb && !inks.has(r.ink)) inks.set(r.ink, r.rgb);
    let bound = null;
    if (pole && inks.size) {
      if (CH.includes(s.id)) bound = solve((x) => [[0, 0, 0], [255, 255, 255]].every((G) => [...inks.values()].every((i) => cr(i, mix(pole, G, x)) >= 4.5)));
      else {
        // Each ink over the raw field under its OWN text box (the pixels its ring sees), across the declared band.
        const fields = ["paper", "aurora", "aurora50"].map((g) => pick(cap, { engine, theme, ground: g, scene, variant: "base" })[0]).filter((c) => c && !c.crashed);
        const under = new Map([...inks.keys()].map((id) => [id, fields.flatMap((c) => {
          const box = c.specs.find((z) => z.id === s.id)?.inks.find((i) => i.id === id)?.box;
          return box ? region(cap.img(c, "raw"), box).filter((_, k) => k % 3 === 0) : [];
        })]));
        bound = solve((x) => [...inks].every(([id, i]) => { const px = under.get(id); return px.length > 0 && pct(px.map((g) => cr(i, mix(pole, g, x))), 0.05) >= 4.5; }));
      }
    }
    const ok = bound != null && Math.abs(alpha - bound) <= 0.03;
    t.add(gated, ok);
    parts.push(`${s.id} α ${f(alpha, 3)} pole ${pole ? hex(pole) : "—"} bound ${bound == null ? "none (no α clears with this pole)" : f(bound, 3)}${ok ? "" : " ✗"}`);
  }
  lines.push(`α ${engine} ${theme} ${scene}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "W-A", title: "D3-A · a guarantee with no signal (no luma writer; chrome M-2 over black/white; content M-2 over its band; α = the bound)", lines, ...t, gate });
