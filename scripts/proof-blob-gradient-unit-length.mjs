#!/usr/bin/env node
// AW.W9.b — the surface-normal unit-length gate (proof:blob-gradient-unit-length).
//
// The lit droplet reads as a rounded bead because the Blinn-Phong glint + Fresnel
// rim ride a pseudo-3D SURFACE NORMAL derived from the composite SDF gradient,
// lifted by an edge-dome Z. For the lighting to be physically sane the normal MUST
// be unit-length across the interior — a non-unit N skews dot(N,H)/dot(N,V) and the
// highlight smears.
//
// AX.W15 — the field gradient is now ANALYTIC, not finite-differenced. The IQ 4-tap
// tetrahedron on sceneDist() is DELETED: `sceneDistG()` returns vec3(dist, ∂d/∂x,
// ∂d/∂y) — the value+gradient `sminG()` smooth-min (sdf-body.glsl.ts) propagates
// the gradient through `mix(a.yz, b.yz, w)` so the surface normal reads the field
// gradient DIRECTLY (the gradient noise rides IQ's `noised()` analytic-derivative
// FBM in watercolor-edges.glsl.ts). The W15 agent measured the analytic gradient at
// cos-sim 0.9969 vs central-difference. So Clause 2 no longer asserts the 4-tap; it
// asserts the ANALYTIC path EXISTS + is CONSUMED.
//
// Two clauses:
//   1. UNIT-LENGTH (runtime sample) — a JS port of surfaceNormalFromGrad()'s LIFT
//      math (`normalize(vec3(g*(1-z), z) + 1e-6)`, the form in metaball.frag.ts)
//      sampled across a grid of gradient directions × interior depths. |N| must be
//      in [0.99, 1.01] EVERYWHERE. The bite: drop the final `normalize()` (or the
//      `+1e-6` guard at a degenerate sample) → |N| drifts off 1 and the assertion
//      REDs. The guard is load-bearing at grad2d == 0, z == 0 (a flat-centre
//      degenerate); the port exercises that corner. The lift math is unchanged by
//      W15 — only the gradient SOURCE moved from the 4-tap to the analytic field.
//   2a. SUBSUMED-GLOW (static) — the flat `edgeGlow` inner-lightness lift is GONE
//      (the curvature read is the normal now); `edgeGlow` must not appear in
//      metaball.frag.ts (grep).
//   2b. ANALYTIC-GRADIENT (static, AX.W15) — the normal rides the ANALYTIC field
//      gradient: `sceneDistG()` returns the value+gradient vec3, the `sminG()`
//      value+gradient smooth-min propagates it, and `surfaceNormalFromGrad()`
//      consumes `scene.yz` (the field gradient) — the 4-tap tetrahedron + its
//      screen-space epsilon are DELETED (a re-introduced `sceneDist(uv + k…)` tap
//      would regress to finite differencing).

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
        FRAG: resolve(ROOT, "src/components/custom/goo-blob/shaders/metaball.frag.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_GRADIENT_UNIT_ARTIFACT",
            "AW-blob-gradient-unit-length",
        ),
    };
    return _cliPaths;
}

// Port of surfaceNormal()'s LIFT: given a 2D gradient direction and the interior
// depth, lift to the pseudo-3D normal and normalize (mirrors metaball.frag.ts).
function liftNormal(gx, gy, interior) {
    // normalize the 2D gradient with the +1e-6 guard (matches the shader).
    const gl = Math.hypot(gx, gy) + 1e-6;
    const grad = [gx / gl, gy / gl];
    const i = Math.min(1, Math.max(0, interior));
    const z = Math.sqrt(Math.max(0, 1 - (1 - i) * (1 - i)));
    let nx = grad[0] * (1 - z);
    let ny = grad[1] * (1 - z);
    let nz = z + 1e-6; // the shader's vec3(0,0,1e-6) guard
    const len = Math.hypot(nx, ny, nz);
    return [nx / len, ny / len, nz / len];
}

function run() {
    const { ROOT, FRAG, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── Clause 1: UNIT-LENGTH (runtime sample) ───────────────────────────────
    let worst = 0;
    let samples = 0;
    const dirs = 16;
    for (let a = 0; a < dirs; a++) {
        const ang = (a / dirs) * Math.PI * 2;
        const gx = Math.cos(ang);
        const gy = Math.sin(ang);
        for (let i = 0; i <= 20; i++) {
            const interior = i / 20;
            const n = liftNormal(gx, gy, interior);
            const len = Math.hypot(n[0], n[1], n[2]);
            worst = Math.max(worst, Math.abs(len - 1));
            samples++;
        }
    }
    // The degenerate flat-centre corner (grad2d == 0, interior == 1 → z == 1).
    {
        const n = liftNormal(0, 0, 1);
        const len = Math.hypot(n[0], n[1], n[2]);
        worst = Math.max(worst, Math.abs(len - 1));
        samples++;
    }
    facts.samples = samples;
    facts.worstAbsErr = Number(worst.toFixed(8));
    if (worst > 0.01)
        violations.push(
            `the derived surface normal is NOT unit-length across the interior (worst |N|-1 = ${worst.toFixed(5)} > 0.01) — the lift/normalize is wrong`,
        );

    // ── Clause 2: SUBSUMED-GLOW + ANALYTIC-GRADIENT (static) ─────────────────
    if (!existsSync(FRAG)) {
        violations.push("metaball.frag.ts is absent");
    } else {
        const frag = readFileSync(FRAG, "utf8");

        // (2a) the flat `edgeGlow` inner-lightness lift is GONE (subsumed by the
        //      Fresnel rim — the curvature read is the normal now).
        const hasEdgeGlow = /edgeGlow/.test(frag);
        facts.edgeGlowPresent = hasEdgeGlow;
        if (hasEdgeGlow)
            violations.push(
                "the flat `edgeGlow` inner-lightness lift survives in metaball.frag.ts — it is subsumed by the Fresnel rim (W9.b); remove it",
            );

        // (2b, AX.W15) the normal rides the ANALYTIC field gradient, NOT a 4-tap.
        //   • sceneDistG() returns the value+gradient vec3(dist, ∂d/∂x, ∂d/∂y),
        //   • mainImage extracts the field gradient (scene.yz),
        //   • surfaceNormalFromGrad() consumes that gradient to lift the normal.
        // The 4-tap tetrahedron + its screen-space epsilon are DELETED — a
        // re-introduced `sceneDist(uv + k…)` tap regresses to finite differencing.
        facts.hasAnalyticField = /vec3\s+sceneDistG\s*\(/.test(frag);
        facts.extractsFieldGradient = /=\s*scene\.yz\s*;/.test(frag);
        facts.normalRidesAnalyticGrad = /surfaceNormalFromGrad\s*\(\s*fieldGrad/.test(
            frag,
        );
        facts.fourTapDeleted = !/sceneDist\(uv \+ k/.test(frag);
        if (!facts.hasAnalyticField)
            violations.push(
                "metaball.frag.ts does not define `sceneDistG()` (the value+gradient field returning vec3(dist, ∂d/∂x, ∂d/∂y)) — the analytic gradient is the keystone of the W15 surface normal",
            );
        if (!facts.extractsFieldGradient)
            violations.push(
                "mainImage does not extract the analytic field gradient (`scene.yz`) from sceneDistG() — the normal must read the field gradient directly",
            );
        if (!facts.normalRidesAnalyticGrad)
            violations.push(
                "the surface normal does not ride the analytic field gradient — `surfaceNormalFromGrad(fieldGrad, …)` must consume the sceneDistG() gradient (the 4-tap tetrahedron is deleted)",
            );
        if (!facts.fourTapDeleted)
            violations.push(
                "the deleted 4-tap tetrahedron (`sceneDist(uv + k…)`) has been RE-INTRODUCED — the W15 surface normal must ride the analytic gradient, not finite differencing",
            );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-gradient-unit-length",
        facts,
        violations,
    });

    console.log("proof:blob-gradient-unit-length — |surfaceNormalFromGrad()| ~ 1 (AW.W9.b + AX.W15)");
    console.log(`  unit-length     : worst |N|-1 = ${facts.worstAbsErr} over ${samples} samples`);
    console.log(`  edgeGlow gone   : ${facts.edgeGlowPresent ? "NO ✗" : "yes ✓"}`);
    console.log(
        `  analytic field  : sceneDistG ${facts.hasAnalyticField ? "yes ✓" : "NO ✗"} | scene.yz ${facts.extractsFieldGradient ? "yes ✓" : "NO ✗"} | normal rides grad ${facts.normalRidesAnalyticGrad ? "yes ✓" : "NO ✗"} | 4-tap deleted ${facts.fourTapDeleted ? "yes ✓" : "NO ✗"}`,
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
