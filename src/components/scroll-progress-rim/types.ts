import type { Orientation } from "../_shared/axes";

/** The rim's fill axis — the library's ONE orientation union. */
export type ScrollProgressRimOrientation = Orientation;

/**
 * Where the rim draws. `inset` is a stadium track inside the host's edge; `border`
 * draws the progress as the host's own border, edge to edge, following its corners.
 */
export type ScrollProgressRimEdge = "inset" | "border";

export interface ScrollProgressRimProps {
    /** Aggregate progress in the same units as `max`. */
    value: number;
    /** Aggregate ceiling. @default 1 */
    max?: number;
    /**
     * Optional discrete positions. Each entry renders as a checkpoint dot; the
     * fill-pill swallows a dot as it passes. The values seed the aggregate read
     * but the pill length is always the true `value / max` fraction (never
     * pinned full).
     */
    segments?: readonly number[];
    /** The fill axis. @default "horizontal" */
    orientation?: ScrollProgressRimOrientation;
    /**
     * CSS color anchors for the fill's spectrum. On the `border` edge the stroke
     * takes one ink, the first stop.
     */
    stops?: readonly string[];
    /**
     * `inset` (default) draws a track inside the host's edge. `border` draws the
     * progress as the host's own border: a stroke the border's width, traced around
     * the host's corners and filling along the axis, with nothing added at rest.
     * `segments` draw no checkpoints on the border. @default "inset"
     */
    edge?: ScrollProgressRimEdge;
}
