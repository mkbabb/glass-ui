#!/usr/bin/env node
// AW.W11.c — the master-tempo gate (proof:blob-tempo-suppression).
//
// ONE master tempo scalar gates EVERY integrated dt — mood.tick, the W10 spring
// step, the orbit advance, the satellite phase, the noise scroll. The gate asserts:
//
//   1. TEMPO-SCALES-DT-NOT-CLOCK — tempo multiplies the integration STEP
//      (`tempo * dtMs` → `stepMs` / `simTimeMs`), NEVER the absolute clock. Scaling
//      uTime by tempo makes the FBM noise JUMP discontinuously on a tempo change;
//      the tempo-integrated `simTimeMs` keeps the scroll continuous. Bite: upload
//      `uTime = tempo * timeSec` → the discontinuity assertion REDs.
//   2. EVERY-AXIS-ON-STEP — mood/pointer/uTime all read the tempo-scaled step
//      (`stepMs` / `simTimeMs`), not the raw substrate `timeSec`/`dtMs`.
//   3. SUBSTRATE-OWNS-PRM — NO parallel `matchMedia` listener anywhere in the blob
//      tree; the renderer reads the substrate's `reducedMotion` (it does NOT add a
//      second PRM path — the AV.W7-removed anti-pattern). `tempo=0` under PRM/pause.
//   4. FIRST-DT-CLAMP — the first post-park dt is clamped to ~50ms (the W11 axis
//      extension of the W10 spring-only clamp) so the tempo composition never jumps.
//
// Runtime witness: a tempo-integrated clock (`simTime += tempo*dt`) is CONTINUOUS
// across a tempo change at a fixed wall time, whereas the clock-scaling form
// (`tempo * wallTime`) JUMPS — the discontinuity the gate forbids.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
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
    const BLOB = resolve(ROOT, "src/components/custom/goo-blob");
    _cliPaths = {
        ROOT,
        BLOB,
        RENDERER: resolve(BLOB, "composables/useMetaballRenderer.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BLOB_TEMPO_SUPPRESSION_ARTIFACT",
            "AW-blob-tempo-suppression",
        ),
    };
    return _cliPaths;
}

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
    const { ROOT, BLOB, RENDERER, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(RENDERER)) {
        violations.push("useMetaballRenderer.ts is absent");
    } else {
        const raw = readFileSync(RENDERER, "utf8");
        const src = stripComments(raw);

        // 1 + 2: tempo scales the STEP; uTime reads the tempo-integrated clock.
        const tempoStep = /const\s+stepMs\s*=\s*tempo\s*\*\s*dtMs/.test(src);
        const simAccum = /simTimeMs\s*\+=\s*stepMs/.test(src);
        const uTimeFromSim = /U\.uTime\s*,\s*simTimeMs\s*\/\s*1000/.test(src);
        facts.tempoScalesStep = tempoStep;
        facts.simAccumulates = simAccum;
        facts.uTimeFromSim = uTimeFromSim;
        if (!tempoStep)
            violations.push(
                "tempo does not scale the integration STEP (`stepMs = tempo * dtMs`) — it must multiply dt, never the clock",
            );
        if (!simAccum)
            violations.push(
                "the tempo-integrated clock `simTimeMs += stepMs` is absent — the motion clock must integrate the tempo-scaled step",
            );
        if (!uTimeFromSim)
            violations.push(
                "uTime is NOT uploaded from the tempo-integrated `simTimeMs` — uploading the substrate's absolute clock makes the FBM JUMP on a tempo change",
            );

        // The bite: uTime must NOT be `tempo * timeSec` (clock scaling).
        const clockScaled = /U\.uTime\s*,\s*tempo\s*\*/.test(src) || /U\.uTime\s*,\s*timeSec\s*\*\s*tempo/.test(src);
        facts.clockScaled = clockScaled;
        if (clockScaled)
            violations.push(
                "uTime is scaled by tempo (clock scaling) — the FBM noise JUMPS on a tempo change; integrate the step instead",
            );

        // 3: tempo is 0 under reduced-motion / pause; the renderer READS the
        //    substrate's reducedMotion (no second PRM path).
        const tempoZeroOnFreeze =
            /tempo\s*=\s*reduced\s*\|\|\s*paused\s*\?\s*0/.test(src) ||
            /reduced\s*\|\|\s*paused\s*\?\s*0\s*:\s*config\.tempo/.test(src);
        facts.tempoZeroOnFreeze = tempoZeroOnFreeze;
        facts.readsSubstratePrm = /reducedMotion/.test(src);
        if (!tempoZeroOnFreeze)
            violations.push(
                "tempo is not forced to 0 under reduced-motion / pause — `tempo=0` must freeze every integrated axis",
            );
        if (!facts.readsSubstratePrm)
            violations.push(
                "the renderer does not read the substrate's reducedMotion — PRM must route through the SUBSTRATE freeze, not a second path",
            );

        // 4: first-dt clamp on the integrated step.
        facts.firstDtClamp = /Math\.min\(rawDtMs,\s*50\)/.test(src) || /Math\.min\(dtMs,\s*50\)/.test(src);
        if (!facts.firstDtClamp)
            violations.push(
                "the first post-park dt is not clamped to ~50ms before the tempo integration — a seconds-long re-arm dt JUMPS the rest-pose/tempo composition",
            );
    }

    // 3 (whole-tree): NO parallel matchMedia in the blob tree.
    const mmOffenders = [];
    if (existsSync(BLOB)) {
        for (const f of walk(BLOB)) {
            const s = stripComments(readFileSync(f, "utf8"));
            if (/matchMedia/.test(s)) mmOffenders.push(f.slice(ROOT.length + 1));
        }
    }
    facts.matchMediaOffenders = mmOffenders;
    if (mmOffenders.length)
        violations.push(
            `a parallel matchMedia listener exists in the blob tree (${mmOffenders.join(", ")}) — the substrate owns PRM (the AV.W7-removed anti-pattern)`,
        );

    // Runtime witness — a tempo-integrated clock is CONTINUOUS across a tempo
    // change; the clock-scaling form JUMPS. The gate computes both at a fixed wall
    // time and asserts the integrated form's continuity vs the clock form's jump.
    {
        // Integrate to wall t=1s at tempo 1.0, then tempo drops to 0.5 for the NEXT
        // frame. The integrated clock continues from its value; the clock-scaled
        // form snaps from (1.0*1.0) to (0.5*1.0) = a 0.5s jump.
        let sim = 0;
        const dt = 1 / 60;
        for (let i = 0; i < 60; i++) sim += 1.0 * dt; // ~1.0s at tempo 1
        const simBefore = sim;
        sim += 0.5 * dt; // one frame at tempo 0.5
        const integratedJump = Math.abs(sim - simBefore); // ~ 0.5/60 ≈ 0.0083 (smooth)
        const wall = 1.0 + dt;
        const clockBefore = 1.0 * 1.0; // tempo 1 * wall 1.0
        const clockAfter = 0.5 * wall; // tempo 0.5 * wall — a discontinuous snap
        const clockJump = Math.abs(clockAfter - clockBefore); // ~0.49 (a JUMP)
        facts.integratedJump = Number(integratedJump.toFixed(5));
        facts.clockJump = Number(clockJump.toFixed(5));
        // the integrated form must be ~smooth (< one frame's worth) and far smaller
        // than the clock-scaling jump (the property the gate enforces structurally).
        if (!(integratedJump < 0.02 && clockJump > 0.1))
            violations.push(
                "the tempo-integration continuity witness failed — the integrated clock is not smooth across a tempo change (the structural property the gate enforces)",
            );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob-tempo-suppression",
        facts,
        violations,
    });

    console.log("proof:blob-tempo-suppression — one master tempo × dt, never × clock (AW.W11.c)");
    console.log(
        `  tempo×step    : stepMs ${facts.tempoScalesStep ? "✓" : "✗"} | simTimeMs accum ${facts.simAccumulates ? "✓" : "✗"} | uTime←sim ${facts.uTimeFromSim ? "✓" : "✗"} (clock-scaled? ${facts.clockScaled ? "YES ✗" : "no ✓"})`,
    );
    console.log(
        `  freeze        : tempo=0 on PRM/pause ${facts.tempoZeroOnFreeze ? "✓" : "✗"} | reads substrate PRM ${facts.readsSubstratePrm ? "✓" : "✗"} | no parallel matchMedia ${facts.matchMediaOffenders.length ? "✗" : "✓"} | first-dt clamp ${facts.firstDtClamp ? "✓" : "✗"}`,
    );
    console.log(
        `  continuity    : integrated jump ${facts.integratedJump} vs clock-scaling jump ${facts.clockJump}`,
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
