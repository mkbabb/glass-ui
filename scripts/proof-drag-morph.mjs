#!/usr/bin/env node
// BB.W-DRAG-MORPH — proof:drag-morph, the pull/drag-to-morph-squish gate
// (born-RED at HEAD, driven GREEN by the wave).
//
// THE HEADLINE: you can GRAB the live chrome and PULL it. The SegmentedTabs pill
// indicator becomes a PHYSICAL lozenge — it follows the finger ~1:1, STRETCHES by
// drag VELOCITY (a volume-preserving gel-squish, capped LOW), and on release FLINGS
// velocity-continuously to the NEAREST slot. The same gesture reaches the dock
// (DockLayerGroup pull-to-switch). And the strip OWES a roving-tabindex keyboard
// contract (a draggable tab that is keyboard-broken is the worse failure).
//
// THE LOAD-BEARING REUSE: the kf `Draggable` ships UNCONSUMED at HEAD; this wave
// WIRES it (the pointer-capture follow + velocity-window + C¹ fling) rather than
// forking a second drag-physics engine. The squish rides the SHARED `useLiquidFlex`
// `"tanh"` velocity register, capped at the live `--tab-indicator-max-stretch`
// getter. The spring reuses a SPRING_PRESETS row (the W-GLASS-CAL spring fence).
//
// This is the device-free SOURCE half (D1-D5). The PAINTED truth — the drag
// frame-series (follow ~1:1, the velocity-squish, the fling-to-nearest settle), the
// PRM no-squish/instant-snap, the live keyboard roving readback — is the binding π
// captured in docs/tranches/BB/audit/visual/W-DRAG-MORPH-DELTA.md + the
// `proof:ba-gestalt` navigation verdict (the AY W-LIVE1 LOCAL-ONLY split,
// backstopped on CI by proof:live-verified-ledger). A source-green/visually-broken
// close (the :draggable prop wired but the indicator does not follow, OR the PRM
// drag still squishes, OR a tab stays keyboard-dead) is the exact AZ failure class
// the gestalt bar kills; both halves must hold for a clean close.
//
// FIVE FALSIFIABLE WITNESSES (each born-RED at HEAD pre-wave):
//
//   D1 — THE ABSTRACT PRIMITIVE COMPOSES THE KF SUBSTRATE, OWNS NO SECOND ENGINE.
//        useDragMorph.ts imports `Draggable`/`drag` + `SpringProgress` from
//        `@mkbabb/keyframes.js` and `useLiquidFlex` from the motion sub-tree, and
//        contains NO hand-rolled pointer-velocity sampler / parallel rAF spring
//        integrator (no `addEventListener("pointermove"` velocity loop, no
//        `requestAnimationFrame` spring step). RED at HEAD: the file does not exist;
//        no `Draggable` import in `src/`. BITE (anti-evasion): a re-implemented
//        velocity-window / rAF spring loop in the file REDs — the reuse is the wired
//        substrate, not a re-fork.
//   D2 — THE SQUISH IS THE TANH-LAW VELOCITY REGISTER, CAPPED LOW, NOT THE CLICK
//        LINEAR-FRACTION. The drag squish drives `useLiquidFlex` under `squishLaw:
//        "tanh"` via `drive(` (off the live drag position — the |Δt| derivative),
//        capped at the live `maxStretch` getter (NOT a hardcoded cap > 1.08). RED at
//        HEAD: no drag squish path; the only squish is the click `"linear"`
//        `squish(frac)`. BITE: the drag path must read `"tanh"` + `drive(` (NOT a
//        `squish(frac)` linear call) AND the cap must read the live getter (a
//        hardcoded number > 1.08 REDs — the anti-taffy-pull fence).
//   D3 — THE RELEASE FLINGS VELOCITY-CONTINUOUSLY TO THE NEAREST SLOT,
//        INTERRUPTIBLE, SINGLE-COMMIT. On release the spring re-seats from `(value,
//        releaseVelocity)` (the kf fling) and re-targets the NEAREST snap center
//        (resolved off the projected rest `decayRest` + the release velocity), and
//        `onSnap` fires ONCE on settle. RED at HEAD: no release path. BITE: the
//        release must resolve the NEAREST snap (a `decayRest`/`nearest` resolution
//        off release-position + velocity, not a fixed forward step) AND a
//        single-commit guard exists (a `committed` flag — the one-registry
//        discipline forbids a re-fired model write).
//   D4 — THE SEGMENTEDTABS `:draggable` AXIS IS ADDITIVE WITH ≥2 CONSUMERS.
//        `draggable?: boolean` on SegmentedTabsProps; the drag is ADDITIVE OVER the
//        click/keyboard path — that path is byte-identical (the `select` +
//        `squishOnTravel` click-travel squish still present, `@click=select(` intact)
//        whether the drag defaults on or off. BC.W-LIQUID-TAB flipped the default to
//        `true` (the pull is the iOS-27 PRIMARY affordance), so "additive" is NOT
//        "default false" — it is "the drag is a pointer ENHANCEMENT, never the SOLE
//        selection mechanism" (WCAG 2.1.1: a drag has no keyboard equivalent, so the
//        click/arrow path stays the full operable alternative — the roving D5 below).
//        `useDragMorph` has ≥2 binary consumers (SegmentedTabs + DockLayerGroup — two
//        `useDragMorph(` call sites). RED at HEAD: no `draggable` prop; zero
//        `useDragMorph` consumer; OR a drag that REWRITES the click path (not additive).
//   D5 — THE ROVING-TABINDEX KEYBOARD CONTRACT LANDS. `.segmented-tab` carries the
//        roving tabindex (a `:tabindex` binding keyed off the active tab) and a
//        `@keydown` on the strip root handles the AXIS-DERIVED arrow keys
//        (ArrowRight/Left horizontal + ArrowDown/Up vertical) + Home/End to move
//        focus + activate. RED at HEAD: SegmentedTabs.vue has no `tabindex`/`@keydown`
//        on the strip. BITE: the roving is NOT gated behind `:draggable` (a
//        draggable-only roving REDs — the keyboard contract applies to every strip)
//        AND the arrow axis is derived off `isVertical` (a hardcoded horizontal-only
//        arrow set REDs — the vertical strip must be keyboard-navigable too).
//
// House style mirrors proof-surface-axis.mjs / proof-glass-cohesion.mjs: ESM .mjs,
// comment-strip first (the false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, an inline self-test
// bite (a synthetic evasion that MUST flag — the bite proven every run), and
// process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        USE_DRAG_MORPH_TS: resolve(ROOT, "src/composables/motion/useDragMorph.ts"),
        MOTION_INDEX_TS: resolve(ROOT, "src/composables/motion/index.ts"),
        SEGMENTED_TABS_VUE: resolve(
            ROOT,
            "src/components/custom/tabs/SegmentedTabs.vue",
        ),
        // BB.W-CARVE4 — the SegmentedTabs `useDragMorph(` CALL carved into the
        // colocated composable; the D4 tabs-consumer check follows it into the leaf.
        USE_TAB_DRAG_MORPH_TS: resolve(
            ROOT,
            "src/components/custom/tabs/composables/useTabDragMorph.ts",
        ),
        // BG.W-COLOCATE — the roving-tabindex keyboard machine (arrow-axis + Home/End)
        // carved into this colocated composable (ratchet-drain #13); the D5 arrow-axis
        // checks FOLLOW the carve into the leaf (the SFC keeps the `@keydown`/`:tabindex`
        // template wiring).
        USE_TAB_ROVING_FOCUS_TS: resolve(
            ROOT,
            "src/components/custom/tabs/composables/useTabRovingFocus.ts",
        ),
        DOCK_LAYER_GROUP_VUE: resolve(
            ROOT,
            "src/components/custom/dock/DockLayerGroup.vue",
        ),
        // BI.W-DRAG-REATTACH — the z-order double-repair (Kill B) lives in the
        // SegmentedTabs CSS. The rest z-0 is in segmented-tabs.css; the grab-state
        // z-lift + the active-button grab-bootstrap fall-through are in the drag tail
        // segmented-tabs-drag.css (carved by BI.W-STYLE-REDRAIN — the §Work `segmented-
        // tabs.css` ref re-homes here for the grab affordance).
        SEGMENTED_TABS_CSS: resolve(ROOT, "src/styles/segmented-tabs.css"),
        SEGMENTED_TABS_DRAG_CSS: resolve(
            ROOT,
            "src/styles/tabs/segmented-tabs-drag.css",
        ),
        ARTIFACT: gateArtifactPath("GLASS_UI_DRAG_MORPH_ARTIFACT", "BB-drag-morph"),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

// Strip TS/JS block + line comments (a commented-out import/path must not satisfy
// a witness — the false-witness discipline).
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip CSS `/* … */` block comments ONLY (CSS has no `//` line comment — a `url(//…)`
// must not be blanked; the generic TS stripper's `//` branch is wrong for CSS).
function stripCssComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments (a commented-out render must not satisfy
// or trip a witness).
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

/**
 * The W-DRAG-MORPH detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectDragMorph(sources) {
    const dragMorph = stripBlockComments(sources.useDragMorphTs ?? "");
    const motionIndex = stripBlockComments(sources.motionIndexTs ?? "");
    const segmentedTabs = stripHtmlComments(
        stripBlockComments(sources.segmentedTabsVue ?? ""),
    );
    // BB.W-CARVE4 — the SegmentedTabs `useDragMorph(` call carved into this colocated
    // composable; the D4 tabs-consumer check reads it (the SFC keeps the `draggable`
    // prop, the click path, and the roving tabindex — those checks stay on the SFC).
    const tabDragMorph = stripBlockComments(sources.useTabDragMorphTs ?? "");
    // BG.W-COLOCATE — the roving-tabindex keyboard machine (arrow-axis + Home/End)
    // carved into the colocated composable; the D5 arrow-axis / Home-End checks read
    // (SFC ∪ leaf) so the assert follows the composition (ratchet-drain #13). The SFC
    // keeps the `@keydown`/`:tabindex` template wiring.
    const tabRovingFocus = stripBlockComments(sources.useTabRovingFocusTs ?? "");
    const tabKeyboard = `${segmentedTabs}\n${tabRovingFocus}`;
    const dockLayerGroup = stripHtmlComments(
        stripBlockComments(sources.dockLayerGroupVue ?? ""),
    );
    // BI.W-DRAG-REATTACH — the z-order double-repair CSS (Kill B). The rest z-0 lives
    // in segmented-tabs.css; the grab-state z-lift + the active-button grab-bootstrap
    // fall-through live in the drag tail (segmented-tabs-drag.css).
    const baseCss = stripCssComments(sources.segmentedTabsCss ?? "");
    const dragCss = stripCssComments(sources.segmentedTabsDragCss ?? "");

    const violations = [];

    // ── D1 — the abstract primitive composes the kf substrate, no second engine ──
    const dmExists = dragMorph.trim().length > 0;
    if (!dmExists) {
        violations.push(
            "D1: src/composables/motion/useDragMorph.ts does not exist (the abstract primitive was not minted).",
        );
    }
    // Imports the kf Draggable/drag + SpringProgress, and useLiquidFlex.
    const importsDraggable = /\b(Draggable|drag)\b/.test(dragMorph) &&
        /from\s+["']@mkbabb\/keyframes\.js["']/.test(dragMorph);
    const importsSpring = /\bSpringProgress\b/.test(dragMorph);
    const importsLiquidFlex = /useLiquidFlex/.test(dragMorph) &&
        /from\s+["']\.\/useLiquidFlex["']/.test(dragMorph);
    if (dmExists && !importsDraggable) {
        violations.push(
            "D1: useDragMorph.ts does not import `Draggable`/`drag` from `@mkbabb/keyframes.js` (the load-bearing REUSE — the UNCONSUMED kf substrate must be WIRED).",
        );
    }
    if (dmExists && !importsSpring) {
        violations.push(
            "D1: useDragMorph.ts does not import `SpringProgress` from `@mkbabb/keyframes.js` (the physics core).",
        );
    }
    if (dmExists && !importsLiquidFlex) {
        violations.push(
            "D1: useDragMorph.ts does not compose `useLiquidFlex` (the shared squish primitive — no second squish writer).",
        );
    }
    // BITE: no hand-rolled pointer-velocity sampler / parallel rAF spring loop.
    // A re-implemented velocity window (a `pointermove` listener that pushes
    // timestamped samples to estimate a release velocity) duplicates drag.ts; a
    // `requestAnimationFrame` spring step duplicates SpringProgress. Either REDs.
    const handRolledVelocity =
        /addEventListener\(\s*["']pointermove["']/.test(dragMorph) &&
        /(velocity|samples|timeStamp)/.test(dragMorph) &&
        // The composable DOES read `pointerdown`/`pointerup` for the dragging flag
        // (legitimate), but it must NOT bind pointermove to sample velocity itself.
        /pointermove[\s\S]{0,400}?(timeStamp|samples\.push|estimateVelocity)/.test(
            dragMorph,
        );
    const handRolledRaf = /requestAnimationFrame\s*\(/.test(dragMorph);
    if (dmExists && handRolledVelocity) {
        violations.push(
            "D1: useDragMorph.ts hand-rolls a pointermove velocity sampler (duplicating kf drag.ts) — the REUSE is the wired `Draggable`, not a re-fork (the anti-evasion bite).",
        );
    }
    if (dmExists && handRolledRaf) {
        violations.push(
            "D1: useDragMorph.ts hand-rolls a requestAnimationFrame loop (duplicating SpringProgress) — the engine owns the rAF via `play()`; this composable reads via `subscribe` (the anti-evasion bite).",
        );
    }
    // The primitive owns no model (no internal ref shadowing the active value).
    // Positive: the commit is a consumer-wired callback (`onSnap`).
    const ownsOnSnapCallback = /onSnap/.test(dragMorph);
    if (dmExists && !ownsOnSnapCallback) {
        violations.push(
            "D1: useDragMorph.ts does not expose an `onSnap` commit callback (the consumer's v-model is the single source of truth — the one-registry discipline).",
        );
    }
    // The primitive rides /motion (re-exported from the motion barrel).
    const barrelReexports = /useDragMorph/.test(motionIndex);
    if (!barrelReexports) {
        violations.push(
            "D1: the motion sub-tree barrel (motion/index.ts) does not re-export useDragMorph (the /motion heavy-peer home).",
        );
    }

    // ── D2 — the squish is the tanh-law velocity register, capped LOW ─────────────
    const usesTanhLaw = /squishLaw\s*:\s*["']tanh["']/.test(dragMorph);
    const usesDrive = /\.drive\s*\(/.test(dragMorph) || /\bdrive\s*\(/.test(dragMorph);
    if (dmExists && !usesTanhLaw) {
        violations.push(
            'D2: the drag squish does not use `squishLaw: "tanh"` (it must be the velocity register, NOT the click `"linear"` fraction path).',
        );
    }
    if (dmExists && !usesDrive) {
        violations.push(
            "D2: the drag squish does not call `drive(` (it must feed the live normalized position so the |Δt| derivative is the squish travel — NOT a `squish(frac)` linear call).",
        );
    }
    // BITE: the cap reads the live getter, NOT a hardcoded number > 1.08. A
    // `maxStretch: 1.5` (or any literal > 1.08) inline on the useLiquidFlex config
    // REDs the anti-taffy-pull fence.
    const liquidCfg =
        dragMorph.match(/useLiquidFlex\s*\(\s*\{[\s\S]*?\}\s*\)/)?.[0] ?? "";
    const hardcodedHighCap = /maxStretch\s*:\s*([0-9.]+)\b/.exec(liquidCfg);
    const capReadsGetter =
        /maxStretch\s*:\s*(params\.maxStretch|\(\s*\)\s*=>|[A-Za-z_$][\w$]*\.maxStretch)/.test(
            liquidCfg,
        ) || /maxStretch\s*:\s*params\.maxStretch/.test(dragMorph);
    if (dmExists && hardcodedHighCap && Number(hardcodedHighCap[1]) > 1.08) {
        violations.push(
            `D2: the squish cap is hardcoded to ${hardcodedHighCap[1]} (> 1.08, the anti-taffy-pull fence) — it must read the live --tab-indicator-max-stretch getter.`,
        );
    }
    if (dmExists && !capReadsGetter) {
        violations.push(
            "D2: the squish cap does not read a live getter (`maxStretch: params.maxStretch` / a `() =>` getter) — the cap must re-resolve the cascade, not freeze a literal.",
        );
    }

    // ── D3 — the release flings to the NEAREST slot via the NATIVE kf snap ─────────
    // kf 5.1.0 ships `DragOptions.snap` — the engine projects `decayRest` + re-seats
    // the spring toward the nearest declared target on its own pointerup. The
    // composable WIRES it (`snap: snapTargets.map(t => t.center)` in the
    // `new Draggable({…})` construction) and keeps ONLY the COMMIT-side
    // `nearestTarget`/`nearestValue` resolver (mapping the settled center back to the
    // consumer's domain value). The BB-era published-surface re-roll (`decayRest(` +
    // `spring.target =` + a `commitSnapOnRelease`) is EXCISED — the snap-excise wave.
    const wiresNativeSnap =
        /new\s+Draggable\s*\(\s*\{[\s\S]*?\bsnap\s*:[\s\S]*?\}\s*\)/.test(dragMorph) &&
        /\bsnap\s*:[\s\S]*?\.center\b/.test(dragMorph);
    // The COMMIT-side value resolver (`nearestTarget`/`nearestValue`) is KEPT — the
    // engine snaps the PHYSICS to the nearest center; the composable still maps that
    // settled center back to the consumer's domain VALUE for the single `onSnap`.
    const keepsCommitResolver = /nearest/i.test(dragMorph);
    // The single-commit guard (a `committed` flag) — the one-registry discipline
    // forbids a re-fired model write.
    const singleCommitGuard =
        /committed/.test(dragMorph) &&
        /committed\s*=\s*(true|false)/.test(dragMorph);
    // BITE (anti-evasion): the published-surface re-roll must be GONE — the native
    // `snap` option supersedes it. A surviving `decayRest(` call / `spring.target =`
    // retarget / `commitSnapOnRelease` is the dual-path the wave kills (the
    // no-dual-path discipline).
    const reRollExcised =
        !/decayRest\s*\(/.test(dragMorph) &&
        !/spring\.target\s*=/.test(dragMorph) &&
        !/commitSnapOnRelease/.test(dragMorph);

    if (dmExists && !wiresNativeSnap) {
        violations.push(
            "D3: the release does not wire the native kf snap (`snap: snapTargets.map(t => t.center)` in the `new Draggable({…})` construction) — kf 5.1.0 `DragOptions.snap` projects decayRest + re-seats toward the nearest target; the composable must hand it the snap centers.",
        );
    }
    if (dmExists && !keepsCommitResolver) {
        violations.push(
            "D3: the COMMIT-side `nearestTarget`/`nearestValue` resolver is gone — the composable must map the settled spring center back to the consumer's domain VALUE for the single `onSnap` commit (the value domain the engine does not know).",
        );
    }
    if (dmExists && !singleCommitGuard) {
        violations.push(
            "D3: no single-commit guard (a `committed` flag) — `onSnap` could re-fire on the spring's near-settled frames (the one-registry discipline forbids a double model write).",
        );
    }
    if (dmExists && !reRollExcised) {
        violations.push(
            "D3: the BB-era published-surface snap re-roll SURVIVES (`decayRest(` / `spring.target =` / `commitSnapOnRelease`) — kf 5.1.0 `DragOptions.snap` supersedes it; the dual-path interim must be EXCISED (the no-dual-path discipline).",
        );
    }

    // ── D4 — the SegmentedTabs drag axis is ADDITIVE with ≥2 consumers ────────────
    // BH.W-MOTION-AXIS — the `draggable?: boolean` prop died onto the ONE `motion`
    // axis (the clean-break successor, no alias — MIGRATION.md): the SFC declares
    // `motion?: Motion` and gates the drag on the resolved `armed` register via
    // `useMotionAxis`. The additive-axis witness FOLLOWS the rename (a stale
    // `draggable?: boolean` grep would false-RED the shipped tree). The internal
    // `useTabDragMorph` option keeps its `draggable` field name — a composable option,
    // explicitly excluded (the gate greps the public component PROP surface).
    const hasMotionAxisProp =
        /motion\s*\?\s*:\s*Motion/.test(segmentedTabs) &&
        /useMotionAxis\s*\(/.test(segmentedTabs);
    if (!hasMotionAxisProp) {
        violations.push(
            "D4: SegmentedTabs declares no `motion?: Motion` axis wired through `useMotionAxis` (the additive drag axis — the `draggable?: boolean` clean-break successor — did not land).",
        );
    }
    // BC.W-LIQUID-TAB — the drag is ADDITIVE OVER the click/keyboard path, NOT
    // "default false." The default may be `true` (the pull is the iOS-27 primary
    // affordance) — what makes it additive is that the click/keyboard path stays the
    // FULL operable alternative (byte-identical), the drag a pointer ENHANCEMENT
    // (WCAG 2.1.1: a drag has no keyboard equivalent, so it can never be the sole way
    // to change tabs). The additive contract is the `clickPathIntact` + the ungated
    // roving (D5) below, NOT the prop's default value.
    //
    // BITE: the click path is unchanged (select + squishOnTravel still present —
    // the drag is additive over selection, not a rewrite of it).
    const clickPathIntact =
        /squishOnTravel\s*\(/.test(segmentedTabs) &&
        /function\s+select\s*\(/.test(segmentedTabs) &&
        /@click\s*=\s*["']select\(/.test(segmentedTabs);
    if (!clickPathIntact) {
        violations.push(
            "D4: the click-selection path (`select` + `squishOnTravel` + `@click=select(`) is not intact — the drag must be ADDITIVE OVER the click path, never a rewrite of it (the byte-identical click bite). Enabling the pull by default must NOT make selection drag-only.",
        );
    }
    // ≥2 binary consumers — two `useDragMorph(` call sites (tabs + dock). Allow an
    // optional `<…>` type-arg between the name and the call paren (the call sites
    // pass `useDragMorph<string>({…})`).
    const callRe = /useDragMorph\s*(<[^>]*>)?\s*\(/;
    // The tabs consumer's `useDragMorph(` call lives in the colocated
    // useTabDragMorph composable (BB.W-CARVE4); accept it in either the SFC (pre-carve
    // shape) or the composable (post-carve) so the assert follows the composition.
    const tabsConsumes = callRe.test(segmentedTabs) || callRe.test(tabDragMorph);
    const dockConsumes = callRe.test(dockLayerGroup);
    const consumerCount = (tabsConsumes ? 1 : 0) + (dockConsumes ? 1 : 0);
    if (consumerCount < 2) {
        violations.push(
            `D4: useDragMorph has <2 binary consumers (tabs:${tabsConsumes} dock:${dockConsumes}) — the ≥2-consumer bar at birth (a primitive with one consumer is overfit substrate).`,
        );
    }

    // ── D5 — the roving-tabindex keyboard contract lands ─────────────────────────
    // A `:tabindex` binding on `.segmented-tab` keyed off the active tab (exactly
    // one `0`, the rest `-1`).
    const hasRovingTabindex =
        /:tabindex\s*=/.test(segmentedTabs) &&
        /tabindex/.test(segmentedTabs);
    if (!hasRovingTabindex) {
        violations.push(
            "D5: `.segmented-tab` carries no roving `:tabindex` binding (the WAI-ARIA tablist/toolbar one-tabstop contract did not land).",
        );
    }
    // A `@keydown` on the strip root handles the arrow keys.
    const hasKeydown = /@keydown\s*=/.test(segmentedTabs);
    if (!hasKeydown) {
        violations.push(
            "D5: the strip root carries no `@keydown` handler (arrow/Home/End focus movement did not land).",
        );
    }
    // BITE: the roving is NOT gated behind `:draggable` — the keyboard contract
    // applies to every strip. A `draggable && tabindex` / `draggable ? … tabindex`
    // gate on the tabindex binding REDs.
    const rovingGatedOnDraggable =
        /:tabindex\s*=\s*["'][^"']*draggable/.test(segmentedTabs) ||
        /draggable[^?]*\?\s*[^:]*tabindex/.test(segmentedTabs);
    if (rovingGatedOnDraggable) {
        violations.push(
            "D5: the roving-tabindex is gated behind `:draggable` (it must apply to EVERY strip — a draggable-only roving leaves a non-draggable strip keyboard-dead).",
        );
    }
    // BITE: the arrow axis is derived off `isVertical` (NOT a hardcoded
    // horizontal-only set). The keydown handler must consult the orientation —
    // a reference to `isVertical` (or `ArrowDown`/`ArrowUp`) near the keydown logic.
    const axisDerivedArrows =
        /ArrowDown/.test(tabKeyboard) &&
        /ArrowUp/.test(tabKeyboard) &&
        /ArrowRight/.test(tabKeyboard) &&
        /ArrowLeft/.test(tabKeyboard) &&
        /isVertical/.test(tabKeyboard);
    if (hasKeydown && !axisDerivedArrows) {
        violations.push(
            "D5: the keydown arrow axis is not derived off `isVertical` (it must handle ArrowRight/Left horizontal AND ArrowDown/Up vertical — a hardcoded horizontal-only set leaves the vertical strip keyboard-dead).",
        );
    }
    // Home/End jumps.
    const hasHomeEnd = /["']Home["']/.test(tabKeyboard) && /["']End["']/.test(tabKeyboard);
    if (hasKeydown && !hasHomeEnd) {
        violations.push(
            "D5: the keydown handler does not handle Home/End (the first/last-tab jumps).",
        );
    }

    // ── D6 — the reattach seam arms on the LIVE indicator element (Kill A) ─────────
    // BI.W-DRAG-REATTACH. `useDragMorph.reattach()` runs ONCE in setup, PRE-MOUNT,
    // when `indicatorRef` is still null — the early-return leaves the `Draggable`
    // UNBUILT — and nothing re-arms it: the consumer's refresh watch is NON-immediate
    // over stable deps (on a `motion:full` pill `dragEnabled` is born true, the option
    // count + axis do not change). The consumer must arm `reattach` IMMEDIATELY on the
    // live indicator element: a `watch` keyed off `indicatorRef.value` with
    // `{ immediate: true }` whose body calls `drag.refresh(` (→ reattach on the live
    // node). RED at HEAD: the refresh watch carries no `immediate: true` (the reattach
    // never gets a live first call → the liquid tab is dead).
    const armsReattachImmediate =
        /watch\s*\(\s*\(\s*\)\s*=>\s*\[[\s\S]*?indicatorRef\.value[\s\S]*?\.refresh\s*\([\s\S]*?\{\s*immediate\s*:\s*true\s*\}/.test(
            tabDragMorph,
        );
    if (!armsReattachImmediate) {
        violations.push(
            "D6: the SegmentedTabs consumer does not arm `reattach` immediately on the live indicator element (a `watch` keyed off `indicatorRef.value` with `{ immediate: true }` calling `drag.refresh(`) — the setup-time reattach early-returns pre-mount and a non-immediate watch never re-arms it, so the `Draggable` is never built on a live node (the liquid tab stays dead).",
        );
    }

    // ── D7 — the indicator is REACHABLE for the grab (Kill B) ─────────────────────
    // BI.W-DRAG-REATTACH. At rest `.segmented-indicator { z-index: 0 }` sits UNDER
    // `.segmented-tab { z-index: 10 }` (the label paints crisp ON TOP of the plate —
    // the rest paint is CORRECT and must stay). That stack makes the indicator
    // ungrabbable two ways, both repaired here:
    //   (b1) THE GRAB BOOTSTRAP — kf `Draggable` binds `pointerdown` on the indicator
    //        NODE, but a press on the active pill hits the z-10 button (a sibling, not
    //        an ancestor), so the drag never starts. A DRAGGABLE strip (its indicator
    //        carries `.glass-drag-grabbable`) forwards the press THROUGH the active
    //        button via `pointer-events: none` — dropped from hit-testing WITHOUT
    //        changing paint (the label stays on top; the pointerdown reaches the
    //        indicator). Non-active buttons keep click-to-select (byte-identical).
    //   (b2) THE TRAVEL OCCLUSION — once grabbed, the pulled lozenge lifts ABOVE the
    //        z-10 labels it travels over (`.segmented-indicator.glass-drag-lift`
    //        z-index > 10) so `elementFromPoint(indicatorCenter)` returns the indicator.
    // The REST z-order stays z-0 (untouched). RED at HEAD: no grab-state z-lift + no
    // active-button fall-through → `elementFromPoint(indicatorCenter)` returns a tab.
    const restZOrderUnchanged =
        /\.segmented-indicator\s*\{[^}]*z-index\s*:\s*0\b/.test(baseCss);
    const grabZLiftMatch =
        /\.segmented-indicator(?:\.glass-drag-lift|\[data-dragging\])[^{]*\{[^}]*z-index\s*:\s*(\d+)/.exec(
            dragCss,
        );
    const grabZLift = grabZLiftMatch != null && Number(grabZLiftMatch[1]) > 10;
    const grabBootstrap =
        /:has\(\s*\.segmented-indicator\.glass-drag-grabbable\s*\)[\s\S]*?\.segmented-tab\[aria-pressed="true"\][^{]*\{[^}]*pointer-events\s*:\s*none/.test(
            dragCss,
        );
    if (!restZOrderUnchanged) {
        violations.push(
            "D7: the base `.segmented-indicator { z-index: 0 }` rest z-order is gone — the rest paint (the label crisp OVER the plate) must be UNTOUCHED; only the grab state lifts.",
        );
    }
    if (!grabZLift) {
        violations.push(
            "D7: no grab-state z-lift (`.segmented-indicator.glass-drag-lift { z-index: >10 }`) — while dragging the pulled lozenge must render ABOVE the z-10 buttons so `elementFromPoint(indicatorCenter)` returns the indicator, not an occluding tab.",
        );
    }
    if (!grabBootstrap) {
        violations.push(
            'D7: no grab bootstrap (`:has(.segmented-indicator.glass-drag-grabbable) .segmented-tab[aria-pressed="true"] { pointer-events: none }`) — the active pill must forward the initial pointerdown THROUGH to the indicator (kf Draggable binds pointerdown on the indicator node), else the drag never starts.',
        );
    }

    const facts = {
        d1: {
            dmExists,
            importsDraggable,
            importsSpring,
            importsLiquidFlex,
            handRolledVelocity,
            handRolledRaf,
            ownsOnSnapCallback,
            barrelReexports,
        },
        d2: { usesTanhLaw, usesDrive, capReadsGetter, hardcodedHighCap: hardcodedHighCap?.[1] ?? null },
        d3: { wiresNativeSnap, keepsCommitResolver, singleCommitGuard, reRollExcised },
        d4: {
            hasMotionAxisProp,
            clickPathIntact,
            tabsConsumes,
            dockConsumes,
            consumerCount,
        },
        d5: {
            hasRovingTabindex,
            hasKeydown,
            rovingGatedOnDraggable,
            axisDerivedArrows,
            hasHomeEnd,
        },
        d6: { armsReattachImmediate },
        d7: {
            restZOrderUnchanged,
            grabZLift,
            grabZIndex: grabZLiftMatch ? Number(grabZLiftMatch[1]) : null,
            grabBootstrap,
        },
    };

    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── The self-test bite (the RED-witness inverse, proven every run) ───────────────
// A synthetic SegmentedTabs source carrying a `:draggable`-GATED roving tabindex
// (the exact evasion D5's bite forbids) MUST flag. If it does NOT flag, the gate's
// own teeth are broken (a self-proof failure reds the gate).
function selfTestBite() {
    const SYNTHETIC_DOCK = `useDragMorph(`;
    const SYNTHETIC_TABS = [
        "interface P { draggable?: boolean }",
        "withDefaults(defineProps(), { draggable: false })",
        "function select() {}; squishOnTravel(0); useDragMorph(",
        // The evasion: a draggable-GATED tabindex (the D5 bite must catch this).
        '<button @click="select(o.value, idx)" :tabindex="draggable ? 0 : -1" />',
        '<div @keydown="onKey">',
    ].join("\n");
    const { facts } = detectDragMorph({
        useDragMorphTs: "stub",
        motionIndexTs: "useDragMorph",
        segmentedTabsVue: SYNTHETIC_TABS,
        dockLayerGroupVue: SYNTHETIC_DOCK,
    });
    // The bite has teeth iff the synthetic draggable-gated tabindex is detected.
    return facts.d5.rovingGatedOnDraggable === true;
}

// ── The D3 snap-excise self-test bite (proven every run) ─────────────────────────
// A synthetic useDragMorph that RETAINS the BB-era published-surface re-roll
// (`decayRest(` + `spring.target =` + a `commitSnapOnRelease`) WITHOUT wiring the
// native `snap:` option (the exact dual-path the snap-excise wave kills) MUST flag:
// `reRollExcised` must be false AND `wiresNativeSnap` must be false. If it does NOT,
// the snap-excise gate has no teeth (a self-proof failure reds the gate).
function selfTestSnapBite() {
    const SYNTHETIC_REROLL = [
        "import { Draggable, SpringProgress, decayRest } from '@mkbabb/keyframes.js'",
        "import { useLiquidFlex } from './useLiquidFlex'",
        "const liquid = useLiquidFlex({ squishLaw: 'tanh', maxStretch: params.maxStretch })",
        "liquid.drive(0); params.onSnap(v); let committed = false; committed = true;",
        "function nearestTarget(c) { return null }",
        "function commitSnapOnRelease() {",
        "  const projected = decayRest({ initial: spring.value, velocity: spring.velocity, friction: 5 });",
        "  const t = nearestTarget(projected); if (t) spring.target = t.center;",
        "}",
        "draggable = new Draggable({ spring: ensureSpring(), axis: axisOf() });",
    ].join("\n");
    const { facts } = detectDragMorph({
        useDragMorphTs: SYNTHETIC_REROLL,
        motionIndexTs: "useDragMorph",
        segmentedTabsVue: "",
        dockLayerGroupVue: "",
    });
    // Teeth iff the surviving re-roll is caught AND the missing native snap is caught.
    return facts.d3.reRollExcised === false && facts.d3.wiresNativeSnap === false;
}

// ── The R-reattach self-test bite (Kill A, proven every run) ─────────────────────
// A synthetic consumer whose reattach watch is NON-immediate (the exact Kill-A
// regression — the pre-wave HEAD shape) MUST flag: `armsReattachImmediate` false. If
// it does NOT, the reattach gate has no teeth (a self-proof failure reds the gate).
function selfTestReattachBite() {
    const SYNTHETIC_NON_IMMEDIATE = [
        "watch(",
        "  () => [indicatorRef.value, stripOptions.value.length, dragEnabled.value] as const,",
        "  () => { if (dragEnabled.value) nextTick(() => drag.refresh()); },",
        ");",
    ].join("\n");
    const { facts } = detectDragMorph({
        useTabDragMorphTs: SYNTHETIC_NON_IMMEDIATE,
    });
    return facts.d6.armsReattachImmediate === false;
}

// ── The R-reach self-test bite (Kill B, proven every run) ────────────────────────
// A synthetic drag CSS that keeps the indicator z-0 DURING grab (a `.glass-drag-lift`
// rule that does NOT lift above the z-10 buttons) MUST flag: `grabZLift` false. If it
// does NOT, the reachability gate has no teeth.
function selfTestReachBite() {
    const SYNTHETIC_Z0_GRAB = ".segmented-indicator.glass-drag-lift { z-index: 0; }";
    const { facts } = detectDragMorph({
        segmentedTabsDragCss: SYNTHETIC_Z0_GRAB,
    });
    return facts.d7.grabZLift === false;
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectDragMorph({
        useDragMorphTs: safeRead(P.USE_DRAG_MORPH_TS),
        motionIndexTs: safeRead(P.MOTION_INDEX_TS),
        segmentedTabsVue: safeRead(P.SEGMENTED_TABS_VUE),
        useTabDragMorphTs: safeRead(P.USE_TAB_DRAG_MORPH_TS),
        useTabRovingFocusTs: safeRead(P.USE_TAB_ROVING_FOCUS_TS),
        dockLayerGroupVue: safeRead(P.DOCK_LAYER_GROUP_VUE),
        segmentedTabsCss: safeRead(P.SEGMENTED_TABS_CSS),
        segmentedTabsDragCss: safeRead(P.SEGMENTED_TABS_DRAG_CSS),
    });

    const biteHasTeeth = selfTestBite();
    if (!biteHasTeeth) {
        violations.push(
            "SELF-TEST: the D5 draggable-gated-tabindex bite did not flag the synthetic evasion — the gate's own teeth are broken.",
        );
    }
    const snapBiteHasTeeth = selfTestSnapBite();
    if (!snapBiteHasTeeth) {
        violations.push(
            "SELF-TEST: the D3 snap-excise bite did not flag a synthetic surviving re-roll (decayRest + spring.target without native snap) — the snap-excise gate has no teeth.",
        );
    }
    const reattachBiteHasTeeth = selfTestReattachBite();
    if (!reattachBiteHasTeeth) {
        violations.push(
            "SELF-TEST: the D6 reattach bite did not flag a synthetic NON-immediate reattach watch (the Kill-A regression) — the reattach gate has no teeth.",
        );
    }
    const reachBiteHasTeeth = selfTestReachBite();
    if (!reachBiteHasTeeth) {
        violations.push(
            "SELF-TEST: the D7 reach bite did not flag a synthetic z-0-during-grab indicator (the Kill-B regression) — the reachability gate has no teeth.",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:drag-morph",
        facts,
        violations,
        selfTest: {
            d5BiteHasTeeth: biteHasTeeth,
            d3SnapBiteHasTeeth: snapBiteHasTeeth,
            d6ReattachBiteHasTeeth: reattachBiteHasTeeth,
            d7ReachBiteHasTeeth: reachBiteHasTeeth,
        },
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:drag-morph — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH)",
    );
    console.log(
        `  D1 composes kf substrate, no 2nd engine : ${yn(
            facts.d1.dmExists &&
                facts.d1.importsDraggable &&
                facts.d1.importsSpring &&
                facts.d1.importsLiquidFlex &&
                !facts.d1.handRolledVelocity &&
                !facts.d1.handRolledRaf &&
                facts.d1.ownsOnSnapCallback &&
                facts.d1.barrelReexports,
        )}`,
    );
    console.log(
        `  D2 tanh velocity-squish, capped LOW     : ${yn(
            facts.d2.usesTanhLaw && facts.d2.usesDrive && facts.d2.capReadsGetter,
        )}  (cap-literal:${facts.d2.hardcodedHighCap ?? "none"})`,
    );
    console.log(
        `  D3 native kf snap, re-roll excised      : ${yn(
            facts.d3.wiresNativeSnap &&
                facts.d3.keepsCommitResolver &&
                facts.d3.singleCommitGuard &&
                facts.d3.reRollExcised,
        )}`,
    );
    console.log(
        `  D4 motion-axis additive, ≥2 consumers   : ${yn(
            facts.d4.hasMotionAxisProp &&
                facts.d4.clickPathIntact &&
                facts.d4.consumerCount >= 2,
        )}  (consumers:${facts.d4.consumerCount})`,
    );
    console.log(
        `  D5 roving-tabindex, axis-derived arrows : ${yn(
            facts.d5.hasRovingTabindex &&
                facts.d5.hasKeydown &&
                !facts.d5.rovingGatedOnDraggable &&
                facts.d5.axisDerivedArrows &&
                facts.d5.hasHomeEnd,
        )}`,
    );
    console.log(
        `  D6 reattach arms on live indicator      : ${yn(
            facts.d6.armsReattachImmediate,
        )}  (Kill A)`,
    );
    console.log(
        `  D7 indicator reachable for grab         : ${yn(
            facts.d7.restZOrderUnchanged &&
                facts.d7.grabZLift &&
                facts.d7.grabBootstrap,
        )}  (Kill B, grab-z:${facts.d7.grabZIndex ?? "none"})`,
    );
    console.log(`  self-test D5 bite has teeth             : ${yn(biteHasTeeth)}`);
    console.log(`  self-test D3 snap-excise bite has teeth : ${yn(snapBiteHasTeeth)}`);
    console.log(`  self-test reattach bite has teeth       : ${yn(reattachBiteHasTeeth)}`);
    console.log(`  self-test reach bite has teeth          : ${yn(reachBiteHasTeeth)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
