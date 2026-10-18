#!/usr/bin/env node
// crit-pxdiff.mjs · D3 pass 7, the critic: FL-14's movement read as whole PNGs, no harness code. For every cell present
// in both capdirs (same engine, theme, ground, scene; base variant vs the injected one), every PNG the cell banked is
// compared pixel by pixel. Prints per theme: cells compared, PNGs compared, PNGs with any differing pixel, the largest
// channel delta, and each differing PNG with its count of differing pixels and its bounding box.
//   node crit-pxdiff.mjs <capdir A (FL-14 off)> <capdir B (FL-14 on)>
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/node_modules/");
const { PNG } = require("pngjs");
const [A, B] = process.argv.slice(2);
const load = (d) => JSON.parse(fs.readFileSync(path.join(d, "cells.json"), "utf8")).cells;
const key = (c) => `${c.engine} ${c.theme} ${c.ground} ${c.scene}`;
const files = (c) => { const o = []; const walk = (v) => { if (typeof v === "string" && v.endsWith(".png")) o.push(v); else if (v && typeof v === "object") for (const x of Object.values(v)) walk(x); }; walk(c); return [...new Set(o)]; };
const a = new Map(load(A).filter((c) => !c.crashed).map((c) => [key(c), c])), b = new Map(load(B).filter((c) => !c.crashed).map((c) => [key(c), c]));
const stat = {};
for (const [k, ca] of a) {
  const cb = b.get(k); if (!cb) continue;
  const th = ca.theme; stat[th] ??= { cells: 0, pngs: 0, diff: 0, maxd: 0, list: [] }; stat[th].cells++;
  const fa = files(ca), fb = files(cb);
  for (let i = 0; i < Math.min(fa.length, fb.length); i++) {
    const pa = path.join(A, fa[i]), pb = path.join(B, fb[i]); if (!fs.existsSync(pa) || !fs.existsSync(pb)) continue;
    const x = PNG.sync.read(fs.readFileSync(pa)), y = PNG.sync.read(fs.readFileSync(pb)); stat[th].pngs++;
    if (x.width !== y.width || x.height !== y.height) { stat[th].diff++; stat[th].list.push(`${k} ${path.basename(fa[i])} size ${x.width}x${x.height} vs ${y.width}x${y.height}`); continue; }
    let n = 0, md = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let p = 0; p < x.data.length; p += 4) { const d = Math.max(Math.abs(x.data[p] - y.data[p]), Math.abs(x.data[p + 1] - y.data[p + 1]), Math.abs(x.data[p + 2] - y.data[p + 2]));
      if (d) { n++; md = Math.max(md, d); const q = p / 4, px = q % x.width, py = (q / x.width) | 0; x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py); } }
    if (n) { stat[th].diff++; stat[th].maxd = Math.max(stat[th].maxd, md); stat[th].list.push(`${k} ${path.basename(fa[i])} ${n} px, max Δ ${md}, box ${x0},${y0}-${x1},${y1}`); }
  }
}
for (const [th, s] of Object.entries(stat)) { console.log(`== ${th}: cells ${s.cells}, PNGs ${s.pngs}, differing ${s.diff}, max channel Δ ${s.maxd}`); for (const l of s.list) console.log("   " + l); }
console.log(`PXDIFF ${Object.entries(stat).map(([t, s]) => `${t} ${s.diff}/${s.pngs} differ (max Δ ${s.maxd})`).join(" · ")}`);
