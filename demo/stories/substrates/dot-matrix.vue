<script setup lang="ts">
// DotMatrix — the WebGPU-first Fibonacci phyllotaxis dot-SPHERE studio (the Claude
// co-work "fine-dot spheres on dark" reference; F9.R5 BG.W-DOTMATRIX-STABLE). The DEFAULT
// is the CALM warm-cream library identity — ONE slowly-rotating globe of fine dots on a
// depth-shaded translucent shell over a transparent ground (the glass card shows through),
// gently pointer-aware with NO flash (the flick glow is LOCAL + slew-limited). The ACTUAL
// reference (subtle mono-warm-white TWO globes on near-black) toggles beside it as a
// non-default named preset (presets-in-consumers; BC.W-TEAL-NAVY-PURGE — teal-on-navy GONE).
import { computed, reactive, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Switch } from "@glass/components/ui/switch";
import { Label } from "@glass/components/ui/label";
import {
    DotMatrix,
    type DotMatrixConfig,
} from "@glass/components/custom/dot-matrix";
import { DOT_MATRIX_PRESET_REFERENCE, DOT_MATRIX_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a toggle is a clean reset, the library default). The DEFAULT is the CALM warm-cream globe;
// the toggle switches to the Claude-cowork REFERENCE two-globe near-black composition.
const useReference = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<DotMatrixConfig>({ ...DOT_MATRIX_PRESET_WARM, interactive: true });

// Switch the whole config between the calm single-globe default and the Claude-cowork
// REFERENCE two-globe near-black composition (both calm depth-shaded spheres — no flash).
function applyPreset(reference: boolean): void {
    const src = reference ? DOT_MATRIX_PRESET_REFERENCE : DOT_MATRIX_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    config.interactive = interactive.value;
}

const liveConfig = computed<DotMatrixConfig>(() => ({ ...config }));

function onTogglePreset(v: boolean): void {
    useReference.value = v;
    applyPreset(v);
}

// Toggle the pointer interaction (the gentle cursor dimple + the LOCAL slew-limited flick glow).
function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    config.interactive = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot matrix"
            label="fine-dot sphere · phyllotaxis · calm slow spin"
            blurb="A CALM globe of fine warm-cream dots laid on a sphere SURFACE — the even sunflower phyllotaxis lattice (the golden-angle spiral, no pole-pinch or banded rings; Martin Roberts / extremelearning, arXiv 0912.4540), depth-shaded into a translucent dot-SHELL (the near hemisphere brighter + larger, the rim/far side fading to a whisper) and slowly rotating on a gently tilted axis. Stop the spin and it STILL reads as a sphere from the depth-shading alone. It is GENTLY pointer-aware — a soft surface dimple where the cursor rests + a LOCAL decaying glow on a flick, slew-limited so it NEVER flashes the whole globe. Toggle the Claude-cowork REFERENCE composition (subtle mono-warm-white TWO globes on near-black). WebGPU-FIRST: the render pass draws instanced billboard quads + the crisp fwidth SDF circle fragment; a WebGL2 instanced-billboard fallback draws the SAME dots (born-GPU — no Canvas2D). ONE GL context — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useReference"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">Claude-cowork reference (two-globe on near-black; off = single warm globe)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (gentle cursor dimple + local flick glow)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused</span>
                </Label>
            </div>

            <ShowcaseFrame tier="field" pad="none">
                <div class="relative h-[460px] w-full overflow-hidden rounded-card">
                    <DotMatrix
                        :config="liveConfig"
                        v-model:paused="paused"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Shipped <code class="font-mono text-xs">@mkbabb/glass-ui/dot-matrix</code>.
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the globe freezes
                mid-rotation, crisp + held. The sphere read comes from the depth-fade
                (<code class="font-mono text-xs">opacity = 0.15 + 0.85·facing</code>,
                <code class="font-mono text-xs">size = 0.6 + 0.4·facing</code>), not the
                spin — the near hemisphere lit, the rim + far side fading to a whisper.
            </p>
        </StorySection>
    </StoryPage>
</template>
