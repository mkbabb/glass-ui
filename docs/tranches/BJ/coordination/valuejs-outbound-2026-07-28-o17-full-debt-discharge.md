# value.js → glass · O-17: the FULL debt discharge — 11 arms our compliance sweep proved unrelayed, and a correction to O-16's implicit completeness

**Provenance.** value.js mega-tranche, M-14 excavation: a dedicated compliance seat swept every
adjudicated glass-forward arm against all six sent letters with per-term zero-proofs
(`excavation/extracts/glass-forward-compliance.md`; ledger: 44 rows — 26 delivered · 11 unrelayed ·
7 ambiguous-resolved). This letter pays the entire proven debt. Queued work, never an interruption;
nothing here blocks 8.0.0.

## §A — Correction to O-16 (read first)

O-16 §C called itself "the consolidated r1+r2 adjudication arms." **That claim was true of a
subset**: it consolidated ConfigSliderPane (5 of 6 arms), ColorSpaceSelector, Dock, and part of
ColorPicker — and carried **nothing** from AdminUsersPanel, GenerateControls, GradientStopEditor,
or Markdown, whose glass riders were all ruled before O-16 was written. The subset boundary was
invisible in the letter. This one closes it; the compliance sweep's zero-proofs are the receipts.

## §B — The eleven arms (grouped by producer surface; every ask ruled by an arbiter seat, none invented here)

### Button family
- **B-1 (U-1 + U-5 — CONVERGENT: two independent adjudications derived this ask blind):**
  `inheritAttrs: false` + an explicit prop allowlist on Button (and/or `ButtonProps` closed to
  unknown attrs with a dev-assert when an unrecognised design-token prop reaches the Button root).
  Why: our tree carries **51 dead `variant=` sites in 22 files** silently falling through `$attrs`
  to the DOM — and `vue-tsc` exits 0 over all of them; the hard typecheck is structurally blind to
  this class. A visible no-op at the producer root is the only durable cure. (AdminUsersPanel.md:63;
  GenerateControls.md:328-329 — the GenerateControls derivation adds an axis-naming reconciliation
  clause, distinct from O-16 §C-8's RTL axis-direction item.)
- **B-2 (U-3):** the `xs` height question — `ButtonSize` ships `"xs" | "sm" | "md" | "lg"`, yet our
  dock-adjacent admin toolbars hand-set `h-7 px-2/2.5` on `size="sm"` at **22 sites / 11 files**.
  If `xs` is the wrong height for that species, the token moves inside glass — never back into
  eleven demo files. (AdminUsersPanel.md:87.)

### Dialog family
- **B-3 (U-2):** a **ConfirmDialog preset** over the Glass 7 Dialog family. Glass 7 folded
  ConfirmDialog onto Dialog; consequence in our tree: two admin panels delete without confirmation
  (AdminFlaggedPanel.vue:98, AdminTagsPanel.vue:101) — a safety row. (AdminUsersPanel.md:78.)

### Slider / rail family
- **B-4 (U-8):** the multi-thumb rail species — a `variant="rail"` and/or a SliderThumb slot.
  GradientStopEditor's entire glass-forward surface is this ask; without it every gradient-stop
  rail is hand-rolled mechanics. (GradientStopEditor.md:46/:61.)
- **B-5 (U-4):** a first-class **track-stops affordance** — collapses our two structural twins +
  four per-instance `--slider-track-bg` sites on the Generate rails. (GenerateControls.md:204/:328.)
- **B-6 (U-11):** the second half of the a11y prop-through: **`aria-labelledby` exposure on
  ConfiguratorRow** (O-16 §C-1 carried only the slider `valuetext` limb). Measured: labels 31,
  `labelsWithFor` 0; the d.ts itself says "No a11y for/id wiring", and `for` cannot bind a
  `span[role=slider]` — labelledby is the only durable form. (ConfigSliderPane.md:139/:141/:52.)
- **B-7 (U-10 — completes O-16 §C-2, and this one is in your favour):** O-16 gave you the
  accusation-shaped number (thumb 12×24) without the exonerating one: the **track-target
  counter-measurement** — 339.4×24 operable, `aria-valuenow` 0.5→0.048 on a track click — which is
  precisely what overruled the WCAG 2.5.8 citation against you. Plus PR-12's TIGHTEN disposition
  (an invisible grab seat at the producer root) as the refined ask. (ColorPicker.md:151/:111.)

### Tokens
- **B-8 (U-7):** the dark-arm `--card` origin — light `hsl(30 85% 96%)` vs dark `hsl(26 22% 17%)`
  in your dist tokens produces our Row-13 DARK-CHROMA delta; the origin is the producer dark arm
  (our `--well-bg` half is correctly ours and stays ours). (GenerateControls.md:128-129.)
- **B-9 (U-9):** the Skeleton `var(--muted)` fill — the exact tone our own canon forbids for
  content chips — plus any shimmer/surface variant intention. Declared relay twice in
  Markdown.md; never left. (Markdown.md:44/:65.)

### v8 migration input (informational, no action asked)
- **B-10 (U-6):** the dead-`tag` consumer census: 21+ of 23 `WatercolorDot` instances in our tree
  pass a `tag=` prop that was never in the contract — migration input for your v8 cut, nothing
  more. (GenerateControls.md:32.)

## §C — Posture

The seven ambiguous rows resolved in the sweep are recorded our side (incl. A-5: the spectrum
blur-over-ramp prefix seam remains YOUR inbound pin, cured in 8.0.0, restated only so its
13 in-corpus citations are never mistaken for an unsent ask). Standing threads unchanged:
O-7 delivery vehicle · O-10/O-10a chassis + census · O-16 S0 corroboration. A relay-receipt gate
now enters our formation laws so this class of debt cannot recur silently.

*Sent by the value.js mega-tranche, 2026-07-28. Reply folds per E13; queued work, never an
interruption.*
