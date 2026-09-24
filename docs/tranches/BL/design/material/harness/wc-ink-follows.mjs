#!/usr/bin/env node
// W-C · D3-C's witness: ink follows the composite. The muted glyph-ring p05 lies in [4.5, 5.5] on every level and
// ground, both themes, and follows a consumer retune of --card or --background with no token edit.
//   Leg 1: every muted run (plate captions, the wells' placeholders, the dock label, the popover, the Dialog
//          caption) in every base cell: p05 ∈ [4.5, 5.5].
//   Leg 2: the same over paper in the `retune` variant, captured with lib.mjs's RETUNE_CSS injected (a consumer
//          re-pointing --background and --card only; run.mjs captures it).
//   node wc-ink-follows.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, f, tag, GROUNDS, THEMES } from "./lib.mjs";
import { need, tally, inkRows, span } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
for (const [variant, grounds] of [["base", GROUNDS], ["retune", ["paper"]]]) {
  const n = need(cap, gate, { themes: THEMES, grounds, scenes: ["ladder", "dialog"], variant });
  t.add(true, false, n.missing); lines.push(...n.lines);
  for (const { cell, gated } of n.have) {
    const rows = inkRows(cap, cell).filter((r) => r.cls === "muted");
    const bad = rows.filter((r) => !(r.p05 >= 4.5 && r.p05 <= 5.5));
    for (const r of rows) t.add(gated, r.p05 >= 4.5 && r.p05 <= 5.5);
    lines.push(`${tag(cell)}${gated ? "" : " [info]"}: muted ${span(rows)} · ${rows.length - bad.length}/${rows.length} in [4.5, 5.5]${bad.length ? ` · out: ${bad.slice(0, 6).map((r) => `${r.spec}·${r.ink} ${f(r.p05)}`).join(", ")}${bad.length > 6 ? " …" : ""} ✗` : ""}`);
  }
}
report(cap, { id: "W-C", title: "D3-C · ink follows the composite (muted p05 ∈ [4.5, 5.5] everywhere, and after a consumer retune)", lines, ...t, gate });
