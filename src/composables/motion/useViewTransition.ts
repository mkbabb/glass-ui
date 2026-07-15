// useViewTransition — the same-document View-Transitions motion substrate
// (AQ.W5 §Design 3 / W5-c).
//
// A thin helper that wraps a synchronous DOM-mutating callback in
// `document.startViewTransition`, with an INSTANT fallback when the API is
// absent (the callback runs synchronously, so a non-supporting engine degrades
// to an instant swap — functional, just unanimated). The helper deliberately
// does NOT manage `view-transition-name` assignment (that is CSS the consumer
// owns) and does NOT route focus (focus routing is the consumer's a11y
// MANDATORY — `finished` is returned so they can `await` it then `.focus()`).
//
// Pure-native + dependency-free: no `vue`, no `@mkbabb/keyframes.js`, no
// `@vueuse/core` import — so it ships on the engine-free
// `@mkbabb/glass-ui/motion-core` subpath alongside `useScrollProgress` /
// `useYieldToMain`, and it is root-barrel-safe (the L.W1 / AP.W3 SCC-trap
// closure holds). The paired CSS substrate is `src/styles/view-transition.css`
// (the `.gl-list-item` group recipe + `--vt-*` tokens).
//
// Baseline: same-document `view-transitions` + `view-transition-class` = Newly
// Available → adopt with the ≤ 20-LOC instant fallback below. Reduced-motion is
// handled in CSS (`view-transition.css` sets `animation: none` on the VT
// pseudos under PRM — the swap still runs, just without motion).
//
// Cross-repo coupling (the AQ ↔ muster J seam): J.W5's `useVerdictMoment`
// re-rank + dialog reveal import `startViewTransition` from
// `@mkbabb/glass-ui/motion-core`, call `startViewTransition(() => render())`,
// and tag each row `view-transition-class: gl-list-item; view-transition-name:
// row-<id>`. `supportsViewTransitions()` gates any VT-only styling they apply.

/** The shape `document.startViewTransition` resolves — narrowed to what the
 *  helper reads (the lib's DOM types may not carry it on every target). */
interface ViewTransitionLike {
    finished: Promise<unknown>;
    /** Rejects ('Transition was skipped') when a re-trigger skips this one. */
    ready?: Promise<unknown>;
}

interface DocumentWithViewTransition {
    // BA.W-ATLAS-RECONCILE A-4b — the update callback may be ASYNC. The native
    // API awaits a promise-returning `update` before snapshotting the new DOM,
    // which is exactly the navigation case (a `router.push` resolving a promise).
    startViewTransition?: (
        callbackOrOptions:
            | (() => void | Promise<void>)
            | { update: () => void | Promise<void>; types?: string[] },
    ) => ViewTransitionLike;
}

/** Options for `startViewTransition`. `types` (Chrome 140+, absent on Firefox
 *  144) tag the active transition so `:active-view-transition-type(<t>)` CSS can
 *  author DIRECTION-specific curves. Feature-detected — when the engine lacks the
 *  object-with-`types` overload the call degrades to the plain-callback form
 *  (one symmetric curve), which is functionally identical (the swap still runs). */
export interface ViewTransitionOptions {
    types?: string[];
    /**
     * BA.W-ATLAS-RECONCILE A-4b — take the JS-level INSTANT path under
     * `prefers-reduced-motion: reduce` (run `mutate` directly, NO snapshot
     * captured). The HEAD default pushes PRM to CSS only (`view-transition.css`
     * sets `animation: none` on the VT pseudos) — but that STILL captures a
     * snapshot. For the navigation case a reduced-motion user wants the swap to
     * happen with no transition machinery at all; `navigate()` sets this true.
     * Defaults to `false` so the existing sync-VT consumers (muster J.W5 row
     * re-rank) keep their exact CSS-handled PRM behaviour. @default false
     */
    instantUnderReducedMotion?: boolean;
}

export interface ViewTransitionResult {
    /**
     * Resolves when the transition's `finished` promise settles (or
     * immediately in the fallback path). Use to route focus per the a11y
     * MANDATORY: `await startViewTransition(mutate).finished; el.focus()`.
     * Never rejects — a skipped/aborted transition settles cleanly.
     */
    finished: Promise<void>;
    /** True when the native API ran; false when the instant fallback ran. */
    transitioned: boolean;
}

/**
 * True when `document.startViewTransition` is available — the feature-detected
 * predicate consumers gate optional VT-only styling on.
 */
export function supportsViewTransitions(): boolean {
    return (
        typeof document !== "undefined" &&
        typeof (document as DocumentWithViewTransition).startViewTransition ===
            "function"
    );
}

/**
 * BA.W-ATLAS-RECONCILE A-4b — `prefers-reduced-motion: reduce` matchMedia probe.
 * SSR/no-matchMedia → `false` (no reduce signal, full path). Used by the
 * `instantUnderReducedMotion` JS-level instant-path (the navigation case wants no
 * snapshot machinery at all under reduce, beyond the CSS `animation: none`).
 */
function prefersReducedMotion(): boolean {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The typed object overload and its matching selector arrived after the callback
 *  API. Use the selector as the capability probe so callback-only Safari builds
 *  never receive an object they reject. */
function supportsViewTransitionTypes(): boolean {
    return (
        typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("selector(:active-view-transition-type(glass))")
    );
}

function runInstant(mutate: () => void | Promise<void>): ViewTransitionResult {
    const finished = (async () => mutate())().then(
        () => undefined,
        () => undefined,
    );
    return { finished, transitioned: false };
}

/**
 * Wrap a synchronous DOM mutation in `document.startViewTransition` with an
 * instant fallback. `mutate` performs the DOM/state change and is called
 * synchronously in BOTH paths (native and fallback), so the post-mutation DOM
 * is identical regardless of support.
 *
 * @param mutate the synchronous DOM/state change to animate between.
 * @param options optional `{ types }` — directional transition types tagged on
 *   the active transition for `:active-view-transition-type(<t>)` CSS curves
 *   (Chrome 140+; feature-detected, degrades to one symmetric curve elsewhere).
 * @returns `{ finished, transitioned }` — await `finished` to route focus.
 *
 * @example
 *   const { finished } = startViewTransition(() => { rows.value = reranked });
 *   await finished;            // animation done
 *   firstRow.value?.focus();   // consumer routes focus (the a11y MANDATORY)
 *
 * @example
 *   // directional intent — snappier exit on collapse, softer entry on expand
 *   startViewTransition(() => mutate(), { types: ["dock-expand"] });
 */
export function startViewTransition(
    mutate: () => void | Promise<void>,
    options?: ViewTransitionOptions,
): ViewTransitionResult {
    const doc =
        typeof document === "undefined"
            ? undefined
            : (document as DocumentWithViewTransition);

    // BA.W-ATLAS-RECONCILE A-4b — the instant path: no API, OR the opt-in
    // JS-level reduced-motion instant-path. Run `mutate` directly (awaited so an
    // async navigation completes before `finished` resolves), NO snapshot. The
    // `async` IIFE normalizes BOTH a sync-throwing AND an async-rejecting `mutate`
    // into one settled promise (the function boundary catches the sync throw), so
    // `finished` settles cleanly in every case — a `Promise.resolve(mutate())`
    // alone would let a SYNCHRONOUS throw escape before the chain attaches.
    if (
        !doc ||
        typeof doc.startViewTransition !== "function" ||
        (options?.instantUnderReducedMotion && prefersReducedMotion())
    ) {
        return runInstant(mutate);
    }

    // The typed object overload arrived after the callback API. A callback-only
    // implementation may throw on an object instead of ignoring `types`, so gate
    // that form on its matching selector capability. A synchronous native failure
    // takes the same visible instant path as no support.
    let vt: ViewTransitionLike;
    try {
        vt =
            options?.types?.length && supportsViewTransitionTypes()
                ? doc.startViewTransition({ update: mutate, types: options.types })
                : doc.startViewTransition(mutate);
    } catch {
        return runInstant(mutate);
    }
    // fail-explicit: befitting — 'ready' rejects 'Transition was skipped' on a
    // rapid re-trigger; the swallow prevents an unhandled pageerror; 'ready' is
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

// ── BA.W-ATLAS-RECONCILE A-4b — the route/navigation convenience ─────────────
// The atlas's route-transition idiom (the gallery-card-title ↔ dashboard-masthead-
// title morph across a `router.push`) is the ASYNC-update + reduced-motion-instant
// case. Rather than a PARALLEL `useRouteTransition` wrapper (the DEC-8 anti-pattern
// the fork's standalone helper would re-introduce), `navigate` is a THIN convenience
// over the ONE `startViewTransition` substrate: it forwards a possibly-async
// navigation callback and pins `instantUnderReducedMotion: true` (a reduced-motion
// user gets the route change instantly, unanimated — information parity absolute;
// the route ALWAYS changes, only the motion is conditional). Router-agnostic: the
// navigation callback is the consumer's (no `vue-router` import).

/** Options for `navigate` — the directional transition `types` (Chrome 140+,
 *  feature-detected; tag `["forward"]`/`["back"]` off the navigation direction). */
export type NavigateOptions = ViewTransitionOptions;

/**
 * Run a (possibly ASYNC) navigation callback wrapped in a View Transition, with
 * the reduced-motion + unsupported instant-paths. The navigation ALWAYS runs
 * (awaited); the morph is conditional on support + motion preference. Returns the
 * same `{ finished, transitioned }` contract — `await navigate(go).finished` then
 * route focus (the a11y MANDATORY).
 *
 * @example  the card → masthead route morph
 *   // both the card title + masthead title carry
 *   //   view-transition-class: gl-shared-element; view-transition-name: dash-title
 *   await navigate(() => router.push(`/${slug}`), { types: ["forward"] }).finished;
 *   mastheadTitle.value?.focus();
 */
export function navigate(
    nav: () => void | Promise<void>,
    options?: NavigateOptions,
): ViewTransitionResult {
    return startViewTransition(nav, {
        ...options,
        instantUnderReducedMotion: true,
    });
}

/**
 * True when the route-transition morph can run (native VT available). A consumer
 * gates VT-only navigation styling on this (alias of `supportsViewTransitions`
 * named for the navigation call site). Under reduced motion the `navigate` helper
 * still takes the instant path even when this is `true`.
 */
export function supportsRouteTransitions(): boolean {
    return supportsViewTransitions();
}
