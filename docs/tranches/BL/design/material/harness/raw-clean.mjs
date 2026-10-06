#!/usr/bin/env node
// RAW · The raw capture shows the bare ground (H-1). Every `raw` read (W-B, W-F leg 1, W-A's analytic bound, the
// paper of M-1 and M-6, T_c1, W-G's raw ground) assumes that hiding [data-spec] hides everything the surface paints.
// A descendant that sets `visibility: visible` (the dock layers do, dock/styles/layers.css) paints through its hidden
// ancestor (S-10, PF-12); capture.mjs now hides `[data-spec] *` too. This check proves it on the flat stands: over
// black and white, ladder and dialog scenes, both themes, the raw pixels under every surface rect (inset 2 px) match
// the bare ground within 3/255 on every channel, on at least 99.9% of the pixels.
//   node raw-clean.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, region, bare, hex, f, tag, THEMES } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: ["black", "white"], scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const g = bare(cap, cell), raw = cap.img(cell, "raw"), parts = [];
  let fails = 0;
  for (const s of cell.specs) {
    const [x, y, w, h] = s.rect, px = region(raw, [x + 2, y + 2, w - 4, h - 4]);
    const off = px.filter((p) => Math.max(Math.abs(p[0] - g[0]), Math.abs(p[1] - g[1]), Math.abs(p[2] - g[2])) > 3);
    const frac = px.length ? off.length / px.length : 1, ok = frac <= 0.001;
    t.add(gated, ok); if (!ok) { fails++; parts.push(`${s.id} ${off.length}/${px.length} px off the ground (${f(frac * 100, 2)}%)${off.length ? `, e.g. ${hex(off[0])}` : ""} ✗`); }
  }
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ground ${hex(g)} · ${cell.specs.length - fails}/${cell.specs.length} surfaces leave the ground bare${parts.length ? " · " + parts.join(" · ") : ""}`);
}
report(cap, { id: "RAW", title: "the raw capture shows the bare ground under every surface (H-1)", lines, ...t, gate });
