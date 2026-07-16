<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { findCategory, type Story } from "../../stories/manifest";
import { resolveStoryTile } from "./storyTile";

const route = useRoute();
const category = computed(() => {
    const id = route.meta.categoryId as string | undefined;
    return id ? findCategory(id) : undefined;
});
const landing = computed(() => category.value?.landing ?? null);

function tileFor(story: Story) {
    return resolveStoryTile(category.value?.id ?? "", story);
}
</script>

<template>
    <article class="mx-auto w-full max-w-6xl">
        <StoryHero
            v-if="category && landing"
            :background="landing.background"
            :title="landing.title"
            :blurb="landing.blurb"
            hero-scale="4"
            :depth="landing.depth"
        >
            <section
                :aria-label="`${category.title} stories`"
                class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
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
