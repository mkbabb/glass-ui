// scrollReader — the ONE rAF-coalesced scroll-listener core (BC.W-SCROLL-TRIGGER).
//
// Factored out of `useScrollTracker.onScroll` (sidebar/useScrollTracker.ts:87-129,
// :190-192): the `requestAnimationFrame`-coalesced scroll listener + the
// `scrollContainer ?? document/window` source resolution + the cleanup, lifted into
// a single private leaf so the library has ONE scroll-listener core. The two readers
// that need a coalesced scroll tick — `useScrollTrigger` (the trigger-point reader)
// and `useScrollTracker` (the ToC active-section tracker) — compose THIS leaf; no
// surface re-adds a raw `addEventListener("scroll")` + its own rAF (the no-fourth-
// listener fence).
//
// INTERNAL leaf — NOT exported on any public barrel; the two readers import it
// relatively. It is a thin coalescer, NOT a momentum loop (the BB.W-SCROLL-MOTION
// no-Lenis/GSAP fence): one in-flight frame per scroll burst, the `useScrollProgress`
// fallback idiom (a one-shot coalescing guard, never a free-running `useRAFLoop`).
//
// VUE-FREE (no `vue` import) — it is a plain DOM primitive (an `EventTarget` + rAF
// coalesce), so a Vue-only or a Vue-free caller can both compose it; the composable
// wrappers own the Vue lifecycle (`onMounted`/`onScopeDispose`). No `@vueuse/core`,
// no `@mkbabb/keyframes.js`.

/** The scroll source: an element with its own scroll-port, the Window, or null. */
export type ScrollSource = HTMLElement | Window | null;

export interface ScrollReader {
    /** The resolved scroll-listener TARGET (the element, or `document` for the window). */
    readonly target: EventTarget | null;
    /** The current scroll position on the source (px) — `scrollTop` / `scrollY`. */
    position: () => number;
    /** The scrollable extent on the source (px) — `scrollHeight - clientHeight` / doc. */
    extent: () => number;
    /** Force a coalesced tick now (post-resize/layout re-read). */
    schedule: () => void;
    /** Detach the listener + cancel any in-flight frame. */
    stop: () => void;
}

/**
 * Resolve a scroll source to its listener TARGET. An `HTMLElement` listens on
 * itself; the `Window` (and a `null`/absent source) listens on `document` — the
 * `useScrollTracker.ts:191` `container ?? document` resolution.
 */
function resolveTarget(source: ScrollSource): EventTarget | null {
    if (source instanceof HTMLElement) return source;
    // Window or null → the document (window-scroll events fire on document/window;
    // document is the listener target the ToC tracker already used).
    if (typeof document !== "undefined") return document;
    return null;
}

/** Read the live scroll position off the source (element `scrollTop` / window `scrollY`). */
function readPosition(source: ScrollSource): number {
    if (source instanceof HTMLElement) return source.scrollTop;
    if (typeof window !== "undefined") return window.scrollY || window.pageYOffset || 0;
    return 0;
}

/** Read the scrollable extent off the source (`scrollHeight - clientHeight` / doc - vh). */
function readExtent(source: ScrollSource): number {
    if (source instanceof HTMLElement) {
        return Math.max(0, source.scrollHeight - source.clientHeight);
    }
    if (typeof document !== "undefined" && typeof window !== "undefined") {
        const doc = document.documentElement;
        return Math.max(0, doc.scrollHeight - window.innerHeight);
    }
    return 0;
}

/**
 * Attach ONE rAF-coalesced scroll listener to the source and call `onTick(reader)`
 * once per scroll burst (a single in-flight frame). The `onTick` callback reads the
 * live `position()`/`extent()` off the returned reader. The listener is the SAME
 * `{ passive: true }` scroll listener `useScrollTracker` and `useFadingScroll`
 * already used — factored to ONE site.
 *
 * @param source the scroll source (element / Window / null)
 * @param onTick called once per coalesced scroll frame with the live reader
 */
export function createScrollReader(
    source: ScrollSource,
    onTick: (reader: ScrollReader) => void,
): ScrollReader {
    const target = resolveTarget(source);
    let rafId = 0;

    function schedule(): void {
        // The one-shot coalescing guard — at most one in-flight frame per burst (the
        // `useScrollProgress`/`useFadingScroll` fallback idiom, NOT a free-running loop).
        if (rafId) return;
        if (typeof requestAnimationFrame !== "function") {
            // SSR / a test runner with no rAF: run synchronously (the listener still
            // resolves a tick, deterministic for the scripted unit test).
            onTick(reader);
            return;
        }
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            onTick(reader);
        });
    }

    function stop(): void {
        target?.removeEventListener("scroll", schedule);
        if (rafId && typeof cancelAnimationFrame === "function") {
            cancelAnimationFrame(rafId);
        }
        rafId = 0;
    }

    const reader: ScrollReader = {
        target,
        position: () => readPosition(source),
        extent: () => readExtent(source),
        schedule,
        stop,
    };

    target?.addEventListener("scroll", schedule, { passive: true });

    return reader;
}
