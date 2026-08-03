# SegmentedTabs focus-cascade ownership correction — C50

Date: 2026-07-22 EDT  
Status: **FORWARD CORRECTION TO C49 · SPLIT PRODUCER/CONSUMER OWNERSHIP**

C49 remains immutable historical formation evidence. This receipt corrects its
focus-state attribution.

## Exact live mechanism

At SCI Home 390px, the shipped Glass mobile trigger rests with
`rounded-pill`, computed radius `9999px`, and rect `x20 y464.7 w80 h40`.
After opening the shipped Select and choosing `The funds`, the same element and
class computes `x20 y402.2 w105.24 h40` with radius **4px**, 2px outline, and
focus shadow.

The radius teleport is not authored by SegmentedTabs or Select. Atlas
`src/design/foundations/base.css:54-67`, full-file SHA-256
`9f51ab28554c9d53e9c11b28cf4d17da5aeba7b7b3edf460bac79548041212e5`,
globally matches interactive elements under `:focus-visible` and writes
`border-radius: var(--radius-mark)`, where `--radius-mark` is 4px. That consumer
rule overrides the shipped Glass focus-ring radius in the actual cascade.

## Binding split

- Unfocused/default mobile-trigger shape, padding, material tier, menu
  composition, and label-width policy remain existing Glass R-TABS/G5 producer
  design questions.
- The focus-visible radius change from 9999px to 4px is an **Atlas consumer
  global-style collision**. It routes to SCI/Atlas addenda. Glass must not add a
  specificity contest, Atlas-specific selector accommodation, or new API to
  absorb it.
- Immutable post-cut integration still proves the public Glass component radius
  survives the Atlas cascade; that proof does not transfer ownership of the
  offending write to Glass.

## Born-RED integration proof

Across rest, open, selected, focus-visible, blur, and keyboard traversal, the
declared component radius must remain invariant unless an explicit public
component API changes it. A mutation restoring the Atlas global
`border-radius` focus write must turn the integration detector RED.

This correction authorizes no Glass or Atlas product edit, package repin, or
acceptance claim.
