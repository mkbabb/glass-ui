/**
 * Progressive batch-render: grows a `visibleCount` RENDER-MOUNT count in
 * batches as a bottom sentinel enters the viewport. Uses IntersectionObserver
 * for normal scrolling plus a rAF-coalesced fast-drag scroll fallback for
 * scrollbar drags that skip past the sentinel, and re-observes the sentinel on
 * each `visibleCount` change (it moves down as new items mount).
 *
 * DISTINCT from `useInfiniteScroll` (`components/infinite-scroll/`):
 * that fires a DATA-FETCH `onLoadMore` trigger to pull more records; this grows
 * a render-mount count over an ALREADY-loaded list. Different concerns, kept
 * disjoint. The `visibleCount` this returns is the SAME ref `useScrollTo`'s
 * `ensureTargetLoaded` jumps to a target — the two compose (lazy-loader owns
 * the progressive grow; `useScrollTo` jumps the count on a ToC click).
 */
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import type { LazyLoaderOptions } from "./types";

export function useLazyLoader(totalCount: number, options?: LazyLoaderOptions) {
    const batchSize = options?.batchSize ?? 2;
    const rootMargin = options?.rootMargin ?? "0px 0px 600px 0px";

    const visibleCount = ref(Math.min(batchSize, totalCount));
    const loadSentinel = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver | null = null;
    let rafId = 0;

    function loadMore() {
        if (visibleCount.value < totalCount) {
            visibleCount.value = Math.min(
                visibleCount.value + batchSize,
                totalCount,
            );
        }
    }

    /**
     * Fast-drag scroll fallback: if the sentinel is already above the bottom of
     * the viewport (the user scrolled past it before the IO fired), force the
     * next batch.
     */
    function onScroll() {
        if (rafId || visibleCount.value >= totalCount) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            if (!loadSentinel.value || visibleCount.value >= totalCount) return;
            const container = options?.scrollContainer?.value;
            const viewportBottom = container
                ? container.getBoundingClientRect().bottom
                : window.innerHeight;
            const sentinelRect = loadSentinel.value.getBoundingClientRect();
            if (sentinelRect.top < viewportBottom) {
                loadMore();
            }
        });
    }

    onMounted(() => {
        const container = options?.scrollContainer?.value;
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) loadMore();
                }
            },
            { root: container ?? undefined, rootMargin },
        );
        nextTick(() => {
            if (loadSentinel.value) observer!.observe(loadSentinel.value);
        });

        const scrollTarget = container ?? document;
        scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    });

    onUnmounted(() => {
        observer?.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        const container = options?.scrollContainer?.value;
        const scrollTarget = container ?? document;
        scrollTarget.removeEventListener("scroll", onScroll);
    });

    // Re-observe the sentinel after it moves (new items mounted below it).
    watch(visibleCount, () => {
        if (!observer) return;
        observer.disconnect();
        nextTick(() => {
            if (loadSentinel.value) observer!.observe(loadSentinel.value);
        });
    });

    return { visibleCount, loadSentinel };
}
