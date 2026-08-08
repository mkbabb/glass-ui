<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectLabelProps {
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectLabel as RekaSelectLabel } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectLabel", inheritAttrs: false });

const props = defineProps<SelectLabelProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { for: _for, ...forwarded } = fixedHostAttrs(attrs);
    return forwarded;
});
</script>

<template>
    <!-- The section label reads the family SECONDARY rung
       (`text-dropdown-secondary`), resolving the witness-2 scale contradiction (the
       label role now matches the Command group-heading scale family-wide).
       Its inline inset IS the option gutter — `ps-7`, the same 28px the indicator
       arm of `rowClass` reserves — so a heading and the rows beneath it share one
       text edge. The former `pl-8` was a fourth number nobody could derive. -->
    <RekaSelectLabel
        v-bind="forwardedAttrs"
        :class="
            cn('py-1 ps-7 pe-2 text-dropdown-secondary font-semibold', props.class)
        "
    >
        <slot />
    </RekaSelectLabel>
</template>
