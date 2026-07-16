import { nextTick, ref, watch, onScopeDispose, toValue } from "vue";
import type { InfiniteScrollOptions, InfiniteScrollReturn } from "./types";

/**
 * Composable for infinite scroll with IntersectionObserver.
 *
 * Watches a sentinel element at the bottom of the scrollable area.
 * When it enters the viewport and `hasMore` is true / `isLoading` is false,
 * the `onLoadMore` callback fires.
 */
export function useInfiniteScroll(options: InfiniteScrollOptions): InfiniteScrollReturn {
    const { threshold = 200, hasMore, isLoading, onLoadMore } = options;
    const sentinelRef = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver | null = null;

    function shouldLoad(): boolean {
        return toValue(hasMore) && !toValue(isLoading);
    }

    function handleIntersect(entries: IntersectionObserverEntry[]) {
        for (const entry of entries) {
            if (entry.isIntersecting && shouldLoad()) {
                observer?.unobserve(entry.target);
                onLoadMore();
                break;
            }
        }
    }

    function setupObserver(el: HTMLElement) {
        teardown();
        observer = new IntersectionObserver(handleIntersect, {
            root: options.scrollContainer?.value ?? null,
            rootMargin: `0px 0px ${threshold}px 0px`,
        });
        observer.observe(el);
    }

    function teardown() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    function check() {
        if (sentinelRef.value) setupObserver(sentinelRef.value);
    }

    watch(sentinelRef, (el) => {
        if (el) setupObserver(el);
        else teardown();
    });

    // New content may leave the sentinel visible. Reconnect after Vue commits it;
    // the observer's fresh intersection record remains the sole load authority.
    watch(
        () => toValue(isLoading),
        (loading) => {
            if (!loading && sentinelRef.value) {
                nextTick(() => {
                    if (!toValue(isLoading)) check();
                });
            }
        },
    );

    onScopeDispose(teardown);

    return {
        sentinelRef,
        check,
        stop: teardown,
    };
}
