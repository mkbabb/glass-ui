<script setup lang="ts">
import { computed } from "vue";
import { SegmentedTabs } from "../../../../src/components/custom/tabs";
import { LabeledSlider } from "../../../../src/components/custom/labeled-field";
import type {
    AuroraConfig,
    StrokeMode,
} from "../../../../src/components/custom/aurora";
import {
    noiseOctavesOptions,
    strokeLayersOptions,
    strokeModeOptions,
} from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

// The oil stroke sub-modes only apply to the oil medium; the noise-octaves
// detail control is medium-agnostic (the warp detail tier).
const showStrokeMode = computed(() => props.config.medium === "oil");

function setStrokeMode(v: string | string[]) {
    props.config.strokeMode = String(v) as StrokeMode;
}
function setStrokeLayers(v: string | string[]) {
    props.config.strokeLayers = Number(v) as 1 | 2;
}
function setNoiseOctaves(v: string | string[]) {
    props.config.noiseOctaves = Number(v) as 3 | 4 | 5;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3">
        <!-- Oil sub-modes (oil medium only — the short toggle sets, segmented). -->
        <div v-if="showStrokeMode" class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Stroke mode</p>
            <SegmentedTabs
                :options="[...strokeModeOptions]"
                :model-value="config.strokeMode"
                variant="pill"
                @update:model-value="setStrokeMode"
            />
        </div>
        <div v-if="showStrokeMode" class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Stroke layers</p>
            <SegmentedTabs
                :options="[...strokeLayersOptions]"
                :model-value="String(config.strokeLayers)"
                variant="pill"
                @update:model-value="setStrokeLayers"
            />
        </div>
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Noise octaves</p>
            <SegmentedTabs
                :options="[...noiseOctavesOptions]"
                :model-value="String(config.noiseOctaves)"
                variant="pill"
                @update:model-value="setNoiseOctaves"
            />
        </div>

        <!-- The full medium-texture slider bank. -->
        <LabeledSlider
            :model-value="config.strokeAmount"
            label="Stroke amount"
            tooltip="0..1 · overall strength of medium texture"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.strokeAmount = v)"
        />
        <LabeledSlider
            :model-value="config.strokeScale"
            label="Stroke scale"
            tooltip="Reciprocal density for strokes"
            :min="40"
            :max="320"
            :step="2"
            @update:model-value="(v: number) => (config.strokeScale = v)"
        />
        <LabeledSlider
            :model-value="config.strokeAnisotropy"
            label="Anisotropy"
            tooltip="0..1 · stroke elongation along flow"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.strokeAnisotropy = v)"
        />
        <LabeledSlider
            :model-value="config.impasto"
            label="Impasto"
            tooltip="0..1 · edge catch-light for oil"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.impasto = v)"
        />
        <LabeledSlider
            :model-value="config.brokenColor"
            label="Broken color"
            tooltip="0..1 · per-stroke hue jitter"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.brokenColor = v)"
        />
        <LabeledSlider
            :model-value="config.canvasGrain"
            label="Canvas grain"
            tooltip="0..0.1 · oil canvas weave strength"
            :min="0"
            :max="0.1"
            :step="0.002"
            @update:model-value="(v: number) => (config.canvasGrain = v)"
        />
        <LabeledSlider
            :model-value="config.wetEdge"
            label="Wet edge"
            tooltip="0..1 · watercolor cauliflower darkening"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.wetEdge = v)"
        />
        <LabeledSlider
            :model-value="config.granulation"
            label="Granulation"
            tooltip="0..1 · paper-fiber pigment settle"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.granulation = v)"
        />
        <LabeledSlider
            :model-value="config.paperGrain"
            label="Paper grain"
            tooltip="0..0.02 · final film-grain"
            :min="0"
            :max="0.02"
            :step="0.001"
            @update:model-value="(v: number) => (config.paperGrain = v)"
        />
    </div>
</template>
