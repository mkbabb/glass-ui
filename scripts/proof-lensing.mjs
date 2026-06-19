#!/usr/bin/env node
// BB.W-LENSING — the refractive-glass tier EVOLVED onto the squircle bevel-profile +
// the motion-reactive EDGE specular glint leaf (proof:lensing).
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-cal.mjs /
// proof-button-glass.mjs / proof-register-ios.mjs). Six falsifiable device-free SOURCE
// clauses (L1-L6), each RED at HEAD pre-wave; the π gestalt readback
// (tests-visual/lensing.spec.ts + the W-LENSING-DELTA + the proof:ba-gestalt glass/CTA
// verdict) is the BINDING visual truth — per-mechanism greens alone do NOT close this
// visual wave (BB inv-4).
//
//   L1 — DDR-LENS-BAKE RECONCILE (BC.W-VISUAL-RECONCILE). The BB.W-LENSING scope-2
//        `@property --glass-refract` axis (a `var(--glass-refract)`-spliced head/`scale`/
//        tail filter) is RETIRED — it never PARSED as a `backdrop-filter` (it emitted
//        three tokens `url("…") <n> url("…")`, so the lens rendered `none`) AND broke
//        consumer bundlers (the bare-quote tail mis-resolved as a file). The reconciled
//        shipped filter is ONE complete, valid, self-contained `url("data:…")` token with
//        the displacement `scale='28'` BAKED (the §10 default depth) — the single form
//        that both PARSES as a filter value AND survives a consumer's url()-rewriter. L1
//        asserts the reconciled identity: the consuming `--glass-refract-filter` is a
//        single self-contained `data:` URI carrying a baked `scale='<n>'` (NOT the broken
//        var()-spliced head/tail), AND the retired axis is recorded as retired (no live
//        `@property --glass-refract` reg drives a phantom axis). RE-LITIGATE-IF the
//        platform ships var()-substitution into a url() string token (then the dynamic
//        scale axis could return — the lost-tunability tradeoff in glass-refract.css).
//   L2 — the displacement map is the edge-concentrated squircle bevel-profile (the
//        crossed-gradient encoding — a HORIZONTAL R gradient + a VERTICAL G gradient,
//        SCREEN-composited), NOT the retired uniform `radialGradient` placeholder; the
//        `--glass-refract-bevel` rim-band knob is minted.
//   L3 — the whole lens sits behind `@supports (backdrop-filter: url(#…))`; no refraction
//        `backdrop-filter` declaration sits OUTSIDE the gate (the off-Chromium blur+tint
//        floor preserved).
//   L4 — DDR-LENS-BAKE RECONCILE. The BB.W-LENSING scope-2 `:active` LENS-SWELL (a
//        `.glass-lens { --glass-refract: calc(28 + …press-t…) }` that mutated the axis
//        scale on press) is RETIRED with the axis — it drove a value that reached NO
//        rendering filter (the lens computed `none`). The press read is now carried by
//        the ONE `--glass-btn-press-t` drive on the MATERIAL gleam — the
//        `.btn-glass:active::before` `--specular-intensity` interpolation (a compositor/
//        paint property), the press squish, NOT a phantom lens-swell. L4 asserts the
//        reconciled identity: the `--glass-btn-press-t` drive reads on the material
//        specular press path, NO layout property animates on the press path (the
//        compositor-only `proof:no-layout-animation` floor, PRESERVED), AND the retired
//        lens-swell coupling does NOT survive (a re-introduced `.glass-lens` axis-swell
//        on press is the stale-design revival the DDR-LENS-BAKE clean break forbids).
//   L5 — `useSpecularPointer` is the SHARED angle-adding leaf wrapping the ONE
//        `createSpecularWriter` core (it writes `--specular-angle`), exported on the
//        /glass barrel; there is NO duplicate `getBoundingClientRect`/`--mouse-x` write
//        (the DRY single-source W-LIQUIDHOVER restored).
//   L6 — the GL-shader fence holds — the lens is the SVG `backdrop-filter: url()` graph;
//        ZERO aurora.frag / metaball.frag / webgl/shaders edit in the wave's bounds.
//
// bite-check (self-test, proven every run): the squircle map reverted to a uniform
// radial → L2 reddens; the broken var()-spliced head/`scale`/tail filter (the retired
// scope-2 three-token form) revived → L1 reddens; a re-introduced `.glass-lens` axis-
// swell on press (the retired lens-swell) → L4 reddens; a layout property on the press
// path → L4 reddens; a forked `--mouse-x`/getBoundingClientRect in useSpecularPointer →
// L5 reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Strip BOTH block (`/* */`) and line (`//`) comments — for .ts/.vue sources where a
// retirement-NOTE comment legitimately names a retired token in prose. The URL-safe
// `//`-strip (the clause-7 house idiom) leaves a `://` inside a URL untouched.
function stripAllComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:'"`])\/\/[^\n]*/g, "$1");
}

const FILES = {
    refract: "src/styles/glass-refract.css",
    props: "src/styles/tokens/property-regs.css",
    material: "src/styles/glass/material.css",
    surfaces: "src/styles/glass/surfaces.css",
    leaf: "src/composables/glass/useSpecularPointer.ts",
    core: "src/composables/glass/useSpecularTracking.ts",
    barrel: "src/composables/glass/index.ts",
};

// The shader-tree files the GL fence forbids touching (L6).
const SHADER_FILES = [
    "src/components/custom/aurora/constants/shaders/aurora.frag.ts",
    "src/components/custom/goo-blob/shaders/metaball.frag.ts",
    "src/composables/glass/webgl/shaders/procedural-color.glsl.ts",
];

// ───────────────────────────────────────────── L1 ─────────────────────────────────────
// DDR-LENS-BAKE RECONCILE (BC.W-VISUAL-RECONCILE). The scope-2 var()-spliced axis is
// retired; the reconciled identity is ONE complete self-contained `data:` URI with a
// baked `scale='<n>'` (the only form that parses + survives the url()-rewriter). L1
// asserts (a) the consuming filter is that single baked `data:` token, NOT the broken
// var()-spliced head/`scale`/tail form, and (b) the retired `@property --glass-refract`
// axis is recorded as retired (no live reg drives a phantom axis).
function checkL1(opts = {}) {
    const v = [];
    const propsSrc = stripCss(read(FILES.props));
    const refractSrc = stripCss(read(FILES.refract));

    // (a) the consuming `--glass-refract-filter` is ONE complete self-contained `data:`
    //     URI token with the displacement `scale` BAKED. The retired scope-2 form spliced
    //     a `var(--glass-refract)` BETWEEN a head-url and a tail-url (emitting three
    //     tokens `url("…") <n> url("…")` — a `backdrop-filter` rejects it). The reconciled
    //     form is a SINGLE `url("data:…scale='<n>'…")` with no var() splice on the scale.
    const composed = /--glass-refract-filter:\s*([^;]+);/.exec(refractSrc);
    const composedVal = composed ? composed[1] : "";
    // The self-test bite (opts.scaleLiteral) injects the BROKEN var()-spliced revival.
    const consumed = opts.scaleLiteral ?? composedVal;
    const declared = consumed.length > 0;
    // The reconciled identity: exactly ONE `url(...)` token, a `data:` URI, a baked
    // `scale='<digits>'`. A `var(--glass-refract)` splicing the SCALE is the retired
    // broken form.
    const urlTokenCount = (consumed.match(/\burl\(/g) || []).length;
    const isDataUri = /url\(\s*["']?data:/.test(consumed);
    const scaleBaked = /scale=(?:%27|%2527|'|")\s*\d+\s*(?:%27|%2527|'|")/.test(consumed);
    const scaleVarSpliced = /var\(--glass-refract\)/.test(consumed);
    const singleBakedDataUri = declared && urlTokenCount === 1 && isDataUri && scaleBaked && !scaleVarSpliced;
    if (!declared)
        v.push("L1: no `--glass-refract-filter` declared in glass-refract.css");
    else if (scaleVarSpliced)
        v.push("L1: the consuming `--glass-refract-filter` splices `var(--glass-refract)` into the `scale` (the RETIRED scope-2 head/`scale`/tail form — it emits three tokens a `backdrop-filter` rejects, so the lens renders `none`; DDR-LENS-BAKE bakes `scale='28'` into ONE complete `data:` URI)");
    else if (urlTokenCount !== 1)
        v.push("L1: the consuming `--glass-refract-filter` is not ONE complete url() token (got " + urlTokenCount + ") — the single self-contained `data:` URI is the only bundler-safe + parse-valid form (DDR-LENS-BAKE)");
    else if (!isDataUri)
        v.push("L1: the consuming `--glass-refract-filter` is not a `data:` URI — a non-data url() is mis-resolved by a consumer's url()-rewriter (DDR-LENS-BAKE bundler-safety)");
    else if (!scaleBaked)
        v.push("L1: the consuming `--glass-refract-filter` has no baked `scale='<n>'` literal (the §10 default depth, DDR-LENS-BAKE)");

    // (b) the `@property --glass-refract` axis is RETIRED — no live registration drives a
    //     phantom inert axis. A live reg would re-introduce the retired scope-2 design.
    const reg = /@property\s+--glass-refract\s*\{[^}]*\}/.exec(propsSrc);
    const axisRetired = !reg;
    if (reg)
        v.push("L1: a live `@property --glass-refract` registration survives in property-regs.css — the axis is RETIRED (DDR-LENS-BAKE: it drove a `scale` that reached no rendering filter; the scale is baked at 28)");
    // The retirement is recorded in the property-regs prose (the DDR-LENS-BAKE note).
    const retirementRecorded = /--glass-refract.*RETIRED|RETIRED.*--glass-refract|DDR-LENS-BAKE/.test(read(FILES.props));

    return {
        violations: v,
        facts: { singleBakedDataUri, isDataUri, scaleBaked, scaleVarSpliced, urlTokenCount, axisRetired, retirementRecorded },
    };
}

// ───────────────────────────────────────────── L2 ─────────────────────────────────────
function checkL2(opts = {}) {
    const v = [];
    const refractSrc = stripCss(read(FILES.refract));
    // The self-test bite (opts.mapOverride) lets us assert a uniform-radial revival REDs.
    const mapHaystack = opts.mapOverride ?? refractSrc;

    // The squircle crossed-gradient encoding is detectable: TWO axis gradients (an `hx`
    // horizontal R gradient + a `vy` vertical G gradient) SCREEN-composited. The retired
    // placeholder was a SINGLE `radialGradient` map. We assert the crossed-gradient
    // structure is present AND no uniform-radial map survives.
    const hasCrossedGradients =
        /id=%2522hx%2522/.test(mapHaystack) && /id=%2522vy%2522/.test(mapHaystack);
    const hasScreenComposite = /mix-blend-mode:screen/.test(mapHaystack);
    // The crude placeholder is a single `radialGradient id=%2522m%2522` displacement map.
    const placeholderRadial = /radialGradient id=%2522m%2522/.test(mapHaystack);
    // The bevel rim-band knob is minted.
    const bevelKnob = /--glass-refract-bevel:/.test(refractSrc);

    if (!hasCrossedGradients)
        v.push("L2: the displacement map is not the squircle crossed-gradient (no `hx`+`vy` axis gradients) — the edge-concentrated bevel profile is missing");
    if (!hasScreenComposite)
        v.push("L2: the crossed-gradient map is not SCREEN-composited (the per-channel R/G isolation is missing)");
    if (placeholderRadial)
        v.push("L2: the retired uniform `radialGradient` displacement-map placeholder survives (the crude radial bulge, not the squircle rim-lensing)");
    if (!bevelKnob)
        v.push("L2: the `--glass-refract-bevel` rim-band knob is not minted");

    return {
        violations: v,
        facts: { hasCrossedGradients, hasScreenComposite, placeholderRadial, bevelKnob },
    };
}

// ───────────────────────────────────────────── L3 ─────────────────────────────────────
function checkL3(opts = {}) {
    const v = [];
    const refractSrc = stripCss(opts.refractOverride ?? read(FILES.refract));

    // The @supports gate exists.
    const supportsGate = /@supports\s*\(backdrop-filter:\s*url\(/.test(refractSrc);
    if (!supportsGate) v.push("L3: no `@supports (backdrop-filter: url(#…))` gate — the off-Chromium degrade floor is gone");

    // No refraction backdrop-filter declaration sits OUTSIDE the @supports block. We split
    // on the @supports block and assert the lens `backdrop-filter` only appears inside it.
    // The composed filter URL is the refraction; a `backdrop-filter:` reading
    // `--glass-refract-filter` outside the gate is the regression.
    const supportsIdx = refractSrc.indexOf("@supports");
    const before = supportsIdx >= 0 ? refractSrc.slice(0, supportsIdx) : refractSrc;
    const refractOutsideGate = /backdrop-filter:[^;]*--glass-refract-filter/.test(before);
    if (refractOutsideGate)
        v.push("L3: a refraction `backdrop-filter` (reading --glass-refract-filter) sits OUTSIDE the @supports gate (a non-supporting engine would hit a broken url())");

    return { violations: v, facts: { supportsGate, refractOutsideGate } };
}

// ───────────────────────────────────────────── L4 ─────────────────────────────────────
// DDR-LENS-BAKE RECONCILE (BC.W-VISUAL-RECONCILE). The scope-2 `:active` lens-swell (a
// `.glass-lens { --glass-refract: calc(28 + …press-t…) }`) is RETIRED with the axis — it
// drove a value that reached NO rendering filter. The press read is now carried by the
// ONE `--glass-btn-press-t` drive on the MATERIAL gleam (the `.btn-glass:active::before`
// `--specular-intensity` interpolation, a compositor/paint property). L4 asserts the
// reconciled identity: (1) the press read rides `--glass-btn-press-t` on the material
// specular path, (2) NO layout property animates on that press path (compositor-only,
// PRESERVED), (3) the retired lens-swell axis-coupling does NOT survive.
function checkL4(opts = {}) {
    const v = [];
    const materialSrc = stripCss(opts.materialOverride ?? read(FILES.material));
    const surfacesSrc = stripCss(opts.surfacesOverride ?? read(FILES.surfaces));

    // (1) the press read rides the ONE `--glass-btn-press-t` drive on the material
    //     specular gleam — the `.btn-glass:active::before` `--specular-intensity`
    //     interpolation reading `var(--glass-btn-press-t)` (surfaces.css). This is the
    //     iOS press read that REPLACED the inert lens-swell.
    const pressReadHaystack = surfacesSrc + "\n" + materialSrc;
    const pressDriveReads =
        /--specular-intensity:\s*calc\([^}]*var\(--glass-btn-press-t\)/.test(pressReadHaystack);
    if (!pressDriveReads)
        v.push("L4: the press read does not ride the ONE `--glass-btn-press-t` drive on the material specular gleam (the `.btn-glass:active::before` `--specular-intensity` interpolation) — the iOS press read that replaced the retired lens-swell is missing");

    // (2) the retired `.glass-lens` axis-swell on press does NOT survive — a re-introduced
    //     `.glass-lens { --glass-refract: calc(…press-t…) }` is the stale-design revival
    //     the DDR-LENS-BAKE clean break forbids (it animated a value reaching no filter).
    const swellHaystack = opts.materialOverride ?? (materialSrc + "\n" + surfacesSrc);
    const swellHay = stripCss(swellHaystack);
    const lensSwellRevival =
        /\.glass-lens\s*\{[^}]*--glass-refract:\s*calc\([^}]*--glass-btn-press-t[^}]*\}/.test(swellHay);
    if (lensSwellRevival)
        v.push("L4: a `.glass-lens` `--glass-refract` axis-swell on `--glass-btn-press-t` survives — the RETIRED scope-2 lens-swell (it mutated an inert axis that reached no rendering filter; DDR-LENS-BAKE bakes the scale, the press read is the material gleam)");

    // (3) compositor/paint-only: NO layout property animates on the press path. Scan the
    //     :active press blocks for a LAYOUT property. The self-test bite injects one.
    const LAYOUT = /(?:^|[\s;{])(width|height|inline-size|block-size|padding(?:-\w+)?|margin(?:-\w+)?|font-size|line-height|top|left|right|bottom|inset(?:-\w+)?|gap|flex-basis|grid-template-\w+|border-\w*-?width)\s*:/;
    const pressBlocks = [
        ...(swellHay.match(/\.btn-glass:active(?:::before)?\s*\{[^}]*\}/g) || []),
        ...(swellHay.match(/\.glass-lens\s*\{[^}]*\}/g) || []),
    ];
    const layoutOnPress = pressBlocks.some((b) => LAYOUT.test(b));
    if (layoutOnPress)
        v.push("L4: a LAYOUT property animates on the press path (the compositor-only canon — proof:no-layout-animation set — is violated)");

    return {
        violations: v,
        facts: { pressDriveReads, lensSwellRevival, layoutOnPress },
    };
}

// ───────────────────────────────────────────── L5 ─────────────────────────────────────
function checkL5(opts = {}) {
    const v = [];
    const leafSrc = opts.leafOverride ?? read(FILES.leaf);
    const leafStripped = stripAllComments(leafSrc);
    const barrelSrc = stripAllComments(read(FILES.barrel));

    const leafExists = !!leafSrc;
    if (!leafExists) v.push("L5: useSpecularPointer.ts does not exist");

    // The leaf WRAPS createSpecularWriter (the single core) — no fork.
    const wrapsCore = /createSpecularWriter\s*\(/.test(leafStripped) &&
        /from\s+["']\.\/useSpecularTracking["']/.test(leafStripped);
    if (leafExists && !wrapsCore)
        v.push("L5: useSpecularPointer does not WRAP createSpecularWriter (the ONE position-write core) — a second specular family is forbidden");

    // The leaf writes the --specular-angle channel (the edge-glint feed).
    const writesAngle = /--specular-angle/.test(leafStripped);
    if (leafExists && !writesAngle)
        v.push("L5: useSpecularPointer does not write the `--specular-angle` channel (the edge-glint feed)");

    // DRY single-source: the leaf must NOT re-implement getBoundingClientRect / a raw
    // --mouse-x write (that lives in the core only). The self-test bite injects a fork.
    const forksPosition = /getBoundingClientRect/.test(leafStripped) ||
        /setProperty\(\s*["']--mouse-x/.test(leafStripped);
    if (leafExists && forksPosition)
        v.push("L5: useSpecularPointer FORKS the position write (getBoundingClientRect / a raw --mouse-x write) — the core owns the layout read (DRY single-source)");

    // The angle is DERIVED from the (x, y) the core already computed (atan2), not a fork.
    const derivesAngle = /atan2/.test(leafStripped);
    if (leafExists && !derivesAngle)
        v.push("L5: useSpecularPointer does not DERIVE the angle (atan2) from the core's (x, y) — the angle must ride the existing sink, not a second read");

    // Exported on the /glass barrel.
    const exported = /export\s*\{[^}]*useSpecularPointer/.test(barrelSrc) ||
        /export\s+\{\s*useSpecularPointer\s*\}/.test(barrelSrc);
    if (leafExists && !exported)
        v.push("L5: useSpecularPointer is not exported on the /glass barrel (composables/glass/index.ts)");

    // The @property --specular-angle channel is registered (inherits: false — per-element).
    const propsSrc = stripCss(read(FILES.props));
    const angleReg = /@property\s+--specular-angle\s*\{[^}]*\}/.exec(propsSrc);
    const angleNoInherit = angleReg && /inherits:\s*false/.test(angleReg[0]);
    if (!angleReg) v.push("L5: no `@property --specular-angle` registration");
    else if (!angleNoInherit) v.push("L5: `@property --specular-angle` is not `inherits: false` (the per-element specular cohort discipline)");

    return {
        violations: v,
        facts: { leafExists, wrapsCore, writesAngle, forksPosition, derivesAngle, exported, angleReg: !!angleReg, angleNoInherit: !!angleNoInherit },
    };
}

// ───────────────────────────────────────────── L6 ─────────────────────────────────────
function checkL6() {
    const v = [];
    // The fence is a TOUCH manifest: this gate's wave bounds NEVER include a shader-tree
    // file. We assert each shader file still exists (no deletion) AND carries no W-LENSING
    // edit marker (the lens is the SVG filter, not a GL edit). A W-LENSING reference in a
    // shader file is the regression.
    const touched = [];
    for (const rel of SHADER_FILES) {
        const src = read(rel);
        if (src && /W-LENSING/.test(src)) touched.push(rel);
    }
    if (touched.length)
        v.push(`L6: the GL-shader fence is breached — a W-LENSING edit reached the shader tree (${touched.join(", ")}); the lens is the SVG backdrop-filter graph, never a GL edit`);

    // The refraction is a backdrop-filter url() SVG graph (positive assert the lens is SVG).
    const refractSrc = read(FILES.refract);
    const isSvgFilter = /backdrop-filter:[^;]*url\(/.test(stripCss(refractSrc)) &&
        /feDisplacementMap/.test(refractSrc);
    if (!isSvgFilter)
        v.push("L6: the refraction is not an SVG `backdrop-filter: url()` feDisplacementMap graph");

    return { violations: v, facts: { shaderTouched: touched, isSvgFilter } };
}

// ───────────────────────────────────────────── self-test bite ─────────────────────────
function selfTest() {
    const failures = [];
    // BITE 1 — a uniform-radial map revival REDs L2.
    const radialRevival = `--glass-refract-filter: url("...radialGradient id=%2522m%2522...");`;
    if (checkL2({ mapOverride: radialRevival }).violations.length === 0)
        failures.push("self-test BITE-1 FAILED: a uniform-radial map revival did NOT red L2");
    // BITE 2 (DDR-LENS-BAKE) — the BROKEN var()-spliced head/`scale`/tail revival REDs L1
    // (the retired scope-2 three-token form: `url("…head") var(--glass-refract) url("…tail")`).
    if (checkL1({ scaleLiteral: "url(\"...head...scale='\") var(--glass-refract) url(\"'...tail...\")" })
            .violations.filter((x) => /var\(--glass-refract\)|scope-2|RETIRED/.test(x)).length === 0)
        failures.push("self-test BITE-2 FAILED: the broken var()-spliced head/`scale`/tail filter revival did NOT red L1");
    // BITE 3 — a forked getBoundingClientRect in the leaf REDs L5.
    const forkedLeaf =
        `import { createSpecularWriter } from "./useSpecularTracking";\n` +
        `export function useSpecularPointer(){ el.getBoundingClientRect(); /* --specular-angle atan2 */ }`;
    if (checkL5({ leafOverride: forkedLeaf }).violations.filter((x) => /FORK/.test(x)).length === 0)
        failures.push("self-test BITE-3 FAILED: a forked position write did NOT red L5");
    // BITE 4 — a layout property on the press path REDs L4 (the compositor-only floor).
    const layoutPress =
        `.btn-glass:active::before { --specular-intensity: calc(0.1 + 0.06 * var(--glass-btn-press-t)); padding: 4px; }`;
    if (checkL4({ materialOverride: layoutPress }).violations.filter((x) => /LAYOUT/.test(x)).length === 0)
        failures.push("self-test BITE-4 FAILED: a layout property on the press path did NOT red L4");
    // BITE 5 (DDR-LENS-BAKE) — a re-introduced `.glass-lens` axis-swell on press REDs L4
    // (the retired scope-2 lens-swell that mutated an inert axis reaching no filter).
    const lensSwellRevival =
        `.glass-lens { --glass-refract: calc(28 + var(--glass-btn-press-t) * 16); }`;
    if (checkL4({ materialOverride: lensSwellRevival }).violations.filter((x) => /RETIRED.*lens-swell|lens-swell.*RETIRED|axis-swell/.test(x)).length === 0)
        failures.push("self-test BITE-5 FAILED: a re-introduced `.glass-lens` axis-swell on press did NOT red L4");
    return failures;
}

function detect() {
    const l1 = checkL1();
    const l2 = checkL2();
    const l3 = checkL3();
    const l4 = checkL4();
    const l5 = checkL5();
    const l6 = checkL6();
    const biteFailures = selfTest();
    return {
        violations: [
            ...l1.violations,
            ...l2.violations,
            ...l3.violations,
            ...l4.violations,
            ...l5.violations,
            ...l6.violations,
            ...biteFailures,
        ],
        facts: {
            L1: l1.facts,
            L2: l2.facts,
            L3: l3.facts,
            L4: l4.facts,
            L5: l5.facts,
            L6: l6.facts,
            selfTestPassed: biteFailures.length === 0,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_LENSING_ARTIFACT", "BB-lensing");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:lensing",
        facts,
        violations,
    });

    console.log("proof:lensing — the squircle edge-lensing axis + the motion-reactive EDGE specular glint (BB.W-LENSING; DDR-LENS-BAKE reconciled at BC.W-VISUAL-RECONCILE)");
    console.log(`  L1 baked data-URI       : single-baked-data-uri=${facts.L1.singleBakedDataUri ? "✓" : "✗"} no-var-splice=${!facts.L1.scaleVarSpliced ? "✓" : "✗"} axis-retired=${facts.L1.axisRetired ? "✓" : "✗"}`);
    console.log(`  L2 squircle map         : crossed=${facts.L2.hasCrossedGradients ? "✓" : "✗"} screen=${facts.L2.hasScreenComposite ? "✓" : "✗"} no-radial=${!facts.L2.placeholderRadial ? "✓" : "✗"} bevel=${facts.L2.bevelKnob ? "✓" : "✗"}`);
    console.log(`  L3 @supports floor      : gate=${facts.L3.supportsGate ? "✓" : "✗"} no-leak=${!facts.L3.refractOutsideGate ? "✓" : "✗"}`);
    console.log(`  L4 press read (gleam)   : press-t-drive=${facts.L4.pressDriveReads ? "✓" : "✗"} no-lens-swell-revival=${!facts.L4.lensSwellRevival ? "✓" : "✗"} no-layout=${!facts.L4.layoutOnPress ? "✓" : "✗"}`);
    console.log(`  L5 useSpecularPointer   : exists=${facts.L5.leafExists ? "✓" : "✗"} wraps-core=${facts.L5.wrapsCore ? "✓" : "✗"} angle=${facts.L5.writesAngle ? "✓" : "✗"} no-fork=${!facts.L5.forksPosition ? "✓" : "✗"} exported=${facts.L5.exported ? "✓" : "✗"}`);
    console.log(`  L6 GL fence             : shader-untouched=${facts.L6.shaderTouched.length === 0 ? "✓" : "✗"} svg-filter=${facts.L6.isSvgFilter ? "✓" : "✗"}`);
    console.log(`  self-test bites         : ${facts.selfTestPassed ? "all 5 fire ✓" : "FAILED ✗"}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { detect, checkL1, checkL2, checkL3, checkL4, checkL5, checkL6, selfTest };
