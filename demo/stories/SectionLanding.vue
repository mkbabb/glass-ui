<script setup lang="ts">
// SectionLanding — the per-category `/<category>` D1 section hero + bento grid
// (BC.W-PAGE-CHASSIS — the SECTION-HERO model). NOT a new chassis: it is the SAME
// StoryHero at heroScale: "hero" / depth: "D1" (the LARGEST audacious rung — the
// section's identity moment) hosting the bento <SectionPreviewCard> grid of the
// category's stories. Each card carries its IconChip POP + title + blurb + the
// Fira-Code subpath chip + an inline live mini-preview (the one-GL-budget single-paint
// still on a live-GL target — BC.W-HERO-AUDACIOUS Part C/E populates the per-category
// {icon, hue, preview} content; this wave delivers the route + the bento shell).
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import StoryHero from "./StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory } from "./manifest";
import { categoryHero } from "./category-hero";

const route = useRoute();

const category = computed(() => {
    const id = route.meta.categoryId as string | undefined;
    return id ? findCategory(id) : undefined;
});

const landing = computed(() => category.value?.landing ?? null);
const eyebrow = computed(() => category.value?.title ?? null);

// BC.W-HERO-AUDACIOUS Part B/E — the per-category {icon, sectionHue} from the ONE
// CATEGORY_HERO source (never a hand-rolled SECTION_HUE duplicate). The section
// hue is the ONE color event — the IconChip POP + the eyebrow; the audacious
// title + the bento bodies stay warm ink (the one-color-event restraint).
const hero = computed(() => categoryHero(category.value?.id ?? ""));
const sectionIcon = computed(() => hero.value?.icon ?? category.value?.icon);
const sectionHue = computed(() => hero.value?.sectionHue ?? 7);
</script>

<template>
    <TooltipProvider :delay-duration="250">
        <article class="scroll-build mx-auto w-full max-w-6xl">
            <StoryHero
                v-if="category && landing"
                :background="landing.background"
                variant="hero"
                :title="landing.title"
                :eyebrow="eyebrow"
                :subpath="landing.subpath"
                :blurb="landing.blurb"
                :hero-scale="landing.heroScale"
                :depth="landing.depth"
            >
                <!-- The bento grid — one SectionPreviewCard per story, each linking to
                     its route WITH an inline live mini-preview (the SECTION-HERO model;
                     never a text-only link). The first card leads (a wider span). -->
                <section class="scroll-cascade mt-4">
                    <div
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <SectionPreviewCard
                            v-for="(story, idx) in category.stories"
                            :key="story.id"
                            :to="`/${category.id}/${story.id}`"
                            :title="story.title"
                            :blurb="story.blurb"
                            :subpath="story.subpath"
                            :icon="sectionIcon"
                            :section="sectionHue"
                            :lead="idx === 0"
                        >
                            <!-- The inline preview — a bounded inert mini-render (the
                                 user-mandate "a live mini-preview, not a text link").
                                 A budget-safe single-paint glyph-over-tint thumbnail so
                                 every card carries a NON-text preview by construction
                                 (the one-GL budget — no second live context on the
                                 landing). The per-category icon over the section tint. -->
                            <template #preview>
                                <div class="section-preview-thumb">
                                    <component
                                        :is="sectionIcon"
                                        :size="34"
                                        :stroke-width="1.5"
                                    />
                                </div>
                            </template>
                        </SectionPreviewCard>
                    </div>
                </section>
            </StoryHero>
        </article>
    </TooltipProvider>
</template>

<style scoped>
/* The budget-safe preview thumbnail — a bounded inert glyph-over-tint render (no
   GL, no second live context — the one-GL-per-route budget). BC.W-HERO-AUDACIOUS
   replaces the per-category live specimen; the shell guarantees a NON-text preview. */
.section-preview-thumb {
    display: grid;
    place-items: center;
    block-size: 7rem;
    color: color-mix(in oklab, var(--foreground), transparent 55%);
}
</style>
