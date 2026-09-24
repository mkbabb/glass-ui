#!/usr/bin/env node
// W-B · D3-B's witness: the substrate publishes. On the WebGPU aurora, the dock reads a published luma within
// ±0.02 of the painted mean under its rect, updated within 2 frames of a field change, with zero synchronous
// readbacks.
//   Leg 1: the reduced-motion field cells (ceilings 1 and 0.5, both themes): the dock's published value (the
//          signal property, default --glass-backdrop-luma, as captured on the dock root) vs the painted mean
//          relative luminance under the dock's rect in the raw capture.
//   Leg 2: the live windows (motion on; a default dock and a fed dock): getImageData + readPixels calls = 0.
//   Leg 3: the step: the live window steps the field's opacity ceiling (1 → 0.5, 0.5 → 1) and records the
//          published value every frame for 90 frames; the settled painted mean comes from a raw screenshot
//          after them. Latency = the first frame from which the value stays within ±0.02 of it; frame 1 paints
//          the step, so PASS is latency ≤ 3.
// Chromium only (Playwright WebKit exposes no navigator.gpu and crashes on GlassDock).
//   node wb-substrate-publishes.mjs <capdir> [--prop --glass-backdrop-luma]
import path from "node:path";
import { cli, loadCapture, report, region, readPng, Y, mean3, f, tag, FIELD_GROUNDS, THEMES } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli({ prop: { type: "string" } }), cap = loadCapture(a._[0]), gate = ["chromium"], prop = a.prop || "--glass-backdrop-luma";
const t = tally();
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: FIELD_GROUNDS, scenes: ["ladder"] });
t.add(true, false, missing);
const lumaUnder = (png, rect) => mean3(region(png, rect).map((p) => [Y(p), 0, 0]))[0];
for (const { cell } of have) {
  const dock = cell.specs.find((s) => s.id === "dock");
  if (!dock) { t.add(true, false); lines.push(`${tag(cell)}: no dock ✗`); continue; }
  const painted = lumaUnder(cap.img(cell, "raw"), dock.rect);
  const raw = cell.signals?.dock?.props?.[prop];
  const v = raw === undefined || raw === "" ? null : parseFloat(raw);
  const ok = v != null && Number.isFinite(v) && Math.abs(v - painted) <= 0.02;
  t.add(true, ok);
  lines.push(`${tag(cell)}: painted mean Y under the dock ${f(painted, 3)} · published ${prop} ${v == null ? "absent" : f(v, 3)} (state ${cell.signals?.dock?.state || "—"}/${cell.signals?.dock?.reason || "—"})${ok ? "" : " ✗"}`);
}
for (const r of (cap.live || []).filter((x) => x.engine === "chromium" && (x.variant || "base") === "base")) {
  const cfg = `live ${r.theme} ${r.ground} ${r.feed ? "fed" : "default"}`;
  if (r.error) { t.add(true, false); lines.push(`${cfg}: ERROR ${r.error} ✗`); continue; }
  const ok = r.readbacks === 0; t.add(true, ok);
  lines.push(`${cfg}: synchronous readbacks ${r.readbacks} (getImageData ${r.getImageData}, readPixels ${r.readPixels}) in ${r.liveMs} ms${ok ? "" : " ✗"}`);
  if (!r.step) { t.add(true, false); lines.push(`${cfg}: no step recorded ✗`); continue; }
  const painted = lumaUnder(readPng(path.join(cap.capdir, r.step.file)), r.step.rect);
  const s = r.step.series;
  let lat = null;
  for (let i = 1; i < s.length; i++) if (s.slice(i).every((v) => v != null && Math.abs(v - painted) <= 0.02)) { lat = i; break; }
  const ok2 = lat != null && lat <= 3; t.add(true, ok2);
  lines.push(`${cfg}: step ceiling → ${r.step.to}: settled painted Y ${f(painted, 3)} · published ${prop} before ${f(s[0], 3)}, frame 3 ${f(s[3], 3)}, frame 90 ${f(s[s.length - 1], 3)} · latency ${lat == null ? "never within ±0.02" : lat + " frames"}${ok2 ? "" : " ✗"}`);
}
if (!(cap.live || []).length) { t.add(true, false); lines.push("no live windows (capture with --live) ✗"); }
report(cap, { id: "W-B", title: "D3-B · the substrate publishes (luma within ±0.02 of the painted mean, ≤ 2 frames after a field change, 0 synchronous readbacks)", lines, ...t, gate });
