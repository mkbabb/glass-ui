// V-MORPHDOCK node battery — the composer→slider whole-body morph, provable without paint.
// verified-model: claude-fable-5. Extracts /*MORPHDOCK-PHYSICS-BEGIN*/../*MORPHDOCK-PHYSICS-END*/
// from index.html (the SAME block that drives paint). Run: node check.mjs
//
// BAND LAW (the house pattern): every gate names its source —
//   [MARKS-C 6.x] MARKS-C-APPS measured basis; [R-1]/[R-2] PASS-3 CHARTER rulings;
//   [LAW n] IOS27-CODEX; [DESIGN] design-law band; [STRUCT] structural assert on the file.
// THE DUEL VERDICT IS NOT DECIDED HERE — node proves each arm implements its mechanism
// honestly; no-detach is the WebKit VIDEO's row (PROBE-NOTES QUEUED-PAINT 1). QP-6/D4
// proved FLIP math exact in node while the live re-parent landed 1.00px off.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*MORPHDOCK-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*MORPHDOCK-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.MD = MORPHDOCK;", ctx, { filename: "morphdock-physics.js" });
const MD = ctx.MD;
const T = MD.tokens;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(9)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== the register (springPreset(\"dock\") — CHARTER R-1: {0.35, ζ0.82}) ===");
check("dock response", T.spring.response, 0.35, 0.35, "[R-1] the AMENDED row, 0.30→0.35; never a remembered literal");
check("dock zeta", T.spring.zeta, 0.82, 0.82, "[R-1] ζ dead-consistent 0.80–0.83 across eleven fits");
check("derived f_d (Hz)", MD.fd(T.spring.response, T.spring.zeta), 1.52, 1.7, "[R-1] dock-event bracket; 0.5724/0.35 = 1.635");

console.log("\n=== the nucleate-and-sweep (MARKS-C 6.2 — ~250ms, asymmetric edges) ===");
const s = MD.sims.sweep();
check("right edge t95 (ms)", s.t95Right, 0, 40, "[MARKS-C 6.2] right edge lands within ~33ms");
check("left edge t90 (ms)", s.t90Left, 100, 200, "[MARKS-C 6.2] left sweeps over ~170ms");
check("width overshoot (%)", s.overshootPct, 0.2, 1.2, "[MARKS-C 6.2] +0.7% class; [R-1] zero-seed fence 1.1%");
check("overshoot peak time (ms)", s.peakT, 260, 340, "[MARKS-C 6.2] width peaks ~300ms after nucleation");
check("relax after peak (ms)", s.relaxMs, 60, 200, "[MARKS-C 6.2] absorbed over ~150ms");
check("width within 1% by (ms)", s.within1pct, 150, 320, "[MARKS-C 6.2] total morph ≈250ms class");
check("fill never under the capsule floor (px)", s.minW, T.trackH - 2 * T.fillInset, 9999, "[MARKS-C 6.2/law 12] min fill ≈ its own height — never past a circle");

console.log("\n=== the evaporation dismissal (MARKS-C 6.2 + law 8 asymmetry) ===");
const e = MD.sims.evaporate();
check("fill evaporation t90 (ms)", e.t90, 0, 33, "[MARKS-C 6.2] fill gone across two frames (≤33ms)");
const lf = MD.sims.labelFlight();
check("label flight home t90 (ms)", lf.t90, 60, 110, "[MARKS-C 6.2] ~70–100ms label flight, dead landing");
check("label return zeta", T.labelReturn.zeta, 1.0, 1.0, "[DESIGN] fired return is critically damped — no bounce on exit");
const asym = MD.sims.asymmetry();
check("dismiss/deploy ratio", asym.ratio, 0, 0.6, "[LAW 8] exits are front-loaded, never the entry's mirror");

console.log("\n=== law 12 detents — labels snap, fill scrubs ===");
const d = MD.sims.scrubSim();
check("label changes across full scrub", d.changes, 2, 2, "[LAW 12] one change per detent boundary, exactly");
check("boundary crossing error (frac)", d.boundaryErr, 0, 0.02, "[LAW 12] labels flip AT the midpoint crossings");
check("fill max step per frame (frac)", d.maxStep, 0, 0.02, "[LAW 12] the fill tracks the finger continuously");
check("min fill during scrub (px)", d.minFill, T.trackH - 2 * T.fillInset, 9999, "[MARKS-C 6.2] the capsule floor holds under scrub too");

console.log("\n=== law 7(c) velocity projection + the D2 still-hold age-out ===");
check("slow release at 0.40 lands", MD.detentTarget(0.40, 0, 0), T.detents[1], T.detents[1], "[LAW 7c] nearest detent, zero velocity");
check("flick from 0.30 at +2.5/s lands", MD.detentTarget(0.30, 2.5, 0), 1.0, 1.0, "[LAW 7c] flicks SKIP the middle detent");
check("flick from 0.90 at −3.0/s lands", MD.detentTarget(0.90, -3.0, 0), T.detents[0], T.detents[0], "[LAW 7c] both directions");
check("still hold 240ms then release", MD.detentTarget(0.40, 2.5, 240), T.detents[1], T.detents[1], "[D2 lesson] a still finger's velocity is ZERO — no false fling");

console.log("\n=== the C1 catch (pointerdown mid-morph seizes value AND velocity) ===");
// [P4-AGG A3] the tautology gate (copy-vs-itself, always 0) is DEAD; these can fail.
const c = MD.sims.catchSim();
check("catch is mid-flight (the sim can distinguish)", c.midFlight, 1, 1, "[STRUCT] the dead ternary cured — a settled catch fails here");
check("first post-catch frame step (px)", c.firstFrameStep, 0.5, 80, "[DESIGN] flight-speed class — the seized flight CONTINUES");
check("catch step / teleport-foil ratio", c.ratio, 0, 0.35, "[A3] the pre-cure hard-set is the foil (ratio ≈ 1) — a revert fails");

console.log("\n=== the interrupt law (B-1 cure: dismissal kills the engage writers) ===");
const gI = MD.sims.interruptSim(true), bI = MD.sims.interruptSim(false);
check("guarded interrupt: label settles (ms)", gI.settledMs, 20, 600, "[B-1 cure] single writer — the return lands dead");
check("orphan foil deadlocks (the convicted class)", Number.isFinite(bI.settledMs) ? 0 : 1, 1, 1, "[B-1] two writers alternate on labelY at 100Hz and NEVER settle — the negative control");

console.log("\n=== law 12 value truth on re-engage + every xR writer (A4) ===");
check("re-engage at Low sweeps to the VALUE (px)", MD.engageTargetR(0.22), 118, 120, "[LAW 12] fill length == value — the void-targetR dead knob is deleted");
check("re-engage at High sweeps to full (px)", MD.engageTargetR(1.0), 512, 512, "[LAW 12]");
check("engage target honors the capsule floor (px)", MD.engageTargetR(0), 48, 48, "[MARKS-C 6.2] fillL + max(0, trackH − 2·inset)");

console.log("\n=== law 20 envelope + the light-first press-ack ===");
const env = MD.sims.envelope();
check("light lead before geometry (ms)", env.lightLeadMs, 30, 80, "[MARKS-C-MUSIC 1] press light ~50ms before geometry");
check("envelope attack t90 (ms)", env.attackT90, 120, 200, "[LAW 20] peak ~+160ms class");
check("sustain at +2s hold", env.sustainAt2s, 0.99, 1.0, "[LAW 20] engagement light is STATE, not event");
check("envelope release t90 (ms)", env.releaseT90, 200, 320, "[LAW 20] release ~250ms on the envelope's own clock");
check("idle light term", env.idle, 0, 0, "[DESIGN M3] ZERO idle engagement light — canon");

console.log("\n=== the duel descriptors (by construction; the page arms implement these) ===");
check("arm 3 bodies mid-morph", MD.arms.morph.bodies, 1, 1, "[MARKS-C 6.5] TRANSFORMATION, not fission — one glass body");
check("arm 3 label re-parents", MD.arms.morph.reparents, 0, 0, "[MARKS-C 6.5] the label carried as a continuous element");
check("arm 3 label clones", MD.arms.morph.clone, 0, 0, "[MARKS-C 6.5] identity, not resemblance");
check("arm 1 bodies mid-morph", MD.arms.flip.bodies, 2, 2, "[DUEL] the FLIP foil is honestly two-bodied");
check("arm 1 label re-parents", MD.arms.flip.reparents, 1, 1, "[DUEL] the re-parent is the hazard the video judges (D4 kin)");
check("arm 2 label clones", MD.arms.growth.clone, 1, 1, "[DUEL] crossfade continuity is resemblance — stated");
const lc = MD.sims.labelContinuity();
check("arm-3 label max step / travel", lc.frac, 0, 0.25, "[DESIGN] no teleport frame on the same-node lift");
check("FLIP node math residual (px)", MD.flipMath({ x: 100, y: 500 }, { x: 260, y: 360 }), 0, 1e-9, "[QP-6] node FLIP is exact — the LIVE 1.00px gap is the duel's point");

console.log("\n=== structural asserts (mechanism discipline read from the file) ===");
{
  const layerCount = (html.match(/class="halo-layer halo-b\d"/g) || []).length;
  check("halo stacks are 3 layers x 3 arenas", layerCount, 9, 9, "[STRUCT] sigma decays outward (10/6/3) — the §3.5-E recipe");
  const sigmas = [...html.matchAll(/halo-b(\d)\s*{\s*[^}]*?backdrop-filter:\s*blur\((\d+)px\)/g)].map((x) => +x[2]);
  check("halo sigma set {10,6,3}", new Set(sigmas).size === 3 && sigmas.includes(10) && sigmas.includes(6) && sigmas.includes(3) ? 1 : 0, 1, 1, "[MARKS-C 6.3] sigma-peak ~10px, Gaussian-class falloff");
  const haloClock = /\.halo-layer\s*{[^}]*opacity:\s*calc\(var\(--md-t/.test(html) ? 1 : 0;
  check("halo opacity rides var(--md-t)", haloClock, 1, 1, "[MARKS-C 6.3] ONE channel ONE clock — the blur is the morph's shadow");
  const haloDim = /halo-layer[^}]*background/.test(html) ? 1 : 0;
  check("halo carries no luminance term", haloDim, 0, 0, "[MARKS-C 6.3] NO SCRIM — luminance LOCKED 0.99–1.01");
  const animatedBlur = /transition[^;]*backdrop-filter|animation[^;]*backdrop-filter/.test(html) ? 1 : 0;
  check("zero animated blur radii", animatedBlur, 0, 0, "[STRUCT] only opacity animates (safari-arm law)");
  const masksAnimate = /transition[^;]*mask|animation[^;]*mask/.test(html) ? 1 : 0;
  check("masks never animate", masksAnimate, 0, 0, "[STRUCT] static annulus masks");
  check("no @supports gate anywhere", /@supports/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no SVG filter on any path", /feTurbulence|filter:\s*url\(/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the F5 fence law — the retired arm stays retired");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the WebKit-killing trap");
  check("PRM branch present", /prefers-reduced-motion/.test(html) ? 1 : 0, 1, 1, "[STRUCT] single-step state relay");
  check("hud=0 switch present", /hud=0/.test(html) ? 1 : 0, 1, 1, "[STRUCT] instrumentation-off for the browser arm");
  check("fill revealed by clip-path inset", /clipPath = `inset\(/.test(html) ? 1 : 0, 1, 1, "[STRUCT] clip-reveal, not animated scale (U7 mitigation b)");
  check("engagement light is 42-degree cream", /hsl\(42 85% 88%\)/.test(html) ? 1 : 0, 1, 1, "[DESIGN M3] the canon engagement hue");
  check("no idle specular anywhere", /specular/i.test(html) ? 1 : 0, 0, 0, "[DESIGN M3] idle specular NONE");
  // [P4-AGG 2026-07-19] the B-1/A3/A4/A6 wiring locks — the cures cannot silently revert
  check("void targetR dead knob deleted", /void targetR/.test(html) ? 1 : 0, 0, 0, "[A4]");
  const pm = html.split('addEventListener("pointermove"')[1]?.split("addEventListener(")[0] || "";
  check("scrub never hard-sets the left edge", /st\.sL\.x\s*=/.test(pm) ? 1 : 0, 0, 0, "[A3] the ~140px teleport class is wiring-locked out");
  check("generation guards on every drive", (html.match(/g !== st\.gen/g) || []).length, 11, 11, "[B-1] the assembly A5 pattern — one guard per writer callback");
  check("both intent wrappers bump the generation", (html.match(/st\.gen\+\+/g) || []).length, 2, 2, "[B-1] engage() + dismiss(), before any branch");
  check("keyboard path stamps the geometry", /st\.xR = MD\.engageTargetR\(st\.frac\); stampClip/.test(html) ? 1 : 0, 1, 1, "[A4] value-truth on the a11y path");
  const pu = html.split('addEventListener("pointerup"')[1] || "";
  check("PRM detent release lands single-step", /if \(prm\.matches\)/.test(pu) ? 1 : 0, 1, 1, "[A6] no glide drive under PRM");
  const arenas = html.split("<section").slice(1);
  check("empty detents read as dots (dots under the fill)", arenas.length === 3 && arenas.every((a) => a.indexOf('class="dots"') < a.indexOf('class="fill"')) ? 1 : 0, 1, 1, "[MARKS-C 6.2 note 3] the fill occludes covered dots");
  check("one clamp source for every xR writer", (html.match(/MD\.engageTargetR\(/g) || []).length >= 5 ? 1 : 0, 1, 1, "[LAW 12] the self-gating minFill mirror is retired as the wiring's proof");
}

console.log("\n=== CSS<->JS cross-checks (the hand-mirror cannot drift — MECH M7 kin) ===");
{
  const cssTrackW = +(html.match(/--track-w:\s*(\d+)px/) || [])[1];
  const cssTrackH = +(html.match(/--track-h:\s*(\d+)px/) || [])[1];
  const cssTrackR = +(html.match(/--track-r:\s*(\d+)px/) || [])[1];
  const cssInset = +(html.match(/--fill-inset:\s*(\d+)px/) || [])[1];
  const cssFillR = +(html.match(/--fill-r:\s*(\d+)px/) || [])[1];
  check("CSS --track-w equals tokens.trackW", Math.abs(cssTrackW - T.trackW), 0, 0, "[STRUCT]");
  check("CSS --track-h equals tokens.trackH", Math.abs(cssTrackH - T.trackH), 0, 0, "[STRUCT]");
  check("capsule law r = h/2", Math.abs(cssTrackR - cssTrackH / 2), 0, 0, "[LAW 4] deft rounding — track capsule");
  check("concentric law: fill r = outer − inset", Math.abs(cssFillR - (cssTrackR - cssInset)), 0, 0, "[LAW 4] inner radius = outer − padding");
  check("tokens mirror the CSS geometry", Math.abs(T.fillInset - cssInset) + Math.abs(T.fillR - cssFillR), 0, 0, "[STRUCT] one geometry, two readers");
  const warmLight = /rgba\(250,\s*246,\s*236/.test(html) ? 1 : 0;
  check("§3.5-A light-arm tint painted", warmLight, 1, 1, "[DESIGN M3] warm cream, the ONE canon");
  const warmDark = /rgba\(56,\s*50,\s*44/.test(html) ? 1 : 0;
  check("§3.5-A dark-arm tint painted", warmDark, 1, 1, "[DESIGN M3] warm charcoal, R>B — never blue-black");
  const labelNodes = (html.match(/class="md-label"/g) || []).length;
  check("one authored label node per arm", labelNodes, 3, 3, "[STRUCT] arm-3 continuity is same-NODE; the clone exists only in arm-2 JS");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
