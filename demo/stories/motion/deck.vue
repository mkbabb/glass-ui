<script setup lang="ts">
// the live demonstration of the `@mkbabb/glass-ui/deck` register. The
// in-repo exerciser: `useDeck` (the headless index/progress/liveMessage core),
// `useDeckKeyboard` (the focus-guarded Arrow/Space/digit contract), and the windowed
// dots rendered DIRECTLY by `<PagerDots pattern="group" :ring="false">` over PagerDots'
// ONE pagerWindow oracle via the group aria axis (role="group"/aria-current). `/deck` is
// purely headless — it owns no dot wrapper; the deck is consumer #2 of PagerDots direct.
// The story's real slide transition reads canonical `--spring-dock` directly; the
// aria-live announcer surfaces "Slide N of M" per step. A focused control inside a slide
// gets Space/digit (NOT hijacked). The dot-morph worm is PagerDots' ONE metaball engine
// (usePagerWorm/useLeadTrail) — the deck ships no second goo engine.
import { computed } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { useDeck, useDeckKeyboard } from "@glass/components/deck";
import { PagerDots } from "@glass/components/pager-dots";
import { Button } from "@glass/components/button";

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
            blurb="Page through a full-viewport presentation with Arrow, Space, or number keys. Focused controls keep their native behavior, the current slide is announced, and the pager shows a compact window around your position."
        >
            <div class="flex flex-col gap-6" tabindex="0">
                <!-- The deck stage — one slide active at a time, the rest slid out + faded
                     on the canonical --spring-dock spatial spring. -->
                <div class="deck-demo-stage glass-quiet rounded-card">
                    <section
                        v-for="(s, i) in slides"
                        :key="i"
                        class="deck-demo-slide glass-floating rounded-card"
                        :data-state="i === deck.index.value ? 'active' : 'inactive'"
                        :inert="i !== deck.index.value ? true : undefined"
                    >
                        <p class="text-mono-small">{{ i + 1 }} / {{ slides.length }}</p>
                        <!-- the slide DISPLAY title in the --motion-accent violet (a display
                             heading, not a StorySection <h2>). -->
                        <h3 class="text-display-2" :style="{ color: 'var(--motion-accent)' }">{{ s.title }}</h3>
                        <p class="text-body">{{ s.body }}</p>
                        <Button v-if="s.title === 'Focus-guarded'">
                            Focusable control
                        </Button>
                    </section>
                </div>

                <!-- The windowed dot pager (the group register), centered. The deck composes
                     PagerDots DIRECTLY: pattern="group" (role="group"/aria-current), ring off
                     (the deck owns its own ambient glass host, so the dots sit flush). -->
                <div class="flex items-center justify-between gap-4">
                    <Button emphasis="quiet" :disabled="deck.index.value === 0" @click="deck.prev()">
                        Prev
                    </Button>
                    <PagerDots
                        v-model:active="index"
                        pattern="group"
                        :ring="false"
                        :count="deck.total"
                        :window-fit="6"
                        aria-label="Slides"
                    />
                    <Button
                        emphasis="quiet"
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
    position: relative; /* the slides stack absolutely within */
    min-block-size: 14rem;
    overflow: clip; /* bound the inactive slides' translateX during the spring slide */
    /* THE WARM FIELD (presets-in-consumers — a DEMO-surface change, NOT a library
       token). Without it the at-rest stage resolves a flat taupe
       oklab(0.793 0.005 0.012) (C≈0.0128, near-gray) — inert against the
       breath-of-life/technicolor edicts. The warm-cream→saffron radial field (the
       paper-field recipe on a local plane) gives the resting surface a live warm read.
       Every 0-alpha stop is an explicit warm oklch(L C H / 0), NEVER bare `transparent`
       (the WebKit premultiply-toward-black desaturation hole). The hue rides
       `--deck-field-h` on the warm-bound [25,95] paint invariant. */
    --deck-field-h: 62; /* warm cream→saffron base (within the [25,95] warm-bound) */
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
/* DARK — warm-LUMINOUS field: lower L, KEEP the warm chroma, NEVER gray-charcoal. Plain
   ancestor `.dark .x` (a scoped `:global(.dark)` silently drops; this scoped SFC block
   emits the plain ancestor selector correctly). */
.dark .deck-demo-stage {
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
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
    /* The story-owned slide transition uses the canonical calm spatial spring directly. */
    transition:
        transform var(--spring-dock-duration) var(--spring-dock),
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
