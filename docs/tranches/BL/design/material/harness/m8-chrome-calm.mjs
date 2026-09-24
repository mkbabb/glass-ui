#!/usr/bin/env node
// M-8 · Chrome calm. Under floating, overlay and dialog text over the 24 px violet/yellow stripes, luminance
// p95/p05 ≤ 1.25 and composite chroma ≤ 0.04. Read in each surface's empty sample region (the ground under its
// text), both themes. Gated: floating, overlay, the dialog rung and the real Dialog; the popover and the dock
// print as information.
//   node m8-chrome-calm.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, calm, f, tag, THEMES } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const GATED = ["floating", "overlay", "dialog-rung", "dialog"];
const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: ["stripes"], scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const parts = cell.specs.filter((s) => s.sample && (GATED.includes(s.id) || s.id === "popover" || s.id === "dock")).map((s) => {
    const { bleed, chroma } = calm(cap, cell, s), ok = bleed <= 1.25 && chroma <= 0.04;
    if (GATED.includes(s.id)) t.add(gated, ok);
    return `${s.id}${GATED.includes(s.id) ? "" : " (info)"} bleed ${f(bleed)} C ${f(chroma, 4)}${ok ? "" : " ✗"}`;
  });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "M-8", title: "chrome calm (over 24 px violet/yellow stripes: luminance p95/p05 ≤ 1.25, composite chroma ≤ 0.04)", lines, ...t, gate });
