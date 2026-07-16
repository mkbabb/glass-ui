<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectGroupProps {
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectGroup as RekaSelectGroup } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectGroup", inheritAttrs: false });

const props = defineProps<SelectGroupProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaSelectGroup v-bind="forwardedAttrs" :class="cn('p-1 w-full', props.class)">
        <slot />
    </RekaSelectGroup>
</template>
