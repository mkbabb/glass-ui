import { type VariantProps, cva } from 'class-variance-authority'

// V.W2 T4 — empty-wrapper decisions:
// Sheet / SheetTrigger / SheetClose are pure forwarding wrappers around
// reka-ui's DialogRoot / DialogTrigger / DialogClose (Sheet renames Dialog
// for semantic clarity). Per B3 §2.6: Vue SFCs cannot be 1-line re-exports.
// Decision: KEEP all three — the wrapper provides the Sheet/Dialog rename
// at compile time and forwards props/emits with reka-ui's typed pattern.
export { default as Sheet } from './Sheet.vue'
export { default as SheetTrigger } from './SheetTrigger.vue'
export { default as SheetClose } from './SheetClose.vue'
export { default as SheetContent } from './SheetContent.vue'
export { default as SheetHeader } from './SheetHeader.vue'
export { default as SheetTitle } from './SheetTitle.vue'
export { default as SheetDescription } from './SheetDescription.vue'
export { default as SheetFooter } from './SheetFooter.vue'

export const sheetVariants = cva(
  // Composes the canonical `sheet-animate` utility (utilities.css:449-454)
  // for the data-state animation pair — the prior literal `duration-300/-500`
  // bypassed the canon (audit U.W0.C-a §2.3).
  // BB.W-CARD-PAD — the overlay-band golden padding ladder: the inline anchor is
  // --spacing(6) = 24px, the block axis lifts by sqrt-phi (`*1.272`) so the
  // heading clears the top edge. `gap-4` between sections STAYS.
  // BG.W-SHEET-INSET-ROOT — the CVA carries ONLY DECORATION. The STRUCTURAL
  // positioning (position/inset/size/z-index) is STRIPPED off these class strings
  // and lives in the PRECOMPILED src/styles/sheet.css rule keyed off
  // [data-slot="sheet-content"][data-side] — a Tailwind arbitrary/layout utility
  // dies in a consumer's content-scan (the D7 configurator-drawer break, the P9
  // emission class), so an overlay Content's geometry must ship as attribute-selector
  // CSS, never a load-bearing utility. SheetContent.vue mints the data-slot/data-side
  // hooks the shipped rule keys off. Locked by proof:emission (overlay-band inverse).
  'gap-4 glass-floating [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) transition ease-in-out sheet-animate',
  {
    variants: {
      side: {
        top: 'border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
            'border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
            'border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>
