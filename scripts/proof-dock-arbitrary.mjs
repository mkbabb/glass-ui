#!/usr/bin/env node
// proof:dock-arbitrary — BC.W-DOCK-ARBITRARY — the dock animates into ARBITRARY
// sizes/shapes (the compositor clip-path/scale/radius morph register).
//
// The dock is no longer locked to "a rectangle that grows wider/taller." Its SHAPE is
// a SCALAR PARAMETER on the ONE --dock-morph-t/--dock-expand-t clock: the corner
// profile LERPS between a --dock-shape-from/--dock-shape-to radius pair, an OPT-IN
// clip-path silhouette LERPS between a --dock-shape-clip-from/--dock-shape-clip-to
// pair, and a useLiquidFlex volume-preserving squish couples the deformation. So the
// dock FLOWS between arbitrary silhouettes as one continuous liquid-glass surface
// (apple-ios27.md §3.1 "physically morphs from one shape to another").
//
// The device-free SOURCE/MECHANISM arm (tags ["local","ci","release"]). The PAINT arm
// is the ORCHESTRATOR's: the live :5199 frame-series of the dock morphing through ≥3
// distinct silhouettes (circle → pill → wide bar + V↔H teardrop), captured to
// docs/tranches/BC/audit/visual/W-DOCK-ARBITRARY-DELTA.md (the BC anti-disease law —
// a per-mechanism green here does NOT close the visual wave).
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the SOURCE arm):
//   A1 — the shape is a scalar parameter: the dock corner `border-radius` interpolates
//        on --dock-expand-t/--dock-morph-t reading --dock-shape-from/to tokens (NOT two
//        hardcoded class endpoints), AND an opt-in clip-path silhouette reads
//        --dock-shape-clip-from/to. Born-RED on HEAD's static `border-radius:
//        var(--radius-dock)`. Self-test bite: a planted hardcoded `border-radius: 50%`
//        collapsed endpoint (no token) reds.
//   A2 — the footprint is consumer-targetable + floored: --dock-morph-to is the settled
//        footprint, floored by --dock-morph-min (the BC.W-LIQUID-MORPH floor). Self-test
//        bite: a bare unfloored reserve reds (shared with BC.W-LIQUID-MORPH M1).
//   A3 — compositor-only: the shape register animates only clip-path/border-radius/
//        transform/scale/--* (NO width/height/padding morph leg). proof:no-layout-
//        animation extended-in-place. Self-test bite: a planted
//        `width: calc(... --dock-morph-t ...)` reds.
//   A4 — ONE squish source: the shape-morph squish reads useLiquidFlex's --stretch (the
//        volume-preserving primitive) capped at --dock-morph-max-stretch; no forked
//        deformation math. Self-test bite: a hand-rolled `scale: var(--my-squish)` reds.
//   A5 — the V↔H morph shares the mechanism: useDockOrientationMorph composes
//        useLiquidFlex + writes --stretch + reads the --dock-morph-max-stretch cap
//        (the SAME register, not a second engine).
//
// Run: node scripts/proof-dock-arbitrary.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-arbitrary";

const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const stripJs = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// The dock shape/shell/morph CSS corpus (where the radius lerp + clip-path live).
const SHAPE_CSS_FILES = [
    "src/styles/dock/shape.css",
    "src/styles/dock/shell.css",
    "src/styles/dock/morph.css",
];
const DENSITY_CSS = "src/styles/dock/density.css";
const LAYERS_CSS = "src/styles/dock/layers.css";
const ORIENT_TS =
    "src/components/custom/dock/composables/useDockOrientationMorph.ts";

// ── A1 — the shape is a SCALAR PARAMETER (radius lerp on tokens + opt-in clip) ──
export function detectA1() {
    const violations = [];
    const facts = {};
    const shapeCorpus = SHAPE_CSS_FILES.map((f) => stripCss(readRel(f))).join("\n");

    // (1) the base corner `border-radius` interpolates the --dock-shape-from/to token
    //     pair on the --dock-expand-t/--dock-morph-t scalar (NOT a hardcoded endpoint).
    //     A `calc(... var(--dock-shape-from ...) ... var(--dock-shape-to ...) ...
    //     var(--dock-expand-t ...))` is the token-driven lerp.
    facts.radiusReadsTokens =
        /border-radius:\s*calc\([\s\S]*?var\(\s*--dock-shape-from/.test(shapeCorpus) &&
        /--dock-shape-to/.test(shapeCorpus) &&
        /var\(\s*--dock-(?:expand|morph)-t/.test(shapeCorpus);
    if (!facts.radiusReadsTokens)
        violations.push(
            "A1: the dock corner `border-radius` does not interpolate the --dock-shape-from/to token pair on the --dock-expand-t/--dock-morph-t scalar (it is still a hardcoded class endpoint) — the shape is not a scalar parameter",
        );

    // (2) the opt-in clip-path silhouette reads the --dock-shape-clip-from/to pair.
    facts.clipReadsTokens =
        /clip-path:\s*var\(\s*--dock-shape-clip/.test(shapeCorpus) &&
        /--dock-shape-clip-from/.test(shapeCorpus) &&
        /--dock-shape-clip-to/.test(shapeCorpus);
    if (!facts.clipReadsTokens)
        violations.push(
            "A1: the dock shape register has no opt-in clip-path silhouette reading --dock-shape-clip-from/to — the arbitrary silhouette parameter is absent",
        );

    // (3) the shape tokens are MINTED (density.css) as consumer-targetable defaults.
    const density = stripCss(readRel(DENSITY_CSS));
    facts.tokensMinted =
        /--dock-shape-from:/.test(density) &&
        /--dock-shape-to:/.test(density) &&
        /--dock-shape-clip-from:/.test(density) &&
        /--dock-shape-clip-to:/.test(density) &&
        /--dock-morph-max-stretch:/.test(density);
    if (!facts.tokensMinted)
        violations.push(
            "A1: the --dock-shape-from/to + --dock-shape-clip-from/to + --dock-morph-max-stretch tokens are not all minted in density.css",
        );

    return { violations, facts };
}
// A1 self-test bite — a planted hardcoded `border-radius: 50%` collapsed endpoint (no
// token) MUST NOT satisfy the token-reading detector; the real token lerp MUST.
function detectA1SelfTest() {
    const PLANTED = `.glass-dock.collapsed { border-radius: 50%; }`;
    const REAL = `.glass-dock { border-radius: calc(var(--dock-shape-from, var(--radius-dock)) + (var(--dock-shape-to) - var(--dock-shape-from)) * var(--dock-expand-t, 1)); }`;
    const reads = (s) =>
        /border-radius:\s*calc\([\s\S]*?var\(\s*--dock-shape-from/.test(s) &&
        /var\(\s*--dock-(?:expand|morph)-t/.test(s);
    return reads(PLANTED) === false && reads(REAL) === true;
}

// ── A2 — the footprint is consumer-targetable + floored (--dock-morph-min) ──
export function detectA2() {
    const violations = [];
    const facts = {};
    const layers = stripCss(readRel(LAYERS_CSS));
    // The reserve is floored: `inline-size: max(var(--dock-morph-to), var(--dock-morph-min ...))`.
    facts.reserveFloored =
        /inline-size:\s*max\(\s*var\(\s*--dock-morph-to\s*\)\s*,\s*var\(\s*--dock-morph-min/.test(
            layers,
        ) &&
        /block-size:\s*max\(\s*var\(\s*--dock-morph-to\s*\)\s*,\s*var\(\s*--dock-morph-min/.test(
            layers,
        );
    if (!facts.reserveFloored)
        violations.push(
            "A2: the layers.css reserve `inline-size`/`block-size` is not floored by max(var(--dock-morph-to), var(--dock-morph-min ...)) on BOTH axes (the BC.W-LIQUID-MORPH floor) — a to:0 measurement reserves zero (the white morph)",
        );
    // The floor token is minted (density.css).
    const density = stripCss(readRel(DENSITY_CSS));
    facts.minMinted = /--dock-morph-min:/.test(density);
    if (!facts.minMinted)
        violations.push(
            "A2: --dock-morph-min is not minted in density.css (the reserve floor token)",
        );
    return { violations, facts };
}
// A2 self-test bite — a bare unfloored `inline-size: var(--dock-morph-to)` MUST NOT
// satisfy the floored detector; the floored `max(...)` MUST.
function detectA2SelfTest() {
    const BARE = `inline-size: var(--dock-morph-to);`;
    const FLOORED = `inline-size: max(var(--dock-morph-to), var(--dock-morph-min, 2.75rem));`;
    const floored = (s) =>
        /inline-size:\s*max\(\s*var\(\s*--dock-morph-to\s*\)\s*,\s*var\(\s*--dock-morph-min/.test(
            s,
        );
    return floored(BARE) === false && floored(FLOORED) === true;
}

// ── A3 — compositor-only (no width/height/padding morph leg on the scalar) ──
// The shape register CSS must NOT animate a layout-triggering property as a function
// of --dock-morph-t/--dock-expand-t. We scan the shape corpus for any layout property
// whose value references the morph scalar in a calc() (the per-frame layout leg).
const LAYOUT_PROPS = [
    "width",
    "height",
    "inline-size",
    "block-size",
    "min-width",
    "max-width",
    "min-height",
    "max-height",
    "min-inline-size",
    "max-inline-size",
    "min-block-size",
    "max-block-size",
    "padding",
    "margin",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "gap",
];
function parseDecls(source) {
    // Each `prop: value;` declaration (best-effort, comment-stripped source).
    const out = [];
    const re = /([a-z-]+)\s*:\s*([^;{}]+)/gi;
    let m;
    while ((m = re.exec(source)) !== null) {
        out.push({ prop: m[1].toLowerCase(), value: m[2], line: source.slice(0, m.index).split("\n").length });
    }
    return out;
}
const isLayoutProp = (p) => LAYOUT_PROPS.some((l) => p === l || p.startsWith(`${l}-`));
const animatesScalar = (value) =>
    /var\(\s*--dock-(?:morph|expand)-t/.test(value) && /calc\(/.test(value);
export function detectA3() {
    const violations = [];
    const facts = { legsScanned: 0, layoutLegs: [] };
    // The shape register is shape.css (the NEW partial this wave owns). A layout
    // property animating the scalar there is the regression A3 forbids.
    const shape = stripCss(readRel("src/styles/dock/shape.css"));
    for (const d of parseDecls(shape)) {
        facts.legsScanned++;
        if (isLayoutProp(d.prop) && animatesScalar(d.value)) {
            facts.layoutLegs.push(`shape.css:${d.line} — ${d.prop}: ${d.value.trim().slice(0, 50)}`);
            violations.push(
                `A3: shape.css:${d.line} — the layout property \`${d.prop}\` animates the morph scalar (\`${d.value.trim().slice(0, 50)}\`) — the shape morph must be clip-path/border-radius/transform/scale only (proof:no-layout-animation)`,
            );
        }
    }
    // Positive: the shape register DOES animate a compositor property on the scalar
    // (clip-path or border-radius or scale) — the morph is real, not absent.
    const corpus = SHAPE_CSS_FILES.map((f) => stripCss(readRel(f))).join("\n");
    facts.compositorMorphPresent =
        /clip-path:\s*var\(\s*--dock-shape-clip/.test(corpus) &&
        /border-radius:\s*calc\([\s\S]*?--dock-shape-from/.test(corpus);
    if (!facts.compositorMorphPresent)
        violations.push(
            "A3: the shape register does not animate a compositor property (clip-path + border-radius on the tokens) — the arbitrary-shape morph is absent",
        );
    return { violations, facts };
}
// A3 self-test bite — a planted `width: calc(... --dock-morph-t ...)` MUST flag as a
// layout leg; a `clip-path`/`scale` on the scalar MUST NOT.
function detectA3SelfTest() {
    const PLANTED = `.x { width: calc(40px + 200px * var(--dock-morph-t, 0)); }`;
    const SAFE = `.x { scale: var(--stretch, 1) calc(1 / var(--stretch, 1)); clip-path: var(--dock-shape-clip); }`;
    const layoutLeg = (s) =>
        parseDecls(s).some((d) => isLayoutProp(d.prop) && animatesScalar(d.value));
    return layoutLeg(PLANTED) === true && layoutLeg(SAFE) === false;
}

// ── A4 — ONE squish source (useLiquidFlex --stretch, capped, no fork) ──
export function detectA4() {
    const violations = [];
    const facts = {};
    const shape = stripCss(readRel("src/styles/dock/shape.css"));
    // The shape-morph squish reads `--stretch` reciprocally (volume-preserving).
    facts.shapeReadsStretch =
        /scale:\s*var\(\s*--stretch[\s\S]*?calc\(\s*1\s*\/\s*var\(\s*--stretch/.test(shape) ||
        /scale:\s*calc\(\s*1\s*\/\s*var\(\s*--stretch[\s\S]*?var\(\s*--stretch/.test(shape);
    if (!facts.shapeReadsStretch)
        violations.push(
            "A4: the shape-morph squish does not read the volume-preserving --stretch reciprocally (scale: var(--stretch) calc(1/--stretch)) — the squish is absent or hand-rolled",
        );
    // No forked deformation math: the squish must read --stretch, NOT a dock-local
    // hand-rolled squish variable (a `scale: var(--my-squish)` not from useLiquidFlex).
    facts.noForkedSquish = !/scale:\s*var\(\s*--(?!stretch\b)[a-z-]*squish/.test(shape);
    if (!facts.noForkedSquish)
        violations.push(
            "A4: the shape register reads a forked/hand-rolled squish variable (not useLiquidFlex's --stretch) — the ONE squish source is violated",
        );
    // The cap token is read by the driver (the LOW iOS-segmented cap).
    const orient = stripJs(readRel(ORIENT_TS));
    facts.capRead = /--dock-morph-max-stretch/.test(orient);
    if (!facts.capRead)
        violations.push(
            "A4: useDockOrientationMorph does not read the --dock-morph-max-stretch cap (the LOW squish ceiling) — the cap is un-threaded",
        );
    return { violations, facts };
}
// A4 self-test bite — a hand-rolled `scale: var(--my-squish)` (not --stretch) MUST be
// caught by the forked-squish detector; the real --stretch reciprocal MUST pass.
function detectA4SelfTest() {
    const FORKED = `.x { scale: var(--my-squish) calc(1 / var(--my-squish)); }`;
    const REAL = `.x { scale: var(--stretch, 1) calc(1 / var(--stretch, 1)); }`;
    const forked = (s) => /scale:\s*var\(\s*--(?!stretch\b)[a-z-]*squish/.test(s);
    const reads = (s) =>
        /scale:\s*var\(\s*--stretch[\s\S]*?calc\(\s*1\s*\/\s*var\(\s*--stretch/.test(s);
    return forked(FORKED) === true && forked(REAL) === false && reads(REAL) === true;
}

// ── A5 — the V↔H morph shares the mechanism (useLiquidFlex + --stretch + cap) ──
export function detectA5() {
    const violations = [];
    const facts = {};
    const orient = stripJs(readRel(ORIENT_TS));
    facts.composesLiquidFlex = /useLiquidFlex/.test(orient);
    facts.writesStretch = /setProperty\(\s*["']--stretch["']/.test(orient);
    facts.readsCap = /--dock-morph-max-stretch/.test(orient);
    if (!facts.composesLiquidFlex)
        violations.push("A5: useDockOrientationMorph does not compose useLiquidFlex (the shared shape-deformation primitive)");
    if (!facts.writesStretch)
        violations.push("A5: useDockOrientationMorph does not write --stretch onto the dock scope (the shape register reads it) — the V↔H morph is not on the shared squish register");
    if (!facts.readsCap)
        violations.push("A5: useDockOrientationMorph does not read the --dock-morph-max-stretch cap — the V↔H squish is not on the shared cap token");
    return { violations, facts };
}

// ── compose ──
export function detect() {
    const a1 = detectA1();
    const a2 = detectA2();
    const a3 = detectA3();
    const a4 = detectA4();
    const a5 = detectA5();
    const selfTests = {
        a1: detectA1SelfTest(),
        a2: detectA2SelfTest(),
        a3: detectA3SelfTest(),
        a4: detectA4SelfTest(),
    };
    const selfTestViolations = [];
    for (const [k, ok] of Object.entries(selfTests)) {
        if (!ok)
            selfTestViolations.push(
                `${k.toUpperCase()} self-test bite BROKE — the detector does not bite its planted ${k} fixture`,
            );
    }
    const violations = [
        ...a1.violations,
        ...a2.violations,
        ...a3.violations,
        ...a4.violations,
        ...a5.violations,
        ...selfTestViolations,
    ];
    return {
        violations,
        facts: { a1: a1.facts, a2: a2.facts, a3: a3.facts, a4: a4.facts, a5: a5.facts, selfTests },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_ARBITRARY_ARTIFACT", "BC-dock-arbitrary");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-arbitrary",
        command: COMMAND,
        note: "BC.W-DOCK-ARBITRARY device-free SOURCE arm (A1 the shape is a scalar parameter — border-radius lerp on --dock-shape-from/to + opt-in clip-path on --dock-shape-clip-from/to · A2 the footprint is consumer-targetable + floored by --dock-morph-min · A3 compositor-only — no width/height/padding leg on the scalar · A4 ONE squish source — useLiquidFlex --stretch capped at --dock-morph-max-stretch · A5 the V↔H morph shares the mechanism). The PAINT arm (the ≥3-silhouette frame-series circle→pill→bar + V↔H teardrop) is the orchestrator's W-DOCK-ARBITRARY-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-arbitrary — ${status.toUpperCase()}`);
    console.log(`  A1 radius-reads-tokens=${facts.a1.radiusReadsTokens} clip-reads-tokens=${facts.a1.clipReadsTokens} tokens-minted=${facts.a1.tokensMinted}`);
    console.log(`  A2 reserve-floored=${facts.a2.reserveFloored} min-minted=${facts.a2.minMinted}`);
    console.log(`  A3 layout-legs=${facts.a3.layoutLegs.length} compositor-morph=${facts.a3.compositorMorphPresent}`);
    console.log(`  A4 reads-stretch=${facts.a4.shapeReadsStretch} no-fork=${facts.a4.noForkedSquish} cap-read=${facts.a4.capRead}`);
    console.log(`  A5 composes-flex=${facts.a5.composesLiquidFlex} writes-stretch=${facts.a5.writesStretch} reads-cap=${facts.a5.readsCap}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
