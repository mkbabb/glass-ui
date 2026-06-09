#!/usr/bin/env node
// AW.W10 — the blob-interaction PRM + frame-rate-independence gate
// (proof:blob-interaction-prm).
//
// The W10 interaction (spring follow, decaying trail, velocity squash, click
// impulse) must (a) collapse to no-op/instant under prefers-reduced-motion via the
// SUBSTRATE's single rAF (NO parallel matchMedia/rAF), (b) be frame-rate
// independent, and (c) carry no orphaned substrate (the demo story drives it).
// This gate folds the PLAN's three discriminating assertions as named sub-checks:
//
//   1. volume-preserve — the perpendicular squash factor == 1/sa EXACTLY (area
//      conserved). The shader stretches the motion axis by /sa and the perp by *sa,
//      so the area scale is (1/sa)*sa == 1. Bite: replace the perp *sa with a
//      (1 - amt) form → the area-conservation assertion REDs (the blob shrinks).
//   2. framerate-damp — NO fixed-per-frame constant-α lerp remains in the blob
//      interaction tree (`SMOOTH_FACTOR`/`* 0.12`-style). Every easing is the
//      dt-fed SpringProgress / an exp(-λdt) damp. Runtime: the spring settle
//      matches across simulated 60/120 Hz dt.
//   3. trail-fixed-array — uTrail is a COMPILE-TIME-SIZED array (uTrail[TRAIL_N],
//      a #define) with a DYNAMIC break, never a uniform-sized array. Bite: make
//      TRAIL_N a uniform → the grep assertion REDs.
//
// Plus: NO second requestAnimationFrame in the blob tree (the substrate owns the
// loop); NO matchMedia in the interaction layer (the substrate owns PRM); the
// renderer composes a rest pose under PRM; the demo story binds the shipped props.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SpringProgress } from "@mkbabb/keyframes.js";
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
    const BLOB = resolve(ROOT, "src/components/custom/goo-blob");
    _cliPaths = {
        ROOT,
        BLOB,
        FRAG: resolve(BLOB, "shaders/metaball.frag.ts"),
        POINTER: resolve(BLOB, "composables/useBlobPointer.ts"),
        RENDERER: resolve(BLOB, "composables/useMetaballRenderer.ts"),
        // AY.W-BLOB2 — the AX IA consolidation folded the interaction story into the ONE
        // `substrates/blob.vue` page (the prior `blob-interaction.vue` is gone — the stale
        // path REDded this gate). `blob.vue` drives the shipped interaction (the
        // pointerAttraction/stretch sliders + the click impulse) on its interaction hero.
        STORY: resolve(ROOT, "demo/stories/substrates/blob.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_INTERACTION_PRM_ARTIFACT",
            "AW-blob-interaction-prm",
        ),
    };
    return _cliPaths;
}

/** Walk the blob tree's .ts/.vue runtime sources (no tests). */
function walk(dir, acc = []) {
    for (const n of readdirSync(dir)) {
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|vue)$/.test(n) && !/\.(test|spec)\.ts$/.test(n)) acc.push(p);
    }
    return acc;
}

function run() {
    const { ROOT, BLOB, FRAG, POINTER, RENDERER, STORY, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const frag = existsSync(FRAG) ? readFileSync(FRAG, "utf8") : "";
    const blobFiles = existsSync(BLOB) ? walk(BLOB) : [];

    // ── Sub-check 1: VOLUME-PRESERVE (static) ────────────────────────────────
    const axisOverSa = /dot\(uv, ax\) \/ sa/.test(frag);
    const perpTimesSa = /dot\(uv, perp\) \* sa/.test(frag);
    facts.volumePreserve = { axisOverSa, perpTimesSa };
    if (!(axisOverSa && perpTimesSa))
        violations.push(
            "the squash is NOT volume-preserving — the motion axis must scale by /sa AND the perpendicular by *sa (area == 1); a `1 - amt` perp form loses area (the blob shrinks at speed)",
        );

    // ── Sub-check 2: FRAMERATE-DAMP (static + runtime) ──────────────────────
    // No constant-α lerp survives in the blob interaction tree. Scope to the JS/TS
    // INTERACTION composables — the GLSL shader (.frag.ts/.glsl.ts) is stateless
    // per-fragment (NOT framerate-integrated), so its `+= (a-b)*0.3` SDF
    // expressions are not framerate lerps.
    const lerpOffenders = [];
    for (const f of blobFiles) {
        if (/\.(frag|glsl)\.ts$/.test(f)) continue; // shaders are not integrated state
        const src = stripComments(readFileSync(f, "utf8"));
        if (/SMOOTH_FACTOR/.test(src)) lerpOffenders.push(`${rel(ROOT, f)}: SMOOTH_FACTOR`);
        // a `x += (target - x) * 0.NN` fixed-α lerp pattern
        if (/\+=\s*\([^)]*-[^)]*\)\s*\*\s*0\.\d+/.test(src))
            lerpOffenders.push(`${rel(ROOT, f)}: fixed-α lerp`);
    }
    facts.lerpOffenders = lerpOffenders;
    if (lerpOffenders.length)
        violations.push(
            `a fixed-per-frame constant-α lerp survives in the blob interaction tree (${lerpOffenders.join("; ")}) — every easing must be the dt-fed SpringProgress / exp(-λdt)`,
        );

    // Runtime frame-rate independence: the SpringProgress settle matches across
    // 60/120 Hz dt (the seam the pointer machine consumes).
    {
        const opts = { from: 0, to: 0, response: 0.18, dampingFraction: 1.0 };
        const a = new SpringProgress(opts);
        const b = new SpringProgress(opts);
        a.target = 1;
        b.target = 1;
        for (let i = 0; i < 120; i++) a.tick(1 / 120);
        for (let i = 0; i < 60; i++) b.tick(1 / 60);
        const delta = Math.abs(a.value - b.value);
        facts.framerateDelta = Number(delta.toExponential(3));
        if (delta > 1e-3)
            violations.push(
                `the spring settle DIVERGES across 60/120 Hz dt (delta ${delta.toExponential(2)} > 1e-3) — the integration is not frame-rate independent`,
            );
    }

    // ── Sub-check 3: TRAIL-FIXED-ARRAY (static) ─────────────────────────────
    const trailDefine = /#define TRAIL_N \d+/.test(frag);
    const trailArray = /uniform vec2 uTrailPos\[TRAIL_N\]/.test(frag);
    const trailDynBreak =
        /for \(int i = 0; i < TRAIL_N; i\+\+\) \{\s*if \(i >= uTrailCount\) break;/.test(frag);
    const trailIsUniform = /uniform\s+int\s+TRAIL_N/.test(frag);
    facts.trail = { trailDefine, trailArray, trailDynBreak, trailIsUniform };
    if (!trailDefine || !trailArray)
        violations.push(
            "uTrail is not a COMPILE-TIME-SIZED array (uTrail[TRAIL_N] over a #define) — GLSL ES 3.00 forbids a dynamically-sized array",
        );
    if (!trailDynBreak)
        violations.push(
            "the trail loop lacks the DYNAMIC break (`if (i >= uTrailCount) break;`) — it must mirror the satellite loop",
        );
    if (trailIsUniform)
        violations.push("TRAIL_N is a uniform — it must be a compile-time #define");

    // ── PRM + single-loop discipline (static) ───────────────────────────────
    // No second requestAnimationFrame anywhere in the blob tree.
    const rafOffenders = [];
    const mmOffenders = [];
    for (const f of blobFiles) {
        const src = stripComments(readFileSync(f, "utf8"));
        if (/requestAnimationFrame/.test(src)) rafOffenders.push(rel(ROOT, f));
        if (/matchMedia/.test(src)) mmOffenders.push(rel(ROOT, f));
    }
    facts.rafOffenders = rafOffenders;
    facts.matchMediaOffenders = mmOffenders;
    if (rafOffenders.length)
        violations.push(
            `a second requestAnimationFrame exists in the blob tree (${rafOffenders.join(", ")}) — the substrate owns the single rAF`,
        );
    if (mmOffenders.length)
        violations.push(
            `a matchMedia listener exists in the blob interaction tree (${mmOffenders.join(", ")}) — the substrate owns PRM (the AV.W7-removed anti-pattern)`,
        );

    // The renderer composes a rest pose under PRM (reads the substrate's reducedMotion).
    if (existsSync(RENDERER)) {
        const r = stripComments(readFileSync(RENDERER, "utf8"));
        facts.restPoseUnderPrm = /reducedMotion/.test(r) && /\.rest\(\)/.test(r);
        if (!facts.restPoseUnderPrm)
            violations.push(
                "the renderer does not compose a rest pose under the substrate's reducedMotion (it must call pointer.rest() on the static frame)",
            );
    } else {
        violations.push("useMetaballRenderer.ts is absent");
    }

    // The pointer machine clamps the first post-park dt.
    if (existsSync(POINTER)) {
        const raw = readFileSync(POINTER, "utf8");
        const p = stripComments(raw); // a `.play(` mention in a doc comment is allowed
        facts.firstDtClamp = /Math\.min\(dtMs, 50\)/.test(p);
        facts.springProgress = /SpringProgress/.test(p) && !/\.play\(/.test(p);
        if (!facts.firstDtClamp)
            violations.push(
                "the pointer spring does not clamp the first post-park dt to ~50ms — a seconds-long re-arm dt JUMPS the spring",
            );
        if (!facts.springProgress)
            violations.push(
                "the pointer machine does not consume SpringProgress via its dt-fed tick (or calls .play(), which starts a parallel rAF)",
            );
    } else {
        violations.push("useBlobPointer.ts is absent");
    }

    // ── No-orphan: the demo story binds the shipped interaction props ────────
    if (existsSync(STORY)) {
        const story = readFileSync(STORY, "utf8");
        const bindsAttraction = /pointerAttraction/.test(story);
        const bindsStretch = /stretch/.test(story);
        const firesImpulse = /\.pulse\(\)|@click/.test(story);
        facts.story = { bindsAttraction, bindsStretch, firesImpulse };
        if (!(bindsAttraction && bindsStretch && firesImpulse))
            violations.push(
                "the demo story does not drive the shipped interaction (pointerAttraction + stretch + the click impulse) — no orphaned substrate",
            );
    } else {
        violations.push("the demo story demo/stories/substrates/blob-interaction.vue is absent");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-interaction-prm",
        facts,
        violations,
    });

    console.log("proof:blob-interaction-prm — PRM no-op + frame-rate indep + no-orphan (AW.W10)");
    console.log(
        `  volume-preserve : axis/sa ${facts.volumePreserve.axisOverSa ? "✓" : "✗"} perp*sa ${facts.volumePreserve.perpTimesSa ? "✓" : "✗"}`,
    );
    console.log(
        `  framerate-damp  : no constant-α lerp ${lerpOffenders.length ? "✗" : "✓"} | 60/120Hz delta ${facts.framerateDelta}`,
    );
    console.log(
        `  trail-fixed-arr : #define ${facts.trail.trailDefine ? "✓" : "✗"} array ${facts.trail.trailArray ? "✓" : "✗"} dyn-break ${facts.trail.trailDynBreak ? "✓" : "✗"} (uniform? ${facts.trail.trailIsUniform ? "YES ✗" : "no ✓"})`,
    );
    console.log(
        `  single loop     : extra rAF ${rafOffenders.length ? "✗" : "✓"} | matchMedia ${mmOffenders.length ? "✗" : "✓"} | rest-pose ${facts.restPoseUnderPrm ? "✓" : "✗"} | first-dt clamp ${facts.firstDtClamp ? "✓" : "✗"}`,
    );
    console.log(`  demo drives     : ${facts.story ? JSON.stringify(facts.story) : "STORY ABSENT"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

function rel(root, p) {
    return p.slice(root.length + 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
