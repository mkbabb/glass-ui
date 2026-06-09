import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  // AW.W25 — `transition-control` (border/shadow/transform/color uniformly).
  // AW.W26 — the shadcn-2025 icon-sizing/gap idiom + `wrap-anywhere` value slot
  // (a long value breaks within the badge rather than overflowing its clip).
  // AX.W51 D18 — the un-sized GLYPH reads `--ui-glyph-sm` (the scaled `size-3.5`
  // register — a badge is a smaller control, so the quieter glyph rung), grown on
  // the ONE comfort axis with the size-rung fonts below.
  'focus-ring inline-flex items-center gap-1.5 rounded-badge border font-semibold transition-control wrap-anywhere [&_svg:not([class*=size-])]:size-[var(--ui-glyph-sm)] [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Status-tier variants — consume the canonical `--success / --warning
        // / --info` plate + `--{success,warning,info}-foreground` glyph
        // tokens (declared at tokens.css:244-256). Per audit U.W0.B-b
        // §"glass-ui gaps".
        success:
          'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        info:
          'border-transparent bg-info text-info-foreground hover:bg-info/80',
      },
      size: {
        // AX.W51 D18 — the badge font rungs ride the ONE comfort axis: sm reads the
        // quieter `--control-text-sm` (scaled `text-xs`), md the `--control-text`
        // workhorse (scaled `text-sm`), lg the scaled body register, so the badge's
        // three-rung scale grows in lockstep on a `--ui-scale` override.
        sm: 'text-[length:var(--control-text-sm)] leading-4 px-2 py-0.5',
        md: 'text-[length:var(--control-text)] leading-5 px-2.5 py-1',
        lg: 'text-[length:calc(var(--type-body)*var(--ui-scale))] leading-6 px-3 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
