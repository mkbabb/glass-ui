import { flushPromises, mount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import FuzzySearch from "@glass/components/custom/search/FuzzySearch.vue";
import { buildIndex, clearSearchCache, searchIndex } from "@glass/components/custom/search/composables/fuzzySearchIndex";
import { useFuzzySearch } from "@glass/components/custom/search/composables/useFuzzySearch";
import type { FuzzySearchState, SearchableItem, SearchResult } from "@glass/components/custom/search/composables/types";
import { mountComposable } from "../../../utils/mountComposable";

function item(id: string, label: string): SearchableItem {
    return {
        id,
        label,
        text: label,
        type: "component",
    };
}

describe("FuzzySearch highlighting", () => {
    it("renders the full label as plain text without interpreting item HTML", async () => {
        const malicious = item("malicious", '<img src=x onerror="alert(1)">Alpha');
        const result: SearchResult = {
            item: malicious,
            score: 1,
            matchIndices: [],
        };
        const state: FuzzySearchState = {
            query: ref("img"),
            results: computed(() => [result]),
            selectedIndex: ref(0),
            isOpen: ref(true),
            isExpanded: ref(false),
            onKeydown: vi.fn(),
            selectResult: vi.fn(),
            toggleExpanded: vi.fn(),
            close: vi.fn(),
            open: vi.fn(),
        };

        // FuzzySearch composes <Popover>; the inline result list renders within
        // the wrapper subtree (portal={false}), so wrapper.find() resolves it.
        const wrapper = mount(FuzzySearch, { props: { state }, attachTo: document.body });
        await flushPromises();
        await nextTick();

        const label = wrapper.find(".fuzzy-search-label");
        expect(label.exists()).toBe(true);
        // The full label is interpolated as text — the malicious markup never
        // becomes a DOM node.
        expect(label.text()).toContain('<img src=x onerror="alert(1)">Alpha');
        expect(label.element.querySelector("img")).toBeNull();
        // Match emphasis rides the CSS Custom Highlight API, not a <mark>
        // splitter — the label carries no element children. (In this env
        // CSS.highlights is absent, so the highlight no-ops; the text still
        // renders intact, which is the graceful fallback.)
        expect(label.find("mark").exists()).toBe(false);
        expect(label.element.children.length).toBe(0);

        wrapper.unmount();
    });
});

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
