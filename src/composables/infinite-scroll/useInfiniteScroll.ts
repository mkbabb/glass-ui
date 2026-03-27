import { ref, watch, onScopeDispose, toValue, type MaybeRefOrGetter } from "vue";
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
    const error = ref<string | null>(null);
    let observer: IntersectionObserver | null = null;

    function shouldLoad(): boolean {
        return toValue(hasMore) && !toValue(isLoading);
    }

    function handleIntersect(entries: IntersectionObserverEntry[]) {
        for (const entry of entries) {
            if (entry.isIntersecting && shouldLoad()) {
                error.value = null;
                try {
                    const result = onLoadMore();
                    // Handle async onLoadMore callbacks
                    if (result && typeof (result as any).catch === "function") {
                        (result as Promise<unknown>).catch((e: unknown) => {
                            error.value =
                                e instanceof Error ? e.message : "Failed to load more";
                        });
                    }
                } catch (e) {
                    error.value =
                        e instanceof Error ? e.message : "Failed to load more";
                }
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
        error.value = null;
    }

    function check() {
        if (sentinelRef.value && shouldLoad()) {
            error.value = null;
            try {
                const result = onLoadMore();
                if (result && typeof (result as any).catch === "function") {
                    (result as Promise<unknown>).catch((e: unknown) => {
                        error.value =
                            e instanceof Error ? e.message : "Failed to load more";
                    });
                }
            } catch (e) {
                error.value =
                    e instanceof Error ? e.message : "Failed to load more";
            }
        }
    }

    watch(sentinelRef, (el) => {
        if (el) setupObserver(el);
        else teardown();
    });

    // Re-check when loading finishes (new content may be short enough to need another load)
    watch(
        () => toValue(isLoading),
        (loading) => {
            if (!loading && sentinelRef.value) {
                // Defer to next tick so DOM updates first
                requestAnimationFrame(check);
            }
        },
    );

    onScopeDispose(teardown);

    return {
        sentinelRef,
        error,
        check,
        stop: teardown,
    };
}
