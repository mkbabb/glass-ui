<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory, type Story } from "../../stories/manifest";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";
import { resolveStoryTile } from "./storyTile";
import type { StillTheme } from "./vizPreviewStill";

const route = useRoute();
const category = computed(() => {
    const id = route.meta.categoryId as string | undefined;
    return id ? findCategory(id) : undefined;
});
const landing = computed(() => category.value?.landing ?? null);

// [BK #58 W-PREVIEW-CARD, D6] The paint arm the frozen stills raster in. `tileFor`
// is called from the template, so reading `stillTheme` here puts it in the render
// effect's dependency set — a dark↔light flip re-runs the resolver and the card
// swaps to the other arm's cached raster. The still re-paints on the FLIP, not only
// on mount, which is the half of the cure a theme-paired raster alone would miss.
const { isDark } = useGlobalDark();
const stillTheme = computed<StillTheme>(() => (isDark.value ? "dark" : "light"));

function tileFor(story: Story) {
    return resolveStoryTile(category.value?.id ?? "", story, stillTheme.value);
}
</script>

<template>
    <!-- The section landing is the WINDOW for its own path — the card on the catalog
         flies onto this rect and back off it. -->
    <article :data-route-window="route.path" class="optical-bench w-full">
        <StoryHero
            v-if="category && landing"
            :background="landing.background"
            :title="landing.title"
            :blurb="landing.blurb"
            :hero-scale="landing.heroScale"
            :depth="landing.depth"
        >
            <section
                :aria-label="`${category.title} stories`"
                class="story-field mt-(--sp-4)"
            >
                <SectionPreviewCard
                    v-for="(story, idx) in category.stories"
                    :key="story.id"
                    :to="`/${category.id}/${story.id}`"
                    :title="story.title"
                    :blurb="story.blurb"
                    :lead="idx === 0"
                    :tile="tileFor(story)"
                />
            </section>
        </StoryHero>
    </article>
</template>
