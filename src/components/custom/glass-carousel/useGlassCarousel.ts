import { ref, watch, nextTick, onUnmounted, onMounted, type Ref } from "vue";

export interface UseGlassCarouselOptions {
    /** Scroll axis */
    orientation: Ref<"horizontal" | "vertical">;
    /** The logical expanded state */
    expanded: Ref<boolean>;
    /** The carousel root element ref — dimensions are animated on this element */
    rootEl: Ref<HTMLElement | null>;
    /** The scroll viewport element ref (reka-ui ScrollAreaViewport) */
    viewportEl: Ref<HTMLElement | null>;
    /** Fade duration in ms before the mode swap (default: 60) */
    fadeMs?: number;
}

/**
 * Composable for GlassCarousel — manages scroll overflow detection,
 * expand/collapse transitions (following GlassDock's FLIP pattern),
 * and item scroll-to behavior.
 */
export function useGlassCarousel(options: UseGlassCarouselOptions) {
    const { orientation, expanded, rootEl, viewportEl, fadeMs = 60 } = options;

    // ── Overflow detection ──
    const canScrollStart = ref(false);
    const canScrollEnd = ref(false);

    function updateOverflow() {
        const vp = viewportEl.value;
        if (!vp) {
            canScrollStart.value = false;
            canScrollEnd.value = false;
            return;
        }

        if (orientation.value === "vertical") {
            canScrollStart.value = vp.scrollTop > 1;
            canScrollEnd.value = vp.scrollTop < vp.scrollHeight - vp.clientHeight - 1;
        } else {
            canScrollStart.value = vp.scrollLeft > 1;
            canScrollEnd.value = vp.scrollLeft < vp.scrollWidth - vp.clientWidth - 1;
        }
    }

    let scrollHandler: (() => void) | null = null;

    function attachScrollListener() {
        detachScrollListener();
        const vp = viewportEl.value;
        if (!vp) return;
        scrollHandler = updateOverflow;
        vp.addEventListener("scroll", scrollHandler, { passive: true });
        updateOverflow();
    }

    function detachScrollListener() {
        if (scrollHandler && viewportEl.value) {
            viewportEl.value.removeEventListener("scroll", scrollHandler);
            scrollHandler = null;
        }
    }

    // Re-attach when viewport element changes
    watch(viewportEl, attachScrollListener);
    onMounted(attachScrollListener);
    onUnmounted(detachScrollListener);

    // ── Scroll to item ──
    function scrollToItem(index: number) {
        const vp = viewportEl.value;
        if (!vp) return;
        const children = vp.children;
        const child = children[index] as HTMLElement | undefined;
        if (!child) return;
        child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    // ── Expand / collapse transition (FLIP pattern from useDockTransition) ──
    const visualExpanded = ref(expanded.value);
    const isTransitioning = ref(false);
    const transitionSize = ref<string | null>(null);
    const suppressTransition = ref(false);

    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeInTimer: ReturnType<typeof setTimeout> | null = null;
    let transitionId = 0;

    function clearTimers() {
        if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null; }
        if (fadeInTimer) { clearTimeout(fadeInTimer); fadeInTimer = null; }
    }

    watch(expanded, () => {
        const el = rootEl.value;
        if (!el) {
            visualExpanded.value = expanded.value;
            return;
        }

        clearTimers();
        const id = ++transitionId;
        const isVert = orientation.value === "vertical";
        const rect = el.getBoundingClientRect();
        const from = isVert ? rect.height : rect.width;

        // Pin size to prevent snap during mode swap
        suppressTransition.value = true;
        transitionSize.value = `${from}px`;

        // Phase 1: fade out
        isTransitioning.value = true;

        // Phase 2: after fade, swap mode and animate size
        fadeTimer = setTimeout(() => {
            fadeTimer = null;
            if (id !== transitionId) return;

            visualExpanded.value = expanded.value;

            nextTick(() => {
                if (id !== transitionId) return;

                // Release size to measure natural target
                transitionSize.value = null;

                nextTick(() => {
                    if (id !== transitionId) return;

                    const toRect = el.getBoundingClientRect();
                    const to = isVert ? toRect.height : toRect.width;

                    if (Math.abs(from - to) < 1) {
                        suppressTransition.value = false;
                        transitionSize.value = null;
                        isTransitioning.value = false;
                        return;
                    }

                    // Pin back to old size
                    transitionSize.value = `${from}px`;

                    nextTick(() => {
                        if (id !== transitionId) return;

                        el.offsetWidth; // Force reflow

                        suppressTransition.value = false;

                        requestAnimationFrame(() => {
                            if (id !== transitionId) return;
                            transitionSize.value = `${to}px`;

                            // Fade in at ~55% of animation duration
                            const dur = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 300;
                            fadeInTimer = setTimeout(() => {
                                if (id !== transitionId) return;
                                isTransitioning.value = false;
                            }, dur * 0.55);
                        });
                    });
                });
            });
        }, fadeMs);
    });

    function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== rootEl.value) return;
        if (e.propertyName === "height" || e.propertyName === "width") {
            transitionSize.value = null;
            isTransitioning.value = false;
        }
    }

    onUnmounted(clearTimers);

    // ── Overflow fade class ──
    // Computed dynamically based on scroll state
    function getOverflowFadeClass() {
        if (canScrollStart.value && canScrollEnd.value) {
            return orientation.value === "vertical" ? "scroll-fade-y" : "scroll-fade-mask";
        }
        if (canScrollStart.value) {
            return orientation.value === "vertical" ? "scroll-fade-top" : "scroll-fade-mask";
        }
        if (canScrollEnd.value) {
            return orientation.value === "vertical" ? "scroll-fade-bottom" : "scroll-fade-mask";
        }
        return "";
    }

    return {
        // Overflow
        canScrollStart,
        canScrollEnd,
        getOverflowFadeClass,
        updateOverflow,

        // Scroll
        scrollToItem,

        // Expand/collapse transition
        visualExpanded,
        isTransitioning,
        transitionSize,
        suppressTransition,
        onTransitionEnd,
    };
}
