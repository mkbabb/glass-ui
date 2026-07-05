# W-GATE-FAMILY-CONSOLIDATE — the gate-machine transposition census (BG F8.1)

The gate-machine transposition: the ~360 per-wave π-subject gates collapse into a
small set of per-BAND FAMILY tables riding ONE shared detector kit. This census is
the machine-read source (`scripts/gate-family-manifest.mjs`) + its human record;
`proof:meta`'s `gate-family-consolidate` clause validates the LIVE `gates.mjs`
registration against it every close.

## Scope fence — what F8.1 lands vs what BH.B5e executes

F8.1 lands the **transposition MACHINERY**, census-gated:

1. the **detector kit** (`scripts/lib/detect/`) — the shared, pure detection
   primitives a family gate composes instead of re-deriving;
2. this **census** + the machine-readable manifest (`scripts/gate-family-manifest.mjs`);
3. the **`proof:warm-identity` PRIMARY** wiring recorded + validated.

The physical `--list` count DROP (the family-π member deletes + the 14 doc-presence
`claudeMd` clause deletes + the 2 readers dissolved to regen-freshness) is
EXECUTED by **BH.B5-gate-consolidate (B5e)** — `--list` stays byte-identical through
F8.1 (B5b) THEN drops (B5e). Mass-deleting ~150 gate registrations inside one wave
would conflict with every landed wave and risk the build; the transposition is
recorded here as the DIRECTION and executed at the joint close.

## The count direction

| axis | value |
|---|---|
| from (pre-consolidation) | 360 |
| committed in-tranche floor | ~250 |
| recorded family-table target | ~40–60 |
| executor of the physical drop | BH.B5-gate-consolidate (B5e) |

## The five per-band family tables

The per-wave π-subject gates collapse INTO these category gates; each reads its
surface through the shared detector kit (ONE comment-strip + ONE table parser +
ONE wave-id classifier), so the positional-coupling / re-derived-strip drift class
cannot re-enter per gate.

- `proof:glass-band`
- `proof:motion-band`
- `proof:dock-band`
- `proof:paper-band`
- `proof:feedback-band`

## The PROTECT set — the true-positive / dead-knob witnesses (R8)

These gates must NEVER fold into a family table. A band-mean gate would blur away
the precise per-row state / substitution-vs-inheritance witness each carries.

| gate | why it never folds |
|---|---|
| `proof:live-verified-ledger` | per-row live-verified state + `--strict-freshness` content-hash — irreplaceable by a band mean |
| `proof:bg-deferred-ledger` | the BG-active no-silent-drop fold/deferral ledger spine |
| `profile:budget` | the bundle-weight ratchet — a byte budget, not a paint |
| `proof:ui-scale` | the dock-coarse `--dock-scale` RE-DECLARE arm (the dead-knob witness) |
| `proof:dock-plate-clearance` | the `0px` dead-knob assert (the plate-inset barometer) |
| `proof:adaptive-reconcile` | the adaptive-glass substitution-vs-inheritance witness |

`proof:dead-knob` lands as an **ENCAPSULATION-family ARM** (booked) — the dead-knob
witnesses are enrolled in the true-positive set here so the family collapse can
never silently subsume them.

## The paint-oracle wiring — `proof:warm-identity` PRIMARY

- **PRIMARY:** `proof:warm-identity` — the composited-WHOLE dominant-hue kernel
  (F8.2 / GA-2), release-tagged (the close paint oracle). It measures the whole,
  not the part: a warm token composited over an achromatic page still reads grey
  to the eye while a mean-L box passes; the dominant-hue histogram catches it.
- **ENROLLED (demoted, not deleted):** `proof:ba-gestalt` — its roster becomes ONE
  enrolled surface set in the warm-identity battery, NOT the sole oracle. Its
  vacuous mean-L box → the dominant-hue kernel.

## The detector kit roster

`scripts/lib/detect/` — every export fs-free + argv-free (self-testable):

| module | exports |
|---|---|
| `comment-strip.mjs` | `stripComments` (URL-safe regex), `stripJs` (line-machine) |
| `markdown-table.mjs` | `rowCells`, `isSeparatorRow`, `findHeaderColumns`, `isHeaderRow` |
| `wave-id.mjs` | `isWaveId`, `isVisualClass` |

Consumed by `scripts/proof-meta.mjs` (F8.1 re-points its inlined `rowCells` /
`isSeparatorRow` / `isWaveId` / `isVisualClass` onto the kit — the first live
consumer, the ≥1-consumer bar met by construction). Every band family gate reads
its source through this kit.

## Machine lock

`proof:meta` · `gate-family-consolidate` clause (`scripts/proof-meta.mjs`):

- the detector-kit barrel + every roster module resolve on disk AND the kit's
  named exports are callable;
- `scripts/proof-meta.mjs` is a REAL consumer of the kit (imports from it);
- `validateConsolidation` passes against the LIVE `GATES` registry — every
  PROTECT_SET member still registered, `proof:warm-identity` present + release-
  tagged, `proof:ba-gestalt` still registered (demoted, not deleted);
- this census doc resolves on disk.

Born-RED on HEAD (the detector kit + manifest + census absent → the clause reds);
GREEN on this edit; a self-test bite feeds `validateConsolidation` a synthetic
folded-protect-member + a missing-kit state and asserts each flags.
