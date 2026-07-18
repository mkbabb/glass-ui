// F3 CHANNEL-CONDUCTOR — node logic check for the prototype's conductor.
// verified-model: claude-fable-5 (system-context model ID, verbatim). F3 prototype seat, pass 1.
// Extracts the conductor block from index.html (the exact shipped code — zero drift) and runs
// the MARKS battery on a virtual clock. Run: node check.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf8");
const m = html.match(/\/\*F3-CONDUCTOR-BEGIN\*\/([\s\S]*?)\/\*F3-CONDUCTOR-END\*\//);
if (!m) { console.error("conductor block not found"); process.exit(1); }
const makeConductor = new Function(`${m[1]}; return makeConductor;`)();

const MANIFEST = {
  channels: {
    medium:    { law: "cliff",  tau: 0.03, sat: 0.12, close: { hold: 0.25, tau: 0.17 } },
    geometry:  { law: "spring", response: 0.6, zeta: 1.0 },
    content:   { law: "follow", tau: 0.07, close: { tau: 0.055 } },
    periphery: { law: "follow", tau: 0.07, delay: 0.10, source: "content" },
  },
};

function clock(hz) {
  let t = 0, id = 0;
  const q = new Map();
  return {
    now: () => t * 1000,
    raf: (fn) => { q.set(++id, fn); return id; },
    caf: (i) => q.delete(i),
    step() { t += 1 / hz; const fns = [...q.values()]; q.clear(); for (const f of fns) f(t * 1000); },
    pending: () => q.size,
    t: () => t,
  };
}

function build(hz, tempo = 1) {
  const clk = clock(hz);
  const samples = [];
  const cond = makeConductor({
    el: null, channels: MANIFEST.channels, tempo,
    prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  cond.onFrame((t) => samples.push({
    t, m: cond.get("medium"), g: cond.get("geometry"),
    c: cond.get("content"), p: cond.get("periphery"),
  }));
  return { clk, cond, samples };
}

function runUntilParked(clk, cond, maxS = 6) {
  const n = Math.ceil(maxS * 1000);
  for (let i = 0; i < n; i++) { clk.step(); if (cond.isParked()) break; }
  return cond.isParked();
}
function crossing(S, key, thr, rising) {
  for (let i = 1; i < S.length; i++) {
    const a = S[i - 1][key], b = S[i][key];
    if (rising ? a < thr && b >= thr : a > thr && b <= thr) {
      const f = (thr - a) / (b - a || 1e-9);
      return S[i - 1].t + f * (S[i].t - S[i - 1].t);
    }
  }
  return NaN;
}
const rel = (S, t0) => S.map((s) => ({ ...s, t: s.t - t0 }));

const rows = [];
let fails = 0;
function row(name, val, band, pass) {
  rows.push([name, val, band, pass ? "PASS" : "FAIL"]);
  if (!pass) fails++;
}
const ms = (s) => isNaN(s) ? "NaN" : `${(s * 1000).toFixed(0)}ms`;

// ---- 120 Hz battery (the probe's resolution) ----
{
  const { clk, cond, samples } = build(120);
  cond.seat(0);

  // OPEN
  samples.length = 0;
  let t0 = clk.t();
  cond.release(1, 0);
  runUntilParked(clk, cond);
  let S = rel(samples, t0);
  const om = crossing(S, "m", 0.90, true);
  const of = crossing(S, "c", 0.90, true);
  const og = crossing(S, "g", 0.99, true);
  const op = crossing(S, "p", 0.90, true);
  const settle = S.at(-1).t;
  row("open: medium t90", ms(om), "<=100ms", om <= 0.100);
  row("open: fade t90", ms(of), "130-270ms", of >= 0.130 && of <= 0.270);
  row("open: geometry t99", ms(og), "560-700ms", og >= 0.560 && og <= 0.700);
  row("open: fade/stretch", (of / og).toFixed(3), "0.20-0.31", of / og >= 0.20 && of / og <= 0.31);
  row("open: periphery lag", ms(op - of), "60-180ms", op - of >= 0.060 && op - of <= 0.180);
  row("park after open", `${ms(settle)}, pending rAF=${clk.pending()}`, "parked, 0 rAF", cond.isParked() && clk.pending() === 0);

  // CLOSE
  samples.length = 0;
  t0 = clk.t();
  cond.release(0, 0);
  runUntilParked(clk, cond);
  S = rel(samples, t0);
  const cc = crossing(S, "c", 0.05, false);
  const mr = crossing(S, "m", 0.90, false);
  const cm = crossing(S, "m", 0.10, false);
  row("close: content out", ms(cc), "110-210ms", cc >= 0.110 && cc <= 0.210);
  row("close: empty-medium beat", ms(mr - cc), "80-220ms", mr - cc >= 0.080 && mr - cc <= 0.220);
  row("close: medium out", ms(cm), "560-720ms", cm >= 0.560 && cm <= 0.720);

  // INTERRUPT: from open — flick-dismiss, catch at +120ms, hold, re-open
  cond.release(1, 0);
  runUntilParked(clk, cond);
  samples.length = 0;
  cond.release(0, 0);
  for (let i = 0; i < Math.round(0.120 * 120); i++) clk.step();
  const gCatch = cond.get("geometry");
  cond.scrub(gCatch);
  for (let i = 0; i < Math.round(0.160 * 120); i++) clk.step();
  cond.release(1, 0.8);
  runUntilParked(clk, cond);
  let mediumMin = Infinity, maxStep = 0, nan = false;
  for (let i = 0; i < samples.length; i++) {
    mediumMin = Math.min(mediumMin, samples[i].m);
    for (const k of ["m", "g", "c", "p"]) {
      if (Number.isNaN(samples[i][k])) nan = true;
      if (i > 0) maxStep = Math.max(maxStep, Math.abs(samples[i][k] - samples[i - 1][k]));
    }
  }
  const bound120 = 1 - Math.exp(-(1 / 120) / 0.055);
  row("interrupt: medium min", mediumMin.toFixed(4), "1.000 held", mediumMin >= 0.9995 && !nan);
  row("interrupt: max step", `${maxStep.toFixed(3)} (bound ${bound120.toFixed(3)})`, "law-bounded", maxStep <= bound120 * 1.15 && !nan);
  row("interrupt: re-settled + parked", cond.isParked() ? "yes" : "no", "parked", cond.isParked());
}

// ---- tempo x1.3: ratio invariance ----
{
  const { clk, cond, samples } = build(120, 1.3);
  cond.seat(0);
  samples.length = 0;
  const t0 = clk.t();
  cond.release(1, 0);
  runUntilParked(clk, cond);
  const S = rel(samples, t0);
  const of = crossing(S, "c", 0.90, true);
  const og = crossing(S, "g", 0.99, true);
  row("tempo x1.3: fade/stretch", (of / og).toFixed(3), "0.20-0.31", of / og >= 0.20 && of / og <= 0.31);
}

// ---- 60 Hz continuity report (the max-step bound is dt-dependent) ----
{
  const { clk, cond, samples } = build(60);
  cond.seat(0);
  cond.release(1, 0); runUntilParked(clk, cond);
  samples.length = 0;
  cond.release(0, 0);
  for (let i = 0; i < Math.round(0.120 * 60); i++) clk.step();
  cond.scrub(cond.get("geometry"));
  for (let i = 0; i < Math.round(0.160 * 60); i++) clk.step();
  cond.release(1, 0.8);
  runUntilParked(clk, cond);
  let maxStep = 0, mediumMin = Infinity;
  for (let i = 1; i < samples.length; i++) {
    mediumMin = Math.min(mediumMin, samples[i].m);
    for (const k of ["m", "g", "c", "p"]) maxStep = Math.max(maxStep, Math.abs(samples[i][k] - samples[i - 1][k]));
  }
  const bound60 = 1 - Math.exp(-(1 / 60) / 0.055);
  row("60Hz interrupt: medium min", mediumMin.toFixed(4), "1.000 held", mediumMin >= 0.9995);
  row("60Hz interrupt: max step", `${maxStep.toFixed(3)} (bound ${bound60.toFixed(3)})`, "law-bounded", maxStep <= bound60 * 1.15);
}

// ---- PRM: drives seat instantly, zero frames ----
{
  const clk = clock(120);
  const cond = makeConductor({
    el: null, channels: MANIFEST.channels, tempo: 1,
    prm: () => true, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  let frames = 0;
  cond.onFrame(() => frames++);
  cond.release(1, 0);
  clk.step(); clk.step();
  row("PRM: release seats", `x=${cond.get("geometry")}, frames=${frames}, pending rAF=${clk.pending()}`,
    "x=1, 0 frames, 0 rAF", cond.get("geometry") === 1 && frames === 0 && clk.pending() === 0 && cond.isParked());
}

const w = [34, 30, 16, 6];
console.log(rows.map((r) => r.map((c, i) => String(c).padEnd(w[i])).join("")).join("\n"));
console.log(`\n${rows.length - fails}/${rows.length} PASS${fails ? ` — ${fails} FAIL` : ""}`);
process.exit(fails ? 1 : 0);
