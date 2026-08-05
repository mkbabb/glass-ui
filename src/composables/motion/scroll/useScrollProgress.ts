// Scroll-driven 0..1 progress for an element entering/exiting the viewport.
import { onBeforeUnmount, onMounted, ref, unref, watch } from "vue";
import type { MaybeRef, Ref } from "vue";

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
    /** Attach the reader only while this source is truthy. */
    enabled?: MaybeRef<boolean>;
}

/**
 * Map a target element's scroll position in the viewport to a reactive
 * `Ref<number>` in [0, 1]. Drives things like scroll-linked typography
 * axes, parallax depth, or progress indicators.
 *
 * THE READER ALWAYS ATTACHES. The prior form gated the whole machine behind a
 * module-load `supportsScrollTimeline()` probe, so on a supporting engine the
 * returned ref froze at its mount value while reading alive at every call site —
 * a silent inert arm, not a fallback (its ONE consumer opted out of it with
 * `reactive: true`, which is how the arm survived untested in both directions).
 * A CSS-authored axis belongs in the `.scroll-progress` recipe and never calls
 * this composable at all; a caller who wants the NUMBER gets the number.
 */
export function useScrollProgress(
    options: ScrollProgressConfig,
): Ref<number> {
    const { offset = 0, trackExit = false } = options;
    const progress = ref(0);

    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let mounted = false;
    let listening = false;

    const isEnabled = (): boolean => unref(options.enabled ?? true);

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
        if (!isEnabled() || rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            computeProgress();
        });
    }

    function start(): void {
        if (!mounted || listening || !isEnabled()) return;
        listening = true;
        computeProgress();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        const el = unref(options.target);
        if (el && typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(schedule);
            resizeObserver.observe(el);
        }
    }

    function stop(): void {
        if (listening) {
            listening = false;
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        }
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        resizeObserver?.disconnect();
        resizeObserver = null;
    }

    onMounted(() => {
        mounted = true;
        start();
    });

    watch(
        () => unref(options.target),
        (el, prev) => {
            if (prev && resizeObserver) resizeObserver.unobserve(prev);
            if (el && resizeObserver) resizeObserver.observe(el);
            if (listening) schedule();
            else if (isEnabled()) computeProgress();
        },
    );

    watch(
        () => isEnabled(),
        (enabled) => {
            if (enabled) start();
            else stop();
        },
    );

    onBeforeUnmount(() => {
        mounted = false;
        stop();
    });

    return progress;
}
