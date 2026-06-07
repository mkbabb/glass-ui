# AW.W18 - Gate pattern (the non-dismissable access-modal glass idiom)

## State

**Name**: W18 - Gate pattern (the non-dismissable access-modal glass idiom)
**Opens after**: AW tranche open (independent of the dock/aurora/blob arcs; the `Dialog` family + `.input-pill` it documents shipped pre-AW)
**Agents**: 2 parallel
**Hard gate**: `proof:input-invalid-aria` green — the `.input-pill` invalid-ring selector group includes `[aria-invalid="true"]` alongside `:user-invalid`/`.user-invalid-fallback`, so an app-driven (non-native-validation) form gets the destructive ring without a `:deep()` re-paint; AND a `GatePattern.story.vue` demonstrates the non-dismissable form-in-dialog idiom (consumer #1) composing shipped parts with NO new component.
**Status**: planned

## Goal criterion

This wave succeeds if, when work ends, glass-ui ships (a) the ONE genuinely ≥2-consumer library edit the slides `DeckGate` surfaced — the `.input-pill` invalid ring widened to honor `[aria-invalid="true"]` so imperatively-driven validity (a custom key match, not native `required`/`pattern`) paints the library's own ring — and (b) a BLESSED, documented composition pattern (NOT a new component) for the non-dismissable access-modal idiom: a form-in-`Dialog` that refuses esc/scrim/close, carries an error + shake state, and submits a footer action; two real consumers drive it — a glass-ui demo Gate story and the slides `DeckGate` (H.W2) — so the idiom is canon without manufacturing a single-consumer `GateDialog` primitive.

The convergence digest (Lane 4, Findings 1+2) is binding and twofold. First: the gate's close-X hack is ALREADY obsolete (`DialogContent showClose?: boolean` shipped — verified `DialogContent.vue:62`/`:134`), so H deletes its `:has()` global with NO AW change. Second: the gate's invalid ring is the one real library gap — `.input-pill` paints an invalid ring (`glass.css:328`) but keys ONLY off `:user-invalid`/`.user-invalid-fallback` (the browser-constraint-validation path), NOT the `aria-invalid` attribute the gate sets imperatively (`DeckGate.vue:66`/`:118-121`). Widen the selector; the gate drops its `:deep()` ring. The ≥2-consumer justification: any glass-ui form with app-driven validation, the canonical case — not slides-specific.

**Scope boundary (this wave is the `aria-invalid` RING idiom, NOT the close ceremony).** This W18 is the access-modal invalid-ring widening + the blessed non-dismissable-form-in-`Dialog` composition pattern. It is NOT the tranche close ceremony (gate-fleet registration, the four research READMEs, the π visual-runtime lane, the overfitting audit, `FINAL.md`) — that is the separate new close wave (the AW.W21 close ceremony per the AW/H harden re-baseline). W18 carries a charter §2 row of its own (gate `proof:input-invalid-aria`; digest cite frontend-convergence Lane 4 F1/F2); it was renumbered OUT of the prior "W18 = GATE-PATTERN CLOSE (LAST)" slot — the content-swap that left the close ceremony homeless is corrected by authoring AW.W21, and this gate-pattern wave keeps its own row rather than squatting the close slot.

## Scope

1. Widen the `.input-pill` invalid-ring selector group in `src/styles/glass.css` (line ~328) to include `[aria-invalid="true"]` alongside the existing `:user-invalid` + `.user-invalid-fallback` members — one selector added to the EXISTING ring rule (no new state, no fork). The ring is the shipped `--destructive` border + `box-shadow` recipe; only the trigger surface widens.
2. Verify (no edit needed) that `DialogContent showClose?: boolean` (`src/components/ui/dialog/DialogContent.vue`) is the blessed channel for a non-dismissable modal's close-button suppression — the pattern doc cites `:show-close="false"`, and the wave asserts the prop ships (it does, AV-era).
3. Author `demo/stories/compositions/gate-pattern.vue` (consumer #1) — the non-dismissable access-modal idiom composed entirely from shipped parts: `<Dialog :open>` + `<DialogContent :show-close="false" @escape-key-down.prevent @interact-outside.prevent>` + `<DialogTitle>`/`<DialogDescription>` + `<Input :aria-invalid>` (driving the NEW `[aria-invalid]` ring) + an error line + a shake-on-mismatch + a `<DialogFooter>` submit `<Button variant="primary-audacious">`. NO new component — the story IS the pattern, rendered from the library barrel.
4. Author `docs/tranches/AW/audit/gate-pattern.md` — the blessed-pattern write-up: the contract (`open` always true, esc/scrim/close all `.prevent`-ed, `:show-close="false"`, the `aria-invalid` ring, the error/shake/submit footer), the anti-pattern it abrogates (the `:has(> .sr-only)` close-X CSS pierce + the `:deep(input[aria-invalid])` ring re-paint, both deletable once the pattern is consumed), and the ≥2-consumer note (demo + DeckGate). Documented composition over `Dialog`/`DialogContent` — a pattern, not a component.
5. Add the `proof:input-invalid-aria` gate, born RED on HEAD (the `.input-pill` rule does not key off `[aria-invalid]`), green after the selector widens.

## Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) if:

- the file bounds expand beyond `src/styles/glass.css`, the named demo story, the pattern doc, and the gate script — e.g. the `[aria-invalid]` ring widening turns out to need a token or a second CSS rule (the input border var, the focus-ring interplay) beyond the one-selector add, pulling more of `glass.css` or `tokens.css` into scope (a scope reveal — the digest asserts a "one-selector add to the existing ring"; a multi-rule change invalidates that);
- the pattern cannot be expressed without a new component after all — i.e. the non-dismissable + shake + error contract proves un-composable from `Dialog`/`DialogContent`/`Input`/`Button` and demands a `GateDialog` wrapper (a scope reveal that would CONTRADICT the digest's "blessed pattern, not a component" verdict and the ≥2-consumer discipline — escalate, do not silently mint the component);
- the `proof:input-invalid-aria` ring assertion fails for a reason not fixable by a local `glass.css` edit (the third diagnostic iteration halts).

## File Bounds

| File | Access |
|---|---|
| `src/styles/glass.css` | modify-carve (widen the `.input-pill` invalid-ring selector group only) |
| `demo/stories/compositions/gate-pattern.vue` | create |
| `demo/stories/manifest.ts` | modify (register the gate-pattern story route) |
| `docs/tranches/AW/audit/gate-pattern.md` | create (the blessed-pattern write-up) |
| `scripts/proof-input-invalid-aria.mjs` | create |
| `package.json` | modify (register the `proof:input-invalid-aria` script) |

Do NOT touch: `docs/precepts/`, `src/components/ui/dialog/*` (`DialogContent showClose` is consumed verbatim — NO new prop, the close-X suppression already ships), `src/components/ui/input/*` (the `<Input>` is unchanged — the ring lives in `glass.css`, the component already forwards `aria-invalid` via attr fall-through), `~/Programming/slides/*` (the `DeckGate` port — `:show-close="false"` + deleting the `:deep()` ring + the `:has()` global — is H.W2's work; AW ships the library widening + the pattern doc only).

### Disjointness

Two parallel units, disjoint write sets:

- **AW.W18.a** owns the library edit + the gate — `src/styles/glass.css`, `scripts/proof-input-invalid-aria.mjs`, `package.json`.
- **AW.W18.b** owns the demo + the pattern doc — `demo/stories/compositions/gate-pattern.vue`, `manifest.ts`, `docs/tranches/AW/audit/gate-pattern.md`.

No two units share a `modify` path. Unit b consumes the widened ring a produces (the story's `<Input :aria-invalid>` paints through the new selector — read-only on a's change). Sequence: a lands first (sub-wave 1) so b's story renders the ring; or commit a before parallelizing b.

## Agent Units

### AW.W18.a The aria-invalid ring widening

- Goal: an app-driven (non-native-validation) form gets the `.input-pill` destructive ring by setting `aria-invalid="true"`, with no `:deep()` re-paint, frozen by a born-RED-then-green gate.
- Mechanism:
  - In `src/styles/glass.css`, locate the `.input-pill` invalid-ring rule (≈ line 328, the selector group keying off `:user-invalid`, `.user-invalid-fallback`). Add `[aria-invalid="true"]` to the comma-group so the rule fires on ANY of the three: native constraint-validation (`:user-invalid`), the JS fallback class (`.user-invalid-fallback`), OR the imperative ARIA attribute (`[aria-invalid="true"]`). The ring recipe (the `--destructive` border + the `0 0 0 2px color-mix(... --destructive ...)` shadow) is UNCHANGED — only the trigger widens. A comment names the case: "the `[aria-invalid]` arm serves app-driven validity (a custom key match) where there is no native constraint to trip `:user-invalid`."
  - `scripts/proof-input-invalid-aria.mjs`: parse `src/styles/glass.css`, locate the `.input-pill` invalid-ring rule, assert the selector group contains all three members (`:user-invalid`, `.user-invalid-fallback`, `[aria-invalid="true"]`); assert the ring declaration block still carries `var(--destructive)` (the recipe is intact, not replaced). Comment-stripped, default export, JSON artifact. Register `"proof:input-invalid-aria"` in `package.json`.
- Files: `src/styles/glass.css`, `scripts/proof-input-invalid-aria.mjs`, `package.json`.
- Sub-gate: `npm run proof:input-invalid-aria` green; `npm run build` green (the `/styles` bundle re-emits with the widened rule).

### AW.W18.b The gate-pattern story + blessed-pattern doc

- Goal: a demo story renders the non-dismissable access-modal idiom from shipped parts (consumer #1), and a blessed-pattern doc canonizes the composition so consumers stop re-rolling the close-X pierce + the invalid-ring `:deep()`.
- Mechanism:
  - `demo/stories/compositions/gate-pattern.vue` — the idiom composed from the library barrel ONLY: `<Dialog :open="open">` + `<DialogContent :show-close="false" @escape-key-down.prevent @interact-outside.prevent>` carrying a focal lock glyph, `<DialogTitle>`/`<DialogDescription>`, a `<form @submit.prevent>` with `<Input v-model :aria-invalid="error || undefined" @input="error = false">` (the NEW ring fires on `error`), an error `<p role="alert">`, a `.shake` class on mismatch, and a `<DialogFooter>` `<Button type="submit" variant="primary-audacious">`. A wrong "key" sets `error` + `shake`; a right one closes. The story carries NO `:deep()` ring (it relies on a's widened `.input-pill` selector) and NO close-X `:has()` pierce (it uses `:show-close="false"`) — the two anti-patterns are gone BY CONSTRUCTION.
  - `docs/tranches/AW/audit/gate-pattern.md` — the write-up: §Contract (the seven binding clauses: `:open` always true, `:show-close="false"`, `@escape-key-down.prevent`, `@interact-outside.prevent`, `:aria-invalid` → the widened ring, the error/shake feedback, the footer submit); §Anti-pattern abrogated (the `.deck-gate > button:has(> .sr-only) { display: none }` close-X CSS pierce and the `:deep(input[aria-invalid="true"])` ring re-paint — both deletable once a consumer adopts the pattern, citing the slides `deck.css:565` + `DeckGate.vue:118-121`); §Why a pattern not a component (the contract is six props/handlers on shipped parts; a `GateDialog` wrapper would be a single-consumer primitive the ≥2-consumer invariant forbids until a 3rd distinct gate surfaces); §Consumers (demo #1 + slides DeckGate #2).
  - `demo/stories/manifest.ts` — register the `compositions/gate-pattern` route.
- Files: `demo/stories/compositions/gate-pattern.vue`, `demo/stories/manifest.ts`, `docs/tranches/AW/audit/gate-pattern.md`.
- Sub-gate: the demo dev server renders the gate-pattern route without console error; a wrong key paints the widened invalid ring + shakes; a right key dismisses; esc/scrim/close do NOT dismiss.

## Hard Gate

1. **`proof:input-invalid-aria` green.** `npm run proof:input-invalid-aria` exits 0: the `.input-pill` invalid-ring selector group contains `:user-invalid` AND `.user-invalid-fallback` AND `[aria-invalid="true"]`; the ring recipe still resolves `var(--destructive)`. Born RED on HEAD (the rule keys off two of three; the `[aria-invalid]` arm is absent). JSON artifact emitted.
2. **Ring fires on aria-invalid (behavioral).** The demo gate-pattern story: setting `aria-invalid="true"` on the `<Input>` paints the destructive ring with NO `:deep()` rule in the story's scoped CSS (the ring comes from the widened library `.input-pill`, asserted by a `grep -c ':deep(' demo/stories/compositions/gate-pattern.vue` of zero invalid-ring `:deep()`).
3. **Pattern is a composition, not a component.** `grep -rn "GateDialog\|AccessModal\|GateModal" src/` returns zero (no new component minted); the story + doc compose `Dialog`/`DialogContent`/`Input`/`Button` from the shipped barrels. The pattern doc's §Why-a-pattern names the ≥2-consumer rationale for NOT shipping a `GateDialog`.
4. **Close-X suppression is the shipped prop, not a CSS pierce.** The demo story uses `:show-close="false"` (the shipped `DialogContent` prop); `grep ':has(' demo/stories/compositions/gate-pattern.vue` returns zero (no close-X `:has()` global). The doc records that the slides `:has()` pierce (`deck.css:565`) is deletable at H.W2 against the shipped prop.
5. **Two-consumer justification recorded.** The wave file's §Two-consumer ledger names consumer #1 (the demo gate story, this wave) and consumer #2 (the slides `DeckGate`, H.W2) for BOTH the widened ring AND the blessed pattern — the ≥2-consumer bar clears for the one library edit, and the pattern is canon (not a primitive).
6. **Build green.** `npm run build` green (the `/styles` bundle re-emits with the widened `.input-pill` rule; no typecheck change — the edit is CSS-only + a story + a doc).

## Format And Lint Cadence

- After unit a lands: `npm run proof:input-invalid-aria` + `npm run build` (the `/styles` re-emit).
- After unit b lands: the demo dev-server smoke of the gate-pattern route + `git diff --check` on the doc.
- Docs-only artifacts in this wave file + the pattern doc: `git diff --check` for whitespace.
- No formatter skipped; the repo `proof:*` ESM gates are the generated-format check for the new `.mjs`. (No typecheck arm — the wave touches CSS + a story + docs, no `src/*.ts` surface.)

## Verification Artefacts

- `scripts/proof-input-invalid-aria.mjs` JSON artifact (the three-member selector assertion + the `--destructive` recipe-intact check) saved at wave close.
- A screenshot of the demo gate-pattern story showing the widened invalid ring on a wrong-key mismatch (the ring painting from the library `.input-pill`, no `:deep()`).
- `docs/tranches/AW/audit/gate-pattern.md` (the blessed-pattern write-up).
- The `git diff` of `glass.css` showing the one-selector widening.
- Commit hashes for the two units.

## Commit Plan

- `feat(tranche-AW): W18 (styles) — .input-pill invalid ring honors [aria-invalid] + proof:input-invalid-aria` (unit a; commit body required — names the app-driven-validity case + the one-selector widening + the born-RED-then-green gate).
- `docs(tranche-AW): W18 (pattern) — gate-pattern story + blessed non-dismissable-modal doc (consumer #1)` (unit b; commit body required — names the seven-clause contract + the two abrogated anti-patterns + the pattern-not-component rationale).
- `docs(tranche-AW): W18 close — gate-pattern status + two-consumer ledger` (orchestrator close).

## Dependencies

- **Depends on**: `src/components/ui/dialog/DialogContent.vue` (`showClose` prop, shipped AV-era) + the `.input-pill` invalid-ring rule (`src/styles/glass.css`, shipped) + `<Input>`'s `aria-invalid` attr fall-through — all live at HEAD.
- **Blocks**: H.W2 (the slides gate restyle consumes the blessed pattern — `:show-close="false"` deletes the `:has()` close-X pierce, the widened ring deletes the `:deep(input[aria-invalid])` re-paint — consumer #2; both deletions cannot land until this widening + pattern ship).

## Two-consumer ledger (canonical)

| Consumer | Surface consumed | Ships in | Disposition |
|---|---|---|---|
| Demo gate-pattern story | The non-dismissable form-in-`Dialog` idiom (composed parts) + the widened `[aria-invalid]` `.input-pill` ring | AW.W18 (consumer #1) | **KEEP** — the canonical in-library demonstration; carries NO `:deep()` ring, NO `:has()` close-X pierce (both gone by construction) |
| Slides `DeckGate` | The same idiom + `:show-close="false"` + the widened `[aria-invalid]` ring | H.W2 (consumer #2) | **PORT** — deletes `.deck-gate > button:has(> .sr-only)` (`deck.css:565`, → `:show-close="false"`) and `:deep(input[aria-invalid="true"])` (`DeckGate.vue:118-121`, → the widened library ring); keeps its own lock-glyph + copy |

The ≥2-consumer rule clears: the demo story + the slides `DeckGate` both compose the SAME shipped `Dialog`/`Input`/`Button` parts under the SAME blessed contract, and both rely on the SAME widened `.input-pill` ring. No new component is minted (a `GateDialog` would be single-consumer overfit), and no duplication is created — the slides port DELETES two hand-rolled workarounds (the close-X `:has()` pierce + the invalid-ring `:deep()`) against shipped library surface.
