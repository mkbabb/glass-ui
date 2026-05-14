import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

export type DockOrientation = "horizontal" | "vertical";

/**
 * Dock context surfaces the dock id + orientation + held-state coordination
 * to descendants.
 *
 * O.W2 — canonical typed-key + helper-pair DI shape per invariant 25.
 * The 6 prior string-keyed provides (`glassDockContext`, `glassDockId`,
 * `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapse into
 * the single `DOCK_CONTEXT_KEY` typed `InjectionKey<DockContext>`.
 * `dockExpanded` is retired (zero downstream consumers per Rδ audit).
 * `glassDockId` is dedup'd with `context.id`.
 *
 * Paired helpers:
 *  - `useDockContext()` — strict; throws when used outside `<GlassDock>`.
 *  - `useOptionalDockContext()` — befitting silent default for primitives
 *    that may render outside a dock (Slider, popovers, …).
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
    /** Acquire a keep-open token; suppresses timer-based collapse. */
    keepOpen: () => void;
    /** Release a previously-acquired keep-open token. */
    release: () => void;
    /** Reactive `keepOpenCount > 0` flag; descendants reflect via `data-held`. */
    held: ComputedRef<boolean>;
}

export const DOCK_CONTEXT_KEY: InjectionKey<DockContext> = Symbol("glass-ui:dock-context");

export function provideDockContext(context: DockContext): void {
    provide(DOCK_CONTEXT_KEY, context);
}

/** Strict — throws when used outside `<GlassDock>`. */
export function useDockContext(): DockContext {
    const ctx = inject(DOCK_CONTEXT_KEY);
    if (!ctx) {
        throw new Error(
            "[glass-ui:dock] useDockContext() called outside <GlassDock>; use useOptionalDockContext() if the primitive may render outside a dock.",
        );
    }
    return ctx;
}

/** Befitting silent default for primitives that may render outside a dock. */
export function useOptionalDockContext(): DockContext | null {
    return inject(DOCK_CONTEXT_KEY, null);
}
