/**
 * Timeline shared geometry — pure math + payload helpers used by ≥ 2 of
 * the variant SFCs (ScrubberTimeline / SegmentedTimeline / ContinuousTimeline).
 *
 * The geometry is shared across the segmented + continuous variants,
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

// ─── Per-segment fill helper ──────────────────────────────────────────────
//
// The opaque `gradientFor(seg)` `chart-*`
// cel fill is RETIRED (no consumer left): the segmented cels are now tinted
// GLASS over the warm rail (`.timeline-cel` + the per-segment `--cel-accent`
// the SFC derives from the gradient `to`). The stitched continuous gradient
// keeps its own `stitchColorFor`/`stitchedRailGradient` path below. No alias,
// no legacy.

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
function segmentWeight(seg: TimelineSegment): number {
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

// ─── Continuous-variant STITCHED rail gradient ───────────────────────────
//
// The `continuous` variant is conceptually ONE progression bar — the
// phases are a single journey, not adjacent independent bands. Painting
// each region with its own `{from,to}` gradient produces a hard seam at
// every boundary, which contradicts the variant's name + intent. The
// stitched model paints a SINGLE rail-spanning gradient: each phase's
// resolved colour is a stop anchored at that phase's boundary, and the
// hues blend smoothly across the seams. Each region then windows into
// the same whole-rail gradient via `background-size` / `background-
// position-x`, so the colour is continuous across the bar with no
// per-region discontinuity.

/**
 * Resolve a segment's single representative colour for the stitched rail
 * gradient. A `{from,to}` pair contributes its `to` (the saturated end —
 * the canonical phase hue); a raw CSS string falls back to the default
 * segment token (raw strings are not parseable into a single stop).
 */
function stitchColorFor(seg: TimelineSegment): string {
    if (seg.gradient && typeof seg.gradient === "object") {
        return (seg.gradient as TimelineSegmentGradient).to;
    }
    return "var(--timeline-segment-default-gradient-color, var(--surface-tint-25))";
}

/**
 * Build the ONE rail-spanning stitched gradient for the continuous
 * variant. Each phase's colour is anchored as a stop at the CENTRE of
 * its weight-share so the pure hue sits mid-phase and the hues cross-
 * fade smoothly through every boundary. The first and last stops are
 * pinned to 0% / 100% so the bar's ends saturate fully (no washed
 * leading/trailing edge). Returns a `linear-gradient(90deg, …)` string
 * sized to the FULL rail width.
 */
export function stitchedRailGradient(segments: TimelineSegment[]): string {
    if (segments.length === 0) {
        return "var(--timeline-segment-default-gradient, linear-gradient(90deg, var(--surface-tint-15), var(--surface-tint-25)))";
    }
    if (segments.length === 1) {
        const c = stitchColorFor(segments[0]!);
        return `linear-gradient(90deg, ${c}, ${c})`;
    }
    const total = segments.reduce((acc, s) => acc + segmentWeight(s), 0) || 1;
    const stops: string[] = [];
    let acc = 0;
    segments.forEach((seg, i) => {
        const w = segmentWeight(seg);
        const centre = (acc + w / 2) / total;
        // Pin the first/last representative stop to the rail extremes so
        // the ends saturate; interior stops sit at their phase centre.
        const pos =
            i === 0 ? 0 : i === segments.length - 1 ? 1 : centre;
        stops.push(`${stitchColorFor(seg)} ${(pos * 100).toFixed(3)}%`);
        acc += w;
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
}

/**
 * Per-region windowing parameters for the stitched rail gradient. The
 * region paints the FULL-rail gradient (`stitchedRailGradient`) but only
 * its own slice is visible inside the region box. To window correctly
 * the region's `background-size-x` is scaled to `1 / regionWidth` of the
 * region box (so the full gradient spans `regionWidth` of the rail) and
 * the `background-position-x` is offset so the region's left edge aligns
 * with the rail-fraction `regionLeft`.
 *
 * `sizeX`     — CSS `background-size` x value, e.g. `"333.333%"`.
 * `positionX` — CSS `background-position` x value, e.g. `"50%"`.
 *
 * background-position interpolates the image's `(size - box)` overflow,
 * so the position fraction is `regionLeft / (1 - regionWidth)` (guarded
 * for the degenerate single-region `regionWidth == 1` case).
 */
export function stitchedRegionWindow(
    regionLeft: number,
    regionWidth: number,
): { sizeX: string; positionX: string } {
    const w = regionWidth > 0 ? regionWidth : 1;
    const sizeX = `${(100 / w).toFixed(3)}%`;
    const overflow = 1 - w;
    const positionX =
        overflow > 1e-6
            ? `${((regionLeft / overflow) * 100).toFixed(3)}%`
            : "0%";
    return { sizeX, positionX };
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
 * Default popover content payload shape.
 *
 * Reads `value` shape if the consumer supplied the AA-canonical
 * `{ label, value, description, state }` payload (a consumer
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
