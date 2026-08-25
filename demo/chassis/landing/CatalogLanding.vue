<script setup lang="ts">
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { CATEGORIES, heroScaleForDepth } from "../../stories/manifest";
import { resolveCategoryTile } from "./storyTile";

// [BK #58 W-PREVIEW-CARD] `identityTile(category)` is STRUCK. It minted a tile
// resolution HERE, beside the ladder rather than through it, so the front door was
// eleven boxes each printing the category name — once inside the well and again in
// the card's own label directly beneath. The catalog resolves the same ladder every
// section landing resolves; a category's preview is its headline story's.

// [BK #58 W-STORY-PROPORTION] The catalog is a D0 surface and now says so ONCE.
// It declared `depth="D0"` and `hero-scale="4"` on the same element — the tier and
// a rung that contradicts it. `4` is the D3 floor, so the app's HOME page wore a
// smaller title than any sub-page in the storybook, and the ladder the manifest
// owns (`heroScaleForDepth`) was restated at a call site as a literal. One word
// decides the tier; the rung is read from it.
const CATALOG_DEPTH = "D0" as const;
</script>

<template>
    <!-- No window key: `planNav` keys zoom and collapse on the DEEPER of the two paths,
         and `/` is never the deeper one, so a key here could never be selected. The
         catalog's continuity objects are its preview cards, which declare the section
         paths they open. -->
    <article class="optical-bench w-full">
        <StoryHero
            background="paper"
            title="Glass UI"
            blurb="A chromatic component bench: inspect the real specimen, then open its story."
            :hero-scale="heroScaleForDepth(CATALOG_DEPTH)"
            :depth="CATALOG_DEPTH"
        >
            <!-- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` asked the VIEWPORT how
                 many cards fit in a column it has never measured. The cel field
                 asks the column itself, so the catalog packs 1→2→3→4 across the
                 same widths without naming a single breakpoint. -->
            <!-- [BK #58] THE LEAD CARD, which this front door alone was missing.
                 `lead` is the one attribute that both spans a card across the field
                 and exempts it from `content-visibility` (SectionPreviewCard's
                 `[data-span="full"]` rule) — and `/` is the route where that
                 exemption matters most, because its first row IS the app's first
                 paint. Without it the home page skipped-then-corrected the layout of
                 a card that was on screen the whole time. The other two front doors
                 (`SectionLanding`, `foundations/intro`) already lead on `idx === 0`;
                 all three now agree. -->
            <section aria-label="Component categories" class="story-field">
                <SectionPreviewCard
                    v-for="(category, idx) in CATEGORIES"
                    :key="category.id"
                    :to="`/${category.id}`"
                    :title="category.title"
                    :blurb="category.landing?.blurb"
                    :lead="idx === 0"
                    :tile="resolveCategoryTile(category)"
                />
            </section>
        </StoryHero>
    </article>
</template>
