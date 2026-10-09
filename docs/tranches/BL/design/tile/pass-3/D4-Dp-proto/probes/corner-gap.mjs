#!/usr/bin/env node
// D4-Dp-proto/probes/corner-gap.mjs · the spec's risk R-3, measured: the selected perimeter (`::before`, inset 0 since
// M-5, `border-radius: inherit`) sits inside the item's border, so its outer curve (16 px on a box inset by the
// border) is not concentric with the border's inner curve (16 px − border). Geometry predicts a sliver of plate
// between the two curves at 45°. This probe reads the painted pixels on the selected migrated tile, ink hidden:
//   side      a vertical line through the middle of the top edge, device pixel by device pixel, from 3 css px outside
//             to 8 css px inside: the run of pixels at ≥ 3:1 against the interior (the edge band) and any seam in it
//   diagonal  the 45° line from the box's top-left corner inward, one device pixel per step
// A SEAM is a pixel below 1.5:1 against the interior lying between two pixels at ≥ 3:1. PASS when the diagonal has no
// seam, the edge's inset from the outer outline at 45° is within 0.5 css px of its inset on the side (concentric), and its edge band, measured radially (each diagonal step is √2 device px), is within 0.75 css px of the side's. Corner tiles of every migrated
// shape="cell" scene in light and dark, both engines.
//   node corner-gap.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--plant]
// --plant: a sheet moves the perimeter 2 css px further in and squares its corner 4 px tighter, a seam the probe must FAIL.
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, contrast, hex } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("dp-corner-gap");
const target = await openTarget(args);
console.log(`D4-D′ corner-gap probe${args.plant ? " · PLANT (perimeter inset 2px, corner 12px)" : ""} · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
const SCENES = ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"];
let pass = 0, n = 0;
const at = (s, x, y) => { const i = (y * s.png.width + x) * 4, d = s.png.data; return [d[i], d[i + 1], d[i + 2]]; };
function profile(s, pts, inner) {
  const c = pts.map(([x, y]) => contrast(at(s, x, y), inner));
  const strong = c.map((v, i) => (v >= 3 ? i : -1)).filter((i) => i >= 0);
  if (!strong.length) return { band: 0, seam: false, c };
  const a = strong[0], b = strong[strong.length - 1];
  const seam = c.slice(a, b + 1).some((v) => v < 1.5);
  // where the edge starts, sub-pixel: the linear crossing of 3:1 between the last weak and the first strong pixel
  const cross = a === 0 ? 0 : a - 1 + (3 - c[a - 1]) / (c[a] - c[a - 1]);
  return { band: strong.length, first: a, cross, seam, c };
}
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of SCENES) for (const mode of ["light", "dark"]) {
    let P;
    try { P = await openPage(target, engine, scene, { mode, query: { sel: "0" } }); }
    catch (e) { console.log(`  UNMEASURED ${engine} ${scene} ${mode} · ${String(e.message).split("\n")[0]}`); continue; }
    const r = await P.page.evaluate(async (plant) => {
      const th = window.__th; th.hideInk?.(true);
      if (plant) { const st = document.createElement("style"); st.textContent = ".toggle-group__item::before { inset: 2px !important; border-radius: 12px !important; }"; document.head.append(st); }
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
      const el = th.items()[0]; const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      const be = getComputedStyle(el, "::before");
      return { plant, x: b.x, y: b.y, w: b.width, h: b.height, state: el.getAttribute("data-state"), radius: cs.borderTopLeftRadius,
        border: cs.borderTopWidth, beforeInset: be.top, beforeRadius: be.borderTopLeftRadius, beforeOpacity: be.opacity };
    }, !!args.plant);
    if (r.state !== "on") { console.log(`  UNMEASURED ${engine} ${scene} ${mode} · item 0 not selected (${r.state})`); await P.close(); continue; }
    const pad = 3, clip = { x: Math.floor(r.x - pad), y: Math.floor(r.y - pad), width: Math.ceil(r.w + 2 * pad), height: Math.ceil(r.h + 2 * pad) };
    const s = await shot(P.page, clip); await P.close();
    const d = s.dsf, ox = (r.x - clip.x) * d, oy = (r.y - clip.y) * d;
    // the interior: a patch 10 css px in from the top-left on both axes, past the corner and the edge
    const inner = at(s, Math.round(ox + 12 * d), Math.round(oy + 12 * d));
    const mid = Math.round(ox + (r.w / 2) * d);
    const side = profile(s, Array.from({ length: Math.round(11 * d) }, (_, k) => [mid, Math.round(oy - 3 * d + k)]), inner);
    const diag = profile(s, Array.from({ length: Math.round(14 * d) }, (_, k) => [Math.round(ox + k), Math.round(oy + k)]), inner);
    // one diagonal step moves one device pixel on each axis: √2 device px along the radial line through the corner arc
    const sideBand = side.band / d, diagBand = (diag.band * Math.SQRT2) / d;
    // CONCENTRICITY: the edge's inset from the box's outer outline, on the side and radially at 45°. The outer outline
    // at 45° lies r(√2 − 1) from the box corner (r the used corner); a concentric edge keeps the side's inset there.
    const rr = parseFloat(r.radius);
    const sideIn = (Math.round(oy - 3 * d) + side.cross - oy) / d;
    const diagIn = (diag.cross * Math.SQRT2) / d - rr * (Math.SQRT2 - 1);
    const dIn = diagIn - sideIn;
    const ok = !diag.seam && Math.abs(diagBand - sideBand) <= 0.75 && Math.abs(dIn) <= 0.5 && side.band > 0;
    n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${mode} · ${r.w.toFixed(2)}×${r.h.toFixed(2)} corner ${r.radius} border ${r.border} · ::before inset ${r.beforeInset} radius ${r.beforeRadius} opacity ${r.beforeOpacity} · interior ${hex(inner)} · side band ${sideBand.toFixed(2)} css px${side.seam ? " SEAM" : ""} · diagonal band ${diagBand.toFixed(2)} css px (radial)${diag.seam ? " SEAM" : ""} · edge inset side ${sideIn.toFixed(2)} / 45° ${diagIn.toFixed(2)} css px (Δ ${dIn.toFixed(2)}) · side contrast ${side.c.map((v) => v.toFixed(1)).join(" ")} · diagonal contrast ${diag.c.slice(0, 22).map((v) => v.toFixed(1)).join(" ")} · load ${load()}`);
  }
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
