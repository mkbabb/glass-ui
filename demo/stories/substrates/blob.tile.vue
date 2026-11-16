<script setup lang="ts">
// The card's Blob: the page's own stage, inert, parked unless the card is hovered.
import { ref } from "vue";
import BlobStage from "./blob.stage.vue";
import { useCardRun } from "./shared/useCardRun";

const box = ref<HTMLElement | null>(null);
const running = useCardRun(box);
</script>

<template>
    <div ref="box" class="substrate-tile">
        <BlobStage :paused="!running" :pressable="false" />
    </div>
</template>

<style scoped>
.substrate-tile {
    position: relative;
    inline-size: 100%;
    aspect-ratio: 16 / 10;
}
</style>
