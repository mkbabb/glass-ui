<script setup lang="ts">
// The shell-prop derivation (variant/shape/orientation/density/collapse surface +
// the container-query style + the discriminated-union prop types) lives in
// ./composables/useDockShellProps; the morph-window timing family (the
// isTransitioning flag lifecycle) lives in ./composables/useDockMorphWindow. This
// SFC composes the dual-layer grid, the axis-aware expand/collapse transition, and
// the pointer/focus hold machinery.
import { computed, onMounted, ref, useId, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/dom/useTouchGate";
// AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — the sampled-luminance observer is wired ON by
// DEFAULT for the dock (the surface the user reported unreadable over light, and the
// one most often over a live/bright backdrop). It REFINES the W55 declarative bucket +
// the Arm-1 self-engage (both stay the floor); a dark-substrate consumer opts out via
// `--glass-tint-strength: 0%` on the dock or `:auto-luminance="false"`. Imported
// directly (NOT via the glass barrel) — the composable is demo-private (path B): the
// dock is the binary consumer #1, the public barrel seat awaits a 2nd binary consumer
// (docs/consumer-evidence/use-glass-backdrop-luminance.md names the booked trigger).
import { useGlassBackdropLuminance } from "../../../composables/glass/useGlassBackdropLuminance";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import {
    useDockMorphOrchestrator,
    provideDockMorphContext,
} from "./composables/dockMorphContext";
import { useDockShellProps, type DockProps } from "./composables/useDockShellProps";
import { useDockMorphWindow } from "./composables/useDockMorphWindow";

/* AZ.W-DOCK-TAXONOMY (arm a) — the prop contract is ONE shape (DockProps, in
   useDockShellProps). The `variant` discriminant is gone: there is no
   `variant="rail" | "instrument-strip"` second-way to express "vertical" — that is
   `orientation="vertical"` alone — and the collapse↔expand surface
   (`collapseDelay`/`startCollapsed`/`layout`) applies on BOTH orientations (a
   vertical dock morphs its `height`, a horizontal dock its `width`; the single
   opt-out is `alwaysExpanded`, default false). Defaults are applied at each read
   site in `useDockShellProps` via `?? default`. */
const props = defineProps<DockProps>();

/* The resolved shell-prop computeds — shape/orientation/density, the collapse
   surface (`collapseDelay`/`startCollapsed`/`layoutValue`), the scroll-overflow
   class, `alwaysExpanded`/`fitContent`, and the container-query `containerStyle`.
   (See useDockShellProps for the full `containerName` always-expanded-only
   rationale — AY.W-DOCK2 §F1.) */
const {
    containerStyle,
    collapseDelay,
    startCollapsed,
    layoutValue,
    shape,
    orientation,
    density,
    scrollClass,
    alwaysExpanded,
    fitContent,
} = useDockShellProps(props);
const layout = layoutValue;

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");

/* AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — wire the sampled-luminance observer ON for
   the dock by default. It writes `--glass-backdrop-luma` + derives the
   `--glass-backdrop: light|dark` bucket on the dock root, DYNAMICALLY tracking the
   painted backdrop (a live aurora bleed) the static bucket is too coarse for. The
   Arm-1 self-engage + the declarative bucket stay the FLOOR — this REFINES. Opt out
   with `:auto-luminance="false"`. */
if (props.autoLuminance !== false) {
    useGlassBackdropLuminance(dockEl, {
        backgroundCanvas: props.backgroundCanvas ?? null,
    });
}

const isTransitioning = ref(false);
const touchGate = useTouchGate(collapseDelay.value);
const dockId = `glass-dock-${useId()}`;

const {
    expanded,
    isPinned,
    isHeld,
    onMouseEnter,
    onMouseLeave,
    onFocusIn,
    onFocusOut,
    onClickCollapsed,
    keepOpen,
    release,
    expand,
    collapse,
} = useDockState({
    collapseDelay: collapseDelay.value,
    rootEl: dockEl,
    alwaysExpanded,
    isTransitioning,
    dockId,
});

/* O.W2 — canonical typed-key dock context (invariant 25). The 6 prior
   string-keyed dock provides (`glassDockContext`, `glassDockId`,
   `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapse
   into this single typed provide. `dockExpanded` is retired (zero
   downstream consumers per Rδ); `glassDockId` is dedup'd with
   `context.id`. */
provideDockContext({
    id: dockId,
    orientation,
    layout,
    keepOpen,
    release,
    held: isHeld,
});

const visualExpanded = computed(() => alwaysExpanded.value || expanded.value);

/* AX.W02 — ONE morph orchestrator per dock. W01 established the single-scalar
   `--dock-morph-t` spring; W02 folds the outer collapse↔expand pair AND every
   nested `<DockLayerGroup>` pane-swap onto ONE engine. The dock is modelled as a
   single morph stack whose active "layer" is `(expandedState × activePane)`: the
   outer swap and the inner pane swap are transitions in the SAME group, driven by
   ONE `SpringProgress` writing one root scalar. A nested group no longer mints its
   own `useLayerTransition` engine — it injects this orchestrator and registers,
   so a simultaneous collapse + pane-swap settles on one spring, one scalar, one
   clock. The outer pair morphs the inline axis (horizontal docks only — vertical
   rails render a single slot, no layer pair to crossfade). */
const outerActiveLayer = computed<string>(() =>
    visualExpanded.value ? "full" : "summary",
);
/* AZ.W-DOCK-TAXONOMY (move 2) — the outer collapse pair morphs the LAYOUT axis,
   not a hardcoded inline axis. A horizontal dock morphs `width`; a vertical dock
   morphs `height` (`dockMorphContext.dimOf` already maps the axis). This is the
   wiring that lets a collapsible vertical dock shrink — the machinery the old
   `variant="rail"` force-pin denied. */
const outerLayerAxis = computed<"horizontal" | "vertical">(() => orientation.value);
/* AX.W01 redress (KEPT) — the OUTER collapse is a CLIP-APERTURE morph. Both panes
   (`--full` + `--summary`) are grid-stacked behind the root clip; the ACTIVE pane
   is in-flow (`position:relative; width:max-content`) and the INACTIVE one is
   `position:absolute; inset:0` (stretched, out of flow). `.dock-layers` therefore
   shrink-wraps the ACTIVE pane — so its size differs between collapsed/expanded
   only AFTER Vue flushes the `.collapsed`↔`.expanded` class flip that swaps which
   pane is active. The orchestrator pins the container at `from` immediately (box
   holds, child stagger holds at t=0) and measures `to` one rAF later — post-flush
   — when the container shrink-wraps to the TARGET pane's natural width. Size +
   padding + radius + color + child stagger all co-morph off the one
   `--dock-morph-t` scalar. The inner `<DockLayerGroup>` pane-swap shares the SAME
   pane topology and registers as a SECOND morph target on the SAME spring. */
const { context: dockMorphContext, onOuterTransitionEnd: onLayersTransitionEnd } =
    useDockMorphOrchestrator({
        rootEl: dockEl,
        outerEl: layersEl,
        outerActiveLayer,
        outerAxis: outerLayerAxis,
    });

/* AX.W02 — PROVIDE the single morph orchestrator through the optional DI seam. A
   nested `<DockLayerGroup>` injects it and DEFERS its pane-swap morph to this one
   engine (no second spring); a `<DockLayerGroup>` rendered outside any
   `<GlassDock>` reads `null` and self-orchestrates as before (the standalone demo
   path). `createOptionalContext` is correct: a missing provider is a
   befitting-silent standalone-render path, not a library-internal violation. */
provideDockMorphContext(dockMorphContext);

/* AX.W01 — the route-morph `view-transition-name` seam (PRESERVED). The dock
   COLLAPSE VT fork is RETIRED (the box morph runs on the single spring scalar
   above; VT crossfades rasterized pixels — the wrong primitive for a layout
   morph). But the per-instance `glass-dock-${useId()}` NAMED-ELEMENT seam is KEPT,
   moved to the dock ROOT, for the consumer's PAGE/route geometry-morph (fourier's
   J+K critical-path route morph; invariant η — the `proof:vt-names` gate polices
   the app-unique `useId()` mint-source). `dockId` is app-scoped, so two co-mounted
   docks mint DISTINCT names and never collide their route-morph snapshots. The
   name is no longer the dock's OWN collapse mechanism — only the route
   geometry-morph the consumer drives. Always applied (the route-morph is engine-
   gated by the consumer's own `startViewTransition`, not by the dock). */
const rootVtStyle = computed<Record<string, string>>(() => ({
    "view-transition-name": dockId.replace(/[^a-zA-Z0-9_-]/g, "-"),
}));

/* The morph-WINDOW timing family — the `isTransitioning` flag lifecycle (the
   morph generation, the spring-settle fallback timer, and the resize-morph
   `transitionend` resolver). Owns its own unmount cleanup. */
const { markTransitioning, onDockTransitionDone } = useDockMorphWindow(
    dockEl,
    isTransitioning,
);

onMounted(() => {
    if (props.alwaysExpanded || !startCollapsed.value) {
        expand();
    }
});

/* AZ.W-DOCK-TAXONOMY — the touch gate (tap-to-expand on a collapsed floating pill)
   applies to ANY collapsible dock, not just the horizontal one. A vertical dock now
   collapses too, so the gate must distinguish a tap from a vertical scroll on its
   pill as well. */
function shouldGateTouch(): boolean {
    return !alwaysExpanded.value;
}

/* AT.W6-dock-b — shape B′ touch-gate. The gate's job is to DISTINGUISH a tap
   from a vertical scroll on the floating collapsed pill (the 150ms pending
   window + the >10px scroll-check inside `useTouchGate`), NOT to SWALLOW the
   tap. We therefore do NOT `preventDefault()`/`stopPropagation()` the activating
   `touchstart`/`touchend`: the browser's native tap→click compatibility event is
   allowed to flow to the tapped control, so a SINGLE tap on a collapsed dock
   control BOTH expands the dock (here) AND activates that control (via the
   native click) — the iOS Now-Playing mini-bar single-tap-play contract. No
   `elementFromPoint`, no synthetic dispatch: the fix rides the browser's own
   tap→click. (Swallowing the tap was the root cause of the double-tap field
   defect — a prevented touch sequence emits no compatibility click, so the
   control under the finger fired nothing and the user had to tap twice.) A
   scroll gesture cancels the pending tap inside the gate and never emits a
   tap-click, so vertical scrolling on the pill stays browser-owned. */
function onTouchStart(event: TouchEvent): void {
    if (!shouldGateTouch() || visualExpanded.value) return;
    const root = dockEl.value;
    const touch = event.touches[0];
    if (!root || !touch) return;

    // Arm the tap/scroll discrimination; the return value is consumed by the
    // gate's own state — the tap is never preventDefault-ed (shape B′).
    touchGate.handleTouchStart(root, touch.clientY);
}

function onTouchMove(event: TouchEvent): void {
    if (!shouldGateTouch()) return;
    touchGate.handleScrollCheck(event);
}

function onTouchEnd(): void {
    if (!shouldGateTouch()) return;
    const wasActive = touchGate.isActive.value;
    touchGate.handleTouchEnd();
    if (!wasActive && touchGate.isActive.value && !visualExpanded.value) {
        // Expand on the resolved tap, but let the native compatibility click
        // reach the control — no preventDefault, no stopPropagation (shape B′).
        expand();
    }
}

watch(touchGate.isActive, (isActive) => {
    if (!isActive && expanded.value && !isPinned.value && !alwaysExpanded.value) {
        collapse();
    }
});

watch(visualExpanded, (isExpanded) => {
    markTransitioning();
    if (!isExpanded) {
        touchGate.deactivate();
    }
});

defineExpose({ expanded, isPinned, isHeld, isTransitioning, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            orientation,
            `shape-${shape}`,
            `layout-${layout}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical' },
            position === 'fixed' ? 'fixed bottom-(--dock-pos) left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :data-density="density"
        :data-held="isHeld || undefined"
        :data-container-name="containerName || undefined"
        :style="[containerStyle, rootVtStyle]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="onDockTransitionDone"
        @transitioncancel="onDockTransitionDone"
    >
        <!--
            AX.W45 D13-a — the PERSISTENT region. The `#persistent` slot is a root
            flex SIBLING of the morph-region, in-flow in BOTH collapsed AND expanded,
            NEVER `:inert`, NEVER a crossfade pane. It is the iOS Now-Playing /
            Stage-Manager idiom done STRUCTURALLY: a stable always-present rail beside
            the expand-on-demand content region, so a consumer keeps a control visible
            while collapsed WITHOUT hand-duplicating it into both the `#default` and
            `#collapsed` slots. It rides the root padding/radius morph (it inherits the
            `--dock-morph-t` chrome) but is NOT a `registerGroup` morph TARGET — it
            holds steady (no crossfade, no jitter) while the morph-region's aperture
            animates on the ONE spring. Rendered only when authored ($slots.persistent),
            so a dock with no persistent controls is byte-identical to before.
        -->
        <div v-if="$slots.persistent" class="dock-persistent">
            <slot name="persistent" />
        </div>

        <!--
            AZ.W-DOCK-TAXONOMY (move 2) — the built-in two-layer morph pattern (full +
            collapsed summary) is now ORIENTATION-AGNOSTIC. Both orientations stack
            the full/summary panes on a 1/1 CSS grid and crossfade with the
            FLIP-driven aperture morph: a horizontal dock morphs `width`, a vertical
            dock morphs `height` (the morph orchestrator keys its axis off the
            resolved `orientation` via `outerLayerAxis`). The prior split — a
            horizontal full/summary FLIP pair vs. a static vertical single-body —
            denied the vertical dock the collapse/shrink machinery; unifying the
            structure gives a collapsible vertical dock the height morph the
            mandate names. An `always-expanded` dock renders the `full` pane in-flow
            and the `summary` pane out-of-flow (no morph fires), so a vertical nav
            column that opts out of collapse reads exactly as before.
        -->
        <div
            ref="layersEl"
            class="dock-layers"
            @transitionend="onLayersTransitionEnd"
        >
            <div
                :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
                :inert="!expanded || undefined"
            >
                <slot />
            </div>
            <div
                :class="['dock-layer dock-layer--summary', { 'is-active': !visualExpanded }]"
                :inert="expanded || undefined"
                @click="onClickCollapsed"
            >
                <slot name="collapsed" />
            </div>
        </div>

        <!--
            AZ.W-RAIL-EXTEND — the `#rail` CHROME slot (the W-GOD1-booked carve, landed
            here). It is a root sibling of `.dock-layers`, rendered OUTSIDE the clipped
            morph aperture: the `.dock-hairline-slot` wrapper is `position: absolute`
            relative to the dock root, so the root's morph-axis `overflow: clip` never
            reaches it and its content (a `<DockRail>` hairline + context end-icon)
            PERSISTS when the dock collapses (G2 — the persistence the in-pane switcher
            rail lacks). Rendered only when authored ($slots.rail), so a dock with no
            rail is byte-identical to before.
        -->
        <div v-if="$slots.rail" class="dock-hairline-slot">
            <slot name="rail" />
        </div>
    </div>
</template>
