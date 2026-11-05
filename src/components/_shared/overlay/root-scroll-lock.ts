import { onScopeDispose, watch } from "vue";

/* THE ONE SCROLL LOCK RIDES THE ROOT, NOT `body` (U/B7 D-2, U/B7c C3-1).
 *
 * `overflow: hidden` on `body`, under a root whose own overflow is not `visible` (a
 * consumer's `overflow-x: clip`), makes `body` a scroll container, so every sticky
 * element on the page drops to its in-flow position while the lock holds, and the page
 * jumps when it lets go. On the root element the value propagates to the viewport, which
 * stays the page's one scroller with its scroll position kept, and the root's
 * `scrollbar-gutter: stable` keeps the layout from shifting when the bar hides.
 *
 * Every glass surface that holds the page still (a modal scrim, ExpandableContainer)
 * takes this one counted lock, so surfaces that close out of order can never restore
 * each other's stale value (U-F04): the first acquire saves the root's inline value and
 * the last release puts it back. */
let depth = 0;
let rootOverflowBefore: string | null = null;

export function acquireRootScrollLock(): boolean {
    if (typeof document === "undefined") return false;
    const root = document.documentElement;
    if (depth === 0) {
        rootOverflowBefore = root.style.overflow;
        root.style.overflow = "hidden";
    }
    depth += 1;
    return true;
}

export function releaseRootScrollLock(): void {
    if (typeof document === "undefined" || depth === 0) return;
    depth -= 1;
    if (depth === 0) {
        document.documentElement.style.overflow = rootOverflowBefore ?? "";
        rootOverflowBefore = null;
    }
}

/** Hold the root lock while `active()` is true; release it when the scope ends. */
export function useRootScrollLock(active: () => boolean): void {
    let held = false;
    const set = (next: boolean): void => {
        if (next === held) return;
        held = next;
        if (next) acquireRootScrollLock();
        else releaseRootScrollLock();
    };
    watch(active, set, { immediate: true, flush: "sync" });
    onScopeDispose(() => set(false));
}
