import type { InputProps } from "../input";
import type { LabelRequirement } from "../label";
import type { SliderProps } from "../slider";
import type { SwitchProps } from "../switch";

export type LabeledFieldLayout = "default" | "horizontal";
export type LabeledFieldErrorLive = "off" | "polite" | "assertive";

export interface LabeledFieldCommonProps {
    label: string;
    description?: string;
    requirement?: LabelRequirement;
    layout?: LabeledFieldLayout;
    errorLive?: LabeledFieldErrorLive;
}

export interface LabeledFieldProps extends LabeledFieldCommonProps {
    invalid?: boolean;
    disabled?: boolean;
    /**
     * Whether the control is a native labelable element (`input`, `select`, native
     * `button`) the label's `for` can target. Defaults to `true`. Composite controls
     * whose root is a non-labelable element — e.g. reka Slider's `span` root — set
     * this `false` so the label drops the invalid `for` and the control names itself
     * through `aria-labelledby` (the slot's `labelledBy`) instead.
     */
    controlLabelable?: boolean;
}

export interface LabeledFieldSlotProps {
    controlId: string;
    labelledBy: string;
    describedBy?: string;
    errorId?: string;
    invalid: boolean;
    disabled: boolean;
    required: boolean;
}

export type LabeledInputProps = Omit<InputProps, "class"> & LabeledFieldCommonProps;

export interface LabeledSelectProps extends LabeledFieldCommonProps {
    modelValue: string;
    items: readonly string[];
    open?: boolean;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
}

export type LabeledSliderProps = Omit<SliderProps, "class" | "modelValue"> &
    LabeledFieldCommonProps & { modelValue: number };

export type LabeledSwitchProps = Omit<SwitchProps, "class" | "modelValue"> &
    LabeledFieldCommonProps & {
        modelValue: boolean;
    };
