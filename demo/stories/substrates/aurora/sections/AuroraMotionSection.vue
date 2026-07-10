<script setup lang="ts">
import { computed, ref } from "vue";
import {
    LabeledSelect,
    LabeledSlider,
} from "@glass/components/custom/labeled-field";
import type {
    AuroraAtoms,
    AuroraConfig,
    AuroraMotionAtom,
} from "@glass/components/custom/aurora";

/**
 * The Motion section — the motion-register ATOM (still · breathing · drifting)
 * plus the deep motion sliders the register fans out to (nuclei drift, palette
 * drift, breath depth + period). The atom sets the broad register; the deep
 * sliders refine the exact rates on the live config.
 */
const props = defineProps<{
    atoms: AuroraAtoms;
    config: AuroraConfig;
}>();

const MOTIONS: Record<string, AuroraMotionAtom> = {
    Still: "still",
    Breathing: "breathing",
    Drifting: "drifting",
};
const motionItems = Object.keys(MOTIONS);

function labelFor<T extends string>(map: Record<string, T>, value: T): string {
    return Object.keys(map).find((k) => map[k] === value) ?? Object.keys(map)[0]!;
}
const motionLabel = computed(() => labelFor(MOTIONS, props.atoms.motion ?? "drifting"));
const motionOpen = ref(false);

function setMotion(label: string) {
    props.atoms.motion = MOTIONS[label]!;
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <LabeledSelect
            label="Motion"
            tooltip="How the field animates over time"
            :items="motionItems"
            :is-open="motionOpen"
            :model-value="motionLabel"
            data-atom="motion"
            @update:model-value="setMotion"
            @update:open="(v: boolean) => (motionOpen = v)"
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
