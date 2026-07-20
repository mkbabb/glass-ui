import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type {
    FocusOutsideEvent,
    ListboxItemSelectEvent,
    PointerDownOutsideEvent,
} from "./interaction";

/** Stable scalar identity used by Glass selection controls. */
export type SelectionValue = string | number;

/** Checkbox state, including the mixed state exposed through ARIA. */
export type CheckedState = boolean | "indeterminate";

/** Cardinality of a Glass selection model. */
export type SelectionMode = "single" | "multiple";

export function isSelectionValue(value: unknown): value is SelectionValue {
    return typeof value === "string" || typeof value === "number";
}

// ---------------------------------------------------------------------------
// The shared selection-list contract (V9 factoring). The reka Combobox substrate
// is the one collection-backed selection-list primitive; the `Command` family
// wraps it (CommandInput → RekaComboboxInput, CommandItem → RekaComboboxItem).
// These part contracts are the shared vocabulary that wrapper owns; they live
// here in `_shared` (not pasted into `command/`) so the fold is a factoring.
// ---------------------------------------------------------------------------

/** Stable scalar selection, with `null` representing no single selection. */
export type ComboboxValue = SelectionValue | null;

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

export interface ComboboxGroupProps {
    heading?: string;
    class?: HTMLAttributes["class"];
}

export interface ComboboxEmptyProps {
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
