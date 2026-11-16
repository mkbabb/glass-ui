<script setup lang="ts">
// The card's Fourier field: the page's own stage, inert, parked unless the card is
// hovered.
import { ref } from "vue";
import FourierStage from "./fourier-field.stage.vue";
import { FOURIER_PRESETS } from "./fourier-field/studio";
import { useCardRun } from "./shared/useCardRun";

const studio = { ...FOURIER_PRESETS[0]!.config, interactive: false };
const box = ref<HTMLElement | null>(null);
const running = useCardRun(box);
</script>

<template>
    <div ref="box" class="substrate-tile">
        <FourierStage :studio="studio" :paused="!running" />
    </div>
</template>

<style scoped>
.substrate-tile {
    position: relative;
    inline-size: 100%;
    aspect-ratio: 16 / 10;
}
</style>
