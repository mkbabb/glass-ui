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
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { WatercolorDot } from "../../../src/components/custom/watercolor-dot";
import { defaultBlobColorResolver } from "../../../src/composables/color";

const gooColor = ref("var(--primary)");
// AX.W16 F2 — the multi-instance WebGL-context cap (Chromium ~8-16 live contexts/page;
// commit 9427536's live incident). The GL `GooBlob` is reserved for the FEW genuine
// hero instances; the STATIC color register routes to the `WatercolorDot` CSS/SVG
// sibling (ZERO GL context — the deliberate pair). Two GL heroes here: the
// var(--primary) dark-wash guard (the rendered-pixel π fixture's cell #0) + one accent.
const blobColors = ["var(--primary)", "oklch(0.62 0.19 25)"];
// The wider color showcase is WatercolorDots — the static/ambient tier, no GL context.
const dotColors = [
    "var(--primary)",
    "oklch(0.62 0.19 25)",
    "oklch(0.7 0.15 250)",
    "oklch(0.78 0.16 150)",
    "oklch(0.82 0.13 90)",
    "#2b6cb0",
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="GooBlob — the WebGL2 hero tier"
            blurb="A WebGL2 metaball field on the shared useWebGLCanvas substrate. Color
                resolves through an INJECTED resolver — here defaultBlobColorResolver from
                @mkbabb/glass-ui/color (a no-resolver mount throws by that name). The GL
                blob is reserved for the FEW genuine hero instances — Chromium caps ~8-16
                live WebGL contexts/page, so the static color register below uses the
                WatercolorDot CSS/SVG sibling (zero GL context). Tier cascade: WebGL2 SDF
                hero → WatercolorDot ambient → static poster."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4">
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
            label="Live color"
            blurb="The blob repaints on a color change while the demand-driven loop is parked."
        >
            <ShowcaseFrame class="flex items-center gap-4">
                <div class="relative aspect-square w-40 overflow-hidden rounded-card">
                    <GooBlob
                        :color="gooColor"
                        :color-resolver="defaultBlobColorResolver"
                        :config="BLOB_CONFIG_DEFAULTS"
                    />
                </div>
                <input v-model="gooColor" class="input-pill" aria-label="Blob base color" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="WatercolorDot — the static/ambient color register"
            blurb="A CSS/SVG pastel swatch (no WebGL) — a deterministic seeded border-radius
                morph with an internalized turbulence filter (zero-wiring, per-instance
                namespaced). This is the multi-instance STATIC register: a decorative
                thumbnail does not need its own GL context, so the wide color showcase is
                WatercolorDots — they read identically to the GL blobs at decorative scale
                and never exhaust the per-page WebGL context cap (AX.W16 F2)."
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
