<script setup lang="ts">
import { computed, ref } from "vue";
import {
    LabeledSelect,
    LabeledSlider,
} from "../../../../src/components/custom/labeled-field";
import type {
    AuroraAtoms,
    AuroraMedium,
    AuroraZoneArrangement,
} from "../../../../src/components/custom/aurora";

/**
 * The Composition section — the medium + zones ATOMS. The medium picker is the
 * full 7-medium enum (smooth · watercolor · pastel · oil · crayon · van-gogh ·
 * oil-pastel); the Texture slider is STRUCTURALLY ABSENT on a smooth medium
 * (v-if, not disabled-and-ignored — no dead affordance). Zones is a count +
 * an arrangement character. The `data-atom` anchors (`medium`, `zones-count`)
 * are the studio gate's route.
 */
const props = defineProps<{
    atoms: AuroraAtoms;
}>();

const MEDIA: Record<string, AuroraMedium> = {
    Smooth: "smooth",
    Watercolor: "watercolor",
    Pastel: "pastel",
    Oil: "oil",
    Crayon: "crayon",
    "Van Gogh": "vangogh",
    "Oil Pastel": "oil-pastel",
};
const ARRANGEMENTS: Record<string, AuroraZoneArrangement> = {
    Scattered: "scattered",
    Composed: "composed",
    Centred: "centred",
};

function labelFor<T extends string>(map: Record<string, T>, value: T): string {
    return Object.keys(map).find((k) => map[k] === value) ?? Object.keys(map)[0]!;
}
const mediaItems = Object.keys(MEDIA);
const arrangementItems = Object.keys(ARRANGEMENTS);

const mediumKind = computed(() => props.atoms.medium?.kind ?? "smooth");
const mediumLabel = computed(() => labelFor(MEDIA, mediumKind.value));
const isTextured = computed(() => mediumKind.value !== "smooth");
const textureAmount = computed<number>(() =>
    props.atoms.medium && props.atoms.medium.kind !== "smooth"
        ? props.atoms.medium.amount ?? 0.5
        : 0.5,
);
const arrangementLabel = computed(() =>
    labelFor(ARRANGEMENTS, props.atoms.zones?.arrangement ?? "composed"),
);

const mediumOpen = ref(false);
const arrangementOpen = ref(false);

function setMedium(label: string) {
    const kind = MEDIA[label]!;
    props.atoms.medium =
        kind === "smooth" ? { kind } : { kind, amount: textureAmount.value };
}
function setTexture(amount: number) {
    if (props.atoms.medium && props.atoms.medium.kind !== "smooth")
        props.atoms.medium.amount = amount;
}
function setZonesCount(v: number) {
    props.atoms.zones = {
        count: v,
        arrangement: props.atoms.zones?.arrangement ?? "composed",
    };
}
function setArrangement(label: string) {
    props.atoms.zones = {
        count: props.atoms.zones?.count ?? 2,
        arrangement: ARRANGEMENTS[label]!,
    };
}
function setNoise(v: number) {
    props.atoms.noise = v;
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <LabeledSelect
            label="Medium"
            tooltip="Painterly body the field is rendered with"
            :items="mediaItems"
            :is-open="mediumOpen"
            :model-value="mediumLabel"
            data-atom="medium"
            @update:model-value="setMedium"
            @update:open="(v: boolean) => (mediumOpen = v)"
        />

        <!-- texture amount is STRUCTURALLY ABSENT on smooth (no dead slider). -->
        <LabeledSlider
            v-if="isTextured"
            label="Texture"
            tooltip="0..1 · strength of the painterly texture"
            :model-value="textureAmount"
            :min="0"
            :max="1"
            :step="0.05"
            data-atom="texture"
            @update:model-value="setTexture"
        />

        <LabeledSlider
            label="Zones"
            tooltip="1..6 · number of color zones"
            :model-value="atoms.zones?.count ?? 2"
            :min="1"
            :max="6"
            :step="1"
            data-atom="zones-count"
            @update:model-value="setZonesCount"
        />

        <LabeledSelect
            label="Arrangement"
            tooltip="How the zones are placed across the field"
            :items="arrangementItems"
            :is-open="arrangementOpen"
            :model-value="arrangementLabel"
            data-atom="zones-arrangement"
            @update:model-value="setArrangement"
            @update:open="(v: boolean) => (arrangementOpen = v)"
        />

        <!-- The organic-boundary atom — one scalar fanning to the warp cluster
             (warpAmount/scale/mode + noiseOctaves). The Warp & noise section
             exposes the deep warp fields directly; this is the intuitive knob. -->
        <LabeledSlider
            label="Organic boundary"
            tooltip="0..1 · how irregular the zone edges read"
            :model-value="atoms.noise ?? 0.5"
            :min="0"
            :max="1"
            :step="0.05"
            data-atom="noise"
            @update:model-value="setNoise"
        />
    </div>
</template>
