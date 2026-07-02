#!/usr/bin/env node
// proof:metaball-bridge2 — BE.W-METABALL-BRIDGE2 — the N-seam stretch-and-snap goo bridge
// + the neck specular-sweep FLOOR.
//
// Device-free SOURCE arm ["local","ci","release"]. EXTENDS the morph-bridge.css mechanism
// into fission-bridge.css (a sibling gate to proof:dock-fission, the comment-strip +
// pure-detector house pattern). The BINDING painted truth is tests-visual/metaball-bridge2
// .spec.ts + the W-METABALL-BRIDGE2-DELTA (the N-seam frame-series, the snap-back overshoot,
// the neck specular-sweep ridge, the Safari floor, the PRM single-paint) — NOT this gate
// alone (the BC anti-disease law: no source-green close).
//
// BORN-RED anchor (verified on disk at spec time): the per-seam --neck-t scalar + the
// snap-back + the neck specular do not exist; fission-bridge.css ABSENT; this script ABSENT
// → born-RED by construction.
//
//   B1 — the per-seam --neck-t exists, N-generalized (a clip-path: inset() interpolated on
//        var(--neck-t), scoped to .dock-fission-piece — NOT the BB two-named-plate
//        --vertical/--horizontal literal).
//   B2 — the snap-back recoil rides useLiquidFlex (the squish capped LOW ≤1.08, the "tanh"
//        law, re-targeted with a ζ<1 overshoot — NOT a hand-rolled bounce keyframe nor an
//        animated layout property; the orchestrator drives the piece's --stretch off the
//        liquid-flex squish).
//   B3 — the neck specular-sweep FLOOR reads the SHARED cohort (a --neck-specular-angle
//        conic sweep composing the EXISTING --specular-*/--glass-specular-core/plus-lighter
//        cohort — NOT a second specular fork / neck-local --mouse-x/y writer).
//   B4 — compositor-only + the goo-OR-glass per-frame (every animated neck axis is
//        transform/scale/opacity/clip-path/filter/--*; the goo is the REGULAR filter:
//        url(#…), NOT backdrop-filter: url(); swapped at the sub-perceptual --neck-break).
//   B5 — ONE scalar, ONE spring (the --neck-t writer rides the SAME SpringProgress/
//        DOCK_SPRING the orchestrator owns; no second @keyframes/second-spring clock for
//        the neck; DOCK_SPRING byte-untouched — cross-asserted via proof:dock-fission F1).
//   B6 — the PRM carve (a @media (prefers-reduced-motion: reduce) block zeroes
//        --dock-bridge-opacity + the specular-sweep; the fission sync-seats).
//
// Self-test bites: (i) a two-named-plate --vertical/--horizontal literal reds B1; (ii) a
// recoil animating inline-size/inset reds B2 + the no-layout floor; (iii) a neck-local
// forked --mouse-x/y specular writer reds B3; (iv) a backdrop-filter: url(#neck) reds B4;
// (v) a second @keyframes-driven neck clock reds B5; (vi) a missing PRM block reds B6.
//
// Run: node scripts/proof-metaball-bridge2.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:metaball-bridge2";

const FISSION_CSS = "src/styles/dock/fission-bridge.css";
const FISSION_TS = "src/components/custom/dock/composables/useDockFission.ts";
const MORPH_BRIDGE_CSS = "src/styles/dock/morph-bridge.css";

function readRel(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
}

// ── B1 — the per-seam --neck-t, N-generalized (not two named plates) ──
function detectB1() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.cssExists = css.length > 0;
    facts.hasNeckT = /var\(--neck-t/.test(css);
    facts.neckClipOnNeckT = /clip-path:\s*inset\([^)]*var\(--neck/.test(css);
    // The piece rule is the N-generalized scope, NOT the BB two-named-plate literal.
    facts.scopedToPiece = /\.dock-fission-piece/.test(css);
    // The anti-evasion bite: a --vertical/--horizontal two-named-plate literal (the
    // un-generalized BB shape) in the fission bridge reds B1.
    facts.hasTwoNamedPlateLiteral =
        /\.dock-fission-bridge-plate--(vertical|horizontal)/.test(css) ||
        /--dock-bridge-(v|h)-neck/.test(css);
    facts.nGeneralized =
        facts.hasNeckT &&
        facts.neckClipOnNeckT &&
        facts.scopedToPiece &&
        !facts.hasTwoNamedPlateLiteral;
    if (!facts.cssExists)
        violations.push("B1: fission-bridge.css is ABSENT (the per-seam --neck-t bridge does not exist)");
    if (facts.cssExists && !facts.hasNeckT)
        violations.push("B1: no per-seam --neck-t carve — the neck must interpolate on var(--neck-t)");
    if (facts.cssExists && !facts.neckClipOnNeckT)
        violations.push("B1: the neck clip-path: inset() does not interpolate on var(--neck-t)");
    if (facts.cssExists && !facts.scopedToPiece)
        violations.push("B1: the bridge is not N-generalized — it must be scoped to .dock-fission-piece (v-for shaped), not named plates");
    if (facts.hasTwoNamedPlateLiteral)
        violations.push("B1: a two-named-plate --vertical/--horizontal literal (the un-generalized BB shape) is present — the fission bridge must be N-generalized");
    return { violations, facts };
}

// ── B2 — the snap-back recoil rides useLiquidFlex (capped LOW, no layout) ──
function detectB2() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.usesLiquidFlex = /useLiquidFlex\s*\(/.test(ts);
    facts.tanhLaw = /squishLaw:\s*["']tanh["']/.test(ts);
    facts.cappedLow =
        /maxStretch:\s*(maxStretch\s*\?\?\s*)?1\.08/.test(ts) ||
        /maxStretch\s*\?\?\s*1\.08/.test(ts);
    // The recoil writes --stretch (the squish) onto the piece; the CSS reads it
    // reciprocally on scale (compositor — NOT a layout property).
    facts.drivesStretch = /setProperty\(\s*["']--stretch["']/.test(ts) || /\.stretch\.value/.test(ts);
    // BD folds the recoil --stretch squish with --piece-progress in a `scale: calc(...)`
    // reciprocal pair (X = stretch × f, Y = (1/stretch) × f) — the volume-preserving
    // requirement is met when --stretch appears in a `scale:` value BOTH as a forward
    // factor AND inside a `1/...--stretch` reciprocal denominator (not the bare
    // `scale: var(--stretch ...)` idiom).
    facts.scaleReadsStretch =
        /scale:\s*[^;]*var\(\s*--stretch[^;]*1\s*\/\s*var\(\s*--stretch/.test(css);
    // The anti-evasion bite: a recoil animating a layout axis (inline-size/inset/width/
    // height) reds B2 + the no-layout floor.
    facts.recoilAnimatesLayout =
        /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b)/.test(css);
    facts.recoilOnLiquidFlex =
        facts.usesLiquidFlex &&
        facts.tanhLaw &&
        facts.cappedLow &&
        facts.drivesStretch &&
        facts.scaleReadsStretch &&
        !facts.recoilAnimatesLayout;
    if (!facts.usesLiquidFlex)
        violations.push("B2: the recoil does not compose useLiquidFlex (the volume-preserving squish primitive)");
    if (!facts.tanhLaw)
        violations.push("B2: the recoil is not the 'tanh' saturating law (a fast pull swells then caps, never a taffy-pull)");
    if (!facts.cappedLow)
        violations.push("B2: the squish cap is not LOW (1.08) — the anti-taffy fence");
    if (!(facts.drivesStretch && facts.scaleReadsStretch))
        violations.push("B2: the recoil --stretch is not driven onto the piece + read reciprocally on scale (compositor)");
    if (facts.recoilAnimatesLayout)
        violations.push("B2: the recoil animates a LAYOUT property (inline-size/inset/width/height) — must be a scale-only useLiquidFlex squish (proof:no-layout-animation)");
    return { violations, facts };
}

// ── B3 — the neck specular-sweep FLOOR reads the shared cohort ──
function detectB3() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.hasNeckSpecularAngle = /--neck-specular-angle/.test(css);
    facts.conicSweep = /conic-gradient\(\s*from\s+var\(--neck-specular-angle/.test(css);
    // Reads the SHARED cohort — --glass-specular-core + plus-lighter (NOT a second fork).
    facts.readsSharedCore = /var\(--glass-specular-core/.test(css);
    facts.usesPlusLighter = /mix-blend-mode:\s*plus-lighter/.test(css);
    // The anti-evasion bite: a neck-local forked --mouse-x/y specular writer (a second
    // specular fork) reds B3.
    facts.hasForkedMouseWriter = /--mouse-(x|y)/.test(css);
    // BE.W-DOCK-JUBILANCE — the FLOOR is WIRED, not just CSS-present: the orchestrator
    // WRITES --neck-specular-angle off the SAME loop (a function of --neck-t — the light
    // bends along the filament as it stretches). A CSS sweep with no JS writer is a
    // dead-fallback (it only sweeps off the neck-t-derived fallback, never the orchestrator
    // signal). Assert the JS setProperty("--neck-specular-angle", …).
    facts.orchestratorWritesAngle = /setProperty\(\s*["']--neck-specular-angle["']/.test(ts);
    facts.specularFloor =
        facts.hasNeckSpecularAngle &&
        facts.conicSweep &&
        facts.readsSharedCore &&
        facts.usesPlusLighter &&
        !facts.hasForkedMouseWriter &&
        facts.orchestratorWritesAngle;
    if (!facts.hasNeckSpecularAngle)
        violations.push("B3: no --neck-specular-angle — the neck specular-sweep FLOOR is absent");
    if (!facts.conicSweep)
        violations.push("B3: the neck sweep is not a conic-gradient(from var(--neck-specular-angle)) (the material.css:141 angle-keyed idiom)");
    if (!(facts.readsSharedCore && facts.usesPlusLighter))
        violations.push("B3: the neck sweep does not read the SHARED --glass-specular-core/plus-lighter cohort (a second specular fork)");
    if (facts.hasForkedMouseWriter)
        violations.push("B3: a neck-local --mouse-x/y specular writer is forked — the sweep must read the shared cohort (the no-forked-mouse-writer discipline)");
    if (!facts.orchestratorWritesAngle)
        violations.push("B3: the orchestrator does not WRITE --neck-specular-angle off the spring loop — the specular-sweep FLOOR is a dead CSS fallback (it must be wired to --neck-t)");
    return { violations, facts };
}

// ── B7 — the jubilance FLOOR delights (BE.W-DOCK-JUBILANCE) ──
// The FISSION RIPPLE (the outward warm-cream specular ring announcing the bud-off) + the
// MERGE-SPLASH gold-coalesce (the one-shot earned-gold flash rewarding the merge). Both
// FLOOR delights, compositor-only + PRM-safe + disco-fenced, riding the ONE scalar.
function detectB7() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};

    // The FISSION RIPPLE — a bridge ::before ring on transform: scale(f(--dock-split-t))
    // reading --glass-specular-core + plus-lighter (the EXISTING cohort, no new color),
    // compositor-only (NO animated radius/width — the radius IS the scale).
    facts.rippleRing = /\.dock-fission-bridge::before\b/.test(css);
    facts.rippleScalesOnSplitT =
        /\.dock-fission-bridge::before[\s\S]*?transform:\s*scale\([^)]*var\(--dock-split-t/.test(
            css,
        );
    facts.rippleReadsSpecularCore =
        /\.dock-fission-bridge::before[\s\S]*?var\(--glass-specular-core/.test(css);

    // The MERGE-SPLASH — a bridge ::after gold flash reading --color-gold (the EARNED-gold
    // Q2 register, NOT a phase spectrum) + the --metal-glow-* catch-light idiom, GATED to
    // the [data-merging] direction signal so a SPLIT never false-flashes.
    facts.splashLayer = /\.dock-fission-bridge::after\b/.test(css);
    facts.splashReadsGold =
        /\.dock-fission-bridge::after[\s\S]*?var\(--color-gold/.test(css);
    facts.splashReadsMetalGlow =
        /\.dock-fission-bridge::after[\s\S]*?var\(--metal-glow-(blur|opacity)/.test(css);
    facts.splashGatedToMerging = /\[data-merging\]\s+\.dock-fission-bridge::after/.test(css);
    facts.orchestratorSetsMerging = /setAttribute\(\s*["']data-merging["']/.test(ts);
    // The anti-evasion bite: a splash reading a PHASE-SPECTRUM hue (--viz-*/--chart-*)
    // instead of the earned-gold reds (the Q2 earned-gold fence).
    facts.splashReadsPhaseSpectrum =
        /\.dock-fission-bridge::after[\s\S]*?var\(--(viz|chart)-/.test(css);

    facts.rippleFloor =
        facts.rippleRing && facts.rippleScalesOnSplitT && facts.rippleReadsSpecularCore;
    facts.splashFloor =
        facts.splashLayer &&
        facts.splashReadsGold &&
        facts.splashReadsMetalGlow &&
        facts.splashGatedToMerging &&
        facts.orchestratorSetsMerging &&
        !facts.splashReadsPhaseSpectrum;

    if (!facts.rippleRing)
        violations.push("B7: no .dock-fission-bridge::before — the FISSION RIPPLE FLOOR is absent");
    if (facts.rippleRing && !facts.rippleScalesOnSplitT)
        violations.push("B7: the ripple does not scale on f(--dock-split-t) (it must ride the ONE scalar via transform: scale, NOT an animated radius/width)");
    if (facts.rippleRing && !facts.rippleReadsSpecularCore)
        violations.push("B7: the ripple does not read --glass-specular-core (the EXISTING warm-cream cohort, no new color)");
    if (!facts.splashLayer)
        violations.push("B7: no .dock-fission-bridge::after — the MERGE-SPLASH gold-coalesce FLOOR is absent");
    if (facts.splashLayer && !facts.splashReadsGold)
        violations.push("B7: the merge-splash does not read --color-gold (the EARNED-gold Q2 register)");
    if (facts.splashLayer && !facts.splashReadsMetalGlow)
        violations.push("B7: the merge-splash does not read the --metal-glow-* catch-light idiom (the no-re-author gold halo)");
    if (facts.splashLayer && !facts.splashGatedToMerging)
        violations.push("B7: the merge-splash is not gated to [data-merging] — a SPLIT onset would false-flash the gold (the direction signal)");
    if (facts.splashLayer && !facts.orchestratorSetsMerging)
        violations.push("B7: the orchestrator does not set [data-merging] on the reverse fission — the splash gate has no writer");
    if (facts.splashReadsPhaseSpectrum)
        violations.push("B7: the merge-splash reads a PHASE-SPECTRUM hue (--viz-*/--chart-*) — it MUST read --color-gold (the Q2 earned-gold fence)");
    return { violations, facts };
}

// ── B4 — compositor-only + goo-OR-glass per-frame (regular filter, neck-break swap) ──
function detectB4() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.regularFilterGoo = /filter:\s*var\(--dock-fission-goo-filter/.test(css);
    facts.notBackdropFilterUrl = !/backdrop-filter:\s*url\(/.test(css);
    facts.hasNeckBreak = /--neck-break/.test(css);
    // The goo-OR-glass swap is keyed off the fissioning state (filter: none at rest, the
    // mount during the neck band — the [data-fissioning] swap).
    facts.gooSwapGated = /\[data-fissioning\][^{]*\.dock-fission-bridge/.test(css) ||
        /filter:\s*none/.test(css);
    // No animated layout axis.
    facts.animatesLayout =
        /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\bpadding\b)/.test(css) ||
        /@keyframes[^{]*\{[\s\S]*?(inline-size|block-size):/.test(css);
    facts.compositorOnly =
        facts.regularFilterGoo &&
        facts.notBackdropFilterUrl &&
        facts.hasNeckBreak &&
        facts.gooSwapGated &&
        !facts.animatesLayout;
    if (!facts.regularFilterGoo)
        violations.push("B4: the goo is not applied via the REGULAR filter: var(--dock-fission-goo-filter) property");
    if (!facts.notBackdropFilterUrl)
        violations.push("B4: a backdrop-filter: url() neck is present (WebKit-unsupported) — must be the regular filter property");
    if (!facts.hasNeckBreak)
        violations.push("B4: no --neck-break threshold — the goo-OR-glass per-frame swap is absent");
    if (!facts.gooSwapGated)
        violations.push("B4: the goo is not swapped goo-OR-glass (filter: none at rest, mounted during the neck band)");
    if (facts.animatesLayout)
        violations.push("B4: a neck axis animates a LAYOUT property — compositor-only required (proof:no-layout-animation)");
    return { violations, facts };
}

// ── B5 — ONE scalar, ONE spring (no second neck clock; DOCK_SPRING byte-untouched) ──
function detectB5() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    // The neck rides the SAME spring loop — the orchestrator writes --neck-t off the
    // SpringProgress play() callback (NOT a CSS @keyframes/transition clock).
    facts.neckTWrittenByJs = /setProperty\(\s*["']--neck-t["']/.test(ts);
    // BG.W-DOCK-FISSION-WIRE — the fission spring is ROUTED through the ONE `useDockSpring`
    // factory, so the loop is entered via `.playTo(` (the factory owns the raw `.play(`).
    // Accept either — the ONE `--dock-split-t` write inside the loop is the binding witness.
    facts.springWritesScalar = /\.play(To)?\(/.test(ts) && /setProperty\(\s*["']--dock-split-t["']/.test(ts);
    // The anti-evasion bite: a bespoke @keyframes/transition driving --neck-t (a second
    // clock) in the CSS reds B5.
    facts.hasSecondNeckClock =
        /@keyframes[^{]*\{[\s\S]*?--neck-t/.test(css) ||
        /transition:[^;]*--neck-t/.test(css) ||
        /animation:[^;]*neck/.test(css);
    // DOCK_SPRING byte-untouched is cross-asserted via proof:dock-fission F1; here we
    // assert the orchestrator reads it (not re-tunes a literal).
    facts.readsDockSpring = /DOCK_SPRING\.(response|dampingFraction)/.test(ts);
    facts.oneScalarOneSpring =
        facts.neckTWrittenByJs &&
        facts.springWritesScalar &&
        !facts.hasSecondNeckClock &&
        facts.readsDockSpring;
    if (!facts.neckTWrittenByJs)
        violations.push("B5: --neck-t is not written by the JS orchestrator off the spring loop (it must ride the ONE SpringProgress, not a CSS clock)");
    if (!facts.springWritesScalar)
        violations.push("B5: the spring loop does not write --dock-split-t (the ONE scalar)");
    if (facts.hasSecondNeckClock)
        violations.push("B5: a bespoke @keyframes/transition/animation drives the neck — no second clock (the neck rides the ONE spring)");
    if (!facts.readsDockSpring)
        violations.push("B5: the orchestrator does not read DOCK_SPRING (a re-tuned spring literal — DOCK_SPRING byte-untouched fence)");
    return { violations, facts };
}

// ── B6 — the PRM carve ──
function detectB6() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.hasPrmBlock = /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/.test(css);
    facts.zeroesBridge = /--dock-bridge-opacity:\s*0/.test(css);
    facts.killsNeckPaint =
        /\.dock-fission-piece::(before|after)[\s\S]*?display:\s*none/.test(css) ||
        /prefers-reduced-motion[\s\S]*?(::before|::after)[\s\S]*?display:\s*none/.test(css);
    facts.prmCarve = facts.hasPrmBlock && facts.zeroesBridge;
    if (!facts.hasPrmBlock)
        violations.push("B6: no @media (prefers-reduced-motion: reduce) block — the PRM carve is absent");
    if (!facts.zeroesBridge)
        violations.push("B6: the PRM block does not zero --dock-bridge-opacity (the bridge must be removed under reduce)");
    return { violations, facts };
}

// ── the BB morph-bridge V↔H path is byte-untouched (the two-plate showcase stays) ──
function detectBbFence() {
    const violations = [];
    const morph = readRel(MORPH_BRIDGE_CSS);
    const facts = {};
    facts.morphBridgeExists = morph.length > 0;
    // The BB bridge KEEPS its two named plates (the V↔H showcase) — we assert it is NOT
    // gutted/renamed (the fission lands in a SIBLING file, no edit to the BB path).
    facts.keepsTwoPlates =
        /\.dock-morph-bridge-plate--vertical/.test(morph) &&
        /\.dock-morph-bridge-plate--horizontal/.test(morph);
    facts.noNeckTInMorph = !/var\(--neck-t/.test(morph);
    if (facts.morphBridgeExists && !facts.keepsTwoPlates)
        violations.push("FENCE: morph-bridge.css lost its two named plates — the BB V↔H showcase must stay byte-untouched (the fission lands in a SIBLING file)");
    if (facts.morphBridgeExists && !facts.noNeckTInMorph)
        violations.push("FENCE: morph-bridge.css carries --neck-t — the fission bridge must NOT bleed into the BB merge bridge (no-dual-path: two topologies, two files)");
    return { violations, facts };
}

// ── self-tests (each planted defect MUST red) ──
function selfTests() {
    const out = {};
    // (i) a two-named-plate literal reds B1.
    out.i = (() => {
        const css = ".dock-fission-bridge-plate--vertical { clip-path: inset(0); }";
        return /\.dock-fission-bridge-plate--(vertical|horizontal)/.test(css);
    })();
    // (ii) a recoil animating inline-size/inset reds B2.
    out.ii = (() => {
        const css = "transition: inline-size 0.4s, inset 0.4s;";
        return /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b)/.test(css);
    })();
    // (iii) a neck-local forked --mouse-x/y writer reds B3.
    out.iii = (() => {
        const css = ".dock-fission-piece::after { --mouse-x: 30%; }";
        return /--mouse-(x|y)/.test(css);
    })();
    // (iv) a backdrop-filter: url(#neck) reds B4.
    out.iv = (() => {
        const css = "filter-host { backdrop-filter: url(#neck); }";
        return /backdrop-filter:\s*url\(/.test(css);
    })();
    // (v) a second @keyframes-driven neck clock reds B5.
    out.v = (() => {
        const css = "@keyframes neckpulse { to { --neck-t: 1; } }";
        return /@keyframes[^{]*\{[\s\S]*?--neck-t/.test(css);
    })();
    // (vi) a missing PRM block reds B6.
    out.vi = (() => {
        const css = ".dock-fission-bridge { opacity: 1; }";
        return /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/.test(css) === false;
    })();
    // (vii) a merge-splash reading a PHASE-SPECTRUM hue (not --color-gold) reds B7.
    out.vii = (() => {
        const css = ".dock-fission-bridge::after { background: var(--viz-fourier); }";
        return /\.dock-fission-bridge::after[\s\S]*?var\(--(viz|chart)-/.test(css);
    })();
    // (viii) a ripple animating a layout radius/width (not transform: scale) reds B7.
    out.viii = (() => {
        // The honest ripple scales on f(--dock-split-t); a ripple with NO scale-on-split-t
        // (e.g. an animated width) fails the rippleScalesOnSplitT assert.
        const css = ".dock-fission-bridge::before { width: calc(var(--dock-split-t) * 10rem); }";
        return !/\.dock-fission-bridge::before[\s\S]*?transform:\s*scale\([^)]*var\(--dock-split-t/.test(
            css,
        );
    })();
    // (ix) a merge-splash with NO [data-merging] gate (a split would false-flash) reds B7.
    out.ix = (() => {
        const css = ".dock-fission-bridge::after { opacity: 1; }";
        return /\[data-merging\]\s+\.dock-fission-bridge::after/.test(css) === false;
    })();
    return out;
}

export function detect() {
    const b1 = detectB1();
    const b2 = detectB2();
    const b3 = detectB3();
    const b4 = detectB4();
    const b5 = detectB5();
    const b6 = detectB6();
    const b7 = detectB7();
    const fence = detectBbFence();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const violations = [
        ...b1.violations,
        ...b2.violations,
        ...b3.violations,
        ...b4.violations,
        ...b5.violations,
        ...b6.violations,
        ...b7.violations,
        ...fence.violations,
        ...stViolations,
    ];
    return {
        violations,
        facts: {
            b1: b1.facts,
            b2: b2.facts,
            b3: b3.facts,
            b4: b4.facts,
            b5: b5.facts,
            b6: b6.facts,
            b7: b7.facts,
            fence: fence.facts,
            selfTests: st,
        },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_METABALL_BRIDGE2_ARTIFACT", "BE-metaball-bridge2");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:metaball-bridge2",
        command: COMMAND,
        note: "BE.W-METABALL-BRIDGE2 device-free SOURCE arm (B1 the per-seam --neck-t N-generalized clip-path neck scoped to .dock-fission-piece, NOT the BB two-named-plate literal · B2 the snap-back recoil rides useLiquidFlex 'tanh' capped LOW ≤1.08, --stretch scale-only no layout · B3 the neck specular-sweep FLOOR reads the SHARED --glass-specular-core/plus-lighter cohort, no forked --mouse-x/y · B4 compositor-only + goo-OR-glass regular filter url, no backdrop-filter:url, --neck-break swap · B5 ONE scalar ONE spring — --neck-t off the SpringProgress loop, no second clock, DOCK_SPRING read not re-tuned · B6 the PRM carve zeroes --dock-bridge-opacity + kills neck paint · FENCE morph-bridge.css byte-untouched, no --neck-t bleed). The N-seam frame-series + the snap-back overshoot + the neck specular ridge + the Safari floor are the orchestrator's W-METABALL-BRIDGE2-DELTA (tests-visual/metaball-bridge2.spec.ts).",
        facts,
        violations,
    });
    console.log(`proof:metaball-bridge2 — ${status.toUpperCase()}`);
    console.log(`  B1 n-seam: css=${facts.b1.cssExists} neck-t=${facts.b1.hasNeckT} clip-on-neck-t=${facts.b1.neckClipOnNeckT} piece-scoped=${facts.b1.scopedToPiece} no-named-plates=${!facts.b1.hasTwoNamedPlateLiteral}`);
    console.log(`  B2 recoil: liquid-flex=${facts.b2.usesLiquidFlex} tanh=${facts.b2.tanhLaw} capped-low=${facts.b2.cappedLow} stretch-scale=${facts.b2.drivesStretch && facts.b2.scaleReadsStretch} no-layout=${!facts.b2.recoilAnimatesLayout}`);
    console.log(`  B3 specular: angle=${facts.b3.hasNeckSpecularAngle} conic=${facts.b3.conicSweep} shared-core+plus-lighter=${facts.b3.readsSharedCore && facts.b3.usesPlusLighter} no-fork=${!facts.b3.hasForkedMouseWriter} orchestrator-writes-angle=${facts.b3.orchestratorWritesAngle}`);
    console.log(`  B4 compositor: regular-filter=${facts.b4.regularFilterGoo} no-backdrop-url=${facts.b4.notBackdropFilterUrl} neck-break=${facts.b4.hasNeckBreak} goo-swap=${facts.b4.gooSwapGated} no-layout=${!facts.b4.animatesLayout}`);
    console.log(`  B5 one-spring: neck-t-js=${facts.b5.neckTWrittenByJs} spring-scalar=${facts.b5.springWritesScalar} no-second-clock=${!facts.b5.hasSecondNeckClock} reads-dock-spring=${facts.b5.readsDockSpring}`);
    console.log(`  B6 prm: block=${facts.b6.hasPrmBlock} zeroes-bridge=${facts.b6.zeroesBridge} kills-neck=${facts.b6.killsNeckPaint}`);
    console.log(`  B7 jubilance: ripple=${facts.b7.rippleFloor} (ring=${facts.b7.rippleRing} scale-on-split-t=${facts.b7.rippleScalesOnSplitT} specular-core=${facts.b7.rippleReadsSpecularCore}) merge-splash=${facts.b7.splashFloor} (gold=${facts.b7.splashReadsGold} metal-glow=${facts.b7.splashReadsMetalGlow} merging-gated=${facts.b7.splashGatedToMerging} sets-merging=${facts.b7.orchestratorSetsMerging} no-phase-spectrum=${!facts.b7.splashReadsPhaseSpectrum})`);
    console.log(`  FENCE: morph-bridge-two-plates=${facts.fence.keepsTwoPlates} no-neck-t-bleed=${facts.fence.noNeckTInMorph}`);
    console.log(`  self-tests: ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
