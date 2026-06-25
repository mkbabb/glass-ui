<script setup lang="ts">
// Concentric — the WebGPU-first level-set TOPOGRAPHIC CONTOUR studio (paper-grid kin). The
// iso-contours of a low-octave height field that TWIST and FLOW as a traveling wave passes
// OVER and THROUGH the topography (the SAME cell-warp the paper-grid cells ride), the basins
// breathing on the ω=√(g·k) swell, the cursor bulging the topography toward the pointer
// (gravity). The default is the warm-cream library identity over transparent (basins cool-cream,
// ridges warm-amber); the teal-on-navy is a non-default named preset (presets-in-consumers).
import { computed, reactive, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
} from "../../../src/components/custom/configurator";
import { LabeledSlider, LabeledSwitch } from "../../../src/components/custom/labeled-field";
import {
    Concentric,
    type ConcentricConfig,
} from "../../../src/components/custom/concentric";
import { CONCENTRIC_PRESET_WARM, CONCENTRIC_PRESET_THEME } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a preset switch is a clean reset, the library default). The DEFAULT is warm-cream identity.
const config = reactive<ConcentricConfig>(
    JSON.parse(JSON.stringify(CONCENTRIC_PRESET_WARM)),
);

const paused = ref(false);

// ── the named theme preset (warm-cream identity DEFAULT; teal-on-navy non-default) ──
const useTheme = ref(false);
function onTogglePreset(v: boolean): void {
    useTheme.value = v;
    const src = v ? CONCENTRIC_PRESET_THEME : CONCENTRIC_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
}

// ── topography + contour refs (bound directly via v-model into config) ─────────────
const lineWidth = computed({
    get: () => config.lineWidth,
    set: (v) => (config.lineWidth = v),
});
const speed = computed({
    get: () => config.speed,
    set: (v) => (config.speed = v),
});
const contourLevels = computed({
    get: () => config.contourLevels,
    set: (v) => (config.contourLevels = Math.round(v)),
});
const twistMax = computed({
    get: () => config.twistMax,
    set: (v) => (config.twistMax = v),
});
const swellAmp = computed({
    get: () => config.swellAmp,
    set: (v) => (config.swellAmp = v),
});
const cursorWell = computed({
    get: () => config.cursorWell,
    set: (v) => (config.cursorWell = v),
});
const interactive = computed({
    get: () => config.interactive,
    set: (v) => (config.interactive = v),
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Concentric"
            label="level-set contour map · paper-grid kin · gradient topology"
            blurb="A living TOPOGRAPHIC CONTOUR MAP — the level-set iso-contours of a low-octave height field, nested loops that TWIST and FLOW as a traveling wave passes OVER and THROUGH the topography (the SAME cell-warp that twists the paper-grid cells, so the two viz move together — vector calculus, level sets, gradient topology). The basins breathe in and out on the ω=√(g·k) deep-water swell (Tessendorf 2001); the contours bunch on steep ground (the density tracks 1/|∇H|). The lines are extracted via Inigo Quilez's gradient-free contour distance-estimation (perfect GPU AA at any DPR). WebGPU-FIRST: a pure fullscreen fragment pass over the shared waveField leaf, with a clean WebGL2 GLSL fallback. Move the cursor and the topography BULGES toward it (gravity). The default is the warm-cream identity over transparent (basins cool-cream, ridges warm-amber); the teal-on-navy is a non-default named preset."
        >
            <Configurator class="h-[min(78vh,720px)] shadow-cartoon" scroll-mode="auto">
                <template #stage>
                    <div class="relative h-full w-full overflow-hidden rounded-card">
                        <Concentric
                            :config="config"
                            v-model:paused="paused"
                            class="absolute inset-0"
                        />
                    </div>
                </template>

                <template #controls>
                    <div class="flex flex-col gap-2">
                        <ConfiguratorLayer label="Contours" dividers>
                            <ConfiguratorRow label="Contour levels" name="contourLevels">
                                <LabeledSlider
                                    v-model="contourLevels"
                                    label="Contour levels"
                                    tooltip="the iso-line density (a readable topographic map)"
                                    :min="4"
                                    :max="24"
                                    :step="1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Line width" name="lineWidth">
                                <LabeledSlider
                                    v-model="lineWidth"
                                    label="Line width"
                                    tooltip="contour stroke thickness (px)"
                                    :min="0.5"
                                    :max="4"
                                    :step="0.1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="The wave (paper-grid kin)" dividers>
                            <ConfiguratorRow label="Twist max" name="twistMax">
                                <LabeledSlider
                                    v-model="twistMax"
                                    label="Twist max"
                                    tooltip="how far the topography TWISTS at the wave crest (the cell-warp the contours ride)"
                                    :min="0"
                                    :max="0.9"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Swell depth" name="swellAmp">
                                <LabeledSlider
                                    v-model="swellAmp"
                                    label="Swell depth"
                                    tooltip="the ω=√(g·k) breathing — basins inflate/deflate (weight)"
                                    :min="0"
                                    :max="0.5"
                                    :step="0.01"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Speed" name="speed">
                                <LabeledSlider
                                    v-model="speed"
                                    label="Speed"
                                    tooltip="the level-set flow speed (scales the traveling-wave time)"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.05"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Cursor & theme" dividers>
                            <ConfiguratorRow label="Cursor gravity" name="cursorWell">
                                <LabeledSlider
                                    v-model="cursorWell"
                                    label="Cursor gravity"
                                    tooltip="the topography bulges toward the pointer (gravity well depth)"
                                    :min="0"
                                    :max="1"
                                    :step="0.02"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Pointer-reactive" name="interactive">
                                <LabeledSwitch
                                    :checked="interactive"
                                    @update:checked="(v: boolean) => (interactive = v)"
                                    label="Pointer-reactive"
                                    tooltip="the topography bulges toward the cursor (gravity)"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Aurora-teal theme" name="palette">
                                <LabeledSwitch
                                    :checked="useTheme"
                                    @update:checked="onTogglePreset"
                                    label="Aurora-teal theme"
                                    tooltip="a non-default named preset (off = warm-cream identity default)"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Paused" name="paused">
                                <LabeledSwitch
                                    :checked="paused"
                                    @update:checked="(v: boolean) => (paused = v)"
                                    label="Paused"
                                    tooltip="parks the render loop"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </div>
                </template>
            </Configurator>

            <p class="text-sm text-muted-foreground">
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the contours freeze as a
                finished topographic map. The field is the level-set iso-contours of
                <code class="font-mono text-xs">H = heightField(cellTwist(p)) + swell</code>
                — the SAME traveling-wave cell-warp the paper-grid cells ride, so the two viz
                move together (vector calculus: the contour density tracks 1/|∇H|).
            </p>
        </StorySection>
    </StoryPage>
</template>
