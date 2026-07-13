#!/usr/bin/env node
// AV.W2 — the shared-procedural-color/noise GLSL convergence gate
// (proof:shader-shared-source). Born-RED until BOTH frags are migrated.
//
// The headline of the AV aurora-fix arm: aurora + the goo-blob metaball both need
// the sRGB OETF + the rotated-octave FBM rotation; the blob also needs the four
// Ottosson OKLCh matrices. Authored independently, the OETF DIVERGED — that
// divergence IS the AV.W1 too-dark bug. AV.W1 fixed aurora by COPYING the blob's
// OETF (a two-copy duplication); W2 DELETES the duplication by extracting the
// shared math to ONE chunk both shaders splice. This gate forbids a re-divergence:
// it asserts the chunk is the SINGLE definition and NEITHER frag re-inlines a
// chunk-owned artefact locally.
//
// The gate, comment-strip first (false-witness discipline — the chunk's own
// provenance comments QUOTE the matrix/function names; strip comments before
// matching so a COMMENT mention is not a false-RED):
//   (a) the chunk EXISTS and is the SINGLE home of the OETF function bodies + the
//       four Ottosson `mat3` literals + the FBM_ROT rotation constant.
//   (b) comment-stripped, NEITHER `metaball.frag.ts` NOR `aurora.frag.ts` carries a
//       LOCAL re-definition of the OETF bodies (`float linearToSrgbCh`/`vec3
//       linearToSrgb`/`float srgbToLinearCh`/`vec3 srgbToLinear`), any of the four
//       Ottosson `mat3(...)` literals, or the `mat2(0.8, 0.6, -0.6, 0.8)` rotation
//       literal — each count must be 0 in BOTH frags.
//   (c) both frags REFERENCE the chunk (the splice interpolation `${OETF_GLSL}` /
//       `${FBM_ROT_GLSL}` is present in each `.frag.ts` source; the blob also
//       splices `${OKLCH_MATRICES_GLSL}`).
//
// bite-check: re-inline a `vec3 linearToSrgb(vec3 c)` body into aurora.frag.ts → RED;
// re-inline a `mat3 LINEAR_SRGB_TO_LMS = mat3(...)` literal into metaball.frag.ts → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        CHUNK: resolve(ROOT, "src/composables/glass/webgl/shaders/procedural-color.glsl.ts"),
        METABALL: resolve(ROOT, "src/components/custom/blob/shaders/metaball.frag.ts"),
        AURORA: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.frag.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SHADER_SHARED_SOURCE_ARTIFACT", "AV-shader-shared-source"),
    };
    return _cliPaths;
}

/** Strip block + line comments so a provenance COMMENT mention is never a false-RED. */
export function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

// The chunk-owned GLSL artefacts. Each detector matches the DEFINITION body (not a
// reference): the OETF function signatures, the four Ottosson `mat3` literal
// openers, and the FBM rotation literal.
const OETF_DEFS = [
    /float\s+linearToSrgbCh\s*\(\s*float\s+c\s*\)/,
    /vec3\s+linearToSrgb\s*\(\s*vec3\s+c\s*\)/,
    /float\s+srgbToLinearCh\s*\(\s*float\s+c\s*\)/,
    /vec3\s+srgbToLinear\s*\(\s*vec3\s+c\s*\)/,
];
const MATRIX_DEFS = [
    /mat3\s+LINEAR_SRGB_TO_LMS\s*=\s*mat3\s*\(/,
    /mat3\s+LMS_TO_OKLAB\s*=\s*mat3\s*\(/,
    /mat3\s+OKLAB_TO_LMS\s*=\s*mat3\s*\(/,
    /mat3\s+LMS_TO_LINEAR_SRGB\s*=\s*mat3\s*\(/,
];
const FBM_ROT_LITERAL = /mat2\s*\(\s*0\.8\s*,\s*0\.6\s*,\s*-0\.6\s*,\s*0\.8\s*\)/;

function countLocalDefs(stripped) {
    const oetf = OETF_DEFS.filter((re) => re.test(stripped)).length;
    const matrices = MATRIX_DEFS.filter((re) => re.test(stripped)).length;
    const fbmRot = FBM_ROT_LITERAL.test(stripped) ? 1 : 0;
    return { oetf, matrices, fbmRot, total: oetf + matrices + fbmRot };
}

function run() {
    const { ROOT, CHUNK, METABALL, AURORA, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // (a) the chunk EXISTS and is the SINGLE definition home.
    if (!existsSync(CHUNK)) {
        violations.push("the shared procedural-color chunk is absent at src/composables/glass/webgl/shaders/procedural-color.glsl.ts");
        facts.chunkExists = false;
    } else {
        facts.chunkExists = true;
        const chunk = readFileSync(CHUNK, "utf8");
        const chunkStripped = stripComments(chunk);
        const chunkDefs = countLocalDefs(chunkStripped);
        facts.chunkDefs = chunkDefs;
        facts.chunkExportsOetf = /export const OETF_GLSL/.test(chunk);
        facts.chunkExportsMatrices = /export const OKLCH_MATRICES_GLSL/.test(chunk);
        facts.chunkExportsFbmRot = /export const FBM_ROT_GLSL/.test(chunk);
        if (chunkDefs.oetf < 4) violations.push(`the chunk does not define all four OETF functions (found ${chunkDefs.oetf}/4)`);
        if (chunkDefs.matrices < 4) violations.push(`the chunk does not define all four Ottosson mat3 literals (found ${chunkDefs.matrices}/4)`);
        if (chunkDefs.fbmRot < 1) violations.push("the chunk does not define the FBM_ROT rotation literal");
        if (!facts.chunkExportsOetf) violations.push("the chunk does not export OETF_GLSL");
        if (!facts.chunkExportsMatrices) violations.push("the chunk does not export OKLCH_MATRICES_GLSL");
        if (!facts.chunkExportsFbmRot) violations.push("the chunk does not export FBM_ROT_GLSL");
    }

    // (b) NEITHER frag re-defines a chunk-owned artefact locally (comment-stripped).
    const frags = [
        { id: "metaball", path: METABALL, splices: ["OETF_GLSL", "OKLCH_MATRICES_GLSL", "FBM_ROT_GLSL"] },
        { id: "aurora", path: AURORA, splices: ["OETF_GLSL", "FBM_ROT_GLSL"] },
    ];
    facts.frags = {};
    for (const { id, path, splices } of frags) {
        if (!existsSync(path)) {
            violations.push(`the ${id} frag shader is absent`);
            continue;
        }
        const src = readFileSync(path, "utf8");
        const stripped = stripComments(src);
        const localDefs = countLocalDefs(stripped);
        // (c) the frag references the chunk splices it should carry.
        const splicePresent = {};
        for (const name of splices) splicePresent[name] = src.includes("${" + name + "}");
        facts.frags[id] = { localDefs, splicePresent };

        if (localDefs.oetf > 0) violations.push(`${id}.frag.ts re-defines ${localDefs.oetf} OETF function(s) locally — the chunk is the single OETF source (re-inlined definition is the bite)`);
        if (localDefs.matrices > 0) violations.push(`${id}.frag.ts re-defines ${localDefs.matrices} Ottosson mat3 literal(s) locally — the chunk is the single matrix source`);
        if (localDefs.fbmRot > 0) violations.push(`${id}.frag.ts re-defines the FBM rotation literal locally — the chunk owns FBM_ROT`);
        for (const name of splices) {
            if (!splicePresent[name]) violations.push(`${id}.frag.ts does not splice the chunk's \${${name}} — it must reference the shared source`);
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:shader-shared-source", facts, violations });

    console.log("proof:shader-shared-source — the aurora↔blob shared GLSL convergence (AV.W2)");
    console.log(`  chunk exists          : ${facts.chunkExists ? "yes ✓" : "NO ✗"}`);
    if (facts.chunkDefs) console.log(`  chunk single-source   : OETF ${facts.chunkDefs.oetf}/4 · matrices ${facts.chunkDefs.matrices}/4 · FBM_ROT ${facts.chunkDefs.fbmRot}/1`);
    for (const { id } of frags) {
        const f = facts.frags[id];
        if (!f) continue;
        const d = f.localDefs;
        const spl = Object.entries(f.splicePresent).filter(([, v]) => v).map(([k]) => k).join("+") || "none";
        console.log(`  ${id.padEnd(9)} local-defs : OETF ${d.oetf} · matrices ${d.matrices} · FBM_ROT ${d.fbmRot}   splices: ${spl}`);
    }
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
