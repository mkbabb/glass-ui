<script setup lang="ts">
import { TooltipProvider } from "@glass/components/tooltip";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { CATEGORIES, type Category } from "../../stories/manifest";
import { categoryHero } from "../hero/category-hero";
import { warmFieldHue } from "../hero/warm-field";

function identityTile(category: Category) {
    return {
        kind: "identity" as const,
        title: category.title,
        subpath: `/${category.id}`,
    };
}
</script>

<template>
    <article class="mx-auto w-full max-w-6xl">
        <TooltipProvider :delay-duration="250">
            <StoryHero
                background="paper"
                variant="hero"
                title="Glass UI"
                eyebrow="Component catalogue"
                subpath="/"
                blurb="Explore the system by concept, then open any component story directly."
                hero-scale="mega"
                depth="D0"
            >
                <section
                    aria-label="Component categories"
                    class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <SectionPreviewCard
                        v-for="category in CATEGORIES"
                        :key="category.id"
                        :to="`/${category.id}`"
                        :title="category.title"
                        :blurb="category.landing?.blurb"
                        :subpath="`/${category.id}`"
                        :icon="category.icon"
                        :section="categoryHero(category.id)?.sectionHue"
                        :tile="identityTile(category)"
                        :style="{ '--card-field-h': warmFieldHue(category.id) }"
                    />
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>
