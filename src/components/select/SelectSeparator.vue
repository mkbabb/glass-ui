<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectSeparatorProps {
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectSeparator as RekaSelectSeparator } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectSeparator", inheritAttrs: false });

const props = defineProps<SelectSeparatorProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <!-- The hairline reads the family's ONE divider ink (`.glass-menu-divider`,
       _shared/menu/menu.css) rather than spelling its own percentage — the select
       band and the command palette used to disagree by 4 points on the same line
       inside the same plate. The negative inline margin bleeds it to the plate's
       inner edge past the 4px viewport inset. -->
    <RekaSelectSeparator
        v-bind="forwardedAttrs"
        :class="cn('glass-menu-divider -mx-1 my-1', props.class)"
    />
</template>
