<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
    Aurora,
    resolveAtoms,
    type AuroraAtoms,
    type AuroraConfig,
} from "../../../src/components/custom/aurora";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../../src/components/ui/collapsible";

/**
 * AW.W6 — the two-tier "atoms of control" demo. The ≤7 Tier-1 atoms are shown by
 * default; the full AuroraConfig surface lives under an "Advanced" Collapsible
 * disclosure (progressive disclosure — essentials shown, complexity on demand). The
 * panel binds `resolveAtoms(atoms) → AuroraConfig` so a consumer configures a stunning
 * backdrop from a handful of intuitive knobs. The full schema stays whole as the
 * escape hatch; nothing is removed. No new disclosure primitive — Collapsible is the
 * shipped surface.
 */
const atoms = reactive<AuroraAtoms>({
    seed: "#3a7bd5",
    harmony: "analogous",
    mood: "balanced",
    medium: "smooth",
    textureAmount: 0.5,
    motion: "drifting",
    zones: 2,
});

const advancedOpen = ref(false);

// The live config the atoms resolve to (the Aurora consumes it directly).
const config = computed<AuroraConfig>(() => resolveAtoms({ ...atoms }));

const HARMONIES = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
] as const;
const MOODS = ["calm", "balanced", "vivid"] as const;
const MEDIA = ["smooth", "pastel", "watercolor", "oil", "vangogh", "oil-pastel"] as const;
const MOTIONS = ["still", "breathing", "drifting"] as const;
</script>

<template>
    <div class="grid h-full grid-cols-[1fr_22rem] gap-3">
        <div class="relative overflow-hidden rounded-panel">
            <Aurora :config="config" />
        </div>

        <div class="glass-resting flex flex-col gap-3 rounded-panel p-4">
            <p class="text-mono-caption uppercase tracking-widest text-foreground/50">
                atoms of control
            </p>

            <!-- Tier-1: the ≤7 intuitive atoms shown by default. -->
            <label class="grid gap-1 text-sm">
                <span>seed</span>
                <input v-model="atoms.seed" type="color" class="h-8 w-full rounded" />
            </label>

            <label class="grid gap-1 text-sm">
                <span>harmony</span>
                <select v-model="atoms.harmony" class="rounded border bg-card px-2 py-1">
                    <option v-for="h in HARMONIES" :key="h" :value="h">{{ h }}</option>
                </select>
            </label>

            <label class="grid gap-1 text-sm">
                <span>mood / energy</span>
                <select v-model="atoms.mood" class="rounded border bg-card px-2 py-1">
                    <option v-for="m in MOODS" :key="m" :value="m">{{ m }}</option>
                </select>
            </label>

            <label class="grid gap-1 text-sm">
                <span>medium</span>
                <select v-model="atoms.medium" class="rounded border bg-card px-2 py-1">
                    <option v-for="m in MEDIA" :key="m" :value="m">{{ m }}</option>
                </select>
            </label>

            <label class="grid gap-1 text-sm">
                <span>texture amount</span>
                <input
                    v-model.number="atoms.textureAmount"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                />
            </label>

            <label class="grid gap-1 text-sm">
                <span>motion</span>
                <select v-model="atoms.motion" class="rounded border bg-card px-2 py-1">
                    <option v-for="m in MOTIONS" :key="m" :value="m">{{ m }}</option>
                </select>
            </label>

            <label class="grid gap-1 text-sm">
                <span>zones ({{ atoms.zones }})</span>
                <input v-model.number="atoms.zones" type="range" min="2" max="6" step="1" />
            </label>

            <!-- Tier-2: the full AuroraConfig surface under an Advanced disclosure. -->
            <Collapsible v-model:open="advancedOpen" class="mt-2">
                <CollapsibleTrigger
                    class="w-full rounded border px-3 py-2 text-left text-sm font-medium"
                >
                    {{ advancedOpen ? "▾" : "▸" }} Advanced (full schema)
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <pre
                        class="mt-2 max-h-72 overflow-auto rounded bg-card p-2 text-mono-caption"
                        >{{ config }}</pre
                    >
                </CollapsibleContent>
            </Collapsible>
        </div>
    </div>
</template>
