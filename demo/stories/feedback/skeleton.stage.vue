<script setup lang="ts">
// Skeleton's stage: a post that has not loaded yet, its author, text and picture held
// by shapes with one sheen travelling across them.
import { Skeleton } from "@glass/components/skeleton";
</script>

<template>
    <div class="skeleton-stage" aria-busy="true" aria-label="Loading a post">
        <div class="skeleton-stage-author">
            <Skeleton shimmer class="size-12 shrink-0 rounded-full" />
            <div class="skeleton-stage-lines">
                <Skeleton shimmer class="h-4 w-2/5" />
                <Skeleton shimmer class="h-3 w-1/4" />
            </div>
        </div>
        <div class="skeleton-stage-lines">
            <Skeleton shimmer class="h-4 w-full" />
            <Skeleton shimmer class="h-4 w-11/12" />
            <Skeleton shimmer class="h-4 w-3/5" />
        </div>
        <Skeleton shimmer class="aspect-[16/7] w-full rounded-card" />
    </div>
</template>

<style scoped>
.skeleton-stage {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    inline-size: min(34rem, 100cqi);
}
.skeleton-stage-author {
    display: flex;
    align-items: center;
    gap: var(--sp-4);
}
.skeleton-stage-lines {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--sp-2);
}
</style>
