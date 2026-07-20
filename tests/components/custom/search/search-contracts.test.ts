import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildIndex, clearSearchCache, searchIndex } from "@glass/components/search/composables/fuzzySearchIndex";
import { useFuzzySearch } from "@glass/components/search/composables/useFuzzySearch";
import type { SearchableItem } from "@glass/components/search/composables/types";
import { mountComposable } from "../../../utils/mountComposable";

// The `FuzzySearch.vue` overlay component retired at REDUCTION W3 (A14 — demo-only,
// zero constellation consumers). Its highlighting/aria coverage retired with it; the
// fuzzy ENGINE (buildIndex/searchIndex/useFuzzySearch — the dock's live matcher via
// useDockSearch) survives and keeps its coverage below.

function item(id: string, label: string): SearchableItem {
    return {
        id,
        label,
        text: label,
        type: "component",
    };
}

describe("fuzzy search index caching", () => {
    afterEach(() => {
        clearSearchCache();
    });

    it("scopes cached queries to the index instance", () => {
        const first = buildIndex([item("first", "Shared Label")]);
        const second = buildIndex([item("second", "Shared Label")]);

        expect(searchIndex(first, "shared")[0]?.item.id).toBe("first");
        expect(searchIndex(second, "shared")[0]?.item.id).toBe("second");
    });

    it("does not reuse a truncated maxResults cache entry", () => {
        const index = buildIndex([
            item("first", "Alpha One"),
            item("second", "Alpha Two"),
        ]);

        expect(searchIndex(index, "alpha", 1)).toHaveLength(1);
        expect(searchIndex(index, "alpha", 2)).toHaveLength(2);
    });
});

describe("useFuzzySearch debounce cleanup", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        clearSearchCache();
    });

    it("clears pending debounce timers when the owning scope is disposed", async () => {
        vi.useFakeTimers();
        const mounted = mountComposable(() =>
            useFuzzySearch({
                items: [item("alpha", "Alpha Result")],
                debounceMs: 100,
            }),
        );
        // The Vue app-mount schedules one env-init timer under fake timers; drop it
        // so the assertion measures exactly the debounce timer, order-independent.
        vi.clearAllTimers();
        let disposed = false;

        try {
            mounted.result.query.value = "alpha";
            await nextTick();

            expect(vi.getTimerCount()).toBe(1);
            mounted.unmount();
            disposed = true;
            expect(vi.getTimerCount()).toBe(0);
        } finally {
            if (!disposed) mounted.unmount();
        }
    });

    it("cancels pending debounce work and refreshes against changed sources", async () => {
        vi.useFakeTimers();
        const items = ref<SearchableItem[]>([item("old", "Beta Result")]);
        const mounted = mountComposable(() =>
            useFuzzySearch({
                items: () => items.value,
                debounceMs: 100,
            }),
        );
        // Drop the one env-init timer the app-mount schedules under fake timers.
        vi.clearAllTimers();

        try {
            mounted.result.query.value = "alpha";
            await nextTick();
            expect(vi.getTimerCount()).toBe(1);

            items.value = [item("new", "Alpha Result")];
            await nextTick();

            expect(vi.getTimerCount()).toBe(0);
            expect(mounted.result.results.value[0]?.item.id).toBe("new");
        } finally {
            mounted.unmount();
        }
    });
});
