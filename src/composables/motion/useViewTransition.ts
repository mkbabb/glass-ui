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
    startViewTransition?: (callback: () => void) => ViewTransitionLike;
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
 * Wrap a synchronous DOM mutation in `document.startViewTransition` with an
 * instant fallback. `mutate` performs the DOM/state change and is called
 * synchronously in BOTH paths (native and fallback), so the post-mutation DOM
 * is identical regardless of support.
 *
 * @param mutate the synchronous DOM/state change to animate between.
 * @returns `{ finished, transitioned }` — await `finished` to route focus.
 *
 * @example
 *   const { finished } = startViewTransition(() => { rows.value = reranked });
 *   await finished;            // animation done
 *   firstRow.value?.focus();   // consumer routes focus (the a11y MANDATORY)
 */
export function startViewTransition(mutate: () => void): ViewTransitionResult {
    const doc =
        typeof document === "undefined"
            ? undefined
            : (document as DocumentWithViewTransition);

    if (!doc || typeof doc.startViewTransition !== "function") {
        mutate();
        return { finished: Promise.resolve(), transitioned: false };
    }

    const vt = doc.startViewTransition(() => mutate());
    // A rapid re-trigger SKIPS this transition, rejecting `ready` ('Transition
    // was skipped'); `ready` is otherwise unread, so swallow it here to keep the
    // rejection from leaking an unhandled pageerror (the dock/speedtest leak).
    vt.ready?.catch(() => {});
    return {
        finished: vt.finished.then(
            () => undefined,
            () => undefined,
        ),
        transitioned: true,
    };
}
