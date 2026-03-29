<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from "vue";
import { useDockState } from "./composables/useDockState";
import { useDockTransition } from "./composables/useDockTransition";

const props = withDefaults(
    defineProps<{
        collapseDelay?: number;
        startCollapsed?: boolean;
        fitContent?: boolean;
        position?: "fixed" | "inline" | "sticky";
        fadeMs?: number;
        alwaysExpanded?: boolean;
        /** Allow expanded content to wrap to multiple lines. */
        wrap?: boolean;
    }>(),
    {
        collapseDelay: 2000,
        startCollapsed: true,
        fitContent: false,
        position: "inline",
        fadeMs: 60,
        alwaysExpanded: false,
        wrap: false,
    },
);

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const alwaysExpanded = computed(() => props.alwaysExpanded);

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
});

const { visualExpanded, isTransitioning, transitionWidth, suppressTransition, onTransitionEnd } = useDockTransition({
    expanded,
    rootEl: dockEl,
    fadeMs: props.fadeMs,
    alwaysExpanded,
});

const dockStyle = computed(() =>
    transitionWidth.value != null ? { width: transitionWidth.value } : undefined
);

onMounted(() => {
    if (props.alwaysExpanded || !props.startCollapsed) {
        expand();
    }
});

defineExpose({ expanded, isPinned, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-wrap': wrap, 'no-transition': suppressTransition },
            position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :style="dockStyle"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @transitionend="onTransitionEnd"
    >
        <div class="dock-layers" :class="{ 'dock-transitioning': isTransitioning }">
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
    </div>
</template>

<style scoped>
.glass-dock {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-dock);
    white-space: nowrap;
    overflow: hidden;
    padding: 0.375rem 0.5rem;
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-subtle);
    -webkit-backdrop-filter: var(--glass-blur-subtle);
    border: 1.5px solid hsl(var(--foreground) / 0.1);
    box-shadow: var(--shadow-dock);
    transition:
        width var(--duration-normal) var(--ease-dock),
        padding var(--duration-normal) var(--ease-dock),
        box-shadow var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--ease-dock),
        background var(--duration-normal) var(--ease-standard),
        border-color var(--duration-normal) var(--ease-standard);
}

/* ── Collapsed: compact pill (round when icon-only) ── */
.glass-dock.collapsed {
    cursor: pointer;
    padding: 0.375rem;
    justify-content: center;
    background: var(--glass-bg-subtle);
    border-color: hsl(var(--foreground) / 0.3);
    box-shadow: var(--shadow-dock-collapsed);
}

/* When collapsed content is just an icon (no text), force square = circle.
   The dock-layer height is 2.5rem; with 0.375rem padding each side that's
   the intrinsic height. We match width to height via the same constraint. */
.glass-dock.collapsed .dock-layer--summary {
    min-width: 2.5rem;
    justify-content: center;
}

.glass-dock.collapsed:hover {
    background: var(--glass-bg-subtle);
    border-color: hsl(var(--foreground) / 0.4);
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
    transition: opacity var(--duration-instant) var(--ease-standard);
}

.dock-layers.dock-transitioning {
    opacity: 0;
    pointer-events: none;
}

.dock-layer {
    display: flex;
    align-items: center;
    white-space: nowrap;
    grid-area: 1 / 1;
    gap: 0.375rem;
    height: 2.5rem;
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

.glass-dock.no-transition {
    transition: none !important;
}

.glass-dock.always-expanded {
    cursor: default;
    overflow: visible;
}

/* ── Wrap variant: multi-line responsive dock ──
   Mobile: content wraps, dock grows both axes, rounded-rect.
   Desktop (sm+): single-row pill, same as default. */
.glass-dock.dock-wrap {
    white-space: normal;
    border-radius: var(--radius-2xl);
    max-width: calc(100vw - 1rem);
    padding: 0.375rem 0.625rem;
}

.glass-dock.dock-wrap .dock-layer--full {
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
    min-height: 2rem;
    gap: 0.25rem 0.375rem;
}

.glass-dock.dock-wrap .dock-layer--summary {
    height: auto;
    min-height: 2rem;
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
        padding: 0.375rem 0.75rem;
    }

    .glass-dock.dock-wrap .dock-layer--full {
        flex-wrap: nowrap;
        height: 2.5rem;
        gap: 0.25rem;
    }

    .glass-dock.dock-wrap .dock-layer--summary {
        height: 2.5rem;
    }

    .glass-dock.dock-wrap :deep(.dock-separator) {
        display: block;
    }
}
</style>
