/**
 * `_shared/overlay/` — a RELOCATION, not a growth.
 *
 * The portal contract, the keep-open token and the plate's attribute seam were
 * spread across `dock/composables/`, five component files and a `_shared/`
 * denylist module. Nothing here is new machinery; it is the same three
 * contracts, stated once, beside each other, with their readers.
 */
export { overlayContentAttrs, type OverlayAttrs, type OverlayRole } from "./content";
export { isTeleportedTarget } from "./isTeleportedTarget";
export {
    useDockParticipation,
    useHoldToken,
    type DockParticipation,
    type DockPortalAttrs,
    type HoldTarget,
    type HoldToken,
} from "./participation";
export type {
    FloatingAlign,
    FloatingPlacementProps,
    FloatingSide,
} from "./placement";
