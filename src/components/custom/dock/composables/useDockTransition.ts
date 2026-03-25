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
 * Returns `visualExpanded` (drives layer visibility class bindings) and
 * `isTransitioning` (drives a content fade class). The visual layer swap
 * is deferred until after the fade-out completes, so layout position jumps
 * between layers are never visible.
 *
 * Sequence: fade out → swap layer → animate width → fade in.
 */
export function useDockTransition(options: UseDockTransitionOptions) {
    const { expanded, rootEl, fadeMs = 60, alwaysExpanded } = options;

    const visualExpanded = ref(expanded.value);
    const isTransitioning = ref(false);

    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

    function clearFadeTimer() {
        if (fadeTimer) {
            clearTimeout(fadeTimer);
            fadeTimer = null;
        }
    }

    let transitionId = 0;

    watch(expanded, () => {
        // Skip width-pinning transition when always expanded — no layer swap needed
        if (alwaysExpanded?.value) {
            visualExpanded.value = expanded.value;
            return;
        }

        const el = rootEl.value;
        if (!el) return;

        clearFadeTimer();
        const id = ++transitionId;

        // Pin width so the layer swap can't cause a resize
        const from = el.getBoundingClientRect().width;
        el.style.width = `${from}px`;

        // Phase 1: fade out (visualExpanded still shows OLD layer)
        isTransitioning.value = true;

        // Phase 2: after fade, swap visual layer and animate width
        fadeTimer = setTimeout(() => {
            fadeTimer = null;
            if (id !== transitionId) return; // stale

            // Swap layers while content is invisible
            visualExpanded.value = expanded.value;

            nextTick(() => {
                if (id !== transitionId) return; // stale

                // Measure target width with new layer in flow
                el.style.transition = "none";
                el.style.width = "";
                const to = el.getBoundingClientRect().width;

                // Set back to old width, restore transitions, animate width
                el.style.width = `${from}px`;
                el.offsetWidth; // force recalc
                el.style.transition = "";
                requestAnimationFrame(() => {
                    if (id !== transitionId) return; // stale
                    el.style.width = `${to}px`;
                });
            });
        }, fadeMs);
    });

    /** Call from @transitionend on the root element. */
    function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== rootEl.value) return;
        if (e.propertyName === "width") {
            rootEl.value!.style.width = "";
            isTransitioning.value = false;
        }
    }

    onUnmounted(clearFadeTimer);

    return {
        visualExpanded,
        isTransitioning,
        onTransitionEnd,
    };
}
