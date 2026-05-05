import { type VariantProps, cva } from 'class-variance-authority'

export { default as Input } from './Input.vue'

// Input CVA — `default` keeps the existing input-pill chassis; `cartoon`
// swaps to the cream + 2px-border + cartoon-shadow modern-skeuo recipe.
export const inputVariants = cva(
  'text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium',
  {
    variants: {
      variant: {
        default: 'input-pill',
        cartoon:
          'flex h-10 w-full px-3 py-2 bg-[var(--cream-warm)] text-[var(--cream-foreground)] border-2 border-[var(--border)] rounded-md shadow-[var(--shadow-cartoon-accent)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[var(--shadow-cartoon-md)] disabled:cursor-not-allowed disabled:opacity-50 transition-[transform,box-shadow]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>
