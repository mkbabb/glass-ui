<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuGroupProps {
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuGroup", inheritAttrs: false });

const props = defineProps<DropdownMenuGroupProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const GroupComp = useMenuPart("Group");
</script>

<template>
    <component
        :is="GroupComp"
        v-bind="forwardedAttrs"
        as="div"
        data-slot="dropdown-menu-group"
        :class="cn(props.class)"
    >
        <slot />
    </component>
</template>
