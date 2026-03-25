<script setup lang="ts">
/**
 * Compact popover that expands from a dock button.
 * Stays open while mouse is inside. Click to toggle.
 */
import { ref, inject, watch, onUnmounted, nextTick, useTemplateRef } from "vue";
import type { Ref } from "vue";

// Track all popover instances so opening one collapses the others
const allPopovers = new Set<{ expanded: { value: boolean }, scheduleCollapse: (d: number) => void }>();
let popoverZCounter = 0;

const props = withDefaults(
    defineProps<{
        direction?: "up" | "down";
        collapseDelay?: number;
        align?: "center" | "end";
        clickOnly?: boolean;
    }>(),
    { direction: "down", collapseDelay: 1200, align: "center", clickOnly: false },
);

const expanded = ref(false);
const zOffset = ref(0);
let collapseTimer: ReturnType<typeof setTimeout> | null = null;

const self = { expanded, scheduleCollapse: (d: number) => scheduleCollapse(d) };
allPopovers.add(self);
onUnmounted(() => { clearTimer(); removeClickAwayListener(); allPopovers.delete(self); });

// Hold parent GlassDock open while this popover is expanded
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);

// Guard: inject parent dock's expanded state
const dockExpanded = inject<Ref<boolean>>("dockExpanded", ref(true));

watch(expanded, (isExpanded) => {
    if (isExpanded) dockKeepOpen?.();
    else dockRelease?.();
});

// Force-close popover when parent dock collapses
watch(dockExpanded, (isExpanded) => {
    if (!isExpanded && expanded.value) {
        expanded.value = false;
    }
});

function clearTimer() {
    if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }
}

function onEnter() {
    // Guard: don't open if parent dock is collapsing
    if (!dockExpanded.value) return;
    clearTimer();
    // Collapse all other popovers
    for (const p of allPopovers) {
        if (p !== self && p.expanded.value) p.scheduleCollapse(0);
    }
    zOffset.value = ++popoverZCounter;
    expanded.value = true;
}

function scheduleCollapse(delay: number) {
    clearTimer();
    collapseTimer = setTimeout(() => { expanded.value = false; }, delay);
}

function toggle() {
    expanded.value ? scheduleCollapse(0) : onEnter();
}

// --- Click-away: collapse when clicking outside .dock-popover ---
const popoverEl = useTemplateRef<HTMLElement>("popoverEl");
let removeClickAwayFn: (() => void) | null = null;

function onClickAway(e: PointerEvent) {
    const root = popoverEl.value;
    if (!root || root.contains(e.target as Node)) return;
    expanded.value = false;
}

function installClickAway() {
    nextTick(() => {
        document.addEventListener("pointerdown", onClickAway, true);
        removeClickAwayFn = () => {
            document.removeEventListener("pointerdown", onClickAway, true);
            removeClickAwayFn = null;
        };
    });
}

function removeClickAwayListener() {
    removeClickAwayFn?.();
}

watch(expanded, (isExpanded) => {
    if (isExpanded) {
        installClickAway();
    } else {
        removeClickAwayListener();
    }
});

defineExpose({ expanded, expand: onEnter, collapse: () => { expanded.value = false; } });
</script>

<template>
    <div
        ref="popoverEl"
        class="dock-popover"
        :class="{ expanded, ['dir-' + direction]: true, ['align-' + align]: true }"
        @mouseenter="!clickOnly && onEnter()"
        @mouseleave="!clickOnly && scheduleCollapse(collapseDelay)"
    >
        <button class="popover-trigger dock-icon-btn" @click.stop="toggle">
            <slot name="trigger" />
        </button>
        <Transition name="pop">
            <div v-if="expanded" class="popover-panel"
                :style="{ zIndex: 50 + (zOffset % 50) }"
                @click.stop @mousedown.stop @pointerdown.stop>
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.dock-popover {
    position: relative;
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.popover-trigger {
    z-index: 2;
    position: relative;
}

.popover-panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.125rem;
    padding: 0.25rem;
    z-index: var(--z-modal);
    pointer-events: auto;

    background: hsl(var(--card) / 0.75);
    backdrop-filter: blur(12px) saturate(1.3);
    -webkit-backdrop-filter: blur(12px) saturate(1.3);
    border: 1px solid hsl(var(--border) / 0.6);
    border-radius: var(--radius-lg, 1rem);
    box-shadow: var(--glass-shadow-elevated);
}

.dir-up.align-center .popover-panel {
    bottom: calc(100% + var(--popover-offset));
    left: 50%;
    transform: translateX(-50%);
}
.dir-down.align-center .popover-panel {
    top: calc(100% + var(--popover-offset));
    left: 50%;
    transform: translateX(-50%);
}
.dir-up.align-end .popover-panel {
    bottom: calc(100% + var(--popover-offset));
    right: 0;
}
.dir-down.align-end .popover-panel {
    top: calc(100% + var(--popover-offset));
    right: 0;
}

/* ── Spring transitions ── */
.pop-enter-active {
    transition: opacity var(--duration-fast) var(--ease-standard), transform var(--duration-slow) var(--ease-spring);
}
.pop-leave-active {
    transition: opacity var(--duration-fast) var(--ease-decelerate), transform var(--duration-fast) var(--ease-decelerate);
}
.dir-up.align-center .pop-enter-from {
    opacity: 0;
    transform: translateX(-50%) scale(0.5) translateY(var(--animation-slide-lg));
}
.dir-up.align-center .pop-leave-to {
    opacity: 0;
    transform: translateX(-50%) scale(0.9) translateY(var(--animation-slide-sm));
}
.dir-down.align-center .pop-enter-from {
    opacity: 0;
    transform: translateX(-50%) scale(0.5) translateY(calc(-1 * var(--animation-slide-lg)));
}
.dir-down.align-center .pop-leave-to {
    opacity: 0;
    transform: translateX(-50%) scale(0.9) translateY(calc(-1 * var(--animation-slide-sm)));
}
.dir-up.align-end .pop-enter-from {
    opacity: 0;
    transform: scale(0.5) translateY(var(--animation-slide-lg));
}
.dir-up.align-end .pop-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(var(--animation-slide-sm));
}
.dir-down.align-end .pop-enter-from {
    opacity: 0;
    transform: scale(0.5) translateY(calc(-1 * var(--animation-slide-lg)));
}
.dir-down.align-end .pop-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(calc(-1 * var(--animation-slide-sm)));
}
</style>
