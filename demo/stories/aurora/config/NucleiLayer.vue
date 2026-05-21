<script setup lang="ts">
import { Plus } from "@lucide/vue";
import { Button } from "../../../../src/components/ui/button";
import { LabeledSlider } from "../../../../src/components/custom/labeled-field";
import type { AuroraConfig } from "../../../../src/components/custom/aurora";
import { MAX_NUCLEI } from "../../../../src/components/custom/aurora";

const props = defineProps<{
    config: AuroraConfig;
}>();

function removeNucleus(i: number) {
    if (props.config.nuclei.length <= 1) return;
    props.config.nuclei.splice(i, 1);
}

function addNucleus() {
    if (props.config.nuclei.length >= MAX_NUCLEI) return;
    props.config.nuclei.push({
        x: 0.5,
        y: 0.5,
        radius: 0.5,
        paletteBias: 0.5,
        valueBias: 0,
        driftRadius: 0.01,
        driftPhase: Math.random() * Math.PI * 2,
    });
}
</script>

<template>
    <div class="flex min-w-[300px] flex-col gap-3 p-3">
        <div class="flex items-center justify-between">
            <p class="text-admin-label text-muted-foreground">
                Nuclei ({{ config.nuclei.length }}/{{ MAX_NUCLEI }})
            </p>
            <Button
                variant="glass"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :disabled="config.nuclei.length >= MAX_NUCLEI"
                @click="addNucleus"
            >
                <Plus :size="12" />
                Add
            </Button>
        </div>
        <p class="text-caption text-muted-foreground">
            alt-click canvas to add · shift-click / right-click to remove · drag to move
        </p>
        <div class="flex flex-col gap-3">
            <div
                v-for="(nu, i) in config.nuclei"
                :key="i"
                class="flex flex-col gap-1.5 rounded-panel border border-border/40 bg-card/50 p-2"
            >
                <div class="flex items-center justify-between">
                    <span class="text-mono-caption text-muted-foreground">#{{ i + 1 }}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        class="h-6 px-2 text-caption text-muted-foreground hover:text-destructive"
                        :disabled="config.nuclei.length <= 1"
                        @click="removeNucleus(i)"
                    >
                        Remove
                    </Button>
                </div>
                <LabeledSlider
                    :model-value="nu.x"
                    label="X"
                    tooltip="Horizontal position 0..1 (top-origin)"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    @update:model-value="(v: number) => (nu.x = v)"
                />
                <LabeledSlider
                    :model-value="nu.y"
                    label="Y"
                    tooltip="Vertical position 0..1 (top-origin)"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    @update:model-value="(v: number) => (nu.y = v)"
                />
                <LabeledSlider
                    :model-value="nu.radius"
                    label="Radius"
                    tooltip="Gaussian falloff (larger = broader influence)"
                    :min="0.1"
                    :max="0.8"
                    :step="0.01"
                    @update:model-value="(v: number) => (nu.radius = v)"
                />
                <LabeledSlider
                    :model-value="nu.elongation ?? 1"
                    label="Elongation"
                    tooltip="Major:minor axis ratio (1 = isotropic)"
                    :min="1"
                    :max="3"
                    :step="0.05"
                    @update:model-value="(v: number) => (nu.elongation = v)"
                />
                <LabeledSlider
                    :model-value="nu.angle ?? 0"
                    label="Angle"
                    tooltip="Major-axis orientation in degrees (top-origin)"
                    :min="-180"
                    :max="180"
                    :step="1"
                    @update:model-value="(v: number) => (nu.angle = v)"
                />
                <LabeledSlider
                    :model-value="nu.paletteBias"
                    label="Palette bias"
                    tooltip="0..1 · which palette stop this nucleus pulls toward"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    @update:model-value="(v: number) => (nu.paletteBias = v)"
                />
                <LabeledSlider
                    :model-value="nu.valueBias"
                    label="Value bias"
                    tooltip="-0.3..0.3 · local lightness pull"
                    :min="-0.3"
                    :max="0.3"
                    :step="0.01"
                    @update:model-value="(v: number) => (nu.valueBias = v)"
                />
                <LabeledSlider
                    :model-value="nu.driftRadius"
                    label="Drift radius"
                    tooltip="0..0.05 · orbit amplitude"
                    :min="0"
                    :max="0.05"
                    :step="0.001"
                    @update:model-value="(v: number) => (nu.driftRadius = v)"
                />
            </div>
        </div>
    </div>
</template>
