<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsIndicator, type TabsIndicatorProps } from "reka-ui";
import { cn } from '../../../utils';

const props = defineProps<TabsIndicatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <TabsIndicator
        data-slot="tabs-indicator"
        v-bind="delegatedProps"
        :class="cn(
            'pointer-events-none absolute left-0 bottom-1 top-1 z-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-pill bg-secondary/80 transition-[width,translate] duration-normal ease-spring-snappy',
            props.class,
        )"
    />
</template>
