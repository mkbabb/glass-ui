import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    type Ref,
} from "vue";

export interface UseBreakpointControls {
    /** Live `matches` state for the given media query. */
    readonly matches: Readonly<Ref<boolean>>;
    /** Tear down the `matchMedia` listener. Auto-called on scope dispose. */
    stop: () => void;
}

/**
 * `useBreakpoint(query)` — a reactive read of a CSS media query's `matches`
 * state, kept live across resize / orientation / display-mode changes.
 *
 * Wraps `window.matchMedia(query)`, subscribes a single `change` handler,
 * and mirrors `mql.matches` into a `Ref<boolean>`. Auto-cleans on Vue scope
 * disposal (mirrors `useResizeObserver` / `useInterval` upstream); outside
 * a scope callers use the returned `stop()` control.
 *
 * SSR-safe: when `window` is undefined the composable returns a
 * permanently-`false` ref. Consumers should treat the initial frame as
 * "mobile-first / narrow-default" because the matchMedia subscription only
 * mounts client-side. This is the same shape consumers wrote by hand at the
 * consumer origin sites.
 *
 * Why this exists (promoted from a consumer): the survey
 * cockpit (`SurveyWizard.vue`) and the admin data-source toggle
 * (`AdminDataSourceToggle.vue`) both hand-rolled the same `matchMedia`
 * subscribe-on-mount + tear-down-on-unmount pattern. Two hand-rolls of one
 * pattern is the `feedback_generic_components` 2-consumer trigger;
 * absorbed publisher-side per `feedback_library_gaps`.
 *
 * Usage:
 *   const { matches: isDesktop } = useBreakpoint("(min-width: 720px)");
 *   const wide = isDesktop.value;  // live across resize.
 *
 * @param query A CSS `@media` query string, e.g. `"(min-width: 720px)"`.
 * @returns Object with `matches: Ref<boolean>` and `stop()` for manual
 *          disposal outside a Vue scope.
 */
export function useBreakpoint(query: string): UseBreakpointControls {
    const matches = ref(false);
    let mql: MediaQueryList | null = null;

    function handleChange(event: MediaQueryListEvent | MediaQueryList): void {
        matches.value = event.matches;
    }

    function start(): void {
        if (typeof window === "undefined" || !window.matchMedia) return;
        mql = window.matchMedia(query);
        matches.value = mql.matches;
        // `addEventListener("change", ...)` is the modern shape; the legacy
        // `addListener` form is not needed at the Vue 3.5 / Tailwind v4 era.
        mql.addEventListener("change", handleChange);
    }

    function stop(): void {
        mql?.removeEventListener("change", handleChange);
        mql = null;
    }

    // Same call-site contract as the origin: subscribe on mount so
    // the matchMedia handle never escapes the consumer's setup scope. When
    // there is no scope (test harness / outside-setup call) we subscribe
    // synchronously so the composable still resolves; the caller owns
    // `stop()` in that path.
    if (getCurrentScope()) {
        onScopeDispose(stop);
    }
    start();

    return {
        matches: readonly(matches),
        stop,
    };
}
