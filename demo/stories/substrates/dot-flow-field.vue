<script setup lang="ts">
// DotFlowField — the AURORA CURRENT (BD.W-DOTFLOW-AURORA-CURRENT). The DEFAULT register is
// `mode:"flow"`: a dense population ADVECTED along the divergence-free curl current, trailing
// fading ribbons of WARM-FIRE light (a velocity-map: slow ember → molten amber → incandescent
// gold → near-white bloom), the cursor a live VORTEX, over a deep warm-near-black floor + a
// warm rose corner-bloom (NO cyan/teal — the warm-fire fence). The calm `mode:"field"`
// anchored halftone (the v4 content-deferential backdrop, KEPT) toggles beside it.
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import {
    DotFlowField,
    type FlowFieldConfig,
} from "../../../src/components/custom/dot-flow-field";
import { FLOW_PRESET_AURORA_CURRENT, FLOW_PRESET_HALFTONE } from "./presets";

// The studio model — a live config the controls drive (commit-on-write). The DEFAULT is the
// AURORA CURRENT (flow); the toggle swaps to the calm halftone (field) register.
const useHalftone = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_AURORA_CURRENT });

// Switch the whole config between the AURORA CURRENT (flow) and the halftone (field).
function applyPreset(halftone: boolean): void {
    const src = halftone ? FLOW_PRESET_HALFTONE : FLOW_PRESET_AURORA_CURRENT;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    config.interactive = halftone ? false : interactive.value;
}

const liveConfig = computed<FlowFieldConfig>(() => ({ ...config }));

// Re-apply on the toggle.
function onTogglePreset(v: boolean): void {
    useHalftone.value = v;
    applyPreset(v);
}

// Toggle the cursor-vortex interaction (the velocity-drag + flick-shockwave response).
function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    if (!useHalftone.value) config.interactive = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot flow field"
            label="AURORA CURRENT · advected motes · warm-fire trails · cursor vortex"
            blurb="A dense population of motes ADVECTED along a divergence-free curl current, each trailing a fading ribbon of WARM-FIRE light — the ribbon hue mapped to the mote's SPEED (a 1940s-technicolor velocity-map: slow eddies ember/oxblood → fast jets molten amber → incandescent gold → near-white bloom), the whole field breathing on a slow clock, the CURSOR a live VORTEX that motes bend around and spiral off — over a deep warm-near-black floor with a warm rose corner-bloom (NO cyan/teal). The current undulates as a Gerstner/Tessendorf curl-noise field (Tessendorf 2001 · Bridson 2007). A feedback-fade TRAIL buffer braids the ribbons; low turn-rate inertia gives the motes liquid weight (they ease into the current's arcs, never jitter). WebGPU runs a compute-advected storage buffer + a half-res RGBA16F trail; the WebGL2 channel (the live path on most hosts) runs a state-texture GPGPU ping-pong + a two-FBO trail — the SAME advected-population gestalt on both engines. Drag the cursor: a slow drag DRAGS the streamlines along the gesture (and keeps spinning a beat after you stop), a fast flick SHOVES a radial shockwave. ONE GL context — the one-GL-per-route budget held. Toggle to the calm anchored halftone (the field register)."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useHalftone"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">calm halftone (field) — off = AURORA CURRENT (flow) default</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (cursor vortex — drag + flick)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused</span>
                </Label>
            </div>

            <ShowcaseFrame tier="field" pad="none">
                <div class="relative h-[460px] w-full overflow-hidden rounded-card">
                    <DotFlowField
                        :config="liveConfig"
                        v-model:paused="paused"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate pre-rolls the trail then paints ONE static frame and parks —
                the braided ribbons hold, the cursor vortex inert. The trail buffer is the
                ribbon: each frame the previous frame draws back at the derived decay
                (<code class="font-mono text-xs">trailHalfLife</code>), then the motes draw
                additively over it. The mote's speed reads its hue + brightness
                (<code class="font-mono text-xs">samplePaletteLin(speedNorm)</code>) — the
                warm-fire velocity-map, never a chaotic per-particle flicker.
            </p>
        </StorySection>
    </StoryPage>
</template>
