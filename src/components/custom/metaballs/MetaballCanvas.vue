<script setup lang="ts">
import { computed, readonly, ref } from "vue";
import { useMetaballs } from "./useMetaballs";
import type { MetaballConfig, MetaballPositioning } from "./types";

const props = withDefaults(
    defineProps<{
        config?: MetaballConfig;
        /**
         * Layout register for the canvas root.
         *
         * `"viewport"` (default) — the canvas paints as a viewport-cover
         * backdrop: `position: fixed; inset: 0; z-index: -10`. Use this for
         * hero / storybook / standalone-page backdrops where the Metaballs
         * surface IS the page substrate.
         *
         * `"local"` — the publisher drops the viewport-cover utility trio
         * (`fixed`, `inset-0`, `-z-10`); the canvas reads as a plain inline
         * element sized via `inline-size: 100%; block-size: 100%`. The
         * consumer owns `position`, `inset`, `z-index`, and any clipping
         * (e.g. `border-radius: 50%`) via a scoped rule on a class merged
         * onto the canvas root. Use this when the Metaballs is a LOCAL
         * backdrop pinned behind a sibling element (a badge, a dial, a card
         * region) — not a viewport-cover.
         *
         * AJ-W1-β.
         */
        positioning?: MetaballPositioning;
        /**
         * Auto-retire envelope in milliseconds. When set (a finite, non-null
         * positive number), the canvas measures elapsed time inside the
         * existing `requestAnimationFrame` render loop and self-destructs
         * once the envelope fires: the GL resources dispose, the loop
         * halts, the `<canvas>` element unmounts via the internal
         * `!isRetired` guard, and the SFC emits `retire`.
         *
         * Default `null` — the loop runs indefinitely until unmount (the
         * canonical "ambient backdrop" semantics).
         *
         * The envelope retires the consumer-side `setTimeout` pattern that
         * predates this prop:
         *
         *     const bloomActive = ref(false);
         *     let timer = setTimeout(() => { bloomActive = false; }, 3000);
         *     <MetaballCanvas v-if="bloomActive" :config="…" />
         *
         * is now:
         *
         *     <MetaballCanvas v-if="shown" :duration="3000"
         *         :config="…" @retire="shown = false" />
         *
         * — declarative envelope, no consumer-side timer. The retirement
         * is irreversible inside a single mount instance; a re-armable
         * bloom toggles the parent `v-if` to remount the canvas.
         *
         * Precept 10 honesty: the elapsed check rides the rAF loop (no
         * `setTimeout`); reduced-motion users still see the envelope
         * complete in wall-clock time (the freeze affects orbit phase,
         * not the retirement clock).
         *
         * AJ-W4-γ.
         */
        duration?: number | null;
    }>(),
    {
        positioning: "viewport",
        duration: null,
    },
);

const emit = defineEmits<{
    /**
     * Fired exactly once when the `:duration` auto-retire envelope completes.
     * Parents bridge this into a `v-if` flag (e.g. `@retire="shown = false"`)
     * so the mount/unmount cycle closes without owning a duplicate timer.
     * The event does NOT fire on unmount-driven dispose (only on the
     * envelope completion) — that boundary keeps the parent's `v-if`
     * unaffected if the consumer retracts the canvas before duration elapses.
     *
     * AJ-W4-γ.
     */
    (event: "retire"): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { isSupported, isReducedMotion, isReducedTransparency, isRetired } = useMetaballs(
    canvasRef,
    props.config,
    {
        duration: props.duration,
        onRetire: () => emit("retire"),
    },
);

/**
 * AJ-W1-β — class-binding swaps the viewport-cover trio on/off based on the
 * `positioning` register. The `pointer-events-none h-full w-full` base stays
 * in BOTH modes — those utilities encode that the canvas is decorative
 * substrate (not pointer-interactive) and fills its container (the layout
 * slot the consumer provides). The `fixed inset-0 -z-10` trio is the
 * viewport-cover register that the `"local"` mode retires so the consumer's
 * scoped CSS becomes the sole source of layout truth (no cascade fight).
 */
const canvasClasses = computed(() => {
    const base = "pointer-events-none h-full w-full";
    return props.positioning === "viewport"
        ? `${base} fixed inset-0 -z-10`
        : base;
});

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
    <!-- AJ-W4-γ — the `!isRetired` guard unmounts the `<canvas>` once the
         auto-retire envelope fires, releasing the WebGL context with the
         element. The `<slot name="fallback">` paths under the unsupported
         and retired branches keep the slot contract honest for both
         degradations (no WebGL OR retired-by-duration) — though typical
         duration-driven consumers leave the fallback slot empty so the
         space simply reclaims on retire. -->
    <canvas
        v-if="isSupported && !isRetired"
        ref="canvasRef"
        :class="canvasClasses"
    />
    <slot v-else name="fallback" />
</template>
