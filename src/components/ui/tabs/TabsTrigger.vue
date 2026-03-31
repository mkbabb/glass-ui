<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "../../../utils";

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
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm p-1 px-3 text-sm font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--ring)_30%,transparent),0_0_8px_color-mix(in_srgb,var(--ring)_15%,transparent)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-[var(--active-tab-color,var(--foreground))] hover:text-foreground/70',
                props.class,
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
