#!/usr/bin/env node
// AW.W7a — the WGSL ↔ GLSL color/noise equivalence gate (proof:aurora-wgsl-equivalence).
//
// The single-source-the-GPU-math-first discipline (the AV.W1 divergence-bug-class
// pre-empt at the backend boundary). Two arms:
//
//   (1) NUMERIC 1e-6 — the WGSL color/noise chunk (OETF_WGSL + OKLCH_MATRICES_WGSL +
//       FBM_ROT_WGSL) matches its GLSL twin to 1e-6 via the hand-transcribed WGSL→TS
//       port asserted against the EXISTING GLSL oracle (`metaball-color.glsl-port.ts`,
//       never a new oracle), over the asymmetric witness `#3a7bd5`. Run via the
//       backend-equivalence.test.ts vitest spec.
//   (2) STRUCTURAL — the WGSL twin SPLICES the shared procedural-color chunk's WGSL
//       exports rather than re-authoring the OETF/matrices inline (a re-authored WGSL
//       color core is the AV.W1 two-copy divergence). aurora.wgsl.ts imports
//       OETF_WGSL/OKLCH_MATRICES_WGSL/FBM_ROT_WGSL and does NOT re-define a
//       chunk-owned mat3x3f literal / linearToSrgb body.
//
// bite-check: perturb a WGSL matrix/OETF constant in the chunk → the 1e-6 numeric
// equivalence REDs; re-author the WGSL OETF inline in aurora.wgsl.ts → the structural
// arm REDs.

import { execFileSync } from "node:child_process";
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
    _cliPaths = {
        ROOT,
        SPEC: "tests/composables/glass/backend-equivalence.test.ts",
        CHUNK: resolve(ROOT, "src/composables/glass/webgl/shaders/procedural-color.glsl.ts"),
        WGSL: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.wgsl.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_WGSL_EQUIVALENCE_ARTIFACT", "AW-aurora-wgsl-equivalence"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SPEC, CHUNK, WGSL, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // (1) numeric — the equivalence spec is green.
    let specGreen = false;
    let output = "";
    try {
        output = execFileSync("npx", ["vitest", "run", SPEC], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        specGreen = true;
    } catch (err) {
        // fail-explicit: a non-zero exit is a 1e-6 divergence; surface its tail.
        output = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
        specGreen = false;
    }
    facts.numericEquivalent = specGreen;
    if (!specGreen) {
        violations.push("(1) the WGSL→TS port diverges from the GLSL oracle (backend-equivalence.test.ts RED) — the WGSL color/noise chunk does not match the GLSL twin to 1e-6 (a transcription bug in the WGSL emit)");
    }

    // (2) structural — the WGSL chunk exists + the twin splices it (not re-authored).
    const chunk = existsSync(CHUNK) ? stripComments(readFileSync(CHUNK, "utf8")) : null;
    const wgsl = existsSync(WGSL) ? stripComments(readFileSync(WGSL, "utf8")) : null;
    facts.chunkExportsWgsl =
        !!chunk &&
        /export const OETF_WGSL/.test(chunk) &&
        /export const OKLCH_MATRICES_WGSL/.test(chunk) &&
        /export const FBM_ROT_WGSL/.test(chunk);
    if (!facts.chunkExportsWgsl) violations.push("(2) the shared procedural-color chunk does not export the WGSL twins (OETF_WGSL/OKLCH_MATRICES_WGSL/FBM_ROT_WGSL)");

    facts.twinSplicesChunk =
        !!wgsl &&
        /import\s*\{[\s\S]*?OETF_WGSL[\s\S]*?OKLCH_MATRICES_WGSL[\s\S]*?FBM_ROT_WGSL[\s\S]*?\}\s*from\s*["'][^"']*procedural-color\.glsl["']/.test(wgsl) &&
        /\$\{OETF_WGSL\}/.test(wgsl) &&
        /\$\{OKLCH_MATRICES_WGSL\}/.test(wgsl);
    if (!facts.twinSplicesChunk) violations.push("(2) aurora.wgsl.ts does not SPLICE the shared chunk's WGSL exports (it must import + interpolate OETF_WGSL/OKLCH_MATRICES_WGSL/FBM_ROT_WGSL, not re-author the color core)");

    // The twin must NOT re-author a chunk-owned mat3x3f color literal inline (the
    // two-copy divergence). The LINEAR_SRGB_TO_LMS first column is the canary.
    facts.noReauthoredColorCore = !!wgsl && !/mat3x3f\s*\(\s*0\.4122214708/.test(wgsl) && !/fn\s+linearToSrgbCh/.test(wgsl);
    if (!facts.noReauthoredColorCore) violations.push("(2) aurora.wgsl.ts RE-AUTHORS a chunk-owned WGSL color literal (a mat3x3f Ottosson matrix or the linearToSrgb body) inline — the AV.W1 two-copy divergence");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-wgsl-equivalence", facts, violations });

    console.log("proof:aurora-wgsl-equivalence — the WGSL color twin matches the GLSL oracle to 1e-6 (AW.W7a)");
    console.log(`  (1) numeric 1e-6 (spec)   : ${facts.numericEquivalent ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) chunk exports WGSL    : ${facts.chunkExportsWgsl ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) twin splices the chunk: ${facts.twinSplicesChunk ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) no re-authored core   : ${facts.noReauthoredColorCore ? "yes ✓" : "NO ✗"}`);
    if (!specGreen) console.log("\n--- vitest tail ---\n" + output.split("\n").slice(-25).join("\n"));
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
