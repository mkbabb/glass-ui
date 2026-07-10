<script setup lang="ts">
// The hand-voice story (BA.W-HANDMARK) — the family's home register: marks that
// read HAND-made over the paper-grain. Subsumes the retired /underline story (the
// editorial draw-on underline is now <HandMark shape="underline">) + the first
// highlighter consumer (the five field deltas LIVE) + the natural pencil-boil
// morphology + the brush voices.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/ui/button";
import { HandMark } from "@glass/components/custom/handmark";

// The imperative draw-on — a template ref + play() (the masthead / Sequence register).
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
            label="pen underline · the masthead default"
            blurb="HandMark lays a hand-drawn mark under a word; the word stays real selectable text, the mark is an aria-hidden SVG overlay. The PEN default is grain:0 — a clean wobbled path, no filter."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    Who <HandMark>pays in</HandMark> gets connected
                </p>
            </div>
        </StorySection>

        <!-- The natural pencil-boil morphology (C-2 — the `boil` brush). -->
        <StorySection
            label="boil brush · the natural morphology"
            blurb="The natural-underline morphology goes procedural off the seeded pencil-boil engine — scale-relative amplitude, an irregular 2–4-period wobble, off the house prng leaf. Two seeds read distinct; one seed reproduces."
        >
            <div class="paper-grain-overlay rounded-card border bg-card p-8">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    The <HandMark brush="boil" :seed="3">future</HandMark> is
                    <HandMark brush="boil" :seed="17">here</HandMark>
                </p>
            </div>
        </StorySection>

        <!-- The highlighter — the FIRST consumer (C-1 five deltas LIVE). -->
        <StorySection
            label="highlighter · multiply over the page"
            blurb="The highlighter paints like a highlighter: a low-seated hull ribbon, tapered ends, a square cap, multiplying against the page text behind it (not isolated off the page). A wide translucent slab BEHIND the word."
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
            label="draw-on · imperative play()"
            blurb="animation='draw-on' reveals the mark once on appear — a stroke-dashoffset sweep for clean ink, a clip-path wipe for grained ink (never dashoffset under a filter). Fire it via a template ref's play()."
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
                    <Button variant="outline" @click="replayLoad">Replay draw</Button>
                </div>
            </div>
        </StorySection>

        <!-- The brush voices — pen / boil / pencil / crayon / marker (W5: distinct). -->
        <StorySection
            label="the brush continuum · distinct voices"
            blurb="Each medium is a POINT in one parameter space, not a class in a taxonomy. pen (clean), boil (procedural), pencil (fine tooth), crayon (waxy grain), marker (juicy) — measurably distinct geometry, never everything-renders-pen."
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
            label="positioned mode · circle a datum"
            blurb="The ring brush hand-circles a datum — pencil-boil's ellipsePoints overshoot (a hand circle, not a snapped ellipse). A thin single-pass whisper pointing at the anomaly, aspect-stable via non-scaling-stroke."
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

        <!-- The box-mode hull marks over TINY datums — the se-guard (BG.W-HANDMARK-PERFECT b). -->
        <StorySection
            label="box-mode hull · the se-guard (never a vanish)"
            blurb="A hull brush (marker/crayon) over a tiny datum used to collapse to an empty perfect-freehand outline and VANISH. The se-guard falls back to a stroked body, so a box/bracket over a 1-char datum always paints a visible band."
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

        <!-- The amplitude knob — a bolder hand line off the wobble scalar (BG.W-HANDMARK-PERFECT c). -->
        <StorySection
            label="amplitude · the excursion knob"
            blurb="The natural-underline excursion is font-proportional (aspect-correct viewBox) and driven by the amplitude knob — the default reads byte-identical, an explicit amplitude lifts the wobble÷stroke ratio for a bolder hand line."
        >
            <div class="paper-grain-overlay flex flex-col gap-3 rounded-card border bg-card p-8 text-display-3 font-display leading-tight text-foreground">
                <p><HandMark brush="boil" :seed="8">default</HandMark></p>
                <p><HandMark brush="boil" :seed="8" :amplitude="1.8">bolder</HandMark></p>
            </div>
        </StorySection>

        <!-- The color prop — the motion family's ONE coherent purple event. -->
        <StorySection
            label="color prop · the motion accent"
            blurb="The default color is currentColor (inherits the ink). An explicit color prop wins — here the motion family's --motion-accent purple (--viz-legendre violet twin; demo-local, never a lib token)."
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
