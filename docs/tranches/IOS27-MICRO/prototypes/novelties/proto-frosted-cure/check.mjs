// PROTO-FROSTED-CURE — node logic check.
// verified-model: claude-fable-5.
// Extracts /*CURE-TOKENS-BEGIN*/../*CURE-TOKENS-END*/ from index.html (the SAME block the
// page consumes) and asserts the register bands, the idle-light law, the CSS single-source
// cross-checks, the law-14c effervescence sim, and the analytic legibility floor.
// Run: node check.mjs
//
// BAND LAW (the F1 pattern): every gate names its source —
//   [F1-REF]    derived from F1's good glass (f1-scalar-spine/index.html:109-112);
//   [MARKS §4]  the two-tier / engagement-only material law;
//   [LAW-14c]   IOS27-CODEX law 14 (c), the release-spring register;
//   [ROSTER]    NOVELTY-ROSTER card 9/10 cure direction (:300-331);
//   [PIN]       a regression pin on the reproduced DEFECT — the before column must not drift;
//   [DESIGN]    a design choice this prototype declares (house palette, licensing).
// Paint truth is NOT claimed here: every visual claim is QUEUED-PAINT (PROBE-NOTES.md).

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*CURE-TOKENS-BEGIN\*\/([\s\S]*?)\/\*CURE-TOKENS-END\*\//);
if (!m) { console.error("FAIL: token block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.CURE = CURE;", ctx, { filename: "cure-tokens.js" });
const CURE = ctx.CURE;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = typeof value === "number" && value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(4) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
}
function checkTrue(name, cond, note = "") {
  if (!cond) failures++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(cond).padStart(10)}  ${note}`);
}

const cd = CURE.REGISTERS.cured.dark, cl = CURE.REGISTERS.cured.light;
const b5 = CURE.REGISTERS.before.f5, b4 = CURE.REGISTERS.before.f4;

console.log("=== The cured register — container tier (the F1 recipe, warm-shifted) ===");
check("dark container blur (px)", cd.containerBlurPx, 18, 26, "[F1-REF] f1:110 blur(22px); MARKS §4 σ tens-of-px");
check("dark container saturate", cd.containerSat, 1.2, 1.4, "[F1-REF] f1:111 saturate(1.35); 1.65 is the F4 defect");
check("light container blur (px)", cl.containerBlurPx, 22, 30, "[DESIGN] codex law 10 light-frost class (blur raised under white tint)");
check("light container saturate", cl.containerSat, 1.2, 1.55, "[DESIGN] licensed under the heavy diffusing tint");
check("dark rim width (px)", cd.rimPx, 0, 1, "[MARKS §4:175] the ~1px hairline; 1.5px is the F5 defect");
check("dark rim alpha", cd.rimAlpha, 0, 0.18, "[F1-REF] f1:112 white/0.10 class; 0.45 is the F5 defect");
check("light rim alpha", cl.rimAlpha, 0, 0.18, "[F1-REF] same hairline law, warm-dark arm");
check("control rim alpha (dark)", cd.controlRimAlpha, 0, 0.24, "[DESIGN] between F1's disc and the hairline; never 0.45");
{
  const lb = +(html.match(/body\[data-theme="light"\][\s\S]*?--cure-control-rim:\s*inset 0 1px 0 rgb\(255 255 250 \/ ([\d.]+)\)/) || [])[1];
  check("light control top-bevel alpha (per-arm band)", lb, 0.28, 0.45, "[DESIGN m5 cure] full rims 0.10-0.22 both arms; the light 1px bevel band is WRITTEN — never past the F5 0.45 defect");
}
checkTrue("no brightness() leg in either cured arm", cd.controlBrightness === null && cl.controlBrightness === null, "[ROSTER:308-310] frost diffuses, never amplifies (F5 brightness(1.1) killed)");
check("slider fill alpha top (dark)", cd.sliderFillAlphaTop, 0, 0.68, "[ROSTER] luminance floor dropped — frost not gloss (0.95 is the defect)");
check("slider fill alpha top (light)", cl.sliderFillAlphaTop, 0, 0.70, "[ROSTER] same law, light arm");
check("tint luminance does the depth work (dark, top-arm alpha)", cd.tintTop[3], 0.4, 0.7, "[F1-REF] f1:109 .52-.66 band");

console.log("\n=== The before pins — the reproduced defects must not drift (honest BEFORE column) ===");
check("F5 container blur pinned (px)", b5.containerBlurPx, 7, 7, "[PIN] f5:69 — the POOR register");
check("F5 specular width pinned (px)", b5.specularPx, 1.5, 1.5, "[PIN] f5:72");
check("F5 specular alpha pinned", b5.specularAlpha, 0.45, 0.45, "[PIN] f5:72");
check("F5 control brightness pinned", b5.controlBrightness, 1.1, 1.1, "[PIN] f5:71");
check("F5 sweep period pinned (s)", b5.sweepPeriodS, 5.6, 5.6, "[PIN] f5:181 — busier than the ~8s license");
check("F4 saturate pinned", b4.containerSat, 1.65, 1.65, "[PIN] f4:81");
check("F4 slider fill alpha pinned", b4.sliderFillAlphaTop, 0.95, 0.95, "[PIN] f4:219 — the gloss slab");
check("F4 knob ring idle pinned", b4.knobRingIdle, 0.12, 0.12, "[PIN] f4:233 — the idle-glow defect");
check("F4 cast idle pinned", b4.castIdle, 0.25, 0.25, "[PIN] f4:227 — the idle-wash defect");

console.log("\n=== The idle-light law — every cured overlay computes to 0 at (engage=0, energy=0) ===");
for (const row of CURE.IDLE_AUDIT) {
  check(`idle: ${row.name}`, row.f(0, 0), 0, 0, "[MARKS §4:174] specular/light motion engagement-only");
}
for (const row of CURE.BEFORE_IDLE) {
  check(`before-idle pin: ${row.name}`, row.f(0, 0), row.idle, row.idle, "[PIN] the defect stays visible for contrast");
}
console.log("--- engagement legs still fire (the law kills idle light, not life) ---");
check("cure wash at full engage", CURE.IDLE_AUDIT[0].f(1, 0), 0.3, 0.6, "[DESIGN] engagement displayed");
check("cure ring at full energy", CURE.IDLE_AUDIT[3].f(0, 1), 0.6, 1, "[DESIGN] energy displayed");
check("cure bloom below theta stays dark", CURE.IDLE_AUDIT[1].f(0, 0.29), 0, 0, "[MARKS §3] a slow place shows no fireworks (θ_g 0.30)");

console.log("\n=== The sweep license — one idle light motion per view, >=8s, PRM-dead ===");
check("cured sweep period (s)", cd.sweepPeriodS, 8, 12, "[ROSTER:308-310] the ~8s license");
check("cured sweep peak alpha", cd.sweepAlphaMax, 0, 0.14, "[DESIGN] a whisper, not a highlight");
{
  const cureSweepUses = (html.match(/animation:\s*cure-sweep/g) || []).length;
  checkTrue("exactly ONE cure-sweep animation binding", cureSweepUses === 1, `[ROSTER] one per view (found ${cureSweepUses})`);
  checkTrue("cure-sweep is PRM-dead", /body\.prm \.cure-capsule\.idle::after \{ animation: none; \}/.test(html), "[DESIGN]");
  checkTrue("--cure-sweep-period token = 8.4s in CSS", /--cure-sweep-period:\s*8\.4s/.test(html), "[SINGLE-SOURCE] CSS mirrors tokens");
}

console.log("\n=== CSS single-source cross-checks (the two homes cannot drift) ===");
checkTrue("CSS: cured container blur token 22px", /--cure-blur-container:\s*22px/.test(html), "[F1-REF]");
checkTrue("CSS: cured container saturate token 1.35", /--cure-sat-container:\s*1\.35/.test(html), "[F1-REF]");
checkTrue("CSS: b5 blur(7px) reproduced verbatim", /\.b5-bar[\s\S]{0,220}blur\(7px\) saturate\(1\.4\)/.test(html), "[PIN]");
checkTrue("CSS: b5 1.5px/0.45 specular reproduced", /inset 0 1\.5px 0 0 hsl\(0 0% 100% \/ 0\.45\)/.test(html), "[PIN]");
checkTrue("CSS: b5 brightness(1.1) reproduced", /brightness\(1\.1\)/.test(html), "[PIN]");
checkTrue("CSS: b4 saturate(1.65) reproduced", /saturate\(1\.65\)/.test(html), "[PIN]");
checkTrue("CSS: b4 white slider fill reproduced", /rgba\(255,255,255,\.95\), rgba\(255,255,255,\.78\)/.test(html), "[PIN]");
checkTrue("CSS: b4 idle ring form reproduced", /0\.12 \+ 0\.88 \* var\(--energy/.test(html), "[PIN]");
checkTrue("CSS: cured wash zero-constant form", /\.cure-wash[\s\S]{0,300}opacity:\s*calc\(var\(--engage-t, 0\) \* 0\.45\)/.test(html), "[MARKS §4] no additive constant");
checkTrue("CSS: cured ring zero-constant form", /\.cure-ring[\s\S]{0,400}opacity:\s*calc\(var\(--energy, 0\) \* 0\.85\)/.test(html), "[MARKS §4]");
checkTrue("CSS: cured cast zero-constant form", /\.cure-cast[\s\S]{0,400}opacity:\s*calc\(var\(--energy, 0\) \* 0\.55\)/.test(html), "[MARKS §4]");

console.log("\n=== The discipline fences (lying-gate law, trap law, palette law) ===");
checkTrue("no @supports backdrop gate anywhere", !/@supports[^{]*backdrop-filter/.test(html), "[LYING-GATE] safari-arm:91-102 — runtime probes only");
checkTrue("no filter:url() anywhere", !/filter:\s*url\(/.test(html), "[LYING-GATE] no SVG composite near glass");
checkTrue("no light-dark() anywhere", !/light-dark\(/.test(html), "[TRAP] inset-shadow fragments compute the whole box-shadow to none");
{
  // the cured scope must be cyan-free: hsl hue 180-210 inside any --cure- or .cure- rule
  const cureCss = (html.match(/\.cure-[\s\S]*?\}/g) || []).join("");
  checkTrue("cured light is warm (no 180-210 hue in cure rules)", !/hsl\(\s*(1[89]\d|20\d|210)\s/.test(cureCss), "[DESIGN] house palette — warm cream, never cyan");
}

console.log("\n=== R-EFFERVESCE — law 14c, simulated at 1ms ===");
const eff = CURE.simPopover(CURE.EFFERVESCE);
check("overshoot (fraction of travel)", eff.overshoot, 0.06, 0.12, "[LAW-14c] single ~9%, velocity-bought (v0 seeds it — never intrinsic)");
check("second excursion (invisible)", eff.secondExcursion, 0, 0.015, "[LAW-14c] no second bounce");
check("flight to ±2% sustained (ms)", eff.settleMs + CURE.EFFERVESCE.latencyMs, 200, 320, "[LAW-14c] ~250ms flight + 60ms latency");
check("zeta in the 14c register", CURE.EFFERVESCE.zeta, 0.75, 0.85, "[LAW-14c]");
check("fade / geometry ratio", CURE.EFFERVESCE.fadeMs / CURE.EFFERVESCE.geomMs, 0, 1 / CURE.PHI, "[ROSTER card 10] fade snappy and tight, <= 1/φ");
check("arrival beat rise (ms)", CURE.EFFERVESCE.beatRiseMs, 0, 100, "[ROSTER card 10] sub-100ms rim light");
check("arrival beat cools immediately (decay ms)", CURE.EFFERVESCE.beatDecayMs, 120, 320, "[DESIGN] light, not motion; cools at once");
{
  // intrinsic (zero-seed) overshoot at ζ0.80 must be sub-visible — proves the 9% is BOUGHT
  const intrinsic = CURE.simPopover({ ...CURE.EFFERVESCE, v0: 0 });
  check("intrinsic overshoot at v0=0", intrinsic.overshoot, 0, 0.03, "[LAW-14c] the overshoot is velocity-bought, never intrinsic");
  // the before register is honestly bad: visible double bounce
  const bef = CURE.simPopover(CURE.EFFERVESCE.beforeReg);
  check("before register overshoot (the defect)", bef.overshoot, 0.15, 0.30, "[PIN] ζ0.45 ~20% — visibly wrong for contrast");
  check("before register second excursion (visible)", bef.secondExcursion, 0.02, 0.10, "[PIN] the double bounce the law bans");
}

console.log("\n=== Analytic legibility floor (declared-constant model, NOT a paint read) ===");
check("dark theme: text contrast on cured container", CURE.textContrast("dark"), 4.5, 21, "[MARKS §4:157] legibility never traded; paint read QUEUED");
check("light theme: text contrast on cured container", CURE.textContrast("light"), 4.5, 21, "[MARKS §4:157] same floor, light arm");

console.log("\n=== Performance fences (static analysis of the page source) ===");
checkTrue("no getBoundingClientRect inside a rAF job", !/run\(\(dt[\s\S]{0,400}getBoundingClientRect/.test(html), "[PERF] layout reads happen per-gesture, never per-frame");
checkTrue("no client/offset geometry reads inside a rAF job", !/run\(\(dt[\s\S]{0,500}(clientWidth|clientHeight|offsetWidth|offsetHeight)/.test(html), "[PERF] the whole layout-read class fenced, not just gBCR");
checkTrue("conductor parks (returns false paths exist)", /jobs\.delete\(j\)/.test(html) && /rAF parked/.test(html), "[PERF] zero idle rAF");
checkTrue("backdrop-filter never transitioned/animated", !/transition:[^;]*backdrop-filter/.test(html) && !/animation:[^;]*backdrop/.test(html), "[PERF] blur radii never animate (blur-rides-opacity law)");

console.log("\n=== Honesty gates (the page's own claims, verified here) ===");
{
  const scriptBlocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((mm) => mm[1]);
  const allParse = scriptBlocks.every((src) => { try { new vm.Script(src); return true; } catch { return false; } });
  checkTrue("both inline script blocks parse under node vm", scriptBlocks.length === 2 && allParse, `[HONESTY] ${scriptBlocks.length} blocks, vm.Script syntax-checked`);
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
