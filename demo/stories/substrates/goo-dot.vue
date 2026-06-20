<script setup lang="ts">
// GooDotMatrix — the WebGPU-first goo+dot-matrix HYBRID studio (BC.W-VIZ-HYBRID). The
// merging metaball SDF FIELD rendered as a DOT MATRIX — a grid of warm-cream dots dense+big+
// bright inside the merged blob, sparse+small+dim at the rim. The DEFAULT is the warm-cream
// library identity (the field-driven dot over a transparent ground — the glass card shows
// through); the near-dark mono-warm-white dotted-tone register toggles beside it as a
// non-default named preset (presets-in-consumers; BC.W-TEAL-NAVY-PURGE — the teal-on-navy is
// GONE).
import { computed, reactive, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import {
    GooDotMatrix,
    type GooDotConfig,
    type GooDotVariant,
} from "../../../src/components/custom/goo-dot-matrix";
import { GOO_DOT_PRESET_REFERENCE, GOO_DOT_PRESET_WARM } from "./presets";

// The studio model — a live config the controls drive (commit-on-write — a single surface).
const useReference = ref(false);
const paused = ref(false);
const interactive = ref(true);

const config = reactive<GooDotConfig>({ ...GOO_DOT_PRESET_WARM, interactive: true });

const VARIANTS: GooDotVariant[] = ["dot-field", "dot-dither", "dot-lattice", "dot-sphere"];

// Switch the whole config between the near-dark mono-warm-white dotted-tone register and the
// warm-cream identity (presets-in-consumers — the library default is warm-cream).
function applyPreset(reference: boolean): void {
    const src = reference ? GOO_DOT_PRESET_REFERENCE : GOO_DOT_PRESET_WARM;
    Object.assign(config, JSON.parse(JSON.stringify(src)));
    config.interactive = interactive.value;
}

const liveConfig = computed<GooDotConfig>(() => ({ ...config }));

function onTogglePreset(v: boolean): void {
    useReference.value = v;
    applyPreset(v);
}

function onToggleInteractive(v: boolean): void {
    interactive.value = v;
    config.interactive = v;
}

function setVariant(v: GooDotVariant): void {
    config.variant = v;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Goo dot-matrix"
            label="Metaball SDF field · rendered as a dot matrix · the goo+dot HYBRID"
            blurb="The merging metaball reads as a FIELD OF DOTS that flow and merge — a regular grid of small warm-cream dots fills the card, and where the gooey blob is (its core, its satellites, the liquid neck stretching between them) the dots are DENSE, BIG, and BRIGHT; out at the rim and beyond they thin to small and dim, then vanish. As a satellite orbits in and meatballs into the body, the band of dots between them THICKENS into a connected bridge, then snaps back when it absorbs — the gooey form drawn entirely in dots. It re-uses two SOTA primitives the codebase already owns — the goo-blob SDF FIELD (the byte-untouched sceneDistG) + the dot-matrix RENDER — joined by ONE new idea: the dot-grid OUTPUT stage (v = thickness(sceneDistG(cellCenter)) drives the dot size + brightness; tixy.land applied to an SDF). WebGPU-FIRST: the dot-stamp fragment over the spliced field; a WebGL2 dot-stamp fallback runs the SAME field where WebGPU is absent (born-GPU — no Canvas2D). Drag the cursor — the whole dot-cloud leans toward it (the field lean), the dots near the cursor brighten + swell, and a fast flick fires a one-shot bloom (the accel burst). ONE GL context (the field self-stages) — the one-GL-per-route budget held."
        >
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex flex-wrap items-center gap-1.5">
                    <button
                        v-for="v in VARIANTS"
                        :key="v"
                        type="button"
                        class="rounded-button border px-2.5 py-1 text-xs font-mono"
                        :class="config.variant === v ? 'bg-card' : 'bg-transparent text-muted-foreground'"
                        @click="setVariant(v)"
                    >
                        {{ v }}
                    </button>
                </div>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="useReference"
                        @update:model-value="onTogglePreset"
                    />
                    <span class="text-sm">near-dark dotted-tone reference (off = warm-cream identity default)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch
                        :model-value="interactive"
                        @update:model-value="onToggleInteractive"
                    />
                    <span class="text-sm">interactive (field-lean + dot swell + flick bloom)</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="paused" />
                    <span class="text-sm">paused</span>
                </Label>
            </div>

            <ShowcaseFrame tier="field" pad="none">
                <div class="relative h-[460px] w-full overflow-hidden rounded-card">
                    <GooDotMatrix
                        :config="liveConfig"
                        v-model:paused="paused"
                        class="absolute inset-0"
                    />
                </div>
            </ShowcaseFrame>

            <p class="text-sm text-muted-foreground">
                Shipped <code class="font-mono text-xs">@mkbabb/glass-ui/goo-dot-matrix</code>.
                Under <code class="font-mono text-xs">prefers-reduced-motion: reduce</code>
                the substrate paints ONE static frame then parks — the dot field freezes
                mid-merge, the shape held + legible. The dot size + brightness read the field
                thickness (<code class="font-mono text-xs">v = thickness(sceneDistG(cell))</code>),
                so the dots are dense+big+bright inside the merged metaball and sparse+small+dim
                at the rim — the goo blob drawn as a dot matrix.
            </p>
        </StorySection>
    </StoryPage>
</template>
