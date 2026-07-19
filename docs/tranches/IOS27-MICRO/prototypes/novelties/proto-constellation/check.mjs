// PROTO-CONSTELLATION — node logic check.
// verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-1.
// Extracts the /*PC-PHYSICS-BEGIN*/../*PC-PHYSICS-END*/ block from index.html (the SAME code
// that drives paint) and asserts the deterministic sims. Run: node check.mjs
//
// BAND LAW (the pass-2 discipline, cures-F1 G2): every gate names its source —
//   [LAW n]      an IOS27-CODEX law constant (measured corpus, `IOS27-CODEX.md`);
//   [MARKS ...]  derived from the corpus read (incl. PASS-2 CORRECTIONS C1-C7);
//   [DESIGN]     a design-law band (roster card / suffusion policy), corpus-silent;
//   [REG-LOCK]   a drift lock on the adopted register constants — NOT corpus truth.
// A sim value is a point inside its band, never the band's author.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*PC-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*PC-PHYSICS-END\*\//);
if (!m) {
  console.error("FAIL: physics block markers not found in index.html");
  process.exit(1);
}
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.PC = PC;", ctx, { filename: "pc-physics.js" });
const PC = ctx.PC;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name.padEnd(42)} ${String(typeof value === "number" ? +value.toFixed(4) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`,
  );
  return ok;
}
const bool = (v) => (v ? 1 : 0);

console.log("=== V-CONST — the posture machine (collapse ~330ms, law 16a; bands as banded transfers) ===");
{
  const c = PC.sims.collapse(-35);
  check("collapse t90 (ms)", c.t90Ms, 300, 360, "[LAW 16a] collapse ~330ms; register (0.53, z1.00) [REG-LOCK]");
  check("labels faded by (ms)", c.lblDoneMs, 55, 90, "[LAW 16a] labels lead ~80ms (LBL band [0,.20])");
  check("gird lag (ms)", c.girdLagMs, 85, 115, "[DESIGN] F3 desync ~100ms as the GIRD band edge (.33)");
  check("width condensation window (ms)", c.widthWinMs, 150, 210, "[REG-LOCK] ~180ms fired (WIDTH [.45,.88])");
  check("chip overshoot, hot seed -35", c.chipOvershoot, 0.01, 0.10, "[MARKS C2] velocity-bought; fence <=10% [DESIGN]");
  const c0 = PC.sims.collapse(0);
  check("chip overshoot, zero seed", c0.chipOvershoot, 0, 1e-9, "[MARKS C2] zero-seed lands dead — overshoot never intrinsic");
  // the fence holds AT THE SEED CAP, not by clamping paint
  const f = PC.criticalSampler(PC.CHIP.w, 1, PC.chipSeed(-1e6), 0);
  let worst = 0;
  for (let t = 0; t < 1.2; t += 0.0005) { const [x] = f(t); if (-x > worst) worst = -x; }
  check("chip overshoot at the seed cap", worst, 0.05, 0.10, "[DESIGN] the <=10% fence enforced at the seed (capC 18)");
}

console.log("\n=== Displacement + intent gates (law 16a: 100-150px velocity-agnostic; rebound never re-expands) ===");
{
  const d = PC.sims.dispGate();
  check("gate fire threshold (px)", PC.DISP.fire, 100, 150, "[LAW 16a] displacement ~100-150px");
  check("fired disp @60px/s", d.disps[0], 119.9, 123.5, "[LAW 16a] velocity-agnostic");
  check("fired disp @3000px/s", d.disps[2], 119.9, 123.5, "[LAW 16a] velocity-agnostic");
  check("disp spread across 60..3000px/s (px)", d.spread, 0, 3.5, "[LAW 16a] the gate ignores velocity (integration grain only)");
  const r = PC.sims.reexpand();
  check("sustained up-drag at top re-expands", bool(r.sustained), 1, 1, "[LAW 16a] the intent gate");
  check("momentum rebound refused", bool(r.rebound), 0, 0, "[LAW 16a] rebound NEVER re-expands");
  check("too-short hold refused", bool(r.tooShort), 0, 0, "[DESIGN] sustain >=150ms");
  check("up-drag not at top refused", bool(r.notAtTop), 0, 0, "[LAW 16a] arriving at top is part of the gate");
}

console.log("\n=== Backdrop census + law-17 continuity ===");
{
  const cen = PC.sims.census();
  check("census max (backdrop surfaces)", cen.max, 0, 3, "[DECLARED] the design table's regression lock — architectural, proven live at QP-9, not machinery (M3 relabel)");
  check("FUSED settles to ONE surface", cen.fused, 1, 1, "[DECLARED] the chip SHARES the main body's surface — ditto");
  const k = PC.sims.continuity();
  check("posture transitions actually ran", k.flips, 4, 4, "[STRUCT] the M3 cure: the scripted choreography is no longer an empty loop");
  check("continuity carrier resets", k.resets, 0, 0, "[LAW 17] marquee offset survives every fission");
  check("badge survives", k.badge, 3, 3, "[LAW 17] identity continuity");
  check("carrier step error", k.maxStepErr, 0, 1e-9, "[LAW 17] posture morphs never touch the carrier — asserted WHILE four glides run");
}

console.log("\n=== V-TIMELINE — one body, one spine (C0 geometry; detents law 7b/7c; seat law 14a-kin) ===");
{
  const s = PC.sims.seam();
  check("rect C0 max step (px @ dt=5e-4)", s.maxStep, 0, 0.75, "[DESIGN] no handoff seam anywhere on the spine");
  check("segment-boundary jump (px)", s.boundaryJump, 0, 1e-5, "[DESIGN] both segments share R1 exactly");
  const rh = PC.sims.rehomeExact();
  check("FLIP re-home round-trip error (px)", rh.maxErr, 0, 1e-9, "[DESIGN] the no-detach decider's math half");
  const fy = PC.sims.ferry();
  check("slow release near mid -> card", fy.slowTarget, 0.5, 0.5, "[LAW 7c] target = detentNearest(t + v*tau), tau 0.2");
  check("flick up from t=0.2 skips the card", fy.flickUpTarget, 1, 1, "[LAW 7c] flicks skip intermediate detents");
  check("flick down from t=0.9 skips the card", fy.flickDownTarget, 0, 0, "[LAW 7c]");
  check("edge-detent overshoot (hot seed grid)", fy.edgeOver, 0, 1e-9, "[LAW 7b] edges critically damped, NO overshoot; the clamp eats the seed [LAW 14c]");
  check("interior detent overshoot (frac of step)", fy.interiorOvershootFrac, 0.01, 0.035, "[LAW 7b] interior ~2%");
  check("interior recovery from peak (ms)", fy.recoveryMs, 100, 190, "[REG-LOCK] (0.42, z0.78); codex 'recovered ~100ms' is the video-read kin");
  const st = PC.sims.seatStability();
  check("seat settle min (s), seeds ±3.2/s", st.minS, 0.60, 0.70, "[LAW 14a kin] duration-stable snap (corpus 650-683ms) [REG-LOCK w=10.5]");
  check("seat settle max (s)", st.maxS, 0.66, 0.75, "[LAW 14a kin]");
  check("seat settle spread (s)", st.spreadS, 0, 0.075, "[LAW 14a] duration-stable: spread ~60ms across seeds");
  const cc = PC.sims.catchC1();
  check("catch C1 position jump", cc.dx, 0, 1e-9, "[DESIGN] everything catchable mid-flight, C1");
  check("catch C1 velocity jump", cc.dv, 0, 1e-6, "[DESIGN]");
}

console.log("\n=== Ladder purity (position-mapped truth, MARKS §6: the ladder is a pure function of the spine) ===");
{
  const lp = PC.sims.ladderPurity();
  check("page ladder purity (max deviation)", lp.pageMaxD, 0, 1e-12, "[MARKS §6] fraction-keyed truth — scrub-reversible by construction");
  check("blackdock ladder purity", lp.bdMaxD, 0, 1e-12, "[MARKS §6]");
  const pl1 = PC.pageLadder(1), pl0 = PC.pageLadder(0);
  check("page ladder complete at t=1", Math.min(...pl1), 1, 1, "[DESIGN] every rung lands");
  check("page ladder empty at t=0", Math.max(...pl0), 0, 0, "[DESIGN]");
  const bl1 = PC.bdLadder(1), bl0 = PC.bdLadder(0);
  check("blackdock ladder complete at g=1", Math.min(...bl1), 1, 1, "[DESIGN]");
  check("blackdock ladder empty at g=0", Math.max(...bl0), 0, 0, "[DESIGN]");
}

console.log("\n=== V-BLACKDOCK — the inverted growth grammar + the black register ===");
{
  const b = PC.sims.blackGeometry();
  check("top-edge travel (px, 200 samples)", b.topDelta, 0, 1e-9, "[DESIGN] anchored top — the growth grammar orientation-free");
  check("bottom travel monotone in g", bool(b.monotone), 1, 1, "[DESIGN] one clip-path growth channel");
  check("side breathe (%)", b.breathePct, 4, 5, "[MARKS §1] +4-5% (roster card 7)");
  check("bottom travel (px)", b.travelPx, 248 - 1e-9, 248 + 1e-9, "[REG-LOCK] geometry 52->300");
  check("black fill alpha", PC.BLACK.fillAlpha, 0.65, 0.75, "[DESIGN] ~70% black floor — never opaque paint [LAW 2/13]");
  check("black blur < container tier (px)", PC.BLACK.blurPx, 1, PC.BLACK.containerBlurPx - 1e-9, "[DESIGN] low ghosting under the container tier 22");
  check("non-modal dim cap", PC.BLACK.dimCap, 0, 0.2, "[LAW 18] taps beneath still navigate — a handshake, not a scrim");
}

console.log("\n=== R-MOMENTUM — release-velocity-seeded, depth-graded content entry ===");
{
  const mo = PC.sims.momentum();
  check("amp fraction at v=0 (the floor)", mo.ampFrac0, 0.549, 0.551, "[DESIGN] placed drawers still enter, calm");
  check("amp fraction at v=3", mo.ampFrac3, 0.93, 0.96, "[DESIGN] amp = 0.55+0.45*tanh(|v|/2.2)");
  check("amp monotone in |v|", bool(mo.monotone), 1, 1, "[DESIGN] the drawer's energy is the content's energy");
  check("zero-seed overshoot", mo.zeroOver, 0, 0.002, "[MARKS C2] zero-seed lands dead (provision 8)");
  check("flick v=3 overshoot (frac of amp)", mo.over3, 0.02, 0.095, "[MARKS C2] velocity-bought, 2-9.5%");
  check("overshoot at any v (the fence)", mo.overMax, 0, 0.098, "[DESIGN] <=10% enforced AT THE SEED (capC 12.5)");
  check("flick v=3 zero-crossings", mo.crossings3, 1, 1, "[LAW 14c] one overshoot, no second bounce");
  check("flick v=3 settle (ms, 0.5px metric)", mo.settle3Ms, 250, 400, "[REG-LOCK] w = 2pi/0.40 critical");
  check("depth grading row2/row0", mo.depthRatio, 1.399, 1.401, "[MARKS:215] deeper rows travel ~20% farther/row");
  check("stagger overlap", mo.overlap, 0.617, 0.619, "[DESIGN] 1/phi");
  check("N7 one-hop: row px <= driver px", mo.n7Ratio, 0, 1, `[DESIGN N7] row ${mo.rowPx.toFixed(2)}px vs driver ${mo.driverPx.toFixed(2)}px`);
}

console.log("\n=== Spine honesty — scrub velocity estimator + registers on disk ===");
{
  const s = new PC.Spine("posture");
  s.beginScrub(0);
  for (let i = 1; i <= 40; i++) s.scrubTo(0.01 * i * 2, i * 0.01); // slope 2/s over 0.4s
  check("LSQ scrub velocity (linear drag, /s)", s.velocity, 1.99, 2.01, "[DESIGN] release velocity is the seam's truth");
  check("dock register response on disk", PC.REG.dock.response, 0.30, 0.30, "[REG-LOCK] corpus-true dock row (0.30, z0.82)");
  check("dock register zeta on disk", PC.REG.dock.zeta, 0.82, 0.82, "[REG-LOCK]");
  check("posture register response", PC.REG.posture.response, 0.53, 0.53, "[REG-LOCK] t90 ~330ms under critical damping");
  check("ferry projection tau (s)", PC.PROJ_TAU, 0.2, 0.2, "[LAW 7c] tau ~0.2s");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
