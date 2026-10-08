#!/usr/bin/env node
// M-2h · The held windows (H3-5): what M-2's frozen held cells cannot see.
//   Leg 1 (release): in every held cell (black, white, c1; both themes) the capture records whole frames from 100 ms
//          before the pointer lifts to 1.2 s after (capture.mjs: Chromium screencast, Playwright WebKit screenshot loop).
//          Every ink of every held surface the battery reads (the dock; a rung only where the library declares it
//          graspable, rows.mjs heldUnread) keeps p05 ≥ 4.5 in every frame, frame-locked as M-2m reads (glyph coverage
//          from the frozen cell's masks; ink and ring from the frame; ring pixels of coverage ≤ 0.02). A window needs
//          a frame before the release and one ≥ 800 ms after (Chromium's screencast sends a frame only when something
//          paints, so its window is bracketed by a screenshot before and one after; a still page yields the two).
//          This is the hand-off: both carriers veiled, then the grasp carrier's fade and unmount (grasp.css:194-205).
//   Leg 2 (the held host's non-glyph paint, the Slider halo): the held dock's painted α per pixel column across its empty
//          sample region (`[data-sample]`, from the held black and white cells) never falls more than 0.02 under the
//          resting dock's α (the ladder dock's sample over black and white, same engine and theme). Pass 2 (A′ critique
//          §3.1) read the held Slider's lifted range smearing the ground across the dock's right half, light over black
//          down to 141,136,131 at x 560, inside the sample rect W-A reads: no witness read it.
//   node m2-held-window.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import fs from "node:fs";
import path from "node:path";
import { PNG, cli, loadCapture, gateEngines, report, glyphCoverage, ringRead, paintedAlpha, pick, f, tag, THEMES, SCENE_GROUNDS, CELLS } from "./lib.mjs";
import { need, tally, heldUnread } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
// Leg 1: the release window.
const n = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.held, scenes: ["held"] });
t.add(true, false, n.missing); lines.push(...n.lines);
for (const { cell, gated } of n.have) {
  const lab = `release ${tag(cell)}${gated ? "" : " [info]"}`;
  const rel = cell.release;
  if (!rel || !rel.frames?.length) { t.add(gated, false); lines.push(`${lab}: no release window (the hold never engaged: pointer ${cell.pointer}) ✗`); continue; }
  const A = cap.img(cell, "maskA"), B = cap.img(cell, "maskB");
  const specs = cell.specs.filter((s) => s.id.includes("held") && !heldUnread(s));
  const inks = specs.flatMap((s) => s.inks.map((i) => ({ spec: s.id, ink: i.id, cov: glyphCoverage(A, B, i.box, 1) })));
  if (!inks.length) { t.add(gated, false); lines.push(`${lab}: no held surface read ✗`); continue; }
  const frs = rel.frames.map((fr) => { const png = PNG.sync.read(fs.readFileSync(path.join(cap.capdir, fr.file))); return { t: fr.t, vals: inks.map((k) => ringRead(k.cov, png, png, 1, 0.02).p05) }; });
  const minN = 2, pre = frs.filter((x) => x.t < 0).length, late = frs.filter((x) => x.t >= 800).length;
  if (frs.length < minN || !pre || !late) { t.add(gated, false); lines.push(`${lab}: ${frs.length} frames (${pre} before the release, ${late} ≥ 800 ms after; need ≥ ${minN}, ≥ 1, ≥ 1) ✗`); continue; }
  const worst = inks.map((k, j) => { const v = frs.map((x) => x.vals[j]); const lo = v.some((x) => x == null) ? null : Math.min(...v); return { ...k, lo, at: frs[v.indexOf(lo)]?.t, ok: lo != null && lo >= 4.5 }; });
  for (const w of worst) t.add(gated, w.ok);
  const bad = worst.filter((w) => !w.ok), lo = worst.reduce((x, y) => ((y.lo ?? -1) < (x.lo ?? -1) ? y : x));
  const unread = cell.specs.filter((s) => heldUnread(s)).map((s) => s.id);
  lines.push(`${lab} (${frs.length} frames, ${f(frs[0].t, 0)}…${f(frs[frs.length - 1].t, 0)} ms): ${inks.length - bad.length}/${inks.length} inks ≥ 4.5 in every frame · worst ${lo.spec}·${lo.ink} ${f(lo.lo)} at ${f(lo.at, 0)} ms${unread.length ? ` · not read: ${unread.join(", ")} (not declared graspable)` : ""}${bad.length ? ` · under: ${bad.slice(0, 5).map((w) => `${w.spec}·${w.ink} ${f(w.lo)} at ${f(w.at, 0)} ms`).join(", ")} ✗` : ""}`);
}
// Leg 2: the held dock's α per column across its sample against the resting dock's α.
const engines = [...new Set([...gate, ...cap.cells.map((c) => c.engine)])];
for (const engine of engines) for (const theme of THEMES) {
  if (CELLS && !CELLS.test(`${engine} ${theme} black held`)) continue;
  const gated = gate.includes(engine), lab = `halo ${engine} ${theme}${gated ? "" : " [info]"}`;
  const hb = pick(cap, { engine, theme, ground: "black", scene: "held", variant: "base" })[0], hw = pick(cap, { engine, theme, ground: "white", scene: "held", variant: "base" })[0];
  const lb = pick(cap, { engine, theme, ground: "black", scene: "ladder", variant: "base" })[0], lw = pick(cap, { engine, theme, ground: "white", scene: "ladder", variant: "base" })[0];
  if (![hb, hw, lb, lw].every((c) => c && !c.crashed)) { if (gated) { t.add(true, false); lines.push(`${lab}: held or ladder black/white cell missing ✗`); } continue; }
  const sb = hb.specs.find((s) => s.id === "dock-held"), sw = hw.specs.find((s) => s.id === "dock-held"), rest = lb.specs.find((s) => s.id === "dock");
  if (!sb?.sample || !sw?.sample || !rest?.sample || !lw.specs.find((s) => s.id === "dock")) { t.add(gated, false); lines.push(`${lab}: dock-held or resting dock sample missing ✗`); continue; }
  const aRest = paintedAlpha(cap, lb, lw, rest).alpha;
  const Bp = cap.img(hb, "noink"), Wp = cap.img(hw, "noink"), [x0, y0, w, h] = sb.sample.map(Math.round);
  const press = hb.pressRect, cols = [];
  for (let x = x0; x < x0 + w; x++) {
    if (press && x >= press[0] && x < press[0] + press[2]) continue;   // the Slider's own box is its paint, not the dock's
    let d = 0, k = 0;
    for (let y = y0; y < y0 + h; y++) { const i = (Bp.width * y + x) * 4; d += (Wp.data[i] - Bp.data[i] + Wp.data[i + 1] - Bp.data[i + 1] + Wp.data[i + 2] - Bp.data[i + 2]) / 3; k++; }
    cols.push({ x, alpha: Math.max(0, Math.min(1, 1 - d / k / 255)) });
  }
  if (!cols.length) { t.add(gated, false); lines.push(`${lab}: no dock column outside the pressed control ✗`); continue; }
  const lo = cols.reduce((p, q) => (q.alpha < p.alpha ? q : p)), hi = cols.reduce((p, q) => (q.alpha > p.alpha ? q : p));
  const ok = lo.alpha >= aRest - 0.02; t.add(gated, ok);
  lines.push(`${lab}: resting dock α ${f(aRest, 3)} · held dock α per column ${f(lo.alpha, 3)} (x ${lo.x}) … ${f(hi.alpha, 3)} (x ${hi.x}) over ${cols.length} columns · floor ${f(aRest - 0.02, 3)}${ok ? "" : " · the held host lets the ground through (a halo) ✗"}`);
  if (a.verbose) lines.push("    " + cols.filter((_, i) => i % 10 === 0).map((c) => `x${c.x} ${f(c.alpha, 3)}`).join(" · "));
}
report(cap, { id: "M-2h", title: "the held windows (the release frames keep every held ink ≥ 4.5; the held dock's α per column stays within 0.02 of the resting dock's)", lines, ...t, gate });
