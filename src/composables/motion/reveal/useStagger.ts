// One-shot staggered reveal-flag array. Replaces hand-rolled `setTimeout`
// cascades in consumers (the climax row-tint sweep at
// `SpeedtestResults.vue:251-267` is the source pattern).
//
// `useStaggerReveal` already exists in glass-ui's motion/ folder, but it
// gates on IntersectionObserver — it animates entrance as elements cross
// the viewport threshold. The `useStagger` shape here is the *unconditional*
// cousin: a fixed count of slots flip true on a timer, irrespective of
// scroll position. The two compose: a state-machine flips the climax cue,
// and `useStagger` cascades the per-row tint.
//
// Each timeout handle is tracked so unmount + reset both clear cleanly;
// no orphan callbacks fire after dispose.

import {
    onScopeDispose,
    ref,
    watch,
    type Ref,
} from "vue";
import { useReducedMotion } from "../core/useReducedMotion";

export interface UseStaggerOptions {
    /** Count of staggered slots. Each slot maps to one boolean in `revealed`. */
    items: number;
    /**
     * Delay between consecutive reveals.
     *
     * Default 80ms — mirrors the `--motion-stagger-default` token in
     * `tokens.css` (AJ-W4-κ canon). Consumers driving per-row CSS
     * `animation-delay` cascades on the same surface should also read
     * `--motion-stagger-default` so the JS-driven cascade (this composable)
     * and the CSS-driven cascade stay in lockstep.
     *
     * The two adjacent canon tiers are:
     *   - `--motion-stagger-tight: 40ms` — dense row cascades
     *   - `--motion-stagger-relaxed: 120ms` — wide series cascades
     */
    delayMs?: number;
    /** Delay before the first reveal fires. Default 0. */
    initialDelayMs?: number;
    /** Auto-start on creation. Default true. */
    immediate?: boolean;
    /**
     * When true, honour `prefers-reduced-motion: reduce` by flipping every
     * slot true synchronously instead of cascading the timeline. Mirrors
     * the canonical opt-in on `useAnimatedNumber` and the global
     * `transitions.css` / `utilities.css` reduced-motion brackets. SSR treats the
     * option as a no-op.
     * Default true.
     */
    respectReducedMotion?: boolean;
}

export interface UseStaggerControls {
    /** Per-slot reveal state. `revealed.value[i]` flips true at `initialDelayMs + i * delayMs`. */
    revealed: Ref<boolean[]>;
    /** Re-arm the cascade. Resets `revealed` to all-false then fires the timeline. */
    start: () => void;
    /** Reset to all-false. Cancels any pending reveals. */
    reset: () => void;
    /** True once every slot has flipped. */
    isComplete: Ref<boolean>;
}

/**
 * Drive a fixed-count staggered reveal off a single timer cascade.
 *
 * @example
 * const { revealed, start } = useStagger({ items: visible.value.length, delayMs: 80, initialDelayMs: 80, immediate: false });
 * watch(allComplete, (done, prev) => { if (done && !prev) start(); });
 */
export function useStagger(options: UseStaggerOptions): UseStaggerControls {
    const itemCount = Math.max(0, Math.floor(options.items));
    const delayMs = options.delayMs ?? 80;
    const initialDelayMs = options.initialDelayMs ?? 0;
    const immediate = options.immediate !== false;
    const respectReducedMotion = options.respectReducedMotion !== false;
    const reducedMotion = respectReducedMotion ? useReducedMotion() : ref(false);

    const revealed = ref<boolean[]>(new Array(itemCount).fill(false));
    const isComplete = ref<boolean>(itemCount === 0);
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let started = false;

    function clearAll(): void {
        for (const handle of timers) clearTimeout(handle);
        timers.clear();
    }

    function reset(): void {
        started = false;
        clearAll();
        revealed.value = new Array(itemCount).fill(false);
        isComplete.value = itemCount === 0;
    }

    function flushAll(): void {
        revealed.value = new Array(itemCount).fill(true);
        isComplete.value = true;
    }

    function start(): void {
        reset();
        started = true;
        if (itemCount === 0) {
            isComplete.value = true;
            return;
        }
        // Reduced-motion: short-circuit the cascade so every slot reveals
        // synchronously. The cue is honoured as "instant", matching the
        // canonical brackets in `transitions.css:144` / `utilities.css:467`.
        // Reduced motion honors the cue as an immediate reveal.
        if (reducedMotion.value) {
            flushAll();
            return;
        }
        for (let i = 0; i < itemCount; i++) {
            const idx = i;
            const handle = setTimeout(() => {
                // Mutate via slice + assignment so the ref's array identity
                // changes — Vue's reactivity tracks element-level writes on
                // a `ref<T[]>`, but consumers binding via `v-for` keyed by
                // index sometimes need the array identity to flip.
                const next = revealed.value.slice();
                next[idx] = true;
                revealed.value = next;
                timers.delete(handle);
                if (idx === itemCount - 1) isComplete.value = true;
            }, initialDelayMs + idx * delayMs);
            timers.add(handle);
        }
    }

    const stopReducedMotionWatch = watch(
        reducedMotion,
        (reduced) => {
            if (!reduced || !started) return;
            clearAll();
            flushAll();
        },
        { flush: "sync" },
    );

    if (immediate) start();

    onScopeDispose(() => {
        stopReducedMotionWatch();
        clearAll();
    });

    return { revealed, start, reset, isComplete };
}
