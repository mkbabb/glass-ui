import {
    getCurrentScope,
    onScopeDispose,
    ref,
    watch,
    type Ref,
} from "vue";

/**
 * Structural Ref shape — accepts the consumer's `Ref<T>` regardless of which
 * `@vue/reactivity` package the brand symbol comes from. Glass-ui may sit at
 * a different vue minor than the consumer, and Vue 3.5's `[RefSymbol]`
 * phantom is nominal-by-package; structural-by-`.value` is the correct
 * contract for a consumer-facing API. Same shape `useResizeObserver` uses.
 */
type RefLike<T> = { value: T };

export interface UseViewportReadyOptions {
    /**
     * IntersectionObserver `rootMargin`. Default `"200px"` so the gate flips
     * before the host actually crosses the viewport edge — gives the
     * consumer a quiet window for lazy-mount (`echarts`, `<canvas>` re-init,
     * heavy widget hydration) to land off the LCP frame.
     */
    rootMargin?: string;
    /**
     * `requestIdleCallback` timeout, in ms. Default 10_000.
     *
     * Why 10s and not the conventional 1–2s: a cold-loading consumer (slow
     * throughput, weak device) may not sustainably idle inside a 1–2s
     * window — the timeout fires inside the LCP measurement window and
     * defeats the IO gate's "wait for viewport AND idle main thread"
     * semantic. The IO gate fronts the budget, so the timeout only fires
     * after intersection has already resolved; ten seconds gives the main
     * thread room to idle naturally.
     */
    idleTimeout?: number;
    /**
     * IntersectionObserver `threshold`. Default 0.01 (1 % visible). Mirrors
     * the speedtest origin-site semantic — "any pixel visible counts".
     */
    threshold?: number;
}

export interface UseViewportReadyControls {
    /** Flips `false → true` exactly once when the host is visible + idle. */
    readonly ready: Ref<boolean>;
    /** Tear down observer + idle handle. Auto-called on scope dispose. */
    stop: () => void;
}

/**
 * `useViewportReady(host)` — two-stage `IntersectionObserver` +
 * `requestIdleCallback` gate that flips a `Ref<boolean>` exactly once when
 * the host element has entered the viewport AND the main thread has idled.
 *
 * The intended use is lazy-mount of a heavy widget (echarts, leaflet,
 * three.js, codemirror, custom canvas) that would otherwise pull its chunk
 * into the first-paint critical path. The two-stage gate ensures:
 *
 *   1. Visibility-first — `IntersectionObserver` watches `host`. Until the
 *      host crosses into the viewport (+ `rootMargin`), no fetch fires.
 *   2. Idle-second — once visible, `requestIdleCallback` schedules the flip
 *      so the chunk fetch waits for an idle main thread. Safari (no rIC)
 *      falls back to `setTimeout(fire, 16)` — one frame later — so the
 *      composition still defers past the IO callback's paint frame.
 *
 * The composable is one-shot: once the gate flips to `true` it disconnects
 * its observer and clears any pending idle handle. Auto-cleans on Vue scope
 * disposal (mirrors `useResizeObserver` / `useInterval` upstream); outside
 * a scope callers receive the manual `stop()` control.
 *
 * Both
 * `AdminOverviewView` and `ChartsView` shipped a near-identical `chartReady`
 * flag flipped by `requestIdleCallback` alone. The W3-R1 idiom in those
 * sites — gate visibility first, then schedule rIC inside the IO callback —
 * is generic across heavy-widget hydration; the speedtest 2-consumer trigger
 * fired for a publisher-side absorption per `feedback_generic_components`.
 *
 * Usage:
 *   const host = ref<HTMLElement | null>(null);
 *   const { ready } = useViewportReady(host);
 *   // <Chart v-if="ready" /> — fetched lazily once host is visible + idle.
 *
 * @param host A `Ref<Element | null>` for the element to gate visibility on.
 *             The observer watches THIS element, not the lazy-mounted
 *             widget (which doesn't exist pre-flip).
 * @param options.rootMargin Default `"200px"`.
 * @param options.idleTimeout Default `10000` ms.
 * @param options.threshold   Default `0.01`.
 * @returns Object with `ready: Ref<boolean>` (flips false → true once) and
 *          `stop()` for manual disposal outside a Vue scope.
 */
export function useViewportReady(
    host: RefLike<Element | null>,
    options: UseViewportReadyOptions = {},
): UseViewportReadyControls {
    const rootMargin = options.rootMargin ?? "200px";
    const idleTimeout = options.idleTimeout ?? 10_000;
    const threshold = options.threshold ?? 0.01;

    const ready = ref(false);
    let observer: IntersectionObserver | null = null;
    // `observed` tracks the currently-attached element (or `undefined` while
    // never bound — distinct from `null`, which is a valid "no host yet"
    // state that still schedules the idle fallback exactly once).
    let observed: Element | null | undefined = undefined;
    let idleHandle: number | null = null;
    let timerHandle: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    function fire(): void {
        if (disposed || ready.value) return;
        ready.value = true;
        teardown();
    }

    function scheduleIdle(): void {
        if (disposed) return;
        if (typeof window === "undefined") {
            // SSR / non-browser — synchronous flip so consumers don't stall.
            fire();
            return;
        }
        if ("requestIdleCallback" in window) {
            idleHandle = window.requestIdleCallback(fire, {
                timeout: idleTimeout,
            });
        } else {
            // Safari fallback: one frame later so the composition doesn't
            // piggyback off the IO callback's paint frame.
            timerHandle = setTimeout(fire, 16);
        }
    }

    function teardown(): void {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (
            idleHandle !== null
            && typeof window !== "undefined"
            && "cancelIdleCallback" in window
        ) {
            window.cancelIdleCallback(idleHandle);
            idleHandle = null;
        }
        if (timerHandle !== null) {
            clearTimeout(timerHandle);
            timerHandle = null;
        }
    }

    function observe(target: Element): void {
        if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
            // No IO — fall back to the rIC-only path so the gate still
            // resolves on jsdom / happy-dom test runners and SSR.
            scheduleIdle();
            return;
        }
        observer = new IntersectionObserver(
            (entries) => {
                if (disposed) return;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        scheduleIdle();
                        // One-shot: once visible, never re-evaluate.
                        observer?.disconnect();
                        observer = null;
                        break;
                    }
                }
            },
            { rootMargin, threshold },
        );
        observer.observe(target);
    }

    function rebind(el: Element | null): void {
        if (disposed || ready.value) return;
        // First bind: `observed` is `undefined`; subsequent identical binds
        // (`observed === el`) are no-ops.
        if (observed !== undefined && observed === el) return;
        teardown();
        observed = el;
        if (el) {
            observe(el);
        } else {
            // No host — schedule idle so the gate still flips on
            // environments where the host never materialises (e.g.
            // SSR-flushed shell). Matches the speedtest origin-site semantic.
            scheduleIdle();
        }
    }

    // Initial synchronous bind so the no-host idle fallback fires without
    // waiting for the watch's `flush:"post"` tick — that ordering is
    // observable to consumers (and to tests). Subsequent host changes flow
    // through the watcher.
    rebind(host.value);

    // `host` is structurally typed for the public API; `watch` wants the
    // brand-checked Ref shape, so a single-site cast bridges the contract.
    const stopWatch = watch(
        host as Ref<Element | null>,
        (el) => {
            rebind(el);
        },
        { flush: "post" },
    );

    function stop(): void {
        if (disposed) return;
        disposed = true;
        stopWatch();
        teardown();
    }

    if (getCurrentScope()) {
        onScopeDispose(stop);
    }

    return { ready, stop };
}
