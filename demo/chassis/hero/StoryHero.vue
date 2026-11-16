<script setup lang="ts">
// StoryHero: the landing header for `/` and the section pages. The large title,
// bounded, and one short lede; the card grid follows in the default slot.
defineProps<{
    title: string;
    lede?: string;
}>();
</script>

<template>
    <div class="story-hero">
        <header class="story-hero-header" data-story-header>
            <h1 data-route-label data-story-title class="story-hero-title">{{ title }}</h1>
            <p v-if="lede" class="story-hero-lede">{{ lede }}</p>
        </header>
        <slot />
    </div>
</template>
