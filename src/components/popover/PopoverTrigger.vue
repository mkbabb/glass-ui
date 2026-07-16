<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    HoverCardTrigger as RekaHoverCardTrigger,
    PopoverTrigger as RekaPopoverTrigger,
} from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";
import { usePopoverUnion } from "./popoverContext";

export interface PopoverTriggerProps {
    /** Merge trigger behavior into one interactive child. */
    asChild?: PrimitiveProps["asChild"];
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "PopoverTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
    asChild: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { as: _as, reference: _reference, ...forwarded } = attrs;
    return props.asChild ? forwarded : { ...forwarded, type: "button" };
});
const union = usePopoverUnion();
const usesHoverRoot = computed(() => union?.usesHoverRoot.value ?? false);
</script>

<template>
    <RekaHoverCardTrigger
        v-if="usesHoverRoot"
        v-bind="forwardedAttrs"
        as="button"
        :as-child="asChild"
        :class="props.class"
    >
        <slot />
    </RekaHoverCardTrigger>

    <RekaPopoverTrigger
        v-else
        v-bind="forwardedAttrs"
        as="button"
        :as-child="asChild"
        :class="props.class"
    >
        <slot />
    </RekaPopoverTrigger>
</template>
