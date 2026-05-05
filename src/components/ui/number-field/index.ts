import { type VariantProps, cva } from 'class-variance-authority'

export { default as NumberField } from './NumberField.vue'
export { default as NumberFieldInput } from './NumberFieldInput.vue'
export { default as NumberFieldIncrement } from './NumberFieldIncrement.vue'
export { default as NumberFieldDecrement } from './NumberFieldDecrement.vue'
export { default as NumberFieldContent } from './NumberFieldContent.vue'

// Root-level CVA — `default` is the bare grid; `cartoon` wraps the input
// bar with the cream + 2px border + accent-tinted cartoon shadow recipe so
// the +/- buttons inherit the surface chrome rather than restyling each.
export const numberFieldVariants = cva(
  'grid gap-1.5',
  {
    variants: {
      variant: {
        default: '',
        cartoon:
          '[&_[data-slot=input]]:bg-[var(--cream-warm)] [&_[data-slot=input]]:text-[var(--cream-foreground)] [&_[data-slot=input]]:border-2 [&_[data-slot=input]]:border-[var(--border)] [&_[data-slot=input]]:rounded-md [&_[data-slot=input]]:shadow-[var(--shadow-cartoon-accent)] [&_[data-slot=input]]:transition-[transform,box-shadow] [&_[data-slot=input]]:focus-visible:shadow-[var(--shadow-cartoon-md)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>
