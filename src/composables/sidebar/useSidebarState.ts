/**
 * Manages sidebar section expand/collapse state with user overrides.
 * Combines tree indexing, scroll tracking, and manual toggle tracking
 * into a unified SidebarState.
 *
 * Generic over `T extends TreeNode` — consumers whose trees store children
 * under a property other than `children` (e.g. `subsections`) supply a
 * `getChildren` callback that is forwarded into the inner `useTreeIndex`.
 * This matches the generic shape of `useTreeIndex` / `useScrollTracker`
 * and lets sibling consumers (paper-style TOCs, file-trees, doc indices)
 * adopt the composable without coercing their domain types into
 * `SidebarSection`.
 */
import { reactive, computed, toValue } from "vue";
import type { Ref, MaybeRefOrGetter, ComputedRef } from "vue";
import type { TreeNode, TreeIndexEntry, SidebarSection, SidebarState } from "./types";
import { useTreeIndex } from "./useTreeIndex";

export interface UseSidebarStateOptions<T extends TreeNode = SidebarSection> {
    sections: T[];
    /**
     * Currently active leaf section id. Accepts a `Ref`, a getter, or a raw
     * value — `toValue` is applied internally so cross-package Vue version
     * skew doesn't impose a `Ref` symbol-identity check at the call site.
     */
    activeId: MaybeRefOrGetter<string | null>;
    /** Currently active root-level section id. Same `MaybeRefOrGetter` shape. */
    activeRootId: MaybeRefOrGetter<string | null>;
    scrollTo: (id: string) => void;
    scrollToTop: () => void;
    /**
     * Optional accessor for child nodes. Defaults to `node.children`.
     * Pass when your tree stores children under a different property
     * (e.g. `subsections`) — symmetric with `useTreeIndex` / `useScrollTracker`.
     */
    getChildren?: (node: T) => T[] | undefined;
}

/**
 * Generic return shape — when called with a custom `T`, `treeIndex` is keyed
 * to `TreeIndexEntry<T>` rather than the canonical `SidebarIndexEntry`.
 */
export interface GenericSidebarState<T extends TreeNode> {
    sections: T[];
    activeId: Ref<string | null>;
    activeRootId: ComputedRef<string | null>;
    treeIndex: Map<string, TreeIndexEntry<T>>;
    isExpanded(id: string): boolean;
    toggleSection(id: string): void;
    navigateTo(id: string): void;
    scrollToTop(): void;
    isActive(id: string): boolean;
    isInActiveChain(id: string): boolean;
}

export function useSidebarState(options: UseSidebarStateOptions<SidebarSection>): SidebarState;
export function useSidebarState<T extends TreeNode>(
    options: UseSidebarStateOptions<T>,
): GenericSidebarState<T>;
export function useSidebarState<T extends TreeNode>(
    options: UseSidebarStateOptions<T>,
): GenericSidebarState<T> {
    const {
        index: treeIndex,
        isActive: checkActive,
        isInActiveChain: checkChain,
    } = useTreeIndex<T>(options.sections, { getChildren: options.getChildren });

    // Tracks user overrides for section expand/collapse state
    const userExpanded = reactive(new Set<string>());
    const userCollapsed = reactive(new Set<string>());

    function isExpanded(sectionId: string): boolean {
        if (userCollapsed.has(sectionId)) return false;
        if (userExpanded.has(sectionId)) return true;
        return toValue(options.activeRootId) === sectionId;
    }

    function toggleSection(sectionId: string) {
        if (isExpanded(sectionId)) {
            userExpanded.delete(sectionId);
            userCollapsed.add(sectionId);
        } else {
            userCollapsed.delete(sectionId);
            userExpanded.add(sectionId);
        }
    }

    function navigateTo(id: string) {
        options.scrollTo(id);
    }

    function isActive(id: string): boolean {
        return checkActive(id, toValue(options.activeId));
    }

    function isInActiveChain(id: string): boolean {
        return checkChain(id, toValue(options.activeId));
    }

    const activeIdRef = computed(() => toValue(options.activeId));
    const activeRootId = computed(() => toValue(options.activeRootId));

    return {
        sections: options.sections,
        activeId: activeIdRef as unknown as Ref<string | null>,
        activeRootId,
        treeIndex,
        isExpanded,
        toggleSection,
        navigateTo,
        scrollToTop: options.scrollToTop,
        isActive,
        isInActiveChain,
    };
}
