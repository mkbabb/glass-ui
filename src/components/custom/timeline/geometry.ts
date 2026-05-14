/**
 * Timeline shared geometry — pure math + payload helpers used by ≥ 2 of
 * the variant SFCs (ScrubberTimeline / SegmentedTimeline / ContinuousTimeline).
 *
 * Split out of the prior monolithic `GlassTimeline.vue` per O.W3 Lane A —
 * the geometry was identical across the segmented + continuous variants,
 * and the popover-payload helper is consumed only by the continuous variant
 * today but its shape (the AA-canonical `{ label, value, description, state }`
 * envelope) is documented as the shared per-segment hover-payload contract.
 *
 * All exports are pure functions or type aliases — no Vue runtime imports,
 * no side effects. The factory `createContinuousGeometry(segmentsRef)`
 * returns the `totalWeight` + region/boundary helpers bound to a live
 * `Ref<TimelineSegment[]>`, so the continuous SFC can drop them straight
 * into its `<script setup>`.
 */

import { computed, type ComputedRef, type Ref } from "vue";
import type { TimelineSegment, TimelineSegmentGradient } from "./types";

// ─── Per-segment gradient + fill helpers ──────────────────────────────────

/**
 * Resolve a segment's gradient declaration to a CSS background expression.
 * - `string` (raw CSS): consumed verbatim — caller controls direction.
 * - `{from, to}` pair: expanded to `linear-gradient(90deg, from, to)`.
 * - undefined: falls through to the `--timeline-segment-default-gradient`
 *   token (consumer can override on the primitive or via a section-tone).
 */
export function gradientFor(seg: TimelineSegment): string {
    if (typeof seg.gradient === "string") return seg.gradient;
    if (seg.gradient && typeof seg.gradient === "object") {
        const g = seg.gradient as TimelineSegmentGradient;
        return `linear-gradient(90deg, ${g.from}, ${g.to})`;
    }
    return "var(--timeline-segment-default-gradient, linear-gradient(90deg, var(--surface-tint-15), var(--surface-tint-25)))";
}

/**
 * Fill percentage per state. Explicit `progress` wins; otherwise the
 * canonical mapping (pending=0, active=0.5, completed=1). Clamped to
 * [0, 1] so consumers can't paint past the segment box.
 */
export function fillFor(seg: TimelineSegment): number {
    if (typeof seg.progress === "number") {
        return Math.max(0, Math.min(1, seg.progress));
    }
    if (seg.state === "completed") return 1;
    if (seg.state === "active") return 0.5;
    return 0;
}

/** Resolve a segment's positive weight; defaults to 1. */
export function segmentWeight(seg: TimelineSegment): number {
    return typeof seg.weight === "number" && seg.weight > 0 ? seg.weight : 1;
}

// ─── Continuous-variant region geometry ───────────────────────────────────
//
// Region geometry is driven by per-segment `weight` (default 1). Each
// region's left edge is the cumulative sum of all prior segment weights
// divided by the total weight; its width is its own share. The output
// values are normalized 0..1 fractions; the template multiplies by 100
// to express them as CSS `%`. Stable across reactive segment edits.

/**
 * Bind continuous-variant geometry helpers to a live `Ref<TimelineSegment[]>`.
 * Returns the `totalWeight` ComputedRef + per-index region geometry
 * (regionLeft, regionWidth, boundaryX) + the rail's aggregate aria-valuenow
 * computation. The continuous SFC pulls these into its `<script setup>`.
 */
export function createContinuousGeometry(segments: Ref<TimelineSegment[]>): {
    totalWeight: ComputedRef<number>;
    regionLeft: (i: number) => number;
    regionWidth: (i: number) => number;
    boundaryX: (i: number) => number;
    continuousAriaValueNow: ComputedRef<number>;
} {
    /**
     * Total weight across all segments. Returns at least 1 to guard the
     * `width / totalWeight` divisor when `segments` is empty (the template's
     * `v-if` already short-circuits, but defensive zero-guard avoids NaN).
     */
    const totalWeight = computed<number>(() => {
        const sum = segments.value.reduce(
            (acc, s) => acc + segmentWeight(s),
            0,
        );
        return sum > 0 ? sum : 1;
    });

    function regionLeft(i: number): number {
        let acc = 0;
        for (let j = 0; j < i; j += 1) {
            const s = segments.value[j];
            if (s) acc += segmentWeight(s);
        }
        return acc / totalWeight.value;
    }

    function regionWidth(i: number): number {
        const s = segments.value[i];
        if (!s) return 0;
        return segmentWeight(s) / totalWeight.value;
    }

    function boundaryX(i: number): number {
        return regionLeft(i) + regionWidth(i);
    }

    /**
     * Aggregate progress for the continuous variant's aria-valuenow.
     * Returns the count of completed segments + fractional progress of any
     * active segment, normalized to 0..N. Consumers expect "how many phases
     * are done" not "0..1 percent" so the valuemax is the segment count.
     */
    const continuousAriaValueNow = computed<number>(() => {
        let acc = 0;
        for (const s of segments.value) {
            if (s.state === "completed") acc += 1;
            else if (s.state === "active") acc += fillFor(s);
        }
        // Round to 2 decimals — aria-valuenow tolerates non-integers but the
        // rendered string should be terse for assistive tech read-aloud.
        return Math.round(acc * 100) / 100;
    });

    return {
        totalWeight,
        regionLeft,
        regionWidth,
        boundaryX,
        continuousAriaValueNow,
    };
}

// ─── Continuous-variant region background ────────────────────────────────

/**
 * Continuous-variant region background. For `completed` segments the full
 * gradient paints end-to-end; for `active` the gradient paints up to
 * `fillFor(seg) * 100%` and then fades to transparent (the rail substrate
 * shows through past the active fill); `pending` segments paint nothing
 * (background transparent — the rail substrate shows through).
 */
export function continuousRegionBackground(seg: TimelineSegment): string {
    if (seg.state === "pending") return "transparent";
    return gradientFor(seg);
}

/**
 * Continuous-variant active-region fill width (0..1, applied as a clip
 * mask on the region's right edge for partial-fill animation). For
 * `completed` returns 1; for `pending` returns 0; for `active` returns
 * `fillFor(seg)` (which honours explicit `progress` overrides).
 */
export function continuousFillWidth(seg: TimelineSegment): number {
    return fillFor(seg);
}

// ─── Continuous-variant popover payload ──────────────────────────────────

/**
 * AB.W2.T2 — default popover content payload shape.
 *
 * Reads `value` shape if the consumer supplied the AA-canonical
 * `{ label, value, description, state }` payload (the speedtest
 * PhaseDetail), otherwise falls back to the segment's own label/state.
 * The slot scope exposes the full segment so consumers can override
 * entirely.
 */
export interface DefaultPopoverPayload {
    label?: string;
    value?: unknown;
    description?: string;
    state?: string;
}

export function popoverPayloadFor(seg: TimelineSegment): DefaultPopoverPayload {
    const v = (seg.value ?? null) as DefaultPopoverPayload | null;
    return {
        label: v?.label ?? seg.label,
        value: v?.value,
        description: v?.description,
        state: v?.state ?? seg.state,
    };
}
