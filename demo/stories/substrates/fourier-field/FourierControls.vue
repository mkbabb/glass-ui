<script setup lang="ts">
// The Fourier Field editor: three layers, one open at a time, one control per row.
import { computed, ref, watch } from "vue";
import { ConfiguratorLayer } from "@glass/components/configurator";
import SliderRow from "../shared/SliderRow.vue";
import SelectRow from "../shared/SelectRow.vue";
import SwitchRow from "../shared/SwitchRow.vue";
import { mintFor, type FourierStudio } from "./studio";

const props = defineProps<{ config: FourierStudio }>();

const COLOURS = [
    { label: "Warm", value: "var(--viz-fourier)" },
    { label: "Cool", value: "var(--viz-chebyshev)" },
    { label: "Violet", value: "var(--viz-legendre)" },
] as const;
const STROKES = [
    { label: "Fine", value: "4" },
    { label: "Medium", value: "8" },
    { label: "Bold", value: "12" },
] as const;
const SPEEDS = [
    { label: "Quarter", value: "0.25" },
    { label: "Half", value: "0.5" },
    { label: "Normal", value: "1" },
    { label: "Double", value: "2" },
] as const;

const maxTerms = computed(() => mintFor(props.config.source, props.config.richness).terms.length);
watch(maxTerms, (mx) => {
    if (props.config.harmonics > mx) props.config.harmonics = mx;
});

const stroke = computed({
    get: () => String(props.config.markStroke),
    set: (v: string) => (props.config.markStroke = Number(v)),
});
const speed = computed({
    get: () => String(props.config.speed),
    set: (v: string) => (props.config.speed = Number(v)),
});

type Layer = "terms" | "curve" | "head";
const open = ref<Layer | null>("terms");
const setOpen = (id: Layer, v: boolean): void => {
    open.value = v ? id : null;
};
</script>

<template>
    <ConfiguratorLayer label="Machine" :open="open === 'terms'" @update:open="setOpen('terms', !!$event)">
        <SliderRow v-model="config.harmonics" label="Terms" :min="1" :max="maxTerms" :step="1" />
        <SliderRow
            v-model="config.richness"
            label="Richness"
            :min="0"
            :max="1"
            :step="0.01"
            :disabled="config.source !== 'elliptic'"
        />
        <SwitchRow v-model="config.showMachine" label="Circles" />
        <SwitchRow v-model="config.rainbowChain" label="Rainbow" />
        <SwitchRow v-model="config.interactive" label="Scrub" />
        <SelectRow v-model="speed" label="Speed" :options="SPEEDS" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Curve" :open="open === 'curve'" @update:open="setOpen('curve', !!$event)">
        <SelectRow v-model="config.color" label="Colour" :options="COLOURS" />
        <SelectRow v-model="stroke" label="Stroke" :options="STROKES" />
        <SliderRow v-model="config.trailArc" label="Trail" :min="0.15" :max="1" :step="0.01" />
        <SliderRow v-model="config.inkOffset" label="Ink offset" :min="0" :max="1" :step="0.01" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Head" :open="open === 'head'" @update:open="setOpen('head', !!$event)">
        <SliderRow v-model="config.squash" label="Squash" :min="0" :max="1" :step="0.01" />
        <SliderRow v-model="config.glow" label="Glow" :min="0" :max="0.3" :step="0.01" />
        <SliderRow v-model="config.intensity" label="Intensity" :min="0" :max="2" :step="0.05" />
    </ConfiguratorLayer>
</template>
