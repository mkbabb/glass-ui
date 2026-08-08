import type { Orientation } from "../_shared/axes";

/** The rim's fill axis — the library's ONE orientation union. */
export type ScrollProgressRimOrientation = Orientation;

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
    /** CSS color anchors for the fill's spectrum. */
    stops?: readonly string[];
}
