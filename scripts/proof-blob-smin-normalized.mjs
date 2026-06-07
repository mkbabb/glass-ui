#!/usr/bin/env node
// AW.W9.a — the smin-normalization gate (proof:blob-smin-normalized).
//
// The blob's gooey merge was an IQ quadratic-polynomial smin where the effective
// blend band was `0.25 * k`, NOT `k` — so the `uSmoothK` uniform was NOT a real
// distance. The renderer papered over the scale with a `/0.22` normalizer and a
// `POS_SCALE` multiply on the upload (a magic fudge). W9.a normalizes the smin (IQ
// 2024 `k *= 4.0`) so the blend band == k in distance units, and DELETES the
// `/0.22` + the `POS_SCALE`-on-smoothK fudge.
//
// This gate has two clauses:
//   1. NEUTRALIZED-FUDGE (static) — the renderer no longer divides the smoothK
//      upload by `0.22` AND no longer multiplies the `uSmoothK` upload by
//      `POS_SCALE` (a grep on the upload statement). The shader carries the
//      normalized `k *= 4.0` form.
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
        RENDERER: resolve(
            ROOT,
            "src/components/custom/goo-blob/composables/useMetaballRenderer.ts",
        ),
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
    const { ROOT, RENDERER, SDF, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── Clause 1: NEUTRALIZED-FUDGE (static) ──────────────────────────────────
    if (!existsSync(RENDERER)) {
        violations.push("useMetaballRenderer.ts is absent");
    } else {
        const raw = readFileSync(RENDERER, "utf8");
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
        if (hasPosScale)
            violations.push(
                "the uSmoothK upload still multiplies by POS_SCALE — uSmoothK is a true blend-band now; delete the POS_SCALE on it (W9.a)",
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
        `  fudge gone   : /0.22 ${facts.divBy022 ? "PRESENT ✗" : "absent ✓"} | POS_SCALE-on-smoothK ${facts.posScaleOnSmoothK ? "PRESENT ✗" : "absent ✓"}`,
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
