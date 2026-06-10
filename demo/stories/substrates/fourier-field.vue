<script setup lang="ts">
// FourierField — a Fourier epicycle field on a Canvas2D surface, the sibling
// render-background to Aurora and GooBlob. A seeded elliptic spectrum
// reconstructs a slow closed curve via the inverse DFT; a fading comet trail
// chases the head, and in the `hero` preset the nested epicycle circles draw
// underneath in a harmonious second hue. It composes the useCanvas2D substrate,
// so it inherits the offscreen / tab-hidden / reduced-motion freeze for free.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { FourierField } from "../../../src/components/custom/fourier-field";
import { defaultBlobColorResolver } from "../../../src/composables/color";

// The injected color seam — the same shape GooBlob and Aurora use. A var() token
// resolves against the host's color-scheme and re-resolves on a dark flip, so
// the field retints with the theme.
const color = ref("var(--viz-fourier)");
const colorPresets = [
    { label: "Fourier red", value: "var(--viz-fourier)" },
    { label: "Indigo", value: "oklch(0.6 0.16 265)" },
    { label: "Teal", value: "oklch(0.68 0.12 195)" },
    { label: "Amber", value: "oklch(0.78 0.14 70)" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="Two presets — one engine"
            blurb="The two variants are whole configurations, not recolours of one curve. The hero
                preset draws a few big phasors with the nested epicycle circles showing and a warm
                trail; the final preset draws a denser elliptic spectrum with the epicycles hidden.
                The hue always comes from the consumer's colour."
        >
            <ShowcaseFrame pad="none" class="grid gap-4 sm:grid-cols-2">
                <figure class="flex flex-col gap-2">
                    <div class="relative aspect-[4/3] overflow-hidden rounded-card border border-border/40">
                        <FourierField
                            variant="hero"
                            :color="color"
                            :color-resolver="defaultBlobColorResolver"
                            seed="story-hero"
                        />
                    </div>
                    <figcaption class="text-mono-caption text-muted-foreground">hero — epicycles on</figcaption>
                </figure>
                <figure class="flex flex-col gap-2">
                    <div class="relative aspect-[4/3] overflow-hidden rounded-card border border-border/40">
                        <FourierField
                            variant="final"
                            :color="color"
                            :color-resolver="defaultBlobColorResolver"
                            seed="story-final"
                        />
                    </div>
                    <figcaption class="text-mono-caption text-muted-foreground">final — denser, epicycles off</figcaption>
                </figure>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Injected color"
            blurb="Pick a hue — the field re-resolves the color through the same injected resolver
                seam (defaultBlobColorResolver). A var() token, an oklch() string, or a hex all
                resolve; a var() token also re-resolves on a dark-mode toggle."
        >
            <ShowcaseFrame class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="p in colorPresets"
                        :key="p.value"
                        class="btn-press rounded-pill border px-3 py-1 text-sm"
                        :class="{ 'bg-primary text-primary-foreground': color === p.value }"
                        @click="color = p.value"
                    >
                        {{ p.label }}
                    </button>
                </div>
                <div class="relative aspect-[16/6] overflow-hidden rounded-card border border-border/40">
                    <FourierField
                        variant="hero"
                        :color="color"
                        :color-resolver="defaultBlobColorResolver"
                        seed="story-color"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Freeze — the capture lever"
            blurb="freeze paints ONE static deterministic best-frame and never animates — the
                lever for a thumbnail, a print, or a poster capture where a moving field is not
                wanted. It also inherits the substrate's automatic freeze under
                prefers-reduced-motion and when scrolled offscreen."
        >
            <ShowcaseFrame pad="none">
                <div class="relative aspect-[16/6] overflow-hidden rounded-card border border-border/40">
                    <FourierField
                        variant="final"
                        :color="color"
                        :color-resolver="defaultBlobColorResolver"
                        seed="story-frozen"
                        freeze
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
