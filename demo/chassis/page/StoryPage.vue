<script setup lang="ts">
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "@glass/components/tooltip";
import StoryBodyRenderer from "../body/StoryBodyRenderer.vue";
import StoryHeader from "../hero/StoryHeader.vue";
import StoryHero from "../hero/StoryHero.vue";
import TransitionRouteLink from "../TransitionRouteLink.vue";
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
const route = useRoute();
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

    <!-- The article is this story's WINDOW: the route grammar flies the tapped card onto
         this rect, and flies it back off the same one. §9.5's "stops at the content
         column's gutter" is not a rule we enforce here — it is what naming the ARTICLE
         rather than `<main>` means. -->
    <!-- ONE article width, not two. The old inline `:style` branched between
         `--story-article-w` (declared nowhere on disk, so it resolved to the
         initial value and the cap was silently absent on every ordinary story) and
         `--story-page-max-inline` (72rem). An inline style also outranks any sheet,
         so the article's width was unreachable from CSS by construction. The
         article law in `layout.css` caps it once at `--article-max`. -->
    <article
        v-else
        class="story-article w-full"
        :data-route-window="route.path"
        :data-variant="variant"
    >
        <TooltipProvider :delay-duration="250">
            <!-- Ordinary stories keep identity quiet: one title, one lede. -->
            <header v-if="variant === 'page'">
                <!-- The return leg. Without it the grammar's `collapse` class is
                     unreachable from any story — an unbuilt constant behind a green
                     gate — and a reader who arrived by tapping a cell has no way back
                     to the section but the browser's own button. -->
                <TransitionRouteLink
                    v-if="current"
                    :to="`/${current.category.id}`"
                    class="focus-ring interactive-item transition-control text-small text-muted-foreground inline-flex w-fit items-center gap-1 hover:text-foreground"
                >
                    <span aria-hidden="true">&#8592;</span>
                    {{ current.category.title }}
                </TransitionRouteLink>
                <StoryHeader
                    :blurb="blurb"
                    class="story-hero-cluster"
                    :data-depth="depth"
                >
                    <h1
                        v-if="title"
                        data-route-label
                        class="story-hero-title story-chrome-title"
                    >
                        {{ title }}
                    </h1>
                </StoryHeader>
            </header>

            <!-- THE CEL FIELD. The inline `gap` binding is gone: an inline style
                 wins over the sheet, so the field's own gap could never apply while
                 it was there — the field would have been a grid with a
                 flex-column's rhythm. -->
            <section
                v-if="variant === 'page'"
                class="story-cels"
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

                <section class="story-sections" :class="props.contentClass">
                    <slot />
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>
