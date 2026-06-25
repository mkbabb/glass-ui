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
    const morphCtxOnly = stripComments(read(MORPH_CTX));
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
    // BC.W-DOCK-STACK-RAIL retired the divider-carousel `DockRail` clean (no alias —
    // DEFINITION-ABSENT, asserted by proof:dock-stack-rail S1) and re-pointed the rail
    // concern to the macOS hover-expand `<DockStack>` successor (DockStack.vue, bound on
    // both shell docks — proof:dock-stack-rail S2/S6). This M3 check FOLLOWS that
    // retirement: it requires the LIVE `DockStack` rail surface, not the retired
    // `DockRail` (a stale `DockRail` requirement here would force the retired component
    // back into the shell, contradicting the BC clean break).
    function shellLayering(code) {
        return (
            /useContextualDockLayers\s*\(/.test(code) &&
            /railContext/.test(code) &&
            /DockSection/.test(code) &&
            /DockStack/.test(code)
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

    // ── M5 — the nested-group size is the measure-ONCE convex blend (no per-swap rAF) ────
    // BD.W-DOCK-CORE deleted the per-swap nested-measure ordering (nestedTargetsWithin/
    // forceNestedMaxContent/the rAF outer-shrink-wrap window) that the to:0 nested defect
    // needed. The size is now the ratio-free convex blend of two measure-ONCE endpoints
    // (`useDockExpandedSize` RO writes `--dock-expanded-px`/`--dock-collapsed-px`; the CSS
    // `--dock-live`/`--dock-size-scale` blends them off `--dock-morph-t`), and the nested
    // group self-reserves its peak intrinsic size via CSS `max-content` — so the nested
    // to:0 sliver is structurally impossible without the rAF ordering. M5 witnesses THAT
    // supersede: the deleted machinery is gone AND the RO endpoint measure is composed.
    const deadNestedMachineryBack =
        /nestedTargetsWithin\s*\(/.test(morphCtx) ||
        /forceNestedMaxContent\s*\(/.test(morphCtx) ||
        /measureAndArmMorph\s*\(/.test(morphCtx);
    assert(
        "M5 — the deleted per-swap nested-measure machinery (nestedTargetsWithin/forceNestedMaxContent/measureAndArmMorph) does NOT survive — the ratio-free measure-once blend replaced it",
        !deadNestedMachineryBack,
    );
    // The measure-once endpoint capture (useDockExpandedSize RO) is composed — the size
    // endpoints are measured ONCE per content change, not per-swap in a fragile rAF.
    const composesRoMeasure =
        /useDockExpandedSize/.test(morphCtx) &&
        /--dock-expanded-px/.test(morphCtx) &&
        /--dock-collapsed-px/.test(morphCtx);
    assert(
        "M5 — the size endpoints are captured ONCE by the useDockExpandedSize ResizeObserver (--dock-expanded-px/--dock-collapsed-px), not a per-swap rAF measure",
        composesRoMeasure,
    );
    // The spring fence — DOCK_SPRING DERIVES from the single-source springPreset("dock")
    // (a morph wave cannot fork it to a literal), resolving the iOS-27 weighty pair
    // { response: 0.68, dampingFraction: 0.64 } (BD.W-ANIM-IOS27-TUNE re-tuned it in the
    // PRESETS table, the single source). The structural derive is the fence.
    const springFenceHeld =
        /DOCK_SPRING\s*=\s*\{[\s\S]*?response:\s*springPreset\(\s*["']dock["']\s*\)\.response[\s\S]*?dampingFraction:\s*springPreset\(\s*["']dock["']\s*\)\.dampingFraction/.test(
            constants,
        );
    assert(
        "M5 — DOCK_SPRING derives from the single-source springPreset(\"dock\") (the structural fence — no forked literal)",
        springFenceHeld,
    );
    // The morph CONTEXT must NOT hand-type a spring (response/dampingFraction) literal —
    // the spring is owned by the preset table, read via the imported DOCK_SPRING.
    const ctxForksSpring =
        /response\s*:\s*0\.\d/.test(morphCtxOnly) ||
        /dampingFraction\s*:\s*0\.\d/.test(morphCtxOnly);
    assert(
        "M5 — the morph context does not fork a spring literal (the spring is the imported preset-derived DOCK_SPRING)",
        !ctxForksSpring,
    );

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
        `  M5 ratio-free measure-once blend (spring preset-fenced): ${ok("M5 — the deleted per-swap nested-measure machinery (nestedTargetsWithin/forceNestedMaxContent/measureAndArmMorph) does NOT survive — the ratio-free measure-once blend replaced it", "M5 — the size endpoints are captured ONCE by the useDockExpandedSize ResizeObserver (--dock-expanded-px/--dock-collapsed-px), not a per-swap rAF measure", "M5 — DOCK_SPRING derives from the single-source springPreset(\"dock\") (the structural fence — no forked literal)", "M5 — the morph context does not fork a spring literal (the spring is the imported preset-derived DOCK_SPRING)") ? "YES" : "NO"}`,
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
