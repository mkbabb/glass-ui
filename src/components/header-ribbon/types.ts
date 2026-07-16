import type { HTMLAttributes } from "vue";

export type HeaderRibbonMode = "persistent" | "collapsible";
export type HeaderRibbonPlacement = "left" | "right";

interface HeaderRibbonCommonProps {
    /** Side of the viewport the ribbon anchors against. Defaults to `"left"`. */
    placement?: HeaderRibbonPlacement;
    /** Accessible name for the persistent action toolbar. */
    ariaLabel?: string;
    /** Additional class names. */
    class?: HTMLAttributes["class"];
}

export interface HeaderRibbonPersistentProps extends HeaderRibbonCommonProps {
    /** Keeps the action row available without a disclosure control. */
    mode?: "persistent";
    anchorLabel?: never;
}

export interface HeaderRibbonCollapsibleProps extends HeaderRibbonCommonProps {
    /** Adds the ribbon-owned disclosure control and collapses the action row. */
    mode: "collapsible";
    /** Accessible name for the ribbon-owned disclosure control. */
    anchorLabel: string;
}

export type HeaderRibbonProps =
    | HeaderRibbonPersistentProps
    | HeaderRibbonCollapsibleProps;

export interface HeaderRibbonAnchorSlotProps {
    /** Whether the collapsible action row is pinned open. */
    pinned: boolean;
}
