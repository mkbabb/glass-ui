<script setup lang="ts">
import { computed } from "vue";
import {
    LabeledField,
    LabeledSelect,
    LabeledSlider,
} from "../../../src/components/custom/labeled-field";
import type {
    AuroraAtoms,
    AuroraHarmony,
    AuroraMedium,
    AuroraMotionAtom,
    AuroraZoneArrangement,
} from "../../../src/components/custom/aurora";

/**
 * The compact atoms control surface — COLOR (seed + harmony + energy), ZONES
 * (count + arrangement), NOISE (one organic-boundary knob), MEDIUM (+ texture
 * when textured), and MOTION. A `v-model:atoms` surface; the host
 * (`AuroraConfigDock`) resolves the atoms to a config and drives the canvas.
 *
 * The controls are the library's own form primitives — LabeledSelect /
 * LabeledSlider / LabeledField — so the default-visible surface reads as the
 * same glass-ui idiom the rest of the studio speaks (no raw UA-styled native
 * <select>/<input type=range>). The seed swatch stays a native <input
 * type=color> (a deliberate hex-paste affordance) wrapped in LabeledField so
 * it carries the same label contract.
 */
const props = defineProps<{
    atoms: AuroraAtoms;
}>();

const emit = defineEmits<{
    (e: "update:atoms", v: AuroraAtoms): void;
}>();

// Edit the atoms object in place (it is the host's reactive); the host's deep
// watcher re-resolves + drives the canvas. We mutate then re-emit for v-model.
function patch(fn: (a: AuroraAtoms) => void) {
    fn(props.atoms);
    emit("update:atoms", props.atoms);
}

// Each picker exposes Title-Case display labels (the LabeledSelect renders the
// item string verbatim); a label→value map round-trips the typed union. ONE
// medium picker, Title-Cased — van-Gogh + oil-pastel surface by name.
const HARMONIES: Record<string, AuroraHarmony> = {
    Analogous: "analogous",
    Complementary: "complementary",
    "Split complementary": "split-complementary",
    Triad: "triad",
    Tetradic: "tetradic",
    Monochrome: "monochrome",
};
const ARRANGEMENTS: Record<string, AuroraZoneArrangement> = {
    Scattered: "scattered",
    Composed: "composed",
    Centred: "centred",
};
const MEDIA: Record<string, AuroraMedium> = {
    Smooth: "smooth",
    Pastel: "pastel",
    Watercolor: "watercolor",
    Oil: "oil",
    Crayon: "crayon",
    "Van Gogh": "vangogh",
    "Oil Pastel": "oil-pastel",
};
const MOTIONS: Record<string, AuroraMotionAtom> = {
    Still: "still",
    Breathing: "breathing",
    Drifting: "drifting",
};

// Reverse maps (value → display label) so the bound select shows the
// Title-Case label for the live value.
function labelFor<T extends string>(map: Record<string, T>, value: T): string {
    return Object.keys(map).find((k) => map[k] === value) ?? Object.keys(map)[0]!;
}

const harmonyItems = Object.keys(HARMONIES);
const arrangementItems = Object.keys(ARRANGEMENTS);
const mediaItems = Object.keys(MEDIA);
const motionItems = Object.keys(MOTIONS);

const harmonyLabel = computed(() => labelFor(HARMONIES, props.atoms.harmony ?? "analogous"));
const arrangementLabel = computed(() =>
    labelFor(ARRANGEMENTS, props.atoms.zones?.arrangement ?? "composed"),
);
const motionLabel = computed(() => labelFor(MOTIONS, props.atoms.motion ?? "drifting"));

// The medium's texture amount is STRUCTURALLY ABSENT on a smooth medium — the
// slider is hidden, not disabled-and-ignored (no dead affordance).
const mediumKind = computed(() => props.atoms.medium?.kind ?? "smooth");
const mediumLabel = computed(() => labelFor(MEDIA, mediumKind.value));
const isTextured = computed(() => mediumKind.value !== "smooth");
const textureAmount = computed<number>(() =>
    props.atoms.medium && props.atoms.medium.kind !== "smooth"
        ? props.atoms.medium.amount ?? 0.5
        : 0.5,
);

const seedHex = computed(() =>
    typeof props.atoms.seed === "string" ? props.atoms.seed : "#3a7bd5",
);

function setHarmony(label: string) {
    patch((a) => (a.harmony = HARMONIES[label]!));
}
function setArrangement(label: string) {
    patch((a) => {
        a.zones = {
            count: a.zones?.count ?? 2,
            arrangement: ARRANGEMENTS[label]!,
        };
    });
}
function setMotion(label: string) {
    patch((a) => (a.motion = MOTIONS[label]!));
}
function setMedium(label: string) {
    const kind = MEDIA[label]!;
    patch((a) => {
        a.medium = kind === "smooth" ? { kind } : { kind, amount: textureAmount.value };
    });
}
function setTexture(amount: number) {
    patch((a) => {
        if (a.medium && a.medium.kind !== "smooth") a.medium.amount = amount;
    });
}
function setSeed(value: string) {
    patch((a) => (a.seed = value));
}
function setColorEnergy(v: number) {
    patch((a) => (a.colorEnergy = v));
}
function setZonesCount(v: number) {
    patch((a) => {
        a.zones = { count: v, arrangement: a.zones?.arrangement ?? "composed" };
    });
}
function setNoise(v: number) {
    patch((a) => (a.noise = v));
}
</script>

<template>
    <div class="flex flex-col gap-3 p-3">
        <!-- ── COLOR ──────────────────────────────────────────────────────── -->
        <p class="text-admin-label text-muted-foreground">Color</p>
        <LabeledField label="Seed" tooltip="Base color the harmony derives from" data-atom="seed">
            <input
                :value="seedHex"
                type="color"
                class="h-8 w-full cursor-pointer appearance-none rounded-control border border-border/40 bg-card/40 p-0.5 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-control [&::-webkit-color-swatch]:border-none"
                @input="setSeed(($event.target as HTMLInputElement).value)"
            />
        </LabeledField>

        <LabeledSelect
            label="Harmony"
            tooltip="Color relationship the palette is built from"
            :items="harmonyItems"
            :is-open="false"
            :model-value="harmonyLabel"
            data-atom="harmony"
            @update:model-value="setHarmony"
        />

        <LabeledSlider
            label="Energy"
            tooltip="0..1 · chroma/contrast of the palette"
            :model-value="atoms.colorEnergy ?? 0.5"
            :min="0"
            :max="1"
            :step="0.05"
            data-atom="colorEnergy"
            @update:model-value="setColorEnergy"
        />

        <!-- ── ZONES ──────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Zones</p>
        <LabeledSlider
            label="Count"
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
            :is-open="false"
            :model-value="arrangementLabel"
            data-atom="zones-arrangement"
            @update:model-value="setArrangement"
        />

        <!-- ── NOISE ──────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Noise</p>
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

        <!-- ── MEDIUM (+ texture only when textured) ──────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Medium</p>
        <LabeledSelect
            label="Medium"
            tooltip="Painterly body the field is rendered with"
            :items="mediaItems"
            :is-open="false"
            :model-value="mediumLabel"
            data-atom="medium"
            @update:model-value="setMedium"
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

        <!-- ── MOTION ─────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Motion</p>
        <LabeledSelect
            label="Motion"
            tooltip="How the field animates over time"
            :items="motionItems"
            :is-open="false"
            :model-value="motionLabel"
            data-atom="motion"
            @update:model-value="setMotion"
        />
    </div>
</template>
