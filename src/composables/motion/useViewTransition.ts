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
// Unsupported engines and reduced motion share one immediate state-update path;
// neither captures snapshots. The paired CSS PRM rule is a defensive floor for
// direct native callers outside this helper.
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
 * `prefers-reduced-motion: reduce` matchMedia probe. SSR/no-matchMedia returns
 * false because no reduced-motion preference is available.
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
 * Wrap a DOM mutation in `document.startViewTransition` with an instant
 * fallback. The mutation may be synchronous or asynchronous.
 *
 * @param mutate the DOM/state change to animate between.
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

    // The single instant path covers no API and reduced motion. Run `mutate`
    // directly (awaited so an
    // async navigation completes before `finished` resolves), NO snapshot. The
    // `async` IIFE normalizes BOTH a sync-throwing AND an async-rejecting `mutate`
    // into one settled promise (the function boundary catches the sync throw), so
    // `finished` settles cleanly in every case — a `Promise.resolve(mutate())`
    // alone would let a SYNCHRONOUS throw escape before the chain attaches.
    if (
        !doc ||
        typeof doc.startViewTransition !== "function" ||
        prefersReducedMotion()
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
