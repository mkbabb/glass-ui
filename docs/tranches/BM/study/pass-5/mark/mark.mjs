// BM pass 5 (the mark): the numbers DESIGN §7 cites, computed without a browser.
// Run from the glass-ui checkout:
//   ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-5/mark/mark.mjs
//
// 1. travel   the dock row (SPRING_PRESETS: response 0.30 s, damping 0.88, band 2 %) for a one- and a two-slot hop.
// 2. stretch  the travel stretch the owner is shown on P5-mark ("Stretches as it travels"): the leading edge on the
//             dock row, the trailing edge on the same damping with a longer response, their gap softly capped at
//             s of the mark's width, so a mark never grows past 1 + s whatever the distance. k (the trailing
//             response over the leading) is solved so a one-slot hop peaks near Find My's lower bound, 1.15
//             (BG RESEARCH-KINEMATICS.md §1: 1.15 to 1.25 along the travel, measured on an iPhone).
// 3. lift     how far each edge moves under the lift L for the mark sizes glass-ui ships, against P0a's hover row
//             ("its edge moves 4 px or less", motion-canon.md P0a).
// 4. clocks   the keyboard candidates and the reduced-motion dip, in frames at 60 and 30 Hz (law 7).
// 5. fills    every state fill a selection uses, over each R3b letter's chrome plate (D3's law at O-260: --card at
//             alpha over the raw ground, no blur), in both modes: the fill's contrast against the plate (3:1 where
//             the fill is the only sign, color-radius.css:150-155) and the word's contrast on the fill (4.5:1).
//             Owed by pass 3's fold (A4) and pass 4's §5.9 to this pass.
import { writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const r3 = (x) => Math.round(x * 1000) / 1000;

// ── 1. The dock row, closed form, from rest at 0 to 1 ──
const spring = (response, zeta) => {
  const w0 = (2 * Math.PI) / response;
  if (zeta >= 1) return (t) => 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  return (t) => 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
};
const settle = (p, band = 0.02) => { let last = 0; for (let t = 0; t < 3; t += 0.0005) if (Math.abs(1 - p(t)) > band) last = t; return last; };
const DOCK = { response: 0.3, zeta: 0.88 };
const pDock = spring(DOCK.response, DOCK.zeta);
const travel = {
  row: "dock", ...DOCK,
  settle_ms_2pct: Math.round(settle(pDock) * 1000),
  peak_overshoot_pct: r3((Math.max(...Array.from({ length: 3000 }, (_, i) => pDock(i / 1000))) - 1) * 100),
  t90_ms: Math.round(Array.from({ length: 3000 }, (_, i) => i).find((i) => pDock(i / 1000) >= 0.9)),
};

// ── 2. The travel stretch ──
const S = 0.2; // the cap: the mark is never more than 1.2 of its width (Find My's upper bound 1.25, rounded down)
const gapMax = (k) => { const pS = spring(DOCK.response * k, DOCK.zeta); let m = 0; for (let t = 0; t < 2; t += 0.001) m = Math.max(m, pDock(t) - pS(t)); return m; };
const peakStretch = (k, slots) => {
  const pS = spring(DOCK.response * k, DOCK.zeta); let m = 0;
  for (let t = 0; t < 2; t += 0.001) { const gap = S * Math.tanh((slots * (pDock(t) - pS(t))) / S); m = Math.max(m, gap); }
  return 1 + m; // in mark widths, for a mark one slot wide
};
let lo = 1, hi = 3; for (let i = 0; i < 40; i++) { const k = (lo + hi) / 2; if (peakStretch(k, 1) < 1.15) lo = k; else hi = k; }
const K = r3(hi);
const pSlow = spring(DOCK.response * K, DOCK.zeta);
// Keyframes the settle player needs to draw the stretch within a quarter pixel on a 96 px mark (pass 3's player
// samples where the curve bends; here a plain count at a fixed step, an upper bound).
const kfCount = (() => { const dt = 1 / 120; return Math.ceil(settle(pSlow) / dt) + 1; })();
const stretch = {
  cap_s: S, k: K, trailing_response_s: r3(DOCK.response * K),
  peak: { one_slot: r3(peakStretch(K, 1)), two_slots: r3(peakStretch(K, 2)), three_slots: r3(peakStretch(K, 3)) },
  raw_gap_max_of_travel: r3(gapMax(K)),
  trailing_edge_settle_ms: Math.round(settle(pSlow) * 1000),
  leading_edge_settle_ms: travel.settle_ms_2pct,
  keyframes_at_120Hz_upper_bound: kfCount,
  note: "the leading edge is the dock row; the trailing edge follows it at a gap of S*w*tanh(D*(pLead-pSlow)/(S*w)); both land together, no overshoot past the dock row's own",
};

// ── 3. The lift ──
const L = 1.08;
const sizes = [
  { host: "SegmentedTabs pill, fine pointer (a tab 32 px tall, 80 px wide)", w: 80, h: 32 },
  { host: "SegmentedTabs pill, coarse pointer (44 px floor)", w: 96, h: 44 },
  { host: "dock run seat (44 px circle)", w: 44, h: 44 },
  { host: "a long worded tab (Home Assistant's dock words, 120 px)", w: 120, h: 44 },
];
const lift = { L, apple_sim_pct: 16, apple_device_rest_ratio: 1.14, p0a_hover_edge_px: 4,
  rows: sizes.map((s) => ({ ...s, edge_x_px: r3(((L - 1) * s.w) / 2), edge_y_px: r3(((L - 1) * s.h) / 2), within_4px: ((L - 1) * Math.max(s.w, s.h)) / 2 <= 4 })) };

// ── 4. Clocks in frames ──
const frames = (ms) => ({ ms, at60: r3(ms / 16.667), at30: r3(ms / 33.333), under_five_at30: ms / 33.333 < 5 });
const clocks = {
  keyboard_A_same_as_tap: frames(210),
  keyboard_B_press_row: frames(120),
  keyboard_C_fade_across: frames(200),
  reduced_motion_dip: { out: frames(100), in: frames(100), total: frames(200) },
  label_exchange_fast: frames(150),
};

// ── 5. State fills over the R3b letters ──
const hsl = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  return [0, 8, 4].map((n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))); };
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const oklabToSrgb = ([L, a, b]) => { const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((v) => Math.max(0, Math.min(1, toGam(v)))); };
const oklchLab = (L, C, h) => [L, C * Math.cos((h * Math.PI) / 180), C * Math.sin((h * Math.PI) / 180)];
const lum = ([r, g, b]) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (C, A, B) => [0, 1, 2].map((i) => A * C[i] + (1 - A) * B[i]);
// color-mix(in oklab, A p, B 1-p) with alpha, premultiplied (CSS Color 5 §2.4)
const mixOklab = (A, aA, B, aB, p) => { const a = p * aA + (1 - p) * aB; const lab = [0, 1, 2].map((i) => (p * aA * A[i] + (1 - p) * aB * B[i]) / a); return { rgb: oklabToSrgb(lab), alpha: a }; };

const MODES = {
  light: { fg: hsl(24, 10, 10), muted: hsl(30, 26, 35), card: hsl(30, 85, 96), page: hsl(40, 30, 98), worst: [0, 0, 0],
    ink: oklchLab(0.28, 0.035, 70), warm: oklchLab(0.88, 0.1, 75), veilResting: 0.14, veilQuiet: 0.10, veilFloating: 0.18,
    bounds: { A: 0.897, B: 0.545, C: 0.437 } },
  dark: { fg: hsl(30, 14, 90), muted: hsl(34, 16, 72), card: hsl(26, 22, 17), page: hsl(24, 9, 4), worst: [1, 1, 1],
    ink: oklchLab(0.17, 0.03, 70), warm: oklchLab(0.42, 0.06, 75), veilResting: 0.18, veilQuiet: 0.14, veilFloating: 0.22,
    bounds: { A: 0.872, B: 0.739, C: 0.616 } },
};
// Each fill as { rgb, alpha } painted over whatever is under it. Sources: tokens/glass.css (the veil rungs),
// tokens/glass-fx.css:114-115 and dark-arm.css:405 (the capsule warm and its 16 % floor), glass-capsule.css (the
// capsule's fill), sizing.css:221 and dark-arm.css:301 (the dock's active seat), menu.css:10 (a row's quiet fill),
// color-radius.css:156-157 (--fill-hover 0.05, --fill-selected 0.12, of the foreground).
const fills = (M, mode) => {
  const inkRgb = oklabToSrgb(M.ink);
  const capsule = mixOklab(M.ink, M.veilResting, M.warm, 1, 0.84);
  return {
    "track (the strip's quiet well)": { rgb: inkRgb, alpha: M.veilQuiet, on: "plate" },
    "mark, today (.glass-capsule fill)": { ...capsule, on: "track" },
    "mark, --fill-selected (foreground 0.12)": { rgb: M.fg, alpha: 0.12, on: "track" },
    "mark, --fill-selected, no track": { rgb: M.fg, alpha: 0.12, on: "plate" },
    "dock seat, current (--dock-control-active-bg)": mode === "light" ? { rgb: inkRgb, alpha: M.veilFloating, on: "plate" } : { rgb: M.fg, alpha: 0.14, on: "plate" },
    "menu row, highlighted (quiet fill)": { rgb: inkRgb, alpha: M.veilQuiet, on: "plate" },
    "hover (--fill-hover, foreground 0.05)": { rgb: M.fg, alpha: 0.05, on: "plate" },
  };
};
const grounds = { worst: null, page: null, grey: [0.5, 0.5, 0.5] };
const fillTable = {};
for (const [mode, M] of Object.entries(MODES)) {
  fillTable[mode] = {};
  for (const [letter, a] of Object.entries(M.bounds)) {
    fillTable[mode][letter] = {};
    for (const [g, gc] of Object.entries(grounds)) {
      const ground = g === "worst" ? M.worst : g === "page" ? M.page : gc;
      const plate = over(M.card, a, ground);
      const F = fills(M, mode);
      const track = over(F["track (the strip's quiet well)"].rgb, F["track (the strip's quiet well)"].alpha, plate);
      const row = {};
      for (const [name, f] of Object.entries(F)) {
        const under = f.on === "track" ? track : plate;
        const painted = over(f.rgb, f.alpha, under);
        row[name] = {
          vs_what_it_sits_on: r3(contrast(painted, under)),
          vs_plate: r3(contrast(painted, plate)),
          word_on_it: r3(contrast(M.fg, painted)),
          muted_word_on_it: r3(contrast(M.muted, painted)),
        };
      }
      fillTable[mode][letter][g] = row;
    }
  }
}
// The least foreground alpha a selection fill needs to stand 3:1 off the plate it sits on, per letter and mode, on
// the page ground and on the worst ground (the fill is then the selection's only sign, as under one label ink).
const least3 = {};
for (const [mode, M] of Object.entries(MODES)) {
  least3[mode] = {};
  for (const [letter, a] of Object.entries(M.bounds)) {
    least3[mode][letter] = {};
    for (const g of ["page", "worst"]) {
      const plate = over(M.card, a, g === "page" ? M.page : M.worst);
      let found = null; for (let x = 0.01; x <= 1.0001; x += 0.01) { const p = over(M.fg, x, plate); if (contrast(p, plate) >= 3) { found = r3(x); break; } }
      const p = found ? over(M.fg, found, plate) : null;
      least3[mode][letter][g] = { fg_alpha: found, word_on_it: p ? r3(contrast(M.fg, p)) : null };
    }
  }
}

// The chrome bound re-solved so the selected word holds D3's 4.8 ON the mark (--fill-selected, the foreground at 0.12,
// over the strip's quiet well) rather than on the bare plate, over the worst flat ground: the alpha letter B would need
// if the mark's word is to read as R3b's B promises. The same for the dock's current seat.
const boundOn = (mode, fill) => {
  const M = MODES[mode]; let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) {
    const a = (lo + hi) / 2, plate = over(M.card, a, M.worst);
    const F = fills(M, mode)[fill], track = over(fills(M, mode)["track (the strip's quiet well)"].rgb, fills(M, mode)["track (the strip's quiet well)"].alpha, plate);
    const painted = over(F.rgb, F.alpha, F.on === "track" ? track : plate);
    if (contrast(M.fg, painted) >= 4.8) hi = a; else lo = a;
  }
  return Math.ceil(hi * 1000) / 1000;
};
const boundOnMark = {};
for (const mode of ["light", "dark"]) boundOnMark[mode] = {
  B_bare_plate: MODES[mode].bounds.B,
  word_on_mark_fill_selected_over_track: boundOn(mode, "mark, --fill-selected (foreground 0.12)"),
  word_on_mark_fill_selected_no_track: boundOn(mode, "mark, --fill-selected, no track"),
  word_on_mark_today: boundOn(mode, "mark, today (.glass-capsule fill)"),
  word_on_dock_current_seat: boundOn(mode, "dock seat, current (--dock-control-active-bg)"),
  word_on_hover: boundOn(mode, "hover (--fill-hover, foreground 0.05)"),
};

const out = { at: new Date().toISOString(), travel, stretch, lift, clocks,
  fills: { model: "chrome plate = --card at the R3b letter's alpha over the ground (D3's law, no blur, O-260); fills composited in gamma sRGB; WCAG 2 contrast; glass-ui master's default colours", table: fillTable, least_fg_alpha_for_3_to_1: least3, bound_solved_on_the_fill: boundOnMark } };
writeFileSync(path.join(HERE, "mark.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ travel, stretch, lift: lift.rows.map((r) => [r.host.slice(0, 28), r.edge_x_px, r.edge_y_px, r.within_4px]), clocks }, null, 0));
for (const mode of ["light", "dark"]) for (const letter of ["A", "B", "C"]) {
  console.log(`\n${mode} ${letter}`);
  for (const g of ["page", "worst"]) {
    const row = fillTable[mode][letter][g];
    console.log(`  ${g}: ` + Object.entries(row).map(([k, v]) => `${k.split(" (")[0].slice(0, 22)}=${v.vs_what_it_sits_on}/${v.word_on_it}`).join(" | "));
  }
}
console.log("\nleast fg alpha for 3:1", JSON.stringify(least3));
console.log("bound solved on the fill", JSON.stringify(boundOnMark));
