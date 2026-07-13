#!/usr/bin/env node
// AW.W9.b — the specular/rim premultiply-order gate (proof:blob-spec-premult).
//
// The lit terms (Blinn-Phong warm-cream glint + Fresnel rim) are added in LINEAR
// space STRICTLY between the OKLCh→linear resolve and the single OETF
// (`linearToSrgb`), and the `* alpha` premultiply stays LAST on the straight-alpha
// gamma triple. A post-OETF add double-gammas the highlight and fringes the
// premultiplied edge (the named A5/A2 darkening trap). The blob context is
// `premultipliedAlpha: true` + `antialias: false`, so the premultiply-last
// discipline is correct against the real context attr — both stay UNTOUCHED.
//
// Clauses (assembled-shader parse + renderer attr read):
//   1. LIT-BEFORE-OETF — the lit add (`lin += highlight`) precedes `linearToSrgb(`
//      in the assembled METABALL_FRAGMENT_SRC. Bite: move the add after the OETF →
//      REDs.
//   2. PREMULT-LAST — the `* alpha` premultiply (`rgb * alpha`) is the LAST color
//      op, after the OETF. Bite: premultiply before the OETF → REDs.
//   3. CONTEXT-ATTRS-INTACT — useMetaballRenderer.ts still creates the context with
//      `premultipliedAlpha: true` + `antialias: false`. Bite: flip either → REDs.

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
        RENDERER: resolve(
            ROOT,
            "src/components/custom/blob/composables/useMetaballRenderer.ts",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_SPEC_PREMULT_ARTIFACT",
            "AW-blob-spec-premult",
        ),
    };
    return _cliPaths;
}

// The three load-bearing tokens (`lin += highlight`, `linearToSrgb(`, `rgb *
// alpha`) all live in the SAME final `/* glsl */` template block of
// metaball.frag.ts, so SOURCE order within that file IS the assembled order for
// them — no dist round-trip needed. Read the source directly (the gate is then a
// pure read, build-independent).
function loadShaderSource(ROOT) {
    const frag = resolve(ROOT, "src/components/custom/blob/shaders/metaball.frag.ts");
    if (!existsSync(frag)) return null;
    return readFileSync(frag, "utf8");
}

async function run() {
    const { ROOT, RENDERER, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const shader = loadShaderSource(ROOT);
    if (!shader) {
        violations.push("metaball.frag.ts is absent — cannot parse the lit/OETF/premult order");
    } else {
        const idxLit = shader.indexOf("lin += highlight");
        // Match the OETF CALL site in main() (`linearToSrgb(lin)`), NOT the OETF
        // function DEFINITION spliced earlier from the shared chunk.
        const idxOetf = shader.indexOf("linearToSrgb(lin)");
        const idxPremult = shader.indexOf("rgb * alpha");
        facts.idxLit = idxLit;
        facts.idxOetf = idxOetf;
        facts.idxPremult = idxPremult;

        if (idxLit === -1)
            violations.push("the lit add `lin += highlight` is absent from the assembled shader");
        if (idxOetf === -1)
            violations.push("the OETF `linearToSrgb(` is absent — the seam is not closed");
        if (idxPremult === -1)
            violations.push("the `rgb * alpha` premultiply is absent");

        // Clause 1: lit add precedes the OETF.
        if (idxLit !== -1 && idxOetf !== -1 && idxLit >= idxOetf)
            violations.push(
                "the lit terms are added AFTER the OETF (linearToSrgb) — they must enter `rgb` in LINEAR space before the OETF (the A5/A2 double-gamma trap)",
            );
        // Clause 2: premultiply is last (after the OETF).
        if (idxOetf !== -1 && idxPremult !== -1 && idxPremult <= idxOetf)
            violations.push(
                "the `* alpha` premultiply precedes the OETF — it must stay LAST on the straight-alpha gamma triple",
            );
        // And the lit add precedes the premultiply.
        if (idxLit !== -1 && idxPremult !== -1 && idxLit >= idxPremult)
            violations.push(
                "the lit terms are added AFTER the `* alpha` premultiply — they must enter `rgb` before the premultiply",
            );
    }

    // Clause 3: context attrs intact.
    if (!existsSync(RENDERER)) {
        violations.push("useMetaballRenderer.ts is absent");
    } else {
        const r = readFileSync(RENDERER, "utf8");
        const premultTrue = /premultipliedAlpha:\s*true/.test(r);
        const aaFalse = /antialias:\s*false/.test(r);
        facts.premultipliedAlphaTrue = premultTrue;
        facts.antialiasFalse = aaFalse;
        if (!premultTrue)
            violations.push(
                "the blob context is no longer created with `premultipliedAlpha: true` — the premultiply-last discipline depends on it (W9.b confirms it UNCHANGED)",
            );
        if (!aaFalse)
            violations.push(
                "the blob context is no longer created with `antialias: false` — the SDF fwidth AA owns the edge (W9.b confirms it UNCHANGED)",
            );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-spec-premult",
        facts,
        violations,
    });

    console.log("proof:blob-spec-premult — lit terms linear-before-OETF, premult last (AW.W9.b)");
    console.log(
        `  order        : lit(${facts.idxLit}) < OETF(${facts.idxOetf}) < premult(${facts.idxPremult})`,
    );
    console.log(
        `  context attrs: premultipliedAlpha:true ${facts.premultipliedAlphaTrue ? "✓" : "✗"} | antialias:false ${facts.antialiasFalse ? "✓" : "✗"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
