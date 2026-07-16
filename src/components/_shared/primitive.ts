import type { Component } from "vue";

/** Host element name accepted by Glass components that render a primitive. */
export type AsTag = string;

/** Logical reading direction accepted by directional Glass controls. */
export type Direction = "ltr" | "rtl";

/** Stable public shape shared by Glass components backed by a host primitive. */
export interface PrimitiveProps {
    /** Merge the component's behavior into its single child instead of rendering a host. */
    asChild?: boolean;
    /** Element or Vue component to render when `asChild` is false. */
    as?: AsTag | Component;
}

/** Stable public fields shared by form-associated Glass controls. */
export interface FormFieldProps {
    name?: string;
    required?: boolean;
}

const POLYMORPHIC_ATTRS = new Set(["as", "asChild", "as-child"]);

/** Forward ordinary host attributes without reviving a retired polymorphic API. */
export function fixedHostAttrs(
    attrs: Readonly<Record<string, unknown>>,
): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(attrs).filter(([key]) => !POLYMORPHIC_ATTRS.has(key)),
    );
}
