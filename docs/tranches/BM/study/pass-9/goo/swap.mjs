// BM pass 9: where the goo's filter can turn on and off so its rest erosion (fuse.json `rest`, sigma 4:
// ends 0.25 px, worst 0.5 px) lands inside a frame that already moves the seat, never at a still frame.
// Geometry as pass 7 §9.2: a 236 x 52 dock folding to a 52 px disc (window travel 184 px), the seat 52 px,
// resting 8 px past the plate's end; at fold progress p the gap is 60p - 52 px and the seat has travelled 244p px.
// Rows from SPRING_PRESETS (springPresets.ts): response, damping. Closed-form spring from rest, 60 Hz and 30 Hz frames.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node swap.mjs   (writes swap.json; arithmetic, not a reading)
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const rows = { dock: [0.30, 0.88], present: [0.22, 1.0], press: [0.20, 0.80] };
function x(t, resp, z) { // unit step response, 0 -> 1
  const w = (2 * Math.PI) / resp;
  if (z < 1) { const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t)); }
  return 1 - Math.exp(-w * t) * (1 + w * t);
}
const SEAT = 244, GAP = (p) => 60 * p - 52;
const out = { method: "pass-9/goo/swap.mjs; closed-form springs, not a device reading", erosion_px: { sigma4_end: 0.25, sigma4_worst: 0.5 }, rows: {} };
for (const [name, [resp, z]] of Object.entries(rows)) {
  const r = {};
  for (const hz of [60, 30]) {
    const dt = 1 / hz; const res = {};
    // OPEN: p = x(t). The neck (sigma 4) pinches at gap 5 (p 0.95); the filter goes off at the first frame with gap >= 6.
    let prev = 0, t = 0; for (let k = 1; k < 200; k++) { t = k * dt; const p = x(t, resp, z); if (GAP(p) >= 6) { res.open_off = { frame: k, ms: Math.round(t * 1000), gap_px: +GAP(p).toFixed(2), seat_step_px: +((p - prev) * SEAT).toFixed(2) }; break; } prev = p; }
    // CLOSE: p = 1 - x(t). The filter goes on at the last frame with gap > 6, before the neck can form at 5.
    prev = 1; for (let k = 1; k < 200; k++) { t = k * dt; const p = 1 - x(t, resp, z); if (GAP(p) <= 6) { res.close_on = { frame: k, ms: Math.round(t * 1000), gap_px: +GAP(p).toFixed(2), seat_step_px: +((prev - p) * SEAT).toFixed(2), note: "the filter is on from the frame before this one" }; break; } prev = p; }
    // The first frame of a close from rest, for comparison: the step a swap at the start would hide in.
    res.close_first_frame_step_px = +((x(dt, resp, z)) * SEAT).toFixed(2);
    r["hz" + hz] = res;
  }
  out.rows[name] = r;
}
writeFileSync(path.join(HERE, "swap.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
