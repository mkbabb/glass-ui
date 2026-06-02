// moveBeforeSafe — atomic state-preserving DOM re-parent (AQ.W6 §Design 8b).
//
// `Element.moveBefore()` relocates a node WITHOUT running the remove/insert
// lifecycle, so a moved subtree keeps its state: an open `[popover]`/`<dialog>`
// stays in the top layer, focus is retained, a playing `<video>`/animation and
// an `<iframe>`'s document are not reset. `appendChild`/`insertBefore` tear all
// of that down (the node is removed then re-inserted).
//
// Baseline: `move-before` (`moveBefore`) = LIMITED → progressive-enhancement
// only. `insertBefore` is the KEPT sole fallback (state resets on a
// non-supporting engine — a documented, acceptable degrade, not a regression:
// the move still happens, just non-atomically). No alias, no polyfill.
//
// Call this instead of `appendChild`/`insertBefore` ONLY where a component or
// consumer imperatively re-parents a subtree that may contain focus or an open
// top-layer element (e.g. a `ResponsiveTabs` Select↔Tabs swap, a dock teleport).
// The default Vue render path (teleport, `v-if` swap) is unchanged — this is
// opt-in at the manual-DOM-surgery call site.

interface ElementWithMoveBefore {
    moveBefore?: (node: Node, child: Node | null) => void;
}

/**
 * Move `node` into `parent` immediately before `ref` (or to the end when `ref`
 * is `null`), preserving the node's live state when `Element.moveBefore` is
 * supported, and falling back to `insertBefore` otherwise.
 *
 * @param parent the destination parent element.
 * @param node   the node to move (may currently live elsewhere in the tree).
 * @param ref    the child to insert before, or `null` to append.
 */
export function moveBeforeSafe(
    parent: Element,
    node: Node,
    ref: Node | null,
): void {
    const p = parent as Element & ElementWithMoveBefore;
    if (typeof p.moveBefore === "function") {
        p.moveBefore(node, ref);
    } else {
        parent.insertBefore(node, ref);
    }
}

/**
 * True when `Element.moveBefore` is available — the feature-detected predicate
 * for consumers that want to branch their own re-parent logic.
 */
export function supportsMoveBefore(): boolean {
    return (
        typeof Element !== "undefined" && "moveBefore" in Element.prototype
    );
}
