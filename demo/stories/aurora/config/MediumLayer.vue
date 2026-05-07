<script setup lang="ts">
import { computed } from "vue";
import { BouncyTabs } from "../../../../src/components/custom/tabs";
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

function setMedium(v: string) {
    props.config.medium = v as AuroraMedium;
}

function setStrokeMode(v: string) {
    props.config.strokeMode = v as StrokeMode;
}

function setStrokeLayers(v: string) {
    props.config.strokeLayers = Number(v) as 1 | 2;
}

function setNoiseOctaves(v: string) {
    props.config.noiseOctaves = Number(v) as 3 | 4 | 5;
}
</script>

<template>
    <div class="flex min-w-[280px] flex-col gap-3 p-3">
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Medium</p>
            <BouncyTabs
                :options="[...mediumOptions]"
                :model-value="config.medium"
                variant="pill"
                @update:model-value="setMedium"
            />
        </div>
        <div v-if="showStrokeMode" class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Stroke mode</p>
            <BouncyTabs
                :options="[...strokeModeOptions]"
                :model-value="config.strokeMode"
                variant="pill"
                @update:model-value="setStrokeMode"
            />
        </div>
        <div v-if="showStrokeMode" class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Stroke layers</p>
            <BouncyTabs
                :options="[...strokeLayersOptions]"
                :model-value="String(config.strokeLayers)"
                variant="pill"
                @update:model-value="setStrokeLayers"
            />
        </div>
        <div class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Noise octaves</p>
            <BouncyTabs
                :options="[...noiseOctavesOptions]"
                :model-value="String(config.noiseOctaves)"
                variant="pill"
                @update:model-value="setNoiseOctaves"
            />
        </div>
    </div>
</template>
