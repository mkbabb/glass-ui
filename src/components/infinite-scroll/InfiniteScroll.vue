<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import DotRing from "../_shared/feedback/DotRing.vue";
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

        <!-- Loading indicator. The house work-in-flight mark (BK #28): seven beads
             whose unequal sizes rotate at conserved area. The <Transition> is what
             lets the ring RE-FUSE when the page lands — a bare `v-if` unmounts on the
             frame the load finishes and the hand-off never paints. The classes land on
             THIS row, which is why the register carries a root-level leave arm: Vue
             measures the leave clock on the transitioned element itself, so the row
             holds the fade and the descendant arm draws the ring's mass home inside
             it. -->
        <Transition name="glass-dot-ring">
            <div v-if="isLoading" class="flex justify-center py-4">
                <slot name="loading">
                    <DotRing class="text-muted-foreground" />
                </slot>
            </div>
        </Transition>

        <!-- End of list. No longer a `v-else-if` off the loading row: that row is now
             wrapped in a <Transition> and an else-branch cannot chain across it. The
             predicate carries the same condition it always did, spelled out. -->
        <div
            v-if="!isLoading && !hasMore"
            class="py-4 text-center text-small text-muted-foreground"
        >
            <slot name="end" />
        </div>

        <!-- Polite announce of the loading→exhausted transitions (the sentinel is
             aria-hidden; the state flips were otherwise silent to AT). -->
        <span class="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {{ announcement }}
        </span>
    </div>
</template>
