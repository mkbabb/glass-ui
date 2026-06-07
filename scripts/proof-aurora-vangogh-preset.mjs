#!/usr/bin/env node
// AW.W4.3 — the van-Gogh medium 5-step-wiring gate (proof:aurora-vangogh-preset).
//
// Adding a new medium is NOT a one-file edit: the union, the id map, the dispatch
// ladder, the orientation force, and the energy grading must ALL land in one wave or
// `uMedium==5` silently no-ops (the binding-verification class). This gate asserts
// ALL FIVE landed:
//
//   (1) UNION       — `AuroraMedium` (presets.ts) includes "vangogh".
//   (2) MEDIUM_ID   — uniformBridge MEDIUM_ID maps vangogh: 5 (the `satisfies`
//                     Record forces it; this gate double-checks the literal).
//   (3) DISPATCH    — aurora.frag main() has an `else if (uMedium == 5)` branch
//                     dispatching mediumVangogh; mediumVangogh is defined.
//   (4) FORCE-TENSOR — resolveStrokeOrientId forces tensor for the vangogh medium
//                     (the energy-graded strokes must hug the color zones).
//   (5) ENERGY-GRADE — bestOil energy-grades stroke length by luma(sampleBase) +
//                     coherence when uMedium==5 (the Starry-Night cascade), AND the
//                     per-stroke OKLCh pigment jitter (brokenColorJitter) is present.
//
// bite-check: a config asserting vangogh falls back to the old oil+swirl uniforms
// (no force-tensor, no energy grade) → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const A = resolve(ROOT, "src/components/custom/aurora");
    _cliPaths = {
        ROOT,
        PRESETS: resolve(A, "constants/presets.ts"),
        BRIDGE: resolve(A, "composables/uniformBridge.ts"),
        FRAG: resolve(A, "constants/shaders/aurora.frag.ts"),
        MEDIUMS: resolve(A, "constants/shaders/mediums.glsl.ts"),
        BRUSH: resolve(A, "constants/shaders/brush.glsl.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_VANGOGH_PRESET_ARTIFACT", "AW-aurora-vangogh-preset"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, PRESETS, BRIDGE, FRAG, MEDIUMS, BRUSH, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const presets = read(PRESETS);
    const bridge = read(BRIDGE);
    const frag = read(FRAG);
    const mediums = read(MEDIUMS);
    const brush = read(BRUSH);
    if (!presets || !bridge || !frag || !mediums || !brush) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-vangogh-preset", facts, violations });
        console.error("[proof:aurora-vangogh-preset] FAIL — source absent");
        process.exit(1);
    }

    // (1) union.
    facts.step1_union = /AuroraMedium\s*=[\s\S]*?"vangogh"/.test(presets);
    if (!facts.step1_union) violations.push("step 1: AuroraMedium union does not include \"vangogh\"");

    // (2) MEDIUM_ID map.
    facts.step2_mediumId = /MEDIUM_ID\s*=\s*\{[\s\S]*?vangogh:\s*5/.test(bridge);
    if (!facts.step2_mediumId) violations.push("step 2: MEDIUM_ID does not map vangogh: 5");

    // (3) dispatch + the medium function.
    facts.step3_dispatch = /else\s+if\s*\(\s*uMedium\s*==\s*5\s*\)\s*col\s*=\s*mediumVangogh\s*\(/.test(frag);
    facts.step3_mediumDefined = /vec3\s+mediumVangogh\s*\(/.test(mediums);
    if (!facts.step3_dispatch) violations.push("step 3: main() has no `else if (uMedium == 5) col = mediumVangogh(...)` dispatch");
    if (!facts.step3_mediumDefined) violations.push("step 3: mediumVangogh() is not defined");

    // (4) force-tensor for the vangogh medium.
    facts.step4_forceTensor = /resolveStrokeOrientId[\s\S]*?medium\s*===\s*"vangogh"[\s\S]*?STROKE_ORIENT_ID\.tensor/.test(bridge);
    if (!facts.step4_forceTensor) violations.push("step 4: resolveStrokeOrientId does not FORCE tensor for the vangogh medium (the strokes would not hug the color zones — the oil+swirl fallback bite)");

    // (5) energy grading + OKLCh per-stroke jitter.
    facts.step5_energyGrade = /uMedium\s*==\s*5/.test(brush) && /sampleBase/.test(brush) && /W_LUMA/.test(brush) && /energy/.test(brush);
    facts.step5_okLchJitter = /brokenColorJitter\s*\(/.test(brush);
    if (!facts.step5_energyGrade) violations.push("step 5: bestOil does not energy-grade stroke length by luma(sampleBase)+coherence when uMedium==5 (the Starry-Night cascade)");
    if (!facts.step5_okLchJitter) violations.push("step 5: bestOil does not apply the OKLCh per-stroke pigment jitter (brokenColorJitter)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-vangogh-preset", facts, violations });

    console.log("proof:aurora-vangogh-preset — the van-Gogh medium 5-step wiring (AW.W4.3)");
    console.log(`  (1) union "vangogh"       : ${facts.step1_union ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) MEDIUM_ID vangogh:5   : ${facts.step2_mediumId ? "yes ✓" : "NO ✗"}`);
    console.log(`  (3) dispatch + medium fn  : ${facts.step3_dispatch && facts.step3_mediumDefined ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) force-tensor orient   : ${facts.step4_forceTensor ? "yes ✓" : "NO ✗ (oil+swirl fallback)"}`);
    console.log(`  (5) energy grade + jitter : ${facts.step5_energyGrade && facts.step5_okLchJitter ? "yes ✓" : "NO ✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
