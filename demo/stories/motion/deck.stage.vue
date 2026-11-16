<script setup lang="ts">
// Deck's stage: six slides that turn in place, paged by the arrows, the dots, or the
// keys while the deck has focus. A coarse pointer shows fewer dots so the row fits.
import { computed, onMounted, ref } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { DeckSlide, DeckStage, useDeck, useDeckKeyboard } from "@glass/components/deck";
import { PagerDots } from "@glass/components/pager-dots";
import { Button } from "@glass/components/button";

const slides = [
    { id: "cream", title: "Warm cream" },
    { id: "paper", title: "Paper grain" },
    { id: "type", title: "Audacious type" },
    { id: "springs", title: "Spring physics" },
    { id: "glass", title: "Frosted glass" },
    { id: "thanks", title: "Thank you" },
];

const root = ref<HTMLElement | null>(null);
const deck = useDeck(slides.length, { label: (i) => slides[i]?.title ?? "" });
useDeckKeyboard(deck, { target: root });

const index = computed({
    get: () => deck.index.value,
    set: (i: number) => deck.go(i),
});

const fit = ref(6);
onMounted(() => {
    if (matchMedia("(pointer: coarse)").matches) fit.value = 4;
});
</script>

<template>
    <div ref="root" class="deck-demo" tabindex="0" aria-label="Deck">
        <DeckStage :deck="deck" register="turn" :ratio="null" aria-label="Slides" class="deck-demo-stage">
            <DeckSlide
                v-for="(s, i) in slides"
                :key="s.id"
                :index="i"
                :entry="s"
                class="deck-demo-slide glass-floating"
            >
                <span class="deck-demo-count">{{ String(i + 1).padStart(2, "0") }}</span>
                <h3 class="deck-demo-title">{{ s.title }}</h3>
            </DeckSlide>
        </DeckStage>

        <div class="deck-demo-controls">
            <Button
                emphasis="quiet"
                icon-only
                aria-label="Previous slide"
                :disabled="!deck.canPrev.value"
                @click="deck.prev()"
            >
                <ChevronLeft class="size-5" aria-hidden="true" />
            </Button>
            <PagerDots
                v-model:active="index"
                :count="deck.total.value"
                :window-fit="fit"
                :ring="false"
                :announce="false"
                :slide-label="(i: number) => slides[i]?.title ?? ''"
                aria-label="Slides"
            />
            <Button
                emphasis="quiet"
                icon-only
                aria-label="Next slide"
                :disabled="!deck.canNext.value"
                @click="deck.next()"
            >
                <ChevronRight class="size-5" aria-hidden="true" />
            </Button>
        </div>
    </div>
</template>

<style scoped>
.deck-demo {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 1rem;
    inline-size: 100%;
    block-size: var(--story-stage-tall);
    padding: 1.5rem;
    border-radius: inherit;
}

@container (inline-size < 34rem) {
    .deck-demo {
        padding: 1rem;
    }
}

.deck-demo-stage {
    min-block-size: 0;
    border-radius: var(--radius-card);
}

.deck-demo-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    padding: 2rem;
    border-radius: var(--radius-card);
}

.deck-demo-count {
    font-family: var(--font-mono);
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
}

.deck-demo-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 7cqi, 4rem);
    line-height: 1.05;
    color: var(--foreground);
}

.deck-demo-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-inline-size: 0;
}
</style>
