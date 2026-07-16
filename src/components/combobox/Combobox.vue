<script setup lang="ts">
import { ComboboxRoot as RekaComboboxRoot } from "reka-ui";
import type {
    ComboboxComponentProps,
    ComboboxEmits,
    ComboboxModelValue,
    ComboboxValue,
} from "./types";
import { isSelectionValue } from "../_shared/selection";

// BI.W-MULTISELECT-FOLD — MultiSelect folded onto `<Combobox multiple>` (clean
// break, no alias). reka's ComboboxRoot carries the `multiple` capability natively
// (array v-model); glass-ui surfaces it first-class: the
// `data-multiple` hook + the forwarded root default-slot state (`open`, `modelValue`)
// let a consumer render chips-in-trigger from the LIVE model via the shared
// glass-chip capsule register (the TagsInput chip register) with no duplicated
// selection state. A single-select `<Combobox>` (multiple unset) is byte-identical.
defineOptions({ name: "Combobox", inheritAttrs: false });

const props = defineProps<ComboboxComponentProps>();
const emit = defineEmits<ComboboxEmits>();
defineSlots<{
    default?: (props: {
        open: boolean;
        modelValue: ComboboxModelValue | undefined;
    }) => unknown;
}>();

function isSingleValue(value: unknown): value is ComboboxValue {
    return value === null || isSelectionValue(value);
}

function resolveModelValue(value: unknown): ComboboxModelValue {
    const valid = props.multiple
        ? Array.isArray(value) && value.every(isSelectionValue)
        : isSingleValue(value);
    if (!valid) {
        throw new TypeError("[glass-ui] Combobox received an invalid model value.");
    }
    return value as ComboboxModelValue;
}

function updateModelValue(value: unknown): void {
    emit("update:modelValue", resolveModelValue(value));
}

function optionalModelValue(value: unknown): ComboboxModelValue | undefined {
    return value === undefined ? undefined : resolveModelValue(value);
}
</script>

<template>
    <RekaComboboxRoot
        data-slot="combobox"
        :data-multiple="props.multiple ? '' : undefined"
        :model-value="optionalModelValue(props.modelValue)"
        :default-value="optionalModelValue(props.defaultValue)"
        :multiple="props.multiple"
        :open="props.open"
        :default-open="props.defaultOpen"
        :disabled="props.disabled"
        :name="props.name"
        :required="props.required"
        @update:model-value="updateModelValue"
        @update:open="emit('update:open', $event)"
    >
        <template #default="{ open, modelValue }">
            <slot :open="open" :model-value="optionalModelValue(modelValue)" />
        </template>
    </RekaComboboxRoot>
</template>
