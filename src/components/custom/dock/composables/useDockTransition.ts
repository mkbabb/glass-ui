import { ref, computed, watch, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface UseDockTransitionOptions {
    /** The logical expanded state (from useDockState) */
    expanded: Ref<boolean>;
    /** The dock root element ref — reserved for future size measurements */
    rootEl: Ref<HTMLElement | null>;
    /** Legacy fade duration; retained for API compatibility. */
    fadeMs?: number;
    /** When true, skip all transition work and keep the dock expanded. */
    alwaysExpanded?: Ref<boolean>;
    /**
     * Animation axis. Retained for API compatibility; no width/height
     * animation is applied now that the dock uses natural sizing.
     */
    axis?: Ref<"horizontal" | "vertical">;
}

/**
 * Dock layer-swap coordinator.
 *
 * Previous versions faded the active layer to opacity 0, swapped after a
 * ~60ms delay, and fade-reset in a second rAF. The fade window left the
 * dock visually invisible (opacity:0) for those 60ms and, in some
 * compositing paths, made the layer's buttons hit-intercept-blocked —
 * users' clicks during a hover→click sequence either fell through or got
 * eaten outright.
 *
 * Swap is now synchronous: `visualExpanded` mirrors `expanded` on the
 * same tick. The refs `isTransitioning`, `transitionSize`, and
 * `suppressTransition` still exist (shape the public API expects) but
 * stay `false` / `null` — CSS no longer targets them.
 */
export function useDockTransition(options: UseDockTransitionOptions) {
    const { expanded, alwaysExpanded, axis } = options;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );

    const visualExpanded = ref(expanded.value);
    const isTransitioning = ref(false);
    const transitionSize = ref<string | null>(null);
    const suppressTransition = ref(false);

    watch(expanded, (value) => {
        if (alwaysExpanded?.value) {
            visualExpanded.value = value;
            return;
        }
        visualExpanded.value = value;
    });

    /** Kept for API compatibility — no-op now that the dock doesn't size-animate. */
    function onTransitionEnd(_e: TransitionEvent) {}

    onUnmounted(() => {});

    return {
        visualExpanded,
        isTransitioning,
        transitionSize,
        dim,
        suppressTransition,
        onTransitionEnd,
    };
}
