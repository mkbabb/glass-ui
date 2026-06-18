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

function runAll(overrides = {}) {
    return [
        ...clauseColocation(overrides.colocation ?? {}),
        ...clauseComposesSubstrate(overrides.composes),
        ...clauseRoundTrip(overrides.roundTrip),
        ...clauseFallback(overrides.fallback),
        ...clauseWarmIdentity(overrides.warm),
        ...clauseStory(overrides.story),
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
        console.log("proof:concentric — GREEN (6 clauses)");
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
