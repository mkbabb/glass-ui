import { ref, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface UseLayerTransitionOptions {
    /** The container element (must have `.dock-layer-grid` class) */
    containerEl: Ref<HTMLElement | null>;
    /** The currently active layer id */
    activeLayer: Ref<string>;
}

export interface UseLayerTransitionReturn {
    /** Returns class array + inert for a given layer id */
    layerProps(id: string): { class: string[]; inert: true | undefined };
    /** Attach to @transitionend on the container */
    onTransitionEnd(e: TransitionEvent): void;
}

/**
 * Coordinates simultaneous crossfade + FLIP width animation for
 * grid-stacked layer containers. Reusable at any nesting level.
 *
 * Algorithm on activeLayer change:
 * 1. Capture current container width
 * 2. Pin container to that width
 * 3. Swap classes: old layer → leaving (absolute, fading out),
 *    new layer → active (relative, fading in)
 * 4. nextTick: measure new natural width, re-pin to old
 * 5. Animate to new width via CSS transition
 * 6. On transitionend(width), clear inline width
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer } = options;

    const currentLayer = ref(activeLayer.value);
    const leavingLayer = ref<string | null>(null);
    let transitionId = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | null = null;

    function clearCleanup() {
        if (cleanupTimer) {
            clearTimeout(cleanupTimer);
            cleanupTimer = null;
        }
    }

    watch(activeLayer, (newLayer, oldLayer) => {
        if (newLayer === oldLayer) return;

        const el = containerEl.value;
        if (!el) {
            currentLayer.value = newLayer;
            leavingLayer.value = null;
            return;
        }

        clearCleanup();
        const id = ++transitionId;

        // 1. Capture current width
        const fromWidth = el.getBoundingClientRect().width;

        // 2. Pin width (prevents snap during class swap)
        el.style.width = `${fromWidth}px`;

        // 3. Swap: mark old as leaving, new as active
        leavingLayer.value = oldLayer;
        currentLayer.value = newLayer;

        // 4. Measure new natural width on next tick
        nextTick(() => {
            if (id !== transitionId) return;
            if (!el) return;

            // Temporarily unpin to measure
            el.style.transition = "none";
            el.style.width = "";
            const toWidth = el.getBoundingClientRect().width;

            // Re-pin to old width
            el.style.width = `${fromWidth}px`;
            // Force reflow so the browser registers the old width
            void el.offsetWidth;
            // Restore CSS transitions
            el.style.transition = "";

            // 5. Animate to new width
            requestAnimationFrame(() => {
                if (id !== transitionId) return;
                el.style.width = `${toWidth}px`;
            });

            // Safety: clear inline width after max duration in case transitionend
            // doesn't fire (e.g. width didn't actually change)
            cleanupTimer = setTimeout(() => {
                if (id !== transitionId) return;
                el.style.width = "";
                leavingLayer.value = null;
            }, 400);
        });
    });

    function onTransitionEnd(e: TransitionEvent) {
        const el = containerEl.value;
        if (!el) return;
        if (e.target !== el) return;
        if (e.propertyName !== "width") return;

        clearCleanup();
        el.style.width = "";
        leavingLayer.value = null;
    }

    function layerProps(id: string): {
        class: string[];
        inert: true | undefined;
    } {
        const isActive = currentLayer.value === id;
        const isLeaving = leavingLayer.value === id;

        const classes = ["dock-layer-item"];
        if (isActive) classes.push("dock-layer-active");
        if (isLeaving) classes.push("dock-layer-leaving");

        return {
            class: classes,
            inert: isActive ? undefined : true,
        };
    }

    onUnmounted(clearCleanup);

    return { layerProps, onTransitionEnd };
}
