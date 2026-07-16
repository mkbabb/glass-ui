<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

export interface DropdownMenuShortcutProps {
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuShortcut", inheritAttrs: false });

const props = defineProps<DropdownMenuShortcutProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <span
        v-bind="forwardedAttrs"
        data-slot="dropdown-menu-shortcut"
        :class="cn('dropdown-menu__shortcut', props.class)"
    >
        <slot />
    </span>
</template>
