<script setup lang="ts">
// The hand voice: four gestures from one pen, over the paper grain.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { HandMark } from "@glass/components/handmark";

const drawn = ref<{ play: () => void } | null>(null);
function replay() {
    drawn.value?.play();
}
</script>

<template>
    <StoryPage>
        <!-- Three rungs of the one type ladder, so the mark can be seen holding its
             proportion rather than asserted to. -->
        <StorySection
            heading="The hand voice"
            label="underline"
            blurb="Lay a hand-drawn line under a word. The word stays real, selectable text, so a screen reader still reads the plain sentence. The line grows with the type it marks."
        >
            <div
                class="paper-grain-overlay flex flex-col gap-5 rounded-card border bg-card p-5 font-display text-foreground"
            >
                <p class="text-[calc(var(--type-body)*2.618)] leading-[1.05]">
                    Who <HandMark>pays in</HandMark> gets connected
                </p>
                <p class="text-[calc(var(--type-body)*1.618)] leading-[1.2]">
                    Who <HandMark>pays in</HandMark> gets connected
                </p>
                <p class="text-[var(--type-body)] leading-[1.5]">
                    Who <HandMark>pays in</HandMark> gets connected
                </p>
            </div>
        </StorySection>

        <StorySection
            label="strike"
            blurb="A line drawn through a word, the way you would cross one out by hand. The struck words are marked up as struck, so the meaning survives without the mark."
        >
            <div
                class="paper-grain-overlay rounded-card border bg-card p-5 font-display text-foreground"
            >
                <p class="text-[calc(var(--type-body)*1.618)] leading-[1.2]">
                    The deadline is <HandMark shape="strike">Friday</HandMark> Monday
                </p>
            </div>
        </StorySection>

        <StorySection
            label="circle"
            blurb="A loose, overshooting loop around a word — the way a hand circles the number that matters. Circle a word, not a phrase: past a word or two the gesture stops reading as a circle."
        >
            <div
                class="paper-grain-overlay rounded-card border bg-card p-5 font-display text-foreground"
            >
                <p class="text-[calc(var(--type-body)*1.618)] leading-[1.2]">
                    Up <HandMark shape="circle">threefold</HandMark> since spring
                </p>
            </div>
        </StorySection>

        <StorySection
            label="highlight"
            blurb="A highlighter swipe behind the words. The band changes with the page — bright on light paper, deep on dark — and never touches the colour of the text it sits under."
        >
            <div
                class="paper-grain-overlay flex flex-col gap-3 rounded-card border bg-card p-5 font-display text-foreground"
            >
                <p class="text-[calc(var(--type-body)*1.618)] leading-[1.2]">
                    The part that
                    <HandMark shape="highlight">Hpqjy really matters</HandMark>
                    here
                </p>
                <p class="text-[calc(var(--type-body)*1.618)] leading-[1.2]">
                    Pick a hue:
                    <HandMark shape="highlight" color="318">rose</HandMark>,
                    <HandMark shape="highlight" color="270">violet</HandMark>
                </p>
            </div>
        </StorySection>

        <StorySection
            label="the draw"
            blurb="Each mark draws itself on once, in reading order, so a heading arrives with its line still being sketched. Replay it whenever you like."
        >
            <div
                class="paper-grain-overlay flex flex-col gap-5 rounded-card border bg-card p-5"
            >
                <p
                    class="font-display text-[calc(var(--type-body)*2.618)] leading-[1.05] text-foreground"
                >
                    A <HandMark ref="drawn">drawn</HandMark> line
                </p>
                <div>
                    <Button @click="replay">Replay</Button>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
