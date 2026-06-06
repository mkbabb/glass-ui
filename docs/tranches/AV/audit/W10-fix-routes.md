# AV.W10 — FIX-ROUTE BOOK (four broken demos routed to their owning waves)

The storybook audit flagged four demos as broken. None is a binding-correctness
bug in the IA layer, so W10 does NOT fix them here — each belongs to a component
wave that owns the live verification. W10 only RELOCATES the `native-top-layer`
manifest row (into Containers, adjacent to Dialog) so the IA reads coherently;
the live fold + the other three live fixes are the owning waves'.

| # | Item | Symptom | Owning wave | Live verification the owning wave must do |
|---|---|---|---|---|
| a | native-top-layer | AQ.W6 pilot — capability-probe wiring unverified | Containers/Dialog component wave | Fold into `dialog` as a `:native` opt-in toggle; verify `commandfor` / `interestfor` / `.glass-top-layer` capability probe live |
| b | card shadow/grain toggles | "toggles don't work" — Switch v-model bound but state not reflecting on surface | Card component wave | Verify Switch `v-model` → CSS state-class reflection on the surface live |
| c | carousel progress | "progress bar broken" — only dots + counter pill exist, no continuous bar | Progress god-module wave (AV.W13) | Confirm dots + pager state sync at runtime; rename pager to "counter" OR add an explicit progress section. NOT a binding bug — a missing abstraction |
| d | glass-panel renderer-tier quality | renderer-tier detection (svg-filter → css → fallback) accuracy unconfirmed | iOS-26 / Substrates component wave | Verify `useGlassRenderer` tier cascade + the manual override live |

## What W10 did do

- **native-top-layer relocated** from `foundations/` to `containers/` (the
  `containers/native-top-layer` row + the file move). The row blurb names the
  `:native`-opt-in fold as the FIX-ROUTE owned by the Containers/Dialog wave —
  it is the row's new neighbor (`containers/dialog`), so the eventual fold is a
  same-category merge.

## What W10 did NOT do

- Wire any of the four live fixes (each is its owning wave's live-verification
  scope, per the table). W10 is a demo-IA + font-config reform — it does not
  touch the component runtime paths these fixes live in.
