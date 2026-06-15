<script setup lang="ts">
// DockStage — the demo-private dock-staging chassis (BA.W-STAGE scope 8, FD-DOCK-1).
//
// ONE shared procedural backdrop behind a column of dock demos. The flagship dock
// demos used to sit on FLAT `bg-card/40 p-8` panels (glass over a flat substrate is
// invisible glass); this chassis stages them over a single live aurora field so the
// dock's glass + adaptive-luminance read as LIQUID glass, not a gray pill on charcoal.
//
// ONE GL context per page (the one-GL-per-route budget, BA invariant 9): the chassis
// renders the shared <Aurora> ONCE behind the slotted column, NOT one aurora per demo.
// The backdrop is OFFSCREEN-PAUSED BY CONSTRUCTION — <Aurora> composes the shipped
// `useIntersectionPause` seam + `content-visibility: auto` internally, so when the
// page scrolls offscreen the rAF parks (no consumer wiring needed). The DEFAULT_AURORA
// field is the calm wash the dock reads against.
//
// Each dock demo wraps its specimen in a `<DockStageTile>`-shaped transparent framed
// slot (the `.dock-stage-tile` class) so the dock floats DIRECTLY over the shared
// field with NO opaque card between (the BG-2 lesson). The pause-toggle demo keeps its
// OWN functional aurora (it must, to demonstrate pause/resume on a real renderer) — it
// is NOT a transparent tile; it self-stages.
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/components/custom/aurora";

withDefaults(
    defineProps<{
        /** How far back the shared field recedes behind the demos. */
        opacityCeiling?: number;
    }>(),
    { opacityCeiling: 0.42 },
);
</script>

<template>
    <div class="dock-stage">
        <!-- The ONE shared field behind the whole demo column. Offscreen-paused by
             construction (the <Aurora> useIntersectionPause + content-visibility
             seam). aria-hidden — purely decorative staging. -->
        <Aurora
            :config="DEFAULT_AURORA_CONFIG"
            :opacity-ceiling="opacityCeiling"
            class="dock-stage-field"
            aria-hidden="true"
        />
        <!-- The dock demos flow over the shared field. -->
        <div class="dock-stage-column">
            <slot />
        </div>
    </div>
</template>

<style scoped>
/* The shared-stage container — an isolating positioning context so the single
   field sits behind the slotted column without escaping to the page. */
.dock-stage {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-card);
    overflow: hidden;
}

/* The ONE shared aurora field, pinned behind the column. */
.dock-stage-field {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
}

/* The demo column flows over the field. The gap matches the StoryPage section
   rhythm so the staged demos read as the same column they replaced. */
.dock-stage-column {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: clamp(1.25rem, 3vw, 2.5rem);
}
</style>
