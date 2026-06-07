// Hysteresis-smoothed live numeric tracking via keyframes.js SmoothProgress.
//
// Mirrors useNumericTransition's composable-first motion idiom: the
// keyframes.js engine owns the rAF loop; this composable exposes a reactive
// smoothed `current` ref, wires setTarget on source changes, and handles
// reduced motion.
import { SmoothProgress } from "@mkbabb/keyframes.js";
import type { SmoothProgressOptions } from "@mkbabb/keyframes.js";
import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    shallowRef,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { DAMPING, SNAP_THRESHOLD } from "./constants";

export type AnimatedNumberMode = "absolute" | "progress";

export interface UseAnimatedNumberOptions {
    /** Numeric contract. Progress mode accepts and clamps 0..100. Default absolute. */
    mode?: AnimatedNumberMode;
    /** SmoothProgress damping. Lower = smoother, higher = snappier. */
    damping?: number;
    /** Absolute-delta threshold below which current snaps to target. */
    snapThreshold?: number;
    /** Minimum target change accepted as noise filter. Default 0. */
    targetEpsilon?: number;
    /** Starting current value. Default 0. */
    initial?: number;
    /** Absolute-mode clamp to [0, 1]. Progress mode always clamps to [0, 100]. */
    clamp?: boolean;
    /** Respect prefers-reduced-motion with synchronous target snaps. Default true. */
    respectReducedMotion?: boolean;
    /** Per-frame side-effect hook. Receives the smoothed current value. */
    onValue?: (value: number) => void;
}

export interface UseAnimatedNumberReturn {
    /** Reactive smoothed value. Bind in templates. */
    current: Readonly<Ref<number>>;
    /** True while the rAF loop is running and not settled. */
    isAnimating: Readonly<Ref<boolean>>;
    /** Force current to the target immediately and stop the loop. */
    snap: () => void;
    /** Reset current and target to `value` (default 0), then stop the loop. */
    reset: (value?: number) => void;
    /** Stop the smoother and target watcher. */
    dispose: () => void;
}

/** @deprecated prefer the canonical `UseAnimatedNumberReturn`; retained so no import site breaks. */
export type AnimatedNumber = UseAnimatedNumberReturn;

function clampProgress(value: number): number {
    return Math.max(0, Math.min(100, value));
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
): UseAnimatedNumberReturn {
    const mode = options.mode ?? "absolute";

    // Progress mode: keep the underlying SmoothProgress in [0, 1] (the only
    // range its clamp supports) and scale at the consumer-facing boundary.
    // This prevents stale `currentValue` from sitting outside the contract
    // domain across phase boundaries — when the target drops from 100 to 0
    // the smoother damps from 1 → 0, never carrying a stale 100 that would
    // animate the displayed value backward through the rail.
    // (Per audit U.W0.A5 §1: "the composable should keep the smoother in
    // `[0, 1]` and only multiply at the consumer-facing read".)
    const PROGRESS_SCALE = 100;
    const toInternal =
        mode === "progress"
            ? (value: number) => clampProgress(value) / PROGRESS_SCALE
            : (value: number) => value;
    const fromInternal =
        mode === "progress"
            ? (value: number) => value * PROGRESS_SCALE
            : (value: number) => value;

    const initialExternal = mode === "progress"
        ? clampProgress(options.initial ?? 0)
        : (options.initial ?? 0);
    const initialInternal = toInternal(initialExternal);
    const current = ref(initialExternal);
    const isAnimating = ref(false);
    const defaultDamping =
        mode === "progress" ? DAMPING.domProgress : DAMPING.domHero;
    const defaultSnapThreshold =
        mode === "progress" ? SNAP_THRESHOLD.domProgress : SNAP_THRESHOLD.dom;

    // Progress mode threshold lives in the [0, 100] domain; rescale to the
    // smoother's [0, 1] internal contract.
    const internalSnapThreshold =
        mode === "progress"
            ? (options.snapThreshold ?? defaultSnapThreshold) / PROGRESS_SCALE
            : (options.snapThreshold ?? defaultSnapThreshold);

    const smootherOpts: Partial<SmoothProgressOptions> = {
        damping: options.damping ?? defaultDamping,
        snapThreshold: internalSnapThreshold,
        targetEpsilon:
            mode === "progress"
                ? (options.targetEpsilon ?? 0) / PROGRESS_SCALE
                : (options.targetEpsilon ?? 0),
        initial: initialInternal,
        // Progress mode clamps internally — the [0, 1] smoother range is the
        // exact mirror of the [0, 100] external contract.
        clamp: mode === "progress" ? true : (options.clamp ?? false),
        respectReducedMotion: options.respectReducedMotion !== false,
    };
    const smoother = shallowRef(new SmoothProgress(smootherOpts));

    smoother.value.play((value) => {
        current.value = fromInternal(value);
        isAnimating.value = !smoother.value.settled;
        options.onValue?.(current.value);
    });

    const stopTargetWatch = watch(
        () => toValue(target),
        (nextTarget) => {
            if (nextTarget == null) return;
            smoother.value.setTarget(toInternal(nextTarget));
        },
        { immediate: true },
    );

    function dispose(): void {
        stopTargetWatch();
        smoother.value.stop();
        isAnimating.value = false;
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return {
        current: readonly(current),
        isAnimating: readonly(isAnimating),
        snap: () => {
            smoother.value.snap();
            current.value = fromInternal(smoother.value.current);
            isAnimating.value = false;
        },
        reset: (value) => {
            const next = value ?? 0;
            smoother.value.reset(toInternal(next));
            current.value = fromInternal(smoother.value.current);
            isAnimating.value = false;
        },
        dispose,
    };
}
