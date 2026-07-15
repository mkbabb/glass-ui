export interface StackedIconGroupProps<TItem> {
    /** Items to display */
    items: TItem[];
    /** Max visible icons before showing +N overflow */
    maxVisible?: number;
    /** Stack orientation (BI.W-SYNONYM-RENAMES — the `direction` synonym renamed to
     *  the shared `orientation` axis vocabulary; horizontal|vertical, zero value change). */
    orientation?: "horizontal" | "vertical";
    /** Reverse the visual order */
    reversed?: boolean;
    /** Icon size */
    size?: "sm" | "md" | "lg";
    /** Expand icons on group hover */
    expandOnHover?: boolean;
    /** Root element tag */
    as?: string;
    /** Key extraction function for v-for */
    keyFn?: (item: TItem, index: number) => string | number;
}
