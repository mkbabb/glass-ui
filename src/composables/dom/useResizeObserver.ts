import {
    getCurrentScope,
    onScopeDispose,
    watch,
    type Ref,
} from "vue";

/**
 * Structural Ref shape — accepts the consumer's `Ref<T>` regardless of
 * which `@vue/reactivity` package the brand symbol comes from. Glass-ui
 * may sit at a different vue minor than the consumer, and Vue 3.5's
 * `[RefSymbol]` phantom is nominal-by-package; structural-by-`.value`
 * is the gestalt-correct contract for a consumer-facing API.
 */
type RefLike<T> = { value: T };

export interface UseResizeObserverOptions {
    /**
     * Skip dispatch if every observed dimension delta is below this
     * threshold (in CSS pixels). Helps dodge sub-pixel resize-drag storms.
     * Default: 0.5.
     */
    threshold?: number;
    /**
     * Coalesce dispatch into the next animation frame. The most recent
     * entry wins; older entries within the same frame are dropped.
     * Default: true.
     */
    rafBatch?: boolean;
    /** Forwarded to `ResizeObserver.observe`. Default: `"content-box"`. */
    box?: ResizeObserverBoxOptions;
}

export interface UseResizeObserverControls {
    /** Stop observing and disconnect the underlying observer. */
    stop: () => void;
}

/**
 * Vue-scope-aware ResizeObserver wrapper.
 *
 * Watches one element ref and fires a callback when its bounding box
 * changes by more than `threshold` CSS pixels in either dimension. The
 * platform's first observation of each element always dispatches, so a
 * caller learns the element's size on mount without a resize.
 * Dispatch coalesces through `requestAnimationFrame` by default so a
 * caller wiring an expensive re-init (canvas DPR-resync, layout
 * remeasure) doesn't pay for every drag-resize step.
 *
 * Safe to call outside setup/effect scopes. In a scope it auto-cleans
 * on disposal; outside a scope callers use the returned `stop()`
 * explicitly. Mirrors the auto-disposal pattern of `useTimer` and
 * `useInterval` upstream.
 *
 * Usage:
 *   const el = ref<HTMLElement | null>(null);
 *   useResizeObserver(el, (rect) => recompute(rect));
 */
export function useResizeObserver<T extends Element>(
    target: RefLike<T | null>,
    callback: (rect: DOMRectReadOnly, entry: ResizeObserverEntry) => void,
    options: UseResizeObserverOptions = {},
): UseResizeObserverControls {
    const threshold = options.threshold ?? 0.5;
    const rafBatch = options.rafBatch ?? true;
    const box = options.box;

    let observer: ResizeObserver | null = null;
    let observed: Element | null = null;
    // NaN until an element's first observation (and again on `disconnect`): no reading
    // equals it, so the platform's initial observation, delivered once per `observe`
    // after layout, always dispatches.
    let lastWidth = Number.NaN;
    let lastHeight = Number.NaN;
    let rafId: number | null = null;
    let pending: ResizeObserverEntry | null = null;

    function flush(): void {
        rafId = null;
        if (!pending) return;
        const entry = pending;
        pending = null;
        callback(entry.contentRect, entry);
    }

    function dispatch(entry: ResizeObserverEntry): void {
        const rect = entry.contentRect;
        if (
            Math.abs(rect.width - lastWidth) < threshold &&
            Math.abs(rect.height - lastHeight) < threshold
        ) {
            return;
        }
        lastWidth = rect.width;
        lastHeight = rect.height;

        if (!rafBatch) {
            callback(rect, entry);
            return;
        }
        pending = entry;
        if (rafId === null) {
            rafId = requestAnimationFrame(flush);
        }
    }

    function disconnect(): void {
        if (observer && observed) {
            observer.unobserve(observed);
        }
        observer?.disconnect();
        observer = null;
        observed = null;
        lastWidth = Number.NaN;
        lastHeight = Number.NaN;
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        pending = null;
    }

    function observe(el: Element): void {
        if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
            return;
        }
        observer = new ResizeObserver((entries) => {
            const entry = entries[entries.length - 1];
            if (entry) dispatch(entry);
        });
        observer.observe(el, box ? { box } : undefined);
        observed = el;
    }

    // The `target` is structurally typed as `RefLike<T | null>` for the
    // public API; internally `watch` wants the brand-checked Ref shape, so
    // a one-line cast bridges the contract.
    const stopWatch = watch(
        target as Ref<T | null>,
        (el) => {
            disconnect();
            if (el) observe(el);
        },
        { immediate: true, flush: "post" },
    );

    function stop(): void {
        stopWatch();
        disconnect();
    }

    if (getCurrentScope()) {
        onScopeDispose(stop);
    }

    return { stop };
}
