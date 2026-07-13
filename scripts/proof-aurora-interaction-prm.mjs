#!/usr/bin/env node
// AW.W8 — the interaction PRM-suppression gate (proof:aurora-interaction-prm).
// BI.W-FIELD-CORE re-pointed: the retired `cursorModel.ts` is GONE — the aurora cursor now IS
// the shared `usePointerVelocityField` (`auroraCursorMapping`). The INTENT is unchanged (every
// interactive axis suppressed under PRM via the MASTER TEMPO SCALAR); the MECHANISM moved from
// the cursorModel advance to the field TICK.
//
// Accessibility is BINDING: every interactive/parallax axis (cursor-as-light, velocity-burst,
// scroll, the WebGPU wake) MUST be suppressed under `prefers-reduced-motion: reduce` AND the
// DockBackgroundToggle pause, via the SINGLE MASTER TEMPO SCALAR seam. This gate asserts:
//
//   (1) THE MASTER TEMPO SCALAR — frameLoop has a masterTempo() that returns 0 under
//       getReducedMotion() (the substrate's live PRM ref) and gates the field tick
//       (`pointerField.tick(tempo === 0 ? 0 : deltaMs)` — the deterministic tick(0) freeze).
//   (2) TEMPO×dt NOT ×uTime — the tempo scales the integrated field tick (the integration
//       step), never uTime (the WebGL2 axes' uTime is already frozen by the substrate under
//       reduce). The wake advect pass gates the SPLAT by uTempo, multiplied by dt, never uTime.
//   (3) THE CURSOR WRITE-PATH EARLY-OUT — the field's `setPointer` EARLY-OUTS under PRM
//       (`respectPRM && reduced`). The cursor pointermove listener fires INDEPENDENT of the
//       parked rAF loop, so a live cursor write would move the field WITHOUT this gate. AND
//       the aurora runtime no longer re-implements a PARALLEL cursor velocity path (no
//       cursorModel dual-path — the field owns the derivation).
//   (4) NO PARALLEL matchMedia — the aurora interaction code (frameLoop/useCursor) does NOT
//       install its own `matchMedia(prefers-reduced-motion)` listener (the substrate AV.W7
//       lift owns it; the field caches ONE, not per-event; a parallel per-viz listener is the
//       removed anti-pattern).
//   (5) THE interaction-prm.test.ts arm — the tempo-scalar contract (tick(0) freezes the
//       velocity + burst; a live tick retains them).
//
// bite-check: detach the tick from the master tempo scalar (it animates under reduce) → RED;
// OR remove the field's setPointer PRM early-out (the cursor write-path leaks under reduce) → RED.

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
        FIELD: resolve(ROOT, "src/composables/motion/usePointerVelocityField.ts"),
        USECURSOR: resolve(A, "composables/useCursorInteraction.ts"),
        WAKE: resolve(A, "constants/shaders/wake.wgsl.ts"),
        SPEC: "tests/components/custom/aurora/interaction-prm.test.ts",
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_INTERACTION_PRM_ARTIFACT", "AW-aurora-interaction-prm"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, FRAMELOOP, RUNTIME, FIELD, USECURSOR, WAKE, SPEC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    const read = (p) => (existsSync(p) ? stripComments(readFileSync(p, "utf8")) : null);
    const frameLoop = read(FRAMELOOP);
    const runtime = read(RUNTIME);
    const field = read(FIELD);
    const useCursor = read(USECURSOR);
    const wake = read(WAKE);
    if (!frameLoop || !runtime || !field || !useCursor) {
        violations.push("a required aurora/field source is absent");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:aurora-interaction-prm", facts, violations });
        console.error("[proof:aurora-interaction-prm] FAIL — source absent");
        process.exit(1);
    }

    // (1) the master tempo scalar — gates the FIELD TICK (the tick(0) freeze).
    facts.masterTempoScalar =
        /function\s+masterTempo\s*\(/.test(frameLoop) &&
        /getReducedMotion\s*\(\s*\)\s*\?\s*0\s*:\s*1/.test(frameLoop) &&
        /pointerField\.tick\s*\(\s*tempo\s*===\s*0\s*\?\s*0\s*:\s*deltaMs\s*\)/.test(frameLoop);
    if (!facts.masterTempoScalar) violations.push("(1) frameLoop has no master tempo scalar gating the field tick (masterTempo() → 0 under getReducedMotion(), gating pointerField.tick(tempo===0?0:deltaMs))");

    // (2) tempo×dt not ×uTime — the field's tick FREEZES under tempo=0 (tick(0) → reset), and
    // tempo never multiplies uTime.
    facts.tempoScalesStep = /deltaMs\s*>\s*0/.test(field) && /reset\s*\(\s*\)/.test(field);
    facts.noTempoTimesUTime = !/uTime\s*\*\s*tempo/.test(frameLoop) && !/tempo\s*\*\s*uTime/.test(frameLoop) && !/uTime\s*\*\s*masterTempo/.test(frameLoop);
    if (!facts.tempoScalesStep) violations.push("(2) the field tick does not freeze to rest under a zero delta (the tick(0) deterministic freeze — `deltaMs > 0` guard reaching reset())");
    if (!facts.noTempoTimesUTime) violations.push("(2) the tempo multiplies uTime (the clock) — it must scale the integrated tick delta, never uTime (scaling the clock makes the flow jump)");

    // (3) the cursor write-path early-out lives in the field's setPointer (PRM-gated), AND the
    // aurora runtime no longer re-implements a parallel cursor path (no cursorModel dual-path).
    const fieldSetPointerGated = /function\s+setPointer\s*\([^)]*\)[^{]*\{[\s\S]*?respectPRM\s*&&\s*reduced/.test(field);
    const runtimeNoDualPath = !/from\s*["']\.\/cursorModel["']/.test(runtime) && !/function\s+injectCursorVelocity\s*\(/.test(runtime);
    facts.cursorWritePathEarlyOut = fieldSetPointerGated && runtimeNoDualPath;
    if (!fieldSetPointerGated) violations.push("(3) the field's setPointer does NOT early-out under PRM (`respectPRM && reduced`) — a live pointermove would move the field under reduce (the cursor write-path leak)");
    if (!runtimeNoDualPath) violations.push("(3) the aurora runtime still carries a parallel cursor path (a cursorModel import or an injectCursorVelocity re-implementation) — the field owns the derivation");

    // (4) no parallel matchMedia in the aurora interaction code (the field caches ONE; the
    // substrate owns the aurora PRM). frameLoop + useCursor must not install one.
    facts.noParallelMatchMedia =
        !/matchMedia\s*\(\s*["'`]\(prefers-reduced-motion/.test(frameLoop) &&
        !/matchMedia\s*\(\s*["'`]\(prefers-reduced-motion/.test(useCursor);
    if (!facts.noParallelMatchMedia) violations.push("(4) the aurora interaction code (frameLoop/useCursor) installs a PARALLEL matchMedia(prefers-reduced-motion) listener — the substrate (AV.W7 lift) owns the aurora PRM; a per-viz listener is the removed anti-pattern");

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
