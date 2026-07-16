import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { FloatingPlacementProps } from "../_shared/floating";
import type {
    FocusOutsideEvent,
    ListboxItemSelectEvent,
    PointerDownOutsideEvent,
} from "../_shared/interaction";
import type { FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

/** Stable scalar selection, with `null` representing no single selection. */
export type ComboboxValue = SelectionValue | null;
export type ComboboxModelValue = ComboboxValue | SelectionValue[];

interface ComboboxCommonProps extends FormFieldProps {
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
}

interface SingleComboboxProps extends ComboboxCommonProps {
    multiple?: false;
    modelValue?: ComboboxValue;
    defaultValue?: ComboboxValue;
}

interface MultipleComboboxProps extends ComboboxCommonProps {
    multiple: true;
    modelValue?: SelectionValue[];
    defaultValue?: SelectionValue[];
}

export type ComboboxProps = SingleComboboxProps | MultipleComboboxProps;

/**
 * Vue's runtime component projection of the discriminated selection contract.
 * Prefer `ComboboxProps` when constructing props as data.
 */
export interface ComboboxComponentProps extends ComboboxCommonProps {
    multiple?: boolean;
    modelValue?: ComboboxModelValue;
    defaultValue?: ComboboxModelValue;
}

export interface ComboboxEmits {
    "update:modelValue": [value: ComboboxModelValue];
    "update:open": [value: boolean];
}

export interface ComboboxAnchorProps {
    class?: HTMLAttributes["class"];
}

export interface ComboboxTriggerProps {
    asChild?: PrimitiveProps["asChild"];
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

export interface ComboboxInputProps {
    modelValue?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    placeholder?: InputHTMLAttributes["placeholder"];
    class?: HTMLAttributes["class"];
}

export interface ComboboxInputEmits {
    "update:modelValue": [value: string];
}

export interface ComboboxItemProps {
    value: SelectionValue;
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
}

export interface ComboboxItemEmits {
    select: [event: ListboxItemSelectEvent<SelectionValue>];
}

export interface ComboboxItemIndicatorProps {
    class?: HTMLAttributes["class"];
}

export interface ComboboxGroupProps {
    heading?: string;
    class?: HTMLAttributes["class"];
}

export interface ComboboxEmptyProps {
    class?: HTMLAttributes["class"];
}

export interface ComboboxListProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
}

export interface ComboboxListEmits {
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
    focusOutside: [event: FocusOutsideEvent];
    interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
}

export interface ComboboxSeparatorProps {
    class?: HTMLAttributes["class"];
}
