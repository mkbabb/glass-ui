#!/usr/bin/env node
// BA.W-DOCK-MORPH-INSITU — proof:dock-morph-insitu, the in-situ shell-dock V↔H morph
// + layering-switch + BA-VJS-1 nested-measure gate.
//
// The born-RED → GREEN DEVICE-FREE static src-scan arm. It asserts the FIVE
// falsifiable structural witnesses (M1-M5); the captured visual/budget truth (the
// in-situ frame-series, the in-situ layering switch, the 4×-throttle perf re-run, the
// BA-VJS-1 four-cycle non-zero `to`) is the LOCAL-ONLY π half — it lives in
// docs/tranches/BA/audit/visual/W-DOCK-MORPH-INSITU-DELTA.md, backstopped on CI by
// proof:live-verified-ledger, NEVER re-run server-side (SwiftShader cannot judge the
// liquid teardrop, and a 4×-throttle perf number is dev-box truth — the AY W-LIVE1
// split). So this .mjs carries tags ["local","ci","release"] (a static src-scan gate
// omitting `ci` REDs proof:tag-parity).
//
// The five clauses (each born-RED at the pre-wave HEAD, driven GREEN by this wave):
//
//   M1 — the shell morph is driven by the ONE `--dock-morph-t` scalar (no 2nd clock).
//        AppShell binds useDockOrientationMorph (the AZ driver); the shell morph
//        handler reaches its toggle/morphTo/pin (the driver IS the engine), and no
//        second SpringProgress/rAF/setInterval morph clock is minted on the shell
//        morph path (the no-second-engine floor). RED at HEAD: the shell carries no
//        morph control (no useDockOrientationMorph, no --dock-morph-t).
//   M2 — the same scalar drives both directions (bidirectional, no clip-path morph
//        across the topology flip — the AX.W42 fold-7 NO-GO). RED at HEAD: no morph.
//   M3 — the layering/contextual switch is exercised in-situ (the
//        useContextualDockLayers resolver + the section/layer switch wired ON the
//        shell against W-DOCK-SECTIONS's section chassis), not story-only. RED at
//        HEAD only in the pre-W-DOCK-SECTIONS tree (the chassis carries it at HEAD).
//   M4 — the teardrop-vs-crossfade ship decision rides the recorded perf number. The
//        DELTA carries the in-situ 4×-throttle p50 + the over-16.7ms fraction; the
//        shipped register is the VT crossfade UNLESS the teardrop clears in-situ. RED
//        at HEAD: no in-situ morph, no trace.
//   M5 — the BA-VJS-1 nested-group measure orders the inner target ahead of the outer
//        measure (valuejs-fold A-1). The onSwap outer measure composes the nested
//        target's max-content contribution into the OUTER `to` measure, AND no
//        DOCK_SPRING/response/dampingFraction constant changed on the morph path
//        (constants.ts byte-untouched — the letter's spring fence). A fix that
//        re-tunes the spring to mask the to:0 rather than re-order the measure REDs.
//
// House style mirrors proof-morph-showcase.mjs / proof-dock-unify.mjs: comment-strip
// first (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact, a human summary, process.exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-morph-insitu";

const APPSHELL = "demo/layout/AppShell.vue";
const SIDEBAR = "demo/layout/SidebarDock.vue";
const BOTTOM = "demo/layout/BottomDock.vue";
const MORPH_CTX = "src/components/custom/dock/composables/dockMorphContext.ts";
// BB.W-CARVE4 — the measure helpers (nestedTargetsWithin/forceNestedMaxContent/
// measureTo + the outerEl.contains nested-ordering) carved into this sibling leaf;
// the M5 BA-VJS-1 nested-ordering assert reads the orchestrator + the leaf together.
const MORPH_MEASURE = "src/components/custom/dock/composables/dockMorphMeasure.ts";
const CONSTANTS = "src/components/custom/dock/constants.ts";
const DELTA = "docs/tranches/BA/audit/visual/W-DOCK-MORPH-INSITU-DELTA.md";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments + <!-- html --> so a prose mention of a token
// in a comment is not mistaken for live code. Newlines preserved.
function stripComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

export function detect() {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
        return Boolean(ok);
    }

    const appShell = stripComments(read(APPSHELL));
    const sidebar = stripComments(read(SIDEBAR));
    const bottom = stripComments(read(BOTTOM));
    // BB.W-CARVE4 — read the orchestrator + the carved measure leaf together so the
    // M5 nested-ordering asserts FOLLOW the composition into the leaf (the rAF-block
    // `const nested = nestedTargetsWithin` wiring stays in dockMorphContext.ts; the
    // `outerEl.contains` nested-detection moved to dockMorphMeasure.ts).
    const morphCtx = stripComments(read(MORPH_CTX) + "\n" + read(MORPH_MEASURE));
    const constants = stripComments(read(CONSTANTS));
    const deltaRaw = read(DELTA); // not comment-stripped — prose is the content

    // ── M1 — the shell morph is driven by the ONE --dock-morph-t scalar ─────────
    // AppShell binds the AZ driver (consumer #2) and its handler reaches the driver's
    // toggle/morphTo/pin (the driver IS the morph engine), NOT a shadow engine.
    const bindsDriver = /useDockOrientationMorph\s*\(/.test(appShell);
    const reachesDriverApi =
        /morph\.toggle\s*\(/.test(appShell) ||
        /morph\.morphTo\s*\(/.test(appShell) ||
        /morph\.pin\s*\(/.test(appShell);
    assert("M1 — AppShell binds useDockOrientationMorph (the AZ driver, consumer #2)", bindsDriver);
    assert(
        "M1 — the shell morph handler reaches the driver's toggle/morphTo/pin (not a shadow engine)",
        reachesDriverApi,
    );
    // The shell docks carry the morph control that opens the demonstration.
    const sidebarControl = /toggle-dock-morph/.test(sidebar) && /ArrowLeftRight/.test(sidebar);
    const bottomControl = /toggle-dock-morph/.test(bottom) && /ArrowLeftRight/.test(bottom);
    assert("M1 — the SidebarDock carries the in-situ morph control", sidebarControl);
    assert("M1 — the BottomDock carries the in-situ morph control", bottomControl);
    // No SECOND morph clock minted on the shell morph path — the only morph engine on
    // the shell is the AZ driver. A shell-local `new SpringProgress`, a raw
    // `requestAnimationFrame` morph loop, or a `setInterval` morph clock in AppShell
    // would be a second engine (the no-second-engine floor). The driver's OWN
    // SpringProgress lives in useDockOrientationMorph, not AppShell.
    const shellSecondEngine =
        /new\s+SpringProgress/.test(appShell) ||
        /requestAnimationFrame\s*\([^)]*morph/i.test(appShell) ||
        /setInterval\s*\([^)]*morph/i.test(appShell);
    assert("M1 — no second morph engine/clock minted on the shell morph path", !shellSecondEngine);

    // ── M2 — the same scalar drives both directions (no clip-path topology morph) ─
    // The shell morph is bidirectional on the driver's toggle/morphTo (one scalar, no
    // separate forward/back path). And no clip-path interpolation across the
    // orientation flip on the shell morph path (the AX.W42 fold-7 NO-GO).
    const bidirectional =
        /morph\.toggle\s*\(/.test(appShell) ||
        (/morph\.morphTo\s*\(\s*["']horizontal["']/.test(appShell) &&
            /morph\.morphTo\s*\(\s*["']vertical["']/.test(appShell));
    assert("M2 — the shell morph is bidirectional on the one scalar (toggle/morphTo)", bidirectional);
    const shellClipMorph =
        /clip-path[^;]*var\(\s*--dock-morph-t/.test(appShell) ||
        /transition:[^;]*clip-path/.test(appShell);
    assert("M2 — no clip-path interpolation across the orientation flip (topology limit)", !shellClipMorph);
    // The §7 VT crossfade is the shipped default (startViewTransition wraps the swap).
    const vtDefault =
        /startViewTransition\s*\(/.test(appShell) && /vtOrientation/.test(appShell);
    assert("M2 — the §7 View-Transitions crossfade is the shipped default register", vtDefault);

    // ── M3 — the layering/contextual switch is exercised in-situ ────────────────
    // The shell docks consume the useContextualDockLayers resolver + wire the
    // section/layer switch ON the shell (the DockSection chassis + the railContext
    // one-registry write), not only on the /dock/layers story.
    function shellLayering(code) {
        return (
            /useContextualDockLayers\s*\(/.test(code) &&
            /railContext/.test(code) &&
            /DockSection/.test(code) &&
            /DockRail/.test(code)
        );
    }
    assert("M3 — the SidebarDock exercises the in-situ layering/contextual switch", shellLayering(sidebar));
    assert("M3 — the BottomDock exercises the in-situ layering/contextual switch", shellLayering(bottom));

    // ── M4 — the ship decision rides the recorded perf number ───────────────────
    // The DELTA carries the in-situ 4×-throttle perf trace (p50 + over-16.7ms
    // fraction) and the consequent shipped register (the crossfade floor vs the
    // teardrop). The decision is the mechanical fall — the NUMBER decides.
    const deltaExists = deltaRaw.length > 0;
    const deltaHasPerf =
        /p50/i.test(deltaRaw) &&
        /16\.7/.test(deltaRaw) &&
        /(view-transition|crossfade|teardrop)/i.test(deltaRaw);
    assert("M4 — the DELTA exists (the in-situ π readback home)", deltaExists);
    assert("M4 — the DELTA records the §7 4×-throttle perf number + the shipped register", deltaHasPerf);

    // ── M5 — BA-VJS-1: the nested-group measure orders the inner target ahead ────
    // The onSwap outer measure composes the nested registered target's max-content
    // contribution into the OUTER `to` measure (the inner is forced to its own span
    // BEFORE the outer shrink-wrap reads it). The fix is the nestedTargetsWithin /
    // forceNestedMaxContent ordering in the rAF measure window.
    const nestedOrdering =
        /nestedTargetsWithin\s*\(/.test(morphCtx) &&
        /forceNestedMaxContent\s*\(/.test(morphCtx) &&
        /outerEl\.contains\s*\(/.test(morphCtx);
    assert("M5 — the onSwap measure composes the nested target's max-content into the outer `to`", nestedOrdering);
    // The fix is wired INSIDE the rAF measure window (the inner force happens before
    // the outer `max-content` measure + is restored after).
    const wiredInMeasure =
        /const\s+nested\s*=\s*nestedTargetsWithin/.test(morphCtx) &&
        /const\s+restore\s*=\s*nested\.map/.test(morphCtx);
    assert("M5 — the nested force is wired in the rAF measure window (restored after)", wiredInMeasure);
    // The spring fence — DOCK_SPRING is byte-untouched (the letter's explicit fence).
    // The canonical values stay {response:0.32, dampingFraction:0.7}; no re-tune.
    const springFenceHeld =
        /response:\s*0\.32/.test(constants) && /dampingFraction:\s*0\.7/.test(constants);
    assert("M5 — DOCK_SPRING is byte-untouched (response:0.32 dampingFraction:0.7 — the spring fence)", springFenceHeld);
    // The morph CONTEXT must NOT change a spring constant on the morph path (no
    // response/dampingFraction literal re-assignment in dockMorphContext beyond the
    // imported DOCK_SPRING read). A fix that re-tunes the spring to mask to:0 REDs.
    const ctxRetunesSpring =
        /response\s*:\s*0\.(?!32\b)\d/.test(morphCtx) ||
        /dampingFraction\s*:\s*0\.(?!7\b)\d/.test(morphCtx);
    assert("M5 — the morph context does not re-tune the spring to mask the to:0 (measure-ordering only)", !ctxRetunesSpring);

    return { facts, violations };
}

function run() {
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_MORPH_INSITU_ARTIFACT",
        "BA-dock-morph-insitu",
    );
    writeGateArtifact(ARTIFACT, {
        stamp: snapshotStamp(),
        status,
        gate: "proof:dock-morph-insitu",
        command: COMMAND,
        facts,
        violations,
    });

    const ok = (...labels) => labels.every((l) => facts[l]);
    console.log(
        "proof:dock-morph-insitu — the in-situ shell-dock V↔H morph + layering + BA-VJS-1 gate (BA.W-DOCK-MORPH-INSITU)",
    );
    console.log(
        `  M1 shell morph on the ONE --dock-morph-t scalar : ${ok("M1 — AppShell binds useDockOrientationMorph (the AZ driver, consumer #2)", "M1 — the shell morph handler reaches the driver's toggle/morphTo/pin (not a shadow engine)", "M1 — the SidebarDock carries the in-situ morph control", "M1 — the BottomDock carries the in-situ morph control", "M1 — no second morph engine/clock minted on the shell morph path") ? "YES" : "NO"}`,
    );
    console.log(
        `  M2 bidirectional, topology-occluded, VT default : ${ok("M2 — the shell morph is bidirectional on the one scalar (toggle/morphTo)", "M2 — no clip-path interpolation across the orientation flip (topology limit)", "M2 — the §7 View-Transitions crossfade is the shipped default register") ? "YES" : "NO"}`,
    );
    console.log(
        `  M3 in-situ layering/contextual switch wired     : ${ok("M3 — the SidebarDock exercises the in-situ layering/contextual switch", "M3 — the BottomDock exercises the in-situ layering/contextual switch") ? "YES" : "NO"}`,
    );
    console.log(
        `  M4 ship decision rides the recorded perf number : ${ok("M4 — the DELTA exists (the in-situ π readback home)", "M4 — the DELTA records the §7 4×-throttle perf number + the shipped register") ? "YES" : "NO"}`,
    );
    console.log(
        `  M5 BA-VJS-1 nested-measure ordering (spring fenced): ${ok("M5 — the onSwap measure composes the nested target's max-content into the outer `to`", "M5 — the nested force is wired in the rAF measure window (restored after)", "M5 — DOCK_SPRING is byte-untouched (response:0.32 dampingFraction:0.7 — the spring fence)", "M5 — the morph context does not re-tune the spring to mask the to:0 (measure-ordering only)") ? "YES" : "NO"}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
