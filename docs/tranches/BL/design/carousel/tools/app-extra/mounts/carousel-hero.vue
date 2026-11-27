<script setup lang="ts">
// Source (c) of the carousel study: atlas's home deck (sci-report
// dashboards/home/hero/HeroStage.vue) rebuilt on this tree's own Carousel, so the
// carousel's own cost can be read apart from its content's.
//
//   ?c=carousel-hero&content=none|webp|svg|canvas[&live=always|active|moving|slot][&link=1][&start=k]
//
// Same shape as atlas's stage: Carousel projection="travel", v-model:active shared
// with PagerDots, a 2rem gutter, a static pill GlassDock holding previous, the dots
// (ring off) and next; the split layout from a 56rem stage. Only the slide content
// changes between variants:
//   none    a flat 16:10 card (the carousel alone)
//   webp    one 2880x1800 WebP per slide, eager first, lazy after, decoding async
//   svg     a live SVG figure per slide (CarouselFigure.vue)
//   canvas  a live canvas figure per slide
// live=always runs every figure on every frame; live=active runs a figure only while
// its slide is the active one and the strip is still, read by the page from the deck's
// position and velocity. live=moving runs it only while the slot's `active` holds and
// its `moving` does not (all eight mounted). live=slot adds the page's own near window
// (carousel-near.vue): a figure exists only near where the strip last rested.
// link=1 wraps each slide in a link, as atlas's previews are (the keyboard route).
// start=k mounts the Carousel with v-model:active already k (the start cell).
// member=<length> and gutter=<length> set each member's flex basis and the gutter, so
// projection=none&member=16rem&gutter=1rem is a strip shaped like fourier's featured row
// (GalleryFeaturedCarousel.vue), several members on screen at once.
import { ref } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { Carousel, CarouselContent, CarouselItem } from "@glass/components/carousel";
import { PagerDots } from "@glass/components/pager-dots";
import { GlassDock } from "@glass/components/dock";
import { Button } from "@glass/components/button";
import CarouselFigure from "./carousel-figure.vue";
import CarouselNear from "./carousel-near.vue";

const q = new URLSearchParams(location.search);
const content = q.get("content") ?? "none";
const live = (["active", "moving", "slot"] as const).find((v) => v === q.get("live")) ?? "always";
const link = q.get("link") === "1";
// Two controls, for the carousel's own cost (content none):
//   bare=1          the same strip and member classes with no Carousel at all: the
//                   platform's scroll-snap alone (no commit, no projection, no pager)
//   projection=none the Carousel without its per-scroll member writes
const bare = q.get("bare") === "1";
const projection = q.get("projection") === "none" ? "none" : "travel";
const member = q.get("member");
const gutter = q.get("gutter");
const N = 8;

const imgs = import.meta.glob("../carousel-img/*.webp", {
    eager: true,
    query: "?url",
    import: "default",
}) as Record<string, string>;
const urls = Object.keys(imgs)
    .sort()
    .map((k) => imgs[k]!);

const slides = Array.from({ length: N }, (_, i) => ({
    i,
    hue: 20 + i * 40,
    src: urls.length ? urls[i % urls.length] : "",
}));
const active = ref(Math.max(0, Math.trunc(Number(q.get("start") ?? 0)) || 0));
(window as unknown as { __heroInfo: unknown }).__heroInfo = { content, live, link, N, images: urls.length, bare, projection, member, gutter };
</script>

<template>
    <div v-if="bare" class="hero-stage" data-testid="hero-stage" data-content="bare">
        <div class="hero-stage__carousel relative" data-testid="hero-carousel">
            <div class="carousel-strip hero-stage__strip" data-slot="carousel-content" data-orientation="horizontal">
                <div
                    v-for="s in slides"
                    :key="s.i"
                    class="carousel-item"
                    data-slot="carousel-item"
                    :data-state="s.i === 0 ? 'active' : 'next'"
                >
                    <div class="carousel-item-content">
                        <div class="hero-frame" :style="{ background: `hsl(${s.hue} 45% 90%)` }">
                            <span class="hero-num">{{ s.i + 1 }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else
        class="hero-stage"
        data-testid="hero-stage"
        :data-content="content"
        :data-live="live"
        :data-member="member ? '' : undefined"
        :style="{ '--hero-member': member ?? undefined, '--hero-gutter': gutter ?? undefined }"
    >
        <Carousel
            v-model:active="active"
            aria-label="Dashboards"
            :projection="projection"
            class="hero-stage__carousel"
            data-testid="hero-carousel"
        >
            <template #default="{ deck }">
                <CarouselContent class="hero-stage__strip">
                    <CarouselItem v-for="s in slides" :key="s.i" :index="s.i" :label="`Slide ${s.i + 1}`" v-slot="slot">
                        <component
                            :is="link ? 'a' : 'div'"
                            :href="link ? `#slide-${s.i + 1}` : undefined"
                            class="hero-frame"
                            :style="{ background: `hsl(${s.hue} 45% 90%)`, contain: live !== 'always' ? 'paint' : undefined }"
                        >
                            <img
                                v-if="content === 'webp'"
                                class="hero-img"
                                :src="s.src"
                                width="2880"
                                height="1800"
                                :loading="s.i === 0 ? 'eager' : 'lazy'"
                                :fetchpriority="s.i === 0 ? 'high' : 'auto'"
                                decoding="async"
                                alt=""
                            />
                            <CarouselNear
                                v-else-if="(content === 'svg' || content === 'canvas') && live === 'slot'"
                                v-slot="near"
                            >
                                <CarouselFigure :kind="content" :seed="s.i" live="slot" :running="near.running" />
                            </CarouselNear>
                            <CarouselFigure
                                v-else-if="content === 'svg' || content === 'canvas'"
                                :kind="content"
                                :seed="s.i"
                                :live="live === 'moving' ? 'slot' : live"
                                :running="live === 'moving' ? slot.active && !slot.moving : undefined"
                            />
                            <span v-else class="hero-num">{{ s.i + 1 }}</span>
                        </component>
                    </CarouselItem>
                </CarouselContent>

                <div class="hero-stage__side">
                    <p class="hero-stage__caption">Slide {{ active + 1 }} of {{ N }}</p>
                    <div class="hero-stage__dock-row">
                        <GlassDock
                            orientation="horizontal"
                            :collapse="false"
                            backdrop-mode="static"
                            shape="pill"
                            fit-content
                            class="hero-stage__dock"
                            data-testid="hero-dock"
                        >
                            <Button
                                emphasis="quiet"
                                icon-only
                                aria-label="Previous"
                                class="hero-stage__chevron"
                                :disabled="!deck.canPrev.value"
                                data-testid="hero-prev"
                                @click="deck.prev()"
                            >
                                <ChevronLeft class="size-4" aria-hidden="true" />
                            </Button>
                            <PagerDots
                                v-model:active="active"
                                :count="slides.length"
                                :ring="false"
                                aria-label="Choose a slide"
                            />
                            <Button
                                emphasis="quiet"
                                icon-only
                                aria-label="Next"
                                class="hero-stage__chevron"
                                :disabled="!deck.canNext.value"
                                data-testid="hero-next"
                                @click="deck.next()"
                            >
                                <ChevronRight class="size-4" aria-hidden="true" />
                            </Button>
                        </GlassDock>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
.hero-stage {
    container: hero-stage / inline-size;
    min-inline-size: 0;
    max-inline-size: 1240px;
    margin-inline: auto;
}
.hero-stage :deep(.hero-stage__strip) {
    --carousel-gutter: var(--hero-gutter, 2rem);
}
.hero-stage[data-member] :deep(.carousel-item) {
    flex: 0 0 var(--hero-member);
}
.hero-frame {
    color: inherit;
    display: grid;
    place-items: center;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid rgb(0 0 0 / 0.12);
}
.hero-img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: contain;
}
.hero-num {
    font: 600 4rem/1 ui-sans-serif, system-ui;
    opacity: 0.5;
}
.hero-stage__side {
    display: grid;
    gap: 1rem;
    padding-block-start: 0.75rem;
}
.hero-stage__caption {
    margin: 0;
    font: 600 1.1rem/1.3 ui-sans-serif, system-ui;
}
.hero-stage__dock-row {
    display: grid;
    justify-items: center;
}
@container hero-stage not (min-width: 56rem) {
    .hero-stage__chevron {
        display: none;
    }
}
@container hero-stage (min-width: 56rem) {
    .hero-stage__carousel {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 13rem;
        grid-template-rows: auto auto;
        column-gap: 1.75rem;
        row-gap: 1rem;
    }
    .hero-stage :deep(.hero-stage__strip) {
        grid-area: 1 / 1 / 2 / 2;
        min-inline-size: 0;
    }
    .hero-stage__side {
        display: contents;
    }
    .hero-stage__caption {
        grid-area: 1 / 2 / 2 / 3;
        align-self: start;
    }
    .hero-stage__dock-row {
        grid-area: 2 / 1 / 3 / 2;
    }
}
</style>
