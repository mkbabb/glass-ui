<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type { SelectionValue } from "../_shared/selection";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./context";

export interface DropdownMenuRadioItemProps {
    value: SelectionValue;
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
}

export interface DropdownMenuRadioItemEmits {
    select: [event: Event];
}

defineOptions({ name: "DropdownMenuRadioItem", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuRadioItemProps>(), {
    disabled: false,
});
const emit = defineEmits<DropdownMenuRadioItemEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const RadioItemComp = useMenuPart("RadioItem");
const ItemIndicatorComp = useMenuPart("ItemIndicator");
</script>

<template>
    <component
        :is="RadioItemComp"
        v-bind="forwardedAttrs"
        as="div"
        :value="value"
        :disabled="disabled"
        :text-value="textValue"
        data-slot="menu-radio-item"
        data-indicator="start"
        :class="cn('menu__item interactive-item glass-menu-row', props.class)"
        @select="emit('select', $event)"
    >
        <span class="menu__indicator">
            <component :is="ItemIndicatorComp">
                <span class="menu__radio-dot"></span>
            </component>
        </span>
        <slot />
    </component>
</template>
