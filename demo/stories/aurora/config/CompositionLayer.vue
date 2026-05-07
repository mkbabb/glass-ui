<script setup lang="ts">
import { BouncyTabs } from "../../../../src/components/custom/tabs";
import { LabeledSlider } from "../../../../src/components/custom/labeled-field";
import type { AuroraConfig, WarpMode } from "../../../../src/components/custom/aurora";
import { warpModeOptions } from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

function setWarpMode(v: string) {
    props.config.warpMode = v as WarpMode;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Warp mode</p>
            <BouncyTabs
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
        <LabeledSlider
            :model-value="config.nucleiDrift"
            label="Nuclei drift"
            tooltip="0..0.05 · nucleus orbit speed"
            :min="0"
            :max="0.05"
            :step="0.001"
            @update:model-value="(v: number) => (config.nucleiDrift = v)"
        />
        <LabeledSlider
            :model-value="config.paletteDrift"
            label="Palette drift"
            tooltip="0..0.04 · palette-id phase"
            :min="0"
            :max="0.04"
            :step="0.001"
            @update:model-value="(v: number) => (config.paletteDrift = v)"
        />
        <LabeledSlider
            :model-value="config.breathDepth"
            label="Breath depth"
            tooltip="0..0.15 · luminance wobble amplitude"
            :min="0"
            :max="0.15"
            :step="0.005"
            @update:model-value="(v: number) => (config.breathDepth = v)"
        />
        <LabeledSlider
            :model-value="config.breathPeriod"
            label="Breath period"
            tooltip="10..90s · breath cycle"
            :min="10"
            :max="90"
            :step="1"
            @update:model-value="(v: number) => (config.breathPeriod = v)"
        />
    </div>
</template>
