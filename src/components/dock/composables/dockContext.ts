import type { ComputedRef } from "vue";
import { createStrictContext } from "../../../composables/context";
import { DOCK_CONTEXT_LABEL } from "../constants";

export type DockOrientation = "horizontal" | "vertical";
export type DockLayout = "linear" | "grid";

/**
 * Dock context surfaces the dock id + orientation + held-state coordination
 * to descendants.
 *
 * One typed key carries id, orientation, layout, and held-state coordination.
 * Paired helpers:
 *  - `useDockContext()` — strict; throws when used outside `<GlassDock>`.
 *  - `useOptionalDockContext()` — befitting silent default for primitives
 *    that may render outside a dock (Slider, popovers, …).
 *
 * Hover-driven dock popovers compose `<Popover trigger="hover" keep-dock-open>`.
 * Reka's hover primitives own open/close cadence and cluster transit.
 */
export interface DockContext {
    id: string;
    orientation: ComputedRef<DockOrientation>;
    /**
     * In-cap arrangement (`linear` row/column vs `grid` tile panel).
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

// Strict and optional access share one key: `<GlassDock>` provides; descendants
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
