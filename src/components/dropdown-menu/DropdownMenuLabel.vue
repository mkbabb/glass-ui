<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuLabelProps {
    inset?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuLabel", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuLabelProps>(), {
    inset: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const LabelComp = useMenuPart("Label");
</script>

<template>
    <component
        :is="LabelComp"
        v-bind="forwardedAttrs"
        as="div"
        data-slot="dropdown-menu-label"
        :data-inset="inset ? '' : undefined"
        :class="cn('dropdown-menu__label', props.class)"
    >
        <slot />
    </component>
</template>
