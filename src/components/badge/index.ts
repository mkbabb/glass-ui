import { joinClassValues, type ClassValue } from "../_shared/class-names";

export { default as Badge } from "./Badge.vue";

const BASE =
    "badge-atom inline-flex items-center gap-1.5 rounded-badge font-semibold wrap-anywhere [&_svg:not([class*=size-])]:size-(--ui-glyph-sm) [&_svg]:shrink-0 [&_svg]:pointer-events-none";
const VARIANT = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "badge-atom--outline text-foreground",
} as const;
const TONE = {
    neutral: "",
    destructive:
        "bg-destructive text-destructive-foreground dark:bg-[hsl(0_70%_45%)]",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground",
} as const;
const SIZE = {
    sm: "text-[length:var(--control-text-sm)] leading-[1.1] px-2 py-0.5",
    md: "text-[length:var(--control-text)] leading-[1.1] px-2.5 py-1",
    lg: "text-[length:calc(var(--type-body)*var(--ui-scale))] leading-[1.1] px-3 py-1.5",
} as const;
const SURFACE = {
    loud: "",
    glass: "badge-atom--glass glass-capsule glass-atom",
} as const;

export interface BadgeVariants {
    variant?: keyof typeof VARIANT | null;
    tone?: keyof typeof TONE | null;
    size?: keyof typeof SIZE | null;
    surface?: keyof typeof SURFACE | null;
    class?: ClassValue;
    className?: ClassValue;
}

export function badgeVariants(options: BadgeVariants = {}): string {
    return joinClassValues(
        BASE,
        VARIANT[options.variant ?? "default"],
        TONE[options.tone ?? "neutral"],
        SIZE[options.size ?? "md"],
        SURFACE[options.surface ?? "loud"],
        options.class,
        options.className,
    );
}
