// BM pass 3, fold of pass 2 (A2, B-1, B-2, A12): checks the amended playSpring sketch without a browser.
// A stub element records the keyframes; the check interpolates them linearly (easing "linear") against the
// closed-form spring, for every row, for `translate` (px), `scale` and `opacity`, from rest and with speed;
// compares each clock with the row's token clock; and exercises a retarget on a page whose frames come late.
// Run from the glass-ui checkout: ~/.claude/guard/guarded --light -- node docs/tranches/BM/study/pass-3/fold/sketch-check.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../../..");
const presets = readFileSync(path.join(ROOT, "src/composables/motion/spring/springPresets.ts"), "utf8");
const tokens = readFileSync(path.join(ROOT, "src/styles/tokens/scheme-spring.css"), "utf8");
const ROWS = [...presets.matchAll(/name: "(\w+)",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+),\s*settleBand: ([\d.]+)/g)]
  .map(([, name, r, z, b]) => ({ name, response: +r, dampingFraction: +z, settleBand: +b }));
const tokenClock = (name) => parseFloat(tokens.match(new RegExp(`--spring-${name}-settle: ([\\d.]+)s`))[1]);

// A timeline whose time the check moves by hand, and an Animation stub with the spec's clock semantics.
const timeline = { currentTime: 0 };
globalThis.document = { timeline };
globalThis.matchMedia = () => ({ matches: false });
const made = [];
const stubAnimate = (frames, opts) => {
  const a = { frames, opts, startTime: null, cancelled: false, committed: false,
    get currentTime() { return this.startTime === null ? 0 : timeline.currentTime - this.startTime; },
    cancel() { this.cancelled = true; }, commitStyles() { this.committed = true; },
    finished: new Promise(() => {}) };
  made.push(a);
  return a;
};
const { playSpring, springState } = await import("./sketch/playSpring.ts");

const play = (row, prop, from, to, v0) => {
  const el = { animate: stubAnimate };
  const fmt = prop === "translate" ? (x) => `${x}px 0` : (x) => `${x}`;
  const h = playSpring(el, prop, fmt, row, from, to, v0);
  return { h, a: made[made.length - 1] };
};
const valueAt = (a, ms) => {
  const T = a.opts.duration, u = Math.min(1, ms / T), ks = a.frames.map((f) => ({ u: f.offset, x: parseFloat(Object.values(f)[1]) }));
  let k = 1; while (k < ks.length - 1 && ks[k].u < u) k++;
  const p = ks[k - 1], q = ks[k];
  return p.x + ((q.x - p.x) * (u - p.u)) / ((q.u - p.u) || 1);
};

const cases = [
  ["translate", 0, 100, 0], ["translate", 0, 100, 600], ["translate", 0, 100, -600], ["translate", 0, 300, 2400], ["translate", 0, 300, 0],
  ["scale", 0.96, 1, 0], ["opacity", 0, 1, 0],
];
const out = { at: new Date().toISOString(), rows: {}, retarget: {} };
for (const row of ROWS) for (const [prop, from, to, v0] of cases) {
  const { a } = play(row, prop, from, to, v0);
  const T = a.opts.duration, travel = Math.abs(to - from);
  let err = 0;
  for (let i = 0; i < 2000; i++) { const ms = (i / 2000) * T; err = Math.max(err, Math.abs(valueAt(a, ms) - springState(row, from, v0, to, ms / 1000)[0])); }
  const endJump = Math.abs(to - springState(row, from, v0, to, T / 1000)[0]);
  out.rows[`${row.name} ${prop} ${from}→${to} v0=${v0}`] = {
    clock_ms: Math.round(T), token_clock_ms: Math.round(tokenClock(row.name) * 1000), keyframes: a.frames.length,
    max_err_pct_of_travel: +((err / travel) * 100).toFixed(2), end_step_pct_of_travel: +((endJump / travel) * 100).toFixed(2),
  };
}

// The retarget on a late page (B-2): the mark leaves 0 for 100 px on the dock row; frames come every 16.7 ms
// except one busy gap; a second tap at the frame after the gap sends it to 50 px. The body must start the new
// settle where it was drawn on that frame, with the speed it had there.
const dock = ROWS.find((r) => r.name === "dock");
for (const busyMs of [0, 16.7, 45]) {
  made.length = 0; timeline.currentTime = 1000;
  const { h, a } = play(dock, "translate", 0, 100, 0);
  timeline.currentTime = 1000 + 3 * 16.7 + busyMs; // the frame the second tap lands on
  const drawnBefore = valueAt(a, a.currentTime), [xTrue, vTrue] = springState(dock, 0, 0, 100, a.currentTime / 1000);
  const h2 = h.retarget(50), b = made[made.length - 1];
  const drawnAfter = valueAt(b, 0);
  // The new settle leaves from (x, v): its own first 8 ms, as keyframes, against the spring from that state.
  const x0 = drawnAfter, ms8 = 8, kf8 = valueAt(b, ms8), sp8 = springState(dock, xTrue, vTrue, 50, ms8 / 1000)[0];
  const transition8 = x0 + (50 - x0) * 0; // a transition restarts from rest: it has not moved after 8 ms (the kink)
  out.retarget[`busy gap ${busyMs} ms`] = {
    first_cancelled: a.cancelled, new_start_is_frame_time: b.startTime === timeline.currentTime,
    jump_px: +Math.abs(drawnAfter - drawnBefore).toFixed(2), drawn_vs_spring_px: +Math.abs(drawnBefore - xTrue).toFixed(2),
    speed_at_retarget_px_s: Math.round(vTrue),
    first_8ms_travel_px_keyframes: +(kf8 - x0).toFixed(2), first_8ms_travel_px_spring: +(sp8 - x0).toFixed(2), first_8ms_travel_px_transition: +(transition8 - x0).toFixed(2),
  };
  h2.stop();
  out.retarget[`busy gap ${busyMs} ms`].stop_commits_then_cancels = b.committed && b.cancelled;
}

const worst = (pred) => Object.entries(out.rows).filter(([k]) => pred(k)).reduce((m, [, v]) => Math.max(m, v.max_err_pct_of_travel), 0);
out.summary = {
  from_rest_clock_equals_token: Object.entries(out.rows).filter(([k]) => k.endsWith("v0=0")).every(([, v]) => Math.abs(v.clock_ms - v.token_clock_ms) <= 10),
  worst_err_pct_translate: worst((k) => k.includes("translate")), worst_err_pct_scale: worst((k) => k.includes("scale")), worst_err_pct_opacity: worst((k) => k.includes("opacity")),
};
writeFileSync(path.join(HERE, "sketch-check.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.summary, null, 1));
console.log(JSON.stringify(out.retarget, null, 1));
