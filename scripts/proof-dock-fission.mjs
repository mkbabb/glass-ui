#!/usr/bin/env node
// proof:dock-fission — BE.W-DOCK-FISSION — the n-ary detach orchestrator + the per-context
// goo-SIGNATURE + the pointer-reactive seam-tension floors.
//
// Device-free SOURCE arm ["local","ci","release"]. The BINDING painted truth is the π
// readback tests-visual/dock-fission.spec.ts + the W-DOCK-FISSION-DELTA (the per-context
// detach frame-series, the seam-tension resist, the PRM single-paint, box-INVIOLATE, both
// modes) — the orchestrator's, NOT this gate alone (the BC anti-disease law: no
// source-green close).
//
// BORN-RED anchor (verified on disk at spec time): `useDockFission`/`DockGooFilter` +
// `--dock-split-t` + `fission-bridge.css` ABSENT; this script ABSENT → born-RED by
// construction. The clauses drive born-RED→GREEN at the build.
//
//   F1 — the n-ary detach rides ONE SpringProgress writing --dock-split-t off
//        DOCK_SPRING/--spring-dock (no new spring family — assert the import + that NO
//        bespoke spring constant is minted in the orchestrator).
//   F2 — bidirectional re-merge (the split is reversible on the SAME scalar — both
//        directions wired, not split-only: split()/merge() both flip the ONE target).
//   F3 — the PER-CONTEXT goo-SIGNATURE is a descriptor-driven FLOOR (search=radial /
//        media=lateral / nav=inward-merge each present in the signature MAP, NOT three
//        hardcoded code paths).
//   F4 — POINTER-REACTIVE SEAM-TENSION is a FLOOR (the --seam-tension scalar wired off
//        usePointerVelocityField from INSIDE the driver's loop — NO second rAF, the cap
//        present).
//   F5 — PRM=instant (the prefersReducedMotion() seat-synchronously branch + field.tick(0)
//        present).
//   F6 — compositor-only by construction (the fission CSS animates ONLY
//        transform/clip-path/opacity/filter/--* — leans on proof:no-layout-animation for
//        the library-wide floor; here we assert NO animated layout property in
//        fission-bridge.css).
//
// Self-test bites (each planted defect MUST red, the proof-dock-stack-rail selfTests
// pattern): (a) a piece transition writing a second bespoke @keyframes/transition clock →
// F1; (b) a uni-directional-only fission (split with no re-merge) → F2; (c) a per-context
// hardcoded literal silhouette (not signature-driven) → F3; (d) a fission piece writing a
// SECOND rAF for the pointer field → F4; (e) a piece transition animating a LAYOUT axis →
// F6.
//
// Run: node scripts/proof-dock-fission.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-fission";

const FISSION_TS =
    "src/components/custom/dock/composables/useDockFission.ts";
const FISSION_CSS = "src/styles/dock/fission-bridge.css";
const GOO_FILTER = "src/components/custom/dock/DockGooFilter.vue";

function readRel(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip /* */ + // comments so a detector matches CODE, not prose (the house pure-detector
// idiom). A naive strip is fine for our CSS/TS (no `//` inside a string we scan for).
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
}

// ── F1 — ONE SpringProgress off DOCK_SPRING, no bespoke spring family ──
function detectF1() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.fissionExists = ts.length > 0;
    facts.importsSpringProgress = /import\s*\{[^}]*\bSpringProgress\b[^}]*\}\s*from\s*["']@mkbabb\/keyframes\.js["']/.test(ts);
    facts.importsDockSpring = /import\s*\{[^}]*\bDOCK_SPRING\b[^}]*\}\s*from\s*["']\.\.\/constants["']/.test(ts);
    facts.readsDockSpring =
        /response:\s*DOCK_SPRING\.response/.test(ts) &&
        /dampingFraction:\s*DOCK_SPRING\.dampingFraction/.test(ts);
    facts.writesSplitT = /setProperty\(\s*["']--dock-split-t["']/.test(ts);
    // A bespoke spring constant minted in the orchestrator (a NEW response/damping literal
    // pair NOT reading DOCK_SPRING) is the no-new-spring-family violation.
    facts.mintsBespokeSpring =
        /new\s+SpringProgress\(\s*\{[^}]*response:\s*0?\.\d+/.test(ts);

    if (!facts.fissionExists)
        violations.push("F1: useDockFission.ts is ABSENT");
    if (facts.fissionExists && !facts.importsSpringProgress)
        violations.push("F1: the orchestrator does not import SpringProgress from @mkbabb/keyframes.js (the one-spring substrate)");
    if (facts.fissionExists && !(facts.importsDockSpring && facts.readsDockSpring))
        violations.push("F1: the spring is not constructed off DOCK_SPRING (response/dampingFraction) — a bespoke spring family or a re-tune");
    if (facts.fissionExists && facts.mintsBespokeSpring)
        violations.push("F1: a bespoke spring (a literal response: 0.xx pair) is minted — no new spring family allowed (read DOCK_SPRING)");
    if (facts.fissionExists && !facts.writesSplitT)
        violations.push("F1: the orchestrator does not write --dock-split-t to the root (the single-property-write idiom)");
    return { violations, facts };
}

// ── F2 — bidirectional re-merge (split AND merge on the same scalar) ──
function detectF2() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.hasSplit = /function\s+split\s*\(/.test(ts) || /\bsplit\s*\(\)\s*:/.test(ts);
    facts.hasMerge = /function\s+merge\s*\(/.test(ts) || /\bmerge\s*\(\)\s*:/.test(ts);
    // Both directions must flip the ONE target (target = 1 AND target = 0) — not a
    // split-only one-way fission.
    facts.targetsOne = /target\s*=\s*1\b/.test(ts);
    facts.targetsZero = /target\s*=\s*0\b/.test(ts);
    facts.bidirectional = facts.hasSplit && facts.hasMerge && facts.targetsOne && facts.targetsZero;
    if (!facts.bidirectional)
        violations.push("F2: the fission is not bidirectional — split() AND merge() must both flip the ONE --dock-split-t target (split=1, merge=0), not a one-way detach");
    return { violations, facts };
}

// ── F3 — the per-context goo-SIGNATURE is descriptor-driven (search/media/nav) ──
function detectF3() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    // The signature MAP must enumerate all three contexts with their distinct vectors.
    facts.hasSignatureMap = /DOCK_SPLIT_SIGNATURES\s*[:=]/.test(ts);
    facts.hasRadial = /vector:\s*["']radial["']/.test(ts);
    facts.hasLateral = /vector:\s*["']lateral["']/.test(ts);
    facts.hasInwardMerge = /vector:\s*["']inward-merge["']/.test(ts);
    // The orchestrator must READ the signature to compute the vectors (descriptor-driven),
    // not a `if (context === 'search')`-style hardcoded code path.
    facts.readsSignature = /signature\.value/.test(ts) || /sig\.(vector|staggerRank|neckHold|squishPeak)/.test(ts);
    // The anti-evasion bite: a hardcoded per-context if/switch silhouette (three code
    // paths) is the F3 defect.
    facts.hasHardcodedContextSwitch =
        /context\s*===\s*["'](search|media|nav)["']/.test(ts) ||
        /switch\s*\(\s*[a-zA-Z.]*context\s*\)/.test(ts);
    facts.descriptorDriven =
        facts.hasSignatureMap &&
        facts.hasRadial &&
        facts.hasLateral &&
        facts.hasInwardMerge &&
        facts.readsSignature &&
        !facts.hasHardcodedContextSwitch;
    if (!facts.descriptorDriven)
        violations.push("F3: the per-context goo-signature is not a descriptor-driven FLOOR — the DOCK_SPLIT_SIGNATURES map must carry radial/lateral/inward-merge AND the orchestrator must READ the signature (not a hardcoded `context === 'search'` code-path switch)");
    return { violations, facts };
}

// ── F4 — pointer-reactive seam-tension, no second rAF ──
function detectF4() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.usesPointerField = /usePointerVelocityField\s*\(/.test(ts);
    facts.writesSeamTension = /setProperty\(\s*["']--seam-tension["']/.test(ts);
    // The field is FED from inside the driver's loop via tick() — the no-own-rAF discipline.
    facts.fieldTicked = /field\.tick\(/.test(ts);
    facts.hasTensionCap = /seamTensionCap/.test(ts) && /Math\.min\(\s*seamTensionCap/.test(ts);
    // The anti-evasion bite: the orchestrator owning a SECOND requestAnimationFrame for the
    // pointer field (a private loop, breaking the one-loop/offscreen-pause discipline).
    facts.hasSecondRaf = /requestAnimationFrame\s*\(/.test(ts);
    facts.seamTensionFloor =
        facts.usesPointerField &&
        facts.writesSeamTension &&
        facts.fieldTicked &&
        facts.hasTensionCap &&
        !facts.hasSecondRaf;
    if (!facts.usesPointerField)
        violations.push("F4: the orchestrator does not compose usePointerVelocityField (the seam-tension reader)");
    if (!facts.writesSeamTension)
        violations.push("F4: the orchestrator does not write --seam-tension (the pointer-reactive scalar)");
    if (!facts.fieldTicked)
        violations.push("F4: the velocity field is not fed via field.tick() from inside the driver loop");
    if (!facts.hasTensionCap)
        violations.push("F4: the --seam-tension is not clamped to a LOW cap (Math.min(seamTensionCap, …)) — the anti-taffy fence");
    if (facts.hasSecondRaf)
        violations.push("F4: the orchestrator owns a SECOND requestAnimationFrame — the seam-tension must be fed from INSIDE the spring's ONE loop (no second rAF — the one-loop/offscreen-pause discipline)");
    return { violations, facts };
}

// ── F5 — PRM=instant sync-seat + field.tick(0) ──
function detectF5() {
    const violations = [];
    const ts = stripComments(readRel(FISSION_TS));
    const facts = {};
    facts.hasPrmProbe = /prefersReducedMotion\s*\(/.test(ts);
    facts.hasSyncSeat = /function\s+seatSync\s*\(/.test(ts) || /seatSync\s*\(\)/.test(ts);
    facts.fieldTickZero = /field\.tick\(\s*0\s*\)/.test(ts);
    facts.prmSeats =
        facts.hasPrmProbe && facts.hasSyncSeat && facts.fieldTickZero;
    if (!facts.prmSeats)
        violations.push("F5: PRM is not an instant sync-seat — the prefersReducedMotion() branch + a synchronous seat + field.tick(0) (the zero-velocity freeze) must all be present");
    return { violations, facts };
}

// ── F6 — compositor-only (no animated layout property in fission-bridge.css) ──
function detectF6() {
    const violations = [];
    const css = stripComments(readRel(FISSION_CSS));
    const facts = {};
    facts.cssExists = css.length > 0;
    // The fission CSS must declare --dock-split-t / --neck-t and use clip-path/translate/
    // scale/opacity/filter — and must NOT animate a layout property via transition/keyframes.
    facts.hasNeckClip = /clip-path:\s*inset\(/.test(css);
    facts.usesTranslate = /\btranslate:/.test(css);
    facts.usesScaleStretch = /scale:\s*var\(--stretch/.test(css);
    // A `transition`/`@keyframes` animating a layout axis (inline-size/block-size/width/
    // height/inset/padding) is the no-layout-animation violation.
    facts.animatesLayout =
        /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\bpadding\b|grid-template)/.test(css) ||
        /transition-property:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\bpadding\b)/.test(css);
    // The REGULAR filter goo (NOT backdrop-filter: url()) — the Safari floor cross-checked
    // here too (it's a metaball-bridge2 B4 clause but the fission CSS is the same file).
    facts.usesBackdropFilterUrl = /backdrop-filter:\s*url\(/.test(css);
    if (!facts.cssExists)
        violations.push("F6: fission-bridge.css is ABSENT");
    if (facts.cssExists && !facts.hasNeckClip)
        violations.push("F6: fission-bridge.css does not carry the clip-path: inset() neck (the compositor silhouette carve)");
    if (facts.cssExists && !(facts.usesTranslate && facts.usesScaleStretch))
        violations.push("F6: the piece detach is not compositor-only translate + --stretch scale");
    if (facts.animatesLayout)
        violations.push("F6: fission-bridge.css animates a LAYOUT property (inline-size/block-size/width/height/inset/padding) — proof:no-layout-animation floor (compositor-only required)");
    if (facts.usesBackdropFilterUrl)
        violations.push("F6: the goo uses backdrop-filter: url() (WebKit-unsupported) — must be the REGULAR filter property (the Safari floor)");
    return { violations, facts };
}

// ── the goo filter mount (the library promotion — sRGB + region + non-zero host) ──
function detectGooMount() {
    const violations = [];
    const vue = stripComments(readRel(GOO_FILTER));
    const facts = {};
    facts.gooMountExists = vue.length > 0;
    facts.hasSrgb = /color-interpolation-filters=["']sRGB["']/.test(vue);
    // A GENEROUS region (x=-50% width=200% …) so the necks + flying pieces never clip.
    facts.hasGenerousRegion =
        /x=["']-50%["']/.test(vue) && /width=["']200%["']/.test(vue);
    facts.hasGooGraph =
        /feGaussianBlur/.test(vue) && /feColorMatrix/.test(vue) && /feComposite/.test(vue);
    // NON-ZERO host (a zero-sized SVG is a WebKit no-op). The host carries width=1/height=1
    // + an off-screen position (not width=0).
    facts.nonZeroHost = /width=["']1["']/.test(vue) && /height=["']1["']/.test(vue);
    facts.notBackdropFilter = !/backdrop-filter:\s*url\(/.test(vue);
    if (!facts.gooMountExists)
        violations.push("GOO: DockGooFilter.vue (the library goo mount) is ABSENT");
    if (facts.gooMountExists && !facts.hasSrgb)
        violations.push("GOO: the goo filter omits color-interpolation-filters=\"sRGB\" (WebKit thresholds in linearRGB → wrong neck — the §W7 Safari floor)");
    if (facts.gooMountExists && !facts.hasGenerousRegion)
        violations.push("GOO: the goo filter has no GENEROUS region (x=-50% width=200%) — the necks + flying pieces clip at the filter edge");
    if (facts.gooMountExists && !facts.hasGooGraph)
        violations.push("GOO: the goo graph is incomplete (feGaussianBlur + feColorMatrix + feComposite required)");
    if (facts.gooMountExists && !facts.nonZeroHost)
        violations.push("GOO: the filter host is not NON-ZERO-size (a zero-sized SVG is a WebKit no-op) — width/height must be 1, off-screen");
    if (facts.gooMountExists && !facts.notBackdropFilter)
        violations.push("GOO: the goo uses backdrop-filter: url() — must be the REGULAR filter (WebKit-safe)");
    return { violations, facts };
}

// ── self-tests (each planted defect MUST red) ──
function selfTests() {
    const out = {};
    // (a) a second bespoke spring clock literal reds F1.
    out.a = (() => {
        const body = "spring = new SpringProgress({ response: 0.44, dampingFraction: 0.9 });";
        return /new\s+SpringProgress\(\s*\{[^}]*response:\s*0?\.\d+/.test(body);
    })();
    // (b) a uni-directional-only fission (no merge) reds F2.
    out.b = (() => {
        const body = "function split(){ target = 1; ensureSpringRunning(); }";
        const hasMerge = /function\s+merge\s*\(/.test(body) || /\bmerge\s*\(\)\s*:/.test(body);
        return hasMerge === false; // the bite fires (RED) when merge is absent.
    })();
    // (c) a hardcoded per-context switch reds F3.
    out.c = (() => {
        const body = "if (context === 'search') { /* radial */ } else if (context === 'media') {}";
        return /context\s*===\s*["'](search|media|nav)["']/.test(body);
    })();
    // (d) a second rAF for the pointer field reds F4.
    out.d = (() => {
        const body = "requestAnimationFrame(() => field.tick(16));";
        return /requestAnimationFrame\s*\(/.test(body);
    })();
    // (e) a piece animating a layout axis reds F6.
    out.e = (() => {
        const body = "transition: inline-size 0.4s var(--spring-dock);";
        return /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b)/.test(body);
    })();
    return out;
}

export function detect() {
    const f1 = detectF1();
    const f2 = detectF2();
    const f3 = detectF3();
    const f4 = detectF4();
    const f5 = detectF5();
    const f6 = detectF6();
    const goo = detectGooMount();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const violations = [
        ...f1.violations,
        ...f2.violations,
        ...f3.violations,
        ...f4.violations,
        ...f5.violations,
        ...f6.violations,
        ...goo.violations,
        ...stViolations,
    ];
    return {
        violations,
        facts: {
            f1: f1.facts,
            f2: f2.facts,
            f3: f3.facts,
            f4: f4.facts,
            f5: f5.facts,
            f6: f6.facts,
            goo: goo.facts,
            selfTests: st,
        },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_FISSION_ARTIFACT", "BE-dock-fission");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-fission",
        command: COMMAND,
        note: "BE.W-DOCK-FISSION device-free SOURCE arm (F1 ONE SpringProgress off DOCK_SPRING writing --dock-split-t, no bespoke spring family · F2 bidirectional split/merge on the ONE scalar · F3 the per-context goo-SIGNATURE descriptor-driven (radial/lateral/inward-merge), NOT three code paths · F4 pointer-reactive --seam-tension off usePointerVelocityField fed from INSIDE the ONE loop, capped LOW, no second rAF · F5 PRM=instant sync-seat + field.tick(0) · F6 compositor-only — fission-bridge.css animates NO layout property · GOO the library mount sRGB + generous region + non-zero host). The LIVE per-context frame-series + the seam-tension resist + box-INVIOLATE are the orchestrator's W-DOCK-FISSION-DELTA (tests-visual/dock-fission.spec.ts).",
        facts,
        violations,
    });
    console.log(`proof:dock-fission — ${status.toUpperCase()}`);
    console.log(`  F1 one-spring: exists=${facts.f1.fissionExists} springprogress=${facts.f1.importsSpringProgress} dock-spring=${facts.f1.readsDockSpring} writes-split-t=${facts.f1.writesSplitT} no-bespoke=${!facts.f1.mintsBespokeSpring}`);
    console.log(`  F2 bidirectional: split=${facts.f2.hasSplit} merge=${facts.f2.hasMerge} targets-1=${facts.f2.targetsOne} targets-0=${facts.f2.targetsZero}`);
    console.log(`  F3 signature: map=${facts.f3.hasSignatureMap} radial/lateral/inward=${facts.f3.hasRadial}/${facts.f3.hasLateral}/${facts.f3.hasInwardMerge} reads-sig=${facts.f3.readsSignature} no-hardcode-switch=${!facts.f3.hasHardcodedContextSwitch}`);
    console.log(`  F4 seam-tension: field=${facts.f4.usesPointerField} writes-tension=${facts.f4.writesSeamTension} ticked=${facts.f4.fieldTicked} cap=${facts.f4.hasTensionCap} no-second-raf=${!facts.f4.hasSecondRaf}`);
    console.log(`  F5 prm: probe=${facts.f5.hasPrmProbe} sync-seat=${facts.f5.hasSyncSeat} tick0=${facts.f5.fieldTickZero}`);
    console.log(`  F6 compositor: css=${facts.f6.cssExists} neck-clip=${facts.f6.hasNeckClip} translate+scale=${facts.f6.usesTranslate && facts.f6.usesScaleStretch} no-layout-anim=${!facts.f6.animatesLayout} no-backdrop-url=${!facts.f6.usesBackdropFilterUrl}`);
    console.log(`  GOO mount: exists=${facts.goo.gooMountExists} sRGB=${facts.goo.hasSrgb} region=${facts.goo.hasGenerousRegion} graph=${facts.goo.hasGooGraph} non-zero=${facts.goo.nonZeroHost}`);
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
