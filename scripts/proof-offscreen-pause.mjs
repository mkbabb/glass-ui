#!/usr/bin/env node
// AV.W7 — the offscreen RAF-park gate (proof:offscreen-pause, F1/F4 + G1).
//
// The single biggest perf+battery lever the substrate did not pull: a
// perpetually-animating WebGL background kept running at 60fps while completely
// offscreen / in a backgrounded tab. F1+F4 close that gap by gating the EXISTING
// `shouldContinue()`/`armed` machinery on the VISIBILITY state — they add the
// visibility CONDITION to the park seam, not a parallel loop. G1 lifts the
// reduced-motion freeze into the same substrate with a LIVE matchMedia re-monitor
// so goo-blob (not just aurora) freezes/wakes when the OS query toggles.
//
// This is a SEAM assertion (a pure read-and-detect over the substrate source),
// NOT a live-frame assertion — the §3a redress clause: a gate that requires an
// unavailable headless RAF context is a plan defect. It detects that the park
// seam READS the visibility/reduced-motion state, which is assertable statically.
//
// bite-check: remove the `contentvisibilityautostatechange` listener (or the
// off-screen suspend it drives) → clause F1 reddens; drop the IO `off-screen`
// wiring in a runtime → clause F4 reddens; drop the substrate matchMedia `change`
// re-monitor → clause G1 reddens. Each makes the loop run while it should park.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip line + block comments so a clause cannot be satisfied by a comment. */
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
        // The backend-AGNOSTIC park machinery (the content-visibility hook, the
        // tab-hidden owner, the live PRM re-monitor) lives in the shared
        // `createCanvasLifecycle` core. The substrate-side F1/F4/G1 assertions read the
        // core (its real home); the WebGL2 backend `useWebGLCanvas.ts` composes it, so
        // a parked rAF skips the WebGL2 draw.
        SUBSTRATE: resolve(ROOT, "src/composables/glass/webgl/createCanvasLifecycle.ts"),
        AURORA: resolve(ROOT, "src/components/custom/aurora/composables/useAurora.ts"),
        BLOB: resolve(
            ROOT,
            "src/components/custom/goo-blob/composables/useMetaballRenderer.ts",
        ),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_OFFSCREEN_PAUSE_ARTIFACT",
            "AV-offscreen-pause",
        ),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SUBSTRATE, AURORA, BLOB, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // ── F1 — the substrate carries the content-visibility offscreen-park hook
    //         AND drives the off-screen suspend reason from it.
    if (!existsSync(SUBSTRATE)) {
        violations.push("the useWebGLCanvas substrate is absent");
    } else {
        const sub = stripComments(readFileSync(SUBSTRATE, "utf8"));

        facts.hasContentVisibilityListener = /contentvisibilityautostatechange/.test(sub);
        // The listener must DRIVE the off-screen park (suspend/resume the loop).
        facts.contentVisibilityDrivesPark =
            facts.hasContentVisibilityListener &&
            /\.skipped/.test(sub) &&
            /suspend\(\s*["']off-screen["']\s*\)/.test(sub) &&
            /resume\(\s*["']off-screen["']\s*\)/.test(sub);
        if (!facts.hasContentVisibilityListener) {
            violations.push(
                "useWebGLCanvas has NO `contentvisibilityautostatechange` listener — the offscreen-park (F1) is missing; the RAF runs while the host is content-hidden",
            );
        } else if (!facts.contentVisibilityDrivesPark) {
            violations.push(
                "the `contentvisibilityautostatechange` listener does not gate the loop: it must read `event.skipped` and drive suspend(\"off-screen\")/resume(\"off-screen\")",
            );
        }

        // ── F4 — the tab-visibility owner parks the loop (document-hidden).
        facts.tabVisibilityParks =
            /visibilitychange/.test(sub) &&
            /document\.hidden/.test(sub) &&
            /suspend\(\s*["']tab-hidden["']\s*\)/.test(sub);
        if (!facts.tabVisibilityParks) {
            violations.push(
                "the tab-visibility owner does not park on document.hidden (F4) — a backgrounded tab keeps the loop running",
            );
        }

        // ── G1 — the reduced-motion freeze is LIFTED here AND live-monitored
        //         (a `matchMedia` `change` listener, not an init-once read).
        facts.hasReducedMotionQuery =
            /matchMedia\(\s*["'`]\(prefers-reduced-motion: reduce\)["'`]\s*\)/.test(sub);
        facts.reducedMotionReMonitored =
            facts.hasReducedMotionQuery &&
            /addEventListener\(\s*["']change["']/.test(sub);
        // The reduced-motion state must GATE the RAF reschedule (one static frame
        // then park) — the `tick()` reschedule reads it.
        facts.reducedMotionGatesLoop = /reducedMotion/.test(sub);
        if (!facts.hasReducedMotionQuery) {
            violations.push(
                "the substrate does not own the reduced-motion query (G1) — the freeze was not lifted from the two consumers",
            );
        } else if (!facts.reducedMotionReMonitored) {
            violations.push(
                "the reduced-motion query is read once but NOT re-monitored (G1) — no `matchMedia` `change` listener; toggling reduced-motion at runtime does not freeze/wake the loop",
            );
        }
        if (!facts.reducedMotionGatesLoop) {
            violations.push(
                "the substrate's reduced-motion state does not gate the loop reschedule (G1)",
            );
        }
    }

    // ── F4 — the aurora + blob runtimes wire the RAF through the
    //         viewport-intersection seam (useIntersectionPause → off-screen).
    function wiresIntersectionSeam(label, path) {
        if (!existsSync(path)) {
            violations.push(`the ${label} runtime is absent`);
            return false;
        }
        const src = stripComments(readFileSync(path, "utf8"));
        const composes = /useIntersectionPause\s*\(/.test(src);
        // The seam drives an off-screen* suspend reason. AX.W16 F6 split the IO
        // fallback onto its OWN reason key `off-screen-io` (distinct from the
        // content-visibility path's `off-screen` — the one-writer-per-reason
        // tightening), so the blob drives `off-screen-io` while aurora still drives
        // `off-screen`. Accept EITHER off-screen reason key — the gate's intent (the
        // runtime parks offscreen via useIntersectionPause) is preserved.
        const drivesOffScreen = /["']off-screen(?:-io)?["']/.test(src);
        const wired = composes && drivesOffScreen;
        if (!wired) {
            violations.push(
                `the ${label} runtime does not wire its RAF through useIntersectionPause's off-screen seam (F4) — an offscreen ${label} keeps rendering`,
            );
        }
        return wired;
    }
    facts.auroraWiresIO = wiresIntersectionSeam("aurora", AURORA);
    facts.blobWiresIO = wiresIntersectionSeam("blob", BLOB);

    // ── G1 — both consumers DROP their init-once reduced-motion reads (they now
    //         inherit the substrate's live seam). A surviving init-once read is
    //         the unlifted-freeze regression.
    if (existsSync(BLOB)) {
        const blob = stripComments(readFileSync(BLOB, "utf8"));
        facts.blobInitOnceReducedMotion =
            /prefers-reduced-motion/.test(blob) && /matchMedia/.test(blob);
        if (facts.blobInitOnceReducedMotion) {
            violations.push(
                "the blob renderer still reads `matchMedia(prefers-reduced-motion)` itself (G1) — the init-once read was not dropped for the substrate's live seam",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:offscreen-pause",
        facts,
        violations,
    });

    console.log(
        "proof:offscreen-pause — the substrate parks its RAF offscreen/hidden/reduced (AV.W7 F1/F4 + G1)",
    );
    console.log(
        `  F1 content-visibility park : ${facts.contentVisibilityDrivesPark ? "yes ✓" : "NO ✗"}`,
    );
    console.log(`  F4 tab-hidden park         : ${facts.tabVisibilityParks ? "yes ✓" : "NO ✗"}`);
    console.log(
        `  F4 IO off-screen (aurora)  : ${facts.auroraWiresIO ? "yes ✓" : "NO ✗"}   (blob: ${facts.blobWiresIO ? "yes ✓" : "NO ✗"})`,
    );
    console.log(
        `  G1 reduced-motion lift     : ${facts.reducedMotionReMonitored ? "yes ✓ (re-monitored)" : "NO ✗"}   (blob init-once dropped: ${facts.blobInitOnceReducedMotion ? "NO ✗" : "yes ✓"})`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
