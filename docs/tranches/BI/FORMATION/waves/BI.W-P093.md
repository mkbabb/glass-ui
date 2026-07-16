# BI.W-P093 — Slider single-owner contract

**Status:** IMPLEMENTED — NATIVE VALUE-MARK ACCEPTANCE PENDING

## Product contract

`Slider` remains one Reka control for single and range values. `min`, `max`, `step`,
orientation, inversion, keyboard, pointer, touch arbitration, form submission,
dock hold, and value/valueCommit events still pass through that owner.

Its public visual surface is deliberately small:

- `variant="standard|spectrum"` selects the continuous glass binding rail or the
  consumer-tinted spectrum rail.
- `size="sm|md|lg"` changes visible rail and spectrum-thumb geometry.
- `marks` paints sorted, decorative interior checkpoints without snapping the model.
- `invalid` reflects an error boundary and `aria-invalid` on every semantic thumb.
- `motion="full|reduced|off"` uses the existing shared motion axis.

## Shipped

- Deleted the public `sliderVariants` CVA and `SliderVariants` type. Typed props and
  colocated `[data-variant]` / `[data-size]` CSS are the only recipe authority.
- Preserved Reka's single/range, min/max/step, orientation, inversion, keyboard,
  touch, form, and event behavior.
- Kept the existing dock-hold and bounded velocity bridge rather than adding a second
  drag or spring owner.
- Added a real coarse-pointer 44px root hit region while leaving the visible rail
  unchanged. Decorative marks remain pointer-transparent.
- Added explicit story states for single, range, vertical, disabled, invalid,
  keyboard, touch, and reduced motion.

## Verification

Focused units cover the one-symbol runtime surface, typed state attributes, invalid
description linkage, single/range keyboard updates, mark normalization, orientation,
disabled behavior, reduced motion, and dock hold. Source typecheck and the library
build, including emitted declarations, pass.
