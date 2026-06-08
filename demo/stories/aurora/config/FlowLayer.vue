<script setup lang="ts">
import { computed } from "vue";
import { SegmentedTabs } from "../../../../src/components/custom/tabs";
import { LabeledSlider } from "../../../../src/components/custom/labeled-field";
import type { AuroraConfig, FlowPattern } from "../../../../src/components/custom/aurora";
import { flowPatternOptions } from "./options";

const props = defineProps<{
    config: AuroraConfig;
}>();

const showFocal = computed(
    () => props.config.flow.pattern === "radial" || props.config.flow.pattern === "swirl",
);
const showAngle = computed(() => props.config.flow.pattern === "diagonal");

function setFlowPattern(v: string | string[]) {
    props.config.flow.pattern = String(v) as FlowPattern;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Pattern</p>
            <SegmentedTabs
                :options="[...flowPatternOptions]"
                :model-value="config.flow.pattern"
                variant="pill"
                @update:model-value="setFlowPattern"
            />
        </div>
        <LabeledSlider
            v-if="showFocal"
            :model-value="config.flow.focalX"
            label="Focal X"
            tooltip="0..1 · horizontal center of radial/swirl"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.flow.focalX = v)"
        />
        <LabeledSlider
            v-if="showFocal"
            :model-value="config.flow.focalY"
            label="Focal Y"
            tooltip="0..1 · vertical center (top-origin)"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.flow.focalY = v)"
        />
        <LabeledSlider
            v-if="showAngle"
            :model-value="config.flow.angle"
            label="Angle"
            tooltip="Flow angle in degrees (-180..180)"
            :min="-180"
            :max="180"
            :step="1"
            @update:model-value="(v: number) => (config.flow.angle = v)"
        />
        <LabeledSlider
            :model-value="config.flow.curl"
            label="Curl"
            tooltip="Per-position perturbation strength"
            :min="0"
            :max="1"
            :step="0.01"
            @update:model-value="(v: number) => (config.flow.curl = v)"
        />
    </div>
</template>
