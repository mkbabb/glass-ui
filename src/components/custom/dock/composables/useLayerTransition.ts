import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface UseLayerTransitionOptions {
    /** The container element that owns the stacked layer panes. */
    containerEl: Ref<HTMLElement | null>;
    /** The currently active layer id */
    activeLayer: Ref<string>;
    /**
     * Animation axis. `"horizontal"` animates `width`; `"vertical"` animates
     * `height`. Defaults to horizontal when omitted.
     */
    axis?: Ref<"horizontal" | "vertical">;
}

export interface UseLayerTransitionReturn {
    /** Attach to @transitionend on the container */
    onTransitionEnd(e: TransitionEvent): void;
    /** The currently active layer id (post-swap) */
    currentLayer: Ref<string>;
    /** The layer id currently fading out, or null */
    leavingLayer: Ref<string | null>;
}

/**
 * Coordinates simultaneous crossfade + FLIP size animation for
 * grid-stacked layer containers. Reusable at any nesting level.
 *
 * Algorithm on activeLayer change:
 * 1. Capture current container size
 * 2. Pin container to that size
 * 3. Swap classes: old layer → leaving (absolute, fading out),
 *    new layer → active (relative, fading in)
 * 4. nextTick: measure new natural size, re-pin to old
 * 5. Animate to new size via CSS transition
 * 6. On transitionend(size), clear inline size
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer, axis } = options;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );
    const getSize = (el: HTMLElement) => el.getBoundingClientRect()[dim.value];

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

    function setDim(el: HTMLElement, value: string) {
        el.style.setProperty(dim.value, value);
    }

    function clearDim(el: HTMLElement) {
        el.style.removeProperty(dim.value);
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

        // 1. Capture current size
        const fromSize = getSize(el);

        // 2. Pin size (prevents snap during class swap)
        setDim(el, `${fromSize}px`);

        // 3. Swap: mark old as leaving, new as active
        leavingLayer.value = oldLayer;
        currentLayer.value = newLayer;

        // 4. Measure new natural size on next tick
        nextTick(() => {
            if (id !== transitionId) return;
            if (!el) return;

            // Temporarily unpin to measure
            el.style.transition = "none";
            clearDim(el);
            const toSize = getSize(el);

            // Re-pin to old size
            setDim(el, `${fromSize}px`);
            // Force reflow so the browser registers the old size
            void el.offsetWidth;
            // Restore CSS transitions
            el.style.transition = "";

            // 5. Animate to new size
            requestAnimationFrame(() => {
                if (id !== transitionId) return;
                setDim(el, `${toSize}px`);
            });

            // Safety: clear inline size after max duration in case transitionend
            // doesn't fire (e.g. size didn't actually change)
            cleanupTimer = setTimeout(() => {
                if (id !== transitionId) return;
                clearDim(el);
                leavingLayer.value = null;
            }, 400);
        });
    });

    function onTransitionEnd(e: TransitionEvent) {
        const el = containerEl.value;
        if (!el) return;
        if (e.target !== el) return;
        if (e.propertyName !== dim.value) return;

        clearCleanup();
        clearDim(el);
        leavingLayer.value = null;
    }

    onUnmounted(clearCleanup);

    return { onTransitionEnd, currentLayer, leavingLayer };
}
