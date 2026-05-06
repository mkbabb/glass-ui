<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import StoryPage from "../StoryPage.vue";
import { Button } from "@/components/ui/button";
import {
    GlassCarousel,
    GlassCarouselItem,
    useGlassCarousel,
} from "@/components/custom/glass-carousel";

interface Slide {
    id: string;
    title: string;
    metric: string;
    note: string;
    accent: string;
}

const slides: Slide[] = [
    {
        id: "alpha",
        title: "Alpha intake",
        metric: "18 queued",
        note: "New work ready for review.",
        accent: "var(--section-color-0)",
    },
    {
        id: "beta",
        title: "Beta polish",
        metric: "7 active",
        note: "Design pass and acceptance checks.",
        accent: "var(--section-color-2)",
    },
    {
        id: "gamma",
        title: "Gamma release",
        metric: "3 blocked",
        note: "Waiting on downstream validation.",
        accent: "var(--section-color-4)",
    },
    {
        id: "delta",
        title: "Delta archive",
        metric: "42 shipped",
        note: "Closed work retained for audit.",
        accent: "var(--section-color-6)",
    },
    {
        id: "omega",
        title: "Omega sweep",
        metric: "9 follow-ups",
        note: "Residual items routed to the next pass.",
        accent: "var(--section-color-8)",
    },
];

const firstSlide = slides[0]!;
const activeIndex = ref(0);
const carouselExpanded = ref(true);
const activeSlide = computed(() => slides[activeIndex.value] ?? firstSlide);

function wrapSlideIndex(index: number): number {
    return (index + slides.length) % slides.length;
}

function goToSlide(index: number) {
    activeIndex.value = wrapSlideIndex(index);
}

function goPrevious() {
    goToSlide(activeIndex.value - 1);
}

function goNext() {
    goToSlide(activeIndex.value + 1);
}

const harnessRoot = ref<HTMLElement | null>(null);
const harnessViewport = ref<HTMLElement | null>(null);
const harnessOrientation = ref<"horizontal" | "vertical">("horizontal");
const harnessExpanded = ref(true);
const harnessIndex = ref(0);

const {
    canScrollStart,
    canScrollEnd,
    scrollToItem,
    updateOverflow,
    visualExpanded,
    isTransitioning,
    transitionSize,
    suppressTransition,
    onTransitionEnd,
} = useGlassCarousel({
    orientation: harnessOrientation,
    expanded: harnessExpanded,
    rootEl: harnessRoot,
    viewportEl: harnessViewport,
});

const harnessRootStyle = computed(() => {
    if (transitionSize.value == null) return undefined;
    return { width: transitionSize.value };
});

function scrollHarness(index: number) {
    harnessIndex.value = wrapSlideIndex(index);
    scrollToItem(harnessIndex.value);
    void nextTick(updateOverflow);
}

onMounted(updateOverflow);
</script>

<template>
    <StoryPage content-class="gap-12">
        <section class="grid gap-4">
            <div class="flex flex-wrap items-end justify-between gap-3">
                <div class="grid gap-1">
                    <h2 class="text-subheading">GlassCarousel pager</h2>
                    <p class="text-small text-muted-foreground">
                        Slide {{ activeIndex + 1 }} / {{ slides.length }} -
                        {{ activeSlide.title }}
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Previous glass carousel slide"
                        @click="goPrevious"
                    >
                        <ChevronLeft class="size-4" />
                    </Button>
                    <span
                        class="rounded-pill border border-border bg-card px-3 py-1 text-mono-caption"
                        data-glass-carousel-index
                    >
                        {{ activeIndex + 1 }} / {{ slides.length }}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Next glass carousel slide"
                        @click="goNext"
                    >
                        <ChevronRight class="size-4" />
                    </Button>
                    <Button
                        variant="glass"
                        size="sm"
                        @click="carouselExpanded = !carouselExpanded"
                    >
                        {{ carouselExpanded ? "Collapse" : "Expand" }}
                    </Button>
                </div>
            </div>

            <div class="rounded-card border border-border bg-card/40 p-4 shadow-cartoon">
                <GlassCarousel
                    orientation="horizontal"
                    :expanded="carouselExpanded"
                    snap="mandatory"
                    class="w-full"
                    data-glass-carousel
                >
                    <GlassCarouselItem
                        v-for="(slide, index) in slides"
                        :key="slide.id"
                        :active="index === activeIndex"
                        class="min-h-44 min-w-[13rem] flex-col items-start justify-between gap-5 whitespace-normal border border-border/70 px-4 py-5 text-left"
                        :class="index === activeIndex ? 'bg-background shadow-cartoon-sm' : 'bg-background/40'"
                        @click="goToSlide(index)"
                    >
                        <span
                            class="h-1.5 w-14 rounded-pill"
                            :style="{ background: slide.accent }"
                        />
                        <span class="grid gap-1">
                            <span class="font-display text-xl text-foreground">
                                {{ slide.title }}
                            </span>
                            <span class="text-small text-muted-foreground">
                                {{ slide.note }}
                            </span>
                        </span>
                        <span class="text-admin-label text-muted-foreground">
                            {{ slide.metric }}
                        </span>
                    </GlassCarouselItem>
                </GlassCarousel>
            </div>
        </section>

        <section class="grid gap-4">
            <div class="flex flex-wrap items-end justify-between gap-3">
                <div class="grid gap-1">
                    <h2 class="text-subheading">Composable control strip</h2>
                    <p
                        class="text-small text-muted-foreground"
                        data-use-glass-carousel-readout
                    >
                        useGlassCarousel:
                        start={{ canScrollStart }},
                        end={{ canScrollEnd }},
                        visualExpanded={{ visualExpanded }},
                        transitioning={{ isTransitioning }}
                    </p>
                </div>
                <Button
                    variant="glass-wash"
                    size="sm"
                    @click="harnessExpanded = !harnessExpanded"
                >
                    {{ harnessExpanded ? "Compact strip" : "Expand strip" }}
                </Button>
            </div>

            <div
                ref="harnessRoot"
                class="max-w-full overflow-hidden rounded-card border border-border bg-card/40 transition-[width] duration-300"
                :class="[
                    visualExpanded ? 'w-full' : 'w-80',
                    suppressTransition ? 'transition-none' : '',
                ]"
                :style="harnessRootStyle"
                @transitionend="onTransitionEnd"
            >
                <div
                    ref="harnessViewport"
                    class="flex gap-3 overflow-x-auto p-3"
                    @scroll="updateOverflow"
                >
                    <button
                        v-for="(slide, index) in slides"
                        :key="`harness-${slide.id}`"
                        class="flex min-w-44 shrink-0 flex-col gap-2 rounded-md border border-border bg-background px-3 py-3 text-left transition-colors hover:border-foreground/40"
                        :class="index === harnessIndex ? 'shadow-cartoon-sm' : 'opacity-75'"
                        @click="scrollHarness(index)"
                    >
                        <span class="text-admin-label text-muted-foreground">
                            Item {{ index + 1 }}
                        </span>
                        <span class="font-display text-base">{{ slide.title }}</span>
                    </button>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Previous composable item"
                    @click="scrollHarness(harnessIndex - 1)"
                >
                    <ChevronLeft class="size-4" />
                    Previous
                </Button>
                <span class="rounded-pill bg-muted px-3 py-1 text-mono-caption">
                    Composable item {{ harnessIndex + 1 }} / {{ slides.length }}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Next composable item"
                    @click="scrollHarness(harnessIndex + 1)"
                >
                    Next
                    <ChevronRight class="size-4" />
                </Button>
            </div>
        </section>
    </StoryPage>
</template>
