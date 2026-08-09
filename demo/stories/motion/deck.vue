<script setup lang="ts">
// The live exerciser for `@mkbabb/glass-ui/deck` — the windowed-sequence substrate.
//
// It composes the whole rendering pair: `useDeck` (the index authority, the derived
// clamp, the ONE `[data-state]` vocabulary, the announcement), `<DeckStage>` (the
// letterboxed room, `--cqx`, the single ground, the live region's DOM host) and
// `<DeckSlide>` (attribute fall-through, the manifest's flags, the per-member
// context). The turn is the authored spring-clock register on the `world` preset —
// the story writes no transition of its own.
//
// `useDeckKeyboard` binds globally, which is the presentation register, and EVERY
// navigation key is focus-guarded: tab to the button inside a slide and Space
// activates it instead of paging. The dots are `<PagerDots pattern="group"
// :ring="false">` composed directly — the deck owns no dot wrapper — and the rail
// owns the announcement, so nothing here re-authors a live region.
import { computed } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    DeckSlide,
    DeckStage,
    useDeck,
    useDeckKeyboard,
    type SlideEntry,
} from "@glass/components/deck";
import { PagerDots } from "@glass/components/pager-dots";
import { Button } from "@glass/components/button";

const slides: (SlideEntry & { body: string })[] = [
    {
        id: "welcome",
        title: "Welcome",
        body: "Arrow / PageDown advances. Home / End jump.",
    },
    {
        id: "paged",
        title: "Keyboard-paged",
        body: "Space advances — unless a control is focused.",
    },
    {
        id: "guarded",
        title: "Focus-guarded",
        body: "Tab to the button, then press Space: it activates, never paged.",
    },
    { id: "digits", title: "Digit jumps", body: "Press 1–6 to jump straight to a slide." },
    {
        id: "windowed",
        title: "Windowed pager",
        body: "The dots window around the active slide; focus survives a recompute.",
    },
    {
        id: "announced",
        title: "Announced",
        body: "Each step announces 'Slide N of M' to a screen reader.",
    },
];

const deck = useDeck(slides.length, { label: (i) => slides[i]?.title ?? "" });
useDeckKeyboard(deck);

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
            blurb="Page through a presentation with Arrow, Space, or number keys. Focused controls keep their native behavior, the current slide is announced, and the pager shows a compact window around your position."
        >
            <div class="flex flex-col gap-6">
                <!-- The stage: one ground, the members stacked, the authored turn. -->
                <DeckStage
                    :deck="deck"
                    register="turn"
                    :ratio="null"
                    aria-label="Slides"
                    class="deck-demo-stage glass-quiet"
                >
                    <template #ground>
                        <div class="deck-demo-ground" />
                    </template>

                    <DeckSlide
                        v-for="(s, i) in slides"
                        :key="s.id"
                        :index="i"
                        :entry="s"
                        class="deck-demo-slide glass-floating"
                    >
                        <p class="text-mono-small">{{ i + 1 }} / {{ slides.length }}</p>
                        <h3
                            class="text-display-2"
                            :style="{ color: 'var(--motion-accent)' }"
                        >
                            {{ s.title }}
                        </h3>
                        <p class="text-body">{{ s.body }}</p>
                        <Button v-if="s.id === 'guarded'">Focusable control</Button>
                    </DeckSlide>
                </DeckStage>

                <!-- The windowed dot pager (the group register), centered. The deck
                     composes PagerDots DIRECTLY: role="group" / aria-current, ring off
                     (the stage owns the ambient glass, so the dots sit flush). -->
                <div class="flex items-center justify-between gap-4">
                    <Button
                        emphasis="quiet"
                        :disabled="!deck.canPrev.value"
                        @click="deck.prev()"
                    >
                        Prev
                    </Button>
                    <PagerDots
                        v-model:active="index"
                        pattern="group"
                        :ring="false"
                        :count="deck.total.value"
                        :window-fit="6"
                        :slide-label="(i: number) => slides[i]?.title ?? ''"
                        aria-label="Slides"
                    />
                    <Button
                        emphasis="quiet"
                        :disabled="!deck.canNext.value"
                        @click="deck.next()"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.deck-demo-stage {
    min-block-size: 14rem;
}

/* THE WARM FIELD (presets-in-consumers — a DEMO surface, not a library token).
   Without it the resting stage resolves a flat near-gray taupe, inert against the
   breath-of-life and technicolor edicts. Every 0-alpha stop is an explicit warm
   oklch(L C H / 0), NEVER a bare `transparent` (the WebKit premultiply-toward-black
   desaturation hole). The hue rides the warm-bound [25,95] paint invariant. */
.deck-demo-ground {
    position: absolute;
    inset: 0;
    --deck-field-h: 62;
    background:
        radial-gradient(
            95% 90% at 80% 32%,
            oklch(0.86 0.13 calc(var(--deck-field-h) - 14) / 0.55),
            oklch(0.86 0.13 calc(var(--deck-field-h) - 14) / 0) 72%
        ),
        radial-gradient(
            100% 88% at 22% 22%,
            oklch(0.89 0.12 var(--deck-field-h) / 0.6),
            oklch(0.89 0.12 var(--deck-field-h) / 0) 75%
        ),
        radial-gradient(
            120% 100% at 50% 55%,
            oklch(0.92 0.07 calc(var(--deck-field-h) + 8) / 0.42),
            oklch(0.92 0.07 calc(var(--deck-field-h) + 8) / 0) 100%
        ),
        var(--card);
}
/* DARK — warm-LUMINOUS: lower L, KEEP the warm chroma, never gray-charcoal. A plain
   `.dark` ancestor; a scoped `:global(.dark)` silently drops from the emitted CSS. */
.dark .deck-demo-ground {
    background:
        radial-gradient(
            95% 90% at 80% 32%,
            oklch(0.5 0.1 calc(var(--deck-field-h) - 14) / 0.5),
            oklch(0.5 0.1 calc(var(--deck-field-h) - 14) / 0) 72%
        ),
        radial-gradient(
            100% 88% at 22% 22%,
            oklch(0.52 0.09 var(--deck-field-h) / 0.55),
            oklch(0.52 0.09 var(--deck-field-h) / 0) 75%
        ),
        radial-gradient(
            120% 100% at 50% 55%,
            oklch(0.46 0.055 calc(var(--deck-field-h) + 8) / 0.45),
            oklch(0.46 0.055 calc(var(--deck-field-h) + 8) / 0) 100%
        ),
        var(--card);
}

.deck-demo-slide {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
    justify-content: center;
}
</style>
