import type { TreeNode, TreeIndexEntry, SidebarSection, SidebarIndexEntry } from "../types";

// ---------------------------------------------------------------------------
// Generic composable — builds index + provides helpers with `getChildren` support
// ---------------------------------------------------------------------------

/**
 * Builds a flat index of all nodes in a tree for O(1) lookup with hierarchy
 * metadata.  Returns the index plus `isActive`, `isInActiveChain`, and
 * `isDescendant` helpers that close over the index.
 *
 * Accepts an optional `getChildren` callback so callers with custom tree
 * shapes (e.g. nodes whose children live under a different property name)
 * don't need to conform to `TreeNode.children`.
 */
export function useTreeIndex<T extends TreeNode>(
    roots: T[],
    options?: { getChildren?: (node: T) => T[] | undefined },
) {
    const getChildren =
        options?.getChildren ?? ((n: T) => n.children as T[] | undefined);
    const index = new Map<string, TreeIndexEntry<T>>();

    function walk(
        list: T[],
        depth: number,
        parentId: string | null,
        rootId: string,
        rootIndex: number,
    ) {
        for (const node of list) {
            const ri = depth === 0 ? roots.indexOf(node) : rootIndex;
            const rid = depth === 0 ? node.id : rootId;
            index.set(node.id, {
                node,
                depth,
                rootId: rid,
                parentId: depth === 0 ? node.id : parentId,
                rootIndex: ri,
            });
            const children = getChildren(node);
            if (children) {
                walk(
                    children,
                    depth + 1,
                    depth === 0 ? node.id : parentId,
                    rid,
                    ri,
                );
            }
        }
    }
    walk(roots, 0, null, "", 0);

    /** Check if `id` is the active node. */
    function isActive(id: string, activeId: string | null): boolean {
        return id === activeId;
    }

    /** Check if `id` is an ancestor of or equal to `activeId`. */
    function isInActiveChain(id: string, activeId: string | null): boolean {
        if (!activeId) return false;
        const entry = index.get(activeId);
        if (!entry) return false;
        if (id === activeId) return true;
        if (id === entry.parentId) return true;
        const target = index.get(id);
        if (!target) return false;
        return isDescendant(activeId, id);
    }

    /** Check if `childId` is a descendant of `ancestorId`. */
    function isDescendant(childId: string, ancestorId: string): boolean {
        const ancestor = index.get(ancestorId);
        if (!ancestor) return false;
        const children = getChildren(ancestor.node);
        if (!children) return false;
        for (const child of children) {
            if (child.id === childId) return true;
            if (isDescendant(childId, child.id)) return true;
        }
        return false;
    }

    return { index, isActive, isInActiveChain, isDescendant };
}

// ---------------------------------------------------------------------------
// Legacy pure-function API — delegates to useTreeIndex under the hood
// ---------------------------------------------------------------------------

/**
 * Builds a flat index of all nodes in a sidebar tree for O(1) lookup
 * with hierarchy metadata.  Pure function, no Vue reactivity.
 *
 * @deprecated Prefer `useTreeIndex` which also returns helper functions.
 */
export function buildTreeIndex(roots: SidebarSection[]): Map<string, SidebarIndexEntry> {
    return useTreeIndex(roots).index;
}

/**
 * Check if `id` is the active section.
 *
 * Standalone variant kept for backward compatibility — the composable
 * returned by `useTreeIndex` includes the same helper.
 */
export function isActive(id: string, activeId: string | null): boolean {
    return id === activeId;
}

/**
 * Check if `id` is an ancestor of or equal to `activeId`.
 *
 * Standalone variant kept for backward compatibility — the composable
 * returned by `useTreeIndex` includes the same helper.
 */
export function isInActiveChain(
    id: string,
    activeId: string | null,
    index: Map<string, SidebarIndexEntry>,
    _roots: SidebarSection[],
): boolean {
    if (!activeId) return false;
    const entry = index.get(activeId);
    if (!entry) return false;
    if (id === activeId) return true;
    if (id === entry.parentId) return true;
    const target = index.get(id);
    if (!target) return false;

    // Use the generic isDescendant via a one-off useTreeIndex call
    // to avoid duplicating the recursive logic.
    return _isDescendantLegacy(activeId, id, index);
}

/** Legacy isDescendant that operates on an externally-built index. */
function _isDescendantLegacy(
    childId: string,
    ancestorId: string,
    index: Map<string, SidebarIndexEntry>,
): boolean {
    const ancestor = index.get(ancestorId);
    if (!ancestor) return false;
    const children = ancestor.node.children;
    if (!children) return false;
    for (const child of children) {
        if (child.id === childId) return true;
        if (_isDescendantLegacy(childId, child.id, index)) return true;
    }
    return false;
}
