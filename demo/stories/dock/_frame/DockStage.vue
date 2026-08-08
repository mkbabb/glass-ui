<script setup lang="ts">
// DockStage — the demo-private dock-staging chassis.
//
// ONE shared procedural backdrop behind a column of dock demos. This chassis stages the
// flagship dock demos over a single live aurora field — NOT FLAT `bg-card/40 p-8` panels,
// where glass over a flat substrate is invisible glass — so the
// dock's glass + adaptive-luminance read as LIQUID glass, not a gray pill on charcoal.
//
// ONE GL context per page (the one-GL-per-route budget): the chassis
// renders the shared <Aurora> ONCE behind the slotted column, NOT one aurora per demo.
// The backdrop is OFFSCREEN-PAUSED BY CONSTRUCTION — <Aurora> composes the shipped
// `useIntersectionPause` seam + `content-visibility: auto` internally, so when the
// page scrolls offscreen the rAF parks (no consumer wiring needed). The DEFAULT_AURORA
// field is the calm wash the dock reads against.
//
// Each dock demo wraps its specimen in a `<DockStageTile>`-shaped transparent framed
// slot (the `.dock-stage-tile` class) so the dock floats DIRECTLY over the shared
// field with no opaque card between. The optional `paused` input parks this same
// route field for the pause-toggle specimen; it never mounts a second renderer.
import { computed, useTemplateRef, watchEffect } from "vue";
import { Aurora, type AuroraConfig } from "@glass/components/aurora";
import {
    useGlassBackdropLuminance,
    GLASS_BACKDROP_SHARED_ATTR,
} from "@glass/composables/glass/useGlassBackdropLuminance";
import { heroAuroraConfig } from "../../../chassis/hero/aurora-hero";

const props = withDefaults(
    defineProps<{
        /** How far back the shared field recedes behind the demos. */
        opacityCeiling?: number;
        /** Parks the one shared route field through Aurora's public lifecycle seam. */
        paused?: boolean;
        /**
         * The staged aurora field. Defaults to the WARM colorful dock hero field
         * (`heroAuroraConfig("cat-dock")` — a coral/amber warm-projected drift, chroma
         * 0.13) so the dock's warm-cream glass reads as LIQUID glass over a rich field
         * that BELONGS to the warm-cream identity (the lens needs a colorful
         * backdrop to bend + concentrate — warmth is the identity, not blue). A cerulean
         * default (e.g. OPENAI_SKY) would read the dock FIELD cold/blue, contradicting the
         * warm identity — the aurora-studio doctrine: "warm-cream Dawn is the DEFAULT lead; the
         * blue Sky is a named non-default preset". A consumer may stage a different config.
         */
        config?: AuroraConfig;
    }>(),
    {
        opacityCeiling: 0.55,
        paused: false,
        config: () => heroAuroraConfig("cat-dock"),
    },
);

// The shared aurora <canvas>, surfaced through the scoped slot.
// SUBSUMED the per-dock binding: the stage now runs the ONE shared observer below and the
// staged docks INHERIT `--glass-backdrop-luma` (they stand down their own readback), so a
// dock no longer needs the canvas. The scoped `backgroundCanvas` is RETAINED for the
// sibling dock stories (layers, sections, cta-receive, dock-search) that still bind
// `:background-canvas` — a now-harmless no-op there (those docks stand down under the same
// shared marker). <Aurora> exposes its `canvasRef`.
const auroraRef = useTemplateRef<{
    canvasRef: HTMLCanvasElement | null;
    pause: () => void;
    resume: () => void;
}>("auroraRef");
const backgroundCanvas = computed<HTMLCanvasElement | null>(
    () => auroraRef.value?.canvasRef ?? null,
);
watchEffect(() =>
    props.paused ? auroraRef.value?.pause() : auroraRef.value?.resume(),
);

// One shared backdrop-luminance observer serves the route. The luminance signal belongs
// to the shared field, not to an individual dock
// one: N docks over the SAME aurora read the SAME luma (+ ambient hue). This ONE observer
// samples the field (drawImage + getImageData, ≤ 4 Hz, 32×32) at the `.dock-stage` scope
// and writes `--glass-backdrop-luma` and `--glass-backdrop` there;
// every staged GlassDock INHERITS them via the registered inheriting @property cascade and
// STANDS DOWN its own per-dock observer (the `shared: true` observer stamps the
// `data-glass-backdrop-shared` marker the docks' `.closest` coverage-check reads). 12
// per-dock getImageData readbacks → 1 per route. The stage template ALSO carries the
// static marker so the stand-down is race-free from frame 0.
const stageEl = useTemplateRef<HTMLElement>("stageEl");
useGlassBackdropLuminance(stageEl, {
    backgroundCanvas: () => auroraRef.value?.canvasRef ?? null,
    shared: true,
});
</script>

<template>
    <div
        ref="stageEl"
        class="dock-stage"
            :[GLASS_BACKDROP_SHARED_ATTR]="''"
    >
        <!-- The single shared field behind the whole demo column. Its backing store
             is clamped to the viewport:
             absolute track spans the full scroll column, but the <Aurora> host inside
             it is sized to `100dvh` and `position: sticky` — so the field pins to the
             viewport as the page scrolls (always painted) while the offscreen scroll
             column is NEVER rasterized (9.68MP → ~2.5MP). Sizing the field to the full
             column was pure over-provisioned GPU fill: a decorative backdrop of which
             only ~one viewport is ever visible. The DPR clamp (sub-2× wash,
             `resolveAuroraWashDpr` = 1.5×) rides through the library aurora unchanged.

             `.dock-stage` clips with `overflow: clip` (NOT `hidden`): `hidden`
             establishes a scroll container that would CONFINE the sticky field to this
             box (freezing the pin); `clip` clips the rounded corners without a scroll
             container, so the field sticks relative to the outer `<main>` scroller.

             Offscreen-paused by construction (the <Aurora> useIntersectionPause +
             content-visibility seam parks the rAF once the field leaves the viewport).
             aria-hidden — purely decorative staging.

             `preserveDrawingBuffer: true` keeps the sampled field readable. A live
             WebGL canvas clears its drawing buffer after the
             browser composites, so the dock's `useGlassBackdropLuminance` observer
             reads BLACK (luma 0 / hue transparent) off `drawImage(auroraCanvas)` —
             a false black sample. Preserving the buffer keeps the last rendered warm
             frame readable, so the sampled luma + ambient hue are real (the shared
             observer reads this same field). The `data-glass-field-canvas` marker also
             lets a non-dock content surface over the stage auto-discover this field
             (the SHELL_FIELD_CANVAS_SELECTOR reconcile). The render is UNCHANGED —
             preservation only affects readback. -->
        <div class="dock-stage-field-track" aria-hidden="true">
            <Aurora
                ref="auroraRef"
                :config="config"
                :opacity-ceiling="opacityCeiling"
                :runtime-options="{ preserveDrawingBuffer: true }"
                data-glass-field-canvas
                class="dock-stage-field"
                aria-hidden="true"
            />
        </div>
        <!-- The dock demos flow over the shared field. The scoped slot surfaces the
             shared aurora <canvas> so each staged dock threads it into its luminance
             observer (`:background-canvas="backgroundCanvas"`) — closing the observer
             loop over the live field. -->
        <div class="dock-stage-column">
            <slot :background-canvas="backgroundCanvas" />
        </div>
    </div>
</template>

<style scoped>
/* The shared-stage container — an isolating positioning context so the single
   field sits behind the slotted column without escaping to the page.

   `overflow: clip` (NOT `hidden`): the sticky field must pin to the outer
   `<main>` scroll container, but `overflow: hidden` would establish a scroll
   container here and CONFINE the sticky pin to this box (freezing it). `clip`
   clips the rounded corners identically without a scroll container, so the
   viewport-clamped field stays pinned as the page scrolls. */
.dock-stage {
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-card);
    overflow: clip;
}

/* The absolute TRACK spans the full scroll column behind the demos (the sticky
   range) but occupies zero flow space, so the sticky field never pushes the
   column down. */
.dock-stage-field-track {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
}

/* The one shared aurora field is viewport-clamped. Sized to `100dvh` (not the full ~2365px scroll column), so the
   Aurora ResizeObserver measures the viewport and the backing store never
   exceeds ~2.5MP (down from 9.68MP). `position: sticky; top: 0` pins the field
   to the viewport across the whole column so the visible region is always
   painted; the offscreen column is never rasterized. The descendant selector
   (`.dock-stage .dock-stage-field`) wins the height over the Aurora root's
   `h-full` utility (unlayered scoped rule, specificity 0,2,0). */
.dock-stage .dock-stage-field {
    position: sticky;
    top: 0;
    height: 100dvh;
    width: 100%;
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
