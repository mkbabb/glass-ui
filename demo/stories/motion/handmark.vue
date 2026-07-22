<script setup lang="ts">
// The hand-voice story — the family's home register: marks that
// read HAND-made over the paper-grain. Subsumes the retired /underline story (the
// editorial draw-on underline is now <HandMark shape="underline">) + the first
// highlighter consumer (the five field deltas LIVE) + the natural pencil-boil
// morphology + the brush voices.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { HandMark } from "@glass/components/handmark";

// The imperative draw-on — a template ref + play() (the masthead, Sequence register).
const loadRef = ref<{ play: () => void } | null>(null);
function replayLoad() {
    loadRef.value?.play();
}
</script>

<template>
    <StoryPage>
        <!-- The masthead underline — a hand pen line under the word. -->
        <StorySection
            heading="The hand voice"
            label="pen underline"
            blurb="Lay a hand-drawn line under a word. The word stays real, selectable text; the mark is purely decorative, so screen readers still read the plain word. The pen default is a clean, lightly wobbled stroke."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    Who <HandMark>pays in</HandMark> gets connected
                </p>
            </div>
        </StorySection>

        <!-- Natural pencil-boil morphology using the `boil` brush. -->
        <StorySection
            label="boil brush"
            blurb="A seeded hand-drawn underline that keeps its character at any size. Different seeds vary the wobble naturally; the same seed always redraws the same mark."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    The <HandMark brush="boil" :seed="3">future</HandMark> is
                    <HandMark brush="boil" :seed="17">here</HandMark>
                </p>
            </div>
        </StorySection>

        <!-- Highlighter specimen. -->
        <StorySection
            label="highlighter"
            blurb="Paints like a real highlighter: a wide translucent slab behind the word that lets the page show through, with tapered ends and a square cap."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    The part that
                    <HandMark brush="highlighter" shape="highlight" color="#ffd84a"
                        >really matters</HandMark
                    >
                    here
                </p>
            </div>
        </StorySection>

        <!-- The draw-on clock — the imperative play(). -->
        <StorySection
            label="draw-on"
            blurb="The mark draws itself on once when it appears, so a heading arrives with its underline still being sketched. Replay it whenever you like from code."
        >
            <div class="paper-grain-overlay flex flex-col gap-4 rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    A
                    <HandMark ref="loadRef" animation="draw-on" appear="manual"
                        >drawn</HandMark
                    >
                    line
                </p>
                <div>
                    <Button @click="replayLoad">Replay draw</Button>
                </div>
            </div>
        </StorySection>

        <!-- Distinct pen, boil, pencil, crayon, and marker voices. -->
        <StorySection
            label="the brush voices"
            blurb="Five hands from one control: pen (clean), boil (lively), pencil (fine tooth), crayon (waxy grain), marker (juicy). Each is visibly its own hand — never all rendering the same."
        >
            <div class="paper-grain-overlay flex flex-col gap-3 rounded-card border bg-card p-8 text-display-3 font-display leading-tight text-foreground">
                <p><HandMark brush="pen">pen</HandMark></p>
                <p><HandMark brush="boil">boil</HandMark></p>
                <p><HandMark brush="pencil">pencil</HandMark></p>
                <p><HandMark brush="crayon" color="#cc4422">crayon</HandMark></p>
                <p><HandMark brush="marker" color="#2a8c5a">marker</HandMark></p>
            </div>
        </StorySection>

        <!-- A circle around a datum — positioned mode (the editorial margin mark). -->
        <StorySection
            label="circle a datum"
            blurb="The ring brush hand-circles a value — a loose, overshooting loop like a real hand circle, not a snapped shape. A thin single pass that quietly points at the number that matters."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    A
                    <HandMark
                        brush="ring"
                        shape="circle"
                        color="#cc4422"
                        :box="{ x: 18, y: 8, w: 64, h: 24 }"
                        >ringed</HandMark
                    >
                    word
                </p>
            </div>
        </StorySection>

        <!-- A box or bracket over a very small target. -->
        <StorySection
            label="box a datum"
            blurb="A box or bracket over a very small target always paints a visible band — even a single character stays clearly marked, never thinning away to nothing."
        >
            <div class="paper-grain-overlay flex flex-wrap items-center gap-8 rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    box
                    <HandMark
                        brush="marker"
                        shape="box"
                        color="#2a8c5a"
                        :box="{ x: 46, y: 10, w: 9, h: 22 }"
                        >a</HandMark
                    >
                    datum
                </p>
                <p class="text-display-3 font-display leading-tight text-foreground">
                    bracket
                    <HandMark
                        brush="crayon"
                        shape="bracket"
                        color="#cc4422"
                        :box="{ x: 44, y: 8, w: 12, h: 26 }"
                        >it</HandMark
                    >
                    tight
                </p>
            </div>
        </StorySection>

        <!-- The amplitude knob — a bolder hand line off the wobble scalar ( c). -->
        <StorySection
            label="amplitude"
            blurb="The underline's wobble scales with the font. Turn amplitude up for a bolder, more energetic hand; the default stays understated."
        >
            <div class="paper-grain-overlay flex flex-col gap-3 rounded-card border bg-card p-8 text-display-3 font-display leading-tight text-foreground">
                <p><HandMark brush="boil" :seed="8">default</HandMark></p>
                <p><HandMark brush="boil" :seed="8" :amplitude="1.8">bolder</HandMark></p>
            </div>
        </StorySection>

        <!-- The color prop — the motion family's ONE coherent purple event. -->
        <StorySection
            label="color"
            blurb="By default the mark inherits the surrounding text ink. Pass a color to override it — here the motion family's violet accent."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    A
                    <HandMark color="var(--motion-accent)">tinted</HandMark>
                    mark
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>
