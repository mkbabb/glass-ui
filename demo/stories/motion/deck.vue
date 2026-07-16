<script setup lang="ts">
// the live demonstration of the `@mkbabb/glass-ui/deck` register. The
// in-repo exerciser: `useDeck` (the headless index/progress/liveMessage core),
// `useDeckKeyboard` (the focus-guarded Arrow/Space/digit contract), and `<DeckPager>`
// (the windowed dots over PagerDots' ONE pagerWindow oracle via the group aria axis).
// The story's real slide transition reads canonical `--spring-smooth` directly; the
// aria-live announcer surfaces
// "Slide N of M" per step. A focused control inside a slide gets Space/digit (NOT
// hijacked).
import { computed, onMounted, ref, useId, watch, nextTick } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    useDeck,
    useDeckKeyboard,
    DeckPager,
} from "@glass/components/deck";
import { Button } from "@glass/components/button";
import DeckGooFilter from "./deck/DeckGooFilter.vue";
import { useDeckGoo } from "./deck/useDeckGoo";

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

const gooStageEl = ref<HTMLElement | null>(null);
const gooBodyAEl = ref<HTMLElement | null>(null);
const gooBodyBEl = ref<HTMLElement | null>(null);
const gooNeckEl = ref<HTMLElement | null>(null);
const resourceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
const filterId = `deck-goo-filter-${resourceId}`;
const clipId = `deck-goo-clip-${resourceId}`;
const deckGoo = useDeckGoo({
    host: gooStageEl,
    bodyA: gooBodyAEl,
    bodyB: gooBodyBEl,
    neck: gooNeckEl,
});

onMounted(() =>
    void nextTick(() => {
        deckGoo.snap();
    }),
);
watch(
    () => deck.index.value,
    (to, from) => {
        // direction of travel: forward (next) → the neck reaches in from the RIGHT
        // (slot +1) and settles at center (slot 0); backward → from the LEFT (slot -1).
        const dir = to >= (from ?? to) ? 1 : -1;
        void nextTick(() => deckGoo.travel(dir));
    },
);
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Keyboard-paged presentation deck"
            label="deck"
            blurb="Page through a full-viewport presentation with Arrow, Space, or number keys. Focused controls keep their native behavior, the current slide is announced, and the pager shows a compact window around your position."
        >
            <div class="flex flex-col gap-6" tabindex="0">
                <!-- The deck stage — one slide active at a time, the rest faded out
                     on the canonical --spring-smooth curve, with the GOO-MORPH neck
                     bridging the outgoing→incoming slide. -->
                <div
                    ref="gooStageEl"
                    class="deck-demo-stage glass-quiet rounded-card"
                    :style="{
                        '--deck-goo-filter': `url(#${filterId})`,
                        '--deck-neck-clip': `url(#${clipId})`,
                    }"
                >
                    <DeckGooFilter :filter-id="filterId" :clip-id="clipId" />
                    <!-- the goo silhouette layer — the BARBELL (two warm-cream bodies + a
                         welling concave neck): the outgoing/incoming bodies bud apart, the
                         neck wells a concave waist, the filter merges them into one waisted
                         mass, then they coalesce (the metaball blob↔meatball read at viewport
                         scale). aria-hidden, behind the crisp content. -->
                    <div class="deck-goo-layer" aria-hidden="true">
                        <span ref="gooBodyAEl" class="deck-goo-body" />
                        <span ref="gooNeckEl" class="deck-goo-neck" />
                        <span ref="gooBodyBEl" class="deck-goo-body" />
                    </div>
                    <section
                        v-for="(s, i) in slides"
                        :key="i"
                        class="deck-demo-slide glass-floating rounded-card"
                        :data-state="i === deck.index.value ? 'active' : 'inactive'"
                        :inert="i !== deck.index.value ? true : undefined"
                    >
                        <p class="text-mono-caption">{{ i + 1 }} / {{ slides.length }}</p>
                        <!-- reconcile — the motion band's ONE color
                             text-event: the slide DISPLAY title in the
                             --motion-accent violet (the motion-purple family, never
                             a body <p>). The slide title is a display heading, not a
                             StorySection <h2> (PH1/PH3 unaffected). -->
                        <h3 class="text-display-2" :style="{ color: 'var(--motion-accent)' }">{{ s.title }}</h3>
                        <p class="text-body">{{ s.body }}</p>
                        <Button v-if="s.title === 'Focus-guarded'">
                            Focusable control
                        </Button>
                    </section>
                </div>

                <!-- The windowed dot pager (the group register), centered. -->
                <div class="flex items-center justify-between gap-4">
                    <Button emphasis="quiet" :disabled="deck.index.value === 0" @click="deck.prev()">
                        Prev
                    </Button>
                    <DeckPager v-model:index="index" :total="deck.total" :window-fit="6" />
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
    position: relative;
    min-block-size: 14rem;
    overflow: clip;
    /*  §5 — the deck `--goo-weight` (0.4 — the VESTIBULAR FLOOR; a
       full-viewport page-flip with overshoot is nauseating). It feeds `--motion-weight` so
       the stage `::before` cartoon cast reads the deck's calm weight; reduced motion zeroes it.
       The deck has no ambient autoplay, so no `[data-autoplay]` seam — every page is a
       deliberate keyboard/click DRIVER. */
    --goo-weight: 0.4;
    --motion-weight: var(--goo-weight);
    /* the deck barbell tokens (demo-scoped). The widest, calmest
       waist (a full-viewport flip necks barely — the vestibular floor). */
    /*  §3 — the WARM FIELD behind the goo (presets-in-consumers,
       a DEMO-surface change, NOT a library token). The live deck slide resolved a flat
       taupe `oklab(0.793 0.005 0.012)` (C≈0.0128, near-gray) with NO colorful field — the
       goo had no warm chroma to bleed. The stage now lays the carousel's warm-cream→saffron
       radial field (the `paper-field` recipe generalized to a local plane) UNDER the slides
       so the metaball neck transmits warm pigment. Every 0-alpha stop is an explicit warm
       `oklch(L C H / 0)` — NEVER bare `transparent` (the WebKit premultiply-toward-black
       desaturation hole, build-trap-(d)). The field hue rides `--field-h` (the warm-bound
       [25,95] paint invariant); the saffron L1/L2 masses give C ≥ 0.015, H ∈ [45,85]. */
    --deck-field-h: 62; /* warm cream→saffron base (within the [25,95] warm-bound) */
    background:
        /* L2 saffron saturated mid (right band) — the densest warm pigment the neck reads */
        radial-gradient(
            95% 90% at 80% 32%,
            oklch(0.86 0.13 calc(var(--deck-field-h) - 14) / 0.55),
            oklch(0.86 0.13 calc(var(--deck-field-h) - 14) / 0) 72%
        ),
        /* L1 amber key mass (top-left toward the upper-right `--glass-key` sun) */
        radial-gradient(
            100% 88% at 22% 22%,
            oklch(0.89 0.12 var(--deck-field-h) / 0.6),
            oklch(0.89 0.12 var(--deck-field-h) / 0) 75%
        ),
        /* the wide warm base wash — raises the cream floor everywhere (no flat gap) */
        radial-gradient(
            120% 100% at 50% 55%,
            oklch(0.92 0.07 calc(var(--deck-field-h) + 8) / 0.42),
            oklch(0.92 0.07 calc(var(--deck-field-h) + 8) / 0) 100%
        ),
        var(--card);
}
/* DARK — warm-LUMINOUS field: lower L, KEEP the warm chroma, NEVER gray-charcoal. Plain
   ancestor `.dark .x` (a scoped `:global(.dark)` silently drops; this is a scoped SFC
   block so the plain ancestor selector is the correct emit). */
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

/* the deck goo silhouette layer (the metaball NECK bridge).
   A transient travel-only bridge: the layer is invisible at rest
   (`opacity: 0` — NO gray slab; the resting backing is the slide's OWN warm
   `glass-floating` plate) and fades in ONLY `[data-traveling]`. It rides z-index 2
   ABOVE the crisp slides during travel, so the warm-cream metaball neck flows OVER the
   outgoing→incoming slides like the carousel's, never doubling as the slide backing.
   The traveling worm + the static center plate are merged by the static SVG goo filter. */
.deck-goo-layer {
    position: absolute;
    inset: 0;
    z-index: 2; /* ABOVE the crisp slides — the glass bridge travels over them */
    pointer-events: none;
    filter: var(--deck-goo-filter);
    opacity: 0; /* invisible at rest; fades in only during travel */
    transition: opacity var(--duration-fast) var(--ease-out);
    /* warm-cream plate ink — NEVER gray. */
    color: color-mix(in oklab, var(--card), white 8%);
    will-change: transform, opacity;
    contain: layout style; /* NOT paint — `contain: paint`/`overflow: clip` would clip the
       metaball neck at the layer box. The SVG filter region bounds the goo. */
    isolation: isolate;
}
/*  §4 — the moving CARTOON-CAST (REUSES the SHIPPED
   `--shadow-cartoon-*` warm cel stamp — DRY, no second shadow system). The cast must live
   OUTSIDE the goo-filtered layer (the `feColorMatrix` threshold would crush a soft shadow),
   so it rides the NON-filtered stage `::before` (the stage's pseudos are free). It PUNCHES
   opposite the morph direction (down-left toward the cel ink, away from the upper-right
   `--glass-key`), scaled by the deck `--goo-weight` (0.4, the vestibular floor), GATED to
   travel only (gone at rest). The stage owns `--goo-weight`/`--motion-weight` (below). */
.deck-demo-stage::before {
    content: "";
    position: absolute;
    inset: 12%;
    z-index: 0; /* behind the crisp slides (z-1) + the goo layer (z-2) — the cel anchor */
    border-radius: var(--radius-card);
    pointer-events: none;
    box-shadow: var(--shadow-cartoon-md);
    --deck-cast-travel: calc(5px * var(--motion-weight));
    translate: calc(-1 * var(--deck-cast-travel)) var(--deck-cast-travel);
    opacity: 0; /* the cast lives with the travel gate (below) */
    transition:
        translate calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch),
        opacity var(--duration-fast) var(--ease-out);
}
/* fade the glass bridge IN during travel (the translucent warm lens — the slide reads
   through the bridge). At rest the layer is gone: no gray slab. The
   spring episode owns `data-traveling` on the stage and clears it on settle. */
.deck-demo-stage[data-traveling] .deck-goo-layer {
    opacity: var(--deck-goo-layer-opacity, 0.62);
}
/* the cartoon-cast PUNCHES in with the travel (the cel ink anchors the moving mass) +
   snaps back on settle (the gate clears). */
.deck-demo-stage[data-traveling]::before {
    opacity: 1;
}
/* THE DARK REGISTER — luminous warm transmissive glass, never a gray-brown halo
   (mirrors CarouselContent.vue). Lift the dark fill toward the WARM DARK-INK
   elevation register: `oklch(from var(--card) 0.68 0.05 h)` keeps
   the warm hue, pins L→0.68 + RE-SATURATES C→0.05, NOT a gray `white N%` mix. The
   `saturate(1.3) brightness(1.3)` companion (plain CSS filters appended after
   the instance-local SVG filter reads the warm chroma as LIT glass and pushes
   the composited mass over L 0.5 — the dark aurora glows THROUGH a warm membrane. */
.dark .deck-goo-layer {
    color: oklch(from var(--card) 0.68 0.05 h);
    filter: var(--deck-goo-filter) saturate(1.3) brightness(1.3);
}
/* THE BARBELL BODIES — two round warm-cream droplets (the viewport-scale metaball masses).
   Sized to the body diameter D = pitch/φ (set via --deck-body-d), border-radius:50% (a
   BLOB). The domed-droplet radial-gradient inner catch-light reads as a LIQUID GLASS
   droplet, not a flat gray box; the CENTER stop drops to 0.82 alpha (a warm
   `oklch(from currentColor … / 0.82)`, NOT a white-mix that would gray it) so the warm
   field reads THROUGH the body's thinnest part — the "field through the neck + edge"
   transmission read. The private spring episode writes transform only. */
.deck-goo-body {
    position: absolute;
    top: 50%;
    left: 0;
    inline-size: var(--deck-body-d, 58%);
    block-size: var(--deck-body-d, 58%);
    margin-block-start: calc(var(--deck-body-d, 58%) / -2);
    border-radius: 50%;
    background:
        radial-gradient(
            120% 110% at 50% 22%,
            color-mix(in oklab, currentColor, white 20%),
            oklch(from currentColor l c h / 0.82) 55%,
            currentColor 74%
        );
    transform-origin: center;
    will-change: transform;
}
/* THE CONCAVE NECK — the welling hourglass throat between the two bodies (the
   instance-local objectBoundingBox clipPath: cubic-Bézier sides pulling IN to a
   STRUCTURAL concave waist, never faceted, never `inset()`). The
   engine writes the well + the girth-following opacity. */
.deck-goo-neck {
    position: absolute;
    top: 50%;
    left: 0;
    inline-size: var(--deck-body-d, 58%);
    block-size: var(--deck-body-d, 58%);
    margin-block-start: calc(var(--deck-body-d, 58%) / -2);
    background:
        radial-gradient(
            120% 110% at 50% 30%,
            color-mix(in oklab, currentColor, white 16%),
            oklch(from currentColor l c h / 0.82) 50%,
            currentColor 78%
        );
    clip-path: var(--deck-neck-clip);
    transform-origin: center;
    opacity: 0; /* the engine writes the girth-following opacity */
    will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
    .deck-demo-stage {
        /* zero the cartoon weight in ONE assignment (the stage `::before` cast travel
           collapses to rest); the static cel STAMP persists (legibility anchor). */
        --motion-weight: 0;
    }
    .deck-demo-stage::before {
        transition: none;
    }
    .deck-goo-layer {
        display: none;
    }
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
        transform var(--spring-smooth-duration) var(--spring-smooth),
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
