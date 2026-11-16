<script setup lang="ts">
// `/`: the front door. The title, one line, and a card per section.
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { CATEGORIES } from "../../stories/manifest";
import { resolveCategoryTile } from "./storyTile";
</script>

<template>
    <article class="optical-bench w-full">
        <StoryHero title="Glass UI" lede="Warm glass components, each shown live.">
            <section aria-label="Component categories" class="story-card-grid">
                <SectionPreviewCard
                    v-for="category in CATEGORIES"
                    :key="category.id"
                    :to="`/${category.id}`"
                    :title="category.title"
                    :tile="resolveCategoryTile(category)"
                />
            </section>
        </StoryHero>
    </article>
</template>
