<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from "vue";
import type { ColorResolver, OklchStop } from "../../../composables/color";
import { cssToOklch } from "../../../composables/color";
import { resolveTokenColor } from "../../../composables/dom";
import { useGlobalDark } from "../../../composables/dark";
import { mulberry32, hashString } from "../../../utils/prng";
import { makeEllipticSpectrum, type BasisComponent } from "./math";
import type { FourierFieldConfig } from "./constants";
import { DEFAULT_FOURIER_CONFIG, MAX_PHASORS } from "./constants";
import { useFourierField } from "./composables/useFourierField";

/**
 * FourierField — a Fourier epicycle field on the GPU substrate (BC.W-VIZ-FOURIER), a
 * sibling primitive to Aurora, GooBlob, and DotFlowField. A chain of rotating circles
 * stacked tip-to-tail draws the reconstructing partial-sum curve; a glowing comet head
 * leads the fading trail. WebGPU-FIRST: the compute pass writes the partial-sum curve +
 * the epicycle chain tips, the fullscreen-fragment render pass composites the SDF field; a
 * WebGL2 GLSL twin is the genuinely-absent-tail fallback (the §E "WebGPU everywhere"
 * mandate — the Canvas2D renderer is RETIRED). It composes `useFourierField` → the
 * `createGpuSubstrate` picker over the ONE canvas lifecycle leaf (offscreen-pause, live-PRM
 * freeze, consumer-owned DPR) and the SHARED `usePointerVelocityField` (the pointer SCRUBS
 * the reconstruction).
 *
 * The DEFAULT palette is the warm-cream library identity (`--viz-fourier` warm-amber); a
 * demo Teal/cool preset stays demo-LOCAL (presets-in-consumers — never a library token).
 *
 * The `variant: "hero"|"final"` prop is RETIRED (BC.W-VIZ-FOURIER — the bundles fold into
 * config presets, MIGRATION row). An ambient-background consumer passes `color` (+ the
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

// The effective config — the passed config, or the warm-identity default; the ambient
// `intensity` prop overrides when set, and an ambient consumer (no config) defaults to a
// non-interactive recessive register.
const cfg = computed<FourierFieldConfig>(() => {
    const base = props.config ?? DEFAULT_FOURIER_CONFIG;
    const intensity =
        props.intensity != null
            ? Math.max(0, Math.min(2, props.intensity))
            : base.intensity;
    // An ambient-background consumer (passes `color`, no `config`) is non-interactive.
    const interactive = props.config ? base.interactive : false;
    return { ...base, intensity, interactive };
});

// The active spectrum — the explicit `spectrum` prop (a curated shape DFT) wins; otherwise a
// seeded elliptic spectrum is generated CPU-side from the config (the ONE spectrum mint —
// makeEllipticSpectrum runs in JS; the WGSL only SUMS the uploaded phasor table).
const spectrum = computed<readonly BasisComponent[]>(() => {
    if (props.spectrum && props.spectrum.length > 0) return props.spectrum;
    const liveSeed = props.freeze ? "fourier-field/frozen" : props.seed || "fourier-field";
    const rng = mulberry32(hashString(liveSeed + props.seed));
    return makeEllipticSpectrum(rng, {
        harmonics: Math.min(cfg.value.harmonics + 4, MAX_PHASORS - 2),
        harmonicScale: cfg.value.harmonicScale,
    });
});
const getSpectrum = (): readonly BasisComponent[] => spectrum.value;

// AW.W13 seam — resolve a `var(--token)`/`light-dark()` color to a concrete value BEFORE
// reading it (value.js cannot parse a `var()` wrapper). The host element resolves the
// cascade through the SHARED un-wrap leaf (`resolveTokenColor` — the ONE
// getComputedStyle-paint-and-read path the aurora/blob ColorResolver seam uses); the
// `light-dark()` literal rides the same paint-and-read trick (a `light-dark()` painted on
// a real CSS property resolves through the cascade), so it is folded into the leaf's
// scope here. A `var()`/`light-dark()` wrapper that did NOT resolve concretely (the host
// is not yet mounted — the immediate watch fires in setup() before `hostRef`) is NOT
// handed to value.js (it cannot parse the wrapper and throws); the caller keeps the prior
// warm-identity palette until the on-mount resolve lands.
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
        // reference). Keep the prior warm-identity palette and re-resolve on mount.
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

// BD.W-VIZ-BROKEN-FIX D1 — pass a LIVE forward-through config (the GooBlob `renderConfig`
// Proxy idiom, the fourier analogue). `cfg` is a `computed<FourierFieldConfig>` over
// `props.config` + the intensity/interactive overrides; `cfg.value` SPREADS the live
// reactive getters into a FROZEN snapshot read ONCE — so the renderer's per-frame setups
// (which read `config.harmonics`/`.intensity`/… off the captured reference) never saw a
// control edit (the "options do not even work" defect). The Proxy forwards EVERY reflection
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
// BD.W-FOURIER-LOOM §2a — the lit-field seam. The composable hands the comet head's [0,1]²
// UV here once per frame (from INSIDE the ONE clock — NO second rAF); the SFC writes it to
// `--ff-head-xy` on its own host so the warm field's phosphor bloom (mounted by the page-
// background warm field) tracks the comet. The write is a string `"x y"` the CSS reads via
// a fixed-size bloom SPRITE TRANSLATED to it (a compositor transform, not a re-rastered
// gradient center — the per-frame-paint honesty fence). Absent at HEAD (born-RED); present +
// STABLE under PRM (the frozen-T head — the bloom seats, no sweep). The hue is written
// reactively off the palette base (NOT per frame), so it tracks the active warm anchor.
function writeHeadXY(unit: { x: number; y: number } | null): void {
    const el = hostRef.value;
    if (!el || !unit) return;
    el.style.setProperty("--ff-head-xy", `${unit.x.toFixed(4)} ${unit.y.toFixed(4)}`);
}

const renderer = useFourierField(canvasRef, {
    config: renderConfig,
    getSpectrum,
    getPalette,
    freeze: () => props.freeze,
    onHeadFrame: writeHeadXY,
});

// `--ff-head-hue` — the bloom's warm anchor hue (degrees), written reactively off the
// resolved palette base (the comet core stop), NOT per frame. Re-runs on a palette/mode
// flip so the bloom hue tracks the active warm anchor (the §2a hue seam).
function writeHeadHue(): void {
    const el = hostRef.value;
    if (!el) return;
    const base = resolvedPalette.value[0];
    if (base) el.style.setProperty("--ff-head-hue", `${base.h.toFixed(1)}`);
}
// Wake a parked loop on a config edit (the blob paletteStops-watcher precedent) so a
// control change to a quiescent field repaints same-frame.
watch(() => props.config, () => renderer.wake(), { deep: true });

watch([() => props.color, () => props.getPalette, isDark], refreshPalette, {
    immediate: true,
});
// The §2a head-hue seam — re-write `--ff-head-hue` whenever the resolved palette changes
// (a palette/mode flip retints the bloom anchor). The host may not exist yet in setup(); the
// onMounted below seeds it once the element is real.
watch(resolvedPalette, writeHeadHue);
// The immediate watch fires in setup() before `hostRef` is mounted, so a `var()`-token
// `color` cannot resolve the cascade yet (it kept the warm-identity default). Re-resolve
// once the host element exists — the `var()` un-wrap now reaches a real element.
onMounted(() => {
    refreshPalette();
    writeHeadHue();
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
    headUnit: renderer.headUnit,
});
</script>

<template>
    <div
        ref="hostRef"
        class="fourier-field"
        :class="{ 'fourier-field--interactive': cfg.interactive }"
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
