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
 *   standard — the CONTINUOUS ROUNDED CYLINDER: a THICK glass capsule track with
 *              the round knob INSCRIBED inside it (knob diameter = track height −
 *              2×inset, inset 2px) so the whole reads as ONE continuous piece — a
 *              ball-bearing seated in the cylinder, never a floating disc on a
 *              wire. The fill is the W52 liquid-glass material (backdrop + edge
 *              rim, tinted to `--primary`) pulled along the capsule; the knob
 *              rides ON it with zero protrusion (`thumbAlignment: 'contain'`).
 *              The reka SliderThumb stays mounted (a11y/keyboard/focus) and
 *              carries a faint specular grip. Halo-on-state + the iOS press
 *              spring. This is the general-purpose glass scrubber and the default.
 *   spectrum — the value.js gradient-track color slider: a tall capsule whose
 *              background is a consumer-supplied `--slider-track-bg`
 *              linear-gradient (the LCH/hue ramp), a transparent range, and a
 *              SQUIRCLE thumb the HEIGHT of the track (the iOS color-picker
 *              idiom — `corner-shape: superellipse()` via `--corner-shape-thumb`,
 *              @supports-gated over a generous proportional round fallback that
 *              reads squircle-adjacent cross-engine). This is the aurora/blob
 *              color-picking surface. The spectrum already obeys the containment
 *              law the standard cylinder now matches (thumb inscribed, protrusion 0).
 *
 * Sizes — the standard cylinder inscribes the knob: track height = thumb + 4px
 * (a 2px inset reveal each side), thumb diameter ≤ track height at every rung:
 *   sm — 12px track / 8px thumb
 *   md — 20px track / 16px thumb (default)
 *   lg — 28px track / 24px thumb
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
        // The CONTINUOUS CYLINDER: the track is THICK and the knob is INSCRIBED —
        // track height = thumb diameter + 4px (a 2px inset reveal each side), so
        // the knob is seated inside the capsule (protrusion 0), not floating on a
        // wire. thumb ≤ track at every rung (the §RE-GROUND-2 containment law).
        sm: '[--slider-track-height:0.75rem] [--slider-thumb-size:0.5rem]',
        md: '[--slider-track-height:1.25rem] [--slider-thumb-size:1rem]',
        lg: '[--slider-track-height:1.75rem] [--slider-thumb-size:1.5rem]',
      },
    },
    defaultVariants: {
      variant: 'standard',
      size: 'md',
    },
  },
)

export type SliderVariants = VariantProps<typeof sliderVariants>
