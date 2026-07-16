/** Stable scalar identity used by Glass selection controls. */
export type SelectionValue = string | number;

/** Checkbox state, including the mixed state exposed through ARIA. */
export type CheckedState = boolean | "indeterminate";

/** Cardinality of a Glass selection model. */
export type SelectionMode = "single" | "multiple";

export function isSelectionValue(value: unknown): value is SelectionValue {
    return typeof value === "string" || typeof value === "number";
}
