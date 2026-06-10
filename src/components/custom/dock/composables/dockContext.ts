import type { ComputedRef } from "vue";
import { createStrictContext } from "../../../../composables/context";
import { DOCK_CONTEXT_LABEL } from "../constants";

export type DockOrientation = "horizontal" | "vertical";
export type DockLayout = "linear" | "grid";

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
    /**
     * In-cap arrangement (`linear` row/column vs `grid` tile panel). AX.W45 —
     * `<DockSeparator>` reads this to paint a full-row section break in a grid dock
     * (a 1px perpendicular hairline is useless in a 2D tile grid).
     */
    layout: ComputedRef<DockLayout>;
    /** Acquire a keep-open token; suppresses timer-based collapse. */
    keepOpen: () => void;
    /** Release a previously-acquired keep-open token. */
    release: () => void;
    /** Reactive `keepOpenCount > 0` flag; descendants reflect via `data-held`. */
    held: ComputedRef<boolean>;
}

// Strict + optional over ONE key (AV.W14): `<GlassDock>` provides; descendants
// use strict; a `<Slider>` that may sit outside a dock reads via the optional
// shape over the same key.
const ctx = createStrictContext<DockContext>(
    DOCK_CONTEXT_LABEL,
    "[glass-ui:dock] useDockContext() called outside <GlassDock>; use useOptionalDockContext() if the primitive may render outside a dock.",
);

export const { KEY: DOCK_CONTEXT_KEY } = ctx;

export function provideDockContext(context: DockContext): void {
    ctx.provide(context);
}

/** Strict — throws when used outside `<GlassDock>`. */
export const useDockContext = ctx.use;

/** Befitting silent default for primitives that may render outside a dock. */
export const useOptionalDockContext = ctx.useOptional;
