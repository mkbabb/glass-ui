<script setup lang="ts">
import { inject, useTemplateRef, watch, ref, computed, onScopeDispose } from "vue";
import type { ColorResolver } from "../../../composables/color";
import { createTokenColorResolver } from "../../../composables/dom";
import type { BlobMood, BlobConfig, BlobQuality } from "./types";
import { BLOB_CONFIG_KEY } from "./types";
import { useBlobMood } from "./composables/useBlobMood";
import { useBlobPointer } from "./composables/useBlobPointer";
import { useBlobSatellites } from "./composables/useBlobSatellites";
import { useMetaballRenderer } from "./composables/useMetaballRenderer";

/**
 * GooBlob — a gooey metaball creature on a WebGL2 canvas.
 *
 * Renders a pulsing SDF body with orbiting satellites that periodically merge in,
 * get absorbed, then re-emerge. Mood, pointer-attraction and a deterministic
 * satellite system drive the motion. The renderer composes the `useWebGLCanvas`
 * substrate — it never bootstraps its own context.
 *
 * Color is resolved through an INJECTED `colorResolver` seam (DEC-AT-2): the blob
 * paints the GAMMA-sRGB triple it returns. The prop is REQUIRED — pass
 * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` (or your own) so a
 * `lab()`/`oklch()`/`hsl()`/hex string resolves correctly. A missing resolver
 * throws (the loud failure, not a silent gray).
 *
 * Config is resolved with the SAME loud discipline as the resolver: either
 * `provide(BLOB_CONFIG_KEY, cfg)` from an ancestor OR pass an explicit `config`
 * prop. A mount with NEITHER throws — there is no silent reactive-defaults
 * synthesis. A consumer that genuinely wants the stock tuning passes
 * `BLOB_CONFIG_DEFAULTS` explicitly.
 *
 * PAUSE (WCAG 2.2.2; AX.W16). The blob is a continuously-running AV surface, so it
 * carries a `v-model:paused` seam — the structurally-un-droppable declarative form
 * the `DockBackgroundToggle` already speaks (the same `@update:paused` shape Aurora's
 * `useAurora` reaches via pause/resume parity). `pause()`/`resume()` are ALSO
 * exposed for imperative call sites; both flip the SAME `paused` model (one path,
 * no parallel pause).
 */
const {
    color,
    colorResolver,
    config,
    seed = "",
    paused = false,
    quality = "full",
} = defineProps<{
    /** Base CSS color string (any form the `colorResolver` understands). */
    color: string;
    /** REQUIRED color seam — resolves `color` to a gamma-sRGB [r,g,b] triple in [0,1]. */
    colorResolver: ColorResolver;
    /**
     * REQUIRED unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it.
     * The metaball tuning. Pass `BLOB_CONFIG_DEFAULTS` for the stock look.
     */
    config?: BlobConfig;
    /** Extra seed string mixed into the satellite PRNG for a unique-but-reproducible system. */
    seed?: string;
    /**
     * The WCAG-2.2.2 pause state (`v-model:paused`). When true, the render loop
     * suspends the EXISTING substrate `'manual'` reason — the blob freezes. Wire it
     * to a `DockBackgroundToggle` (the Level-A obligation for a >5s auto background).
     */
    paused?: boolean;
    /**
     * Render-quality tier (AX.W16). `'full'` (default) renders at the DPR-clamped
     * device resolution; `'half'` renders the metaball pass at HALF internal
     * resolution then upsamples — ~4× fragment savings on weak GPUs, the soft FBM/AA
     * edge hides the interpolation.
     */
    quality?: BlobQuality;
}>();

const emit = defineEmits<{ click: []; "update:paused": [value: boolean] }>();

const injectedConfig = inject(BLOB_CONFIG_KEY, null);
const cfg = config ?? injectedConfig;
if (!cfg) {
    throw new Error(
        "[glass-ui] GooBlob: no blob config. Pass an explicit `config` prop " +
            "(e.g. BLOB_CONFIG_DEFAULTS) or provide(BLOB_CONFIG_KEY, cfg) from an " +
            "ancestor. There is no silent defaults synthesis.",
    );
}

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");

const mood = useBlobMood();
const pointer = useBlobPointer(wrapperRef);
const satelliteSystem = useBlobSatellites(cfg, color + seed);

// AX.W16 F4 — the ONE `var(--token)` un-wrap leaf (the renderer stays DOM-free).
// value.js's `parseCSSColor` cannot parse a `var()` wrapper and THREW once per
// frame on a token color (the AW.W13 `374b98e` bug). The SFC un-wraps EVERY color
// (base + rim + palette) to a concrete `rgb(...)` string via this leaf — the single
// cached `getComputedStyle` cascade read in the blob — BEFORE handing strings to the
// renderer. The renderer's `resolveRimColor` + `rimCache` are GONE: it now only ever
// sees concrete strings. Re-resolves on a color change AND on a dark-mode flip (a
// token resolves differently under `.dark`); `clear()` drops the cache on a theme
// flip so tokens re-resolve under the new cascade.
const tokenResolver = createTokenColorResolver(() => wrapperRef.value);

const resolvedColor = ref(color);
const resolvedRim = ref(cfg.rimColor);
const resolvedPalette = ref<string[]>([...cfg.paletteStops]);

function refreshResolvedColors(): void {
    resolvedColor.value = tokenResolver.resolve(color);
    resolvedRim.value = tokenResolver.resolve(cfg!.rimColor);
    resolvedPalette.value = cfg!.paletteStops.map((s) => tokenResolver.resolve(s));
}

const pausedRef = computed(() => paused);
const qualityRef = computed(() => quality);

useMetaballRenderer({
    canvasRef,
    color: resolvedColor,
    rimColor: resolvedRim,
    paletteStops: resolvedPalette,
    mood,
    pointer,
    satellites: satelliteSystem,
    config: cfg,
    paused: pausedRef,
    quality: qualityRef,
    colorResolver,
});

// Resolve once the host is in the tree (the cascade is live), then on every
// color change. A MutationObserver on `<html>`'s class re-resolves the token on
// a dark-mode flip without pulling in `@vueuse/core` (the SCC discipline).
watch(wrapperRef, refreshResolvedColors, { immediate: true });

let darkObserver: MutationObserver | null = null;
if (typeof document !== "undefined") {
    darkObserver = new MutationObserver(() => {
        tokenResolver.clear(); // tokens re-resolve under the new cascade
        refreshResolvedColors();
    });
    darkObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
}

const colorRef = computed(() => color);
watch(colorRef, (c) => {
    refreshResolvedColors();
    satelliteSystem.reseed(c + seed);
});

// A config-driven rim/palette change (e.g. a live `deriveBlobPalette`) re-resolves
// without touching the satellite seed.
watch(
    () => [cfg!.rimColor, cfg!.paletteStops] as const,
    refreshResolvedColors,
);

onScopeDispose(() => {
    darkObserver?.disconnect();
    darkObserver = null;
});

function nudge() {
    satelliteSystem.nudge();
}

function setMood(m: BlobMood) {
    mood.setMood(m);
}

// A click fires the one-shot spring impulse (W10) — the blob bounces — AND emits
// the `click` event. The impulse rides the renderer's single rAF (no parallel
// loop); under PRM the substrate freezes the rAF so the bounce is a no-op.
function pulse() {
    pointer.click(cfg!.clickImpulse);
}
function onBlobClick() {
    pulse();
    emit("click");
}

// Imperative pause/resume — the FALLBACK call-site shape (README worked example,
// the demo stories). Both emit `update:paused`, flipping the SAME `v-model:paused`
// model the renderer watches — NO parallel pause path (AX.W16 F0). A consumer can
// drive EITHER the declarative `v-model:paused` OR these handles; they are one seam.
function pause() {
    if (!paused) emit("update:paused", true);
}
function resume() {
    if (paused) emit("update:paused", false);
}

defineExpose({ nudge, setMood, pulse, pause, resume, currentMood: mood.currentMood });
</script>

<template>
    <div
        ref="wrapperRef"
        class="goo-blob-wrapper"
        :style="{ '--blob-color': color }"
        @click="onBlobClick"
    >
        <canvas
            ref="canvasRef"
            class="goo-blob-canvas"
            aria-hidden="true"
            data-testid="goo-blob-canvas"
        />
    </div>
</template>

<style scoped>
.goo-blob-wrapper {
    /* Layout footprint = width passed by parent (e.g. w-[7rem]) */
    aspect-ratio: 1;
    position: relative;
    z-index: var(--z-content);
    overflow: visible;
    cursor: pointer;
    /* AV.W7 F2 — layout/style containment isolates the blob as a layout root
       (NO `paint` containment: the 160%-canvas satellites intentionally
       overflow the wrapper footprint, and paint containment would clip them).
       `content-visibility:auto` (F1) lets the browser content-skip the blob
       when it scrolls offscreen — the substrate's `contentvisibilityautostate-
       change` listener then parks the RAF. content-visibility applies its own
       paint/layout containment ONLY while skipped (offscreen, invisible), so
       the on-screen overflow is preserved. `contain-intrinsic-size:auto`
       remembers the rendered size across a skip so the box does not collapse. */
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
    filter: drop-shadow(
        5px 5px 2.5px
            color-mix(in srgb, var(--blob-color, transparent) 20%, var(--foreground))
    );
    transition: filter var(--duration-slow, 0.45s) var(--ease-standard, ease);
}

.goo-blob-wrapper:hover {
    filter: drop-shadow(
        7px 7px 3px
            color-mix(in srgb, var(--blob-color, transparent) 25%, var(--foreground))
    );
}

/* Canvas is 160% of wrapper — overflows so satellites at wide orbits render
   beyond the layout footprint. */
.goo-blob-canvas {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160%;
    height: 160%;
    transform: translate(-50%, -50%);
    will-change: transform;
    pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
    .goo-blob-wrapper {
        filter: drop-shadow(
            5px 5px 2.5px
                color-mix(in srgb, var(--blob-color, transparent) 20%, var(--foreground))
        ) !important;
        transition: none !important;
    }
}
</style>
