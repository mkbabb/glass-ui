// useCountup — an editorial count-up animator that walks `[data-countup]`
// elements under a host and tweens their text content from 0 → the target.
//
// This is the DOM-walking editorial path: it reaches into live DOM and drives
// each figure's `textContent`, distinct from `useAnimatedNumber` (a single
// reactive number) and `AnimatedDigit` (a per-glyph reel). The two coexist —
// this covers the "tween N text figures under the active region" pattern those
// do not.
//
// The tween rides the keyframes LIGHT `NumericAnimation` engine (value.js-free
// — a callable easing, never a string name, keeps the static graph engine-free
// and off the value.js boundary). The engine owns the rAF loop, the easing, and
// the binary-search segment lookup; this composable owns the DOM walk, the
// per-frame `textContent` write, and the teardown.
//
// DOM contract (read off each `[data-countup]` element):
//   data-countup        — the target number (required)
//   data-countup-dur    — tween duration in ms (default 1200)
//   data-countup-delay  — start delay in ms (default 0)
//
// `prefers-reduced-motion: reduce` and the optional `skip()` predicate both
// snap to the target with no tween. Every in-flight tween is tracked and
// cancelled on `cancel()`/scope-dispose, so an unmount mid-tween leaks nothing.
import { NumericAnimation } from "@mkbabb/keyframes.js";
import { onScopeDispose, watch, type Ref } from "vue";
import { useReducedMotion } from "../core/useReducedMotion";

/** The `useCountup` return shape. */
export interface UseCountupReturn {
    /** Animate the count-ups inside the currently-active slide/region. */
    runActive: () => void;
    /** Snap EVERY `[data-countup]` in the document to its end value (still capture). */
    settle: () => void;
    /** Cancel every in-flight tween (also runs on scope-dispose). */
    cancel: () => void;
}

export interface UseCountupOptions {
    /**
     * Easing applied to tween progress — a value.js-FREE callable
     * `(p: number) => number` over `[0, 1]`. A callable keeps the
     * `NumericAnimation` engine off the value.js boundary (a string name would
     * dynamic-import the value.js easing registry).
     */
    easeFn: (p: number) => number;
    /** When it returns true, `runActive` is a no-op (e.g. export/print mode). */
    skip?: () => boolean;
}

/**
 * Walk `[data-countup]` figures under `hostRef` and tween each from 0 → target.
 *
 * @example
 * const { runActive, settle } = useCountup(deckRef, { easeFn: (p) => p });
 * // on slide-activate: runActive();
 * // on still-capture:  settle();
 */
export function useCountup(
    hostRef: Ref<HTMLElement | null>,
    opts: UseCountupOptions,
): UseCountupReturn {
    const { easeFn, skip } = opts;
    const reducedMotion = useReducedMotion();

    // Every live tween, keyed by its element, so a re-run or a teardown can stop
    // the in-flight animation on that figure (a prior hand-roll leaked the
    // rAF on unmount; tracking the handle fixes it).
    const running = new Map<HTMLElement, NumericAnimation<{ v: number }>>();
    const delays = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

    function stop(el: HTMLElement): void {
        const timer = delays.get(el);
        if (timer !== undefined) {
            clearTimeout(timer);
            delays.delete(el);
        }
        const anim = running.get(el);
        if (anim) {
            anim.stop();
            running.delete(el);
        }
    }

    function runSlide(slide: HTMLElement): void {
        slide.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
            const target = parseFloat(el.getAttribute("data-countup") ?? "0") || 0;
            const dur = parseFloat(el.getAttribute("data-countup-dur") ?? "1200");
            const delay = parseFloat(el.getAttribute("data-countup-delay") ?? "0");

            stop(el);

            if (reducedMotion.value) {
                el.textContent = String(target);
                return;
            }

            el.textContent = "0";

            // The engine tweens a single channel `v` from 0 → target over
            // `dur`, applying the consumer's callable easing. The delay is
            // honoured by deferring the play (the engine has no delay opt).
            const anim = new NumericAnimation<{ v: number }>(
                [{ v: 0 }, { v: target }],
                { duration: dur, timingFunction: easeFn },
            );
            running.set(el, anim);

            const play = () => {
                if (running.get(el) !== anim) return;
                delays.delete(el);
                void anim
                    .play((values) => {
                        el.textContent = String(Math.round(values.v));
                    })
                    .then(() => {
                        if (running.get(el) === anim) {
                            el.textContent = String(target);
                            running.delete(el);
                        }
                    });
            };

            if (delay > 0) {
                delays.set(el, setTimeout(play, delay));
            } else {
                play();
            }
        });
    }

    function runActive(): void {
        if (skip?.()) return;
        const active = hostRef.value?.querySelector<HTMLElement>(
            '[data-state="active"]',
        );
        if (active) runSlide(active);
    }

    function settle(): void {
        document.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
            stop(el);
            el.textContent = el.getAttribute("data-countup") ?? el.textContent;
        });
    }

    function cancel(): void {
        for (const el of [...running.keys()]) stop(el);
    }

    const stopReducedMotionWatch = watch(
        reducedMotion,
        (reduced) => {
            if (!reduced) return;
            for (const el of [...running.keys()]) {
                stop(el);
                el.textContent = el.getAttribute("data-countup") ?? el.textContent;
            }
        },
        { flush: "sync" },
    );

    onScopeDispose(() => {
        stopReducedMotionWatch();
        cancel();
    });

    return { runActive, settle, cancel };
}
