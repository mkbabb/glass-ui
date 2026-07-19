// SPINE-CONDUCTOR (F1×F3) — the UNION node battery. verified-model: claude-fable-5.
// p3:SPINE-CONDUCTOR merge seat, IOS27-MICRO pass 3.
//
// Extracts the SC-KERNEL and SC-BANDS blocks from index.html (the exact shipped code and the
// exact shipped bands — zero drift on either) and runs the de-duplicated union of the two
// parent batteries (F1 38 + F3 19) plus the pass-3 charter's register gates and the
// worklist-8 dialect adjudication. Run: node check.mjs
//
// BAND LAW (F1 G2 + F3 G8, carried): every gate names its source — [MARKS §n] corpus-derived
// (incl. PASS-2 CORRECTIONS C1–C7 + the corpus-redo amendments), [DESIGN] corpus-silent
// design law, [REG-LOCK] drift lock on adopted constants (never corpus truth). A sim value
// is a point inside its band, never the band's author. Dedup ledger: PROBE-NOTES.md §3.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const km = html.match(/\/\*SC-KERNEL-BEGIN\*\/([\s\S]*?)\/\*SC-KERNEL-END\*\//);
if (!km) { console.error("FAIL: SC-KERNEL block not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(km[1] + "\nthis.SC = SC;", ctx, { filename: "sc-kernel.js" });
const SC = ctx.SC;
const bm = html.match(/\/\*SC-BANDS-BEGIN\*\/([\s\S]*?)\/\*SC-BANDS-END\*\//);
if (!bm) { console.error("FAIL: SC-BANDS block not found"); process.exit(1); }
const B = new Function(`${bm[1]}; return SC_BANDS;`)();

let failures = 0, gates = 0, infos = 0;
function check(name, value, lo, hi, note = "") {
  gates++;
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name.padEnd(42)} ${String(typeof value === "number" ? +value.toFixed(4) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`,
  );
  return ok;
}
function info(name, value, note = "") {
  infos++;
  console.log(`info  ${name.padEnd(42)} ${String(value).padStart(10)}  ${note}`);
}
const ms = (s) => Number.isNaN(s) ? NaN : +(s * 1000).toFixed(1);

// =====================================================================
// 1. REGISTER ARITHMETIC — the charter §1 rulings as falsifiable gates
//    (f_d = (1/response)·√(1−ζ²); every figure recomputed, none quoted)
// =====================================================================
console.log("=== The registers — CHARTER R-1/R-2/R-3 + the [0,10%] fence (R-4) ===");
{
  const d = SC.REG.dock;
  check("R-1 dock pair (response, ζ)", d.response === 0.35 && d.zeta === 0.82 ? 1 : 0, 1, 1,
    "[R-1] 0.30→0.35 AMENDED, ζ HELD; overpull register CONVERGED — no second arrival authority");
  check("R-1 dock f_d (Hz)", SC.fD(d), B.dockFd.lo, B.dockFd.hi, `${B.dockFd.label} ${B.dockFd.text}`);
  check("R-1 dock zero-seed overshoot", SC.zeroSeedOvershoot(d), 0, B.dockOs.hi, `${B.dockOs.label} — analytic ~1.1%`);
  check("k·v arrival gain (s)", SC.arrivalGain(d), B.kv.lo, B.kv.hi, `${B.kv.label} — popover attested 0.023–0.025`);
  const p = SC.REG.panel;
  check("R-2 panel f_d (Hz)", SC.fD(p), B.panelFd.lo, B.panelFd.hi, `${B.panelFd.label} — the roster's 0.30-0.35 slip corrected`);
  check("R-2 panel intrinsic overshoot", SC.zeroSeedOvershoot(p), B.panelOs.lo, B.panelOs.hi,
    `${B.panelOs.label} — the ONE not-velocity-bought class (law 14e)`);
  const o = SC.REG.orbDrop;
  check("R-3 orb-drop critical (ζ)", o.zeta, 1, 1, "[MARKS-D-SIRI mark 1 — zero overshoot MEASURED]");
  const fn = SC.springSampler(o.response, o.zeta, 0, 0, 1);
  check("R-3 orb-drop x(215ms)", fn(0.215)[0], B.orbX215.lo, B.orbX215.hi, `${B.orbX215.label} — flight 215±33ms`);
  let worst = 0, worstName = "";
  for (const [name, r] of Object.entries(SC.REG)) {
    const os = SC.zeroSeedOvershoot(r);
    if (os > worst) { worst = os; worstName = name; }
  }
  check("the [0,10%] fence, all registers", worst, 0, B.fence,
    `[REG fence, springPresets.ts:55-58 — STANDS whole (R-4); worst = ${worstName}]`);
  check("depth grade ×1.20 exact", SC.depthGain(3, 3), 1.2, 1.2, "[MARKS +20% — normalized form, F3 G7]");
}

// =====================================================================
// 2. THE SPINE (Maps side) — F1's battery on the converged register
// =====================================================================
console.log("\n=== Overpull return — the CONVERGED arrival register {0.35, ζ0.82} (R-1; C1: no free springback) ===");
{
  const op = SC.sims.overpull(0.10);
  check("zero-seed overshoot (frac of depth)", op.overshootPct, 0, B.opOs.hi, `${B.opOs.label} velocity-bought only`);
  check("zero-seed settle <2px (ms)", ms(op.settleMs / 1000), B.opSettle.lo * 1000, B.opSettle.hi * 1000, B.opSettle.label);
}
console.log("\n=== Flung landing — corpus parity with C2 (the ONE free spring transient) ===");
{
  const fl = SC.sims.flungLanding(-3.2);
  check("overshoot per crossing vel (s)", fl.overshootPerVel, B.flOsV.lo, B.flOsV.hi, B.flOsV.label);
  check("settle from rest-crossing (ms)", ms(fl.settleFromCrossMs / 1000), B.flSettle.lo * 1000, B.flSettle.hi * 1000, B.flSettle.label);
  check("crossing velocity sane (/s)", Math.abs(fl.vCross), B.flV.lo, B.flV.hi, B.flV.label);
}
console.log("\n=== Pin release (C3: bounds-only, INCONCLUSIVE — register (0.22, 0.75) is DESIGN) ===");
{
  const p = SC.sims.pin(0.19);
  check("pin covered at 83ms (fraction)", p.coverage83, B.pinCov.lo, B.pinCov.hi, B.pinCov.label);
  check("pin settle <2px (ms)", ms(p.settleMs / 1000), B.pinSettle.lo * 1000, B.pinSettle.hi * 1000, B.pinSettle.label);
}
console.log("\n=== Mid-detent catch — DESIGN vocabulary (C3 voided the corpus instance); G3 projected momentum ===");
{
  const mc = SC.sims.midCatch(-4);
  check("catch fires (projected momentum)", mc.caught ? 1 : 0, 1, 1, "[DESIGN] |v at well| ≥ V_CATCH on the decayRest path");
  check("|v| at well crossing (/s)", Math.abs(mc.vAtWell), SC.V_CATCH, 20, "[DESIGN]");
  check("well dwell (ms)", mc.dwellMs, B.dwell.lo * 1000, B.dwell.hi * 1000, B.dwell.label);
  check("min distance to well during dwell", mc.minWellDist, 0, B.wellNear, "[DESIGN] hesitation AT the well");
  check("land after release (ms, park metric)", mc.landMs, B.land.lo * 1000, B.land.hi * 1000, B.land.label);
  const fast070 = SC.wellCrossing(0.70, -3.5, SC.WELL);
  check("fast fall from 0.70 catches", fast070 && Math.abs(fast070.v) >= SC.V_CATCH ? 1 : 0, 1, 1, "[DESIGN] the G3 counterexample catches");
  const upward = SC.wellCrossing(0.30, 2.0, SC.WELL);
  check("upward crossing reported (v sign)", upward && upward.v > 0 ? 1 : 0, 1, 1, "[DESIGN] direction-symmetric helper");
  const shallow = SC.wellCrossing(0.60, -0.35, SC.WELL);
  check("slow ease from 0.60 does NOT catch", shallow === null || Math.abs(shallow.v) < SC.V_CATCH ? 1 : 0, 1, 1, "[DESIGN]");
  const away = SC.wellCrossing(0.40, -1.0, SC.WELL);
  check("motion away from the well: null", away === null ? 1 : 0, 1, 1, "[DESIGN]");
  const flick = SC.wellCrossing(1.0, -3.2, SC.WELL);
  check("flick-close (-3.2) does NOT catch", flick && Math.abs(flick.v) < SC.V_CATCH ? 1 : 0, 1, 1,
    "[DESIGN] the C2 landing scenario stays clean with the well declared");
}
console.log("\n=== The intent law — ONE law, two faces (F1 G6 + F3 G6/OG1); dither at pointer frequency ===");
{
  const j1 = SC.sims.jitter(1), j0 = SC.sims.jitter(0);
  check("held jitter flips (latch=1 start)", j1.flips, 0, 0, "[DESIGN] ±0.04 @ 6Hz never strobes");
  check("held jitter flips (latch=0 start)", j0.flips, 0, 0, "[DESIGN]");
  const sc = SC.sims.slowCross();
  check("slow cross flips exactly once", sc.flips, 1, 1, "[DESIGN]");
  check("slow cross final intent", sc.finalIntent, 1, 1, "[DESIGN]");
  const fi = SC.sims.flickIntent();
  check("fast flick commits early", fi.intent, 1, 1, "[DESIGN] projection lead survives the v̄ filter");
  check("flick commit value < 0.5", fi.valueAtCommit, 0, 0.5, "[DESIGN]");
}
console.log("\n=== Spine C1 invariant: retarget continuity at the catch ===");
{
  const s = new SC.Spine().setRegister("ccClose");
  s.value = 1;
  s.glideTo(0, 0, -6);
  s.tick(0.33);
  const [xB, vB] = [s.value, s.velocity];
  s.setRegister("ccCatch").glideTo(1, 0.33);
  s.tick(0.33);
  check("C1 position jump at retarget", Math.abs(s.value - xB), 0, 1e-9);
  check("C1 velocity jump at retarget", Math.abs(s.velocity - vB), 0, 1e-6);
}
console.log("\n=== Rubber band + breathe (design vocabulary; the ONE side-breathe constant, OG3) ===");
{
  check("rubber(100px, D=32) displaced", SC.rubber(100, 32), 15, 25, "[DESIGN] resistive from the first px");
  check("rubber(10000px, D=32) < D", SC.rubber(10000, 32), 25, 32, "[DESIGN] saturates at D");
  const breathe = SC.GEO.sideBreathe / SC.GEO.restScaleX;
  check("side breathe from the ONE constant", breathe, B.breathe.lo, B.breathe.hi,
    `${B.breathe.label}`);
}

// =====================================================================
// 3. THE RACK (CC side) — the F3 battery through useLiquidSpine on a virtual clock
// =====================================================================
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
const CC_MANIFEST = () => ({
  medium:    { law: "cliff", attack: SC.CLOCKS.medium.attack, close: { release: SC.CLOCKS.medium.release }, sat: 0.12, occ: SC.OCC },
  geometry:  { law: "identity" },
  content:   { law: "follow", key: "intent", tau: SC.CLOCKS.content.attack, close: { tau: SC.CLOCKS.content.release } },
  periphery: { law: "follow", tau: SC.CLOCKS.periphery.tau, delay: SC.CLOCKS.periphery.delay, source: "content" },
  light:     { law: "light", attack: SC.CLOCKS.light.attack, hold: SC.CLOCKS.light.hold, cool: SC.CLOCKS.light.cool },
});
function build(hz, tempo = 1, manifest = CC_MANIFEST(), prm = () => false) {
  const clk = clock(hz);
  const samples = [];
  const kern = SC.useLiquidSpine({
    el: null, channels: manifest, tempo,
    registers: { open: "ccOpen", close: "ccClose" },
    prm, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  kern.onFrame((t, dt) => samples.push({
    t, dt, m: kern.get("medium"), g: kern.get("geometry"),
    c: kern.get("content"), p: kern.get("periphery"), l: kern.get("light"),
    core: kern.coreSettled(),
  }));
  return { clk, kern, samples };
}
function runUntilParked(clk, kern, maxS = 6) {
  const n = Math.ceil(maxS * 1000);
  for (let i = 0; i < n; i++) { clk.step(); if (kern.isParked()) break; }
  return kern.isParked();
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

let baseRatio = NaN;
console.log("\n=== CC open — the merged rack, 120Hz virtual clock (bands from SC-BANDS, printed = gated) ===");
{
  const { clk, kern, samples } = build(120);
  kern.seat(0);
  samples.length = 0;
  let t0 = clk.t();
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern);
  let S = rel(samples, t0);
  const om = crossing(S, "m", 0.95, true);
  const of = crossing(S, "c", 0.95, true);
  const og = crossing(S, "g", 0.99, true);
  const os = crossing(S, "g", 0.90, true);
  const opLag = crossing(S, "p", 0.90, true) - crossing(S, "c", 0.90, true);
  const ll = crossing(S, "l", 0.90, true);
  let tArr = NaN;
  for (const s of S) { if (Number.isNaN(tArr) && s.core && s.t > 0.1) { tArr = s.t; break; } }
  const lFall = crossing(S, "l", 0.95, false);
  const lGone = crossing(S, "l", 0.05, false);
  baseRatio = of / og;
  check("open: medium 95% (ms)", ms(om), 0, B.om95.hi * 1000, `${B.om95.label} — occupancy onset + attack 20ms`);
  check("open: content 95% (ms)", ms(of), B.of95.lo * 1000, B.of95.hi * 1000, B.of95.label);
  check("open: geometry t99 (ms)", ms(og), B.og99.lo * 1000, B.og99.hi * 1000, B.og99.label);
  check("open: geometry s90 (ms)", ms(os), B.os90.lo * 1000, B.os90.hi * 1000, `${B.os90.label} — the 560-620 lock RETIRED with (0.95,1.0)`);
  info("open: fade/stretch (derived)", (of / og).toFixed(3), `derived-info (F3 G8 demotion adopted) — φ³ ref ${B.ratioRef}; primaries gate it`);
  check("open: periphery lag (ms)", ms(opLag), B.olag.lo * 1000, B.olag.hi * 1000, B.olag.label);
  check("open: light lead t90 (ms)", ms(ll), 0, B.lightLead.hi * 1000, `${B.lightLead.label} — light leads, geometry follows`);
  check("light: arrival hold (ms)", ms(lFall - tArr), B.lightHold.lo * 1000, B.lightHold.hi * 1000, B.lightHold.label);
  check("light: cool (ms)", ms(lGone - lFall), B.lightCool.lo * 1000, B.lightCool.hi * 1000, B.lightCool.label);
  check("park after open (pending rAF)", clk.pending(), 0, 0, `parked=${kern.isParked()} @ ${ms(S.at(-1).t)}ms — incl. the light tail`);

  // CLOSE
  samples.length = 0;
  t0 = clk.t();
  kern.release(0, -6, "ccClose"); // the measured flick seed [REG-LOCK scenario]
  runUntilParked(clk, kern);
  S = rel(samples, t0);
  const ccOut = crossing(S, "c", 0.05, false);
  const mr = crossing(S, "m", 0.90, false);
  const cm = crossing(S, "m", 0.05, false);
  console.log("\n=== CC close — the emergent inversion: content out → empty-medium beat → medium relax ===");
  check("close: content out (ms)", ms(ccOut), B.cc.lo * 1000, B.cc.hi * 1000, `${B.cc.label} — release τ55ms RATIFIED (R-7)`);
  check("close: empty-medium beat (ms)", ms(mr - ccOut), B.cb.lo * 1000, B.cb.hi * 1000, `${B.cb.label} — EMERGENT, not authored (worklist 1)`);
  check("close: medium gone (ms)", ms(cm), B.cm.lo * 1000, B.cm.hi * 1000, B.cm.label);

  // UNION INTERRUPT ARM 1 (F3's held row): catch at g ≥ sat — medium min 1.000 exactly
  console.log("\n=== Union interrupt arm 1 — HELD (g≥sat at the catch): the medium never moves ===");
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern);
  samples.length = 0;
  kern.release(0, 0, "ccClose");
  for (let i = 0; i < Math.round(0.120 * 120); i++) clk.step();
  const gCatch = kern.get("geometry");
  kern.scrub(gCatch);
  for (let i = 0; i < Math.round(0.160 * 120); i++) clk.step();
  kern.release(1, 0.8, "ccOpen");
  runUntilParked(clk, kern);
  let mMin = Infinity, maxStep = 0, nan = false;
  for (let i = 0; i < samples.length; i++) {
    mMin = Math.min(mMin, samples[i].m);
    for (const k of ["m", "c", "p"]) {
      if (Number.isNaN(samples[i][k])) nan = true;
      if (i > 0) maxStep = Math.max(maxStep, Math.abs(samples[i][k] - samples[i - 1][k]));
    }
  }
  const bound120 = 1 - Math.exp(-(1 / 120) / B.stepTau);
  check("held interrupt: medium min", mMin, B.imMin, 1.0001, `caught g=${gCatch.toFixed(3)} ≥ sat (region asserted); NaN=${nan}`);
  check("held interrupt: max step (m/c/p)", maxStep, 0, bound120 * B.stepSlack,
    `law-bounded τ${B.stepTau} (light excluded: its attack IS the licensed cut class — SC-BANDS note)`);
  check("held interrupt: re-settled + parked", kern.isParked() ? 1 : 0, 1, 1);

  // UNION INTERRUPT ARM 2 (F1's dip row): catch at value < θ_close — the medium dips, never clears
  console.log("\n=== Union interrupt arm 2 — DIP (caught sub-θ at +330ms): partial relax, re-attack ===");
  kern.seat(1);
  samples.length = 0;
  t0 = clk.t();
  kern.release(0, -6, "ccClose");
  for (let i = 0; i < Math.round(0.330 * 120); i++) clk.step();
  kern.release(1, undefined, "ccCatch"); // C1 catch from live (value, velocity)
  let dipResettle = NaN;
  {
    const n0 = samples.length;
    for (let i = 0; i < 6000; i++) {
      clk.step();
      if (kern.isParked()) break;
    }
    const S2 = rel(samples, t0);
    let dm = Infinity, df = Infinity;
    for (const s of S2) { dm = Math.min(dm, s.m); df = Math.min(df, s.c); }
    for (const s of S2) { if (Number.isNaN(dipResettle) && s.t > 0.4 && s.core) { dipResettle = s.t; break; } }
    check("dip interrupt: medium min", dm, B.dipMin.lo, B.dipMin.hi, `${B.dipMin.label} — F1 OG2 retag`);
    check("dip interrupt: content min", df, 0, B.dipFade.hi, `${B.dipFade.label} pure blurred field`);
    check("dip interrupt: core resettle (ms)", ms(dipResettle), B.dipResettle.lo * 1000, B.dipResettle.hi * 1000, B.dipResettle.label);
  }

  // SUB-SAT (the scrub-arm law): catch BELOW sat — medium = g/sat, reversible, law-bounded
  console.log("\n=== Sub-sat catch — the scrub-arm position map (G4): medium = g/sat under the finger ===");
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern);
  samples.length = 0;
  kern.release(0, 0, "ccClose");
  for (let i = 0; i < 480 && kern.get("geometry") > B.subSatG; i++) clk.step();
  kern.scrub(B.subSatG);
  for (let i = 0; i < Math.round(0.300 * 120); i++) clk.step();
  const held = kern.get("medium");
  const want = B.subSatG / 0.12;
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern);
  let maxStep2 = 0;
  for (let i = 1; i < samples.length; i++) {
    for (const k of ["m", "c", "p"]) maxStep2 = Math.max(maxStep2, Math.abs(samples[i][k] - samples[i - 1][k]));
  }
  const bound2 = 1 - Math.exp(-(1 / 120) / B.stepTauSubSat);
  check("sub-sat catch: medium = g/sat", held, want - B.subSatTol, want + B.subSatTol,
    `want ${want.toFixed(3)} — the N8 sat dial is a register of THIS law`);
  check("sub-sat catch: max step (m/c/p)", maxStep2, 0, bound2 * B.stepSlack, `τ${B.stepTauSubSat}-bounded; parked=${kern.isParked()}`);
}

// tempo invariance (|Δ| vs the base ratio, not an absolute band)
console.log("\n=== Tempo ×1.3 — ratio invariance ===");
{
  const { clk, kern, samples } = build(120, 1.3);
  kern.seat(0);
  samples.length = 0;
  const t0 = clk.t();
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern, 10);
  const S = rel(samples, t0);
  const of = crossing(S, "c", 0.95, true);
  const og = crossing(S, "g", 0.99, true);
  const ratio = of / og;
  check("tempo ×1.3: fade/stretch invariance", Math.abs(ratio - baseRatio), 0, B.tempoEps,
    `ratio ${ratio.toFixed(3)} vs base ${baseRatio.toFixed(3)}`);
}

// 60Hz continuity (the max-step bound is dt-dependent — documented, not compared raw)
console.log("\n=== 60Hz held interrupt — continuity at the coarser grid ===");
{
  const { clk, kern, samples } = build(60);
  kern.seat(0);
  kern.release(1, 0, "ccOpen"); runUntilParked(clk, kern);
  samples.length = 0;
  kern.release(0, 0, "ccClose");
  for (let i = 0; i < Math.round(0.120 * 60); i++) clk.step();
  kern.scrub(kern.get("geometry"));
  for (let i = 0; i < Math.round(0.160 * 60); i++) clk.step();
  kern.release(1, 0.8, "ccOpen");
  runUntilParked(clk, kern);
  let mMin = Infinity, maxStep = 0;
  for (let i = 1; i < samples.length; i++) {
    mMin = Math.min(mMin, samples[i].m);
    for (const k of ["m", "c", "p"]) maxStep = Math.max(maxStep, Math.abs(samples[i][k] - samples[i - 1][k]));
  }
  const bound60 = 1 - Math.exp(-(1 / 60) / B.stepTau);
  check("60Hz interrupt: medium min", mMin, B.imMin, 1.0001);
  check("60Hz interrupt: max step (m/c/p)", maxStep, 0, bound60 * B.stepSlack, `bound ${(bound60 * B.stepSlack).toFixed(3)} τ${B.stepTau}`);
}

// PRM: every drive seats in one poll — zero frames, zero pending rAF
console.log("\n=== PRM — seats instantly, zero frames (one-poll law, both parents' G7-class) ===");
{
  const { clk, kern, samples } = build(120, 1, CC_MANIFEST(), () => true);
  let frames = 0;
  kern.onFrame(() => frames++);
  kern.release(1, 0, "ccOpen");
  clk.step(); clk.step();
  check("PRM: release seats", kern.get("geometry") === 1 && frames === 0 && clk.pending() === 0 && kern.isParked() ? 1 : 0, 1, 1,
    `x=${kern.get("geometry")}, frames=${frames}, light=${kern.get("light")} (0 — no hold/cool under PRM)`);
}

// G6 latch: continuity through overshoot on a direction-asymmetric underdamped spring —
// the trace must MATCH a reference integrator whose pair is LATCHED at drive time.
console.log("\n=== G6 latch — the rack's spring law vs a latched reference (falsification-proven gate) ===");
{
  const clk = clock(120);
  const kern = SC.useLiquidSpine({
    el: null, channels: { osc: { law: "spring", response: 0.5, zeta: 0.35, close: { response: 0.35, zeta: 0.8 } } },
    tempo: 1, registers: { open: "dock", close: "dock" },
    prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const trace = [];
  kern.onFrame((t, dt) => trace.push({ dt, x: kern.get("osc") }));
  kern.seat(0);
  kern.release(1, 0, "dock");
  for (let i = 0; i < 700 && !kern.isParked(); i++) clk.step();
  let x = 0, v = 0, maxDev = 0, peak = 0;
  const wn = (Math.PI * 2) / 0.5, zeta = 0.35;
  for (const s of trace) {
    const h = s.dt / 8;
    for (let i = 0; i < 8; i++) { v += (wn * wn * (1 - x) - 2 * zeta * wn * v) * h; x += v * h; }
    maxDev = Math.max(maxDev, Math.abs(s.x - x));
    peak = Math.max(peak, s.x);
  }
  check("G6 latch: max dev vs latched ref", maxDev, 0, 1e-6, `peak ${peak.toFixed(3)} (must overshoot: >1.05 asserted next)`);
  check("G6 latch: episode overshoots (guard)", peak, 1.05, 2, "falsifiability guard — the row cannot pass on a dead flight");
}

// H3 lens clock (REG-LOCK demonstration — out of the corpus-gate headline, F3 OG2):
// light leads, geometry follows, emergent from τ ≪ response. The lens BODY is F5's.
console.log("\n=== H3 lens clock — REG-LOCK demonstration (not corpus): light leads the dock register ===");
{
  const clk = clock(120);
  const kern = SC.useLiquidSpine({
    el: null, channels: {
      light: { law: "cliff", attack: 0.02 },
      geo: { law: "identity" },
    },
    tempo: 1, registers: { open: "dock", close: "dock" },
    prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const S = [];
  kern.onFrame((t) => S.push({ t, l: kern.get("light"), g: kern.get("geo") }));
  kern.seat(0);
  const t0 = clk.t();
  kern.release(1, 0, "dock"); // the R-1 amended dock row
  runUntilParked(clk, kern);
  const R = rel(S, t0);
  const tl = crossing(R, "l", 0.90, true);
  const tg = crossing(R, "g", 0.90, true);
  check("H3: light t90 (ms) [REG-LOCK demo]", ms(tl), 0, 60, "cliff-attack lead");
  check("H3: geometry t90 (ms) [REG-LOCK demo]", ms(tg), 120, 400, "the dock register follows");
  check("H3: lead ratio [REG-LOCK demo]", tl / tg, 0, 0.5, "emergent from τ ≪ response — never authored");
}

// useLeadTrail expressibility (generalization-not-rival): the shipped {lead, trail} shape as
// a two-channel manifest with source routing; trail never leads through the rise.
console.log("\n=== useLeadTrail as a two-channel manifest — the substrate-relations proof ===");
{
  const clk = clock(120);
  const kern = SC.useLiquidSpine({
    el: null, channels: {
      lead: { law: "spring", response: 0.68, zeta: 0.64 },
      trail: { law: "follow", tau: 0.27, source: "lead" },
    },
    tempo: 1, registers: { open: "dock", close: "dock" },
    prm: () => false, now: clk.now, raf: clk.raf, caf: clk.caf,
  });
  const S = [];
  kern.onFrame(() => S.push({ l: kern.get("lead"), tr: kern.get("trail") }));
  kern.seat(0);
  kern.release(1, 0, "dock");
  runUntilParked(clk, kern, 10);
  let ok = true, riseDone = false;
  for (const s of S) {
    if (!riseDone && s.l >= 1.0) riseDone = true;
    if (!riseDone && s.tr > s.l + 1e-3) ok = false;
  }
  check("lead-trail: trail ≤ lead through the rise", ok && riseDone ? 1 : 0, 1, 1,
    `source routing load-bearing; jointly parked=${kern.isParked()}`);
}

// sat×source composition FENCE (F3 OG3): constructing it must throw.
console.log("\n=== The sat×source fence (F3 OG3) ===");
{
  let threw = 0;
  try {
    SC.useLiquidSpine({ el: null, channels: { bad: { law: "follow", source: "x", sat: 0.5, tau: 0.1 } }, prm: () => false });
  } catch (e) { threw = 1; }
  check("sat×source composition throws", threw, 1, 1, "[DESIGN fence] — settled() can never spin on a shaped source");
}

// =====================================================================
// 3b. M-1/D2 — park-mid-scrub stale velocity (CRIT-SPINE M-1 + minor 5, pass-4 cure).
//     MARKS C1: overshoot is velocity-BOUGHT only — a still finger's velocity is zero.
//     The critic's node repro is now a STANDING gate: fast drag 0.60→0.90 at 3.0/s,
//     DEAD-STILL hold 800ms (the kernel parks mid-scrub — by design, zero-cost held
//     idle), then release. Pre-cure this section FAILS (velocity frozen at ~3.0/s,
//     4% unearned overshoot — output banked in PROBE-NOTES §4.11).
// =====================================================================
console.log("\n=== M-1/D2 — park-mid-scrub stale velocity (MARKS C1: a still finger's velocity is zero) ===");
{
  const MAPS_LIKE = () => ({
    geometry: { law: "identity" },
    light:    { law: "light", attack: SC.CLOCKS.light.attack, hold: SC.CLOCKS.light.hold, cool: SC.CLOCKS.light.cool },
  });
  const mk = () => {
    const clk = clock(120);
    const kern = SC.useLiquidSpine({ el: null, channels: MAPS_LIKE(), tempo: 1,
      registers: { open: "dock", close: "dock" }, prm: () => false,
      now: clk.now, raf: clk.raf, caf: clk.caf });
    return { clk, kern };
  };
  const drag = (clk, kern) => { // 0.60 → 0.90 at 3.0/s, 120Hz pointer cadence
    kern.seat(0.60);
    for (let i = 1; i < 12; i++) { kern.scrub(0.60 + 0.025 * i); clk.step(); }
    kern.scrub(0.90);
    const tLast = clk.t(), v = kern.spine.velocity;
    clk.step();
    return { v, tLast };
  };
  // (a) the still-hold path — the defect scenario, gated
  {
    const { clk, kern } = mk();
    const d = drag(clk, kern);
    let parkedDuringHold = false;
    for (let i = 0; i < Math.round(0.800 * 120); i++) { clk.step(); if (kern.isParked()) parkedDuringHold = true; }
    check("still hold: kernel parks mid-scrub", parkedDuringHold ? 1 : 0, 1, 1,
      "the defect path is REAL (Maps-class manifest, no core channels); zero-cost held idle stands");
    const tRel = clk.t();
    const peaks = [];
    kern.onFrame(() => peaks.push(kern.get("geometry")));
    kern.release(1, undefined, "dock");
    const vUsed = Math.abs(kern.spine.velocity);
    const expected = Math.abs(d.v) * Math.exp(-Math.max(0, tRel - d.tLast - SC.INTENT.idleAfter) / SC.INTENT.idleTau);
    check("still hold: release velocity (/s)", vUsed, 0, B.shVel.hi, `${B.shVel.label} — drag velocity was ${Math.abs(d.v).toFixed(2)}/s`);
    check("still hold: wall-clock decay parity", Math.abs(vUsed - expected), 0, 1e-9,
      "drive-time aging ≡ the closed-form idle law — park cannot freeze the estimator");
    for (let i = 0; i < 720 && !kern.isParked(); i++) clk.step();
    const peak = Math.max(...peaks);
    check("still hold: geometry peak", peak, B.shPeak.lo, B.shPeak.hi, `${B.shPeak.label} — pre-cure 1.0401`);
  }
  // (b) the falsifiability guard — NO hold: bought velocity must still buy overshoot
  {
    const { clk, kern } = mk();
    drag(clk, kern);
    const peaks = [];
    kern.onFrame(() => peaks.push(kern.get("geometry")));
    kern.release(1, undefined, "dock");
    for (let i = 0; i < 720 && !kern.isParked(); i++) clk.step();
    check("no hold: velocity still buys overshoot (guard)", Math.max(...peaks), B.shGuard.lo, B.shGuard.hi,
      `${B.shGuard.label}`);
  }
  // (c) minor 5 — a mid-gesture park must never re-arm the periphery dead-time gate
  {
    const { clk, kern } = build(120); // the full CC manifest (periphery delay 100ms)
    kern.seat(0);
    kern.scrub(0.2); clk.step();
    for (let i = 1; i <= 8; i++) { kern.scrub(0.2 + 0.075 * i); clk.step(); } // → 0.8, intent latches OPEN
    let parkedMid = false;
    for (let i = 0; i < Math.round(2.0 * 120); i++) { clk.step(); if (kern.isParked()) { parkedMid = true; break; } }
    check("m5: parks mid-scrub after convergence", parkedMid ? 1 : 0, 1, 1, "precondition — the pause parks the rack under a live gesture");
    const p0 = kern.get("periphery");
    const tR = clk.t();
    let firstMove = NaN;
    for (let i = 1; i <= 60; i++) { // resume the SAME gesture: fast pull down, intent flips CLOSED
      kern.scrub(Math.max(0.15, 0.8 - 0.05 * i)); clk.step();
      if (Number.isNaN(firstMove) && Math.abs(kern.get("periphery") - p0) > 0.02) firstMove = clk.t() - tR;
    }
    check("m5: periphery live after resume (ms)", ms(firstMove), 0, B.resume.hi * 1000,
      `${B.resume.label} — park never masquerades as gesture end; pre-cure froze ≥100ms`);
  }
}

// =====================================================================
// 3c. M-2 — domain.wells: the G3 catch scheduler is KERNEL-OWNED (CRIT-SPINE M-2 cure).
//     The physics rows stay with the truth table + simMidCatch (which now RUNS this
//     path); these gates hold the SEAM — catch consulted inside release(), dwell exposed
//     via catching(), finger recapture cancels, and the rack face reads GESTURE intent
//     through the dwell (the well glide's own latch never flips a channel).
// =====================================================================
console.log("\n=== M-2 — domain.wells: the catch scheduler is kernel-owned (G3 in the factory) ===");
{
  const mk = (channels, domain) => {
    const clk = clock(120);
    const kern = SC.useLiquidSpine({ el: null, channels, domain, tempo: 1,
      registers: { open: "dock", close: "dock" }, prm: () => false,
      now: clk.now, raf: clk.raf, caf: clk.caf });
    return { clk, kern };
  };
  const W = { wells: [{ t: SC.WELL, kind: "weak" }] };
  // (a) catch → dwell → onward, all inside the kernel
  {
    const { clk, kern } = mk({ geometry: { law: "identity" } }, W);
    kern.seat(1);
    kern.release(0, -4, "dock");
    const caught = kern.catching() !== null;
    let dwellMs = NaN;
    const t0 = clk.t();
    for (let i = 0; i < 720 && !kern.isParked(); i++) {
      clk.step();
      if (Number.isNaN(dwellMs) && kern.catching() === null) dwellMs = (clk.t() - t0) * 1000;
    }
    check("wells: kernel scheduler catches", caught ? 1 : 0, 1, 1, "release(0,-4) consults wellCrossing INSIDE the kernel");
    check("wells: kernel dwell (ms)", dwellMs, B.dwell.lo * 1000, B.dwell.hi * 1000, `${B.dwell.label} — kernel-owned, arrival-or-170ms`);
    check("wells: onward lands at the TARGET", Math.abs(kern.spine.value) < 1e-3 && kern.isParked() ? 1 : 0, 1, 1, "the onward C1 glide reaches the gesture target and parks");
  }
  // (b) finger recapture cancels the dwell — C1, no snap
  {
    const { clk, kern } = mk({ geometry: { law: "identity" } }, W);
    kern.seat(1);
    kern.release(0, -4, "dock");
    for (let i = 0; i < Math.round(0.080 * 120); i++) clk.step();
    const xBefore = kern.spine.value;
    kern.scrub(xBefore); // recapture AT the current value
    check("wells: scrub mid-dwell cancels the catch", kern.catching() === null ? 1 : 0, 1, 1, "the dwell machine dies with the finger back down");
    check("wells: recapture is C1 (no snap)", Math.abs(kern.spine.value - xBefore), 0, 1e-9);
  }
  // (c) the dwell preserves GESTURE intent on the rack face
  {
    const { clk, kern } = mk({ geometry: { law: "identity" },
      content: { law: "follow", key: "intent", tau: SC.CLOCKS.content.attack, close: { tau: SC.CLOCKS.content.release } } }, W);
    kern.seat(1);
    kern.release(0, -4, "dock"); // close gesture; the well glide itself targets 0.55 (≥0.5)
    let rise = 0, prev = kern.get("content"), atDwellEnd = prev;
    for (let i = 0; i < Math.round(0.170 * 120) && kern.catching() !== null; i++) {
      clk.step();
      const c = kern.get("content");
      rise = Math.max(rise, c - prev);
      prev = c; atDwellEnd = c;
    }
    check("wells: dwell preserves gesture intent", atDwellEnd, 0, 0.2,
      "content keeps CLOSING through the dwell (τ55 ⇒ ~0.05 at 170ms) — the rack reads the ONWARD intent; a well-latch leak holds it at 1.0");
    check("wells: dwell content monotone (guard)", rise, 0, 1e-9, "no re-rise mid-dwell");
  }
  // (d) no wells declared: the scheduler is inert
  {
    const { clk, kern } = mk({ geometry: { law: "identity" } }, undefined);
    kern.seat(1);
    kern.release(0, -4, "dock");
    const inert = kern.catching() === null;
    for (let i = 0; i < 720 && !kern.isParked(); i++) clk.step();
    check("no wells: passthrough (no phantom catch)", inert && kern.isParked() ? 1 : 0, 1, 1,
      "an undeclared domain costs nothing — the fence's letter holds");
  }
}

// =====================================================================
// 4. WORKLIST-8 DIALECT ADJUDICATION — the attack arms, decided by the battery
//    (release arms already corpus-RATIFIED: content 55ms thrice-attested, R-7)
// =====================================================================
console.log("\n=== Dialect adjudication (worklist 8) — F1 {20, 65} vs F3 {30, 70} attack arms ===");
{
  // superseded manifest: F3's attack arms on the SAME merged mechanism
  const M = CC_MANIFEST();
  M.medium.attack = SC.SUPERSEDED.mediumAttack;
  M.content.tau = SC.SUPERSEDED.contentAttack;
  const { clk, kern, samples } = build(120, 1, M);
  kern.seat(0);
  samples.length = 0;
  const t0 = clk.t();
  kern.release(1, 0, "ccOpen");
  runUntilParked(clk, kern);
  const S = rel(samples, t0);
  const omB = crossing(S, "m", 0.95, true);
  const ofB = crossing(S, "c", 0.95, true);
  // (a) medium: decided by FAILURE — 30ms breaches the ≤100ms cliff under the occupancy onset
  check("superseded medium attack 30ms FAILS the cliff", omB > B.om95.hi ? 1 : 0, 1, 1,
    `measured ${ms(omB)}ms > ${B.om95.hi * 1000}ms — the adjudication is real, not taste`);
  // (b) content: both arms pass — decided by the DECLARED centering metric vs MARKS 150-250
  const center = (B.of95.lo + B.of95.hi) / 2;
  const { clk: cA, kern: kA, samples: sA } = build(120);
  kA.seat(0); sA.length = 0;
  const tA = cA.t();
  kA.release(1, 0, "ccOpen");
  runUntilParked(cA, kA);
  const ofA = crossing(rel(sA, tA), "c", 0.95, true);
  check("content 65ms centers ≤ 70ms (declared metric)", Math.abs(ofA - center) <= Math.abs(ofB - center) ? 1 : 0, 1, 1,
    `|${ms(ofA)}−${ms(center)}| vs |${ms(ofB)}−${ms(center)}| ms — both in-band; 65 adopted, 70 history`);
}

console.log(`\n${gates - failures}/${gates} gates PASS${failures ? ` — ${failures} FAIL` : ""} (+${infos} info)`);
console.log("Sources: [MARKS] corpus-derived · [DESIGN] corpus-silent design law · [REG-LOCK] drift lock, never corpus truth.");
console.log("The H3 rows are REG-LOCK demonstrations (F3 OG2) — counted above, excluded from any corpus claim.");
process.exit(failures ? 1 : 0);
