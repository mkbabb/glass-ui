<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/dom/useTouchGate";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import { useLayerTransition } from "./composables/useLayerTransition";

type DockDensity = "compact" | "comfortable" | "spacious" | "audacious";

const props = withDefaults(
    defineProps<{
        collapseDelay?: number;
        startCollapsed?: boolean;
        fitContent?: boolean;
        position?: "fixed" | "inline" | "sticky";
        alwaysExpanded?: boolean;
        /**
         * Visual/behavioral preset.
         *   `dock`             — the horizontal floating dock (default).
         *   `rail`             — the vertical icon rail variant used by
         *                        app chrome (stadium-pill silhouette,
         *                        `--glass-bg-wash` plate).
         *   `instrument-strip` — vertical chassis-strip mode for consumer
         *                        cockpits composing an instrument-cluster
         *                        gauge column (the speedtest
         *                        SurveyResultDock consumer). Drops the
         *                        rail variant's `--radius-pill` extreme
         *                        and adopts the `<InstrumentChassis>`
         *                        family's surface vocabulary
         *                        (`--radius-card` border-radius,
         *                        `--glass-bg-chassis` background,
         *                        `--glass-border-quiet` border,
         *                        `--glass-shadow-quiet` shadow, plus an
         *                        engraved-bezel `::before` inner stroke
         *                        matching `InstrumentChassis::before`).
         *                        No new tokens — lifts the existing
         *                        chassis vocabulary. AJ-W1-δ / G-AJ-D7.
         */
        variant?: "dock" | "rail" | "instrument-strip";
        /** Corner treatment for vertical rail/tool-palette docks. */
        shape?: "pill" | "rounded";
        /**
         * Layout axis of the dock. `"horizontal"` (default) lays items out
         * left-to-right and animates `width`; `"vertical"` lays items out
         * top-to-bottom and animates `height`.
         */
        orientation?: "horizontal" | "vertical";
        /**
         * Density controls dock padding, gaps, layer height, and inherited
         * dock control sizing. Root CSS variables can override each density.
         */
        density?: DockDensity;
        /**
         * Overflow strategy when the expanded content exceeds the dock's
         * axis cap (`--dock-max-inline-size` horizontally,
         * `--dock-max-block-size` vertically). The ONE knob governing every
         * overflow behaviour (AT.W7-dock-a clean break — collapsed from the
         * prior `wrap` boolean + `overflow` pair + `containerName` clip-lift,
         * which all touched overflow divergently).
         *   `"grow"`   — content grows to fit then overflows visibly past
         *                the cap (the default; nothing clips or scrolls).
         *   `"wrap"`   — expanded content wraps to multiple lines/rows (the
         *                `.dock-overflow-wrap` recipe — a multi-row pill that narrows
         *                to the viewport gutter on small screens and snaps
         *                back to a single nowrap row past `--dock-overflow-bp`).
         *   `"scroll"` — the dock becomes the scroll port. Horizontal docks
         *                scroll the active layer on the inline axis
         *                (`.dock-scroll-x`); vertical rails scroll on the
         *                block axis (`.dock-scroll-y`), keeping the
         *                `max-block-size` cap. The rounded pill masks the
         *                scroll edge; the scrollbar is hidden. The axis is
         *                chosen automatically from `orientation`.
         */
        overflow?: "grow" | "wrap" | "scroll";
        /**
         * When set, the dock root establishes an inline-size container query
         * subject (`container-type: inline-size; container-name: <value>`) so
         * descendants can query the named container via `@container <value>
         * (...)` rules. ORTHOGONAL to the `overflow` clip: opting into a
         * container subject does NOT silently change the dock's clip shell
         * (AT.W7-dock-a — the prior clip-lift was folded out; use
         * `overflow="wrap"` to allow multi-line content).
         *
         * T.B audit §1.3 cornerstone: the cluster's container subject must
         * live on the dock primitive, never on a descendant whose intrinsic
         * size the dock relies on.
         */
        containerName?: string;
    }>(),
    {
        collapseDelay: 2000,
        startCollapsed: true,
        fitContent: false,
        position: "inline",
        alwaysExpanded: false,
        variant: "dock",
        shape: "pill",
        orientation: "horizontal",
        density: "comfortable",
        overflow: "grow",
    },
);

/* AT.W7-dock-a — the container-query opt-in is ORTHOGONAL to the overflow
   clip. The prior `overflow: visible` clip-lift here silently coupled the
   container subject to the clip shell; it is folded out. A consumer wanting
   multi-line content opts into `overflow="wrap"`. */
const containerStyle = computed<Record<string, string> | undefined>(() => {
    if (!props.containerName) return undefined;
    return {
        "container-type": "inline-size",
        "container-name": props.containerName,
    };
});

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");
const variant = computed(() => props.variant);
const shape = computed(() => props.shape);
const orientation = computed(() =>
    props.variant === "rail" || props.variant === "instrument-strip"
        ? "vertical"
        : props.orientation,
);
const density = computed(() => props.density);
/* Scroll-on-overflow opt-in (default `"grow"` keeps the historical
   visible-overflow behaviour). When `overflow === "scroll"` the dock
   becomes the scroll port on its layout axis: horizontal docks scroll the
   active layer inline (`.dock-scroll-x`), vertical rails scroll the root
   block-axis (`.dock-scroll-y`). The axis is derived from `orientation`. */
const scrollClass = computed<string | null>(() => {
    if (props.overflow !== "scroll") return null;
    return orientation.value === "vertical" ? "dock-scroll-y" : "dock-scroll-x";
});
const alwaysExpanded = computed(() => props.alwaysExpanded || orientation.value === "vertical");
const fitContent = computed(() =>
    props.fitContent ||
    props.variant === "rail" ||
    props.variant === "instrument-strip",
);

const isTransitioning = ref(false);
const touchGate = useTouchGate(props.collapseDelay);
const dockId = `glass-dock-${useId()}`;
let transitionTimer: ReturnType<typeof setTimeout> | null = null;
/* AT.W6-dock-c — the morph GENERATION. `isTransitioning` must track the ACTUAL
   resize morph, never a stale event from a superseded one. Each `markTransitioning`
   (every `visualExpanded` flip) bumps `morphGeneration`; the timer fallback and
   the `transitionend` handler both capture the generation live at fire time and
   no-op when it has moved on. So a ≥2-dock rapid A→B→A re-trigger CANNOT
   skip-fast-forward (a leftover A→B `transitionend` cannot clear the live B→A
   morph) and CANNOT queue (the flag stays true across the whole chain, cleared
   only by the LAST morph's own resolution). */
let morphGeneration = 0;

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
    collapseDelay: props.collapseDelay,
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
    keepOpen,
    release,
    held: isHeld,
});

const visualExpanded = computed(() => alwaysExpanded.value || expanded.value);

/* J.W3.A cornerstone — compose `useLayerTransition` for the outer
   collapsed↔expanded pair (horizontal docks only — vertical rails
   render a single slot, no layer pair to crossfade). The composable
   captures the natural width before/after the slot swap and animates
   width between fixed pixel values via the `--dock-motion-resize`
   spring, eliminating the `width: auto` non-interpolation that caused
   the binary jerk diagnosed in R1+R6. The same primitive already
   drives `<DockLayerGroup>`'s inner pair — both crossfades now share
   one mechanism. */
const outerActiveLayer = computed<"full" | "summary">(() =>
    visualExpanded.value ? "full" : "summary",
);
const outerLayerAxis = computed<"horizontal" | "vertical">(() => "horizontal");
const { onTransitionEnd: onLayersTransitionEnd } = useLayerTransition({
    containerEl: layersEl,
    activeLayer: outerActiveLayer,
    axis: outerLayerAxis,
});

/* AQ.W6 §Design 7 — when View-Transitions are supported, the outer
   collapsed↔expanded width swap morphs as a VT group instead of the JS FLIP.
   A per-instance `view-transition-name` lets the browser capture + interpolate
   the `.dock-layers` box; `view-transition-class` binds the `.gl-dock-layer`
   group recipe (duration/ease from `--vt-*`). `dockId` is minted from Vue's
   app-scoped `useId()` — collision-free across lazy/eager module-graph copies,
   the same idiom as `<DockLayerGroup>`. The name is set ONLY on a supporting
   engine, so the FLIP-fallback path is never given a containing-block/isolation
   it does not need. */
const supportsVT =
    typeof document !== "undefined" && "startViewTransition" in document;
const layersVtStyle = computed<Record<string, string> | undefined>(() =>
    supportsVT
        ? {
              "view-transition-name": dockId.replace(/[^a-zA-Z0-9_-]/g, "-"),
              "view-transition-class": "gl-dock-layer",
          }
        : undefined,
);

function parseTimeMs(value: string): number {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
    if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
    return Number.parseFloat(trimmed) || 0;
}

function longestTransitionMs(el: HTMLElement): number {
    const style = getComputedStyle(el);
    const durations = style.transitionDuration.split(",").map(parseTimeMs);
    const delays = style.transitionDelay.split(",").map(parseTimeMs);
    return Math.max(
        0,
        ...durations.map((duration, index) => duration + (delays[index] ?? delays[0] ?? 0)),
    );
}

function clearTransitionTimer(): void {
    if (transitionTimer) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
    }
}

/* The properties whose transitions ARE the resize morph (driven by
   `--dock-motion-resize`). The flag resolves on one of THESE finishing — never
   on a shorter `--dock-motion-standard` property (box-shadow/background/
   border-color), which would skip-fast-forward `isTransitioning` to false while
   the morph is still in flight. */
const RESIZE_MORPH_PROPS = new Set(["width", "height", "padding", "transform"]);

function markTransitioning(): void {
    const root = dockEl.value;
    if (!root) return;
    // Bump the generation: any in-flight morph's pending timer / transitionend
    // is now stale and self-cancels (the A→B→A no-skip / no-queue invariant).
    const generation = ++morphGeneration;
    clearTransitionTimer();
    isTransitioning.value = true;
    transitionTimer = setTimeout(() => {
        if (generation !== morphGeneration) return;
        isTransitioning.value = false;
        transitionTimer = null;
    }, longestTransitionMs(root) + 50);
}

function onDockTransitionDone(event: TransitionEvent): void {
    if (event.target !== dockEl.value) return;
    // Only the resize-morph properties resolve the flag — a shorter standard-
    // motion property finishing first must NOT drop `isTransitioning` mid-morph.
    if (!RESIZE_MORPH_PROPS.has(event.propertyName)) return;
    clearTransitionTimer();
    // Settle the generation so a later stale timer can't reopen the flag.
    morphGeneration++;
    isTransitioning.value = false;
}

onMounted(() => {
    if (props.alwaysExpanded || !props.startCollapsed) {
        expand();
    }
});

function shouldGateTouch(): boolean {
    return orientation.value === "horizontal" && !alwaysExpanded.value;
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

onBeforeUnmount(clearTransitionTimer);

defineExpose({ expanded, isPinned, isHeld, isTransitioning, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            orientation,
            `variant-${variant}`,
            `shape-${shape}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-overflow-wrap': overflow === 'wrap' },
            position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :data-density="density"
        :data-held="isHeld || undefined"
        :data-container-name="containerName || undefined"
        :style="containerStyle"
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
            Horizontal docks use the built-in two-layer pattern (full +
            collapsed summary) with CSS-grid stacking and FLIP-driven
            width crossfade transitions. Vertical docks are tool palettes:
            they don't collapse into a summary icon, and hosting a
            DockLayerGroup inside demands a direct single-slot body with
            no nested grid.
        -->
        <template v-if="orientation === 'horizontal'">
            <div
                ref="layersEl"
                class="dock-layers"
                :style="layersVtStyle"
                @transitionend="onLayersTransitionEnd"
            >
                <div
                    :class="['dock-layer dock-layer--full', { 'layer-active': visualExpanded }]"
                    :inert="!expanded || undefined"
                >
                    <slot />
                </div>
                <div
                    :class="['dock-layer dock-layer--summary', { 'layer-active': !visualExpanded }]"
                    :inert="expanded || undefined"
                    @click="onClickCollapsed"
                >
                    <slot name="collapsed" />
                </div>
            </div>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>
