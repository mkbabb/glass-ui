import type { SidebarSection, SidebarIndexEntry } from "./types";

/**
 * Builds a flat index of all nodes in a sidebar tree for O(1) lookup
 * with hierarchy metadata. Pure function, no Vue reactivity.
 */
export function buildTreeIndex(roots: SidebarSection[]): Map<string, SidebarIndexEntry> {
    const index = new Map<string, SidebarIndexEntry>();

    function walk(
        list: SidebarSection[],
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
            if (node.children) {
                walk(
                    node.children,
                    depth + 1,
                    depth === 0 ? node.id : parentId,
                    rid,
                    ri,
                );
            }
        }
    }
    walk(roots, 0, null, "", 0);

    return index;
}

/** Check if `id` is the active section. */
export function isActive(id: string, activeId: string | null): boolean {
    return id === activeId;
}

/** Check if `id` is an ancestor of or equal to `activeId`. */
export function isInActiveChain(
    id: string,
    activeId: string | null,
    index: Map<string, SidebarIndexEntry>,
    roots: SidebarSection[],
): boolean {
    if (!activeId) return false;
    const entry = index.get(activeId);
    if (!entry) return false;
    if (id === activeId) return true;
    if (id === entry.parentId) return true;
    const target = index.get(id);
    if (!target) return false;
    return isDescendant(activeId, id, index);
}

/** Check if `childId` is a descendant of `ancestorId`. */
function isDescendant(
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
        if (isDescendant(childId, child.id, index)) return true;
    }
    return false;
}
