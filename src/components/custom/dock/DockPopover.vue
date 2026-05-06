<script setup lang="ts">
/**
 * Compact popover that expands from a dock button.
 * Stays open while mouse is inside. Click to toggle.
 * Auto-flips direction and adjusts horizontal position to avoid clipping.
 */
import { ref, inject, watch, onUnmounted, nextTick, useTemplateRef, type CSSProperties } from "vue";
import type { Ref } from "vue";
import DockIconButton from "./DockIconButton.vue";
import { useDockContext } from "./composables/dockContext";
import {
    DOCK_KEEP_OPEN_SINK_KEY,
    type DockKeepOpenSink,
} from "./_internal/dockKeepOpenSink";

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
const panelStyle = ref<CSSProperties>({});
const resolvedDir = ref(props.direction);
let collapseTimer: ReturnType<typeof setTimeout> | null = null;
let installClickAwayFrame: number | null = null;

const self = { expanded, scheduleCollapse: (d: number) => scheduleCollapse(d) };
const dock = useDockContext();
const unregisterPopover = dock?.registerPopover(self);
onUnmounted(() => {
    clearTimer();
    removeClickAwayListener();
    unregisterPopover?.();
    // Drain any held keep-open token so the parent counter unwinds.
    if (keepOpenToken !== null && dockSink) {
        dockSink.release(keepOpenToken);
        keepOpenToken = null;
    }
});

// Hold parent GlassDock open while this popover is expanded. Consumes
// the same `dockKeepOpenSink` provided by `<GlassDock>` that
// `<Slider :keep-dock-open>` uses — single authority, single inject key.
const dockSink = inject<DockKeepOpenSink | null>(DOCK_KEEP_OPEN_SINK_KEY, null);
let keepOpenToken: symbol | null = null;

// Guard: inject parent dock's expanded state
const dockExpanded = inject<Ref<boolean>>("dockExpanded", ref(true));

watch(expanded, (isExpanded) => {
    if (!dockSink) return;
    if (isExpanded && keepOpenToken === null) {
        keepOpenToken = dockSink.acquire();
    } else if (!isExpanded && keepOpenToken !== null) {
        dockSink.release(keepOpenToken);
        keepOpenToken = null;
    }
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
    dock?.closeOtherPopovers(self);
    expanded.value = true;
}

function scheduleCollapse(delay: number) {
    clearTimer();
    collapseTimer = setTimeout(() => { expanded.value = false; }, delay);
}

function toggle() {
    expanded.value ? scheduleCollapse(0) : onEnter();
}

// --- Position the panel after it mounts to avoid clipping ---
const popoverEl = useTemplateRef<HTMLElement>("popoverEl");
const panelEl = useTemplateRef<HTMLElement>("panelEl");

function readCssLen(target: HTMLElement, prop: string, fallback: number): number {
    if (typeof document === "undefined") return fallback;
    const raw = getComputedStyle(target).getPropertyValue(prop).trim()
        || getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
    return cssLengthToPx(raw, target, fallback);
}

function cssLengthToPx(value: string, target: HTMLElement, fallback: number): number {
    const raw = value.trim();
    if (!raw) return fallback;
    const numeric = Number(raw);
    if (Number.isFinite(numeric)) return numeric;

    const n = parseFloat(raw);
    if (Number.isFinite(n) && raw.endsWith("px")) return n;
    if (raw.endsWith("rem")) {
        const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return Number.isFinite(n) && Number.isFinite(rootSize) ? n * rootSize : fallback;
    }
    if (raw.endsWith("em")) {
        const fontSize = parseFloat(getComputedStyle(target).fontSize);
        return Number.isFinite(n) && Number.isFinite(fontSize) ? n * fontSize : fallback;
    }
    if (raw.endsWith("vw")) return Number.isFinite(n) ? (n / 100) * window.innerWidth : fallback;
    if (raw.endsWith("vh")) return Number.isFinite(n) ? (n / 100) * window.innerHeight : fallback;

    const probe = document.createElement("div");
    probe.style.cssText = [
        "position:absolute",
        "visibility:hidden",
        "pointer-events:none",
        "contain:strict",
        `width:${raw}`,
    ].join(";");
    target.appendChild(probe);
    const px = probe.getBoundingClientRect().width;
    probe.remove();
    return Number.isFinite(px) && px > 0 ? px : fallback;
}

function positionPanel() {
    const trigger = popoverEl.value;
    const panel = panelEl.value;
    if (!trigger || !panel) return;

    const OFFSET = readCssLen(trigger, "--dock-popover-offset", 6);
    const VIEWPORT_PAD = readCssLen(trigger, "--dock-popover-viewport-pad", 8);

    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Decide direction: prefer props.direction, flip if clipping
    let dir = props.direction;
    if (dir === "up" && triggerRect.top - panelRect.height - OFFSET < VIEWPORT_PAD) {
        dir = "down";
    } else if (dir === "down" && triggerRect.bottom + panelRect.height + OFFSET > vh - VIEWPORT_PAD) {
        dir = "up";
    }
    resolvedDir.value = dir;

    const style: CSSProperties = {
        position: "absolute",
    };

    // Vertical
    if (dir === "up") {
        style.bottom = `calc(100% + ${OFFSET}px)`;
        style.top = "auto";
    } else {
        style.top = `calc(100% + ${OFFSET}px)`;
        style.bottom = "auto";
    }

    // Horizontal
    if (props.align === "end") {
        style.right = "0";
        style.left = "auto";
        style.transform = "none";
        // Check right-edge clipping (panel extends left from trigger's right edge)
        const panelLeft = triggerRect.right - panelRect.width;
        if (panelLeft < VIEWPORT_PAD) {
            // Shift right so panel starts at viewport edge
            style.right = "auto";
            style.left = `${VIEWPORT_PAD - triggerRect.left}px`;
        }
    } else {
        // center alignment
        style.left = "50%";
        style.right = "auto";
        style.transform = "translateX(-50%)";

        // Check horizontal clipping
        const panelCenterLeft = triggerRect.left + triggerRect.width / 2 - panelRect.width / 2;
        const panelCenterRight = panelCenterLeft + panelRect.width;

        if (panelCenterLeft < VIEWPORT_PAD) {
            const shift = VIEWPORT_PAD - panelCenterLeft;
            style.transform = `translateX(calc(-50% + ${shift}px))`;
        } else if (panelCenterRight > vw - VIEWPORT_PAD) {
            const shift = panelCenterRight - (vw - VIEWPORT_PAD);
            style.transform = `translateX(calc(-50% - ${shift}px))`;
        }
    }

    panelStyle.value = style;
}

watch(expanded, async (isExpanded) => {
    if (isExpanded) {
        installClickAway();
        // Position after the panel mounts
        await nextTick();
        positionPanel();
    } else {
        removeClickAwayListener();
    }
});

// --- Click-away: collapse when clicking outside .dock-popover ---
let removeClickAwayFn: (() => void) | null = null;

function onClickAway(e: PointerEvent) {
    const root = popoverEl.value;
    if (!root || root.contains(e.target as Node)) return;
    expanded.value = false;
}

function installClickAway() {
    installClickAwayFrame = requestAnimationFrame(() => {
        installClickAwayFrame = null;
        document.addEventListener("pointerdown", onClickAway, true);
        removeClickAwayFn = () => {
            document.removeEventListener("pointerdown", onClickAway, true);
            removeClickAwayFn = null;
        };
    });
}

function removeClickAwayListener() {
    if (installClickAwayFrame !== null) {
        cancelAnimationFrame(installClickAwayFrame);
        installClickAwayFrame = null;
    }
    removeClickAwayFn?.();
}

defineExpose({ expanded, expand: onEnter, collapse: () => { expanded.value = false; } });
</script>

<template>
    <div
        ref="popoverEl"
        class="dock-popover"
        :class="{ expanded, ['dir-' + resolvedDir]: true, ['align-' + align]: true }"
        @mouseenter="!clickOnly && onEnter()"
        @mouseleave="!clickOnly && scheduleCollapse(collapseDelay)"
    >
        <DockIconButton class="popover-trigger" @click.stop="toggle">
            <slot name="trigger" />
        </DockIconButton>
        <Transition :name="'pop-' + resolvedDir">
            <div
                v-if="expanded"
                ref="panelEl"
                class="popover-panel"
                :data-glass-dock-portal="dock?.id ? '' : undefined"
                :data-glass-dock-owner="dock?.id"
                :style="panelStyle"
                @click.stop @mousedown.stop @pointerdown.stop>
                <slot />
            </div>
        </Transition>
    </div>
</template>
