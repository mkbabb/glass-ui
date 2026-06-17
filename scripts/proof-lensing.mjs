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
//   L1 — `--glass-refract` is a typed INHERITING <number> axis (@property) driving the
//        lens `scale`; the data-URI `scale` is `var(--glass-refract)`-derived, NOT a bare
//        `scale='28'` literal on the consuming axis.
//   L2 — the displacement map is the edge-concentrated squircle bevel-profile (the
//        crossed-gradient encoding — a HORIZONTAL R gradient + a VERTICAL G gradient,
//        SCREEN-composited), NOT the retired uniform `radialGradient` placeholder; the
//        `--glass-refract-bevel` rim-band knob is minted.
//   L3 — the whole lens sits behind `@supports (backdrop-filter: url(#…))`; no refraction
//        `backdrop-filter` declaration sits OUTSIDE the gate (the off-Chromium blur+tint
//        floor preserved).
//   L4 — the `:active` lens-swell + the edge-glint ride ONE `--glass-btn-press-t` drive
//        on a compositor/filter property (the `--glass-refract` displacement scale + the
//        `--specular-intensity` gleam), NO layout property animates on the press path;
//        the press transition rides the per-spring clock (`--spring-snappy-duration`).
//   L5 — `useSpecularPointer` is the SHARED angle-adding leaf wrapping the ONE
//        `createSpecularWriter` core (it writes `--specular-angle`), exported on the
//        /glass barrel; there is NO duplicate `getBoundingClientRect`/`--mouse-x` write
//        (the DRY single-source W-LIQUIDHOVER restored).
//   L6 — the GL-shader fence holds — the lens is the SVG `backdrop-filter: url()` graph;
//        ZERO aurora.frag / metaball.frag / webgl/shaders edit in the wave's bounds.
//
// bite-check (self-test, proven every run): the squircle map reverted to a uniform
// radial → L2 reddens; a bare `scale='<n>'` literal driving the consuming filter → L1
// reddens; a forked `--mouse-x`/getBoundingClientRect in useSpecularPointer → L5 reddens;
// a layout property on the press path → L4 reddens.

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
function checkL1(opts = {}) {
    const v = [];
    const propsSrc = stripCss(read(FILES.props));
    const refractSrc = stripCss(read(FILES.refract));

    // (a) the typed INHERITING @property --glass-refract registration.
    const reg = /@property\s+--glass-refract\s*\{[^}]*\}/.exec(propsSrc);
    const hasReg = !!reg;
    const inheritsTrue = hasReg && /inherits:\s*true/.test(reg[0]);
    const isNumber = hasReg && /syntax:\s*["']<number>["']/.test(reg[0]);
    if (!hasReg) v.push("L1: no `@property --glass-refract` registration in property-regs.css");
    else {
        if (!inheritsTrue) v.push("L1: `@property --glass-refract` is not `inherits: true` (the host-retunable cascading axis)");
        if (!isNumber) v.push("L1: `@property --glass-refract` is not `syntax: \"<number>\"`");
    }

    // (b) the consuming filter `scale` is var(--glass-refract)-derived, NOT a bare literal.
    //     The composed `--glass-refract-filter` must reference var(--glass-refract); a bare
    //     `scale='<digits>'` baked on the CONSUMED filter value (the head/tail concat) without
    //     the var would RED.
    const composed = /--glass-refract-filter:\s*([^;]+);/.exec(refractSrc);
    const composedVal = composed ? composed[1] : "";
    // The self-test bite (opts.scaleLiteral) injects a bare-literal consuming filter.
    const consumed = opts.scaleLiteral ?? composedVal;
    const axisDerived = /var\(--glass-refract\)/.test(consumed);
    if (!axisDerived) {
        v.push("L1: the consuming `--glass-refract-filter` does not derive `scale` from `var(--glass-refract)` (a bare `scale='<n>'` literal is the AW.W23 placeholder)");
    }

    return {
        violations: v,
        facts: { hasReg, inheritsTrue, isNumber, axisDerived },
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
function checkL4(opts = {}) {
    const v = [];
    const materialSrc = stripCss(opts.materialOverride ?? read(FILES.material));

    // The `.glass-lens` :active swell couples the --glass-refract scale to the ONE press
    // drive (--glass-btn-press-t) and rides the per-spring clock; NO layout property animates.
    const swellBlock =
        /\.glass-lens\s*\{[^}]*--glass-refract:\s*calc\([^}]*--glass-btn-press-t[^}]*\}/.test(
            materialSrc,
        );
    if (!swellBlock)
        v.push("L4: the `.glass-lens` :active lens-swell does not couple `--glass-refract` to the `--glass-btn-press-t` press drive via calc()");

    // The press transition rides the per-spring clock (--spring-snappy-duration), NOT a
    // generic --duration-*.
    const swellTransition = /transition:\s*--glass-refract\s+var\(--spring-snappy-duration/.test(
        materialSrc,
    );
    if (!swellTransition)
        v.push("L4: the lens-swell transition does not ride the per-spring `--spring-snappy-duration` clock");

    // Compositor/filter-only: scan the `.glass-lens` swell block for a LAYOUT property
    // (width/height/padding/margin/font-size/inset/top/left/...). The self-test bite injects one.
    const LAYOUT = /(?:^|[\s;{])(width|height|inline-size|block-size|padding(?:-\w+)?|margin(?:-\w+)?|font-size|line-height|top|left|right|bottom|inset(?:-\w+)?|gap|flex-basis|grid-template-\w+|border-\w*-?width)\s*:/;
    const lensBlock = /\.glass-lens\s*\{[^}]*\}/.exec(materialSrc);
    const layoutOnPress = lensBlock ? LAYOUT.test(lensBlock[0]) : false;
    if (layoutOnPress)
        v.push("L4: a LAYOUT property animates on the lens-swell press path (the compositor-only canon — proof:no-layout-animation set — is violated)");

    return {
        violations: v,
        facts: { swellBlock, swellTransition, layoutOnPress },
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
    // BITE 2 — a bare scale literal (no var) REDs L1.
    if (checkL1({ scaleLiteral: "url(\"...scale='28'...\")" }).violations.filter((x) => /axis|var/.test(x) || /scale/.test(x)).length === 0)
        failures.push("self-test BITE-2 FAILED: a bare `scale='28'` literal did NOT red L1");
    // BITE 3 — a forked getBoundingClientRect in the leaf REDs L5.
    const forkedLeaf =
        `import { createSpecularWriter } from "./useSpecularTracking";\n` +
        `export function useSpecularPointer(){ el.getBoundingClientRect(); /* --specular-angle atan2 */ }`;
    if (checkL5({ leafOverride: forkedLeaf }).violations.filter((x) => /FORK/.test(x)).length === 0)
        failures.push("self-test BITE-3 FAILED: a forked position write did NOT red L5");
    // BITE 4 — a layout property on the press path REDs L4.
    const layoutSwell =
        `.glass-lens { --glass-refract: calc(28 + var(--glass-btn-press-t) * 16); ` +
        `transition: --glass-refract var(--spring-snappy-duration) var(--spring-snappy); padding: 4px; }`;
    if (checkL4({ materialOverride: layoutSwell }).violations.filter((x) => /LAYOUT/.test(x)).length === 0)
        failures.push("self-test BITE-4 FAILED: a layout property on the press path did NOT red L4");
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

    console.log("proof:lensing — the squircle edge-lensing axis + the motion-reactive EDGE specular glint (BB.W-LENSING)");
    console.log(`  L1 --glass-refract axis : reg=${facts.L1.hasReg ? "✓" : "✗"} inherits=${facts.L1.inheritsTrue ? "✓" : "✗"} scale-var-derived=${facts.L1.axisDerived ? "✓" : "✗"}`);
    console.log(`  L2 squircle map         : crossed=${facts.L2.hasCrossedGradients ? "✓" : "✗"} screen=${facts.L2.hasScreenComposite ? "✓" : "✗"} no-radial=${!facts.L2.placeholderRadial ? "✓" : "✗"} bevel=${facts.L2.bevelKnob ? "✓" : "✗"}`);
    console.log(`  L3 @supports floor      : gate=${facts.L3.supportsGate ? "✓" : "✗"} no-leak=${!facts.L3.refractOutsideGate ? "✓" : "✗"}`);
    console.log(`  L4 press lens-swell     : swell=${facts.L4.swellBlock ? "✓" : "✗"} spring-clock=${facts.L4.swellTransition ? "✓" : "✗"} no-layout=${!facts.L4.layoutOnPress ? "✓" : "✗"}`);
    console.log(`  L5 useSpecularPointer   : exists=${facts.L5.leafExists ? "✓" : "✗"} wraps-core=${facts.L5.wrapsCore ? "✓" : "✗"} angle=${facts.L5.writesAngle ? "✓" : "✗"} no-fork=${!facts.L5.forksPosition ? "✓" : "✗"} exported=${facts.L5.exported ? "✓" : "✗"}`);
    console.log(`  L6 GL fence             : shader-untouched=${facts.L6.shaderTouched.length === 0 ? "✓" : "✗"} svg-filter=${facts.L6.isSvgFilter ? "✓" : "✗"}`);
    console.log(`  self-test bites         : ${facts.selfTestPassed ? "all 4 fire ✓" : "FAILED ✗"}`);

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
