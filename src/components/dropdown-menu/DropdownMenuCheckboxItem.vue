<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { Check } from "@lucide/vue";
import type { CheckedState } from "../_shared/selection";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuCheckboxItemProps {
    modelValue?: CheckedState;
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
}

export interface DropdownMenuCheckboxItemEmits {
    select: [event: Event];
    "update:modelValue": [value: boolean];
}

defineOptions({ name: "DropdownMenuCheckboxItem", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuCheckboxItemProps>(), {
    modelValue: false,
    disabled: false,
});
const emit = defineEmits<DropdownMenuCheckboxItemEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const CheckboxItemComp = useMenuPart("CheckboxItem");
const ItemIndicatorComp = useMenuPart("ItemIndicator");
</script>

<template>
    <component
        :is="CheckboxItemComp"
        v-bind="forwardedAttrs"
        as="div"
        :model-value="modelValue"
        :disabled="disabled"
        :text-value="textValue"
        data-slot="dropdown-menu-checkbox-item"
        data-indicator="wide"
        :class="cn('dropdown-menu__item interactive-item glass-menu-row', props.class)"
        @select="emit('select', $event)"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <span class="dropdown-menu__indicator">
            <component :is="ItemIndicatorComp">
                <Check aria-hidden="true" />
            </component>
        </span>
        <slot />
    </component>
</template>
