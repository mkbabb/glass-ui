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
  'tap-squish focus-ring inline-flex items-center justify-center gap-2 rounded-button text-[length:var(--control-text)] font-medium transition-control hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-disabled data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg:not([class*=size-])]:size-[var(--ui-glyph)] [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        card:
          'glass-card w-full transform-gpu cursor-pointer flex-col gap-4 p-8 text-center transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-fast ease-standard hover:bg-glass-quiet hover:text-foreground active:scale-95 data-[state=on]:border-glass-border-quiet data-[state=on]:bg-glass-quiet data-[state=on]:text-foreground data-[state=on]:shadow-glass-quiet',
        // AX.W… (E21/E23 — d-glassui M2) — the CONTROL-GLASS chip register. The
        // most-numerous control class (filter year-pills, Net-flow / Region /
        // Per-capita toggles) was a FLAT `color-mix` fill; `glass` moves it onto
        // the glass tier WITHOUT each call-site opting into the heavyweight `card`
        // surface. It composes the unified `.glass-wash` material (the quiet rim +
        // the wake-on-interaction moving specular `::before`) so the chip is one
        // rung QUIETER than the panel/drawer hull it sits in (the proportion law —
        // a control never out-frosts its host). REST = wash (the page reads through
        // the empty chip); HOVER = the specular wakes + a quiet fill rises; SELECT
        // (`data-[state=on]`) = the chip settles ONE rung up to `glass-quiet` with
        // the ink foreground and a quiet rim — a deliberate, calm "on", not the
        // hard `bg-accent` slab. The `bg-accent` from the base string is overridden
        // here (variant classes append after the base in the cva merge).
        glass:
          'glass-wash text-muted-foreground transition-[background-color,border-color,box-shadow,color] duration-fast ease-standard hover:bg-glass-quiet hover:text-foreground data-[state=on]:bg-glass-quiet data-[state=on]:border-glass-border-quiet data-[state=on]:text-foreground data-[state=on]:shadow-glass-quiet data-[state=on]:font-medium',
      },
      size: {
        // AX.W51 D18 — the height rungs read the `--control-h-*` comfort cohort.
        default: 'h-[var(--control-h-md)] px-3',
        sm: 'h-[var(--control-h-sm)] px-2.5',
        lg: 'h-[var(--control-h-lg)] px-5',
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
