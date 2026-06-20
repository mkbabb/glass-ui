<script setup lang="ts">
import { computed } from "vue";
import StoryPage from "../StoryPage.vue";
import SectionPreviewCard from "../SectionPreviewCard.vue";
import { CATEGORIES } from "../manifest";
import { categoryHero } from "../category-hero";

// The storybook front-door hero declares a live aurora wash on its manifest row;
// the page chassis renders it behind a glassy hero card so the title sits glass-
// first over the brand painterly drift. The body here is the ONE audacious hero
// moment + the category index — the substrate comes from the container layer.

// Per-category one-line summaries for the front-door index. The category SET is
// derived from the live manifest (the single source the rail + docks read) so
// the front door always names the real IA; this map only carries the prose. A
// category with no summary here still renders, captioned by its first story.
const SUMMARIES: Record<string, string> = {
    foundations: "Colors, type, radii, shadows, motion, paper & glass.",
    substrates: "Aurora, GooBlob, the constellation lattice, the Fourier field.",
    forms: "Inputs, selects, toggles, sliders, chips.",
    display: "Buttons, cards, badges, metrics, status.",
    containers: "Dialogs, sheets, popovers, menus, tooltips.",
    navigation: "Tabs, deck progress, carousels.",
    dock: "The GlassDock — the headline glass primitive.",
    data: "Tables, trees, tags, avatars, sortable lists, timelines.",
    feedback: "Toasts, progress, skeletons, alerts.",
    motion: "Springs, count-up, reveal, typewriter.",
    compositions: "Heroes, dashboards, math-paper, auth shells.",
};

// The first item leads the grid (a wider span); the rest rest — a small
// lead/rest rhythm so the set is not eight identical boxes. Each card carries the
// category's DISTINCT icon + section hue from the ONE CATEGORY_HERO source (the
// per-category {icon, sectionHue} — never a hand-rolled SECTION_HUE duplicate),
// its landing subpath (the route identity), and an inline non-text preview
// (BC.W-HERO-AUDACIOUS — the front door is a section-landing peer; the cards link
// the 11 section LANDINGS, each preview a budget-safe still).
const categories = computed(() =>
    CATEGORIES.filter((c) => !c.reference).map((c, idx) => {
        const hero = categoryHero(c.id);
        return {
            slug: c.id,
            title: c.title,
            blurb: SUMMARIES[c.id] ?? c.stories[0]?.blurb ?? "",
            subpath: c.landing?.subpath ?? `/${c.id}`,
            icon: hero?.icon ?? c.icon,
            section: hero?.sectionHue ?? 7,
            lead: idx === 0,
        };
    }),
);
</script>

<template>
    <!-- :hero-title="false" — this front-door hero hand-authors its own
         display-register <h1> (the wordmark + tagline composition), so the
         chassis does not render a duplicate hero title (AZ.W-SUFFUSE D2-1). -->
    <StoryPage :hero-title="false">
        <!-- The front-door hero sits glass-first over the live aurora the chassis
             renders behind this card. BC.W-HERO-AUDACIOUS Part D — the THREE prior
             display moments (the ℱ + serif wordmark, the display-4 tagline, the
             suppressed chassis hero) collapse to ONE audacious `text-display-mega`
             hero (177px peak — the storybook root, the D0 of the title-size
             hierarchy). The ℱ wordmark folds into an INLINE ornament inside the
             single display <h1>; the eyebrow + the body prose stay warm ink (the
             one-color-event restraint). -->
        <section class="px-2 py-12 md:px-6 md:py-20">
            <p class="text-admin-label mb-8 text-muted-foreground">
                <span class="fourier-f italic">ℱ</span> glass-ui · storybook
            </p>

            <h1 class="text-display-mega mb-8 max-w-5xl text-foreground">
                Glass, paper, and the golden ratio.
            </h1>

            <p class="text-prose max-w-2xl text-foreground/80">
                A design system built around warm cream, cartoon offset shadows, and the
                published Plus Jakarta Sans brand face for prose and ornament.
                Tailwind-native, Vue 3.5, reka-ui primitives under the hood.
            </p>
        </section>

        <!-- Category index — one SectionPreviewCard per category, navigating to the
             category's SECTION-LANDING hero. Each card carries its IconChip POP + an
             inline non-text preview (BC.W-PAGE-CHASSIS — no text-only redirect card
             survives on the front door, PC7). The cards ride the resting glass rung so
             the aurora the chassis paints reads THROUGH them. -->
        <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">Categories</p>
            <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                <SectionPreviewCard
                    v-for="cat in categories"
                    :key="cat.slug"
                    :to="`/${cat.slug}`"
                    :title="cat.title"
                    :blurb="cat.blurb"
                    :subpath="cat.subpath"
                    :icon="cat.icon"
                    :section="cat.section"
                    :lead="cat.lead"
                >
                    <template #preview>
                        <div class="intro-cat-thumb">
                            <component
                                :is="cat.icon"
                                :size="34"
                                :stroke-width="1.5"
                            />
                        </div>
                    </template>
                </SectionPreviewCard>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
/* The budget-safe category thumbnail — a bounded inert glyph-over-tint render (no
   GL, no second live context — the one-GL-per-route budget). */
.intro-cat-thumb {
    display: grid;
    place-items: center;
    block-size: 7rem;
    color: color-mix(in oklab, var(--foreground), transparent 55%);
}
</style>
