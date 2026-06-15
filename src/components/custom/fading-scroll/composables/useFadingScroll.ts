// useFadingScroll — the JS fallback writer for the scroll-state-driven edge fade
// (BA.W-FADING-SCROLL). Promoted from the bespoke `PresetPickerRow` measure loop
// (the ONLY scroll-aware path before this wave, trapped in one demo file).
//
// DUAL-PATH with a SINGLE writer (the `scroll-driven.css` / `useScrollProgress`
// discipline). The native `@supports (animation-timeline: scroll())` CSS recipe
// in `utilities/base.css` owns the visual axis on the compositor when the engine
// supports it; this composable is the feature-detected fallback that writes the
// SAME `--fade-start` / `--fade-end` mask-width customs. The two never both
// write: `supportsScrollTimeline()` gates the listener/observer machinery OFF on
// a supporting engine, so there is no double-feather.
//
// PRM is NOT an outer gate here (unlike `scroll-driven.css`). The edge fade is a
// LEGIBILITY cue, not motion — under `prefers-reduced-motion: reduce` it does
// not vanish; the discrete overflow-edge presence stays correct (the customs are
// written present-or-absent, the native side drops the interpolation, the
// fallback was always discrete). So this composable runs under PRM too.

import { onBeforeUnmount, onMounted, ref, unref } from "vue";
import type { MaybeRef, Ref } from "vue";
import { useResizeObserver } from "../../../../composables/dom/useResizeObserver";
import { NATIVE_SCROLL_TIMELINE, SNAP_TOLERANCE } from "../constants";

export interface UseFadingScrollOptions {
    /** Scroll axis. `"x"` reads scrollLeft/Width; `"y"` reads scrollTop/Height. Default `"x"`. */
    axis?: "x" | "y";
    /** Feather the start edge once scrolled past the start. Default `true`. */
    fadeStart?: boolean;
    /** Feather the end edge while trailing overflow remains. Default `true`. */
    fadeEnd?: boolean;
}

export interface UseFadingScrollControls {
    /** True when this composable is the ACTIVE writer (the native timeline is absent). */
    readonly active: Readonly<Ref<boolean>>;
    /** Re-measure the scroll state and rewrite the customs. Safe to call manually. */
    measure: () => void;
    /** Detach all listeners/observers. Auto-called on unmount in a component scope. */
    stop: () => void;
}

/**
 * Drive the per-edge `--fade-start` / `--fade-end` mask-width customs off an
 * element's live scroll state, the JS fallback for the native `scroll(self)`
 * timeline. On a supporting engine this attaches NOTHING (the CSS recipe is the
 * sole writer); on a non-supporting engine it measures `scrollLeft/Top`,
 * `scrollWidth/Height − clientWidth/Height`, a `ResizeObserver` (the shared
 * `useResizeObserver` substrate) + a rAF-coalesced `scroll` listener, writing
 * `--fade-start = --fade-scroll-width` only past `scroll > 0` and `--fade-end`
 * only while trailing overflow remains. The customs default to `0px` (no
 * feather) so the at-rest no-overflow edge is SHARP.
 *
 * @param target the scroll-port element (the same element the CSS customs apply to)
 */
export function useFadingScroll(
    target: MaybeRef<HTMLElement | null>,
    options: UseFadingScrollOptions = {},
): UseFadingScrollControls {
    const { axis = "x", fadeStart = true, fadeEnd = true } = options;

    // The composable is the ACTIVE writer only when the native timeline is
    // absent. On a supporting engine `active` is false and nothing attaches.
    const active = ref(!NATIVE_SCROLL_TIMELINE);

    let rafId = 0;
    let resizeStop: (() => void) | null = null;

    function applyEdges(start: boolean, end: boolean): void {
        const el = unref(target);
        if (!el) return;
        // The customs read `var(--fade-scroll-width)` for a feathered edge and
        // `0px` for a sharp one — the same two endpoints the native
        // `animation-range` interpolates between.
        el.style.setProperty("--fade-start", start ? "var(--fade-scroll-width)" : "0px");
        el.style.setProperty("--fade-end", end ? "var(--fade-scroll-width)" : "0px");
    }

    function measure(): void {
        const el = unref(target);
        if (!el) return;
        const pos = axis === "x" ? el.scrollLeft : el.scrollTop;
        const max =
            axis === "x"
                ? el.scrollWidth - el.clientWidth
                : el.scrollHeight - el.clientHeight;
        const atStart = pos <= SNAP_TOLERANCE;
        const atEnd = pos >= max - SNAP_TOLERANCE;
        applyEdges(fadeStart && !atStart, fadeEnd && !atEnd);
    }

    // rAF-coalesce the scroll handler — a single in-flight frame per burst. This
    // is the `useScrollProgress` fallback idiom (a one-shot coalescing guard, NOT
    // a free-running `useRAFLoop`, which would burn frames while the strip sits
    // idle — the scroll fade only needs a measure on the scroll/resize edge).
    function onScroll(): void {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            measure();
        });
    }

    function attach(): void {
        const el = unref(target);
        if (!el) return;
        el.addEventListener("scroll", onScroll, { passive: true });
        // Width/height changes shift the overflow extent — re-measure on resize
        // via the shared substrate (rAF-batched dispatch built in).
        const ro = useResizeObserver(target as Ref<HTMLElement | null>, measure);
        resizeStop = ro.stop;
        measure();
    }

    function stop(): void {
        const el = unref(target);
        el?.removeEventListener("scroll", onScroll);
        resizeStop?.();
        resizeStop = null;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    onMounted(() => {
        if (!active.value) return; // native timeline owns the axis — attach nothing
        attach();
    });
    onBeforeUnmount(stop);

    return { active, measure, stop };
}
