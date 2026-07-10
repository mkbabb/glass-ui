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
//   M2 — (BG.W-DOCK-INPLACE-MORPH — INVERTED) the in-place liquid teardrop is the ONLY
//        V↔H register. The D13 headline DELETES the modal stage (role="dialog",
//        @keydown.esc, morphStageOpen) + the synthetic two-dock startViewTransition
//        crossfade (vtOrientation) + the modal-local #shell-dock-morph-goo inline filter;
//        the REAL dock flips IN PLACE via the teardrop referencing the canonical
//        #dock-morph-goo mount (still bidirectional on the ONE scalar, still no clip-path
//        topology morph — the AX.W42 fold-7 NO-GO). RED at the pre-wave HEAD (the modal +
//        vtOrientation + #shell-dock-morph-goo all present); GREEN on the delete, IN
//        LOCKSTEP with the AppShell VT-crossfade delete.
//   M3 — the layering/contextual switch is exercised in-situ (the
//        useContextualDockLayers resolver + the section/layer switch wired ON the
//        shell against W-DOCK-SECTIONS's section chassis), not story-only. RED at
//        HEAD only in the pre-W-DOCK-SECTIONS tree (the chassis carries it at HEAD).
//   M4 — (BG.W-DOCK-INPLACE-MORPH — RETIRED) there is no perf-gated teardrop-vs-crossfade
//        ship decision. The pass-2 M4 gated the teardrop as the perf-OPTIONAL register
//        behind a VT-crossfade default; the teardrop is now the ONLY register (M2), so the
//        crossfade-vs-teardrop ship fork + the liquidPreview toggle are GONE. The witness
//        is the ABSENCE of the perf-gated fork. RED at the pre-wave HEAD (liquidPreview +
//        vtOrientation present); GREEN on the delete.
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

const APPSHELL = "demo/shell/AppShell.vue";
const SIDEBAR = "demo/shell/SidebarDock.vue";
const BOTTOM = "demo/shell/BottomDock.vue";
// BG.W-SHELL-DOCK-DRY — the shared facet-rail loop (the useContextualDockLayers wire)
// + the morph-button wiring (the toggle-dock-morph dispatch) were factored out of both
// shell SFCs into this composable; M1/M3 FOLLOW the carve into it.
const SHELL = "demo/shell/useShellNavDock.ts";
const MORPH_CTX = "src/components/custom/dock/composables/dockMorphContext.ts";
// BB.W-CARVE4 — the measure helpers (nestedTargetsWithin/forceNestedMaxContent/
// measureTo + the outerEl.contains nested-ordering) carved into this sibling leaf;
// the M5 BA-VJS-1 nested-ordering assert reads the orchestrator + the leaf together.
const MORPH_MEASURE = "src/components/custom/dock/composables/dockMorphMeasure.ts";
const CONSTANTS = "src/components/custom/dock/constants.ts";

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

// BG.W-DOCK-INPLACE-MORPH — the M2/M4 morph-register predicates as a PURE helper, so
// detect() reads the REAL AppShell through it AND the self-test bites synthetic strings
// through the SAME regexes (a diseased modal MUST flag; a teardrop-only shell MUST pass).
// The caller passes a comment-STRIPPED source (a prose mention of role="dialog" in a
// deletion note is not a live modal).
export function morphRegisterFacts(src) {
    return {
        // Bidirectional on the ONE scalar (toggle, or both-direction morphTo).
        bidirectional:
            /morph\.toggle\s*\(/.test(src) ||
            (/morph\.morphTo\s*\(\s*["']horizontal["']/.test(src) &&
                /morph\.morphTo\s*\(\s*["']vertical["']/.test(src)),
        // No clip-path interpolation across the topology flip (AX.W42 fold-7 NO-GO).
        noClipMorph: !(
            /clip-path[^;]*var\(\s*--dock-morph-t/.test(src) ||
            /transition:[^;]*clip-path/.test(src)
        ),
        // The modal stage is DELETED — no raw role="dialog", no morphStageOpen state.
        noModalStage:
            !/role\s*=\s*["']dialog["']/.test(src) && !/morphStageOpen/.test(src),
        // The synthetic two-dock VT crossfade is DELETED — no vtOrientation shadow, no
        // modal-local #shell-dock-morph-goo inline filter.
        noSyntheticVt:
            !/vtOrientation/.test(src) && !/#shell-dock-morph-goo/.test(src),
        // The in-place teardrop is the register — the .dock-morph-bridge references the
        // canonical #dock-morph-goo mount (F6 goo-id re-point).
        teardropRegister:
            /dock-morph-bridge/.test(src) && /url\(#dock-morph-goo\)/.test(src),
        // No perf-gated ship fork — no liquidPreview toggle, no vtOrientation default.
        noPerfGatedFork:
            !/liquidPreview/.test(src) && !/vtOrientation/.test(src),
    };
}

// The self-test bite (the born-RED discipline): a synthetic DISEASED AppShell (the modal
// + the synthetic VT crossfade + the modal-local goo + the liquidPreview fork) MUST flag
// every M2/M4 predicate, and a synthetic HEALTHY teardrop-only shell MUST pass them — so
// a regression that re-introduces the modal/VT crossfade re-reds the gate.
export function selfTest() {
    const failures = [];
    const diseased = `
        const morphStageOpen = ref(false);
        const vtOrientation = ref("vertical");
        const liquidPreview = ref(false);
        <div v-if="morphStageOpen" role="dialog" @keydown.esc="closeMorphStage">
        <filter id="shell-dock-morph-goo"></filter>
        startViewTransition(() => { vtOrientation.value = "horizontal"; });
    `;
    const healthy = `
        const morph = useDockOrientationMorph({ rootEl: asideEl });
        function onToggleShellMorph() { morph.toggle(); }
        const morphGooFilter = computed(() => "url(#dock-morph-goo)");
        <div class="dock-morph-bridge dock-morph-bridge--inplace" />
    `;
    const d = morphRegisterFacts(diseased);
    if (d.noModalStage) failures.push("self-test: diseased modal did NOT flag noModalStage");
    if (d.noSyntheticVt) failures.push("self-test: diseased VT crossfade did NOT flag noSyntheticVt");
    if (d.noPerfGatedFork)
        failures.push("self-test: diseased liquidPreview fork did NOT flag noPerfGatedFork");
    const h = morphRegisterFacts(healthy);
    if (!h.noModalStage) failures.push("self-test: teardrop-only shell false-flagged noModalStage");
    if (!h.noSyntheticVt) failures.push("self-test: teardrop-only shell false-flagged noSyntheticVt");
    if (!h.teardropRegister)
        failures.push("self-test: teardrop-only shell did NOT recognize the #dock-morph-goo register");
    if (!h.bidirectional)
        failures.push("self-test: teardrop-only shell did NOT recognize morph.toggle bidirectionality");
    return failures;
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
    // BG.W-SHELL-DOCK-DRY — the carved leaf both shell docks now consume for the shared
    // facet-rail loop + the morph-button dispatch (M1/M3 follow the composition into it).
    const shell = stripComments(read(SHELL));
    const shellDispatchesMorph = /toggle-dock-morph/.test(shell);
    const shellWiresResolver = /useContextualDockLayers/.test(shell);
    // BB.W-CARVE4 — read the orchestrator + the carved measure leaf together so the
    // M5 nested-ordering asserts FOLLOW the composition into the leaf (the rAF-block
    // `const nested = nestedTargetsWithin` wiring stays in dockMorphContext.ts; the
    // `outerEl.contains` nested-detection moved to dockMorphMeasure.ts).
    const morphCtx = stripComments(read(MORPH_CTX) + "\n" + read(MORPH_MEASURE));
    const morphCtxOnly = stripComments(read(MORPH_CTX));
    const constants = stripComments(read(CONSTANTS));

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
    // The shell docks carry the morph control that opens the demonstration — an
    // ArrowLeftRight button whose handler dispatches the toggle-dock-morph event. The
    // dispatch may live INLINE in the SFC OR (BG.W-SHELL-DOCK-DRY) in the `openDockMorph`
    // the SFC destructures from `useShellNavDock` (follow-the-carve).
    const morphControl = (code) =>
        /ArrowLeftRight/.test(code) &&
        (/toggle-dock-morph/.test(code) ||
            (/useShellNavDock\b/.test(code) &&
                /\bopenDockMorph\b/.test(code) &&
                shellDispatchesMorph));
    const sidebarControl = morphControl(sidebar);
    const bottomControl = morphControl(bottom);
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

    // ── M2 (BG.W-DOCK-INPLACE-MORPH — INVERTED) — the in-place teardrop is the ONLY
    //    V↔H register: no modal, no synthetic two-dock View-Transitions crossfade ──────
    // The morph is bidirectional on the ONE scalar + no clip-path topology morph
    // (unchanged), AND the modal + the synthetic-dock VT crossfade + the modal-local goo
    // filter are DELETED, the teardrop referencing the canonical #dock-morph-goo mount.
    const m2 = morphRegisterFacts(appShell);
    assert("M2 — the shell morph is bidirectional on the one scalar (toggle/morphTo)", m2.bidirectional);
    assert("M2 — no clip-path interpolation across the orientation flip (topology limit)", m2.noClipMorph);
    assert(
        'M2 — the V↔H modal stage is DELETED (no role="dialog", no morphStageOpen)',
        m2.noModalStage,
    );
    assert(
        "M2 — the synthetic two-dock View-Transitions crossfade is DELETED (no vtOrientation, no #shell-dock-morph-goo)",
        m2.noSyntheticVt,
    );
    assert(
        "M2 — the in-place liquid teardrop is the shipped register (references the canonical #dock-morph-goo)",
        m2.teardropRegister,
    );

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
    // BG.W-SHELL-DOCK-DRY — the resolver wire + railItems map were factored into
    // `useShellNavDock`; FOLLOW the carve. The SFC reaches the resolver directly OR via
    // the composable it consumes; it still binds `railContext` + renders the rail surface
    // (the `<DockSection :sections>` grouping / the `demo-facet-rail` tablist).
    function shellLayering(code) {
        const reachesResolver =
            /useContextualDockLayers\s*\(/.test(code) ||
            (/useShellNavDock\b/.test(code) && shellWiresResolver);
        return (
            reachesResolver &&
            /railContext/.test(code) &&
            /DockSection/.test(code) &&
            (/DockStack/.test(code) || /demo-facet-rail/.test(code))
        );
    }
    assert("M3 — the SidebarDock exercises the in-situ layering/contextual switch", shellLayering(sidebar));
    assert("M3 — the BottomDock exercises the in-situ layering/contextual switch", shellLayering(bottom));

    // ── M4 (BG.W-DOCK-INPLACE-MORPH — RETIRED) — no perf-gated ship decision ────────
    // The pass-2 M4 gated the teardrop as the perf-OPTIONAL register behind a VT-crossfade
    // default; the teardrop is now the ONLY V↔H register (M2), so there is no
    // crossfade-vs-teardrop ship fork + no liquidPreview toggle to gate it. The witness is
    // the ABSENCE of the perf-gated fork.
    assert(
        "M4 — the perf-gated teardrop-vs-crossfade ship fork is RETIRED (no liquidPreview, no vtOrientation)",
        m2.noPerfGatedFork,
    );

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

    // The self-test bite — a synthetic diseased modal MUST flag, a teardrop-only shell
    // MUST pass; a broken detector reds the gate (the born-RED discipline).
    for (const f of selfTest()) {
        facts[f] = false;
        violations.push(f);
    }

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
        `  M2 in-place teardrop-only (no modal, no VT)     : ${ok("M2 — the shell morph is bidirectional on the one scalar (toggle/morphTo)", "M2 — no clip-path interpolation across the orientation flip (topology limit)", 'M2 — the V↔H modal stage is DELETED (no role="dialog", no morphStageOpen)', "M2 — the synthetic two-dock View-Transitions crossfade is DELETED (no vtOrientation, no #shell-dock-morph-goo)", "M2 — the in-place liquid teardrop is the shipped register (references the canonical #dock-morph-goo)") ? "YES" : "NO"}`,
    );
    console.log(
        `  M3 in-situ layering/contextual switch wired     : ${ok("M3 — the SidebarDock exercises the in-situ layering/contextual switch", "M3 — the BottomDock exercises the in-situ layering/contextual switch") ? "YES" : "NO"}`,
    );
    console.log(
        `  M4 perf-gated ship fork RETIRED (teardrop-only)  : ${ok("M4 — the perf-gated teardrop-vs-crossfade ship fork is RETIRED (no liquidPreview, no vtOrientation)") ? "YES" : "NO"}`,
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
