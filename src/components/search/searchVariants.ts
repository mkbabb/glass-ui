import { joinClassValues, type ClassValue } from "../_shared/class-names";
import {
    type ControlSize,
    controlSizeClass,
} from "../_shared/control-size";

const VARIANT = {
    inline: "",
    bare: "border-none bg-transparent p-0 rounded-none",
    floating: "border-none bg-transparent p-0 rounded-none",
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
