<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/useTouchGate";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import { useLayerTransition } from "./composables/useLayerTransition";

type DockDensity = "compact" | "comfortable" | "spacious" | "audacious";
let dockInstanceId = 0;

const props = withDefaults(
    defineProps<{
        collapseDelay?: number;
        startCollapsed?: boolean;
        fitContent?: boolean;
        position?: "fixed" | "inline" | "sticky";
        alwaysExpanded?: boolean;
        /** Allow expanded content to wrap to multiple lines. */
        wrap?: boolean;
        /**
         * Visual/behavioral preset. `dock` is the horizontal floating dock;
         * `rail` is the vertical icon rail variant used by app chrome.
         */
        variant?: "dock" | "rail";
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
         * When set, the dock root establishes an inline-size container query
         * subject (`container-type: inline-size; container-name: <value>`)
         * and lifts its `overflow: hidden` clip so descendants can wrap or
         * report intrinsic widths at narrow viewports. Consumers query the
         * named container via `@container <value> (...)` rules.
         *
         * Without this prop the dock retains its default `overflow: hidden`
         * shell — the pre-T behaviour. T.B audit §1.3 cornerstone: the
         * cluster's container subject must live on the dock primitive, never
         * on a descendant whose intrinsic size the dock relies on.
         */
        containerName?: string;
    }>(),
    {
        collapseDelay: 2000,
        startCollapsed: true,
        fitContent: false,
        position: "inline",
        alwaysExpanded: false,
        wrap: false,
        variant: "dock",
        shape: "pill",
        orientation: "horizontal",
        density: "comfortable",
    },
);

const containerStyle = computed<Record<string, string> | undefined>(() => {
    if (!props.containerName) return undefined;
    return {
        "container-type": "inline-size",
        "container-name": props.containerName,
        overflow: "visible",
    };
});

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");
const variant = computed(() => props.variant);
const shape = computed(() => props.shape);
const orientation = computed(() => props.variant === "rail" ? "vertical" : props.orientation);
const density = computed(() => props.density);
const alwaysExpanded = computed(() => props.alwaysExpanded || orientation.value === "vertical");
const fitContent = computed(() => props.fitContent || props.variant === "rail");

const isTransitioning = ref(false);
const touchGate = useTouchGate(props.collapseDelay);
const dockId = `glass-dock-${++dockInstanceId}`;
let transitionTimer: ReturnType<typeof setTimeout> | null = null;

provideDockContext({
    id: dockId,
    orientation,
});

/* J.W3.B — string-keyed dock id for `<HoverPopover keep-dock-open>`.
   The portal-marker attrs (`data-glass-dock-portal` /
   `data-glass-dock-owner`) opt portaled HoverCard content into the
   dock's click-away allowlist via `isTeleportedTarget`. */
provide("glassDockId", dockId);

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

function markTransitioning(): void {
    const root = dockEl.value;
    if (!root) return;
    clearTransitionTimer();
    isTransitioning.value = true;
    transitionTimer = setTimeout(() => {
        isTransitioning.value = false;
        transitionTimer = null;
    }, longestTransitionMs(root) + 50);
}

function onDockTransitionDone(event: TransitionEvent): void {
    if (event.target !== dockEl.value) return;
    clearTransitionTimer();
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

function onTouchStart(event: TouchEvent): void {
    if (!shouldGateTouch() || visualExpanded.value) return;
    const root = dockEl.value;
    const touch = event.touches[0];
    if (!root || !touch) return;

    if (!touchGate.handleTouchStart(root, touch.clientY)) {
        event.preventDefault();
        event.stopPropagation();
    }
}

function onTouchMove(event: TouchEvent): void {
    if (!shouldGateTouch()) return;
    touchGate.handleScrollCheck(event);
}

function onTouchEnd(event: TouchEvent): void {
    if (!shouldGateTouch()) return;
    const wasActive = touchGate.isActive.value;
    touchGate.handleTouchEnd();
    if (!wasActive && touchGate.isActive.value && !visualExpanded.value) {
        event.preventDefault();
        event.stopPropagation();
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
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-wrap': wrap },
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
            <div ref="layersEl" class="dock-layers" @transitionend="onLayersTransitionEnd">
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
