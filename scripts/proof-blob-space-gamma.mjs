#!/usr/bin/env node
// AU.W7 — the blob color-space gate (proof:blob-space-gamma, DEC-AT-7).
//
// The DEC-AT-7 seam, asserted per stage. The blob's INPUT color (the injected
// default resolver) is GAMMA sRGB — `defaultBlobColorResolver` resolves through
// `oklchToGammaRgb`, NOT `oklchToLinear` (forcing the linear path without an OETF
// is the A5/A2 darkening defect, the named trap). And the shader's OUTPUT is
// GAMMA: the lift paints gamma directly; the AU.W7 shader-quality stage flips
// `uBaseColor` to LINEAR for perceptually-uniform variation but MUST close the
// seam with a `linearToSrgb()` OETF before output — a linear-in WITHOUT an OETF-out
// ships visibly too-dark. This gate forbids exactly that state.
//
// inv ε / bite-check: pointing the default resolver at `oklchToLinear` reddens the
// input clause; flipping the shader color to linear without adding `linearToSrgb`
// reddens the output clause.

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
        COLOR: resolve(ROOT, "src/composables/color/index.ts"),
        FRAG: resolve(ROOT, "src/components/custom/blob/shaders/metaball.frag.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_BLOB_SPACE_GAMMA_ARTIFACT", "AU-blob-space-gamma"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, COLOR, FRAG, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // INPUT clause — defaultBlobColorResolver resolves through the GAMMA exit.
    if (!existsSync(COLOR)) {
        violations.push("the /color leaf is absent");
    } else {
        const color = readFileSync(COLOR, "utf8");
        const def = color.match(/export const defaultBlobColorResolver[\s\S]{0,200}/);
        const body = def ? def[0] : "";
        facts.resolverUsesGamma = /oklchToGammaRgb/.test(body);
        facts.resolverUsesLinear = /oklchToLinear/.test(body);
        if (!facts.resolverUsesGamma) violations.push("defaultBlobColorResolver does not resolve through `oklchToGammaRgb` (the GAMMA exit)");
        if (facts.resolverUsesLinear) violations.push("defaultBlobColorResolver resolves through `oklchToLinear` — that is the too-dark trap (DEC-AT-7); the blob's faithful lift paints GAMMA");
    }

    // OUTPUT clause — a linear flip of the color MUST close with an OETF.
    if (!existsSync(FRAG)) {
        violations.push("the metaball frag shader is absent");
    } else {
        const frag = readFileSync(FRAG, "utf8");
        // a "to linear" of the base color: an explicit srgb→linear (pow ~2.2 or a named linearize)
        const flipsToLinear = /srgbToLinear|toLinear\b|pow\([^)]*2\.2\)/.test(frag);
        const hasOetf = /linearToSrgb|pow\([^)]*1\.0\s*\/\s*2\.2\)|pow\([^)]*0\.4545/.test(frag);
        facts.flipsToLinear = flipsToLinear;
        facts.hasOetf = hasOetf;
        if (flipsToLinear && !hasOetf) {
            violations.push("the shader flips the color to LINEAR but has NO `linearToSrgb()` OETF before output — it ships too-dark (the DEC-AT-7 #1 must-fix)");
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:blob-space-gamma", facts, violations });

    console.log("proof:blob-space-gamma — the DEC-AT-7 seam, named per stage (AU.W7)");
    console.log(`  resolver → gamma exit : ${facts.resolverUsesGamma ? "yes ✓" : "NO"} (linear: ${facts.resolverUsesLinear ? "PRESENT ✗" : "absent ✓"})`);
    console.log(`  shader linear-flip    : ${facts.flipsToLinear ? "yes" : "no (gamma lift)"} | OETF present: ${facts.hasOetf}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
