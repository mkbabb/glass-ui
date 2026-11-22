<script setup lang="ts">
import { Skeleton } from "@glass/components/skeleton";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SkeletonStage from "./skeleton.stage.vue";

const snippet = `<script setup lang="ts">
import { Skeleton } from "@mkbabb/glass-ui/skeleton";
<\/script>

<template>
    <div aria-busy="true" aria-label="Loading">
        <Skeleton class="h-4 w-2/5" />
        <Skeleton shimmer class="aspect-video w-full rounded-card" />
    </div>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <SkeletonStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Shapes">
                    <div class="skeleton-row-text" aria-busy="true" aria-label="Loading text">
                        <Skeleton class="h-4 w-full" />
                        <Skeleton class="h-4 w-4/5" />
                        <Skeleton class="h-4 w-3/5" />
                    </div>
                    <div class="skeleton-row-avatar" aria-busy="true" aria-label="Loading a profile">
                        <Skeleton class="size-10 shrink-0 rounded-full" />
                        <div class="skeleton-row-text">
                            <Skeleton class="h-4 w-full" />
                            <Skeleton class="h-3 w-3/5" />
                        </div>
                    </div>
                    <div class="skeleton-row-card" aria-busy="true" aria-label="Loading a card">
                        <Skeleton class="aspect-[16/9] w-full rounded-card" />
                        <Skeleton class="h-4 w-1/2" />
                    </div>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.skeleton-row-text {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    inline-size: 10rem;
}
.skeleton-row-avatar {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
}
.skeleton-row-card {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    inline-size: 9rem;
}
</style>
