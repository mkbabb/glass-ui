import { flushPromises, mount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import FuzzySearch from "@glass/components/search/FuzzySearch.vue";
import { buildIndex, clearSearchCache, searchIndex } from "@glass/components/search/composables/fuzzySearchIndex";
import { useFuzzySearch } from "@glass/components/search/composables/useFuzzySearch";
import type { FuzzySearchState, SearchableItem, SearchResult } from "@glass/components/search/composables/types";
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
            matchIndices: [1, 2, 3],
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
        // Match emphasis is ordinary escaped text markup: `img` paints, while
        // the hostile angle-bracket text remains inert.
        expect(label.find("mark").text()).toBe("img");
        expect(label.element.children.length).toBe(1);

        wrapper.unmount();
    });

    it("slices match offsets on the matcher UTF-16 index model", async () => {
        const result = searchIndex(buildIndex([item("astral", "🧪 Alpha")]), "🧪")[0]!;
        const state: FuzzySearchState = {
            query: ref("🧪"),
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

        const wrapper = mount(FuzzySearch, { props: { state }, attachTo: document.body });
        await flushPromises();

        const label = wrapper.find(".fuzzy-search-label");
        expect(label.text()).toBe("🧪 Alpha");
        expect(label.find("mark").text()).toBe("🧪");
        wrapper.unmount();
    });

    it("connects each combobox to its active listbox option", async () => {
        const results = ref<SearchResult[]>([]);
        const selectedIndex = ref(0);
        const isOpen = ref(true);
        const isExpanded = ref(false);
        const state: FuzzySearchState = {
            query: ref("alpha"),
            results: computed(() => results.value),
            selectedIndex,
            isOpen,
            isExpanded,
            onKeydown: vi.fn(),
            selectResult: vi.fn(),
            toggleExpanded: () => { isExpanded.value = !isExpanded.value; },
            close: vi.fn(),
            open: vi.fn(),
        };
        const wrapper = mount(FuzzySearch, {
            props: { state, ariaLabel: "Find components" },
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });

        await flushPromises();
        const inlineInput = wrapper.find('input[role="combobox"]');
        expect(inlineInput.attributes("aria-activedescendant")).toBeUndefined();
        expect(inlineInput.attributes("aria-controls")).toBeUndefined();

        results.value = [{ item: item("alpha", "Alpha"), score: 1, matchIndices: [] }];
        await flushPromises();
        const inlineList = wrapper.find('[role="listbox"]');
        const inlineOption = inlineList.find('[role="option"]');
        expect(inlineInput.attributes("aria-controls")).toBe(inlineList.attributes("id"));
        expect(inlineInput.attributes("aria-activedescendant")).toBe(inlineOption.attributes("id"));
        expect(inlineOption.attributes("aria-selected")).toBe("true");

        isExpanded.value = true;
        await flushPromises();
        const modalInput = document.querySelector<HTMLElement>('[role="dialog"] input[role="combobox"]')!;
        const modalList = document.querySelector<HTMLElement>('[role="dialog"] [role="listbox"]')!;
        expect(modalInput.getAttribute("aria-controls")).toBe(modalList.id);
        expect(modalInput.getAttribute("aria-activedescendant")).toBe(
            modalList.querySelector<HTMLElement>('[role="option"]')!.id,
        );

        wrapper.unmount();
    });

    it("announces settled result counts politely without reacting to navigation", async () => {
        const query = ref("alpha");
        const results = ref<SearchResult[]>([
            { item: item("alpha", "Alpha"), score: 1, matchIndices: [] },
        ]);
        const selectedIndex = ref(0);
        const state: FuzzySearchState = {
            query,
            results: computed(() => results.value),
            selectedIndex,
            isOpen: ref(true),
            isExpanded: ref(false),
            onKeydown: vi.fn(),
            selectResult: vi.fn(),
            toggleExpanded: vi.fn(),
            close: vi.fn(),
            open: vi.fn(),
        };
        const wrapper = mount(FuzzySearch, { props: { state } });
        const status = wrapper.get('[role="status"]');

        expect(status.attributes()).toMatchObject({
            "aria-live": "polite",
            "aria-atomic": "true",
        });
        expect(status.text()).toBe("1 result for “alpha”");

        query.value = "beta";
        await nextTick();
        expect(status.text()).toBe("1 result for “beta”");

        selectedIndex.value = 1;
        await nextTick();
        expect(status.text()).toBe("1 result for “beta”");

        results.value = [
            { item: item("beta-1", "Beta one"), score: 1, matchIndices: [] },
            { item: item("beta-2", "Beta two"), score: 2, matchIndices: [] },
        ];
        await nextTick();
        expect(status.text()).toBe("2 results for “beta”");

        selectedIndex.value = 0;
        await nextTick();
        expect(status.text()).toBe("2 results for “beta”");

        results.value = [];
        await nextTick();
        expect(status.text()).toBe("No results for “beta”");
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
