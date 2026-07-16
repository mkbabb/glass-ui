<script lang="ts">
import type { Direction, FormFieldProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface SelectProps extends FormFieldProps {
    modelValue?: SelectionValue;
    defaultValue?: SelectionValue;
    open?: boolean;
    defaultOpen?: boolean;
    nullableValue?: string;
    dir?: Direction;
    autocomplete?: string;
    disabled?: boolean;
}

export interface SelectEmits {
    "update:modelValue": [value: SelectionValue];
    "update:open": [value: boolean];
}
</script>

<script setup lang="ts">
import { SelectRoot as RekaSelectRoot, useForwardProps } from "reka-ui";
import { isSelectionValue } from "../_shared/selection";

defineOptions({ name: "Select", inheritAttrs: false });

const props = defineProps<SelectProps>();
const emit = defineEmits<SelectEmits>();
const forwarded = useForwardProps(props);

function updateModelValue(value: unknown): void {
    if (!isSelectionValue(value)) {
        throw new TypeError("[glass-ui] Select received a non-scalar value.");
    }
    emit("update:modelValue", value);
}
</script>

<template>
    <RekaSelectRoot
        data-slot="select"
        v-bind="forwarded"
        @update:model-value="updateModelValue"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaSelectRoot>
</template>
