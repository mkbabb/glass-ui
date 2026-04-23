<script setup lang="ts">
import { computed } from "vue";
import { findStory, resolveStory } from "./manifest";

const props = defineProps<{ category: string; story: string }>();

const info = computed(() => findStory(props.category, props.story));
const StoryComponent = computed(() => resolveStory(props.category, props.story));
</script>

<template>
    <article class="mx-auto w-full max-w-6xl px-8 py-12">
        <header v-if="info" class="mb-10">
            <div class="text-admin-label text-muted-foreground">
                {{ info.category.title }} · {{ info.story.title }}
            </div>
            <h1 class="text-title mt-2">{{ info.story.title }}</h1>
            <p v-if="info.story.blurb" class="text-prose mt-3 max-w-prose text-muted-foreground">
                {{ info.story.blurb }}
            </p>
        </header>
        <section class="min-h-[320px]">
            <component :is="StoryComponent" />
        </section>
    </article>
</template>
