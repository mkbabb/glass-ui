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
import { ref, useTemplateRef } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useSpecularTracking, Button } from "../../../src/index";
// AZ.W-ADAPTIVE-AUTO Arm 2 — the DEMO exerciser for the sampled-luminance observer
// (path B: demo-private — the composable is OFF the public glass barrel, imported
// directly here as the content-glass DEMO mount that exercises the live sampling path;
// the binary consumer is the dock). It writes `--glass-backdrop-luma` + the bucket on a
// glass-card over the page's live Aurora substrate so the dynamic darken TRACKS the
// painted backdrop (the iOS-27 register). A demo mount is NOT a binary consumer (the
// W-PRUNE2 E4-3 own-story exclusion) — it exercises the composable, it does not by
// itself clear the public ≥2-binary bar.
import { useGlassBackdropLuminance } from "../../../src/composables/glass/useGlassBackdropLuminance";

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

// AZ.W-ADAPTIVE-AUTO Arm 2 — the live observer exerciser. A glass-card over the page's
// Aurora substrate samples the painted backdrop on the throttled (≤ 4 Hz) loop and
// writes `--glass-backdrop-luma` + the bucket on itself. `backgroundCanvas: ".aurora
// canvas"` points it at the StoryHero aurora `<canvas>` (the ANIMATED case); absent a
// canvas it falls back to the static stack-walk. The reactive `luma`/`bucket` refs are
// surfaced as a readout so the dynamic signal is visible.
const liveCardEl = useTemplateRef<HTMLElement>("liveCardEl");
const { luma: backdropLuma, bucket: backdropBucket } = useGlassBackdropLuminance(
    liveCardEl,
    { live: true, backgroundCanvas: () => document.querySelector("canvas") },
);

// BB.W-GLASS-ACCENT — the THIRD disjoint glass axis: the per-INSTANCE chromatic-rim
// tint. Each swatch sets `--glass-accent: <data-hue>; --glass-accent-strength: <N%>`
// per-INSTANCE (inline :style) — the §F1 data-keyed colored hover made a ONE-LINE
// seam, NOT a hand-threaded border-color + inline catch-light per surface. The data
// hues are the demo's OWN palette (presets-in-consumers — the library token default
// is the NEUTRAL transparent identity; a consumer's DATA hue never enters the lib).
// The accent tints the RIM (silhouette edge) + the ::before catch-light glint with
// the datum's color; an UNSET surface beside it stays byte-identical warm-cream glass.
const accentSamples = [
    { label: "series · rose", hue: "oklch(0.68 0.19 18)" },
    { label: "series · amber", hue: "oklch(0.78 0.16 75)" },
    { label: "series · teal", hue: "oklch(0.72 0.13 195)" },
    { label: "series · violet", hue: "oklch(0.62 0.2 295)" },
] as const;
// the per-instance accent strength ceiling — a rim WHISPER, not a flooded plate.
const ACCENT_STRENGTH = "48%";
</script>

<template>
    <StoryPage>
        <!-- The Aurora substrate is staged FULL-BLEED by the page chassis (the
             `background: aurora` + `hero: true` manifest row → StoryHero's
             full-bleed mode), so every glass plate below reads against a live
             bright painterly field — the whole point of this page (B13). -->
        <StorySection
            label="unified material — moving specular + rim across the band"
            blurb="Hover any plate: every rung + card reads the SAME pointer-anchored catch-light (::before) from ONE useSpecularTracking seam + the --glass-edge-light rim from ONE .glass-material mixin — no per-component opt-in. The gleam follows the cursor and settles back on leave."
        >
            <ShowcaseFrame pad="lg" tier="field">
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
            label="dynamic backdrop luminance — the iOS-27 sampled observer (AZ Arm 2)"
            blurb="useGlassBackdropLuminance samples the painted Aurora backdrop under this card on a throttled ≤4 Hz loop and writes --glass-backdrop-luma + the --glass-backdrop: light|dark bucket on it, so the adaptive darken TRACKS the live field (not a static light/dark bucket). The dock wires the same observer ON by default. PRM-gated: under reduce the loop collapses to one mount sample."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap items-center gap-6">
                    <div
                        ref="liveCardEl"
                        data-glass-sample="live"
                        class="glass-card flex h-28 w-56 flex-col items-center justify-center gap-1 rounded-card text-sm font-medium"
                    >
                        <span>glass-card · live sample</span>
                        <span class="text-mono-caption text-muted-foreground">
                            luma {{ backdropLuma === null ? "—" : backdropLuma.toFixed(3) }}
                            · {{ backdropBucket ?? "—" }}
                        </span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="subtle rim — the --glass-edge-light contrast device"
            blurb="The rim is a deliberately sub-perceptual 0.75px 18%-α white inset ring (W09 'subtle by design'). Side-by-side: a plate carrying the rim vs the same plate with --glass-edge-light suppressed, over a dark sample where the 0.75px ring reads as a feature, not a missing one."
        >
            <ShowcaseFrame pad="lg" tier="field">
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
            label="glass-accent — the per-instance chromatic rim+glint axis (BB)"
            blurb="The THIRD disjoint glass axis (level · tint · accent). A consumer DATA hue OKLab-tints the surface's RIM (silhouette edge) + the ::before catch-light glint — set per-INSTANCE (--glass-accent: <hue>; --glass-accent-strength: <N%>), the §F1 data-keyed colored hover made a one-line seam. DISTINCT-not-fork of W55's --glass-tint-source (the whole-plate legibility darken): the accent rides the rim+glint only, never the plate background. Each swatch carries its own series hue; the UNSET plate beside them stays byte-identical warm-cream glass."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <!-- consumer #1 — the data-hue swatch GRID: each cell sets its OWN
                     --glass-accent per-instance, so each rim+glint glows a DISTINCT
                     series hue (the per-instance proof). -->
                <div class="flex flex-wrap gap-6">
                    <div
                        v-for="s in accentSamples"
                        :key="s.label"
                        class="glass-floating flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card text-sm font-medium"
                        data-accent-swatch
                        :data-accent-hue="s.hue"
                        :style="{
                            '--glass-accent': s.hue,
                            '--glass-accent-strength': ACCENT_STRENGTH,
                        }"
                        :data-specular-plate="true"
                        @pointermove="onPointerMove"
                    >
                        <span>{{ s.label }}</span>
                        <span class="text-mono-caption text-muted-foreground"
                            >--glass-accent</span
                        >
                    </div>
                </div>
                <!-- consumer #2 — the Atlas-shaped data-hue surface (a HoverCard-
                     shaped accented plate) BESIDE the unset neutral plate: the
                     accented one glows the datum hue at rim + glint, the unset one
                     reads exactly today's warm-cream glass (the byte-identical
                     neutral fallback, the on/off contrast device). -->
                <div class="mt-6 flex flex-wrap gap-6">
                    <div
                        class="glass-floating flex h-28 w-56 flex-col items-center justify-center gap-1 rounded-card text-sm font-medium"
                        data-accent-device="on"
                        :style="{
                            '--glass-accent': 'oklch(0.62 0.2 295)',
                            '--glass-accent-strength': ACCENT_STRENGTH,
                        }"
                    >
                        <span>accent ON</span>
                        <span class="text-mono-caption text-muted-foreground"
                            >data hue · violet</span
                        >
                    </div>
                    <div
                        class="glass-floating flex h-28 w-56 flex-col items-center justify-center gap-1 rounded-card text-sm font-medium"
                        data-accent-device="off"
                    >
                        <span>accent OFF</span>
                        <span class="text-mono-caption text-muted-foreground"
                            >unset · warm-cream</span
                        >
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="SOTA fold — #glass-refract squircle edge-lens (Chromium PE)"
            blurb="A .glass-material.glass-lens panel composes the shipped #glass-refract squircle-bevel SVG filter behind @supports(backdrop-filter:url()): the backdrop BENDS + concentrates at the rim (edge-lensing), the press deepens the lens-swell on --glass-refract. Non-Chromium engines paint the blur base alone."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating glass-lens flex h-28 w-44 items-center justify-center rounded-card text-sm font-medium"
                    >
                        .glass-lens
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
            <ShowcaseFrame pad="lg" tier="field">
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
            <ShowcaseFrame pad="lg" tier="field">
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

        <StorySection
            label="The brand-metal triad — gold · silver · bronze (BB.W-METAL-SHIMMER)"
            blurb="The three brand metals on the W-NO-GRAY metal exception: gold (warm-yellow ~84°), silver (cool-steel ~255°), bronze (warm-brown ~54°). The text-clip register (.metal-{gold,silver,bronze}) sweeps the slow --duration-metal (6s) patina pass off the ONE metal-PARAMETERIZED metal-shimmer-sweep keyframe; the swept metallic RIM (.metal-*-border, the §N6 selected-item-border consumer) and the prismatic .metal-rainbow-rim (composing W-GLASS-ACCENT's rim seam) read on a glass plate. PRM=static — the metal READS as metal without the slide."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <!-- The medal triad — the text-clip register (consumer #1). -->
                <div class="flex flex-wrap items-center gap-8" data-metal-triad>
                    <span class="metal-gold text-display-2 font-black" data-metal="gold"
                        >Au</span
                    >
                    <span class="metal-silver text-display-2 font-black" data-metal="silver"
                        >Ag</span
                    >
                    <span class="metal-bronze text-display-2 font-black" data-metal="bronze"
                        >Bz</span
                    >
                </div>
                <!-- The swept metallic RIM (.metal-*-border) + the prismatic rainbow
                     rim — the badge/§N6-border register (consumer #2). -->
                <div class="mt-6 flex flex-wrap items-center gap-6">
                    <div
                        class="metal-gold-border flex h-20 w-32 items-center justify-center rounded-card text-sm font-medium"
                        data-metal-border="gold"
                    >
                        gold rim
                    </div>
                    <div
                        class="metal-bronze-border flex h-20 w-32 items-center justify-center rounded-card text-sm font-medium"
                        data-metal-border="bronze"
                    >
                        bronze rim
                    </div>
                    <div
                        class="glass-floating metal-rainbow-rim flex h-20 w-32 items-center justify-center rounded-card text-sm font-medium"
                        data-metal-rainbow
                    >
                        rainbow rim
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
