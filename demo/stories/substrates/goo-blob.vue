<script setup lang="ts">
// AU.W7 — the goo-blob + watercolor-dot demo story (DEC-AT-5: the blob's 2nd
// consumer — value.js K.W3 is the firm #1, this demo-story is the honest #2; the
// injected ColorResolver seam is the proof it is not value.js-coupled).
//
// AX.W16 — the TIER CASCADE made explicit + the WCAG-2.2.2 pause seam wired live:
//   1. the 4-color GL grid (BLOB_CONFIG_DEFAULTS — the lit contained droplet; ALSO
//      the π-lane blob-render fixture, the var(--primary)-dark-wash both-mode guard),
//   2. the ONE interactive GL HERO + a live <DockBackgroundToggle> pause seam
//      (replacing the prior 5th "Live color" GL mount — bounding the per-page WebGL
//      context cap, ~8 in Chromium; commit 9427536's incident class),
//   3. the WatercolorDot STATIC register (CSS/SVG, zero GL context) — the deliberate
//      sibling for ambient/decorative thumbnails that never need a per-pixel GL field.
// Reserve GooBlob for the interactive/lit register; route the static one to
// WatercolorDot so the canonical demo does not itself exhaust the cap.
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

// AX.W16 — the interactive hero + its declarative v-model:paused pause seam. The
// <DockBackgroundToggle> reflects + drives `heroPaused`; `v-model:paused` on the blob
// parks/restarts the render loop (the WCAG-2.2.2 Level-A control, reachable by ALL
// users). Either the imperative ref or the prop could drive it — the prop is the
// canonical declarative shape, so this story uses it.
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
            label="Pause seam (WCAG 2.2.2)"
            blurb="The interactive hero wired to a DockBackgroundToggle via v-model:paused.
                Click the control to PAUSE the render loop (the membrane stops warping, the
                satellites stop orbiting) and again to RESUME — the Level-A pause control any
                user can reach (NOT gated behind prefers-reduced-motion). One GL context."
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
