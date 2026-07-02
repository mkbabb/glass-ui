<script setup lang="ts">
import { SegmentedTabs } from "@glass/components/custom/tabs";
import { LabeledSlider } from "@glass/components/custom/labeled-field";
import type {
    AuroraConfig,
    AuroraSource,
    WarpMode,
} from "@glass/components/custom/aurora";
import { sourceOptions, warpModeOptions } from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

function setWarpMode(v: string | string[]) {
    props.config.warpMode = String(v) as WarpMode;
}

// BG.W-AUR-IMAGE-SOURCE — the color-source axis. "Image" dissolves a decoded photo into
// the field's drift (a separate compiled program); a file picker feeds `config.src` (a
// `Blob`, decoded through the ONE shared texture-upload primitive).
function setSource(v: string | string[]) {
    props.config.source = String(v) as AuroraSource;
}
function onImageFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) props.config.src = file;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Source</p>
            <SegmentedTabs
                :options="[...sourceOptions]"
                :model-value="config.source ?? 'palette'"
                variant="pill"
                @update:model-value="setSource"
            />
        </div>
        <div v-if="config.source === 'image'" class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Image</p>
            <input
                type="file"
                accept="image/*"
                class="text-small"
                @change="onImageFile"
            />
        </div>
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Warp mode</p>
            <SegmentedTabs
                :options="[...warpModeOptions]"
                :model-value="config.warpMode"
                variant="pill"
                @update:model-value="setWarpMode"
            />
        </div>
        <LabeledSlider
            :model-value="config.warpAmount"
            label="Warp amount"
            tooltip="0..0.6 · domain warp amplitude"
            :min="0"
            :max="0.6"
            :step="0.01"
            @update:model-value="(v: number) => (config.warpAmount = v)"
        />
        <LabeledSlider
            :model-value="config.warpScale"
            label="Warp scale"
            tooltip="0.5..3 · warp noise frequency"
            :min="0.5"
            :max="3"
            :step="0.05"
            @update:model-value="(v: number) => (config.warpScale = v)"
        />
        <LabeledSlider
            :model-value="config.warpDrift"
            label="Warp drift"
            tooltip="0..0.015 · warp evolution speed"
            :min="0"
            :max="0.015"
            :step="0.0005"
            @update:model-value="(v: number) => (config.warpDrift = v)"
        />
        <LabeledSlider
            :model-value="config.softmaxBeta"
            label="Softmax β"
            tooltip="3..10 · nucleus blend sharpness"
            :min="1"
            :max="10"
            :step="0.1"
            @update:model-value="(v: number) => (config.softmaxBeta = v)"
        />
        <LabeledSlider
            :model-value="config.saturation"
            label="Saturation"
            tooltip="0.6..1.3 · global saturation trim"
            :min="0.5"
            :max="1.3"
            :step="0.01"
            @update:model-value="(v: number) => (config.saturation = v)"
        />
        <LabeledSlider
            :model-value="config.valueVariance"
            label="Value variance"
            tooltip="0..0.3 · within-region L/C mottling"
            :min="0"
            :max="0.3"
            :step="0.01"
            @update:model-value="(v: number) => (config.valueVariance = v)"
        />
        <!-- The nuclei/palette drift + breath sliders moved to the Motion
             section (one motion home); this section is warp + noise only. -->
    </div>
</template>
