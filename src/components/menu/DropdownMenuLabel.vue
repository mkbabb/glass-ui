<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./context";

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
        data-slot="menu-label"
        :data-inset="inset ? '' : undefined"
        :class="cn('menu__label', props.class)"
    >
        <slot />
    </component>
</template>
