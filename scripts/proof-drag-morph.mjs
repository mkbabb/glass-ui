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
//        `draggable?: boolean` (default `false`) on SegmentedTabsProps; the
//        non-draggable click path is unchanged (the `select` + `squishOnTravel`
//        click-travel squish still present — the drag is opt-in, not a selection
//        rewrite); `useDragMorph` has ≥2 binary consumers (SegmentedTabs +
//        DockLayerGroup — two `useDragMorph(` call sites). RED at HEAD: no
//        `draggable` prop; zero `useDragMorph` consumer.
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
        DOCK_LAYER_GROUP_VUE: resolve(
            ROOT,
            "src/components/custom/dock/DockLayerGroup.vue",
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
    const dockLayerGroup = stripHtmlComments(
        stripBlockComments(sources.dockLayerGroupVue ?? ""),
    );

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

    // ── D3 — the release flings velocity-continuously to the NEAREST slot ─────────
    // The release re-seats from (value, releaseVelocity) — kf `Draggable` does this
    // on its own pointerup (the free fling). The composable PROJECTS the rest
    // (decayRest) + re-targets the NEAREST snap center off the projected position.
    const projectsRest = /decayRest\s*\(/.test(dragMorph);
    const resolvesNearest = /nearest/i.test(dragMorph);
    const retargets = /spring\.target\s*=/.test(dragMorph);
    if (dmExists && !projectsRest) {
        violations.push(
            "D3: the release does not project the frictional rest via `decayRest(` (the velocity-projected landing — a flick past the midpoint must snap forward).",
        );
    }
    if (dmExists && !resolvesNearest) {
        violations.push(
            "D3: the release does not resolve the NEAREST snap target (the snap is a nearest-center resolution off the projected rest, not a fixed forward step).",
        );
    }
    if (dmExists && !retargets) {
        violations.push(
            "D3: the release does not re-target the spring (`spring.target = …`) toward the snap (the C¹-continuous interruptible retarget).",
        );
    }
    // BITE: a single-commit guard exists (a `committed` flag) — the one-registry
    // discipline forbids a re-fired model write.
    const singleCommitGuard =
        /committed/.test(dragMorph) &&
        /committed\s*=\s*(true|false)/.test(dragMorph);
    if (dmExists && !singleCommitGuard) {
        violations.push(
            "D3: no single-commit guard (a `committed` flag) — `onSnap` could re-fire on the spring's near-settled frames (the one-registry discipline forbids a double model write).",
        );
    }

    // ── D4 — the SegmentedTabs `:draggable` axis is ADDITIVE with ≥2 consumers ────
    const hasDraggableProp = /draggable\s*\?\s*:\s*boolean/.test(segmentedTabs);
    if (!hasDraggableProp) {
        violations.push(
            "D4: SegmentedTabs declares no `draggable?: boolean` prop (the additive `:draggable` axis did not land).",
        );
    }
    // The default is false (additive opt-in) — withDefaults carries `draggable: false`.
    const draggableDefaultsFalse = /draggable\s*:\s*false/.test(segmentedTabs);
    if (hasDraggableProp && !draggableDefaultsFalse) {
        violations.push(
            "D4: the `draggable` prop does not default `false` (the drag must be opt-in additive — a default-on rewrite of selection REDs).",
        );
    }
    // BITE: the click path is unchanged (select + squishOnTravel still present —
    // the drag is opt-in, not a selection rewrite).
    const clickPathIntact =
        /squishOnTravel\s*\(/.test(segmentedTabs) &&
        /function\s+select\s*\(/.test(segmentedTabs) &&
        /@click\s*=\s*["']select\(/.test(segmentedTabs);
    if (!clickPathIntact) {
        violations.push(
            "D4: the click-selection path (`select` + `squishOnTravel` + `@click=select(`) is not intact — the drag must be ADDITIVE, never a rewrite of the click selection (the byte-identical click bite).",
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
        /ArrowDown/.test(segmentedTabs) &&
        /ArrowUp/.test(segmentedTabs) &&
        /ArrowRight/.test(segmentedTabs) &&
        /ArrowLeft/.test(segmentedTabs) &&
        /isVertical/.test(segmentedTabs);
    if (hasKeydown && !axisDerivedArrows) {
        violations.push(
            "D5: the keydown arrow axis is not derived off `isVertical` (it must handle ArrowRight/Left horizontal AND ArrowDown/Up vertical — a hardcoded horizontal-only set leaves the vertical strip keyboard-dead).",
        );
    }
    // Home/End jumps.
    const hasHomeEnd = /["']Home["']/.test(segmentedTabs) && /["']End["']/.test(segmentedTabs);
    if (hasKeydown && !hasHomeEnd) {
        violations.push(
            "D5: the keydown handler does not handle Home/End (the first/last-tab jumps).",
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
        d3: { projectsRest, resolvesNearest, retargets, singleCommitGuard },
        d4: {
            hasDraggableProp,
            draggableDefaultsFalse,
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

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectDragMorph({
        useDragMorphTs: safeRead(P.USE_DRAG_MORPH_TS),
        motionIndexTs: safeRead(P.MOTION_INDEX_TS),
        segmentedTabsVue: safeRead(P.SEGMENTED_TABS_VUE),
        useTabDragMorphTs: safeRead(P.USE_TAB_DRAG_MORPH_TS),
        dockLayerGroupVue: safeRead(P.DOCK_LAYER_GROUP_VUE),
    });

    const biteHasTeeth = selfTestBite();
    if (!biteHasTeeth) {
        violations.push(
            "SELF-TEST: the D5 draggable-gated-tabindex bite did not flag the synthetic evasion — the gate's own teeth are broken.",
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
        selfTest: { d5BiteHasTeeth: biteHasTeeth },
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
        `  D3 fling to NEAREST, single-commit      : ${yn(
            facts.d3.projectsRest &&
                facts.d3.resolvesNearest &&
                facts.d3.retargets &&
                facts.d3.singleCommitGuard,
        )}`,
    );
    console.log(
        `  D4 :draggable additive, ≥2 consumers    : ${yn(
            facts.d4.hasDraggableProp &&
                facts.d4.draggableDefaultsFalse &&
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
    console.log(`  self-test D5 bite has teeth             : ${yn(biteHasTeeth)}`);

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
