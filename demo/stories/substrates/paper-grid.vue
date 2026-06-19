<script setup lang="ts">
// PaperGrid — the WebGPU-first liquid AA-grid studio. Evenly-spaced LARGER lines on a
// slowly breathing curl-flow sheet: a Ben Golus derivative-AA two-tier grid (the crisp-line
// fix) on a Bridson divergence-free curl-warped UV (the "liquid"). The default is the warm-
// cream library identity over transparent (the page reads through the cells); teal-on-navy is
// gone (§E). The configurator sits on the RIGHT (the §E controls-right mandate); the title
// carries the explicit /paper-grid subpath.
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
} from "../../../src/components/custom/configurator";
import {
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
import {
    PaperGrid,
    type PaperGridConfig,
} from "../../../src/components/custom/paper-grid";
import {
    PAPER_GRID_PRESET_WARM,
    PAPER_GRID_PRESET_SUFFUSE,
    PAPER_GRID_PRESET_BOLD,
} from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a preset switch is a clean reset, the library default). The DEFAULT is warm-cream identity.
const config = reactive<PaperGridConfig>(
    JSON.parse(JSON.stringify(PAPER_GRID_PRESET_WARM)),
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

// ── liquid (warp) refs ──────────────────────────────────────────────────────────
const waveAmplitude = computed({
    get: () => config.waveAmplitude,
    set: (v) => (config.waveAmplitude = v),
});
const waveScale = computed({
    get: () => config.waveScale,
    set: (v) => (config.waveScale = v),
});
const waveSpeed = computed({
    get: () => config.waveSpeed,
    set: (v) => (config.waveSpeed = v),
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
            ? PAPER_GRID_PRESET_SUFFUSE
            : key === "bold"
              ? PAPER_GRID_PRESET_BOLD
              : PAPER_GRID_PRESET_WARM;
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
            heading="PaperGrid"
            label="liquid AA-grid · evenly-spaced LARGER lines that morph + wave in a liquid way"
            blurb="A calm engineering-graph-paper grid — evenly-spaced, LARGE cells, a crisp fine rule with a bolder major rule every 5 cells — drawn on a slowly breathing liquid sheet. Adjacent lines bow and flow TOGETHER as if the grid is ruled on a gently rippling pond (the Iñigo Quílez domain warp driven by the Bridson divergence-free curl flow), never a per-line jitter; the lines are exactly one device-pixel crisp at any DPR (the Ben Golus derivative-AA distance — the blurry-mess fix). WebGPU-FIRST: a pure fullscreen fragment pass over the proven substrate, with a clean WebGL2 GLSL fallback (the SAME field — no Canvas2D path). Drag the cursor (interactive on) and a soft Gaussian bulge presses the grid toward (repel: away from) the pointer like a finger pressed into the liquid. The default is the warm-cream identity over transparent — the page reads through the cells."
        >
            <p class="text-muted-foreground mb-4 text-small">
                <code class="font-mono text-xs">@mkbabb/glass-ui/paper-grid</code>
            </p>

            <Configurator class="h-[min(78vh,720px)] shadow-cartoon" scroll-mode="auto">
                <template #stage>
                    <div class="relative h-full w-full overflow-hidden rounded-card">
                        <PaperGrid
                            :config="config"
                            v-model:paused="paused"
                            class="absolute inset-0"
                        />
                        <!-- WCAG 2.2.2 pause/play for the continuously-running field. -->
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

                        <ConfiguratorLayer label="Liquid (the curl warp)" dividers>
                            <ConfiguratorRow label="Wave amplitude" name="waveAmplitude">
                                <LabeledSlider
                                    v-model="waveAmplitude"
                                    label="Wave amplitude"
                                    tooltip="how far the lines bow (cell units; subtle = 'felt, not loud')"
                                    :min="0"
                                    :max="0.5"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Wave scale" name="waveScale">
                                <LabeledSlider
                                    v-model="waveScale"
                                    label="Wave scale"
                                    tooltip="the warp spatial frequency — LOW = the whole sheet bows together (HIGH = the noise we don't want)"
                                    :min="0.2"
                                    :max="2"
                                    :step="0.05"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Wave speed" name="waveSpeed">
                                <LabeledSlider
                                    v-model="waveSpeed"
                                    label="Wave speed"
                                    tooltip="the slow warp drift"
                                    :min="0"
                                    :max="1"
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
                The grid is computed at a WARPED coordinate
                <code class="font-mono text-xs">g(uv) = uv + curlWarp(uv,t) + cursorBulge(uv)</code>
                (the IQ domain-warp substitution driven by the Bridson divergence-free curl —
                the whole sheet bows together, never a per-line jitter), and each line is
                extracted as a constant-pixel-width stroke via the Ben Golus screen-space
                derivative AA. Under
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
