// Parametric spring orchestrator wrapping keyframes.js NumericAnimation for CSS-var interpolation.
import { NumericAnimation } from "@mkbabb/keyframes.js";
import type {
    NumericAnimationOptions,
    TimingFunction,
    TimingFunctionNames,
} from "@mkbabb/keyframes.js";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import type { Ref } from "vue";

export type SpringSnapshot<K extends string> = Record<K, number>;

export interface UseSpringOrchestratorOptions<K extends string> {
    /** Named numeric endpoints to interpolate between. */
    from: SpringSnapshot<K>;
    to: SpringSnapshot<K>;
    /** Playback duration in ms. */
    duration: number;
    /** keyframes.js timing function — string name or explicit function. */
    timingFunction?: TimingFunction | TimingFunctionNames;
    /** Per-frame consumer. Receives the same zero-allocation record each tick. */
    onFrame?: (values: SpringSnapshot<K>) => void;
}

export interface SpringOrchestrator<K extends string> {
    /** Kick off the animation. Resolves when complete or stopped. */
    start: () => Promise<void>;
    /** Cancel an in-flight animation. */
    stop: () => void;
    /** Reactive 0..1 progress of the most recent run. */
    progress: Ref<number>;
    /** True while a run is active. */
    playing: Ref<boolean>;
}

/**
 * Drive a parametric spring between two numeric snapshots — e.g. CSS
 * variable values, element transforms, or color channel tuples. Wraps
 * keyframes.js's `NumericAnimation`, which handles easing, binary-search
 * segment lookup, and zero-allocation playback.
 *
 * The caller owns how values map to the DOM: provide `onFrame` and write
 * the record into `element.style.setProperty`, a `ref`, or wherever. This
 * composable never touches the DOM directly — it's the orchestrator, not
 * the renderer.
 */
export function useSpringOrchestrator<K extends string>(
    options: UseSpringOrchestratorOptions<K>,
): SpringOrchestrator<K> {
    const progress = ref(0);
    const playing = ref(false);

    const { from, to, duration, timingFunction, onFrame } = options;

    const numericOpts: NumericAnimationOptions = {
        duration,
        timingFunction,
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
