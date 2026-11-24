// BM pass 4, fold of pass 3's critiques (A1, A3, A8, B3-1, B3-3, B3-4, B3-8, B3-10): the chrome fill restated on
// BL's D3 material law and the owner's O-260 blur register, computed without a browser.
// Run from the glass-ui checkout:
//   ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-4/fold/material-fold.mjs
//
// D3's law (BL design/material/pass-12/floor-v11a.patch, tokens/glass.css §8): the plate is `--card` at α over
// whatever is behind it; a surface that does not know its ground paints THE BOUND, the α at which an ink clears
// `--glass-ink-target: 4.8` (4.5:1 plus 0.3 for glyph antialiasing) over the worst flat ground (black in light,
// white in dark). D3 solves the bound for the muted ink. O-260 (BL audit/INBOUND.md:235, booked for 12.0.0): the
// floating and overlay rungs, which carry the dock, menus, sheets and dialogs, sample no backdrop. So the chrome
// plate below is `--card` at α composited over the raw ground, with no blur and no saturate.
//
// Three candidates, one law, different inks:
//   A  D3's floor: α solved for the muted ink at 4.8.
//   B  one ink on chrome (BL RU-44 for the dock, extended by pass 3): α solved for --foreground at 4.8.
//   C  icons and large words only: α solved for --foreground at 3.3 (3:1 plus the same 0.3).
// Colours are glass-ui master's defaults (2dbc19a5c), as pass 3's model; a site that re-points --card or
// --foreground moves every α, which D3's law recomputes in CSS (B3-8).
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PHOTO = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/giraffe.webp";
const hsl = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  return [0, 8, 4].map((n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))); };
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const oklch = (L, C, h) => { const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
    .map((v) => Math.max(0, Math.min(1, toGam(v)))); };
const lum = ([r, g, b]) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (C, A, B) => [0, 1, 2].map((i) => A * C[i] + (1 - A) * B[i]);
const hex = (c) => "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");

const MODES = {
  light: { fg: hsl(24, 10, 10), muted: hsl(30, 26, 35), card: hsl(30, 85, 96), page: hsl(40, 30, 98), worst: [0, 0, 0] },
  dark: { fg: hsl(30, 14, 90), muted: hsl(34, 16, 72), card: hsl(26, 22, 17), page: hsl(24, 9, 4), worst: [1, 1, 1] },
};
const flat = (c, w = 32, h = 16) => ({ w, h, px: Array.from({ length: w * h }, () => c.slice()) });
function photo() {
  const [w, h] = execFileSync("magick", [PHOTO, "-resize", "380x", "-format", "%w %h", "info:"], { encoding: "utf8" }).trim().split(" ").map(Number);
  const raw = execFileSync("magick", [PHOTO, "-resize", "380x", "-depth", "8", "rgb:-"], { maxBuffer: 1 << 26 });
  const px = []; for (let i = 0; i < w * h; i++) px.push([raw[3 * i] / 255, raw[3 * i + 1] / 255, raw[3 * i + 2] / 255]);
  return { w, h, px };
}
// The default aurora's static field, as pass 3's legibility.mjs (DEFAULT_AURORA_CONFIG, auroraFallbackGround.ts).
function aurora(w = 380, h = 300) {
  const palette = [[0.64, 0.17, 30], [0.76, 0.15, 55], [0.87, 0.13, 82]].map(([L, C, H]) => oklch(L, C, H).map(toLin));
  const nuclei = [{ x: 0.3, y: 0.3, r: 0.5, pb: 0, vb: 0 }, { x: 0.7, y: 0.65, r: 0.5, pb: 1, vb: 0.05 }];
  const tonemap = ([r, g, b]) => { const sc = 0.76, x = Math.min(r, g, b), off = x < 0.08 ? x - 6.25 * x * x : 0.04; let c = [r - off, g - off, b - off];
    const peak = Math.max(...c); if (peak < sc) return c.map((v) => Math.max(0, Math.min(1, v)));
    const d = 1 - sc, np = 1 - (d * d) / (peak + d - sc), s = np / peak; c = c.map((v) => v * s); const gg = 1 - 1 / (0.15 * (peak - np) + 1);
    return c.map((v) => Math.max(0, Math.min(1, v + (np - v) * gg))); };
  const px = [];
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const x = i / (w - 1), y = j / (h - 1); let ab = 0, av = 0, aw = 0;
    for (const n of nuclei) { const wt = Math.exp((-3 * ((x - n.x) ** 2 + (y - n.y) ** 2)) / (n.r * n.r)); ab += wt * n.pb; av += wt * n.vb; aw += wt; }
    const id = Math.max(0, Math.min(1, ab / aw)) * 2, i0 = Math.floor(id), i1 = Math.min(i0 + 1, 2), t = id - i0;
    const base = [0, 1, 2].map((k) => palette[i0][k] + (palette[i1][k] - palette[i0][k]) * t), vm = 1 + 0.08 * (av / aw);
    px.push(tonemap(base.map((v) => v * vm)).map((v) => toGam(Math.max(0, Math.min(1, v * 0.985 + 0.008)))));
  }
  return { w, h, px };
}
// THE BOUND: least α of --card over the worst ground at which `ink` clears `target` (bisection, rounded up).
function bound(mode, ink, target) {
  const M = MODES[mode]; let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) { const a = (lo + hi) / 2; if (contrast(M[ink], over(M.card, a, M.worst)) >= target) hi = a; else lo = a; }
  return Math.ceil(hi * 1000) / 1000;
}
function transmission(raw, plates, w) {
  const luma = (c) => 255 * (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]), sat = (c) => Math.max(...c) - Math.min(...c);
  const st = (arr) => { const L = arr.map(luma), mean = L.reduce((a, b) => a + b, 0) / L.length, sd = Math.sqrt(L.reduce((a, b) => a + (b - mean) ** 2, 0) / L.length);
    let dx = 0, n = 0; for (let i = 0; i < L.length; i++) if ((i + 1) % w !== 0) { dx += Math.abs(L[i + 1] - L[i]); n++; }
    return { mean, sd, dx: dx / n, sat: arr.reduce((a, c) => a + sat(c), 0) / arr.length }; };
  const a = st(raw), b = st(plates);
  return { mean_luma_change_pct: +(((b.mean - a.mean) / a.mean) * 100).toFixed(1), sd_kept_pct: Math.round((b.sd / a.sd) * 100), fine_detail_kept_pct: Math.round((b.dx / a.dx) * 100), saturation_change_pct: Math.round(((b.sat - a.sat) / a.sat) * 100) };
}
const G = { white: flat([1, 1, 1]), black: flat([0, 0, 0]), grey: flat([0.5, 0.5, 0.5]), photo: photo(), aurora: aurora() };
const out = { at: new Date().toISOString(), model: "card at alpha over the raw ground (no blur, O-260); gamma sRGB; WCAG 2", bounds: {}, table: {}, transmission: {}, onPage: {}, edge: {}, reference: {} };
for (const mode of ["light", "dark"]) {
  const M = MODES[mode];
  const a = { A: bound(mode, "muted", 4.8), B: bound(mode, "fg", 4.8), C: bound(mode, "fg", 3.3) };
  out.bounds[mode] = a;
  out.table[mode] = {}; out.transmission[mode] = {}; out.onPage[mode] = {}; out.edge[mode] = {};
  for (const [k, alpha] of Object.entries(a)) {
    const row = {};
    for (const [g, img] of Object.entries(G)) {
      const plates = img.px.map((p) => over(M.card, alpha, p));
      const cs = plates.map((p) => contrast(M.fg, p)).sort((x, y) => x - y), cm = plates.map((p) => contrast(M.muted, p)).sort((x, y) => x - y);
      row[g] = { fg_min: +cs[0].toFixed(2), fg_under_4_5: +(cs.filter((c) => c < 4.5).length / cs.length).toFixed(3), muted_min: +cm[0].toFixed(2), muted_under_4_5: +(cm.filter((c) => c < 4.5).length / cm.length).toFixed(3) };
      if (g === "photo") out.transmission[mode][k] = transmission(img.px, plates, img.w);
      // B3-10: how far the plate stands off its own ground, and how far the 8 % hairline stands off the plate,
      // as the median over the ground's pixels.
      const offs = img.px.map((p, i) => contrast(plates[i], p)).sort((x, y) => x - y);
      const hair = plates.map((p) => contrast(over(M.fg, 0.08, p), p)).sort((x, y) => x - y);
      out.edge[mode][k] = out.edge[mode][k] || {};
      out.edge[mode][k][g] = { plate_off_ground_median: +offs[Math.floor(offs.length / 2)].toFixed(2), plate_off_ground_p10: +offs[Math.floor(offs.length * 0.1)].toFixed(2), hairline_off_plate_median: +hair[Math.floor(hair.length / 2)].toFixed(2) };
    }
    out.table[mode][k] = row;
    const onPage = over(M.card, alpha, M.page);
    out.onPage[mode][k] = { hex: hex(onPage), vs_page: +contrast(onPage, M.page).toFixed(2), page_edge_hairline_vs_plate: +contrast(over(M.fg, 0.08, onPage), onPage).toFixed(2) };
  }
}
// B3-3: total opacity against the dark plate BL withdrew as near-solid (RULINGS-6.md:27: 0.4 × 0.18 + 0.6 = 0.672),
// and pass 3's B (ink 0.14 under card at 1 − 0.335).
out.reference = { bl_withdrawn_dark_plate_opacity: 0.672, pass3_B_dark_total_opacity: +(0.335 * 0.14 + 0.665).toFixed(3), pass3_B_light_total_opacity: +(0.482 * 0.14 + 0.518).toFixed(3) };
writeFileSync(path.join(HERE, "material-fold.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.bounds), JSON.stringify(out.reference));
for (const mode of ["light", "dark"]) { console.log(mode); console.table(Object.fromEntries(Object.entries(out.table[mode]).map(([k, r]) => [k, Object.fromEntries(Object.entries(r).map(([g, v]) => [g, `${v.fg_min}/${v.fg_under_4_5} m${v.muted_min}/${v.muted_under_4_5}`]))]))); }
console.log(JSON.stringify({ transmission: out.transmission, onPage: out.onPage }));
console.log(JSON.stringify(out.edge));
