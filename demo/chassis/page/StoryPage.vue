<script setup lang="ts">
// StoryPage: the page form. A header (the return link, the title, one sentence), then
// the stage, the variants and the code, each from its own slot. The header scrolls
// away with the page.
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "@glass/components/tooltip";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import { useStoryNavigation } from "../useStoryNavigation";

interface StoryPageProps {
    /** `editor`: the studio is the page, under a shorter header. */
    form?: "page" | "editor";
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    form: "page",
});

const route = useRoute();
const { current } = useStoryNavigation();

const title = computed(() => current.value?.story.title ?? "");
const lede = computed(() => current.value?.story.lede ?? "");
</script>

<template>
    <article
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
                <h1 v-if="title" data-route-label data-story-title class="story-header-title">
                    {{ title }}
                </h1>
                <p v-if="lede" class="story-header-lede">{{ lede }}</p>
            </header>

            <slot name="stage" />
            <slot name="variants" />
            <slot name="code" />
        </TooltipProvider>
    </article>
</template>
