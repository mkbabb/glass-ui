<script setup lang="ts">
// DotFlowField — the STREAMLINE field (BG.W-DOTFLOW-REBUILD). Discrete warm-cream dots strung
// along EVENLY-SPACED SMOOTH STREAMLINES of a curl-warped stream function — undulating +
// interweaving like the level curves of a procedural function, the dots drifting slowly ALONG
// their own line, over a deep warm-near-black floor. The cursor bends the streamlines (a smooth
// gaussian domain-push — no snap, no vortex chaos). ONE fullscreen-fragment pass, WebGPU-first
// with a byte-identical WebGL2 fallback (the free-advected-mote + additive-trail architecture is
// RETIRED). The library default is warm-cream; the IMG_1836 teal-on-navy skin is a demo preset.
import { computed, reactive, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Switch } from "@glass/components/ui/switch";
import { Label } from "@glass/components/ui/label";
import {
    DotFlowField,
    type FlowFieldConfig,
} from "@glass/components/custom/dot-flow-field";
import { FLOW_PRESET_WARM, FLOW_PRESET_CALM, FLOW_PRESET_OCEAN } from "./presets";

// The studio model — a live config the controls drive. The DEFAULT is the warm-cream streamline
// field; the toggles swap to the calmer register + the IMG_1836 ocean skin (demo-only).
const useCalm = ref(false);
const useOcean = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_WARM });

// Re-apply the config from the active toggles (warm | calm base, warm | ocean skin).
function applyConfig(): void {
    const base = useCalm.value ? FLOW_PRESET_CALM : FLOW_PRESET_WARM;
    const src = useOcean.value ? { ...base, ...FLOW_PRESET_OCEAN } : base;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    config.interactive = useCalm.value ? false : interactive.value;
}

const liveConfig = computed<FlowFieldConfig>(() => ({ ...config }));

function onToggleCalm(v: boolean): void {
    useCalm.value = v;
    applyConfig();
}
function onToggleOcean(v: boolean): void {
    useOcean.value = v;
    applyConfig();
}
function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    if (!useCalm.value) config.interactive = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot flow field"
            label="evenly-spaced beaded streamlines · curl-warped · cursor-bent"
            blurb="Discrete warm-cream dots strung along EVENLY-SPACED SMOOTH STREAMLINES of a curl field — the level curves of a procedural stream function ψ (Jobard–Lefer 1997 evenly-spaced placement = evenly-spaced iso-contours of ψ; the streamlines of a divergence-free flow v = ∇⊥ψ ARE ψ's level sets — Bridson 2007). Each line undulates + interweaves, DOMAIN-WARPED by the shared curlFBM operator, while a monotone ramp keeps the lines evenly spaced and never-crossing by construction. The dots drift slowly ALONG their own streamline; the cursor bends the whole field as a smooth gaussian domain-push (no snap, no vortex chaos) via usePointerVelocityField (velocity AND acceleration/burst). ONE fullscreen-fragment pass — WebGPU-first with a byte-identical WebGL2 fallback (no compute particles, no additive-trail flood, no white-out possible). ONE GL context — the one-GL-per-route budget held. Toggle the calm register or the IMG_1836 ocean skin (teal dots on deep navy — a demo preset; the library default stays warm-cream)."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch :model-value="useCalm" @update:model-value="onToggleCalm" />
                    <span class="text-sm">calm register (fewer, slower streamlines)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch :model-value="useOcean" @update:model-value="onToggleOcean" />
                    <span class="text-sm">ocean skin (IMG_1836 teal-on-navy — demo preset)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (cursor bends the streamlines)</span>
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
                the substrate paints ONE deterministic static frame and parks — the streamlines
                hold their pose, the cursor bend inert. The streamlines are the iso-contours of
                <code class="font-mono text-xs">sampleStreamField</code> (the ONE math source both
                the WGSL and GLSL fragments transcribe); the dots bead at the crossings with a
                drifting transverse bead-line, so they flow ALONG their own line — never a chaotic
                per-particle flicker.
            </p>
        </StorySection>
    </StoryPage>
</template>
