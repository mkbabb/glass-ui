<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/useTouchGate";
import { useDockState } from "./composables/useDockState";

type DockDensity = "compact" | "comfortable" | "spacious";

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
});

const visualExpanded = computed(() => alwaysExpanded.value || expanded.value);

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
    if (!isExpanded) {
        touchGate.deactivate();
    }
});

defineExpose({ expanded, isPinned, isTransitioning, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            orientation,
            `variant-${variant}`,
            `shape-${shape}`,
            `density-${density}`,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-wrap': wrap },
            position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
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

<style scoped>
.glass-dock {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-dock);
    white-space: nowrap;
    overflow: hidden;
    padding: var(--dock-padding-block, 0.375rem) var(--dock-padding-inline, 0.5rem);
    /* Consumers can reskin the dock surface by defining --glass-bg-dock,
       --glass-blur-dock, --glass-border-dock and --shadow-dock-override.
       Each falls back to the historical default so existing consumers are
       untouched. bbnf-buddy routes these to its cartoon tokens. */
    background: var(--glass-bg-dock, var(--glass-bg-medium));
    backdrop-filter: var(--glass-blur-dock, var(--glass-blur-subtle));
    -webkit-backdrop-filter: var(--glass-blur-dock, var(--glass-blur-subtle));
    border: 1.5px solid var(--glass-border-dock, var(--glass-border-medium));
    box-shadow: var(--shadow-dock-override, var(--shadow-dock));
}

.glass-dock.density-compact {
    --dock-padding-block: var(--dock-density-compact-padding-block, 0.25rem);
    --dock-padding-inline: var(--dock-density-compact-padding-inline, 0.375rem);
    --dock-control-size: var(--dock-density-compact-control-size, 2rem);
    --dock-layer-height: var(--dock-density-compact-layer-height, 2rem);
    --dock-layer-gap: var(--dock-density-compact-gap, 0.25rem);
    --dock-trigger-padding-block: var(--dock-density-compact-trigger-padding-block, 0.1875rem);
    --dock-trigger-padding-inline: var(--dock-density-compact-trigger-padding-inline, 0.4375rem);
    --dock-tab-padding-block: var(--dock-density-compact-tab-padding-block, 0.3125rem);
    --dock-tab-padding-inline: var(--dock-density-compact-tab-padding-inline, 0.625rem);
}

.glass-dock.density-spacious {
    --dock-padding-block: var(--dock-density-spacious-padding-block, 0.5rem);
    --dock-padding-inline: var(--dock-density-spacious-padding-inline, 0.75rem);
    --dock-control-size: var(--dock-density-spacious-control-size, 2.75rem);
    --dock-layer-height: var(--dock-density-spacious-layer-height, 2.75rem);
    --dock-layer-gap: var(--dock-density-spacious-gap, 0.5rem);
    --dock-trigger-padding-block: var(--dock-density-spacious-trigger-padding-block, 0.375rem);
    --dock-trigger-padding-inline: var(--dock-density-spacious-trigger-padding-inline, 0.625rem);
    --dock-tab-padding-block: var(--dock-density-spacious-tab-padding-block, 0.5rem);
    --dock-tab-padding-inline: var(--dock-density-spacious-tab-padding-inline, 0.875rem);
}

.glass-dock::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--paper-clean-texture);
    background-repeat: repeat;
    background-size: var(--paper-texture-size);
    opacity: var(--glass-grain-opacity);
    pointer-events: none;
    mix-blend-mode: overlay;
}

.dark .glass-dock::after {
    mix-blend-mode: soft-light;
}

/* ── Horizontal (default): width animates ── */
.glass-dock:not(.vertical) {
    transition:
        width var(--duration-normal) var(--spring-snappy),
        padding var(--duration-normal) var(--spring-snappy),
        box-shadow var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--spring-snappy),
        background var(--duration-normal) var(--ease-standard),
        border-color var(--duration-normal) var(--ease-standard);
}

/* ── Vertical: column layout, content-sized, rounded rectangle ──
   Vertical docks host tool palettes. They don't collapse into a summary
   icon, so the template renders the default slot directly — no dock-layers
   grid wrapper. Width hugs the widest child; height is content-driven
   (with the consumer's max-height applying naturally). */
.glass-dock.vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.25rem;
    white-space: normal;
    width: auto;
    height: auto;
    max-height: calc(100vh - 2rem);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    padding: var(--dock-vertical-padding, var(--dock-padding-block, 0.375rem));
    border-radius: var(--radius-dock);
    transition:
        height var(--duration-normal) var(--spring-snappy),
        width var(--duration-normal) var(--spring-snappy),
        padding var(--duration-normal) var(--spring-snappy),
        box-shadow var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--spring-snappy),
        background var(--duration-normal) var(--ease-standard),
        border-color var(--duration-normal) var(--ease-standard);
}

.glass-dock.vertical::-webkit-scrollbar {
    display: none;
}

.glass-dock.variant-rail {
    padding: var(--dock-rail-padding, var(--dock-padding-inline, 0.5rem));
    background: var(--glass-bg-dock, var(--glass-bg-subtle));
    border-color: var(--glass-border-dock, var(--glass-border-subtle));
}

.glass-dock.variant-rail.shape-pill {
    border-radius: var(--radius-pill);
}

.glass-dock.variant-rail.shape-rounded {
    border-radius: var(--radius-xl);
}

/* ── Collapsed: compact pill (round when icon-only) ── */
.glass-dock.collapsed {
    cursor: pointer;
    padding: var(--dock-collapsed-padding, var(--dock-padding-block, 0.375rem));
    justify-content: center;
    background: var(--glass-bg-subtle);
    border-color: var(--glass-border-elevated);
    box-shadow: var(--shadow-dock-collapsed);
}

/* When collapsed content is just an icon (no text), force square = circle.
   The dock-layer height is 2.5rem; with 0.375rem padding each side that's
   the intrinsic height. We match width to height via the same constraint. */
.glass-dock.collapsed .dock-layer--summary {
    min-width: var(--dock-collapsed-summary-min-size, var(--dock-layer-height, 2.5rem));
    justify-content: center;
}

.glass-dock.collapsed:hover {
    background: var(--glass-bg-subtle);
    border-color: var(--glass-border-elevated);
    box-shadow: var(--shadow-dock);
    transform: scale(1.03);
}

.glass-dock:where(.fixed) {
    z-index: var(--z-dock);
}

.dock-inline {
    margin: 0 auto;
}

.dock-sticky {
    position: sticky;
    top: 0;
    z-index: var(--z-dock);
    margin: 0 auto;
}

/* ── Layer stacking via grid ── */
.dock-layers {
    display: grid;
}

.dock-layer {
    display: flex;
    align-items: center;
    white-space: nowrap;
    grid-area: 1 / 1;
    gap: var(--dock-layer-gap, 0.375rem);
    height: var(--dock-layer-height, 2.5rem);
}

.dock-layer.layer-active {
    pointer-events: auto;
}

.dock-layer:not(.layer-active) {
    pointer-events: none;
    position: absolute;
    visibility: hidden;
}

.glass-dock.expanded {
    overflow: visible;
}

/* When the dock stretches to a set width (not fit-content), layers fill it */
.glass-dock.expanded:not(.fit-content) .dock-layers {
    width: 100%;
}

.glass-dock.expanded:not(.fit-content) .dock-layer--full {
    width: 100%;
}

.glass-dock.always-expanded {
    cursor: default;
    overflow: visible;
}

.glass-dock.vertical.always-expanded {
    overflow-x: hidden;
    overflow-y: auto;
}

/* ── Wrap variant: multi-line responsive dock ──
   Mobile: content wraps, dock grows both axes, rounded-rect.
   Desktop (sm+): single-row pill, same as default. */
.glass-dock.dock-wrap {
    white-space: normal;
    border-radius: var(--radius-2xl);
    max-width: calc(100vw - 1rem);
    padding:
        var(--dock-wrap-padding-block, var(--dock-padding-block, 0.375rem))
        var(--dock-wrap-padding-inline, 0.625rem);
}

.glass-dock.dock-wrap .dock-layer--full {
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
    min-height: var(--dock-wrap-layer-min-height, var(--dock-layer-height, 2rem));
    gap: var(--dock-wrap-row-gap, 0.25rem) var(--dock-wrap-column-gap, var(--dock-layer-gap, 0.375rem));
}

.glass-dock.dock-wrap .dock-layer--summary {
    height: auto;
    min-height: var(--dock-wrap-layer-min-height, var(--dock-layer-height, 2rem));
}

/* Hide vertical separators when content wraps — they don't make sense between rows */
.glass-dock.dock-wrap :deep(.dock-separator) {
    display: none;
}

/* Collapsed stays pill */
.glass-dock.dock-wrap.collapsed {
    border-radius: var(--radius-pill);
    white-space: nowrap;
    max-width: none;
}

/* Desktop: revert to single-row pill */
@media (min-width: 640px) {
    .glass-dock.dock-wrap {
        white-space: nowrap;
        border-radius: var(--radius-pill);
        max-width: none;
        padding:
            var(--dock-wrap-desktop-padding-block, var(--dock-padding-block, 0.375rem))
            var(--dock-wrap-desktop-padding-inline, 0.75rem);
    }

    .glass-dock.dock-wrap .dock-layer--full {
        flex-wrap: nowrap;
        height: var(--dock-layer-height, 2.5rem);
        gap: var(--dock-wrap-desktop-gap, var(--dock-layer-gap, 0.25rem));
    }

    .glass-dock.dock-wrap .dock-layer--summary {
        height: var(--dock-layer-height, 2.5rem);
    }

    .glass-dock.dock-wrap :deep(.dock-separator) {
        display: block;
    }
}
</style>
