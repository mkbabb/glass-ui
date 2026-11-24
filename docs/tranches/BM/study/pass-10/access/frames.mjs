// BM pass 10 (DESIGN §10): every leg pass 10 designs or changes, and the legs it inherits that run under 200 ms, as
// frames at 60 Hz (Safari's default and Home Assistant's WKWebView, which is held to 60) and 30 Hz (Low Power Mode).
// For each leg: the frames it draws, and the largest share of its travel that lands in one frame. Law 7's measure (§1):
// no leg lands more than two fifths of its travel in 16.7 ms, none is shorter than 83 ms; at 30 Hz a leg under 167 ms
// shows fewer than five frames. Arithmetic on the curves, not a device reading; a leg on the page's thread can also
// lose frames to a busy page, which this does not model.
// Amended by the final fold: the slider's ground returns on its 200 ms clock (A10-6, B10-4); the toggle's reduced
// crossfade rides its 200 ms clock and its colour is a leg (A10-2, B10-4); the linear exit is withdrawn and the exit
// stays on --exit-curve, today's ease-out (A10-3, B10-5). Law 7's 30 fps line binds a page-thread leg; whether the
// compositor keeps 60 Hz in Low Power Mode is unread, so a compositor leg's 30 Hz column is the worst case, not a reading.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-10/access/frames.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const bez = (x1, y1, x2, y2) => (t) => { // cubic-bezier(x1,y1,x2,y2) at time fraction t
  let lo = 0, hi = 1, u = t;
  for (let i = 0; i < 60; i++) { u = (lo + hi) / 2; const x = 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u ** 2 * x2 + u ** 3; if (x < t) lo = u; else hi = u; }
  return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u ** 2 * y2 + u ** 3;
};
const C = { present: bez(0.197, 0, 0.124, 0.808), dock: bez(0.232, 0, 0.18, 0.703), press: bez(0.244, 0, 0.251, 0.672), standard: bez(0.4, 0, 0.2, 1), out: bez(0, 0, 0.2, 1), linear: (t) => t };
const LEGS = [
  ["slider: the ground grows (press, Tab)", 200, "present", "page thread (clip-path)"],
  ["slider: the ground grows by g/2 (hover, after a 120 ms dwell)", 200, "present", "page thread (clip-path)"],
  ["slider: the ground returns (press, Tab, hover)", 200, "present", "page thread (clip-path)"],
  ["slider: a knob grows (press, Tab)", 200, "present", "compositor (scale)"],
  ["slider: the readout enters, opacity", 200, "standard", "compositor"],
  ["slider: the readout enters, scale 0.9 → 1", 200, "present", "compositor"],
  ["slider: the readout leaves, opacity", 120, "standard", "compositor"],
  ["slider: the focus ring fades", 200, "standard", "page thread (outline-color)"],
  ["toggle: the rays draw in", 200, "present", "page thread (SVG child)"],
  ["toggle: the night slides", 200, "present", "page thread (SVG child)"],
  ["toggle: the colour, amber to indigo and back", 200, "standard", "page thread (color)"],
  ["toggle, Reduce Motion: the crossfade", 200, "standard", "page thread (SVG child)"],
  ["plate: hover fade", 120, "standard", "compositor"],
  ["plate: grows from 0.8", 200, "present", "compositor"],
  ["press: the shrink to 0.97 and back, each way", 120, "press", "compositor"],
  ["every exit: the fade (--exit-curve = --ease-out)", 120, "out", "compositor"],
  ["Reduce Motion: the dip, each half", 100, "standard", "compositor"],
  ["Reduce Motion: a length's tween", 150, "out", "compositor or page"],
];
const run = (ms, curve, hz) => {
  const dt = 1000 / hz, f = C[curve]; let prev = 0, max = 0, n = 0;
  for (let t = dt; t < ms + dt - 1e-9; t += dt) { const v = f(Math.min(1, t / ms)); max = Math.max(max, v - prev); prev = v; n++; }
  return { frames: n, maxStepShare: +max.toFixed(3) };
};
const rows = LEGS.map(([leg, ms, curve, thread]) => {
  const a = run(ms, curve, 60), b = run(ms, curve, 30);
  return { leg, ms, curve, thread, hz60: a, hz30: b,
    law7: { stepAt60UnderTwoFifths: a.maxStepShare <= 0.4, atLeast83ms: ms >= 83, fiveFramesAt30: b.frames >= 5 } };
});
const out = { method: "pass-10/access/frames.mjs; cubic-bezier evaluated at each frame boundary, the drawn step per frame", rows };
writeFileSync(path.join(HERE, "frames.json"), JSON.stringify(out, null, 1));
for (const r of rows) console.log(`${r.leg.padEnd(62)} ${String(r.ms).padStart(4)} ms  60 Hz ${String(r.hz60.frames).padStart(2)} fr, step ${r.hz60.maxStepShare}  30 Hz ${String(r.hz30.frames).padStart(2)} fr, step ${r.hz30.maxStepShare}`);
