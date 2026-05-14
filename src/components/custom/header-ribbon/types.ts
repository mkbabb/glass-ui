// HeaderRibbon — canonical public types (O.W6 Lane A promotion).

export type HeaderRibbonPosition = "left" | "right";

export interface HeaderRibbonProps {
    /** Side of the viewport the ribbon anchors against. Defaults to `"left"`. */
    position?: HeaderRibbonPosition;
    /** Milliseconds after the pointer leaves the ribbon before items collapse. Defaults to `2000`. */
    hideTimeoutMs?: number;
}
