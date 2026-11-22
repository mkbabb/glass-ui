<script setup lang="ts">
// The card's Constellation: the page's own stage, inert, held still unless the card
// is hovered.
import { ref } from "vue";
import ConstellationStage from "./constellation.stage.vue";
import { CONSTELLATION_PRESETS } from "./constellation/studio";
import { useCardRun } from "./shared/useCardRun";

const studio = { ...CONSTELLATION_PRESETS[0]!.config, pointer: false };
const box = ref<HTMLElement | null>(null);
const running = useCardRun(box);
</script>

<template>
    <div ref="box" class="substrate-tile">
        <ConstellationStage :studio="studio" :frozen="!running" />
    </div>
</template>

<style scoped>
.substrate-tile {
    position: relative;
    inline-size: 100%;
    aspect-ratio: 16 / 10;
}
</style>
