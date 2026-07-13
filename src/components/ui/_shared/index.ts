// `_shared/` — sub-internal boundary inside `ui/`. The leading underscore
// signals private-to-ui/ at runtime (NOT re-exported by `ui/index.ts`).
//
// This barrel exists ONLY so `/api` can pin the canonical `MenuItemVariants`
// type union from a stable home (O.W4 Lane A promotion). Consumer-side
// imports of `menuItemVariants` (the CVA itself) still go through the
// component packages that compose it — `_shared/` is not on the runtime
// public surface.

export { menuItemVariants } from "./menuItemVariants";
export type { MenuItemVariants } from "./menuItemVariants";

// BA.W-SURFACE-AXIS — the shared {glass·veil·opaque} surface-decoration axis.
// The `Surface` union + the `surfaceClass` resolver every enrolled content/
// floating surface threads (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/
// ExpandableContainer/Skeleton) + the consumer waves import (W-FEEDBACK-TONE,
// W-MENU-GLASS). The ONE seam — no second axis.
// BI.W-SURFACE-EXTRACT — `decorationClass` joins the resolver beside `surfaceClass`
// (the runtime home for the surface-axis functions; `/api` publishes the TYPES).
// It returns ONLY the veil/opaque/clear decoration class (no base-tier prefix) —
// the single source that killed the `.replace(/^glass-\w+\s*/, "")` DRY wart every
// reka-portaled overlay hand-rolled to strip `surfaceClass`'s tier prefix.
export { surfaceClass, decorationClass } from "./useSurfaceAxis";
export type { Surface, SurfaceTier } from "./useSurfaceAxis";

// BC.W-CONTROL-CUSTOM — the shared control-SIZE axis. The `ControlSize` union +
// the `controlSizeClass` resolver the input register (Input/Switch/Textarea/
// NumberFieldInput) threads to select a rung of the EXISTING `--control-h-*` /
// `--control-text` cohort. ONE axis, zero new magnitude register.
export { controlSizeClass, switchSizeClass } from "./useControlSize";
export type { ControlSize } from "./useControlSize";
