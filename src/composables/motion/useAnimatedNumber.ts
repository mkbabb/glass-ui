// Hysteresis-smoothed live numeric tracking via keyframes.js SmoothProgress.
//
// Mirrors useSpringOrchestrator's composable-first motion idiom: the
// keyframes.js engine owns the rAF loop; this composable exposes a reactive
// smoothed `current` ref, wires setTarget on source changes, and handles
// reduced motion.
import { SmoothProgress } from "@mkbabb/keyframes.js";
import type { SmoothProgressOptions } from "@mkbabb/keyframes.js";
import {
    onBeforeUnmount,
    readonly,
    ref,
    shallowRef,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

export interface UseAnimatedNumberOptions {
    /** SmoothProgress damping; default 0.1. Lower = smoother, higher = snappier. */
    damping?: number;
    /** Absolute-delta threshold below which current snaps to target. Default 0.01. */
    snapThreshold?: number;
    /** Minimum target change accepted as noise filter. Default 0. */
    targetEpsilon?: number;
    /** Starting current value. Default 0. */
    initial?: number;
    /** Clamp current to [0, 1]. Default false for absolute values like Mbps or ms. */
    clamp?: boolean;
    /** Respect prefers-reduced-motion with synchronous target snaps. Default true. */
    respectReducedMotion?: boolean;
    /** Per-frame side-effect hook. Receives the smoothed current value. */
    onValue?: (value: number) => void;
}

export interface AnimatedNumber {
    /** Reactive smoothed value. Bind in templates. */
    current: Readonly<Ref<number>>;
    /** True while the rAF loop is running and not settled. */
    isAnimating: Readonly<Ref<boolean>>;
    /** Force current to the target immediately and stop the loop. */
    snap: () => void;
    /** Reset current and target to `value` (default 0), then stop the loop. */
    reset: (value?: number) => void;
}

/**
 * Track a live numeric target with exponentially damped hysteresis.
 *
 * Wraps keyframes.js `SmoothProgress.play(onFrame)`. The engine owns rAF; this
 * composable wires Vue reactivity, reduced-motion handling, and lifecycle
 * cleanup.
 */
export function useAnimatedNumber(
    target: MaybeRefOrGetter<number | null | undefined>,
    options: UseAnimatedNumberOptions = {},
): AnimatedNumber {
    const initial = options.initial ?? 0;
    const current = ref(initial);
    const isAnimating = ref(false);

    const smootherOpts: Partial<SmoothProgressOptions> = {
        damping: options.damping ?? 0.1,
        snapThreshold: options.snapThreshold ?? 0.01,
        targetEpsilon: options.targetEpsilon ?? 0,
        initial,
        clamp: options.clamp ?? false,
        respectReducedMotion: options.respectReducedMotion !== false,
    };
    const smoother = shallowRef(new SmoothProgress(smootherOpts));

    smoother.value.play((value) => {
        current.value = value;
        isAnimating.value = !smoother.value.settled;
        options.onValue?.(value);
    });

    watch(
        () => toValue(target),
        (nextTarget) => {
            if (nextTarget == null) return;
            smoother.value.setTarget(nextTarget);
        },
        { immediate: true },
    );

    onBeforeUnmount(() => smoother.value.stop());

    return {
        current: readonly(current),
        isAnimating: readonly(isAnimating),
        snap: () => {
            smoother.value.snap();
            current.value = smoother.value.current;
            isAnimating.value = false;
        },
        reset: (value) => {
            smoother.value.reset(value);
            current.value = smoother.value.current;
            isAnimating.value = false;
        },
    };
}
