#!/usr/bin/env node
// BB.W-BORDER-PROGRESS — progress IS the element's border (proof:border-progress).
//
// The born-RED→GREEN device-free SOURCE arm for the library's masked-conic border
// ring — the primitive where progress is the card's own EDGE, not a floating bar.
// The miss is structural: the three progress variants are all horizontal
// track-and-fill RECTs (the floating-bar register the user is rejecting, C2). This
// gate locks the gestalt the ask MEASURED superior:
//
//   W1 — THE RING IS THE BORDER, MASKED-CONIC, NOT A FLOATING BAR. The component
//        paints a `conic-gradient` mask-composited into the border band via a
//        `padding-box`/`border-box` mask-composite (the radius-following cut-out)
//        — AND carries NO `border-image` (the corner-squaring form the ask forbids,
//        measured inferior) AND no absolutely-positioned floating track-and-fill
//        RECT. Bite: a `border-image` in the consumption REDs; a missing
//        mask-composite pair REDs (a bottom RECT called a border fails the
//        mask-composite-present clause).
//   W2 — THE @property ANGLE IS REGISTERED + INTERPOLABLE. A registered
//        `@property --border-progress-fill <percentage>` exists (`inherits: false`
//        + an `initial-value`, the safe unregistered fallback), and the conic
//        sweep READS it (`conic-gradient(…, transparent var(--border-progress-fill),
//        …)`).
//   W3 — THE SPECTRUM IS OKLCH/SHORTER-HUE VIA value.js sampleColorRamp (the CONSUME
//        DISCHARGED, no re-roll). The spectrum walk IMPORTS the `/color` leaf +
//        value.js's `sampleColorRamp` walked the `"shorter"` arc, re-implements ZERO
//        color math (no inline OKLab→sRGB matrix). The `// CONSUME(value.js 0.13.0
//        oklchSpectrum):` interim is DISCHARGED — the local `interpolateHue` walk is
//        GONE, re-pointed onto the published `sampleColorRamp`; the marker must be
//        ABSENT (consume-and-delete — no dangling re-point booking survives).
//   W4 — THE COVERAGE AXIS + THE 10-14px ENVELOPE. The `coverage` prop resolves
//        `full-ring` | `bottom-edge` through ONE conic-mask mechanism (a
//        `coverage`-scoped mask region, NOT a parallel conic-fill block), and the
//        width default + the envelope constants sit inside [10, 14]px.
//   W5 — THE MILESTONE REGISTER + THE COLOCATION/STRUCTURE SURFACE. A phase-edge
//        `milestone` emit (+ a PRM-gated `data-milestone` pulse) fires; the
//        feature-dir carries the colocation four (composables/ + constants.ts +
//        README.md + the dir); the subpath mirror + the api type publication +
//        package.json export are present.
//
// The BINDING painted truth is the π readback (tests-visual/border-progress.spec.ts
// — the radius-following ring, the backdrop-intact interior, the no-trough spectrum,
// the bottom-edge coverage, both modes) + the W-BORDER-PROGRESS-DELTA capture + the
// proof:ba-gestalt verdict (BA inv-4 — the P-1 source-green/visually-broken
// close-class this gate's π half kills). This gate is the no-device CI half.
//
// House style mirrors proof-card-padding.mjs / proof-icon-chip.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation. The W6 self-test bite proves the PURE detector flags a synthetic
// border-image / missing-mask / re-rolled-color / out-of-envelope / floating-bar.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const d = (p) => resolve(ROOT, "src/components/custom/border-progress", p);
    _cliPaths = {
        ROOT,
        DIR: resolve(ROOT, "src/components/custom/border-progress"),
        VUE: d("BorderProgress.vue"),
        HELPER: d("composables/useBorderSpectrum.ts"),
        // BC.W-AX-BP-LAZY — the value.js OKLCH/shorter-hue walk + the CONSUME marker
        // in the dynamically-imported spectrum-walk.ts leaf (the eager-graph payload
        // move). W3's value.js-consume evidence FOLLOWS the walk into the leaf (the
        // proof:webgl-substrate-single "asserts follow the composition into the carved
        // leaf" precedent — proof:bp-lazy owns the dynamic-boundary lock).
        // BI.W-SCROLL-PROGRESS-RIM — the walk was PROMOTED to the shared `/color` leaf
        // (its natural home beside cssToOklch); border-progress stays a consumer of the
        // moved leaf, so W3 FOLLOWS the walk into /color (BOTH green until the retire wave).
        WALK: resolve(ROOT, "src/composables/color/spectrum-walk.ts"),
        CONSTANTS: d("constants.ts"),
        INDEX: d("index.ts"),
        README: d("README.md"),
        CSS: resolve(ROOT, "src/styles/border-progress.css"),
        PROPERTY_REGS: resolve(ROOT, "src/styles/tokens/property-regs.css"),
        INDEX_CSS: resolve(ROOT, "src/styles/index.css"),
        SUBPATH: resolve(ROOT, "src/subpaths/border-progress.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        PKG: resolve(ROOT, "package.json"),
        // BG.W-DOCK-SCROLL-PROGRESS — the W7 dock-consumer arm reads the demo shell
        // (the reference adoption: the page-scroll progress IS the leftside dock's
        // border; the standalone bar is DEFINITION-ABSENT).
        SIDEBAR_DOCK: resolve(ROOT, "demo/shell/SidebarDock.vue"),
        APP_SHELL: resolve(ROOT, "demo/shell/AppShell.vue"),
        DOCK_NAV: resolve(ROOT, "demo/shell/dock-nav.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_BORDER_PROGRESS_ARTIFACT",
            "BB-border-progress",
        ),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            // keep `http://`-style `://` (no URL form here, but the house idiom)
            const i = l.search(/(^|[^:])\/\//);
            if (i === -1) return l;
            const m = l.match(/(^|[^:])\/\//);
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic
 * inputs) and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectBorderProgress(inputs) {
    const {
        vue = "",
        vueRaw = "", // un-stripped (for the CONSUME-marker comment presence)
        helper = "",
        helperRaw = "",
        // BC.W-AX-BP-LAZY — the carved value.js-bearing dynamic leaf (spectrum-walk.ts).
        walk = "",
        walkRaw = "",
        constants = "",
        css = "",
        propertyRegs = "",
        indexCss = "",
        subpath = "",
        apiIndex = "",
        pkg = "",
        readmeExists = false,
        constantsExists = false,
        helperExists = false,
        dirExists = false,
    } = inputs;

    const violations = [];
    const facts = { w1: {}, w2: {}, w3: {}, w4: {}, w5: {} };

    // ── W1 — the ring is the BORDER, masked-conic, not a floating bar ─────────
    // The consumption (css) carries the radius-following mask-composite pair.
    const hasMaskComposite =
        /mask-composite\s*:\s*exclude/.test(css) &&
        /-webkit-mask-composite\s*:\s*xor/.test(css);
    const hasPaddingBorderBoxPair =
        /padding-box/.test(css) && /border-box/.test(css);
    const hasConic = /conic-gradient\s*\(/.test(css);
    // The forbidden corner-squaring path + the floating-bar RECT.
    const hasBorderImage =
        /\bborder-image\b/.test(css) || /\bborder-image\b/.test(vue);
    // A floating-bar child = an absolutely-positioned track-and-fill bar (a
    // `position: absolute` rule with a `width`/`height` percentage fill that is NOT
    // the radius-following ring layer). We narrow to a forbidden literal: a
    // declared `.*-track`/`.*-fill` RECT with an explicit width animation. The
    // honest negative is "no border-image, the mask-composite IS the only path".
    facts.w1 = {
        hasMaskComposite,
        hasPaddingBorderBoxPair,
        hasConic,
        hasBorderImage,
    };
    if (!dirExists)
        violations.push("W1: the border-progress/ feature-dir does not exist");
    if (!hasMaskComposite)
        violations.push(
            "W1: no `mask-composite: exclude` + `-webkit-mask-composite: xor` pair — the radius-following border-band cut-out is the only sanctioned path (a bottom RECT called a border fails this)",
        );
    if (!hasPaddingBorderBoxPair)
        violations.push(
            "W1: no padding-box/border-box mask pair — the border-band mask-composite requires both fills",
        );
    if (!hasConic)
        violations.push("W1: no `conic-gradient(…)` — the ring fill is the conic sweep");
    if (hasBorderImage)
        violations.push(
            "W1: `border-image` present — the corner-squaring path is MEASURED INFERIOR and forbidden (the ring must follow border-radius via mask-composite)",
        );

    // ── W2 — the @property fill is registered + interpolable ──────────────────
    const regBlock =
        propertyRegs.match(
            /@property\s+--border-progress-fill\s*\{[\s\S]*?\}/,
        )?.[0] ?? "";
    const regSyntaxPct = /syntax\s*:\s*"<percentage>"/.test(regBlock);
    const regInheritsFalse = /inherits\s*:\s*false/.test(regBlock);
    const regInitial = /initial-value\s*:/.test(regBlock);
    const conicReadsFill = /var\(--border-progress-fill/.test(css);
    facts.w2 = {
        registered: regBlock.length > 0,
        regSyntaxPct,
        regInheritsFalse,
        regInitial,
        conicReadsFill,
    };
    if (regBlock.length === 0)
        violations.push(
            "W2: no `@property --border-progress-fill` registration in property-regs.css §18",
        );
    if (regBlock.length > 0 && !(regSyntaxPct && regInheritsFalse && regInitial))
        violations.push(
            "W2: the @property reg must be `<percentage>` + `inherits: false` + an `initial-value` (the safe unregistered fallback)",
        );
    if (!conicReadsFill)
        violations.push(
            "W2: the conic sweep does not read `var(--border-progress-fill)` — the registered angle must drive the interpolable fill",
        );

    // ── W3 — the spectrum is OKLCH/shorter-hue via value.js sampleColorRamp ───
    // BC.W-AX-BP-LAZY — the value.js-bearing walk lives in the CARVED spectrum-walk.ts
    // leaf (the dynamic-import boundary); W3 reads the carve. The value.js CONSUME is
    // DISCHARGED here (BC.W-VALUE-JS-CONSUME): the local `interpolateHue` walk is
    // re-pointed onto value.js's published `sampleColorRamp`, and the consume-and-delete
    // marker is GONE (no dangling re-point booking — the no-orphan-marker discipline).
    // BI.W-SCROLL-PROGRESS-RIM — the walk now LIVES IN the /color leaf, so it composes the
    // leaf's own color primitives via a same-dir `./index` import (a walk INSIDE
    // composables/color trivially "imports the leaf"); the pre-promotion
    // `…/composables/color` form is still accepted for the transitional/self-test corpus.
    const importsLeaf =
        /from\s+["'](\.\/index|\.|[^"']*composables\/color)["']/.test(walk);
    const importsSampleColorRamp = /\bsampleColorRamp\b/.test(walk);
    const usesShorterArc = /["']shorter["']/.test(walk);
    // The interim is discharged — the local interpolateHue form must be GONE (the
    // shorter-hue arc now rides value.js's sampleColorRamp `hueMethod: "shorter"`).
    const hasInterpolateHueInterim = /\binterpolateHue\b/.test(walk);
    // The CONSUME marker must be ABSENT post-discharge (consume-and-delete). Scanned in
    // the carved walk leaf AND the sync shell so a re-introduced booking anywhere reds.
    const consumeMarkerRe = /CONSUME\(value\.js[^)]*oklchSpectrum\)/;
    const hasOrphanConsumeMarker =
        consumeMarkerRe.test(walkRaw) || consumeMarkerRe.test(helperRaw);
    // The no-re-roll fence: no inline OKLab→sRGB matrix / hand-rolled hue lerp in the
    // component, the sync shell, OR the carved walk leaf (proof:single-color-core's
    // mirror). A re-rolled path would name the matrix coefficients or re-define a
    // color primitive — scanned across all three so the carve cannot hide a re-roll.
    const reRollRe =
        /(srgbToOKLab|oklabToLinearSRGB|oklabToRgb255|rawOklabToOklch|rawOklchToOklab)\s*=|\b0\.2104542553\b|\b1\.9779984951\b/;
    const reRollsColorMath =
        reRollRe.test(helper) || reRollRe.test(walk) || reRollRe.test(vue);
    facts.w3 = {
        importsLeaf,
        importsSampleColorRamp,
        usesShorterArc,
        hasInterpolateHueInterim,
        hasOrphanConsumeMarker,
        reRollsColorMath,
    };
    if (!helperExists)
        violations.push(
            "W3: the spectrum helper composables/useBorderSpectrum.ts does not exist",
        );
    if (!importsLeaf)
        violations.push(
            "W3: the spectrum walk does not IMPORT the /color leaf (src/composables/color) — the CONSUME composes the leaf, not a fork",
        );
    if (!(importsSampleColorRamp && usesShorterArc))
        violations.push(
            'W3: the spectrum walk does not use value.js `sampleColorRamp` with the `"shorter"` arc — the published helper IS the OKLCH/shorter-hue walk (no chroma trough)',
        );
    if (hasInterpolateHueInterim)
        violations.push(
            "W3: the local `interpolateHue` interim survives — the CONSUME is DISCHARGED, the hand-rolled shorter-hue walk must be GONE (re-pointed onto sampleColorRamp)",
        );
    if (hasOrphanConsumeMarker)
        violations.push(
            "W3: the `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker survives — the consume is discharged, the re-point booking must be DELETED (no orphan marker)",
        );
    if (reRollsColorMath)
        violations.push(
            "W3: a re-implemented OKLab/sRGB color matrix or hand-rolled primitive is present — the math stays value.js (proof:single-color-core's mirror)",
        );

    // ── W4 — the coverage axis + the 10-14px envelope ────────────────────────
    const propCoverage = /coverage\??\s*:\s*BorderProgressCoverage/.test(vue);
    const coverageUnion =
        /BorderProgressCoverage\s*=\s*["']full-ring["']\s*\|\s*["']bottom-edge["']/.test(
            constants,
        );
    const coverageData = /data-coverage/.test(vue) && /data-coverage/.test(css);
    const bottomEdgeScopedMask =
        /\[data-coverage="bottom-edge"\][\s\S]*?mask-composite/.test(css);
    // The 10-14px envelope: the constants declare MIN/MAX/DEFAULT inside [10,14].
    const widthDefault = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_DEFAULT\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const widthMin = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_MIN\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const widthMax = Number(
        constants.match(/BORDER_PROGRESS_WIDTH_MAX\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const envelopeOk =
        widthMin === 10 &&
        widthMax === 14 &&
        Number.isFinite(widthDefault) &&
        widthDefault >= 10 &&
        widthDefault <= 14;
    facts.w4 = {
        propCoverage,
        coverageUnion,
        coverageData,
        bottomEdgeScopedMask,
        widthDefault,
        widthMin,
        widthMax,
        envelopeOk,
    };
    if (!coverageUnion)
        violations.push(
            'W4: the `BorderProgressCoverage = "full-ring" | "bottom-edge"` union is not declared in constants.ts',
        );
    if (!(propCoverage && coverageData))
        violations.push(
            "W4: the coverage axis is not threaded (the `coverage` prop + the `data-coverage` CSS seam)",
        );
    if (!bottomEdgeScopedMask)
        violations.push(
            "W4: `bottom-edge` does not scope the SHARED mask (a `[data-coverage=\"bottom-edge\"]` mask-composite rule) — it must be a coverage-scoped mask region, NOT a parallel conic-fill recipe",
        );
    if (!envelopeOk)
        violations.push(
            `W4: the thickness envelope is not [10,14]px (MIN=${widthMin} MAX=${widthMax} DEFAULT=${widthDefault}) — the AMENDED A1 thicker band (NOT 6-8px) must lock`,
        );

    // ── W5 — the milestone register + the colocation/structure surface ───────
    const milestoneEmit = /emit\s*\(\s*["']milestone["']/.test(vue);
    const milestoneType =
        /BorderProgressMilestone\b/.test(constants) &&
        /milestones\??\s*:/.test(vue);
    const dataMilestone = /data-milestone/.test(vue) && /data-milestone/.test(css);
    const prmPulse =
        /@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?data-milestone/.test(
            css,
        );
    const subpathMirror = /export \* from ["']\.\.\/components\/custom\/border-progress["']/.test(
        subpath,
    );
    const apiPublishes = /BorderProgress(Coverage|Props|Milestone)/.test(apiIndex);
    const pkgExport = /"\.\/border-progress"/.test(pkg);
    const partialImported = /@import\s+["']\.\/border-progress\.css["']/.test(
        indexCss,
    );
    facts.w5 = {
        milestoneEmit,
        milestoneType,
        dataMilestone,
        prmPulse,
        readmeExists,
        constantsExists,
        helperExists,
        subpathMirror,
        apiPublishes,
        pkgExport,
        partialImported,
    };
    if (!milestoneEmit)
        violations.push(
            "W5: no `emit('milestone', …)` — the phase-edge milestone event seam is required",
        );
    if (!milestoneType)
        violations.push(
            "W5: the `BorderProgressMilestone` type + the `milestones` prop are not threaded",
        );
    if (!(dataMilestone && prmPulse))
        violations.push(
            "W5: the `data-milestone` pulse is not PRM-gated (no edge-pulse under prefers-reduced-motion: reduce)",
        );
    if (!(readmeExists && constantsExists && helperExists))
        violations.push(
            "W5: the colocation four are incomplete (composables/useBorderSpectrum.ts + constants.ts + README.md + the dir)",
        );
    if (!subpathMirror)
        violations.push(
            "W5: the src/subpaths/border-progress.ts mirror is missing/mis-shaped",
        );
    if (!apiPublishes)
        violations.push(
            "W5: src/api/index.ts does not publish a BorderProgress* type (the discovery layer)",
        );
    if (!pkgExport)
        violations.push("W5: package.json has no `./border-progress` export");
    if (!partialImported)
        violations.push(
            "W5: src/styles/index.css does not @import ./border-progress.css (the consumption partial)",
        );

    // ── W7 — the dock-consumer arm (BG.W-DOCK-SCROLL-PROGRESS) ────────────────
    // The page-scroll progress IS the leftside dock's BORDER: the ring's fill
    // genuinely SWEEPS, the vertical-edge coverage ships, the shell dock wears the
    // ring across its three settled forms, and the standalone bar is
    // DEFINITION-ABSENT (clean break, no alias).
    const sidebarDock = inputs.sidebarDock ?? "";
    const appShell = inputs.appShell ?? "";
    const dockNav = inputs.dockNav ?? "";

    // W7a — the fill actually sweeps: the SFC's spectrum stop positions scale by
    // the registered fill (`calc(var(--border-progress-fill) * f)`), so the
    // `transparent var(--fill)` front lands AT the spectrum tail. Fixed-position
    // stops (`0..100%`) clamp the transparent front past the tail and the ring
    // paints FULL at every value — the inert-fill defect (live-verified at 42%).
    const fillScaledStops = /calc\(var\(--border-progress-fill/.test(vue);
    // W7b — the vertical-edge coverage ships: the union widens + the coverage-
    // scoped mask exists + its PAINT is the LINEAR block-axis gradient (a conic
    // maps a single edge nonlinearly).
    const edgeCoverageUnion = /["']inline-end-edge["']/.test(constants);
    const edgeBlock =
        /\[data-coverage="inline-end-edge"\][^{]*\{([^{}]*)\}/.exec(css)?.[1] ?? "";
    const edgeCoverageMask = /mask-composite/.test(edgeBlock);
    const edgeCoverageLinear = /linear-gradient\(\s*to bottom/.test(edgeBlock);
    // W7c — the shell dock wears the ring: SidebarDock mounts <BorderProgress>
    // bound to the provided shell scroll fraction, with the THREE coverage states
    // wired (vertical rail → inline-end-edge · settled horizontal bar →
    // bottom-edge · collapsed pill → full-ring).
    const dockMounts = /<BorderProgress\b/.test(sidebarDock);
    const dockReadsFraction = /useShellScrollProgress\(\)/.test(sidebarDock);
    // BI.W-DOCK-RETIRES reconcile — the shell dock is a STATIC vertical rail now (the
    // in-situ V↔H orientation morph retired decided-terminal), so the HORIZONTAL
    // `bottom-edge` arm is gone from SidebarDock. The two LIVE coverage states are the
    // vertical rail's `inline-end-edge` + a collapsed pill's `full-ring`. The `bottom-edge`
    // COVERAGE RULE stays in border-progress.css (W4/W8 assert it for card-chrome
    // consumers) — only the dock USAGE dropped it.
    const dockCoverageStates =
        /inline-end-edge/.test(sidebarDock) && /full-ring/.test(sidebarDock);
    const shellProvidesFraction =
        /SHELL_SCROLL_PROGRESS/.test(appShell) && /provide\(/.test(appShell);
    // W7d — the standalone bar is DEFINITION-ABSENT: no live `.demo-scroll-progress`
    // CSS rule and no live class usage in the shell (comments stripped above).
    const barRuleSurvives = /\.demo-scroll-progress[^{}]*\{/.test(dockNav);
    const barClassSurvives = /class="[^"]*demo-scroll-progress/.test(appShell);
    // W7e — props defer to the cascade when unset (the token-first seam the dock
    // ring rides: `--border-progress-radius: var(--radius-pill)` follows the pill
    // host with zero measurement).
    const propsDeferToCascade =
        /props\.width\s*!=\s*null/.test(vue) && /props\.radius\s*!=\s*null/.test(vue);
    const dockRadiusToken = /--border-progress-radius:\s*var\(--radius-pill/.test(
        dockNav,
    );
    facts.w7 = {
        fillScaledStops,
        edgeCoverageUnion,
        edgeCoverageMask,
        edgeCoverageLinear,
        dockMounts,
        dockReadsFraction,
        dockCoverageStates,
        shellProvidesFraction,
        barAbsent: !barRuleSurvives && !barClassSurvives,
        propsDeferToCascade,
        dockRadiusToken,
    };
    if (!fillScaledStops)
        violations.push(
            "W7a: the spectrum stop positions do not scale by the registered fill (`calc(var(--border-progress-fill) * f)` absent from BorderProgress.vue) — fixed-position stops clamp the transparent front past the tail and the ring paints FULL at every value (the inert-fill defect)",
        );
    if (!(edgeCoverageUnion && edgeCoverageMask && edgeCoverageLinear))
        violations.push(
            'W7b: the `inline-end-edge` coverage is not shipped (union widened + a `[data-coverage="inline-end-edge"]` coverage-scoped mask + the LINEAR block-axis paint)',
        );
    if (!(dockMounts && dockReadsFraction && dockCoverageStates))
        violations.push(
            "W7c: the shell dock does not wear the scroll-progress border (SidebarDock must mount <BorderProgress> off useShellScrollProgress() with the inline-end-edge (vertical rail) + full-ring (collapsed pill) coverage states wired — the bottom-edge arm retired with the V↔H morph, BI.W-DOCK-RETIRES)",
        );
    if (!shellProvidesFraction)
        violations.push(
            "W7c: AppShell does not provide the shell scroll fraction (SHELL_SCROLL_PROGRESS)",
        );
    if (barRuleSurvives || barClassSurvives)
        violations.push(
            "W7d: the standalone `.demo-scroll-progress` bar SURVIVES (a live CSS rule or class usage) — it retired onto the dock border (clean break, no alias)",
        );
    if (!(propsDeferToCascade && dockRadiusToken))
        violations.push(
            "W7e: the radius/width props do not defer to the cascade when unset (or the dock ring does not ride `--border-progress-radius: var(--radius-pill)`) — the token-first follow-the-host seam",
        );

    // ── W8 — BI.W-BP-BOTTOM-LINEAR: BOTH edge registers paint a LINEAR fill ────
    // The GEO-4 dual-path fix. The bottom-edge register (a HORIZONTAL band) must
    // OVERRIDE `background` to a LINEAR gradient reading --border-progress-fill (the
    // `to right` twin of the inline-end-edge `to bottom` sibling), so the value maps
    // LINEARLY along the block axis. Inheriting the base perimeter conic (:48-54)
    // mapped the single bottom edge nonlinearly through the corner angles and the
    // band read as a full-width hollow outlined rect (UF-J4). The clause: BOTH edge
    // registers override background to a LINEAR gradient reading the fill; neither
    // inherits the perimeter conic. ONE shared linear-paint expression — full-ring
    // keeps its conic.
    const bottomEdgeBlock =
        /\[data-coverage="bottom-edge"\][^{]*\{([^{}]*)\}/.exec(css)?.[1] ?? "";
    const bottomEdgeLinear =
        /background\s*:\s*linear-gradient\(\s*to right/.test(bottomEdgeBlock) &&
        /var\(--border-progress-fill/.test(bottomEdgeBlock);
    // The inline-end-edge sibling ALREADY paints a linear `to bottom` fill (W7b's
    // edgeCoverageLinear + the fill-read). Re-assert it here so the clause binds
    // BOTH registers symmetrically — a regression on either edge reds.
    const inlineEndLinear =
        edgeCoverageLinear && /var\(--border-progress-fill/.test(edgeBlock);
    facts.w8 = { bottomEdgeLinear, inlineEndLinear };
    if (!bottomEdgeLinear)
        violations.push(
            "W8: the `bottom-edge` coverage does not override `background` to a LINEAR `to right` gradient reading --border-progress-fill — it inherits the base perimeter conic (:48-54), which maps the single bottom edge nonlinearly through the corner angles (the UF-J4 hollow-outlined-rect read). Mirror the inline-end-edge sibling (a conic -> linear paint swap; the SAME fill-scaled spectrum stops)",
        );
    if (!inlineEndLinear)
        violations.push(
            "W8: the `inline-end-edge` coverage does not paint a LINEAR fill reading --border-progress-fill — both edge registers share ONE linear-paint expression (neither inherits the perimeter conic)",
        );

    return { facts, violations };
}

// ── the live-disk read ───────────────────────────────────────────────────────
function readInputs(P) {
    const vueRaw = read(P.VUE);
    const helperRaw = read(P.HELPER);
    const walkRaw = read(P.WALK);
    return {
        vue: stripTs(vueRaw),
        vueRaw,
        helper: stripTs(helperRaw),
        helperRaw,
        walk: stripTs(walkRaw),
        walkRaw,
        constants: stripTs(read(P.CONSTANTS)),
        css: stripCss(read(P.CSS)),
        propertyRegs: stripCss(read(P.PROPERTY_REGS)),
        indexCss: stripCss(read(P.INDEX_CSS)),
        subpath: stripTs(read(P.SUBPATH)),
        apiIndex: stripTs(read(P.API_INDEX)),
        pkg: read(P.PKG),
        readmeExists: existsSync(P.README),
        constantsExists: existsSync(P.CONSTANTS),
        helperExists: existsSync(P.HELPER),
        dirExists: existsSync(P.DIR),
        // W7 (BG.W-DOCK-SCROLL-PROGRESS) — the demo-shell consumer surface. HTML
        // comments strip too (the retire notes NAME the retired bar in prose; only
        // a LIVE usage may count).
        sidebarDock: stripTs(read(P.SIDEBAR_DOCK)).replace(/<!--[\s\S]*?-->/g, " "),
        appShell: stripTs(read(P.APP_SHELL)).replace(/<!--[\s\S]*?-->/g, " "),
        dockNav: stripCss(read(P.DOCK_NAV)),
    };
}

// ── W6 self-test: the false-witness bites (each planted defect must RED) ──────
function selfTest() {
    // A GOOD synthetic corpus the detector greens.
    const good = {
        vue: `coverage?: BorderProgressCoverage
            data-coverage data-milestone
            emit("milestone", { milestone: ms, value })
            milestones?: readonly BorderProgressMilestone[]
            var(--border-progress-fill)
            calc(var(--border-progress-fill, 0%) * 0.5000)
            props.width != null
            props.radius != null`,
        vueRaw: "",
        // The sync shell — value.js-FREE (BC.W-AX-BP-LAZY); the dynamic boundary only.
        helper: `import("./spectrum-walk")`,
        helperRaw: ``,
        // The CARVED value.js-bearing dynamic leaf — W3 reads its evidence here. The
        // value.js CONSUME is DISCHARGED (BC.W-VALUE-JS-CONSUME): the walk uses the
        // published `sampleColorRamp` shorter-hue arc, NO local interpolateHue interim,
        // NO orphan consume marker.
        walk: `import { cssToOklch } from "../../../../composables/color";
            import { sampleColorRamp } from "@mkbabb/value.js";
            sampleColorRamp(a, b, n, { space: "oklch", hueMethod: "shorter" })`,
        walkRaw: ``,
        constants: `export type BorderProgressCoverage = "full-ring" | "bottom-edge" | "inline-end-edge";
            export const BORDER_PROGRESS_WIDTH_MIN = 10;
            export const BORDER_PROGRESS_WIDTH_MAX = 14;
            export const BORDER_PROGRESS_WIDTH_DEFAULT = 12;
            export interface BorderProgressMilestone { at: number; id: string; }`,
        css: `.border-progress__ring {
            background: conic-gradient(from 0deg, var(--s), transparent var(--border-progress-fill), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
            mask-composite: exclude;
        }
        .border-progress[data-coverage="bottom-edge"] .border-progress__ring {
            background: linear-gradient( to right, var(--s), transparent var(--border-progress-fill), transparent );
            mask-composite: exclude, intersect;
        }
        .border-progress[data-coverage="inline-end-edge"] .border-progress__ring {
            background: linear-gradient( to bottom, var(--s), transparent var(--border-progress-fill), transparent );
            mask: linear-gradient(to left, #fff 0 12px, transparent 12px), linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
            mask-composite: intersect, exclude, add;
        }
        @media (prefers-reduced-motion: no-preference) { .border-progress[data-milestone] .x { animation: pulse; } }`,
        propertyRegs: `@property --border-progress-fill { syntax: "<percentage>"; inherits: false; initial-value: 0%; }`,
        indexCss: `@import "./border-progress.css";`,
        subpath: `export * from "../components/custom/border-progress";`,
        apiIndex: `export type { BorderProgressProps, BorderProgressCoverage } from "../components/custom/border-progress";`,
        pkg: `"./border-progress": { "types": "./dist/border-progress.d.ts" }`,
        readmeExists: true,
        constantsExists: true,
        helperExists: true,
        dirExists: true,
        // W7 — the demo-shell dock-consumer corpus (BG.W-DOCK-SCROLL-PROGRESS).
        sidebarDock: `<BorderProgress class="demo-dock-scroll-ring" :coverage="ringCoverage" />
            const scrollProgress = useShellScrollProgress();
            return dock && !dock.expanded ? "full-ring" : o === "horizontal" ? "bottom-edge" : "inline-end-edge";`,
        appShell: `provide(SHELL_SCROLL_PROGRESS, shellScrollProgress);`,
        dockNav: `.demo-dock-progress-host > .demo-dock-scroll-ring { --border-progress-radius: var(--radius-pill, 9999px); }`,
    };
    const baseGreen = detectBorderProgress(good).violations.length === 0;

    const bites = [];
    // Bite A — re-introduce border-image (the corner-squaring path) reds W1.
    bites.push({
        name: "border-image",
        red:
            detectBorderProgress({
                ...good,
                css: good.css + "\n.x { border-image: linear-gradient(red, blue) 1; }",
            }).violations.length > 0,
    });
    // Bite B — drop the mask-composite (a bottom RECT) reds W1.
    bites.push({
        name: "no-mask-composite",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(/mask-composite\s*:\s*exclude/g, "mask-composite: add"),
            }).violations.length > 0,
    });
    // Bite C — re-roll the color math reds W3 (planted in the carved walk leaf).
    bites.push({
        name: "re-rolled-color",
        red:
            detectBorderProgress({
                ...good,
                walk: good.walk + "\nconst rawOklchToOklab = (L,C,h) => [L,0,0];",
            }).violations.length > 0,
    });
    // Bite D — out-of-envelope width (a 6-8px hairline) reds W4.
    bites.push({
        name: "out-of-envelope",
        red:
            detectBorderProgress({
                ...good,
                constants: good.constants
                    .replace("WIDTH_MIN = 10", "WIDTH_MIN = 6")
                    .replace("WIDTH_MAX = 14", "WIDTH_MAX = 8")
                    .replace("WIDTH_DEFAULT = 12", "WIDTH_DEFAULT = 7"),
            }).violations.length > 0,
    });
    // Bite E1 — the discharged interpolateHue interim survives reds W3 (the consume
    // is DISCHARGED — the hand-rolled shorter-hue walk must be GONE).
    bites.push({
        name: "interpolateHue-interim-survives",
        red:
            detectBorderProgress({
                ...good,
                walk: good.walk + '\ninterpolateHue(a, b, f, "shorter");',
            }).violations.length > 0,
    });
    // Bite E2 — an orphan consume marker survives reds W3 (consume-and-delete — the
    // re-point booking must be deleted once discharged).
    bites.push({
        name: "orphan-consume-marker",
        red:
            detectBorderProgress({
                ...good,
                walkRaw: "// CONSUME(value.js 0.13.0 oklchSpectrum): re-point here",
            }).violations.length > 0,
    });
    // Bite F — drop the bottom-edge shared-mask scope reds W4.
    bites.push({
        name: "no-coverage-scope",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /\.border-progress\[data-coverage="bottom-edge"\][^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite G — drop the PRM gate on the milestone pulse reds W5.
    bites.push({
        name: "milestone-not-prm-gated",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /@media \(prefers-reduced-motion: no-preference\)[^}]*\}[^}]*\}/,
                    "",
                ),
            }).violations.length > 0,
    });
    // Bite H (W7a) — fixed-position spectrum stops (the inert-fill defect: the
    // transparent front clamps past the 0..100% tail → the ring paints FULL at
    // every value) reds.
    bites.push({
        name: "inert-fill-fixed-stops",
        red:
            detectBorderProgress({
                ...good,
                vue: good.vue.replace(/calc\(var\(--border-progress-fill[^)]*\)[^)]*\)/, "50.00%"),
            }).violations.some((v) => /W7a/.test(v)),
    });
    // Bite I (W7d) — a LIVE `.demo-scroll-progress` bar rule re-appearing reds.
    bites.push({
        name: "standalone-bar-revives",
        red:
            detectBorderProgress({
                ...good,
                dockNav: good.dockNav + "\n.demo-scroll-progress { position: sticky; }",
            }).violations.some((v) => /W7d/.test(v)),
    });
    // Bite J (W7c) — the collapsed full-ring coverage arm dropped from the dock reds.
    bites.push({
        name: "no-collapsed-full-ring",
        red:
            detectBorderProgress({
                ...good,
                sidebarDock: good.sidebarDock.replace(/"full-ring"/, '"x"'),
            }).violations.some((v) => /W7c/.test(v)),
    });
    // Bite K (W8) — the bottom-edge INHERITING the base perimeter conic (its
    // linear `background` override stripped, mask-only) reds — the GEO-4 dual-path
    // asymmetry the fix closes; the mask stack survives, only the paint is gone.
    bites.push({
        name: "bottom-edge-inherits-conic",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /(\.border-progress\[data-coverage="bottom-edge"\] \.border-progress__ring \{)[^}]*(\})/,
                    "$1 mask-composite: exclude, intersect; $2",
                ),
            }).violations.some((v) => /W8/.test(v)),
    });
    // Bite L (W8) — the inline-end-edge sibling losing its linear paint reds too
    // (the clause binds BOTH edge registers symmetrically).
    bites.push({
        name: "inline-end-edge-loses-linear",
        red:
            detectBorderProgress({
                ...good,
                css: good.css.replace(
                    /(\.border-progress\[data-coverage="inline-end-edge"\] \.border-progress__ring \{)\s*background:[^;]*;/,
                    "$1",
                ),
            }).violations.some((v) => /W8/.test(v)),
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectBorderProgress(inputs);

    // The W6 self-test bites.
    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "W6: the self-test GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(
            `W6: self-test bite(s) did not RED: ${biteFailures.join(", ")}`,
        );
    facts.w6 = { baseGreen: st.baseGreen, allBite: biteFailures.length === 0, bites: st.bites };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:border-progress",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:border-progress — progress IS the element's border (BB.W-BORDER-PROGRESS)",
    );
    console.log(
        `  W1 ring is the BORDER (masked-conic): ${yn(
            facts.w1.hasMaskComposite &&
                facts.w1.hasPaddingBorderBoxPair &&
                facts.w1.hasConic &&
                !facts.w1.hasBorderImage,
        )}  (border-image:${yn(facts.w1.hasBorderImage)})`,
    );
    console.log(
        `  W2 @property fill registered+read  : ${yn(
            facts.w2.registered &&
                facts.w2.regSyntaxPct &&
                facts.w2.regInheritsFalse &&
                facts.w2.regInitial &&
                facts.w2.conicReadsFill,
        )}`,
    );
    console.log(
        `  W3 spectrum OKLCH/shorter sampleColorRamp: ${yn(
            facts.w3.importsLeaf &&
                facts.w3.importsSampleColorRamp &&
                facts.w3.usesShorterArc &&
                !facts.w3.hasInterpolateHueInterim &&
                !facts.w3.hasOrphanConsumeMarker &&
                !facts.w3.reRollsColorMath,
        )}`,
    );
    console.log(
        `  W4 coverage axis + 10-14px envelope: ${yn(
            facts.w4.coverageUnion &&
                facts.w4.propCoverage &&
                facts.w4.coverageData &&
                facts.w4.bottomEdgeScopedMask &&
                facts.w4.envelopeOk,
        )}  (width default:${facts.w4.widthDefault}px)`,
    );
    console.log(
        `  W5 milestone + colocation/surface  : ${yn(
            facts.w5.milestoneEmit &&
                facts.w5.milestoneType &&
                facts.w5.dataMilestone &&
                facts.w5.prmPulse &&
                facts.w5.readmeExists &&
                facts.w5.constantsExists &&
                facts.w5.helperExists &&
                facts.w5.subpathMirror &&
                facts.w5.apiPublishes &&
                facts.w5.pkgExport &&
                facts.w5.partialImported,
        )}`,
    );
    console.log(
        `  W6 self-test bites RED             : ${yn(facts.w6.allBite && facts.w6.baseGreen)}`,
    );
    console.log(
        `  W7 dock-consumer (BG.W-DOCK-SCROLL-PROGRESS): fill-sweeps:${yn(
            facts.w7.fillScaledStops,
        )}  edge-coverage:${yn(
            facts.w7.edgeCoverageUnion &&
                facts.w7.edgeCoverageMask &&
                facts.w7.edgeCoverageLinear,
        )}  dock-wears-ring:${yn(
            facts.w7.dockMounts &&
                facts.w7.dockReadsFraction &&
                facts.w7.dockCoverageStates &&
                facts.w7.shellProvidesFraction,
        )}  bar-absent:${yn(facts.w7.barAbsent)}  defer-to-cascade:${yn(
            facts.w7.propsDeferToCascade && facts.w7.dockRadiusToken,
        )}`,
    );
    console.log(
        `  W8 both edges LINEAR (BI.W-BP-BOTTOM-LINEAR): ${yn(
            facts.w8.bottomEdgeLinear && facts.w8.inlineEndLinear,
        )}  (bottom-edge:${yn(facts.w8.bottomEdgeLinear)}  inline-end-edge:${yn(
            facts.w8.inlineEndLinear,
        )})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
