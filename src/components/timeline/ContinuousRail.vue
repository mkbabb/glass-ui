<script setup lang="ts">
import {
    continuousFillWidth,
    stitchedRegionWindow,
} from "./geometry";
import type { TimelineSegment } from "./types";

/**
 * <ContinuousRail> — the non-interactive `role="progressbar"` rail of the
 * continuous-variant timeline. DECK-PRIVATE child of <ContinuousTimeline>
 * (not a public export). Renders the N absolute-positioned region children,
 * each windowing into the ONE rail-spanning stitched gradient. Carries no
 * focusable descendants (Option C structural split, AB.W2.T4 — axe
 * `nested-interactive`); the interactive markers are a sibling overlay
 * rendered by <ContinuousMarkers>.
 *
 * The split is a pure transposition out of the prior monolithic
 * ContinuousTimeline.vue: same DOM, same class names, same inline-style
 * bindings, same scoped CSS rules. The orchestrator owns state/geometry and
 * passes exactly the props this rail paints today.
 */
defineProps<{
    segments: TimelineSegment[];
    railGradient: string;
    railAriaLabel: string;
    valueNow: number;
    regionLeft: (i: number) => number;
    regionWidth: (i: number) => number;
}>();
</script>

<template>
    <div
        class="continuous-track timeline-rail"
        role="progressbar"
        :aria-valuemin="0"
        :aria-valuemax="segments.length"
        :aria-valuenow="valueNow"
        :aria-label="railAriaLabel"
    >
        <!-- N region children, each absolute-positioned within the rail.
             AC.W9 (B2) — each region WINDOWS into the one shared
             `--stitch-gradient` (the rail-spanning stitched
             gradient) via `background-size` / `background-
             position-x`, so the phase hues cross-fade smoothly
             across the boundaries — one continuous bar, no seam.
             `--continuous-fill-width` is the LIVE binding for the
             active-fill paint (consumed by `.continuous-region-
             fill` below). -->
        <div
            v-for="(seg, i) in segments"
            :key="seg.key"
            class="continuous-region"
            :class="[
                `state-${seg.state}`,
                i === 0 && 'is-first',
                i === segments.length - 1 && 'is-last',
            ]"
            :data-state="seg.state"
            :style="{
                left: `${regionLeft(i) * 100}%`,
                width: `${regionWidth(i) * 100}%`,
                '--stitch-gradient': railGradient,
                '--stitch-size-x': stitchedRegionWindow(regionLeft(i), regionWidth(i)).sizeX,
                '--stitch-pos-x': stitchedRegionWindow(regionLeft(i), regionWidth(i)).positionX,
                '--continuous-fill-width': `${continuousFillWidth(seg) * 100}%`,
            }"
            aria-hidden="true"
        >
            <!-- AB.W2.T4 — the fill child clips the gradient to
                 `--continuous-fill-width`. Pending regions render
                 no fill (the var resolves to 0%); completed
                 regions paint 100%; active regions paint the
                 current progress fraction. -->
            <div class="continuous-region-fill" />
        </div>
    </div>
</template>

<style scoped>
/* The continuous rail COMPOSES `.timeline-rail` (warm-glass, from the
   dispatcher's shared register) — RETIRES the private `--surface-tint-6` +
   `--glass-blur-wash` gray recipe 1:1. This scoped block carries ONLY the
   continuous-local layout. Height = the √φ ladder BASE (continuous is the
   loudest, the bar). The stitched-gradient regions (geometry.ts, byte-
   untouched) paint INSIDE the warm rail now. */
.continuous-track {
    width: 100%;
    height: var(--timeline-h, var(--timeline-continuous-height, 0.75rem));
    overflow: hidden;
}

.continuous-region {
    position: absolute;
    top: 0;
    bottom: 0;
    /* `left` and `width` come from inline style (computed from regionLeft/Width). */
    transition:
        width var(--duration-slow, 0.45s) var(--ease-out, ease-out),
        left var(--duration-slow, 0.45s) var(--ease-out, ease-out),
        background var(--duration-fast, 0.2s) var(--ease-standard, ease);
}

/* AC.W9 (B2) — fill child WINDOWS into the ONE rail-spanning stitched
   gradient. The gradient (`--stitch-gradient`) is identical across every
   region; each region scales it up by `--stitch-size-x` (= 1 / region
   width) and offsets it by `--stitch-pos-x` so its slice aligns with the
   rail-fraction it occupies. The hues therefore cross-fade smoothly
   through every boundary — one continuous bar, no per-region seam.

   The fill child clips the windowed gradient to `--continuous-fill-
   width`: completed regions get a full-width fill (100%); active regions
   paint the current progress fraction; pending regions paint nothing.
   The parent region itself does NOT paint a background — the fill child
   is the single source of paint. */
.continuous-region {
    /* No own background — the fill child paints. */
    background: transparent;
}

.continuous-region-fill {
    position: absolute;
    inset: 0;
    width: var(--continuous-fill-width, 0%);
    background-image: var(--stitch-gradient, none);
    /* Window into the rail-spanning gradient: scale the gradient to the
       full rail (size-x = 1 / regionWidth) and offset so this region's
       slice is the visible one. background-repeat:no-repeat keeps the
       single gradient instance; the size/position do the windowing. */
    background-size: var(--stitch-size-x, 100%) 100%;
    background-position-x: var(--stitch-pos-x, 0%);
    background-position-y: center;
    background-repeat: no-repeat;
    transition: width var(--duration-slow, 0.45s) var(--ease-out, ease-out);
    will-change: width;
    pointer-events: none;
}

/* AC.W9 (B2) — proper rounded ends. The fill child's corners must NOT
   blanket-inherit the rail's pill radius (that rounds interior regions'
   fills on all four corners, leaving the rail's true leading + trailing
   edges squared off where a partial fill or a state seam lands). The
   rail terminus rounding is anchored to the FIRST region's leading edge
   and the LAST region's trailing edge; interior regions stay square so
   the stitched fill reads as one unbroken bar. */
.continuous-region-fill {
    border-radius: 0;
}
.continuous-region.is-first > .continuous-region-fill {
    border-start-start-radius: var(--radius-pill);
    border-end-start-radius: var(--radius-pill);
}
.continuous-region.is-last > .continuous-region-fill {
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
}

/* Completed regions: paint the full gradient end-to-end. */
.continuous-region.state-completed > .continuous-region-fill {
    width: 100%;
}

/* AF.W1 (D12) — active regions paint a partial-width fill, so the fill's
   incrementing (trailing) edge sits mid-region where the rail's
   `rounded-pill` mask has no curvature and would render squared. Round
   that incrementing edge so the live fill front reads as a pill cap.
   This composes with the is-first/is-last terminus rounding above —
   an active first region keeps its rounded leading edge AND gains a
   rounded incrementing edge; an active interior region rounds only the
   incrementing edge. */
.continuous-region.state-active > .continuous-region-fill {
    border-start-end-radius: var(--radius-pill);
    border-end-end-radius: var(--radius-pill);
}

/* Pending regions: no fill paint (substrate shows through). */
.continuous-region.state-pending > .continuous-region-fill {
    width: 0;
    background-image: none;
}

/* Seam dividers — paint a 1px vertical line at each region's right edge
   for boundary legibility. Opt out via `--timeline-continuous-seam-opacity: 0`.
   The last region's seam is suppressed (it's the rail's terminus, not a
   region boundary). */
.continuous-region::after {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    bottom: 10%;
    width: 1px;
    background: var(
        --timeline-continuous-seam-color,
        color-mix(
            in srgb,
            var(--foreground) calc(var(--timeline-continuous-seam-opacity, 0.25) * 100%),
            transparent
        )
    );
    pointer-events: none;
}

.continuous-region.is-last::after {
    /* No seam at the terminus. */
    display: none;
}

@media (prefers-reduced-motion: reduce) {
    .continuous-region {
        transition-duration: 0.01ms;
    }
    .continuous-region-fill {
        transition-duration: 0.01ms;
    }
}
</style>
