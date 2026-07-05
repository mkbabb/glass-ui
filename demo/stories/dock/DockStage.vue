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
import { computed, ref, useTemplateRef } from "vue";
import { Aurora, type AuroraConfig } from "@glass/components/custom/aurora";
import { heroAuroraConfig } from "../aurora-hero";

withDefaults(
    defineProps<{
        /** How far back the shared field recedes behind the demos. */
        opacityCeiling?: number;
        /**
         * The staged aurora field. Defaults to the WARM colorful dock hero field
         * (`heroAuroraConfig("cat-dock")` — a coral/amber warm-projected drift, chroma
         * 0.13) so the dock's warm-cream glass reads as LIQUID glass over a rich field
         * that BELONGS to the warm-cream identity (the §L1 lens needs a colorful
         * backdrop to bend + concentrate — warmth is the identity, not blue). The prior
         * OPENAI_SKY cerulean default read the dock FIELD cold/blue, contradicting the
         * warm identity the composited-gestalt gate enforces (BG.W-COMPOSITED-GESTALT-
         * GATE — the aurora-studio doctrine: "warm-cream Dawn is the DEFAULT lead; the
         * blue Sky is a named non-default preset"). A consumer may stage a different config.
         */
        config?: AuroraConfig;
    }>(),
    { opacityCeiling: 0.55, config: () => heroAuroraConfig("cat-dock") },
);

// BC.W-ADAPTIVE-RECONCILE — thread the shared aurora <canvas> to the docks staged over
// it so each GlassDock's useGlassBackdropLuminance observer SAMPLES the live field
// (drawImage + getImageData) and writes `--glass-backdrop-luma`, closing the observer
// loop on the demo route. Without the canvas the observer falls to the elementsFromPoint
// static walk, which reads the transparent aurora canvas as < 0.5α and never lands a
// real luma over the field. <Aurora> exposes its `canvasRef`; we surface it through the
// scoped slot so each staged dock binds `:background-canvas="backgroundCanvas"`.
const auroraRef = useTemplateRef<{ canvasRef: HTMLCanvasElement | null }>("auroraRef");
const backgroundCanvas = computed<HTMLCanvasElement | null>(
    () => auroraRef.value?.canvasRef ?? null,
);
</script>

<template>
    <div class="dock-stage">
        <!-- The ONE shared field behind the whole demo column. Offscreen-paused by
             construction (the <Aurora> useIntersectionPause + content-visibility
             seam). aria-hidden — purely decorative staging.

             BG.W-GLASS-SIGNAL-TRUTH (mustFix 2) — `preserveDrawingBuffer: true` on the
             SAMPLED field. A live WebGL canvas clears its drawing buffer after the
             browser composites, so the dock's `useGlassBackdropLuminance` observer
             reads BLACK (luma 0 / hue transparent) off `drawImage(auroraCanvas)` —
             the "witness fires but the value is a lie" state the NF.3 paint-DELTA
             flagged. Preserving the buffer keeps the last rendered warm frame readable,
             so the sampled luma + ambient hue are REAL. The `data-glass-field-canvas`
             marker also lets a non-dock content surface over the stage auto-discover
             this field (the SHELL_FIELD_CANVAS_SELECTOR reconcile). The render is
             UNCHANGED — preservation only affects readback. -->
        <Aurora
            ref="auroraRef"
            :config="config"
            :opacity-ceiling="opacityCeiling"
            :runtime-options="{ preserveDrawingBuffer: true }"
            data-glass-field-canvas
            class="dock-stage-field"
            aria-hidden="true"
        />
        <!-- The dock demos flow over the shared field. The scoped slot surfaces the
             shared aurora <canvas> so each staged dock threads it into its luminance
             observer (`:background-canvas="backgroundCanvas"`) — closing the observer
             loop over the live field (BC.W-ADAPTIVE-RECONCILE). -->
        <div class="dock-stage-column">
            <slot :background-canvas="backgroundCanvas" />
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
