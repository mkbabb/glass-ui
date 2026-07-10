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
import { TooltipProvider } from "@glass/components/ui/tooltip";
import { auroraFallbackGround } from "@glass/components/custom/aurora";
import { Card } from "@glass/components/ui/card";
import { Button } from "@glass/components/ui/button";
import { Slider } from "@glass/components/ui/slider";
import { Switch } from "@glass/components/ui/switch";
import { MetricBadge } from "@glass/components/custom/metric-badge";
import { IconChip } from "@glass/components/custom/icon-chip";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory } from "../../stories/manifest";
import { categoryHero, categorySpecimen } from "../hero/category-hero";
import { heroAuroraConfig } from "../hero/aurora-hero";
import { warmFieldHue } from "../hero/warm-field";

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
// per-category specimen spec (read off `previewKind`, DRY).
const cardFieldH = computed(() => warmFieldHue(category.value?.id ?? "foundations"));
const specimen = computed(() => categorySpecimen(category.value?.id ?? "foundations"));

// P10c W-CUT GL-BUDGET — the `field` specimen is a FROZEN STILL, NOT a live GL
// canvas. The prior `<Aurora render-mode="css">` mounts a real `<canvas>` element
// per card even on the CSS substrate (unarmed, but present): a `/substrates`
// landing with 11 `field` cards mounts 11 GL-capable canvases, and ANY
// `getContext('webgl2')` probe (tooling / a future arm / the orchestrator's
// budget-count filter) instantiates 11 real contexts — blowing the ~8 budget and
// black-out-LOSING the cards on a constrained device. The category-landing
// amendment MANDATES a one-GL-budget frozen still per `previewKind`, NOT live GL.
//
// THE FIX (the configurator pattern — usePresetThumbnails): the shipped device-free
// `auroraFallbackGround(config)` paints the SAME palette + nuclei field the shader
// uploads (the math mirrored CPU-side) into a tiny throwaway 2D-canvas raster →
// `data:` URI, served as a plain `background-image` on a `<div>`. ZERO persistent
// canvas, ZERO WebGL/WebGPU, deterministic, warm + recognizable (a real mini
// aurora still, not a gray glyph). The landing now adds ZERO GL-capable elements.
const fieldStill = computed(() => {
    if (!hero.value) return null;
    const config = heroAuroraConfig(hero.value.heroPalette);
    // grid 10 → a 100-sample field; the bilinear CSS upscale reads as a smooth
    // atmosphere, not a hard grid (same grid the preset thumbnails bake at).
    const ground = auroraFallbackGround(config, { grid: 10 });
    return {
        backgroundImage: ground.backgroundImage,
        backgroundColor: ground.backgroundColor,
    };
});
</script>

<template>
    <!-- BG.W-ROUTE-TRANSITION — the routed page presents a SINGLE ELEMENT root (this
         <article>) so the AppShell bare keyed `<component class="route-enter">` swap
         applies the `.route-enter` on-mount entrance to it (the swap requires a
         single element root). <TooltipProvider> renders a context-only FRAGMENT
         (no DOM), so it is nested INSIDE <article> (same tooltip context, zero
         layout/visual change). -->
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
                <!-- The bento grid — one SectionPreviewCard per story, each linking to
                     its route WITH an inline live mini-preview (the SECTION-HERO model;
                     never a text-only link). The first card leads (a wider span).
                     BG.W-CATEGORY-CARD-WARM — the bento carries a recessive WARM AMBIENT
                     FIELD behind the cards (`--bento-field-h-raw` is the per-category
                     warm-projected hue, CONSUMED from the ONE `warmFieldHue` source). A
                     category route is NON-focal (no live shell aurora), so the translucent
                     `glass-resting` cards otherwise sit over a flat grid/paper wash → a
                     silver/metallic sheen (the user's "awful metallic wash"); the warm
                     field gives the glass something WARM to transmit. NO live GL (the
                     one-GL-per-route budget held) — a static warm CSS radial. -->
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
                            :style="{ '--card-field-h': cardFieldH }"
                        >
                            <!-- BD.W-BENTO-SPECIMEN — the LIVE specimen stage. A
                                 `<component>`/`v-if` dispatch over the category's
                                 `previewKind` composing SHIPPED primitives, each
                                 FILLING its stage over the warm §3 field. The widget
                                 SHOWS its component (iOS-27 home-screen truth), never
                                 a placeholder glyph. The one-GL budget: `field` is a
                                 device-free FROZEN-STILL raster (NO canvas), the rest
                                 are CSS-only DOM renders — the landing adds ZERO
                                 GL-capable elements (P10c W-CUT GL-BUDGET). -->
                            <template #preview>
                                <!-- field — the device-free FROZEN aurora still (P10c
                                     W-CUT): a `<div>` painted from `auroraFallbackGround`
                                     (the configurator's `data:`-URI raster pattern), NOT
                                     a live `<Aurora>` canvas. A warm, recognizable mini
                                     aurora specimen with zero WebGL contexts. -->
                                <div
                                    v-if="specimen.kind === 'field' && fieldStill"
                                    class="specimen-fill specimen-field"
                                    :style="{
                                        backgroundImage: fieldStill.backgroundImage,
                                        backgroundColor: fieldStill.backgroundColor,
                                    }"
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
        </TooltipProvider>
    </article>
</template>

<style scoped>
/* BD.W-BENTO-SPECIMEN — the bento grid. The CO-MINT of `--phi: 1.618` (φ
   proportion; consumers read `var(--phi, 1.618)`). The gap steps by φ; the card
   `max-inline-size` is φ-bound so a 3-col grid at ≥1280 doesn't blow each card to
   643px (the "useless large card" defect). */
.section-bento {
    --phi: 1.618;
    /* the per-category warm field hue — belt-and-suspenders clamped into the warm
       band [25,95] so an inline cool degree can never paint teal/navy (the same
       guard SectionPreviewCard's preview field carries; `warmFieldHue` already
       guarantees warm, the clamp is the defence-in-depth). */
    --bento-field-h: clamp(25, var(--bento-field-h-raw, 62), 95);
    position: relative;
    /* keep the field's negative z-index local to the bento stacking context so it
       sits BEHIND the cards but IN FRONT of the StoryHero card plate — the
       glass-resting cards' backdrop-filter then samples the WARM field, not the
       flat plate (the metallic-wash root cause). */
    isolation: isolate;
}
.section-bento .grid {
    gap: calc(1rem * var(--phi, 1.618));
}

/* BG.W-CATEGORY-CARD-WARM — the recessive WARM AMBIENT FIELD behind the bento.
   A static warm CSS radial (NO live GL — the one-GL-per-route budget held): an amber
   key-mass (top-left, toward the key-light) + a terracotta mid (bottom-right) over a
   warm low-chroma floor, so the translucent `glass-resting` cards composite WARM and
   the inter-card gaps read warm — never the silver/metallic sheen of glass over a
   flat grid/paper wash. PLAIN per-mode `.dark` arm (the light-dark() inset-shadow
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
       model), so the cards transmit a warm glow over the near-black page, NEVER a
       charcoal/metallic slab. */
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

/* ── the specimen fills its stage (≥45% occupancy at every card width) ──
   `container-type: size` on the stage (SectionPreviewCard) + `cqmin`-scaled
   specimens here — a real component preview, never a floating 5%-occupancy glyph. */
.specimen-fill {
    inline-size: 100%;
    block-size: 100%;
}

/* field — the device-free FROZEN aurora still (P10c W-CUT GL-BUDGET). The tiny
   `auroraFallbackGround` raster (a 10×10 `data:`-URI) is CSS-upscaled to fill the
   bounded stage edge-to-edge; `image-rendering: auto` bilinear-smooths it so it
   reads as a continuous warm atmosphere (not a hard grid), the same upscale the
   shipped Aurora CSS-substrate placeholder + the preset thumbnails use. NO canvas,
   NO WebGL context — the budget-safe frozen specimen. */
.specimen-field {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    image-rendering: auto;
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
