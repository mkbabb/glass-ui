import type { Ref, ComputedRef } from "vue";

/** A section in the sidebar tree. */
export interface SidebarSection {
    id: string;
    title: string;
    children?: SidebarSection[];
    level?: number;
}

/** Flat index entry for a sidebar section. */
export interface SidebarIndexEntry {
    node: SidebarSection;
    depth: number;
    /** ID of the root-level ancestor (self.id when depth === 0). */
    rootId: string;
    /** Direct parent ID (self.id for root nodes). */
    parentId: string | null;
    /** Index within root-level sections. */
    rootIndex: number;
}

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
