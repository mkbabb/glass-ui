// F1 SCALAR-SPINE prototype — node logic check.
// verified-model: claude-fable-5.
// Extracts the /*F1-PHYSICS-BEGIN*/../*F1-PHYSICS-END*/ block from index.html (the SAME code
// that drives paint) and asserts the deterministic sims. Run: node check.mjs
//
// BAND LAW (pass-2 cure, CRIT-F1 G2): every gate names its source —
//   [MARKS §n]   derived from the corpus read (incl. the PASS-2 CORRECTIONS C1-C7);
//   [DESIGN]     a design-law band (the suffusion matrix / spec policy), corpus-silent;
//   [REG-LOCK]   a regression lock on the adopted constants — drift detection, NOT corpus truth.
// A sim value is a point inside its band, never the band's author.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*F1-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*F1-PHYSICS-END\*\//);
if (!m) {
  console.error("FAIL: physics block markers not found in index.html");
  process.exit(1);
}
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.F1 = F1;", ctx, { filename: "f1-physics.js" });
const F1 = ctx.F1;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name.padEnd(38)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(9)}  band [${lo}, ${hi}] ${note}`,
  );
  return ok;
}

console.log("=== CC open (MARKS §5: blur cliff <=100ms; fade 150-250; stretch gesture-owned ~300-650 (C6), register lock 560-620) ===");
const o = F1.sims.ccOpen();
check("open medium 95% (ms)", o.m95, 0, 100, "[MARKS §5] the <=100ms cliff — re-fit attack tau 20ms");
check("open fade 95% (ms)", o.f95, 150, 250, "[MARKS §5]");
check("open stretch 90% (ms)", o.s90, 300, 650, "[MARKS §5 + C6] gesture-owned observed range");
check("open stretch 90% lock (ms)", o.s90, 560, 620, "[REG-LOCK] ccOpen (0.95, 1.0)");
check("open fade:stretch ratio", o.ratio, 2.4, 4.33, "[MARKS §5] raw component bands 600-650/150-250");

console.log("\n=== CC close (MARKS §5 + C6: fade ~170 x2 samples; beat 100-200; medium gone ~620/~630) ===");
const c = F1.sims.ccClose();
check("close fade out (ms)", c.f05, 130, 210, "[MARKS §5] ~170 ± 24fps grid");
check("close empty-medium beat (ms)", c.beat, 100, 200, "[MARKS §5, C6-confirmed]");
check("close medium gone (ms)", c.m05, 600, 650, "[MARKS §5 ~620 + C6 ~630] — re-fit release tau 120ms");

console.log("\n=== CC interrupt (MARKS §5: blur held featureless across cycles; content fully leaves) ===");
const i = F1.sims.ccInterrupt(0.33);
check("interrupt medium min", i.mMin, 0.4, 0.85, "[MARKS §5 qualitative floor] never clears; blessed theta rule");
check("interrupt fade min", i.fMin, 0, 0.1, "[MARKS §5] pure blurred field");
check("interrupt resettle (ms)", i.resettleMs, 300, 1600, "[DESIGN] re-open completes");

console.log("\n=== Overpull return — the C2 register (0.35, zeta 0.80); C1: NO free springback exists in the corpus ===");
const op = F1.sims.overpull(0.10);
check("zero-seed overshoot (frac of depth)", op.overshootPct, 0, 0.03, "[MARKS C2] overshoot velocity-bought, never intrinsic (~1.5% analytic)");
check("zero-seed settle <2px (ms)", op.settleMs, 180, 280, "[REG-LOCK] (0.35, 0.80) — corpus-silent scenario");

console.log("\n=== Flung landing — corpus parity with C2 (the ONE free spring transient: +11px @ 570px/s, settle 183ms) ===");
const fl = F1.sims.flungLanding(-3.2);
check("overshoot per crossing vel (s)", fl.overshootPerVel, 0.015, 0.030, "[MARKS C2] data 0.019, model ~0.020-0.024");
check("settle from rest-crossing (ms)", fl.settleFromCrossMs, 140, 220, "[MARKS C2] model 169-183, data 183");
check("crossing velocity sane (/s)", Math.abs(fl.vCross), 0.3, 4, "[REG-LOCK] flick seed -3.2 through dock register");

console.log("\n=== Pin release (C3: bounds-only, INCONCLUSIVE — 130px in ~90ms; register (0.22, 0.75) is DESIGN) ===");
const p = F1.sims.pin(0.19);
check("pin covered at 83ms (fraction)", p.coverage83, 0.75, 0.92, "[MARKS C3 bounds] ~130px in ~90ms, finger contamination possible");
check("pin settle <2px (ms)", p.settleMs, 100, 200, "[REG-LOCK] C3 voided the ~170ms corpus tail");

console.log("\n=== Mid-detent catch — DESIGN vocabulary (C3 voided the corpus instance); projected-momentum policy (G3) ===");
const mc = F1.sims.midCatch(-4);
check("catch fires (projected momentum)", mc.caught ? 1 : 0, 1, 1, "[DESIGN] |v at well| >= V_CATCH on the decayRest-style path");
check("|v| at well crossing (/s)", Math.abs(mc.vAtWell), F1.V_CATCH, 20, "[DESIGN] the trigger is the momentum PATH, not release state");
check("well dwell (ms)", mc.dwellMs, 120, 220, "[DESIGN] arrival-or-170ms exit");
check("min distance to well during dwell", mc.minWellDist, 0, 0.12, "[DESIGN] the hesitation visibly happens AT the well");
check("land after release (ms, park metric)", mc.landMs, 400, 700, "[REG-LOCK] SAME landing metric as the live page (the 588-vs-406 cure)");
{
  // the momentum-projection truth table — falsifiable both ways
  const fast070 = F1.wellCrossing(0.70, -3.5, F1.WELL);
  check("fast fall from 0.70 catches", fast070 && Math.abs(fast070.v) >= F1.V_CATCH ? 1 : 0, 1, 1,
    "[DESIGN] the CRIT-F1 G3 counterexample now catches (|v| at well 3.05)");
  const upward = F1.wellCrossing(0.30, 2.0, F1.WELL);
  check("upward crossing reported (v sign)", upward && upward.v > 0 ? 1 : 0, 1, 1,
    "[DESIGN] helper honesty — direction-symmetric");
  const shallow = F1.wellCrossing(0.60, -0.35, F1.WELL);
  check("slow ease from 0.60 does NOT catch", shallow === null || Math.abs(shallow.v) < F1.V_CATCH ? 1 : 0, 1, 1,
    "[DESIGN] slow crossings pass to terminal snap, no catch");
  const away = F1.wellCrossing(0.40, -1.0, F1.WELL);
  check("motion away from the well: null", away === null ? 1 : 0, 1, 1, "[DESIGN]");
  const flick = F1.wellCrossing(1.0, -3.2, F1.WELL);
  check("flick-close (-3.2) does NOT catch", flick && Math.abs(flick.v) < F1.V_CATCH ? 1 : 0, 1, 1,
    "[DESIGN] |v| at well 1.85 < 2.2 — the C2 landing scenario stays clean with the well declared");
}

console.log("\n=== The intent law (G6): latch + projection window + hysteresis + idle decay ===");
{
  const j1 = F1.sims.jitter(1), j0 = F1.sims.jitter(0);
  check("held jitter flips (latch=1 start)", j1.flips, 0, 0, "[DESIGN] ±0.04 @ 6Hz dither never strobes");
  check("held jitter flips (latch=0 start)", j0.flips, 0, 0, "[DESIGN]");
  const sc = F1.sims.slowCross();
  check("slow cross flips exactly once", sc.flips, 1, 1, "[DESIGN] deliberate commit is one flip");
  check("slow cross final intent", sc.finalIntent, 1, 1, "[DESIGN]");
  const fi = F1.sims.flickIntent();
  check("fast flick commits early", fi.intent, 1, 1, "[DESIGN] projection lead survives the vbar filter");
  check("flick commit value < 0.5", fi.valueAtCommit, 0, 0.5, "[DESIGN] committed BEFORE crossing half");
}

console.log("\n=== spine C1 invariant: retarget continuity at the catch ===");
{
  const s = new F1.Spine().setRegister("ccClose");
  s.value = 1;
  s.glideTo(0, 0, -6);
  s.tick(0.33);
  const [xBefore, vBefore] = [s.value, s.velocity];
  s.setRegister("ccCatch").glideTo(1, 0.33);
  s.tick(0.33);
  const dx = Math.abs(s.value - xBefore), dv = Math.abs(s.velocity - vBefore);
  check("C1 position jump at retarget", dx, 0, 1e-9);
  check("C1 velocity jump at retarget", dv, 0, 1e-6);
}

console.log("\n=== rubber band: saturating hyperbolic law (design vocabulary — C1: ratio unmeasurable from this corpus) ===");
{
  const d1 = F1.rubber(100, 32), d2 = F1.rubber(10000, 32);
  check("rubber(100px, D=32) displaced", d1, 15, 25, "[DESIGN] resistive from the first px");
  check("rubber(10000px, D=32) < D", d2, 25, 32, "[DESIGN] saturates at D, never exceeds");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
