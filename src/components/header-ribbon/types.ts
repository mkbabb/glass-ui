import type { HTMLAttributes } from "vue";

export type HeaderRibbonPlacement = "left" | "right";

export interface HeaderRibbonProps {
    /** Side of the viewport the ribbon anchors against. Defaults to `"left"`. */
    placement?: HeaderRibbonPlacement;
    /** Accessible name for the persistent action toolbar. */
    ariaLabel?: string;
    /** Additional class names. */
    class?: HTMLAttributes["class"];
}
