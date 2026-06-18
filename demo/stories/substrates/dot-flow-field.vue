<script setup lang="ts">
// DotFlowField — the WebGPU-first curl-noise flow-field studio. Teal dots over dark
// navy (the reference reproduction), seeded along undulating streamlines rippling in
// Gerstner/Tessendorf waves. The default warm-cream identity toggles beside it.
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
import { FLOW_PRESET_REFERENCE, FLOW_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single
// surface; a toggle is a clean reset, the library default).
const useReference = ref(true);
const paused = ref(false);

const config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_REFERENCE });

// Switch the whole config between the reference teal-on-navy and the warm-cream
// identity (presets-in-consumers — the library default is warm-cream).
function applyPreset(reference: boolean): void {
    const src = reference ? FLOW_PRESET_REFERENCE : FLOW_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
}

const liveConfig = computed<FlowFieldConfig>(() => ({ ...config }));

// Re-apply on the toggle.
function onTogglePreset(v: boolean): void {
    useReference.value = v;
    applyPreset(v);
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot flow field"
            label="curl-noise streamlines · Gerstner waves"
            blurb="Small dots seeded along undulating streamlines, rippling in waves — a curl-noise flow field traced by advected particles, where the scalar potential undulates as a Gerstner/Tessendorf sum-of-sines water-wave field (Tessendorf 2001 · Bridson 2007). WebGPU-FIRST: the compute pass advects N particles through the analytic ∇⊥ψ velocity, the render pass draws instanced billboard quads; a Canvas2D point-cloud fallback steps the SAME evaluator where WebGPU is absent. ONE GL context (the field's own) — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useReference"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">teal-on-navy reference (off = warm-cream identity default)</span>
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
                the substrate paints ONE static frame then parks — the streamlines
                freeze at the seeded positions. The dots cluster denser where the
                field is calm and thin where it accelerates (per-particle size rides
                <code class="font-mono text-xs">|v|</code> — the reference's varying
                dot size).
            </p>
        </StorySection>
    </StoryPage>
</template>
