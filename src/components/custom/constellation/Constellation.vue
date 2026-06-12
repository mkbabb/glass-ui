<script setup lang="ts">
import { useTemplateRef } from "vue";
import { type ConstellationProps } from "./constellationField";
import { useConstellation } from "./composables/useConstellation";
import { cn } from "../../../utils/cn";

/**
 * Constellation — a slow, geometric proximity-graph lattice on a Canvas2D
 * surface. Nodes drift + bounce; near nodes link with distance-falloff
 * hairlines; the web leans toward the cursor and taps ripple. It composes the
 * `useCanvas2D` substrate, so it inherits the offscreen / tab-hidden /
 * reduced-motion freeze for free (no hand-rolled RAF-park).
 *
 * The lattice ships NEUTRAL. A branded skin (a focal ring, a callout label) is
 * the consumer's `drawOverlay(ctx, field, now)` pass — it runs AFTER the four
 * neutral passes and receives the live field so it can pin itself to a real
 * node. Zero deck-domain content lives in the component.
 *
 * Palette reads the FULL `--constellation-*` legibility set off the canvas (the
 * node/node-dim/line colors + the edge-alpha multipliers + the field-yields-to-
 * type `--constellation-alpha` knob; neutral fallbacks), so a consumer override
 * or a dark-mode flip re-tints AND re-weights the lattice (AX.W17).
 *
 * The focal node + click-to-warp (AX.W17) is a first-class engine concept: with
 * `warpOnClick`, a click warps the focal node to the nearest drifting node via a
 * critically-damped spring stepped INSIDE the substrate's single rAF (no
 * `useSpring`, no second rAF). The consumer paints the focal mark at
 * `field.warp.{x,y}` in its `drawOverlay`.
 *
 * The prop contract is the public `ConstellationProps` (constellationTypes.ts);
 * the render-loop + lifecycle wiring lives in the `useConstellation` composable
 * (BA.W-CARVE2 — the SFC keeps only its template + the prop defaults + the thin
 * composable call). `freeze` is resolved via the RAW vnode prop inside the
 * composable (NOT a default here) because Vue casts an absent Boolean prop to
 * `false`, which would erase the omitted-vs-explicit-false distinction the
 * auto-derive needs.
 */
const props = withDefaults(defineProps<ConstellationProps>(), {
    count: 64,
    link: 132,
    speed: 0.16,
    pointerReactive: true,
    warpOnClick: false,
    wander: false,
    gravityWell: false,
    opacityCeiling: 1,
    pinned: false,
    accentEdges: false,
    pinnedDrift: false,
    warpAutoRelease: false,
});

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const expose = useConstellation(props, hostRef, canvasRef);
defineExpose(expose);
</script>

<template>
    <div ref="hostRef" :class="cn('constellation', props.class)">
        <canvas ref="canvasRef" class="constellation-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The lattice is decorative chrome — `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange
   listener fires on this host), `contain` keeps it a layout/paint root.
   The CONTAINMENT axes (contain / content-visibility) stay on the scoped class
   (the component owns them); only the LAYOUT/SIZING axes are surrendered. */
.constellation {
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

/* The root layout is CONSUMER-OVERRIDABLE (AY.W-SB1 §1.5.2 — the zero-paint
   fix). A scoped `.constellation[data-v-…]` selector is specificity (0,2,0) — it
   would BEAT a consumer's single-class placement (e.g. the storybook
   `.story-hero-bg { position: absolute; inset: 0 }` at (0,1,0)), pinning the host
   `position: relative; block-size: 100%` in-flow against an auto-height parent →
   the host collapses to h=0 and the canvas never sizes past its 300×150 default
   (RA-flow-fields §4 — the DEAD constellation hero). Routing the root sizing
   through `:where()` (specificity ZERO) lets ANY consumer class win, so a placed
   parent (`position: absolute; inset: 0`) sizes the component — matching the
   FourierField sibling contract (its scoped root is `position: absolute; inset: 0`;
   both substrates now FILL a placed parent rather than dictate their own flow).
   When the consumer does NOT place it, the `position: relative` fallback keeps the
   host the canvas's offset parent (the `.constellation-canvas` is `position:
   absolute; inset: 0`), and the `100%` extents fill a sized parent. */
:where(.constellation) {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
}

.constellation-canvas {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    display: block;
}
</style>
