import type { HTMLAttributes } from "vue";
import type { Motion, Orientation } from "../_shared/axes";
import type { Direction, FormFieldProps } from "../_shared/primitive";

export type SliderVariant = "standard" | "spectrum";
export type SliderSize = "sm" | "md" | "lg";

export interface SliderProps extends FormFieldProps {
    modelValue?: number[] | null;
    defaultValue?: number[];
    disabled?: boolean;
    orientation?: Orientation;
    dir?: Direction;
    inverted?: boolean;
    min?: number;
    max?: number;
    step?: number;
    minStepsBetweenThumbs?: number;
    class?: HTMLAttributes["class"];
    variant?: SliderVariant;
    size?: SliderSize;
    /** Decorative checkpoints in the numeric domain; they never snap the value. */
    marks?: readonly number[];
    invalid?: boolean;
    keepDockOpen?: boolean;
    motion?: Motion;
}
