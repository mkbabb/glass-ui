import { ref, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface UseDockTransitionOptions {
    /** The logical expanded state (from useDockState) */
    expanded: Ref<boolean>;
    /** The dock root element ref — width is animated on this element */
    rootEl: Ref<HTMLElement | null>;
    /** Fade duration in ms before the layer swap (default: 60) */
    fadeMs?: number;
    /** When true, skip all width-pinning transitions (dock is always open) */
    alwaysExpanded?: Ref<boolean>;
}

/**
 * Orchestrates a deferred layer-swap transition for dock components.
 *
 * Both expand and collapse follow the same sequence:
 *   fade out → swap layer → animate width → fade in
 *
 * Width animation is driven through a reactive ref (`transitionWidth`)
 * so it cooperates with Vue's reactive :style bindings.
 */
export function useDockTransition(options: UseDockTransitionOptions) {
    const { expanded, rootEl, fadeMs = 60, alwaysExpanded } = options;

    const visualExpanded = ref(expanded.value);
    const isTransitioning = ref(false);

    /**
     * Reactive width applied during transitions via :style.
     * `null` means "no override — use natural sizing".
     */
    const transitionWidth = ref<string | null>(null);

    /**
     * When true, CSS transitions on the dock are suppressed.
     * Used during the measure phase so width changes don't animate.
     */
    const suppressTransition = ref(false);

    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

    function clearFadeTimer() {
        if (fadeTimer) {
            clearTimeout(fadeTimer);
            fadeTimer = null;
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

        clearFadeTimer();
        const id = ++transitionId;

        // Capture current width before any changes
        const from = el.getBoundingClientRect().width;

        // Pin width so the layer swap can't cause a resize jump
        suppressTransition.value = true;
        transitionWidth.value = `${from}px`;

        // Phase 1: fade out (visualExpanded still shows OLD layer)
        isTransitioning.value = true;

        // Phase 2: after fade completes, swap layer and animate width
        fadeTimer = setTimeout(() => {
            fadeTimer = null;
            if (id !== transitionId) return;

            // Swap layers while content is invisible
            visualExpanded.value = expanded.value;

            // Wait for Vue to flush the layer swap, then measure target width
            nextTick(() => {
                if (id !== transitionId) return;

                // Release width to measure natural target (still no transitions)
                transitionWidth.value = null;

                nextTick(() => {
                    if (id !== transitionId) return;

                    const to = el.getBoundingClientRect().width;

                    // If from ≈ to, no animation needed
                    if (Math.abs(from - to) < 1) {
                        suppressTransition.value = false;
                        transitionWidth.value = null;
                        isTransitioning.value = false;
                        return;
                    }

                    // Pin back to old width (still suppressed)
                    transitionWidth.value = `${from}px`;

                    // Let Vue flush the pinned width, then enable transitions and animate
                    nextTick(() => {
                        if (id !== transitionId) return;

                        // Force the browser to commit the from-width
                        el.offsetWidth;

                        // Re-enable CSS transitions and set target width
                        suppressTransition.value = false;

                        // rAF ensures the browser has painted the from-width
                        // before we set the to-width, guaranteeing the transition fires
                        requestAnimationFrame(() => {
                            if (id !== transitionId) return;
                            transitionWidth.value = `${to}px`;
                        });
                    });
                });
            });
        }, fadeMs);
    });

    /** Call from @transitionend on the root element. */
    function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== rootEl.value) return;
        if (e.propertyName === "width") {
            transitionWidth.value = null;
            isTransitioning.value = false;
        }
    }

    onUnmounted(clearFadeTimer);

    return {
        visualExpanded,
        isTransitioning,
        transitionWidth,
        suppressTransition,
        onTransitionEnd,
    };
}
