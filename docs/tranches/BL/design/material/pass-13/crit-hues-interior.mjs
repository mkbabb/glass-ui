#!/usr/bin/env node
// crit-hues-interior.mjs · D3 pass-13 CRITIC: does FIELD's multi-hue tail come from blur across band edges (FR13 §4's
// untested reading) or from the arm's chroma per hue? No browser. It rebuilds field-reader.mjs's mask from the base
// capture's dark paper cell (full vs raw ΔL <= -0.015, spec and probe boxes dilated 48 px), then reads the veil-hues
// cell's pixels in the mask (raw C >= 0.04, L >= 0.25) only where the pixel sits at least E px from every 96 px band
// edge (veil-hues.css), for E = 0, 12, 24, 36. REPORTED, never gated (R-39).
//   node crit-hues-interior.mjs <base capdir> <hues capdir>
import fs from "node:fs";
import path from "node:path";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js";
import { lch, hueDiff } from "../harness/lib.mjs";
const { PNG } = pngjs;
const [baseDir, huesDir] = process.argv.slice(2);
const cellOf = (dir, variant) => JSON.parse(fs.readFileSync(path.join(dir, "cells.json"), "utf8")).cells.find((c) => c.engine === "chromium" && c.theme === "dark" && c.ground === "paper" && c.scene === "state" && c.variant === variant);
const img = (dir, c, k) => PNG.sync.read(fs.readFileSync(path.join(dir, c.files[k])));
const px = (p, x, y) => { const i = (p.width * y + x) * 4; return [p.data[i], p.data[i + 1], p.data[i + 2]]; };
const pct = (a, q) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const base = cellOf(baseDir, "base"), hue = cellOf(huesDir, "veil-hues");
const braw = img(baseDir, base, "raw"), bful = img(baseDir, base, "full"), W = braw.width, H = braw.height;
const boxes = [...base.specs.map((s) => s.rect), ...(base.veil || [])], D = 48;
const inBox = (x, y) => boxes.some(([x0, y0, w, h]) => x >= x0 - D && x < x0 + w + D && y >= y0 - D && y < y0 + h + D);
const hraw = img(huesDir, hue, "raw"), hful = img(huesDir, hue, "full");
const BANDS = [[0, "violet 295°"], [1, "blue 260°"], [2, "teal 185°"]];
console.log(`HUES-INTERIOR · the multi-hue veiled cell by distance from the 96 px band edges (REPORTED, never gated; R-39)`);
for (const E of [0, 12, 24, 36]) {
  const per = BANDS.map(() => ({ k: [], h: [] }));
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (inBox(x, y) || lch(px(bful, x, y))[0] - lch(px(braw, x, y))[0] > -0.015) continue;
    const m = x % 96; if (Math.min(m, 96 - m) < E) continue;
    const [Lr, Cr, hr] = lch(px(hraw, x, y)), [, Cv, hv] = lch(px(hful, x, y));
    if (Cr < 0.04 || Lr < 0.25) continue;
    const b = per[Math.floor(x / 96) % 3]; b.k.push(Cv / Cr); b.h.push(hueDiff(hr, hv));
  }
  console.log(`  edge distance >= ${String(E).padStart(2)} px: ` + BANDS.map(([i, n]) => { const b = per[i]; return b.k.length ? `${n} ${b.k.length} px C× p05 ${pct(b.k, 0.05).toFixed(3)} p50 ${pct(b.k, 0.5).toFixed(3)} · |Δh| p95 ${pct(b.h, 0.95).toFixed(1)}° · (ii) share ${(100 * b.k.filter((v) => v < 0.95).length / b.k.length).toFixed(1)} % · (i) share ${(100 * b.h.filter((v) => v > 3).length / b.h.length).toFixed(1)} %` : `${n} 0 px`; }).join(" | "));
}
console.log("PRINT (reported, never gated)");
