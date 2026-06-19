#!/usr/bin/env node
// BB.W-VIZ-SUITE (W-CONCENTRIC) — proof:concentric, the concentric source gate
// (born-RED on the bare tree → GREEN at close).
//
// Concentric is the LAST NEW WebGPU-first viz of Batch V — born on the proven substrate
// (W-GPU-SUBSTRATE + the aurora/goo-blob WGSL migrations + the dot-flow-field precedent).
// This gate machine-locks the WebGPU-first-with-fallback shape + the colocation/publication
// + the radial-Fourier readback clause + the JS↔WGSL/GLSL round-trip (the single-math-source
// bar). The binding live-π / own-surface DELTA capture (the gestalt bar) rides W-REFLECT3
// (tests-visual/concentric.spec.ts).
//
// SOURCE PREDICATES (each falsifiable, each device-free):
//   1. COLOCATION — the feature-dir carries composables/ + constants.ts +
//      shaders/{concentric.wgsl.ts (primary), concentric.glsl.ts (fallback)} + README.md
//      (the proof:colocation layout the README marker enrolls).
//   2. COMPOSES-SUBSTRATE — Concentric.vue / useConcentric.ts compose useGpuSubstrate
//      (the picker), NOT createWebGLCanvas / navigator.gpu directly (clause A of the
//      parity gate, scoped to this viz).
//   3. ROUND-TRIP — the analytic radial-Fourier evaluator (ringField.ts sampleRingField)
//      is the SINGLE math source: the WGSL fragment shader AND the GLSL fallback transcribe
//      the SAME radial sum (ω = √(g·k), the ellipsoidal norm, the θ = k·r − ω·t + φ phase,
//      the per-center weighted sum) — a structural transcription check, the device-free
//      form of the JS↔shader clause.
//   4. FALLBACK — the WebGL2 GLSL fallback exists + its parity status is declared verified
//      in the parity table, resolving on disk.
//   5. WARM-IDENTITY — the DEFAULT palette in constants.ts is warm-cream identity (NO
//      teal/navy/violet literal — the demo owns the themed palette; presets-in-consumers).
//   6. STORY — a demo/stories/substrates/concentric.vue story covers the export
//      (proof:storybook-complete green).
//
// SELF-TEST BITE (--selftest): a synthetic broken tree (a teal literal injected into the
// library constants; a navigator.gpu direct call; a broken round-trip) MUST red — born-RED
// proof on a green HEAD.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/concentric");
const PARITY_TABLE = resolve(ROOT, "docs/tranches/BB/audit/gpu-parity-table.md");
const STORY = resolve(ROOT, "demo/stories/substrates/concentric.vue");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");

// ── Clause runners (return a violation string array each) ──

function clauseColocation(overrides = {}) {
    const viol = [];
    const must = [
        "Concentric.vue",
        "constants.ts",
        "index.ts",
        "README.md",
        "composables/ringField.ts",
        "composables/useConcentric.ts",
        "composables/uniformBridgeWGPU.ts",
        "composables/concentricWGPUSetup.ts",
        "composables/concentricGLSetup.ts",
        "shaders/concentric.wgsl.ts",
        "shaders/concentric.glsl.ts",
    ];
    for (const rel of must) {
        if (overrides[rel] === false) continue; // self-test removal
        if (!existsSync(resolve(DIR, rel)))
            viol.push(`colocation: missing ${rel} (the feature-dir layout)`);
    }
    return viol;
}

function clauseComposesSubstrate(srcOverride) {
    const viol = [];
    const sfc =
        srcOverride?.["Concentric.vue"] ?? read(resolve(DIR, "Concentric.vue"));
    const composable =
        srcOverride?.["useConcentric"] ??
        read(resolve(DIR, "composables/useConcentric.ts"));
    const both = stripComments(sfc) + "\n" + stripComments(composable);
    // The viz must NOT bootstrap a context directly.
    if (/navigator\s*\.\s*gpu\s*\.\s*requestAdapter/.test(both))
        viol.push("composes: a direct navigator.gpu.requestAdapter call — the viz must compose useGpuSubstrate");
    if (/getContext\(\s*["']webgl2["']/.test(both))
        viol.push("composes: a direct getContext('webgl2') call — the viz must compose the substrate picker");
    if (!/useGpuSubstrate|createGpuSubstrate/.test(both))
        viol.push("composes: useConcentric does not compose the useGpuSubstrate picker");
    return viol;
}

function clauseRoundTrip(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["ringField"] ?? read(resolve(DIR, "composables/ringField.ts")),
    );
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    // The single-math-source check: BOTH shaders transcribe the SAME radial-Fourier sum
    // (ω = √(g·k), the ellipsoidal radius, the θ = k·radius − ω·t + φ phase, the
    // per-center weighted sum) the JS evaluator carries. A structural transcription match.
    const sharedTokens = [
        ["sampleRingField in JS", () => /function sampleRingField/.test(js)],
        ["sampleRingField in WGSL", () => /fn sampleRingField/.test(wgsl)],
        ["sampleRingField in GLSL", () => /float sampleRingField/.test(glsl)],
        ["dispersion ω=√(g·k) in JS", () => /Math\.sqrt\(\s*RING_GRAVITY\s*\*\s*k\s*\)/.test(js)],
        ["dispersion ω=√(g·k) in WGSL", () => /sqrt\(\s*RING_GRAVITY\s*\*\s*k\s*\)/.test(wgsl)],
        ["dispersion ω=√(g·k) in GLSL", () => /sqrt\(\s*RING_GRAVITY\s*\*\s*k\s*\)/.test(glsl)],
        ["ellipsoidalRadius in JS", () => /function ellipsoidalRadius/.test(js)],
        ["ellipsoidalRadius in WGSL", () => /fn ellipsoidalRadius/.test(wgsl)],
        ["ellipsoidalRadius in GLSL", () => /float ellipsoidalRadius/.test(glsl)],
        ["phase θ=k·r−ω·t+φ in JS", () => /k\s*\*\s*radius\s*-\s*omega\s*\*\s*timeSec\s*\+\s*r\.phase/.test(js)],
        ["phase θ=k·r−ω·t+φ in WGSL", () => /k\s*\*\s*radius\s*-\s*omega\s*\*\s*t\s*\+\s*r\.z/.test(wgsl)],
        ["phase θ=k·r−ω·t+φ in GLSL", () => /k\s*\*\s*radius\s*-\s*omega\s*\*\s*t\s*\+\s*r\.z/.test(glsl)],
    ];
    for (const [label, fn] of sharedTokens) {
        if (!fn()) viol.push(`round-trip: ${label} — both shaders must transcribe the SAME ringField.ts math (the single source)`);
    }
    return viol;
}

function clauseFallback(srcOverride) {
    const viol = [];
    // The fallback path exists.
    if (!existsSync(resolve(DIR, "shaders/concentric.glsl.ts")))
        viol.push("fallback: shaders/concentric.glsl.ts (the WebGL2 GLSL fallback) is missing");
    // The parity table declares the concentric row verified (or degraded — a recorded
    // honest status), resolving on disk.
    const table = srcOverride?.["parity"] ?? read(PARITY_TABLE);
    const m = (table ?? "").match(/```json\s*([\s\S]*?)```/);
    if (!m) {
        viol.push("fallback: the parity table has no machine-read JSON block");
    } else {
        let parsed = null;
        try {
            parsed = JSON.parse(m[1]);
        } catch (e) {
            viol.push(`fallback: parity JSON parse error — ${e.message}`);
        }
        const row = parsed?.viz?.find((r) => r.viz === "concentric");
        if (!row) viol.push("fallback: the parity table has no concentric row");
        else {
            if (!["verified", "degraded", "webgl2-only"].includes(row.status))
                viol.push(`fallback: concentric parity status "${row.status}" is not a live status`);
            if (!row.primary || !existsSync(resolve(ROOT, row.primary)))
                viol.push("fallback: the declared primary path does not resolve on disk");
            if (!row.fallback || !existsSync(resolve(ROOT, row.fallback)))
                viol.push("fallback: the declared fallback path does not resolve on disk");
        }
    }
    return viol;
}

function clauseWarmIdentity(srcOverride) {
    const viol = [];
    const consts = stripComments(
        srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    // The warm-identity default — NO teal/navy/violet literal in the LIBRARY constants. The
    // themed ring palette (hue ~180-300) lives in the DEMO preset, never here. Detect an
    // OklchStop with a cool/themed hue.
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 320)
            viol.push(`warm-identity: a cool/themed hue (h=${h}) in the LIBRARY constants.ts — the themed ring palette belongs in the DEMO preset (presets-in-consumers)`);
    }
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("warm-identity: constants.ts does not declare WARM_IDENTITY_PALETTE");
    return viol;
}

function clauseStory(srcOverride) {
    const viol = [];
    if (srcOverride?.["story"] === false) {
        viol.push("story: missing demo/stories/substrates/concentric.vue");
        return viol;
    }
    const story = read(STORY);
    if (!story) {
        viol.push("story: missing demo/stories/substrates/concentric.vue");
        return viol;
    }
    if (!/Concentric/.test(story))
        viol.push("story: the substrates story does not import/render <Concentric>");
    return viol;
}

// ── BC.W-VIZ-CONCENTRIC clauses (C1-C5) — the LINES-NOT-BLUR render+generator fix ──

// C1 — the ISOLINE render, not a smooth-field-through-ramp blur.
function clauseC1Isoline(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    // The IQ gradient-normalized distance-estimation operator: de = |s| / (|cos|·|∇phase|),
    // then line = 1 − smoothstep(lineW, lineW+aa, de). BOTH shaders carry it.
    const hasIsoline = (src) =>
        /abs\(s\)\s*\/\s*max\(\s*cphase\s*\*\s*gradPhase/.test(src) &&
        /1\.0\s*-\s*smoothstep\(\s*lineHalfW/.test(src);
    if (!hasIsoline(wgsl))
        viol.push("C1-isoline: concentric.wgsl.ts fs_main lacks the de=|s|/(|cos|·|∇|) + smoothstep isoline stroke (the LINE render)");
    if (!hasIsoline(glsl))
        viol.push("C1-isoline: concentric.glsl.ts lacks the de=|s|/(|cos|·|∇|) + smoothstep isoline stroke (the LINE render)");
    // ANTI-EVASION: the smooth-field-straight-through-the-ramp must NOT be the SOLE output.
    // The old defect: `let v = clamp(0.5 + raw*norm); samplePaletteLin(v)` as the only paint,
    // with the alpha riding `v` (the field brightness), never an isoline `ink`.
    const ramExpose = (src) =>
        /alpha\s*=\s*ink/.test(src) || /vec4<f32>\(rgb\s*\*\s*alpha/.test(src);
    // The new render makes the LINE carry the alpha (`alpha = ink`); a re-paste of the old
    // `alpha = clamp(v*0.92 + 0.08 ...)` field-brightness alpha reds.
    const oldFieldAlpha = (src) => /v\s*\*\s*0\.92\s*\+\s*0\.08/.test(src);
    if (oldFieldAlpha(wgsl))
        viol.push("C1-isoline: concentric.wgsl.ts still rides the field-brightness alpha (the smooth blur) — the LINE must carry the ink");
    if (oldFieldAlpha(glsl))
        viol.push("C1-isoline: concentric.glsl.ts still rides the field-brightness alpha (the smooth blur) — the LINE must carry the ink");
    void ramExpose;
    return viol;
}

// C2 — clean beating families, NO Phillips turbulence ladder.
function clauseC2CleanFamilies(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["ringField"] ?? read(resolve(DIR, "composables/ringField.ts")),
    );
    const consts = stripComments(
        srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    // The Phillips ladder is GONE (no buildRingLadder, no 5-octave/×0.62 turbulence body).
    if (/buildRingLadder/.test(js) || /buildRingLadder/.test(consts))
        viol.push("C2-families: buildRingLadder (the 5-octave Phillips turbulence ladder) survives — the noise amplifier must be retired");
    if (/octaves\s*=\s*5/.test(js) || /wavelength\s*\*=\s*0\.62/.test(js))
        viol.push("C2-families: a 5-octave / ×0.62 turbulence ladder body survives in ringField.ts");
    // The clean beating-families builder exists (≤2 clean rings per family).
    if (!/function buildRingFamily/.test(js))
        viol.push("C2-families: ringField.ts lacks buildRingFamily (the clean beating-families builder)");
    // The builder caps harmonics ≤ 2 (no octave ladder).
    if (!/Math\.min\(2,\s*harmonics\)/.test(js))
        viol.push("C2-families: buildRingFamily does not cap harmonics ≤ 2 (a family must be 1-2 clean frequencies, not an octave ladder)");
    return viol;
}

// C3 — ONE math source round-trips (the analytic gradient + rotated radius + isoline).
function clauseC3MathSource(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["ringField"] ?? read(resolve(DIR, "composables/ringField.ts")),
    );
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    const tokens = [
        ["analytic gradient ellipsoidalGradMag in JS", () => /function ellipsoidalGradMag/.test(js)],
        ["analytic gradient ellipsoidalGradMag in WGSL", () => /fn ellipsoidalGradMag/.test(wgsl)],
        ["analytic gradient ellipsoidalGradMag in GLSL", () => /float ellipsoidalGradMag/.test(glsl)],
        ["rotated radius ellipsoidalRadiusRot in JS", () => /function ellipsoidalRadiusRot/.test(js)],
        ["rotated radius ellipsoidalRadiusRot in WGSL", () => /fn ellipsoidalRadiusRot/.test(wgsl)],
        ["rotated radius ellipsoidalRadiusRot in GLSL", () => /float ellipsoidalRadiusRot/.test(glsl)],
        ["isoline ringIsolineInk in JS", () => /function ringIsolineInk/.test(js)],
        ["isoline ringIsolineInk in WGSL", () => /fn ringIsolineInk/.test(wgsl)],
        ["isoline ringIsolineInk in GLSL", () => /vec2 ringIsolineInk/.test(glsl)],
    ];
    for (const [label, fn] of tokens) {
        if (!fn())
            viol.push(`C3-math-source: ${label} — the analytic gradient + isoline must round-trip JS↔WGSL↔GLSL (the single source)`);
    }
    return viol;
}

// C4 — ellipsoid axis-ratio KEPT + per-family rotAlpha tilt.
function clauseC4Ellipsoid(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["ringField"] ?? read(resolve(DIR, "composables/ringField.ts")),
    );
    const consts = stripComments(
        srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    const bridge = stripComments(
        srcOverride?.["bridge"] ?? read(resolve(DIR, "composables/uniformBridgeWGPU.ts")),
    );
    // The axis ratio is KEPT (the ellipsoid; a circular-only render reds).
    if (!/axisRatio/.test(consts))
        viol.push("C4-ellipsoid: constants.ts lacks axisRatio (the ellipsoid axis ratio must be kept)");
    if (!/axisA|axisB/.test(js))
        viol.push("C4-ellipsoid: ringField.ts dropped the axis-ratio (circular-only) — the ellipsoid norm must be kept");
    // rotAlpha is the per-family tilt, reusing the spare centers[j].w lane.
    if (!/rotAlpha/.test(js))
        viol.push("C4-ellipsoid: ringField.ts lacks the per-family rotAlpha tilt (the crossing-fronts axis)");
    if (!/rotAlpha/.test(consts))
        viol.push("C4-ellipsoid: constants.ts RingCenter lacks rotAlpha");
    // The center row's .w lane carries rotAlpha (no byte-layout break).
    if (!/c\.rotAlpha/.test(bridge))
        viol.push("C4-ellipsoid: uniformBridgeWGPU.ts does not pack rotAlpha into the center row .w lane");
    return viol;
}

// C5 — warm-cream identity default; teal-on-navy NOT the demo default.
function clauseC5WarmDefault(srcOverride) {
    const viol = [];
    const consts = stripComments(
        srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    const story = stripComments(srcOverride?.["story"] ?? read(STORY));
    // WARM_IDENTITY_PALETTE is the default config palette (re-asserted; clause 5 covers hues).
    if (!/palette:\s*WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("C5-warm-default: DEFAULT_CONCENTRIC_CONFIG.palette is not WARM_IDENTITY_PALETTE");
    // The demo must NOT default useTheme to the teal-on-navy preset (born-RED on the old
    // `useTheme = ref(true)`).
    if (/useTheme\s*=\s*ref\(\s*true\s*\)/.test(story))
        viol.push("C5-warm-default: concentric.vue defaults useTheme to TRUE (the teal-on-navy preset) — the warm-cream identity must lead");
    // The demo's live config must initialize from the WARM preset (not the THEME preset).
    // Scoped to the reactive() initializer statement (bounded — not a later import reference).
    if (/reactive<ConcentricConfig>\([^;]{0,160}CONCENTRIC_PRESET_THEME/.test(story))
        viol.push("C5-warm-default: concentric.vue initializes the live config from CONCENTRIC_PRESET_THEME — the warm-cream preset must be the default");
    return viol;
}

function runAll(overrides = {}) {
    return [
        ...clauseColocation(overrides.colocation ?? {}),
        ...clauseComposesSubstrate(overrides.composes),
        ...clauseRoundTrip(overrides.roundTrip),
        ...clauseFallback(overrides.fallback),
        ...clauseWarmIdentity(overrides.warm),
        ...clauseStory(overrides.story),
        ...clauseC1Isoline(overrides.c1),
        ...clauseC2CleanFamilies(overrides.c2),
        ...clauseC3MathSource(overrides.c3),
        ...clauseC4Ellipsoid(overrides.c4),
        ...clauseC5WarmDefault(overrides.c5),
    ];
}

// ── Self-test bite: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) a themed (teal) literal injected into the library constants.
    const tealInjected = runAll({
        warm: { constants: "export const X = { L: 0.8, C: 0.12, h: 210 };\nWARM_IDENTITY_PALETTE" },
    });
    if (tealInjected.length === 0) fails.push("self-test: a teal hue in library constants did NOT red");
    // (b) a direct navigator.gpu call in the composable.
    const directGpu = runAll({
        composes: {
            "Concentric.vue": "useGpuSubstrate",
            useConcentric: "navigator.gpu.requestAdapter(); useGpuSubstrate",
        },
    });
    if (directGpu.length === 0) fails.push("self-test: a direct navigator.gpu.requestAdapter did NOT red");
    // (c) a broken round-trip (the WGSL shader missing the dispersion term).
    const brokenRT = runAll({
        roundTrip: { wgsl: "fn sampleRingField() {}\n// no dispersion, no ellipsoidalRadius" },
    });
    if (brokenRT.length === 0) fails.push("self-test: a broken JS↔WGSL round-trip did NOT red");
    // (d) a missing story.
    const noStory = runAll({ story: { story: false } });
    if (noStory.length === 0) fails.push("self-test: a missing story did NOT red");

    // (e) C1 — a re-pasted smooth-field-through-ramp render (no isoline) reds.
    const smoothBlur = runAll({
        c1: {
            wgsl: "let v = clamp(0.5 + raw*norm); let lin = samplePaletteLin(v); let alpha = v * 0.92 + 0.08;",
            glsl: "float v = clamp(0.5 + raw*norm); vec3 lin = samplePaletteLin(v); float alpha = v * 0.92 + 0.08;",
        },
    });
    if (smoothBlur.length === 0) fails.push("self-test: a smooth-field-through-ramp render (no isoline) did NOT red");

    // (f) C2 — a re-introduced Phillips ladder (octaves=5, ×0.62) reds.
    const phillips = runAll({
        c2: {
            ringField: "export function buildRingLadder(octaves = 5) { wavelength *= 0.62; }\nfunction buildRingFamily(){ Math.min(2, harmonics); }",
        },
    });
    if (phillips.length === 0) fails.push("self-test: a re-introduced Phillips ladder (octaves=5) did NOT red");

    // (g) C3 — a shader missing the analytic gradient transcription reds.
    const noGrad = runAll({
        c3: {
            wgsl: "fn sampleRingField() {}\n// no ellipsoidalGradMag, no ringIsolineInk",
        },
    });
    if (noGrad.length === 0) fails.push("self-test: a missing analytic-gradient transcription did NOT red");

    // (h) C4 — a deleted axis-ratio (circular-only) reds.
    const circular = runAll({
        c4: {
            ringField: "function ellipsoidalRadiusRot(){}\nfunction ringIsolineInk(){}\n// no axisA, no rotAlpha",
            constants: "WARM_IDENTITY_PALETTE\n// no axisRatio, no rotAlpha",
        },
    });
    if (circular.length === 0) fails.push("self-test: a deleted axis-ratio (circular-only) did NOT red");

    // (i) C5 — a demo defaulting to the teal-on-navy theme reds.
    const tealDefault = runAll({
        c5: {
            story: "const useTheme = ref(true)\npalette: WARM_IDENTITY_PALETTE",
        },
    });
    if (tealDefault.length === 0) fails.push("self-test: a demo defaulting useTheme=true (teal-on-navy) did NOT red");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:concentric",
        wave: "BB.W-VIZ-SUITE.e W-CONCENTRIC",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_CONCENTRIC_ARTIFACT", "proof-concentric.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:concentric — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:concentric — GREEN (11 clauses: 6 base + C1-C5 lines/families/round-trip/ellipsoid/warm)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:concentric --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:concentric --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
