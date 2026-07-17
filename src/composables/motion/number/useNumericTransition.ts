// Numeric-transition orchestrator wrapping keyframes.js NumericAnimation for
// CSS-var / transform / channel-tuple interpolation.
//
// NOT spring physics — this composable interpolates between two numeric
// snapshots over a fixed duration via an easing function (linear / cubic
// bezier / keyframes.js timing-function names). True spring physics
// (mass / stiffness / damping / overshoot) lives in `useSpring`,
// which owns the reserved "spring" name in the composable surface.
import { NumericAnimation } from "@mkbabb/keyframes.js";
import type {
    NumericAnimationOptions,
    TimingFunction,
} from "@mkbabb/keyframes.js";
import { onBeforeUnmount, ref, shallowRef, type Ref } from "vue";

export type SpringSnapshot<K extends string> = Record<K, number>;

/**
 * The named `useNumericTransition` return shape.
 * The transition is driver-only: `start`/`stop` control playback, `progress`
 * (0..1) + `playing` are reactive read-outs.
 */
export interface UseNumericTransitionReturn {
    /** Play the transition from `from` → `to`; resolves at completion. */
    start: () => Promise<void>;
    /** Stop the in-flight transition. */
    stop: () => void;
    /** Reactive 0..1 progress derived from the first interpolated key. */
    progress: Ref<number>;
    /** Reactive true-while-playing flag. */
    playing: Ref<boolean>;
}

export interface UseNumericTransitionOptions<K extends string> {
    /** Named numeric endpoints to interpolate between. */
    from: SpringSnapshot<K>;
    to: SpringSnapshot<K>;
    /** Playback duration in ms. */
    duration: number;
    /** Honor prefers-reduced-motion by snapping to the target. Default true. */
    respectReducedMotion?: boolean;
    /**
     * keyframes.js timing function — an explicit callable `(t) => number`.
     *
     * This is a callable `TimingFunction`, not a string easing name.
     * keyframes 4 removed string-name acceptance from `NumericAnimationOptions`
     * (a name now resolves only through the ASYNC `resolveEasing`, which crosses
     * the value.js dynamic boundary the dock/motion light surface must never
     * pull in). Narrowing glass-ui's public option to a callable decouples it
     * from keyframes' name-resolution churn. A consumer wanting a named curve
     * passes the function directly (e.g. `(t) => 1 - Math.pow(1 - t, 3)` for
     * easeOutCubic).
     */
    timingFunction?: TimingFunction;
    /** Per-frame consumer. Receives the same zero-allocation record each tick. */
    onFrame?: (values: SpringSnapshot<K>) => void;
}

/**
 * Drive a numeric transition between two snapshots — e.g. CSS variable
 * values, element transforms, or color channel tuples. Wraps keyframes.js's
 * `NumericAnimation`, which handles easing, binary-search segment lookup,
 * and zero-allocation playback.
 *
 * The caller owns how values map to the DOM: provide `onFrame` and write
 * the record into `element.style.setProperty`, a `ref`, or wherever. This
 * composable never touches the DOM directly — it's the orchestrator, not
 * the renderer.
 *
 * For physics-based motion (mass / stiffness / damping), use `useSpring`.
 */
export function useNumericTransition<K extends string>(
    options: UseNumericTransitionOptions<K>,
): UseNumericTransitionReturn {
    const progress = ref(0);
    const playing = ref(false);

    const {
        from,
        to,
        duration,
        timingFunction,
        onFrame,
        respectReducedMotion = true,
    } = options;

    const numericOpts: NumericAnimationOptions = {
        duration,
        timingFunction,
        respectReducedMotion,
    };

    const animation = shallowRef(
        new NumericAnimation<SpringSnapshot<K>>([from, to], numericOpts),
    );

    async function start(): Promise<void> {
        if (playing.value) {
            animation.value.stop();
        }
        playing.value = true;
        progress.value = 0;

        try {
            await animation.value.play((values) => {
                // NumericAnimation.at(p) sets result in place; mirror progress
                // by reading any key and rescaling via the linear segment —
                // but simplest: compute elapsed via rAF is owned by keyframes.
                // We advance progress lazily: the onFrame cadence is rAF.
                onFrame?.(values);
                // Progress is derived from comparison; keyframes.js doesn't
                // expose it directly, so fall back to linear interp of first key.
                const keys = Object.keys(from) as K[];
                if (keys.length > 0) {
                    const k = keys[0]!;
                    const span = to[k] - from[k];
                    if (span !== 0) {
                        const current = values[k] - from[k];
                        progress.value = Math.max(0, Math.min(1, current / span));
                    }
                }
            });
            progress.value = 1;
        } finally {
            playing.value = false;
        }
    }

    function stop(): void {
        animation.value.stop();
        playing.value = false;
    }

    onBeforeUnmount(() => {
        stop();
    });

    return { start, stop, progress, playing };
}
