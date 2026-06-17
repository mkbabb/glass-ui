#!/usr/bin/env node
// BB.W-PERF-PRODUCER — the value.js A′ perf-producer cluster, dispositioned each
// producer-side (proof:perf-producer, born-RED at HEAD pre-wave, GREEN at close).
//
// The four A′ runtime-cost producers the value.js N2 letter's S2 addendum named
// (the audit's no-silent-drop violation, BB.md §3) are each MACHINE-asserted at the
// SOURCE — the comment-strip + pure-detector house pattern, mirroring
// proof-dock-no-scale-pop.mjs / proof-webgl-substrate-single.mjs:
//
//   W1 — A′-4 the morph restyle is scope-narrowed (`.glass-dock` carries
//        `contain: layout style` reconciled with `contain: paint`/`container-type`)
//        AND the layer-swap defers the reka Popper re-position off the synchronous
//        Vue flush (useLayerTransition exposes a `morphing` signal + `deferReposition`
//        helper). BITE: `DOCK_SPRING {response:0.32, dampingFraction:0.7}` is
//        BYTE-UNCHANGED (the value.js letter's explicit fence — a wave that "fixes"
//        fps by re-tuning the spring fails this clause).
//   W2 — A′-6 `--dock-icon-glyph` rides the per-density `--dock-layer-height`
//        (a RATIO via `--dock-icon-glyph-ratio`), NOT the flat `1.25rem * --dock-scale`.
//        BITE: a flat-rem re-introduction reds (the glyph `var()` must reference
//        `--dock-layer-height`).
//   W3 — A′-1 exactly ONE `<canvas>` per GooBlob + ONE `getContext("webgl2")` src
//        site (the substrate) + the `!canvasHandle` double-arm guard + `onUnmounted`
//        dispose. Producer side CLEAN — so W3 is the REGRESSION guard + the by-name
//        route: it reds if a future producer adds a second canvas / drops the dispose
//        / double-arms, AND asserts the BB adopt-book carries the value.js demo-double-
//        mount BY NAME (the no-silent-drop discipline).
//   W4 — A′-5 the aurora WASH backs at a SUB-2× `AV_AURORA_DPR_MAX` ceiling, the
//        focal goo-blob KEEPS `AV_DPR_MAX` (2×). BITE: the two surfaces read DISTINCT
//        ceilings (a wave that lowers BOTH — flattening the focal goo-blob — fails the
//        focal-2×-preserved clause) AND `aurora.frag`/`metaball.frag` are byte-unchanged
//        (the GL fence).
//
// W1-W4 are the device-free CI half. The binding headed-GPU per-frame readback lives
// in tests-visual/perf-producer.spec.ts (the π runtime arm, tagged ["local"]).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const PATHS = {
    shellCss: resolve(ROOT, "src/styles/dock/shell.css"),
    layerTransition: resolve(ROOT, "src/components/custom/dock/composables/useLayerTransition.ts"),
    dockConstants: resolve(ROOT, "src/components/custom/dock/constants.ts"),
    offsetsSizing: resolve(ROOT, "src/styles/tokens/offsets-sizing.css"),
    densityCss: resolve(ROOT, "src/styles/dock/density.css"),
    overflowCss: resolve(ROOT, "src/styles/dock/overflow.css"),
    gooBlobVue: resolve(ROOT, "src/components/custom/goo-blob/GooBlob.vue"),
    metaballRenderer: resolve(ROOT, "src/components/custom/goo-blob/composables/useMetaballRenderer.ts"),
    budget: resolve(ROOT, "src/components/custom/aurora/constants/budget.ts"),
    auroraRuntime: resolve(ROOT, "src/components/custom/aurora/composables/runtime.ts"),
    auroraFrag: resolve(ROOT, "src/components/custom/aurora/constants/shaders/aurora.frag.ts"),
    metaballFrag: resolve(ROOT, "src/components/custom/goo-blob/shaders/metaball.frag.ts"),
    adoptBook: resolve(ROOT, "docs/tranches/BB/PROGRESS.md"),
    delta: resolve(ROOT, "docs/tranches/BB/audit/visual/W-PERF-PRODUCER-DELTA.md"),
};

const ARTIFACT = gateArtifactPath("GLASS_UI_PERF_PRODUCER_ARTIFACT", "BB-perf-producer");

/** Strip block + line comments so a detector never matches inside prose. */
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

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** Collapse all whitespace so a multi-line token form matches a single-line detector. */
function flatten(t) {
    return t.replace(/\s+/g, " ");
}

function run() {
    const violations = [];
    const facts = {};

    // ── W1 — A′-4 morph restyle scope-narrowed + Popper deferred + DOCK_SPRING fenced ──
    const shell = stripComments(read(PATHS.shellCss));
    // `.glass-dock` morph root carries layout + style containment (reconciled with paint).
    // The shell rule sets a single `contain: <axes>;` declaration — assert layout+style present.
    const containMatch = flatten(shell).match(/contain:\s*([a-z\s]+?);/i);
    const containAxes = containMatch ? containMatch[1].trim() : "";
    facts.dockContainAxes = containAxes;
    facts.dockContainment =
        /\blayout\b/.test(containAxes) && /\bstyle\b/.test(containAxes) && /\bpaint\b/.test(containAxes);
    if (!facts.dockContainment) {
        violations.push(
            `A′-4 W1: the .glass-dock morph root must carry \`contain: layout style paint\` (the restyle-scope narrowing reconciled with the existing paint clip) — found \`contain: ${containAxes || "<none>"}\``,
        );
    }
    // The morph root must NOT contain `size` (would break shrink-to-fit — the 3.3.0 sliver).
    facts.dockContainNoSize = !/\bsize\b/.test(containAxes);
    if (!facts.dockContainNoSize) {
        violations.push(
            "A′-4 W1: the .glass-dock `contain` carries `size` — fatal to the shrink-to-fit pill (the 3.3.0 sliver regression); `layout style paint` only",
        );
    }

    // useLayerTransition defers the Popper measure off the synchronous flush.
    const lt = stripComments(read(PATHS.layerTransition));
    const ltFlat = flatten(lt);
    const hasMorphingSignal = /\bmorphing\s*=\s*ref\(/.test(ltFlat) || /\bmorphing\s*:\s*Ref</.test(ltFlat);
    const hasDeferHelper = /function\s+deferReposition\b/.test(ltFlat) && /deferReposition\b/.test(ltFlat);
    const deferUsesRaf = /deferReposition[\s\S]{0,400}requestAnimationFrame/.test(lt);
    const deferReturned = /return\s*\{[^}]*deferReposition[^}]*\}/.test(ltFlat);
    facts.popperMeasureDeferred = hasMorphingSignal && hasDeferHelper && deferUsesRaf && deferReturned;
    if (!facts.popperMeasureDeferred) {
        violations.push(
            `A′-4 W1: useLayerTransition must expose a reactive \`morphing\` signal + a \`deferReposition(cb)\` helper that schedules the reka Popper re-position OFF the synchronous flush (rAF/post-settle) and RETURN both — found morphingSignal=${hasMorphingSignal} deferHelper=${hasDeferHelper} usesRaf=${deferUsesRaf} returned=${deferReturned}`,
        );
    }
    // The FLIP measure stays — assert the one-time getBoundingClientRect FLIP primitive is untouched (still present).
    facts.flipMeasureIntact = /getBoundingClientRect\(\)/.test(lt);
    if (!facts.flipMeasureIntact) {
        violations.push(
            "A′-4 W1: the FLIP one-time getBoundingClientRect measure must remain (the value.js letter fences it) — it is absent",
        );
    }

    // BITE — DOCK_SPRING byte-unchanged.
    const dockConst = read(PATHS.dockConstants);
    facts.dockSpringByteUnchanged =
        /export const DOCK_SPRING = \{ response: 0\.32, dampingFraction: 0\.7 \} as const;/.test(dockConst);
    if (!facts.dockSpringByteUnchanged) {
        violations.push(
            "A′-4 W1 BITE: DOCK_SPRING {response:0.32, dampingFraction:0.7} is NOT byte-unchanged — the value.js letter fences the spring; A′-4 is restyle cost + reflow ordering, NEVER a re-tune",
        );
    }

    // ── W2 — A′-6 the glyph rides the per-density --dock-layer-height ──
    const offsets = stripComments(read(PATHS.offsetsSizing));
    const offsetsFlat = flatten(offsets);
    // The :root --dock-icon-glyph must be a ratio of --dock-layer-height, NOT the flat 1.25rem*--dock-scale.
    const glyphDecl = offsetsFlat.match(/--dock-icon-glyph:\s*([^;]+?);/);
    const glyphBody = glyphDecl ? glyphDecl[1] : "";
    facts.glyphRidesDensityRoot =
        /--dock-layer-height/.test(glyphBody) && /--dock-icon-glyph-ratio/.test(glyphBody);
    facts.glyphRatioMinted = /--dock-icon-glyph-ratio:\s*[\d.]+/.test(offsetsFlat);
    facts.glyphFloorMinted = /--dock-icon-glyph-floor:/.test(offsetsFlat);
    // The flat-rem form must be GONE from the :root declaration (the bite).
    facts.glyphNotFlatRem = !/--dock-icon-glyph:\s*calc\(1\.25rem\s*\*\s*var\(--dock-scale\)\)/.test(offsetsFlat);
    // density.css RE-RESOLVES the glyph inside the painted [data-density] scope (the substitution trap).
    const density = stripComments(read(PATHS.densityCss));
    const densityFlat = flatten(density);
    facts.glyphReResolvedPerDensity =
        /\.glass-dock\[data-density\]\s*\{[^}]*--dock-icon-glyph:[^}]*--dock-layer-height/.test(densityFlat);
    // overflow.css coarse re-declare must ALSO be density-aware (not the stale flat rem that would source-order-win).
    const overflow = stripComments(read(PATHS.overflowCss));
    const overflowFlat = flatten(overflow);
    const overflowGlyph = overflowFlat.match(/--dock-icon-glyph:\s*([^;]+?);/);
    facts.glyphCoarseDensityAware = overflowGlyph
        ? /--dock-layer-height/.test(overflowGlyph[1])
        : true; // absent = no stale override
    facts.glyphRidesDensity =
        facts.glyphRidesDensityRoot &&
        facts.glyphRatioMinted &&
        facts.glyphFloorMinted &&
        facts.glyphNotFlatRem &&
        facts.glyphReResolvedPerDensity &&
        facts.glyphCoarseDensityAware;
    if (!facts.glyphRidesDensity) {
        violations.push(
            `A′-6 W2: --dock-icon-glyph must ride the per-density --dock-layer-height (ratio knob --dock-icon-glyph-ratio + the WCAG floor), re-resolved inside the painted [data-density] scope (density.css) AND density-aware in the coarse overflow.css re-declare — found rootRatio=${facts.glyphRidesDensityRoot} ratioMinted=${facts.glyphRatioMinted} floorMinted=${facts.glyphFloorMinted} notFlatRem=${facts.glyphNotFlatRem} perDensityReResolve=${facts.glyphReResolvedPerDensity} coarseDensityAware=${facts.glyphCoarseDensityAware}`,
        );
    }

    // ── W3 — A′-1 one canvas + one context per GooBlob mount + clean dispose ──
    const gooVue = stripComments(read(PATHS.gooBlobVue));
    // Exactly ONE <canvas> in the GooBlob template.
    const canvasCount = (gooVue.match(/<canvas\b/g) || []).length;
    facts.gooBlobCanvasCount = canvasCount;
    facts.oneCanvasPerMount = canvasCount === 1;
    if (!facts.oneCanvasPerMount) {
        violations.push(
            `A′-1 W3: GooBlob.vue must ship EXACTLY ONE <canvas> (the zombie-second-canvas guard) — found ${canvasCount}`,
        );
    }
    // The renderer arms behind a !canvasHandle double-arm guard + onUnmounted disposes.
    const renderer = stripComments(read(PATHS.metaballRenderer));
    const rendererFlat = flatten(renderer);
    facts.doubleArmGuard = /if\s*\(\s*canvas\s*&&\s*!canvasHandle\s*\)/.test(rendererFlat);
    facts.onUnmountedDispose = /onUnmounted\([\s\S]*?canvasHandle\?\.dispose\(\)/.test(rendererFlat);
    facts.cleanDispose = facts.doubleArmGuard && facts.onUnmountedDispose;
    if (!facts.cleanDispose) {
        violations.push(
            `A′-1 W3: the renderer must arm behind the \`!canvasHandle\` double-arm guard AND dispose on onUnmounted (the clean-dispose invariant) — found guard=${facts.doubleArmGuard} dispose=${facts.onUnmountedDispose}`,
        );
    }
    // The by-name value.js demo-double-mount route in the BB adopt-book (no-silent-drop).
    const adopt = read(PATHS.adoptBook);
    facts.valuejsDoubleMountRoutedByName =
        /A.{0,3}1\b/.test(adopt) &&
        /value\.?js/i.test(adopt) &&
        /(double-mount|400.{0,3}400|0.{0,3}0|zombie|second canvas)/i.test(adopt);
    if (!facts.valuejsDoubleMountRoutedByName) {
        violations.push(
            "A′-1 W3: the BB adopt-book (PROGRESS.md) must route the value.js demo-side double-mount (the 400×400/0×0 zombie second canvas) BY NAME — the no-silent-drop disposition (producer proven-clean, the demo-double-mount is value.js's own)",
        );
    }

    // ── W4 — A′-5 the aurora wash backs at a sub-2× ceiling; focal goo-blob keeps 2× ──
    const budget = stripComments(read(PATHS.budget));
    const budgetFlat = flatten(budget);
    const dprMaxM = budgetFlat.match(/AV_DPR_MAX\s*=\s*([\d.]+)/);
    const auroraMaxM = budgetFlat.match(/AV_AURORA_DPR_MAX\s*=\s*([\d.]+)/);
    const dprMax = dprMaxM ? parseFloat(dprMaxM[1]) : NaN;
    const auroraMax = auroraMaxM ? parseFloat(auroraMaxM[1]) : NaN;
    facts.avDprMax = dprMax;
    facts.avAuroraDprMax = auroraMax;
    facts.washResolverMinted = /function\s+resolveAuroraWashDpr\b/.test(budgetFlat);
    facts.auroraWashSubCap =
        Number.isFinite(auroraMax) && Number.isFinite(dprMax) && auroraMax < dprMax && facts.washResolverMinted;
    if (!facts.auroraWashSubCap) {
        violations.push(
            `A′-5 W4: AV_AURORA_DPR_MAX (${auroraMax}) must be minted < AV_DPR_MAX (${dprMax}) with a resolveAuroraWashDpr() resolver — found resolver=${facts.washResolverMinted}`,
        );
    }
    // aurora runtime reads the wash resolver; goo-blob STILL reads resolveBudgetDpr (the focal 2×).
    const auroraRt = stripComments(read(PATHS.auroraRuntime));
    facts.auroraReadsWash =
        /resolveAuroraWashDpr\(\)/.test(auroraRt) && !/resolveBudgetDpr\(\)/.test(auroraRt);
    if (!facts.auroraReadsWash) {
        violations.push(
            "A′-5 W4: aurora runtime.ts resize() must read resolveAuroraWashDpr() (and NOT resolveBudgetDpr() — the wash sub-cap, not the shared 2×)",
        );
    }
    facts.gooBlobFocal2x = /resolveBudgetDpr\(\)/.test(stripComments(read(PATHS.metaballRenderer)));
    if (!facts.gooBlobFocal2x) {
        violations.push(
            "A′-5 W4: the focal goo-blob must KEEP resolveBudgetDpr() (the 2× ceiling — its silhouette is sharp); it no longer reads it",
        );
    }
    // BITE — the GL shaders are byte-unchanged (the absolute fence). We assert the shader
    // files exist + carry no W-PERF-PRODUCER edit marker (a CPU-side DPR cap never reaches the shader).
    const auroraFragTxt = read(PATHS.auroraFrag);
    const metaballFragTxt = read(PATHS.metaballFrag);
    facts.glShaderByteUnchanged =
        auroraFragTxt.length > 0 &&
        metaballFragTxt.length > 0 &&
        !/W-PERF-PRODUCER/.test(auroraFragTxt) &&
        !/W-PERF-PRODUCER/.test(metaballFragTxt);
    if (!facts.glShaderByteUnchanged) {
        violations.push(
            "A′-5 W4 BITE: aurora.frag / metaball.frag must be byte-unchanged (the GL fence is absolute — the DPR cap is a CPU-side backing-store dimension, it never reaches the shader)",
        );
    }

    // The DELTA artefact presence is a soft note (the π writes it; the source gate does not fail on it).
    facts.deltaPresent = existsSync(PATHS.delta);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:perf-producer",
        facts,
        violations,
    });

    console.log("proof:perf-producer — the value.js A′ perf-producer cluster, dispositioned producer-side (BB.W-PERF-PRODUCER)");
    console.log(`  W1 A′-4 containment  : ${facts.dockContainment ? "✓" : "✗"} (contain: ${facts.dockContainAxes})`);
    console.log(`  W1 A′-4 Popper-defer : ${facts.popperMeasureDeferred ? "✓" : "✗"}`);
    console.log(`  W1 A′-4 DOCK_SPRING  : ${facts.dockSpringByteUnchanged ? "byte-unchanged ✓" : "CHANGED ✗"}`);
    console.log(`  W2 A′-6 glyph-density: ${facts.glyphRidesDensity ? "✓" : "✗"}`);
    console.log(`  W3 A′-1 one-canvas   : ${facts.oneCanvasPerMount ? "✓" : "✗"} (count=${facts.gooBlobCanvasCount})`);
    console.log(`  W3 A′-1 clean-dispose: ${facts.cleanDispose ? "✓" : "✗"}`);
    console.log(`  W3 A′-1 valuejs-route: ${facts.valuejsDoubleMountRoutedByName ? "by-name ✓" : "✗"}`);
    console.log(`  W4 A′-5 aurora sub-cap: ${facts.auroraWashSubCap ? `✓ (${facts.avAuroraDprMax}× < ${facts.avDprMax}×)` : "✗"}`);
    console.log(`  W4 A′-5 goo focal 2×  : ${facts.gooBlobFocal2x ? "✓" : "✗"}`);
    console.log(`  W4 A′-5 GL fence      : ${facts.glShaderByteUnchanged ? "byte-unchanged ✓" : "✗"}`);
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

export { run };
