import { inject, provide, type ComputedRef } from "vue";

export type DockOrientation = "horizontal" | "vertical";

/**
 * Dock context surfaces the dock id + orientation to descendants.
 *
 * J.W3.B — `registerPopover` / `closeOtherPopovers` retired. Hover-driven
 * dock popovers compose `<HoverPopover keep-dock-open>` whose open/close
 * cadence is owned by reka-ui's HoverCard primitives; cooperative
 * dismissal between sibling popovers is no longer needed (HoverCard's
 * pointer-leave timer handles the cluster transit case).
 */
export interface DockContext {
    id: string;
    orientation: ComputedRef<DockOrientation>;
}

const DOCK_CONTEXT_KEY = "glassDockContext";

export function provideDockContext(context: DockContext): void {
    provide(DOCK_CONTEXT_KEY, context);
}

export function useDockContext(): DockContext | null {
    return inject<DockContext | null>(DOCK_CONTEXT_KEY, null);
}
