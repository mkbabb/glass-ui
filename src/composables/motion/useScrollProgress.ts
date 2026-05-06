// Scroll-driven 0..1 progress for an element entering/exiting the viewport.
import { computed, onBeforeUnmount, onMounted, ref, unref, watch } from "vue";
import type { MaybeRef, Ref } from "vue";
import { useResizeObserver } from "../useResizeObserver";

interface ScrollProgressConfig {
    /** Element whose vertical position maps to 0..1. */
    target: MaybeRef<HTMLElement | null>;
    /** Pixel offset added to the mapped start. Negative values start earlier. */
    offset?: number;
    /**
     * When true, progress reaches 1 at the target's bottom rather than its
     * top. Default false — progress is 0 when target top is at viewport
     * bottom, 1 when target top reaches viewport top.
     */
    trackExit?: boolean;
}

/**
 * Map a target element's scroll position in the viewport to a reactive
 * `Ref<number>` in [0, 1]. Drives things like scroll-linked typography
 * axes, parallax depth, or progress indicators.
 *
 * Uses a rAF-coalesced scroll listener plus ResizeObserver so the mapping
 * stays accurate when layout shifts.
 */
export function useScrollProgress(
    options: ScrollProgressConfig,
): Ref<number> {
    const { offset = 0, trackExit = false } = options;
    const progress = ref(0);

    let rafId = 0;

    function computeProgress(): void {
        const el = unref(options.target);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh + offset;
        const end = trackExit ? -rect.height : 0;
        const span = start - end;
        if (span === 0) {
            progress.value = 0;
            return;
        }
        const raw = (start - rect.top) / span;
        progress.value = Math.max(0, Math.min(1, raw));
    }

    function schedule(): void {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            computeProgress();
        });
    }

    // Re-init mapping when the observed element resizes. The parent
    // schedule() already rAF-coalesces and computeProgress short-circuits
    // when the target is null, so we want every observer entry through —
    // no extra coalescing or threshold gating in the composable.
    const targetRef = computed(() => unref(options.target));
    useResizeObserver(targetRef, () => schedule(), {
        rafBatch: false,
        threshold: 0,
    });

    onMounted(() => {
        computeProgress();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
    });

    watch(
        () => unref(options.target),
        () => schedule(),
    );

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (rafId) cancelAnimationFrame(rafId);
    });

    return progress;
}
