// V-THINKFIELD node battery — the two-texture thinking grammar, provable without paint.
// verified-model: claude-fable-5. Extracts /*THINKFIELD-PHYSICS-BEGIN*/../*THINKFIELD-PHYSICS-END*/
// from index.html (the SAME block that drives paint). Run: node check.mjs
//
// BAND LAW (the house pattern): every gate names its source —
//   [MARKS-C 8.x] MARKS-C-APPS measured basis; [LAW n] IOS27-CODEX; [B2] the refused
//   Gemini idle freeze (DESIGN B2); [DESIGN] design-law band; [STRUCT] structural assert.
// What node CANNOT prove is paint's: the painted sweep rate, the breath's PAINTED delta
// (the D3 lesson), texture-tells-state at a glance — PROBE-NOTES QUEUED-PAINT rows.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*THINKFIELD-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*THINKFIELD-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.TF = THINKFIELD;", ctx, { filename: "thinkfield-physics.js" });
const TF = ctx.TF;
const T = TF.tokens;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(48)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(9)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== hue-sweep-as-progress (MARKS-C 8.3 — ~55 deg/s, MONOTONE, one direction) ===");
const s = TF.sweepSim();
check("sweep rate (deg/s)", s.degPerS, 50, 60, "[MARKS-C 8.3] 197 deg / 3.6s = 54.7 measured");
check("travel over the 3.6s reference (deg)", s.travel, 180, 216, "[MARKS-C 8.3] the ~197-deg class");
check("max backward hue step (deg)", s.maxBackStep, 0, 0, "[MARKS-C 8.3] MONOTONE — no dithering, ever");
const s2 = TF.sweepSim(10000, 120);
check("monotone at 120Hz over 10s too", s2.maxBackStep, 0, 0, "[MARKS-C 8.3] rate-independent monotonicity");
check("rate invariant of frame rate (deg/s)", s2.degPerS, 50, 60, "[STRUCT] dt-integrated, not per-frame stepped");

console.log("\n=== the law-11 idle floor (the refused Gemini freeze — B2) ===");
const f = TF.idleFloor();
check("positional drift (px/s)", f.driftPxPerS, 6.8, 8.4, "[LAW 11] ~7.6pt/s — the iOS-attested editorial register");
check("mass breathing amplitude", f.massAmp, 0.15, 0.25, "[LAW 11] +/-20 percent mass class");
check("breath floor (never a dead frame)", f.floor, 0.5, 0.8, "[B2] the field NEVER parks to zero — the refusal, kept");
check("breath period (s)", f.periodS, 2, 3, "[LAW 11] over 2-3s");
check("breath peak position (fraction of cycle)", f.peakAt, 0.2, 0.45, "[LAW 11 kin] fast rise, slow decay — asymmetric");

console.log("\n=== the idle halftone (MARKS-C 8.1 — size-graded, scalloped, OUR motes) ===");
check("lattice pitch (px)", T.halftone.pitch, 9, 11, "[MARKS-C 8.1] the ~10pt pitch, kept at OUR glyph");
check("gain at the anchor", TF.sizeGain(0), 1, 1, "[MARKS-C 8.1] large/bright adjacent");
check("gain monotone: g(80) > g(200)", TF.sizeGain(80) > TF.sizeGain(200) ? 1 : 0, 1, 1, "[MARKS-C 8.1] halftone by SIZE, not opacity alone");
check("gain monotone: g(200) > g(360)", TF.sizeGain(200) > TF.sizeGain(360) ? 1 : 0, 1, 1, "[MARKS-C 8.1]");
check("gain dead at the extent", TF.sizeGain(T.halftone.extent), 0, 0, "[MARKS-C 8.1] dissolving to NOTHING ~400px out");
check("extent (px)", T.halftone.extent, 360, 440, "[MARKS-C 8.1] the ~400px reach");
check("scalloped boundary span (px)", TF.scallopSpan(), 16, 40, "[MARKS-C 8.1] a WAVE boundary, never a straight fade");
const latA = TF.lattice(), latB = TF.lattice();
check("lattice is deterministic (same seed, same field)", latA.length === latB.length && latA.every((p, i) => p.hue === latB[i].hue && p.j === latB[i].j) ? 1 : 0, 1, 1, "[STRUCT] parameter-not-sample (mulberry32)");
check("lattice population (motes)", latA.length, 400, 6000, "[STRUCT] a real field, not a sparkle handful");
const offHouse = latA.filter((p) => !T.auroraHues.includes(p.hue)).length;
check("every mote on a house aurora anchor", offHouse, 0, 0, "[DESIGN M3] gold/ember/rose/plum — never Gemini's star");

console.log("\n=== the two textures (state is TEXTURE, progress is HUE) ===");
check("idle texture is local (not full-bleed)", TF.textures.idle.fullBleed, 0, 0, "[MARKS-C 8.3] intimate halftone around the input");
check("idle particles never travel", TF.textures.idle.travelingParticles, 0, 0, "[LAW 11] static lattice; life is the envelope");
check("think texture is full-bleed", TF.textures.think.fullBleed, 1, 1, "[MARKS-C 8.3] the laminar wave field");
check("think ridges", TF.textures.think.ridges, 2, 4, "[MARKS-C 8.3] layered ridge lines, topographic");

console.log("\n=== the send bloom + the oklch wheel (OUR ground, never dead black) ===");
check("chroma bloom ratio think/idle", TF.bloomRatio(), 1.3, 1.8, "[MARKS-C 8.3] sat 0.44->0.69 = ~1.57x class");
check("light-arm ink L", T.ink.light.L, 0.45, 0.72, "[DESIGN] ember ink over warm cream — an ember field, not a glow");
check("night-arm ink L", T.ink.night.L, 0.6, 0.85, "[DESIGN] luminous over warm charcoal");
check("light-arm ink C", T.ink.light.C, 0.08, 0.16, "[DESIGN] cartoon-technicolor dose, bounded");
check("night-arm ink C", T.ink.night.C, 0.08, 0.16, "[DESIGN]");

console.log("\n=== law 20 envelope + the light-first press-ack (the interrupt chip) ===");
const env = TF.envelope();
check("light lead before the state flip (ms)", env.lightLeadMs, 30, 80, "[MARKS-C-MUSIC 1] press light ~50ms before commit");
check("envelope attack t90 (ms)", env.attackT90, 120, 200, "[LAW 20] peak ~+160ms class");
check("sustain at +2s hold", env.sustainAt2s, 0.99, 1.0, "[LAW 20] engagement light is STATE, not event");
check("envelope release t90 (ms)", env.releaseT90, 200, 320, "[LAW 20] release ~250ms on its own clock");
check("idle light term", env.idle, 0, 0, "[DESIGN M3] ZERO idle engagement light — canon");
check("chip arms after (ms)", T.chipInMs, 200, 800, "[MARKS-C 8.3] the affordance rides IN the field, shortly after");

console.log("\n=== PRM (single-step state relay) ===");
check("PRM hue quantum (deg)", T.prmHueStepDeg, 15, 45, "[DESIGN] progress relays in quanta, no sweep");
check("prmQuant lands on the quantum", TF.prmQuant(47) % T.prmHueStepDeg, 0, 0, "[STRUCT]");

console.log("\n=== structural asserts (mechanism discipline read from the file) ===");
{
  check("no supports-query gate anywhere", /@supports/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no ambient randomness", /Math\.random/.test(html) ? 1 : 0, 0, 0, "[STRUCT] mulberry32 only — parameter, not sample");
  check("no SVG filter on any path", /feTurbulence|filter:\s*url\(/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the F5 fence law — the retired arm stays retired");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the WebKit-killing trap");
  check("no animated blur radii", /transition[^;]*backdrop-filter|animation[^;]*backdrop-filter/.test(html) ? 1 : 0, 0, 0, "[STRUCT] only opacity animates (safari-arm law)");
  check("no idle sheen anywhere", /specular/i.test(html) ? 1 : 0, 0, 0, "[DESIGN M3] idle sheen NONE");
  check("PRM branch present", /prefers-reduced-motion/.test(html) ? 1 : 0, 1, 1, "[STRUCT] single-step state relay");
  check("hud=0 switch present", /hud=0/.test(html) ? 1 : 0, 1, 1, "[STRUCT] instrumentation-off for the browser arm");
  check("scalars publish on the COMPONENT root", /stage\.style\.setProperty\("--tf-/.test(html) ? 1 : 0, 1, 1, "[MECH M5] never :root");
  check("no :root/documentElement publication", /documentElement\.style\.setProperty/.test(html) ? 1 : 0, 0, 0, "[MECH M5]");
  check("both texture canvases authored", (/id="fieldIdle"/.test(html) ? 1 : 0) + (/id="fieldThink"/.test(html) ? 1 : 0), 2, 2, "[STRUCT] two textures, two canvases");
  check("the chip consumes the progress hue", /oklch\([^)]*var\(--tf-hue\)/.test(html) ? 1 : 0, 1, 1, "[MARKS-C 8.3] affordances ride the field's own scalar");
  check("idle life is CSS-only (drift keyframes)", /@keyframes tf-drift/.test(html) ? 1 : 0, 1, 1, "[LAW 11 + B2] compositor breath, rAF parked");
  check("idle life is CSS-only (breath keyframes)", /@keyframes tf-breath/.test(html) ? 1 : 0, 1, 1, "[LAW 11 + B2]");
  check("breath floor bound into the keyframes", /opacity:\s*var\(--tf-breath-lo\)/.test(html) ? 1 : 0, 1, 1, "[B2] the floor is the CSS's own token");
  check("thinking pauses the idle animations", /\.stage\.thinking \.halftone-wrap\s*\{\s*animation-play-state:\s*paused/.test(html) ? 1 : 0, 1, 1, "[STRUCT] one texture owns the stage at a time");
  check("engagement light is 42-degree cream", /hsl\(42 85% 88%\)/.test(html) ? 1 : 0, 1, 1, "[DESIGN M3] the canon engagement hue");
  check("oklch is the wheel everywhere it paints", (html.match(/oklch\(/g) || []).length >= 4 ? 1 : 0, 1, 1, "[STRUCT] the house wheel");
  check("PRM kills the CSS breath", /prefers-reduced-motion[^}]*\{[^@]*animation:\s*none/.test(html) ? 1 : 0, 1, 1, "[STRUCT]");
  // [P4-AGG 2026-07-19] the D9 + A5/A6 + minor-2/minor-4 wiring locks
  check("the think-yield rides the UN-animated wrap", /\.stage\.thinking \.halftone-wrap\s*\{[^}]*opacity:\s*0/.test(html) ? 1 : 0, 1, 1, "[D9 cure] a paused opacity animation defeats a child yield — the wrap owns it");
  check("no transition on the animated idle canvas", /#fieldIdle\s*\{[^}]*transition/.test(html) ? 1 : 0, 0, 0, "[D9] dead under the running breath animation — moved to the wrap");
  const cd = html.split('chip.addEventListener("pointerdown"')[1]?.split("addEventListener")[0] || "";
  check("no commit inside pointerdown", /answer\(/.test(cd) ? 1 : 0, 0, 0, "[A5] the press is cancellable — commit on UP inside the target");
  check("chip commit path rides pointerup", /chip\.addEventListener\("pointerup"/.test(html) ? 1 : 0, 1, 1, "[A5]");
  check("a lost pointer never commits", /chip\.addEventListener\("pointercancel"/.test(html) ? 1 : 0, 1, 1, "[A5]");
  check("press light is the control's own", /\.chip::before/.test(html) ? 1 : 0, 1, 1, "[C-MUSIC 1] the pressed control's own light leads its own change");
  check("send carries press light too", /button\.send::after/.test(html) ? 1 : 0, 1, 1, "[C-MUSIC 1] the actual commit control lights its own press");
  check("hold light is element-scoped", /scalarHost\.style\.setProperty\("--tf-light"/.test(html) ? 1 : 0, 1, 1, "[A5] one scalar, stamped on the pressed control");
  check("canvas realloc only on resize", /cv\.width !== W \|\| cv\.height !== H/.test(html) ? 1 : 0, 1, 1, "[minor-4] no per-frame buffer realloc");
  check("no hand-inlined mote lightness", /a === "night" \? 0\.78 : 0\.58/.test(html) ? 1 : 0, 0, 0, "[minor-4] the paint constant lives in tokens.idleMoteL");
}

console.log("\n=== the idle-mote lightness tokens ([P4-AGG minor-4]) ===");
check("idle mote lightness, light arm", T.idleMoteL.light, 0.5, 0.66, "[DESIGN] ember-ink class over warm cream");
check("idle mote lightness, night arm", T.idleMoteL.night, 0.7, 0.85, "[DESIGN] luminous over warm charcoal");

console.log("\n=== CSS<->JS cross-checks (the hand-mirror cannot drift — MECH M7 kin) ===");
{
  const dist = +(html.match(/--tf-drift-dist:\s*([\d.]+)px/) || [])[1];
  const dur = +(html.match(/--tf-drift-dur:\s*([\d.]+)s/) || [])[1];
  const bdur = +(html.match(/--tf-breath-dur:\s*([\d.]+)s/) || [])[1];
  const blo = +(html.match(/--tf-breath-lo:\s*([\d.]+)/) || [])[1];
  check("CSS drift distance equals tokens", Math.abs(dist - T.drift.distPx), 0, 0, "[STRUCT]");
  check("CSS drift duration equals tokens", Math.abs(dur - T.drift.durS), 0, 0, "[STRUCT]");
  check("CSS drift speed (px/s)", dist / dur, 6.8, 8.4, "[LAW 11] the painted drift is the law's own number");
  check("CSS breath duration equals tokens", Math.abs(bdur - T.breath.periodS), 0, 0, "[STRUCT]");
  check("CSS breath floor equals tokens", Math.abs(blo - T.breath.lo), 0, 0.001, "[STRUCT]");
  const peakKey = +(html.match(/@keyframes tf-breath[\s\S]*?(\d+)%\s*\{\s*opacity:\s*1/) || [])[1];
  check("CSS breath peak percent equals tokens", Math.abs(peakKey / 100 - T.breath.peakAt), 0, 0.001, "[STRUCT] fast rise, slow decay — in the paint file too");
  const hue0 = +(html.match(/--tf-hue:\s*([\d.]+)/) || [])[1];
  check("CSS idle hue equals tokens.hue0", Math.abs(hue0 - T.hue0), 0, 0, "[STRUCT] one departure, two readers");
  const warmLight = /rgba\(250,\s*246,\s*236/.test(html) ? 1 : 0;
  check("§3.5-A light-arm tint painted", warmLight, 1, 1, "[DESIGN M3] warm cream, the ONE canon");
  const warmDark = /rgba\(56,\s*50,\s*44/.test(html) ? 1 : 0;
  check("§3.5-A dark-arm tint painted", warmDark, 1, 1, "[DESIGN M3] warm charcoal, R>B — never blue-black");
  const nightGround = html.match(/\[data-theme="night"\][\s\S]*?--ground:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  check("night ground is warm (R>B, never dead black)", nightGround && +nightGround[1] > +nightGround[3] && +nightGround[1] > 0 ? 1 : 0, 1, 1, "[DESIGN] the declared divergence from Gemini's black");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
