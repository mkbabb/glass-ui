<script setup lang="ts">
// The stage stands in for the app's viewport; this places the dock where its app does.
// `#context` is what the dock acts on in that app (a page, a figure), laid in the same
// grid area as the dock and kept clear of the dock's edge by one clearance. The context
// reads the dock's state, never its box: a dock that outgrows the clearance overlaps
// it, as a floating dock overlaps a page. `narrow` (under 30rem of stage width) is
// handed to both slots for the phone forms. The context is hidden and inert: nothing
// in it takes focus or a press, whatever component it holds.
import { computed, useTemplateRef } from "vue";
import { useElementSize } from "@vueuse/core";

defineProps<{
    place: "top" | "bottom" | "start" | "top-end" | "bottom-end" | "center";
}>();

const el = useTemplateRef<HTMLElement>("el");
const { width } = useElementSize(el);
const narrow = computed(() => width.value > 0 && width.value < 480);
</script>

<template>
    <div ref="el" class="scene" :data-place="place">
        <div v-if="$slots.context" class="scene-context" aria-hidden="true" inert>
            <slot name="context" :narrow="narrow" />
        </div>
        <div class="scene-dock">
            <slot :narrow="narrow" />
        </div>
    </div>
</template>

<style scoped>
.scene {
    /* The context's clearance from the dock's edge. */
    --scene-clear: 5rem;
    display: grid;
    grid-template: "scene" minmax(0, 1fr) / minmax(0, 1fr);
    box-sizing: border-box;
    block-size: 100%;
    /* A card gives its specimen no height; the floor keeps the scene's shape there. */
    min-block-size: 20rem;
    padding: var(--sp-5);
}

@container (inline-size < 30rem) {
    .scene {
        padding: var(--sp-3);
    }
}

.scene-context,
.scene-dock {
    grid-area: scene;
    min-inline-size: 0;
    min-block-size: 0;
}

/* One track the size of the context, so a Card's percentage width reads the context
   and never the Card's own content (WebKit sized an implicit track to it). */
.scene-context {
    display: grid;
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
    place-items: center;
}

.scene[data-place="start"] {
    --scene-clear: 6rem;
}

.scene[data-place="top"] .scene-context,
.scene[data-place="top-end"] .scene-context {
    padding-block-start: var(--scene-clear);
}
.scene[data-place="bottom"] .scene-context,
.scene[data-place="bottom-end"] .scene-context {
    padding-block-end: var(--scene-clear);
}
.scene[data-place="start"] .scene-context {
    padding-inline-start: var(--scene-clear);
    place-items: stretch start;
}

.scene-dock {
    display: grid;
}
.scene[data-place="top"] .scene-dock {
    place-items: start center;
}
.scene[data-place="bottom"] .scene-dock {
    place-items: end center;
}
.scene[data-place="start"] .scene-dock {
    place-items: start start;
}
.scene[data-place="top-end"] .scene-dock {
    place-items: start end;
}
.scene[data-place="bottom-end"] .scene-dock {
    place-items: end end;
}
.scene[data-place="center"] .scene-dock {
    place-items: center;
}
</style>
