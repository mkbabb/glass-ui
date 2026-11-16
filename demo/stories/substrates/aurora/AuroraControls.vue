<script setup lang="ts">
// The Aurora editor: three layers, one open at a time, one control per row. Colour
// edits derive a fresh palette from the seed; every other row writes the config.
import { computed, reactive, ref, watch } from "vue";
import { ConfiguratorLayer } from "@glass/components/configurator";
import {
    MAX_STOPS,
    deriveAurora,
    oklchStopToHex,
    type AuroraConfig,
    type AuroraHarmony,
    type AuroraMedium,
    type FlowPattern,
} from "@glass/components/aurora";
import SliderRow from "../shared/SliderRow.vue";
import SelectRow from "../shared/SelectRow.vue";
import SwitchRow from "../shared/SwitchRow.vue";
import ColorRow from "../shared/ColorRow.vue";

const props = defineProps<{ config: AuroraConfig; presetKey?: string }>();

const MEDIA: readonly { label: string; value: AuroraMedium }[] = [
    { label: "Smooth", value: "smooth" },
    { label: "Watercolour", value: "watercolor" },
    { label: "Pastel", value: "pastel" },
    { label: "Oil", value: "oil" },
    { label: "Crayon", value: "crayon" },
    { label: "Van Gogh", value: "vangogh" },
    { label: "Oil pastel", value: "oil-pastel" },
    { label: "Kuwahara", value: "kuwahara" },
    { label: "Metal", value: "metal" },
    { label: "Brushed metal", value: "metal-gradient" },
];
const HARMONIES: readonly { label: string; value: AuroraHarmony }[] = [
    { label: "Analogous", value: "analogous" },
    { label: "Complementary", value: "complementary" },
    { label: "Triad", value: "triad" },
    { label: "Tetradic", value: "tetradic" },
    { label: "Monochrome", value: "monochrome" },
];
const FLOWS: readonly { label: string; value: FlowPattern }[] = [
    { label: "None", value: "none" },
    { label: "Radial", value: "radial" },
    { label: "Swirl", value: "swirl" },
    { label: "Diagonal", value: "diagonal" },
    { label: "Multi", value: "multi" },
];

type Layer = "field" | "motion" | "finish";
const open = ref<Layer | null>("field");
const setOpen = (id: Layer, v: boolean): void => {
    open.value = v ? id : null;
};

// The colour source the palette derives from, read back from the preset on a switch.
const colour = reactive({ seed: "#e8875a", harmony: "analogous" as AuroraHarmony, stops: 5 });
function readColour(): void {
    const first = props.config.palette[0];
    if (first) colour.seed = oklchStopToHex(first);
    colour.stops = props.config.palette.length;
}
readColour();
watch(() => props.presetKey, readColour);

function setColour(patch: Partial<typeof colour>): void {
    Object.assign(colour, patch);
    props.config.palette = deriveAurora(colour.seed, {
        stopCount: colour.stops,
        harmony: colour.harmony,
    });
}

const pointer = computed({
    get: () => props.config.interactivity?.swirl ?? true,
    set: (swirl: boolean) => (props.config.interactivity = { ...props.config.interactivity, swirl }),
});
const strength = computed({
    get: () => props.config.interactivity?.amplitude ?? 0.45,
    set: (amplitude: number) =>
        (props.config.interactivity = { ...props.config.interactivity, amplitude }),
});
</script>

<template>
    <ConfiguratorLayer label="Field" :open="open === 'field'" @update:open="setOpen('field', !!$event)">
        <ColorRow label="Seed" :model-value="colour.seed" @update:model-value="setColour({ seed: $event })" />
        <SelectRow
            label="Harmony"
            :options="HARMONIES"
            :model-value="colour.harmony"
            @update:model-value="setColour({ harmony: $event })"
        />
        <SliderRow
            label="Stops"
            :min="2"
            :max="MAX_STOPS"
            :step="1"
            :model-value="colour.stops"
            @update:model-value="setColour({ stops: $event })"
        />
        <SelectRow v-model="config.medium" label="Medium" :options="MEDIA" />
        <SliderRow
            v-model="config.strokeAmount"
            label="Texture"
            :min="0"
            :max="1"
            :step="0.01"
            :disabled="config.medium === 'smooth'"
        />
        <SliderRow v-model="config.softmaxBeta" label="Edge" :min="1" :max="10" :step="0.1" />
        <SliderRow v-model="config.warpAmount" label="Warp" :min="0" :max="0.6" :step="0.01" />
        <SliderRow v-model="config.warpScale" label="Warp scale" :min="0.5" :max="3" :step="0.05" />
        <SelectRow v-model="config.flow.pattern" label="Flow" :options="FLOWS" />
        <SliderRow v-model="config.flow.curl" label="Curl" :min="0" :max="1" :step="0.01" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Motion" :open="open === 'motion'" @update:open="setOpen('motion', !!$event)">
        <SwitchRow v-model="pointer" label="Pointer" />
        <SliderRow v-model="strength" label="Pull" :min="0" :max="1" :step="0.05" />
        <SliderRow v-model="config.nucleiDrift" label="Drift" :min="0" :max="0.05" :step="0.001" />
        <SliderRow v-model="config.paletteDrift" label="Hue drift" :min="0" :max="0.04" :step="0.001" />
        <SliderRow v-model="config.breathDepth" label="Breath" :min="0" :max="0.15" :step="0.005" />
        <SliderRow v-model="config.breathPeriod" label="Breath time" :min="10" :max="90" :step="1" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Finish" :open="open === 'finish'" @update:open="setOpen('finish', !!$event)">
        <SliderRow v-model="config.saturation" label="Saturation" :min="0.5" :max="1.3" :step="0.01" />
        <SliderRow v-model="config.valueVariance" label="Mottle" :min="0" :max="0.3" :step="0.01" />
        <SliderRow v-model="config.strokeScale" label="Stroke size" :min="40" :max="320" :step="2" />
        <SliderRow v-model="config.impasto" label="Impasto" :min="0" :max="1" :step="0.01" />
        <SliderRow v-model="config.wetEdge" label="Wet edge" :min="0" :max="1" :step="0.01" />
        <SliderRow v-model="config.granulation" label="Granulation" :min="0" :max="1" :step="0.01" />
        <SliderRow v-model="config.canvasGrain" label="Weave" :min="0" :max="0.1" :step="0.002" />
        <SliderRow v-model="config.paperGrain" label="Paper grain" :min="0" :max="0.02" :step="0.001" />
    </ConfiguratorLayer>
</template>
