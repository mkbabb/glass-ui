<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type { SelectionValue } from "../_shared/selection";
import { isSelectionValue } from "../_shared/selection";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuRadioGroupProps {
    modelValue?: SelectionValue;
    class?: HTMLAttributes["class"];
}

export interface DropdownMenuRadioGroupEmits {
    "update:modelValue": [value: SelectionValue];
}

defineOptions({ name: "DropdownMenuRadioGroup", inheritAttrs: false });

const props = defineProps<DropdownMenuRadioGroupProps>();
const emit = defineEmits<DropdownMenuRadioGroupEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const RadioGroupComp = useMenuPart("RadioGroup");

function updateModelValue(value: unknown): void {
    if (!isSelectionValue(value)) {
        throw new TypeError("[glass-ui] DropdownMenuRadioGroup received a non-scalar value.");
    }
    emit("update:modelValue", value);
}
</script>

<template>
    <component
        :is="RadioGroupComp"
        v-bind="forwardedAttrs"
        as="div"
        :model-value="modelValue"
        data-slot="dropdown-menu-radio-group"
        :class="cn(props.class)"
        @update:model-value="updateModelValue"
    >
        <slot />
    </component>
</template>
