<script setup lang="ts">
// Concentric — the WebGPU-first radial-Fourier ring-interference studio. Thin bright
// ELLIPSOID LINES from 2-4 sources beat into distinct sweeping WAVES (the IQ
// gradient-normalized isoline render, the clean beating-families generator). The default is
// the warm-cream library identity over transparent (the page reads through the troughs); the
// teal-on-navy is a non-default named preset (presets-in-consumers). The configurator sits on
// the RIGHT (the §E controls-right mandate).
import { computed, reactive, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
} from "../../../src/components/custom/configurator";
import { LabeledSlider, LabeledSelect, LabeledSwitch } from "../../../src/components/custom/labeled-field";
import {
    Concentric,
    type ConcentricConfig,
    type ConcentricRenderMode,
    type RingCenter,
    buildDefaultRingComponents,
} from "../../../src/components/custom/concentric";
import { CONCENTRIC_PRESET_WARM, CONCENTRIC_PRESET_THEME } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a preset switch is a clean reset, the library default). The DEFAULT is warm-cream identity.
const config = reactive<ConcentricConfig>(
    JSON.parse(JSON.stringify(CONCENTRIC_PRESET_WARM)),
);

const paused = ref(false);

// ── ring FAMILIES (1-4 centers) ────────────────────────────────────────────────
const familyCount = ref(config.centers.length);
const SEED_CENTERS: RingCenter[] = [
    { x: -0.28, y: -0.18, weight: 1.0, rotAlpha: 0.35 },
    { x: 0.3, y: 0.22, weight: 0.85, rotAlpha: -0.55 },
    { x: 0.0, y: 0.34, weight: 0.7, rotAlpha: 1.1 },
    { x: -0.34, y: 0.28, weight: 0.6, rotAlpha: -1.3 },
];
watch(familyCount, (n) => {
    const count = Math.max(1, Math.min(4, Math.round(n)));
    config.centers = SEED_CENTERS.slice(0, count).map((c) => ({ ...c }));
});

// ── base wavelength + beat detune rebuild the clean ring table ──────────────────
const baseWavelength = ref(0.24);
const beatDetune = ref(config.beatDetune);
function rebuildRings(): void {
    config.beatDetune = beatDetune.value;
    config.ringComponents = buildDefaultRingComponents(
        baseWavelength.value,
        beatDetune.value,
    );
}
watch([baseWavelength, beatDetune], rebuildRings);

// ── axis ratio (the ellipsoid tilt) ────────────────────────────────────────────
const axisB = ref(config.axisRatio[1]);
watch(axisB, (b) => (config.axisRatio = [1, Math.max(0.2, Math.min(1, b))]));

// ── render mode ────────────────────────────────────────────────────────────────
const RENDER_MODES: readonly ConcentricRenderMode[] = [
    "traveling-rings",
    "static-contour",
    "both",
];
const renderMode = ref<string>(config.renderMode);
const renderModeOpen = ref(false);
watch(renderMode, (m) => (config.renderMode = m as ConcentricRenderMode));

// ── the named theme preset (warm-cream identity DEFAULT; teal-on-navy non-default) ──
const useTheme = ref(false);
function onTogglePreset(v: boolean): void {
    useTheme.value = v;
    const src = v ? CONCENTRIC_PRESET_THEME : CONCENTRIC_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    // re-sync the control refs to the applied preset.
    familyCount.value = config.centers.length;
    beatDetune.value = config.beatDetune;
    renderMode.value = config.renderMode;
    axisB.value = config.axisRatio[1];
}

// ── line geometry refs (bound directly via v-model into config) ─────────────────
const lineWidth = computed({
    get: () => config.lineWidth,
    set: (v) => (config.lineWidth = v),
});
const lineSoftness = computed({
    get: () => config.lineSoftness,
    set: (v) => (config.lineSoftness = v),
});
const speed = computed({
    get: () => config.speed,
    set: (v) => (config.speed = v),
});
const contourLevels = computed({
    get: () => config.contourLevels,
    set: (v) => (config.contourLevels = Math.round(v)),
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
            label="radial Fourier rings · ellipsoid lines forming distinct waves"
            blurb="Thin bright ELLIPTICAL ring-lines spread from two-to-four sources across the field; where the families overlap they BEAT into a slow broad moiré envelope — distinct sweeping waves, like cymatics ripples seen edge-on. The lines are extracted as constant-width antialiased strokes (Inigo Quilez's gradient-normalized distance-estimation, the gradient closed-form since the field is a sum of sinusoids), over the SAME deep-water dispersion the dot-flow-field uses (Tessendorf 2001). WebGPU-FIRST: a pure fullscreen fragment pass evaluates f(p,t) per pixel, with a clean WebGL2 GLSL fallback where WebGPU is absent. Drag the cursor (interactive on) and a transient ripple-source follows it — the rings bend toward the pointer. The default is the warm-cream identity over transparent; the teal-on-navy is a non-default named preset."
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
                        <ConfiguratorLayer label="Ring families" dividers>
                            <ConfiguratorRow label="Families" name="centers.length">
                                <LabeledSlider
                                    v-model="familyCount"
                                    label="Families"
                                    tooltip="1-4 ring sources; ≥2 → interference beats"
                                    :min="1"
                                    :max="4"
                                    :step="1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Base wavelength" name="ringComponents.wavelength">
                                <LabeledSlider
                                    v-model="baseWavelength"
                                    label="Base wavelength"
                                    tooltip="ring spacing (smaller = tighter rings)"
                                    :min="0.1"
                                    :max="0.35"
                                    :step="0.005"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Beat detune" name="beatDetune">
                                <LabeledSlider
                                    v-model="beatDetune"
                                    label="Beat detune"
                                    tooltip="the moiré envelope wavelength — the 'distinct waves' dial"
                                    :min="0"
                                    :max="0.06"
                                    :step="0.002"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Ellipsoid tilt" name="axisRatio.b">
                                <LabeledSlider
                                    v-model="axisB"
                                    label="Ellipsoid tilt"
                                    tooltip="axis ratio (a=1, b) — the ellipse squash"
                                    :min="0.2"
                                    :max="1"
                                    :step="0.02"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Lines" dividers>
                            <ConfiguratorRow label="Render mode" name="renderMode">
                                <LabeledSelect
                                    v-model="renderMode"
                                    :is-open="renderModeOpen"
                                    @update:open="(v: boolean) => (renderModeOpen = v)"
                                    label="Render mode"
                                    tooltip="traveling crest-lines · static elevation-contour · both"
                                    :items="RENDER_MODES"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Line width" name="lineWidth">
                                <LabeledSlider
                                    v-model="lineWidth"
                                    label="Line width"
                                    tooltip="stroke thickness (field units)"
                                    :min="0.5"
                                    :max="4"
                                    :step="0.1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Line softness" name="lineSoftness">
                                <LabeledSlider
                                    v-model="lineSoftness"
                                    label="Line softness"
                                    tooltip="AA edge feather (field units)"
                                    :min="0.5"
                                    :max="3"
                                    :step="0.1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Contour levels" name="contourLevels">
                                <LabeledSlider
                                    v-model="contourLevels"
                                    label="Contour levels"
                                    tooltip="evenly-spaced elevation lines (static-contour mode)"
                                    :min="4"
                                    :max="24"
                                    :step="1"
                                    hide-label
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>

                        <ConfiguratorLayer label="Motion & theme" dividers>
                            <ConfiguratorRow label="Speed" name="speed">
                                <LabeledSlider
                                    v-model="speed"
                                    label="Speed"
                                    tooltip="ring travel (scales ω)"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.05"
                                    hide-label
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Pointer-reactive" name="interactive">
                                <LabeledSwitch
                                    :checked="interactive"
                                    @update:checked="(v: boolean) => (interactive = v)"
                                    label="Pointer-reactive"
                                    tooltip="the rings warp toward the cursor; a flick fires a ripple"
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
                            <ConfiguratorRow label="Paused (WCAG 2.2.2)" name="paused">
                                <LabeledSwitch
                                    :checked="paused"
                                    @update:checked="(v: boolean) => (paused = v)"
                                    label="Paused (WCAG 2.2.2)"
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
                the substrate paints ONE static frame then parks — the rings freeze as a still
                contour map. The ellipsoidal norm (axis ratio
                <code class="font-mono text-xs">[1, 0.62]</code>) tilts the rings into
                ellipses; two tilted families cross into the moiré beat.
            </p>
        </StorySection>
    </StoryPage>
</template>
