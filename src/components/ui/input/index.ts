import { type VariantProps, cva } from 'class-variance-authority'

export { default as Input } from './Input.vue'

// Input CVA — `default` keeps the existing input-pill chassis; `cartoon`
// composes the canonical `cartoon-surface` utility (cream-warm bg + 2px
// border + accent shadow) and layers field chrome (`rounded-md`,
// focus-visible elevation, disabled fade). Inputs do not push on hover —
// focus-visible steps up to the -md shadow tier.
export const inputVariants = cva(
  'text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium',
  {
    variants: {
      variant: {
        default: 'input-pill',
        cartoon:
          'cartoon-surface flex h-10 w-full px-3 py-2 rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[var(--shadow-cartoon-md)] disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>
