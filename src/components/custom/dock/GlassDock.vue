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
    }>(),
    {
        collapseDelay: 2000,
        startCollapsed: true,
        fitContent: false,
        position: "inline",
        fadeMs: 60,
        alwaysExpanded: false,
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

const { visualExpanded, isTransitioning, onTransitionEnd } = useDockTransition({
    expanded,
    rootEl: dockEl,
    fadeMs: props.fadeMs,
    alwaysExpanded,
});

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
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded },
            position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
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
    padding: 0.375rem 0.5rem;
    border-radius: var(--radius-pill);
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1.5px solid hsl(var(--foreground) / 0.25);
    box-shadow: var(--shadow-dock);
    white-space: nowrap;
    overflow: hidden;
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
    background: var(--glass-bg);
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
    background: var(--glass-bg);
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
    transition: opacity 60ms var(--ease-standard);
}

.dock-layers.dock-transitioning {
    opacity: 0;
}

.dock-layer {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    height: 2.5rem;
    white-space: nowrap;
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

.glass-dock.always-expanded {
    cursor: default;
    overflow: visible;
}
</style>
