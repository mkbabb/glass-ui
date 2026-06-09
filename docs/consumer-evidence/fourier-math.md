# /fourier-math

## Artefact path

`src/subpaths/fourier-math.ts` → `src/components/custom/fourier-field/math.ts`
(published as `@mkbabb/glass-ui/fourier-math`, the trivial one-line mirror barrel).

The leaf carries `positionsAt` / `comp` / `makeEllipticSpectrum` / `BasisComponent`
/ `EllipticSpectrumOptions` — the pure inverse-DFT/epicycle math (Vue-free,
DOM-free by construction). `evalFourier` was DELETED at AY.W-FF2 (the dead export,
zero call sites across all four repos) and does NOT ride the new surface.

## Why the subpath (substrate-isolation)

`math.ts` is the ONE canonical copy of the fourier-field math, lifted from the
sibling `fourier-analysis/web/src/lib/{evaluators,bases}.ts`. It is already
consumed ≥2× INSIDE glass-ui (`FourierField.vue` composes `positionsAt` +
`makeEllipticSpectrum`; the demo story mounts the component) — the LEAF is not
orphan code. The `/fourier-math` subpath isolates the pure math so an external
math-only consumer imports it WITHOUT dragging `FourierField.vue` + the
elliptic-spectrum generators into its bundle (the substrate-isolation concern the
`/fourier-field` component subpath would violate).

## The W-FF1 PROMOTE disposition (branch a)

The cross-repo math-leaf duplication was DECIDED by the predecessor **W-FF1**
(`docs/tranches/AY/audit/W-FF1-fourier-rebase.md §4`): branch **(a) PROMOTE**. The
deciding evidence — `fourier-analysis/web/package.json` already pins
`@mkbabb/glass-ui: ^3.1.0`, and its `lib/evaluators.ts` `evaluateFourier` +
`lib/bases.ts` `fourierPositionsAt` are byte-equivalent to glass-ui's `math.ts`
`evalFourier`/`positionsAt`. This is the slides-`constellation.ts`-class
bespoke-copy-in-consumer the AY headline exists to close.

## Consumer map

| # | Consumer | Source path | Import | Status |
|---|----------|-------------|--------|--------|
| 1 | glass-ui (the mint-time importer) | `tests/components/custom/fourier-field/FourierField.smoke.test.ts` | `import { positionsAt, makeEllipticSpectrum } from "@mkbabb/glass-ui/fourier-math"` | **LIVE** — clears the new subpath's overfitting bar at mint time |
| 2 | fourier-analysis (booked successor) | `fourier-analysis/web/src/lib/{evaluators,bases}.ts` | (re-point: delete the local `evaluateFourier`/`fourierPositionsAt`, import the glass-ui leaf) | **BOOKED** — its own tranche; glass-ui writes no sibling source |

**Proof (importer #1)**:
`rg -n "@mkbabb/glass-ui/fourier-math" tests/`

## Re-point trigger (importer #2)

The fourier-analysis re-point fires when fourier-analysis next bumps its
`@mkbabb/glass-ui` dependency (already `^3.1.0`; the AY mint ships on the next
release). The sibling keeps its polynomial `evaluateChebyshev`/`evaluateLegendre`
+ `evaluateBasis` dispatch + its local `BasisDecomposition`/`EpicycleData` types
(glass-ui ports ONLY the fourier arm). The W-FF1 §4.4 fallback (book-with-the-
dependency-bump-trigger, NO subpath minted now) is the pre-recorded alternative
IF the mint reveals a type-incompatibility the structural-identity check missed —
it did not (the smoke-test consumer resolves the leaf cleanly).

## Keep rationale

The subpath lands WITH a live glass-ui-internal consumer (importer #1, the smoke
test) — it is not a speculative subpath-without-consumer. The §"ship the seam
when the consumer arrives" bar is met: the seam ships with importer #1 today, and
importer #2 (the sibling) is the booked successor with its trigger recorded above.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `/fourier-math`
only while the proof command still finds importer #1. If
`rg "@mkbabb/glass-ui/fourier-math" tests/` returns 0 hits, the verdict returns to
`speculative-subpath` and the subpath must be retired (the W-FF1 §4.4 fallback).
