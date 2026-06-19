<script setup lang="ts">
// DotFlowField — the WebGPU-first curl-noise flow-field studio. The DEFAULT is the
// warm-cream library identity (soft warm-white dots over a transparent/warm ground),
// seeded along undulating streamlines rippling in Gerstner/Tessendorf waves. The
// ACTUAL reference (subtle mono-warm-white dots on near-black) toggles beside it as a
// non-default named preset (presets-in-consumers; BC.W-TEAL-NAVY-PURGE — the
// fabricated teal-on-navy reproduction is DELETED).
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
import { FLOW_PRESET_MONO_REFERENCE, FLOW_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single
// surface; a toggle is a clean reset, the library default). The DEFAULT is warm-cream.
const useReference = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_WARM, interactive: true });

// Switch the whole config between the mono-warm-white-on-near-black reference and the
// warm-cream identity (presets-in-consumers — the library default is warm-cream).
function applyPreset(reference: boolean): void {
    const src = reference ? FLOW_PRESET_MONO_REFERENCE : FLOW_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    config.interactive = interactive.value;
}

const liveConfig = computed<FlowFieldConfig>(() => ({ ...config }));

// Re-apply on the toggle.
function onTogglePreset(v: boolean): void {
    useReference.value = v;
    applyPreset(v);
}

// Toggle the pointer-ripple interaction (the velocity + flick-accel response).
function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    config.interactive = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot flow field"
            label="anchored dot-matrix · LARGE sweeping waves"
            blurb="A calm regular lattice of small soft warm-cream dots that a single LARGE wave sweeps slowly through — an anchored dot-matrix (NOT a free particle cloud), where each dot only breathes a hair off its anchor while a broad bright iso-band crosses the field like a tide, lighting the dots it passes. The scalar height undulates as a Gerstner/Tessendorf sum-of-sines water-wave field (Tessendorf 2001 · Bridson 2007), the regime inverted to the LOW-frequency coherent band (one dominant wave, a faint curl break). WebGPU-FIRST: the compute pass pulls the lattice toward its sub-cell displacement with a restoring spring, the render pass draws instanced billboard quads lit by the sweeping band; a pure WebGL2 fragment fallback evaluates the SAME field where WebGPU is absent. Drag the cursor — a soft ripple pushes through the lattice (the steady-drag velocity), and a flick fires a brief brightness bloom (the accel burst). ONE GL context (the field's own) — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useReference"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">mono-on-near-black reference (off = warm-cream identity default)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (pointer ripple + flick bloom)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused (WCAG 2.2.2)</span>
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
                the substrate paints ONE static frame then parks — the lattice freezes
                mid-sweep, the shape held. The grid is the stable canvas; the sweeping
                bright band is the slow brush. Each dot's brightness reads the Gerstner
                height at its anchor (<code class="font-mono text-xs">waveBand(h)·contrast</code>)
                — the moving iso-band, not a chaotic per-particle flicker.
            </p>
        </StorySection>
    </StoryPage>
</template>
