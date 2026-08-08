import type { InputNativeAttrs, InputProps } from "../input";
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

// `InputNativeAttrs` is re-stated here on purpose. Input keeps the native
// form/constraint surface OUT of its runtime props (`/* @vue-ignore *\/` — they ride
// `$attrs` to the element), and a wrapper cannot forward what it never received: a
// LabeledInput that stopped DECLARING `required`/`placeholder`/`name` would let them
// fall through to the labeled-field ROOT instead of reaching the control. The wrapper
// declares them, `controlProps` hands them to Input, and Input's own `$attrs` path
// puts them on the element.
export type LabeledInputProps = Omit<InputProps, "class"> &
    InputNativeAttrs &
    LabeledFieldCommonProps;

export type LabeledSliderProps = Omit<SliderProps, "class" | "modelValue"> &
    LabeledFieldCommonProps & { modelValue: number };

export type LabeledSwitchProps = Omit<SwitchProps, "class" | "modelValue"> &
    LabeledFieldCommonProps & {
        modelValue: boolean;
    };
