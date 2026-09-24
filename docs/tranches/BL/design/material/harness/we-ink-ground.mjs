#!/usr/bin/env node
// W-E · D3-E's witness: every ink carries its ground. On the 1 px ring, muted p05 ≥ 4.5 over black, white, the
// checker and the aurora at every level with plate α ≤ 0.30; every indicator ≥ 3:1 against the band on both sides.
//   Leg 1: every muted run of every level but the opaque escape, over black, white, the 8 px checker and the
//          aurora at ceilings 1 and 0.5, both themes: p05 ≥ 4.5.
//   Leg 2: every level's painted α (from its composites over black and white) ≤ 0.30.
//   Leg 3: every perimeter and ring (as M-3) over the same grounds ≥ 3.0.
//   node we-ink-ground.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, paintedAlpha, f, tag, pick, THEMES } from "./lib.mjs";
import { need, tally, inkRows, indicatorRows, span } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const G = ["black", "white", "checker", "aurora", "aurora50"];
const n = need(cap, gate, { themes: THEMES, grounds: G, scenes: ["ladder", "dialog"] });
const t = tally(), lines = [...n.lines]; t.add(true, false, n.missing);
for (const { cell, gated } of n.have) {
  const mu = inkRows(cap, cell).filter((r) => r.cls === "muted" && r.spec !== "opaque");
  const ind = indicatorRows(cap, cell).filter((r) => r.spec !== "opaque");
  for (const r of mu) t.add(gated, r.p05 >= 4.5);
  for (const r of ind) t.add(gated, r.p05 >= 3);
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: muted ${span(mu)} · indicators ${span(ind)} · ${mu.filter((r) => !(r.p05 >= 4.5)).length + ind.filter((r) => !(r.p05 >= 3)).length ? "✗" : "ok"}`);
}
for (const engine of [...new Set(cap.cells.map((c) => c.engine))]) for (const theme of THEMES) for (const scene of ["ladder", "dialog"]) {
  const gated = gate.includes(engine);
  const B = pick(cap, { engine, theme, ground: "black", scene, variant: "base" })[0], W = pick(cap, { engine, theme, ground: "white", scene, variant: "base" })[0];
  if (!B || !W || B.crashed || W.crashed) continue;
  const parts = B.specs.filter((s) => s.sample && s.id !== "opaque").map((s) => { const { alpha } = paintedAlpha(cap, B, W, s); const ok = alpha <= 0.3; t.add(gated, ok); return `${s.id} ${f(alpha, 3)}${ok ? "" : " ✗"}`; });
  lines.push(`painted α ${engine} ${theme} ${scene}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "W-E", title: "D3-E · every ink carries its ground (muted ≥ 4.5 over black/white/checker/aurora at α ≤ 0.30; indicators ≥ 3:1)", lines, ...t, gate });
