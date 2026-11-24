// BM pass 6, the fold of pass 5's critiques: the numbers the rulings and the amended DESIGN §7 cite, computed
// without a browser (a model, not a device reading).
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-6/fold/fold.mjs
//
// 1. release   (A5-1, B5-4) the dock row seeded with a release speed: how far it passes its rest, and the largest
//              seed toward the target that keeps it within a quarter pixel (the capped seed the fold adopts).
// 2. band      (B5-5) the settle's end: the row's 2 % band (pass 3's player) against half a pixel, per hop length.
// 3. inks      (B5-1, A5-11) the step between the chosen and the unchosen word, per mode and R3b letter, and the
//              unchosen word on the strip's well; the perimeter edge (--ink-perimeter, 0.48) against each plate; the
//              dock icon's two inks (0.8 of the foreground at rest, full on the current seat).
// 4. clocks    (A5-13, B5-9) the label trade at 180 ms in frames at 30 fps.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const r3 = (x) => Math.round(x * 1000) / 1000;

// ── the dock row's closed form from displacement d0 (px from the target) and speed v0 (px/s) ──
const DOCK = [0.3, 0.88];
const state = ([resp, z], d0, v0, t) => {
  const w = (2 * Math.PI) / resp, a = z * w, wd = w * Math.sqrt(1 - z * z), A = d0, B = (v0 + a * d0) / wd;
  const e = Math.exp(-a * t), c = Math.cos(wd * t), s = Math.sin(wd * t);
  return [e * (A * c + B * s), e * ((-a * A + B * wd) * c + (-a * B - A * wd) * s)];
};
// Overshoot: the mark starts `dist` px short of its target (dist > 0) moving toward it at v (px/s, > 0 toward).
// In the spring's frame the displacement is −dist and the speed +v; passing the rest means x > 0.
const passBy = (row, dist, v) => { let m = 0; for (let t = 0; t < 2; t += 1 / 2000) m = Math.max(m, state(row, -dist, v, t)[0]); return m; };
const release = { row: "dock (0.30 s, 0.88)", table: [], cap_quarter_px: [] };
for (const dist of [0, 10, 30]) for (const v of [300, 600, 1000]) release.table.push({ short_px: dist, toward_px_s: v, passes_rest_px: r3(passBy(DOCK, dist, v)) });
// The cap: the seeded settle passes its rest by no more than it would from a standing start
// plus a quarter pixel (the row passes its rest by 0.297 % of the hop from rest, which no seed may grow by more).
for (const dist of [0, 5, 10, 20, 38, 76, 152, 228]) {
  const limit = passBy(DOCK, dist, 0) + 0.25;
  let lo = 0, hi = 5000; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (passBy(DOCK, dist, m) <= limit + 1e-9) lo = m; else hi = m; }
  release.cap_quarter_px.push({ short_px: dist, largest_seed_px_s: Math.round(lo), limit_px: r3(limit), from_rest_passes_px: r3(passBy(DOCK, dist, 0)) });
}

// ── 2. where a settle ends: the row's 2 % band against half a pixel ──
const lastOut = (row, D, eps) => { let last = 0; for (let t = 0; t < 3; t += 1 / 2000) if (Math.abs(state(row, -D, 0, t)[0]) > eps) last = t; return last; };
const band = [];
for (const D of [38, 76, 152, 228, 300]) {
  const t2 = lastOut(DOCK, D, 0.02 * D), th = lastOut(DOCK, D, 0.5);
  const [x2, v2] = state(DOCK, -D, 0, t2);
  band.push({ hop_px: D, band2pct_ms: Math.round(t2 * 1000), left_at_band_px: r3(-x2), speed_at_band_px_s: Math.round(v2), halfpx_ms: Math.round(th * 1000), peak_past_rest_px: r3(passBy(DOCK, D, 0)) });
}

// ── 3. inks (the model of mark.mjs, imported by re-reading its constants) ──
const hsl = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l); return [0, 8, 4].map((n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))); };
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const oklabToSrgb = ([L, a, b]) => { const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b; const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3; return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((v) => Math.max(0, Math.min(1, toGam(v)))); };
const oklchLab = (L, C, h) => [L, C * Math.cos((h * Math.PI) / 180), C * Math.sin((h * Math.PI) / 180)];
const lum = ([r, g, b]) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (C, A, B) => [0, 1, 2].map((i) => A * C[i] + (1 - A) * B[i]);
const M = {
  light: { fg: hsl(24, 10, 10), muted: hsl(30, 26, 35), card: hsl(30, 85, 96), page: hsl(40, 30, 98), worst: [0, 0, 0], ink: oklabToSrgb(oklchLab(0.28, 0.035, 70)), quiet: 0.10, floating: 0.18, bounds: { A: 0.897, B: 0.545, C: 0.437 } },
  dark: { fg: hsl(30, 14, 90), muted: hsl(34, 16, 72), card: hsl(26, 22, 17), page: hsl(24, 9, 4), worst: [1, 1, 1], ink: oklabToSrgb(oklchLab(0.17, 0.03, 70)), quiet: 0.14, floating: 0.22, bounds: { A: 0.872, B: 0.739, C: 0.616 } },
};
const inks = {};
for (const [mode, m] of Object.entries(M)) {
  inks[mode] = { the_two_inks_directly: r3(contrast(m.fg, m.muted)) };
  for (const [letter, a] of Object.entries(m.bounds)) for (const g of ["page", "worst"]) {
    const plate = over(m.card, a, g === "page" ? m.page : m.worst);
    const well = over(m.ink, m.quiet, plate);
    const mark = over(m.fg, 0.12, well);
    const seatFill = mode === "light" ? over(m.ink, m.floating, plate) : over(m.fg, 0.14, plate);
    const iconMuted = over(m.fg, 0.8, plate), iconFull = m.fg;
    const perim = over(m.fg, 0.48, mark); // the perimeter edge drawn on the mark, against the well beside it
    inks[mode][`${letter}/${g}`] = {
      chosen_word_on_mark: r3(contrast(m.fg, mark)),
      unchosen_word_on_well: r3(contrast(m.muted, well)),
      word_step_ratio: r3(contrast(m.fg, mark) / contrast(m.muted, well)),
      mark_vs_well: r3(contrast(mark, well)),
      perimeter_edge_vs_well: r3(contrast(perim, well)),
      perimeter_edge_vs_mark: r3(contrast(perim, mark)),
      dock_icon_muted_on_plate: r3(contrast(iconMuted, plate)),
      dock_icon_full_on_seat: r3(contrast(iconFull, seatFill)),
      dock_icon_step: r3(contrast(iconFull, iconMuted)),
      dock_seat_fill_vs_plate: r3(contrast(seatFill, plate)),
      dock_seat_perimeter_vs_plate: r3(contrast(over(m.fg, 0.48, seatFill), plate)),
    };
  }
}
const frames = (ms) => ({ ms, at30: r3(ms / 33.333), five_or_more_at30: ms / 33.333 >= 5 });
const out = { at: new Date().toISOString(), release, band, inks, clocks: { label_trade: frames(180), press_plate: frames(180) } };
writeFileSync(path.join(HERE, "fold.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(release)); console.log(JSON.stringify(band));
for (const mode of ["light", "dark"]) { console.log(mode, "two inks", inks[mode].the_two_inks_directly); for (const k of Object.keys(inks[mode]).filter((k) => k.includes("/"))) console.log("  ", k, JSON.stringify(inks[mode][k])); }
