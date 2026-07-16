<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuSeparatorProps {
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuSeparator", inheritAttrs: false });

const props = defineProps<DropdownMenuSeparatorProps>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const SeparatorComp = useMenuPart("Separator");
</script>

<template>
    <component
        :is="SeparatorComp"
        v-bind="forwardedAttrs"
        as="div"
        data-slot="dropdown-menu-separator"
        :class="cn('dropdown-menu__separator', props.class)"
    />
</template>
