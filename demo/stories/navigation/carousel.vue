<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { onBeforeUnmount, ref } from "vue";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPager,
    type CarouselApi,
} from "@glass/components/ui/carousel";
import { PagerDots } from "@glass/components/custom/pager-dots";
import { IconChip } from "@glass/components/custom/icon-chip";
import { GalleryHorizontal } from "@lucide/vue";
import { cn } from "@glass/utils/cn";

// BC.W-SUFFUSE-reconcile — the navigation band's ONE coherent --section-color-12 indigo identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape).
const NAV_STOP = 12;

const slides = [
    { hue: 24, title: "Warm Cream", note: "base surface" },
    { hue: 340, title: "Carmine", note: "accent — destructive" },
    { hue: 160, title: "Kelp", note: "accent — success" },
    { hue: 210, title: "Slate", note: "accent — info" },
    { hue: 42, title: "Saffron", note: "accent — warning" },
];

const stories = [
    { category: "Foundations", id: "colors" },
    { category: "Foundations", id: "typography" },
    { category: "Foundations", id: "motion" },
    { category: "Primitives", id: "buttons" },
    { category: "Primitives", id: "inputs" },
    { category: "Navigation", id: "tabs" },
    { category: "Navigation", id: "dock" },
];

// The first section's dots — driven off the embla API (PagerDots is standalone,
// so the story wires count/active/@select rather than the prior auto-inject).
const heroApi = ref<CarouselApi>();
const heroIndex = ref(0);

// BD.W-CAROUSEL-DECK-GLASS §5 — the AUTO-ADVANCE driver (the calm-auto-motion exerciser).
// A plain interval `scrollNext`s the hero carousel — NO embla-autoplay dep (KISS). The
// auto-advance is PROGRAMMATIC (no DOM gesture), so CarouselContent reads it as ambient and
// stamps `data-autoplay` on the goo host → `--motion-weight: 0` mutes the cartoon punch
// (calm). A real swipe/Next/keyboard dispatches a pointerdown/keydown → the weighty driver
// punch returns. The timer pauses while the pointer is over the carousel (intent to read)
// and respects reduced-motion (no ambient drift).
const AUTOPLAY_MS = 3800;
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
    heroIndex.value = api.selectedScrollSnap();
    api.on("select", () => {
        heroIndex.value = api.selectedScrollSnap();
    });
    startAutoplay();
}

const pagerApi = ref<CarouselApi>();
const pagerIndex = ref(0);
function setApi(api: CarouselApi | undefined) {
    if (!api) return;
    pagerApi.value = api;
    pagerIndex.value = api.selectedScrollSnap();
    api.on("select", () => {
        pagerIndex.value = api.selectedScrollSnap();
    });
}
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${NAV_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="GalleryHorizontal" :section="NAV_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Navigation · Carousel
                </span>
                <p class="text-small text-muted-foreground">
                    Paged item scrollers with dot pagers — the section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection heading="Carousel pager + dots substrate" gap="md">
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;CarouselPager&gt;</code> composes
                <code class="rounded bg-muted px-1">&lt;Button variant="ghost" iconOnly&gt;</code> chevrons
                with a "X / N" counter in the
                <code class="rounded bg-muted px-1">.glass-pager-ring</code> glass pill chassis;
                <code class="rounded bg-muted px-1">&lt;PagerDots&gt;</code> renders the same dark/light-safe
                position-dot register in a matched ring (the one register the carousel ships and the slides
                deck adopts), the active dot elongating into a pip via a real emitted morph. The pager reads
                as ONE encapsulated glass control — no opaque slab, no bare floating dot row.
            </p>
            <div class="relative mx-auto flex w-full max-w-md flex-col gap-4">
                <Carousel
                    class="rounded-[var(--radius-card)] border border-border/40 bg-card/30 p-4"
                    @init-api="setHeroApi"
                    @pointerenter="stopAutoplay"
                    @pointerleave="startAutoplay"
                    @focusin="stopAutoplay"
                    @focusout="startAutoplay"
                >
                    <CarouselContent>
                        <CarouselItem v-for="s in slides" :key="s.title">
                            <!-- F2.R1 W-DARK-READABILITY-REPAIR (paint re-open): the swatch
                                 paints a FIXED LIGHT hue (mode-invariant hsl 82% L), so the
                                 label ink must NOT follow --foreground into cream in dark
                                 (where "Warm Cream"/"Kelp"/… collapsed to WCAG ~1.05 on the
                                 light chip). A fixed warm-dark ink reads on every light hue in
                                 BOTH modes — the swatch is always light. -->
                            <div
                                class="flex h-48 flex-col items-start justify-end rounded-card p-5"
                                :style="{ background: `hsl(${s.hue} 60% 82%)`, color: 'hsl(24 12% 12%)' }"
                            >
                                <p class="text-xs uppercase tracking-widest opacity-70">{{ s.note }}</p>
                                <p class="font-display text-2xl">{{ s.title }}</p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-between gap-3">
                        <PagerDots
                            :count="slides.length"
                            :active="heroIndex"
                            @select="(i: number) => heroApi?.scrollTo(i)"
                        />
                        <CarouselPager />
                    </div>
                </Carousel>
            </div>
        </StorySection>

        <StorySection heading="Glass carousel — story pager" gap="md">
            <p class="text-sm text-muted-foreground">
                Wraps the same primitive in a glass-surface scroller with a dot indicator. This is the exact
                treatment the demo uses to page through stories inside a category.
            </p>
            <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/30 p-4">
                <Carousel
                    :opts="{ align: 'start' }"
                    class="relative"
                    @init-api="setApi"
                >
                    <CarouselContent class="-ml-3">
                        <CarouselItem
                            v-for="(s, i) in stories"
                            :key="s.category + s.id"
                            class="basis-2/3 pl-3 sm:basis-1/3"
                        >
                            <div
                                :class="cn(
                                    'flex h-32 flex-col justify-between rounded-[var(--radius-card)] border p-4 transition-colors',
                                    'glass-wash',
                                    i === pagerIndex ? 'border-foreground/40' : 'border-border/40 opacity-70'
                                )"
                            >
                                <p class="text-[10px] uppercase tracking-widest text-muted-foreground">
                                    {{ s.category }}
                                </p>
                                <div class="flex flex-col gap-1">
                                    <p class="font-display text-lg">{{ s.id }}</p>
                                    <p class="text-xs text-muted-foreground">slide {{ i + 1 }} / {{ stories.length }}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <PagerDots
                        class="absolute inset-x-0 -bottom-6 mx-auto"
                        :count="stories.length"
                        :active="pagerIndex"
                        @select="(i: number) => pagerApi?.scrollTo(i)"
                    />
                    <div class="mt-8 flex items-center justify-center">
                        <CarouselPager />
                    </div>
                </Carousel>
            </div>
        </StorySection>

        <StorySection heading="Using the API" gap="sm" class="text-sm text-muted-foreground">
            <ul class="list-disc pl-5 space-y-1">
                <li>Listen on <code class="rounded bg-muted px-1">@init-api</code> to capture the Embla instance.</li>
                <li>Call <code class="rounded bg-muted px-1">api.scrollTo(i)</code> to drive the pager from elsewhere (dots, keyboard, URL).</li>
                <li>Subscribe to <code class="rounded bg-muted px-1">"select"</code> for the active index.</li>
            </ul>
        </StorySection>
    </StoryPage>
</template>
