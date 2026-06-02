// Scroll-driven 0..1 progress for an element entering/exiting the viewport.
import { onBeforeUnmount, onMounted, ref, unref, watch } from "vue";
import type { MaybeRef, Ref } from "vue";
import { supportsScrollTimeline } from "./supportsCssTimeline";

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
 * True when the engine supports native scroll-driven animations. AQ.W5 §Design
 * 1b — when this holds, the `.scroll-progress` CSS recipe (scroll-driven.css)
 * owns the visual axis on the compositor, so this composable becomes the inert
 * (non-attaching) path: NO `scroll`/`resize` listeners, NO `ResizeObserver`.
 * This is the dual-path-with-a-single-writer rule (no double-run). Consumers
 * that still need a reactive JS number on a supporting engine opted into the
 * wrong tool — the native CSS path is primary, the composable is fallback-tier.
 */
const NATIVE_SCROLL_TIMELINE = supportsScrollTimeline();

/**
 * Map a target element's scroll position in the viewport to a reactive
 * `Ref<number>` in [0, 1]. Drives things like scroll-linked typography
 * axes, parallax depth, or progress indicators.
 *
 * AQ.W5: on an engine with native scroll-driven animations, the listener +
 * `ResizeObserver` machinery does NOT attach — prefer the `.scroll-progress`
 * CSS recipe (scroll-driven.css), which runs the same 0..1 axis on the
 * compositor. This composable is the feature-detected fallback (the sole writer
 * when the native feature is absent); `computeProgress()` still runs once on
 * mount for a correct initial value.
 */
export function useScrollProgress(
    options: ScrollProgressConfig,
): Ref<number> {
    const { offset = 0, trackExit = false } = options;
    const progress = ref(0);

    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;

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

    onMounted(() => {
        // One correct initial value in both paths.
        computeProgress();
        // Native path — the CSS recipe owns the live axis. Attach nothing:
        // 0 scroll/resize listeners, 0 ResizeObservers (the W0 gate assertion).
        if (NATIVE_SCROLL_TIMELINE) return;
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        const el = unref(options.target);
        if (el && typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(schedule);
            resizeObserver.observe(el);
        }
    });

    // Re-target re-measure — fallback path only (no listeners attached natively).
    if (!NATIVE_SCROLL_TIMELINE) {
        watch(
            () => unref(options.target),
            (el, prev) => {
                if (prev && resizeObserver) resizeObserver.unobserve(prev);
                if (el && resizeObserver) resizeObserver.observe(el);
                schedule();
            },
        );
    }

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (rafId) cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        resizeObserver = null;
    });

    return progress;
}
