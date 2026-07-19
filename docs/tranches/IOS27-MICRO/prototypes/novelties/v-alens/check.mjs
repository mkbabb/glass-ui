// V-ALENS node battery — the attention-lens invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*ALENS-PHYSICS-BEGIN*/../*ALENS-PHYSICS-END*/
// from index.html (the SAME code that drives paint). Run: node check.mjs
//
// BAND LAW (pass-1/2 pattern): every gate names its source —
//   [MARKS §n] corpus-derived; [DESIGN] design-law band (roster card 2 / suffusion / codex);
//   [REG-LOCK] regression lock on adopted constants; [STRUCT] a structural CSS/DOM assert
//   read from the file text (mechanism discipline, not paint).
// Paint truth itself is QUEUED-PAINT (PROBE-NOTES.md) — the video path, browser arm.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*ALENS-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*ALENS-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.ALENS = ALENS;", ctx, { filename: "alens-physics.js" });
const ALENS = ctx.ALENS;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(44)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(9)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== the engage envelope (FAC --engage-t; asymmetric attack/release) ===");
const r = ALENS.sims.rise();
check("rise t90 (ms)", r.t90, 100, 200, "[DESIGN] press-acknowledge register, sub-200ms");
check("band 1 (blur 4, near) opacity-0.5 arrival (ms)", r.bandArrivalMs[0], 0, 80, "[DESIGN] nearest band arrives first");
check("band 2 (blur 3, mid) after band 1 (ms)", r.bandArrivalMs[1] - r.bandArrivalMs[0], 5, 200, "[DESIGN] the halo widens outward");
check("band 3 (blur 2, far) after band 2 (ms)", r.bandArrivalMs[2] - r.bandArrivalMs[1], 5, 400, "[DESIGN] strict widening order");
const f = ALENS.sims.fall();
check("release t10 (ms)", f.t10, 280, 450, "[DESIGN] law-14c exit class; slower than attack");
check("release parks (ms)", f.parkMs, 300, 1200, "[DESIGN] envelope snaps to 0 and the rAF dies");

console.log("\n=== interrupt safety (reversal mid-rise is continuous — the scrub law) ===");
const it = ALENS.sims.interrupt();
check("value at flip is mid-flight", it.atFlip, 0.5, 0.99, "[REG-LOCK] ~100ms rise reaches the meat of the ramp");
check("max per-frame jump after flip", it.maxJump, 0, 0.12, "[DESIGN] no discontinuity at reversal");
check("non-monotone frames after flip", it.nonMono, 0, 0, "[DESIGN] approach to new target never wobbles");

console.log("\n=== the seat law (a seat, not per-frame tracking — roster card 2) ===");
const s = ALENS.sims.seatLaw();
check("seat held through moves + re-engage", s.held, 1, 1, "[DESIGN] center seats ONCE per engagement");
check("new engagement re-seats", s.reseated, 1, 1, "[DESIGN] the next gesture gets its own center");

console.log("\n=== N3 sibling-legibility gate (>=AA under the ramp, analytic sweep) ===");
{
  let worst = Infinity;
  for (let d = 0; d <= 1.0001; d += 0.05) worst = Math.min(worst, ALENS.siblingContrast(Math.min(1, d)));
  check("worst sibling contrast across dim sweep", worst, 4.5, 99, "[DESIGN] N3 gate — full dim range swept, not assumed");
  const dimIsDark = ALENS.lum(ALENS.dim.color) < ALENS.lum(ALENS.tokens.baseBg) + 0.02 ? 1 : 0;
  check("dim layer only darkens", dimIsDark, 1, 1, "[DESIGN] the ramp may never LIGHTEN under white text");
}

console.log("\n=== the thumb pop cap (C7: scale <= phi^(1/4) = 1.1279 on ALL pointers) ===");
check("thumb scale at engage-t=1", 1 + ALENS.tokens.thumbScaleGain, 1.0, Math.pow((1 + Math.sqrt(5)) / 2, 0.25), "[DESIGN] critique C7 bound");

console.log("\n=== structural asserts (mechanism discipline read from the file) ===");
{
  const cssBlurs = [...html.matchAll(/(?<!-)backdrop-filter:\s*blur\((\d+)px\)/g)].map((x) => +x[1]);
  const lensBlurs = cssBlurs.filter((b) => [4, 3, 2].includes(b));
  check("lens stack radii present {4,3,2}", new Set(lensBlurs).size, 3, 3, "[STRUCT] sigma DECAYS outward — the measured annulus (MARKS-C-APPS 6.3; DESIGN M1 cure)");
  const annulus = /transparent 0 36px, black 64px 150px, transparent 210px/.test(html) ? 1 : 0;
  check("near mask is an annulus with a sharp hole", annulus, 1, 1, "[STRUCT] the control stays crisp; the halo dies by ~330px — never a full-field mush");
  const dimCap = /calc\(var\(--engage-t\) \* 0\.05\)/.test(html) ? 1 : 0;
  check("dim capped at the 0.05 whisper", dimCap, 1, 1, "[MARKS-C 6.3] luminance LOCKED 0.99-1.01 — zero-scrim law (DESIGN M1)");
  const animatedBlur = /transition[^;]*backdrop-filter|animation[^;]*backdrop-filter/.test(html) ? 1 : 0;
  check("zero animated blur radii", animatedBlur, 0, 0, "[STRUCT] only OPACITY animates (safari-arm.md:148-150)");
  const stackHasOverflow = /\.lens-stack\s*{[^}]*overflow\s*:\s*hidden/.test(html) ? 1 : 0;
  check("no overflow:hidden on the stack root", stackHasOverflow, 0, 0, "[STRUCT] the Chromium stacked-mask weakness");
  const layerCount = (html.match(/class="lens-layer lens-b\d"/g) || []).length;
  check("fixed 3-layer blur count", layerCount, 3, 3, "[STRUCT] <=3 concurrent backdrop surfaces in the stack");
  const parked = /data-parked="1"/.test(html) && /visibility:\s*hidden/.test(html) ? 1 : 0;
  check("layers exist only while engaged", parked, 1, 1, "[STRUCT] parked stack is hidden at rest");
  const supportsGate = /@supports/.test(html) ? 1 : 0;
  check("no @supports gate anywhere", supportsGate, 0, 0, "[STRUCT] the lying-gate law (safari-arm.md:91-102)");
  const svgFilter = /feTurbulence|filter:\s*url\(/.test(html) ? 1 : 0;
  check("no SVG filter on the hot path", svgFilter, 0, 0, "[STRUCT] no url() composite ships to WebKit");
  const masksStatic = /transition[^;]*mask|animation[^;]*mask/.test(html) ? 1 : 0;
  check("masks never animate", masksStatic, 0, 0, "[STRUCT] mask geometry changes only at the once-per-engagement seat");
  const prmStep = /prefers-reduced-motion/.test(html) ? 1 : 0;
  check("PRM single-step branch present", prmStep, 1, 1, "[STRUCT] a single-step dim, no ramp");
  const lightDarkInset = /light-dark\([^)]*inset/.test(html) ? 1 : 0;
  check("no light-dark() inset shadow fragments", lightDarkInset, 0, 0, "[STRUCT] the known WebKit-killing trap");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
