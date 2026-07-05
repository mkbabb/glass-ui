#!/usr/bin/env node
// BB.W-VIZ-SUITE (W-FLOWFIELD) → BG.W-DOTFLOW-REBUILD — proof:flow-field, the dot-flow-field
// source gate (the colocation + WebGPU-first + single-math-source + fallback lock; kept GREEN
// through the STREAMLINE rebuild — the mote/trail architecture retired, the streamline field the
// new single source; the born-RED architecture lock is proof:viz-dotflow).
//
// SOURCE PREDICATES (each falsifiable, each device-free):
//   1. COLOCATION — the feature-dir carries composables/ + constants.ts + shaders/{wgsl,glsl}
//      + README.md (the proof:colocation layout the README marker enrolls).
//   2. COMPOSES-SUBSTRATE — DotFlowField.vue / useDotFlowField.ts compose useGpuSubstrate (the
//      picker), NOT createWebGLCanvas / navigator.gpu directly.
//   3. ROUND-TRIP — the stream-field evaluator (flowField.ts sampleStreamField) is the SINGLE
//      math source: the WGSL fullscreen fragment (flow-field.wgsl.ts) transcribes the SAME field
//      (the ramp + undulation + curl-warp) + the shared curl basis (a structural transcription).
//   4. CURL-CONSUME + FALLBACK — the shared curlFBM chunk (flow.glsl.ts) + the pointer-velocity
//      reader exist; the WebGL2 fallback (flow-field.glsl.ts) exists + the parity row resolves.
//   5. WARM-IDENTITY — the DEFAULT palette in constants.ts is warm-cream (NO teal/navy literal).
//   6. STORY — a demo/stories/substrates/dot-flow-field.vue story covers the export.
//
// SELF-TEST BITE (--selftest): a synthetic broken tree (a teal literal; a navigator.gpu direct
// call; a broken round-trip; a missing story) MUST red.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const DIR = resolve(ROOT, "src/components/custom/dot-flow-field");
const PARITY_TABLE = resolve(ROOT, "docs/tranches/BB/audit/gpu-parity-table.md");
const STORY = resolve(ROOT, "demo/stories/substrates/dot-flow-field.vue");
const FLOW_GLSL_CHUNK = resolve(
    ROOT,
    "src/composables/glass/webgl/shaders/flow.glsl.ts",
);

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const stripComments = (s) =>
    (s ?? "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");

// ── Clause runners (return a violation string array each) ──

function clauseColocation(overrides = {}) {
    const viol = [];
    const must = [
        "DotFlowField.vue",
        "constants.ts",
        "index.ts",
        "README.md",
        "composables/flowField.ts",
        "composables/useDotFlowField.ts",
        "composables/uniformBridgeWGPU.ts",
        "shaders/flow-field.wgsl.ts",
        "shaders/flow-field.glsl.ts",
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
    const sfc = srcOverride?.["DotFlowField.vue"] ?? read(resolve(DIR, "DotFlowField.vue"));
    const composable =
        srcOverride?.["useDotFlowField"] ??
        read(resolve(DIR, "composables/useDotFlowField.ts"));
    const both = stripComments(sfc) + "\n" + stripComments(composable);
    if (/navigator\s*\.\s*gpu\s*\.\s*requestAdapter/.test(both))
        viol.push("composes: a direct navigator.gpu.requestAdapter call — the viz must compose useGpuSubstrate");
    if (/getContext\(\s*["']webgl2["']/.test(both))
        viol.push("composes: a direct getContext('webgl2') call — the viz must compose the substrate picker");
    if (!/useGpuSubstrate|createGpuSubstrate/.test(both))
        viol.push("composes: useDotFlowField does not compose the useGpuSubstrate picker");
    return viol;
}

function clauseRoundTrip(srcOverride) {
    const viol = [];
    const js = stripComments(
        srcOverride?.["flowField"] ?? read(resolve(DIR, "composables/flowField.ts")),
    );
    const wgsl = stripComments(
        srcOverride?.["wgsl"] ?? read(resolve(DIR, "shaders/flow-field.wgsl.ts")),
    );
    // The single-math-source check: the WGSL fullscreen fragment transcribes the SAME stream
    // field (the flowSlope·wy ramp + the two traveling undulations + the curlFBM domain warp) +
    // the same curl-noise basis (FBM_ROT, CURL_EPS 0.012) the JS evaluator carries.
    const sharedTokens = [
        ["sampleStreamField in JS", () => /function sampleStreamField/.test(js)],
        ["sampleStreamField in WGSL", () => /fn sampleStreamField/.test(wgsl)],
        ["ramp flowSlope·wy in JS", () => /flowSlope\s*\*\s*wy/.test(js)],
        ["ramp flowSlope·wy in WGSL", () => /v0\.w\s*\*\s*wy/.test(wgsl)],
        ["curl-warp domain in JS", () => /curlFBM\(/.test(js)],
        ["curl-warp domain in WGSL", () => /curlFBM\(/.test(wgsl)],
        ["CURL_EPS 0.012 in JS", () => /CURL_EPS\s*=\s*0\.012/.test(js)],
        ["CURL_EPS 0.012 in WGSL", () => /CURL_EPS\s*[:=]\s*[^;]*0\.012/.test(wgsl)],
        ["FBM_ROT 0.8/0.6 in JS", () => /0\.8\s*\*\s*px\s*-\s*0\.6\s*\*\s*py/.test(js)],
        ["FBM_ROT 0.8/0.6 in WGSL", () => /mat2x2<f32>\(0\.8,\s*0\.6,\s*-0\.6,\s*0\.8\)/.test(wgsl)],
    ];
    for (const [label, fn] of sharedTokens) {
        if (!fn()) viol.push(`round-trip: ${label} — the WGSL fragment must transcribe the SAME flowField.ts math (the single source)`);
    }
    return viol;
}

function clauseCurlAndFallback(srcOverride) {
    const viol = [];
    // The SHARED curlFBM chunk (BB.B1) exists; the pointer-velocity reader (B4) is available.
    if (!existsSync(FLOW_GLSL_CHUNK))
        viol.push("curl: the shared curlFBM operator (flow.glsl.ts) is missing");
    if (!existsSync(resolve(ROOT, "src/composables/motion/usePointerVelocityField.ts")))
        viol.push("pointer: usePointerVelocityField (B4) is missing");
    // The WebGL2 fallback path exists.
    if (!existsSync(resolve(DIR, "shaders/flow-field.glsl.ts")))
        viol.push("fallback: shaders/flow-field.glsl.ts (the WebGL2 fragment fallback) is missing");
    // The parity table declares the flow-field row verified/degraded + its paths resolve on disk.
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
        const row = parsed?.viz?.find((r) => r.viz === "dot-flow-field");
        if (!row) viol.push("fallback: the parity table has no dot-flow-field row");
        else {
            if (!["verified", "degraded", "webgl2-only"].includes(row.status))
                viol.push(`fallback: dot-flow-field parity status "${row.status}" is not a live status`);
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
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 280)
            viol.push(`warm-identity: a teal/navy hue (h=${h}) in the LIBRARY constants.ts — the reference skin belongs in the DEMO preset (presets-in-consumers)`);
    }
    if (!/WARM_IDENTITY_PALETTE/.test(consts))
        viol.push("warm-identity: constants.ts does not declare WARM_IDENTITY_PALETTE");
    return viol;
}

function clauseStory(srcOverride) {
    const viol = [];
    if (srcOverride?.["story"] === false) {
        viol.push("story: missing demo/stories/substrates/dot-flow-field.vue");
        return viol;
    }
    const story = read(STORY);
    if (!story) {
        viol.push("story: missing demo/stories/substrates/dot-flow-field.vue");
        return viol;
    }
    if (!/DotFlowField/.test(story))
        viol.push("story: the substrates story does not import/render <DotFlowField>");
    return viol;
}

function runAll(overrides = {}) {
    return [
        ...clauseColocation(overrides.colocation ?? {}),
        ...clauseComposesSubstrate(overrides.composes),
        ...clauseRoundTrip(overrides.roundTrip),
        ...clauseCurlAndFallback(overrides.curl),
        ...clauseWarmIdentity(overrides.warm),
        ...clauseStory(overrides.story),
    ];
}

// ── Self-test bite: a synthetic broken tree MUST red ──
function selfTest() {
    const fails = [];
    // (a) a teal literal injected into the library constants.
    const tealInjected = runAll({
        warm: { constants: "export const X = { L: 0.8, C: 0.11, h: 195 };\nWARM_IDENTITY_PALETTE" },
    });
    if (tealInjected.length === 0) fails.push("self-test: a teal hue in library constants did NOT red");
    // (b) a direct navigator.gpu call in the composable.
    const directGpu = runAll({
        composes: {
            "DotFlowField.vue": "useGpuSubstrate",
            useDotFlowField: "navigator.gpu.requestAdapter(); useGpuSubstrate",
        },
    });
    if (directGpu.length === 0) fails.push("self-test: a direct navigator.gpu.requestAdapter did NOT red");
    // (c) a broken round-trip (WGSL fragment missing the ramp + curl warp).
    const brokenRT = runAll({
        roundTrip: { wgsl: "fn sampleStreamField() {}\n// no ramp, no curl" },
    });
    if (brokenRT.length === 0) fails.push("self-test: a broken JS↔WGSL round-trip did NOT red");
    // (d) a missing story.
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
        gate: "proof:flow-field",
        wave: "BB.W-VIZ-SUITE.d W-FLOWFIELD → BG.W-DOTFLOW-REBUILD",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_FLOW_FIELD_ARTIFACT", "proof-flow-field.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:flow-field — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:flow-field — GREEN (6 clauses)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:flow-field --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:flow-field --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
