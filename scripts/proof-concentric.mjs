#!/usr/bin/env node
// BD.W-CONCENTRIC-RELIEF — proof:concentric, the concentric source gate (REWRITTEN).
//
// Concentric is a level-set TOPOGRAPHIC CONTOUR survey (paper-grid kin): the iso-contours of a
// low-octave height field H(p) sampled over the SHARED `waveField`+`curlFBM` leaf, rendered as
// an OPAQUE hypsometric fill (tanh tone → KEPT samplePaletteLin) under an analytic hillshade,
// with a two-tier index/minor contour hierarchy via the byte-frozen `contourInk` operator. The
// ring-interference engine (`ringField.ts`/`sampleRingField`/`buildRingFamily`/`axisRatio`/
// `ellipsoidalGradMag`/`ringIsolineInk`) is GONE — `levelField.ts`/`sampleHeight` is the sole
// math source (no-backwards-compat; the swap SHIPPED).
//
// This gate machine-locks the device-free SOURCE shape per the WAVE-AMENDMENT §C L1-L6:
//   L1 — the field source is the SHARED level-set topography (sampleHeight reads heightField
//        over waveFlow on the shared waveField+curlFBM; no re-forked basis).
//   L2 — the ring engine is GONE everywhere (src + manifest + docstrings) — a re-introduced
//        ring/ellipsoid symbol REDs (the no-legacy fence).
//   L3 — contourInk is byte-frozen (WGSL↔GLSL identical body), FED a per-level width param.
//   L4 — the finishing layer is pure + OPAQUE (alpha=1; tanh tone; analytic hillshade at the
//        SHARED epsilon; KEPT samplePaletteLin; ONE color path — no rgb*ink transparent bleed,
//        no state buffer, no in-shader uMode color branch).
//   L5 — warm-DIVERGENT identity, no teal/navy, multi-bin (constants.ts WARM_IDENTITY_PALETTE).
//   L6 — transcription closes (sampleHeight + the finishing reads transcribe JS↔WGSL↔GLSL at
//        the SHARED HILLSHADE_EPSILON — the device-free transcription witness; the binding
//        numeric ΔE π rides tests-visual/concentric-relief.spec.ts).
// Plus the kept structural clauses: colocation, composes-substrate, fallback-declared, story.
//
// The binding live-π painted-pixel DELTA (VIVID/WARM-DIVERGENT/TRUE-level-sets/two-tier/relief/
// alive/cursor-heave/live-ground) rides tests-visual/concentric-relief.spec.ts (the cardinal
// device-free vs live-GPU split), NOT this device-free gate.
//
// SELF-TEST BITE (--selftest): a synthetic broken tree (a re-forked valueNoise; a re-introduced
// sampleRingField / "ellipsoid rings" manifest string; a re-derived contourInk; an rgb*ink
// transparent regression; a teal hue / single-bin amber wash in constants; a direct navigator.gpu
// call) MUST red — born-RED proof on a green HEAD.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/concentric");
const PARITY_TABLE = resolve(ROOT, "docs/tranches/BB/audit/gpu-parity-table.md");
const STORY = resolve(ROOT, "demo/stories/substrates/concentric.vue");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");

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
        "composables/levelField.ts",
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

// L1 — the field source is the SHARED level-set topography (no re-forked basis).
function clauseL1FieldSource(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["levelField"] ?? read(resolve(DIR, "composables/levelField.ts")),
    );
    // sampleHeight is the single math source, reading heightField over a waveFlow warp.
    if (!/export function sampleHeight/.test(js))
        viol.push("L1-field: levelField.ts lacks `sampleHeight` (the SINGLE level-set math source)");
    if (!/heightField\s*\(/.test(js))
        viol.push("L1-field: sampleHeight does not read `heightField(...)` (the shared topography evaluator)");
    if (!/waveFlow\s*\(/.test(js))
        viol.push("L1-field: sampleHeight does not warp through `waveFlow(...)` (the traveling-wave cell-warp)");
    // The shared basis: imports the waveField leaf + curlFBM, does NOT re-fork a second noise basis.
    if (!/from\s+["'][^"']*\/wave\/waveField["']/.test(js))
        viol.push("L1-field: levelField.ts does not import the SHARED `waveField` leaf (the single basis)");
    if (!/curlFBM/.test(js))
        viol.push("L1-field: levelField.ts does not spline the SHARED `curlFBM` (the paper-grid kinship)");
    return viol;
}

// L2 — the ring engine is GONE everywhere (src + manifest + docstrings). No-legacy fence.
const RING_SYMBOLS = [
    "sampleRingField",
    "buildRingFamily",
    "buildRingLadder",
    "ringField",
    "axisRatio",
    "ringIsolineInk",
    "ellipsoidalGradMag",
    "ellipsoidalRadiusRot",
    "ellipsoidalRadius",
];
function clauseL2RingGone(srcOverride) {
    const viol = [];
    const sources = {
        "levelField.ts": srcOverride?.["levelField"] ?? read(resolve(DIR, "composables/levelField.ts")),
        "useConcentric.ts": srcOverride?.["useConcentric"] ?? read(resolve(DIR, "composables/useConcentric.ts")),
        "constants.ts": srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
        "concentric.wgsl.ts": srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
        "concentric.glsl.ts": srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
        "README.md": srcOverride?.["readme"] ?? read(resolve(DIR, "README.md")),
        "Concentric.vue": srcOverride?.["Concentric.vue"] ?? read(resolve(DIR, "Concentric.vue")),
        "manifest.ts (concentric)": srcOverride?.["manifest"] ?? read(MANIFEST),
        "concentric.vue (story)": srcOverride?.["story"] ?? read(STORY),
    };
    // The manifest is the whole file; scope the ring-string census to the concentric entry +
    // the prose "ellipsoid rings" / "radial Fourier ring-interference" doc phrases.
    for (const [name, raw] of Object.entries(sources)) {
        if (raw == null) continue;
        const body = name.startsWith("manifest")
            ? // narrow to the concentric s(...) entry region to avoid foreign matches
              (raw.match(/W-CONCENTRIC[\s\S]{0,1400}?\/concentric\.["']/) ?? [raw])[0]
            : raw;
        for (const sym of RING_SYMBOLS) {
            // the prose `axisRatio`/`ellipsoidalRadius` etc. are CODE symbols — match the bare word
            const re = new RegExp(`\\b${sym}\\b`);
            if (re.test(body))
                viol.push(`L2-no-legacy: the retired ring symbol \`${sym}\` survives in ${name} (the ring engine is GONE — no-backwards-compat)`);
        }
        // the stale doc phrases
        if (/radial Fourier ring-interference|ellipsoid rings|ring-interference field/i.test(body))
            viol.push(`L2-no-legacy: the stale ring-interference prose survives in ${name} (the level-set de-stale is incomplete)`);
    }
    return viol;
}

// L3 — contourInk is byte-frozen (WGSL↔GLSL identical body), FED a per-level width param.
function clauseL3ContourFrozen(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    // Both shaders carry a contourInk(fN, hw) that is FED a width param (not re-derived).
    const wHas = /fn contourInk\(\s*fN:\s*f32,\s*hw:\s*f32\s*\)/.test(wgsl);
    const gHas = /float contourInk\(\s*float fN,\s*float hw\s*\)/.test(glsl);
    if (!wHas)
        viol.push("L3-contour: concentric.wgsl.ts lacks `contourInk(fN, hw)` (the byte-frozen IQ contour DE, FED a width param)");
    if (!gHas)
        viol.push("L3-contour: concentric.glsl.ts lacks `contourInk(fN, hw)` (the byte-frozen IQ contour DE, FED a width param)");
    // The frozen body: band = |fract(fN+0.5)−0.5|; aaW = max(fwidth(fN), 6e-4); 1−smoothstep(hw,…,band/aaW).
    const frozenBody = (src) =>
        /abs\(\s*fract\(\s*fN\s*\+\s*0\.5\s*\)\s*-\s*0\.5\s*\)/.test(src) &&
        /max\(\s*fwidth\(\s*fN\s*\)\s*,\s*6e-4\s*\)/.test(src) &&
        /1\.0\s*-\s*smoothstepEdge\(\s*hw\s*,\s*hw\s*\+/.test(src);
    if (wHas && !frozenBody(wgsl))
        viol.push("L3-contour: concentric.wgsl.ts contourInk body drifted from the byte-frozen IQ form (band/aaW/1−smoothstep(hw,…))");
    if (gHas && !frozenBody(glsl))
        viol.push("L3-contour: concentric.glsl.ts contourInk body drifted from the byte-frozen IQ form (band/aaW/1−smoothstep(hw,…))");
    return viol;
}

// L4 — the finishing layer is pure + OPAQUE (alpha=1; tanh tone; hillshade at shared e; ONE color path).
function clauseL4PureOpaque(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    for (const [name, src, alphaRe] of [
        ["concentric.wgsl.ts", wgsl, /vec4<f32>\([^;]*,\s*1\.0\s*\)\s*;?\s*\}?\s*`?\s*$/m],
        ["concentric.glsl.ts", glsl, /fragColor\s*=\s*vec4\([^;]*,\s*1\.0\s*\)\s*;/],
    ]) {
        // OPAQUE out: the final fragment returns alpha = 1.0 (NOT rgb*ink over transparent).
        const opaque = name.endsWith("wgsl.ts")
            ? /return\s+vec4<f32>\([^;]*,\s*1\.0\s*\)\s*;/.test(src)
            : /fragColor\s*=\s*vec4\([^;]*,\s*1\.0\s*\)\s*;/.test(src);
        if (!opaque)
            viol.push(`L4-opaque: ${name} does not return alpha = 1.0 (the opaque hypsometric fill — a lines-over-transparent regression)`);
        void alphaRe;
        // tanh hypsometric tone.
        if (!/0\.5\s*\+\s*0\.5\s*\*\s*tanh\(/.test(src))
            viol.push(`L4-tone: ${name} lacks the `+ "`0.5 + 0.5*tanh(H·toneGain)` hypsometric tone (the lumVar-flat root-fix)");
        // analytic hillshade at the SHARED epsilon constant (0.012).
        if (!/HILLSHADE_E/.test(src))
            viol.push(`L4-hillshade: ${name} does not consume the SHARED HILLSHADE_E epsilon (the ∇H finite-diff parity)`);
        // ONE color path: the KEPT samplePaletteLin, no in-shader per-mode uMode color branch.
        if (!/samplePaletteLin\(/.test(src))
            viol.push(`L4-color: ${name} does not compose the KEPT `+ "`samplePaletteLin` (the ONE color path)");
        if (/\buMode\b|u\.mode\b/.test(src))
            viol.push(`L4-color: ${name} carries an in-shader uMode color branch — per-mode must resolve in the CONSUMED stops (no second color seam)`);
        // ANTI-EVASION: the old rgb*ink transparent bleed must NOT survive (alpha riding ink).
        // (`mix(fill, inkCol, ink)` — ink as a COLOR-mix factor — is the legit path; only ink as
        // the OUTPUT alpha reds.)
        if (/alpha\s*=\s*ink\b/.test(src) || /(?:vec4<f32>|vec4)\(\s*rgb\s*\*\s*ink/.test(src))
            viol.push(`L4-opaque: ${name} still rides `+ "`alpha = ink` (the transparent lines-over-nothing bleed — the lumVar 0.0005 defect)");
    }
    return viol;
}

// L5 — warm-DIVERGENT identity, no teal/navy, multi-bin.
function clauseL5WarmDivergent(srcOverride) {
    const viol = [];
    const consts = stripComments(
        srcOverride?.["constants"] ?? read(resolve(DIR, "constants.ts")),
    );
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("L5-warm: constants.ts does not declare WARM_IDENTITY_PALETTE");
    // No cool/themed hue ∈ [180,270] anywhere in the LIBRARY constants.
    const hues = [];
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        hues.push(h);
        if (h >= 180 && h <= 270)
            viol.push(`L5-warm: a cool/teal-navy hue (h=${h}) in the LIBRARY constants.ts — the warm-divergent identity must not carry [180,270]`);
    }
    // The default WARM_IDENTITY_PALETTE must be MULTI-BIN warm (a single-bin amber wash REDs —
    // the hue-SPREAD floor). Isolate the WARM_IDENTITY_PALETTE block + count distinct ~30° bins.
    const palBlock = (consts.match(/WARM_IDENTITY_PALETTE\s*:\s*OklchStop\[\]\s*=\s*\[([\s\S]*?)\]/) ?? [, ""])[1];
    const palHues = [];
    let pm;
    const pr = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    while ((pm = pr.exec(palBlock))) palHues.push(Number(pm[1]));
    const bins = new Set(palHues.map((h) => Math.floor(((h % 360) + 360) % 360 / 30)));
    if (palHues.length > 0 && bins.size < 2)
        viol.push(`L5-warm: WARM_IDENTITY_PALETTE collapses to a single hue bin (${[...bins]}) — a monochrome-amber wash reds (the warm-DIVERGENT spread floor)`);
    return viol;
}

// L6 — transcription closes: sampleHeight + the finishing reads transcribe JS↔WGSL↔GLSL at the
// SHARED epsilon (the device-free transcription witness; the binding numeric ΔE π rides the spec).
function clauseL6Transcription(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["levelField"] ?? read(resolve(DIR, "composables/levelField.ts")),
    );
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    const tokens = [
        ["sampleHeight in JS", () => /function sampleHeight/.test(js)],
        ["sampleHeight in WGSL", () => /fn sampleHeight/.test(wgsl)],
        ["sampleHeight in GLSL", () => /float sampleHeight/.test(glsl)],
        ["valueNoise in JS", () => /function valueNoise/.test(js)],
        ["valueNoise in WGSL", () => /fn valueNoise/.test(wgsl)],
        ["valueNoise in GLSL", () => /float valueNoise/.test(glsl)],
        ["the SHARED hillshade epsilon in JS", () => /HILLSHADE_EPSILON\s*=\s*0\.012/.test(js)],
        ["the SHARED hillshade epsilon in WGSL", () => /HILLSHADE_E\s*:\s*f32\s*=\s*0\.012/.test(wgsl)],
        ["the SHARED hillshade epsilon in GLSL", () => /HILLSHADE_E\s*=\s*0\.012/.test(glsl)],
        ["the tanh hypsometric tone in WGSL", () => /0\.5\s*\+\s*0\.5\s*\*\s*tanh\(/.test(wgsl)],
        ["the tanh hypsometric tone in GLSL", () => /0\.5\s*\+\s*0\.5\s*\*\s*tanh\(/.test(glsl)],
    ];
    for (const [label, fn] of tokens) {
        if (!fn())
            viol.push(`L6-transcription: ${label} — sampleHeight + the finishing reads must round-trip JS↔WGSL↔GLSL (the single source; the binding ΔE rides concentric-relief.spec.ts)`);
    }
    return viol;
}

function clauseFallback(srcOverride) {
    const viol = [];
    // The fallback path exists.
    if (!existsSync(resolve(DIR, "shaders/concentric.glsl.ts")))
        viol.push("fallback: shaders/concentric.glsl.ts (the WebGL2 GLSL fallback) is missing");
    // The parity table declares the concentric row verified (or degraded), resolving on disk.
    const table = srcOverride?.["parity"] ?? read(PARITY_TABLE);
    const mm = (table ?? "").match(/```json\s*([\s\S]*?)```/);
    if (!mm) {
        viol.push("fallback: the parity table has no machine-read JSON block");
    } else {
        let parsed = null;
        try {
            parsed = JSON.parse(mm[1]);
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
    // The demo LEADS warm (useTheme = ref(false)); the teal-on-navy is a non-default named preset.
    const sb = stripComments(srcOverride?.["storySrc"] ?? story);
    if (/useTheme\s*=\s*ref\(\s*true\s*\)/.test(sb))
        viol.push("story: concentric.vue defaults useTheme to TRUE (the teal-on-navy preset) — the warm identity must lead");
    return viol;
}

function runAll(overrides = {}) {
    return [
        ...clauseColocation(overrides.colocation ?? {}),
        ...clauseComposesSubstrate(overrides.composes),
        ...clauseL1FieldSource(overrides.l1),
        ...clauseL2RingGone(overrides.l2),
        ...clauseL3ContourFrozen(overrides.l3),
        ...clauseL4PureOpaque(overrides.l4),
        ...clauseL5WarmDivergent(overrides.l5),
        ...clauseL6Transcription(overrides.l6),
        ...clauseFallback(overrides.fallback),
        ...clauseStory(overrides.story),
    ];
}

// ── Self-test bite: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) L1 — a re-forked basis (no waveFlow / no shared waveField import).
    const reforked = runAll({
        l1: { levelField: "export function sampleHeight(){ return heightField(); }\n// no waveFlow, no waveField import, no curlFBM" },
    });
    if (reforked.length === 0) fails.push("self-test: a re-forked basis (no waveFlow/waveField) did NOT red");
    // (b) L2 — a re-introduced sampleRingField in the levelField source.
    const ringBack = runAll({
        l2: { levelField: "export function sampleRingField(){}\nexport function sampleHeight(){}" },
    });
    if (ringBack.length === 0) fails.push("self-test: a re-introduced sampleRingField did NOT red");
    // (b2) L2 — a re-smuggled "ellipsoid rings" manifest prose.
    const ringProse = runAll({
        l2: { manifest: 'W-CONCENTRIC\n s("substrates","concentric","Concentric","A radial Fourier ring-interference field — concentric ellipsoid rings. /concentric."' },
    });
    if (ringProse.length === 0) fails.push("self-test: a re-smuggled 'ellipsoid rings' manifest prose did NOT red");
    // (c) L3 — a re-derived contourInk (drifted body).
    const reDerived = runAll({
        l3: {
            wgsl: "fn contourInk(fN: f32, hw: f32) -> f32 { return length(vec2(dpdx(fN), dpdy(fN))); }",
            glsl: "float contourInk(float fN, float hw) { return length(vec2(dFdx(fN), dFdy(fN))); }",
        },
    });
    if (reDerived.length === 0) fails.push("self-test: a re-derived contourInk did NOT red");
    // (d) L4 — an rgb*ink transparent regression (alpha = ink).
    const transp = runAll({
        l4: {
            wgsl: "let tone = 0.5 + 0.5 * tanh(H); let col = samplePaletteLin(tone) * HILLSHADE_E; let alpha = ink; return vec4<f32>(col, alpha);",
            glsl: "float tone = 0.5 + 0.5 * tanh(H); vec3 col = samplePaletteLin(tone) * HILLSHADE_E; float alpha = ink; fragColor = vec4(col, alpha);",
        },
    });
    if (transp.length === 0) fails.push("self-test: an rgb*ink transparent regression (alpha = ink) did NOT red");
    // (d2) L4 — an in-shader uMode color branch.
    const uMode = runAll({
        l4: {
            wgsl: "let tone = 0.5 + 0.5 * tanh(H); var col = samplePaletteLin(tone); if (uMode > 0.5) { col = col; } let e = HILLSHADE_E; return vec4<f32>(col, 1.0);",
            glsl: "float tone = 0.5 + 0.5 * tanh(H); vec3 col = samplePaletteLin(tone); if (uMode > 0.5) { col = col; } float e = HILLSHADE_E; fragColor = vec4(col, 1.0);",
        },
    });
    if (uMode.length === 0) fails.push("self-test: an in-shader uMode color branch did NOT red");
    // (e) L5 — a teal hue in constants.
    const teal = runAll({
        l5: { constants: "WARM_IDENTITY_PALETTE: OklchStop[] = [ { L: 0.5, C: 0.12, h: 210 } ];" },
    });
    if (teal.length === 0) fails.push("self-test: a teal hue (h=210) in constants did NOT red");
    // (e2) L5 — a single-bin amber wash (all hues in one ~30° bin).
    const monoAmber = runAll({
        l5: { constants: "WARM_IDENTITY_PALETTE: OklchStop[] = [ { L: 0.4, C: 0.1, h: 60 }, { L: 0.6, C: 0.12, h: 62 }, { L: 0.8, C: 0.1, h: 65 } ];" },
    });
    if (monoAmber.length === 0) fails.push("self-test: a single-bin amber wash did NOT red");
    // (f) a direct navigator.gpu call in the composable.
    const directGpu = runAll({
        composes: {
            "Concentric.vue": "useGpuSubstrate",
            useConcentric: "navigator.gpu.requestAdapter(); useGpuSubstrate",
        },
    });
    if (directGpu.length === 0) fails.push("self-test: a direct navigator.gpu.requestAdapter did NOT red");
    // (g) a missing story.
    const noStory = runAll({ story: { story: false } });
    if (noStory.length === 0) fails.push("self-test: a missing story did NOT red");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:concentric",
        wave: "BD.W-CONCENTRIC-RELIEF",
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
        console.log("proof:concentric — GREEN (L1-L6 level-set + finishing-layer + colocation/composes/fallback/story)");
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
