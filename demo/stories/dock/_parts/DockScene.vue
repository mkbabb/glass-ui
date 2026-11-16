<script setup lang="ts">
// The stage stands in for the app's viewport; this places the dock where its app does.
// `#context` is what the dock sits beside in that app (a page column, a figure), laid
// under the dock and kept clear of it. `narrow` (under 30rem of stage width) is handed
// to both slots for the phone forms.
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
        <div v-if="$slots.context" class="scene-context" aria-hidden="true">
            <slot name="context" :narrow="narrow" />
        </div>
        <div class="scene-dock">
            <slot :narrow="narrow" />
        </div>
    </div>
</template>

<style scoped>
.scene {
    display: grid;
    grid-template-areas: "scene";
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

.scene-context {
    display: grid;
    place-items: center;
}

/* The context keeps clear of the dock's edge: a dock's run is 56 px, 60 on touch. */
.scene[data-place="top"] .scene-context {
    padding-block-start: 5rem;
}
.scene[data-place="bottom"] .scene-context {
    padding-block-end: 5rem;
}
.scene[data-place="start"] .scene-context {
    padding-inline-start: 6rem;
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
