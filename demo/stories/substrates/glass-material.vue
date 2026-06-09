<script setup lang="ts">
// The unified glass-material matrix. Every named band surface (the five ladder
// rungs + card + the floating/overlay registers Dialog/Sheet/Popover compose)
// reads the SAME catch-light + rim from one `.glass-material` mixin; the four
// SOTA folds (refraction, squircle, chromatic fringe, adaptive tint) ride that
// grammar behind their `@supports`/token gates. The matrix is staged over a
// shipped high-frequency Aurora backdrop so the specular + rim + folds read
// against busy color (glass does not read on flat cream).
//
// This story BINDS the shipped seams it narrates: the moving catch-light is
// composed off `useSpecularTracking` (the DRY pointer-write seam), the adaptive
// tint sets BOTH `--glass-tint-source` + a non-zero `--glass-tint-strength` so
// the `color-mix(in oklab, …)` actually bites, the squircle reads on the
// dialog/sheet register (cards stay round by policy), and the deliberately-subtle
// rim is shown against an on/off contrast device.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useSpecularTracking, Button } from "../../../src/index";
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/subpaths/aurora";

// The named band surfaces — the five ladder rungs + the card register. Each is
// a bare `.glass-<rung>` plate (the mixin supplies the `::before` specular + the
// rim); the floating/overlay rungs are the substrate Dialog/Sheet/Popover ride.
const rungs = ["wash", "quiet", "resting", "floating", "overlay"] as const;

// The shipped DRY moving-specular seam. ONE instance drives the whole
// headline band — `specularStyle` (the `--mouse-x/--mouse-y` host write) +
// `onPointerMove` (the pointer-position write) bind across every plate, so the
// "pointer-anchored catch-light" is LIVE on hover. PRM-safe by construction (the
// seam skips the write under `prefers-reduced-motion: reduce`; the recipe pins
// the centred 50% fallback). NO hand-rolled --mouse-x math, NO per-plate copy.
const { specularStyle, onPointerMove } = useSpecularTracking();

// A consumer-provided dominant backdrop color drives the adaptive tint (W23). The
// tint BITES only when BOTH knobs are set — `--glass-tint-source` (the sampled
// hue) AND a non-zero `--glass-tint-strength` (the ≤30% house ceiling). "none"
// resolves strength 0% (the genuine zero-delta default); the aurora samples
// resolve a non-zero strength so the `color-mix(in oklab, …)` actually biases.
const tintSamples = [
    { label: "none (warm-white)", source: "", strength: "0%" },
    { label: "aurora rose", source: "oklch(0.7 0.12 20)", strength: "22%" },
    { label: "aurora teal", source: "oklch(0.72 0.1 200)", strength: "22%" },
] as const;
const tint = ref<(typeof tintSamples)[number]>(tintSamples[0]);
</script>

<template>
    <StoryPage>
        <!-- The shipped Aurora substrate behind the whole matrix. -->
        <Aurora
            :config="DEFAULT_AURORA_CONFIG"
            class="pointer-events-none fixed inset-0 -z-10"
        />

        <StorySection
            label="unified material — moving specular + rim across the band"
            blurb="Hover any plate: every rung + card reads the SAME pointer-anchored catch-light (::before) from ONE useSpecularTracking seam + the --glass-edge-light rim from ONE .glass-material mixin — no per-component opt-in. The gleam follows the cursor and settles back on leave."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-6">
                    <div
                        v-for="rung in rungs"
                        :key="rung"
                        :class="`glass-${rung}`"
                        class="flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                        data-specular-plate
                        :style="specularStyle"
                        @pointermove="onPointerMove"
                    >
                        glass-{{ rung }}
                    </div>
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-sm font-medium"
                        data-specular-plate
                        :style="specularStyle"
                        @pointermove="onPointerMove"
                    >
                        glass-card
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="subtle rim — the --glass-edge-light contrast device"
            blurb="The rim is a deliberately sub-perceptual 0.75px 18%-α white inset ring (W09 'subtle by design'). Side-by-side: a plate carrying the rim vs the same plate with --glass-edge-light suppressed, over a dark sample where the 0.75px ring reads as a feature, not a missing one."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-resting flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card bg-foreground/[0.18] text-sm font-medium"
                        data-rim-device="on"
                    >
                        <span>rim ON</span>
                        <span class="text-mono-caption text-muted-foreground"
                            >--glass-edge-light</span
                        >
                    </div>
                    <div
                        class="glass-resting flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card bg-foreground/[0.18] text-sm font-medium"
                        data-rim-device="off"
                        :style="{ '--glass-edge-light': '0 0 0 0 transparent' }"
                    >
                        <span>rim OFF</span>
                        <span class="text-mono-caption text-muted-foreground"
                            >suppressed</span
                        >
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
            blurb="@supports(corner-shape:superellipse(2)) paints the iOS-26 superellipse corner on the dialog/sheet register where it reads (W56 re-home). Cards/pills stay ROUND by policy — the superellipse is imperceptible at a 16px card radius. The border-radius round is the un-gated cross-engine fallback."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <!-- The dialog register — `.glass-floating.rounded-dialog` is
                         exactly the compound the DialogContent surface composes, so
                         this is the live squircle surface W56 ships (a real
                         superellipse on a supporting engine, round elsewhere). -->
                    <div
                        class="glass-floating rounded-dialog flex h-28 w-44 items-center justify-center text-sm font-medium"
                    >
                        squircle (dialog register)
                    </div>
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-sm font-medium"
                    >
                        round (.glass-card)
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="SOTA fold — chromatic edge dispersion + adaptive tint"
            blurb="A warm/cool oklab fringe rides the rim under prefers-reduced-transparency:no-preference; the tint sets BOTH --glass-tint-source AND a non-zero --glass-tint-strength (≤30%) so the color-mix(in oklab,…) actually biases the surface toward the sampled backdrop hue (default = warm-white zero delta)."
        >
            <ShowcaseFrame pad="lg">
                <div class="mb-4 flex flex-wrap items-center gap-2">
                    <span class="text-mono-caption text-muted-foreground"
                        >tint sample:</span
                    >
                    <Button
                        v-for="s in tintSamples"
                        :key="s.label"
                        variant="glass"
                        size="sm"
                        :data-tint-sample="s.source"
                        :aria-pressed="tint.label === s.label"
                        @click="tint = s"
                    >
                        {{ s.label }}
                    </Button>
                </div>
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating glass-chromatic flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                        data-tint-plate
                        :style="{
                            '--glass-tint-source': tint.source || undefined,
                            '--glass-tint-strength': tint.strength,
                        }"
                    >
                        chromatic + tint
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
