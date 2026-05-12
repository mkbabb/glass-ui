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
import { createGlobalState, useDark, useToggle } from "@vueuse/core";
import { ref, watch } from "vue";

/** Single shared dark mode instance — avoids multiple useDark() watchers racing on classList. */
export const useGlobalDark = createGlobalState(() => {
    const isDark = useDark({ disableTransition: false });
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
