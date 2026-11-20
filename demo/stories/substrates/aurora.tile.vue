<script setup lang="ts">
// The card's Aurora: the page's own stage, inert, parked unless the card is hovered.
// A field runs to the plate's edges, so the tile takes back the card's specimen inset.
import { ref } from "vue";
import AuroraStage from "./aurora.stage.vue";
import { useCardRun } from "./shared/useCardRun";

const box = ref<HTMLElement | null>(null);
const running = useCardRun(box);
</script>

<template>
    <div ref="box" class="substrate-tile">
        <AuroraStage :paused="!running" :interactive="false" />
    </div>
</template>

<style scoped>
.substrate-tile {
    position: relative;
    inline-size: calc(100% + 2 * var(--sp-4));
    aspect-ratio: 16 / 10;
    margin: calc(-1 * var(--sp-4));
    overflow: hidden;
}
</style>
