<script setup lang="ts">
// SectionLanding — the per-category `/<category>` D1 section hero + bento grid
// (the SECTION-HERO model). NOT a new chassis: it is the SAME StoryHero at
// heroScale: "hero" / depth: "D1" (the section's identity moment) hosting the bento
// <SectionPreviewCard> grid of the category's stories. Each card's HERO is the
// story's RESOLVED live tile (BI.W-LIVE-TILES — the per-story ladder: a co-located
// `.tile.vue`, a frozen viz still, a data-page body marquee, or the identity floor)
// — never a shared per-category silhouette. The landing mounts 0 GL contexts.
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "@glass/components/ui/tooltip";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory } from "../../stories/manifest";
import type { Story } from "../../stories/manifest";
import { categoryHero } from "../hero/category-hero";
import { warmFieldHue } from "../hero/warm-field";
import { resolveStoryTile } from "./storyTile";

const route = useRoute();

const category = computed(() => {
    const id = route.meta.categoryId as string | undefined;
    return id ? findCategory(id) : undefined;
});

const landing = computed(() => category.value?.landing ?? null);
const eyebrow = computed(() => category.value?.title ?? null);

// BC.W-HERO-AUDACIOUS Part B/E — the per-category {icon, sectionHue} from the ONE
// CATEGORY_HERO source. The section hue is the ONE color event — the IconChip POP +
// the eyebrow; the audacious title + the bento bodies stay warm ink.
const hero = computed(() => categoryHero(category.value?.id ?? ""));
const sectionIcon = computed(() => hero.value?.icon ?? category.value?.icon);
const sectionHue = computed(() => hero.value?.sectionHue ?? 7);

// The per-card WARM field hue (CONSUME `warmFieldHue`, the ONE warm-projection
// source; teal/navy impossible by construction). The bento field + each card's
// tile stage transmit this warm floor.
const cardFieldH = computed(() => warmFieldHue(category.value?.id ?? "foundations"));

// BI.W-LIVE-TILES — resolve each story's tile via the ladder (authored `.tile.vue`
// → frozen viz still → data-page body marquee → identity floor). Every row resolves
// a real tile (no stale-tile hole); the landing mounts 0 GL contexts.
function tileFor(story: Story) {
    return resolveStoryTile(category.value?.id ?? "", story);
}
</script>

<template>
    <!-- The routed page presents a SINGLE ELEMENT root (this <article>) so the
         AppShell keyed route-swap applies the `.route-enter` entrance. -->
    <article class="mx-auto w-full max-w-6xl">
        <TooltipProvider :delay-duration="250">
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
                <!-- The bento grid — one SectionPreviewCard per story, its HERO the
                     story's RESOLVED live tile (BI.W-LIVE-TILES). The bento carries a
                     recessive WARM AMBIENT FIELD behind the cards (`--bento-field-h-raw`
                     is the per-category warm-projected hue) so the translucent
                     glass-resting cards transmit WARM, not the metallic wash. NO live GL
                     (the one-GL-per-route budget held) — a static warm CSS radial. -->
                <section
                    class="scroll-cascade section-bento mt-4"
                    :style="{ '--bento-field-h-raw': cardFieldH }"
                >
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                            :tile="tileFor(story)"
                            :style="{ '--card-field-h': cardFieldH }"
                        />
                    </div>
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>

<style scoped>
/* BD.W-BENTO-SPECIMEN — the bento grid. The CO-MINT of `--phi: 1.618` (consumers
   read `var(--phi, 1.618)`). The gap steps by φ. */
.section-bento {
    --phi: 1.618;
    /* the per-category warm field hue — belt-and-suspenders clamped into the warm
       band [25,95] so an inline cool degree can never paint teal/navy. */
    --bento-field-h: clamp(25, var(--bento-field-h-raw, 62), 95);
    position: relative;
    /* keep the field's negative z-index local to the bento stacking context so it
       sits BEHIND the cards but IN FRONT of the StoryHero card plate — the
       glass-resting cards' backdrop-filter then samples the WARM field. */
    isolation: isolate;
}
.section-bento .grid {
    gap: calc(1rem * var(--phi, 1.618));
}

/* BG.W-CATEGORY-CARD-WARM — the recessive WARM AMBIENT FIELD behind the bento.
   A static warm CSS radial (NO live GL): an amber key-mass (top-left) + a terracotta
   mid (bottom-right) over a warm low-chroma floor, so the translucent glass-resting
   cards composite WARM. PLAIN per-mode `.dark` arm (the light-dark() inset-shadow
   trap + the scoped :global() drop, MEMORY). */
.section-bento::before {
    content: "";
    position: absolute;
    inset: -0.5rem;
    z-index: -1;
    pointer-events: none;
    border-radius: var(--radius-card);
    background:
        radial-gradient(
            120% 95% at 12% 0%,
            oklch(0.91 0.085 calc(var(--bento-field-h) + 6) / 0.55),
            oklch(0.91 0.085 calc(var(--bento-field-h) + 6) / 0) 62%
        ),
        radial-gradient(
            120% 115% at 100% 100%,
            oklch(0.88 0.095 calc(var(--bento-field-h) - 8) / 0.46),
            oklch(0.88 0.095 calc(var(--bento-field-h) - 8) / 0) 66%
        ),
        oklch(0.93 0.05 var(--bento-field-h));
}
.dark .section-bento::before {
    /* warm-EMBER dark floor — low L, chroma KEPT (the W-DARK-MATERIAL luminous-dark
       model), so the cards transmit a warm glow over the near-black page. */
    background:
        radial-gradient(
            120% 95% at 12% 0%,
            oklch(0.4 0.06 calc(var(--bento-field-h) + 6) / 0.55),
            oklch(0.4 0.06 calc(var(--bento-field-h) + 6) / 0) 62%
        ),
        radial-gradient(
            120% 115% at 100% 100%,
            oklch(0.34 0.07 calc(var(--bento-field-h) - 8) / 0.45),
            oklch(0.34 0.07 calc(var(--bento-field-h) - 8) / 0) 66%
        ),
        oklch(0.25 0.045 var(--bento-field-h));
}

@media (prefers-reduced-transparency: reduce) {
    /* the field drops to the warm-SOLID floor (STILL warm, never gray). */
    .section-bento::before {
        background: oklch(0.94 0.04 var(--bento-field-h));
    }
    .dark .section-bento::before {
        background: oklch(0.27 0.045 var(--bento-field-h));
    }
}
</style>
