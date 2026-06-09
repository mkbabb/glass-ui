import { type VariantProps, cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarImage } from './AvatarImage.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'

export const avatarVariants = cva(
  'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
  {
    variants: {
      size: {
        // AX.W51 D18 — the `sm` avatar is a control-register surface (the h-10
        // rung), so it reads the `--control-h-md` comfort cohort. The `base`/`lg`
        // avatars are DISPLAY surfaces (64/128px hero glyphs, not touch targets),
        // off the comfort axis by the no-overfit scope discipline.
        sm: 'h-[var(--control-h-md)] w-[var(--control-h-md)] text-xs',
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

export type AvatarVariants = VariantProps<typeof avatarVariants>
