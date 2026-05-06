<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselPager,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/utils/cn";

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

const pagerIndex = ref(0);

function setApi(api: CarouselApi | undefined) {
    if (!api) return;
    pagerIndex.value = api.selectedScrollSnap();
    api.on("select", () => {
        pagerIndex.value = api.selectedScrollSnap();
    });
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Carousel pager + dots substrate</h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;CarouselPager&gt;</code> composes
                <code class="rounded bg-muted px-1">&lt;Button variant="ghost" size="icon"&gt;</code> chevrons
                with a "X / N" counter pill;
                <code class="rounded bg-muted px-1">&lt;CarouselDots&gt;</code> renders a dot per snap with
                the active rung lifted via <code class="rounded bg-muted px-1">--scale-hover</code>. Both
                wire to the embla API via <code class="rounded bg-muted px-1">useCarousel()</code>.
            </p>
            <div class="relative mx-auto flex w-full max-w-md flex-col gap-4">
                <Carousel class="rounded-[var(--radius-card)] border border-border/40 bg-card/30 p-4">
                    <CarouselContent>
                        <CarouselItem v-for="s in slides" :key="s.title">
                            <div
                                class="flex h-48 flex-col items-start justify-end rounded-card p-5 text-foreground"
                                :style="{ background: `hsl(${s.hue} 60% 82%)` }"
                            >
                                <p class="text-xs uppercase tracking-widest opacity-70">{{ s.note }}</p>
                                <p class="font-display text-2xl">{{ s.title }}</p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div class="mt-4 flex items-center justify-between gap-3">
                        <CarouselDots />
                        <CarouselPager />
                    </div>
                </Carousel>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Glass carousel — story pager</h2>
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
                    <CarouselDots class="absolute inset-x-0 -bottom-6 justify-center" />
                    <div class="mt-8 flex items-center justify-center">
                        <CarouselPager />
                    </div>
                </Carousel>
            </div>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">Using the API</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li>Listen on <code class="rounded bg-muted px-1">@init-api</code> to capture the Embla instance.</li>
                <li>Call <code class="rounded bg-muted px-1">api.scrollTo(i)</code> to drive the pager from elsewhere (dots, keyboard, URL).</li>
                <li>Subscribe to <code class="rounded bg-muted px-1">"select"</code> for the active index.</li>
            </ul>
        </section>
    </StoryPage>
</template>
