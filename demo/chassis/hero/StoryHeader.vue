<script setup lang="ts">
// StoryHeader — the ONE ordered header cluster (BB.W-HIERARCHY2).
//
// ADOPTED as the unified page-header (BG.W-CHASSIS-ADOPT-OR-RETIRE). The four
// candidate header/chassis primitives were decided adopt-or-retire: DemoFrame
// (zero-importer aspirational cel chassis) + StorySectionHeader (zero-importer
// section-header) were RETIRED; this StoryHeader (live-imported by StoryPage +
// StoryHero) + VizStudio (the viz-studio chassis) were ADOPTED. This is THE header
// cluster — the eyebrow → subpath → display <h1> → blurb reading order — every
// StoryPage/StoryHero composes; a per-story inline `<header>` restating the page
// identity is the redundant page-duplicate the chassis hero already carries.
// Machine-locked by proof:demo.
//
// THE READING-ORDER INVERSION FIX (A4-INVERSION). On a HERO page the descriptor
// (the mono eyebrow + the dense blurb) used to render in StoryPage's chrome
// <header> ABOVE the giant display <h1> inside the card — a focal INVERSION (the
// descriptor before the name it describes) AND two focal points stacked in the
// already-crowded top band. iOS-26 frames hierarchy as the FIRST design pillar: a
// left-aligned title/subtitle stack in reading order, NEVER subtitle-above-title.
//
// This unit re-homes the three rungs into ONE coherent stacked cluster in correct
// reading order — eyebrow (the quiet supporting tag) → the display <h1> (the
// single dominant focal moment, passed as the default slot) → blurb (the clearly
// subordinate rung UNDER the title). The unit is never split across the
// chrome/card boundary: on a HERO page StoryHero renders this cluster alongside
// the display <h1>; StoryPage's chrome <header> suppresses the eyebrow+blurb on
// the hero path (the D1-4 double-<h1> suppression GENERALIZED to the eyebrow +
// blurb). The descriptor is shown ONCE.
//
// THE 3-STAGE GRAVITY ENTRANCE (A4-ENTRANCE). The cluster arrives as a tight
// fade-rise that REINFORCES the reading order — the eyebrow leads, the subpath
// chip follows, the title settles, the blurb fades last (a ~per-stage stagger).
// Each stage is COMPOSITOR-ONLY (transform: translateY + coupled opacity, NEVER
// font-size / margin / top — the W-MOTION-CANON P5 floor) on the no-overshoot
// SETTLE register (--ease-out; the audacious title NEVER bounces — P2), clocked on
// the per-element duration. The stagger is the keyframe `animation-delay` per stage
// (a deterministic CSS stagger, NO setTimeout cascade). Under
// prefers-reduced-motion: reduce the cluster paints its static terminal state with
// ZERO in-between frames (the keyframes live inside the no-preference gate; see
// story-hero.css). The class hooks the entrance; the keyframes are owned by
// story-hero.css (the .story-hero-cluster-* register that EXTENDS the shipped
// .story-hero-title--enter GRAVITY precedent to the eyebrow + subpath + blurb).
//
// BG.W-ROUTE-ENTER-VISIBLE (fix c). This cluster IS the route-entrance reading-order
// cascade the §2.6 fix names: on a route swap the whole page rises via the
// `.route-enter` @keyframes (transitions.css, the perceptible 20px rise on
// --spring-snappy + `backwards`, its chunk pre-resolved off the beat in router.ts),
// and INSIDE it these bands stagger 30–120ms (eyebrow 0 → subpath 30 → title 60 →
// blurb 120) each with a real translateY leg — never a bare opacity fade. Every band
// carrying `story-header-cluster--enter` has a matching keyframe rule in
// story-hero.css (the subpath chip's rule was the missing one — the dead-class gap
// this wave closed).
//
// A demo-private chassis primitive — NOT a library export.
import { cn } from "@glass/components/_shared/class-names";

interface StoryHeaderProps {
    /** The mono eyebrow tag (category · story). Rendered ABOVE the title. */
    eyebrow?: string | null;
    /**
     * The explicit Fira-Code subpath chip (BC.W-PAGE-CHASSIS — "subpath explicitly
     * defined"). Rendered beneath the eyebrow as the route identity — a published
     * `@mkbabb/glass-ui/<sp>` or the route path. It persists into the shrunk sticky
     * header (the chip IS the route identity).
     */
    subpath?: string | null;
    /** The supporting blurb. Rendered UNDER the title, the subordinate rung. */
    blurb?: string | null;
    /** When true, the cluster's three rungs animate the 3-stage GRAVITY entrance. */
    animate?: boolean;
    /** Forwarded class string for the cluster root. */
    class?: string;
}

const props = withDefaults(defineProps<StoryHeaderProps>(), {
    animate: true,
});
</script>

<template>
    <!-- The ordered cluster: eyebrow → title (default slot) → blurb, top-to-bottom.
         The cluster micro-rhythm is a single tight `gap` (A4-RHYTHM) — one
         spacing scale through the whole header, then the parent owns the ONE major
         gap to the first section. -->
    <div :class="cn('story-header-cluster', props.class)">
        <p
            v-if="eyebrow"
            :class="
                cn(
                    'text-admin-label text-muted-foreground story-header-eyebrow',
                    props.animate && 'story-header-cluster--enter',
                )
            "
        >
            {{ eyebrow }}
        </p>
        <!-- BC.W-PAGE-CHASSIS — the explicit Fira-Code subpath chip. The route
             identity ("@mkbabb/glass-ui/aurora"), rendered as a code-rung chip in
             the eyebrow cluster and persisting into the shrunk sticky header. -->
        <code
            v-if="subpath"
            :class="
                cn(
                    'text-mono-caption story-header-subpath',
                    props.animate && 'story-header-cluster--enter',
                )
            "
            >{{ subpath }}</code
        >
        <!-- The display <h1> — the single dominant focal moment (the largest type
             mass in the band). Passed by the host (StoryHero owns the display rung
             + the .story-hero-title--enter title-stage). -->
        <slot />
        <p
            v-if="blurb"
            :class="
                cn(
                    'text-small max-w-prose text-muted-foreground story-header-blurb',
                    props.animate && 'story-header-cluster--enter',
                )
            "
        >
            {{ blurb }}
        </p>
    </div>
</template>
