import type { Ref, ComputedRef } from "vue";

/** Minimal interface for tree-structured content with scroll targets. */
export interface TreeNode {
    id: string;
    children?: TreeNode[];
}

/** Generic flat index entry for a tree node. */
export interface TreeIndexEntry<T extends TreeNode = TreeNode> {
    node: T;
    depth: number;
    /** ID of the root-level ancestor (self.id when depth === 0). */
    rootId: string;
    /** Direct parent ID (self.id for root nodes). */
    parentId: string | null;
    /** Index within root-level nodes. */
    rootIndex: number;
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
