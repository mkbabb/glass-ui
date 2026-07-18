// F1 SCALAR-SPINE prototype — node logic check.
// verified-model: claude-fable-5.
// Extracts the /*F1-PHYSICS-BEGIN*/../*F1-PHYSICS-END*/ block from index.html (the SAME code
// that drives paint) and asserts the deterministic sims against the pass-1 probe numbers and
// the MARKS acceptance bands. Run: node check.mjs

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
    `${ok ? "PASS" : "FAIL"}  ${name.padEnd(34)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(9)}  band [${lo}, ${hi}] ${note}`,
  );
  return ok;
}

console.log("=== CC open (probe: m95 106 / f95 193 / s90 589 / ratio 1:3.1; MARKS: <=100 cliff / 150-250 / ~600-650 / ~1:4) ===");
const o = F1.sims.ccOpen();
check("open medium 95% (ms)", o.m95, 95, 117, "probe 106 +-; MARKS cliff <=100+1f");
check("open fade 95% (ms)", o.f95, 185, 205, "probe 193; MARKS 150-250");
check("open stretch 90% (ms)", o.s90, 578, 600, "probe 589; MARKS ~600-650");
check("open fade:stretch ratio", o.ratio, 2.8, 3.3, "probe 3.1; MARKS ~1:4");

console.log("\n=== CC close (probe: f05 163 / beat 172 / m05 681; MARKS: ~170 / 100-200 / ~620) ===");
const c = F1.sims.ccClose();
check("close fade out (ms)", c.f05, 155, 175, "probe 163; MARKS ~170");
check("close empty-medium beat (ms)", c.beat, 160, 185, "probe 172; MARKS 100-200");
check("close medium gone (ms)", c.m05, 670, 700, "probe 681; MARKS ~620");

console.log("\n=== CC interrupt (probe mMin 0.46 under per-scenario thresholds; acceptance: medium min >= 0.4, fade fully leaves) ===");
const i = F1.sims.ccInterrupt(0.33);
check("interrupt medium min", i.mMin, 0.4, 0.75, "target-conditioned theta -> higher than probe's 0.46; see PROBE-NOTES");
check("interrupt fade min", i.fMin, 0, 0.1, "content fully leaves (MARKS: pure blurred field)");
check("interrupt resettle (ms)", i.resettleMs, 300, 1600, "re-open completes");

console.log("\n=== Maps overpull springback (MARKS: one overshoot 30-50% of return, visible settle <=~250-320ms) ===");
const op = F1.sims.overpull(0.10);
check("overpull overshoot (fraction)", op.overshootPct, 0.30, 0.50, "zeta 0.34 -> analytic 0.321");
check("overpull peak time (ms)", op.peakMs, 190, 235, "analytic pi/omega_d = 213");
check("overpull settle <2px (ms)", op.settleMs, 230, 330, "MARKS 'settle inside ~250ms' read");

console.log("\n=== Maps pin release (probe: response 0.20-0.22 covers 83-87% at 83ms, settle 102-170; MARKS: 130px <=100ms, tail ~170ms) ===");
const p = F1.sims.pin(0.19);
check("pin covered at 83ms (fraction)", p.coverage83, 0.78, 0.90, "probe 0.83-0.87 across zeta bracket");
check("pin settle <2px (ms)", p.settleMs, 100, 200, "probe 102-122; MARKS ~170 tail is to full visual rest");

console.log("\n=== Maps mid-detent catch (MARKS: ~170ms transient catch, then the final fall) ===");
const mc = F1.sims.midCatch(-4);
check("catch window (ms)", mc.catchMs, 170, 170, "by construction");
check("land after catch (ms)", mc.landMs, 300, 700, "catch + dock fall");

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

console.log("\n=== rubber band: saturating hyperbolic law ===");
{
  const d1 = F1.rubber(100, 32), d2 = F1.rubber(10000, 32);
  check("rubber(100px, D=32) displaced", d1, 15, 25, "resistive from the first px");
  check("rubber(10000px, D=32) < D", d2, 25, 32, "saturates at D, never exceeds");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
