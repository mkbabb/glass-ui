<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { CollapsibleTrigger as RekaCollapsibleTrigger } from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";
import { cn } from "../_shared/class-names";
import { useDisclosureIds } from "../_shared/disclosure-context";

export interface CollapsibleTriggerProps {
    /** Merge disclosure behavior into one interactive child. */
    asChild?: PrimitiveProps["asChild"];
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "CollapsibleTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
    asChild: false,
});
defineSlots<{ default?: () => unknown }>();

const ids = useDisclosureIds();
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { as: _as, ...forwarded } = attrs;
    return forwarded;
});
</script>

<template>
    <RekaCollapsibleTrigger
        v-bind="forwardedAttrs"
        as="button"
        :as-child="asChild"
        data-slot="collapsible-trigger"
        data-disclosure="collapsible"
        :id="ids.trigger"
        :aria-controls="ids.content"
        :class="cn('disclosure-trigger', props.class)"
    >
        <slot />
    </RekaCollapsibleTrigger>
</template>
