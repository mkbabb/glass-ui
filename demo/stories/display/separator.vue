<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Separator } from "@glass/components/separator";
</script>

<template>
    <StoryPage>
        <!-- ONE PLATE. These were two ~620px twin plates painting an identical
             hairline; the whole delta between them is in the accessibility tree,
             where a plate cannot show it. The delta is now stated in copy, which
             is the only place it was ever visible. -->
        <StorySection label="horizontal · semantic vs decorative">
            <ShowcaseFrame class="flex flex-col gap-4">
                <p class="text-small text-foreground">Identity</p>
                <Separator />
                <p class="text-small text-muted-foreground">
                    A semantic boundary separates adjacent subjects — it carries
                    <code>role="separator"</code> into the accessibility tree.
                </p>
                <Separator decorative />
                <p class="text-small text-muted-foreground">
                    The decorative arm paints the identical hairline and groups
                    visually only; it takes <code>role="none"</code> and never
                    reaches the tree. Same ink, same box, different contract.
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
