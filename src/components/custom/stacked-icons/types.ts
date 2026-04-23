export interface StackedIconGroupProps<TItem> {
    /** Items to display */
    items: TItem[];
    /** Max visible icons before showing +N overflow */
    maxVisible?: number;
    /** Stack direction */
    direction?: "horizontal" | "vertical";
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
