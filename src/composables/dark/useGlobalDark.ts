// @mkbabb/glass-ui/composables/dark — vueuse-bearing dark-mode composable
//
// `useGlobalDark` wraps `createGlobalState` + `useDark` + `useToggle` from
// `@vueuse/core`. Pulled out as its own subpath so consumers that want to
// apply a vueuse manualChunk can do so without the root barrel forcing
// vueuse into the eager critical path.
//
// L.W2 — Implementation lives at `src/composables/dark/useGlobalDark.ts`;
// the sub-tree's `index.ts` re-exports it, and the flat `@mkbabb/glass-ui/dark`
// subpath barrel (`src/dark.ts`) resolves through that sub-tree index.
//
// AU.W9.B — `initialValue` seed (#21). `createGlobalState` memoizes the factory
// closure, so the SINGLE shared instance is built exactly once on first call. A
// per-call `initialValue` therefore CANNOT re-seed after construction: the seed
// is a ONE-SHOT honored only by the first `useGlobalDark()` invocation. We
// capture the first-call options in a module-level ref the factory reads on
// construction, and THROW if a later call passes a CONFLICTING `initialValue`
// (the misconfiguration is loud, not silently swallowed). This pairs with
// `darkModeSyncScript()` — the parse-time `<head>` script that sets the theme
// before first paint so the seed and the FOUC eliminator agree.
import type { BasicColorSchema } from "@vueuse/core";
import { createGlobalState, useDark, useToggle } from "@vueuse/core";
import { ref, watch, type Ref, type WritableComputedRef } from "vue";

/**
 * A post-flip settle callback. Receives the dark-mode flag's NEW value. Runs in
 * the single coalesced post-flip task (see `onFlipSettled`).
 */
export type DarkFlipSettledCallback = (isDark: boolean) => void;

/**
 * The `useGlobalDark` return shape (AW.W15 — named `Use<Name>Return`). The
 * single shared dark-mode instance: the reactive `isDark` flag, a `toggleDark`
 * that optionally suppresses transitions, the transition-suppression switch, and
 * the post-flip settle hook (E9b).
 */
export interface UseGlobalDarkReturn {
    /** Reactive dark-mode flag (vueuse `useDark` ref — writable). */
    isDark: WritableComputedRef<boolean>;
    /** Toggle dark mode (suppresses transitions when configured). */
    toggleDark: () => void;
    /** Whether transitions are suppressed during a toggle. */
    disableTransitions: Ref<boolean>;
    /** Configure transition suppression during the dark-mode toggle. */
    setDisableTransitions: (value: boolean) => void;
    /**
     * E9b — the post-flip SETTLE hook. Register a callback that runs in ONE
     * coalesced task AFTER each dark↔light flip's instant chrome paint, so
     * consumers BATCH N expensive re-theme operations (e.g. an atlas's N-chart
     * `merge-setOption` palette tween) into a single beat instead of N watchers
     * firing in N sequential storms on the critical frame. The class toggle is
     * synchronous (chrome flips instantly); the batch drains one frame later via a
     * single `requestAnimationFrame` (an SSR/no-rAF env falls back to a macrotask).
     * EVERY registered callback shares that ONE task — no per-subscriber scheduling.
     * No View Transition is involved anywhere in this path (PRM-safe by
     * construction). Returns an unsubscribe function. Idempotent re-registration
     * of the same callback is a no-op.
     */
    onFlipSettled: (callback: DarkFlipSettledCallback) => () => void;
}

export interface UseGlobalDarkOptions {
    /**
     * The first-paint color scheme seed, threaded to `useDark({ initialValue })`.
     * ONE-SHOT: only the FIRST `useGlobalDark()` call constructs the singleton, so
     * only its `initialValue` is honored. A later call passing a CONFLICTING value
     * THROWS (the misconfiguration is loud, not silently ignored); a matching
     * re-seed is a no-op. Defaults to vueuse's `"auto"` (prefers-color-scheme).
     * Pair with `darkModeSyncScript()` so the parse-time `<head>` script and this
     * runtime seed agree.
     */
    initialValue?: BasicColorSchema;
}

// The first-call seed the memoized factory reads at construction time.
let seededInitialValue: BasicColorSchema | undefined;

/** Single shared dark mode instance — avoids multiple useDark() watchers racing on classList. */
const createGlobalDark = createGlobalState(() => {
    const isDark = useDark({
        initialValue: seededInitialValue,
        disableTransition: false,
    });
    const _toggle = useToggle(isDark);
    const disableTransitions = ref(false);

    /**
     * Toggle dark mode. When `disableTransitions` is enabled (via
     * `setDisableTransitions`), CSS transitions are suppressed for the
     * duration of the toggle to avoid visual jank.
     */
    function toggleDark() {
        if (disableTransitions.value) {
            document.documentElement.classList.add("no-transition");
            // NO forced reflow (the E9b.1 profile caught it at ~40ms on a dense page —
            // a synchronous whole-document style+layout flush). None is needed: the
            // class and the scheme toggle land in the SAME style recalc, so the
            // after-change computed style already carries `transition: none` and no
            // transition can start (CSS Transitions §starting — transitions fire off
            // the after-change style's transition-property, not the before-change).
        }

        _toggle();

        if (disableTransitions.value) {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove("no-transition");
            });
        }
    }

    /** Configure whether transitions are suppressed during dark mode toggle. */
    function setDisableTransitions(value: boolean) {
        disableTransitions.value = value;
    }

    // ── E9b — the post-flip settle batch ────────────────────────────────────
    // One shared subscriber set, drained in ONE coalesced task per flip. The
    // class toggle is already synchronous (the chrome flips instantly); this
    // schedules the consumers' expensive re-theme work AFTER that paint, batched.
    const flipSettledCallbacks = new Set<DarkFlipSettledCallback>();
    let settleScheduled = false;
    let pendingSettleValue = false;

    /** Drain all settle subscribers ONCE, in a single post-flip task. */
    function scheduleFlipSettle(nextDark: boolean) {
        if (flipSettledCallbacks.size === 0) return;
        // Coalesce a burst of flips (e.g. double-toggle) into the LAST one's
        // single drain — the latest value is the one the charts must settle to.
        pendingSettleValue = nextDark;
        if (settleScheduled) return;
        settleScheduled = true;

        const drain = () => {
            settleScheduled = false;
            const value = pendingSettleValue;
            // Snapshot so a callback that (un)subscribes mid-drain can't mutate
            // the live iteration.
            for (const cb of [...flipSettledCallbacks]) {
                cb(value);
            }
        };

        // `requestAnimationFrame` runs AFTER the synchronous class flip's style
        // recalc/paint — the "instant chrome flip, then the batched re-theme"
        // ordering. No rAF (SSR / headless) → a macrotask. No View Transition.
        if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(drain);
        } else {
            setTimeout(drain, 0);
        }
    }

    /** Register a post-flip settle callback. Returns an unsubscribe fn. */
    function onFlipSettled(callback: DarkFlipSettledCallback): () => void {
        flipSettledCallbacks.add(callback);
        return () => {
            flipSettledCallbacks.delete(callback);
        };
    }

    // Safari: force style recalculation after .dark class toggle.
    // WebKit doesn't always invalidate CSS custom properties when an ancestor
    // class changes. Mirroring color-scheme as an inline style on <html> forces
    // a full cascade recalculation.
    watch(
        isDark,
        (dark) => {
            document.documentElement.style.colorScheme = dark ? "dark" : "light";
        },
        { immediate: true },
    );

    // E9b — the FLIP watch (non-immediate: the initial seed is not a flip). On a
    // genuine dark↔light change, schedule the ONE coalesced post-flip settle task.
    // Separate from the Safari color-scheme watch so the settle fires ONLY on a
    // real flip, never on construction.
    watch(isDark, (dark) => {
        scheduleFlipSettle(dark);
    });

    return {
        isDark,
        toggleDark,
        disableTransitions,
        setDisableTransitions,
        onFlipSettled,
    };
});

/**
 * The single shared dark-mode instance. The first call may pass an
 * `initialValue` seed (one-shot — see `UseGlobalDarkOptions`); subsequent calls
 * receive the already-constructed singleton and their `initialValue` is ignored.
 */
export function useGlobalDark(options?: UseGlobalDarkOptions): UseGlobalDarkReturn {
    if (options?.initialValue !== undefined) {
        if (seededInitialValue === undefined) {
            seededInitialValue = options.initialValue;
        } else if (seededInitialValue !== options.initialValue) {
            // fail-explicit: a CONFLICTING second seed is a misconfiguration —
            // the createGlobalState singleton already locked the first one and
            // can never re-seed. Silently ignoring it would hide the mistake; a
            // MATCHING re-seed is a harmless no-op and falls through.
            throw new Error(
                `[glass-ui] useGlobalDark({ initialValue: "${options.initialValue}" }) conflicts: ` +
                    `the singleton was already constructed with initialValue "${seededInitialValue}". ` +
                    `The seed is ONE-SHOT — set it on the FIRST useGlobalDark() call only.`,
            );
        }
    }
    return createGlobalDark();
}
