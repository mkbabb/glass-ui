<script setup lang="ts">
import { computed, ref } from "vue";
import {
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import LabeledSelect from "../../../../chassis/field/LabeledSelect.vue";
import type {
    AuroraAtoms,
    AuroraConfig,
    AuroraInteractivityAtom,
    AuroraMotionAtom,
} from "@glass/components/aurora";

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
const medium = computed(() => props.atoms.medium?.kind ?? props.config.medium);
const interactivity = computed(() => props.atoms.interactivity ?? {});
const pointerEnabled = computed(() => interactivity.value.swirl === true);
const pointerAmplitude = computed(() => interactivity.value.amplitude ?? 0.5);
const lightEnabled = computed(
    () => medium.value !== "smooth" && interactivity.value.light === true,
);
const motionOpen = ref(false);

function setMotion(label: string) {
    props.atoms.motion = MOTIONS[label]!;
}

function setInteractivity(patch: AuroraInteractivityAtom) {
    const next = {
        ...interactivity.value,
        ...patch,
    };
    if (medium.value === "smooth") {
        const { light: _light, ...field } = next;
        props.atoms.interactivity = field;
    } else {
        props.atoms.interactivity = next;
    }
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <LabeledSelect
            label="Motion"
            description="How the field animates over time"
            :items="motionItems"
            :open="motionOpen"
            :model-value="motionLabel"
            data-atom="motion"
            @update:model-value="setMotion"
            @update:open="(v: boolean) => (motionOpen = v)"
        />

        <LabeledSwitch
            :model-value="pointerEnabled"
            label="Pointer shaping"
            description="Cursor movement bends the field and leans its local luminance"
            data-atom="pointer-swirl"
            @update:model-value="(swirl: boolean) => setInteractivity({ swirl })"
        />
        <LabeledSlider
            :model-value="pointerAmplitude"
            label="Pointer amplitude"
            description="0..1 · strength of the cursor-shaped field"
            :min="0"
            :max="1"
            :step="0.05"
            data-atom="pointer-amplitude"
            @update:model-value="(amplitude: number) => setInteractivity({ amplitude })"
        />
        <LabeledSwitch
            v-if="medium !== 'smooth'"
            :model-value="lightEnabled"
            label="Cursor light"
            description="Move the painterly catch-light with the cursor"
            data-atom="pointer-light"
            @update:model-value="(light: boolean) => setInteractivity({ light })"
        />

        <LabeledSlider
            :model-value="config.nucleiDrift"
            label="Nuclei drift"
            description="0..0.05 · nucleus orbit speed"
            :min="0"
            :max="0.05"
            :step="0.001"
            @update:model-value="(v: number) => (config.nucleiDrift = v)"
        />
        <LabeledSlider
            :model-value="config.paletteDrift"
            label="Palette drift"
            description="0..0.04 · palette-id phase"
            :min="0"
            :max="0.04"
            :step="0.001"
            @update:model-value="(v: number) => (config.paletteDrift = v)"
        />
        <LabeledSlider
            :model-value="config.breathDepth"
            label="Breath depth"
            description="0..0.15 · luminance wobble amplitude"
            :min="0"
            :max="0.15"
            :step="0.005"
            @update:model-value="(v: number) => (config.breathDepth = v)"
        />
        <LabeledSlider
            :model-value="config.breathPeriod"
            label="Breath period"
            description="10..90s · breath cycle"
            :min="10"
            :max="90"
            :step="1"
            @update:model-value="(v: number) => (config.breathPeriod = v)"
        />
    </div>
</template>
