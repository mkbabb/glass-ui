import type { HTMLAttributes } from "vue";
import type { Motion, Orientation } from "../_shared/axes";
import type { Direction, FormFieldProps } from "../_shared/primitive";

/**
 * `scrubber` is the continuous-cylinder recipe — one glass segment with a disc thumb
 * inscribed in its leading end, never narrower than that disc. `spectrum` is the gradient colour-picker
 * recipe with a visible slim squircle handle.
 */
export type SliderVariant = "scrubber" | "spectrum";
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
    motion?: Motion;
    /**
     * Humane readout for assistive tech — the string a screen reader hears instead of
     * the raw number. Authored per thumb onto `aria-valuetext`; reka mints none.
     */
    valueText?: (value: number, index: number) => string;
    /**
     * The expanded view: a rounded shell grows out of the track and the thumb grows in
     * it while the slider is pressed, keyboard-focused or hovered after a dwell, and
     * both shrink back when none holds. With `valueText`, the readout rides above the
     * thumb while the value is being changed.
     */
    expand?: boolean;
}
