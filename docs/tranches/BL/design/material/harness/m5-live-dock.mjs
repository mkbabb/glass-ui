#!/usr/bin/env node
// M-5 · The live dock is legible without a DOM readback. A default live dock over the WebGPU aurora clears M-2 in
// both themes with zero getImageData calls on the main thread.
//   Leg 1 (the readback count): the live windows of the capture (--live; Chromium; motion on; ceilings 1 and
//   0.5; a default dock and a dock fed the field canvas as keyframes binds it): getImageData calls = 0.
//   Leg 2 (legibility): the dock's fg and muted runs clear 4.5 on the 1 px glyph ring over the aurora at both
//   ceilings, both themes (the reduced-motion cells, where the field is frozen for the ring read).
// Chromium only: Playwright WebKit exposes no navigator.gpu and crashes on GlassDock.
//   node m5-live-dock.mjs <capdir>
import { cli, loadCapture, report, f, tag, FIELD_GROUNDS, THEMES, LABEL } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = ["chromium"];
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: FIELD_GROUNDS, scenes: ["ladder"] });
const t = tally(); t.add(true, false, missing);
for (const theme of THEMES) for (const ground of FIELD_GROUNDS) for (const feed of [false, true]) {
  const r = (cap.live || []).find((x) => x.engine === "chromium" && x.theme === theme && x.ground === ground && x.feed === feed && (x.variant || "base") === "base");
  if (!r || r.error) { t.add(true, false); lines.push(`live ${theme} ${ground} ${feed ? "fed" : "default"}: ${r ? "ERROR " + r.error : "MISSING (capture with --live)"} ✗`); continue; }
  const ok = r.getImageData === 0;
  t.add(true, ok);
  lines.push(`live ${theme} ${ground} ${feed ? "fed the field canvas" : "default dock"} (${r.liveMs} ms, WebGPU adapter ${r.gpu}): getImageData ${r.getImageData}, readPixels ${r.readPixels}, mean alpha of readbacks max ${f(r.alphaMax, 3)}, slowest ${f(r.msMax, 1)} ms · dock ${r.dock?.state || "—"}/${r.dock?.reason || "—"}${ok ? "" : " ✗"}`);
}
for (const { cell, gated } of have) {
  if (!gated) { lines.push(`${tag(cell)}: dock ${LABEL.nodock}`); continue; }
  const rows = inkRows(cap, cell).filter((r) => r.spec === "dock");
  if (!rows.length) { t.add(true, false); lines.push(`${tag(cell)}: no dock painted ✗`); continue; }
  for (const r of rows) { const ok = r.p05 != null && r.p05 >= 4.5; t.add(true, ok); }
  lines.push(`${tag(cell)} (Aurora data-aurora-substrate="${cell.substrate}", the GPU arm; the backend it chose is not read, since no context is requested): dock ${rows.map((r) => `${r.cls} ${f(r.p05)}`).join(" · ")}${rows.every((r) => r.p05 >= 4.5) ? "" : " ✗"}`);
}
report(cap, { id: "M-5", title: "the live dock is legible without a DOM readback (0 getImageData; dock M-2 over the aurora, both themes)", lines, ...t, gate,
  extra: [`Playwright WebKit: ${LABEL.nodock}`] });
