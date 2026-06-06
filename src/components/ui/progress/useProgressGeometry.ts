import { computed, type ComputedRef, type Ref } from "vue";

/**
 * Segment shape consumed by `variant="sectioned"`. Mirrors `TimelineSegment`
 * (`@mkbabb/glass-ui/timeline`) deliberately so a consumer can pass the same
 * array to both the timeline rail and the phase-bus progress without re-shaping.
 * Optional fields default sensibly:
 *  - `state`  → "pending"
 *  - `weight` → 1 (equal share)
 *  - `color`  → consumer-controlled CSS (`var(--chart-{key})` etc.); the
 *               sectioned variant requires it for the colour cells.
 */
export interface ProgressSegment {
    /** Stable identifier — matched against `currentSegmentKey`. */
    key: string;
    /** Display label (currently unused visually; surfaced for a11y/title). */
    label?: string;
    /**
     * CSS colour expression (hex, oklch, color-mix, `var(--token)`). Drives the
     * cell fill, the gradient stops between siblings, and the active-fill spring
     * overlay.
     */
    color: string;
    /** Lifecycle state. Drives saturation + sweep. Defaults to "pending". */
    state?: "pending" | "active" | "completed";
    /**
     * Relative width weight. Per-cell widths = `weight / sum(weights)`. Default
     * `1` (equal share — the speedtest pings/jitter/dl/ul case).
     */
    weight?: number;
}

/** A resolved sectioned cell — per-cell geometry + lifecycle + fill fraction. */
export interface SectionedCell extends ProgressSegment {
    startPct: number;
    endPct: number;
    widthPct: number;
    resolvedState: "pending" | "active" | "completed";
    /** 0..1 — how much of THIS cell paints saturated. */
    fill: number;
}

/**
 * Derive per-cell width/start/end/state/fill from the `segments` array.
 *
 * Widths come from the weight distribution; states resolve from each segment's
 * explicit `state` (wins) or are inferred from `currentSegmentKey` order (cells
 * before current = completed, current = active, after = pending). The active
 * cell's fill follows `activeProgress`; completed cells fill 1; pending fill 0.
 */
export function useProgressGeometry(args: {
    segments: Ref<ProgressSegment[]> | ComputedRef<ProgressSegment[]>;
    currentSegmentKey: Ref<string | null> | ComputedRef<string | null>;
    activeProgress: Ref<number> | ComputedRef<number>;
}): {
    cells: ComputedRef<SectionedCell[]>;
    /**
     * The cumulative-fill aggregate (0..100) — the meaningful numeric the
     * underlying `[role="progressbar"]` reports as `aria-valuenow`. Derived from
     * the per-cell state map, NOT from any `modelValue`.
     */
    aggregateValue: ComputedRef<number>;
} {
    const cells = computed<SectionedCell[]>(() => {
        const segments = args.segments.value;
        if (segments.length === 0) return [];

        const weights = segments.map((s) => s.weight ?? 1);
        const total = weights.reduce((a, b) => a + b, 0) || 1;

        // Resolve states: explicit state on segment wins; otherwise infer from
        // currentSegmentKey order. Cells before current = completed; current =
        // active; after = pending.
        const currentIdx = segments.findIndex(
            (s) => s.key === args.currentSegmentKey.value,
        );

        let runningPct = 0;
        return segments.map((seg, i) => {
            const widthPct = (weights[i]! / total) * 100;
            const startPct = runningPct;
            const endPct = runningPct + widthPct;
            runningPct = endPct;

            let resolvedState: "pending" | "active" | "completed";
            if (seg.state) {
                resolvedState = seg.state;
            } else if (currentIdx < 0) {
                resolvedState = "pending";
            } else if (i < currentIdx) {
                resolvedState = "completed";
            } else if (i === currentIdx) {
                resolvedState = "active";
            } else {
                resolvedState = "pending";
            }

            const fill =
                resolvedState === "completed"
                    ? 1
                    : resolvedState === "active"
                      ? Math.max(0, Math.min(1, args.activeProgress.value))
                      : 0;

            return { ...seg, startPct, endPct, widthPct, resolvedState, fill };
        });
    });

    // For accessibility, the underlying ProgressRoot benefits from a numeric value
    // so the [role="progressbar"] reports a meaningful aria-valuenow. Compute it
    // from cumulative cell fill — this is the sectioned variant's OWN truth, not a
    // silent override of any consumer-supplied modelValue.
    const aggregateValue = computed(() => {
        if (cells.value.length === 0) return 0;
        let sum = 0;
        for (const c of cells.value) sum += c.fill * c.widthPct;
        return Math.max(0, Math.min(100, sum));
    });

    return { cells, aggregateValue };
}
