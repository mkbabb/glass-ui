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

// L3 — contourInk is byte-frozen (WGSL↔GLSL identical body), FED the per-level width AND the
//      per-fragment AA-width `aaW` (both PARAMETERS). The helper is DERIVATIVE-FREE: the
//      `fwidth(fN)` derivative is hoisted to fs_main's uniform control flow (the ONE site, L7-P1)
//      — a fragment-derivative builtin INSIDE a helper fn is a WebKit/Metal (WebGL2 + WebGPU)
//      codegen hazard the F9.R3 paint-fix removes ("derivative-FREE → Safari-safe", the discipline
//      waveField's faceRelief already codifies).
function clauseL3ContourFrozen(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    // Both shaders carry a contourInk(fN, hw, aaW) — FED the AA width (not a helper re-derivation).
    const wSig = /fn contourInk\(\s*fN:\s*f32,\s*hw:\s*f32,\s*aaW:\s*f32\s*\)/;
    const gSig = /float contourInk\(\s*float fN,\s*float hw,\s*float aaW\s*\)/;
    const wHas = wSig.test(wgsl);
    const gHas = gSig.test(glsl);
    if (!wHas)
        viol.push("L3-contour: concentric.wgsl.ts lacks `contourInk(fN, hw, aaW)` (the byte-frozen IQ contour DE, FED the AA width — no derivative in the helper)");
    if (!gHas)
        viol.push("L3-contour: concentric.glsl.ts lacks `contourInk(fN, hw, aaW)` (the byte-frozen IQ contour DE, FED the AA width — no derivative in the helper)");
    // Extract the contourInk fn body (single-statement, no nested braces).
    const bodyOf = (src, sig) => {
        const m = src.match(new RegExp(sig.source + "[^{]*\\{([\\s\\S]*?)\\}"));
        return m ? m[1] : null;
    };
    // The frozen body: band = |fract(fN+0.5)−0.5|; 1−smoothstep(hw,…, band/aaW). aaW is the PARAM.
    const frozenBody = (body) =>
        body != null &&
        /abs\(\s*fract\(\s*fN\s*\+\s*0\.5\s*\)\s*-\s*0\.5\s*\)/.test(body) &&
        /1\.0\s*-\s*smoothstepEdge\(\s*hw\s*,\s*hw\s*\+/.test(body) &&
        /band\s*\/\s*aaW/.test(body);
    // Derivative-FREE helper: the contourInk body carries NO fragment-derivative builtin.
    const derivFree = (body) =>
        body != null && !/\b(fwidth|dFdx|dFdy|dpdx|dpdy)\b/.test(body);
    const wBody = wHas ? bodyOf(wgsl, wSig) : null;
    const gBody = gHas ? bodyOf(glsl, gSig) : null;
    if (wHas && !frozenBody(wBody))
        viol.push("L3-contour: concentric.wgsl.ts contourInk body drifted from the byte-frozen IQ form (band = |fract(fN+0.5)−0.5|, 1−smoothstep(hw,…, band/aaW))");
    if (gHas && !frozenBody(gBody))
        viol.push("L3-contour: concentric.glsl.ts contourInk body drifted from the byte-frozen IQ form (band = |fract(fN+0.5)−0.5|, 1−smoothstep(hw,…, band/aaW))");
    if (wHas && !derivFree(wBody))
        viol.push("L3-contour: concentric.wgsl.ts contourInk calls a fragment-derivative builtin (fwidth) INSIDE the helper — the WebKit/Metal-WebGPU codegen hazard; hoist it to fs_main's uniform control flow and FEED aaW");
    if (gHas && !derivFree(gBody))
        viol.push("L3-contour: concentric.glsl.ts contourInk calls a fragment-derivative builtin (fwidth) INSIDE the helper — the WebKit/Metal codegen hazard; hoist it to fs_main and FEED aaW");
    return viol;
}

// L7 (F9.R3 WebKit-paint-fix) — the WebKit/Metal-WebGPU portability floor. The concentric GLSL/
//     GL2 fallback is EMPIRICALLY correct on WebKit (it renders an OPAQUE structured field —
//     verified via a real WebKit WebGL2 readback, so the LC5 exp/NaN premise was FALSE), so the
//     silent blank the paint judge saw is confined to the WebGPU PRIMARY (Safari 26 WebGPU, the
//     path untestable in a WebGPU-adapter-less CI). This clause removes the two Metal-codegen
//     hazards that yield a validates-but-degenerate WGSL pipeline (the blank slips PAST the
//     substrate's validation-probe fallback): (P1) the fwidth(fN) derivative lives at exactly ONE
//     fs_main site (hoisted out of the helper; L3 owns the derivative-free helper), and (P2) NO
//     dynamic uniform-array indexing of the palette — a static-index unroll.
function clauseWebkitPortability(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    for (const [name, src] of [
        ["concentric.wgsl.ts", wgsl],
        ["concentric.glsl.ts", glsl],
    ]) {
        // P1 — exactly ONE fwidth(fN) site, the fs_main hoist `aaW = max(fwidth(fN), 6e-4)`.
        const fwCount = (src.match(/fwidth\s*\(\s*fN\s*\)/g) || []).length;
        const hasHoist = /aaW\s*=\s*max\(\s*fwidth\(\s*fN\s*\)\s*,\s*6e-4\s*\)/.test(src);
        if (fwCount !== 1)
            viol.push(`P1-fwidth: ${name} has ${fwCount} fwidth(fN) sites (must be exactly ONE — the fs_main hoist; a helper-derivative + a second site is the WebKit/Metal codegen hazard)`);
        if (!hasHoist)
            viol.push(`P1-fwidth: ${name} lacks the single fs_main derivative hoist \`aaW = max(fwidth(fN), 6e-4)\` (uniform control flow)`);
        // P2 — no dynamic uniform-array palette indexing (a WebKit/Metal argument-buffer hazard).
        //      A CONSTANT index (uPalette[0], u.palette[3]) is fine; a variable index reds. Strip
        //      the GLSL array DECLARATION (`uniform vec3 uPalette[MAX_RING_STOPS];`) first — its
        //      bracket carries the size token, not an index read.
        const body = src.replace(/uniform\s+\w+\s+uPalette\s*\[[^\]]*\]\s*;/g, "");
        const dyn = name.endsWith("glsl.ts")
            ? /uPalette\s*\[\s*(?!\d+\s*\])/.test(body)
            : /u\.palette\s*\[\s*(?!\d+\s*\])/.test(body);
        if (dyn)
            viol.push(`P2-palette: ${name} indexes the palette uniform-array with a DYNAMIC (non-constant) index — a WebKit/Metal-WebGPU argument-buffer codegen hazard; use the static-index unroll (paletteStop/paletteStopLin)`);
    }
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

// ── LEVELCURVE arm (BG.W-CONCENTRIC-LEVELCURVES) — the "very buggy" repair: smooth nested
//    level curves + a continuous critically-damped pointer heave + anti-artifact contours. It
//    EXTENDS L1-L6 in place (the extraction stays the IQ contourInk over the ONE sampleHeight).
//      LC1 — the pointer heave is CONTINUOUS: a critically-damped engage/release envelope
//            (no first-frame snap on enter, no pop on leave) GATING the cursor-well depth.
//      LC2 — the velocity-scaled heave is BOUNDED (a flick/large knob cannot blow the well out).
//      LC3 — anti-artifact: the contour-index `fN` fed to contourInk is a CONTINUOUS function
//            of H in BOTH shaders (a floor()-of-the-field inside fN tears the contour + explodes
//            fwidth(fN) at each band edge — the torn/stair-stepped arcs), reading the ONE H (no
//            second field sampler).
function clauseLevelCurves(srcOverride) {
    const viol = [];
    const use = stripComments(
        srcOverride?.["useConcentric"] ?? read(resolve(DIR, "composables/useConcentric.ts")),
    );
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );

    // LC1 — the CONTINUOUS pointer-heave engage/release envelope.
    const hasEngage = /wellEngage/.test(use);
    if (!hasEngage)
        viol.push("LC1-heave: useConcentric.ts declares no `wellEngage` engage/release envelope (the snap-on-enter/pop-on-leave fix — the heave must grow in + settle out with weight)");
    // Frame-rate-independent critical damping: `wellEngage += … (1 - Math.exp(-deltaMs/…))`, NOT
    // a bare `wellEngage = active ? 1 : 0` snap.
    const frameRateIndep =
        /wellEngage\s*\+=/.test(use) && /1\s*-\s*Math\.exp\(\s*-\s*deltaMs/.test(use);
    if (hasEngage && !frameRateIndep)
        viol.push("LC1-heave: the engage envelope is not critically-damped/frame-rate-independent (needs `wellEngage += (target - wellEngage) * (1 - Math.exp(-deltaMs/TAU))` — a bare `= active ? 1 : 0` snap IS the pop)");
    // The envelope GATES the effective well depth (getWellScale multiplies it in).
    if (hasEngage && !/wellScale\s*\*\s*wellEngage/.test(use))
        viol.push("LC1-heave: the well factor (getWellScale) does not multiply `wellEngage` — the envelope must gate the cursor-well depth or the heave still snaps/pops");

    // LC2 — the velocity-scaled heave is BOUNDED.
    if (!(/WELL_SCALE_MAX/.test(use) && /Math\.min\(/.test(use)))
        viol.push("LC2-bound: the velocity-heave `wellScale` is not bounded (needs `Math.min(1 + …, WELL_SCALE_MAX)` — an unbounded burst/consumer `velocityHeave` knob blows the well out)");

    // LC3 — anti-artifact: the contour-index fN is a CONTINUOUS f(H) in BOTH shaders.
    const fieldCall = /(?:sampleHeight|heightField|valueNoise)\s*\(/;
    for (const [name, src, re] of [
        ["concentric.glsl.ts", glsl, /float\s+fN\s*=\s*([^;]*);/],
        ["concentric.wgsl.ts", wgsl, /let\s+fN\s*=\s*([^;]*);/],
    ]) {
        const m = (src ?? "").match(re);
        if (!m) {
            viol.push(`LC3-artifact: ${name} has no contour-index \`fN = …\` assignment (the two-tier level index fed to contourInk)`);
            continue;
        }
        const rhs = m[1];
        if (/floor\s*\(/.test(rhs))
            viol.push(`LC3-artifact: ${name} contour-index fN carries a floor() discontinuity (\`${rhs.trim()}\`) — it tears the contour + explodes fwidth(fN) at each band edge (the torn/stair-stepped arcs); the per-contour wobble must be a CONTINUOUS f(H)`);
        if (fieldCall.test(rhs))
            viol.push(`LC3-artifact: ${name} contour-index fN re-samples the field (a second field sampler) instead of reading the already-computed H — the ONE sampleHeight source only`);
        if (!/\bH\b/.test(rhs))
            viol.push(`LC3-artifact: ${name} contour-index fN does not read the sampled height H (the level index must be H·levels + a continuous wobble)`);
    }
    return viol;
}

// ── LEVELCURVE REPAIR arm (BG.W-CONCENTRIC-LEVELCURVES paint-fix) — the two dual-engine paint
//    defects the re-judge named, machine-locked so neither can regress:
//      LC4 — the DENSITY FADE (the "contours render DASHED/broken" fix). Where the level lines
//            pack so tight that a line's own half-width (hw·fwidth(fN)) approaches the 0.5
//            half-spacing, the IQ AA band FLOODS (band/aaW < hw everywhere → ink saturates → the
//            contours merge into a wash whose bright gaps read as DASHES). Both shaders fade the
//            stroke out across that limit (hw-aware, keyed off the SAME fwidth(fN) contourInk
//            floors on) — the resolvable contours stay CONTINUOUS unbroken bands. contourInk
//            itself stays byte-frozen (L3); the fade is a main()-level ink multiply.
//      LC5 — the EXP CLAMP + BOUNDED PARKED CURSOR (the "concentric renders BLANK in WebKit" fix).
//            A parked/far cursor fed an EXTREME −d2/σ into the heave/swirl exp(); on WebKit/Metal
//            fast-math that overflows the int32 range-reduction → NaN → the whole field NaNs → the
//            SILENT blank. Both shaders clamp the heave exp argument, and the JS parked-cursor
//            sentinel is BOUNDED (not 1e6) so the SHARED cursorSwirl exp (off-limits to edit) also
//            stays int32-safe.
function clauseLevelCurvesRepair(srcOverride) {
    const viol = [];
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/concentric.wgsl.ts")),
    );
    const glsl = stripComments(
        srcOverride?.["glsl"] ?? read(resolve(DIR, "shaders/concentric.glsl.ts")),
    );
    const use = stripComments(
        srcOverride?.["useConcentric"] ?? read(resolve(DIR, "composables/useConcentric.ts")),
    );

    // LC4 — the density fade in BOTH shaders (the anti-flood / anti-dash multiply on the ink).
    for (const [name, src] of [
        ["concentric.wgsl.ts", wgsl],
        ["concentric.glsl.ts", glsl],
    ]) {
        const hasFade = /\bdfade\b/.test(src);
        // Reads the HOISTED single-site aaW (= max(fwidth(fN), 6e-4)) — the fs_main derivative,
        // NOT a second fwidth (L7-P1: one derivative, two readers — the contourInk stroke + this).
        const readsAaW = /hwAA\s*=\s*hw\s*\*\s*aaW\b/.test(src);
        const fadeIsSmoothstep = /dfade\s*=\s*1\.0\s*-\s*smoothstepEdge\([^;]*hwAA\s*\)/.test(src);
        const inkMultiplies = /contourInk\(\s*fN\s*,\s*hw\s*,\s*aaW\s*\)[^;]*\*\s*dfade/.test(src);
        if (!hasFade)
            viol.push(`LC4-dfade: ${name} carries no density-fade (\`dfade\`) — the over-dense contour FLOOD (band/aaW saturates → ink=1 → the bright-gap DASHING) is unbounded (the paint-re-judge dashed-contour defect)`);
        if (hasFade && !readsAaW)
            viol.push(`LC4-dfade: ${name} density fade is not the hw-aware IQ frequency limit (needs \`hwAA = hw * aaW\` reusing the hoisted single-site fwidth — the flood point is when the line half-width reaches the 0.5 half-spacing; a second \`fwidth\` here reds L7-P1)`);
        if (hasFade && !fadeIsSmoothstep)
            viol.push(`LC4-dfade: ${name} density fade is not a smoothstep on \`hwAA\` (needs \`dfade = 1.0 - smoothstepEdge(a, b, hwAA)\`)`);
        if (hasFade && !inkMultiplies)
            viol.push(`LC4-dfade: ${name} does not MULTIPLY contourInk(fN, hw, aaW) by \`dfade\` (the fade must gate the ink or the flood-dash survives)`);
    }

    // LC5 — the heave exp is CLAMPED in BOTH shaders (no EXTREME argument reaches fast-math exp).
    for (const [name, src] of [
        ["concentric.wgsl.ts", wgsl],
        ["concentric.glsl.ts", glsl],
    ]) {
        const clampedG0 = /exp\(\s*-\s*min\(\s*d2\s*\/\s*0\.22\s*,/.test(src);
        const clampedFall = /exp\(\s*-\s*min\(\s*d2\s*\/\s*0\.6\s*,/.test(src);
        // the anti-regression: a BARE unclamped extreme heave exp must NOT survive.
        const bareG0 = /exp\(\s*-\s*d2\s*\/\s*0\.22\s*\)/.test(src);
        if (!clampedG0 || !clampedFall)
            viol.push(`LC5-expclamp: ${name} heave exp() is not argument-clamped (needs \`exp(-min(d2/σ, 60.0))\` on BOTH the g0 + fall terms — an extreme −d2/σ NaNs WebKit/Metal fast-math exp → the SILENT blank)`);
        if (bareG0)
            viol.push(`LC5-expclamp: ${name} still carries a BARE unclamped \`exp(-d2 / 0.22)\` heave — an extreme parked/far cursor overflows the exp int32 range-reduction → NaN → blank`);
    }

    // LC5 — the parked-cursor sentinel is BOUNDED (protects the SHARED cursorSwirl exp too).
    const hasParked = /CURSOR_PARKED\s*:/.test(use);
    if (!hasParked)
        viol.push("LC5-cursor: useConcentric.ts declares no CURSOR_PARKED sentinel");
    const pm = use.match(/CURSOR_PARKED\s*:\s*Vec2\s*=\s*\{\s*x:\s*([0-9.eE+]+)/);
    if (hasParked && pm) {
        const val = Number(pm[1]);
        if (!(val < 1e5))
            viol.push(`LC5-cursor: CURSOR_PARKED x=${pm[1]} is an EXTREME sentinel — it flows into the SHARED cursorSwirl exp(-d2/(2r²)) (off-limits to clamp) and NaNs WebKit/Metal fast-math; keep it bounded (< 1e5, the Gaussian is already 0 there)`);
    } else if (hasParked && !pm) {
        viol.push("LC5-cursor: CURSOR_PARKED shape not the expected `{ x: <n>, y: <n> }` bounded sentinel");
    }
    return viol;
}

function runAll(overrides = {}) {
    return [
        ...clauseColocation(overrides.colocation ?? {}),
        ...clauseComposesSubstrate(overrides.composes),
        ...clauseL1FieldSource(overrides.l1),
        ...clauseL2RingGone(overrides.l2),
        ...clauseL3ContourFrozen(overrides.l3),
        ...clauseWebkitPortability(overrides.wk),
        ...clauseL4PureOpaque(overrides.l4),
        ...clauseL5WarmDivergent(overrides.l5),
        ...clauseL6Transcription(overrides.l6),
        ...clauseLevelCurves(overrides.lc),
        ...clauseLevelCurvesRepair(overrides.lcr),
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
    // (c) L3 — a re-derived contourInk (a fragment-derivative builtin INSIDE the helper).
    const reDerived = runAll({
        l3: {
            wgsl: "fn contourInk(fN: f32, hw: f32, aaW: f32) -> f32 { return length(vec2f(dpdx(fN), dpdy(fN))); }",
            glsl: "float contourInk(float fN, float hw, float aaW) { return length(vec2(dFdx(fN), dFdy(fN))); }",
        },
    });
    if (reDerived.length === 0) fails.push("self-test: a re-derived (derivative-in-helper) contourInk did NOT red");
    // (c2) L3 — a re-introduced fwidth() INSIDE the contourInk helper MUST red (the derivative-
    //      free-helper regression the F9.R3 WebKit paint-fix removes — the exact hazard shape).
    const helperDeriv = runAll({
        l3: {
            wgsl: "fn contourInk(fN: f32, hw: f32, aaW: f32) -> f32 { let band = abs(fract(fN + 0.5) - 0.5); let w = max(fwidth(fN), 6e-4); return 1.0 - smoothstepEdge(hw, hw + u.line.y, band / w); }",
            glsl: "float contourInk(float fN, float hw, float aaW) { float band = abs(fract(fN + 0.5) - 0.5); float w = max(fwidth(fN), 6e-4); return 1.0 - smoothstepEdge(hw, hw + uLine.y, band / w); }",
        },
    });
    if (helperDeriv.length === 0) fails.push("self-test: a re-introduced fwidth() INSIDE the contourInk helper did NOT red");
    // (c3) L7-P2 — a DYNAMIC uniform-array palette index MUST red (the WebKit/Metal-WebGPU
    //      argument-buffer hazard the static-index unroll removes). Carries the fs_main hoist so
    //      ONLY P2 fires.
    const dynPalette = runAll({
        wk: {
            wgsl: "let aaW = max(fwidth(fN), 6e-4); let stop = u.palette[i0].rgb;",
            glsl: "float aaW = max(fwidth(fN), 6e-4); vec3 stop = uPalette[i0];",
        },
    });
    if (dynPalette.length === 0) fails.push("self-test: a dynamic uniform-array palette index did NOT red");
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

    // ── LEVELCURVE arm bites (BG.W-CONCENTRIC-LEVELCURVES) ──
    // (lc-a) LC1 — a planted snap-on-enter (the engage envelope present but NOT critically-damped:
    //        `wellEngage = active ? 1 : 0` instead of the frame-rate-independent exp step).
    const snapOnEnter = runAll({
        lc: {
            useConcentric:
                "const WELL_SCALE_MAX = 2.2; let wellScale = 1; let wellEngage = 0; " +
                "function onFrame(){ wellEngage = pointer.active.value ? 1 : 0; wellScale = Math.min(1, WELL_SCALE_MAX); } " +
                "const getWellScale = () => wellScale * wellEngage;",
        },
    });
    if (snapOnEnter.length === 0) fails.push("self-test: a planted snap-on-enter (non-damped engage) did NOT red");
    // (lc-b) LC3 — a planted un-AA'd/torn band: the floor()-of-the-field discontinuity in fN.
    const floorBand = runAll({
        lc: {
            glsl: "float fN = H * levels + uTopo.w * sin(floor(H * levels) * 2.4 + t * 0.7);",
            wgsl: "let fN = H * levels + u.topo.w * sin(floor(H * levels) * 2.4 + t * 0.7);",
        },
    });
    if (floorBand.length === 0) fails.push("self-test: a planted floor()-discontinuity contour band did NOT red");
    // (lc-c) LC3 — a planted second field sampler in the contour index (fN re-samples the field).
    const secondField = runAll({
        lc: {
            glsl: "float fN = sampleHeight(p, t) * levels;",
            wgsl: "let fN = sampleHeight(p, t) * levels;",
        },
    });
    if (secondField.length === 0) fails.push("self-test: a planted second field sampler in fN did NOT red");
    // (lc-d) LC2 — a planted unbounded velocity heave (no Math.min/WELL_SCALE_MAX clamp).
    const unbounded = runAll({
        lc: {
            useConcentric:
                "let wellScale = 1; let wellEngage = 0; " +
                "function onFrame(deltaMs){ wellEngage += (1 - wellEngage) * (1 - Math.exp(-deltaMs / 150)); wellScale = 1 + velocityHeave * ramp; } " +
                "const getWellScale = () => wellScale * wellEngage;",
        },
    });
    if (unbounded.length === 0) fails.push("self-test: a planted unbounded velocity heave did NOT red");

    // ── LEVELCURVE REPAIR arm bites (BG.W-CONCENTRIC-LEVELCURVES paint-fix) ──
    // (lcr-a) LC4 — an un-faded ink (contourInk WITHOUT the density-fade multiply) MUST red
    //         (the over-dense contour FLOOD → dashing regression).
    const unfaded = runAll({
        lcr: {
            wgsl: "let ink = clamp(contourInk(fN, hw, aaW), 0.0, 1.0); let g0 = exp(-min(d2 / 0.22, 60.0)); let fall = exp(-min(d2 / 0.6, 60.0));",
            glsl: "float ink = clamp(contourInk(fN, hw, aaW), 0.0, 1.0); float g0 = exp(-min(d2 / 0.22, 60.0)); float fall = exp(-min(d2 / 0.6, 60.0));",
        },
    });
    if (unfaded.length === 0) fails.push("self-test: a planted un-faded ink (no density-fade multiply) did NOT red");
    // (lcr-b) LC5 — a BARE unclamped extreme heave exp MUST red (the WebKit/Metal NaN → blank
    //         regression). The string carries the full density-fade machinery (the hoisted aaW)
    //         so ONLY LC5 fires.
    const bareExp = runAll({
        lcr: {
            wgsl: "let aaW = max(fwidth(fN), 6e-4); let hwAA = hw * aaW; let dfade = 1.0 - smoothstepEdge(0.30, 0.48, hwAA); let ink = clamp(contourInk(fN, hw, aaW), 0.0, 1.0) * dfade; let g0 = exp(-d2 / 0.22); let fall = smoothstepEdge(0.0, 0.55, exp(-d2 / 0.6));",
            glsl: "float aaW = max(fwidth(fN), 6e-4); float hwAA = hw * aaW; float dfade = 1.0 - smoothstepEdge(0.30, 0.48, hwAA); float ink = clamp(contourInk(fN, hw, aaW), 0.0, 1.0) * dfade; float g0 = exp(-d2 / 0.22); float fall = smoothstepEdge(0.0, 0.55, exp(-d2 / 0.6));",
        },
    });
    if (bareExp.length === 0) fails.push("self-test: a planted BARE unclamped heave exp() did NOT red");
    // (lcr-c) LC5 — an EXTREME 1e6 parked-cursor sentinel MUST red (it NaNs the shared cursorSwirl
    //         exp on WebKit/Metal fast-math → the SILENT blank). Only the useConcentric override.
    const extremeCursor = runAll({
        lcr: { useConcentric: "const CURSOR_PARKED: Vec2 = { x: 1e6, y: 1e6 };" },
    });
    if (extremeCursor.length === 0) fails.push("self-test: a planted 1e6 extreme parked-cursor sentinel did NOT red");

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
