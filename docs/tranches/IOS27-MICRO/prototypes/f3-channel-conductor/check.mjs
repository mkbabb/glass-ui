// F3 CHANNEL-CONDUCTOR — node logic check for the prototype's conductor.
// verified-model: claude-fable-5 (system-context model ID, verbatim). F3 prototype seat pass 1;
// cure seat F3 pass 2 (G6 latch row, G8 band unification, G4 sub-sat row, H3 lens-clock row,
// lead-trail expressibility row).
// Extracts the conductor block AND the BANDS block from index.html (the exact shipped code and
// the exact shipped gate bands — zero drift on either) and runs the battery on a virtual clock.
// Bands printed ARE bands gated, MARKS-derived (see the BANDS block for each derivation).
// Run: node check.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf8");
const m = html.match(/\/\*F3-CONDUCTOR-BEGIN\*\/([\s\S]*?)\/\*F3-CONDUCTOR-END\*\//);
if (!m) { console.error("conductor block not found"); process.exit(1); }
const makeConductor = new Function(`${m[1]}; return makeConductor;`)();
const bm = html.match(/\/\*F3-BANDS-BEGIN\*\/([\s\S]*?)\/\*F3-BANDS-END\*\//);
if (!bm) { console.error("BANDS block not found"); process.exit(1); }
const BANDS = new Function(`${bm[1]}; return BANDS;`)();

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
  cond.onFrame((t, dt) => samples.push({
    t, dt, m: cond.get("medium"), g: cond.get("geometry"),
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
function info(name, val, band) {
  rows.push([name, val, band, "info"]);
}
const ms = (s) => isNaN(s) ? "NaN" : `${(s * 1000).toFixed(0)}ms`;

let baseRatio = NaN; // the tempo row gates invariance against the 120Hz battery's ratio

// ---- 120 Hz battery (the probe's resolution; bands = the shipped BANDS block) ----
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
  baseRatio = of / og;
  row("open: medium t90", ms(om), BANDS.om.text, !isNaN(om) && om <= BANDS.om.hi);
  row("open: fade t90", ms(of), BANDS.of.text, of >= BANDS.of.lo && of <= BANDS.of.hi);
  row("open: geometry t99", ms(og), BANDS.og.text, og >= BANDS.og.lo && og <= BANDS.og.hi);
  info("open: fade/stretch (derived)", baseRatio.toFixed(3), `info — φ³ ref ${BANDS.ratioRef}; primaries gate it`);
  row("open: periphery lag", ms(op - of), BANDS.op.text, op - of >= BANDS.op.lo && op - of <= BANDS.op.hi);
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
  row("close: content out", ms(cc), BANDS.cc.text, cc >= BANDS.cc.lo && cc <= BANDS.cc.hi);
  row("close: empty-medium beat", ms(mr - cc), BANDS.cb.text, mr - cc >= BANDS.cb.lo && mr - cc <= BANDS.cb.hi);
  row("close: medium out", ms(cm), BANDS.cm.text, cm >= BANDS.cm.lo && cm <= BANDS.cm.hi);

  // INTERRUPT: from open — flick-dismiss, catch at +120ms (g≈0.64 ≥ sat: region asserted), re-open
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
  const bound120 = 1 - Math.exp(-(1 / 120) / BANDS.stepTau);
  row("interrupt: medium min", mediumMin.toFixed(4), "1.000 held (region g≥sat)", mediumMin >= BANDS.imMin && !nan);
  row("interrupt: max step", `${maxStep.toFixed(3)} (bound ${bound120.toFixed(3)}, τ${BANDS.stepTau})`, "law-bounded, region g≥sat", maxStep <= bound120 * BANDS.stepSlack && !nan);
  row("interrupt: re-settled + parked", cond.isParked() ? "yes" : "no", "parked", cond.isParked());

  // SUB-SAT INTERRUPT (G4/G8): catch BELOW sat — medium must hold g/sat; bound = manifest's fastest law
  cond.release(1, 0);
  runUntilParked(clk, cond);
  samples.length = 0;
  cond.release(0, 0);
  for (let i = 0; i < 240 && cond.get("geometry") > BANDS.subSatG; i++) clk.step();
  cond.scrub(BANDS.subSatG);
  for (let i = 0; i < Math.round(0.300 * 120); i++) clk.step();
  const held = cond.get("medium");
  const want = BANDS.subSatG / MANIFEST.channels.medium.sat;
  cond.release(1, 0);
  runUntilParked(clk, cond);
  let maxStep2 = 0;
  for (let i = 1; i < samples.length; i++) {
    for (const k of ["m", "g", "c", "p"]) maxStep2 = Math.max(maxStep2, Math.abs(samples[i][k] - samples[i - 1][k]));
  }
  const bound2 = 1 - Math.exp(-(1 / 120) / BANDS.stepTauSubSat);
  row("sub-sat catch: medium = g/sat", `${held.toFixed(4)} (want ${want.toFixed(4)}), max step ${maxStep2.toFixed(3)} (bound ${bound2.toFixed(3)}, τ${BANDS.stepTauSubSat})`,
    `${want.toFixed(3)} ±${BANDS.subSatTol}; τ0.03-bounded`,
    Math.abs(held - want) <= BANDS.subSatTol && maxStep2 <= bound2 * BANDS.stepSlack && cond.isParked());
}

// ---- tempo x1.3: INVARIANCE (|Δ| vs the base ratio, not an absolute band) ----
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
  const ratio = of / og;
  row("tempo x1.3: fade/stretch invariance", `${ratio.toFixed(3)} (Δ ${(Math.abs(ratio - baseRatio)).toFixed(3)} vs base ${baseRatio.toFixed(3)})`,
    `|Δ| ≤ ${BANDS.tempoEps}`, Number.isFinite(baseRatio) && Math.abs(ratio - baseRatio) <= BANDS.tempoEps);
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
  const bound60 = 1 - Math.exp(-(1 / 60) / BANDS.stepTau);
  row("60Hz interrupt: medium min", mediumMin.toFixed(4), "1.000 held (region g≥sat)", mediumMin >= BANDS.imMin);
  row("60Hz interrupt: max step", `${maxStep.toFixed(3)} (bound ${bound60.toFixed(3)}, τ${BANDS.stepTau})`, "law-bounded, region g≥sat", maxStep <= bound60 * BANDS.stepSlack);
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

// ---- G6: direction latch — continuity through overshoot on a direction-asymmetric
// underdamped spring. The trace must MATCH a reference integrator whose (response, ζ)
// pair is LATCHED at drive time; the pre-cure per-frame target<x inference flips the
// pair at every overshoot crossing and diverges (verified: the old conductor FAILS this
// row — see PROBE-NOTES PASS-2 CURES). Falsifiability guard: the episode must overshoot.
{
  const clk = clock(120);
  const cond = makeConductor({
    el: null, channels: { osc: { law: "spring", response: 0.5, zeta: 0.35, close: { response: 0.35, zeta: 0.8 } } },
    tempo: 1, prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const trace = [];
  cond.onFrame((t, dt) => trace.push({ dt, x: cond.get("osc") }));
  cond.seat(0);
  cond.release(1, 0);
  for (let i = 0; i < 600 && !cond.isParked(); i++) clk.step();
  // reference: same semi-implicit Euler ×8, pair latched OPEN (0.5, 0.35) for the whole flight
  let x = 0, v = 0, maxDev = 0, peak = 0;
  const wn = (Math.PI * 2) / 0.5, zeta = 0.35;
  for (const s of trace) {
    const h = s.dt / 8;
    for (let i = 0; i < 8; i++) { v += (wn * wn * (1 - x) - 2 * zeta * wn * v) * h; x += v * h; }
    maxDev = Math.max(maxDev, Math.abs(s.x - x));
    peak = Math.max(peak, s.x);
  }
  row("G6 latch: continuity through overshoot", `max dev ${maxDev.toExponential(1)} vs latched ref, peak ${peak.toFixed(3)}`,
    "dev ≤ 1e-6; peak > 1.05 (must overshoot)", maxDev <= 1e-6 && peak > 1.05 && cond.isParked());
}

// ---- H3 lens clock (DESIGN row): light leads, geometry follows — emergent from τ ≪ response.
// F3 owns the CLOCK claim only; the lens BODY is F5's (WebKit paint evidence in safari-arm.md).
{
  const clk = clock(120);
  const cond = makeConductor({
    el: null, channels: {
      light: { law: "cliff", tau: 0.02 },
      geo: { law: "spring", response: 0.3, zeta: 0.82 }, // springPreset("dock") — on-disk pair
    },
    tempo: 1, prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const S = [];
  cond.onFrame((t) => S.push({ t, l: cond.get("light"), g: cond.get("geo") }));
  cond.seat(0);
  const t0 = clk.t();
  cond.release(1, 0);
  runUntilParked(clk, cond);
  const R = rel(S, t0);
  const tl = crossing(R, "l", 0.90, true);
  const tg = crossing(R, "g", 0.90, true);
  row("H3 lens clock: light leads (DESIGN)", `light t90 ${ms(tl)}, geometry t90 ${ms(tg)}, ratio ${(tl / tg).toFixed(2)}`,
    "light ≤60ms; geo ≥120ms; ratio ≤0.5", tl <= 0.060 && tg >= 0.120 && tl / tg <= 0.5);
}

// ---- lead-trail expressibility (suffusion forPass2: generalization-not-rival) — the shipped
// useLeadTrail {lead, trail} shape as a two-channel manifest with source routing. Trail must
// never lead during the rise (source routing is what holds it back — a target-chasing
// first-order WOULD outrun the spring's slow start), and the pair must park jointly.
{
  const clk = clock(120);
  const cond = makeConductor({
    el: null, channels: {
      lead: { law: "spring", response: 0.68, zeta: 0.64 },
      trail: { law: "follow", tau: 0.27, source: "lead" },
    },
    tempo: 1, prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const S = [];
  cond.onFrame(() => S.push({ l: cond.get("lead"), tr: cond.get("trail") }));
  cond.seat(0);
  cond.release(1, 0);
  runUntilParked(clk, cond, 10);
  let ok = true, riseDone = false;
  for (const s of S) {
    if (!riseDone && s.l >= 1.0) riseDone = true;
    if (!riseDone && s.tr > s.l + 1e-3) ok = false;
  }
  row("useLeadTrail as a 2-channel manifest", `trail ≤ lead through the rise: ${ok ? "yes" : "NO"}; jointly parked: ${cond.isParked() ? "yes" : "no"}`,
    "N=2 rack expressible", ok && riseDone && cond.isParked());
}

const w = [40, 46, 44, 6];
console.log(rows.map((r) => r.map((c, i) => String(c).padEnd(w[i])).join("")).join("\n"));
const gates = rows.filter((r) => r[3] !== "info").length;
console.log(`\n${gates - fails}/${gates} gates PASS${fails ? ` — ${fails} FAIL` : ""} (+${rows.length - gates} info)`);
process.exit(fails ? 1 : 0);
