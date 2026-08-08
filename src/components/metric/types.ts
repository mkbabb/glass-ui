import type { HTMLAttributes } from "vue";

export type MetricValue = string | number | null | undefined;
export type MetricSize = "sm" | "md" | "lg" | "xl";
export type MetricDensity = "default" | "compact";

/**
 * How the atom arranges its own four parts. This axis is what `MetricCell` used to
 * be a separate component for: a cell is a POSTURE of one readout, not a second
 * readout. `row` is the term/reading split a `<MetricStack>` subgrid aligns on.
 */
export type MetricPosture = "inline" | "stacked" | "cell" | "row";

/** Which way a delta moved. Derived from a numeric `delta` when not stated. */
export type MetricPolarity = "up" | "down" | "flat";

export interface MetricValueProps {
    value?: MetricValue;
    unit?: string;
    placeholder?: string;
    loading?: boolean;
    /**
     * Compact the reading — `12400` reads `12.4K`. Runs through the family's one
     * data-shaping seam (`coalesceMetric`), never through a second formatter at a
     * call site.
     */
    compact?: boolean;
    /** BCP-47 locale for the compact form. Defaults to the runtime's. */
    locale?: string;
}

export interface MetricProps extends MetricValueProps {
    label?: string;
    context?: string;
    class?: HTMLAttributes["class"];
    size?: MetricSize;
    posture?: MetricPosture;
    /** The change beside the reading. A number carries its own polarity. */
    delta?: MetricValue;
    /** Override the derived polarity (for a string delta, or a reversed metric). */
    polarity?: MetricPolarity;
}

export interface MetricRowProps {
    class?: HTMLAttributes["class"];
}

export interface MetricStackProps {
    density?: MetricDensity;
    class?: HTMLAttributes["class"];
}
