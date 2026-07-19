// V-PERCH node battery — the corner-perched-close invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*PERCH-PHYSICS-BEGIN*/../*PERCH-PHYSICS-END*/
// from index.html (the SAME code that drives paint) and cross-checks the CSS stamps
// against the physics constants (single-source discipline). Run: node check.mjs
//
// BAND LAW: [MARKS §n] corpus-derived; [DESIGN] design-law band (roster card 6 /
// codex law 4 / D-LENS precedent); [REG-LOCK] regression lock; [STRUCT] structural
// file assert. Paint truth is QUEUED-PAINT (PROBE-NOTES.md) — the video path.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*PERCH-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*PERCH-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.PERCH = PERCH;", ctx, { filename: "perch-physics.js" });
const PERCH = ctx.PERCH;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== the seat geometry (astride the corner border, half outside) ===");
const seat = PERCH.seatOffset();
check("seat offset r(1-1/sqrt2) at R=28 (px)", seat, 8.1, 8.3, "[DESIGN] the 45-degree border point");
check("plate radius in the card role band", PERCH.R, 28, 40, "[DESIGN] codex law 4 — card/sheet R28-40");
check("visual protrusion past the plate box (px)", PERCH.protrusion(), 6, 10, "[DESIGN] the D-LENS 6-10px protrusion precedent");
check("hit target floor (px)", PERCH.HIT, 44, 64, "[DESIGN] never below 44 — the accessibility floor");
check("hit encloses the visual dot", PERCH.HIT >= PERCH.VISUAL ? 1 : 0, 1, 1, "[DESIGN] the finger's target is never smaller than the eye's");
{
  const cssSeat = +(html.match(/--perch-seat:\s*([\d.]+)px/) || [])[1];
  check("CSS seat stamp equals the physics (px)", Math.abs(cssSeat - seat), 0, 0.06, "[STRUCT] single source — CSS stamped FROM PERCH.seatOffset()");
}

console.log("\n=== the charge envelope (press-charge acknowledgment iOS's X lacks) ===");
const r = PERCH.sims.rise();
check("charge t90 (ms)", r.t90, 100, 200, "[DESIGN] press-acknowledge register, sub-200ms");
const d = PERCH.sims.drain();
check("cancel drain t10 (ms)", d.t10, 220, 340, "[DESIGN] a felt cancel — slower than the attack");
check("drain parks (ms)", d.parkMs, 500, 1200, "[DESIGN] envelope snaps to 0 and the rAF dies");

console.log("\n=== the press state machine (commit only from a held charge, inside) ===");
const tt = PERCH.sims.pressTruthTable();
check("release inside commits", tt.commitInside, 1, 1, "[DESIGN] the charged release is the commit");
check("slide off cancels", tt.slideOffCancels, 0, 0, "[DESIGN] leaving the perch drains the charge");
check("slide back re-commits", tt.slideBackRecommits, 1, 1, "[DESIGN] the finger may change its mind twice");
check("stray up never commits", tt.strayUpNoCommit, 0, 0, "[DESIGN] no commit without a press");

console.log("\n=== the close order (the honest handoff stub: content -> beat -> medium) ===");
const co = PERCH.sims.closeOrder();
check("content out (ms)", co.contentMs, 120, 250, "[MARKS §5] the ~170ms content-first exit class");
check("empty-medium beat (ms)", co.beatMs, 100, 200, "[MARKS §5, C6-confirmed] the signature moment");
check("medium tail after content (ms)", co.mediumTailMs, 400, 560, "[MARKS §5] relax ~400-450ms decelerating class");
check("content strictly before medium", co.orderOK, 1, 1, "[DESIGN] the F5/N8 inversion law");

console.log("\n=== the engagement-only light (MARKS §4 note 3 — no idle specular) ===");
check("rim alpha at rest (hairline)", PERCH.rimAlphaAt(0), 0.1, 0.25, "[DESIGN] a hairline, not a glow");
check("rim alpha charged", PERCH.rimAlphaAt(1), 0.55, 0.8, "[DESIGN] light is earned by the finger");
check("dot scale cap phi^(1/4)", PERCH.scaleAt(1), 1.0, Math.pow((1 + Math.sqrt(5)) / 2, 0.25), "[DESIGN] critique C7 bound");
{
  const rim = html.match(/rgba\(255,\s*255,\s*255,\s*calc\(([\d.]+)\s*\+\s*([\d.]+)\s*\*\s*var\(--engage-t\)\)\)/);
  const rimOK = rim && Math.abs(+rim[1] - PERCH.rimAlphaAt(0)) < 1e-9 && Math.abs((+rim[1] + +rim[2]) - PERCH.rimAlphaAt(1)) < 1e-9 ? 1 : 0;
  check("CSS rim ramp equals the physics", rimOK, 1, 1, "[STRUCT] single source — same intercept and slope");
  const sc = html.match(/scale\(calc\(1\s*\+\s*([\d.]+)\s*\*\s*var\(--engage-t\)\)\)/);
  const scOK = sc && Math.abs(1 + +sc[1] - PERCH.scaleAt(1)) < 1e-9 ? 1 : 0;
  check("CSS scale gain equals the physics", scOK, 1, 1, "[STRUCT]");
}

console.log("\n=== the close-clock stamps (CSS vs physics — one clock, two organs) ===");
{
  const content = +(html.match(/transition:\s*opacity\s*([\d.]+)ms/) || [])[1];
  check("CSS content-out equals physics (ms)", Math.abs(content - PERCH.close.contentMs), 0, 0.5, "[STRUCT]");
  const beat = +(html.match(/--beat-ms:\s*([\d.]+)/) || [])[1];
  check("CSS beat equals physics (ms)", Math.abs(beat - PERCH.close.beatMs), 0, 0.5, "[STRUCT] the beat is the transition DELAY");
  const relax = +(html.match(/--medium-relax-ms:\s*([\d.]+)/) || [])[1];
  check("CSS relax duration in [3tau, 4tau] (ms)", relax, PERCH.close.mediumTau * 3000, PERCH.close.mediumTau * 4000, "[STRUCT] the exponential's visible life");
}

console.log("\n=== structural asserts (the plane vocabulary + mechanism discipline) ===");
{
  const code = html.replace(/<!--[\s\S]*?-->/g, "");
  const plateClips = /\.plate\s*{[^}]*overflow:\s*hidden/.test(code) ? 1 : 0;
  check("the plate owns its clip", plateClips, 1, 1, "[STRUCT] radius + overflow live on the glass body");
  const rootClips = /\.surface-root\s*{[^}]*overflow/.test(code) ? 1 : 0;
  check("the architectural root never clips", rootClips, 0, 0, "[STRUCT] chrome escapes by construction, not by hack");
  // the perch is a SIBLING of the plate: every div opened after the plate opens is
  // closed again before the perch button appears (nesting depth returns to zero).
  const span = code.slice(code.indexOf('<div class="plate"'), code.indexOf('<button class="perch"'));
  const opens = (span.match(/<div\b/g) || []).length, closes = (span.match(/<\/div>/g) || []).length;
  check("perch is outside the plate clip (sibling)", opens - closes, 0, 0, "[STRUCT] the F5 plane vocabulary — a layer, not a child");
  const centered = /\.perch\s*{[^}]*transform:\s*translate\(-50%,\s*-50%\)/.test(code) ? 1 : 0;
  check("perch centered on the border point", centered, 1, 1, "[STRUCT] translate(-50%,-50%) on the corner seat");
  const hit = /\.perch\s*{[^}]*width:\s*44px/.test(code) ? 1 : 0;
  check("CSS hit target is 44px", hit, 1, 1, "[STRUCT] matches PERCH.HIT");
  check("no @supports gate", /@supports/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no SVG filter on the hot path", /feTurbulence|filter:\s*url\(/.test(code) ? 1 : 0, 0, 0, "[STRUCT]");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the WebKit shadow trap");
  check("PRM branch present", /prefers-reduced-motion/.test(code) ? 1 : 0, 1, 1, "[STRUCT] step, not ritual");
  check("keyboard commit path present", /ev\.key === "Enter" \|\| ev\.key === " "/.test(code) ? 1 : 0, 1, 1, "[STRUCT] full function, zero pop — deterministic commit");
  check("pointercancel handled", /pointercancel/.test(code) ? 1 : 0, 1, 1, "[STRUCT] a lost pointer drains, never commits");
  check("perch carries an aria-label", /class="perch"[^>]*aria-label=/.test(code) ? 1 : 0, 1, 1, "[STRUCT] the close names its victim");
  check("focus-visible ring present", /\.perch:focus-visible/.test(code) ? 1 : 0, 1, 1, "[STRUCT] keyboard focus is truth");
  check("vapor-handoff event dispatched", /new CustomEvent\("vapor-handoff"/.test(code) ? 1 : 0, 1, 1, "[STRUCT] the V-VAPOR seam is a named event");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
