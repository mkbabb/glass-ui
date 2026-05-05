import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // `color` is the freeform categorical variant. The consumer drives
        // hue via the `:color` prop and an optional `:icon` slot. The CVA
        // bucket keeps the bucket structure but layout is otherwise blank
        // so the inline style + slot drive the visual.
        color:
          'border-transparent bg-[color-mix(in_srgb,var(--badge-color,var(--foreground))_18%,transparent)] text-[var(--badge-color,var(--foreground))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

// `tone` is orthogonal to `variant`. It overlays a semantic colour pair
// (success / warning / destructive / info) plus a default Lucide icon (which
// the consumer can override via the `:icon` slot). When `tone` is set it
// composes _on top of_ the resolved variant classes — variant chooses the
// chassis, tone tints it semantic.
export const badgeToneVariants = cva('', {
  variants: {
    tone: {
      success:
        'bg-[color-mix(in_srgb,var(--success)_18%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]',
      warning:
        'bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]',
      destructive:
        'bg-[color-mix(in_srgb,var(--destructive)_18%,transparent)] text-[var(--destructive)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]',
      info: 'bg-[color-mix(in_srgb,var(--info)_18%,transparent)] text-[var(--info)] border-[color-mix(in_srgb,var(--info)_30%,transparent)]',
    },
  },
})

export type BadgeToneVariants = VariantProps<typeof badgeToneVariants>

export type BadgeTone = NonNullable<BadgeToneVariants['tone']>
