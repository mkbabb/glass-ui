// BM pass 8, the fold of pass 7's critiques: the figures the rulings and the corrected P7-fuse rest on.
// Geometry and arithmetic in Node, not a device reading. The springs, the geometry (gap = 60p - 52) and the rows are
// P7-fuse's own (pages/P7-fuse.html, `spring`, `geo`), copied.
// Run: ~/.claude/guard/guarded --light --timeout 2 -- node docs/tranches/BM/study/pass-8/fold/fold.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROWS = { press: { r: 0.2, z: 0.8 }, dock: { r: 0.3, z: 0.88 } };
const spring = (row, d0, t) => {
  const w = (2 * Math.PI) / row.r, a = row.z * w, wd = w * Math.sqrt(1 - row.z * row.z), B = (a * d0) / wd;
  return Math.exp(-a * t) * (d0 * Math.cos(wd * t) + B * Math.sin(wd * t));
};
const pAt = (row, dir, t) => (dir === "open" ? 1 + spring(row, -1, t) : spring(row, 1, t));
const firstT = (row, dir, pred) => { for (let t = 0; t < 1.5; t += 1 / 4000) if (pred(pAt(row, dir, t))) return +(t * 1000).toFixed(1); return null; };
const out = { method: "pass-8/fold/fold.mjs; P7-fuse's springs and geometry, in Node" };

// 1. A's overlap (B7-4): the seat overlaps the plate while its left edge is short of the plate's end, gap < 0, p < 52/60.
const PC = 52 / 60;
out.overlap = {};
for (const [name, row] of Object.entries(ROWS)) {
  const openEnd = firstT(row, "open", (p) => p >= PC);
  const foldStart = firstT(row, "fold", (p) => p < PC);
  out.overlap[name] = { contact_p: +PC.toFixed(4), seat_travel_overlapping_px: +(244 * PC).toFixed(1), open_overlap_ms: openEnd, open_overlap_frames60: +((openEnd / 1000) * 60).toFixed(1), fold_overlap_from_ms: foldStart };
}
// 2. A′ (R4's C rule on 12.0.0's material): the seat's opacity k = clamp(gap / 8) rises over the last 8 px of the gap.
//    Open: from contact to rest. Fold: from rest to contact, which is where the fade is shortest.
out.aPrime = {};
for (const [name, row] of Object.entries(ROWS)) {
  const openFrom = firstT(row, "open", (p) => p >= PC), openTo = firstT(row, "open", (p) => p >= 0.999);
  const foldTo = firstT(row, "fold", (p) => p < PC);
  out.aPrime[name] = { open_fade_ms: [openFrom, openTo], fold_fade_ms: [0, foldTo], fold_fade_frames60: +((foldTo / 1000) * 60).toFixed(2) };
}
// 3. The trade at the disc by P0a rule 4 (A7-5): the leaving glyph falls 1 -> 0 over L ms on a symmetric ease; the
//    arriving glyph starts when the leaving is at half and rises 0 -> 1 over M ms on the same ease. Check: while the
//    leaving is above 0 the arriving is at most 0.5, and the reverse; each leg >= 83 ms (law 7's floor).
const bez = (x1, y1, x2, y2) => (x) => { let lo = 0, hi = 1; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2, bx = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3; if (bx < x) lo = m; else hi = m; } const m = (lo + hi) / 2; return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3; };
const ease = bez(0.4, 0, 0.6, 1);
const trade = (L, M) => {
  const start = L / 2; // the leaving is at half at L/2 on a symmetric ease
  let worst = 0, step = 0;
  for (let t = 0; t <= start + M; t += 0.25) {
    const out = t < L ? 1 - ease(t / L) : 0, inn = t < start ? 0 : t > start + M ? 1 : ease((t - start) / M);
    if (out > 0 && inn > 0) worst = Math.max(worst, Math.min(out, inn) > 0.5 ? 1 : Math.max(out > 0 ? inn : 0, inn > 0 ? out : 0) > 0.5 && out > 0 && inn > 0 ? Math.min(out, inn) : 0);
  }
  // the largest share either leg lands in one 60 Hz frame
  for (const [D] of [[L], [M]]) for (let t = 0; t + 16.7 <= D; t += 0.5) step = Math.max(step, Math.abs(ease((t + 16.7) / D) - ease(t / D)));
  // rule-4 check: at every instant both show, neither is above half
  let breach = 0;
  for (let t = 0; t <= start + M; t += 0.25) {
    const o = t < L ? 1 - ease(t / L) : 0, i = t < start ? 0 : t > start + M ? 1 : ease((t - start) / M);
    if (o > 0.001 && i > 0.001 && (o > 0.5 + 1e-9 && i > 0.001) && i > 1e-3 && o > 0.5) breach = Math.max(breach, o);
    if (o > 0.001 && i > 0.5 + 1e-9) breach = Math.max(breach, i);
  }
  return { leaving_ms: L, arriving_ms: M, arriving_starts_ms: start, total_ms: start + M, rule4_breach: +breach.toFixed(3), max_share_per_frame: +step.toFixed(3) };
};
out.trade = { curve: "cubic-bezier(0.4, 0, 0.6, 1) on both legs", pass7: "two linear 100 ms legs started together", proposed: trade(90, 120), shorter: trade(84, 100) };
// 4. The goo's layer (B7-2, B7-8): spanning both plates, dock 236 x 52 and a 52 px seat 8 px past its end, with a
//    region margin of 3 sigma (12 px) on every side for the blur; device px at DPR 3.
const W = 236 + 8 + 52, H = 52, M3 = 12;
out.gooLayer = { css_px: [W + 2 * M3, H + 2 * M3], device_px_dpr3: (W + 2 * M3) * (H + 2 * M3) * 9, pass7_model_device_px: 218880, pass7_page_device_px: 940896 };
// 5. The controls' window grown by a focus ring's reach (A7-6): a 3 px ring at a 2 px offset reaches 5 px past a seat.
out.controlsWindow = { ring_reach_px: 5, window_px: [236 + 10, 52 + 10], radius_px: 26 + 5 };
// 6. The weight clock beside letter C (A7-13): P0a "0.2 s for 40 px and up to 0.45 s for 320 px", read linearly at 184 px.
out.weightClock = { travel_px: 184, p0a_s: +(0.2 + ((184 - 40) / (320 - 40)) * 0.25).toFixed(3), dock_row_to_half_px_ms: 339, press_row_to_half_px_ms: 248 };
// 7. --seat-from (A7-11, B7-7): the open width plus the gap, plus the seat's width less the disc's.
out.seatFrom = { as_written_px: 236 - 52 + 8 + (52 - 52), corrected_px: 236 + 8 + (52 - 52) };
writeFileSync(path.join(HERE, "fold.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
