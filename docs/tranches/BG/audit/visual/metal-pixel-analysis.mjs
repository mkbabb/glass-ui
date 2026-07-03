// Pixel analysis for BG.W-AUR-METAL-FINISH metal-medium captures.
// Computes over the AURORA FIELD region (avoid the right-side config dock + masthead):
//   mean RGB/luma, per-quadrant luma (recessive/fold check), saturation p50/p99
//   (oversaturation), warm-catch (brightest 2% region mean r vs g vs b), grain
//   (local stddev on a downsampled grid).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");
import { readFileSync } from "node:fs";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-METAL-FINISH-assets";

function load(name) {
  const png = PNG.sync.read(readFileSync(`${OUT}/${name}`));
  return png;
}

// Field region: the aurora stage is the left ~62% of the frame (the config dock is on the right).
// Work in fractional coords so it's resolution-agnostic (chrome 1440x900 @2x = 2880x1800; safari 2880x1800).
function analyze(png, label) {
  const { width: W, height: H, data } = png;
  // Field crop: x 4%..58%, y 20%..92% (below masthead, left of dock).
  const x0 = Math.floor(W * 0.04), x1 = Math.floor(W * 0.58);
  const y0 = Math.floor(H * 0.20), y1 = Math.floor(H * 0.92);
  let n = 0, sr = 0, sg = 0, sb = 0;
  const lumas = [];
  const sats = [];
  const pix = []; // {l,r,g,b}
  // per-quadrant luma sums
  const qx = (x0 + x1) / 2, qy = (y0 + y1) / 2;
  const q = [[0, 0], [0, 0]]; const qn = [[0, 0], [0, 0]];
  const step = 3; // subsample for speed
  for (let y = y0; y < y1; y += step) {
    for (let x = x0; x < x1; x += step) {
      const i = (y * W + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sr += r; sg += g; sb += b; n++;
      lumas.push(l);
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      sats.push(mx === 0 ? 0 : (mx - mn) / mx);
      pix.push({ l, r, g, b });
      const qi = y < qy ? 0 : 1, qj = x < qx ? 0 : 1;
      q[qi][qj] += l; qn[qi][qj]++;
    }
  }
  lumas.sort((a, b) => a - b); sats.sort((a, b) => a - b);
  const pct = (arr, p) => arr[Math.min(arr.length - 1, Math.floor(arr.length * p))];
  const mean = (s) => s / n;
  // warm-catch: brightest 2% pixels -> mean channel ordering
  pix.sort((a, b) => b.l - a.l);
  const topN = Math.max(1, Math.floor(pix.length * 0.02));
  let cr = 0, cg = 0, cb = 0;
  for (let k = 0; k < topN; k++) { cr += pix[k].r; cg += pix[k].g; cb += pix[k].b; }
  cr /= topN; cg /= topN; cb /= topN;
  // grain: stddev of luma over 24x24 downsampled cell means minus... use global luma stddev as proxy
  const lmean = lumas.reduce((a, b) => a + b, 0) / lumas.length;
  const lstd = Math.sqrt(lumas.reduce((a, b) => a + (b - lmean) ** 2, 0) / lumas.length);
  return {
    label,
    dims: `${W}x${H}`,
    meanRGB: [mean(sr), mean(sg), mean(sb)].map((v) => +v.toFixed(1)),
    meanLuma: +lmean.toFixed(1),
    lumaStd: +lstd.toFixed(1),
    lumaP05: +pct(lumas, 0.05).toFixed(1),
    lumaP50: +pct(lumas, 0.5).toFixed(1),
    lumaP95: +pct(lumas, 0.95).toFixed(1),
    lumaRange: +(pct(lumas, 0.95) - pct(lumas, 0.05)).toFixed(1),
    satP50: +pct(sats, 0.5).toFixed(3),
    satP99: +pct(sats, 0.99).toFixed(3),
    quadLuma: [
      [+(q[0][0] / qn[0][0]).toFixed(1), +(q[0][1] / qn[0][1]).toFixed(1)],
      [+(q[1][0] / qn[1][0]).toFixed(1), +(q[1][1] / qn[1][1]).toFixed(1)],
    ],
    catchRGB: [+cr.toFixed(1), +cg.toFixed(1), +cb.toFixed(1)],
    catchWarm: cr >= cg && cg >= cb, // warm = r>=g>=b (no cold/blue specular)
    catchWarmLoose: cr >= cb, // red channel >= blue channel (not cold)
  };
}

const files = [
  "chrome-metal-light.png", "chrome-metal-dark.png",
  "chrome-metal-gradient-light.png", "chrome-metal-gradient-dark.png",
  "chrome-aurora-light.png", "chrome-aurora-dark.png",
  "safari-metal-light.png", "safari-metal-dark.png",
  "safari-metal-gradient-light.png", "safari-metal-gradient-dark.png",
  "safari-aurora-light.png", "safari-aurora-dark.png",
];

for (const f of files) {
  try {
    const png = load(f);
    const a = analyze(png, f);
    console.log(JSON.stringify(a));
  } catch (e) {
    console.log(JSON.stringify({ label: f, err: String(e).slice(0, 120) }));
  }
}
