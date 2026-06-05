<script setup lang="ts">
// AU.W7 — the goo-blob + watercolor-dot demo story (DEC-AT-5: the blob's 2nd
// consumer — value.js K.W3 is the firm #1, this demo-story is the honest #2; the
// injected ColorResolver seam is the proof it is not value.js-coupled).
//
// The story IS a consumer of the published primitives: it mounts <GooBlob> with
// the opt-in `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` (here the
// in-repo `src/composables/color`), and a row of <WatercolorDot> swatches — the
// two AU.W7 blob primitives over the deck's token palette.
import { ref } from "vue";
import StoryPage from "./StoryPage.vue";
import StorySection from "./StorySection.vue";
import ShowcaseFrame from "./ShowcaseFrame.vue";
import { GooBlob } from "../../src/components/custom/goo-blob";
import { WatercolorDot } from "../../src/components/custom/watercolor-dot";
import { defaultBlobColorResolver } from "../../src/composables/color";

const gooColor = ref("var(--primary)");
const blobColors = [
    "var(--primary)",
    "oklch(0.62 0.19 25)",
    "oklch(0.7 0.15 250)",
    "oklch(0.78 0.16 150)",
];
const dotColors = ["#cc0000", "oklch(0.7 0.15 250)", "oklch(0.82 0.13 90)", "#2b6cb0"];
</script>

<template>
    <StoryPage>
        <StorySection
            label="GooBlob"
            blurb="A WebGL2 metaball field on the shared useWebGLCanvas substrate. Color
                resolves through an INJECTED resolver — here defaultBlobColorResolver from
                @mkbabb/glass-ui/color (a no-resolver mount throws by that name)."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                    v-for="c in blobColors"
                    :key="c"
                    class="relative aspect-square overflow-hidden rounded-card"
                >
                    <GooBlob :color="c" :color-resolver="defaultBlobColorResolver" :seed="c" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Live color"
            blurb="The blob repaints on a color change while the demand-driven loop is parked."
        >
            <ShowcaseFrame class="flex items-center gap-4">
                <div class="relative aspect-square w-40 overflow-hidden rounded-card">
                    <GooBlob :color="gooColor" :color-resolver="defaultBlobColorResolver" />
                </div>
                <input v-model="gooColor" class="input-pill" aria-label="Blob base color" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="WatercolorDot"
            blurb="A CSS/SVG pastel swatch (no WebGL) — a deterministic seeded border-radius
                morph with an internalized turbulence filter (zero-wiring, per-instance namespaced)."
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
