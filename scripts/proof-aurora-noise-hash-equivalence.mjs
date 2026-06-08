#!/usr/bin/env node
// AX.W12 — the GLSL↔WGSL PCG-hash + simplex-gradient-noise twin-equivalence gate
// (proof:aurora-noise-hash-equivalence), patterned on proof:aurora-wgsl-equivalence.
//
// The single-source-the-GPU-math-first discipline applied to the NET-NEW painterly
// noise basis (the Jarzynski PCG2D integer-bit hash + 2D simplex gradient noise the
// painterly mediums opt into instead of the value-noise/sin-hash lattice ceiling). Two
// arms, the same shape as the OETF/matrices/FBM twin gate:
//
//   (1) NUMERIC 1e-6 — the GLSL twin (PCG_HASH_GLSL) and the WGSL twin (PCG_HASH_WGSL)
//       compute the same numbers. Asserted via the hand-transcribed TS port
//       (noise-hash.glsl-port.ts — the certified-identical integer + simplex pipeline)
//       against frozen 1e-6 oracle witnesses. Run via the noise-hash-equivalence.test.ts
//       vitest spec. Born-RED at HEAD (there is no PCG hash to transcribe; the gate had
//       nothing to assert until the leaf existed).
//   (2) STRUCTURAL — the shared chunk exports BOTH twins, BOTH aurora shaders SPLICE the
//       chunk export (regex over the import + ${...} interpolation), and NEITHER shader
//       re-authors the hash inline (a re-authored inline PCG/simplex hash is the AV.W1
//       two-copy divergence class). RED if the chunk omits a twin OR a shader re-authors.
//
// bite-check: perturb a PCG constant in the chunk → the numeric 1e-6 equivalence REDs;
// re-author the hash inline in aurora.frag.ts / aurora.wgsl.ts (bypassing the chunk) →
// the structural splice arm REDs.

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
        SPEC: "tests/components/custom/aurora/noise-hash-equivalence.test.ts",
        CHUNK: resolve(ROOT, "src/composables/glass/webgl/shaders/procedural-color.glsl.ts"),
        FRAG: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.frag.ts"),
        WGSL: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.wgsl.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AURORA_NOISE_HASH_EQUIVALENCE_ARTIFACT",
            "AX-aurora-noise-hash-equivalence",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SPEC, CHUNK, FRAG, WGSL, ARTIFACT } = cliPaths();
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
        output = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
        specGreen = false;
    }
    facts.numericEquivalent = specGreen;
    if (!specGreen) {
        violations.push("(1) the PCG-hash + simplex twin diverges (noise-hash-equivalence.test.ts RED) — the GLSL/WGSL noise leaf does not match the frozen 1e-6 oracle (a transcription bug in either twin)");
    }

    // (2) structural — the chunk exports BOTH twins; BOTH shaders splice; no inline copy.
    const chunk = existsSync(CHUNK) ? stripComments(readFileSync(CHUNK, "utf8")) : null;
    const frag = existsSync(FRAG) ? stripComments(readFileSync(FRAG, "utf8")) : null;
    const wgsl = existsSync(WGSL) ? stripComments(readFileSync(WGSL, "utf8")) : null;

    facts.chunkExportsTwins =
        !!chunk &&
        /export const PCG_HASH_GLSL/.test(chunk) &&
        /export const PCG_HASH_WGSL/.test(chunk);
    if (!facts.chunkExportsTwins) violations.push("(2) the shared procedural-color chunk does not export BOTH noise-hash twins (PCG_HASH_GLSL + PCG_HASH_WGSL) — the AX.W12 single-source noise leaf is absent");

    // The GLSL aurora frag SPLICES the GLSL twin (imports + interpolates), not inline.
    facts.fragSplicesTwin =
        !!frag &&
        /import\s*\{[\s\S]*?PCG_HASH_GLSL[\s\S]*?\}\s*from\s*["'][^"']*procedural-color\.glsl["']/.test(frag) &&
        /\$\{PCG_HASH_GLSL\}/.test(frag);
    if (!facts.fragSplicesTwin) violations.push("(2) aurora.frag.ts does not SPLICE the shared PCG_HASH_GLSL leaf (it must import + interpolate ${PCG_HASH_GLSL}, not re-author the hash inline)");

    // The WGSL aurora twin SPLICES the WGSL twin (imports + interpolates), not inline.
    facts.wgslSplicesTwin =
        !!wgsl &&
        /import\s*\{[\s\S]*?PCG_HASH_WGSL[\s\S]*?\}\s*from\s*["'][^"']*procedural-color\.glsl["']/.test(wgsl) &&
        /\$\{PCG_HASH_WGSL\}/.test(wgsl);
    if (!facts.wgslSplicesTwin) violations.push("(2) aurora.wgsl.ts does not SPLICE the shared PCG_HASH_WGSL leaf (it must import + interpolate ${PCG_HASH_WGSL}, not re-author the hash inline)");

    // NEITHER shader re-authors the chunk-owned hash inline (the two-copy divergence).
    // The PCG2D LCG-increment 1013904223u + the gnoise fn signature are the canaries: a
    // re-authored inline pcg2d carries the increment; a re-authored gnoise body re-defines
    // the fn. The shaders SPLICE — so the increment/body appears ONLY through the chunk
    // interpolation (the comment-stripped source has the splice site, not a literal body).
    facts.noReauthoredHashFrag =
        !!frag && !/1013904223u/.test(frag) && !/F2\s*=\s*0\.36602540378443864676/.test(frag);
    if (!facts.noReauthoredHashFrag) violations.push("(2) aurora.frag.ts RE-AUTHORS a chunk-owned PCG/simplex literal inline (the 1013904223u LCG increment or the F2 simplex skew) — the AV.W1 two-copy divergence");

    facts.noReauthoredHashWgsl =
        !!wgsl && !/1013904223u/.test(wgsl) && !/F2\s*=\s*0\.36602540378443864676/.test(wgsl);
    if (!facts.noReauthoredHashWgsl) violations.push("(2) aurora.wgsl.ts RE-AUTHORS a chunk-owned PCG/simplex literal inline (the 1013904223u LCG increment or the F2 simplex skew) — the AV.W1 two-copy divergence");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-noise-hash-equivalence", facts, violations });

    console.log("proof:aurora-noise-hash-equivalence — the PCG2D hash + simplex gradient-noise GLSL/WGSL twins match to 1e-6 (AX.W12)");
    console.log(`  (1) numeric 1e-6 (spec)    : ${facts.numericEquivalent ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) chunk exports twins    : ${facts.chunkExportsTwins ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) frag splices the twin  : ${facts.fragSplicesTwin ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) wgsl splices the twin  : ${facts.wgslSplicesTwin ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) no inline hash (frag)  : ${facts.noReauthoredHashFrag ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) no inline hash (wgsl)  : ${facts.noReauthoredHashWgsl ? "yes ✓" : "NO ✗"}`);
    if (!specGreen) console.log("\n--- vitest tail ---\n" + output.split("\n").slice(-25).join("\n"));
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
