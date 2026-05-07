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
        v-bind="delegatedProps"
        :class="cn(
            'absolute left-0 h-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] rounded-pill bg-secondary/80 transition-[width,transform] duration-[var(--duration-normal)] ease-[var(--spring-snappy)]',
            props.class,
        )"
    />
</template>
