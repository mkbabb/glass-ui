<script setup lang="ts">
// A card: the live preview edge to edge across its top, then the title. The preview
// is the page's own stage (or its tile), mounted inert. A card has no blurb.
import { computed, defineAsyncComponent } from "vue";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import type { TileResolution } from "./storyTile";

const props = defineProps<{
    to: string;
    title: string;
    tile: TileResolution;
}>();

const preview = computed(() =>
    props.tile.kind === "live" ? defineAsyncComponent(props.tile.loader) : null,
);
</script>

<template>
    <TransitionRouteLink
        :to="to"
        :data-route-window="to"
        class="section-preview-card glass-resting focus-ring"
        data-story-card
    >
        <div
            v-if="preview"
            class="section-preview-card-preview"
            inert
            aria-hidden="true"
            data-card-preview
        >
            <component :is="preview" />
        </div>
        <span data-route-label class="section-preview-card-title text-subheading text-foreground">
            {{ title }}
        </span>
    </TransitionRouteLink>
</template>

<style scoped>
.section-preview-card {
    display: flex;
    flex-direction: column;
    overflow: clip;
    border-radius: var(--radius-3xl);
    border: 1px solid var(--glass-border-quiet);
    transition:
        border-color var(--duration-fast) var(--ease-out),
        translate var(--duration-fast) var(--ease-out);
}

.section-preview-card:hover {
    border-color: var(--glass-border-floating);
    translate: 0 -2px;
}

/* The preview runs edge to edge and is clipped by the card's own corner. */
.section-preview-card-preview {
    position: relative;
    display: grid;
    place-items: center;
    overflow: clip;
    container-type: size;
    aspect-ratio: 16 / 10;
    pointer-events: none;
    user-select: none;
}

.section-preview-card-title {
    padding: var(--sp-3) var(--sp-4) var(--sp-4);
}

@media (prefers-reduced-motion: reduce) {
    .section-preview-card:hover {
        translate: none;
    }
}
</style>
