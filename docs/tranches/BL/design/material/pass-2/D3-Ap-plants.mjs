#!/usr/bin/env node
// D3-Ap-plants.mjs · the A′ pass-2 injected variants: the mechanism-removal plants, the held diagnostic,
// the held cure probe and the dark perimeter sweep (D3-Ap-spec.md §2-§3), and the prototype's own plants and the
// carriers' stacking-risk probe (D3-Ap-proto.md §3). Each variant is captured over an existing
// specimen build into its own capdir, relabelled `base` so the unmodified witnesses read it, and the cells it did not
// take print as MISSING (ignore them; read the rows the variant touches).
//   node D3-Ap-plants.mjs <dist> <worktree> [--only id,id] [--out <dir>]      ($D3_OUT/caps/<id> by default)
//   then e.g.  node ../harness/m2-text-contrast.mjs $D3_OUT/caps/plant-bound --gate chromium,webkit
// The held reader (`--held <capdir>`) prints each held plate's painted α over black/white beside its computed bound.
import fs from "node:fs";
import path from "node:path";
import { OUT, cli, list, loadCapture, pick, composite, hex, paintedAlpha } from "../harness/lib.mjs";
import { capture } from "../harness/capture.mjs";

const HELD = { scenes: "held", grounds: "black,white,aurora" };
const LADDER = { scenes: "ladder,dialog", grounds: "black,white,aurora" };
const PERIM = { themes: "dark", scenes: "ladder,dialog", grounds: "black,white,stripes,aurora" };
const perim = (p) => `.dark { --ink-perimeter: ${p}; --ink-edge: ${(p / 3.25).toFixed(4)}; --ink-seam: ${(p / 6.5).toFixed(4)}; }`;
export const VARIANTS = {
  // Mechanism-removal plants (REGISTRY §7.5): each must turn the green it guards red.
  "plant-bound": { ...LADDER, css: ":root, .dark { --glass-bound: 0.25; }" },                      // A′'s α → M-2, W-A legs 2-3
  "plant-margin": { ...LADDER, css: ":root, .dark { --glass-ink-target: 4.5; }" },                  // the raster margin → WebKit M-2 (item 5)
  "plant-heldfloor": { ...HELD, css: ".glass-wash, .glass-floating, .dock-plate { --glass-veil-floor: 0 !important; }" }, // FL-7 → H-5 dock rows
  // The held diagnostic and the cure probe (item 2).
  "diag-noblur": { ...HELD, css: '.glass-grasp-carrier[data-grasp="grasp"] { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }' },
  "cure-carrier-veil": { ...HELD, css: ':has(> .glass-grasp-carrier[data-grasp="grasp"]) { background: none; }\n.glass-grasp-carrier { background: var(--glass-veil); z-index: -1; }' },
  // The dark perimeter sweep (item 3), PROPORTION 1 : 2 : 6.5 kept.
  "perim-0.56": { ...PERIM, css: perim(0.56) }, "perim-0.60": { ...PERIM, css: perim(0.6) }, "perim-0.64": { ...PERIM, css: perim(0.64) },
  // The prototype's own mechanism-removal plants (D3-Ap-proto.md §3), over the A′ build.
  // The held veil back on the host and off the carriers (the floor's paint) → H-5 rows red.
  "plant-carrierveil": { ...HELD, css: ':has(> .glass-grasp-carrier[data-grasp="grasp"]):is(.dock-plate, .glass-wash, .glass-floating) { background: var(--glass-veil) !important; }\n.glass-grasp-carrier { background: none !important; z-index: auto !important; }' },
  // The dark stroke arm removed (the light scalars inherited, as on the floor) → M-3 dark red.
  "plant-darkperim": { ...PERIM, css: ".dark { --ink-perimeter: 0.52; --ink-edge: 0.16; --ink-seam: 0.08; }" },
  // The carriers' stacking precondition (veil.css): an opaque ancestor (ink-coloured, the worst case) under held hosts
  // that are not stacking contexts (the specimen rungs), then the same with the hosts seated at z-index 0.
  "risk-opaque-ancestor": { scenes: "held", grounds: "white", css: ".hx-page { background: #000; } .dark .hx-page { background: #fff; }" },
  // The held dock's 0.025 painted-α residual (Chromium only): every shadow and filter in the held dock cell off but the
  // carriers' own; then the slider's own carriers' filter off.
  "diag-held-noshadow": { engines: "chromium", themes: "light", scenes: "held", grounds: "black,white", css: ".hx-dockcell *, .hx-dockcell *::before, .hx-dockcell *::after { box-shadow: none !important; filter: none !important; }" },
  "diag-held-nosliderblur": { engines: "chromium", themes: "light", scenes: "held", grounds: "black,white", css: ".slider-range > .glass-grasp-carrier { backdrop-filter: none !important; }" },
  "diag-held-nodockblur": { engines: "chromium", themes: "light", scenes: "held", grounds: "black,white", css: ".dock-plate > .glass-grasp-carrier { backdrop-filter: none !important; }" },
  "diag-held-nobright": { engines: "chromium", themes: "light", scenes: "held", grounds: "black,white", css: '.dock-plate > .glass-grasp-carrier[data-grasp="grasp"] { backdrop-filter: blur(calc(var(--glass-blur-resting-radius) * 1.625)) !important; }' },
  "diag-held-noanyblur": { engines: "chromium", themes: "light", scenes: "held", grounds: "black,white", css: ".hx-dockcell, .hx-dockcell *, .hx-dockcell *::before, .hx-dockcell *::after { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }" },
  "risk-opaque-ancestor-z0": { scenes: "held", grounds: "white", css: ".hx-page { background: #000; } .dark .hx-page { background: #fff; } .hx-plate { z-index: 0; }" },
};

function relabel(capdir) {
  const f = path.join(capdir, "cells.json"), d = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const k of ["cells", "live", "motion"]) for (const c of d[k] || []) c.variant = "base";
  fs.writeFileSync(f, JSON.stringify(d, null, 1));
}

function heldReport(capdir) {
  const cap = loadCapture(capdir);
  for (const engine of ["chromium", "webkit"]) for (const theme of ["light", "dark"]) {
    const cb = pick(cap, { engine, theme, ground: "black", scene: "held" })[0], cw = pick(cap, { engine, theme, ground: "white", scene: "held" })[0];
    if (!cb || !cw) continue;
    for (const s of cb.specs) { if (!s.sample) continue; const sw = cw.specs.find((x) => x.id === s.id); const a = paintedAlpha(cap, cb, cw, s);
      console.log(`${engine === "webkit" ? "webkit+shim" : engine} ${theme} ${s.id}: painted α ${a.alpha.toFixed(3)} (bound ${s.bound}) · over black ${hex(composite(cap, cb, s))} · over white ${hex(composite(cap, cw, sw))}`); }
  }
}

const a = cli({ only: { type: "string" }, out: { type: "string" }, held: { type: "string" } });
if (a.held) { heldReport(path.resolve(a.held)); process.exit(0); }
if (!a._[0]) { console.error("usage: node D3-Ap-plants.mjs <dist> <worktree> [--only ids] | --held <capdir>"); process.exit(2); }
const root = path.resolve(a.out || path.join(OUT, "caps"));
for (const id of list(a.only, Object.keys(VARIANTS))) {
  const v = VARIANTS[id], capdir = path.join(root, id), css = path.join(root, `${id}.css`);
  fs.mkdirSync(root, { recursive: true }); fs.writeFileSync(css, v.css + "\n");
  console.log(`== ${id} · load ${(await import("node:os")).loadavg().map((x) => x.toFixed(1)).join(" ")}`);
  await capture(path.resolve(a._[0]), { out: capdir, engines: v.engines, themes: v.themes, scenes: v.scenes, grounds: v.grounds, variant: id, inject: css, worktree: a._[1] && path.resolve(a._[1]), quiet: true });
  relabel(capdir);
}
