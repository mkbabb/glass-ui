<script setup lang="ts">
// The goo-blob + watercolor-dot demo story. The blob takes an injected
// ColorResolver, so it is not coupled to any one color library.
//
// The tier cascade, made explicit, plus the live pause seam:
//   1. the 4-color GL grid (the lit contained droplet),
//   2. the one interactive GL hero + a live <DockBackgroundToggle> pause seam,
//   3. the WatercolorDot static register (CSS/SVG, zero GL context) — the
//      sibling for ambient/decorative thumbnails that never need a per-pixel
//      GL field.
// Reserve GooBlob for the interactive/lit register; route the static one to
// WatercolorDot so a page does not exhaust the browser's WebGL context cap.
import { ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { WatercolorDot } from "../../../src/components/custom/watercolor-dot";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
import { defaultBlobColorResolver } from "../../../src/composables/color";

// The 4-color BLOB_CONFIG_DEFAULTS grid (the π-lane fixture — first is var(--primary)).
const blobColors = [
    "var(--primary)",
    "oklch(0.62 0.19 25)",
    "oklch(0.7 0.15 250)",
    "oklch(0.78 0.16 150)",
];

// The interactive hero + its declarative v-model:paused pause seam. The
// <DockBackgroundToggle> reflects and drives `heroPaused`; `v-model:paused` on
// the blob parks and restarts the render loop, a pause control reachable by all
// users. Either the imperative ref or the prop could drive it — the prop is the
// declarative shape, so this story uses it.
const heroPaused = ref(false);

// The WatercolorDot static register — the CSS/SVG sibling for ambient swatches.
const dotColors = ["#cc0000", "oklch(0.7 0.15 250)", "oklch(0.82 0.13 90)", "#2b6cb0"];

// Belt-and-suspenders log so the demo proves the seam is live (the audit's "pause
// does nothing" → "pause freezes" delta).
watch(heroPaused, (p) => {
    if (typeof console !== "undefined") {
        // eslint-disable-next-line no-console
        console.debug(`[goo-blob demo] hero ${p ? "PAUSED" : "RESUMED"}`);
    }
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="GooBlob — the lit contained droplet"
            blurb="A WebGL2 metaball field on the shared useWebGLCanvas substrate. Color
                resolves through an INJECTED resolver — here defaultBlobColorResolver from
                @mkbabb/glass-ui/color (a no-resolver mount throws by that name). The default
                config is the lit warm-cream droplet, contained on all four sides."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                    v-for="c in blobColors"
                    :key="c"
                    class="relative aspect-square overflow-hidden rounded-card"
                >
                    <GooBlob
                        :color="c"
                        :color-resolver="defaultBlobColorResolver"
                        :config="BLOB_CONFIG_DEFAULTS"
                        :seed="c"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Pause seam"
            blurb="The interactive hero wired to a DockBackgroundToggle via v-model:paused.
                Click the control to pause the render loop (the membrane stops warping, the
                satellites stop orbiting) and again to resume — a pause control any user can
                reach. One GL context."
        >
            <ShowcaseFrame class="flex items-center gap-4">
                <div class="relative aspect-square w-40 overflow-hidden rounded-card">
                    <GooBlob
                        v-model:paused="heroPaused"
                        color="var(--primary)"
                        :color-resolver="defaultBlobColorResolver"
                        :config="BLOB_CONFIG_DEFAULTS"
                        seed="pause-hero"
                    />
                </div>
                <div class="flex items-center gap-3 text-sm">
                    <DockBackgroundToggle v-model:paused="heroPaused" />
                    <span class="tabular-nums opacity-70">
                        {{ heroPaused ? "paused" : "running" }}
                    </span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="WatercolorDot — the static register (zero GL)"
            blurb="A CSS/SVG pastel swatch (no WebGL context) — a deterministic seeded
                border-radius morph with an internalized turbulence filter (zero-wiring,
                per-instance namespaced). The deliberate sibling for ambient/decorative
                thumbnails: route the static register HERE so a grid never exhausts the
                per-page WebGL context cap (reserve GooBlob for the interactive/lit hero)."
        >
            <ShowcaseFrame class="flex flex-wrap items-center gap-4">
                <WatercolorDot
                    v-for="c in dotColors"
                    :key="c"
                    :color="c"
                    :seed="c"
                    animate
                    class="h-16 w-16"
                />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
