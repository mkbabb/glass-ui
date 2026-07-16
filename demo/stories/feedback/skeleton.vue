<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Skeleton } from "@glass/components/skeleton";
</script>

<template>
    <StoryPage>
        <StorySection label="text">
            <ShowcaseFrame
                class="flex max-w-xl flex-col gap-3"
                aria-busy="true"
                aria-label="Loading article summary"
            >
                <Skeleton class="h-5 w-2/5" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-11/12" />
                <Skeleton class="h-4 w-3/5" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="avatar">
            <ShowcaseFrame
                class="flex max-w-md items-center gap-4"
                aria-busy="true"
                aria-label="Loading profile"
            >
                <Skeleton class="size-12 shrink-0 rounded-full" />
                <div class="flex min-w-0 flex-1 flex-col gap-2">
                    <Skeleton class="h-4 w-2/5" />
                    <Skeleton class="h-3 w-3/5" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="card">
            <ShowcaseFrame
                class="flex max-w-lg flex-col gap-4"
                aria-busy="true"
                aria-label="Loading project card"
            >
                <Skeleton class="aspect-[16/9] w-full rounded-card" />
                <Skeleton class="h-5 w-1/2" />
                <div class="flex flex-col gap-2">
                    <Skeleton class="h-3.5 w-full" />
                    <Skeleton class="h-3.5 w-4/5" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="light · dark · reduced motion">
            <ShowcaseFrame class="flex max-w-xl flex-col gap-4">
                <p class="text-small text-muted-foreground">
                    The reserved shapes follow the active color scheme. Their scan
                    becomes a static highlight when reduced motion is requested.
                </p>
                <Skeleton data-testid="skeleton-motion" class="h-8 w-full" />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
