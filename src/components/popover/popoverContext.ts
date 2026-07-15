// popoverContext.ts — the sealed-Popover union context (BI.W-OVERLAY-UNION).
//
// The Kronecker fold collapses HoverPopover + HoverCard + Popover onto ONE sealed
// `<Popover>` whose `trigger` axis switches the reka ROOT internally (fine-hover →
// HoverCardRoot; click / context / coarse-hover → PopoverRoot). The compound
// children (`<PopoverTrigger>` / `<PopoverContent>`) cannot know which root wraps
// them from markup alone, so `<Popover>` PROVIDES this one flag and the children
// render the reka trigger/content that matches the live root. A child used WITHOUT
// a union `<Popover>` parent injects `null` and falls to the click/PopoverRoot
// branch (the historical default — a bare `<PopoverContent>` under a reka
// `PopoverRoot` still paints).

import type { ComputedRef } from "vue";
import { createOptionalContext } from "../../composables/context";

export interface PopoverUnionContext {
    /**
     * `true` when the fine-hover HoverCardRoot branch is live; `false` → the
     * PopoverRoot branch (click / context / coarse-pointer-promoted hover). A
     * coarse-pointer hover trigger resolves `false` — reka's `excludeTouch`
     * leaves the hover root structurally dead on touch, so the union promotes it
     * to the tap-toggle PopoverRoot.
     */
    usesHoverRoot: ComputedRef<boolean>;
}

const ctx = createOptionalContext<PopoverUnionContext>("glass-ui:popover-union");

/** The typed injection key (exported so an external provider can target it). */
export const POPOVER_UNION_KEY = ctx.KEY;
/** `<Popover>` provides the resolved-root flag to its compound children. */
export const providePopoverUnion = ctx.provide;
/** Inject the union context; `null` outside a union `<Popover>` (→ click branch). */
export const usePopoverUnion = ctx.use;
