<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { cn } from "@glass/components/_shared/class-names";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import type { TileResolution } from "./storyTile";

interface SectionPreviewCardProps {
    to: string;
    title: string;
    blurb?: string | null;
    lead?: boolean;
    tile: TileResolution;
    class?: string;
}

const props = defineProps<SectionPreviewCardProps>();
const authoredTile = computed(() =>
    props.tile.kind === "authored" ? defineAsyncComponent(props.tile.loader) : null,
);
</script>

<template>
    <!-- The card is the WINDOW for the path it opens: the same element the route
         grammar names going in and lands back into coming out. -->
    <TransitionRouteLink
        :to="to"
        :data-route-window="to"
        :class="
            cn(
                'section-preview-card glass-resting focus-ring',
                'flex flex-col gap-3 rounded-card border border-[var(--glass-border-quiet)] p-4 lg:p-5',
                lead && 'sm:col-span-2',
                props.class,
            )
        "
    >
        <!-- The thumbnail is paint, never a second interactive subtree. -->
        <div class="section-preview-card-preview" inert aria-hidden="true">
            <img
                v-if="tile.kind === 'still'"
                class="section-preview-card-tile section-preview-card-viz-still"
                :src="tile.src"
                alt=""
                draggable="false"
            />
            <component
                :is="authoredTile"
                v-else-if="authoredTile"
                class="section-preview-card-tile"
            />
            <div
                v-else-if="tile.kind === 'identity'"
                class="section-preview-card-tile section-preview-card-identity"
            >
                {{ tile.title }}
            </div>
        </div>

        <span data-route-label class="text-subheading text-foreground">{{ title }}</span>
        <p v-if="blurb" class="text-small text-muted-foreground">{{ blurb }}</p>
    </TransitionRouteLink>
</template>

<style scoped>
.section-preview-card {
    content-visibility: auto;
    contain: content;
    contain-intrinsic-size: auto 19rem;
    transition:
        border-color var(--duration-fast) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out);
}

.section-preview-card:hover {
    border-color: var(--glass-border-floating);
    background-color: color-mix(in srgb, var(--card) 84%, transparent);
}

.section-preview-card-preview {
    pointer-events: none;
    user-select: none;
    position: relative;
    display: grid;
    place-items: center;
    overflow: clip;
    container-type: size;
    contain: paint;
    aspect-ratio: 1.618;
    max-block-size: 11rem;
    border-radius: calc(var(--radius-card) - 0.75rem);
    background: color-mix(in srgb, var(--card) 68%, transparent);
    box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 45%, transparent),
        inset 0 0 0 1px var(--glass-border-quiet);
}

.section-preview-card-tile {
    inline-size: 100%;
    block-size: 100%;
    border-radius: inherit;
}

.section-preview-card-viz-still {
    display: block;
    object-fit: cover;
}

.section-preview-card-tile,
.section-preview-card-tile :deep(*) {
    animation: none !important;
}

.section-preview-card-identity {
    display: grid;
    place-items: end start;
    padding: clamp(0.75rem, 10cqmin, 1.4rem);
    color: var(--foreground);
    font-family: var(--font-display);
    font-size: clamp(1rem, 13cqmin, 1.6rem);
    font-weight: var(--type-weight-display);
    line-height: 1.05;
    letter-spacing: var(--type-tracking-display);
    text-wrap: balance;
}

@media (prefers-reduced-transparency: reduce) {
    .section-preview-card-preview {
        background: var(--card);
    }
}
</style>
