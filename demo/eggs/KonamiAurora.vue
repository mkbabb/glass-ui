<script setup lang="ts">
// The konami full-bleed aurora reveal (E2). When the konami sequence fires, the
// shipped <Aurora> escapes from behind the cards to FULL-BLEED at intensity 1 for
// a bounded window (~10s), then fades and restores — "what the substrate can
// really do."
//
// PRM-gated: under prefers-reduced-motion the reveal is a STATIC aurora frame
// (the useWebGLCanvas substrate PRM-freezes — one painted frame, no drift). The
// bounded reveal of a static painterly field is acceptable delight under reduce.
import { onMounted, onBeforeUnmount, ref } from "vue";
import { Aurora } from "@glass/components/custom/aurora";
import { heroAuroraConfig } from "../chassis/hero/aurora-hero";

const emit = defineEmits<{ done: [] }>();

const config = heroAuroraConfig("rose-indigo-amber");
const shown = ref(false);
let fadeTimer: ReturnType<typeof setTimeout> | null = null;
let doneTimer: ReturnType<typeof setTimeout> | null = null;

const REVEAL_MS = 9000;
const FADE_MS = 900;

onMounted(() => {
    // Next frame → the CSS opacity transition runs (mount at 0, raise to 1).
    requestAnimationFrame(() => {
        shown.value = true;
    });
    fadeTimer = setTimeout(() => {
        shown.value = false;
    }, REVEAL_MS);
    doneTimer = setTimeout(() => emit("done"), REVEAL_MS + FADE_MS);
});

onBeforeUnmount(() => {
    if (fadeTimer !== null) clearTimeout(fadeTimer);
    if (doneTimer !== null) clearTimeout(doneTimer);
});
</script>

<template>
    <div
        class="konami-aurora pointer-events-none fixed inset-0 z-[150]"
        :data-shown="shown ? 'true' : 'false'"
        data-egg="konami-aurora"
        aria-hidden="true"
    >
        <Aurora :config="config" :opacity-ceiling="1" class="h-full w-full" />
    </div>
</template>

<style scoped>
.konami-aurora {
    opacity: 0;
    transition: opacity 900ms var(--ease-standard);
}
.konami-aurora[data-shown="true"] {
    opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
    /* No fade-in drift — the reveal snaps to the static painted frame. */
    .konami-aurora {
        transition: none;
        opacity: 1;
    }
}
</style>
