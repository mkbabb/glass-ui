<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from "vue";
import type { ColorResolver, OklchStop } from "../../composables/color";
import { cssToOklch } from "../../composables/color";
import { resolveTokenColor } from "../../composables/dom";
import { useGlobalDark } from "../../composables/dark";
import { useRoutePointer } from "../../composables/motion/pointer/useRoutePointer";
import { mulberry32, hashString } from "../../composables/glass/procedural/prng";
import {
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    type BasisComponent,
} from "./math";
import type { FourierFieldConfig } from "./constants";
import { DEFAULT_FOURIER_CONFIG, MAX_PHASORS } from "./constants";
import { useFourierField } from "./composables/useFourierField";
import type { RendererStatus } from "../../composables/glass/webgpu/rendererStatus";

const emit = defineEmits<{ rendererStatus: [status: RendererStatus] }>();

/**
 * FourierField — a Fourier epicycle field on the GPU substrate, a
 * sibling primitive to Aurora, GooBlob, and DotFlowField. A chain of rotating circles
 * stacked tip-to-tail draws the reconstructing partial-sum curve; a glowing comet head
 * leads the fading trail. WebGPU-FIRST: the compute pass writes the partial-sum curve +
 * the epicycle chain tips, the fullscreen-fragment render pass composites the SDF field; a
 * WebGL2 GLSL twin is the fallback. It composes `useFourierField` with the
 * `createGpuSubstrate` picker over the ONE canvas lifecycle leaf (offscreen-pause, live-PRM
 * freeze, consumer-owned DPR) and the SHARED `usePointerVelocityField` (the pointer SCRUBS
 * the reconstruction).
 *
 * The DEFAULT palette is the warm-cream library identity (`--viz-fourier` warm-amber); a
 * demo Teal/cool preset stays demo-LOCAL (presets-in-consumers — never a library token).
 *
 * Visual bundles live in config presets. An ambient-background consumer passes `color` and the
 * `colorResolver`) for a thin warm default preserving the recessive look; the studio passes
 * the full `config` + `spectrum` + `getPalette`.
 */
const props = withDefaults(
    defineProps<{
        /** The full author config (the studio's `useConfiguratorState` model). Defaults to the warm identity. */
        config?: FourierFieldConfig;
        /** An explicit CPU-minted spectrum (a curated shape's DFT). When absent, a seeded elliptic spectrum is generated. */
        spectrum?: readonly BasisComponent[];
        /** Resolve the curve palette as OKLCh (the studio themes it). When absent, `color`/`config.palette` is used. */
        getPalette?: () => OklchStop[];
        /** Ambient-consumer color seam — a `var()`/`light-dark()` token or a literal; derives a warm 2-stop palette. */
        color?: string;
        /** The color resolver (the GooBlob/Aurora seam) — required when `color` is a `var()` token. */
        colorResolver?: ColorResolver;
        /** Extra seed mixed into the generated elliptic spectrum PRNG. Default "". */
        seed?: string;
        /** Paint ONE static deterministic best-frame and never animate (the capture lever). Default false. */
        freeze?: boolean;
        /** Outer loudness envelope (scales the per-layer alpha). When set, overrides `config.intensity`; clamped [0,2]. */
        intensity?: number;
    }>(),
    {
        seed: "",
        freeze: false,
    },
);

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const { isDark } = useGlobalDark();

// the route pointer BROADCASTER (the interactive-background standard). A
// full-bleed `pointer-events:none` field cannot listen for its own pointer; it reads the ONE
// capture-phase window listener the route provides (StoryHero) and feeds the shared field.
const route = useRoutePointer();

// The effective config is the passed config or warm-identity default; the ambient
// `intensity` prop overrides when set. An ambient consumer without config uses the
// SUBTLE-INTERACTIVE background register — the field responds to the route pointer (a subtle
// centroid lean) while the CANVAS stays `pointer-events:none` (the route broadcaster captures
// at the window, so the field never consumes page hit-testing).
const cfg = computed<FourierFieldConfig>(() => {
    const base = props.config ?? DEFAULT_FOURIER_CONFIG;
    const intensity =
        props.intensity != null
            ? Math.max(0, Math.min(2, props.intensity))
            : base.intensity;
    // The FIELD responds (lean/scrub): the studio's config-driven value, or a subtle
    // route-fed register for the ambient consumer.
    const interactive = props.config ? base.interactive : true;
    return { ...base, intensity, interactive };
});

// The CSS `pointer-events:auto` register is ONLY for the STUDIO (which binds its OWN host
// listeners). The ambient route-fed field keeps `pointer-events:none` — it reads the window
// broadcaster, never its own listener, so it never occludes the page.
const hostInteractive = computed(() => !!props.config && cfg.value.interactive);
// The route-pointer read fed to the ambient field (undefined for the studio — it owns its
// host listeners, so the route feed would double-write). Viewport-normalized ≈ host-normalized
// for a full-bleed background field.
const routePointerRead = props.config
    ? undefined
    : () => ({
          x: route.pointer.value.x,
          y: route.pointer.value.y,
          active: route.active.value,
      });

// The active spectrum — the explicit `spectrum` prop (a curated shape DFT) wins; otherwise a
// seeded elliptic spectrum is generated CPU-side from the config (the ONE spectrum mint —
// makeEllipticSpectrum runs in JS; the WGSL only SUMS the uploaded phasor table).
const spectrum = computed<readonly BasisComponent[]>(() => {
    if (props.spectrum && props.spectrum.length > 0) return props.spectrum;
    //  B2 — a `source` naming a curated closed-figure recipe generates a
    // DELIBERATE flower/epicycle figure (integer-index → closes by construction), not the
    // "boring" random ellipse. The default `source: "elliptic"` keeps the seeded generator.
    const figure = FOURIER_FIGURES[cfg.value.source];
    if (figure) return makeHarmonicFigure(figure);
    const liveSeed = props.freeze ? "fourier-field/frozen" : props.seed || "fourier-field";
    const rng = mulberry32(hashString(liveSeed + props.seed));
    return makeEllipticSpectrum(rng, {
        harmonics: Math.min(cfg.value.harmonics + 4, MAX_PHASORS - 2),
        harmonicScale: cfg.value.harmonicScale,
    });
});
const getSpectrum = (): readonly BasisComponent[] => spectrum.value;

// Resolve a `var(--token)`/`light-dark()` color to a concrete value before
// reading it (value.js cannot parse a `var()` wrapper). The host element resolves the
// cascade through the SHARED un-wrap leaf (`resolveTokenColor` — the ONE
// getComputedStyle-paint-and-read path the aurora/blob ColorResolver seam uses); the
// `light-dark()` literal rides the same paint-and-read trick (a `light-dark()` painted on
// a real CSS property resolves through the cascade), so it is folded into the leaf's
// scope here. A `var()`/`light-dark()` wrapper that did NOT resolve concretely (the host
// is not yet mounted — the immediate watch fires in setup() before `hostRef`) is NOT
// handed to value.js; the caller keeps the warm-identity palette until mount resolves it.
function resolveColorString(css: string): string {
    if (!css.includes("var(") && !css.includes("light-dark(")) return css;
    const el = hostRef.value;
    if (typeof window === "undefined" || !el) return css;
    // resolveTokenColor un-wraps a `var()` wrapper; paint-and-read the cascade for a
    // `light-dark()` wrapper the leaf's `var(`-only guard skips.
    if (css.includes("var(")) return resolveTokenColor(css, el);
    const prev = el.style.color;
    el.style.color = css;
    const resolved = getComputedStyle(el).color;
    el.style.color = prev;
    return resolved || css;
}

// The resolved palette — the studio's `getPalette` wins; otherwise derive a warm 2-stop ramp
// from the ambient `color` seam; otherwise the config palette. Re-resolves on a dark flip
// (the `isDark` reactive read).
const resolvedPalette = shallowRef<OklchStop[]>(cfg.value.palette);
function refreshPalette(): void {
    if (props.getPalette) {
        resolvedPalette.value = props.getPalette();
        return;
    }
    void isDark.value; // the dark-flip retint trigger
    if (props.color) {
        const resolved = resolveColorString(props.color);
        // Guard the value.js parse: an UNRESOLVED `var()`/`light-dark()` wrapper (the
        // host is not yet mounted) cannot be parsed by value.js (it throws on a `var()`
        // reference). Keep the warm-identity palette and re-resolve on mount.
        if (resolved.includes("var(") || resolved.includes("light-dark(")) return;
        const base = cssToOklch(resolved);
        resolvedPalette.value = [
            { L: Math.max(0.5, base.L), C: Math.max(0.12, base.C), h: base.h },
            { L: Math.min(0.9, base.L + 0.22), C: base.C * 0.4, h: base.h + 18 },
        ];
        return;
    }
    resolvedPalette.value = cfg.value.palette;
}
const getPalette = (): OklchStop[] => resolvedPalette.value;

// Pass a live forward-through config. `cfg` is a `computed<FourierFieldConfig>` over
// `props.config` plus intensity/interactive overrides; spreading `cfg.value` would freeze
// its getters. The proxy forwards every reflection
// (get/has/ownKeys/getOwnPropertyDescriptor — the setups spread/enumerate `config` in
// places, so a bare `get`-only Proxy over `{}` would enumerate empty) to `cfg.value`, so
// the per-frame reads track every configurator edit with NO re-feed wiring.
const renderConfig = new Proxy({} as FourierFieldConfig, {
    get: (_t, key) => Reflect.get(cfg.value, key),
    has: (_t, key) => Reflect.has(cfg.value, key),
    ownKeys: () => Reflect.ownKeys(cfg.value),
    getOwnPropertyDescriptor: (_t, key) =>
        Reflect.getOwnPropertyDescriptor(cfg.value, key),
});
// The comet head is painted by the GPU head quad, not a per-frame CSS restyle.
const renderer = useFourierField(canvasRef, {
    config: renderConfig,
    getSpectrum,
    getPalette,
    freeze: () => props.freeze,
    // the ambient field reads the route broadcaster (the canvas is
    // pointer-events:none; the studio owns its host listeners so this is undefined there).
    routePointer: routePointerRead,
});
watch(renderer.rendererStatus, (status) => emit("rendererStatus", status), {
    immediate: true,
    flush: "sync",
});

// Wake a parked loop on a config edit (the blob paletteStops-watcher precedent) so a
// control change to a quiescent field repaints same-frame.
watch(() => props.config, () => renderer.wake(), { deep: true });

watch([() => props.color, () => props.getPalette, isDark], refreshPalette, {
    immediate: true,
});
// The immediate watch fires in setup() before `hostRef` is mounted, so a `var()`-token
// `color` cannot resolve the cascade yet (it kept the warm-identity default). Re-resolve
// once the host element exists — the `var()` un-wrap now reaches a real element.
onMounted(() => {
    refreshPalette();
});
watch(isDark, () => renderer.wake());
watch(
    () => props.freeze,
    () => renderer.wake(),
);

defineExpose({
    backend: () => renderer.backend,
    pause: renderer.pause,
    resume: renderer.resume,
    wake: renderer.wake,
    renderAt: renderer.renderAt,
    setHeadT: renderer.setHeadT,
    rendererStatus: renderer.rendererStatus,
});
</script>

<template>
    <div
        ref="hostRef"
        class="fourier-field"
        :class="{ 'fourier-field--interactive': hostInteractive }"
    >
        <canvas ref="canvasRef" class="fourier-field-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The field is decorative background chrome. `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange listener fires
   on this host); `contain` keeps it a layout/paint root. The deck theme.css pins
   `.fourier-field`'s z-index, so the root class is exactly `fourier-field`. */
.fourier-field {
    position: absolute;
    inset: 0;
    z-index: 0;
    /* Ambient (recessive background) by default — the field never eats the page's
       hit-testing. The interactive studio register opts the wrapper into pointer events so
       the scrub gesture (pointer X → head_t) reaches it. */
    pointer-events: none;
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.fourier-field--interactive {
    pointer-events: auto;
}

.fourier-field-canvas {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
