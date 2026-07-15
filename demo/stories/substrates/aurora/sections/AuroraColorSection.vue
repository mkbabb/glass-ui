<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { Plus, Sparkles } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import {
    LabeledField,
    LabeledSelect,
    LabeledSlider,
} from "@glass/components/labeled-field";
import { SortableList, SortableItem } from "@glass/components/sortable-list";
import { ColorSwatch } from "@glass/components/color-swatch";
import type {
    AuroraAtoms,
    AuroraConfig,
    AuroraHarmony,
} from "@glass/components/aurora";
import {
    MAX_STOPS,
    deriveAurora,
    oklchStopToHex,
} from "@glass/components/aurora";
import OklchStopRow from "../OklchStopRow.vue";
import { usePaletteStops } from "../config/usePaletteStops";

/**
 * The Color section — the seed/harmony/energy ATOMS (the few intuitive knobs,
 * driving the canvas via resolveAtoms over the preset baseline) PLUS the
 * per-stop OKLCh palette editor (the deep refine surface: derive-from-color +
 * sortable per-stop L/C/h rows). The atom controls carry the `data-atom`
 * anchors the studio gates route on (`seed`, `harmony`, `colorEnergy`).
 */
const props = defineProps<{
    atoms: AuroraAtoms;
    config: AuroraConfig;
}>();

// ── Atom controls (seed / harmony / energy) ──
const HARMONIES_ATOM: Record<string, AuroraHarmony> = {
    Analogous: "analogous",
    Complementary: "complementary",
    "Split complementary": "split-complementary",
    Triad: "triad",
    Tetradic: "tetradic",
    Monochrome: "monochrome",
};
const harmonyItems = Object.keys(HARMONIES_ATOM);

function labelFor<T extends string>(map: Record<string, T>, value: T): string {
    return Object.keys(map).find((k) => map[k] === value) ?? Object.keys(map)[0]!;
}
const harmonyLabel = computed(() =>
    labelFor(HARMONIES_ATOM, props.atoms.harmony ?? "analogous"),
);
const seedHexAtom = computed(() =>
    typeof props.atoms.seed === "string" ? props.atoms.seed : "#3a7bd5",
);

// reka's CONTROLLED `:open` prop must round-trip via `v-model:is-open` (a
// literal `:is-open="false"` keeps the select controlled-shut forever).
const harmonyOpen = ref(false);

function setHarmony(label: string) {
    props.atoms.harmony = HARMONIES_ATOM[label]!;
}
function setColorEnergy(v: number) {
    props.atoms.colorEnergy = v;
}
function setSeed(value: string) {
    props.atoms.seed = value;
}

// ── Deep palette editor (derive + per-stop OKLCh rows) ──
const config = toRef(props, "config");
const {
    canAddStop,
    stopsWithIds,
    stopRefId,
    updateStop,
    removeStop,
    addStop,
    onPaletteReorder,
} = usePaletteStops(config);

const DERIVE_HARMONIES: { value: AuroraHarmony; label: string }[] = [
    { value: "analogous", label: "Analogous" },
    { value: "complementary", label: "Complement" },
    { value: "triad", label: "Triad" },
    { value: "monochrome", label: "Mono" },
];
const deriveSeedHex = ref(
    props.config.palette[0] ? oklchStopToHex(props.config.palette[0]) : "#6b8fd4",
);
const deriveHarmony = ref<AuroraHarmony>("analogous");
const stopCount = ref(Math.min(Math.max(props.config.palette.length, 2), MAX_STOPS));
const canStepDown = computed(() => stopCount.value > 2);
const canStepUp = computed(() => stopCount.value < MAX_STOPS);

function stepCount(delta: number) {
    stopCount.value = Math.min(Math.max(stopCount.value + delta, 2), MAX_STOPS);
}
function onDeriveSeed(value: string) {
    deriveSeedHex.value = value;
}
function onDeriveHarmony(next: string) {
    deriveHarmony.value = (next as AuroraHarmony) || "analogous";
}
function derive() {
    config.value.palette = deriveAurora(deriveSeedHex.value, {
        stopCount: stopCount.value,
        harmony: deriveHarmony.value || "analogous",
    });
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <!-- ── Atom controls ── -->
        <!-- BA.W-CONFIG-CHASSIS.2 (CFG-3) — the Seed is the library <ColorSwatch>
             register (a proportioned chip + hex affordance), OFF the raw full-width
             `<input type=color>` slab that carried one swatch's information at the
             visual weight of a full slider. -->
        <LabeledField
            label="Seed"
            tooltip="Base color the harmony derives from"
            data-atom="seed"
        >
            <ColorSwatch
                :model-value="seedHexAtom"
                show-hex
                aria-label="Seed color"
                @update:model-value="setSeed"
            />
        </LabeledField>

        <LabeledSelect
            label="Harmony"
            tooltip="Color relationship the palette is built from"
            :items="harmonyItems"
            :is-open="harmonyOpen"
            :model-value="harmonyLabel"
            data-atom="harmony"
            @update:model-value="setHarmony"
            @update:open="(v: boolean) => (harmonyOpen = v)"
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

        <!-- ── Deep palette editor ── -->
        <div class="mt-1 flex flex-col gap-2 rounded-panel border border-border/40 bg-card/40 p-2.5">
            <div class="flex items-center gap-2">
                <Sparkles :size="13" class="text-muted-foreground" />
                <p class="text-admin-label text-muted-foreground">Derive from color</p>
            </div>
            <!-- BA.W-CONFIG-CHASSIS.2 — the DERIVE seed is the <ColorSwatch> register
                 (off the raw `h-8 w-9` color slab); the 4-harmony chip group WRAPS to a
                 second line (CFG-2 overflow contract) so MONO is never sliced off the
                 ~360px aside — the items can't shrink below their uppercase min-content,
                 so `flex-wrap` (the natural fit for the 4-chip row) replaces the
                 hard-clipped single-line `flex-1` group that overflowed the aside. -->
            <div class="flex items-center gap-2">
                <ColorSwatch
                    :model-value="deriveSeedHex"
                    aria-label="Derive seed color"
                    @update:model-value="onDeriveSeed"
                />
                <ToggleGroup
                    :model-value="deriveHarmony"
                    type="single"
                    variant="outline"
                    class="flex flex-1 flex-wrap gap-1"
                    aria-label="Derived palette harmony"
                    @update:model-value="(v) => onDeriveHarmony(v as string)"
                >
                    <ToggleGroupItem
                        v-for="h in DERIVE_HARMONIES"
                        :key="h.value"
                        :value="h.value"
                        :aria-label="h.label"
                        class="h-8 flex-1 basis-[calc(50%-0.25rem)] px-1.5 text-mono-caption"
                    >
                        {{ h.label }}
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <span class="text-mono-caption text-muted-foreground">Stops</span>
                    <div class="flex items-center gap-1.5">
                        <Button
                            variant="glass"
                            iconOnly
                            class="h-6 w-6"
                            :disabled="!canStepDown"
                            aria-label="Fewer stops"
                            @click="stepCount(-1)"
                        >
                            <span class="text-sm leading-none">−</span>
                        </Button>
                        <span
                            class="text-mono-caption w-4 text-center tabular-nums text-foreground"
                        >
                            {{ stopCount }}
                        </span>
                        <Button
                            variant="glass"
                            iconOnly
                            class="h-6 w-6"
                            :disabled="!canStepUp"
                            aria-label="More stops"
                            @click="stepCount(1)"
                        >
                            <Plus :size="12" />
                        </Button>
                    </div>
                </div>
                <Button
                    variant="primary-audacious"
                    size="sm"
                    class="h-7 gap-1.5 px-3 text-caption"
                    @click="derive"
                >
                    <Sparkles :size="12" />
                    Derive
                </Button>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <p class="text-admin-label text-muted-foreground">
                Stops ({{ config.palette.length }}/{{ MAX_STOPS }})
            </p>
            <Button
                variant="glass"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :disabled="!canAddStop"
                @click="addStop"
            >
                <Plus :size="12" />
                Stop
            </Button>
        </div>
        <SortableList
            :items="stopsWithIds"
            :get-id="stopRefId"
            :get-label="(item) => `Palette stop ${item.sid}`"
            label="Palette stops"
            class="flex flex-col gap-2"
            @reorder="onPaletteReorder"
        >
            <SortableItem
                v-for="(item, i) in stopsWithIds"
                :key="item.sid"
                :id="item.sid"
            >
                <OklchStopRow
                    :stop="item.stop"
                    :index="i"
                    :removable="config.palette.length > 2"
                    @update="(next) => updateStop(i, next)"
                    @remove="removeStop(i)"
                />
            </SortableItem>
        </SortableList>
    </div>
</template>
