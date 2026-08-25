<script setup lang="ts">
import { computed } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import SectionPreviewCard from "../../chassis/landing/SectionPreviewCard.vue";
import { CATEGORIES } from "../manifest";
import { resolveCategoryTile } from "../../chassis/landing/storyTile";

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
// and an inline non-text preview; the front door is a
// section-landing peer; the cards link
// the 11 section LANDINGS, each preview a budget-safe still).
// [BK #58 W-PREVIEW-CARD] The hand-rolled lead-story walk is STRUCK. This file used
// to find the category's lead story itself (`story.id !== "intro"` — the front-door
// rule, hardcoded at a call site, a THIRD statement of a thing `assignDepths` already
// decides), call `resolveStoryTile` on it, and mint a `{ kind: "identity" }` literal
// when it found nothing. The chassis owns that resolution now: `resolveCategoryTile`
// reads the D2 main and returns a declared strategy, `none` included. The front door
// and the catalog resolve the SAME function, so they cannot disagree about what
// `/display` previews.
const categories = computed(() =>
    CATEGORIES.filter((c) => !c.reference).map((c, idx) => ({
        slug: c.id,
        title: c.title,
        blurb: SUMMARIES[c.id] ?? c.stories[0]?.blurb ?? "",
        lead: idx === 0,
        tile: resolveCategoryTile(c),
    })),
);
</script>

<template>
    <!-- StoryPage owns the one title and lede; this route contributes only its
         inline mark and the category index. -->
    <StoryPage>
        <!-- The ℱ wordmark stays an inline title ornament. -->
        <template #title-ornament>
            <span class="fourier-f italic">ℱ&nbsp;</span>
        </template>

        <!-- Category index — one SectionPreviewCard per category, navigating to the
             category's SECTION-LANDING hero. Each card carries a quiet static plate + an
             inline non-text preview; no text-only redirect card
             survives on the front door, PC7). The cards ride the resting glass rung so
             the aurora the chassis paints reads THROUGH them. -->
        <section class="mt-(--sp-6)">
            <p class="text-small mb-(--sp-4) text-muted-foreground">Categories</p>
            <!-- [BK #58] THE CEL FIELD, not a breakpoint ladder. `grid-cols-1
                 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` asked the VIEWPORT how
                 many cards fit in a column the viewport has never measured — the
                 identical mistake `CatalogLanding` records having already struck, left
                 standing on the OTHER front door. `.story-field` asks the column
                 itself, so this index packs 1→2→3→4 across the same widths without
                 naming a breakpoint, and the two front doors now lay out by one law
                 instead of two. `gap-4`/`mt-16`/`mb-4` went with it: the demo has one
                 six-rung ladder and the Tailwind scale is not it. -->
            <div class="story-field">
                <SectionPreviewCard
                    v-for="cat in categories"
                    :key="cat.slug"
                    :to="`/${cat.slug}`"
                    :title="cat.title"
                    :blurb="cat.blurb"
                    :lead="cat.lead"
                    :tile="cat.tile"
                />
            </div>
        </section>
    </StoryPage>
</template>
