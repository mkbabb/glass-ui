// HeaderRibbon — canonical public types (O.W6 Lane A promotion).

// BI.W-SYNONYM-RENAMES — the `position` synonym renamed to the shared `placement`
// axis vocabulary (a subset of the PLACEMENTS tuple, _shared/axes.ts); "left"|"right"
// unchanged, zero value change.
export type HeaderRibbonPlacement = "left" | "right";

export interface HeaderRibbonProps {
    /** Side of the viewport the ribbon anchors against. Defaults to `"left"`. */
    placement?: HeaderRibbonPlacement;
    /** Milliseconds after the pointer leaves the ribbon before items collapse. Defaults to `2000`. */
    hideTimeoutMs?: number;
}
