<script setup lang="ts">
// A section page: its title, its lede and a card per page.
import { computed } from "vue";
import { useRoute } from "vue-router";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory } from "../../stories/manifest";
import { resolveStoryTile } from "./storyTile";

const route = useRoute();
const category = computed(() => {
    const id = route.meta.categoryId as string | undefined;
    return id ? findCategory(id) : undefined;
});
</script>

<template>
    <article :data-route-window="route.path" class="optical-bench w-full">
        <StoryHero v-if="category" :title="category.title" :lede="category.lede">
            <section :aria-label="`${category.title} pages`" class="story-card-grid">
                <SectionPreviewCard
                    v-for="story in category.stories"
                    :key="story.id"
                    :to="`/${category.id}/${story.id}`"
                    :title="story.title"
                    :tile="resolveStoryTile(story)"
                />
            </section>
        </StoryHero>
    </article>
</template>
