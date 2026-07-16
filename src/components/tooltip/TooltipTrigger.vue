<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { TooltipTrigger as RekaTooltipTrigger } from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";

export interface TooltipTriggerProps {
    /** Merge trigger behavior into one interactive child. */
    asChild?: PrimitiveProps["asChild"];
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "TooltipTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
    asChild: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { as: _as, reference: _reference, ...forwarded } = attrs;
    return props.asChild ? forwarded : { ...forwarded, type: "button" };
});
</script>

<template>
    <RekaTooltipTrigger
        v-bind="forwardedAttrs"
        as="button"
        :as-child="asChild"
        :class="props.class"
    >
        <slot />
    </RekaTooltipTrigger>
</template>
