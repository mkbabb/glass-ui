/**
 * Timeline primitive types — segmented + continuous variants.
 *
 * The default `scrubber` variant
 * (single-track YouTube-style scrubber) keeps its original numeric model;
 * `segmented` renders adjacent gradient bands with hover/click dots;
 * `continuous` renders one pill rail with N absolute-positioned
 * region children. Both array-variants consume the same `TimelineSegment[]`
 * data shape — only the rendering geometry differs.
 */

/** Per-segment lifecycle. Drives fill + dot states. */
export type TimelineSegmentState = "pending" | "active" | "completed";

/**
 * Gradient endpoints. Either a raw CSS expression (linear-gradient(...))
 * or a `{ from, to }` token pair the primitive expands into a 90deg
 * left-to-right linear-gradient. Accepts CSS color, color-mix(...), or
 * `var(--token)` references.
 */
export interface TimelineSegmentGradient {
    from: string;
    to: string;
}

export interface TimelineSegment {
    /** Stable identifier emitted on hover/click. Must be unique per timeline. */
    key: string;
    /** Display name. Surfaces in the boundary-dot tooltip. */
    label: string;
    /** Lifecycle state — drives fill percentage + dot affordance. */
    state: TimelineSegmentState;
    /**
     * Optional progress within the segment (0..1). When omitted, falls
     * back to: 1 for `completed`, 0 for `pending`, 0.5 for `active`.
     * Reduced-motion consumers may pin this to `1`/`0` to suppress mid-
     * segment animation while retaining final-state visibility.
     */
    progress?: number;
    /**
     * Per-segment gradient. Either a `{from, to}` pair (default 90deg
     * left-to-right) or a raw CSS gradient string the primitive consumes
     * verbatim. Falls back to a section-tone via the
     * `--timeline-segment-default-gradient` token when omitted.
     */
    gradient?: TimelineSegmentGradient | string;
    /**
     * Optional payload surfaced via the `hover` / `click` events. Common
     * shapes: formatted value strings ("145.3 Mbps"), per-phase metric
     * objects, or `null` for pending segments.
     */
    value?: unknown;
    /**
     * Optional relative weight for the `continuous` variant region width
     * (default `1` — equal share). Per-segment widths are computed as
     * `weight / sum(weights)`. Ignored by the `segmented` variant (which
     * uses CSS flex distribution via `--timeline-segment-flex`).
     */
    weight?: number;
}
