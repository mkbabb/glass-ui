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
 * Aurora — a painterly procedural background.
 *
 * Renders into a single canvas sized to its container via ResizeObserver.
 * Config is reactive; the composable watches it deeply and re-uploads
 * uniforms on change. Cursor interaction is deliberately not wired here —
 * use `useCursorInteraction` (or call the exposed `setCursor` API) against
 * the container element so the consumer controls pointer policy.
 *
 * Lazy-arm: by default GPU initialization is deferred past the consumer's
 * first paint. Until the runtime arms, a palette-derived GROUND placeholder
 * (`auroraFallbackGround`, the field-sampled nuclei glow) paints the first frame
 * with zero JS and zero GPU; the canvas cross-fades in over it once armed. The
 * ground is derived from the same palette and nuclei the GPU path uploads, so
 * frame 0 is palette-colored and the live canvas warms into it without a tone
 * jump. The placeholder stays mounted underneath as the natural static surface.
 * Capture and thumbnail-baking consumers pass `runtimeOptions.initStrategy: "eager"` (or
 * `mode: "capture"`) to begin acquisition immediately, then await `armAsync()`
 * before reading a deterministic frame.
 *
 * Device/context and shader setup failures remain explicit through
 * `rendererStatus`. Pass `onInitError` (or install Vue's app error handler) to
 * receive the attributed error as well. A failed runtime never marks the live
 * canvas armed, so the palette ground remains visible.
 *
 * `opacityCeiling` is the outer compositing envelope:
 * `1.0` (default) for hero surfaces, `~0.5` for quiet content-over-aurora
 * routes where form/text density would otherwise compete with the drift.
 * It applies once around the stacked placeholder + canvas field so their
 * internal cross-fade rides under the clamped ceiling and the config's pigment
 * `alpha` remains an orthogonal authoring concern.
 */
const props = withDefaults(
    defineProps<{
        /**
         * Aurora field configuration (palette, nuclei, warp, media). Optional —
         * omit it and the canonical `DEFAULT_AURORA_CONFIG` painterly look
         * renders. Pass a full config to author a custom field,
         * or a preset object from `./constants/presets`. The default is supplied via a
         * `withDefaults` factory so each mount gets its own (un-shared) object.
         */
        config?: AuroraConfig;
        runtimeOptions?: AuroraRuntimeOptions;
        onInitError?: (err: Error) => void;
        /**
         * Adaptive render substrate. The warm wash always composites; only the
         * substrate adapts:
         *   - `"webgl"` — arm the animated GPU path; the runtime prefers WebGPU
         *     and supports WebGL2.
         *   - `"css"`   — never arm a GPU; the `auroraFallbackGround` palette-
         *     derived ground stays the permanent surface (the warm wash
         *     composites, it just does not animate).
         *   - `"auto"` (default) — resolves to `"webgl"` on every device EXCEPT a
         *     detected SOFTWARE renderer (SwiftShader, llvmpipe, MS Basic Render),
         *     which falls to `"css"` (the page-wedging-software-raster guard and sole
         *     `"css"` signal). Reduced motion is handled solely by
         *     the substrate's live `matchMedia` freeze (one static frame then park,
         *     re-arms on un-reduce). Resolved once at setup; SSR, missing-API safe
         *     (assumes capable → `"webgl"` when the probes are unavailable).
         */
        renderMode?: AuroraRenderMode;
        /**
         * Per-route aurora saturation clamp.
         *
         * The config's `alpha` field is pigment opacity for the painted image.
         * Live presentation applies it once as canvas opacity over the palette
         * ground; capture keeps it in the transparent GPU buffer. `opacityCeiling`
         * is the *outer envelope* — the
         * maximum compositing opacity the aurora surface (placeholder +
         * canvas) is allowed to reach against page content. It applies once
         * to their shared root; the internal cross-fade remains a full `0` to
         * `1` handoff.
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

// Resolve the adaptive render substrate once at setup.
// `"auto"` collapses to `"css"`/`"webgl"` per device tier here so the arm gate
// downstream sees a concrete substrate; `"webgl"`/`"css"` pass through. Resolution
// is SSR- and missing-API-safe.
//
// the universal software-raster GUARD: a forced
// `mode:"webgl"`/`mode:"capture"` arm under a software renderer (SwiftShader,
// llvmpipe, headless) now falls to `"css"` too, not only `"auto"`. The
// `forceWebGLUnderSoftwareRaster` runtime option is the named escape (default off
// the guard is the safe default); it is threaded into BOTH the resolver here AND
// the runtime wedge catch (via `mergedRuntimeOptions`).
const resolvedRenderMode = resolveRenderMode(props.renderMode, {
    forceWebGLUnderSoftwareRaster:
        props.runtimeOptions?.forceWebGLUnderSoftwareRaster ?? false,
});

// Clamp defensively — out-of-range values would otherwise invert (negative)
// or over-composite (>1) the shared root. The clamp keeps the contract honest
// at the boundary.
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
// GPU initialization entirely.
const api = useAurora(canvasRef, () => props.config, mergedRuntimeOptions, {
    renderMode: resolvedRenderMode,
});
watch(api.rendererStatus, (status) => emit("rendererStatus", status), {
    immediate: true,
    flush: "sync",
});

// The placeholder is always the palette-derived ground
// (`auroraFallbackGround`), on the animated GPU path as much as the `"css"`
// substrate. The ground is
// a field-sampled nuclei-glow derived from the same palette and nuclei the GPU path
// uploads (the value.js `oklchToLinear` core — ONE color source), so:
//   - FRAME 0 is palette-COLORED, never a gray band (the entrance colors from frame 0);
//   - the live canvas warms into it — the `.aurora-canvas` opacity cross-fade
//     is a same-palette dissolve FROM the ground TO the live field (no tone jump);
//   - on the `"css"` substrate (software-raster, forced-capture) the SAME ground is
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
        :style="{ opacity: clampedOpacityCeiling }"
    >
        <!--
          Placeholder GROUND. The palette-derived
          field-sampled ground on EVERY substrate — frame 0 is palette-colored,
          the live canvas cross-fades OVER it (same palette, no tone jump) on the
          capable path; on the `"css"` substrate the ground is the permanent
          luminance-faithful certify surface. Sits under the canvas; remains as
          the WebGL2-unavailable fallback.
        -->
        <div
            class="aurora-placeholder h-full min-h-0 w-full"
            aria-hidden="true"
            :style="{
                backgroundImage: placeholderBackgroundImage,
                backgroundColor: placeholderBackgroundColor,
            }"
        />
        <!--
          The live canvas presents an opaque GPU buffer; its public pigment alpha
          lives on the canvas as one CSS opacity over the palette ground. This
          internal layer owns only the 0-to-1 arm cross-fade; the shared root owns
          the route ceiling, keeping both independent from reactive alpha changes
          and preserving capture-buffer semantics.
        -->
        <div
            class="aurora-canvas-layer h-full min-h-0 w-full"
            :class="{ 'aurora-canvas-layer--armed': api.isArmed.value }"
        >
            <canvas
                ref="canvasRef"
                aria-hidden="true"
                class="aurora-canvas block h-full w-full"
                :class="{ 'aurora-canvas--armed': api.isArmed.value }"
            />
        </div>
    </div>
</template>

<style scoped>
.aurora-root {
    display: grid;
    /* Paint/layout containment caps the `backdrop-filter`-adjacent paint area and
       isolates the WebGL surface as its own compositing root. `content-visibility`
       lets the browser skip an offscreen surface; the
       `contentvisibilityautostatechange` listener parks the
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
.aurora-root > .aurora-canvas-layer {
    grid-area: 1 / 1;
}

/* the placeholder is the palette-derived field raster
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

.aurora-canvas-layer {
    opacity: 0;
    transition: opacity var(--duration-slow) var(--ease-standard);
    /* Experimental, efficacy unverified. Hypothesis: at armed
       opacity:1 the cross-fade's stacking context dissolves, so the live canvas
       shares one root backing with the page's backdrop-filter plates, letting a
       GPU present race their backdrop snapshot to a black sample; `isolate`
       severs that shared backing. Proof owed on the real in-app Chrome arm (the
       Playwright arm is clean-negative only). Revert if the slab persists on the
       real instrument or the plate blur visibly changes. */
    isolation: isolate;
}

.aurora-canvas-layer--armed {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .aurora-canvas-layer {
        transition-duration: 1ms;
    }
}
</style>
