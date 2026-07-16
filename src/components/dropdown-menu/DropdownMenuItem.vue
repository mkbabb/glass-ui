<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuItemProps {
    disabled?: boolean;
    /** Text used by the menu's typeahead engine when slot text is not sufficient. */
    textValue?: string;
    inset?: boolean;
    class?: HTMLAttributes["class"];
}

export interface DropdownMenuItemEmits {
    /** Cancel this event to keep the menu open. */
    select: [event: Event];
}

defineOptions({ name: "DropdownMenuItem", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
    disabled: false,
    inset: false,
});
const emit = defineEmits<DropdownMenuItemEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const ItemComp = useMenuPart("Item");
</script>

<template>
    <component
        :is="ItemComp"
        v-bind="forwardedAttrs"
        as="div"
        :disabled="disabled"
        :text-value="textValue"
        data-slot="dropdown-menu-item"
        :data-inset="inset ? '' : undefined"
        :class="cn('dropdown-menu__item interactive-item glass-menu-row', props.class)"
        @select="emit('select', $event)"
    >
        <slot />
    </component>
</template>
