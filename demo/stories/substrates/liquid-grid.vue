<script setup lang="ts">
// LiquidGrid — the WebGPU-first liquid AA-grid studio. Evenly-spaced LARGER lines on a
// slowly breathing curl-flow sheet: a Ben Golus derivative-AA two-tier grid (the crisp-line
// fix) on a Bridson divergence-free curl-warped UV (the "liquid"). The default is the warm-
// cream library identity over transparent (the page reads through the cells); teal-on-navy is
// gone (§E). The configurator sits on the right at wide sizes and stacks on narrow ones.
import { computed, reactive, ref } from "vue";
import RendererStatusView from "./_frame/RendererStatus.vue";
import {
    pendingRenderer,
    type RendererStatus,
} from "@glass/composables/glass/webgpu/rendererStatus";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Configurator, ConfiguratorLayer } from "@glass/components/configurator";
import { LabeledSlider, LabeledSwitch } from "@glass/components/labeled-field";
import { DockBackgroundToggle } from "@glass/components/dock";
import { LiquidGrid, type LiquidGridConfig } from "@glass/components/liquid-grid";
import { LIQUID_GRID_PRESET_WARM, LIQUID_GRID_PRESET_BOLD } from "./presets";
import { LIQUID_GRID_PRESET_SUFFUSE } from "../../chassis/hero/suffuse-preset";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a preset switch is a clean reset, the library default). The DEFAULT is warm-cream identity.
const config = reactive<LiquidGridConfig>(
    JSON.parse(JSON.stringify(LIQUID_GRID_PRESET_WARM)),
);

const paused = ref(false);
const rendererStatus = ref<RendererStatus>(pendingRenderer("webgpu"));

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
            blurb="A crisp graph-paper grid breathes and bows like a liquid sheet while its major lines remain coherent. Turn on interaction and drag to twist the cells around the pointer as if pressing a finger into the surface."
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
                            @renderer-status="rendererStatus = $event"
                        />
                        <RendererStatusView
                            :status="rendererStatus"
                            class="pointer-events-none absolute top-3 left-3"
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
                            <LabeledSlider
                                v-model="cellSize"
                                label="Cell size"
                                description="the minor cell pitch (px) — LARGER = bigger cells"
                                :min="24"
                                :max="128"
                                :step="1"
                            />
                            <LabeledSlider
                                v-model="majorEvery"
                                label="Major every"
                                description="minor cells per bolder major rule (default 5rem/1rem)"
                                :min="2"
                                :max="10"
                                :step="1"
                            />
                            <LabeledSlider
                                v-model="minorAlpha"
                                label="Minor weight"
                                description="the calm hairline alpha (≈ 3%)"
                                :min="0"
                                :max="0.3"
                                :step="0.005"
                            />
                            <LabeledSlider
                                v-model="majorAlpha"
                                label="Major weight"
                                description="the bolder rule alpha (11%, above the 10% floor)"
                                :min="0"
                                :max="0.3"
                                :step="0.005"
                            />
                            <LabeledSlider
                                v-model="lineWidth"
                                label="Line width"
                                description="one crisp device-pixel via Golus AA (px)"
                                :min="0.5"
                                :max="2"
                                :step="0.1"
                            />
                        </ConfiguratorLayer>

                        <ConfiguratorLayer
                            label="Liquid (the affine sheet wave)"
                            dividers
                        >
                            <LabeledSlider
                                v-model="twistMax"
                                label="Warp depth"
                                description="how far the sheet bows/shears at the wave crest (grid units; major lines bow as ONE smooth curve, cells stay near-parallelogram)"
                                :min="0"
                                :max="0.9"
                                :step="0.01"
                            />
                            <LabeledSlider
                                v-model="waveK"
                                label="Wave frequency"
                                description="the crest-band spatial frequency — how many cells between crests as the wave passes OVER and THROUGH"
                                :min="0.1"
                                :max="1.5"
                                :step="0.05"
                            />
                            <LabeledSlider
                                v-model="waveOmega"
                                label="Wave speed"
                                description="the traveling-front speed (slow — inertia)"
                                :min="0"
                                :max="1.5"
                                :step="0.01"
                            />
                            <LabeledSlider
                                v-model="fieldAlpha"
                                label="Field alpha"
                                description="the GLOBAL subtlety knob (suffusion → tiny)"
                                :min="0"
                                :max="1"
                                :step="0.01"
                            />
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Pointer bulge" dividers>
                            <LabeledSwitch
                                :model-value="interactive"
                                @update:model-value="(v: boolean) => (interactive = v)"
                                label="Interactive"
                                description="the cursor pushes a bulge through the grid; a flick fires a ripple"
                            />
                            <LabeledSlider
                                v-model="bulgeStrength"
                                label="Bulge strength"
                                description="how far the cursor pushes the grid"
                                :min="0"
                                :max="0.5"
                                :step="0.01"
                            />
                            <LabeledSlider
                                v-model="bulgeRadius"
                                label="Bulge radius"
                                description="the Gaussian falloff radius (cells)"
                                :min="1"
                                :max="8"
                                :step="0.5"
                            />
                            <LabeledSwitch
                                :model-value="bulgeRepel"
                                @update:model-value="(v: boolean) => (bulgeRepel = v)"
                                label="Repel (vs attract)"
                                description="push the grid away (repel) or toward (attract) the cursor"
                            />
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Presets" dividers>
                            <LabeledSwitch
                                :model-value="suffuseOn"
                                @update:model-value="(v: boolean) => (suffuseOn = v)"
                                label="Suffusion"
                                description="the site-wide subtle background register (fieldAlpha ≈ 0.12, large pitch, slow warp, non-interactive)"
                            />
                            <LabeledSwitch
                                :model-value="boldOn"
                                @update:model-value="(v: boolean) => (boldOn = v)"
                                label="Bold liquid"
                                description="a bolder bow — the deliberate 'felt MORE' calibration counter (still coherent)"
                            />
                        </ConfiguratorLayer>
                    </div>
                </template>
            </Configurator>

            <p class="text-muted-foreground mt-4 text-small">
                The grid is computed at an AFFINE-WARPED coordinate
                <code class="font-mono text-xs"
                    >g = waveFlow(uv·scale, t) + cursorSwirl(g)</code
                >
                — a smooth low-order curl-flow field bends the whole SHEET as a
                traveling Gaussian wave-crest passes OVER and THROUGH it, so MAJOR
                gridlines bow and shear as ONE coherent curve (cells stay
                near-parallelogram, never a per-pixel wobble), and each line is
                extracted as a constant-pixel-width stroke via the Ben Golus
                screen-space derivative AA. Under
                <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the warp freezes mid-breath and the grid holds crisp. The suffusion
                preset rides the same field at a near-invisible
                <code class="font-mono text-xs">fieldAlpha ≈ 0.12</code>
                behind page content (the
                <code class="font-mono text-xs">liquid-grid</code>
                background kind — NOT in a card).
            </p>
        </StorySection>
    </StoryPage>
</template>
