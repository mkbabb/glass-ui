<script setup lang="ts">
// LiquidGrid — the WebGPU-first liquid AA-grid studio. Evenly-spaced LARGER lines on a
// slowly breathing curl-flow sheet: a Ben Golus derivative-AA two-tier grid (the crisp-line
// fix) on a Bridson divergence-free curl-warped UV (the "liquid"). The default is the warm-
// cream library identity over transparent (the page reads through the cells); teal-on-navy is
// gone (§E). The configurator sits on the RIGHT (the §E controls-right mandate); the title
// carries the explicit /liquid-grid subpath.
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
} from "@glass/components/custom/configurator";
import {
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/custom/labeled-field";
import { DockBackgroundToggle } from "@glass/components/custom/dock";
import {
    LiquidGrid,
    type LiquidGridConfig,
} from "@glass/components/custom/liquid-grid";
import {
    LIQUID_GRID_PRESET_WARM,
    LIQUID_GRID_PRESET_SUFFUSE,
    LIQUID_GRID_PRESET_BOLD,
} from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a preset switch is a clean reset, the library default). The DEFAULT is warm-cream identity.
const config = reactive<LiquidGridConfig>(
    JSON.parse(JSON.stringify(LIQUID_GRID_PRESET_WARM)),
);

const paused = ref(false);

// ── geometry refs (bound directly via v-model into config) ──────────────────────
const cellSize = computed({
    get: () => config.cellSize,
    set: (v) => (config.cellSize = Math.round(v)),
});
const majorEvery = computed({
    get: () => config.majorEvery,
    set: (v) => (config.majorEvery = Math.round(v)),
});
const minorAlpha = computed({
    get: () => config.minorAlpha,
    set: (v) => (config.minorAlpha = v),
});
const majorAlpha = computed({
    get: () => config.majorAlpha,
    set: (v) => (config.majorAlpha = v),
});
const lineWidth = computed({
    get: () => config.lineWidth,
    set: (v) => (config.lineWidth = v),
});

// ── liquid (affine sheet-warp) refs ──────────────────────────────────────────────────────
const twistMax = computed({
    get: () => config.twistMax,
    set: (v) => (config.twistMax = v),
});
const waveK = computed({
    get: () => config.waveK,
    set: (v) => (config.waveK = v),
});
const waveOmega = computed({
    get: () => config.waveOmega,
    set: (v) => (config.waveOmega = v),
});
const fieldAlpha = computed({
    get: () => config.fieldAlpha,
    set: (v) => (config.fieldAlpha = v),
});

// ── pointer-bulge refs ──────────────────────────────────────────────────────────
const bulgeStrength = computed({
    get: () => config.bulgeStrength,
    set: (v) => (config.bulgeStrength = v),
});
const bulgeRadius = computed({
    get: () => config.bulgeRadius,
    set: (v) => (config.bulgeRadius = v),
});
const bulgeRepel = computed({
    get: () => config.bulgeMode === "repel",
    set: (v) => (config.bulgeMode = v ? "repel" : "attract"),
});
const interactive = computed({
    get: () => config.interactive,
    set: (v) => (config.interactive = v),
});

// ── the named preset switch (warm-cream identity DEFAULT; suffusion / bold non-default) ──
type PresetKey = "warm" | "suffuse" | "bold";
const presetKey = ref<PresetKey>("warm");
function applyPreset(key: PresetKey): void {
    presetKey.value = key;
    const src =
        key === "suffuse"
            ? LIQUID_GRID_PRESET_SUFFUSE
            : key === "bold"
              ? LIQUID_GRID_PRESET_BOLD
              : LIQUID_GRID_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
}
const suffuseOn = computed({
    get: () => presetKey.value === "suffuse",
    set: (v) => applyPreset(v ? "suffuse" : "warm"),
});
const boldOn = computed({
    get: () => presetKey.value === "bold",
    set: (v) => applyPreset(v ? "bold" : "warm"),
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="LiquidGrid"
            label="liquid AA-grid · evenly-spaced LARGER cells on a sheet that bows + shears as a wave passes over and through"
            blurb="An engineering-graph-liquid grid — evenly-spaced, LARGE cells, a crisp fine rule with a bolder major rule every 5 cells — drawn on a sheet that breathes like liquid under a lens. As a traveling Gaussian crest sweeps along a gentle diagonal, the whole SHEET bows and shears: a smooth low-order curl-flow field (Bridson divergence-free) warps the grid coordinate BEFORE evaluation, locally affine at the cell scale, so MAJOR gridlines bend as ONE coherent continuous curve and cells deform as near-parallelogram patches (never a per-pixel jitter, never a per-cell kink). The lines stay exactly one device-pixel crisp at any DPR (the Ben Golus derivative-AA distance reads the FINAL warped coordinate — the blurry-mess fix). It reads the SAME waveFlow warp as Concentric (one shared field). WebGPU-FIRST: a pure fullscreen fragment pass over the proven substrate, with a clean WebGL2 GLSL fallback (the SAME field — no Canvas2D path). Drag the cursor (interactive on) and a local swirl twists the cells around the pointer like a finger pressed into the liquid. The default is the warm-cream identity over transparent — the page reads through the cells."
        >
            <p class="text-muted-foreground mb-4 text-small">
                <code class="font-mono text-xs">@mkbabb/glass-ui/liquid-grid</code>
            </p>

            <Configurator class="h-[min(78vh,720px)] shadow-cartoon" scroll-mode="auto">
                <template #stage>
                    <div class="relative h-full w-full overflow-hidden rounded-card">
                        <LiquidGrid
                            :config="config"
                            v-model:paused="paused"
                            class="absolute inset-0"
                        />
                        <!-- Pause/play for the continuously-running field. -->
                        <div class="absolute right-3 top-3">
                            <DockBackgroundToggle v-model:paused="paused" />
                        </div>
                    </div>
                </template>

                <template #controls>
                    <div class="flex flex-col gap-2">
                        <ConfiguratorLayer label="Grid" dividers>
                            <ConfiguratorRow label="Cell size" name="cellSize">
                                <LabeledSlider
                                    v-model="cellSize"
                                    label="Cell size"
                                    tooltip="the minor cell pitch (px) — LARGER = bigger cells"
                                    :min="24"
                                    :max="128"
                                    :step="1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Major every" name="majorEvery">
                                <LabeledSlider
                                    v-model="majorEvery"
                                    label="Major every"
                                    tooltip="minor cells per bolder major rule (kf 5rem/1rem)"
                                    :min="2"
                                    :max="10"
                                    :step="1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Minor weight" name="minorAlpha">
                                <LabeledSlider
                                    v-model="minorAlpha"
                                    label="Minor weight"
                                    tooltip="the calm hairline alpha (≈ kf 3%)"
                                    :min="0"
                                    :max="0.3"
                                    :step="0.005"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Major weight" name="majorAlpha">
                                <LabeledSlider
                                    v-model="majorAlpha"
                                    label="Major weight"
                                    tooltip="the bolder rule alpha (kf 11%, above the 10% floor)"
                                    :min="0"
                                    :max="0.3"
                                    :step="0.005"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Line width" name="lineWidth">
                                <LabeledSlider
                                    v-model="lineWidth"
                                    label="Line width"
                                    tooltip="one crisp device-pixel via Golus AA (px)"
                                    :min="0.5"
                                    :max="2"
                                    :step="0.1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Liquid (the affine sheet wave)" dividers>
                            <ConfiguratorRow label="Warp depth" name="twistMax">
                                <LabeledSlider
                                    v-model="twistMax"
                                    label="Warp depth"
                                    tooltip="how far the sheet bows/shears at the wave crest (grid units; major lines bow as ONE smooth curve, cells stay near-parallelogram)"
                                    :min="0"
                                    :max="0.9"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Wave frequency" name="waveK">
                                <LabeledSlider
                                    v-model="waveK"
                                    label="Wave frequency"
                                    tooltip="the crest-band spatial frequency — how many cells between crests as the wave passes OVER and THROUGH"
                                    :min="0.1"
                                    :max="1.5"
                                    :step="0.05"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Wave speed" name="waveOmega">
                                <LabeledSlider
                                    v-model="waveOmega"
                                    label="Wave speed"
                                    tooltip="the traveling-front speed (slow — inertia)"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Field alpha" name="fieldAlpha">
                                <LabeledSlider
                                    v-model="fieldAlpha"
                                    label="Field alpha"
                                    tooltip="the GLOBAL subtlety knob (suffusion → tiny)"
                                    :min="0"
                                    :max="1"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Pointer bulge" dividers>
                            <ConfiguratorRow label="Interactive" name="interactive">
                                <LabeledSwitch
                                    :checked="interactive"
                                    @update:checked="(v: boolean) => (interactive = v)"
                                    label="Interactive"
                                    tooltip="the cursor pushes a bulge through the grid; a flick fires a ripple"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bulge strength" name="bulgeStrength">
                                <LabeledSlider
                                    v-model="bulgeStrength"
                                    label="Bulge strength"
                                    tooltip="how far the cursor pushes the grid"
                                    :min="0"
                                    :max="0.5"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bulge radius" name="bulgeRadius">
                                <LabeledSlider
                                    v-model="bulgeRadius"
                                    label="Bulge radius"
                                    tooltip="the Gaussian falloff radius (cells)"
                                    :min="1"
                                    :max="8"
                                    :step="0.5"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Repel (vs attract)" name="bulgeMode">
                                <LabeledSwitch
                                    :checked="bulgeRepel"
                                    @update:checked="(v: boolean) => (bulgeRepel = v)"
                                    label="Repel (vs attract)"
                                    tooltip="push the grid away (repel) or toward (attract) the cursor"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Presets" dividers>
                            <ConfiguratorRow label="Suffusion" name="preset.suffuse">
                                <LabeledSwitch
                                    :checked="suffuseOn"
                                    @update:checked="(v: boolean) => (suffuseOn = v)"
                                    label="Suffusion"
                                    tooltip="the site-wide subtle background register (fieldAlpha ≈ 0.12, large pitch, slow warp, non-interactive)"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bold liquid" name="preset.bold">
                                <LabeledSwitch
                                    :checked="boldOn"
                                    @update:checked="(v: boolean) => (boldOn = v)"
                                    label="Bold liquid"
                                    tooltip="a bolder bow — the deliberate 'felt MORE' calibration counter (still coherent)"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </div>
                </template>
            </Configurator>

            <p class="text-muted-foreground mt-4 text-small">
                The grid is computed at an AFFINE-WARPED coordinate
                <code class="font-mono text-xs">g = waveFlow(uv·scale, t) + cursorSwirl(g)</code>
                — a smooth low-order curl-flow field bends the whole SHEET as a traveling
                Gaussian wave-crest passes OVER and THROUGH it, so MAJOR gridlines bow and shear
                as ONE coherent curve (cells stay near-parallelogram, never a per-pixel wobble),
                and each line is extracted as a constant-pixel-width stroke via the Ben Golus
                screen-space derivative AA. Under
                <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the warp freezes mid-breath and the grid holds crisp. The suffusion preset
                rides the same field at a near-invisible
                <code class="font-mono text-xs">fieldAlpha ≈ 0.12</code>
                behind page content (the <code class="font-mono text-xs">liquid-grid</code>
                background kind — NOT in a card).
            </p>
        </StorySection>
    </StoryPage>
</template>
