import { type VariantProps, cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarImage } from './AvatarImage.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-xs',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl',
      },
      shape: {
        // Avatar `circle`: `rounded-pill` paints the canonical pill radius
        // through the `--radius-pill` token. The literal `rounded-full` would
        // also work but `rounded-pill` keeps the consumer site monotonic with
        // the rest of the v0.8.6 radius vocabulary.
        circle: 'rounded-pill',
        square: 'rounded-input',
      },
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
