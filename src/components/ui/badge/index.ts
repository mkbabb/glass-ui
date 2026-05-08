import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'focus-ring inline-flex items-center rounded-badge border font-semibold transition-colors',
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
        sm: 'text-xs leading-4 px-2 py-0.5',
        md: 'text-sm leading-5 px-2.5 py-1',
        lg: 'text-base leading-6 px-3 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
