<script setup lang="ts">
import { computed } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import SectionPreviewCard from "../../chassis/landing/SectionPreviewCard.vue";
import { CATEGORIES } from "../manifest";
import { categoryHero } from "../../chassis/hero/category-hero";
import { resolveStoryTile } from "../../chassis/landing/storyTile";

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
    substrates: "Aurora, Blob, the constellation lattice, the Fourier field.",
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
        // BI.W-LIVE-TILES — the front-door card previews a REAL representative
        // component from the section (the ss-01 "empty brown tile + lone compass"
        // cure). Resolve the tile of the category's LEAD story (skipping the D0
        // front door itself) via the SAME per-story ladder the landings use — a
        // Button cluster for display, a frozen aurora still for substrates, a mini
        // GlassDock for dock — never a repeated glyph.
        const leadStory =
            c.stories.find((story) => story.id !== "intro") ?? c.stories[0];
        return {
            slug: c.id,
            title: c.title,
            blurb: SUMMARIES[c.id] ?? c.stories[0]?.blurb ?? "",
            subpath: c.landing?.subpath ?? `/${c.id}`,
            icon: hero?.icon ?? c.icon,
            section: hero?.sectionHue ?? 7,
            lead: idx === 0,
            tile: leadStory ? resolveStoryTile(c.id, leadStory) : null,
        };
    }),
);
</script>

<template>
    <!-- BG.W-HERO-FIT — ONE chassis title path: the chassis renders the single hero
         <h1> (the MANDATORY short front-door wordmark `displayTitle` "glass-ui" through
         the height-aware fit-cap), the eyebrow + the blurb. The THREE prior display
         moments (the ℱ + serif wordmark, the display-4 tagline, the bare text-display-mega
         <h1>) collapse to the ONE chassis display <h1>; this page provides ONLY the inline
         ℱ ornament (#title-ornament) + the category index (the default slot). -->
    <StoryPage>
        <!-- The ℱ wordmark, rendered inline INSIDE the ONE chassis <h1> as the brand
             serif ornament; the eyebrow + body prose stay warm ink (one-color-event). -->
        <template #title-ornament>
            <span class="fourier-f italic">ℱ&nbsp;</span>
        </template>

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
                    :tile="cat.tile"
                />
            </div>
        </section>
    </StoryPage>
</template>
