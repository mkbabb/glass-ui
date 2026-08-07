/**
 * Timeline — ONE normalized reporting axis.
 *
 * N ordered spans on the unit interval, each with a lifecycle state, a fill
 * fraction and an ordinal jewel hue, whose end boundaries are addressable
 * marks. The whole is one number published three ways (`defineExpose`, the
 * `#detail` scope, `--timeline-value`).
 *
 * `role="progressbar"`, never `role="slider"` — a timeline REPORTS. The
 * commanding surface is `<Slider :marks>` (the playhead-with-ticks case).
 */

/** Per-span lifecycle. Drives fill extent + mark glyph — never a hue swap. */
export type TimelineSegmentState = "pending" | "active" | "completed";

export interface TimelineSegment {
    /** Stable identity. Emitted on `select` / `hover`; unique per timeline. */
    key: string;
    /** Display name. Read in the mark's accessible name and the `#detail` scope. */
    label: string;
    /** Lifecycle. Default `"pending"`. */
    state?: TimelineSegmentState;
    /**
     * The span's END boundary on the unit axis, 0..1, CUMULATIVE. Clamped
     * monotone non-decreasing — never sorted (a typo must stay visible, not
     * silently reorder the narrative). Omitted spans take an equal share of the
     * axis remaining between their pinned neighbours; all-omitted is the equal
     * split.
     */
    at?: number;
    /**
     * Progress WITHIN the span, 0..1. Defaults: `pending` 0, `completed` 1.
     *
     * `active` with `progress` OMITTED is the INDETERMINATE state — a phase
     * underway with unknown progress. It paints no fill and no cap; the
     * specular flow is its SOLE carrier.
     */
    progress?: number;
    /** Overrides the ordinal hue for this span. Any CSS `<color>`. */
    accent?: string;
    /** Opaque payload. Returned via `select` / `hover` and the `#detail` scope. */
    value?: unknown;
}

export interface TimelineProps {
    segments?: TimelineSegment[];
    /** The key of the span the consumer considers current. `aria-current="step"`. */
    current?: string;
    /**
     * The accessible name of the reporting axis — `aria-label` on the
     * `role="progressbar"` track.
     *
     * It has to be a PROP: the track owns no text content, and a fallthrough
     * `aria-label` lands on the root, which is `role="group"`. Without it the
     * bar announces a number with nothing attached to it (axe
     * `aria-progressbar-name`). No name is invented when it is omitted — an
     * invented one would be a lie.
     */
    label?: string;
}
