<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ArrowRight, Sparkles } from "lucide-vue-next";
import { computed, ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { Card, CardContent } from "../../../src/components/ui/card";
import {
    MetaballCanvas,
    isWebGLSupported,
    type MetaballConfig,
} from "../../../src/components/custom/metaballs";
import { TypewriterText } from "../../../src/components/custom/typewriter";
import { cn } from "../../../src/utils/cn";

const wonkSettings = '"WONK" 1, "SOFT" 0';

// ─── Motion gate ─────────────────────────────────────────────────────────
// Synchronous probe: SSR-safe (returns false if window absent), feeds the
// MetaballCanvas v-if AND the TypewriterText v-if. Reduced-motion → both
// animations collapse to static fallbacks (radial gradients + static h2).
const prefersReducedMotion = (() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
})();

const showMetaballs = computed(
    () => isWebGLSupported() && !prefersReducedMotion,
);
const animateHeadline = !prefersReducedMotion;

// Ambient metaballs config — tuned to COMPLEMENT, not compete with, the
// hero's three warm-palette radial gradients. Strategy:
//   - colors: pulled from the same warm/cool palette as the radial stops
//     (--section-color-0 → ember/peach, --section-color-2 → amber,
//     --section-color-5 → cyan-blue). Hard-coded hex (not CSS vars) because
//     the WebGL composable resolves colors at init via canvas getImageData
//     — CSS vars would resolve once and miss theme transitions; the demo
//     does not theme-toggle the hero, so static hex is correct here.
//   - blobCount 5 (down from default 8) — fewer blobs at large radii read
//     as broad atmosphere, not as discrete glowing dots.
//   - baseRadius 0.22 (vs default 0.12) — large blobs blend into the
//     gradient backdrop instead of punching through as feature elements.
//   - speed 0.04 (half default 0.08) — slow drift; ambient, not animated.
//   - orbitAmplitude 0.22 (vs default 0.3) — gentle motion, stays near
//     centre so blobs don't sweep across text.
//   - bgAlpha 0 — fully transparent background, layered ABOVE the radial
//     gradients (no flat fill).
//   - threshold 0.85 + edgeSoftness 0.5 — softer edges so blobs feather
//     into the gradient floor without crisp metaball silhouettes.
const heroMetaballConfig: MetaballConfig = {
    blobCount: 5,
    speed: 0.04,
    threshold: 0.85,
    baseRadius: 0.22,
    orbitAmplitude: 0.22,
    edgeSoftness: 0.5,
    bgAlpha: 0,
    colors: [
        "#F4A593", // section-color-0 ember/peach
        "#F5C76E", // section-color-2 amber
        "#7CC0DB", // section-color-5 cyan-blue
        "#E89B7E", // ember mid
        "#F0B65A", // amber mid
    ],
};

// ─── Typewriter prose segments ──────────────────────────────────────────
// The hero h2 splits around the italic-f signature glyph:
//
//   [seg1: "A design system "][italic-f "f"][seg2: "or mathematicians,
//   writers & makers."]
//
// Segment 1 types first; on `@complete`, segment 2 starts typing with a
// short startDelay. The italic-f is static markup between the segments —
// it appears immediately at mount (no animation), preserving the
// signature glyph's "anchored, deliberate" visual weight while the
// prose around it lays itself in. Cursor is hidden on segment 1 and
// shown on segment 2 (it's the visible "in-progress" indicator at the
// tail end of typing). Once segment 2 completes, the cursor blinks
// briefly then stops.
const headlineSeg1 = "A design system ";
const headlineSeg2 = "or mathematicians, writers & makers.";

const seg1Done = ref(false);

const claims = [
    {
        eyebrow: "§ 01",
        title: "Paper & glass",
        body: "Warm cream underpaint, SVG turbulence grain, translucent card surfaces blending multiply over the backdrop.",
    },
    {
        eyebrow: "§ 02",
        title: "Audacious type",
        body: "Fraunces display at WONK 1, Computer Modern body, golden-ratio scale from 11px micro to 110px hero.",
    },
    {
        eyebrow: "§ 03",
        title: "Cartoon shadows",
        body: "3px offset, no blur. Cards translate (-1, -1) on hover. The signature that defines the whole system.",
    },
];
</script>

<template>
    <StoryPage>
        <div
            class="hero-frame"
            :class="cn(
                'relative isolate overflow-hidden rounded-[var(--radius-dialog)]',
                'border border-border/40 px-8 py-20 md:px-16 md:py-28',
            )"
            :style="{
                backgroundColor: 'var(--background)',
                backgroundImage: `
                    radial-gradient(
                        ellipse 70% 55% at 12% 8%,
                        color-mix(in srgb, var(--section-color-0, hsl(12 78% 72%)) 55%, transparent) 0%,
                        transparent 60%
                    ),
                    radial-gradient(
                        ellipse 65% 60% at 92% 20%,
                        color-mix(in srgb, var(--section-color-2, hsl(45 85% 70%)) 50%, transparent) 0%,
                        transparent 65%
                    ),
                    radial-gradient(
                        ellipse 80% 70% at 55% 110%,
                        color-mix(in srgb, var(--section-color-5, hsl(195 75% 68%)) 45%, transparent) 0%,
                        transparent 60%
                    )
                `,
            }"
        >
            <!--
                Ambient metaballs backdrop (N.W0 A2 wire). Sits ABOVE the
                radial gradients on the bg-image cascade but BELOW the
                content layer (content is z-10; canvas is -z-10 hardcoded
                in MetaballCanvas.vue and contained to the hero frame via
                the .hero-frame :deep(canvas) override below). Renders
                only when WebGL is supported AND prefers-reduced-motion
                is FALSE — radial gradients alone carry the static case.
                Subtle opacity (60%) keeps blobs ambient rather than
                foreground-competing.
            -->
            <MetaballCanvas
                v-if="showMetaballs"
                :config="heroMetaballConfig"
                aria-hidden="true"
                class="hero-metaballs"
            />

            <div class="relative z-10 flex flex-col gap-8 max-w-4xl">
                <div class="flex items-center gap-3">
                    <Sparkles class="size-4 text-muted-foreground" aria-hidden="true" />
                    <span class="text-admin-label section-label">
                        v0.3 · paper-and-glass forward
                    </span>
                </div>

                <!--
                    Headline (N.W0 A4 wire). Split around the italic-f
                    signature glyph so the typewriter animates the prose
                    while the f stays anchored as a static, deliberate
                    visual mark. Segment 1 types first (no cursor — the
                    glyph and seg 2 follow it); segment 2 types after
                    seg 1 emits @complete, with a brief startDelay
                    keyed off the italic-f's anchored presence. Cursor
                    is shown on segment 2 only and blinks once typing
                    settles. Reduced-motion → static h2 (no animation).
                -->
                <h2 class="text-display-4 tracking-tight">
                    <template v-if="animateHeadline">
                        <TypewriterText
                            :text="headlineSeg1"
                            :base-speed="55"
                            :variance="0.35"
                            :error-rate="0.008"
                            :first-animation-speed-factor="0.7"
                            :cursor-visible="false"
                            :interactive="false"
                            @complete="seg1Done = true"
                        />
                        <span
                            class="fourier-f font-display italic"
                            :style="{
                                color: 'var(--viz-fourier, hsl(358 72% 52%))',
                                fontSize: '1.1em',
                                fontVariationSettings: wonkSettings,
                            }"
                        >f</span>
                        <TypewriterText
                            v-if="seg1Done"
                            :text="headlineSeg2"
                            :base-speed="55"
                            :variance="0.35"
                            :error-rate="0.008"
                            :first-animation-speed-factor="0.7"
                            :start-delay="220"
                            :cursor-visible="true"
                            :cursor-blink="true"
                            :interactive="false"
                        />
                    </template>
                    <template v-else>
                        A design system
                        <span
                            class="fourier-f font-display italic"
                            :style="{
                                color: 'var(--viz-fourier, hsl(358 72% 52%))',
                                fontSize: '1.1em',
                                fontVariationSettings: wonkSettings,
                            }"
                        >f</span>or
                        mathematicians, writers &amp; makers.
                    </template>
                </h2>

                <p class="text-prose max-w-2xl">
                    Glass-UI pairs Vue 3.5 primitives with a warm-cream, paper-textured visual
                    identity. Every surface composes translucent glass over a grain underpaint; every
                    heading is set in Fraunces WONK; every card carries a cartoon shadow by default.
                </p>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                    <Button size="lg" variant="primary-audacious" class="gap-2">
                        Start building
                        <ArrowRight class="size-4" aria-hidden="true" />
                    </Button>
                    <Button size="lg" variant="ghost">View the source</Button>
                </div>
            </div>
        </div>

        <Card
            :class="cn(
                'border-2 border-foreground/10 transition-transform duration-200',
                'hover:-translate-x-px hover:-translate-y-px',
            )"
        >
            <CardContent class="grid gap-0 p-0 md:grid-cols-3">
                <div
                    v-for="(claim, idx) in claims"
                    :key="claim.title"
                    :class="cn(
                        'flex flex-col gap-[calc(0.75rem_+_var(--density-gap,0rem))] p-[calc(2rem_+_var(--density-pad,0rem))]',
                        idx < claims.length - 1 && 'md:border-r md:border-border/40',
                        idx < claims.length - 1 && 'border-b border-border/40 md:border-b-0',
                    )"
                >
                    <span
                        class="text-admin-label section-label font-mono"
                        :style="{ color: `var(--section-color-${idx * 2}, inherit)` }"
                    >
                        {{ claim.eyebrow }}
                    </span>
                    <h3 class="text-heading">{{ claim.title }}</h3>
                    <p class="text-small text-muted-foreground leading-relaxed">
                        {{ claim.body }}
                    </p>
                </div>
            </CardContent>
        </Card>
    </StoryPage>
</template>

<style scoped>
/*
 * MetaballCanvas ships its <canvas> with hardcoded `position: fixed;
 * inset: 0; -z-10` (viewport-pinned, suitable for full-page substrates
 * like the canonical metaballs story). For the hero ambient-backdrop
 * use case we need the canvas contained to the hero frame so it
 * paints behind the hero card content only — not the entire viewport.
 *
 * Scoped :deep(canvas) re-targets the canvas to `position: absolute`
 * within `.hero-frame` (which already establishes a containing block
 * via `relative isolate`). The `-z-10` from the upstream class still
 * applies (-z-10 vs the content's z-10 keeps the cascade correct).
 *
 * Opacity 0.6 dials the metaballs back to ambient — the radial
 * gradients carry the primary aesthetic; metaballs add subtle motion.
 */
.hero-frame :deep(canvas) {
    position: absolute;
    opacity: 0.6;
    mix-blend-mode: soft-light;
}
</style>
