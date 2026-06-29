import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestIntersectionObserver } from "../../setup";
import { useLazyLoader } from "@glass/composables/sidebar/useLazyLoader";
import { mountComposable } from "../../utils/mountComposable";

describe("useLazyLoader (the progressive batch-render count)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("starts at the batch size (clamped to totalCount)", () => {
        const { result, unmount } = mountComposable(() =>
            useLazyLoader(10, { batchSize: 3 }),
        );
        expect(result.visibleCount.value).toBe(3);
        unmount();
    });

    it("grows visibleCount by batchSize on each sentinel intersection", async () => {
        const { result, unmount } = mountComposable(() =>
            useLazyLoader(10, { batchSize: 2 }),
        );
        const sentinel = document.createElement("div");
        result.loadSentinel.value = sentinel;
        await nextTick();

        const observer = TestIntersectionObserver.instances.at(-1)!;
        expect(result.visibleCount.value).toBe(2);

        observer.trigger(sentinel, true);
        expect(result.visibleCount.value).toBe(4);

        observer.trigger(sentinel, true);
        expect(result.visibleCount.value).toBe(6);

        unmount();
    });

    it("never overshoots totalCount", async () => {
        const { result, unmount } = mountComposable(() =>
            useLazyLoader(5, { batchSize: 2 }),
        );
        const sentinel = document.createElement("div");
        result.loadSentinel.value = sentinel;
        await nextTick();

        const observer = TestIntersectionObserver.instances.at(-1)!;
        observer.trigger(sentinel, true); // 2 -> 4
        observer.trigger(sentinel, true); // 4 -> 5 (clamped, not 6)
        expect(result.visibleCount.value).toBe(5);

        observer.trigger(sentinel, true); // already at total — no growth
        expect(result.visibleCount.value).toBe(5);

        unmount();
    });

    it("the fast-drag scroll fallback grows the count when the sentinel is above the viewport bottom", async () => {
        const { result, unmount } = mountComposable(() =>
            useLazyLoader(10, { batchSize: 2 }),
        );
        const sentinel = document.createElement("div");
        // Sentinel rect top above the viewport bottom (user scrolled past it).
        sentinel.getBoundingClientRect = () =>
            ({ top: 100, bottom: 110 }) as DOMRect;
        result.loadSentinel.value = sentinel;
        await nextTick();

        // window.innerHeight defaults large in happy-dom; force a small bottom.
        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: 800,
        });

        document.dispatchEvent(new Event("scroll"));
        // rAF in the harness is setTimeout(0); flush it.
        await new Promise((r) => setTimeout(r, 5));
        expect(result.visibleCount.value).toBe(4);

        unmount();
    });
});
