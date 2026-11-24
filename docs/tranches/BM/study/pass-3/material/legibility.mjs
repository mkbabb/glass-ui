// BM pass 3: the material, measured without a browser (Q10, Q13, Q14).
// Run from the glass-ui checkout: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-3/material/legibility.mjs
//
// What it models. A glass plate paints `backdrop-filter: blur(σ) saturate(s)` and then its background colour over
// the filtered backdrop. Both filter functions are applied in gamma sRGB, as WebKit and Chromium apply the CSS
// shorthands (Filter Effects 1 defines them by SVG equivalents; browsers run the shorthands in sRGB); the
// background composites in gamma sRGB: out = A·C + (1 − A)·B. The plate's paint is the veil: today the warm ink at
// the rung's alpha (tokens/glass.css); the candidates add a floor of the house's own `--card` under the ink. On a
// flat ground the blur and the saturate change nothing, so the white, black and grey rows are exact. On the
// owner's photograph and the aurora the blur and saturate are applied to the pixels, at one image pixel per CSS px.
//
// What it does not model: WebKit's backdrop is a Core Animation backdrop layer whose blur kernel and edge handling
// are its own; the phone is the only reading of that (R3, R3b). Text is measured against the plate under it, pixel
// by pixel, with WCAG 2 contrast (4.5:1 for words, 3:1 for icons and large words).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PHOTO = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/giraffe.webp"; // R3's photograph, the owner's own

// ── colour ─────────────────────────────────────────────────────────────────────────────────────────────────────
const hsl = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  return [0, 8, 4].map((n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))); };
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const oklch = (L, C, h) => { const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
    .map((v) => Math.max(0, Math.min(1, toGam(v)))); };
const toOklch = ([r, g, b]) => { const [R, G, B] = [r, g, b].map(toLin);
  const l = Math.cbrt(0.4122214708 * R + 0.5363015620 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  return { L: +L.toFixed(3), C: +Math.hypot(A, Bb).toFixed(3), h: Math.round(((Math.atan2(Bb, A) * 180) / Math.PI + 360) % 360) }; };
const lum = ([r, g, b]) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (C, A, B) => [0, 1, 2].map((i) => A * C[i] + (1 - A) * B[i]);
const rgb255 = (c) => c.map((v) => Math.round(v * 255));

// ── the house's tokens (master 2dbc19a5c) ────────────────────────────────────────────────────────────────────────
const MODES = {
  light: { fg: hsl(24, 10, 10), muted: hsl(30, 26, 35), card: hsl(30, 85, 96), page: hsl(40, 30, 98), ink: oklch(0.28, 0.035, 70), base: 0.14, border: 0.08 },
  dark: { fg: hsl(30, 14, 90), muted: hsl(34, 16, 72), card: hsl(26, 22, 17), page: hsl(24, 9, 4), ink: oklch(0.17, 0.03, 70), base: 0.18, border: 0.08 },
};
const STEP = 0.04;
const RUNGS = { wash: -2, dock: -1, quiet: -1, resting: 0, floating: 1, overlay: 2 };
const RADIUS = { wash: 10, dock: 16, quiet: 14, resting: 16, floating: 20, overlay: 22 };

// ── grounds ─────────────────────────────────────────────────────────────────────────────────────────────────────
const flat = (c, w = 64, h = 48) => ({ w, h, px: Array.from({ length: w * h }, () => c.slice()) });
function photo() {
  const size = execFileSync("magick", [PHOTO, "-resize", "380x", "-format", "%w %h", "info:"], { encoding: "utf8" }).trim().split(" ").map(Number);
  const raw = execFileSync("magick", [PHOTO, "-resize", "380x", "-depth", "8", "rgb:-"], { maxBuffer: 1 << 26 });
  const px = []; for (let i = 0; i < size[0] * size[1]; i++) px.push([raw[3 * i] / 255, raw[3 * i + 1] / 255, raw[3 * i + 2] / 255]);
  return { w: size[0], h: size[1], px };
}
// The default aurora's static field (DEFAULT_AURORA_CONFIG, presets.ts:460-505), mirrored from
// auroraFallbackGround.ts:125-185: the softmax nuclei field, the linear palette lerp, the value variance, the
// PBR-Neutral tonemap, the toe, the sRGB OETF.
function aurora(w = 380, h = 300) {
  const palette = [[0.64, 0.17, 30], [0.76, 0.15, 55], [0.87, 0.13, 82]].map(([L, C, H]) => oklch(L, C, H).map(toLin));
  const nuclei = [{ x: 0.3, y: 0.3, r: 0.5, pb: 0, vb: 0 }, { x: 0.7, y: 0.65, r: 0.5, pb: 1, vb: 0.05 }];
  const beta = 3, vv = 0.08;
  const tonemap = ([r, g, b]) => { const sc = 0.76, x = Math.min(r, g, b), off = x < 0.08 ? x - 6.25 * x * x : 0.04; let c = [r - off, g - off, b - off];
    const peak = Math.max(...c); if (peak < sc) return c.map((v) => Math.max(0, Math.min(1, v)));
    const d = 1 - sc, np = 1 - (d * d) / (peak + d - sc), s = np / peak; c = c.map((v) => v * s); const gg = 1 - 1 / (0.15 * (peak - np) + 1);
    return c.map((v) => Math.max(0, Math.min(1, v + (np - v) * gg))); };
  const px = [];
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const x = i / (w - 1), y = j / (h - 1); let ab = 0, av = 0, aw = 0;
    for (const n of nuclei) { const d2 = (x - n.x) ** 2 + (y - n.y) ** 2, wt = Math.exp((-beta * d2) / (n.r * n.r)); ab += wt * n.pb; av += wt * n.vb; aw += wt; }
    const id = Math.max(0, Math.min(1, ab / aw)) * (palette.length - 1), i0 = Math.floor(id), i1 = Math.min(i0 + 1, palette.length - 1), t = id - i0;
    const base = [0, 1, 2].map((k) => palette[i0][k] + (palette[i1][k] - palette[i0][k]) * t), vm = 1 + vv * (av / aw);
    px.push(tonemap(base.map((v) => v * vm)).map((v) => toGam(Math.max(0, Math.min(1, v * 0.985 + 0.008)))));
  }
  return { w, h, px };
}

// ── the backdrop filter ─────────────────────────────────────────────────────────────────────────────────────────
const blurCache = new Map();
function blur(img, sigma) {
  if (sigma <= 0) return img;
  if (!blurCache.has(img)) blurCache.set(img, new Map());
  const hit = blurCache.get(img).get(sigma); if (hit) return hit;
  const res = blurRaw(img, sigma); blurCache.get(img).set(sigma, res); return res;
}
function blurRaw(img, sigma) {
  const r = Math.ceil(3 * sigma), k = Array.from({ length: 2 * r + 1 }, (_, i) => Math.exp(-((i - r) ** 2) / (2 * sigma * sigma)));
  const ks = k.reduce((a, b) => a + b, 0), { w, h } = img;
  const pass = (src, horiz) => { const out = new Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const acc = [0, 0, 0];
      for (let t = -r; t <= r; t++) { const xx = horiz ? Math.min(w - 1, Math.max(0, x + t)) : x, yy = horiz ? y : Math.min(h - 1, Math.max(0, y + t));
        const p = src[yy * w + xx], kv = k[t + r]; acc[0] += p[0] * kv; acc[1] += p[1] * kv; acc[2] += p[2] * kv; }
      out[y * w + x] = acc.map((v) => v / ks); }
    return out; };
  return { w, h, px: pass(pass(img.px, true), false) };
}
const saturate = (c, s) => { const [r, g, b] = c;
  return [(0.213 + 0.787 * s) * r + (0.715 - 0.715 * s) * g + (0.072 - 0.072 * s) * b,
    (0.213 - 0.213 * s) * r + (0.715 + 0.285 * s) * g + (0.072 - 0.072 * s) * b,
    (0.213 - 0.213 * s) * r + (0.715 - 0.715 * s) * g + (0.072 + 0.928 * s) * b].map((v) => Math.max(0, Math.min(1, v))); };

// A material: { sigma, sat, paint(B) → plate colour over a filtered backdrop pixel B }.
const veilMaterial = (sigma, sat, layers) => ({ sigma, sat, paint: (B) => layers.reduce((acc, [C, A]) => over(C, A, acc), B) });

function measure(material, ground, mode) {
  const g = blur(ground, material.sigma), M = MODES[mode];
  let minFg = Infinity, minMuted = Infinity, below45 = 0, below3 = 0; const cs = [];
  const plates = g.px.map((p) => material.paint(saturate(p, material.sat)));
  for (const p of plates) { const c = contrast(M.fg, p); cs.push(c); minFg = Math.min(minFg, c); minMuted = Math.min(minMuted, contrast(M.muted, p)); if (c < 4.5) below45++; if (c < 3) below3++; }
  cs.sort((a, b) => a - b);
  return { fg_min: +minFg.toFixed(2), fg_p5: +cs[Math.floor(cs.length * 0.05)].toFixed(2), fg_share_below_4_5: +(below45 / cs.length).toFixed(3), fg_share_below_3: +(below3 / cs.length).toFixed(3), muted_min: +minMuted.toFixed(2), plates };
}
// The archive's operational definition of frosted glass ([ARC] §5(i)): mean luma change, structure (sd) kept,
// fine detail (mean |dI/dx|) kept, saturation change, plate against raw ground.
function transmission(raw, plates, w) {
  const luma = (c) => 255 * (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]), sat = (c) => Math.max(...c) - Math.min(...c);
  const stats = (arr) => { const L = arr.map(luma), mean = L.reduce((a, b) => a + b, 0) / L.length, sd = Math.sqrt(L.reduce((a, b) => a + (b - mean) ** 2, 0) / L.length);
    let dx = 0, n = 0; for (let i = 0; i < L.length; i++) if ((i + 1) % w !== 0) { dx += Math.abs(L[i + 1] - L[i]); n++; }
    return { mean, sd, dx: dx / n, sat: arr.reduce((a, c) => a + sat(c), 0) / arr.length }; };
  const a = stats(raw), b = stats(plates);
  return { mean_luma_change_pct: +(((b.mean - a.mean) / a.mean) * 100).toFixed(1), sd_kept_pct: Math.round((b.sd / a.sd) * 100), fine_detail_kept_pct: Math.round((b.dx / a.dx) * 100), saturation_change_pct: Math.round(((b.sat - a.sat) / a.sat) * 100) };
}

// ── candidates ──────────────────────────────────────────────────────────────────────────────────────────────────
const inkAt = (mode, rung, extraSteps = 0) => [MODES[mode].ink, MODES[mode].base + (RUNGS[rung] + extraSteps) * STEP];
const today = (mode, rung, sigma = RADIUS[rung]) => veilMaterial(sigma, 1.5, [inkAt(mode, rung)]);
const clampMax = (mode, rung) => veilMaterial(RADIUS[rung], 1.5, [inkAt(mode, rung, 2)]);
const floored = (mode, rung, f, sigma = 12) => veilMaterial(sigma, 1.5, [[MODES[mode].card, f], inkAt(mode, rung)]);
// glass-ui's own lever: `--glass-level` mixes the rung toward solid `--card` (tokens/glass.css:165-174, color-mix in
// srgb, premultiplied), which over the backdrop is the ink at α, then the card at 1 − level over it. Today it also
// scales the blur (tokens/glass.css:88-92); B and C hold the blur at 12 px.
const levelPlate = (mode, rung, L, sigma = RADIUS[rung] * L) => veilMaterial(sigma, 1.5, [inkAt(mode, rung), [MODES[mode].card, 1 - L]]);
const APPLE = {
  // rida.dev's fits of Apple's glass in the iOS 27 simulator ([RU §5.1]; pcc@6176, pcc@653): menu panel and bar body
  "menu (sim)": { light: veilMaterial(12, 1.2, [[[253 / 255, 253 / 255, 253 / 255], 0.535]]), dark: veilMaterial(8.4, 1.3, [[[49 / 255, 49 / 255, 49 / 255], 0.651]]) },
  "bar (sim)": { light: { sigma: 16, sat: 0.9, paint: (B) => B.map((v) => (132.5 + 0.474 * 255 * v) / 255) },
    dark: { sigma: 16, sat: 1.2, paint: (B) => B.map((v) => Math.max(0, Math.min(1, 32 / 255 + 0.99 * v - 0.395 * v * v))) } },
};

// The least floor of `--card` under the dock rung's ink that holds a contrast target for --foreground over the
// worst flat ground (black in light, white in dark): closed form by bisection on the exact composite.
function solveFloor(mode, target, rung = "dock") {
  const worst = mode === "light" ? [0, 0, 0] : [1, 1, 1];
  let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) { const f = (lo + hi) / 2, p = floored(mode, rung, f).paint(worst); if (contrast(MODES[mode].fg, p) >= target) hi = f; else lo = f; }
  return Math.ceil(hi * 1000) / 1000; // rounded toward the side that holds the target
}

// ── run ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const G = { white: flat([1, 1, 1]), black: flat([0, 0, 0]), grey: flat([0.5, 0.5, 0.5]), photo: photo(), aurora: aurora() };
const out = { at: new Date().toISOString(), model: "gamma-sRGB filters and compositing; WCAG 2 contrast; 1 image px = 1 CSS px", floors: {}, table: {}, transmission: {}, plateOnPage: {}, edge: {}, blurSweep: {} };

out.levels = {};
for (const mode of ["light", "dark"]) {
  out.floors[mode] = { words_4_5: solveFloor(mode, 4.5), icons_3_0: solveFloor(mode, 3.0) };
  out.levels[mode] = { words_4_5: solveLevel(mode, 4.5, "dock"), icons_3_0: solveLevel(mode, 3.0, "dock") };
}
const cands = (mode) => ({
  "today: dock rung": today(mode, "dock"),
  "today: resting rung": today(mode, "resting"),
  "today: overlay rung": today(mode, "overlay"),
  "today: dock rung, clamp at its ceiling (+2 steps)": clampMax(mode, "dock"),
  "Apple menu (sim)": APPLE["menu (sim)"][mode],
  "Apple bar (sim)": APPLE["bar (sim)"][mode],
  "B: level for words (4.5:1), dock ink, 12 px": levelPlate(mode, "dock", out.levels[mode].words_4_5, 12),
  "C: level for icons (3:1), dock ink, 12 px": levelPlate(mode, "dock", out.levels[mode].icons_3_0, 12),
  "BL 11.2.0's dock (light level 1, dark level 0.7, blur 16 x level)": levelPlate(mode, "dock", mode === "dark" ? 0.7 : 1),
});
for (const mode of ["light", "dark"]) {
  out.table[mode] = {}; out.transmission[mode] = {}; out.plateOnPage[mode] = {};
  for (const [name, m] of Object.entries(cands(mode))) {
    const row = {};
    for (const [gname, ground] of Object.entries(G)) { const r = measure(m, ground, mode); row[gname] = { fg_min: r.fg_min, fg_p5: r.fg_p5, below_4_5: r.fg_share_below_4_5, below_3: r.fg_share_below_3, muted_min: r.muted_min };
      if (gname === "photo") out.transmission[mode][name] = transmission(ground.px, r.plates, ground.w); }
    out.table[mode][name] = row;
    const onPage = m.paint(saturate(MODES[mode].page, m.sat));
    out.plateOnPage[mode][name] = { rgb: rgb255(onPage), oklch: toOklch(onPage), vs_page: +contrast(onPage, MODES[mode].page).toFixed(2), on_white: +contrast(m.paint([1, 1, 1]), [1, 1, 1]).toFixed(2) };
  }
  // The edge (Q13): one 1 px border of the foreground at 8 % (today's dock hairline, tokens/glass.css:225-232) over
  // the plate, on the page and on white; and Apple's measured darkening rim (0.37 darker, light mode only, pcc@6405).
  for (const name of ["today: dock rung", "B: level for words (4.5:1), dock ink, 12 px", "C: level for icons (3:1), dock ink, 12 px"]) {
    const m = cands(mode)[name], M = MODES[mode];
    const e = {};
    for (const [gname, g] of [["page", M.page], ["white", [1, 1, 1]], ["black", [0, 0, 0]]]) {
      const plate = m.paint(saturate(g, m.sat)), border = over(M.fg, M.border, plate);
      e[gname] = { border_vs_plate: +contrast(border, plate).toFixed(2), border_vs_ground: +contrast(border, g).toFixed(2), plate_vs_ground: +contrast(plate, g).toFixed(2) };
    }
    out.edge[mode] = out.edge[mode] || {}; out.edge[mode][name] = e;
  }
  // One blur value: does the floor's legibility on the photograph hold at R3's three blur values (7, 12, 16)?
  out.blurSweep[mode] = {};
  for (const sigma of [7, 12, 16]) {
    const b = measure(levelPlate(mode, "dock", out.levels[mode].words_4_5, sigma), G.photo, mode), t = measure(today(mode, "dock", sigma), G.photo, mode);
    out.blurSweep[mode][`${sigma}px`] = { today_fg_min: t.fg_min, today_below_4_5: t.fg_share_below_4_5, B_fg_min: b.fg_min, B_below_4_5: b.fg_share_below_4_5 };
  }
}
// Today's lever beside the floor: `--glass-level` mixes the rung toward solid `--card` (tokens/glass.css:165-174,
// color-mix in srgb, premultiplied), which over the backdrop is the ink at α, then the card at 1 − level over it;
// and it scales the blur (tokens/glass.css:88-92). The least level for 4.5:1 per rung, and BL 11.2.0's dark dock
// (RU-93: level 0.7, so 16 × 0.7 = 11.2 px) on the same grounds. The floor per rung: a firmer rung's ink in light
// darkens the plate under dark words, so it needs a firmer base.
function solveLevel(mode, target, rung) {
  const worst = mode === "light" ? [0, 0, 0] : [1, 1, 1]; let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) { const L = (lo + hi) / 2, p = levelPlate(mode, rung, L).paint(worst); if (contrast(MODES[mode].fg, p) >= target) lo = L; else hi = L; }
  return Math.floor(lo * 1000) / 1000; // rounded toward the side that holds the target
}
out.byRung = {};
for (const mode of ["light", "dark"]) {
  out.byRung[mode] = {};
  for (const rung of ["wash", "quiet", "resting", "dock", "floating", "overlay"]) out.byRung[mode][rung] = { ink_alpha: +(MODES[mode].base + RUNGS[rung] * STEP).toFixed(2), floor_4_5: solveFloor(mode, 4.5, rung), floor_3_0: solveFloor(mode, 3.0, rung), level_4_5: solveLevel(mode, 4.5, rung) };
}
console.log("byRung", JSON.stringify(out.byRung));
out.colours = Object.fromEntries(Object.entries(MODES).map(([k, M]) => [k, { fg: rgb255(M.fg), card: rgb255(M.card), page: rgb255(M.page), ink: rgb255(M.ink) }]));
mkdirSync(HERE, { recursive: true });
writeFileSync(path.join(HERE, "legibility.json"), JSON.stringify(out, null, 1));
const brief = (t) => Object.fromEntries(Object.entries(t).map(([k, r]) => [k, Object.fromEntries(Object.entries(r).map(([g, v]) => [g, `${v.fg_min}/${v.below_4_5}`]))]));
console.log("floors", JSON.stringify(out.floors), "levels", JSON.stringify(out.levels));
for (const mode of ["light", "dark"]) { console.log(`\n${mode}: fg_min / share under 4.5`); console.table(brief(out.table[mode])); }
console.log(JSON.stringify({ transmission: out.transmission, plateOnPage: out.plateOnPage }, null, 0));
console.log(JSON.stringify({ edge: out.edge, blurSweep: out.blurSweep }, null, 0));
