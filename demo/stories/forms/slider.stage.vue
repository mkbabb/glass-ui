<script setup lang="ts">
// Slider's stage: one wide slider with marks, at the large size.
import { ref } from "vue";
import { Slider } from "@glass/components/slider";

const volume = ref([42]);
const MARKS = [0, 25, 50, 75, 100] as const;
</script>

<template>
    <div class="slider-stage">
        <Slider v-model="volume" size="lg" :max="100" :marks="MARKS" aria-label="Volume" />
    </div>
</template>

<style scoped>
.slider-stage {
    inline-size: min(100cqi, 40rem);
}
</style>
