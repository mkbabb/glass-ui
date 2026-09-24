#!/usr/bin/env node
// M-3 · Non-text ≥ 3:1. Perimeter and ring against the painted ground on both sides, every level and ground,
// both themes. Perimeter: each [data-edge] border (the field wells' edge, the house perimeter rung) along its
// top edge, band vs the adjacent row inside (the well fill) and outside (the plate composite). Ring: each
// [data-ring] focused with keyboard modality (the wells, the real Dialog's Close), its outline band vs the
// adjacent row inside (the offset gap) and outside. Per column min(inside, outside); p05 over the columns.
//   node m3-non-text.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import { cli, loadCapture, gateEngines, report, f, tag, GROUNDS, THEMES } from "./lib.mjs";
import { need, tally, indicatorRows, span } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: GROUNDS, scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const rows = indicatorRows(cap, cell);
  let fails = 0;
  for (const r of rows) { const ok = r.p05 != null && r.p05 >= 3; t.add(gated, ok); if (!ok) fails++; }
  const per = rows.filter((r) => r.kind === "perimeter"), ring = rows.filter((r) => r.kind === "ring");
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: perimeter ${span(per)} · ring ${span(ring)} · ${fails ? `${fails}/${rows.length} under 3.0` : `all ${rows.length} ≥ 3.0`}`);
  if (a.verbose) for (const r of rows) lines.push(`    ${r.spec}·${r.kind}:${r.id} p05 ${f(r.p05)} min ${f(r.min)} cols ${r.n}${r.note ? " (" + r.note + ")" : ""}${r.focusVisible === false ? " (not :focus-visible)" : ""}`);
}
report(cap, { id: "M-3", title: "non-text ≥ 3:1 (perimeter and ring against the painted ground on both sides)", lines, ...t, gate });
