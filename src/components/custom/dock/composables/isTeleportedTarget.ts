/**
 * Detect whether a DOM target is inside a reka-ui teleported overlay
 * (dropdown, select, popover, menu) or a glass-ui floating panel.
 *
 * Used by useDockState and DockPopover to distinguish "logically inside
 * the dock" clicks from true outside clicks. Uses Element (not HTMLElement)
 * so SVG icon targets inside dropdowns are caught too.
 */
export function isTeleportedTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    return !!(
        target.closest('[data-reka-popper-content-wrapper]') ||
        target.closest('[data-reka-menu-content]') ||
        target.closest('[role="menu"]') ||
        target.closest('[role="listbox"]') ||
        target.closest('.floating-panel') ||
        target.closest('.dock-popover')
    );
}
