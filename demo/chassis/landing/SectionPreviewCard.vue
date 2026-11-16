<script setup lang="ts">
// A card: the preview plate across its top, then the title. The plate shows the page's
// own stage (or its tile), mounted inert and scaled down to fit whole. A card has no
// blurb.
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref } from "vue";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import type { StoryPreview } from "./storyTile";

const props = defineProps<{
    to: string;
    title: string;
    tile: StoryPreview;
}>();

const preview = computed(() => defineAsyncComponent(props.tile));

// The specimen lays out at the plate's width; when its natural box is larger than the
// plate it is scaled down about its centre until the whole of it fits.
const plate = ref<HTMLElement | null>(null);
const specimen = ref<HTMLElement | null>(null);
const fit = ref(1);
let observer: ResizeObserver | null = null;

function measure(): void {
    const box = plate.value;
    const inner = specimen.value;
    if (!box || !inner) return;
    const w = Math.max(inner.scrollWidth, inner.offsetWidth);
    const h = Math.max(inner.scrollHeight, inner.offsetHeight);
    if (w === 0 || h === 0) return;
    fit.value = Math.min(1, box.clientWidth / w, box.clientHeight / h);
}

onMounted(() => {
    observer = new ResizeObserver(measure);
    if (plate.value) observer.observe(plate.value);
    if (specimen.value) observer.observe(specimen.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <TransitionRouteLink
        :to="to"
        :data-route-window="to"
        class="section-preview-card glass-resting focus-ring"
        data-story-card
    >
        <div
            ref="plate"
            class="section-preview-card-preview"
            inert
            aria-hidden="true"
            data-card-preview="live"
        >
            <div
                ref="specimen"
                class="section-preview-card-specimen"
                :style="{ scale: fit }"
                data-card-specimen
            >
                <component :is="preview" />
            </div>
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

/* The plate runs edge to edge at 16:10 on every card. */
.section-preview-card-preview {
    position: relative;
    overflow: clip;
    aspect-ratio: 16 / 10;
    background-color: var(--story-stage-plate);
    pointer-events: none;
    user-select: none;
}

/* The specimen at the plate's width and its own height, centred, scaled to fit. */
.section-preview-card-specimen {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    translate: 0 -50%;
    transform-origin: center;
    container-type: inline-size;
    padding: var(--sp-4);
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
