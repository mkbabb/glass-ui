#!/usr/bin/env node
// crit-ringpx.mjs · D3 pass 7, the critic: R-14 / H7-1 checked against the raw ring PNGs, with no harness code.
// No browser. Reads <capdir>/cells.json and each three-column ring's own PNG with pngjs, and its own WCAG luminance.
// For every ring probe of exactly three columns (capture.mjs RING_PROBE's fallback) it prints:
//   - per column: the band rows' pixels, the in/out pixels, min(cr(band mean, in), cr(band mean, out)), and whether
//     the band rows are equal within 1 per channel (my own full-coverage test);
//   - MINE: the reading R-14 defines (the worst full-coverage column, else the worst of three), recomputed here;
//   - SOLID: the ring's solid composite predicted from the ink, independent of any column choice:
//     ink = --foreground at alpha (light 0.52 / dark 0.60 unless --alpha), composited in sRGB over the column's
//     out pixel, and that composite's contrast against the out pixel. A full-coverage band should equal it within
//     a few 8-bit steps; if a column called full is far from it, the full-coverage test is reading something else;
//   - DARKEST: over a 9-column window around the probe and the band rows, the pixel farthest in luminance from the
//     plate, and its contrast against the out pixel (the most-covered pixel the ring paints near its apex).
//   node crit-ringpx.mjs <capdir> [--engine chromium] [--alpha 0.52] [--fg-light 1c1917] [--fg-dark e9e6e2]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/node_modules/");
const { PNG } = require("pngjs");

const args = process.argv.slice(2), capdir = args[0];
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const engine = opt("--engine", "chromium"), alphaArg = opt("--alpha", null);
const fgL = opt("--fg-light", "1c1917"), fgD = opt("--fg-dark", "e9e6e2");
const hx = (s) => [0, 2, 4].map((k) => parseInt(s.slice(k, k + 2), 16));
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const Y = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
const CR = (a, b) => { const y1 = Y(a), y2 = Y(b); return (Math.max(y1, y2) + 0.05) / (Math.min(y1, y2) + 0.05); };
const H = (p) => "#" + p.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const F = (v) => v.toFixed(2);
const cells = JSON.parse(fs.readFileSync(path.join(capdir, "cells.json"), "utf8")).cells;
let n = 0, agree = 0, fullFar = 0, mineUnder = 0, solidUnder = 0;
for (const cell of cells.filter((c) => c.engine === engine && !c.crashed)) {
  for (const r of (cell.rings || []).filter((r) => r.painted && r.file && r.cols && r.cols.length === 3)) {
    const png = PNG.sync.read(fs.readFileSync(path.join(capdir, r.file)));
    const px = (x, y) => { x -= r.dx; y -= r.dy; if (x < 0 || y < 0 || x >= png.width || y >= png.height) return null; const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
    const dark = cell.theme === "dark", alpha = alphaArg ? +alphaArg : dark ? 0.6 : 0.52, fg = hx(dark ? fgD : fgL);
    const cols = r.cols.map((c) => {
      const band = c.band.map((y) => px(c.x, y)), inn = px(c.x, c.in), out = px(c.x, c.out);
      const mean = [0, 1, 2].map((k) => band.reduce((s, p) => s + p[k], 0) / band.length);
      const full = band.length >= 2 && band.every((p) => p.every((v, k) => Math.abs(v - band[0][k]) <= 1));
      const v = Math.min(CR(mean, inn), CR(mean, out));
      const solid = [0, 1, 2].map((k) => alpha * fg[k] + (1 - alpha) * out[k]);
      return { x: c.x, band, inn, out, mean, full, v, solid, vs: CR(solid, out), dSolid: Math.max(...[0, 1, 2].map((k) => Math.abs(mean[k] - solid[k]))) };
    });
    const fulls = cols.filter((c) => c.full);
    const mine = fulls.length ? Math.min(...fulls.map((c) => c.v)) : Math.min(...cols.map((c) => c.v));
    const how = fulls.length ? `full-coverage column ${fulls.reduce((a, b) => (b.v < a.v ? b : a)).x}` : "worst of three";
    const plate = cols[1].out, yP = Y(plate);
    let best = null;
    for (let x = r.cols[0].x - 3; x <= r.cols[2].x + 3; x++) for (const y of r.cols[0].band.concat([r.cols[0].band[0] - 1, r.cols[0].band.at(-1) + 1])) {
      const p = px(x, y); if (!p) continue; const d = Math.abs(Y(p) - yP); if (!best || d > best.d) best = { x, y, p, d }; }
    const darkest = CR(best.p, plate), solidV = cols[1].vs;
    n++; if (Math.abs(mine - solidV) <= 0.15 || !fulls.length) agree++; if (fulls.some((c) => c.dSolid > 4)) fullFar++; if (mine < 3) mineUnder++; if (solidV < 3) solidUnder++;
    console.log(`RING ${engine} ${cell.theme} ${cell.ground} ${cell.scene}${cell.variant && cell.variant !== "base" ? " [" + cell.variant + "]" : ""} ${r.spec}:${r.id} ow=${r.width} · MINE ${F(mine)} (${how}) · SOLID ${F(solidV)} (α ${alpha} ink over ${H(plate)} = ${H(cols[1].solid)}) · DARKEST ${H(best.p)} at ${best.x},${best.y} ${F(darkest)}`);
    for (const c of cols) console.log(`   col ${c.x}${c.full ? "=" : "~"} band ${c.band.map(H).join(" ")} in ${H(c.inn)} out ${H(c.out)} · ${F(c.v)} · |band − solid| ${c.dSolid.toFixed(1)}`);
  }
}
console.log(`SUM ${engine} rings=${n} mine<3=${mineUnder} solid<3=${solidUnder} mine≈solid(±0.15, or no full column)=${agree} full-but-far-from-solid(>4/255)=${fullFar}`);
