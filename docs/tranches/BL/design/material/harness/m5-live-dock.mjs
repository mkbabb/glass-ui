#!/usr/bin/env node
// M-5 · The live dock is legible with no signal. A default live dock over the WebGPU aurora clears M-2 in both themes,
// and nothing on the page reads the field back or drives the glass by a per-frame custom-property write.
//   Leg 1 (behavioural, H-3; the same leg as W-A leg 1, rows.mjs signalLeg): in every live window of a gate engine (motion
//   on, ceilings 1 and 0.5, both themes, one default dock; the fed window is retired): 0 main-thread readbacks
//   (getImageData, readPixels, toDataURL), and no custom property written in 3 or more animation frames, whatever
//   its name and whatever writes it (setProperty, Typed OM, a style-attribute or <style> rewrite, insertRule).
//   Leg 2 (legibility): the dock's fg and muted runs clear 4.5 on the R 1 glyph ring over the aurora at both
//   ceilings, both themes (the reduced-motion cells, where the field is frozen for the ring read; the moving
//   field is M-2m). Playwright WebKit windows and dock rows (+shim) are informational unless --gate names webkit.
//   node m5-live-dock.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, f, tag, FIELD_GROUNDS, THEMES } from "./lib.mjs";
import { need, tally, inkRows, signalLeg } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: FIELD_GROUNDS, scenes: ["ladder"] });
const t = tally(); t.add(true, false, missing);
signalLeg(cap, t, lines, gate);
for (const { cell, gated } of have) {
  const rows = inkRows(cap, cell).filter((r) => r.spec === "dock");
  if (!rows.length) { t.add(gated, false); lines.push(`${tag(cell)}: no dock painted ✗${gated ? "" : " [info]"}`); continue; }
  for (const r of rows) t.add(gated, r.p05 != null && r.p05 >= 4.5);
  lines.push(`${tag(cell)}${gated ? "" : " [info]"} (Aurora data-aurora-substrate="${cell.substrate}"): dock ${rows.map((r) => `${r.ink} ${f(r.p05)}`).join(" · ")}${rows.every((r) => r.p05 >= 4.5) ? "" : " ✗"}`);
}
report(cap, { id: "M-5", title: "the live dock is legible with no signal (0 readbacks, no recurring custom-property writer; dock M-2 over the aurora, both themes)", lines, ...t, gate });
