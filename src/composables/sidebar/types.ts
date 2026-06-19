import type { Ref, ComputedRef } from "vue";

/** Minimal interface for tree-structured content with scroll targets. */
export interface TreeNode {
    id: string;
    children?: TreeNode[];
}

/**
 * The flat-hierarchy fields shared by every flattened tree row. Both the
 * sidebar's `TreeIndexEntry` and the virtual-windowing `FlatSection`
 * (`composables/virtual`) extend this — the four fields are declared ONCE,
 * not redeclared independently (BC.W-VIRTUAL-WINDOW type-reconcile).
 */
export interface SectionHierarchy {
    depth: number;
    /** ID of the root-level ancestor (self.id when depth === 0). */
    rootId: string;
    /** Direct parent ID (self.id for root nodes). */
    parentId: string | null;
    /** Index within root-level nodes. */
    rootIndex: number;
}

/** Generic flat index entry for a tree node. */
export interface TreeIndexEntry<T extends TreeNode = TreeNode>
    extends SectionHierarchy {
    node: T;
}

/** A section in the sidebar tree. */
export interface SidebarSection extends TreeNode {
    title: string;
    children?: SidebarSection[];
    level?: number;
}

/** Flat index entry for a sidebar section. */
export type SidebarIndexEntry = TreeIndexEntry<SidebarSection>;

/** Options for scroll tracking. */
export interface ScrollTrackerOptions {
    /** IntersectionObserver rootMargin. Default: "-20% 0px -60% 0px" */
    rootMargin?: string;
    threshold?: number;
}

/**
 * Options for `useScrollTo` — the rAF-retry scroll-to-id + treeIndex-aware
 * partial-load (the ToC-click → virtual-window warm bridge).
 *
 * GENERIC-count-sourced: `totalCount`/`visibleCount` are plain params, NEVER a
 * consumer type. When a `treeIndex` is passed, `ensureTargetLoaded` loads only
 * up to the target section's `rootIndex + 2` (the partial-load) instead of
 * force-loading everything.
 */
export interface ScrollToOptions {
    /** The scroll container element to scroll within. */
    scrollContainer: Ref<HTMLElement | null>;
    /** Total number of items/sections (the generic count ceiling). */
    totalCount: number;
    /** The progressively-rendered count this leaf writes the partial-load into. */
    visibleCount: Ref<number>;
    /** Pixel offset from the container top. Default: 16 */
    scrollOffset?: number;
    /** Max rAF retry attempts before bailing. Default: 60 */
    maxAttempts?: number;
    /**
     * Tree index for resolving a target id to its root section index. When
     * provided, `scrollTo` loads only up to the target's root section + buffer
     * (`rootIndex + 2`) instead of all content. Shares the same `TreeIndexEntry`
     * the windowing `FlatSection` hierarchy fields reconcile with.
     */
    treeIndex?: Map<string, TreeIndexEntry>;
}

/**
 * Options for `useClickDelegate` — the ONE delegated `[data-scroll-target]`
 * click→scroll handler for an entire ToC (not N per-link listeners).
 */
export interface ClickDelegateOptions {
    /** Container element to attach the single delegated listener to. */
    container: Ref<HTMLElement | null>;
    /** CSS selector for clickable elements. Default: "[data-scroll-target]" */
    selector?: string;
    /** Attribute to read the target id from. Default: "data-scroll-target" */
    attribute?: string;
    /** Maps the attribute value to a scroll-target id. Return null to skip. */
    resolve: (value: string) => string | null;
    /** Called with the resolved id (typically `useScrollTo`'s `scrollTo`). */
    scrollTo: (id: string) => void;
}

/**
 * Options for `useLazyLoader` — the progressive batch-render count. Distinct
 * from `useInfiniteScroll` (which fires a data-fetch `onLoadMore` trigger):
 * the lazy-loader grows a RENDER-MOUNT count over an already-loaded list.
 */
export interface LazyLoaderOptions {
    /** Sections rendered per batch. Default: 2 */
    batchSize?: number;
    /** IntersectionObserver rootMargin for the bottom sentinel. Default: "0px 0px 600px 0px" */
    rootMargin?: string;
    /** Scroll container for the fast-drag scroll fallback. Falls back to document. */
    scrollContainer?: Ref<HTMLElement | null>;
}

/** Reactive state returned by `useSidebarState`. */
export interface SidebarState {
    sections: SidebarSection[];
    activeId: Ref<string | null>;
    activeRootId: ComputedRef<string | null>;
    treeIndex: Map<string, SidebarIndexEntry>;
    isExpanded(id: string): boolean;
    toggleSection(id: string): void;
    navigateTo(id: string): void;
    scrollToTop(): void;
    isActive(id: string): boolean;
    isInActiveChain(id: string): boolean;
}
