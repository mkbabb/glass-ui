<script setup lang="ts">
import { type HTMLAttributes, type ComputedRef, computed, inject } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { type TabsTriggerVariants, tabsTriggerVariants } from ".";
import { cn } from '@utils';

const props = defineProps<TabsTriggerProps & {
    class?: HTMLAttributes["class"];
    variant?: TabsTriggerVariants["variant"];
}>();

const tabsCtx = inject<{ variant: ComputedRef<TabsTriggerVariants["variant"]> } | null>("glassTabs", null);
const resolvedVariant = computed(() => props.variant ?? tabsCtx?.variant.value);

const delegatedProps = computed(() => {
    const { class: _, variant: __, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TabsTrigger
        v-bind="forwardedProps"
        :class="cn(tabsTriggerVariants({ variant: resolvedVariant }), props.class)"
    >
        <slot />
    </TabsTrigger>
</template>
