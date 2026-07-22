import { joinClassValues, type ClassValue } from "../_shared/class-names";
import {
    type ControlSize,
    controlSizeClass,
} from "../_shared/control-size";

// The `variant` axis is binary: component-owned plate vs bare parent ownership.
//   inline / floating — the complete component-owned `.input-bar` glass chrome (the
//     control-pill plate). `floating` is the same recipe as `inline`; it stays a
//     distinct public name but never strips the plate to `rounded-none`.
//   bare — the sole explicit chromeless variant: no plate, the parent owns the surface.
// (`surface` chooses glass/veil/opaque orthogonally; it is not a chrome-stripping axis.)
const VARIANT = {
    inline: "",
    floating: "",
    bare: "border-none bg-transparent p-0 rounded-none",
} as const;

export type SearchVariant = keyof typeof VARIANT;

export interface SearchVariants {
    variant?: SearchVariant | null;
    class?: ClassValue;
    className?: ClassValue;
}

/** Search field chrome; size remains on the shared control-size axis. */
export function searchFieldVariants(options: SearchVariants = {}): string {
    return joinClassValues(
        VARIANT[options.variant ?? "inline"],
        options.class,
        options.className,
    );
}

export { controlSizeClass };
export type { ControlSize };
