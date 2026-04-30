import { describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import {
    buildIndex,
    buildSectionLayout,
    buildTreeIndex,
    clearSearchCache,
    createGlassFilter,
    destroyGlassFilter,
    findSectionOffset,
    fuzzyMatch,
    isActive,
    isInActiveChain,
    registerShortcut,
    resolveActiveSection,
    resolveSectionWindow,
    searchIndex,
    useGlassRenderer,
    useInfiniteScroll,
    useOffsetPagination,
    useSortable,
    useStaggerReveal,
    useTreeIndex,
    useWindowedStore,
} from "@/index";
import { mountComposable } from "./utils/mountComposable";

const sections = [
    {
        id: "a",
        index: 0,
        depth: 0,
        parentId: null,
        rootId: "a",
        rootIndex: 0,
        estimatedHeight: 10,
    },
    {
        id: "b",
        index: 1,
        depth: 0,
        parentId: null,
        rootId: "b",
        rootIndex: 1,
        estimatedHeight: 20,
    },
    {
        id: "c",
        index: 2,
        depth: 0,
        parentId: null,
        rootId: "c",
        rootIndex: 2,
        estimatedHeight: 30,
    },
];

describe("virtual section layout helpers", () => {
    it("builds cumulative section positions", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        expect(layout.totalHeight).toBe(60);
        expect(layout.entries.map((entry) => entry.top)).toEqual([0, 10, 30]);
    });

    it("clamps section heights to at least one pixel", () => {
        const layout = buildSectionLayout(sections, () => 0);
        expect(layout.totalHeight).toBe(3);
        expect(layout.entries.every((entry) => entry.height === 1)).toBe(true);
    });

    it("resolves visible section windows", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        expect(resolveSectionWindow(layout, 12, 10, 0, 0)).toMatchObject({
            startIndex: 1,
            endIndex: 1,
            topSpacerPx: 10,
        });
    });

    it("includes forced section window ranges", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        const range = resolveSectionWindow(layout, 0, 5, 0, 0, {
            startIndex: 0,
            endIndex: 2,
        });
        expect(range.startIndex).toBe(0);
        expect(range.endIndex).toBe(2);
    });

    it("returns an empty range for empty layouts", () => {
        expect(resolveSectionWindow({ entries: [], totalHeight: 0 }, 0, 10, 0, 0)).toEqual({
            startIndex: 0,
            endIndex: -1,
            topSpacerPx: 0,
            bottomSpacerPx: 0,
        });
    });

    it("resolves active sections from offsets", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        expect(resolveActiveSection(layout, 35)?.id).toBe("c");
    });

    it("returns null active section for empty layouts", () => {
        expect(resolveActiveSection({ entries: [], totalHeight: 0 }, 10)).toBeNull();
    });

    it("finds section offsets by id", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        expect(findSectionOffset(layout, "c")).toBe(30);
    });

    it("returns null for missing section offsets", () => {
        const layout = buildSectionLayout(sections, (item) => item.estimatedHeight);
        expect(findSectionOffset(layout, "missing")).toBeNull();
    });
});

describe("windowed store", () => {
    it("sets and replaces resident items", () => {
        const store = useWindowedStore<number>({ maxResident: 3 });
        store.set([1, 2]);
        expect(store.items.value).toEqual([1, 2]);
        expect(store.generation.value).toBe(1);
    });

    it("appends with front eviction", () => {
        const store = useWindowedStore<number>({ maxResident: 3 });
        store.set([1, 2, 3]);
        store.set([4, 5], false);
        expect(store.items.value).toEqual([3, 4, 5]);
        expect(store.windowStart.value).toBe(2);
    });

    it("rejects stale generation appends", () => {
        const store = useWindowedStore<number>({ maxResident: 3 });
        store.set([1]);
        const accepted = store.appendIfCurrent([2], store.generation.value + 1);
        expect(accepted).toBe(false);
        expect(store.items.value).toEqual([1]);
    });

    it("prepends and trims from the end", () => {
        const store = useWindowedStore<number>({ maxResident: 3 });
        store.set([3, 4]);
        store.prepend([1, 2], 0);
        expect(store.items.value).toEqual([1, 2, 3]);
        expect(store.windowStart.value).toBe(0);
    });

    it("clears resident items and increments generation", () => {
        const store = useWindowedStore<number>();
        store.set([1, 2]);
        store.clear();
        expect(store.items.value).toEqual([]);
        expect(store.generation.value).toBe(2);
    });
});

describe("offset pagination", () => {
    it("loads the requested page", async () => {
        const pager = useOffsetPagination({
            pageSize: 2,
            fetchFn: async (limit, offset) => ({
                data: [offset, offset + limit],
                total: 8,
            }),
        });
        await pager.loadPage();
        await pager.loadPage(2);
        expect(pager.items.value).toEqual([2, 4]);
        expect(pager.page.value).toBe(2);
    });

    it("advances to next pages after total is known", async () => {
        const pager = useOffsetPagination({
            pageSize: 2,
            fetchFn: async (_limit, offset) => ({ data: [offset], total: 6 }),
        });
        await pager.loadPage();
        pager.nextPage();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(pager.page.value).toBe(2);
    });

    it("stores load errors", async () => {
        const pager = useOffsetPagination({
            fetchFn: async () => {
                throw new Error("boom");
            },
        });
        await pager.loadPage();
        expect(pager.error.value).toBe("boom");
        expect(pager.loading.value).toBe(false);
    });

    it("resets pagination state", () => {
        const pager = useOffsetPagination({ fetchFn: async () => ({ data: [1], total: 1 }) });
        pager.items.value = [1];
        pager.total.value = 1;
        pager.reset();
        expect(pager.items.value).toEqual([]);
        expect(pager.total.value).toBe(0);
    });
});

describe("search helpers", () => {
    const items = [
        { id: "dock", label: "Glass Dock", text: "Navigation launcher", type: "component" },
        { id: "search", label: "Fuzzy Search", text: "Indexed command palette", type: "data" },
    ];

    it("matches fuzzy subsequences", () => {
        expect(fuzzyMatch("gd", "glass dock")?.matches).toEqual([0, 6]);
    });

    it("returns null for missing fuzzy matches", () => {
        expect(fuzzyMatch("zz", "Glass Dock")).toBeNull();
    });

    it("builds a searchable index", () => {
        expect(buildIndex(items)).toHaveLength(2);
    });

    it("searches indexed labels", () => {
        clearSearchCache();
        expect(searchIndex(buildIndex(items), "fuzzy")[0]?.item.id).toBe("search");
    });

    it("clears empty-query results", () => {
        clearSearchCache();
        expect(searchIndex(buildIndex(items), "")).toEqual([]);
    });
});

describe("sortable composable", () => {
    it("returns stable row bindings", () => {
        const items = ref([{ id: "a" }]);
        const mounted = mountComposable(() =>
            useSortable({
                items,
                getId: (item) => item.id,
                onReorder: vi.fn(),
            }),
        );
        expect(mounted.result.registerItem("a")).toBe(mounted.result.registerItem("a"));
        mounted.unmount();
    });

    it("adds data attributes to row bindings", () => {
        const items = ref([{ id: "a" }]);
        const mounted = mountComposable(() =>
            useSortable({
                items,
                getId: (item) => item.id,
                onReorder: vi.fn(),
            }),
        );
        expect(mounted.result.registerItem("a").dataAttrs["data-sortable-id"]).toBe("a");
        mounted.unmount();
    });

    it("exposes a container binding", () => {
        const items = ref([{ id: "a" }]);
        const mounted = mountComposable(() =>
            useSortable({
                items,
                getId: (item) => item.id,
                onReorder: vi.fn(),
                group: "g",
            }),
        );
        expect(mounted.result.container.dataAttrs["data-sortable-container"]).toBe("g");
        mounted.unmount();
    });

    it("starts with no active drag state", () => {
        const items = ref([{ id: "a" }]);
        const mounted = mountComposable(() =>
            useSortable({
                items,
                getId: (item) => item.id,
                onReorder: vi.fn(),
            }),
        );
        expect(mounted.result.isDragging.value).toBe(false);
        expect(mounted.result.dragId.value).toBeNull();
        mounted.unmount();
    });
});

describe("sidebar tree helpers", () => {
    const tree = [
        {
            id: "root",
            label: "Root",
            children: [{ id: "child", label: "Child" }],
        },
    ];

    it("builds a tree index", () => {
        expect(useTreeIndex(tree).index.has("child")).toBe(true);
    });

    it("detects active nodes", () => {
        expect(isActive("child", "child")).toBe(true);
    });

    it("detects active chains", () => {
        const index = buildTreeIndex(tree);
        expect(isInActiveChain("root", "child", index, tree)).toBe(true);
    });

    it("detects descendants", () => {
        expect(useTreeIndex(tree).isDescendant("child", "root")).toBe(true);
    });
});

describe("browser-backed composables", () => {
    it("uses the preferred glass renderer tier", () => {
        const mounted = mountComposable(() => useGlassRenderer({ preferredTier: "fallback" }));
        expect(mounted.result.tier.value).toBe("fallback");
        mounted.unmount();
    });

    it("creates and destroys glass filter DOM", () => {
        const el = document.createElement("div");
        Object.defineProperty(el, "getBoundingClientRect", {
            value: () => ({ width: 100, height: 80, top: 0, left: 0, bottom: 80, right: 100 }),
        });
        document.body.appendChild(el);
        const state = createGlassFilter(el);
        expect(document.body.contains(state.svgEl)).toBe(true);
        destroyGlassFilter(state);
        expect(document.body.contains(state.svgEl)).toBe(false);
    });

    it("checks infinite-scroll loading manually", () => {
        const onLoadMore = vi.fn();
        const mounted = mountComposable(() =>
            useInfiniteScroll({
                hasMore: true,
                isLoading: false,
                onLoadMore,
            }),
        );
        mounted.result.sentinelRef.value = document.createElement("div");
        mounted.result.check();
        expect(onLoadMore).toHaveBeenCalledTimes(1);
        mounted.unmount();
    });

    it("does not load infinite-scroll while loading", () => {
        const onLoadMore = vi.fn();
        const mounted = mountComposable(() =>
            useInfiniteScroll({
                hasMore: true,
                isLoading: true,
                onLoadMore,
            }),
        );
        mounted.result.sentinelRef.value = document.createElement("div");
        mounted.result.check();
        expect(onLoadMore).not.toHaveBeenCalled();
        mounted.unmount();
    });

    it("registers stagger reveal targets", () => {
        const mounted = mountComposable(() => useStaggerReveal({ staggerMs: 0 }));
        const el = document.createElement("div");
        mounted.result.register(el, 2);
        expect(mounted.result.targets.value).toContain(el);
        expect(mounted.result.revealed[2]).toBe(false);
        mounted.unmount();
    });

    it("registers keyboard shortcuts", () => {
        const handler = vi.fn();
        const mounted = mountComposable(() => registerShortcut("Mod+K", handler));
        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "k",
                metaKey: navigator.platform.includes("Mac"),
                ctrlKey: !navigator.platform.includes("Mac"),
            }),
        );
        expect(handler).toHaveBeenCalledTimes(1);
        mounted.result();
        mounted.unmount();
    });
});
