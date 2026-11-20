<script setup lang="ts">
// Carousel's stage: five colour slides, centred, with their neighbours peeking in at
// both edges. The dots follow the scroll and step the strip through the carousel's
// own `deck`, since a write to `v-model:active` after mount does not reach the strip.
import { Carousel, CarouselContent, CarouselItem } from "@glass/components/carousel";
import { PagerDots } from "@glass/components/pager-dots";

const SLIDES = [
    { hue: 24, name: "Cream" },
    { hue: 340, name: "Carmine" },
    { hue: 160, name: "Kelp" },
    { hue: 210, name: "Slate" },
    { hue: 42, name: "Saffron" },
];
</script>

<template>
    <div class="carousel-stage">
        <Carousel
            v-slot="{ deck, index }"
            projection="travel"
            aria-label="Colours"
        >
            <CarouselContent class="carousel-stage-strip">
                <CarouselItem
                    v-for="(s, i) in SLIDES"
                    :key="s.name"
                    :index="i"
                    :label="s.name"
                    class="carousel-stage-item"
                >
                    <div
                        class="carousel-stage-slide"
                        :style="{ backgroundColor: `hsl(${s.hue} 60% 78%)` }"
                    />
                </CarouselItem>
            </CarouselContent>
            <div class="carousel-stage-dots">
                <PagerDots
                    :active="index"
                    :count="SLIDES.length"
                    :slide-label="(i: number) => SLIDES[i]?.name ?? ''"
                    aria-label="Slides"
                    @update:active="deck.go"
                />
            </div>
        </Carousel>
    </div>
</template>

<style scoped>
.carousel-stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: center;
    block-size: 100%;
    padding-block: var(--sp-6);
}

/* The strip spans the stage. Each slide is centred, and the strip's inline padding
   is half of what a slide leaves, so slide i rests at i slide pitches of scroll. */
.carousel-stage-strip {
    --slide: 82cqi;
    padding-inline: calc((100cqi - var(--slide)) / 2);
}

@container (inline-size >= 40rem) {
    .carousel-stage-strip {
        --slide: 64cqi;
    }
}

.carousel-stage-item {
    flex: 0 0 var(--slide);
    scroll-snap-align: center;
}

.carousel-stage-slide {
    block-size: clamp(12rem, 80cqi, 20rem);
    border-radius: var(--radius-3xl);
}

.carousel-stage-dots {
    display: flex;
    justify-content: center;
    margin-block-start: var(--sp-5);
}
</style>
