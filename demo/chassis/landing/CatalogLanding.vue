<script setup lang="ts">
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { CATEGORIES, type Category } from "../../stories/manifest";

function identityTile(category: Category) {
    return { kind: "identity" as const, title: category.title };
}
</script>

<template>
    <!-- No window key: `planNav` keys zoom and collapse on the DEEPER of the two paths,
         and `/` is never the deeper one, so a key here could never be selected. The
         catalog's continuity objects are its preview cards, which declare the section
         paths they open. -->
    <article class="optical-bench mx-auto w-full max-w-6xl">
        <StoryHero
            background="paper"
            title="Glass UI"
            blurb="A chromatic component bench: inspect the real specimen, then open its story."
            hero-scale="4"
            depth="D0"
        >
            <section
                aria-label="Component categories"
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
                <SectionPreviewCard
                    v-for="category in CATEGORIES"
                    :key="category.id"
                    :to="`/${category.id}`"
                    :title="category.title"
                    :blurb="category.landing?.blurb"
                    :tile="identityTile(category)"
                />
            </section>
        </StoryHero>
    </article>
</template>
