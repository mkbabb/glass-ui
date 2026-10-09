#!/usr/bin/env node
// FV2-plants.mjs · D3 pass 3, floor v2: the mechanism-removal plants over a floor-v2 specimen build (REGISTRY P2-6.3
// row 19). It reuses pass 2's A′ variants (FL-14's carrier veil, FL-15's dark arm, FL-7's held floor, the bound) and
// adds floor v2's own: the plate's `isolation` removed under an opaque ancestor (FL-14's stacking precondition), and the
// held Slider's carriers' filter off (N-3: the halo M-2h reads on the held dock, attributed or not). The four pass-2
// variants are copied verbatim from ../pass-2/D3-Ap-plants.mjs (that file runs its CLI on import).
//   node FV2-plants.mjs <dist> <worktree> [--only id,id] [--out <dir>]      ($D3_OUT/caps/<id> by default)
// Each variant is captured into its own capdir and relabelled `base`, so the unmodified witnesses read it; the cells a
// variant does not take print as MISSING (ignore them; read the rows it touches).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { OUT, cli, list } from "../harness/lib.mjs";
import { capture } from "../harness/capture.mjs";

const HELD = { scenes: "held", grounds: "black,white,aurora" };
const LADDER = { scenes: "ladder,dialog", grounds: "black,white,aurora" };
const PERIM = { themes: "dark", scenes: "ladder,dialog", grounds: "black,white,stripes,aurora" };
export const VARIANTS = {
  "plant-bound": { ...LADDER, css: ":root, .dark { --glass-bound: 0.25; }" },
  "plant-heldfloor": { ...HELD, css: ".glass-wash, .glass-floating, .dock-plate { --glass-veil-floor: 0 !important; }" },
  "plant-carrierveil": { ...HELD, css: ':has(> .glass-grasp-carrier[data-grasp="grasp"]):is(.dock-plate, .glass-wash, .glass-floating) { background: var(--glass-veil) !important; }\n.glass-grasp-carrier { background: none !important; z-index: auto !important; }' },
  "plant-darkperim": { ...PERIM, css: ".dark { --ink-perimeter: 0.52; --ink-edge: 0.16; --ink-seam: 0.08; }" },
  // FL-14's stacking precondition: the plate's isolation removed, an opaque ink-coloured ancestor under the held rungs.
  "plant-noisolation": { scenes: "held", grounds: "white", css: ".hx-page { background: #000; } .dark .hx-page { background: #fff; } .glass-wash, .glass-floating { isolation: auto !important; }" },
  // The same opaque ancestor with the plate as floor v2 ships it: the precondition held.
  "risk-opaque-ancestor": { scenes: "held", grounds: "white", css: ".hx-page { background: #000; } .dark .hx-page { background: #fff; }" },
  // N-3: the held Slider's own carriers carry no filter; if the dock's halo is the Slider's, M-2h's halo leg goes green.
  // The ladder cells ride along: M-2h's halo leg reads the resting dock's α from them.
  "diag-held-nosliderblur": { scenes: "held,ladder", grounds: "black,white,aurora", css: ".slider-range > .glass-grasp-carrier { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }" },
  // N-3: the held Slider's own paint made transparent while it stays hit-testable, so the press still takes the dock's
  // grasp (`visibility: hidden` drops the hit test and the hold). If the halo reading is the Slider's control paint
  // inside the witness's sample rect, M-2h's halo leg goes green with the dock still held.
  "diag-held-sliderpaint": { engines: "chromium", scenes: "held,ladder", grounds: "black,white", css: ".hx-dockslider, .hx-dockslider *, .hx-dockslider *::before, .hx-dockslider *::after { background: transparent !important; background-image: none !important; box-shadow: none !important; border-color: transparent !important; outline-color: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }" },
  // N-3, the attribution: the Slider's press engages the focus veil (glass/focus-veil.css), a full-viewport frost masked
  // to a window centred on the engaged control. Hidden, the dock stays held; if the halo is the veil's, the leg goes green.
  "diag-held-noveil": { engines: "chromium", scenes: "held,ladder", grounds: "black,white", css: ".glass-focus-veil { display: none !important; }" },
};

function relabel(capdir) {
  const f = path.join(capdir, "cells.json"), d = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const k of ["cells", "live", "motion", "drift"]) for (const c of d[k] || []) c.variant = "base";
  fs.writeFileSync(f, JSON.stringify(d, null, 1));
}

const a = cli({ only: { type: "string" }, out: { type: "string" } });
if (!a._[0]) { console.error("usage: node FV2-plants.mjs <dist> <worktree> [--only ids] [--out dir]"); process.exit(2); }
const root = path.resolve(a.out || path.join(OUT, "caps"));
for (const id of list(a.only, Object.keys(VARIANTS))) {
  const v = VARIANTS[id], capdir = path.join(root, id), css = path.join(root, `${id}.css`);
  fs.mkdirSync(root, { recursive: true }); fs.writeFileSync(css, v.css + "\n");
  console.log(`== ${id} · ${new Date().toTimeString().slice(0, 8)} · load ${os.loadavg().map((x) => x.toFixed(1)).join(" ")}`);
  await capture(path.resolve(a._[0]), { out: capdir, engines: v.engines, themes: v.themes, scenes: v.scenes, grounds: v.grounds, variant: id, inject: css, worktree: a._[1] && path.resolve(a._[1]), quiet: true });
  relabel(capdir);
}
