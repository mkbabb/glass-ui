// PROTO-ASSEMBLY node battery — the composed-organ invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*ASM-PHYSICS-BEGIN*/../*ASM-PHYSICS-END*/
// from index.html (the SAME code that drives paint) and asserts the deterministic
// sims + the structural contract. Run: node check.mjs
//
// BAND LAW (the pass-2 discipline): every gate names its source —
//   [LAW n]       an IOS27-CODEX law constant (measured corpus);
//   [MARKS ...]   derived from a measured organ (MARKS-D-SIRI, MARKS-C-*, MARKS-E, CORPUS-SYNTHESIS);
//   [CHARTER R-n] a pass-3 charter ruling (the minted registers);
//   [DESIGN]      a design-law band (roster card / register table), corpus-silent;
//   [STRUCT]      structural file assert; [REG-LOCK] drift lock on adopted constants.
// A sim value is a point inside its band, never the band's author.
// Paint truth is QUEUED-PAINT (PROBE-NOTES.md) — the WebKit VIDEO path.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*ASM-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*ASM-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.ASM = ASM;", ctx, { filename: "asm-physics.js" });
const ASM = ctx.ASM;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(50)} ${String(typeof value === "number" ? +value.toFixed(4) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}
const bool = (v) => (v ? 1 : 0);
// the wiring section (everything after the physics block) for structural asserts
const wiring = html.slice(html.indexOf("/*ASM-PHYSICS-END*/") + 19);
const css = html.slice(html.indexOf("<style>"), html.indexOf("</style>"));
const code = html.replace(/<!--[\s\S]*?-->/g, "");

console.log("=== the minted spring registers (CHARTER R-1/R-2; f_d = (1/response)*sqrt(1-z^2)) ===");
{
  const P = ASM.presets;
  check("panel f_d (Hz)", ASM.fd(P.panel), 1.70, 1.85, "[MARKS-D mark 3] fit 1.75 [1.70,1.85]; {0.40, z0.71} [CHARTER R-2]");
  check("dock f_d (Hz)", ASM.fd(P.dock), 1.52, 1.70, "[CHARTER R-1] dock events centered 1.6-1.7Hz; 0.35 z0.82 HELD");
  check("press f_d (Hz)", ASM.fd(P.press), 2.8, 3.2, "[REG-LOCK] the sub-200ms tap answer row, on-disk shape");
  const panel = ASM.sims.springStats("panel");
  check("panel zero-seed overshoot", panel.overshoot, 0.035, 0.056, "[MARKS-D mark 3] INTRINSIC 4.5-4.8%; z-bracket 0.66-0.73 => 3.6-5.6%");
  check("panel geometry peak (ms)", panel.tPeakMs, 270, 294, "[MARKS-D mark 3] half-period of f_d 1.70-1.85");
  check("panel settle (ms)", panel.settleMs, 300, 520, "[MARKS-D mark 3] onset->settled ~=480ms class (sim criterion scaled)");
  const dock = ASM.sims.springStats("dock");
  check("dock zero-seed overshoot", dock.overshoot, 0.008, 0.015, "[MARKS C2] zero seed lands near-dead — 1.1% analytic");
  check("dock overshoot inside the header fence", dock.overshoot, 0, 0.10, "[REG-LOCK] the [0,10%] fence stands whole (CHARTER R-4)");
  const press = ASM.sims.springStats("press");
  check("press settle (ms)", press.settleMs, 120, 200, "[DESIGN] the tap answer lands under 200ms");
  check("press zero-seed overshoot under fence", press.overshoot, 0, 0.10, "[REG-LOCK]");
}

console.log("\n=== the k*v law (overshoot is velocity-BOUGHT, never intrinsic) ===");
{
  const k1 = ASM.sims.kvLaw("dock", 1), k2 = ASM.sims.kvLaw("dock", 2);
  check("dock k = overshoot/vc (s)", k1, 0.016, 0.030, "[CORPUS-SYNTHESIS §1.1] k~=0.02s bracket [0.016,0.030]");
  check("k linearity k(2v)/k(v)", k2 / k1, 0.97, 1.03, "[MARKS C2] the law is linear in the crossing velocity");
}

console.log("\n=== the engage-envelope rows (§3.5-B — no constant outside the table) ===");
{
  const pd = ASM.sims.envelopeStats("pressDrain");
  check("press-drain t90 (ms)", pd.t90Ms, 90, 135, "[DESIGN §3.5-B] attack class 40-60ms => t90 90-135");
  check("press-drain t10 (ms)", pd.t10Ms, 220, 340, "[DESIGN §3.5-B] a felt cancel — 120ms release");
  const sd = ASM.sims.envelopeStats("signalDecay");
  check("signal-decay t90 (ms)", sd.t90Ms, 80, 135, "[DESIGN §3.5-B] 40ms attack — the 'I hear you' relay");
  check("signal-decay t10 (ms)", sd.t10Ms, 440, 580, "[DESIGN §3.5-B] 220ms release — meters drain, not vanish");
}

console.log("\n=== ORGAN A — the standing aurora sea (card 5; MARKS-D mark 2) ===");
{
  const s = ASM.sea;
  check("crest layer count", s.LAYERS.length, 3, 3, "[DESIGN card 5] 2-3 hue layers, <=3 canvas-free");
  const lag = ASM.sims.seaLag();
  check("lead-crest -> tail lag (ms)", lag.lagMs, 80, 140, "[LAW 5] detuned channels — the tail lags ~100ms class");
  check("crest zeta (no crest wobbles)", s.LAYERS[0].zeta, 0.8, 1.0, "[DESIGN]");
  const p = ASM.sims.prosodyStats();
  check("prosody min", p.mn, 0.02, 0.25, "[MARKS-D mark 2] speech-shaped swells, bounded");
  check("prosody max", p.mx, 0.75, 0.98, "[MARKS-D mark 2]");
  check("prosody freq 1 (Hz)", s.prosodyFreqs[0], 0.5, 1.5, "[MARKS-D mark 2] envelope arcs 0.5-1.5Hz");
  check("prosody freq 2 (Hz)", s.prosodyFreqs[1], 0.5, 1.5, "[MARKS-D mark 2]");
  check("the lull FILAMENT (never zero)", s.FILAMENT, 0.15, 0.35, "[MARKS-D mark 2] lull ~0.29 of peak; the field never flatlines");
  check("live level floor == FILAMENT", Math.abs(p.lvMin - s.FILAMENT), 0, 1e-9, "[STRUCT] the floor is the filament, exactly");
  check("session peak below the flare", s.PEAK, 0.7, 0.95, "[DESIGN] only the commit flare reaches maximum");
  check("flare is the session maximum", bool(s.commit.flare > s.PEAK), 1, 1, "[MARKS-D mark 2] the terminal flare is the whole session's max");
  const lean = ASM.sims.leanStats();
  check("centroid lean amplitude (frac of field)", lean.ampFrac, 0.05, 0.10, "[MARKS-D mark 2] +/-40px on a ~600px belly class");
  check("centroid lean rate (Hz)", lean.hz, 1.2, 1.7, "[MARKS-D mark 2] ~1.5Hz — the sea leans, it never darts");
  check("commit surge (ms)", s.commit.surgeMs, 50, 67, "[MARKS-D mark 2 refined] surge 50-67ms");
  check("commit pin hold (ms)", s.commit.pinMs, 110, 170, "[MARKS-D mark 2 refined] hold ~117ms; card band 120-170");
  check("commit cut (ms)", s.commit.cutMs, 0, 33, "[MARKS-D mark 2 refined] the cut is <=17-33ms — the one licensed sharpness");
}

console.log("\n=== ORGAN A — the dark-mass occlusion grammar (MARKS-D mark 3: NO SCRIM) ===");
{
  const o = ASM.sims.occlusionShape();
  check("dark mass at the sea's top", o.top, 0.75, 0.95, "[DESIGN] the upper half sinks under the surface's OWN mass");
  check("dark mass at the waterline", o.waterline, 0, 1e-9, "[DESIGN] the lower belly is the sea's — mass reaches zero");
  check("occlusion monotone (top-heavy)", o.mono, 1, 1, "[STRUCT]");
  check("waterline fraction", ASM.occlusion.WATERLINE, 0.45, 0.60, "[DESIGN] 'the upper half' — the sunk band");
  const d = ASM.dock;
  check("dock fill warm (R>G>B)", bool(d.fill.r > d.fill.g && d.fill.g > d.fill.b), 1, 1, "[DESIGN M3] warm charcoal, never blue-black");
  check("dock fill alpha (ghost-through floor)", d.fill.a, 0.66, 0.74, "[§3.5-C] ~0.70 — backdrop alive through it");
  check("dock blur LOW (px)", d.blurPx, 6, 10, "[LAW 13] content ghosts through");
  check("night rim alpha", d.rimAlpha, 0.10, 0.18, "[§3.5-A night arm]");
  check("night bevel alpha", d.bevelAlpha, 0.08, 0.18, "[§3.5-A night arm] never past the F5 0.45 defect");
  check("meniscus breath amplitude", d.breath.amp, 0.12, 0.24, "[MARKS-D mark 3] rim breathes +/-18% at rest");
  check("meniscus breath period (s)", d.breath.periodS, 6, 8, "[LAW 11] our 7s asymmetric arm");
}

console.log("\n=== ORGAN A — the fired-deploy channel ladder (MARKS-D mark 3, detuned) ===");
{
  const L = ASM.ladder;
  const peak = L.geomPeakMs(ASM.presets.panel, ASM.omega.bind(ASM));
  check("text born AT the geometry peak (|delta| ms)", Math.abs(L.text.onsetMs - peak), 0, 50, "[MARKS-D mark 3] born blurred ~at the peak (BOUNDED +/-3 frames)");
  check("text condense duration (ms)", L.text.durMs, 170, 210, "[MARKS-D mark 3] ~190ms sharpen ramp");
  check("data upgrade onset (ms)", L.data.onsetMs, 700, 900, "[MARKS-D mark 3] in-place upgrade at +0.82s class");
  check("rim flare rides the data (|delta| ms)", Math.abs(L.rimFlare.onsetMs - L.data.onsetMs), 0, 60, "[MARKS-D mark 3] light celebrates the data");
  check("rim flare gain over plateau", L.rimFlare.gain, 1.8, 2.4, "[MARKS-D mark 3] flare 42 vs plateau 20 => 2.1x");
  check("channels detuned (strictly staggered)", bool(L.text.onsetMs < L.rimPlateau.onsetMs && L.rimPlateau.onsetMs < L.data.onsetMs), 1, 1, "[LAW 5] equal timings would kill the life");
  check("flare rise to peak (ms)", L.rimFlare.peakMs - L.rimFlare.onsetMs, 120, 250, "[MARKS-D mark 3] onset 6.33 -> peak 6.50");
}

console.log("\n=== ORGAN B — the apex seat law (MARKS-E §2/§3; R-9 order) ===");
{
  const h = ASM.handoff;
  check("seat R28 n=4 squircle (px)", h.seat(h.R, h.N_SQUIRCLE), 4.3, 4.6, "[MARKS-E §3] R*(1-2^(-1/n)) — 0.159R at n=4");
  check("seat R28 n=2 round (px)", h.seat(h.R, h.N_ROUND), 8.1, 8.3, "[MARKS-E §3] 0.293R honest-round fallback");
  check("apex ON the curve, n=4 (residual)", h.apexOnCurveResidual(h.R, 4), 0, 1e-9, "[STRUCT] the derived point satisfies |x/R|^n+|y/R|^n = 1");
  check("apex ON the curve, n=2 (residual)", h.apexOnCurveResidual(h.R, 2), 0, 1e-9, "[STRUCT]");
  check("seat shrinks as corners square (n up)", bool(h.seat(h.R, 2) > h.seat(h.R, 4)), 1, 1, "[STRUCT]");
  const fr4 = h.fractionOutside(h.R, 4, h.CHIP.visual / 2);
  const frMin = Math.min(fr4, h.fractionOutside(h.R, 3, h.CHIP.visual / 2), h.fractionOutside(h.R, 5, h.CHIP.visual / 2));
  check("chip fraction outside (n=4)", fr4, 0.55, 0.63, "[P3-AGG A1 ruling 2026-07-19] formula-exact-with-reband: apex-EXACT seat buys ~56-59%; band [0.55,0.63] derived for n 3-5, r=10 — the corpus 62-69% is DEMOTED to corpus observation (it embeds Apple's +1.6-2.5pt outward bias, which we do NOT mint; a future protrusion want is a MINTED derived token, never a band fork)");
  check("mostly-outside robust across n 3..5", frMin, 0.55, 1, "[MARKS-E §2] robust across every admissible corner model");
  check("chip optic (px)", h.CHIP.visual, 18, 22, "[MARKS-E §5] the 20pt optic kept");
  check("chip hit pad (px)", h.CHIP.hit, 44, 64, "[DESIGN] >=44 invisible pad — the accessibility floor");
  check("no claim-tokens on the chip (lumDelta gone)", bool(/lumDelta/.test(code)), 0, 0, "[n4 cure] the +12-15 lum claim is MARKS-E §5's, PAINT-verified (QP) — a token nothing derives from is deleted");
  check("chip ring alpha (hairline)", h.CHIP.ringAlpha, 0.10, 0.22, "[§3.5-A] the hairline band; zero cast shadow is structural below");
  check("the card AUTHORS its corner shape", bool(/\.vcard \{[^}]*corner-shape: squircle/.test(css)), 1, 1, "[R-9 / A3 lock] n derives from the AUTHORED shape — the support-gated seat must match an authored paint, or the probe lies");
}

console.log("\n=== ORGAN B — the close order (MARKS-E §4; the m1+M2 cures + the A7 PAINTED-beat anchor) ===");
{
  const o = ASM.sims.handoffOrder();
  check("text kill (ms)", o.textMs, 30, 50, "[MARKS-D dismissal] text dies FIRST, <=50ms BOUNDED");
  check("body WAITS for the text kill (clamp)", o.catchClamped, 1, 1, "[STRUCT] firedD clamps t<0 to the caught value — failable, not definitional (A7 cure)");
  check("body erosion (ms)", ASM.handoff.firedT(0), 170, 250, "[MARKS-E §4] the corpus exit register — never 433ms (the m1 cure)");
  check("content-out crossing inside the clock (ms)", o.contentOutMs, 90, 175, "[STRUCT] the painted-empty crossing PRECEDES the erosion clock's end — its ease-out tail is empty paint");
  // THE PAINTED BEAT (A7 cure, ledger D6): forward-scan of the opacity model vs
  // the closed-form stamped anchor — two independent computations; the old
  // clock-end anchor reads ~188-271ms here and FAILS these gates.
  const pb0 = ASM.sims.paintedBeat(0, 0), pb3 = ASM.sims.paintedBeat(3, 0), pbC = ASM.sims.paintedBeat(0, 0.4);
  check("PAINTED beat, zero seed (ms)", pb0.paintedBeatMs, 80, 140, "[MARKS-E §4] the beat the PIXELS hold: content-out -> medium relax");
  check("PAINTED beat, hot seed (ms)", pb3.paintedBeatMs, 80, 140, "[MARKS-E §4] a hot seed shortens the body, never the held beat");
  check("PAINTED beat, caught at d0=0.4 (ms)", pbC.paintedBeatMs, 80, 140, "[MARKS-E §4] d0-aware — a caught commit holds the same beat");
  check("PAINTED beat positive (min across the grid)", Math.min(pb0.paintedBeatMs, pb3.paintedBeatMs, pbC.paintedBeatMs), 1, 1e9, "[MARKS §5] the medium never relaxes over visible vapor");
  check("PAINTED beat seed-invariant (|delta| ms)", Math.abs(pb3.paintedBeatMs - pb0.paintedBeatMs), 0, 3, "[MARKS-E §4] the M2 class, gated on the DERIVED painted quantity");
  check("medium relax duration (ms)", ASM.handoff.close.mediumMs, 300, 400, "[MARKS-E §4] decelerating 300-400ms");
  check("fired T at zero seed (ms)", ASM.handoff.firedT(0), 175, 250, "[MARKS-E §4] inside the erosion band");
  check("fired T at hot seed (ms)", ASM.handoff.firedT(3), 170, 215, "[MARKS-E §4] velocity seeds RATE, clamped — still in band");
  check("fired T monotone in velocity", bool(ASM.handoff.firedT(0) >= ASM.handoff.firedT(3)), 1, 1, "[DESIGN] commit inherits gesture velocity");
  check("zero-seed medium delay (ms)", ASM.handoff.mediumDelayForMs(0), 265, 310, "[STRUCT] text 45 + content-out ~132 + beat 110 ~= 287 — stamped from the PAINTED anchor, never the clock end");
  check("return drain clock (ms)", ASM.handoff.close.returnMs, 150, 220, "[DESIGN] the pre-commit release drain — a NAMED token (n4 cure)");
  check("commit threshold d", ASM.handoff.commitAt.d, 0.45, 0.55, "[DESIGN] past half-dissolved, the release commits (n4 token)");
  check("commit threshold v (/s)", ASM.handoff.commitAt.v, 1.0, 1.5, "[DESIGN] a hot fling commits below the d threshold (n4 token)");
  const fm = ASM.sims.firedMonotone();
  check("fired erosion monotone (no landing)", fm.mono, 1, 1, "[MARKS C2] nothing overshoots where nothing lands");
  check("fired erosion completes", fm.final, 1, 1, "[STRUCT]");
  const d = ASM.handoff.drift;
  check("ghost drift magnitude (px)", d.magPx, 12, 20, "[MARKS-E §4] ~12-20pt toward the perch corner");
  check("drift aims at the perch (unit, top-left)", bool(d.ux < 0 && d.uy < 0 && Math.abs(d.ux * d.ux + d.uy * d.uy - 1) < 1e-9), 1, 1, "[MARKS-E §4] direction by TRANSFORM only");
  check("drift STAMPED from the token (both axes)", bool(/setProperty\("--vap-drift-x"/.test(wiring) && /setProperty\("--vap-drift-y"/.test(wiring)), 1, 1, "[A9 cure] magPx·u per axis, one origin");
  check("both ghosts consume the stamped drift", (css.match(/var\(--vap-drift-x\)/g) || []).length === 2 && (css.match(/var\(--vap-drift-y\)/g) || []).length === 2 ? 1 : 0, 1, 1, "[A9 cure] ghost-c AND ghost-m — one diagonal magnitude, in band");
  check("no hand drift literals in ghost transforms", bool(/transform: translate\(calc\([^;]*\* -?\d+px\)/.test(css)), 0, 0, "[A9 cure] the 22.6px diagonal breach class is locked out");
  check("the chip vaporizes first (ms)", d.chipOutMs, 0, 75, "[MARKS-E §4] the control that caused the death goes first");
  const e = ASM.sims.erosionShape();
  check("erosion band continuity (max step)", e.maxStep, 0, 0.01, "[STRUCT] no pop a scrub could reveal");
  check("coarse -> mid -> fine order", e.orderOK, 1, 1, "[DESIGN card 4] the density ladder reads as erosion");
  check("bands end clean at d=1", e.endsClean, 1, 1, "[STRUCT]");
  check("bands rest clean at d=0", e.restClean, 1, 1, "[STRUCT]");
  check("catch seed law (err)", ASM.sims.catchSeedLaw().seedErr, 0, 1e-12, "[MECH M3 cure class] the first zero-travel scrub reproduces the caught value");
}

console.log("\n=== the medium ONE-WRITER contract (F5, ratified ARBITRATION R3) ===");
{
  const c = ASM.sims.mediumContract();
  check("second claimant THROWS", c.rogueThrows, 1, 1, "[STRUCT] the claim is exclusive");
  check("same-id re-claim allowed", c.sameIdOk, 1, 1, "[STRUCT] idempotent for the one holder");
  check("writes route through the writer", c.routed, 1, 1, "[STRUCT]");
  check("un-relax routes too", c.unrouted, 1, 1, "[STRUCT]");
  check("the claim is durable + visible", c.holder, 1, 1, "[STRUCT] data-writer names the holder");
}

console.log("\n=== ORGAN C — the condense bell (MARKS-C-APPS 7.4; R-CONDENSE) ===");
{
  const b = ASM.sims.condenseBell();
  check("condense window t90 (ms)", b.t90Ms, 100, 150, "[MARKS-C-APPS 7.4] the ~120ms sweep");
  check("no wobble (overshoot)", b.overshoot, 0, 0.005, "[MARKS-C-APPS DN2] zeta>=0.95 arrival — mass WITHOUT wobble");
  check("condense zeta", ASM.drawer.CONDENSE.zeta, 0.95, 1.0, "[MARKS-C-APPS DN2]");
  check("velocity accelerates FIRST", b.accelFirst, 1, 1, "[MARKS-C-APPS 7.4] 2.5k->10.2k->4.0k px/s — the bell, not a throw-in");
  check("velocity peak position (frac of window)", b.tPeakFrac, 0.10, 0.60, "[MARKS-C-APPS 7.4] peak mid-bell, never at t=0");
  check("peak/mean velocity ratio", b.peakOverMean, 1.4, 2.2, "[MARKS-C-APPS 7.4] measured 10.2k/5.7k ~= 1.8");
}

console.log("\n=== ORGAN C — grow-with-content + the fission conservation ===");
{
  const g = ASM.sims.growSchedule();
  check("section stagger (ms)", g.stepMs, 60, 100, "[MARKS-C-APPS 7.4] ~80ms steps");
  check("section arrival t90 (ms)", g.sectionT90Ms, 100, 150, "[DESIGN] the condense register — one drawer clock family");
  check("full growth (ms)", g.totalMs, 350, 550, "[MARKS-C-APPS 7.4] ~450ms of staggered arrivals");
  check("the drawer only GROWS", g.monotone, 1, 1, "[MARKS-C-APPS DN3] sheets are rigid; drawers grow — never mixed");
  check("section count", ASM.drawer.GROW.sections, 5, 5, "[DESIGN] head + three islands + foot");
  const i = ASM.sims.islandConservation();
  check("islands fission from the crests", i.count, 3, 3, "[DESIGN] one island per crest layer");
  check("every body has a parent + a carrier", i.allParented, 1, 1, "[MARKS-C-MUSIC mark 5] the conservation discipline");
  check("carrier hues conserved verbatim", i.huesConserved, 1, 1, "[MARKS-C-MUSIC mark 5] nothing blinks; every body has a parent");
}

console.log("\n=== CSS <-> physics cross-checks (the M7 mirror locks — no drifting literals) ===");
{
  const d = ASM.dock;
  check("CSS dock fill == tokens", bool(css.includes(`background: rgba(${d.fill.r}, ${d.fill.g}, ${d.fill.b}, ${d.fill.a})`)), 1, 1, "[STRUCT] the §3.5-C floor, painted verbatim");
  check("CSS dock blur == token (px)", bool(css.includes(`backdrop-filter: blur(${d.blurPx}px) saturate(1.15)`)), 1, 1, "[STRUCT]");
  check("CSS dock rim+bevel == tokens", bool(new RegExp(`\\.blackdock \\{[^}]*inset 0 0 0 1px rgba\\(255, 244, 224, ${d.rimAlpha}\\), inset 0 1px 0 rgba\\(255, 244, 224, ${d.bevelAlpha}\\)`).test(css)), 1, 1, "[STRUCT] night arm alphas, painted verbatim");
  check("CSS breath period == token (s)", bool(css.includes(`animation: meniscus-breath ${d.breath.periodS}s`)), 1, 1, "[STRUCT]");
  const up = css.match(/@keyframes meniscus-breath[\s\S]*?10% \{ filter: brightness\(([\d.]+)\)/);
  const dn = css.match(/@keyframes meniscus-breath[\s\S]*?0% \{ filter: brightness\(([\d.]+)\)/);
  check("CSS breath peak == 1 + amp", up ? Math.abs(+up[1] - (1 + d.breath.amp)) : 9, 0, 1e-9, "[STRUCT] +/-18% about the mean");
  check("CSS breath trough == 1 - amp", dn ? Math.abs(+dn[1] - (1 - d.breath.amp)) : 9, 0, 1e-9, "[STRUCT]");
  const o = ASM.occlusion;
  check("CSS dark mass top == MASS_TOP", bool(css.includes(`rgb(16 14 12 / ${o.MASS_TOP})`)), 1, 1, "[STRUCT]");
  check("CSS waterline stop == WATERLINE", bool(css.includes(`transparent ${+(o.WATERLINE * 100).toFixed(2)}%`)), 1, 1, "[STRUCT] the sunk band ends where the model says");
  {
    // [A9 cure] the darkmass INTERIOR is the model's curve — every painted stop
    // parsed and compared against occlusion.at(u); POW=1 (or any hand stop, like
    // the convicted 0.55@30%) fails here. Multi-stop means the POW knob PAINTS.
    const dm = css.slice(css.indexOf(".darkmass"), css.indexOf(".meniscus"));
    const stops = [...dm.matchAll(/rgb\(16 14 12 \/ ([\d.]+)\) ([\d.]+)%/g)].map((s) => [+s[1], +s[2]]);
    check("darkmass stop count (multi-stop — POW paints)", stops.length, 4, 8, "[A9 cure] an interior curve, not one hand stop");
    const worst = stops.length ? Math.max(...stops.map(([a, p]) => Math.abs(a - o.at(p / 100)))) : 9;
    check("darkmass stops == occlusion.at(u) (max |err|)", worst, 0, 0.005, "[A9 cure] every painted stop sits ON the gated profile — the 0.55@30% breach (0.33 modeled) fails here");
  }
  {
    // [A9 cure] the rim-flare GAIN paints: flare/plateau opacity ratio == token
    const plat = css.match(/\.blackdock\.rim-plateau \.meniscus \{ animation: none; opacity: ([\d.]+)/);
    const flare = css.match(/\.blackdock\.rim-flare \.meniscus \{\s*animation: none; opacity: ([\d.]+)/);
    check("flare/plateau painted ratio == gain", plat && flare ? +flare[1] / +plat[1] : 0, ASM.ladder.rimFlare.gain - 0.02, ASM.ladder.rimFlare.gain + 0.02, "[MARKS-D mark 3] 2.1x in PAINT, not just in the token table");
    check("flare release clock named (ms)", ASM.ladder.rimFlare.releaseMs, 200, 400, "[n4 cure] light cools on a NAMED clock (law 19 class)");
  }
  const geo = css.match(/height: calc\((\d+)px \+ var\(--asm-g\) \* (\d+)px \+ var\(--asm-grow\) \* (\d+)px\)/);
  check("CSS height calc == pill/grown/travel tokens", geo && +geo[1] === d.pill.h && +geo[2] === d.grown.h - d.pill.h && +geo[3] === ASM.drawer.GROW.travelPx ? 1 : 0, 1, 1, "[STRUCT] 46 + g*274 + grow*150, all from ASM");
  const wgeo = css.match(/width: calc\((\d+)px \+ var\(--asm-g\) \* (\d+)px\)/);
  check("CSS width calc == pill/grown tokens", wgeo && +wgeo[1] === d.pill.w && +wgeo[2] === d.grown.w - d.pill.w ? 1 : 0, 1, 1, "[STRUCT] 200 + g*130, both from ASM");
  check("drawer head share HEAD_G", ASM.drawer.HEAD_G, 0.35, 0.5, "[DESIGN] the condensed head — roughly half the session mass");
  const w = ASM.drawer.GROW.weights;
  check("grow weights count == sections", w.length, ASM.drawer.GROW.sections, ASM.drawer.GROW.sections, "[STRUCT] one list drives sim AND paint");
  check("grow weights sum to 1", Math.abs(w.reduce((a, b) => a + b, 0) - 1), 0, 1e-9, "[STRUCT] the growth scalar lands exactly at 1");
  check("rim clocks stamped (plateau + flare + chip)", bool(/setProperty\("--lad-plateau-ms"/.test(wiring) && /setProperty\("--lad-flare-ms"/.test(wiring) && /setProperty\("--vap-chip-ms"/.test(wiring)), 1, 1, "[STRUCT] every transition clock originates in ASM");
}

console.log("\n=== the session FSM (one conductor, legal edges only) ===");
{
  const f = ASM.sims.fsmTruth();
  check("the legal chain runs whole", f.legalAll, 1, 1, "[STRUCT] rest->deploy->live->flare->pin->cut->condense->grow->drawer->rest");
  check("illegal edges all refuse", f.illegalAllNull, 1, 1, "[STRUCT] no flare from rest; no cut without the pin; flare is committed");
}

console.log("\n=== structural asserts (the contract in the file) ===");
{
  check("no @supports gate", bool(/@supports/.test(code)), 0, 0, "[STRUCT] the lying-gate law");
  check("no SVG filter on any hot path", bool(/feTurbulence|filter:\s*url\(/.test(code)), 0, 0, "[STRUCT]");
  check("no light-dark() inset fragments", bool(/light-dark\([^)]*inset/.test(code)), 0, 0, "[STRUCT] the WebKit shadow trap");
  check("zero Math.random (honesty)", bool(/Math\.random/.test(code)), 0, 0, "[STRUCT] no fake signal anywhere");
  check("no :root/documentElement publication", bool(/documentElement\.style/.test(code)), 0, 0, "[MECH M5] scalars publish on component roots");
  check("?hud=0 instrumentation switch", bool(/\[\?&\]hud=0/.test(code)), 1, 1, "[STRUCT] traces run uncontaminated");
  check("PRM branch present", bool(/prefers-reduced-motion/.test(code)), 1, 1, "[STRUCT] step, not ritual");
  check("pointercancel handled", bool(/pointercancel/.test(code)), 1, 1, "[STRUCT] a lost pointer drains, never commits");
  check("perch carries an aria-label", bool(/class="perch"[^>]*aria-label=/.test(code)), 1, 1, "[STRUCT] the close names its victim");
  check("focus-visible ring present", bool(/\.perch:focus-visible/.test(code)), 1, 1, "[STRUCT] keyboard focus is truth");
  check("keyboard commit paths", (code.match(/ev\.key === "Enter" \|\| ev\.key === " "/g) || []).length, 2, 2, "[STRUCT] perch + summon — full function, zero pop");
  check("role=status relay present", bool(/role="status"/.test(code)), 1, 1, "[STRUCT]");
  check("masks never move (no mask-position)", bool(/mask-position/.test(code)), 0, 0, "[STRUCT] mask motion repaints — banned");
  check("no transition animates a mask", bool(/transition[^;]*mask/.test(css)), 0, 0, "[STRUCT]");
  check("no transition animates any filter", bool(/transition[^;]*filter/.test(css)), 0, 0, "[STRUCT] blur radii are FIXED; layer opacity moves");
  check("filter keyframes: exactly the two declared", (css.match(/@keyframes\s+(text-condense|meniscus-breath)/g) || []).length, 2, 2, "[STRUCT] text deblur + meniscus breath — both declared, cost QUEUED-PAINT");
  check("backdrop-filter census (3 surfaces x 2 prefixes)", (css.match(/backdrop-filter:/g) || []).length, 6, 6, "[STRUCT] card medium + card body + dock — NO world scrim exists");
  check("ghosts PARK at rest", bool(/\.card-root\[data-parked="1"\] \.v-ghost \{ visibility: hidden/.test(css)), 1, 1, "[MECH m4 cure class]");
  check("chip has zero cast shadow", bool(/\.perch \.pchip \{[^}]*box-shadow:\s*inset[^}]*\}/.test(css)) && !/\.perch \.pchip \{[^}]*box-shadow:[^};]*(?<!inset[^;]*)0 \d+px/.test(css) ? 1 : 0, 1, 1, "[MARKS-E §5] separation is rim-borne — inset ring only");
  check("one writer claimed in the wiring", (wiring.match(/claimMediumWriter\(/g) || []).length, 1, 1, "[STRUCT] the conductor is the ONLY claimant");
  check("no direct medium writes in the wiring", bool(/cardMediumEl\.classList/.test(wiring)), 0, 0, "[STRUCT] every write routes through the writer");
  check("vapor-handoff dispatched (>=2 paths)", (code.match(/new CustomEvent\("vapor-handoff"/g) || []).length >= 2 ? 1 : 0, 1, 1, "[STRUCT] pointer + keyboard both reach the seam");
  check("one vapor-handoff listener", (code.match(/addEventListener\("vapor-handoff"/g) || []).length, 1, 1, "[STRUCT] the conductor owns the seam");
  check("close clocks stamped FROM the physics", bool(/setProperty\("--vap-medium-delay-ms"/.test(wiring) && /setProperty\("--lad-text-ms"/.test(wiring)), 1, 1, "[STRUCT] no hand mirrors (the M7 lesson)");
  check("no clock literals in CSS (--vap-*/--lad-*)", bool(/--(vap|lad)-[a-z-]*ms:\s*\d/.test(css)), 0, 0, "[STRUCT] the CSS defines none of the stamped clocks");
  check("perch seat stamped, shape-aware", bool(/CSS\.supports\("corner-shape", "squircle"\)/.test(wiring)), 1, 1, "[MARKS-E §3] n from the corner grammar; honest round fallback");
  check("crest hue tokens declared once", (css.match(/--crest-h-1:/g) || []).length, 1, 1, "[STRUCT]");
  check("islands read the crest tokens", ["--crest-h-1", "--crest-h-2", "--crest-h-3"].every((t) => new RegExp(`\\.island-\\d \\.glow \\{ background: hsl\\(var\\(${t}\\)`).test(css)) ? 1 : 0, 1, 1, "[STRUCT] hue conservation is token IDENTITY, not a copy");
  check("crests read the same tokens", ["--crest-h-1", "--crest-h-2", "--crest-h-3"].every((t) => css.includes(`hsl(var(${t})`)) ? 1 : 0, 1, 1, "[STRUCT]");
  check("exactly 3 crest layers in the DOM", (code.match(/class="crest crest-\d"/g) || []).length, 3, 3, "[DESIGN card 5]");
  check("crests never translate (phase pinned)", bool(/\.crest[^{]*\{[^}]*translate/.test(css)), 0, 0, "[MARKS-D mark 2] crests inflate IN PLACE; only the field leans");
  {
    const span = code.slice(code.indexOf('id="blackdock"'), code.indexOf("<!-- /blackdock -->"));
    check("islands live INSIDE the dock body", (span.match(/class="island island-\d"/g) || []).length, 3, 3, "[MARKS-C-MUSIC mark 5] the drawer IS the dock — no second surface born");
  }
  check("no separate drawer element", bool(/id="drawer"/.test(code)), 0, 0, "[STRUCT] one body, three postures (data-posture)");
  check("posture attribute present", bool(/data-posture="pill"/.test(code)), 1, 1, "[STRUCT]");
  check("world tap target present (non-modal truth)", bool(/id="worldTap"/.test(code)), 1, 1, "[MARKS-D mark 3] taps beneath still land — no scrim ever");
  check("meniscus breath is autonomous", bool(/meniscus-breath[^}]*var\(--asm-level/.test(css)), 0, 0, "[MARKS-D mark 2] at-rest light is never signal-fed");
  check("dock geometry rides ONE scalar", bool(/height: calc\(46px \+ var\(--asm-g\) \* 274px/.test(css) && /width: calc\(200px \+ var\(--asm-g\) \* 130px/.test(css)), 1, 1, "[MARKS-D mark 3] both axes, one spring — the axes never decouple");
  check("release velocity is windowed (<=120ms boxcar)", (wiring.match(/now - (samples|vSamples)\[0\]\.t > 120/g) || []).length, 2, 2, "[MECH m6 cure class] never a single sample pair");
}

console.log("\n=== the pass-4 cures (A4/A5 grammar · n3 law-20 · n4 hygiene · D7 fence) ===");
{
  // A5 — the two-writer window on --vap-t is closed, per-organ generations
  check("the return drain is generation-guarded", bool(/const back = \(now\) => \{\s*if \(vapGen !== myGen\) return;/.test(wiring)), 1, 1, "[A5 cure] a commit mid-drain kills the second writer BEFORE it writes");
  check("the handoff seam cancels the drain rAF", bool(/vapor-handoff", \(ev\) => \{[\s\S]{0,220}cancelAnimationFrame\(vRaf\)/.test(wiring)), 1, 1, "[A5 cure] no two-writer window on --vap-t at commit — the D6 re-run precondition");
  check("per-organ generation guards (no shared gen)", bool(/dockGen/.test(wiring) && /vapGen/.test(wiring) && !/\bgen\b\s*=\s*0/.test(wiring)), 1, 1, "[A5 cure] one organ's gesture never cancels the other's finalization (the m8 lesson, scoped)");
  // A4 — the glide is catchable; no dead zones, no orphan channels
  check("the dock glide is catchable (Organ-B pattern)", bool(/if \(gSpring\) \{ gSpring = null; dockGen\+\+; \}/.test(wiring)), 1, 1, "[A4 cure] pointerdown seizes the spring's x as dragG0 at ANY deploying posture");
  check("under-thrown return clears the ladder channels", bool(/dockGen\+\+; dock\.classList\.remove\("text-in"/.test(wiring)), 1, 1, "[A4 cure] a caught fired deploy scrubbed home leaves no orphan text");
  check("live down-scrub scope DECLARED", bool(/DECLARED SCOPE:/.test(wiring)), 1, 1, "[A4 cure] in writing at the listener, not implied");
  // n3 — law 20: engagement light is state
  check("hold-light rows on the in-organ controls", (wiring.match(/makeHoldLight\(\$\("(summonBtn|commitBtn)"\)\)/g) || []).length, 2, 2, "[LAW 20] Summon + Commit ride the pressDrain row for the hold's life");
  check("controls consume the sustained hold light", (css.match(/var\(--ctl-press, 0\)/g) || []).length, 4, 8, "[LAW 20] scale + ring light, both controls — state, not a click pulse");
  check("no event-pulse press var remains", bool(/--asm-press/.test(code)), 0, 0, "[n3 cure] the pulse ack is replaced by the sustained envelope");
  // n4 — token hygiene: no dead scalars, no hand literals
  check("no dead published scalar (--asm-level)", bool(/--asm-level/.test(code)), 0, 0, "[n4 cure] written-never-consumed is deleted; the HUD relays the level for QP-3");
  check("g clamp is a token", ASM.dock.gClamp, 1.05, 1.20, "[n4 cure] ~k·v headroom at a hot (~5/s) release");
  check("writeG clamps BY the token", bool(/Math\.min\(ASM\.dock\.gClamp, v\)/.test(wiring)), 1, 1, "[n4 cure] no naked 1.12 in the writer");
  check("under-throw g threshold (token)", ASM.dock.release.underG, 0.30, 0.40, "[DESIGN] below ~a third grown, a slow release returns");
  check("under-throw v threshold (token, /s)", ASM.dock.release.underV, 0.40, 0.60, "[DESIGN] a warm fling still deploys");
  check("release consumes the tokens", bool(/ASM\.dock\.release\.underG/.test(wiring) && /ASM\.handoff\.commitAt\.d/.test(wiring)), 1, 1, "[n4 cure] both release ladders read the table");
  check("return drain consumes the named clock", bool(/T = ASM\.handoff\.close\.returnMs/.test(wiring)), 1, 1, "[n4 cure] the last hand clock is dead");
  // D7 — the world-dim probe fence, computed here and PRINTED for the lossless re-run
  const ext = ASM.dock.clampedExtent();
  check("D7 fence: clamped half-width (px)", ext.halfW, 172.79, 172.81, "[D7] (pill.w + gClamp·130)/2 — probes sit STRICTLY OUTSIDE center±this");
  check("D7 fence: clamped session height (px)", ext.height, 352.87, 352.89, "[D7] 46 + gClamp·274 at grow=0 — the session-phase extent");
  check("CSS dock top fixed (300px)", bool(/\.blackdock \{[^}]*top: 300px/.test(css)), 1, 1, "[STRUCT] the fence arithmetic anchors here");
  console.log(`      D7 probe fence @ gClamp=${ASM.dock.gClamp}: x strictly outside [center−${ext.halfW.toFixed(1)}, center+${ext.halfW.toFixed(1)}]px · y strictly outside [300, ${(300 + ext.height).toFixed(1)}]px (phone frame; drawer adds grow·${ASM.drawer.GROW.travelPx}px)`);
  // D8 — the paint-path integrator (16.7ms rAF ticks) must land the CERTIFIED
  // intrinsic overshoot: the old single-step Euler painted 1.74% against the
  // 4.15% certification (the sim/paint gap's dominant modelable term).
  {
    const s = ASM.makeSpring(ASM.presets.panel, 0, 0);
    let t = 0, peak = 0;
    while (t < 2) { s.step(1, 1 / 60); t += 1 / 60; peak = Math.max(peak, s.x); }
    check("D8: paint-dt overshoot == certified (|delta|)", Math.abs(peak - 1 - ASM.sims.springStats("panel").overshoot), 0, 0.002, "[D8 cure] 60fps ticks substep to the certification rate — a single-step revert reads 2.4pp low and FAILS");
  }

  // [P4-AGG A2 cure 2026-07-19] the D2 age-out on BOTH release estimators — the
  // prune-in-move-only boxcar replays pre-hold velocity unless release ages it.
  console.log("\n--- the D2 still-hold age-out (A2 cure) ---");
  check("stillHoldMs token in the D2 band", ASM.dock.stillHoldMs, 80, 300, "[D2 law] a still finger's velocity is ZERO; morphdock ships 120");
  const ageOuts = (code.match(/performance\.now\(\) - b\.t > ASM\.dock\.stillHoldMs\) v = 0/g) || []).length;
  check("BOTH organ releases age the boxcar", ageOuts, 2, 2, "[A2] Organ A purchase + Organ B commit — the false-commit class is wiring-locked out");
  check("no direct hud writes outside hudSay", (code.match(/hud\.textContent/g) || []).length, 1, 1, "[minor-5] only hudSay touches the DOM — the ?hud=0 vow holds on every path");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
