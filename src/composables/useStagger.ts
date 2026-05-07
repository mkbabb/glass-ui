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
    type Ref,
} from "vue";

export interface UseStaggerOptions {
    /** Count of staggered slots. Each slot maps to one boolean in `revealed`. */
    items: number;
    /** Delay between consecutive reveals. Default 80ms. */
    delayMs?: number;
    /** Delay before the first reveal fires. Default 0. */
    initialDelayMs?: number;
    /** Auto-start on creation. Default true. */
    immediate?: boolean;
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

    const revealed = ref<boolean[]>(new Array(itemCount).fill(false));
    const isComplete = ref<boolean>(itemCount === 0);
    const timers = new Set<ReturnType<typeof setTimeout>>();

    function clearAll(): void {
        for (const handle of timers) clearTimeout(handle);
        timers.clear();
    }

    function reset(): void {
        clearAll();
        revealed.value = new Array(itemCount).fill(false);
        isComplete.value = itemCount === 0;
    }

    function start(): void {
        reset();
        if (itemCount === 0) {
            isComplete.value = true;
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

    if (immediate) start();

    onScopeDispose(clearAll);

    return { revealed, start, reset, isComplete };
}
