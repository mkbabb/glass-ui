<script setup lang="ts">
// Concentric — the WebGPU-first radial Fourier ring-interference studio. The
// demo-themed aurora-teal rings (a deep indigo ground crested by aqua interference)
// toggle beside the default warm-cream identity. The 3D-rendered-to-2D look: an
// ellipsoidal norm reads tilted discs as ellipses, multi-center families cross into
// moiré beats.
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import {
    Concentric,
    type ConcentricConfig,
} from "../../../src/components/custom/concentric";
import { CONCENTRIC_PRESET_THEME, CONCENTRIC_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single
// surface; a toggle is a clean reset, the library default).
const useTheme = ref(true);
const paused = ref(false);

const config = reactive<ConcentricConfig>(
    JSON.parse(JSON.stringify(CONCENTRIC_PRESET_THEME)),
);

// Switch the whole config between the demo theme and the warm-cream identity
// (presets-in-consumers — the library default is warm-cream).
function applyPreset(theme: boolean): void {
    const src = theme ? CONCENTRIC_PRESET_THEME : CONCENTRIC_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
}

const liveConfig = computed<ConcentricConfig>(() => ({ ...config }));

function onTogglePreset(v: boolean): void {
    useTheme.value = v;
    applyPreset(v);
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Concentric"
            label="radial Fourier rings · ellipsoidal interference"
            blurb="A radial Fourier ring-interference field — concentric ellipsoid rings whose interference is a sum of radial harmonics about one-or-more centers. The same Fourier-series / deep-water dispersion vocabulary the dot-flow-field uses (Tessendorf 2001), so the suite speaks ONE math language. WebGPU-FIRST: a pure fullscreen fragment pass (the aurora shape-class) evaluates f(p,t) per pixel, with a clean WebGL2 GLSL fallback where WebGPU is absent. ONE GL context (the field's own) — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useTheme"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">aurora-teal theme (off = warm-cream identity default)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused (WCAG 2.2.2)</span>
                </Label>
            </div>

            <ShowcaseFrame tier="field" pad="none">
                <div class="relative h-[460px] w-full overflow-hidden rounded-card">
                    <Concentric
                        :config="liveConfig"
                        v-model:paused="paused"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the rings freeze.
                The ellipsoidal norm (axis ratio
                <code class="font-mono text-xs">[1, 0.62]</code>) tilts the discs into
                ellipses (the 3D depth implication); the two ring families cross into
                moiré beats where they overlap.
            </p>
        </StorySection>
    </StoryPage>
</template>
