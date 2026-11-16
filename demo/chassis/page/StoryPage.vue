<script setup lang="ts">
// StoryPage: the page form. A header (the return link, the title, one sentence), then
// the stage, the variants and the code, each from its own slot. The header scrolls
// away with the page.
//
// Pages not yet rebuilt fill the default slot, which renders below the header in the
// old cel field. `body` and `heroTitle` serve those pages only.
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "@glass/components/tooltip";
import StoryBodyRenderer from "../body/StoryBodyRenderer.vue";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import { STORY_NESTED_KEY } from "../family/story-nested";
import { useStoryNavigation } from "../useStoryNavigation";
import type { StoryBody } from "../body/story-body";

interface StoryPageProps {
    /** `editor`: the studio is the page, under a shorter header. */
    form?: "page" | "editor";
    contentClass?: string;
    /** An unrebuilt composition that sets its own h1 turns the header's off. */
    heroTitle?: boolean;
    body?: StoryBody;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    form: "page",
    heroTitle: true,
});

const nested = inject(STORY_NESTED_KEY, false);
const route = useRoute();
const { current } = useStoryNavigation();

const title = computed(() => current.value?.story.title ?? "");
const lede = computed(() => current.value?.story.lede ?? "");
</script>

<template>
    <div v-if="nested" class="story-nested-body">
        <slot />
        <StoryBodyRenderer v-if="props.body?.kind === 'sections'" :body="props.body" />
    </div>

    <article
        v-else
        class="story-article w-full"
        :data-route-window="route.path"
        :data-form="props.form"
    >
        <TooltipProvider :delay-duration="250">
            <header class="story-header" data-story-header>
                <TransitionRouteLink
                    v-if="current"
                    :to="`/${current.category.id}`"
                    class="story-header-return focus-ring interactive-item transition-control"
                >
                    <span aria-hidden="true">&#8592;</span>
                    {{ current.category.title }}
                </TransitionRouteLink>
                <h1
                    v-if="title && props.heroTitle"
                    data-route-label
                    data-story-title
                    class="story-header-title"
                >
                    {{ title }}
                </h1>
                <p v-if="lede" class="story-header-lede">{{ lede }}</p>
            </header>

            <slot name="stage" />
            <slot name="variants" />
            <slot name="code" />

            <section
                v-if="$slots.default || props.body"
                class="story-cels"
                :class="props.contentClass"
            >
                <slot />
                <StoryBodyRenderer
                    v-if="props.body?.kind === 'sections'"
                    :body="props.body"
                />
            </section>
        </TooltipProvider>
    </article>
</template>
