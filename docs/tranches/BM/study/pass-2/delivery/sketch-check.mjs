// BM pass 2: checks the playSpring sketch without a browser. A stub element records the keyframes it is
// handed; the check interpolates them linearly (as the browser does with easing "linear") and compares
// with the closed-form spring, in pixels, for the table's rows and a range of release velocities.
// Run: guarded --light -- node docs/tranches/BM/study/pass-2/delivery/sketch-check.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
globalThis.document = { timeline: { currentTime: 0 } };
const { playSpring } = await import("./sketch/playSpring.ts");
const rows = { press: [0.2, 0.8], present: [0.22, 1], dock: [0.3, 0.88], panel: [0.4, 0.71], bloom: [0.42, 0.9], world: [0.48, 1] };
const closed = (r, z, x0, v0, to, t) => {
  const w0 = 2 * Math.PI / r, d = x0 - to;
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t), b = (v0 + z * w0 * d) / wd; return to + e * (d * Math.cos(wd * t) + b * Math.sin(wd * t)); }
  const e = Math.exp(-w0 * t), b = v0 + w0 * d; return to + e * (d + b * t);
};
const out = {};
for (const [name, [r, z]] of Object.entries(rows)) for (const [travel, v0] of [[100, 0], [100, 600], [100, -600], [300, 2400], [300, 0]]) {
  let frames, opts;
  const el = { animate: (f, o) => { frames = f; opts = o; return { startTime: 0, cancel() {} }; } };
  playSpring(el, "translate", (x) => `${x}px 0`, { response: r, dampingFraction: z }, 0, travel, v0);
  const T = opts.duration / 1000, ks = frames.map((f) => ({ u: f.offset, x: parseFloat(f.translate) }));
  let err = 0;
  for (let i = 0; i <= 2000; i++) {
    const u = i / 2000; let k = 1; while (k < ks.length - 1 && ks[k].u < u) k++;
    const a = ks[k - 1], b = ks[k], x = a.x + ((b.x - a.x) * (u - a.u)) / ((b.u - a.u) || 1);
    err = Math.max(err, Math.abs(x - (i === 2000 ? travel : closed(r, z, 0, v0, travel, u * T))));
  }
  out[`${name} ${travel}px v0=${v0}px/s`] = { duration_ms: Math.round(opts.duration), keyframes: ks.length, max_err_px: +err.toFixed(2) };
}
writeFileSync(path.join(HERE, "sketch-check.json"), JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k.padEnd(30), JSON.stringify(v));
