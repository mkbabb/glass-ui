<script setup lang="ts">
// the /navigation/carousel page — the carousel as a component register over the
// windowed-sequence substrate.
//
// There is no tween engine here any more. The strip is a native scroll-snap
// container, so momentum, rubber-banding, trackpad and touch scrubbing and the
// snap itself are the platform's, correct in both engines and free; `v-model:active`
// is the ONE authority and there is nothing for it to reconcile against. Five
// exhibits: §hero single-card over a real field; §peek multi-item with feathered
// edges; §hero-scale worm; §vertical; §windowed (12 members, windowFit=7).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { onBeforeUnmount, ref } from "vue";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPager,
} from "@glass/components/carousel";
import { PagerDots } from "@glass/components/pager-dots";
import { FadingScroll } from "@glass/components/fading-scroll";

const swatches = [
    { hue: 24, title: "Warm Cream", note: "base surface" },
    { hue: 340, title: "Carmine", note: "accent — destructive" },
    { hue: 160, title: "Kelp", note: "accent — success" },
    { hue: 210, title: "Slate", note: "accent — info" },
    { hue: 42, title: "Saffron", note: "accent — warning" },
];

const peekCards = [
    { category: "Foundations", id: "colors" },
    { category: "Foundations", id: "typography" },
    { category: "Foundations", id: "motion" },
    { category: "Primitives", id: "buttons" },
    { category: "Primitives", id: "inputs" },
    { category: "Navigation", id: "tabs" },
    { category: "Navigation", id: "dock" },
    { category: "Feedback", id: "toast" },
];

// 12 windowed cards — exercises the window oracle + the bed FLIP across a clipped edge.
const windowed = Array.from({ length: 12 }, (_, i) => ({
    n: i + 1,
    hue: 24 + i * 26,
}));

// ── Exhibit 1 — hero, with an autoplay a pointer or focus pauses ─────────────
const heroActive = ref(0);
const peekActive = ref(0);
const wormActive = ref(0);
const verticalActive = ref(0);
const windowActive = ref(0);

const AUTOPLAY_MS = 4200;
let autoplayTimer: ReturnType<typeof setInterval> | null = null;
const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function startAutoplay() {
    if (autoplayTimer || prefersReducedMotion) return;
    autoplayTimer = setInterval(() => {
        heroActive.value = (heroActive.value + 1) % swatches.length;
    }, AUTOPLAY_MS);
}
function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}
startAutoplay();
onBeforeUnmount(stopAutoplay);
</script>

<template>
    <StoryPage>
        <!-- ── EXHIBIT 1 — hero: single-card glass scroller + the worm focal ── -->
        <StorySection heading="Hero — single-card scroller, worm focal" gap="md">
            <p class="text-small text-muted-foreground">
                One card at a time over a live field. Drag, flick or tap a dot — the
                scroll is the platform's own, and the pager worm follows it, morphing
                dot-to-dot with liquid weight. The content is crisp glass: no filter,
                and nothing paints outside the card.
            </p>
            <ShowcaseFrame
                tier="field"
                class="mx-auto w-full max-w-md"
                @pointerenter="stopAutoplay"
                @pointerleave="startAutoplay"
                @focusin="stopAutoplay"
                @focusout="startAutoplay"
            >
                <Carousel v-model:active="heroActive" projection="travel">
                    <CarouselContent>
                        <CarouselItem
                            v-for="(s, i) in swatches"
                            :key="s.title"
                            :index="i"
                            :label="s.title"
                        >
                            <!-- the swatch paints a FIXED LIGHT hue (mode-invariant), so
                                 the label ink is a fixed warm-dark that reads on every
                                 hue in BOTH modes. -->
                            <div
                                class="flex h-48 flex-col items-start justify-end rounded-card p-5"
                                :style="{
                                    background: `hsl(${s.hue} 60% 82%)`,
                                    color: 'hsl(24 12% 12%)',
                                }"
                            >
                                <p class="text-micro uppercase tracking-widest opacity-70">
                                    {{ s.note }}
                                </p>
                                <p class="font-display text-2xl">{{ s.title }}</p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-center">
                        <PagerDots
                            v-model:active="heroActive"
                            :count="swatches.length"
                            :slide-label="(i: number) => swatches[i]?.title ?? ''"
                            aria-label="Hero carousel"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 2 — peek: multi-item + feathered edges + chevron pager ── -->
        <StorySection heading="Peek — multi-item scroller, faded edges" gap="md">
            <p class="text-small text-muted-foreground">
                A start-aligned multi-item scroller: partial members peek at the edges
                and <code class="rounded bg-muted px-1">&lt;FadingScroll&gt;</code>
                feathers them. The
                <code class="rounded bg-muted px-1">&lt;CarouselPager&gt;</code>
                chevrons and its announcing counter are this exhibit's ONE pager.
            </p>
            <ShowcaseFrame tier="quiet" class="mx-auto w-full max-w-2xl">
                <Carousel v-model:active="peekActive" class="relative">
                    <FadingScroll axis="x">
                        <CarouselContent class="carousel-peek">
                            <CarouselItem
                                v-for="(s, i) in peekCards"
                                :key="s.category + s.id"
                                :index="i"
                                :label="s.id"
                            >
                                <div
                                    class="flex h-32 flex-col justify-between rounded-card border border-border/40 glass-wash p-4"
                                >
                                    <p
                                        class="text-micro uppercase tracking-widest text-muted-foreground"
                                    >
                                        {{ s.category }}
                                    </p>
                                    <div class="flex flex-col gap-1">
                                        <p class="font-display text-lg">{{ s.id }}</p>
                                        <p class="text-micro text-muted-foreground">
                                            slide {{ i + 1 }} / {{ peekCards.length }}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </FadingScroll>
                    <div class="mt-4 flex items-center justify-center">
                        <CarouselPager />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 3 — hero-scale worm: larger dots, the waist reads ── -->
        <StorySection heading="Hero-scale worm — wide pitch, the waist reads" gap="md">
            <p class="text-small text-muted-foreground">
                Larger dots and a wider pitch: the stadium waist between the worm's two
                bodies reads unambiguously as it travels — the barbell's true home is
                the indicator, never the content. The elongation is the velocity, so it
                is widest early and exactly zero the frame the lead lands.
            </p>
            <ShowcaseFrame tier="field" class="mx-auto w-full max-w-md">
                <Carousel v-model:active="wormActive" projection="travel">
                    <CarouselContent>
                        <CarouselItem
                            v-for="(s, i) in swatches"
                            :key="s.title"
                            :index="i"
                            :label="s.title"
                        >
                            <div
                                class="flex h-40 items-center justify-center rounded-card p-5 font-display text-3xl"
                                :style="{
                                    background: `hsl(${s.hue} 60% 82%)`,
                                    color: 'hsl(24 12% 12%)',
                                }"
                            >
                                {{ s.title }}
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="carousel-worm-hero mt-5 flex items-center justify-center">
                        <PagerDots
                            v-model:active="wormActive"
                            :count="swatches.length"
                            aria-label="Hero-scale worm carousel"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 4 — vertical orientation ── -->
        <StorySection heading="Vertical — column scroller" gap="md">
            <p class="text-small text-muted-foreground">
                The same substrate on the vertical axis: the pager rail runs down the
                side and the worm morphs top-to-bottom.
            </p>
            <ShowcaseFrame tier="quiet" class="mx-auto w-full max-w-sm">
                <div class="flex items-center justify-center gap-5">
                    <div class="vertical-carousel w-56">
                        <Carousel v-model:active="verticalActive" orientation="vertical">
                            <CarouselContent>
                                <CarouselItem
                                    v-for="(s, i) in swatches"
                                    :key="s.title"
                                    :index="i"
                                    :label="s.title"
                                >
                                    <div
                                        class="flex h-40 flex-col items-start justify-end rounded-card p-5"
                                        :style="{
                                            background: `hsl(${s.hue} 60% 82%)`,
                                            color: 'hsl(24 12% 12%)',
                                        }"
                                    >
                                        <p
                                            class="text-micro uppercase tracking-widest opacity-70"
                                        >
                                            {{ s.note }}
                                        </p>
                                        <p class="font-display text-xl">{{ s.title }}</p>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <PagerDots
                        v-model:active="verticalActive"
                        orientation="vertical"
                        :count="swatches.length"
                        aria-label="Vertical carousel"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 5 — windowed: 12 members, windowFit=7 ── -->
        <StorySection heading="Windowed — 12 slides, a clipped rail" gap="md">
            <p class="text-small text-muted-foreground">
                Twelve members with a
                <code class="rounded bg-muted px-1">windowFit=7</code> pager. Every
                interior hop paints a full pitch of travel — where the window must
                slide, the bed slides under a still worm instead of teleporting around
                it — and pressing a dot never moves that dot out from under the pointer.
            </p>
            <ShowcaseFrame tier="field" class="mx-auto w-full max-w-md">
                <Carousel v-model:active="windowActive" projection="travel">
                    <CarouselContent>
                        <CarouselItem
                            v-for="(s, i) in windowed"
                            :key="s.n"
                            :index="i"
                            :label="`Slide ${s.n}`"
                        >
                            <div
                                class="flex h-36 items-center justify-center rounded-card p-5 font-display text-4xl"
                                :style="{
                                    background: `hsl(${s.hue % 360} 55% 82%)`,
                                    color: 'hsl(24 12% 12%)',
                                }"
                            >
                                {{ s.n }}
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-center">
                        <PagerDots
                            v-model:active="windowActive"
                            :count="windowed.length"
                            :window-fit="7"
                            aria-label="Windowed carousel"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Using the API"
            gap="sm"
            class="text-small text-muted-foreground"
        >
            <ul class="list-disc space-y-1 pl-5">
                <li>
                    Bind
                    <code class="rounded bg-muted px-1">v-model:active</code> — it is
                    the ONE authority, so a rapid click plus a Next-hammer has nothing
                    to double-write.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">projection</code> is the member
                    arm: <code class="rounded bg-muted px-1">"travel"</code> scales
                    every member off the live scroll position and
                    <code class="rounded bg-muted px-1">"window"</code> moves only the
                    active one — the neighbours stay put.
                </li>
                <li>
                    Wrap is refused, not deferred: native snap cannot circle, so the
                    sequence clamps.
                </li>
            </ul>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* the peek exhibit shows partial members at the edges — a demo-local basis, no
   library change (the register's own default is one member per view). */
.carousel-peek :deep([data-slot="carousel-item"]) {
    flex-basis: 66%;
}
@media (min-width: 640px) {
    .carousel-peek :deep([data-slot="carousel-item"]) {
        flex-basis: 33%;
    }
}

/* the vertical exhibit sizes the strip so the column scrolls one card at a time. */
.vertical-carousel :deep([data-slot="carousel-content"]) {
    height: 16rem;
}

/* the hero-scale worm — larger dots + a wider pitch so the stadium waist reads.
   Retunes the PagerDots consumer tokens on the scope (the documented retint seam). */
.carousel-worm-hero :deep([data-slot="pager-dots"]) {
    --pager-dot-size: 1.125rem; /* 18px worm body */
    --pager-hit-cell: 2rem; /* the wider pitch follows the cell */
    --pager-rail-gap: 0.5rem;
}
</style>
