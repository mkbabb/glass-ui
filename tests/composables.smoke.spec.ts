import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useSortable } from "@glass/components/sortable-list/composables/useSortable";
// AI.W3 R3 — motion composables moved off the root barrel into the /motion
// flat subpath (keyframes.js SCC trap closure). Source tests resolve the
// semantic family homes that now back those public entries directly.
import { useStaggerReveal } from "@glass/composables/motion/core";
import { registerShortcut } from "@glass/composables/keyboard";
import { useInfiniteScroll } from "@glass/components/infinite-scroll";
import {
    buildIndex,
    clearSearchCache,
    fuzzyMatch,
    searchIndex,
} from "@glass/subpaths/search";
import {
    buildTreeIndex,
    isActive,
    isInActiveChain,
    useTreeIndex,
} from "@glass/composables/sidebar";
import { mountComposable } from "./utils/mountComposable";

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
            title: "Root",
            children: [{ id: "child", title: "Child" }],
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
