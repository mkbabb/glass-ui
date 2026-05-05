import { type VariantProps, cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        // `card` — tier-aware toggle: bg-secondary at rest; glass-medium tier
        // + cartoon-sm shadow + border on `data-[state=on]`.
        card:
          'rounded-[var(--radius-lg)] p-[var(--space-phi-2)] bg-[var(--secondary)] border border-transparent transition-[background,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=on]:bg-[var(--glass-bg-medium)] data-[state=on]:shadow-[var(--shadow-cartoon-sm)] data-[state=on]:border-border',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
