<script setup lang="ts">
import { computed, ref } from "vue";
import { useAurora } from "./composables/useAurora";
import { paletteToCssGradient } from "./composables/color";
import type { AuroraRuntimeOptions } from "./composables/runtime";
import type { AuroraConfig } from "./presets";

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
 */
const props = defineProps<{
    config: AuroraConfig;
    runtimeOptions?: AuroraRuntimeOptions;
    onInitError?: (err: Error) => void;
}>();

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
const api = useAurora(canvasRef, () => props.config, mergedRuntimeOptions.value);

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
    <div class="aurora-root block h-full w-full overflow-hidden">
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
}

/* Both layers share the single grid cell so they stack — no positioning. */
.aurora-root > .aurora-placeholder,
.aurora-root > .aurora-canvas {
    grid-area: 1 / 1;
}

.aurora-canvas {
    opacity: 0;
    transition: opacity 600ms ease-out;
}

.aurora-canvas--armed {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .aurora-canvas {
        transition-duration: 1ms;
    }
}
</style>
