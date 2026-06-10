// useRouteTransition — the ROUTE/navigation View-Transitions helper (D6.c M6).
//
// A thin wrapper over `startViewTransition` for the NAVIGATION case: it runs a
// navigation callback (a `router.push`, a `history.pushState`, any async state
// swap that changes the page) inside `document.startViewTransition`, so a matched
// `view-transition-class: gl-shared-element` pair (the gallery card title ↔ the
// dashboard masthead title) MORPHS across the route change instead of hard-cutting.
//
// It differs from `startViewTransition` in two navigation-specific ways:
//   (1) the callback may be ASYNC (a route navigation resolves a promise) — the
//       helper awaits it inside the transition's `update` so the new DOM is in
//       place before the snapshot is taken, and
//   (2) it carries the PRM + unsupported FALLBACKS explicitly: under reduced-motion
//       OR on an engine without `document.startViewTransition`, the navigation
//       still runs (the callback is awaited directly) — just without the morph.
//       Information parity is absolute: the route always changes; only the motion
//       is conditional.
//
// Pure-native + dependency-free: no `vue`, no `@mkbabb/keyframes.js`, no
// `@vueuse/core`, no `vue-router` import — the navigation callback is the
// consumer's (so this helper is router-agnostic). It ships on the engine-free
// `@mkbabb/glass-ui/motion-core` subpath alongside `useViewTransition` /
// `useScrollProgress`, and it is root-barrel-safe (no heavy peer in the
// module-eval closure).
//
// Baseline: same-document `view-transitions` = Newly Available → adopt with the
// instant fallback below. Reduced-motion is honoured BOTH here (the helper takes
// the instant path under PRM so no snapshot is captured) AND in CSS
// (`view-transition.css` sets `animation: none` on the VT pseudos under PRM).
//
// @example  router-integration (the card → masthead route morph)
//   const { navigate } = useRouteTransition();
//   // both card title + masthead title carry
//   //   view-transition-class: gl-shared-element; view-transition-name: dash-usf-title
//   await navigate(() => router.push(`/${slug}`));   // morphs under support, cuts otherwise

/** The shape `document.startViewTransition` resolves — narrowed to what the
 *  helper reads (the lib's DOM types may not carry it on every target). */
interface RouteViewTransitionLike {
    finished: Promise<unknown>;
    /** Rejects ('Transition was skipped') when a re-trigger skips this one. */
    ready?: Promise<unknown>;
}

interface DocumentWithRouteViewTransition {
    startViewTransition?: (
        callbackOrOptions:
            | (() => void | Promise<void>)
            | { update: () => void | Promise<void>; types?: string[] },
    ) => RouteViewTransitionLike;
}

export interface RouteTransitionOptions {
    /**
     * Directional transition types tagged on the active transition for
     * `:active-view-transition-type(<t>)` CSS curves (Chrome 140+; feature-
     * detected, degrades to one symmetric curve elsewhere). For a route morph a
     * consumer might tag `["forward"]` / `["back"]` off the navigation direction.
     */
    types?: string[];
}

export interface RouteTransitionResult {
    /**
     * Resolves when the transition's `finished` promise settles (or immediately
     * in the fallback / PRM path). Use to route focus per the a11y MANDATORY:
     * `await navigate(go).finished; mastheadTitle.value?.focus()`. Never rejects —
     * a skipped/aborted transition settles cleanly.
     */
    finished: Promise<void>;
    /** True when the native VT ran; false when the instant / PRM fallback ran. */
    transitioned: boolean;
}

export interface UseRouteTransitionReturn {
    /**
     * Run `navigate` (the route/state change, possibly async) wrapped in a View
     * Transition. Under PRM or on an unsupported engine the navigation runs
     * directly (awaited), unanimated. Returns `{ finished, transitioned }`.
     */
    navigate: (
        navigate: () => void | Promise<void>,
        options?: RouteTransitionOptions,
    ) => RouteTransitionResult;
    /** True when the native VT API is available (feature-detect for VT-only CSS). */
    supported: boolean;
}

function prefersReducedMotion(): boolean {
    if (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
    ) {
        return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when `document.startViewTransition` is available — the feature-detected
 * predicate the helper (and a consumer's VT-only styling) gate on.
 */
export function supportsRouteTransitions(): boolean {
    return (
        typeof document !== "undefined" &&
        typeof (document as DocumentWithRouteViewTransition)
            .startViewTransition === "function"
    );
}

/**
 * The route-transition helper. Returns `navigate` — a function that wraps a
 * (possibly async) navigation callback in `document.startViewTransition` with PRM
 * + unsupported fallbacks. The navigation ALWAYS runs (information parity); the
 * morph is conditional on support + motion preference.
 */
export function useRouteTransition(): UseRouteTransitionReturn {
    function navigate(
        nav: () => void | Promise<void>,
        options?: RouteTransitionOptions,
    ): RouteTransitionResult {
        const doc =
            typeof document === "undefined"
                ? undefined
                : (document as DocumentWithRouteViewTransition);

        // PRM fence + unsupported fallback — run the navigation directly (awaited)
        // with NO snapshot, so a reduced-motion / non-supporting user gets the
        // route change instantly, unanimated. The `async` IIFE wrapper normalizes
        // BOTH a sync-throwing AND an async-rejecting `nav` into one rejected
        // promise (the function boundary catches the sync throw), so the trailing
        // `.then(onError)` swallow makes `finished` settle cleanly in every case —
        // a `Promise.resolve(nav())` alone would let a SYNCHRONOUS throw escape
        // `navigate()` before the chain attaches.
        if (
            !doc ||
            typeof doc.startViewTransition !== "function" ||
            prefersReducedMotion()
        ) {
            const finished = (async () => nav())().then(
                () => undefined,
                () => undefined,
            );
            return { finished, transitioned: false };
        }

        // Native path — the `{ update, types }` object overload is Chrome 140+.
        // When `types` is passed we use it; on an engine lacking the overload the
        // browser ignores the unknown `types` key (it still reads `update`), so
        // the call degrades to the single symmetric curve. `update` may return a
        // promise (a route navigation) — the browser awaits it before snapshotting
        // the new DOM, which is exactly the navigation case.
        const vt =
            options?.types && options.types.length > 0
                ? doc.startViewTransition({
                      update: () => nav(),
                      types: options.types,
                  })
                : doc.startViewTransition(() => nav());
        // fail-explicit: 'ready' rejects 'Transition was skipped' on a rapid
        // re-navigate; the swallow prevents an unhandled pageerror; 'ready' is
        // otherwise unread, so there is no real failure to surface.
        vt.ready?.catch(() => {});
        return {
            finished: vt.finished.then(
                () => undefined,
                () => undefined,
            ),
            transitioned: true,
        };
    }

    return { navigate, supported: supportsRouteTransitions() };
}
