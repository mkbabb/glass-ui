import { cva, type VariantProps } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  // AX.W51 D18 — the alert's control FONT reads `--control-text` (scaled `text-sm`)
  // and its glyph reads `--ui-glyph` (scaled `size-4`), so both ride the ONE comfort
  // axis. The layout grid + translate are geometry, unchanged.
  'relative w-full rounded-lg border px-4 py-3 text-[length:var(--control-text)] grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-(--ui-glyph) [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        // AX.W54 — GLASS-FIRST. An Alert is a content panel, so its surface is
        // the glass WASH tier (`--glass-bg-wash` + `--glass-blur-wash`), not an
        // opaque `bg-card` plate. The body text stays `--card-foreground` for
        // legibility; the semantic TONE rides ON the glass.
        default: 'bg-(--glass-bg-wash) [backdrop-filter:var(--glass-blur-wash)] text-card-foreground',
        // BA.W-FEEDBACK-TONE — the tone SOURCE unifies onto the shared `--feedback-
        // tone-*` family. Alert is already the CORRECT SHAPE (glass plate + tone on
        // rim/glyph, never an opaque fill — the convergence model the wave names), but
        // it HARDCODED its `border-<tone>/40` rim per variant (three calibration sites
        // across the feedback band). Each toned variant now composes
        // `feedback-tone feedback-tone-<name>` and RE-POINTS the tone rung to the wash
        // tier (`--feedback-tone-rung: var(--glass-bg-wash)`), so a tone recalibration
        // is ONE edit (the F-4 "no single knob" fixed). The wash RUNG is RETAINED — a
        // content panel rides wash, not floating; only the tone SOURCE unifies. The
        // tinted-glass wash is the same content-band whisper (the bounded mix %), never
        // a loud saturated plate (Badge/Toast's register).
        destructive:
          'feedback-tone feedback-tone-destructive [--feedback-tone-rung:var(--glass-bg-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90',
        success:
          'feedback-tone feedback-tone-success [--feedback-tone-rung:var(--glass-bg-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90',
        warning:
          'feedback-tone feedback-tone-warning [--feedback-tone-rung:var(--glass-bg-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90',
        info:
          'feedback-tone feedback-tone-info [--feedback-tone-rung:var(--glass-bg-wash)] [backdrop-filter:var(--glass-blur-wash)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
