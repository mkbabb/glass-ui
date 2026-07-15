<script setup lang="ts">
import { ref, toRef } from "vue";
import { useInfiniteScroll } from "./composables";

const props = withDefaults(
    defineProps<{
        /** Whether more data is available */
        hasMore: boolean;
        /** Whether data is currently loading */
        isLoading: boolean;
        /** Distance from bottom to trigger (px) */
        threshold?: number;
    }>(),
    {
        threshold: 200,
    },
);

const emit = defineEmits<{
    "load-more": [];
}>();

const scrollContainer = ref<HTMLElement | null>(null);

const { sentinelRef } = useInfiniteScroll({
    scrollContainer,
    threshold: props.threshold,
    hasMore: toRef(() => props.hasMore),
    isLoading: toRef(() => props.isLoading),
    onLoadMore: () => emit("load-more"),
});

// Re-expose for the template — the destructured binding above isn't picked
// up by Vue's template-ref auto-binding when the source is a composable.
defineExpose({ sentinelRef });
</script>

<template>
    <div ref="scrollContainer">
        <slot />

        <!-- Sentinel observed by IntersectionObserver -->
        <div ref="sentinelRef" class="h-px w-full" aria-hidden="true" />

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-center py-4">
            <slot name="loading">
                <!-- rounded-pill on a square box is the circular spinner ring -->
                <div
                    class="h-5 w-5 animate-spin rounded-pill border-2 border-muted-foreground border-t-transparent"
                />
            </slot>
        </div>

        <!-- End of list -->
        <div v-else-if="!hasMore" class="py-4 text-center text-sm text-muted-foreground">
            <slot name="end" />
        </div>
    </div>
</template>
