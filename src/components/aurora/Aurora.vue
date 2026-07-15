<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from "vue";
import { useAurora } from "./composables/useAurora";
import { auroraFallbackGround } from "./composables/auroraFallbackGround";
import type { AuroraRuntimeOptions } from "./composables/runtime";
import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "./constants/presets";
import { resolveRenderMode, type AuroraRenderMode } from "./constants/renderMode";
import type { RendererStatus } from "../../composables/glass/webgpu/rendererStatus";

const emit = defineEmits<{ rendererStatus: [status: RendererStatus] }>();

/**
 * Aurora — a painterly WebGL2 background.
 *
 * Renders into a single canvas sized to its container via ResizeObserver.
 * Config is reactive; the composable watches it deeply and re-uploads
 * uniforms on change. Cursor interaction is deliberately not wired here —
 * use `useCursorInteraction` (or call the exposed `setCursor` API) against
 * the container element so the consumer controls pointer policy.
 *
 * Lazy-arm (HA4 §1): by default the expensive WebGL init (shader compile +
 * GPU link) is deferred past the consumer's first paint. Until the runtime
 * arms, a palette-derived GROUND placeholder (`auroraFallbackGround` — the
 * field-sampled nuclei-glow, BI.W-E10-AURORA-ENTRANCE) paints the first frame
 * with zero JS / zero GPU; the canvas cross-fades in over it once armed. The
 * ground is derived from the SAME palette + nuclei the WebGL path uploads, so
 * FRAME 0 is palette-COLORED (never the retired flat gray band) and the live
 * canvas WARMS INTO it — a same-palette dissolve with no tone jump (the UF-E10
 * "no repulsive-gray fade" law). The placeholder stays mounted underneath as
 * the natural WebGL2-unavailable visual fallback (HA4 §1.5). Capture /
 * thumbnail-baking consumers pass `runtimeOptions.initStrategy: "eager"` (or
 * `mode: "capture"`) to arm synchronously.
 *
 * Init failures (WebGL2 unavailable, shader compile/link failure) are
 * library-internal contract violations and surface by default (O invariant
 * 24): synchronously on the eager path, on the microtask queue on the
 * deferred path. Pass `onInitError` to handle the error and leave the canvas
 * unmounted instead — the canonical opt-in path back to silent fallback.
 *
 * `opacityCeiling` (A3 §6.R-9, G-AK-D11) is the outer compositing envelope:
 * `1.0` (default) for hero surfaces, `~0.5` for quiet content-over-aurora
 * routes where form/text density would otherwise compete with the drift.
 * It applies uniformly to the placeholder and the canvas so the cross-fade
 * rides under the clamped ceiling and the shader's per-pixel `alpha`
 * remains an orthogonal authoring concern.
 */
const props = withDefaults(
    defineProps<{
        /**
         * Aurora field configuration (palette, nuclei, warp, media). Optional —
         * omit it and the canonical `DEFAULT_AURORA_CONFIG` painterly look
         * renders (gap 11, AM.W1). Pass a full config to author a custom field,
         * or a preset object from `./constants/presets`. The default is supplied via a
         * `withDefaults` factory so each mount gets its own (un-shared) object.
         */
        config?: AuroraConfig;
        runtimeOptions?: AuroraRuntimeOptions;
        onInitError?: (err: Error) => void;
        /**
         * Adaptive render substrate (AM.W1; `aurora-lazy-init §3.1`). Aurora is
         * NEVER retired — the warm wash always composites; only the substrate
         * adapts:
         *   - `"webgl"` — arm the WebGL path (still deferred to idle past first
         *     paint via the `initStrategy:"deferred"` default).
         *   - `"css"`   — never arm WebGL; the `auroraFallbackGround` palette-
         *     derived ground stays the permanent surface (the warm wash
         *     composites, it just does not animate).
         *   - `"auto"` (default) — resolves to `"webgl"` on every device EXCEPT a
         *     detected SOFTWARE renderer (SwiftShader / llvmpipe / MS Basic Render),
         *     which falls to `"css"` (the page-wedging-software-raster guard, the only
         *     surviving `"css"` signal). BC.W-VIZ-AURORA (T1) RETIRED the dead-static
         *     `hardwareConcurrency <= 4` / `saveData` / `reduced-motion` falls: a
         *     2026-capable low-core / throttled tab no longer gets a frozen gradient
         *     (the "renders SLOW" defect root), and reduced-motion is handled SOLELY by
         *     the substrate's live `matchMedia` freeze (one static frame then park,
         *     re-arms on un-reduce). Resolved once at setup; SSR / missing-API safe
         *     (assumes capable → `"webgl"` when the probes are unavailable).
         */
        renderMode?: AuroraRenderMode;
        /**
         * Per-route aurora saturation clamp (A3 §6.R-9 / G-AK-D11).
         *
         * The shader's `alpha` config field is per-pixel pigment opacity inside
         * the painted image. `opacityCeiling` is the *outer envelope* — the
         * maximum compositing opacity the aurora surface (placeholder +
         * canvas) is allowed to reach against page content. It applies
         * uniformly to both layers via the `--aurora-opacity-ceiling` custom
         * property so the cross-fade preserves the clamped ceiling.
         *
         * Defaults to `1.0` (the dial route — full brand register). Quiet
         * content-over-aurora routes (survey, thankyou, admin-login) opt in
         * to `0.5` so the drift recedes behind form/text density. Clamped to
         * `[0, 1]` defensively.
         */
        opacityCeiling?: number;
    }>(),
    {
        opacityCeiling: 1,
        // Factory so every mount gets its own config object rather than
        // sharing (and risk-mutating) the canonical module-level default.
        config: () => DEFAULT_AURORA_CONFIG,
        renderMode: "auto",
    },
);

// Resolve the adaptive render substrate ONCE at setup (aurora-lazy-init §3.1).
// `"auto"` collapses to `"css"`/`"webgl"` per device tier here so the arm gate
// downstream sees a concrete substrate; `"webgl"`/`"css"` pass through. SSR /
// missing-API safe inside `resolveRenderMode`.
//
// BB.W-AURORA-SWRASTER — the universal software-raster GUARD: a forced
// `mode:"webgl"`/`mode:"capture"` arm under a software renderer (SwiftShader /
// llvmpipe / headless) now falls to `"css"` too, not only `"auto"`. The
// `forceWebGLUnderSoftwareRaster` runtime option is the named escape (default off
// — the guard is the safe default); it is threaded into BOTH the resolver here AND
// the runtime wedge catch (via `mergedRuntimeOptions`).
const resolvedRenderMode = resolveRenderMode(props.renderMode, {
    forceWebGLUnderSoftwareRaster:
        props.runtimeOptions?.forceWebGLUnderSoftwareRaster ?? false,
});

// Clamp defensively — out-of-range values would otherwise leak straight
// into the CSS custom property and either invert (negative) or over-
// composite (>1). The clamp keeps the contract honest at the boundary.
const clampedOpacityCeiling = computed(() =>
    Math.max(0, Math.min(1, props.opacityCeiling)),
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
// Top-level `onInitError` prop wins over `runtimeOptions.onInitError` —
// the prop is the ergonomic surface, runtimeOptions stays the
// pass-through for fully-composed AuroraRuntimeOptions objects (e.g.
// thumbnail-baking consumers). When neither is present, adapt Vue's global
// handler into the composable's explicit async-error seam; a floating rejected
// promise does not pass through `app.config.errorHandler` on its own.
const component = getCurrentInstance();
const appErrorHandler = component?.appContext.config.errorHandler;
const onAppInitError = appErrorHandler
    ? (error: Error) =>
          appErrorHandler(error, component?.proxy ?? null, "Aurora initialization")
    : undefined;
const mergedRuntimeOptions: AuroraRuntimeOptions = {
    ...(props.runtimeOptions ?? {}),
    onInitError:
        props.onInitError ?? props.runtimeOptions?.onInitError ?? onAppInitError,
};
// Pass a getter so `watch` tracks prop swaps (preset switch) as well as
// deep mutations (slider edits). If we passed `props.config` directly the
// watch would bind to the initial object and miss reference changes.
// Thread the resolved substrate into the composable so `"css"` short-circuits
// the WebGL arm schedule entirely (no webgl2 context is ever created).
const api = useAurora(canvasRef, () => props.config, mergedRuntimeOptions, {
    renderMode: resolvedRenderMode,
});
watch(api.rendererStatus, (status) => emit("rendererStatus", status), {
    immediate: true,
    flush: "sync",
});

// BI.W-E10-AURORA-ENTRANCE — the placeholder is ALWAYS the palette-derived GROUND
// (`auroraFallbackGround`), on the CAPABLE WebGL path as much as the `"css"`
// substrate. The flat `linear-gradient(135deg)` band is RETIRED from the capable
// path (clean break — §Disposition terminal): the cheap gradient was the
// "repulsive gray/neutral" first frame UF-E10 named. The ground is
// a field-sampled nuclei-glow derived from the SAME palette + nuclei the WebGL path
// uploads (the value.js `oklchToLinear` core — ONE color source), so:
//   - FRAME 0 is palette-COLORED, never a gray band (the entrance colors from frame 0);
//   - the live WebGL canvas WARMS INTO it — the `.aurora-canvas` opacity cross-fade
//     is a same-palette dissolve FROM the ground TO the live field (no tone jump);
//   - on the `"css"` substrate (software-raster / forced-capture) the SAME ground is
//     the permanent certify surface (mean + per-quadrant luminance match the composite).
// Reactive, so a preset switch repaints the ground too.
const faithfulGround = computed(() => auroraFallbackGround(props.config));
const placeholderBackgroundImage = computed(
    () => faithfulGround.value.backgroundImage,
);
const placeholderBackgroundColor = computed(
    () => faithfulGround.value.backgroundColor,
);

defineExpose({
    config: props.config,
    canvasRef,
    setCursor: api.setCursor,
    clearCursor: api.clearCursor,
    setCursorRadius: api.setCursorRadius,
    renderAt: api.renderAt,
    pause: api.pause,
    resume: api.resume,
    isArmed: api.isArmed,
    rendererStatus: api.rendererStatus,
});
</script>

<template>
    <!--
      Single-cell grid: placeholder + canvas both occupy grid cell 1/1 and
      stack without `position`, so the consumer's fallthrough positioning
      class (`fixed inset-0`, etc.) lands on this root unobstructed — no
      `relative`/`fixed` collision.
    -->
    <div
        class="aurora-root block h-full w-full overflow-hidden"
        :data-aurora-substrate="resolvedRenderMode"
        :style="{ '--aurora-opacity-ceiling': clampedOpacityCeiling }"
    >
        <!--
          Placeholder GROUND (BI.W-E10-AURORA-ENTRANCE). The palette-derived
          field-sampled ground on EVERY substrate — frame 0 is palette-colored,
          the live canvas cross-fades OVER it (same palette, no tone jump) on the
          capable path; on the `"css"` substrate the ground is the permanent
          luminance-faithful certify surface. Sits under the canvas; remains as
          the WebGL2-unavailable fallback (HA4 §1.5).
        -->
        <div
            class="aurora-placeholder h-full w-full"
            aria-hidden="true"
            :style="{
                backgroundImage: placeholderBackgroundImage,
                backgroundColor: placeholderBackgroundColor,
            }"
        />
        <!--
          The WebGL canvas cross-fades in over the placeholder once the
          runtime arms. The fade is a pure CSS transition — no rAF/timer
          choreography.
        -->
        <canvas
            ref="canvasRef"
            aria-hidden="true"
            class="aurora-canvas block h-full w-full"
            :class="{ 'aurora-canvas--armed': api.isArmed.value }"
        />
    </div>
</template>

<style scoped>
.aurora-root {
    display: grid;
    /* AV.W7 F2 — paint/layout containment caps the `backdrop-filter`-adjacent
       paint area + isolates the WebGL surface as its own compositing root
       (50–80% paint-area reduction; caps VRAM). `content-visibility:auto`
       (F1) lets the browser content-skip the surface when it scrolls offscreen
       — the substrate's `contentvisibilityautostatechange` listener parks the
       RAF on `skipped`.

       `contain-intrinsic-size` reserves the box across a skip. The block axis
       MUST carry a non-zero fallback: with a `none` block fallback a
       never-yet-rendered aurora collapses to zero height while skipped, the
       deferred-arm IntersectionObserver then targets a zero-height box, and the
       arm-time `resize()` measures a zero subtree — sizing the backing buffer to
       a 1px sliver that stretches as a black band over the rest of the surface.
       `auto 600px` keeps the remembered rendered size once there is one (the
       `auto` keyword) and reserves a substrate-scale block height otherwise, so a
       full-bleed background hero never collapses before it first paints. A
       percentage is NOT valid here, so the fallback is a concrete length; the
       exact value is immaterial past first paint since `auto` then wins. */
    contain: content;
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
}

/* Both layers share the single grid cell so they stack — no positioning. */
.aurora-root > .aurora-placeholder,
.aurora-root > .aurora-canvas {
    grid-area: 1 / 1;
}

/* Per-route saturation clamp (A3 §6.R-9). The ceiling applies uniformly to
   placeholder and canvas so the cross-fade rides under the same envelope
   and pre-armed first frames don't violate the clamp. Defaults to 1 when
   the custom property is unset (consumer that never reads the prop). */
.aurora-root > .aurora-placeholder {
    opacity: var(--aurora-opacity-ceiling, 1);
}

/* BI.W-E10-AURORA-ENTRANCE — the placeholder is the palette-derived field raster
   (a low-res 2D-canvas data: URI) on EVERY substrate. `cover` + smooth
   `image-rendering` upscale it bilinearly to fill the box — the upscale preserves
   the per-quadrant mean luminance the certify reads, and reads as a smooth
   nuclei-glow field rather than a hard grid. On the capable path it is the frame-0
   ground the live canvas cross-fades over; on the `"css"` substrate it is the
   permanent surface. (The SSR / no-canvas fall degrades to a layered
   `radial-gradient` stack — the same field samples — which fills natively.) */
.aurora-root > .aurora-placeholder {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    image-rendering: auto;
}

.aurora-canvas {
    opacity: 0;
    transition: opacity var(--duration-slow) var(--ease-standard);
}

.aurora-canvas--armed {
    opacity: var(--aurora-opacity-ceiling, 1);
}

@media (prefers-reduced-motion: reduce) {
    .aurora-canvas {
        transition-duration: 1ms;
    }
}
</style>
