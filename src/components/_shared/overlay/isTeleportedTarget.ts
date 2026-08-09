/**
 * Detect whether a DOM target is inside a dock-owned teleported overlay.
 *
 * Dock-owned popovers/selects/menus mark their teleported content with
 * `data-glass-dock-portal` and `data-glass-dock-owner`. That keeps click-away
 * logic scoped to the owning dock instead of depending on Reka internals,
 * ARIA roles, or broad class names.
 *
 * It lives HERE, beside `overlayContentAttrs()`, because this predicate and that
 * writer are two halves of one contract: the reader parsed an attribute pair
 * that five hand-written call sites in five different files were each spelling
 * for themselves. Sitting in `dock/` it was a reader with no visible writer.
 */
export function isTeleportedTarget(
    target: EventTarget | null,
    ownerId?: string,
): boolean {
    if (!(target instanceof Element)) return false;
    const portal = target.closest("[data-glass-dock-portal]");
    if (!portal) return false;
    if (!ownerId) return true;
    return portal.getAttribute("data-glass-dock-owner") === ownerId;
}
