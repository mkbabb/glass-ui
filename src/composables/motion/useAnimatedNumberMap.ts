// N-up `useAnimatedNumber` fan-out behind a Record-returning composable.
//
// The library gap: `useAnimatedNumber` runs its smoother in a watch + scope
// cleanup pair. It cannot be invoked inside a `v-for` because the surrounding
// reactive scope is the wrong owner — the loop may unmount/recreate while
// the smoother needs a stable rAF subscription. Consumers that want N-up
// smoothing have hand-rolled the static fan-out (see speedtest's
// `MetricPillCluster.vue:125-134` post-W4 rolled into `useMetricResult`).
//
// `useAnimatedNumberMap` lifts the fan-out behind a single call. The keys
// are fixed at creation; per-key sources are resolved lazily so consumers
// can pass a getter that depends on a registry.

import { computed, type ComputedRef } from "vue";
import { useAnimatedNumber, type UseAnimatedNumberOptions } from "./useAnimatedNumber";

export interface UseAnimatedNumberMapOptions extends UseAnimatedNumberOptions {
    // No additional options — passes through to the underlying `useAnimatedNumber`.
}

/**
 * Fan out N independent `useAnimatedNumber` instances into a `Record<K, ...>`.
 *
 * Each key gets one rAF-smoothed `ComputedRef<number | null>`. The smoothing
 * options apply identically across the set; consumers that need per-key
 * options should call `useAnimatedNumber` per key directly.
 *
 * The `null` propagation is preserved: when `source(key)` resolves to `null`,
 * the corresponding ref returns `null` rather than freezing on the last
 * smoothed sample. This matches the per-metric `raw → smoothed` contract.
 *
 * @example
 * const keys = ["ping", "jitter", "download", "upload"] as const;
 * const smoothed = useAnimatedNumberMap({
 *     keys,
 *     source: (k) => computed(() => store.resultFor(k).value ?? null),
 *     damping: DAMPING.domPill,
 *     snapThreshold: SNAP_THRESHOLD.dom,
 * });
 * // smoothed.ping.value, smoothed.jitter.value, ...
 */
export function useAnimatedNumberMap<K extends string>(options: {
    keys: readonly K[];
    source: (key: K) => ComputedRef<number | null>;
} & UseAnimatedNumberMapOptions): Record<K, ComputedRef<number | null>> {
    const { keys, source, ...animatedOptions } = options;

    const map = {} as Record<K, ComputedRef<number | null>>;

    for (const key of keys) {
        const raw = source(key);
        const { current } = useAnimatedNumber(() => raw.value, animatedOptions);
        // Preserve null when the source is null — the smoother holds the last
        // value across null transitions, but consumers expect the absence to
        // surface (placeholder pills, "no sample yet" registers).
        map[key] = computed<number | null>(() =>
            raw.value === null ? null : current.value,
        );
    }

    return map;
}
