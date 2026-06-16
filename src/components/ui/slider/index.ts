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
        // BA.W-EMISSION (BA-VJS-A3): the size GEOMETRY moved OFF these arbitrary-
        // property CVA brackets (`[--slider-track-height:1.25rem]` &c.) into the
        // SFC's `[data-size]`-scoped CSS (Slider.vue, the proven in-file pattern the
        // spectrum recipe already uses). Those bracket utilities compiled ONLY into a
        // `dist/*.js` chunk no consumer content-scan reaches AND are rejected by the
        // P9 emitComponentUtilities safelist (fully-arbitrary brackets), so the `size`
        // prop was INERT in every consumer — a `size=md` standard slider rendered the
        // 6px fallback track (`--slider-track-height` undefined → the SFC's
        // `var(--slider-track-height, 0.375rem)` default). The variant keys (kept EMPTY
        // here) STILL drive `:data-size` on the root (Slider.vue `:data-size="s"`); the
        // `--slider-track-height`/`--slider-thumb-size` tokens are now set by the
        // shipped `[data-size]` rules that SHIP in dist/glass-ui.css. Locked by
        // proof:emission.
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'standard',
      size: 'md',
    },
  },
)

export type SliderVariants = VariantProps<typeof sliderVariants>
