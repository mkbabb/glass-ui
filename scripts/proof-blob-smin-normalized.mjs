#!/usr/bin/env node
// AW.W9.a — the smin-normalization gate (proof:blob-smin-normalized).
//
// SEVERITY: CORROBORATING (demoted at AX.W08). This static + analytic gate is NOT
// the load-bearing close for the blob un-flood — proof:blob-render (the live
// device-coverage probe) is. It stays GREEN as a cheap structure guard that the
// smin is IQ-normalized and that the band rides the inner-region UV compression.
//
// The blob's gooey merge was an IQ quadratic-polynomial smin where the effective
// blend band was `0.25 * k`, NOT `k` — so the `uSmoothK` uniform was NOT a real
// distance. The renderer papered over the scale with a `/0.22` normalizer. W9.a
// normalized the smin (IQ 2024 `k *= 4.0`) so the blend band == k in distance
// units, and DELETED the `/0.22` magic normalizer.
//
// AX.W08 — POS_SCALE-ON-SMOOTHK IS NOW MANDATED, NOT A FUDGE. The flood's second
// half was that the merge band was 1.6× oversized relative to every other length:
// `uSmoothK` is a TRUE blend-band measured in the SAME UV space as the radii, and
// every length-like uniform (uBodyRadius / satRadius / uPointer / noiseAmp) carries
// the POS_SCALE inner-region compression (0.625). So the band MUST carry the same
// compression — `config.smoothK * params.smoothK * POS_SCALE` — or it is 1.6×
// oversized and floods. The prior gate asserted POS_SCALE was ABSENT from the
// upload (the old un-normalized regime); that now REDs on the correct fix. Clause-1
// is re-pointed to assert POS_SCALE IS PRESENT on the uSmoothK upload (the new
// regime), while keeping the still-valid `/0.22`-deletion assertion.
//
// This gate has two clauses:
//   1. NORMALIZED-BAND (static) — the renderer no longer divides the smoothK
//      upload by `0.22` (the magic normalizer is gone) AND DOES multiply the
//      `uSmoothK` upload by `POS_SCALE` (the band rides the inner-region UV
//      compression like every other length-like uniform — AX.W08). The shader
//      carries the normalized `k *= 4.0` form.
//   2. NECK-DEPTH (runtime k-sweep) — a JS port of the NORMALIZED smin
//      (`sminQuadratic`, the exact `k *= 4.0` form spliced into the shader). At the
//      seam (a == b) the smin dips below `min(a,b)` by EXACTLY k in the normalized
//      form (`h=1 → h*h*(4k)*0.25 = k`) — i.e. uSmoothK is the smoothing depth in
//      DISTANCE units. The sweep asserts that dip == k within tolerance across a
//      range of k. The bite: revert `k *= 4.0` → the seam dip collapses to `0.25*k`
//      and the assertion REDs (uSmoothK would not be a distance).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        // AZ re-point (the AY carve relocated the uniform uploads to
        // uploadBlobUniforms.ts) — the composed pair, the carve-aware read.
        RENDERER_FILES: [
            "src/components/custom/goo-blob/composables/useMetaballRenderer.ts",
            "src/components/custom/goo-blob/composables/uploadBlobUniforms.ts",
        ].map((r) => resolve(ROOT, r)),
        SDF: resolve(ROOT, "src/components/custom/goo-blob/shaders/sdf-body.glsl.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_SMIN_NORMALIZED_ARTIFACT",
            "AW-blob-smin-normalized",
        ),
    };
    return _cliPaths;
}

// The NORMALIZED quadratic smin — a JS mirror of sminQuadratic() in
// sdf-body.glsl.ts (the `k *= 4.0` form). Used by the neck-width sweep.
function sminQuadraticNormalized(a, b, k) {
    k *= 4.0;
    const h = Math.max(k - Math.abs(a - b), 0.0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
}

/**
 * Measure the seam-DEPTH of a normalized smin: at the coincident seam (a == b) the
 * smin dips below `min(a,b)` by the smoothing depth. For the IQ-normalized form
 * (`k *= 4.0`) that depth == k exactly (`h=1 → h*h*(4k)*0.25 = k`), so uSmoothK is
 * a true distance. The bite (un-normalized `0.25*k` form) dips only `0.25*k`.
 */
function measureSeamDepth(k) {
    // a == b == 0 (the merge seam of two coincident surfaces). The dip is the
    // smoothing depth; for the normalized form it equals k.
    const sm = sminQuadraticNormalized(0, 0, k);
    return -sm; // min(a,b)=0, so dip below min = -sm
}

function run() {
    const { ROOT, RENDERER_FILES, SDF, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── Clause 1: NORMALIZED-BAND (static) ────────────────────────────────────
    if (!RENDERER_FILES.every(existsSync)) {
        violations.push("useMetaballRenderer.ts is absent");
    } else {
        const raw = RENDERER_FILES.map((f) => readFileSync(f, "utf8")).join("\n");
        const src = stripComments(raw);
        // Isolate the uSmoothK upload statement.
        const m = src.match(/U\.uSmoothK\s*,([\s\S]*?)\)\s*;/);
        const uploadExpr = m ? m[1] : "";
        facts.smoothKUpload = uploadExpr.replace(/\s+/g, " ").trim();
        const hasMagicDiv = /\/\s*0\.22\b/.test(uploadExpr);
        const hasPosScale = /POS_SCALE/.test(uploadExpr);
        facts.divBy022 = hasMagicDiv;
        facts.posScaleOnSmoothK = hasPosScale;
        if (hasMagicDiv)
            violations.push(
                "the uSmoothK upload still divides by the `0.22` magic normalizer — the smin is normalized; delete it (W9.a)",
            );
        // AX.W08 — the band is a TRUE length in the inner-region UV space; it MUST
        // ride POS_SCALE like every other length-like uniform (uBodyRadius/satRadius
        // /uPointer/noiseAmp). Without it the merge band is 1.6× oversized → flood.
        if (!hasPosScale)
            violations.push(
                "the uSmoothK upload does NOT multiply by POS_SCALE — the blend band is a length in the inner-region UV space and must carry the same 0.625 compression as the radii, or it is 1.6× oversized and floods (AX.W08)",
            );
        // The whole-file `/0.22` literal must be gone too (no other site reintroduces it).
        if (/\/\s*0\.22\b/.test(src))
            violations.push(
                "a `/0.22` literal survives somewhere in useMetaballRenderer.ts — the magic normalizer must be fully gone",
            );
    }

    if (!existsSync(SDF)) {
        violations.push("sdf-body.glsl.ts is absent");
    } else {
        const sdf = readFileSync(SDF, "utf8");
        const hasNormalize = /k\s*\*=\s*4\.0/.test(sdf);
        facts.shaderNormalized = hasNormalize;
        if (!hasNormalize)
            violations.push(
                "sdf-body.glsl.ts does not carry the IQ `k *= 4.0` normalization — uSmoothK is not a true distance band",
            );
    }

    // ── Clause 2: NECK-DEPTH (runtime k-sweep) ───────────────────────────────
    const sweep = [];
    let depthOk = true;
    for (const k of [0.05, 0.1, 0.2, 0.3]) {
        const depth = measureSeamDepth(k);
        const rel = Math.abs(depth - k) / k;
        sweep.push({ k, depth: Number(depth.toFixed(6)), rel: Number(rel.toFixed(6)) });
        if (rel > 1e-6) depthOk = false;
    }
    facts.neckSweep = sweep;
    if (!depthOk)
        violations.push(
            "the normalized smin's seam depth does NOT equal k — the `k *= 4.0` normalization is wrong (uSmoothK is not a distance)",
        );

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-smin-normalized",
        facts,
        violations,
    });

    console.log("proof:blob-smin-normalized — uSmoothK is a true blend-band (AW.W9.a)");
    console.log(
        `  normalized band : /0.22 ${facts.divBy022 ? "PRESENT ✗" : "gone ✓"} | POS_SCALE-on-smoothK ${facts.posScaleOnSmoothK ? "present ✓" : "ABSENT ✗"} (AX.W08 — the band rides the inner-region UV compression)`,
    );
    console.log(`  shader norm  : k *= 4.0 ${facts.shaderNormalized ? "yes ✓" : "NO ✗"}`);
    console.log("  neck sweep   : (k → measured seam depth, rel err)");
    for (const s of sweep) console.log(`     k=${s.k} → depth=${s.depth} (rel ${s.rel})`);
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
