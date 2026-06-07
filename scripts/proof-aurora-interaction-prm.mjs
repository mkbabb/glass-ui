#!/usr/bin/env node
// AW.W8 — the interaction PRM-suppression gate (proof:aurora-interaction-prm).
//
// Accessibility is BINDING: every interactive/parallax axis (cursor-as-light,
// velocity-burst, scroll, the WebGPU wake) MUST be suppressed under
// `prefers-reduced-motion: reduce` AND the DockBackgroundToggle pause, via the SINGLE
// MASTER TEMPO SCALAR seam. This gate asserts:
//
//   (1) THE MASTER TEMPO SCALAR — frameLoop has a masterTempo() that returns 0 under
//       getReducedMotion() (the substrate's live PRM ref) and gates the cursor advance.
//   (2) TEMPO×dt NOT ×uTime — the tempo scales the integrated cursor advance (the
//       integration step), never uTime (the WebGL2 axes' uTime is already frozen by
//       the substrate under reduce). The wake advect pass gates the SPLAT by uTempo,
//       multiplied by dt, never uTime.
//   (3) THE CURSOR WRITE-PATH EARLY-OUT (the unhandled case) — injectCursorVelocity
//       in runtime.ts EARLY-OUTS on canvasHandle.reducedMotion. The cursor pointermove
//       listener fires INDEPENDENT of the parked rAF loop, so a parked loop with a
//       live cursor write would still move the field WITHOUT this check.
//   (4) NO PARALLEL matchMedia — the aurora interaction code does NOT install its own
//       `matchMedia(prefers-reduced-motion)` listener (the substrate AV.W7 lift owns
//       it; a parallel listener is the exact removed anti-pattern).
//   (5) THE interaction-prm.test.ts arm — the tempo-scalar contract (tempo=0 freezes
//       the velocity + burst; tempo=1 retains them).
//
// bite-check: detach an axis from the master tempo scalar (it animates under reduce)
// → RED; OR let the pointermove handler write without the reducedMotion early-out
// (the cursor write-path leaks under reduce) → RED.

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
    const A = resolve(ROOT, "src/components/custom/aurora");
    _cliPaths = {
        ROOT,
        FRAMELOOP: resolve(A, "composables/frameLoop.ts"),
        RUNTIME: resolve(A, "composables/runtime.ts"),
        CURSORMODEL: resolve(A, "composables/cursorModel.ts"),
        USECURSOR: resolve(A, "composables/useCursorInteraction.ts"),
        WAKE: resolve(A, "constants/shaders/wake.wgsl.ts"),
        SPEC: "tests/components/custom/aurora/interaction-prm.test.ts",
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_INTERACTION_PRM_ARTIFACT", "AW-aurora-interaction-prm"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, FRAMELOOP, RUNTIME, CURSORMODEL, USECURSOR, WAKE, SPEC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const frameLoop = read(FRAMELOOP);
    const runtime = read(RUNTIME);
    const cursorModel = read(CURSORMODEL);
    const useCursor = read(USECURSOR);
    const wake = read(WAKE);
    if (!frameLoop || !runtime || !cursorModel || !useCursor) {
        violations.push("a required aurora source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-interaction-prm", facts, violations });
        console.error("[proof:aurora-interaction-prm] FAIL — source absent");
        process.exit(1);
    }

    // (1) the master tempo scalar.
    facts.masterTempoScalar =
        /function\s+masterTempo\s*\(/.test(frameLoop) &&
        /getReducedMotion\s*\(\s*\)\s*\?\s*0\s*:\s*1/.test(frameLoop) &&
        /advanceCursor\s*\(\s*cursor\s*,\s*masterTempo\s*\(\s*\)\s*\)/.test(frameLoop);
    if (!facts.masterTempoScalar) violations.push("(1) frameLoop has no master tempo scalar (masterTempo() → 0 under getReducedMotion(), gating advanceCursor)");

    // (2) tempo×dt not ×uTime — advanceCursor takes a tempo arg that scales the
    // velocity/burst RETENTION (the integration step), and tempo never multiplies uTime.
    facts.tempoScalesStep = /advanceCursor\s*\(\s*cursor\s*:\s*CursorState\s*,\s*tempo/.test(cursorModel) && /\*=\s*\([^)]*\)\s*\*\s*k/.test(cursorModel);
    // the tempo must NOT multiply uTime (the clock); scan for uTime * tempo / tempo * uTime.
    facts.noTempoTimesUTime = !/uTime\s*\*\s*tempo/.test(frameLoop) && !/tempo\s*\*\s*uTime/.test(frameLoop) && !/uTime\s*\*\s*masterTempo/.test(frameLoop);
    if (!facts.tempoScalesStep) violations.push("(2) advanceCursor does not take a tempo arg that scales the velocity/burst retention (the integration step)");
    if (!facts.noTempoTimesUTime) violations.push("(2) the tempo multiplies uTime (the clock) — it must scale the integrated dt, never uTime (scaling the clock makes the flow jump)");

    // (3) the cursor write-path early-out.
    facts.cursorWritePathEarlyOut =
        /function\s+injectCursorVelocity\s*\(/.test(runtime) &&
        /if\s*\(\s*canvasHandle\.reducedMotion\s*\)\s*return/.test(runtime);
    if (!facts.cursorWritePathEarlyOut) violations.push("(3) injectCursorVelocity (the cursor write-path) does NOT early-out on canvasHandle.reducedMotion — a parked loop with a live pointermove would move the field under reduce (the cursor write-path leak)");

    // (4) no parallel matchMedia in the interaction code.
    facts.noParallelMatchMedia =
        !/matchMedia\s*\(\s*["'`]\(prefers-reduced-motion/.test(frameLoop) &&
        !/matchMedia\s*\(\s*["'`]\(prefers-reduced-motion/.test(useCursor) &&
        !/matchMedia\s*\(\s*["'`]\(prefers-reduced-motion/.test(cursorModel);
    if (!facts.noParallelMatchMedia) violations.push("(4) the interaction code installs a PARALLEL matchMedia(prefers-reduced-motion) listener — the substrate (AV.W7 lift) owns it; a parallel listener is the removed anti-pattern");

    // (5) the wake injection is tempo-gated (W8.2; if the wake file exists).
    if (wake) {
        facts.wakeTempoGated = /U\.tempo/.test(wake) && /tempo:\s*f32/.test(wake);
        if (!facts.wakeTempoGated) violations.push("(5) the WebGPU wake advect pass does not gate the splat injection by the master tempo (uTempo) — the wake would inject under reduce");
        facts.wakeNotUTime = !/uTime/.test(wake);
        if (!facts.wakeNotUTime) violations.push("(5) the wake advect pass reads uTime — it must be dt-fed + tempo-gated, never uTime");
    } else {
        facts.wakeTempoGated = "n/a (wake.wgsl.ts absent)";
    }

    // (6) the interaction-prm.test.ts arm.
    let specGreen = false;
    let output = "";
    try {
        output = execFileSync("npx", ["vitest", "run", SPEC], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
        specGreen = true;
    } catch (err) {
        output = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
        specGreen = false;
    }
    facts.interactionSpecGreen = specGreen;
    if (!specGreen) violations.push("(6) the interaction-prm.test.ts tempo-scalar contract FAILED (tempo=0 must freeze the velocity + burst)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:aurora-interaction-prm", facts, violations });

    console.log("proof:aurora-interaction-prm — every axis on the master tempo scalar (AW.W8)");
    console.log(`  (1) master tempo scalar   : ${facts.masterTempoScalar ? "yes ✓" : "NO ✗"}`);
    console.log(`  (2) tempo×step not ×uTime : ${facts.tempoScalesStep && facts.noTempoTimesUTime ? "yes ✓" : "NO ✗"}`);
    console.log(`  (3) cursor write-path PRM : ${facts.cursorWritePathEarlyOut ? "yes ✓" : "NO ✗"}`);
    console.log(`  (4) no parallel matchMedia: ${facts.noParallelMatchMedia ? "yes ✓" : "NO ✗"}`);
    console.log(`  (5) wake tempo-gated      : ${facts.wakeTempoGated === true ? "yes ✓" : facts.wakeTempoGated}`);
    console.log(`  (6) interaction-prm spec  : ${facts.interactionSpecGreen ? "yes ✓" : "NO ✗"}`);
    if (!specGreen) console.log("\n--- vitest tail ---\n" + output.split("\n").slice(-25).join("\n"));
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
