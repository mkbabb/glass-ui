import { type VariantProps, cva } from 'class-variance-authority'

export { default as Slider } from './Slider.vue'

/**
 * Slider variant + size axes.
 *
 * The CVA emits Tailwind arbitrary CSS-variable classes on the SliderRoot.
 * The SFC's scoped CSS keys off `[data-variant]` for substrate-recipe
 * selectors — variant determines how `.slider-track`, `.slider-range`, and
 * `.slider-thumb` paint. The size axis lifts pure geometry via CSS vars
 * (`--slider-track-height`, `--slider-thumb-size`) the SFC defaults read.
 *
 * Variants:
 *   standard      — glass track + circular thumb (baseline)
 *   spectrum      — tall muted track + thin bar thumb
 *   timeline      — glass-wash scrub track with disc thumb
 *   glass-pill    — pill-shape track + glass-wash substrate + halo thumb
 *   glass-cartoon — cartoon-bordered thumb + 2px-border track + cartoon shadow
 *
 * Sizes:
 *   sm — 4px track / 12px thumb
 *   md — 6px track / 16px thumb (default; matches HEAD)
 *   lg — 12px track / 24px thumb
 */
export const sliderVariants = cva(
  // Base — geometry + a11y. Variant + size classes append below.
  'glass-slider focus-ring relative flex w-full touch-none select-none items-center transition-colors',
  {
    variants: {
      variant: {
        standard: '',
        spectrum: '',
        timeline: '',
        'glass-pill': '',
        'glass-cartoon': '',
      },
      size: {
        sm: '[--slider-track-height:0.25rem] [--slider-thumb-size:0.75rem]',
        md: '[--slider-track-height:0.375rem] [--slider-thumb-size:1rem]',
        lg: '[--slider-track-height:0.75rem] [--slider-thumb-size:1.5rem]',
      },
    },
    defaultVariants: {
      variant: 'standard',
      size: 'md',
    },
  },
)

export type SliderVariants = VariantProps<typeof sliderVariants>
