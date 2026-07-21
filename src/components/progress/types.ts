import type { HTMLAttributes } from "vue";
import type { Orientation } from "../_shared/axes";
import type { PrimitiveProps } from "../_shared/primitive";

export type ProgressVariant = "default" | "gradient" | "liquid";
export type ProgressStatus = "default" | "error";
export type ProgressOrientation = Orientation;

export interface ProgressProps extends PrimitiveProps {
    modelValue?: number | null;
    max?: number;
    class?: HTMLAttributes["class"];
    variant?: ProgressVariant;
    status?: ProgressStatus;
    orientation?: ProgressOrientation;
    /** Decorative checkpoints in the value domain; they never alter progress. */
    marks?: readonly number[];
    indeterminate?: boolean;
}
