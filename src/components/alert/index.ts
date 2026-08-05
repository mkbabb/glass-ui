import { joinClassValues, type ClassValue } from "../_shared/class-names";

export { default as Alert } from "./Alert.vue";
export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";

/* Alert wears the CARD role, not shadcn's `rounded-lg` (= `--radius-lg` →
   `--radius` → 10px). An alert IS a presented plate — the same rank as Card,
   Popover and Toast — and it was the one raw shadcn radius-scale class left in
   `src`, reading 10px against the 16px card canon. The owner's rounding register
   says it plainly: "Alerts are not rounded like our cards—they should be the
   same." `rounded-card` resolves `--radius-card`, so a consumer retuning the card
   corner moves the alert with it. */
const BASE =
    "relative w-full rounded-card border px-4 py-3 text-[length:var(--control-text)] grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-(--ui-glyph) [&>svg]:translate-y-0.5 [&>svg]:text-current";
const TONE = {
    neutral:
        "bg-(--glass-plate-wash) [backdrop-filter:var(--glass-blur-wash)] text-card-foreground",
    destructive:
        "feedback-tone feedback-tone-destructive [--feedback-tone-rung:var(--glass-plate-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90",
    success:
        "feedback-tone feedback-tone-success [--feedback-tone-rung:var(--glass-plate-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90",
    warning:
        "feedback-tone feedback-tone-warning [--feedback-tone-rung:var(--glass-plate-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90",
    info: "feedback-tone feedback-tone-info [--feedback-tone-rung:var(--glass-plate-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90",
} as const;

export interface AlertVariants {
    tone?: keyof typeof TONE | null;
    class?: ClassValue;
    className?: ClassValue;
}

export function alertVariants(options: AlertVariants = {}): string {
    return joinClassValues(
        BASE,
        TONE[options.tone ?? "neutral"],
        options.class,
        options.className,
    );
}
