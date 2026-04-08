import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface UseDockTransitionOptions {
    /** The logical expanded state (from useDockState) */
    expanded: Ref<boolean>;
    /** The dock root element ref — size is animated on this element */
    rootEl: Ref<HTMLElement | null>;
    /** Fade duration in ms before the layer swap (default: 60) */
    fadeMs?: number;
    /** When true, skip all size-pinning transitions (dock is always open) */
    alwaysExpanded?: Ref<boolean>;
    /**
     * Animation axis. `"horizontal"` animates `width`; `"vertical"` animates
     * `height`. Defaults to horizontal when omitted.
     */
    axis?: Ref<"horizontal" | "vertical">;
}

/**
 * Orchestrates a deferred layer-swap transition for dock components.
 *
 * Both expand and collapse follow the same sequence:
 *   fade out → swap layer → animate size → fade in
 *
 * Size animation is driven through a reactive ref (`transitionSize`)
 * so it cooperates with Vue's reactive :style bindings. The axis option
 * selects whether `width` or `height` is animated.
 */
export function useDockTransition(options: UseDockTransitionOptions) {
    const cssFadeMs = typeof document !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--duration-dock-fade")) || 60
        : 60;
    const { expanded, rootEl, fadeMs = cssFadeMs, alwaysExpanded, axis } = options;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );
    const getSize = (el: HTMLElement) => el.getBoundingClientRect()[dim.value];

    const visualExpanded = ref(expanded.value);
    const isTransitioning = ref(false);

    /**
     * Reactive size applied during transitions via :style.
     * `null` means "no override — use natural sizing".
     */
    const transitionSize = ref<string | null>(null);

    /**
     * When true, CSS transitions on the dock are suppressed.
     * Used during the measure phase so size changes don't animate.
     */
    const suppressTransition = ref(false);

    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeInTimer: ReturnType<typeof setTimeout> | null = null;

    function clearTimers() {
        if (fadeTimer) {
            clearTimeout(fadeTimer);
            fadeTimer = null;
        }
        if (fadeInTimer) {
            clearTimeout(fadeInTimer);
            fadeInTimer = null;
        }
    }

    let transitionId = 0;

    watch(expanded, () => {
        if (alwaysExpanded?.value) {
            visualExpanded.value = expanded.value;
            return;
        }

        const el = rootEl.value;
        if (!el) return;

        clearTimers();
        const id = ++transitionId;

        // Capture current size before any changes
        const from = getSize(el);

        // Pin size so the layer swap can't cause a resize jump
        suppressTransition.value = true;
        transitionSize.value = `${from}px`;

        // Phase 1: fade out (visualExpanded still shows OLD layer)
        isTransitioning.value = true;

        // Phase 2: after fade completes, swap layer and animate size
        fadeTimer = setTimeout(() => {
            fadeTimer = null;
            if (id !== transitionId) return;

            // Swap layers while content is invisible
            visualExpanded.value = expanded.value;

            // Wait for Vue to flush the layer swap, then measure target size
            nextTick(() => {
                if (id !== transitionId) return;

                // Release size to measure natural target (still no transitions)
                transitionSize.value = null;

                nextTick(() => {
                    if (id !== transitionId) return;

                    const to = getSize(el);

                    // If from ≈ to, no animation needed
                    if (Math.abs(from - to) < 1) {
                        suppressTransition.value = false;
                        transitionSize.value = null;
                        isTransitioning.value = false;
                        return;
                    }

                    // Pin back to old size (still suppressed)
                    transitionSize.value = `${from}px`;

                    // Let Vue flush the pinned size, then enable transitions and animate
                    nextTick(() => {
                        if (id !== transitionId) return;

                        // Force the browser to commit the from-size
                        void el.offsetWidth;

                        // Re-enable CSS transitions and set target size
                        suppressTransition.value = false;

                        // rAF ensures the browser has painted the from-size
                        // before we set the to-size, guaranteeing the transition fires
                        requestAnimationFrame(() => {
                            if (id !== transitionId) return;
                            transitionSize.value = `${to}px`;

                            // Begin fade-in during the size animation's deceleration
                            // phase so items appear while the dock is still settling.
                            const sizeMs = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 300;
                            fadeInTimer = setTimeout(() => {
                                if (id !== transitionId) return;
                                isTransitioning.value = false;
                            }, sizeMs * 0.55);
                        });
                    });
                });
            });
        }, fadeMs);
    });

    /** Call from @transitionend on the root element. */
    function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== rootEl.value) return;
        if (e.propertyName === dim.value) {
            transitionSize.value = null;
            isTransitioning.value = false;
        }
    }

    onUnmounted(clearTimers);

    return {
        visualExpanded,
        isTransitioning,
        transitionSize,
        dim,
        suppressTransition,
        onTransitionEnd,
    };
}
