import { type VariantProps, cva } from 'class-variance-authority'

export { default as Select } from './Select.vue'
export { default as SelectValue } from './SelectValue.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectGroup } from './SelectGroup.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as SelectLabel } from './SelectLabel.vue'
export { default as SelectSeparator } from './SelectSeparator.vue'
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue'
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue'

// Trigger CVA — `default` is the existing glass-subtle pill, `ghost` strips
// chrome (transparent + no border/shadow), `cartoon` matches Button cartoon
// (cream surface + 2px border + accent-tinted cartoon shadow).
export const selectTriggerVariants = cva(
  'flex h-10 w-full items-center justify-between px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all',
  {
    variants: {
      variant: {
        default: 'glass-subtle rounded-full',
        ghost: 'bg-transparent border-none shadow-none rounded-full',
        cartoon:
          'bg-[var(--cream)] text-[var(--cream-foreground)] border-2 border-[var(--border)] rounded-md shadow-[var(--shadow-cartoon-accent)] hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)] active:translate-y-0 active:shadow-[var(--shadow-cartoon-sm)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>
