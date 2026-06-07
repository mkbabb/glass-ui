#!/usr/bin/env node
// AW.W4.1 — the structure-tensor / ETF orientation field gate (proof:aurora-tensor-field).
//
// The keystone of the painterly engine: stroke orientation derives from the COLOR
// FIELD's OWN structure tensor (the minor-eigenvector edge-tangent), not a hand-
// authored flow pattern. This gate is the STATIC + structural half (the eigen-math
// correctness lives in the painterly.test.ts arm the §6 cadence runs):
//
//   (1) STRUCTURE-TENSOR PRESENT — `structureTensorField()` carries the Sobel
//       derivative + the 2x2 structure tensor (Jxx/Jyy/Jxy) + the closed-form
//       eigen-decomposition (the principal-angle atan2 form) + the coherence A.
//   (2) THE TENSOR FLOW BRANCH — flow.glsl.ts has a `uFlowPattern == 5` (tensor/ETF)
//       branch returning the structureTensorField direction.
//   (3) THE strokeOrient SWITCH — bestOil gates the per-cell direction behind
//       `uStrokeOrient == 1`, substituting the structure-tensor direction.
//   (4) THE UNIFORM IS THREADED — uStrokeOrient is declared in the shader, in
//       UNIFORM_NAMES (glSetup), uploaded by the bridge, and STROKE_ORIENT_ID maps it.
//
// bite-check: swapping the minor eigenvector for the MAJOR (the gradient/edge-normal)
// makes the painterly.test.ts orientation assertion RED (the minor is the tangent,
// the major is the normal — strokes would cross the bands instead of hugging them).

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
    const SH = resolve(ROOT, "src/components/custom/aurora/constants/shaders");
    _cliPaths = {
        ROOT,
        FLOW: resolve(SH, "flow.glsl.ts"),
        MEDIUMS: resolve(SH, "mediums.glsl.ts"),
        BRUSH: resolve(SH, "brush.glsl.ts"),
        FRAG: resolve(SH, "aurora.frag.ts"),
        GLSETUP: resolve(ROOT, "src/components/custom/aurora/composables/glSetup.ts"),
        BRIDGE: resolve(ROOT, "src/components/custom/aurora/composables/uniformBridge.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_TENSOR_FIELD_ARTIFACT", "AW-aurora-tensor-field"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, FLOW, MEDIUMS, BRUSH, FRAG, GLSETUP, BRIDGE, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const flow = read(FLOW);
    const mediums = read(MEDIUMS);
    const brush = read(BRUSH);
    const frag = read(FRAG);
    const glsetup = read(GLSETUP);
    const bridge = read(BRIDGE);

    if (!flow || !mediums || !brush || !frag || !glsetup || !bridge) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-tensor-field", facts, violations });
        console.error("[proof:aurora-tensor-field] FAIL — source absent");
        process.exit(1);
    }

    // (1) the structure-tensor body.
    facts.hasStructureTensorBody =
        /vec3\s+structureTensorField\s*\(\s*vec2\s+p\s*,\s*float\s+t\s*,\s*vec2\s+fallbackDir\s*\)\s*\{/.test(mediums) &&
        /Jxx/.test(mediums) && /Jyy/.test(mediums) && /Jxy/.test(mediums) &&
        /atan\s*\(\s*2\.0\s*\*\s*Jxy/.test(mediums) &&
        /lambdaMaj/.test(mediums) && /lambdaMin/.test(mediums);
    if (!facts.hasStructureTensorBody) {
        violations.push("structureTensorField() is missing the Sobel→2x2 tensor (Jxx/Jyy/Jxy)→closed-form eigen-decomposition (the principal-angle atan2 + coherence)");
    }
    // The MINOR eigenvector is the TANGENT: the principal angle is the MAJOR
    // (gradient) direction; the tangent must be its PERPENDICULAR (-sin, cos).
    facts.tangentIsPerpendicular = /tangent\s*=\s*vec2\s*\(\s*-\s*sin\s*\(\s*theta\s*\)\s*,\s*cos\s*\(\s*theta\s*\)\s*\)/.test(mediums);
    if (!facts.tangentIsPerpendicular) {
        violations.push("the tangent is not the perpendicular of the principal (gradient) angle — the minor eigenvector is the edge TANGENT, not the gradient/normal (the major-eigenvector bite)");
    }

    // (2) the flow tensor/ETF branch.
    facts.hasTensorFlowBranch =
        /uFlowPattern\s*==\s*5/.test(flow) && /structureTensorField\s*\(/.test(flow);
    if (!facts.hasTensorFlowBranch) {
        violations.push("flow.glsl.ts has no `uFlowPattern == 5` (tensor/ETF) branch returning the structureTensorField direction");
    }

    // (3) the strokeOrient switch in bestOil.
    facts.hasStrokeOrientSwitch =
        /uStrokeOrient\s*==\s*1/.test(brush) && /structureTensorField\s*\(/.test(brush);
    if (!facts.hasStrokeOrientSwitch) {
        violations.push("bestOil does not gate the per-cell direction behind `uStrokeOrient == 1` (the structure-tensor substitution)");
    }

    // (4) the uniform is threaded shader→glSetup→bridge.
    facts.shaderDeclaresUniform = /uniform\s+int\s+uStrokeOrient/.test(frag);
    facts.uniformInNamesArray = /"uStrokeOrient"/.test(glsetup);
    facts.bridgeUploadsUniform = /uStrokeOrient\b/.test(bridge) && /STROKE_ORIENT_ID/.test(bridge);
    facts.strokeOrientIdMapPresent = /STROKE_ORIENT_ID\s*=\s*\{[\s\S]*?flow:\s*0[\s\S]*?tensor:\s*1/.test(bridge);
    if (!facts.shaderDeclaresUniform) violations.push("the shader does not declare `uniform int uStrokeOrient`");
    if (!facts.uniformInNamesArray) violations.push("uStrokeOrient is not in glSetup's UNIFORM_NAMES (the location cache misses it → it never uploads)");
    if (!facts.bridgeUploadsUniform) violations.push("the bridge does not upload uStrokeOrient via STROKE_ORIENT_ID");
    if (!facts.strokeOrientIdMapPresent) violations.push("STROKE_ORIENT_ID does not map { flow: 0, tensor: 1 }");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-tensor-field", facts, violations });

    console.log("proof:aurora-tensor-field — the structure-tensor / ETF orientation keystone (AW.W4.1)");
    console.log(`  structureTensorField body : ${facts.hasStructureTensorBody ? "yes ✓" : "NO ✗"}`);
    console.log(`  tangent = perpendicular   : ${facts.tangentIsPerpendicular ? "yes ✓" : "NO ✗ (major-eigenvector bite)"}`);
    console.log(`  uFlowPattern==5 branch    : ${facts.hasTensorFlowBranch ? "yes ✓" : "NO ✗"}`);
    console.log(`  bestOil strokeOrient swap : ${facts.hasStrokeOrientSwitch ? "yes ✓" : "NO ✗"}`);
    console.log(`  uniform threaded          : shader=${facts.shaderDeclaresUniform ? "✓" : "✗"} names=${facts.uniformInNamesArray ? "✓" : "✗"} bridge=${facts.bridgeUploadsUniform ? "✓" : "✗"} map=${facts.strokeOrientIdMapPresent ? "✓" : "✗"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
