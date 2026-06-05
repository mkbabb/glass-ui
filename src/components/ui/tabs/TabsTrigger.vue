<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { cn } from '../../../utils';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TabsTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'focus-ring inline-flex items-center justify-center whitespace-nowrap rounded-sm p-1 px-3 text-sm font-medium transition-control disabled:pointer-events-none disabled:opacity-disabled data-[state=active]:text-[var(--active-tab-color,var(--foreground))] hover:text-foreground/70',
                props.class,
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
