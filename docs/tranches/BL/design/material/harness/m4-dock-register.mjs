#!/usr/bin/env node
// M-4 · Dock ink keeps its register. Dock muted ≠ dock fg (ΔL_OK ≥ 0.08), and neither is #000 or #fff by
// construction. The inks are the painted glyph cores of the dock's fg run (a tab label) and muted run (a label
// in the dock reading the muted register), in every dock cell: every ground, both themes.
//   node m4-dock-register.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, f, hex, lch, tag, GROUNDS, THEMES, LABEL } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: GROUNDS, scenes: ["ladder"] });
const t = tally(); t.add(true, false, missing);
const pole = (c) => c && (c.every((v) => v <= 1) || c.every((v) => v >= 254));
for (const { cell, gated } of have) {
  if (cell.nodock) { lines.push(`${tag(cell)}: dock ${LABEL.nodock}`); continue; }
  const rows = inkRows(cap, cell).filter((r) => r.spec === "dock");
  const fg = rows.find((r) => r.cls === "fg"), mu = rows.find((r) => r.cls === "muted");
  if (!fg || !mu || !fg.rgb || !mu.rgb) { t.add(gated, false); lines.push(`${tag(cell)}: dock fg or muted run not painted ✗`); continue; }
  const dL = Math.abs(lch(fg.rgb)[0] - lch(mu.rgb)[0]);
  const ok = dL >= 0.08 && !pole(fg.rgb) && !pole(mu.rgb);
  t.add(gated, ok);
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: dock fg ${hex(fg.rgb)} muted ${hex(mu.rgb)} ΔL_OK ${f(dL, 3)}${pole(fg.rgb) ? " · fg is a pole" : ""}${pole(mu.rgb) ? " · muted is a pole" : ""}${ok ? "" : " ✗"}`);
}
report(cap, { id: "M-4", title: "dock ink keeps its register (ΔL_OK(fg, muted) ≥ 0.08; neither #000 nor #fff)", lines, ...t, gate });
