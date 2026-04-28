// Hysteresis-smoothed live numeric tracking via keyframes.js SmoothProgress.
//
// Mirrors useSpringOrchestrator's composable-first motion idiom: the
// keyframes.js engine owns the rAF loop; this composable exposes a
// reactive smoothed `current` ref, wires setTarget on source changes,
// and handles reduced-motion.
//
// Not a typewriter / reveal primitive — for character-staggered text
// entrance, see useCharSplit + .char-stagger utility.
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
    /** SmoothProgress damping; default 0.1 (library default). Lower = smoother, higher = snappier. */
    damping?: number;
    /** Absolute-delta threshold below which current snaps to target. default 0.01. */
    snapThreshold?: number;
    /** Minimum target change accepted (noise filter). default 0. */
    targetEpsilon?: number;
    /** Starting current value. default 0. */
    initial?: number;
    /**
     * Clamp current to [0, 1]. default false — for absolute values (Mbps,
     * ms, etc.). Set true when tracking a 0..1 signal (progress, scroll).
     */
    clamp?: boolean;
    /** Respect prefers-reduced-motion: current := target synchronously, no loop. default true. */
    respectReducedMotion?: boolean;
    /** Per-frame side-effect hook. Receives the smoothed current value. */
    onValue?: (v: number) => void;
}

export interface AnimatedNumber {
    /** Reactive smoothed value. Bind in templates. */
    current: Readonly<Ref<number>>;
    /** True while the rAF loop is running (not yet settled). */
    isAnimating: Readonly<Ref<boolean>>;
    /** Force current := target immediately; stops the loop. */
    snap: () => void;
    /** Reset current + target to `value` (default 0); stops the loop. */
    reset: (value?: number) => void;
}

/**
 * Track a live numeric target with exponentially-damped hysteresis.
 *
 * Example:
 * ```ts
 * const { current: mbps } = useAnimatedNumber(() => sample.value, { damping: 0.12 });
 * // template: {{ mbps.toFixed(1) }}
 * ```
 *
 * Wraps keyframes.js `SmoothProgress.play(onFrame)`. The engine owns
 * rAF; this composable wires Vue reactivity, reduced-motion handling,
 * and lifecycle cleanup.
 */
export function useAnimatedNumber(
    target: MaybeRefOrGetter<number | null | undefined>,
    options: UseAnimatedNumberOptions = {},
): AnimatedNumber {
    const initial = options.initial ?? 0;
    const current = ref(initial);
    const isAnimating = ref(false);

    // Reduced-motion handling lives in the keyframes.js engine itself —
    // SmoothProgress.setTarget() / play() short-circuit to immediate snap
    // when the option is enabled and matchMedia matches. Default this on
    // so every useAnimatedNumber consumer inherits the behavior. Closes
    // the Tranche-G activation gap where the engine option had no
    // production consumer.
    const smootherOpts: Partial<SmoothProgressOptions> = {
        damping: options.damping ?? 0.1,
        snapThreshold: options.snapThreshold ?? 0.01,
        targetEpsilon: options.targetEpsilon ?? 0,
        initial,
        clamp: options.clamp ?? false,
        respectReducedMotion: options.respectReducedMotion !== false,
    };
    const smoother = shallowRef(new SmoothProgress(smootherOpts));

    smoother.value.play((v) => {
        current.value = v;
        isAnimating.value = !smoother.value.settled;
        options.onValue?.(v);
    });

    watch(
        () => toValue(target),
        (t) => {
            if (t == null) return;
            smoother.value.setTarget(t);
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
        reset: (v) => {
            smoother.value.reset(v);
            current.value = smoother.value.current;
            isAnimating.value = false;
        },
    };
}
