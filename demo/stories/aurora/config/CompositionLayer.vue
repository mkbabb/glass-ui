<script setup lang="ts">
import { SegmentedTabs } from "../../../../src/components/custom/tabs";
import { LabeledSlider } from "../../../../src/components/custom/labeled-field";
import type { AuroraConfig, WarpMode } from "../../../../src/components/custom/aurora";
import { warpModeOptions } from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

function setWarpMode(v: string | string[]) {
    props.config.warpMode = String(v) as WarpMode;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
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
