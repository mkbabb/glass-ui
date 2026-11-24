// BM pass 3: writes the default aurora's static field (the mirror in legibility.mjs) as raw RGB for R3b's aurora band.
// Run: ~/.claude/guard/guarded --light -- node docs/tranches/BM/study/pass-3/material/aurora-ground.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4), toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const oklchLin = (L, C, h) => { const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((v) => Math.max(0, v)); };
const palette = [[0.64, 0.17, 30], [0.76, 0.15, 55], [0.87, 0.13, 82]].map(([L, C, H]) => oklchLin(L, C, H));
const nuclei = [{ x: 0.3, y: 0.3, r: 0.5, pb: 0, vb: 0 }, { x: 0.7, y: 0.65, r: 0.5, pb: 1, vb: 0.05 }];
const tonemap = ([r, g, b]) => { const sc = 0.76, x = Math.min(r, g, b), off = x < 0.08 ? x - 6.25 * x * x : 0.04; let c = [r - off, g - off, b - off];
  const peak = Math.max(...c); if (peak < sc) return c.map((v) => Math.max(0, Math.min(1, v)));
  const d = 1 - sc, np = 1 - (d * d) / (peak + d - sc), s = np / peak; c = c.map((v) => v * s); const gg = 1 - 1 / (0.15 * (peak - np) + 1);
  return c.map((v) => Math.max(0, Math.min(1, v + (np - v) * gg))); };
const W = 760, H = 300, buf = Buffer.alloc(W * H * 3);
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
  const x = i / (W - 1), y = j / (H - 1); let ab = 0, av = 0, aw = 0;
  for (const n of nuclei) { const wt = Math.exp((-3 * ((x - n.x) ** 2 + (y - n.y) ** 2)) / (n.r * n.r)); ab += wt * n.pb; av += wt * n.vb; aw += wt; }
  const id = Math.max(0, Math.min(1, ab / aw)) * 2, i0 = Math.floor(id), i1 = Math.min(i0 + 1, 2), t = id - i0;
  const c = tonemap([0, 1, 2].map((k) => (palette[i0][k] + (palette[i1][k] - palette[i0][k]) * t) * (1 + 0.08 * (av / aw))));
  c.forEach((v, k) => { buf[3 * (j * W + i) + k] = Math.round(255 * toGam(Math.max(0, Math.min(1, v * 0.985 + 0.008)))); });
}
writeFileSync(path.join(HERE, "ground", "aurora.rgb"), buf);
console.log(W, H);
