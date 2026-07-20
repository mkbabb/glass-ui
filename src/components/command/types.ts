import type { HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { DialogProps } from "../dialog/Dialog.vue";
import type { ComboboxValue } from "../_shared/selection";

export interface CommandProps {
    modelValue?: ComboboxValue;
    open?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
    surface?: Surface;
}

export interface CommandEmits {
    "update:modelValue": [value: ComboboxValue];
    "update:open": [value: boolean];
}

export interface CommandDialogProps extends DialogProps {
    surface?: Surface;
    modelValue?: ComboboxValue;
}

export interface CommandDialogEmits {
    "update:open": [value: boolean];
    "update:modelValue": [value: ComboboxValue];
}

export interface CommandListProps {
    class?: HTMLAttributes["class"];
    surface?: Surface;
}
