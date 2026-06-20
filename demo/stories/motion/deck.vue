<script setup lang="ts">
// BC.W-DECK — the live demonstration of the `@mkbabb/glass-ui/deck` register. The
// in-repo exerciser: `useDeck` (the headless index/progress/liveMessage core),
// `useDeckKeyboard` (the focus-guarded Arrow/Space/digit contract), `installDeckSpring`
// (the lazy keyframes count-up easing), and `<DeckPager>` (the windowed dots over
// PagerDots' ONE pagerWindow oracle via the group aria axis). The slide transition
// rides `--spring-deck` (= --spring-smooth); the aria-live announcer surfaces
// "Slide N of M" per step. A focused control inside a slide gets Space/digit (NOT
// hijacked). The 2nd binary consumer is the speedtest survey-deck (cross-repo); the
// slides repo CONSUMES-BACK its donor (post-cut).
import { computed, onMounted } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    useDeck,
    useDeckKeyboard,
    installDeckSpring,
    DeckPager,
} from "../../../src/components/custom/deck";
import { Button } from "../../../src/components/ui/button";

const slides = [
    { title: "Welcome", body: "Arrow / PageDown advances. Home / End jump." },
    { title: "Keyboard-paged", body: "Space advances — unless a control is focused." },
    { title: "Focus-guarded", body: "Tab to the button, then press Space: it activates, never paged." },
    { title: "Digit jumps", body: "Press 1–6 to jump straight to a slide." },
    { title: "Windowed pager", body: "The dots window around the active slide; focus survives a recompute." },
    { title: "Announced", body: "Each step announces 'Slide N of M' to a screen reader." },
];

const deck = useDeck(slides.length, {
    label: (i) => slides[i]?.title ?? "",
});
useDeckKeyboard(deck);
onMounted(() => installDeckSpring());

const index = computed({
    get: () => deck.index.value,
    set: (i: number) => deck.go(i),
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Keyboard-paged presentation deck"
            label="deck"
            blurb="The full-viewport keyboard-paged aria-live PRESENTATION register — DISTINCT from /carousel's item-scroller. useDeck owns the headless index + progress + the 'Slide N of M' announcer; useDeckKeyboard pages on Arrow/Space/digit (focus-guarded so a focused control keeps its native activation); the slide transition rides --spring-deck; <DeckPager> windows the dots over PagerDots' ONE oracle."
        >
            <div class="flex flex-col gap-6" tabindex="0">
                <!-- The deck stage — one slide active at a time, the rest faded out
                     on the --spring-deck slide-transition curve. -->
                <div class="deck-demo-stage glass-quiet rounded-card">
                    <section
                        v-for="(s, i) in slides"
                        :key="i"
                        class="deck-demo-slide"
                        :data-state="i === deck.index.value ? 'active' : 'inactive'"
                        :inert="i !== deck.index.value ? true : undefined"
                    >
                        <p class="text-mono-caption">{{ i + 1 }} / {{ slides.length }}</p>
                        <h3 class="text-display-2">{{ s.title }}</h3>
                        <p class="text-body">{{ s.body }}</p>
                        <Button v-if="s.title === 'Focus-guarded'" variant="default">
                            Focusable control
                        </Button>
                    </section>
                </div>

                <!-- The windowed dot pager (the group register), centered. -->
                <div class="flex items-center justify-between gap-4">
                    <Button variant="ghost" :disabled="deck.index.value === 0" @click="deck.prev()">
                        Prev
                    </Button>
                    <DeckPager v-model:index="index" :total="deck.total" :window-fit="6" />
                    <Button
                        variant="ghost"
                        :disabled="deck.index.value === deck.total - 1"
                        @click="deck.next()"
                    >
                        Next
                    </Button>
                </div>

                <!-- The aria-live step announcer (the portable WCAG seam). -->
                <p class="sr-only" aria-live="polite" aria-atomic="true">
                    {{ deck.liveMessage.value }}
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.deck-demo-stage {
    position: relative;
    min-block-size: 14rem;
    overflow: clip;
}
.deck-demo-slide {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
    /* The deck slide transition — the --spring-deck calm settle (= --spring-smooth),
       compositor-only (transform + opacity). */
    transition:
        transform var(--spring-smooth-duration) var(--spring-deck),
        opacity var(--duration-fast) var(--ease-out);
}
.deck-demo-slide[data-state="inactive"] {
    opacity: 0;
    transform: translateX(2rem);
    pointer-events: none;
}
.deck-demo-slide[data-state="active"] {
    opacity: 1;
    transform: translateX(0);
}
@media (prefers-reduced-motion: reduce) {
    .deck-demo-slide {
        transition: opacity var(--duration-fast) var(--ease-out);
        transform: none;
    }
}
</style>
