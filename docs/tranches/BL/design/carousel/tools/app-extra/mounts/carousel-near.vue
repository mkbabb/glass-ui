<script setup lang="ts">
// The near window, drawn by the page (live=slot on carousel-hero.vue): the heavy
// figure exists only on the member the strip last rested on and its two neighbours,
// and it runs only on the active member while the strip is still. The window moves
// only at rest, so nothing mounts or unmounts while the strip moves. It reads the
// Carousel's `moving` (the near-snap tree only).
import { computed, ref, watch } from "vue";
import { useCarousel } from "@glass/components/carousel";
import { useSlideContext } from "@glass/components/deck";

const carousel = useCarousel() as ReturnType<typeof useCarousel> & { moving: { value: boolean } };
const slide = useSlideContext();
const near = ref(Math.abs(slide.index.value - carousel.deck.index.value) <= 1);
watch([() => carousel.moving.value, () => carousel.deck.index.value], ([m, i]) => {
    if (!m) near.value = Math.abs(slide.index.value - i) <= 1;
});
const running = computed(() => slide.active.value && !carousel.moving.value);
</script>

<template>
    <slot v-if="near" :running="running" />
</template>
