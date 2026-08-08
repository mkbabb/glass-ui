import type { ComputedRef } from "vue";
import { createStrictContext } from "../../../composables/context";
import { DOCK_CONTEXT_LABEL } from "../constants";

export type DockOrientation = "horizontal" | "vertical";
export type DockLayout = "linear" | "grid";

/**
 * What KIND of hold a token is. The two are different facts about the dock and
 * only one of them is a hand:
 *
 *  - `"morph"` (the default) — POSTURE only. "Something is open and the dock must
 *    not idle-collapse under it": an armed search field, an open popover, a
 *    focused switcher tab. It suppresses the collapse timer and nothing else. It is
 *    NOT a hand, and it never engages the grasp optic (glass/grasp.css) — a
 *    search field left open for a minute is not a minute-long touch.
 *  - `"grasp"` — a live POINTER HOLD on a descendant control (`useDockHold`'s
 *    acquire, driven by native `pointerdown`/`touchstart` on the resolved host).
 *    A grasp IMPLIES a morph hold (a finger down must also hold the dock open),
 *    so it takes both counts; it is the edge the material answers.
 */
export type DockHoldKind = "morph" | "grasp";

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
    /**
     * Acquire a hold token; suppresses timer-based collapse. `kind` defaults to
     * `"morph"` (posture only). Pass `"grasp"` for a live pointer hold — it takes
     * BOTH counts, so a grasp also holds the dock open.
     */
    keepOpen: (kind?: DockHoldKind) => void;
    /** Release a previously-acquired token of the SAME `kind` that took it. */
    release: (kind?: DockHoldKind) => void;
    /**
     * Reactive GRASP edge — `true` while ≥1 pointer hold is live on a descendant.
     * This is what the dock root reflects as `data-held` and what the grasp
     * register answers; it is deliberately NOT the morph-hold count (an open
     * popover is not a finger).
     */
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
