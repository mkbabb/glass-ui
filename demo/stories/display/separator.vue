<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Separator } from "@glass/components/separator";
</script>

<template>
    <StoryPage>
        <StorySection label="horizontal · semantic">
            <ShowcaseFrame class="flex flex-col gap-4">
                <p class="text-small text-foreground">Identity</p>
                <Separator />
                <p class="text-small text-muted-foreground">
                    A semantic boundary separates adjacent subjects.
                </p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="horizontal · decorative">
            <ShowcaseFrame class="flex flex-col gap-4">
                <p class="text-small text-foreground">Two details in one subject</p>
                <Separator decorative />
                <p class="text-small text-muted-foreground">
                    This hairline groups visually without entering the accessibility
                    tree.
                </p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="labelled">
            <ShowcaseFrame class="flex flex-col gap-5">
                <p class="text-small text-foreground">Continue with email</p>
                <Separator label="or" />
                <p class="text-small text-foreground">Continue with a passkey</p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="vertical · semantic">
            <ShowcaseFrame class="flex min-h-16 items-stretch gap-5">
                <span class="self-center text-small text-foreground">Overview</span>
                <Separator orientation="vertical" />
                <span class="self-center text-small text-foreground">Activity</span>
                <Separator orientation="vertical" />
                <span class="self-center text-small text-foreground">History</span>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
