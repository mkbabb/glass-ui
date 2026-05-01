// Hysteresis-smoothed live numeric tracking via keyframes.js SmoothProgress.
//
// Mirrors useSpringOrchestrator's composable-first motion idiom: the
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

export interface AnimatedNumber {
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
): AnimatedNumber {
    const mode = options.mode ?? "absolute";
    const normalizeValue =
        mode === "progress" ? clampProgress : (value: number) => value;
    const initial = normalizeValue(options.initial ?? 0);
    const current = ref(initial);
    const isAnimating = ref(false);
    const defaultDamping =
        mode === "progress" ? DAMPING.domProgress : DAMPING.domHero;
    const defaultSnapThreshold =
        mode === "progress" ? SNAP_THRESHOLD.domProgress : SNAP_THRESHOLD.dom;

    const smootherOpts: Partial<SmoothProgressOptions> = {
        damping: options.damping ?? defaultDamping,
        snapThreshold: options.snapThreshold ?? defaultSnapThreshold,
        targetEpsilon: options.targetEpsilon ?? 0,
        initial,
        clamp: mode === "progress" ? false : (options.clamp ?? false),
        respectReducedMotion: options.respectReducedMotion !== false,
    };
    const smoother = shallowRef(new SmoothProgress(smootherOpts));

    smoother.value.play((value) => {
        current.value = normalizeValue(value);
        isAnimating.value = !smoother.value.settled;
        options.onValue?.(current.value);
    });

    const stopTargetWatch = watch(
        () => toValue(target),
        (nextTarget) => {
            if (nextTarget == null) return;
            smoother.value.setTarget(normalizeValue(nextTarget));
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
            current.value = normalizeValue(smoother.value.current);
            isAnimating.value = false;
        },
        reset: (value) => {
            smoother.value.reset(normalizeValue(value ?? 0));
            current.value = normalizeValue(smoother.value.current);
            isAnimating.value = false;
        },
        dispose,
    };
}
