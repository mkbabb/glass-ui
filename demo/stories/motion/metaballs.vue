<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, ref } from "vue";
import {
    DEFAULT_METABALL_CONFIG,
    MetaballCanvas,
    isWebGLSupported,
    type MetaballConfig,
} from "../../../src/components/custom/metaballs";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../../src/components/custom/configurator";
import { Slider } from "../../../src/components/ui/slider";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "../../../src/components/ui/number-field";
import { Button } from "../../../src/components/ui/button";
import { BouncyToggle } from "../../../src/components/custom/tabs";
import { RotateCcw } from "@lucide/vue";

/**
 * Metaballs configurator story — full <Configurator> consumption.
 *
 * R2 §C named a 7-axis blob split: falloff, count, radius, color/hue/luminance,
 * isoLevel, motionMode, noise. The metaballs API has no separate noise channel
 * (the deterministic phi/sqrt2/sqrt3 oscillation IS the motion source); noise
 * folds into Motion. The 7th axis surfaces as Output (background alpha) so all
 * tunable knobs are reachable. Mapping table lives in the W4-C proof doc.
 *
 *   R2 axis              metaballs prop          Configurator layer
 *   ────────────────     ─────────────────       ──────────────────
 *   falloff           →  edgeSoftness         →  Falloff
 *   count             →  blobCount            →  Count
 *   radius            →  baseRadius           →  Radius
 *   color/hue/lum     →  colors[]             →  Color
 *   isoLevel          →  threshold            →  IsoLevel
 *   motionMode+noise  →  speed, orbitAmplitude →  Motion
 *   (axis 7 added)    →  bgAlpha              →  Output
 */

// ─── Presets ──────────────────────────────────────────────────────────────

const SUNSET: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 10,
    speed: 0.1,
    threshold: 0.92,
    baseRadius: 0.15,
    orbitAmplitude: 0.24,
    colors: ["#E31937", "#FF8A3D", "#FFD166", "#4ECDC4", "#5C7AEA"],
    bgAlpha: 0.04,
    edgeSoftness: 0.38,
};

const COOL: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 7,
    speed: 0.16,
    threshold: 0.86,
    baseRadius: 0.17,
    orbitAmplitude: 0.28,
    colors: ["#2DD4BF", "#38BDF8", "#A78BFA", "#F472B6"],
    bgAlpha: 0.12,
    edgeSoftness: 0.42,
};

const MONO: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 12,
    speed: 0.06,
    threshold: 1.05,
    baseRadius: 0.10,
    orbitAmplitude: 0.32,
    colors: ["#0F172A", "#1E293B", "#334155", "#475569"],
    bgAlpha: 0.08,
    edgeSoftness: 0.22,
};

const PRESETS: ConfiguratorPreset<Required<MetaballConfig>>[] = [
    { key: "sunset", label: "Sunset", sub: "warm · 10 blobs",   config: SUNSET },
    { key: "cool",   label: "Cool",   sub: "pastel · 7 blobs",  config: COOL },
    { key: "mono",   label: "Mono",   sub: "slate · 12 blobs",  config: MONO },
];

const studio = useConfiguratorState<Required<MetaballConfig>>({
    presets: PRESETS,
    initialPreset: "sunset",
});

// `studio.config` is reactive — bind it directly to <MetaballCanvas>.
const cfg = studio.config;

// Template-friendly computed unwrappers (vue-tsc tracks ComputedRef at the
// binding boundary; the template-side auto-unwrap is runtime-only).
const activePresetKey = computed(() => studio.activePreset.value ?? "");
const isDirtyConfig = computed(() => studio.isDirty.value);

// ─── Color stops (free-text editing per stop) ─────────────────────────────
//
// K.W7 Step 0 Part B — `colorDraft` was a redundant reactive mirror of
// `cfg.colors`, kept in sync via a `watch(() => cfg.colors)` block that
// rebuilt the draft on preset switches, and `commitColor` wrote to BOTH
// `cfg.colors[index]` and `colorDraft[index].value`. Combined with
// `applyPreset` reassigning every key on the reactive proxy on preset
// switch, this produced a write-write loop that Vue's scheduler flagged
// as "Maximum recursive updates exceeded" (Lighthouse 2026-05-08 P0-1).
//
// Fix (Strategy 1, KISS): drop `colorDraft` entirely and bind the UI
// directly to `cfg.colors[index]` — `cfg` is already a reactive proxy.

function commitColor(index: number, value: string) {
    if (index < 0 || index >= cfg.colors.length) return;
    cfg.colors[index] = value;
}

function addColor() {
    cfg.colors.push("#cccccc");
}

function removeColor(index: number) {
    if (cfg.colors.length <= 1) return;
    cfg.colors.splice(index, 1);
}

// ─── Slider helpers (Reka sliders model number[]) ─────────────────────────

function sliderModel(value: number): number[] {
    return [value];
}

function commitSlider(field: keyof Required<MetaballConfig>, value: number[] | number) {
    const v = Array.isArray(value) ? value[0] : value;
    if (typeof v !== "number") return;
    (cfg as unknown as Record<string, unknown>)[field as string] = v;
}

// ─── Motion preset toggle (still / drift / orbit) ─────────────────────────

const motionMode = computed<string>(() => {
    if (cfg.speed < 0.04) return "still";
    if (cfg.speed < 0.12) return "drift";
    return "orbit";
});

const motionOptions = [
    { label: "Still", value: "still" },
    { label: "Drift", value: "drift" },
    { label: "Orbit", value: "orbit" },
];

function setMotionMode(value: string | string[]) {
    const v = Array.isArray(value) ? value[0] : value;
    switch (v) {
        case "still":
            cfg.speed = 0.02;
            cfg.orbitAmplitude = 0.12;
            break;
        case "drift":
            cfg.speed = 0.08;
            cfg.orbitAmplitude = 0.24;
            break;
        case "orbit":
            cfg.speed = 0.18;
            cfg.orbitAmplitude = 0.34;
            break;
    }
}

// ─── Stage support readout ────────────────────────────────────────────────

const canvasRef = ref<InstanceType<typeof MetaballCanvas> | null>(null);

// M.W2 close removed `isSupported` from `MetaballCanvas`'s defineExpose
// (the synchronous probe is the canonical surface — see
// `docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md`). Use the imported
// helper directly.
const isSupported = computed(() => isWebGLSupported());
const isReducedMotion = computed(
    () => canvasRef.value?.isReducedMotion ?? false,
);
const isReducedTransparency = computed(
    () => canvasRef.value?.isReducedTransparency ?? false,
);
</script>

<template>
    <StoryPage content-class="gap-8">
        <Configurator
            :presets="PRESETS"
            :active-preset="activePresetKey"
            scroll-mode="auto"
            class="min-h-[36rem]"
            @select-preset="studio.selectPreset"
            @reset="studio.resetCurrent"
        >
            <!-- ── Stage ─────────────────────────────────────────── -->
            <template #stage>
                <div
                    data-testid="metaballs-stage"
                    class="relative h-full min-h-[28rem] w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--viz-fourier)_30%,transparent),transparent_34%),radial-gradient(circle_at_85%_25%,color-mix(in_srgb,var(--viz-topology)_28%,transparent),transparent_30%),linear-gradient(135deg,var(--background),color-mix(in_srgb,var(--card)_78%,var(--background)))]"
                >
                    <MetaballCanvas
                        v-if="isSupported"
                        ref="canvasRef"
                        :config="cfg"
                    >
                        <template #fallback>
                            <div
                                data-testid="metaballs-fallback"
                                class="absolute inset-x-5 top-5 rounded-panel border border-border/70 bg-card/90 p-4 shadow-cartoon"
                            >
                                <p class="text-small font-medium text-foreground">
                                    MetaballCanvas fallback
                                </p>
                                <p class="text-small text-muted-foreground">
                                    WebGL is unavailable; the canvas rendered its
                                    fallback slot.
                                </p>
                            </div>
                        </template>
                    </MetaballCanvas>

                    <div
                        class="pointer-events-none absolute bottom-3 left-3 flex flex-col gap-1 text-mono-caption uppercase tracking-widest text-foreground/60"
                    >
                        <span>{{ activePresetKey }} · {{ motionMode }}</span>
                        <span v-if="isReducedMotion" class="text-warning">
                            reduced-motion · single frame
                        </span>
                        <span v-if="isReducedTransparency" class="text-warning">
                            reduced-transparency · solid bg
                        </span>
                    </div>
                </div>
            </template>

            <!-- ── Footer (reset) ───────────────────────────────── -->
            <template #footer="{ reset }">
                <div class="flex items-center justify-between gap-2">
                    <span class="text-mono-caption text-muted-foreground">
                        {{ isDirtyConfig ? "modified" : "preset" }}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        :disabled="!isDirtyConfig"
                        @click="reset"
                    >
                        <RotateCcw class="mr-1 h-3 w-3" />
                        Reset
                    </Button>
                </div>
            </template>

            <!-- ── Controls (7 axis layers) ─────────────────────── -->
            <ConfiguratorLayer label="Falloff" sub="edgeSoftness">
                <ConfiguratorRow
                    label="Edge softness"
                    name="edgeSoftness"
                    description="Smoothstep range at the threshold boundary; lower = sharper edges."
                >
                    <Slider
                        :model-value="sliderModel(cfg.edgeSoftness)"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        aria-label="Edge softness"
                        @update:model-value="commitSlider('edgeSoftness', $event ?? [])"
                    />
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Count" sub="blobCount">
                <ConfiguratorRow
                    label="Blob count"
                    name="blobCount"
                    description="Number of metaballs (capped at 16 by the shader uniform array)."
                >
                    <NumberField
                        v-model="cfg.blobCount"
                        :min="1"
                        :max="16"
                        :step="1"
                    >
                        <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Radius" sub="baseRadius">
                <ConfiguratorRow
                    label="Base radius"
                    name="baseRadius"
                    description="Base size as a fraction of viewport (0.05 = 5% of width)."
                >
                    <Slider
                        :model-value="sliderModel(cfg.baseRadius)"
                        :min="0.04"
                        :max="0.3"
                        :step="0.005"
                        aria-label="Base radius"
                        @update:model-value="commitSlider('baseRadius', $event ?? [])"
                    />
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Color" sub="colors[]">
                <ConfiguratorRow
                    label="Color stops"
                    name="colors[]"
                    description="CSS color strings cycle across the blob count."
                >
                    <div class="flex w-full flex-col gap-2">
                        <div
                            v-for="(color, index) in cfg.colors"
                            :key="index"
                            class="flex items-center gap-2"
                        >
                            <input
                                type="color"
                                :value="color"
                                class="focus-ring h-7 w-9 cursor-pointer rounded border border-border/40 bg-transparent"
                                :aria-label="`Color stop ${index + 1}`"
                                @input="commitColor(index, ($event.target as HTMLInputElement).value)"
                            />
                            <span class="text-mono-caption text-muted-foreground/80">
                                {{ color }}
                            </span>
                            <button
                                type="button"
                                class="focus-ring ml-auto rounded px-1 text-mono-caption text-muted-foreground/60 hover:text-destructive"
                                :disabled="cfg.colors.length <= 1"
                                :aria-label="`Remove color stop ${index + 1}`"
                                @click="removeColor(index)"
                            >
                                remove
                            </button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            class="self-start"
                            :disabled="cfg.colors.length >= 8"
                            @click="addColor"
                        >
                            + Add color
                        </Button>
                    </div>
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="IsoLevel" sub="threshold">
                <ConfiguratorRow
                    label="Threshold"
                    name="threshold"
                    description="Density threshold for surface rendering; higher = sharper iso."
                >
                    <Slider
                        :model-value="sliderModel(cfg.threshold)"
                        :min="0.5"
                        :max="2"
                        :step="0.01"
                        aria-label="Threshold"
                        @update:model-value="commitSlider('threshold', $event ?? [])"
                    />
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Motion" sub="speed · orbitAmplitude">
                <ConfiguratorRow
                    label="Mode"
                    name="motionMode"
                    description="Composite preset over speed + orbitAmplitude."
                >
                    <BouncyToggle
                        :options="motionOptions"
                        :model-value="motionMode"
                        class="w-full"
                        @update:model-value="setMotionMode"
                    />
                </ConfiguratorRow>
                <ConfiguratorRow
                    label="Speed"
                    name="speed"
                    description="Animation speed multiplier."
                >
                    <Slider
                        :model-value="sliderModel(cfg.speed)"
                        :min="0"
                        :max="0.4"
                        :step="0.005"
                        aria-label="Speed"
                        @update:model-value="commitSlider('speed', $event ?? [])"
                    />
                </ConfiguratorRow>
                <ConfiguratorRow
                    label="Orbit amplitude"
                    name="orbitAmplitude"
                    description="Drift radius as fraction of viewport."
                >
                    <Slider
                        :model-value="sliderModel(cfg.orbitAmplitude)"
                        :min="0"
                        :max="0.5"
                        :step="0.01"
                        aria-label="Orbit amplitude"
                        @update:model-value="commitSlider('orbitAmplitude', $event ?? [])"
                    />
                </ConfiguratorRow>
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Output" sub="bgAlpha">
                <ConfiguratorRow
                    label="Background alpha"
                    name="bgAlpha"
                    description="0 = fully transparent canvas. Honored unless prefers-reduced-transparency lifts to 1.0."
                >
                    <Slider
                        :model-value="sliderModel(cfg.bgAlpha)"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        aria-label="Background alpha"
                        @update:model-value="commitSlider('bgAlpha', $event ?? [])"
                    />
                </ConfiguratorRow>
            </ConfiguratorLayer>
        </Configurator>
    </StoryPage>
</template>
