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
 * Exactly two canonical recipes ship:
 *   standard — the glass scrubber with the FULLY ROUNDED iOS knob: the fill is
 *              ONE continuous glass rounded-pill (W52 backdrop + edge rim,
 *              tinted to `--primary`) pulled left/right, and a round knob (a
 *              1:1 circle, `border-radius: 50%`) rides ON it so the fill flows
 *              straight under the knob's centre — continuous with the track,
 *              not a slim offset cap. The reka SliderThumb stays mounted
 *              (a11y/keyboard/focus) and carries a faint specular grip.
 *              Halo-on-state + the iOS press spring. This is the
 *              general-purpose glass scrubber and the default.
 *   spectrum — the value.js gradient-track color slider: a tall capsule whose
 *              background is a consumer-supplied `--slider-track-bg`
 *              linear-gradient (the LCH/hue ramp), a transparent range, and a
 *              SQUIRCLE thumb the HEIGHT of the track (the iOS color-picker
 *              idiom — `corner-shape: superellipse()` via `--corner-shape-thumb`,
 *              @supports-gated over a generous proportional round fallback that
 *              reads squircle-adjacent cross-engine). This is the aurora/blob
 *              color-picking surface.
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
