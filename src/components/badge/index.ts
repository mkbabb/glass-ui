import { joinClassValues, type ClassValue } from "../_shared/class-names";

export { default as Badge } from "./Badge.vue";

// THE ANNOTATION TYPE REGISTER (BK #87 W-MARKS §3.2). A badge is an ANNOTATION,
// not a control, so its rungs are by ROLE on the canonical type series — caption
// (n=−3) · section-label (n=−2) · control-value (n=−1) — and its PAD is on the
// spacing series, OFF the `--ui-scale` scalar (§1.1's mobile law: the scalar
// grows control BOXES so a finger can hit them; nothing on a badge is hittable).
// The shipped ladder was 8/2 · 10/4 · 12/6 — three ratios, three off-series
// values, with the type riding `--ui-scale` against that same law.
//
// The pad series is 4/8 · 4/12 · 8/12 (Tailwind px-2/py-1 · px-3/py-1 · px-3/py-2
// at the 4px base). The type ratio between adjacent rungs is asserted as a RATIO
// (φ^(1/4) ≈ 1.128) rather than as pixels: the pixel values are the typography
// wave's — `--type-caption` computes 14.384 against a canonical 12.97, routed at
// §9, and this register must not fork a second answer while that is open.
//
// `--control-label` (sizing.css) is PROPORTION §6's budgeted ratio rung, not a
// mint here; Label is its first consumer and this is its second.
//
// `wrap-anywhere` is GONE. It applied to 39/39 badges and it breaks a word at any
// character — "Paid" rendering as P/ai/d in a narrow cel. A badge is a short
// annotation; it does not wrap, it stays on its line.
//
// The GLYPH is `1em` (W-SEARCH ruling 3, inherited verbatim): an icon inside a
// mark is sized by the mark's own type, so it tracks every rung instead of
// freezing at `--ui-glyph-sm` while the label grows around it.
//
// A-22 — the CIRCULAR FLOOR. The floor is the badge's own BOX HEIGHT (`1lh`
// content + the two padding-block legs), so a one-character badge is a circle
// rather than a squashed lozenge and a two-plus character badge grows off the
// floor on the pad series. `justify-center` is what makes the floor centre its
// content instead of left-packing it.
//
// The rungs below state the two legs as REQUESTS and nothing else: the BOX —
// floor, padding-block, and the padding-inline CEILING that keeps the floor
// bindable — is `mark.css` law (6). Spelled here as bare `px-*`/`py-*` the floor
// was INERT at md, because a leg of 12px per side exceeds the whole slack the
// floor leaves over one character; the register hands back the leg the floor can
// afford. The request series is unchanged: 4/8 · 4/12 · 8/12 on the spacing
// series, off `--ui-scale`.
const BASE =
    "badge-atom inline-flex items-center justify-center gap-1.5 rounded-badge font-semibold whitespace-nowrap [&_svg:not([class*=size-])]:size-[1em] [&_svg]:shrink-0 [&_svg]:pointer-events-none";
const VARIANT = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "badge-atom--outline text-foreground",
} as const;
const TONE = {
    neutral: "",
    // The dark plate is the TOKEN, not a literal: `--destructive` is the one
    // two-job token (error ink + destructive plate) and its dark arm is sized to
    // clear both — 6.08:1 under the warm ink this tone now wears. An arbitrary
    // `dark:bg-[…]` plate wins the cascade over `bg-destructive` while still
    // wearing `text-destructive-foreground`, so it holds a contrast figure no
    // token gate can measure (this one shipped at 2.98:1 once the ink derived).
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground",
} as const;
const SIZE = {
    sm: "text-[length:var(--type-caption)] leading-[1.1] [--mark-pad-block:--spacing(1)] [--mark-pad-inline:--spacing(2)]",
    md: "text-[length:var(--control-label)] leading-[1.1] [--mark-pad-block:--spacing(1)] [--mark-pad-inline:--spacing(3)]",
    lg: "text-[length:var(--control-text)] leading-[1.1] [--mark-pad-block:--spacing(2)] [--mark-pad-inline:--spacing(3)]",
} as const;

export interface BadgeVariants {
    variant?: keyof typeof VARIANT | null;
    tone?: keyof typeof TONE | null;
    size?: keyof typeof SIZE | null;
    class?: ClassValue;
    className?: ClassValue;
}

/** The axis defaults the class map applies — the SAME source the host stamps from. */
export const BADGE_AXIS_DEFAULTS = {
    variant: "default",
    tone: "neutral",
    size: "md",
} as const satisfies Required<Pick<BadgeVariants, "variant" | "tone" | "size">>;

export function badgeVariants(options: BadgeVariants = {}): string {
    return joinClassValues(
        BASE,
        VARIANT[options.variant ?? BADGE_AXIS_DEFAULTS.variant],
        TONE[options.tone ?? BADGE_AXIS_DEFAULTS.tone],
        SIZE[options.size ?? BADGE_AXIS_DEFAULTS.size],
        options.class,
        options.className,
    );
}
