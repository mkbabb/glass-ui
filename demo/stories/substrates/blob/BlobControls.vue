<script setup lang="ts">
// The Blob editor: three layers, one open at a time, one control per row.
import { ref } from "vue";
import { ConfiguratorLayer } from "@glass/components/configurator";
import type { BlobMerge, BlobMood } from "@glass/components/blob";
import type { ColorHarmony } from "@glass/composables/color";
import SliderRow from "../shared/SliderRow.vue";
import SelectRow from "../shared/SelectRow.vue";
import SwitchRow from "../shared/SwitchRow.vue";
import ColorRow from "../shared/ColorRow.vue";
import type { BlobStudio } from "./studio";

defineProps<{ config: BlobStudio }>();

const MOODS: readonly { label: string; value: BlobMood }[] = [
    { label: "Idle", value: "idle" },
    { label: "Happy", value: "happy" },
    { label: "Curious", value: "curious" },
    { label: "Sleepy", value: "sleepy" },
    { label: "Excited", value: "excited" },
];
const HARMONIES: readonly { label: string; value: ColorHarmony }[] = [
    { label: "Analogous", value: "analogous" },
    { label: "Complementary", value: "complementary" },
    { label: "Triad", value: "triad" },
    { label: "Tetradic", value: "tetradic" },
    { label: "Monochrome", value: "monochrome" },
];
const MERGES: readonly { label: string; value: BlobMerge }[] = [
    { label: "Rounded", value: "circular" },
    { label: "Creased", value: "quadratic" },
];

type Layer = "character" | "surface" | "satellites";
const open = ref<Layer | null>("character");
const setOpen = (id: Layer, v: boolean): void => {
    open.value = v ? id : null;
};
</script>

<template>
    <ConfiguratorLayer label="Character" :open="open === 'character'" @update:open="setOpen('character', !!$event)">
        <SelectRow v-model="config.mood" label="Mood" :options="MOODS" />
        <SliderRow v-model="config.attraction" label="Lean" :min="-1" :max="1" :step="0.05" />
        <SliderRow v-model="config.responsiveness" label="Liveliness" :min="0" :max="1" :step="0.05" />
        <SliderRow v-model="config.clickImpulse" label="Bounce" :min="0" :max="1.5" :step="0.05" />
        <ColorRow v-model="config.seed" label="Colour" />
        <SelectRow v-model="config.harmony" label="Harmony" :options="HARMONIES" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Surface" :open="open === 'surface'" @update:open="setOpen('surface', !!$event)">
        <SliderRow v-model="config.morphT" label="Dressing" :min="0" :max="1" :step="0.01" />
        <SwitchRow v-model="config.lit" label="Glass light" />
        <SwitchRow v-model="config.shadow" label="Shadow" />
        <SliderRow v-model="config.shadowSoftness" label="Shadow edge" :min="4" :max="48" :step="1" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Satellites" :open="open === 'satellites'" @update:open="setOpen('satellites', !!$event)">
        <SliderRow v-model="config.satelliteCount" label="Count" :min="0" :max="4" :step="1" />
        <SliderRow v-model="config.orbitRadius" label="Orbit" :min="0.1" :max="0.42" :step="0.01" />
        <SliderRow v-model="config.satelliteRadius" label="Size" :min="0.04" :max="0.16" :step="0.005" />
        <SliderRow v-model="config.eccentricity" label="Ellipse" :min="0" :max="0.3" :step="0.01" />
        <SliderRow v-model="config.smoothK" label="Merge reach" :min="0.02" :max="0.16" :step="0.005" />
        <SelectRow v-model="config.merge" label="Merge" :options="MERGES" />
    </ConfiguratorLayer>
</template>
