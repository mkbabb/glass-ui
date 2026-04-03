import type { Ref, MaybeRefOrGetter } from "vue";

export interface InfiniteScrollOptions {
    /** The scrollable container element. Defaults to window if not provided. */
    scrollContainer?: Ref<HTMLElement | null>;
    /** Distance in pixels from the bottom to trigger loading (default: 200) */
    threshold?: number;
    /** Whether more data is available */
    hasMore: MaybeRefOrGetter<boolean>;
    /** Whether data is currently loading */
    isLoading: MaybeRefOrGetter<boolean>;
    /** Callback invoked when the sentinel enters the viewport */
    onLoadMore: () => void | Promise<void>;
}

export interface InfiniteScrollReturn {
    /** Ref to bind to the sentinel element */
    sentinelRef: Ref<HTMLElement | null>;
    /** Error message from the last failed load, or null */
    error: Ref<string | null>;
    /** Manually trigger a check (e.g., after DOM updates) */
    check: () => void;
    /** Stop observing and reset error state */
    stop: () => void;
}
