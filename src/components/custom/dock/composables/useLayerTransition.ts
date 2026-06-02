import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";
import { startViewTransition } from "../../../../composables/motion/useViewTransition";

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
 * Coordinates the crossfade + size animation between grid-stacked dock layer
 * panes. Reusable at any nesting level (the inner `<DockLayerGroup>` pair AND
 * the outer GlassDock collapsed↔expanded pair).
 *
 * AQ.W6 §Design 7 — the swap FORKS on View-Transitions support:
 *
 * - **Native path** (`document.startViewTransition` present): the layer swap is
 *   wrapped in `startViewTransition(() => mutate())`. The browser snapshots the
 *   container + panes (tagged `view-transition-name` in `dock.css`) and morphs
 *   the size + crossfades the pane content with ZERO `getBoundingClientRect`
 *   reads. No pin/measure/re-pin dance, no inline size, no rAF.
 *
 * - **Fallback path** (no `startViewTransition`): the existing axis-aware FLIP
 *   runs verbatim, KEPT as the sole feature-detected fallback (no alias — one
 *   path or the other runs per swap, never both):
 *   1. Capture current container size
 *   2. Pin container to that size
 *   3. Swap classes: old layer → leaving, new layer → active
 *   4. nextTick: measure new natural size, re-pin to old
 *   5. Animate to new size via CSS transition
 *   6. On transitionend(size), clear inline size
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer, axis } = options;

    // Forked once at composable construction — `startViewTransition` support is
    // a stable engine capability, not a per-swap condition.
    const NATIVE_VT =
        typeof document !== "undefined" && "startViewTransition" in document;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );
    const getSize = (el: HTMLElement) => el.getBoundingClientRect()[dim.value];

    const currentLayer = ref(activeLayer.value);
    const leavingLayer = ref<string | null>(null);
    let transitionId = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | null = null;

    function parseTimeMs(value: string): number {
        const trimmed = value.trim();
        if (!trimmed) return 0;
        if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
        if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
        return Number.parseFloat(trimmed) || 0;
    }

    function cleanupDelayMs(el: HTMLElement): number {
        const style = getComputedStyle(el);
        const properties = style.transitionProperty.split(",").map((part) => part.trim());
        const durations = style.transitionDuration.split(",").map(parseTimeMs);
        const delays = style.transitionDelay.split(",").map(parseTimeMs);
        const candidates = durations.map((duration, index) => {
            const property = properties[index] ?? properties[0] ?? "all";
            if (property !== "all" && property !== dim.value) return 0;
            return duration + (delays[index] ?? delays[0] ?? 0);
        });
        return Math.max(0, ...candidates) + 50;
    }

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

        // ── Native path (AQ.W6) — the browser owns the size morph + crossfade.
        // Mutate the layer state synchronously inside `startViewTransition` (the
        // callback snapshots old → new); ZERO getBoundingClientRect. The leaving
        // pane is held painted for the duration of the snapshot transition, then
        // cleared on `finished`. `view-transition-name` on the container + panes
        // (set in `dock.css`) drives the morph.
        if (NATIVE_VT) {
            clearCleanup();
            const id = ++transitionId;
            const { finished } = startViewTransition(() => {
                leavingLayer.value = oldLayer;
                currentLayer.value = newLayer;
            });
            finished.finally(() => {
                if (id !== transitionId) return;
                leavingLayer.value = null;
            });
            return;
        }

        // ── Fallback path — the kept axis-aware FLIP (verbatim).
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

            if (Math.abs(toSize - fromSize) < 0.5) {
                clearDim(el);
                leavingLayer.value = null;
                return;
            }

            // Safety: clear inline size after the computed transition window in
            // case transitionend doesn't fire.
            cleanupTimer = setTimeout(() => {
                if (id !== transitionId) return;
                clearDim(el);
                leavingLayer.value = null;
            }, cleanupDelayMs(el));
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
