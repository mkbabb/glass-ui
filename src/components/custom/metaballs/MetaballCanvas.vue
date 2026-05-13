<script setup lang="ts">
import { readonly, ref } from "vue";
import { useMetaballs } from "./useMetaballs";
import type { MetaballConfig } from "./types";

const props = defineProps<{
    config?: MetaballConfig;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { isSupported, isReducedMotion, isReducedTransparency } = useMetaballs(
    canvasRef,
    props.config,
);

/**
 * # M.W2 Lane A (F-ε-3 fix) — break the consumer-side mount/unmount cycle
 *
 * Pre-fix the exposed `isSupported` was a reactive ref that flipped
 * `true → false` at first mount when `getContext('webgl')` failed
 * (the exact Lighthouse audit configuration — headless Chrome with
 * `--disable-gpu`). The canonical consumer pattern in the metaballs
 * story is:
 *
 *     const canvasRef = ref<InstanceType<typeof MetaballCanvas> | null>(null);
 *     const isSupported = computed(() => canvasRef.value?.isSupported ?? true);
 *     <MetaballCanvas v-if="isSupported" ref="canvasRef">
 *
 * When MetaballCanvas's exposed `isSupported` flipped to `false`, the
 * computed re-evaluated `false`, the outer `v-if` removed the component,
 * `canvasRef.value` became `null`, the `?? true` fallback resurrected
 * the v-if back to `true`, and MetaballCanvas re-mounted — an infinite
 * mount/unmount cycle that tripped Vue's 100-iteration recursion cap on
 * the surrounding `<Configurator>`.
 *
 * Two fixes combine to break the cycle:
 *
 *  1. `useMetaballs` now sets `isSupported` SYNCHRONOUSLY via
 *     `probeWebGLSupport()` at composable-call time; init() no longer
 *     mutates it post-probe (defensive bails return without mutation).
 *
 *  2. The `isReducedMotion` / `isReducedTransparency` refs are wrapped
 *     in `readonly()` so consumer-side mutations can't propagate back.
 *     `isSupported` is NOT exposed any more — the inner v-if guards the
 *     canvas/fallback split locally, and consumers should not
 *     conditionally mount MetaballCanvas based on it. Consumers wanting
 *     the WebGL-support signal can read `isReducedMotion` /
 *     `isReducedTransparency` (which remain exposed as readonly
 *     snapshots) or call the new `isWebGLSupported()` helper exported
 *     from `@mkbabb/glass-ui/metaballs`.
 *
 * Cf. `docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md`.
 */
defineExpose({
    isReducedMotion: readonly(isReducedMotion),
    isReducedTransparency: readonly(isReducedTransparency),
});
</script>

<template>
    <canvas
        v-if="isSupported"
        ref="canvasRef"
        class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
    <slot v-else name="fallback" />
</template>
