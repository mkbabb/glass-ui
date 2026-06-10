<script setup lang="ts">
import { inject, useTemplateRef, watch, ref, computed, onScopeDispose } from "vue";
import { createTokenColorCache } from "../../../composables/dom";
import type { BlobMood, BlobConfig } from "./types";
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
 * Color is resolved INTERNALLY through the `/color` leaf (`cssToOklch →
 * oklchToGammaRgb`): the blob paints the GAMMA-sRGB triple of the `color` prop. A
 * `lab()`/`oklch()`/`hsl()`/hex string resolves correctly; a `var(--token)` is
 * un-wrapped to a concrete string by the SFC's `resolveTokenColor` leaf BEFORE the
 * renderer sees it (the DOM-free renderer contract).
 *
 * Config is resolved with a loud discipline: either
 * `provide(BLOB_CONFIG_KEY, cfg)` from an ancestor OR pass an explicit `config`
 * prop. A mount with NEITHER throws — there is no silent reactive-defaults
 * synthesis. A consumer that genuinely wants the stock tuning passes
 * `BLOB_CONFIG_DEFAULTS` explicitly.
 */
const {
    color,
    config,
    seed = "",
    paused = false,
} = defineProps<{
    /** Base CSS color string (a `var()`/`oklch()`/`lab()`/`hsl()`/hex form; resolved
     *  internally through the `/color` leaf to a gamma-sRGB triple). */
    color: string;
    /**
     * REQUIRED unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it.
     * The metaball tuning. Pass `BLOB_CONFIG_DEFAULTS` for the stock look.
     */
    config?: BlobConfig;
    /** Extra seed string mixed into the satellite PRNG for a unique-but-reproducible system. */
    seed?: string;
    /**
     * AX.W16 — the declarative WCAG-2.2.2 pause seam. `v-model:paused` parks the
     * render loop (the substrate's `manual` suspend) when `true` and restarts it when
     * `false`. This is the EXACT shape `<DockBackgroundToggle>` wears — wire its
     * `@update:paused` to this `v-model` and the blob's animation stops/starts for ALL
     * users. The imperative `pause()`/`resume()` defineExpose handles bind the SAME
     * renderer seam (no parallel pause path); the prop owns the default.
     */
    paused?: boolean;
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

// AY.W-BLOB-CONFIG D1 — the LIVE config. `cfg` above is the mount-time snapshot the
// renderer + satellite system close over (their atoms are static for the lifetime). But
// the `config` PROP is reactive (a consumer that drives a seed/harmony UI feeds a fresh
// config object — the demo's `heroConfig` computed re-emits `color.paletteStops` from
// the seed), and the palette must reach the LIVE hero. `liveConfig()` re-reads the
// reactive prop (falling back to the injected config) so the paletteStops watcher below
// always resolves the CURRENT stops, not the stale snapshot.
const liveConfig = (): BlobConfig => config ?? injectedConfig ?? cfg!;

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");

const mood = useBlobMood();
const pointer = useBlobPointer(wrapperRef);
const satelliteSystem = useBlobSatellites(cfg, color + seed);

// AX.W16 (arm 4) — un-wrap EVERY color string (base + rim + every palette stop) to a
// CONCRETE value HERE, in the SFC, via the ONE `resolveTokenColor` leaf, BEFORE handing
// strings to the renderer. value.js's `parseCSSColor` cannot parse a `var(--token)`
// wrapper and THROWS once per frame on a token color (the AW.W13 live bug); a token
// also resolves differently under `.dark`. The leaf paints the string onto the host
// `color:` and reads back the browser-resolved `rgb(...)` (the single cached
// `getComputedStyle` cascade read — `getComputedStyle` now appears EXACTLY ONCE in the
// codebase for this concern). The renderer receives concrete strings only and stays
// DOM-FREE (the inv-K-3 seam restored — the renderer's prior `resolveRimColor` +
// `rimCache` DOM-reach is DELETED). Re-resolves on a color change AND on a dark-mode
// flip (the MutationObserver on `<html>.class`, vueuse-free per the SCC discipline).
const tokenColors = createTokenColorCache();
const resolvedColor = ref(color);
const resolvedRim = ref(cfg!.surface.rimColor);
const resolvedStops = ref<string[]>([...cfg!.color.paletteStops]);

function refreshResolvedColors(): void {
    const el = wrapperRef.value;
    const live = liveConfig();
    // The cascade may have flipped (dark-mode) — drop the cache so tokens re-resolve.
    tokenColors.invalidate();
    resolvedColor.value = tokenColors.resolve(color, el);
    resolvedRim.value = tokenColors.resolve(live.surface.rimColor, el);
    resolvedStops.value = live.color.paletteStops.map((s) => tokenColors.resolve(s, el));
}

// AX.W16 (arm 1) — CAPTURE the renderer return (the prior code DISCARDED it, which is
// why `pause`/`resume` were undefined at every consumer — the dead WCAG-2.2.2 seam).
// The captured handles bind the EXISTING substrate `manual` suspend (no parallel pause
// path); the declarative `v-model:paused` prop drives them and the imperative
// `pause()`/`resume()` re-exposed below bind the SAME handles.
const renderer = useMetaballRenderer({
    canvasRef,
    color: resolvedColor,
    rimColor: resolvedRim,
    paletteStops: resolvedStops,
    mood,
    pointer,
    satellites: satelliteSystem,
    config: cfg,
});

// Resolve once the host is in the tree (the cascade is live), then on every color
// change. A MutationObserver on `<html>`'s class re-resolves the tokens on a dark-mode
// flip without pulling in `@vueuse/core` (the SCC discipline).
watch(wrapperRef, refreshResolvedColors, { immediate: true });

let darkObserver: MutationObserver | null = null;
if (typeof document !== "undefined") {
    darkObserver = new MutationObserver(refreshResolvedColors);
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

// AY.W-BLOB-CONFIG D1 — the dead hero color-feed fix. The renderer reads the
// `resolvedStops` Ref every frame, but the Ref was resolved ONCE at mount and only
// re-resolved on a `color`-prop / dark-mode flip — never on a `paletteStops` change. So
// a consumer driving a seed/harmony UI (the demo's `deriveBlobPalette(seed) →
// config.color.paletteStops` feed) updated the CONFIG but the hero body stayed
// byte-identical. This watcher closes the config→Ref wire: a post-mount paletteStops (or
// rimColor) change in the LIVE config re-resolves into the Ref the renderer paints from.
// `deep` because the stops array mutates in place when a consumer mutates the same
// reactive config object; the live-config getter also catches a whole-object swap (the
// demo's `heroConfig` computed re-emits a fresh object). The wake repaints under park.
watch(
    () => {
        const c = liveConfig();
        return [c.color.paletteStops.join("|"), c.surface.rimColor];
    },
    () => refreshResolvedColors(),
    { deep: true },
);

// Drive the substrate pause/resume from the declarative `paused` prop. `immediate`
// so a blob mounted already-`paused` parks from the first frame (the renderer's local
// `paused` flag gates `shouldContinue` even before the canvas handle arms).
watch(
    () => paused,
    (p) => (p ? renderer.pause() : renderer.resume()),
    { immediate: true },
);

onScopeDispose(() => {
    darkObserver?.disconnect();
    darkObserver = null;
});

function nudge() {
    satelliteSystem.nudge();
}

// AX.W46 D7 — the imperative `setMood` expose is a MANUAL retarget: it pins the mood
// above the autonomic arc (`source: "manual"`), so the demo mood pills + any consumer
// `blobRef.setMood(m)` drive a VISIBLE, PERSISTING param delta instead of being
// clobbered back to idle within one frame. The latch releases on a fresh live
// interaction (a hover/click over the canvas), handing control back to the auto-arc.
function setMood(m: BlobMood) {
    mood.setMood(m, { source: "manual" });
}

// A click fires the one-shot spring impulse (W10) — the blob bounces — AND emits
// the `click` event. The impulse rides the renderer's single rAF (no parallel
// loop); under PRM the substrate freezes the rAF so the bounce is a no-op.
function pulse() {
    pointer.click(cfg!.interaction.clickImpulse);
}
function onBlobClick() {
    pulse();
    emit("click");
}

// AX.W16 — the defineExpose now carries `pause`/`resume` (the imperative half of the
// WCAG-2.2.2 seam — the README table + Aurora-parity), alongside the declarative
// `v-model:paused` prop. Both bind the SAME captured renderer handles.
defineExpose({
    nudge,
    setMood,
    pulse,
    currentMood: mood.currentMood,
    pause: renderer.pause,
    resume: renderer.resume,
});
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
    /* AY.W-COHERE E2 — the gel-bead AMBIENT contact shadow (the tokenised
       `--blob-shadow`), NOT the hard `5px 5px` near-black cartoon offset-stamp.
       A lit gel dome sits IN the scene with a soft, near-centered, low-offset,
       ambient-tinted contact shadow (the same soft-light register the other live
       substrates speak); the Memphis offset-stamp stays the identity of
       <Card surface="cartoon"> only. Adaptive-by-construction via the token's
       `--shadow-color`/`--foreground` base (re-resolves under .dark, no hardcoded
       .dark block here). */
    filter: drop-shadow(var(--blob-shadow));
    transition: filter var(--duration-slow, 0.45s) var(--ease-standard, ease);
}

.goo-blob-wrapper:hover {
    filter: drop-shadow(var(--blob-shadow-hover));
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
        /* AY.W-COHERE E2 — the same ambient contact shadow under PRM (the gel-bead
           lighting language, never the hard offset-stamp); only the transition is
           cut. */
        filter: drop-shadow(var(--blob-shadow)) !important;
        transition: none !important;
    }
}
</style>
