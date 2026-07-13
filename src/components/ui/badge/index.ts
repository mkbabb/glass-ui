import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  // AW.W25 — `transition-control` (border/shadow/transform/color uniformly).
  // AW.W26 — the shadcn-2025 icon-sizing/gap idiom + `wrap-anywhere` value slot
  // (a long value breaks within the badge rather than overflowing its clip).
  // AX.W51 D18 — the un-sized GLYPH reads `--ui-glyph-sm` (the scaled `size-3.5`
  // register — a badge is a smaller control, so the quieter glyph rung), grown on
  // the ONE comfort axis with the size-rung fonts below.
  // BD.W-GLASS-ATOM-REGISTER — `badge-atom` carries the loud-register family
  // signature (the keyed warm rim so the pill has a DEFINED edge over a cream
  // panel — the `border-transparent` melt fix, the press-squish, the idle-soft
  // cel that `data-cast` intensifies). The `border` keyword is RETIRED from the
  // base (it forced a transparent 1px on every variant — the live melt); the rim
  // is the defined edge now, and `surface="glass"` routes the quiet register.
  'badge-atom focus-ring inline-flex items-center gap-1.5 rounded-badge font-semibold transition-control wrap-anywhere [&_svg:not([class*=size-])]:size-(--ui-glyph-sm) [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // AY.W-PRIM-POLISH D4 — the dark destructive plate is DEEPENED at the
        // badge so the 14px/600 light-ink label clears AA. The shared dark
        // `--destructive` (hsl(0 80% 60%) = rgb(235,71,71)) painted only 3.07:1
        // under `--destructive-foreground` text — a contrast miss the loud-pill
        // allowlist does NOT excuse. The `dark:` plate drops to hsl(0 70% 45%)
        // (rgb(195,34,34) → 4.75:1 over the rgb(232,231,227) text), preserving
        // the saturated-red loud register. Light passes (4.7), so only the dark
        // arm is re-pointed; the shared `--destructive` token is UNTOUCHED (other
        // destructive consumers — Button, input invalid-ring — keep their value).
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 dark:bg-[hsl(0_70%_45%)] dark:hover:bg-[hsl(0_70%_45%)]/85',
        // `outline` keeps a real border (it IS the edge) but reads the warm keyed
        // rim ink, not a melting transparent line.
        outline: 'badge-atom--outline text-foreground',
        // Status-tier variants — consume the canonical `--success / --warning
        // / --info` plate + `--{success,warning,info}-foreground` glyph
        // tokens (declared at tokens.css:244-256). Per audit U.W0.B-b
        // §"glass-ui gaps".
        success:
          'bg-success text-success-foreground hover:bg-success/80',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning/80',
        info:
          'bg-info text-info-foreground hover:bg-info/80',
      },
      size: {
        // AX.W51 D18 — the badge font rungs ride the ONE comfort axis: sm reads the
        // quieter `--control-text-sm` (scaled `text-xs`), md the `--control-text`
        // workhorse (scaled `text-sm`), lg the scaled body register, so the badge's
        // three-rung scale grows in lockstep on a `--ui-scale` override.
        // BI.W-BADGE-ALIGN (GEO-8/UF-A6) — the line-height is a RELATIVE unitless
        // `leading-[1.1]`, NOT a fixed `leading-4/5/6` px. The font tracks `--ui-scale`
        // (12/14/16px at rest → ~18/21/24px at coarse 1.5×) but the prior fixed px
        // line-box (16/20/24px) could not grow with it — at coarse the font OVERFLOWED
        // the box and at rest the taller-than-font line-box drifted the glyph optical
        // center low ("rose" badge sat low). A unitless 1.1 makes the line-box = 1.1×
        // the scaled font, so the box tracks the font at every scale and the glyph
        // (`--ui-glyph-sm`, also `--ui-scale`-scaled) shares ONE optical center with
        // the text via the base `items-center` — at rest AND at coarse.
        sm: 'text-[length:var(--control-text-sm)] leading-[1.1] px-2 py-0.5',
        md: 'text-[length:var(--control-text)] leading-[1.1] px-2.5 py-1',
        lg: 'text-[length:calc(var(--type-body)*var(--ui-scale))] leading-[1.1] px-3 py-1.5',
      },
      // BD.W-GLASS-ATOM-REGISTER — the TWO registers (the family's load-bearing
      // split): `loud` is the opaque saturated identity pill (default — a `success`
      // badge is information, NOT see-through; the AA-ratified plates are kept),
      // `glass` is the quiet transmissive `.glass-atom` capsule tinted via the
      // shared `--glass-fill-tint` axis. `glass` composes the warm-glass body; the
      // variant `bg-*` opaque plate is retired by the `.badge-atom--glass` rule so
      // the warm capsule + the data-hue tint paint the surface.
      // BG.W-GLASS-CONSUMER-BAND — the glass register reads the SHARED plate/rim
      // pair: the `.glass-atom` body composes `--glass-fill-tinted` (the ONE
      // per-instance data-hue plate, tokens/glass.css) reading this `--glass-fill-
      // tint` axis, so a semantic badge (destructive/success/info) now carries its
      // hue on the plate (the prior fork mixed a FIXED warm cream). The rim is the
      // capsule's shared `--glass-material-rim`; ONE plate, ONE rim — no per-variant
      // re-spell.
      surface: {
        loud: '',
        glass: 'badge-atom--glass glass-capsule glass-atom',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      surface: 'loud',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
