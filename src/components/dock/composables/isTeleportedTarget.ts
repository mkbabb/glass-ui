/**
 * Detect whether a DOM target is inside a dock-owned teleported overlay.
 *
 * Dock-owned popovers/selects/menus mark their teleported content with
 * `data-glass-dock-portal` and `data-glass-dock-owner`. That keeps click-away
 * logic scoped to the owning dock instead of depending on Reka internals,
 * ARIA roles, or broad class names.
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
