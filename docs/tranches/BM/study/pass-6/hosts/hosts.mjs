// BM pass 6 (the mark in every host): the arithmetic DESIGN §8 cites, computed without a browser.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-6/hosts/hosts.mjs
//
// 1. heldGrow   W-R.1's held grow (x1.06 on the block axis) on each slider track height, edge travel in px, against
//               the legible floor control-bit.css derives for a 20 px face (0.8 px, `control-bit.css:286-290`).
// 2. steps      a stepped slider's jump per step (today a cut: reka writes the range's and the thumb's offsets as
//               percentages, with no transition) on a 300 px and a 343 px track (a phone's row less its gutters).
// 3. tween      the same step played as rule 1 on the dock row's single curve, in frames at 60 and 30 Hz.
// 4. worm       PagerDots' elongation band, clamp(pitch, |span| * 0.55, 3 * pitch), on its 28 px pitch.
// 5. switch     the thumb's 20 px travel on the dock row, and the reduced-motion dip.
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const r3 = (x) => Math.round(x * 1000) / 1000;
const frames = (ms) => ({ ms, at60: r3(ms / 16.667), at30: r3(ms / 33.333) });
const heldGrow = [12, 20, 28].map((h) => ({ track_px: h, each_edge_px: r3((0.06 * h) / 2), under_legible_floor_0_8px: (0.06 * h) / 2 < 0.8 }));
const steps = [];
for (const track of [300, 343]) for (const n of [5, 10, 20]) {
  const d = track === 300 ? 20 : 20; // the thumb diameter (md track height), the lane is track less one diameter
  steps.push({ track_px: track, positions: n, jump_px: r3((track - d) / (n - 1)) });
}
const tween = { row: "dock", clock_ms: 214, ...frames(214) };
const worm = [1, 2, 3, 5, 11].map((k) => { const span = 28 * k; const want = span * 0.55; return { hop_cells: k, span_px: span, elongation_ceiling_px: r3(Math.min(3 * 28, Math.max(28, want))) }; });
const sw = { travel_px: 20, dock_clock: frames(214), reduced_dip: frames(200) };
const out = { at: new Date().toISOString(), heldGrow, steps, tween, worm, switch: sw };
writeFileSync(path.join(HERE, "hosts.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 0));
