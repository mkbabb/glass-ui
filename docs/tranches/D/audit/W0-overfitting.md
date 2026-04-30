# D.W0.A - Integrated Hardened Overfitting Audit

Integrated W0 audit across the four D.W0.A scopes. Source and demo were
read-only for this wave; audit outputs landed as documentation artefacts.

## Inputs

| Scope | Artefact | Commit | Notes |
|---|---|---|---|
| `src/components/ui/` | `W0-overfitting-ui.md` | `f76c1b8` | 199 row audit; every row cites reproducible commands. |
| `src/components/custom/` | `W0-overfitting-custom.md` | `ca49a1a` | 140 row audit; includes C.W0-vs-D.W0 delta column. |
| `src/composables/` | `W0-overfitting-composables.md` | `db91793` + orchestrator normalization | Re-grounded after `6104ebb` deleted three composables during W0. |
| `src/styles/` | `W0-overfitting-styles.md` | `492b9a4` | 217 style-surface artefacts; C.W5 deleted-row recheck included. |

## Vocabulary Normalization

The custom and composables workers used the older `generalize` verdict for
one-site public artefacts. D's current plan replaced that with
`keep-current`: a current story, internal source consumer, or external
consumer earns the row until W3 writes consumer-evidence docs where needed.
The styles worker used `current-consumer evidence`; this integrated document
normalizes it to `keep-current`.

## Verdict Distribution

| Scope | keep | keep-current | library-orphan | inline-and-remove | delete-unused | total |
|---|---:|---:|---:|---:|---:|---:|
| `src/components/ui/` | 117 | 73 | 9 | 0 | 0 | 199 |
| `src/components/custom/` | 63 | 53 | 24 | 0 | 0 | 140 |
| `src/composables/` | 11 | 20 | 31 | 1 | 6 | 69 |
| `src/styles/` | 0 | 115 | 102 | 0 | 0 | 217 |
| **Total** | **191** | **261** | **166** | **1** | **6** | **625** |

Actionable current rows (`library-orphan` + `inline-and-remove` +
`delete-unused`): **173**. This is larger than C.W0's 108 actionable rows
because D.W0 enumerated every UI subcomponent, custom package export, style
class, `@utility`, and keyframe rather than only C's forwarded rows.

## C-Forwarded Ledger

C forwarded 101 library-orphan candidates as D debt: 38 custom-surface rows
and 63 composable rows. `W0-triage.md` and `W0-already-resolved.md` are the
binding action ledger for those 101 rows. The raw current audit also surfaced
additional D-only candidates, especially public style-surface orphans; those
are marked as D.W0-discovered and route through the same W2/W3 mechanisms
without altering the C-forwarded arithmetic.

## Scope Reveal During W0

Commit `6104ebb` landed on `master` while W0 agents were running and deleted
`src/composables/useWatercolorBlob.ts`, `src/composables/useClipboard.ts`,
and `src/composables/useCharSplit.ts`. The integrated composables audit was
re-grounded after that commit:

- deleted rows moved to `W0-already-resolved.md`;
- `hashString`, `mulberry32`, `radiiToCSS`, and `randomRadii` changed from
  one-site `keep-current` to zero-site `library-orphan`;
- `rg -n "useWatercolorBlob|copyToClipboard|useClipboard|useCharSplit" src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src`
  finds no glass-ui import consumers for the deleted exports.

## Gate Readout

| Gate | Status | Evidence |
|---|---|---|
| Four per-scope audit docs exist | pass | `W0-overfitting-{ui,custom,composables,styles}.md` |
| Per-scope verdict distributions exist | pass | Each per-scope doc has a distribution table. |
| C-forwarded rows triaged or resolved | pass | `W0-triage.md` + `W0-already-resolved.md` sum to 101. |
| Claims hardened against current master | pass | Composables audit normalized after `6104ebb`; all consumer roots present. |

## Notes For W1-W3

- W1 should wire only rows whose action is `wire` in `W0-triage.md`.
- W2 should delete rows whose action is `delete` and re-`rg` immediately
  before deletion.
- W3 should create `docs/consumer-evidence/` docs for rows marked
  `keep-current` that lack a durable story or source consumer citation.
