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
