<script setup lang="ts">
import { computed } from "vue";
import { SegmentedTabs } from "../../../../src/components/custom/tabs";
import { LabeledSelect } from "../../../../src/components/custom/labeled-field";
import type {
    AuroraConfig,
    AuroraMedium,
    StrokeMode,
} from "../../../../src/components/custom/aurora";
import {
    mediumOptions,
    noiseOctavesOptions,
    strokeLayersOptions,
    strokeModeOptions,
} from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

const showStrokeMode = computed(() => props.config.medium === "oil");

// The 7-way medium enum reads better as a glass Select than a cramped 7-segment
// pill, and renders the SAME way as the atoms-panel medium picker (one enum,
// one rendering). A label↔value map round-trips the typed union since
// LabeledSelect displays the item string verbatim.
const mediumLabels = mediumOptions.map((o) => o.label);
const mediumByLabel = Object.fromEntries(
    mediumOptions.map((o) => [o.label, o.value]),
) as Record<string, AuroraMedium>;
const mediumLabelByValue = Object.fromEntries(
    mediumOptions.map((o) => [o.value, o.label]),
) as Record<AuroraMedium, string>;
const mediumLabel = computed(() => mediumLabelByValue[props.config.medium]);

function setMedium(label: string) {
    props.config.medium = mediumByLabel[label]!;
}

// SegmentedTabs single-select round-trips a string; the short stroke/noise
// enums stay segmented (the role=group + aria-pressed ToggleGroup-shaped
// surface — a short set of toggles mutating one canvas).
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
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
        <LabeledSelect
            label="Medium"
            tooltip="Painterly body the field is rendered with"
            :items="mediumLabels"
            :is-open="false"
            :model-value="mediumLabel"
            @update:model-value="setMedium"
        />
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
    </div>
</template>
