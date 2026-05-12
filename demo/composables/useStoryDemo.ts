// useStoryDemo — canonical play / reset state harness for storybook demos.
//
// The "play / reset / status" idiom repeats across motion + composable
// stories (stagger, transitions, springs, animated-number-map, etc.). Each
// site rolls its own `idle | running | complete` state machine plus a
// hand-rolled cleanup set for timers / listeners that the play handler
// registered. The pattern is identical; the duplication is mechanical.
//
// `useStoryDemo` mirrors `useStagger`'s timer-set discipline. The play
// handler receives a `cleanup(fn)` registrar — every disposer registered
// via that callback fires on `reset()` AND on `onScopeDispose`. The handler
// is async-aware: a synchronous return flips status to "complete"
// immediately; an async return flips on resolution. A throw flips back to
// "idle" (the run did not complete; reset to a known state).
//
// The state shape is generic over `T`: `state` is the canonical "what
// the demo is animating" ref, reset to `initial` on every `reset()`. For
// boolean or simple-counter demos pass `false` / `0`; for richer shapes
// pass the initial object literal.
//
// L.W2 — Demo-private per CLAUDE.md "Demo storybook chassis (demo-private)".
// Moved out of `src/composables/` into `demo/composables/`; not exported from
// the library. Tests live at `tests/useStoryDemo.spec.ts` and reach this
// directly via relative path.

import {
    computed,
    onScopeDispose,
    ref,
    type ComputedRef,
    type Ref,
} from "vue";

export type StoryDemoStatus = "idle" | "running" | "complete";

export type StoryDemoCleanup = (fn: () => void) => void;

export type StoryDemoPlayHandler = (
    cleanup: StoryDemoCleanup,
) => void | Promise<void>;

export interface UseStoryDemoControls<T> {
    /** Demo state. Reset to `initial` on every `reset()` call. */
    state: Ref<T>;
    /** "idle" | "running" | "complete". */
    status: ComputedRef<StoryDemoStatus>;
    /** Register the play handler. Called on every `play()`. */
    onPlay: (handler: StoryDemoPlayHandler) => void;
    /** Run the registered play handler. No-op if none registered. */
    play: () => void;
    /** Reset state + invoke every registered cleanup. */
    reset: () => void;
}

/**
 * Story-side play / reset / status harness. Mirrors `useStagger`'s timer-set
 * discipline: cleanup callbacks registered inside the play handler fire on
 * both `reset()` AND scope dispose, so unmount + repeated plays never leak
 * timers, listeners, or rAF handles.
 *
 * @example
 * const { state, status, onPlay, play, reset } = useStoryDemo<boolean[]>(
 *   new Array(8).fill(false),
 * );
 * onPlay(async (cleanup) => {
 *   for (let i = 0; i < 8; i++) {
 *     const handle = setTimeout(() => {
 *       state.value = state.value.map((v, idx) => idx === i ? true : v);
 *     }, i * 80);
 *     cleanup(() => clearTimeout(handle));
 *   }
 *   await new Promise((r) => setTimeout(r, 8 * 80));
 * });
 */
export function useStoryDemo<T>(initial: T): UseStoryDemoControls<T> {
    const state = ref(initial) as Ref<T>;
    const statusRef = ref<StoryDemoStatus>("idle");
    const status = computed<StoryDemoStatus>(() => statusRef.value);

    const disposers = new Set<() => void>();
    let handler: StoryDemoPlayHandler | null = null;

    function flushDisposers(): void {
        // Iterate a snapshot so a disposer that mutates the set during its
        // own call (e.g., a clearTimeout that schedules another) doesn't
        // perturb iteration order.
        const snapshot = Array.from(disposers);
        disposers.clear();
        for (const fn of snapshot) {
            try {
                fn();
            } catch (err) {
                // Swallow disposer errors — a failing cleanup should not
                // prevent the rest from running. Surface to console for
                // observability; the story keeps moving.
                // eslint-disable-next-line no-console
                console.warn("[useStoryDemo] disposer threw:", err);
            }
        }
    }

    function reset(): void {
        flushDisposers();
        state.value = initial;
        statusRef.value = "idle";
    }

    function onPlay(fn: StoryDemoPlayHandler): void {
        handler = fn;
    }

    const cleanup: StoryDemoCleanup = (fn) => {
        disposers.add(fn);
    };

    function play(): void {
        if (!handler) return;
        // Each `play()` resets first so consecutive plays start clean —
        // matches the canonical demo idiom (Play, Play, Play all loop).
        flushDisposers();
        state.value = initial;
        statusRef.value = "running";
        let result: void | Promise<void>;
        try {
            result = handler(cleanup);
        } catch (err) {
            // Synchronous throw — flip back to idle and surface.
            statusRef.value = "idle";
            // eslint-disable-next-line no-console
            console.warn("[useStoryDemo] play handler threw:", err);
            return;
        }
        if (result && typeof (result as Promise<void>).then === "function") {
            (result as Promise<void>)
                .then(() => {
                    if (statusRef.value === "running") {
                        statusRef.value = "complete";
                    }
                })
                .catch((err) => {
                    if (statusRef.value === "running") {
                        statusRef.value = "idle";
                    }
                    // eslint-disable-next-line no-console
                    console.warn(
                        "[useStoryDemo] async play handler rejected:",
                        err,
                    );
                });
        } else {
            // Synchronous handler — flip status immediately.
            statusRef.value = "complete";
        }
    }

    onScopeDispose(flushDisposers);

    return { state, status, onPlay, play, reset };
}
