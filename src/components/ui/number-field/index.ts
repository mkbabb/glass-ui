import { type VariantProps, cva } from 'class-variance-authority'

export { default as NumberField } from './NumberField.vue'
export { default as NumberFieldInput } from './NumberFieldInput.vue'
export { default as NumberFieldIncrement } from './NumberFieldIncrement.vue'
export { default as NumberFieldDecrement } from './NumberFieldDecrement.vue'
export { default as NumberFieldContent } from './NumberFieldContent.vue'

// Root-level CVA — bare grid; the cartoon variant flows to the inner input
// via provide/inject (see `NumberField.vue` + `NumberFieldInput.vue`),
// matching the Tabs precedent. The root no longer pushes styles onto
// descendants via `[&_[data-slot=input]]:` selectors.
export const numberFieldVariants = cva('grid gap-1.5', {
  variants: {
    variant: {
      default: '',
      cartoon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>

// Input-level CVA — `default` is the bare-chassis field; `cartoon` composes
// the canonical `cartoon-surface` utility plus field chrome (matches Input
// cartoon's contract). NumberFieldInput.vue resolves the variant by
// injecting `glassNumberField` from its NumberField parent.
export const numberFieldInputVariants = cva(
  'flex h-10 w-full py-2 text-sm text-center placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-md border border-input bg-background focus-visible:shadow-[var(--focus-ring-shadow)]',
        cartoon:
          'cartoon-surface rounded-md focus-visible:shadow-[var(--shadow-cartoon-md)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type NumberFieldInputVariants = VariantProps<typeof numberFieldInputVariants>
