<script setup lang="ts">
import { computed, ref } from "vue";
import { useAurora } from "./composables/useAurora";
import { paletteToCssGradient } from "./composables/color";
import type { AuroraRuntimeOptions } from "./composables/runtime";
import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "./constants/presets";
import { resolveRenderMode, type AuroraRenderMode } from "./constants/renderMode";

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
 * arms, a cheap CSS-gradient placeholder derived from `config.palette` paints
 * the first frame with zero JS / zero GPU; the canvas cross-fades in over it
 * once armed. The placeholder stays mounted underneath as the natural
 * WebGL2-unavailable visual fallback (HA4 §1.5). Capture / thumbnail-baking
 * consumers pass `runtimeOptions.initStrategy: "eager"` (or `mode: "capture"`)
 * to arm synchronously.
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
         *   - `"css"`   — never arm WebGL; the `paletteToCssGradient` placeholder
         *     stays the permanent surface (the warm wash composites, it just
         *     does not animate).
         *   - `"auto"` (default) — resolve to `"css"` on low-power /
         *     reduced-motion / save-data devices (`hardwareConcurrency <= 4` OR
         *     `prefers-reduced-motion: reduce` OR `connection.saveData`), else
         *     `"webgl"`. Resolved once at setup; SSR / missing-API safe (assumes
         *     capable → `"webgl"` when the probes are unavailable).
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
const resolvedRenderMode = resolveRenderMode(props.renderMode);

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
// thumbnail-baking consumers).
const mergedRuntimeOptions = computed<AuroraRuntimeOptions>(() => ({
    ...(props.runtimeOptions ?? {}),
    ...(props.onInitError ? { onInitError: props.onInitError } : {}),
}));
// Pass a getter so `watch` tracks prop swaps (preset switch) as well as
// deep mutations (slider edits). If we passed `props.config` directly the
// watch would bind to the initial object and miss reference changes.
// Thread the resolved substrate into the composable so `"css"` short-circuits
// the WebGL arm schedule entirely (no webgl2 context is ever created).
const api = useAurora(canvasRef, () => props.config, mergedRuntimeOptions.value, {
    renderMode: resolvedRenderMode,
});

// Cheap static first frame — a CSS gradient derived from the same palette
// stops the shader interpolates. Zero JS, zero GPU; paints before the WebGL
// path arms. Reactive, so a preset switch repaints the placeholder too.
const placeholderGradient = computed(() =>
    paletteToCssGradient(props.config.palette),
);

defineExpose({
    config: props.config,
    canvasRef,
    setCursor: api.setCursor,
    clearCursor: api.clearCursor,
    setCursorRadius: api.setCursorRadius,
    // AW.W8.1 — the velocity-reactive flow write-path (PRM-gated at the runtime).
    injectCursorVelocity: api.injectCursorVelocity,
    renderAt: api.renderAt,
    pause: api.pause,
    resume: api.resume,
    isArmed: api.isArmed,
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
        :style="{ '--aurora-opacity-ceiling': clampedOpacityCeiling }"
    >
        <!--
          Static gradient placeholder — the cheap first frame. Sits under the
          canvas; remains as the WebGL2-unavailable fallback (HA4 §1.5).
        -->
        <div
            class="aurora-placeholder h-full w-full"
            aria-hidden="true"
            :style="{ backgroundImage: placeholderGradient }"
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

.aurora-canvas {
    opacity: 0;
    transition: opacity 600ms ease-out;
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
