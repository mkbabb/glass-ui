<script setup lang="ts">
// The stage stands in for the app's viewport; this places the dock where its app does.
// `narrow` (under 30rem of stage width) is handed to the slot for the phone forms.
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
        <slot :narrow="narrow" />
    </div>
</template>

<style scoped>
.scene {
    display: grid;
    box-sizing: border-box;
    block-size: 100%;
    padding: var(--sp-5);
}

@container (inline-size < 30rem) {
    .scene {
        padding: var(--sp-3);
    }
}

.scene[data-place="top"] {
    place-items: start center;
}
.scene[data-place="bottom"] {
    place-items: end center;
}
.scene[data-place="start"] {
    place-items: start start;
}
.scene[data-place="top-end"] {
    place-items: start end;
}
.scene[data-place="bottom-end"] {
    place-items: end end;
}
.scene[data-place="center"] {
    place-items: center;
}
</style>
