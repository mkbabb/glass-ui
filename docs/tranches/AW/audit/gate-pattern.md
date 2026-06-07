# AW.W18 — The gate pattern (the non-dismissable access-modal glass idiom)

The blessed composition for a form-in-`Dialog` that refuses esc / scrim / close,
carries an error + shake state, and submits a footer action. It is a **pattern,
not a component** — every clause is a prop or handler on shipped parts.

Consumer #1 is `demo/stories/compositions/gate-pattern.vue`; consumer #2 is the
slides `DeckGate` (H.W2). Both compose the SAME `Dialog`/`Input`/`Button` parts
under the SAME contract, and both rely on the SAME widened `.input-pill`
`[aria-invalid]` ring (AW.W18). No new component is minted.

## §Contract — the seven binding clauses

| # | Clause | How |
|---|---|---|
| 1 | The gate is always open while locked | `<Dialog v-model:open="open">` with `open` held `true` until the key matches |
| 2 | The close button is suppressed | `<DialogContent :show-close="false">` — the shipped prop (AV-era), NOT a CSS pierce |
| 3 | Esc does not dismiss | `@escape-key-down.prevent` on `<DialogContent>` |
| 4 | The scrim / outside-click does not dismiss | `@interact-outside.prevent` + `@pointer-down-outside.prevent` |
| 5 | App-driven validity paints the library ring | `<Input :aria-invalid="error || undefined">` → the widened `.input-pill` `[aria-invalid="true"]` selector (no `:deep()`) |
| 6 | Error + shake feedback | a `role="alert"` line + a `.gate-shake` keyframe on the content root (cleared on `animationend`); shake is `prefers-reduced-motion` aware |
| 7 | The action is a footer submit | `<DialogFooter>` + `<Button type="submit" variant="primary-audacious">` inside a `<form @submit.prevent>` |

## §Anti-pattern abrogated

The gate idiom historically carried two hand-rolled workarounds that the blessed
composition deletes:

1. **The close-X `:has()` CSS pierce.** A `.deck-gate > button:has(> .sr-only) {
   display: none }` global (slides `deck.css:594`) hid the close button because
   the suppression prop was thought unavailable. It IS available —
   `DialogContent showClose?: boolean` ships (verified `DialogContent.vue:62` /
   `:134`). The pattern uses `:show-close="false"`; the `:has()` global is
   deletable at H.W2.

2. **The invalid-ring `:deep()` re-paint.** A `.deck-gate :deep(input[aria-invalid="true"])`
   rule (slides `DeckGate.vue:118`) re-painted the destructive ring because the
   shipped `.input-pill` ring keyed only off `:user-invalid` / `.user-invalid-fallback`
   — the browser-constraint path — not the `aria-invalid` attribute the gate sets
   imperatively (there is no native constraint to trip `:user-invalid` on a
   custom key match). AW.W18 widens the library selector group to include
   `[aria-invalid="true"]`, so the library's own ring paints with no `:deep()`;
   the slides re-paint is deletable at H.W2.

Both deletions cannot land in slides until this widening + pattern ship — they
are H.W2's work, recorded here as the downstream consequence.

## §Why a pattern, not a component

The contract is six props/handlers on shipped parts (`:open`, `:show-close`, two
`.prevent` handlers, `:aria-invalid`, the footer submit). A `GateDialog` wrapper
would be a **single-consumer primitive** the ≥2-consumer invariant (J inv 10 / L
inv 8) forbids until a THIRD distinct gate surface justifies the abstraction. The
demo + the slides `DeckGate` are TWO consumers of the same idiom; that clears the
bar for the ONE genuine library edit (the widened ring) without manufacturing a
component. A consumer keeps its own lock glyph + copy; the idiom is the wiring,
not a box.

## §Consumers (the ≥2-consumer ledger)

| Consumer | Surface consumed | Ships in | Disposition |
|---|---|---|---|
| Demo gate-pattern story | the non-dismissable form-in-`Dialog` idiom (composed parts) + the widened `[aria-invalid]` `.input-pill` ring | AW.W18 (consumer #1) | **KEEP** — the canonical in-library demonstration; carries NO `:deep()` ring, NO `:has()` close-X pierce (both gone by construction) |
| Slides `DeckGate` | the same idiom + `:show-close="false"` + the widened `[aria-invalid]` ring | H.W2 (consumer #2) | **PORT** — deletes `.deck-gate > button:has(> .sr-only)` (`deck.css:594`, → `:show-close="false"`) and `:deep(input[aria-invalid="true"])` (`DeckGate.vue:118`, → the widened library ring); keeps its own lock-glyph + copy |

## §Gate

`proof:input-invalid-aria` freezes the one library edit: the `.input-pill`
invalid-ring selector group must contain `:user-invalid` AND
`.user-invalid-fallback` AND `[aria-invalid="true"]`, and the ring recipe must
still resolve `var(--destructive)` (widened, not replaced). Born RED on HEAD (the
rule keyed off two of three); green after the selector widens.

## §Browser-verify (manual)

The behavioral half is a render-verify in the demo dev server:

- A wrong key sets `aria-invalid="true"` → the widened library ring paints (no
  `:deep()` in the story scoped CSS) + the content shakes once.
- The right key (`wolfpack`) dismisses the gate.
- Esc, a scrim click, and an outside click do NOT dismiss.
