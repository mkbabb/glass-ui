<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/useTouchGate";
import {
    provideDockContext,
    type DockPopoverRegistration,
} from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";

type DockDensity = "compact" | "comfortable" | "spacious" | "audacious";
let dockInstanceId = 0;

const props = withDefaults(
    defineProps<{
        collapseDelay?: number;
        startCollapsed?: boolean;
        fitContent?: boolean;
        position?: "inline" | "sticky";
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

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const variant = computed(() => props.variant);
const shape = computed(() => props.shape);
const orientation = computed(() => props.variant === "rail" ? "vertical" : props.orientation);
const density = computed(() => props.density);
const alwaysExpanded = computed(() => props.alwaysExpanded || orientation.value === "vertical");
const fitContent = computed(() => props.fitContent || props.variant === "rail");

const isTransitioning = ref(false);
const touchGate = useTouchGate(props.collapseDelay);
const dockId = `glass-dock-${++dockInstanceId}`;
const popovers = new Set<DockPopoverRegistration>();
let transitionTimer: ReturnType<typeof setTimeout> | null = null;

function registerPopover(popover: DockPopoverRegistration): () => void {
    popovers.add(popover);
    return () => {
        popovers.delete(popover);
    };
}

function closeOtherPopovers(popover: DockPopoverRegistration): void {
    for (const registered of popovers) {
        if (registered !== popover && registered.expanded.value) {
            registered.scheduleCollapse(0);
        }
    }
}

provideDockContext({
    id: dockId,
    orientation,
    registerPopover,
    closeOtherPopovers,
});

const {
    expanded,
    isPinned,
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

defineExpose({ expanded, isPinned, isTransitioning, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :data-position="position"
        :class="[
            orientation,
            `variant-${variant}`,
            `shape-${shape}`,
            `density-${density}`,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-wrap': wrap },
            position === 'sticky' ? 'dock-sticky' : 'dock-inline',
        ]"
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
            collapsed summary) with CSS-grid stacking and fade-swap
            transitions. Vertical docks are tool palettes: they don't
            collapse into a summary icon, and hosting a DockLayerGroup
            inside demands a direct single-slot body with no nested grid.
        -->
        <template v-if="orientation === 'horizontal'">
            <div class="dock-layers">
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

