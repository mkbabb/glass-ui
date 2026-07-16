<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { type ConstellationProps } from "./constellationField";
import { useConstellation } from "./composables/useConstellation";
import { DEFAULT_PARALLAX } from "./constants";
import { useRoutePointer } from "../../composables/motion/pointer/useRoutePointer";
import { cn } from "../_shared/class-names";
import type { RendererStatus } from "../../composables/glass/webgpu/rendererStatus";

const emit = defineEmits<{ rendererStatus: [status: RendererStatus] }>();

/**
 * Constellation — a slow, geometric proximity-graph lattice rendered on the
 * Canvas2D substrate. Nodes drift and bounce; near nodes link with distance-falloff
 * hairlines; the web leans toward the cursor and a flick fires a focal burst. It
 * composes `useCanvas2D` over the shared lifecycle leaf, inheriting offscreen and
 * tab-hidden parking plus the reduced-motion static frame without a local scheduler.
 *
 * The lattice ships NEUTRAL with the warm-cream identity default. The field step
 * (`constellationField.ts`) is the ONE geometry source consumed by the Canvas2D
 * passes; the palette read (`constellationRender.ts`) resolves the
 * `--constellation-*` tokens. Zero deck-domain content lives in the component.
 *
 * Palette reads the FULL `--constellation-*` legibility set off the canvas (the
 * node/node-dim/line colors + the edge-alpha multipliers + the field-yields-to-
 * type `--constellation-alpha` knob; neutral fallbacks), so a consumer override
 * or a dark-mode flip re-tints and re-weights the lattice.
 *
 * The focal node and click-to-warp are first-class engine concepts: with
 * `warpOnClick`, a click warps the focal node to the nearest drifting node via a
 * critically-damped spring stepped INSIDE the substrate's single rAF (no
 * `useSpring`, no second rAF). The focal mark rides `field.warp.{x,y}` (the
 * spring-eased position the engine owns); `drawOverlay` receives that live field
 * exactly once as the final Canvas2D pass.
 *
 * The prop contract is the public `ConstellationProps` (constellationTypes.ts);
 * the render-loop + lifecycle wiring lives in the `useConstellation` composable
 * (the SFC keeps only its template, prop defaults, and thin
 * composable call). `freeze` is resolved via the RAW vnode prop inside the
 * composable (NOT a default here) because Vue casts an absent Boolean prop to
 * `false`, which would erase the omitted-vs-explicit-false distinction the
 * auto-derive needs.
 */
const props = withDefaults(defineProps<ConstellationProps>(), {
    count: 64,
    link: 132,
    speed: 0.16,
    parallax: DEFAULT_PARALLAX,
    pointerReactive: true,
    warpOnClick: false,
    wander: false,
    gravityWell: false,
    opacityCeiling: 1,
    pinned: false,
    accentEdges: false,
    pinnedDrift: false,
    warpAutoRelease: false,
    backgroundInteractive: false,
});

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// Interactive-background behavior follows the FourierField
// pattern). A full-bleed `pointer-events:none` background cannot listen for its own
// pointer, so it reads the route chassis's ONE window broadcaster (provided by the route
// chassis — `StoryHero`) and feeds a SUBTLE well over the shared field. The broadcaster is
// reused when an ancestor already provided one (one listener per route). The route read is
// built ONLY for a background (`backgroundInteractive`); a foreground demo owns its own host
// listeners, so it stays undefined there and the field is host-driven as before.
const route = useRoutePointer();
const routePointer = props.backgroundInteractive
    ? () => ({
          x: route.pointer.value.x,
          y: route.pointer.value.y,
          active: route.active.value,
      })
    : undefined;

const interactive = computed(
    () => !props.backgroundInteractive && (props.warpOnClick || !!props.gravityWell),
);
const interactionLabel = computed(() =>
    props.warpOnClick && props.gravityWell
        ? "Move the constellation focal point or pull the field"
        : props.gravityWell
          ? "Pull the constellation field"
          : "Move the constellation focal point",
);

const expose = useConstellation(props, hostRef, canvasRef, { routePointer });
watch(expose.rendererStatus, (status) => emit("rendererStatus", status), {
    immediate: true,
    flush: "sync",
});
defineExpose(expose);
</script>

<template>
    <div
        ref="hostRef"
        :class="cn('constellation', props.class)"
        :role="interactive ? 'button' : undefined"
        :tabindex="interactive ? 0 : undefined"
        :aria-label="interactive ? interactionLabel : undefined"
    >
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

.constellation[role="button"]:focus-visible {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: 2px;
}

/* The root layout is consumer-overridable (the zero-paint
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
