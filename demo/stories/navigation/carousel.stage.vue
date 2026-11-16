<script setup lang="ts">
// Carousel's stage: five colour slides; the next one peeks in, and the dots below
// follow the scroll.
import { ref } from "vue";
import { Carousel, CarouselContent, CarouselItem } from "@glass/components/carousel";
import { PagerDots } from "@glass/components/pager-dots";

const SLIDES = [
    { hue: 24, name: "Cream" },
    { hue: 340, name: "Carmine" },
    { hue: 160, name: "Kelp" },
    { hue: 210, name: "Slate" },
    { hue: 42, name: "Saffron" },
];

const active = ref(0);
</script>

<template>
    <div class="carousel-stage">
        <Carousel v-model:active="active" projection="travel" aria-label="Colours">
            <CarouselContent>
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
                    v-model:active="active"
                    :count="SLIDES.length"
                    :slide-label="(i: number) => SLIDES[i]?.name ?? ''"
                    aria-label="Slides"
                />
            </div>
        </Carousel>
    </div>
</template>

<style scoped>
.carousel-stage {
    display: grid;
    align-content: center;
    block-size: 100%;
    padding: var(--sp-6) var(--sp-5);
}

/* One slide and a peek of the next; a little more of the next where the stage is
   wide. */
.carousel-stage-item {
    flex-basis: 82%;
}

@container (inline-size >= 40rem) {
    .carousel-stage-item {
        flex-basis: 64%;
    }
}

.carousel-stage-slide {
    block-size: clamp(12rem, 60cqi, 20rem);
    border-radius: var(--radius-3xl);
}

.carousel-stage-dots {
    display: flex;
    justify-content: center;
    margin-block-start: var(--sp-5);
}
</style>
