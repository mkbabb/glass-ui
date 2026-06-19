<script setup lang="ts">
// DotMatrix — the WebGPU-first Fibonacci phyllotaxis dot-SPHERE studio (the Claude
// co-work "fine-dot spheres on dark" reference). The DEFAULT is the warm-cream library
// identity (ONE calm warm-cream globe of fine dots over a transparent ground — the glass
// card shows through). The ACTUAL reference (subtle mono-warm-white TWO globes on
// near-black) toggles beside it as a non-default named preset (presets-in-consumers;
// BC.W-TEAL-NAVY-PURGE — the teal-on-navy is GONE).
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import {
    DotMatrix,
    type DotMatrixConfig,
} from "../../../src/components/custom/dot-matrix";
import { DOT_MATRIX_PRESET_REFERENCE, DOT_MATRIX_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface;
// a toggle is a clean reset, the library default). The DEFAULT is warm-cream.
const useReference = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<DotMatrixConfig>({ ...DOT_MATRIX_PRESET_WARM, interactive: true });

// Switch the whole config between the mono-warm-white-on-near-black TWO-globe reference and
// the warm-cream identity (presets-in-consumers — the library default is warm-cream).
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

// Toggle the pointer interaction (the parallax + repel-dimple + flick-accel bloom).
function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    config.interactive = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Dot matrix"
            label="Fibonacci phyllotaxis dot-sphere · depth-shaded"
            blurb="A calm globe of fine warm-cream dots laid on a sphere SURFACE — unmistakably a 3D sphere built from dots, the dots crowding the silhouette rim, the near hemisphere brighter + slightly larger while the rim and far side fade toward near-invisible. The dots sit at an even, fine spacing across the whole surface (the Fibonacci phyllotaxis golden-angle lattice — no pole-pinching, no banded rings; Martin Roberts / extremelearning, arXiv 0912.4540). The shape is painted by BRIGHTNESS + DEPTH, not motion: stop the spin and it STILL reads as a translucent dot-shell from the depth-shading alone (the Will-Howard / COBE / Stripe lineage). It spins slowly on a gently tilted axis — dignified, hero-grade, nothing darts. WebGPU-FIRST: the render pass draws instanced billboard quads + the crisp fwidth SDF circle fragment; a WebGL2 instanced-billboard fallback draws the SAME dots where WebGPU is absent (born-GPU — no Canvas2D). Drag the cursor — the globe subtly tracks it (a parallax depth illusion), a soft dimple pushes through the dot-shell near the cursor, and a flick fires a brief brightness bloom (the accel burst). ONE GL context (the sphere's own) — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useReference"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">two-globe mono-on-near-black reference (off = warm-cream identity default)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (parallax + dimple + flick bloom)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused (WCAG 2.2.2)</span>
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
