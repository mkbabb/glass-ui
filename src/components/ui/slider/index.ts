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
 *   standard — the CONTINUOUS GLASS CYLINDER with NO VISIBLE THUMB AT ALL (the
 *              user's binding bar, USER-AUDIT-2026-06-10 §B3): you pull the TRACK
 *              itself. A THICK glass capsule track; the filled `.slider-range`
 *              glass cylinder (the W52 liquid-glass material — backdrop + edge rim,
 *              tinted to `--primary`) is pulled along it, and its leading EDGE IS
 *              the handle — the only affordance is the fill edge + the cursor/touch
 *              response. The reka `<SliderThumb>` STAYS MOUNTED (a11y/keyboard/drag/
 *              value-follow native on it) but paints INVISIBLE: width 0, opacity 0,
 *              transparent — no distinct disc/cap/ring over the continuous
 *              cylinder. Keyboard focus rings the TRACK (the W-PRIM-POLISH focus
 *              register), not the invisible thumb; hover/held lift the track FILL's
 *              edge rim; the iOS press spring gives the whole fill a felt squish.
 *              This is the general-purpose glass scrubber and the default.
 *   spectrum — the value.js gradient-track color slider: a tall capsule whose
 *              background is a consumer-supplied `--slider-track-bg`
 *              linear-gradient (the LCH/hue ramp), a transparent range, and a
 *              THIN VISIBLE squircle thumb the HEIGHT of the track (the iOS/value.js
 *              color-picker idiom — a slim vertical bar, `w-3`-thin per the value.js
 *              reference; `corner-shape: superellipse()` via `--corner-shape-thumb`,
 *              @supports-gated over a generous proportional round fallback that
 *              reads squircle-adjacent cross-engine). This is the aurora/blob
 *              color-picking surface — its thumb IS visible (it is the handle).
 *
 * Sizes — the standard cylinder is the thick glass capsule (the invisible thumb's
 * value-follow inset still rides the size token for the 44px coarse hit-halo):
 *   sm — 12px track
 *   md — 20px track (default)
 *   lg — 28px track
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
        // The CONTINUOUS GLASS CYLINDER: the track is THICK; the standard slider
        // paints NO VISIBLE THUMB (the filled track edge is the handle). The
        // `--slider-thumb-size` token still rides each rung — it sizes the spectrum
        // recipe's VISIBLE thin thumb (0.6×) and the standard's invisible thumb's
        // value-follow inset / the 44px coarse hit-halo. thumb ≤ track at every
        // rung (the inscription law the spectrum squircle still obeys).
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
