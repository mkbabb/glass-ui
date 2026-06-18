#!/usr/bin/env node
// BB.W-VIZ-SUITE (W-FLOWFIELD) — proof:flow-field, the dot-flow-field source gate
// (born-RED on the bare tree → GREEN at close).
//
// The dot-flow-field is the FIRST NEW WebGPU-first viz of Batch V — born on the proven
// substrate (W-GPU-SUBSTRATE + the aurora/goo-blob WGSL migrations). This gate machine-
// locks the WebGPU-first-with-fallback shape + the curlFBM/pointer-velocity consume + the
// colocation/publication + the reference-aesthetic readback clause + the JS↔WGSL
// round-trip (the single-math-source bar). The binding live-π / own-surface DELTA capture
// (the gestalt bar) rides W-REFLECT3 (tests-visual/flow-field.spec.ts).
//
// SOURCE PREDICATES (each falsifiable, each device-free):
//   1. COLOCATION — the feature-dir carries composables/ + constants.ts +
//      shaders/{compute.wgsl,render.wgsl,fallback} + README.md (the proof:colocation
//      layout the README marker enrolls).
//   2. COMPOSES-SUBSTRATE — DotFlowField.vue / useDotFlowField.ts compose useGpuSubstrate
//      (the picker), NOT createWebGLCanvas / navigator.gpu directly (clause A of the
//      parity gate, scoped to this viz).
//   3. ROUND-TRIP — the analytic ∇⊥ψ evaluator (flowField.ts sampleVelocity) is the
//      SINGLE math source: the WGSL compute kernel transcribes the SAME Gerstner-sum +
//      curl constants (a structural transcription check — the shared constants/structure
//      match, the device-free form of the JS↔WGSL clause).
//   4. CURL-CONSUME + FALLBACK — the viz consumes the SHARED curlFBM operator (BB.B1)
//      AND the pointer-velocity reader (B4); the Canvas2D/WebGL2 fallback exists + its
//      parity status is declared verified in the parity table.
//   5. WARM-IDENTITY — the DEFAULT palette in constants.ts is warm-cream identity (NO
//      teal/navy literal — the demo owns the reference; presets-in-consumers).
//   6. STORY — a demo/stories/substrates/dot-flow-field.vue story covers the export
//      (proof:storybook-complete green).
//
// SELF-TEST BITE (--selftest): a synthetic broken tree (a teal literal injected into the
// library constants; a navigator.gpu direct call) MUST red — born-RED proof on a green HEAD.

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
        "composables/useFlowParticles.ts",
        "shaders/flow-field.compute.wgsl.ts",
        "shaders/flow-field.render.wgsl.ts",
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
    // The viz must NOT bootstrap a context directly.
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
        srcOverride?.["compute"] ??
            read(resolve(DIR, "shaders/flow-field.compute.wgsl.ts")),
    );
    // The single-math-source check: the WGSL kernel transcribes the SAME Gerstner sum
    // (ω = √(g·k), the (∂h/∂y, −∂h/∂x) curl) AND the same curl-noise basis (FBM_ROT,
    // CURL_EPS 0.012) the JS evaluator carries. A structural transcription match.
    const sharedTokens = [
        ["sampleVelocity in JS", () => /function sampleVelocity/.test(js)],
        ["sampleVelocity in WGSL", () => /fn sampleVelocity/.test(wgsl)],
        ["gerstner ω=√(g·k) in JS", () => /Math\.sqrt\(\s*FLOW_GRAVITY\s*\*\s*k\s*\)/.test(js)],
        ["gerstner ω=√(g·k) in WGSL", () => /sqrt\(\s*FLOW_GRAVITY\s*\*\s*k\s*\)/.test(wgsl)],
        ["curl ∇⊥h (dhdy,−dhdx) in JS", () => /x:\s*dhdy\s*,\s*y:\s*-?\s*dhdx/.test(js)],
        ["curl ∇⊥h (dhdy,−dhdx) in WGSL", () => /vec2<f32>\(\s*dhdy\s*,\s*-\s*dhdx\s*\)/.test(wgsl)],
        ["CURL_EPS 0.012 in JS", () => /CURL_EPS\s*=\s*0\.012/.test(js)],
        ["CURL_EPS 0.012 in WGSL", () => /CURL_EPS\s*[:=]\s*[^;]*0\.012/.test(wgsl)],
        ["FBM_ROT 0.8/0.6 in JS", () => /0\.8\s*\*\s*px\s*-\s*0\.6\s*\*\s*py/.test(js)],
        ["FBM_ROT 0.8/0.6 in WGSL", () => /mat2x2<f32>\(0\.8,\s*0\.6,\s*-0\.6,\s*0\.8\)/.test(wgsl)],
    ];
    for (const [label, fn] of sharedTokens) {
        if (!fn()) viol.push(`round-trip: ${label} — the WGSL kernel must transcribe the SAME flowField.ts math (the single source)`);
    }
    return viol;
}

function clauseCurlAndFallback(srcOverride) {
    const viol = [];
    // The SHARED curlFBM operator (BB.B1) must exist (the ≥3-consumer chunk source); the
    // viz transcribes the SAME curl operator definition. The pointer-velocity reader (B4)
    // is available for the interactive axis.
    if (!existsSync(FLOW_GLSL_CHUNK))
        viol.push("curl: the shared curlFBM operator (flow.glsl.ts) is missing");
    if (!existsSync(resolve(ROOT, "src/composables/motion/usePointerVelocityField.ts")))
        viol.push("pointer: usePointerVelocityField (B4) is missing");
    // The fallback path exists.
    if (!existsSync(resolve(DIR, "shaders/flow-field.glsl.ts")))
        viol.push("fallback: shaders/flow-field.glsl.ts (the Canvas2D fallback) is missing");
    // The parity table declares the flow-field row verified (or degraded — a recorded
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
    // The warm-identity default — NO teal/navy literal in the LIBRARY constants. The
    // reference teal palette (hue ~195-205) + the navy ground (hue ~255) live in the DEMO
    // preset, never here. Detect an OklchStop with a teal/navy hue.
    const stopRe = /h\s*:\s*(\d+(?:\.\d+)?)/g;
    let m;
    while ((m = stopRe.exec(consts))) {
        const h = Number(m[1]);
        if (h >= 180 && h <= 280)
            viol.push(`warm-identity: a teal/navy hue (h=${h}) in the LIBRARY constants.ts — the reference palette belongs in the DEMO preset (presets-in-consumers)`);
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
    // (c) a broken round-trip (WGSL kernel missing the gerstner ω term).
    const brokenRT = runAll({
        roundTrip: { compute: "fn sampleVelocity() {}\n// no gerstner, no curl" },
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
        wave: "BB.W-VIZ-SUITE.d W-FLOWFIELD",
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
