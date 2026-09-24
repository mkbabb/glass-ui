#!/usr/bin/env node
// M-1 · No grey. Over paper, every light level composites to L ≥ L_paper − 0.01 with ΔE_OK(composite, paper) ≤ 0.02.
// Levels: every [data-spec] of the ladder scene (the rungs, the dialog rung, the opaque escape, the dock, the
// popover) and the real Dialog (its scrim is part of what paints). Paper: the raw capture's bare region.
//   node m1-no-grey.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import { cli, loadCapture, gateEngines, report, composite, bare, lch, dE, hex, f, tag } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: ["light"], grounds: ["paper"], scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const paper = bare(cap, cell), Lp = lch(paper)[0];
  const parts = cell.specs.filter((s) => s.sample).map((s) => {
    const c = composite(cap, cell, s), [L, C] = lch(c), d = dE(c, paper), ok = L >= Lp - 0.01 && d <= 0.02;
    t.add(gated, ok);
    return `${s.id} ${hex(c)} L ${f(L, 3)} C ${f(C, 4)} ΔE ${f(d, 3)}${ok ? "" : " ✗"}`;
  });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: paper ${hex(paper)} L ${f(Lp, 3)} (floor L ${f(Lp - 0.01, 3)}, ΔE ≤ 0.020)`);
  for (const p of parts) lines.push("    " + p);
}
report(cap, { id: "M-1", title: "no grey (light, over paper: L ≥ L_paper − 0.01 and ΔE_OK ≤ 0.02)", lines, ...t, gate });
