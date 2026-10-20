#!/usr/bin/env node
// crit-offspot.mjs · D3 pass 12, the critic's own reading of R-32 (no browser; reads two captures made by capture.mjs).
//   node crit-offspot.mjs <capdir floor v11a (R-2)> <capdir floor v11 (R-32)> <engine>
// R-32 gates the 60 x 40 probe's MEAN colour on the aurora spot. O-103a's words are general ("dims by OKLCH lightness,
// keeps chroma"), so this reads every pixel of the veil's full-strength field, not the probe:
//   1. the mask: pixels where floor v11a's dark PAPER cell dims (full vs raw, ΔL <= -0.015), minus every [data-spec]
//      rect and the veil probe dilated by DIL px (the blur's reach), so only bare veiled ground is read;
//   2. on the dark AURORA cell, per pixel with raw C >= CMIN and raw L >= LMIN: raw -> veiled OKLCH for each build;
//      C ratio, |Δh| and ΔL as percentiles, and by raw hue in 30° bins; the share of pixels that would fail R-32 (i) or
//      (ii) if the gate were per pixel (REPORTED, never a gate: R-32 gates the spot);
//   3. light-arm paint identity: every light cell's `full` PNG, floor v11a vs floor v11, pixel by pixel (Q-14 (a)).
// Playwright WebKit paints no backdrop-filter, so on that engine (2) reads R-2's background only and R-32 as raw.
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const H = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../harness");
const { loadCapture, pick, lch, hueDiff, pct, f } = await import(path.join(H, "lib.mjs"));
const [capA, capB, engine] = process.argv.slice(2);
const DIL = 48, CMIN = 0.04, LMIN = 0.25;
const A = loadCapture(capA), B = loadCapture(capB);
const one = (cap, theme, ground) => { const c = pick(cap, { engine, theme, ground, scene: "state" }); if (c.length !== 1) throw new Error(`${engine} ${theme} ${ground}: ${c.length} cells`); return c[0]; };
const px = (png, x, y) => { const i = (png.width * y + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
const lines = [];
let bad = 0;
// 1. the mask
const pa = one(A, "dark", "paper"), praw = A.img(pa, "raw"), pful = A.img(pa, "full");
const W = praw.width, Hh = praw.height;
const boxes = [...pa.specs.map((s) => s.rect), ...(pa.veil || [])];
const inBox = (x, y) => boxes.some(([x0, y0, w, h]) => x >= x0 - DIL && x < x0 + w + DIL && y >= y0 - DIL && y < y0 + h + DIL);
const mask = new Uint8Array(W * Hh);
let nmask = 0, bx0 = W, by0 = Hh, bx1 = 0, by1 = 0;
for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
  if (inBox(x, y)) continue;
  const dL = lch(px(pful, x, y))[0] - lch(px(praw, x, y))[0];
  if (dL <= -0.015) { mask[y * W + x] = 1; nmask++; bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); }
}
lines.push(`mask (${engine}): ${nmask} px where floor v11a's dark paper veil dims ≤ -0.015 outside ${boxes.length} spec/probe boxes dilated ${DIL} px; bbox ${bx0},${by0} → ${bx1},${by1}`);
// 2. the aurora field, per pixel
const au = { a: one(A, "dark", "aurora"), b: one(B, "dark", "aurora") };
const rawA = A.img(au.a, "raw"), rawB = B.img(au.b, "raw");
let rawDiff = 0;
for (let i = 0; i < rawA.data.length; i += 4) if (rawA.data[i] !== rawB.data[i] || rawA.data[i + 1] !== rawB.data[i + 1] || rawA.data[i + 2] !== rawB.data[i + 2]) rawDiff++;
lines.push(`dark aurora raw, floor v11a vs floor v11: ${rawDiff} of ${rawA.width * rawA.height} px differ (one ground for both arms when 0)`);
for (const [arm, cap, cell] of [["R-2 (floor v11a)", A, au.a], ["R-32 (floor v11)", B, au.b]]) {
  const raw = cap.img(cell, "raw"), ful = cap.img(cell, "full");
  const kC = [], dh = [], dL = [], bins = new Map(); let n = 0, fi = 0, fii = 0, fiii = 0;
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    if (!mask[y * W + x]) continue;
    const r = lch(px(raw, x, y)), v = lch(px(ful, x, y));
    if (r[1] < CMIN || r[0] < LMIN) continue;
    n++; const k = v[1] / r[1], h = hueDiff(r[2], v[2]), d = v[0] - r[0];
    kC.push(k); dh.push(h); dL.push(d); if (h > 3) fi++; if (k < 0.95) fii++; if (d >= 0) fiii++;
    const bkey = Math.floor(r[2] / 30) * 30; const bb = bins.get(bkey) || { n: 0, k: [], h: [], d: [], C: [] }; bb.n++; bb.k.push(k); bb.h.push(h); bb.d.push(d); bb.C.push(r[1]); bins.set(bkey, bb);
  }
  if (!n) { lines.push(`${arm}: no chromatic pixel in the mask ✗`); bad++; continue; }
  const q = (a) => `p05 ${f(pct(a, 0.05), 3)} · p50 ${f(pct(a, 0.5), 3)} · p95 ${f(pct(a, 0.95), 3)}`;
  lines.push(`${arm} ${engine} dark aurora field, ${n} chromatic px (raw C ≥ ${CMIN}, L ≥ ${LMIN}):`);
  lines.push(`   C_v/C_r ${q(kC)} · per-pixel (ii) < 0.95: ${f((100 * fii) / n, 1)} %`);
  lines.push(`   |Δh|°   ${q(dh)} · per-pixel (i) > 3°: ${f((100 * fi) / n, 1)} %`);
  lines.push(`   ΔL      ${q(dL)} · per-pixel ΔL ≥ 0: ${f((100 * fiii) / n, 1)} %`);
  for (const [h, bb] of [...bins].sort((a, b) => a[0] - b[0])) if (bb.n >= 200)
    lines.push(`   raw hue ${String(h).padStart(3)}-${h + 30}°: ${String(bb.n).padStart(6)} px, raw C p50 ${f(pct(bb.C, 0.5), 3)} · C× p50 ${f(pct(bb.k, 0.5), 3)} (p05 ${f(pct(bb.k, 0.05), 3)}) · |Δh| p50 ${f(pct(bb.h, 0.5), 1)}° (p95 ${f(pct(bb.h, 0.95), 1)}°) · ΔL p50 ${f(pct(bb.d, 0.5), 3)}`);
}
// 3. light-arm paint identity
for (const ground of ["paper", "aurora"]) {
  const a = one(A, "light", ground), b = one(B, "light", ground);
  for (const mode of ["raw", "full"]) {
    const ia = A.img(a, mode), ib = B.img(b, mode); let d = 0, mx = 0;
    for (let i = 0; i < ia.data.length; i += 4) { const m = Math.max(Math.abs(ia.data[i] - ib.data[i]), Math.abs(ia.data[i + 1] - ib.data[i + 1]), Math.abs(ia.data[i + 2] - ib.data[i + 2])); if (m) { d++; mx = Math.max(mx, m); } }
    lines.push(`light ${ground} ${mode}, floor v11a vs floor v11 (${engine}): ${d} px differ, max channel Δ ${mx}${mode === "full" && d ? " ✗" : ""}`);
    if (mode === "full" && d) bad++;
  }
}
for (const l of lines) console.log(l);
console.log(bad ? `OFFSPOT FAIL (${bad})` : "OFFSPOT READ (light arm pixel-identical; the field percentiles are REPORTED, never gated)");
process.exitCode = bad ? 1 : 0;
