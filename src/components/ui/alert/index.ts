import { cva, type VariantProps } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
        // AW.W25 — semantic-tone parity. The success/warning/info tones read the
        // canonical `--{success,warning,info}` tokens (a tinted card surface + a
        // toned glyph/heading), retiring the demo's faked alert variants. The
        // body text stays `--card-foreground` for legibility; the TONE rides the
        // border, glyph, and description softening — content-band, not a loud
        // saturated plate (that is Badge/Toast's register).
        success:
          'bg-card text-card-foreground border-success/40 [&>svg]:text-success *:data-[slot=alert-description]:text-card-foreground/90',
        warning:
          'bg-card text-card-foreground border-warning/40 [&>svg]:text-warning *:data-[slot=alert-description]:text-card-foreground/90',
        info:
          'bg-card text-card-foreground border-info/40 [&>svg]:text-info *:data-[slot=alert-description]:text-card-foreground/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
