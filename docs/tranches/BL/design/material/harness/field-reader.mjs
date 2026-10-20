#!/usr/bin/env node
// field-reader.mjs · FIELD (H13-3, pass 13, REGISTRY P12-5 C-2, ruling R-39): the dark focus veil read per pixel over its
// whole field, never gated. Promoted from the pass-12 critic's pass-12/crit-offspot.mjs, which read two arms side by side
// and stays as that pass's record; this reads one capture. R-32 gates the probe's MEAN colour on the aurora spot (M-9
// --r32). O-103a's words are general ("dims by OKLCH lightness, keeps chroma"), so this prints, per pixel:
//   1. the mask: the pixels where the capture's own dark PAPER state cell dims (full vs raw, ΔL ≤ −0.015), outside every
//      [data-spec] rect and veil probe dilated by DIL px (the blur's reach), so only bare veiled ground is read;
//   2. the veiled field: the dark AURORA state cell inside the mask, every pixel with raw C ≥ CMIN and L ≥ LMIN: C_v/C_r,
//      |Δh| and ΔL as percentiles, the share of pixels that would fail R-32 (i), (ii) or (iii) if the gate were per pixel
//      ((iii) on ΔL rounded to 3 decimals, R-38), and the same by raw hue in 30° bins;
//   3. the multi-hue veiled cell: the dark PAPER state cell of variant `veil-hues` (veil-hues.css injected: violet, blue
//      and teal bands under the veil, the off-orange hues R-39 names), read the same way inside the same mask. It comes
//      from --hues <capdir> (default: the same capture). Capture it apart from the battery's capture so no witness that
//      walks every cell reads it:
//        node capture.mjs <dist> --out <hues capdir> --engines chromium --themes dark --scenes state --grounds paper \
//          --variant veil-hues --inject veil-hues.css
// Every number is REPORTED (R-39: the spot is the gate; off-orange hues are reported unless the owner extends O-103a).
// A Playwright WebKit capture reads 0 px in the mask while that engine paints no backdrop-filter (R-37's engine fact).
// The verdict line is `PRINT (…)`, exit 0; with no dark paper and aurora state cell in any engine it reads nothing
// (exit 2).
//   node field-reader.mjs <capdir> [--hues <capdir>] [--engines chromium,webkit] [--variant base]
import { cli, list, loadCapture, pick, lch, hueDiff, pct, f, VARIANT } from "./lib.mjs";

const a = cli({ hues: { type: "string" }, engines: { type: "string" } });
if (!a._[0]) { console.log("field reader: nothing read (usage: node field-reader.mjs <capdir> [--hues <capdir>] [--engines list])"); process.exit(2); }
const DIL = 48, CMIN = 0.04, LMIN = 0.25, HUES = "veil-hues";
const cap = loadCapture(a._[0]), hcap = a.hues ? loadCapture(a.hues) : cap;
const engines = list(a.engines, [...new Set(cap.cells.map((c) => c.engine))]);
const one = (c, engine, ground, variant) => pick(c, { engine, theme: "dark", ground, scene: "state", variant })[0];
const px = (png, x, y) => { const i = (png.width * y + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
const q = (arr, k = 3) => `p05 ${f(pct(arr, 0.05), k)} · p50 ${f(pct(arr, 0.5), k)} · p95 ${f(pct(arr, 0.95), k)}`;
const lines = [];
let fields = 0, read = 0;

// One reading of a veiled cell inside the mask, printed whole and by raw hue.
function readCell(what, c, cell, mask, W, H) {
  const raw = c.img(cell, "raw"), ful = c.img(cell, "full");
  if (raw.width !== W || raw.height !== H) { lines.push(`${what}: ${raw.width}×${raw.height}, the mask is ${W}×${H}: not read`); return; }
  const kC = [], dh = [], dL = [], bins = new Map(); let n = 0, fi = 0, fii = 0, fiii = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!mask[y * W + x]) continue;
    const r = lch(px(raw, x, y)), v = lch(px(ful, x, y));
    if (r[1] < CMIN || r[0] < LMIN) continue;
    n++; const k = v[1] / r[1], h = hueDiff(r[2], v[2]), d = v[0] - r[0];
    kC.push(k); dh.push(h); dL.push(d); if (h > 3) fi++; if (k < 0.95) fii++; if (!(+f(d, 3) < 0)) fiii++;
    const key = Math.floor(r[2] / 30) * 30, b = bins.get(key) || { k: [], h: [], d: [], C: [] };
    b.k.push(k); b.h.push(h); b.d.push(d); b.C.push(r[1]); bins.set(key, b);
  }
  if (!n) { lines.push(`${what}: 0 chromatic px in the mask (raw C ≥ ${CMIN}, L ≥ ${LMIN})`); return; }
  fields++;
  lines.push(`${what}: ${n} chromatic px (raw C ≥ ${CMIN}, L ≥ ${LMIN})`);
  lines.push(`   C_v/C_r ${q(kC)} · per pixel < 0.95 (ii): ${f((100 * fii) / n, 1)} %`);
  lines.push(`   |Δh|°   ${q(dh)} · per pixel > 3° (i): ${f((100 * fi) / n, 1)} %`);
  lines.push(`   ΔL      ${q(dL)} · per pixel not dimmed at 3 decimals (iii): ${f((100 * fiii) / n, 1)} %`);
  for (const [h, b] of [...bins].sort((x, y) => x[0] - y[0])) if (b.k.length >= 200)
    lines.push(`   raw hue ${String(h).padStart(3)}-${h + 30}°: ${String(b.k.length).padStart(6)} px, raw C p50 ${f(pct(b.C, 0.5), 3)} · C× p50 ${f(pct(b.k, 0.5), 3)} (p05 ${f(pct(b.k, 0.05), 3)}) · |Δh| p50 ${f(pct(b.h, 0.5), 1)}° (p95 ${f(pct(b.h, 0.95), 1)}°) · ΔL p50 ${f(pct(b.d, 0.5), 3)}`);
}

for (const engine of engines) {
  const paper = one(cap, engine, "paper", VARIANT), aurora = one(cap, engine, "aurora", VARIANT);
  if (!paper || !aurora) { lines.push(`${engine}: no dark paper and aurora state cells of variant ${VARIANT}: not read`); continue; }
  read++;
  // 1. the mask, from the dark paper cell's own veil
  const praw = cap.img(paper, "raw"), pful = cap.img(paper, "full"), W = praw.width, H = praw.height;
  const boxes = [...paper.specs.map((s) => s.rect), ...(paper.veil || [])];
  const inBox = (x, y) => boxes.some(([x0, y0, w, h]) => x >= x0 - DIL && x < x0 + w + DIL && y >= y0 - DIL && y < y0 + h + DIL);
  const mask = new Uint8Array(W * H); let nm = 0, bx0 = W, by0 = H, bx1 = -1, by1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (inBox(x, y) || lch(px(pful, x, y))[0] - lch(px(praw, x, y))[0] > -0.015) continue;
    mask[y * W + x] = 1; nm++; bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y);
  }
  lines.push(`mask ${engine}: ${nm} px where the dark paper veil dims ≤ −0.015 outside ${boxes.length} spec/probe boxes dilated ${DIL} px${nm ? `; bbox ${bx0},${by0} → ${bx1},${by1}` : " (no veiled field in this engine's capture)"}`);
  if (!nm) continue;
  // 2. the veiled field over the aurora
  readCell(`${engine} dark aurora field`, cap, aurora, mask, W, H);
  // 3. the multi-hue veiled cell
  const hue = one(hcap, engine, "paper", HUES);
  if (!hue) lines.push(`${engine} multi-hue cell: not captured (variant ${HUES}, veil-hues.css, in ${hcap.capdir})`);
  else readCell(`${engine} multi-hue veiled cell (${HUES})`, hcap, hue, mask, W, H);
}

console.log(`FIELD · the dark focus veil per pixel over its field and a multi-hue veiled cell (R-39: REPORTED, never gated)`);
console.log(`capture ${cap.capdir}${hcap !== cap ? ` · hues ${hcap.capdir}` : ""} · engines ${engines.join(",")} · variant ${VARIANT}`);
for (const l of lines) console.log("  " + l);
console.log("real Safari: UNMEASURED (owner's safaridriver checkbox)");
if (!read) { console.log(`field reader: nothing read (no dark paper and aurora state cells in ${cap.capdir})`); process.exitCode = 2; }
else { console.log(`PRINT (${fields} veiled fields read over ${read} engines; REPORTED, never gated)`); process.exitCode = 0; }
