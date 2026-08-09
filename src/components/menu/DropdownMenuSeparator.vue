<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./context";

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
    <!-- The hairline reads the family's ONE divider ink (`.glass-menu-divider`,
       _shared/menu/menu.css), exactly as SelectSeparator and CommandSeparator
       already do. Its own rule painted `color-mix(in srgb, var(--border) 70%, …)`
       — the raw shadcn ink under the abrogation edict, and a THIRD spelling of one
       line inside one family. The geometry is the same 1px at `my-1 -mx-1`; only
       the ink changed hands. -->
    <component
        :is="SeparatorComp"
        v-bind="forwardedAttrs"
        as="div"
        data-slot="menu-separator"
        :class="cn('glass-menu-divider -mx-1 my-1', props.class)"
    />
</template>
