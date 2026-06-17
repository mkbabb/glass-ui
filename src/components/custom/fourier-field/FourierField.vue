<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { ColorResolver } from "../../../composables/color";
import { useFourierField } from "./composables/useFourierField";

/**
 * FourierField — a Fourier epicycle field on a Canvas2D surface, a sibling
 * primitive to Aurora and GooBlob. A seeded elliptic spectrum reconstructs a
 * slow, never-ending closed curve via the inverse DFT; a fading comet trail
 * chases the curve's head, and (in the `hero` preset) the nested epicycle
 * circles and arms draw underneath in a harmonious second hue. It composes the
 * `useCanvas2D` substrate, so it inherits the offscreen / tab-hidden /
 * reduced-motion freeze for free — no hand-rolled RAF-park.
 *
 * Color resolves through the same INJECTED `colorResolver` seam as GooBlob: the
 * field paints the gamma-sRGB triple it returns. The prop is REQUIRED — pass
 * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` so a `var()` /
 * `light-dark()` token, an `oklch()` / `hsl()` / hex string all resolve. A
 * `var()` token is first resolved to a concrete `rgb()` against the host's
 * inherited color-scheme, then re-resolved on a color change AND on a dark-mode
 * toggle so the field retints with the theme.
 *
 * `variant` is the configuration BUNDLE, not a recolour of one curve: `hero`
 * draws a few big phasors with the epicycles ON and a warm trail feel; `final`
 * draws a denser elliptic spectrum with the epicycles OFF. One engine, two
 * presets. The hue itself always comes from the consumer's `color`.
 *
 * BB.W-CARVE3 — the ~475-line renderer lives in `composables/useFourierField.ts`
 * (the colocation symmetry Aurora/`useAurora.ts`, GooBlob/`useMetaballRenderer.ts`
 * and Constellation/`useConstellation.ts` already carry). The SFC stays thin: the
 * props, the two template refs, and the single `useFourierField(props, …)` call.
 */
const props = withDefaults(
    defineProps<{
        /** Configuration bundle. `hero` = epicycles on, fewer harmonics; `final` = epicycles off, denser. Default `hero`. */
        variant?: "hero" | "final";
        /** Base CSS color (any form the resolver understands; a `var()`/`light-dark()` token resolves against the host). */
        color: string;
        /** REQUIRED color seam — resolves a concrete color to a gamma-sRGB [r,g,b] triple in [0,1]. */
        colorResolver: ColorResolver;
        /** Extra seed mixed into the spectrum PRNG for a unique-but-reproducible curve. Default "". */
        seed?: string;
        /** When true, paint ONE static deterministic best-frame and never animate (the capture/export lever). Default false. */
        freeze?: boolean;
        /** Outer loudness envelope (the Aurora `opacityCeiling` shape). Scales the
         *  resolved `peakAlpha`/`headGlowAlpha` at the PAINT layer (a per-LAYER
         *  multiply, not a uniform CSS opacity). Default 1 (the bundle's resting
         *  loudness); clamped [0, 2] — the field's ~2 upper bound lets a hero push
         *  brighter than the recessed default without runaway. */
        intensity?: number;
        /** OPTIONAL injected clock — a getter returning the loop parameter `t ∈ [0,1)`.
         *  When BOUND, the render reads `clock()` (a controllable studio clock: pause,
         *  scrub, speed); when ABSENT (the ambient face), the autonomous
         *  `(now / durationMs) % 1` frame-time loop is the DEFAULT. `freeze` /
         *  `prefers-reduced-motion` still short-circuit to `frozenT` regardless — the
         *  ambient bundle is unchanged. The SOLE additive seam (BA.W-FOURIER-STUDIO). */
        clock?: () => number;
    }>(),
    {
        variant: "hero",
        seed: "",
        freeze: false,
        intensity: 1,
    },
);

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

useFourierField(props, { hostRef, canvasRef });
</script>

<template>
    <div ref="hostRef" class="fourier-field">
        <canvas ref="canvasRef" class="fourier-field-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The field is decorative background chrome. `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange
   listener fires on this host); `contain` keeps it a layout/paint root. The
   deck theme.css pins `.fourier-field`'s z-index, so the root class is exactly
   `fourier-field`. */
.fourier-field {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.fourier-field-canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
