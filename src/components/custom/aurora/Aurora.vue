<script setup lang="ts">
import { computed, ref } from "vue";
import { useAurora } from "./composables/useAurora";
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
 * Init failures (WebGL2 unavailable, shader compile/link failure) are
 * library-internal contract violations and throw by default (O invariant
 * 24). Pass `onInitError` to handle the error and leave the canvas
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

defineExpose({
    config: props.config,
    canvasRef,
    setCursor: api.setCursor,
    clearCursor: api.clearCursor,
    setCursorRadius: api.setCursorRadius,
    renderAt: api.renderAt,
    pause: api.pause,
    resume: api.resume,
});
</script>

<template>
    <canvas
        ref="canvasRef"
        aria-hidden="true"
        class="block h-full w-full"
    />
</template>
