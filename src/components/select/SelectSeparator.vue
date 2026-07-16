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
    <!-- BC.W-DROPDOWN-FIX / DESHADCN census — the divider hairline reads the WARM
       ink, not the neutral shadcn `bg-muted` slab (the residual the census names
       for the select band). `color-mix(in srgb, var(--foreground) N%, transparent)`
       is the warm-hairline identity (re-tints under .dark via --foreground, the same
       seam the menu-section `--border-hairline` reads). Clean break, no alias. -->
    <RekaSelectSeparator
        v-bind="forwardedAttrs"
        :class="
            cn(
                '-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]',
                props.class,
            )
        "
    />
</template>
