#!/usr/bin/env node
// FV3-plants.mjs · D3 pass 4, floor v3: the R-1..R-5 mechanism-removal plants and the two owner-option variants, each an
// injection over the ONE floor v3 specimen build (REGISTRY P3-4.2, P3-5.2 step 2). Each plant puts back floor v2's value
// for one ruling and must red that ruling's row; the variants (Q-1 (c), Q-11 (b)) are read under their own text.
//   node FV3-plants.mjs <dist> <worktree> [--only id,id] [--engines chromium|webkit] [--out <dir>]
// --engines (H9-5, pass 9): as FV2-plants.mjs, every capture of a variant (its retunes too) in those engines only.
// Each variant is captured into its own capdir and relabelled `base`, so the unmodified witnesses read it; cells a
// variant does not take print as MISSING. R-5's plant is static (lighting-census.mjs on the 10.1.0 and floor v2 tokens).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { OUT, RETUNES, cli, list } from "../harness/lib.mjs";
import { enginesFor } from "../pass-3/FV2-plants.mjs";
import { capture } from "../harness/capture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(HERE, "fv3", f), "utf8");
const LADDER = { scenes: "ladder,dialog" };
export const VARIANTS = {
  // R-1 · row 7: floor v2's dark -strong ink, hsl(36 13% 81%); M-4 must red the dark capsule at +0.067.
  "plant-R1": { ...LADDER, themes: "dark", css: ".dark { --on-glass-muted-strong: hsl(36 13% 81%); }" },
  // R-2 · row 12: FL-6's light declaration in dark too (the scrim ink at a tenth); M-9 must red the dark veil (+0.006).
  "plant-R2": { scenes: "state", themes: "dark", css: ".dark { --glass-focus-veil-dim: color-mix(in oklab, var(--overlay-scrim-ink) 10%, transparent); }" },
  // R-2's "least mix": the next 5% under the ruled 40%. Read, not a plant.
  "probe-R2-35": { scenes: "state", themes: "dark", css: ".dark { --glass-focus-veil-dim: color-mix(in oklab, #000 35%, transparent); }" },
  // R-3 · row 15: the trigger back on the quiet card plate with its own blur (floor v2's register); O-66 G2 must red.
  "plant-R3": { scenes: "o66field", grounds: "paper", css: ".control-surface { --control-surface-bg: var(--glass-plate-quiet); backdrop-filter: var(--glass-blur-quiet); }" },
  // R-4 · row 16: FL-6's ink fill on the highlighted row; O-66 G3 must red light at ΔL −0.033, C 0.010.
  "plant-R4": { scenes: "o66menu", grounds: "paper", css: ".glass-menu-row { --menu-row-bg: oklch(from var(--foreground) l c h / var(--fill-hover)); }" },
  // The owner options, measured over the same build.
  // Read in every variant (H4-3): the three colour retunes are captured over paper under (c) too, keeping their labels.
  "var-q1c": { ...LADDER, css: read("q1c.css"), retunes: true },
  // M-6 --q1 c's own plant: the room thinned to the bound, so no material separates from it; --q1 c must red.
  "plant-q1c-noroom": { ...LADDER, themes: "dark", css: read("q1c.css") + "\n:root, .dark { --glass-veil-dialog: var(--glass-bound); }" },
  "var-q11b": { ...LADDER, themes: "light", grounds: "paper,black,white,checker,deep,aurora,aurora50,stripes", css: read("q11b.css") },
};

function relabel(capdir) {
  const f = path.join(capdir, "cells.json"), d = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const k of ["cells", "live", "motion", "drift"]) for (const c of d[k] || []) if (!(c.variant in RETUNES)) c.variant = "base";
  fs.writeFileSync(f, JSON.stringify(d, null, 1));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ only: { type: "string" }, out: { type: "string" }, engines: { type: "string" } });
  if (!a._[0]) { console.error("usage: node FV3-plants.mjs <dist> <worktree> [--only ids] [--engines list] [--out dir]"); process.exit(2); }
  const root = path.resolve(a.out || path.join(OUT, "caps"));
  for (const id of list(a.only, Object.keys(VARIANTS))) {
    const v = VARIANTS[id], capdir = path.join(root, id), css = path.join(root, `${id}.css`), engines = enginesFor(v, a.engines).join(",");
    if (!engines) { console.log(`== ${id}: not captured (variant engines ${v.engines}, --engines ${a.engines})`); continue; }
    fs.mkdirSync(root, { recursive: true }); fs.writeFileSync(css, v.css + "\n");
    console.log(`== ${id} · engines ${engines} · ${new Date().toTimeString().slice(0, 8)} · load ${os.loadavg().map((x) => x.toFixed(1)).join(" ")}`);
    await capture(path.resolve(a._[0]), { out: capdir, engines, themes: v.themes, scenes: v.scenes, grounds: v.grounds, variant: id, inject: css, worktree: a._[1] && path.resolve(a._[1]), quiet: true });
    relabel(capdir);
    if (v.retunes) for (const [rv, rcss] of Object.entries(RETUNES)) {
      const f = path.join(root, `${id}-${rv}.css`); fs.writeFileSync(f, v.css + "\n" + rcss + "\n");
      await capture(path.resolve(a._[0]), { out: capdir, engines, grounds: "paper", scenes: "ladder,dialog", variant: rv, inject: f, worktree: a._[1] && path.resolve(a._[1]), quiet: true });
      relabel(capdir);
    }
  }
  console.log(`== end · ${new Date().toTimeString().slice(0, 8)} · load ${os.loadavg().map((x) => x.toFixed(1)).join(" ")}`);
}
