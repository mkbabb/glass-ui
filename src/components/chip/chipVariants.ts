import { joinClassValues, type ClassValue } from "../_shared/class-names";

const BASE =
    "glass-chip glass-capsule accent-tone inline-flex items-center justify-center font-sans text-muted-foreground select-none";
const INTERACTIVE =
    "glass-chip--interactive glass-capsule-hover focus-ring cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled";
const SIZE = {
    sm: "gap-1 px-2.5 py-1 text-caption",
    md: "gap-1.5 px-3.5 py-1.5 text-small",
    lg: "gap-2 px-5 py-2 text-base",
} as const;
const SHAPE = {
    pill: "",
    cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro",
    icon: "glass-chip--icon aspect-square p-0",
} as const;
const ICON_SIZE = { sm: "size-8", md: "size-10", lg: "size-12" } as const;

export interface ChipVariants {
    interactive?: boolean | null;
    size?: keyof typeof SIZE | null;
    shape?: keyof typeof SHAPE | null;
    class?: ClassValue;
    className?: ClassValue;
}

export function chipVariants(options: ChipVariants = {}): string {
    const size = options.size ?? "md";
    const shape = options.shape ?? "pill";
    return joinClassValues(
        BASE,
        options.interactive && INTERACTIVE,
        SIZE[size],
        SHAPE[shape],
        shape === "icon" && ICON_SIZE[size],
        options.class,
        options.className,
    );
}
