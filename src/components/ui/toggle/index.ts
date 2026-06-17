import { type VariantProps, cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'

/**
 * `card` variant — AC.W8e (glass-ui v1.7.0).
 *
 * Hoist of speedtest FlowSelector's 17-class glass-card recipe. The pattern
 * (icon-over-label-over-description on a `.glass-card` surface, hover quiet
 * fill, `data-state="on"` selected fill + border, active scale press) is
 * generic enough that other consumers (survey wizards, mode pickers,
 * settings picker grids) will hit the same shape. The variant bakes:
 *  - the quiet glass surface ladder (`.glass-card` base + hover/selected
 *    `--glass-{bg,border,shadow}-quiet` tier composition)
 *  - the column-stack interior (`flex-col`, `gap-4`, `p-8`, `text-center`)
 *  - `data-state="on"` + `:hover` contracts threaded through glass tokens,
 *    not raw `bg-accent` (which would shadow the card surface)
 *  - the active-press scale (`active:scale-95`) for tactile affordance
 *
 * Reads through `.glass-card` so consumers retint via the existing glass
 * token cascade (`--glass-bg-quiet`, `--glass-border-quiet`, etc.) rather
 * than re-declaring the surface at the consumer.
 */
export const toggleVariants = cva(
  // AW.W25 — `transition-control` (border/shadow/transform/color, not just
  // color) + `.tap-squish` for the iOS press-spring; the four-state contract.
  // AW.W26 — the shadcn-2025 icon-sizing/gap idiom (un-sized child svg → the glyph
  // register, every svg non-shrinking + pointer-transparent; `cn()`'s `/^size-/`
  // bucket never collides a host-sized icon thanks to the `:not([class*=size-])`
  // guard).
  // AX.W51 D18 — the control FONT reads `--control-text` (scaled `text-sm`), the
  // un-sized GLYPH reads `--ui-glyph` (scaled `size-4`), so both grow on the ONE
  // comfort axis with the height.
  'tap-squish focus-ring inline-flex items-center justify-center gap-2 rounded-button text-[length:var(--control-text)] font-medium transition-control hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-disabled data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        // BB.W-CONTROL-TOKENS (N11) — the card tile is a `p-8` glass-card
        // shape, so it must paint the 1rem `--radius-card` corner that matches
        // its `glass-card` surface vocabulary, NOT the base CVA's 10px
        // `rounded-button`. CVA emits the `variants` classes AFTER the base
        // string, so `rounded-card` here wins the source-order race against the
        // base `rounded-button` (the same mechanism the `h-auto` compoundVariant
        // relies on). `default`/`outline` keep the base `rounded-button` — a
        // button shape gets a button radius.
        card:
          'rounded-card glass-card w-full transform-gpu cursor-pointer flex-col gap-4 p-8 text-center transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-fast ease-standard hover:bg-glass-quiet hover:text-foreground active:scale-95 data-[state=on]:border-glass-border-quiet data-[state=on]:bg-glass-quiet data-[state=on]:text-foreground data-[state=on]:shadow-glass-quiet',
      },
      size: {
        // AX.W51 D18 — the height rungs read the `--control-h-*` comfort cohort.
        default: 'h-(--control-h-md) px-3',
        sm: 'h-(--control-h-sm) px-2.5',
        lg: 'h-(--control-h-lg) px-5',
      },
    },
    compoundVariants: [
      // The `card` variant is intrinsic-height by contract: it sizes to its
      // icon-over-label-over-description stack. The `size` axis governs the
      // *text/inline* toggle scale and must not impose a fixed `height` on a
      // card. CVA emits `compoundVariants` classes after the `variants`
      // classes, so this `h-auto` wins the source-order race against the
      // size token's `h-10`/`h-9`/`h-11` and the card sizes to its content.
      { variant: 'card', size: ['default', 'sm', 'lg'], class: 'h-auto' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
