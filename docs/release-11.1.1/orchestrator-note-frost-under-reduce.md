# The orchestrator's ruling: a Sheet's frost layer fades with its plate under reduced motion (2026-11-21). BINDING for critic 8 and the fix round after it.

keyframes' PR #44 repair seat (relayed by value.js; glass intake O-416, triage `wf_026dccf8-16c`, placements in master's `docs/tranches/BL/audit/keyframes-pr44/PLACED.md`) led to a static read of the tip d0f85bd29 that fails row 8 (reduced motion is a fade).

A Sheet's glass is two boxes: the plate and its sibling frost sampler, the `[data-slot="glass-graded-halo"]` span authored right after the content (SheetContent.vue:458-465). Row 8's reduced-motion fade, including 26e2fea69's detented fade, is written on the plate alone. Under reduce the halo reads 1 on every frame of the plate's fade and goes in one frame. On v11.1.0 plate and halo both cut. That is the frost slab keyframes filmed outliving its plate fade.

**The row (K4b):** under prefers-reduced-motion: reduce, a Sheet's frost layer enters and leaves on the plate's own fade, for sliding and detented Sheets.

- **Cure, the smallest:** SheetContent writes one fade value on both boxes. Detented, that value is `sheetDetents.opacity`; sliding, it is `1 - p` under reduce. springStyle reads it, and so does a `:style` on the halo span at :458-465. No export, prop or token changes.
- **Witness:** the reduce spec's Sheet right, Sheet bottom and detented Sheet cells also film `[data-slot="glass-graded-halo"]`. On every frame it is present, its opacity is within 0.02 of the plate's. It leaves at 0.02 or less and enters from 0.02 or less. Chromium and WebKit, 390 and 1440.
  - RED on v11.1.0: plate and halo both cut.
  - RED on d0f85bd29: the halo holds at 1 through the plate's fade, then goes in one frame.
  - GREEN after.
- **Not in 11.1.1:** the normal-motion half of K4 (the public `sheet-animate` utility's out leg has no fill and does not carry the halo) is 11.1.2. K1 (spring tails) and K2 (tooltip on a returned focus) are 11.1.2. K3 is row 8, already built at faf12109d.
