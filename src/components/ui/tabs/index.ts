import { type VariantProps, cva } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsIndicator } from './TabsIndicator.vue'

// `default` keeps the existing list chassis (rounded-md container).
// `pill` exposes a rounded-full container that hosts pill-shaped triggers.
export const tabsListVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'h-10 rounded-md p-1',
        pill: 'h-10 rounded-full bg-[var(--glass-bg-subtle)] border border-[var(--glass-border-default)] p-1 gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabsListVariants = VariantProps<typeof tabsListVariants>

// `default` is the rounded-sm trigger (current behaviour).
// `pill` rounds to full and tints on active.
export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:pointer-events-none disabled:opacity-50 hover:text-foreground/70',
  {
    variants: {
      variant: {
        default:
          'rounded-sm p-1 px-3 data-[state=active]:text-[var(--active-tab-color,var(--foreground))]',
        pill: 'rounded-full px-3 py-1 data-[state=active]:bg-[var(--glass-bg-medium)] data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
