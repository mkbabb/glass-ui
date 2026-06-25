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
import { Aurora } from "../../src/components/custom/aurora";
import { Card } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Slider } from "../../src/components/ui/slider";
import { Switch } from "../../src/components/ui/switch";
import { MetricBadge } from "../../src/components/custom/metric-badge";
import { IconChip } from "../../src/components/custom/icon-chip";
import StoryHero from "./StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory } from "./manifest";
import { categoryHero, categorySpecimen } from "./category-hero";
import { heroAuroraConfig } from "./aurora-hero";
import { warmFieldHue } from "./warm-field";

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

// BD.W-BENTO-SPECIMEN — the per-card WARM field hue (CONSUME `warmFieldHue`, the
// ONE warm-projection source; teal/navy impossible by construction) + the ONE
// per-category specimen spec (read off `previewKind`, DRY). The `field` specimen
// rides Aurora's zero-GL CSS first-frame (`render-mode="css"`) on the WARM-FENCED
// per-category palette — the one-GL budget: the landing adds zero live contexts.
const cardFieldH = computed(() => warmFieldHue(category.value?.id ?? "foundations"));
const specimen = computed(() => categorySpecimen(category.value?.id ?? "foundations"));
const fieldAuroraConfig = computed(() =>
    hero.value ? heroAuroraConfig(hero.value.heroPalette) : undefined,
);
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
                <section class="scroll-cascade section-bento mt-4">
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
                            :style="{ '--card-field-h': cardFieldH }"
                        >
                            <!-- BD.W-BENTO-SPECIMEN — the LIVE specimen stage. A
                                 `<component>`/`v-if` dispatch over the category's
                                 `previewKind` composing SHIPPED primitives, each
                                 FILLING its stage over the warm §3 field. The widget
                                 SHOWS its component (iOS-27 home-screen truth), never
                                 a placeholder glyph. The one-GL budget: `field` rides
                                 Aurora's zero-GL CSS first-frame, the rest are CSS-only
                                 LIVE renders — the landing adds zero live contexts. -->
                            <template #preview>
                                <!-- field — the frozen warm aurora still (zero-GL). -->
                                <Aurora
                                    v-if="specimen.kind === 'field' && fieldAuroraConfig"
                                    render-mode="css"
                                    :config="fieldAuroraConfig"
                                    class="specimen-fill"
                                />
                                <!-- control — a real glass control STACK (earns the
                                     span-2 lead width by SHOWING more). The slider
                                     model-value is an ARRAY ([62], not 62 → thumbless);
                                     the switch reads reka `model-value` (not :checked). -->
                                <div
                                    v-else-if="specimen.kind === 'control'"
                                    class="specimen-fill specimen-control"
                                >
                                    <Button variant="glass" size="sm" tabindex="-1"
                                        >Action</Button
                                    >
                                    <Slider
                                        :model-value="specimen.sliderValue"
                                        :min="0"
                                        :max="100"
                                    />
                                    <Switch :model-value="true" />
                                </div>
                                <!-- surface — a mini glass card silhouette + a hairline
                                     header + 2 rule bars. -->
                                <Card
                                    v-else-if="specimen.kind === 'surface'"
                                    tier="quiet"
                                    class="specimen-fill specimen-surface"
                                >
                                    <span class="specimen-surface-head" />
                                    <span class="specimen-surface-bar" />
                                    <span class="specimen-surface-bar specimen-surface-bar--short" />
                                </Card>
                                <!-- metric — a real MetricBadge (the figure + the
                                     SEMANTIC delta chip, carved out of the warm-fence). -->
                                <div
                                    v-else-if="specimen.kind === 'metric'"
                                    class="specimen-fill specimen-metric"
                                >
                                    <MetricBadge
                                        :value="specimen.metricValue"
                                        :unit="specimen.metricUnit"
                                        size="lg"
                                    />
                                    <span
                                        v-if="specimen.metricDelta"
                                        class="specimen-delta"
                                        :data-dir="specimen.metricDelta.dir"
                                        >{{ specimen.metricDelta.value }}</span
                                    >
                                </div>
                                <!-- glyph — the LAST-RESORT IconChip POP over the warm
                                     field (foundations only — the abstract root). -->
                                <div v-else class="specimen-fill specimen-glyph">
                                    <IconChip
                                        v-if="sectionIcon"
                                        :icon="sectionIcon"
                                        :section="sectionHue"
                                        reveal
                                        bloom
                                        :size="52"
                                        :glyph-size="28"
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
/* BD.W-BENTO-SPECIMEN — the bento grid. The CO-MINT of `--phi: 1.618` (φ
   proportion; consumers read `var(--phi, 1.618)`). The gap steps by φ; the card
   `max-inline-size` is φ-bound so a 3-col grid at ≥1280 doesn't blow each card to
   643px (the "useless large card" defect). */
.section-bento {
    --phi: 1.618;
}
.section-bento .grid {
    gap: calc(1rem * var(--phi, 1.618));
}

/* ── the specimen fills its stage (≥45% occupancy at every card width) ──
   `container-type: size` on the stage (SectionPreviewCard) + `cqmin`-scaled
   specimens here — a real component preview, never a floating 5%-occupancy glyph. */
.specimen-fill {
    inline-size: 100%;
    block-size: 100%;
}

/* field — the frozen aurora fills the bounded stage edge-to-edge. */
:deep(.specimen-fill.aurora-root) {
    border-radius: inherit;
}

/* control — a 3-row glass control stack, scaled to fill its stage. The reka
   primitives render at their native size; the stack centers + scales to occupancy. */
.specimen-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.5rem, 6cqh, 0.9rem);
    padding-inline: clamp(0.75rem, 12cqw, 2rem);
}

/* surface — a mini glass card silhouette: a hairline header + 2 rule bars. */
.specimen-surface {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.4rem, 7cqh, 0.85rem);
    padding: clamp(0.75rem, 10cqmin, 1.5rem);
}
.specimen-surface-head {
    block-size: clamp(0.5rem, 9cqh, 0.85rem);
    inline-size: 55%;
    border-radius: var(--radius-pill);
    background: color-mix(in oklab, var(--foreground) 22%, transparent);
}
.specimen-surface-bar {
    block-size: clamp(0.35rem, 6cqh, 0.6rem);
    inline-size: 100%;
    border-radius: var(--radius-pill);
    background: color-mix(in oklab, var(--foreground) 11%, transparent);
}
.specimen-surface-bar--short {
    inline-size: 70%;
}

/* metric — the MetricBadge figure + the SEMANTIC delta chip (carved OUT of the
   warm-fence: success-green up / danger-red down, a named exception). */
.specimen-metric {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.4rem, 5cqw, 0.9rem);
}
.specimen-delta {
    font-size: clamp(0.65rem, 4cqmin, 0.85rem);
    font-weight: 600;
    padding: 0.1em 0.5em;
    border-radius: var(--radius-pill);
}
.specimen-delta[data-dir="up"] {
    color: var(--success, oklch(0.72 0.19 149.5));
    background: color-mix(in oklab, var(--success, oklch(0.72 0.19 149.5)) 16%, transparent);
}
.specimen-delta[data-dir="down"] {
    color: var(--destructive, oklch(0.6 0.2 25));
    background: color-mix(in oklab, var(--destructive, oklch(0.6 0.2 25)) 16%, transparent);
}

/* glyph — the LAST-RESORT IconChip POP, centered over the warm field. */
.specimen-glyph {
    display: grid;
    place-items: center;
}
</style>
