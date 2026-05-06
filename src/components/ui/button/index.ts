import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // Base: compose with btn-pill from glass.css.
  // Four-state contract enforced per variant below; shared base locks down
  // focus-visible ring, disabled geometry, and press scale via tokens.
  'btn-pill whitespace-nowrap text-sm font-medium cursor-pointer active:scale-[var(--scale-press-btn)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 aria-pressed:bg-primary/85',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 aria-pressed:bg-destructive/85',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80 aria-pressed:bg-accent aria-pressed:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 aria-pressed:bg-secondary/60',
        accent:
          'bg-accent text-accent-foreground border border-border/40 hover:bg-accent/80 active:bg-accent/70 aria-pressed:bg-accent/60',
        ghost:
          'bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground',
        glass:
          'bg-[var(--glass-bg-subtle)] border border-[var(--glass-border-default)] text-foreground backdrop-blur-[var(--glass-blur-subtle)] hover:bg-[var(--glass-bg-medium)] hover:border-[var(--glass-border-medium)] hover:shadow-md active:bg-[var(--glass-bg-elevated)] active:border-[var(--glass-border-elevated)] aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-medium))]',
        'glass-wash':
          'glass-wash text-foreground/70 hover:bg-foreground/[0.04] hover:border-[color-mix(in_srgb,var(--foreground)_20%,transparent)] hover:text-foreground active:bg-foreground/[0.08] aria-pressed:bg-foreground/[0.1] aria-pressed:text-foreground',
        ai: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 active:bg-amber-500/35 dark:text-amber-400 aria-pressed:bg-amber-500/30',
        'danger-subtle':
          'bg-destructive/10 text-destructive hover:bg-destructive/20 active:bg-destructive/30 aria-pressed:bg-destructive/25',
        link: 'text-primary underline-offset-4 hover:underline active:opacity-80 active:scale-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-full px-2 text-xs',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
