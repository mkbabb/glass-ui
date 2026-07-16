/**
 * Scroll-to-element with a `nextTick` + rAF-retry settle loop.
 *
 * When a `treeIndex` is provided, `ensureTargetLoaded` loads only up to the
 * target section's root index + buffer (`rootIndex + 2`) instead of
 * force-loading all content — the partial-load. Without a `treeIndex`, it
 * falls back to loading everything (`visibleCount = totalCount`).
 *
 * GENERIC-count-sourced: `totalCount`/`visibleCount` are plain params, NEVER a
 * consumer type (no `WordList`/`PaperSection` coupling). A windowed consumer
 * warms its target BEFORE `scrollTo`; that composition stays at the call site.
 */
import { nextTick, onScopeDispose } from "vue";
import type { ScrollToOptions } from "./types";

export function useScrollTo(options: ScrollToOptions) {
    const { scrollContainer, totalCount, visibleCount } = options;
    const scrollOffset = options.scrollOffset ?? 16;
    const maxAttempts = options.maxAttempts ?? 60;
    const treeIndex = options.treeIndex;

    // The rAF-retry loop is cancelable: a new scrollTo() supersedes the prior
    // loop (one retry at a time), and the loop STOPS when the owning scope is
    // disposed (an unmounted ToC must not keep retrying a stale target — and a
    // unit test that never mounts must not leak frames past teardown).
    let rafHandle: number | null = null;
    function cancel() {
        if (rafHandle !== null) {
            cancelAnimationFrame(rafHandle);
            rafHandle = null;
        }
    }
    onScopeDispose(cancel);

    function ensureTargetLoaded(id: string) {
        if (treeIndex) {
            const entry = treeIndex.get(id);
            if (entry) {
                // Load up to the target's root section + 1 buffer (partial-load).
                const needed = entry.rootIndex + 2;
                visibleCount.value = Math.max(
                    visibleCount.value,
                    Math.min(needed, totalCount),
                );
                return;
            }
        }
        // Fallback: no treeIndex (or unknown id) — load everything.
        visibleCount.value = totalCount;
    }

    function scrollTo(id: string) {
        ensureTargetLoaded(id);
        cancel();

        let attempts = 0;
        let lastY = -1;

        function tryScroll() {
            rafHandle = null;
            const el = document.getElementById(id);
            const scroller = scrollContainer.value;
            if (!el || !scroller) {
                if (attempts++ < maxAttempts)
                    rafHandle = requestAnimationFrame(tryScroll);
                return;
            }

            const scrollerRect = scroller.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const absoluteTop =
                elRect.top - scrollerRect.top + scroller.scrollTop;

            // Settle check: the target stopped moving (lazy-loaded items above
            // it have stabilized) before committing the smooth scroll.
            if (Math.abs(absoluteTop - lastY) < 1 && attempts > 2) {
                scroller.scrollTo({
                    top: Math.max(0, absoluteTop - scrollOffset),
                    behavior: "smooth",
                });
                return;
            }
            lastY = absoluteTop;
            attempts++;
            if (attempts < maxAttempts)
                rafHandle = requestAnimationFrame(tryScroll);
        }
        nextTick(() => {
            rafHandle = requestAnimationFrame(tryScroll);
        });
    }

    return { scrollTo, cancel };
}
