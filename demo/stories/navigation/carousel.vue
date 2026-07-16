<script setup lang="ts">
// the /navigation/carousel page, rebuilt as several workflows.
//
// The content BARBELL (the 559px-escape category error) is GONE — the carousel is crisp
// weighty embla scroll, and the ONE metaball morph is the pager worm (PagerDots). Five
// exhibits, ONE pager per exhibit (the overlapping absolute pager + the competing
// side-by-side pager/counter RETIRED): §hero single-card glass scroller over a real field
// with the drag-scrub worm focal; §peek multi-item + FadingScroll edges; §hero-scale worm;
// §vertical; §windowed (12 slides, windowFit=7).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { onBeforeUnmount, ref } from "vue";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPager,
    type CarouselApi,
} from "@glass/components/carousel";
import { PagerDots } from "@glass/components/pager-dots";
import { FadingScroll } from "@glass/components/fading-scroll";
import { cn } from "@glass/components/_shared/class-names";

// reconcile — the navigation band's ONE coherent --section-color-12 indigo
// identity (PH3-safe inline borderLeft, not the double-header shape).

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

// 12 windowed cards — proves pagerWindow + the worm re-seat across a clipped rail edge.
const windowed = Array.from({ length: 12 }, (_, i) => ({
    n: i + 1,
    hue: 24 + i * 26,
}));

// ── Exhibit 1 — hero: single-card glass scroller + semantic pager ────────────────────
const heroApi = ref<CarouselApi>();
const heroScrub = ref(0);

const AUTOPLAY_MS = 4200;
let autoplayTimer: ReturnType<typeof setInterval> | null = null;
const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function startAutoplay() {
    if (autoplayTimer || prefersReducedMotion) return;
    autoplayTimer = setInterval(() => {
        const api = heroApi.value;
        if (!api) return;
        if (api.canScrollNext()) api.scrollNext();
        else api.scrollTo(0);
    }, AUTOPLAY_MS);
}
function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}
onBeforeUnmount(stopAutoplay);

function setHeroApi(api: CarouselApi | undefined) {
    if (!api) return;
    heroApi.value = api;
    heroScrub.value = api.selectedScrollSnap();
    api.on("select", () => {
        heroScrub.value = api.selectedScrollSnap();
    });
    startAutoplay();
}
function heroTo(i: number) {
    heroApi.value?.scrollTo(i);
}

// ── Exhibits 3–5 — embla is the ONE authority via v-model:active ─────────────────────
const wormActive = ref(0);
const verticalActive = ref(0);
const windowActive = ref(0);
</script>

<template>
    <StoryPage>

        <!-- ── EXHIBIT 1 — hero: single-card glass scroller + drag-scrub worm focal ── -->
        <StorySection heading="Hero — single-card scroller, worm focal" gap="md">
            <p class="text-sm text-muted-foreground">
                One card at a time over a live field. Drag or tap a dot — the pager worm
                <em>follows</em> the scroll (the drag-scrub), morphing dot-to-dot with liquid
                weight; the content is crisp glass, no filter, nothing paints outside the card.
            </p>
            <ShowcaseFrame
                tier="field"
                class="mx-auto w-full max-w-md"
                @pointerenter="stopAutoplay"
                @pointerleave="startAutoplay"
                @focusin="stopAutoplay"
                @focusout="startAutoplay"
            >
                <Carousel @init-api="setHeroApi">
                    <CarouselContent arrival>
                        <CarouselItem v-for="s in swatches" :key="s.title">
                            <!-- the swatch paints a FIXED LIGHT hue (mode-invariant), so the
                                 label ink is a fixed warm-dark that reads on every hue in BOTH
                                 modes (the swatch is always light). -->
                            <div
                                class="flex h-48 flex-col items-start justify-end rounded-card p-5"
                                :style="{ background: `hsl(${s.hue} 60% 82%)`, color: 'hsl(24 12% 12%)' }"
                            >
                                <p class="text-xs uppercase tracking-widest opacity-70">{{ s.note }}</p>
                                <p class="font-display text-2xl">{{ s.title }}</p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-center">
                        <PagerDots
                            :count="swatches.length"
                            :active="heroScrub"
                            aria-label="Hero carousel"
                            @select="heroTo"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 2 — peek: multi-item + FadingScroll edges + chevron pager ── -->
        <StorySection heading="Peek — multi-item scroller, faded edges" gap="md">
            <p class="text-sm text-muted-foreground">
                A start-aligned multi-item scroller: partial slides peek at the edges,
                <code class="rounded bg-muted px-1">&lt;FadingScroll&gt;</code> feathers them.
                The <code class="rounded bg-muted px-1">&lt;CarouselPager&gt;</code> chevrons +
                counter are the ONE pager for this exhibit.
            </p>
            <ShowcaseFrame tier="quiet" class="mx-auto w-full max-w-2xl">
                <Carousel :opts="{ align: 'start', containScroll: 'trimSnaps' }" class="relative">
                    <FadingScroll axis="x">
                        <CarouselContent class="-ml-3">
                            <CarouselItem
                                v-for="(s, i) in peekCards"
                                :key="s.category + s.id"
                                class="basis-2/3 pl-3 sm:basis-1/3"
                            >
                                <div
                                    class="flex h-32 flex-col justify-between rounded-card border border-border/40 glass-wash p-4"
                                >
                                    <p class="text-[10px] uppercase tracking-widest text-muted-foreground">
                                        {{ s.category }}
                                    </p>
                                    <div class="flex flex-col gap-1">
                                        <p class="font-display text-lg">{{ s.id }}</p>
                                        <p class="text-xs text-muted-foreground">
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

        <!-- ── EXHIBIT 3 — hero-scale worm: larger dots, the metaball waist reads ── -->
        <StorySection heading="Hero-scale worm — wide pitch, the waist reads" gap="md">
            <p class="text-sm text-muted-foreground">
                Larger dots + a wider pitch: the metaball waist between the worm's two bodies
                reads unambiguously as it travels — the barbell's true home (the indicator, not
                the content). <code class="rounded bg-muted px-1">v-model:active</code> is the
                authority.
            </p>
            <ShowcaseFrame tier="field" class="mx-auto w-full max-w-md">
                <Carousel v-model:active="wormActive">
                    <CarouselContent arrival>
                        <CarouselItem v-for="s in swatches" :key="s.title">
                            <div
                                class="flex h-40 items-center justify-center rounded-card p-5 font-display text-3xl"
                                :style="{ background: `hsl(${s.hue} 60% 82%)`, color: 'hsl(24 12% 12%)' }"
                            >
                                {{ s.title }}
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="carousel-worm-hero mt-5 flex items-center justify-center">
                        <PagerDots
                            :count="swatches.length"
                            :active="wormActive"
                            aria-label="Hero-scale worm carousel"
                            @select="(i: number) => (wormActive = i)"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 4 — vertical orientation ── -->
        <StorySection heading="Vertical — column scroller" gap="md">
            <p class="text-sm text-muted-foreground">
                The same engine on the vertical axis: the pager rail runs down the side and the
                worm morphs top-to-bottom.
            </p>
            <ShowcaseFrame tier="quiet" class="mx-auto w-full max-w-sm">
                <div class="flex items-center justify-center gap-5">
                    <div class="vertical-carousel w-56">
                        <Carousel v-model:active="verticalActive" orientation="vertical">
                            <CarouselContent>
                                <CarouselItem v-for="s in swatches" :key="s.title">
                                    <div
                                        class="flex h-40 flex-col items-start justify-end rounded-card p-5"
                                        :style="{ background: `hsl(${s.hue} 60% 82%)`, color: 'hsl(24 12% 12%)' }"
                                    >
                                        <p class="text-xs uppercase tracking-widest opacity-70">{{ s.note }}</p>
                                        <p class="font-display text-xl">{{ s.title }}</p>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <PagerDots
                        orientation="vertical"
                        :count="swatches.length"
                        :active="verticalActive"
                        aria-label="Vertical carousel"
                        @select="(i: number) => (verticalActive = i)"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- ── EXHIBIT 5 — windowed: 12 slides, windowFit=7, worm re-seat across the clip ── -->
        <StorySection heading="Windowed — 12 slides, a clipped rail" gap="md">
            <p class="text-sm text-muted-foreground">
                Twelve slides with a <code class="rounded bg-muted px-1">windowFit=7</code> pager:
                the rail windows to the active dot and the worm re-seats cleanly across the
                clipped edge as you page.
            </p>
            <ShowcaseFrame tier="field" class="mx-auto w-full max-w-md">
                <Carousel v-model:active="windowActive">
                    <CarouselContent arrival>
                        <CarouselItem v-for="s in windowed" :key="s.n">
                            <div
                                class="flex h-36 items-center justify-center rounded-card p-5 font-display text-4xl"
                                :style="{ background: `hsl(${s.hue % 360} 55% 82%)`, color: 'hsl(24 12% 12%)' }"
                            >
                                {{ s.n }}
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-center">
                        <PagerDots
                            :count="windowed.length"
                            :active="windowActive"
                            :window-fit="7"
                            aria-label="Windowed carousel"
                            @select="(i: number) => (windowActive = i)"
                        />
                    </div>
                </Carousel>
            </ShowcaseFrame>
        </StorySection>

        <StorySection heading="Using the API" gap="sm" class="text-sm text-muted-foreground">
            <ul class="list-disc space-y-1 pl-5">
                <li>Bind <code class="rounded bg-muted px-1">v-model:active</code> — embla owns the authority; a rapid click + Next-hammer never double-writes.</li>
                <li>Listen on <code class="rounded bg-muted px-1">@init-api</code> to capture the Embla instance for a custom scrub (the hero drag-scrub).</li>
                <li>The pager worm follows the scroll; the content is crisp — no filter, nothing paints outside the card.</li>
            </ul>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* the vertical exhibit sizes the embla VIEWPORT (data-slot="carousel-content") so the
   column scrolls one card at a time — a demo-local height, no library change. */
.vertical-carousel :deep([data-slot="carousel-content"]) {
    height: 16rem;
}

/* the hero-scale worm — larger dots + a wider pitch so the metaball waist reads. Retunes
   the PagerDots consumer tokens on the scope (the documented retint seam). */
.carousel-worm-hero :deep([data-slot="pager-dots"]) {
    --pager-dot-size: 1.125rem; /* 18px worm body — a wider metaball waist reads */
    --pager-dot-elongated: 3rem; /* the wider travel pitch */
    gap: 0.625rem;
}
</style>
