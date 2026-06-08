<script setup lang="ts">
import { computed } from "vue";
import type {
    AuroraAtoms,
    AuroraHarmony,
    AuroraMedium,
    AuroraMotionAtom,
    AuroraZoneArrangement,
} from "../../../src/components/custom/aurora";

/**
 * AX.W10 — the ≤7-atom control surface. The user's named control elements
 * (§2.7) — COLOR (seed + harmony + energy), ZONES (count + arrangement), NOISE
 * (one organic-boundary knob), MEDIUM (+ texture when textured), MOTION. The
 * panel is a `v-model:atoms` surface; the host (`AuroraConfigDock`) resolves the
 * atoms to a config and drives the canvas. No `resolveAtoms`/`Aurora` here — this
 * is the live default surface, not a standalone demo.
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

const HARMONIES: readonly AuroraHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const ARRANGEMENTS: readonly AuroraZoneArrangement[] = ["scattered", "composed", "centred"];
const MEDIA: readonly AuroraMedium[] = [
    "smooth",
    "pastel",
    "watercolor",
    "oil",
    "vangogh",
    "oil-pastel",
];
const MOTIONS: readonly AuroraMotionAtom[] = ["still", "breathing", "drifting"];

// The medium's texture amount is STRUCTURALLY ABSENT on a smooth medium — the
// slider is hidden, not disabled-and-ignored (no dead affordance).
const mediumKind = computed(() => props.atoms.medium?.kind ?? "smooth");
const isTextured = computed(() => mediumKind.value !== "smooth");
const textureAmount = computed<number>(() =>
    props.atoms.medium && props.atoms.medium.kind !== "smooth"
        ? props.atoms.medium.amount ?? 0.5
        : 0.5,
);

function setMedium(kind: AuroraMedium) {
    patch((a) => {
        a.medium = kind === "smooth" ? { kind } : { kind, amount: textureAmount.value };
    });
}
function setTexture(amount: number) {
    patch((a) => {
        if (a.medium && a.medium.kind !== "smooth") a.medium.amount = amount;
    });
}
</script>

<template>
    <div class="flex flex-col gap-3 p-3">
        <!-- ── COLOR ──────────────────────────────────────────────────────── -->
        <p class="text-admin-label text-muted-foreground">Color</p>
        <label class="grid gap-1 text-sm" data-atom="seed">
            <span>seed</span>
            <input
                :value="typeof atoms.seed === 'string' ? atoms.seed : '#3a7bd5'"
                type="color"
                class="h-8 w-full rounded"
                @input="patch((a) => (a.seed = ($event.target as HTMLInputElement).value))"
            />
        </label>

        <label class="grid gap-1 text-sm" data-atom="harmony">
            <span>harmony</span>
            <select
                :value="atoms.harmony"
                class="rounded border bg-card px-2 py-1"
                @change="patch((a) => (a.harmony = ($event.target as HTMLSelectElement).value as AuroraHarmony))"
            >
                <option v-for="h in HARMONIES" :key="h" :value="h">{{ h }}</option>
            </select>
        </label>

        <label class="grid gap-1 text-sm" data-atom="colorEnergy">
            <span>energy ({{ (atoms.colorEnergy ?? 0.5).toFixed(2) }})</span>
            <input
                :value="atoms.colorEnergy ?? 0.5"
                type="range"
                min="0"
                max="1"
                step="0.05"
                @input="patch((a) => (a.colorEnergy = Number(($event.target as HTMLInputElement).value)))"
            />
        </label>

        <!-- ── ZONES ──────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Zones</p>
        <label class="grid gap-1 text-sm" data-atom="zones-count">
            <span>count ({{ atoms.zones?.count ?? 2 }})</span>
            <input
                :value="atoms.zones?.count ?? 2"
                type="range"
                min="1"
                max="6"
                step="1"
                @input="patch((a) => { a.zones = { count: Number(($event.target as HTMLInputElement).value), arrangement: a.zones?.arrangement ?? 'composed' }; })"
            />
        </label>

        <label class="grid gap-1 text-sm" data-atom="zones-arrangement">
            <span>arrangement</span>
            <select
                :value="atoms.zones?.arrangement ?? 'composed'"
                class="rounded border bg-card px-2 py-1"
                @change="patch((a) => { a.zones = { count: a.zones?.count ?? 2, arrangement: ($event.target as HTMLSelectElement).value as AuroraZoneArrangement }; })"
            >
                <option v-for="ar in ARRANGEMENTS" :key="ar" :value="ar">{{ ar }}</option>
            </select>
        </label>

        <!-- ── NOISE ──────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Noise</p>
        <label class="grid gap-1 text-sm" data-atom="noise">
            <span>organic boundary ({{ (atoms.noise ?? 0.5).toFixed(2) }})</span>
            <input
                :value="atoms.noise ?? 0.5"
                type="range"
                min="0"
                max="1"
                step="0.05"
                @input="patch((a) => (a.noise = Number(($event.target as HTMLInputElement).value)))"
            />
        </label>

        <!-- ── MEDIUM (+ texture only when textured) ──────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Medium</p>
        <label class="grid gap-1 text-sm" data-atom="medium">
            <span>medium</span>
            <select
                :value="mediumKind"
                class="rounded border bg-card px-2 py-1"
                @change="setMedium(($event.target as HTMLSelectElement).value as AuroraMedium)"
            >
                <option v-for="m in MEDIA" :key="m" :value="m">{{ m }}</option>
            </select>
        </label>

        <!-- texture amount is STRUCTURALLY ABSENT on smooth (no dead slider). -->
        <label v-if="isTextured" class="grid gap-1 text-sm" data-atom="texture">
            <span>texture ({{ textureAmount.toFixed(2) }})</span>
            <input
                :value="textureAmount"
                type="range"
                min="0"
                max="1"
                step="0.05"
                @input="setTexture(Number(($event.target as HTMLInputElement).value))"
            />
        </label>

        <!-- ── MOTION ─────────────────────────────────────────────────────── -->
        <p class="mt-1 text-admin-label text-muted-foreground">Motion</p>
        <label class="grid gap-1 text-sm" data-atom="motion">
            <span>motion</span>
            <select
                :value="atoms.motion"
                class="rounded border bg-card px-2 py-1"
                @change="patch((a) => (a.motion = ($event.target as HTMLSelectElement).value as AuroraMotionAtom))"
            >
                <option v-for="m in MOTIONS" :key="m" :value="m">{{ m }}</option>
            </select>
        </label>
    </div>
</template>
