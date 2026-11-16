<script setup lang="ts">
// StoryVariants: at most three labelled rows under the stage. Each row is a
// StoryVariantRow: a switch over the stage's state, or a row of real instances.
</script>

<template>
    <section class="story-variants" data-story-variants aria-label="Variants">
        <slot />
    </section>
</template>
