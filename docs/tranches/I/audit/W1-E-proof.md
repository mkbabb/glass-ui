# I.W1 Lane E — Sub-bar CVA evidence-doc emission

**Wave**: I.W1 Lane E.
**Scope**: 3 sub-bar CVA-style variants flagged in H FINAL deferred items + W0 audit §2.2 rows 35-37 — emit evidence docs OR retire by inline-and-remove.
**Outcome**: 3 WIRE verdicts; 3 evidence docs landed under `docs/consumer-evidence/`. No retires. No source-file modifications.

## Method

Per W0 audit §2.2 the demo site is the canonical Storybook-as-oracle consumer. Recommended action was emit, not retire. Confirmed each variant has exactly 1 distinct consumer (the demo file) at HEAD, and emitted the evidence docs accordingly.

For each variant:
1. `rg -n 'variant=.X.|variant: .X.' src/ demo/` to locate def site + demo site
2. Verified exactly 1 distinct consumer file (the demo)
3. Wrote `docs/consumer-evidence/<variant-slug>.md` citing the demo file:line and a fresh `rg` invocation

## Verdicts

| # | Variant | Source | Demo consumer | Verdict | Evidence doc |
|---|---|---|---|---|---|
| 1 | `toastVariants.variant.inverse` | `src/components/ui/toast/index.ts:23` | `demo/stories/primitives/toast-inverse.vue` (5 hits: lines 27, 47, 85, 122, 128) | WIRE | `docs/consumer-evidence/toast-inverse.md` |
| 2 | `toggleVariants.variant.card` | `src/components/ui/toggle/index.ts:15` | `demo/stories/primitives/toggle-card.vue` (5 hits: lines 89, 126, 158, 167, 176) | WIRE | `docs/consumer-evidence/toggle-card.md` |
| 3 | `Slider variant="glass-track"` | `src/components/ui/slider/Slider.vue:19` (prop union) + `:170-207` (scoped CSS) | `demo/stories/primitives/slider-glass-track.vue` (6 hits: lines 142, 162, 183, 247, 271, 295) | WIRE | `docs/consumer-evidence/slider-glass-track.md` |

Note on variant #3: H W3 verified Slider's `glass-track` is **not a CVA factory branch** — it is a string-literal prop union plus a scoped-CSS recipe inside `Slider.vue`. The artefact still falls under the same wire-or-retire bar because it is a public variant value with a single named consumer; the evidence doc states this distinction.

## Artefacts created

- `docs/consumer-evidence/toast-inverse.md`
- `docs/consumer-evidence/toggle-card.md`
- `docs/consumer-evidence/slider-glass-track.md`
- `docs/tranches/I/audit/W1-E-proof.md` (this document)

## File bounds compliance

Lane E bounds (per W1.md §File bounds): `docs/consumer-evidence/<artefact>.md` (3 new files); plus the README.md table update is reserved for W5 per the dispatch prompt. **No source files modified.** **No README.md table update** (deferred to W5 / I.W5 doc reconciliation per I.md Wave Schedule W5 row).

## Hard gate

(a) 3 evidence docs land — confirmed.
(b) `W1-E-proof.md` summarizes — this document.
(c) `npm run typecheck` green — see below.

## Typecheck output

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
```

(Exit 0; output captured at lane close. No errors emitted by `vue-tsc --noEmit`.)

## Notes for orchestrator merge (W1 reconciliation)

- All 3 verdicts are WIRE. No retires. No source-file modifications.
- The 3 H FINAL "may emit" deferrals (β audit rows 244, 245, 246) are now closed.
- I invariant 11 ("sub-bar CVA variants emit evidence docs OR retire; no more 'may emit'") satisfied for these 3 artefacts.
- README.md table update (per W1.md File bounds Lane E note) is **left to W5** per dispatch instructions — this lane does not touch README.md.
