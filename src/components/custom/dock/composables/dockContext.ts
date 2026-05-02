import { inject, provide, type ComputedRef, type Ref } from "vue";

export type DockOrientation = "horizontal" | "vertical";

export interface DockPopoverRegistration {
    expanded: Ref<boolean>;
    scheduleCollapse(delay: number): void;
}

export interface DockContext {
    id: string;
    orientation: ComputedRef<DockOrientation>;
    registerPopover(popover: DockPopoverRegistration): () => void;
    closeOtherPopovers(popover: DockPopoverRegistration): void;
}

const DOCK_CONTEXT_KEY = "glassDockContext";

export function provideDockContext(context: DockContext): void {
    provide(DOCK_CONTEXT_KEY, context);
}

export function useDockContext(): DockContext | null {
    return inject<DockContext | null>(DOCK_CONTEXT_KEY, null);
}
