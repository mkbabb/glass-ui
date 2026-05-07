<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Skeleton } from "../../../src/components/ui/skeleton";
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <p class="section-label">variants</p>
            <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex flex-col gap-2">
                    <p class="font-mono text-xs text-muted-foreground">pulse</p>
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-4/5" />
                    <Skeleton class="h-4 w-2/3" />
                </div>
                <div class="flex flex-col gap-2">
                    <p class="font-mono text-xs text-muted-foreground">shimmer</p>
                    <Skeleton variant="shimmer" class="h-4 w-full" />
                    <Skeleton variant="shimmer" class="h-4 w-4/5" />
                    <Skeleton variant="shimmer" class="h-4 w-2/3" />
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">card skeleton</p>
            <div class="grid gap-6 sm:grid-cols-2">
                <div
                    class="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/60 p-5 shadow-sm"
                >
                    <div class="flex items-center gap-3">
                        <Skeleton class="size-10 rounded-full" />
                        <div class="flex flex-1 flex-col gap-2">
                            <Skeleton class="h-3.5 w-1/2" />
                            <Skeleton class="h-3 w-1/3" />
                        </div>
                    </div>
                    <Skeleton class="aspect-[16/9] w-full rounded-lg" />
                    <div class="flex flex-col gap-2">
                        <Skeleton class="h-3.5 w-full" />
                        <Skeleton class="h-3.5 w-11/12" />
                        <Skeleton class="h-3.5 w-3/4" />
                    </div>
                    <div class="flex items-center justify-between">
                        <Skeleton class="h-8 w-24 rounded-full" />
                        <Skeleton class="h-8 w-16 rounded-full" />
                    </div>
                </div>

                <div
                    class="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/60 p-5 shadow-sm"
                >
                    <div class="flex items-center gap-3">
                        <Skeleton variant="shimmer" class="size-10 rounded-full" />
                        <div class="flex flex-1 flex-col gap-2">
                            <Skeleton variant="shimmer" class="h-3.5 w-1/2" />
                            <Skeleton variant="shimmer" class="h-3 w-1/3" />
                        </div>
                    </div>
                    <Skeleton variant="shimmer" class="aspect-[16/9] w-full rounded-lg" />
                    <div class="flex flex-col gap-2">
                        <Skeleton variant="shimmer" class="h-3.5 w-full" />
                        <Skeleton variant="shimmer" class="h-3.5 w-11/12" />
                        <Skeleton variant="shimmer" class="h-3.5 w-3/4" />
                    </div>
                    <div class="flex items-center justify-between">
                        <Skeleton variant="shimmer" class="h-8 w-24 rounded-full" />
                        <Skeleton variant="shimmer" class="h-8 w-16 rounded-full" />
                    </div>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">list rows</p>
            <div class="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4">
                <div
                    v-for="row in 4"
                    :key="row"
                    class="flex items-center gap-3"
                >
                    <Skeleton variant="shimmer" class="size-8 rounded-md" />
                    <div class="flex flex-1 flex-col gap-1.5">
                        <Skeleton variant="shimmer" class="h-3.5 w-1/3" />
                        <Skeleton variant="shimmer" class="h-3 w-1/2" />
                    </div>
                    <Skeleton variant="shimmer" class="h-3 w-10" />
                </div>
            </div>
        </section>
    </StoryPage>
</template>
