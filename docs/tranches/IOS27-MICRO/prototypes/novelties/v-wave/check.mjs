// V-WAVE node battery — the waveform-register invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*WAVE-PHYSICS-BEGIN*/../*WAVE-PHYSICS-END*/
// from index.html (the SAME code that drives paint). Run: node check.mjs
//
// BAND LAW: [MARKS §n] corpus-derived; [DESIGN] design-law band (roster card 5 /
// SUFFUSION §3.1 / codex laws 5, 11, 13); [REG-LOCK] regression lock; [STRUCT]
// structural file assert. Paint truth is QUEUED-PAINT (PROBE-NOTES.md).

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*WAVE-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*WAVE-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, JSON, Array, Set, console });
vm.runInContext(m[1] + "\nthis.WAVE = WAVE;", ctx, { filename: "wave-physics.js" });
const WAVE = ctx.WAVE;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== three sources, ONE shape (SUFFUSION §3.1 #2 — the FAC fold) ===");
const os = WAVE.sims.oneShape();
check("adapters publish the same keys", os.keysEqual, 1, 1, "[DESIGN] { level } and nothing else — the organ cannot tell");
check("same level -> same bar targets", os.sameTargets, 1, 1, "[DESIGN] the source is invisible past the adapter");
check("all adapter outputs bounded [0,1]", os.bounded, 1, 1, "[DESIGN] one shape, one domain");

console.log("\n=== meter ballistics (the honest 'I hear you' relay) ===");
const b = WAVE.sims.ballistics();
check("attack t90 (ms)", b.attackT90, 60, 160, "[DESIGN] the relay answers inside a tenth of a second");
check("release t10 (ms)", b.releaseT10, 380, 620, "[DESIGN] the energy drains, it does not vanish");
check("release slower than attack (ratio)", b.releaseT10 / b.attackT90, 2.5, 10, "[DESIGN] the asymmetric-envelope class");

console.log("\n=== the detuned rack (codex law 5: center leads, edges lag) ===");
const lag = WAVE.sims.barLag();
check("edge lags center at 50% arrival (ms)", lag.lagMs, 40, 200, "[DESIGN] ~100ms lag class — never one shared clock");
const cc = WAVE.sims.catchContinuity();
check("max per-frame jump across a retarget", cc.maxJump, 0, 0.05, "[DESIGN] state pair (value, velocity) — C1 at every seam");

console.log("\n=== the kernel (deterministic structure — never a fake spectrum) ===");
const k = WAVE.sims.kernelShape();
check("peak is centered", k.peakCentered, 1, 1, "[DESIGN] raised cosine, one degree of freedom displayed");
check("mirror symmetry error", k.symErr, 0, 1e-9, "[DESIGN] deterministic — identical every run");
check("monotone falloff violations", k.nonMono, 0, 0, "[DESIGN] no noise dressed as signal");
const h = WAVE.sims.honesty();
check("zero level -> every bar at the floor", h.silentAtZero, 1, 1, "[DESIGN] I-row law — the skeleton never performs");

console.log("\n=== the park discipline (one rAF while live, ZERO at rest — R3b) ===");
const p = WAVE.sims.park();
check("park after session end (ms)", p.parkMs, 400, 2500, "[DESIGN] level drains + every spring settles, then the rAF dies");
check("all bars at the rest floor after park", p.allAtFloor, 1, 1, "[DESIGN] a quiet baseline, not a lie");

console.log("\n=== the keyboard law + PRM (deterministic preset; stepped chip) ===");
const kc = WAVE.sims.keyboardChurn();
check("keyboard churn overshoot (v0=0)", kc.overshoot, 0, 0.001, "[DESIGN] overshoot is earned — a dead seed lands dead");
check("keyboard churn settles (ms)", kc.settleMs, 300, 1500, "[DESIGN] a finite, bounded ritual");
const pr = WAVE.sims.prm();
check("PRM chip steps", pr.steps, 3, 8, "[DESIGN] a static level chip, stepped — state still arrives");
check("quantization is exact", pr.quantized, 1, 1, "[DESIGN] steps, never a smooth performance");

console.log("\n=== the law-13 register + law-11 idle (tokens stamped from physics) ===");
check("capsule black fill", WAVE.tokens.capsuleBlack, 0.6, 0.8, "[DESIGN] codex law 13 — ~70% black, a luminance floor");
check("capsule blur (px) — LOW, content ghosts", WAVE.tokens.blurPx, 4, 10, "[DESIGN] law 13 — low backdrop ghosting");
check("idle breath peak", WAVE.tokens.breathPeak, 0.1, 0.2, "[DESIGN] law 11 — peak ~+16% over ground");
check("idle breath period (s)", WAVE.tokens.breathPeriodS, 4, 12, "[DESIGN] law 11 — slowest visible change wins");
{
  const cssBlack = +(html.match(/\.capsule\s*{[^}]*background:\s*rgba\(10,\s*12,\s*15,\s*([\d.]+)\)/) || [])[1];
  check("CSS capsule fill equals the token", Math.abs(cssBlack - WAVE.tokens.capsuleBlack), 0, 1e-9, "[STRUCT] single source");
  const cssBlur = +(html.match(/\.capsule\s*{[^}]*backdrop-filter:\s*blur\((\d+)px\)/s) || [])[1];
  check("CSS capsule blur equals the token", Math.abs(cssBlur - WAVE.tokens.blurPx), 0, 0, "[STRUCT]");
  const breath = html.match(/@keyframes breath[\s\S]*?10%\s*{\s*opacity:\s*([\d.]+)/);
  check("CSS breath peak equals the token", breath ? Math.abs(+breath[1] - WAVE.tokens.breathPeak) : 9, 0, 1e-9, "[STRUCT] the law-11 amplitude, stamped once");
  const period = +(html.match(/animation:\s*breath\s+(\d+)s/) || [])[1];
  check("CSS breath period equals the token (s)", Math.abs(period - WAVE.tokens.breathPeriodS), 0, 0, "[STRUCT]");
}

console.log("\n=== structural asserts (mechanism discipline; comments stripped) ===");
{
  const code = html.replace(/<!--[\s\S]*?-->/g, "");
  check("bar count fixed and <= 24", WAVE.N, 1, 24, "[DESIGN] roster card 5 bound");
  const buildLoop = /for \(let i = 0; i < WAVE\.N; i\+\+\)/.test(code) ? 1 : 0;
  check("rack built once from WAVE.N", buildLoop, 1, 1, "[STRUCT] fixed count, widths static");
  const scaleOnly = /style\.transform = `scaleY\(/.test(code) ? 1 : 0;
  check("bars move by scaleY transform only", scaleOnly, 1, 1, "[STRUCT] transform-only hot path");
  const layoutWrites = /\.style\.(height|width)\s*=/.test(code.replace(/chipFill\.style\.width[^;]*;/g, "")) ? 1 : 0;
  check("no bar layout writes (height/width)", layoutWrites, 0, 0, "[STRUCT] the chip (PRM organ) is the one licensed width");
  const layoutReads = /getBoundingClientRect|offsetWidth|offsetHeight|getComputedStyle/.test(code) ? 1 : 0;
  check("zero per-frame layout reads", layoutReads, 0, 0, "[STRUCT] nothing measures the DOM, ever");
  check("no Math.random anywhere", /Math\.random/.test(code) ? 1 : 0, 0, 0, "[STRUCT] honesty — deterministic physics only");
  check("no setInterval polling", /setInterval/.test(code) ? 1 : 0, 0, 0, "[STRUCT] event-scoped clocks only");
  const analyserScoped = /createAnalyser\(\)/.test(code) && /getTracks\(\)\.forEach\(\(t\) => t\.stop\(\)\)/.test(code) && /audioCtx\.close\(\)/.test(code) ? 1 : 0;
  check("AnalyserNode session-scoped (created+closed)", analyserScoped, 1, 1, "[STRUCT] the rAF and the mic live and die with the session");
  const honestDenial = /mic unavailable/.test(code) ? 1 : 0;
  check("mic denial is honest silence", honestDenial, 1, 1, "[STRUCT] never fake signal on failure");
  check("no @supports gate", /@supports/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no SVG filter on the hot path", /feTurbulence|filter:\s*url\(/.test(code) ? 1 : 0, 0, 0, "[STRUCT]");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the WebKit shadow trap");
  const prmBranches = (code.match(/prefers-reduced-motion/g) || []).length;
  check("PRM branches (CSS rack-hide + chip + JS)", prmBranches, 3, 9, "[STRUCT] the chip IS the PRM organ");
  const rackHidden = /@media \(prefers-reduced-motion: reduce\)\s*{\s*\.rack\s*{\s*display:\s*none/.test(code) ? 1 : 0;
  check("PRM hides the rack (no motion organ)", rackHidden, 1, 1, "[STRUCT] a static level chip replaces it");
  const breathPRM = /@media \(prefers-reduced-motion: reduce\)\s*{\s*\.breath\s*{\s*animation:\s*none/.test(code) ? 1 : 0;
  check("PRM stills the idle breath", breathPRM, 1, 1, "[STRUCT] PRM removes physics, never information");
  const ariaOK = /class="rack"[^>]*aria-hidden="true"/.test(code) && /role="status"/.test(code) ? 1 : 0;
  check("rack aria-hidden + status relay present", ariaOK, 1, 1, "[STRUCT] the bars decorate; the status speaks");
  const breathIsCSS = /animation:\s*breath/.test(code) ? 1 : 0;
  check("idle breath is CSS-only (no idle rAF)", breathIsCSS, 1, 1, "[STRUCT] law 11 at zero JS cost");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
