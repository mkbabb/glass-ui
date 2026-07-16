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
    /**
     * Keep the returned ref live even when CSS scroll timelines are available.
     * Use this only when JavaScript consumes the value directly (for example a
     * shader uniform); CSS-authored progress should keep the default compositor
     * path and attach no reader.
     */
    reactive?: boolean;
    /** Attach the reader only while this source is truthy. */
    enabled?: MaybeRef<boolean>;
}

/**
 * True when the engine supports native scroll-driven animations. AQ.W5 §Design
 * 1b — when this holds, the `.scroll-progress` CSS recipe (scroll-driven.css)
 * owns the visual axis on the compositor, so this composable becomes the inert
 * (non-attaching) path: NO `scroll`/`resize` listeners, NO `ResizeObserver`.
 * This is the dual-path-with-a-single-writer rule (no double-run). A consumer
 * that genuinely reads the number in JavaScript may opt into `reactive` mode;
 * the native CSS path remains primary for CSS-authored progress.
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
 * mount for a correct initial value. `reactive: true` is the explicit exception
 * for a non-CSS consumer such as a shader uniform.
 */
export function useScrollProgress(
    options: ScrollProgressConfig,
): Ref<number> {
    const { offset = 0, trackExit = false } = options;
    const progress = ref(0);
    const needsReader = options.reactive === true || !NATIVE_SCROLL_TIMELINE;

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
        if (!mounted || listening || !needsReader || !isEnabled()) return;
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
        if (needsReader) start();
        else if (isEnabled()) computeProgress();
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
            if (enabled) {
                if (needsReader) start();
                else computeProgress();
            } else {
                stop();
            }
        },
    );

    onBeforeUnmount(() => {
        mounted = false;
        stop();
    });

    return progress;
}
