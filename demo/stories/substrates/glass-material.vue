<script setup lang="ts">
// The unified glass-material matrix. Every named band surface
// (the five ladder rungs + card + the floating/overlay registers Dialog/Sheet/
// Popover compose) reads the SAME catch-light + rim from one `.glass-material`
// mixin; the four SOTA folds (refraction, squircle, chromatic fringe, adaptive
// tint) ride that grammar behind their `@supports`/token gates. The matrix is
// staged over a shipped high-frequency Aurora backdrop so the specular + rim +
// folds read against busy color (glass does not read on flat cream).
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/subpaths/aurora";

// The named band surfaces — the five ladder rungs + the card register. Each is
// a bare `.glass-<rung>` plate (the mixin supplies the `::before` specular + the
// rim); the floating/overlay rungs are the substrate Dialog/Sheet/Popover ride.
const rungs = ["wash", "quiet", "resting", "floating", "overlay"] as const;

// A consumer-provided dominant backdrop color drives the adaptive tint (W23).
// Default unset → warm-white zero delta; the slider samples a few aurora hues.
const tintSource = ref<string>("");
const tintSamples = [
    { label: "none (warm-white)", value: "" },
    { label: "aurora rose", value: "oklch(0.7 0.12 20)" },
    { label: "aurora teal", value: "oklch(0.72 0.1 200)" },
];
</script>

<template>
    <StoryPage>
        <!-- The shipped Aurora substrate behind the whole matrix. -->
        <Aurora
            :config="DEFAULT_AURORA_CONFIG"
            class="pointer-events-none fixed inset-0 -z-10"
        />

        <StorySection
            label="unified material — specular + rim across the band"
            blurb="Every rung + card reads the same pointer-anchored catch-light (::before) and the --glass-edge-light rim from ONE .glass-material mixin — no per-component opt-in."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-6">
                    <div
                        v-for="rung in rungs"
                        :key="rung"
                        :class="`glass-${rung}`"
                        class="flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                    >
                        glass-{{ rung }}
                    </div>
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-sm font-medium"
                    >
                        glass-card
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="SOTA fold — #glass-refract convex lens (Chromium PE)"
            blurb="A .glass-material.glass-refract panel composes the shipped #glass-refract SVG filter behind @supports(backdrop-filter:url()). Non-Chromium engines paint the blur base alone."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating glass-refract flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                    >
                        .glass-refract
                    </div>
                    <div
                        class="glass-floating flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                    >
                        blur base (no refract)
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="SOTA fold — corner-shape: squircle (Chrome 139+ PE)"
            blurb="@supports(corner-shape:squircle) paints the iOS-26 superellipse corner; the border-radius round is the un-gated fallback on every other engine."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-sm font-medium"
                    >
                        squircle (.glass-card)
                    </div>
                    <div
                        class="glass-btn !h-12 !w-44 text-sm font-medium"
                    >
                        squircle (.glass-btn)
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="SOTA fold — chromatic edge dispersion + adaptive tint"
            blurb="A warm/cool oklab fringe rides the rim under prefers-reduced-transparency:no-preference; --glass-tint-source tints the surface ≤30% toward a sampled backdrop color (default = warm-white zero delta)."
        >
            <ShowcaseFrame pad="lg">
                <div class="mb-4 flex flex-wrap items-center gap-2">
                    <span class="text-mono-caption text-muted-foreground"
                        >--glass-tint-source:</span
                    >
                    <button
                        v-for="s in tintSamples"
                        :key="s.label"
                        type="button"
                        class="glass-btn px-3 text-xs"
                        :aria-pressed="tintSource === s.value"
                        @click="tintSource = s.value"
                    >
                        {{ s.label }}
                    </button>
                </div>
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating glass-chromatic flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                        :style="
                            tintSource ? { '--glass-tint-source': tintSource } : {}
                        "
                    >
                        chromatic + tint
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
