import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // Base: compose with btn-pill from glass.css
  'btn-pill whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Outline: stronger border + full-opacity foreground so the
        // label reads cleanly over translucent glass backgrounds.
        outline:
          'border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-background/60 text-foreground hover:bg-accent/60 hover:text-foreground hover:border-[color-mix(in_srgb,var(--border)_90%,transparent)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Glass library modifier classes:
        accent: 'btn-pill-accent',
        ghost: 'btn-pill-ghost',
        glass: 'btn-pill-glass',
        // Glass-subtle: full-opacity text (was 70%) — the glass surface
        // already softens the button; a second 30% desaturation on the
        // label just made it unreadable.
        'glass-subtle':
          'glass-subtle text-foreground hover:border-[color-mix(in_srgb,var(--border)_60%,transparent)] hover:text-foreground',
        ai: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-400',
        'danger-subtle': 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-full px-2',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
