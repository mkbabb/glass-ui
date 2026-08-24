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
/* THE RUNG. Alert composes `.glass-quiet` — the content tier — instead of hand-rolling
   a plate out of raw utilities. That single class supplies `position: relative`, the
   rung's own `background: var(--glass-veil)` through `@utility glass-plate`, the
   `--glass-blur-quiet` backdrop, `border: 1px solid var(--glass-border-accent)`, and the
   rim + under-shadow + lift stack — so the four declarations it replaces (`relative`,
   `border`, the `--glass-plate-wash` background, the `--glass-blur-wash` backdrop) are
   deletions, not substitutions.

   Three defects close by composition rather than by a new rule:
     · the WRONG RUNG — every arm bound `--glass-blur-wash` = `blur(1px)`, a radius
       `glass.css` itself calls sub-perceptual, on a CONTENT panel whose tier is
       `--glass-blur-quiet` = `blur(7px)`;
     · the OPAQUE HAIRLINE — a bare `border` resolves `currentColor` = `--card-foreground`
       at α 1.0 on all four sides, which reads as a debug outline, not a rim;
     · the MUTED INK — `ladder.css`'s on-glass muted register keys off the rung classes,
       so a surface outside the ladder never received `--on-glass-muted` and its
       description ink kept the page-calibrated value on a translucent plate.

   `--glass-specular-intensity-hover: 0` is the one added declaration and it is a
   subtraction in disguise: joining the rung would otherwise hand a `role="alert"`
   surface a pointer-reactive gleam. An alert is announced, not operated; a hover
   affordance on it is a false promise. Rest specular is already 0 (`property-regs-
   specular.css`), so this closes the hover half and nothing else.

   `.liquid-enter` is the breath. Alert measured 0 hover / 0 transition / 0 spring in 77
   LOC — a genuinely inert component under the breath-of-life edict — and the honest
   channel for a surface nobody points at is its ARRIVAL, not a gleam it cannot earn.
   `.liquid-enter` is the library's universal mount recipe (zero JS, `@keyframes`-on-mount
   so a `v-if`-born surface animates at all, with its own reduced-motion arm), so the
   alert enters on the same grammar as every other mount surface. Rest stays material-only
   — no idle loop, per the ratified idle canon. */
const BASE =
    "glass-quiet liquid-enter [--glass-specular-intensity-hover:0] w-full rounded-card px-4 py-3 grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-(--ui-glyph) [&>svg]:translate-y-0.5 [&>svg]:text-current";

/* THE TONE ARMS — neutral glass + status ink. The status-tinted PLATE is not built:
   colour arrives as the full-chroma glyph and the tone-keyed ink, over the same neutral
   quiet rung every arm rides. That is the ruled Alert identity, and it is also the
   accessible arrangement — the plate stays one measured surface for every tone, so the
   contrast table has one composite to pin against instead of five.

   Each arm therefore binds `--tone` (via its `.feedback-tone-<name>` register) and
   spends it on ink. It does NOT compose `.feedback-tone`, which is the tinted-PLATE
   recipe; that register keeps its one shipped consumer in Toast, the floating tier where
   a louder semantic belongs. The four `--feedback-tone-rung` re-points leave with it, so
   the token has ZERO RE-POINTS in `src/` — one declaration, its own `:root` definition in
   `feedback-tone.css`, and one read, the `var()` fallback slot. It is a fallback, not a
   seam, exactly as its declaration says; `G-FEEDBACK-TINT-SEAM` arm (b) holds both halves
   (no foreign writer, and the fallback declared exactly once).

   Every utility stays a verbatim source literal inside `TONED` — the v4 scanner reads
   source text, so a shared suffix may be interpolated but a class name may never be
   assembled. */
const TONED =
    "text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90";
const TONE = {
    neutral: "text-card-foreground",
    destructive: `feedback-tone-destructive ${TONED}`,
    success: `feedback-tone-success ${TONED}`,
    warning: `feedback-tone-warning ${TONED}`,
    info: `feedback-tone-info ${TONED}`,
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
