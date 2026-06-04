<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { Minus, Plus, Sparkles } from "@lucide/vue";
import { Button } from "../../../../src/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../../../src/components/ui/toggle-group";
import { SortableList, SortableItem } from "../../../../src/components/custom/sortable-list";
import type { AuroraConfig, AuroraHarmony } from "../../../../src/components/custom/aurora";
import { MAX_STOPS, deriveAurora, oklchStopToHex } from "../../../../src/components/custom/aurora";
import OklchStopRow from "../OklchStopRow.vue";
import { usePaletteStops } from "./usePaletteStops";

const props = defineProps<{
    config: AuroraConfig;
}>();

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

// ── Derive-from-color surface ──
// Seed one color → a harmonious N-stop aurora palette. The seed picker round-
// trips through OKLCh (same idiom as OklchStopRow); the seed defaults to the
// current first stop so "Derive" reads as a refinement of the live palette.
const HARMONIES: { value: AuroraHarmony; label: string }[] = [
    { value: "analogous", label: "Analogous" },
    { value: "complementary", label: "Complement" },
    { value: "triad", label: "Triad" },
    { value: "monochrome", label: "Mono" },
];

const seedHex = ref(oklchStopToHex(props.config.palette[0]!));
const harmony = ref<AuroraHarmony>("analogous");
const stopCount = ref(Math.min(Math.max(props.config.palette.length, 2), MAX_STOPS));

const canStepDown = computed(() => stopCount.value > 2);
const canStepUp = computed(() => stopCount.value < MAX_STOPS);

function stepCount(delta: number) {
    stopCount.value = Math.min(Math.max(stopCount.value + delta, 2), MAX_STOPS);
}

function onSeed(e: Event) {
    seedHex.value = (e.target as HTMLInputElement).value;
}

function derive() {
    // Assigning the whole palette array flows through useAurora's reactive
    // watch — no extra plumbing; the canvas re-uploads on the next frame.
    config.value.palette = deriveAurora(seedHex.value, {
        stopCount: stopCount.value,
        harmony: harmony.value,
    });
}
</script>

<template>
    <div class="flex min-w-[320px] flex-col gap-3 p-3">
        <!--
          Derive-from-color producer. Pick one seed, a harmony, and a stop
          count, then let deriveAurora synthesize a gamut-mapped ramp into
          config.palette — the manual stop editor below stays the per-stop
          refinement surface.
        -->
        <div class="flex flex-col gap-2 rounded-panel border border-border/40 bg-card/40 p-2.5">
            <div class="flex items-center gap-2">
                <Sparkles :size="13" class="text-muted-foreground" />
                <p class="text-admin-label text-muted-foreground">Derive from color</p>
            </div>
            <div class="flex items-center gap-2">
                <input
                    type="color"
                    :value="seedHex"
                    class="h-8 w-9 cursor-pointer appearance-none rounded border border-border/40 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
                    aria-label="Seed color"
                    @input="onSeed"
                />
                <ToggleGroup
                    v-model="harmony"
                    type="single"
                    variant="outline"
                    class="flex-1"
                >
                    <ToggleGroupItem
                        v-for="h in HARMONIES"
                        :key="h.value"
                        :value="h.value"
                        :aria-label="h.label"
                        class="h-8 flex-1 px-1.5 text-mono-caption"
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
                            size="icon"
                            class="h-6 w-6"
                            :disabled="!canStepDown"
                            aria-label="Fewer stops"
                            @click="stepCount(-1)"
                        >
                            <Minus :size="12" />
                        </Button>
                        <span
                            class="text-mono-caption w-4 text-center tabular-nums text-foreground"
                        >
                            {{ stopCount }}
                        </span>
                        <Button
                            variant="glass"
                            size="icon"
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
            class="flex flex-col gap-2"
            @reorder="onPaletteReorder"
        >
            <SortableItem
                v-for="(item, i) in stopsWithIds"
                :key="item.sid"
                :id="item.sid"
                as="div"
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
