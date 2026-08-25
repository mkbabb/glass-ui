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
                'flex flex-col gap-(--sp-3) rounded-card border border-[var(--glass-border-quiet)] p-(--sp-4)',
                props.class,
            )
        "
        :data-span="lead ? 'full' : null"
    >
        <!-- The thumbnail is paint, never a second interactive subtree.
             [BK #58] It mounts ONLY for a declared preview. A `none` card has no
             media region at all — no empty well, and so no place for the title to be
             printed a second time. -->
        <div
            v-if="tile.kind !== 'none'"
            class="section-preview-card-preview"
            inert
            aria-hidden="true"
        >
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

/* THE ABOVE-FOLD EXEMPTION (BK #58 W-PREVIEW-CARD; the edit ceded from PERF W3).
   `content-visibility: auto` above the fold buys nothing and costs twice. The lead
   card is the first grid item on its landing — it is on screen at first paint by
   construction, so there is no render work to skip — and it is the ONE card that
   spans the full row, so `contain-intrinsic-size: auto 19rem` is a placeholder height
   guessed for a box of a different shape. On the first frame the browser lays the
   field out against that guess and then corrects it, which is a shift under the
   reader's eye for a saving that was never available. Keyed on `[data-span]`, which
   is the same one attribute that makes it the lead — never a second flag to drift. */
.section-preview-card[data-span="full"] {
    content-visibility: visible;
    contain-intrinsic-size: none;
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

/* [struck 2026-08-10, BK #58] `.section-preview-card-identity` is GONE with its rung.
   It styled the title-slab the `identity` resolution rendered; that resolution no
   longer exists, so the rule had no producer and could never match. A dead rule left
   behind reads as a live option to the next author. */

@media (prefers-reduced-transparency: reduce) {
    .section-preview-card-preview {
        background: var(--card);
    }
}
</style>
