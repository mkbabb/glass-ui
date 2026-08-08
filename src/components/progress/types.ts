import type { HTMLAttributes } from "vue";
import type { Orientation } from "../_shared/axes";
import type { PrimitiveProps } from "../_shared/primitive";

export type ProgressVariant = "default" | "liquid";
export type ProgressStatus = "default" | "error";
export type ProgressOrientation = Orientation;
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends PrimitiveProps {
    /**
     * The quantity, in the `max` domain. `null` is INDETERMINATE — reka's own
     * door, and the only one. Default `0`: omission fabricates nothing.
     */
    modelValue?: number | null;
    max?: number;
    class?: HTMLAttributes["class"];
    variant?: ProgressVariant;
    status?: ProgressStatus;
    orientation?: ProgressOrientation;
    /** The rail thickness rung — 8 / 12 / 20px, one rung down at ≤768px. */
    size?: ProgressSize;
    /** Decorative checkpoints in the value domain; they never alter progress. */
    marks?: readonly number[];
    /**
     * The human-readable value announcement (`aria-valuetext`). Defaults to the
     * rounded percentage; indeterminate reads "in progress", error reads
     * "failed at N%". The NAME channel is the consumer's `aria-label`.
     */
    valueText?: string;
}
