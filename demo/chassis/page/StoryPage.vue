<script setup lang="ts">
import { computed, inject } from "vue";
import { TooltipProvider } from "@glass/components/tooltip";
import StoryBodyRenderer from "../body/StoryBodyRenderer.vue";
import StoryHeader from "../hero/StoryHeader.vue";
import StoryHero from "../hero/StoryHero.vue";
import { STORY_NESTED_KEY } from "../family/story-nested";
import { useStoryNavigation } from "../useStoryNavigation";
import type { StoryBody } from "../body/story-body";

interface StoryPageProps {
    contentClass?: string;
    /** A bespoke composition that supplies its own h1 opts out of the chassis title. */
    heroTitle?: boolean;
    /** Optional data-driven body for uniform specimen pages. */
    body?: StoryBody;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    heroTitle: true,
});

const nested = inject(STORY_NESTED_KEY, false);
const { current } = useStoryNavigation();

const title = computed(() => current.value?.story.title ?? "");
const displayTitle = computed(() => current.value?.story.displayTitle);
const blurb = computed(() => current.value?.story.blurb);
const background = computed(() => current.value?.story.background);
const heroScale = computed(() => current.value?.story.heroScale ?? "4");
const depth = computed(() => current.value?.story.depth);
const variant = computed<"hero" | "page">(() =>
    current.value?.story.hero ? "hero" : "page",
);
</script>

<template>
    <!-- Family members contribute only their body; the family route owns identity. -->
    <div v-if="nested" class="story-nested-body">
        <slot />
        <StoryBodyRenderer v-if="props.body?.kind === 'sections'" :body="props.body" />
    </div>

    <article
        v-else
        class="story-page-article mx-auto w-full"
        :data-variant="variant"
        :style="{
            maxInlineSize:
                variant === 'page'
                    ? 'var(--story-article-w)'
                    : 'var(--story-page-max-inline)',
        }"
    >
        <TooltipProvider :delay-duration="250">
            <!-- Ordinary stories keep identity quiet: one title, one lede. -->
            <header v-if="variant === 'page'">
                <StoryHeader
                    :blurb="blurb"
                    class="story-hero-cluster"
                    :data-depth="depth"
                >
                    <h1 v-if="title" class="story-hero-title story-chrome-title">
                        {{ title }}
                    </h1>
                </StoryHeader>
            </header>

            <section
                v-if="variant === 'page'"
                class="story-cels flex flex-col"
                :style="{ gap: 'var(--story-page-section-gap)' }"
                :class="props.contentClass"
            >
                <slot />
                <StoryBodyRenderer
                    v-if="props.body?.kind === 'sections'"
                    :body="props.body"
                />
            </section>

            <!-- True hero routes keep their subject-specific field or ornament. -->
            <StoryHero
                v-else
                :background="background"
                :title="title"
                :display-title="displayTitle"
                :blurb="blurb"
                :hero-scale="heroScale"
                :depth="depth"
                :hero-title="props.heroTitle"
            >
                <template #title-ornament>
                    <slot name="title-ornament" />
                </template>

                <section
                    class="story-sections flex flex-col"
                    :style="{ gap: 'var(--story-page-section-gap)' }"
                    :class="props.contentClass"
                >
                    <slot />
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>
