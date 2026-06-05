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
// construction, and dev-warn if a later call passes a CONFLICTING `initialValue`
// (so the one-shot semantics surprise no one). This pairs with
// `darkModeSyncScript()` — the parse-time `<head>` script that sets the theme
// before first paint so the seed and the FOUC eliminator agree.
import type { BasicColorSchema } from "@vueuse/core";
import { createGlobalState, useDark, useToggle } from "@vueuse/core";
import { ref, watch } from "vue";

export interface UseGlobalDarkOptions {
    /**
     * The first-paint color scheme seed, threaded to `useDark({ initialValue })`.
     * ONE-SHOT: only the FIRST `useGlobalDark()` call constructs the singleton, so
     * only its `initialValue` is honored; later calls' values are ignored (a dev
     * warning fires on a conflict). Defaults to vueuse's `"auto"`
     * (prefers-color-scheme). Pair with `darkModeSyncScript()` so the parse-time
     * `<head>` script and this runtime seed agree.
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
            // Force reflow so the class takes effect before the toggle
            void document.documentElement.offsetHeight;
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

    return { isDark, toggleDark, disableTransitions, setDisableTransitions };
});

/**
 * The single shared dark-mode instance. The first call may pass an
 * `initialValue` seed (one-shot — see `UseGlobalDarkOptions`); subsequent calls
 * receive the already-constructed singleton and their `initialValue` is ignored.
 */
export function useGlobalDark(options?: UseGlobalDarkOptions) {
    if (options?.initialValue !== undefined) {
        if (seededInitialValue === undefined) {
            seededInitialValue = options.initialValue;
        } else if (
            seededInitialValue !== options.initialValue &&
            import.meta.env.DEV
        ) {
            console.warn(
                `[glass-ui] useGlobalDark({ initialValue: "${options.initialValue}" }) ignored: ` +
                    `the singleton was already constructed with initialValue "${seededInitialValue}". ` +
                    `Seed it on the FIRST useGlobalDark() call (the one-shot seed contract).`,
            );
        }
    }
    return createGlobalDark();
}
