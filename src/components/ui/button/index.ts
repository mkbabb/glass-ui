import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // Base: compose with btn-pill from glass.css
  'btn-pill whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_hsl(var(--ring)/0.3),0_0_8px_hsl(var(--ring)/0.15)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Glass library modifier classes:
        accent: 'btn-pill-accent',
        ghost: 'btn-pill-ghost',
        glass: 'btn-pill-glass',
        'glass-subtle':
          'bg-transparent border border-[hsl(var(--border)/0.3)] backdrop-blur-sm text-foreground/70 hover:border-[hsl(var(--border)/0.5)] hover:text-foreground',
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
