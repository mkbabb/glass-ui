<script setup lang="ts">
import { computed, ref, toRef } from "vue";
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

// The loading/exhausted state flips silently to AT (the sentinel is aria-hidden).
// A polite live region announces the transitions — the SortableList sr-only model.
const announcement = computed(() =>
    props.isLoading
        ? "Loading more items"
        : !props.hasMore
          ? "All items loaded"
          : "",
);
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
        <div v-else-if="!hasMore" class="py-4 text-center text-small text-muted-foreground">
            <slot name="end" />
        </div>

        <!-- Polite announce of the loading→exhausted transitions (the sentinel is
             aria-hidden; the state flips were otherwise silent to AT). -->
        <span class="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {{ announcement }}
        </span>
    </div>
</template>
