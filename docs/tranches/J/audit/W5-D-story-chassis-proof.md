# W5.D — `<StoryChassis>` deferral / scope-reveal proof

## TL;DR

Lane D stops at Step 0. The substrate-without-consumer guard fires twice over:

1. The R3-cited primitives `<StoryChassis>` was meant to compose (`<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>`) **do not exist at HEAD** (verified by `rg -l` across `src/` and `demo/` — 0 hits).
2. The chassis-pattern repeat at HEAD is **0** — see `W5-D-story-chassis-survey.md`. The 8 rg hits the survey query returns are inline content-tile usages (decorative viz cards, list frames), not page-chassis usages.

Step 1 (author `<StoryChassis>`) and Step 2 (migrate ≥ 5 stories) do not execute. Per W5.D hard gate path (c): scope reveal documented; Lane D defers.

## The gestalt collapse R3 prescribed has already happened

R3's "15× chassis pattern" thesis assumed an early-tranche state where each story repeated the audacious cream + display-hero + flourish-divider opening. Two things have changed since R3 was authored:

1. **Page-level chassis is already abstracted** — `demo/stories/StoryPage.vue` is consumed by 78/90 stories at HEAD. It provides the `<article>`-level page wrapper (eyebrow + title + blurb + content section) keyed off the story-navigation composable. It is not the maximalist cream + DisplayHero + FlourishDivider chassis, but it is _the page-chassis abstraction_ — and it landed without W5.D's intervention.
2. **The maximalist primitives R3 cited are gone** — `<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>` have been retired from `src/components/custom/` (0 references anywhere in the repo). The "design-language axis" in `CLAUDE.md` still names them in the narrative, but the actual artefacts don't exist.

Combined: the substrate Lane D was prescribed to ship **cannot be built** (its compositional dependencies are gone) and **has no consumers** (no story at HEAD opens with the cream + DisplayHero + FlourishDivider triplet, because none of those primitives exist).

## What the rg query actually found

The 8 hits the survey query (`rounded-(2xl|card) border .* bg-card .* shadow-cartoon`) returns are inline content tiles: viz-basis swatches, signature-glyph cards, list frames inside data stories, decorative section dividers. Their canonical substrate already exists at HEAD: `<CartoonCard>` in `src/components/ui/cartoon-card/`. The cartoon-card-adoption sweep is unrelated to story chassis — it's a per-story consumption sweep that belongs to a vocabulary-convergence wave (W2-style β audit), not to W5.D's StoryChassis lane.

## Recommended disposition

**Lane D is deferred / formally retired** for tranche J:

- No `<StoryChassis>` substrate is authored. Adding one would be substrate-without-consumer (≥ 2 consumer bar fails: 0 consumers).
- No story migration is performed under this lane.
- The W5.D scope item is closed as "resolved upstream" in the tranche-J post-close audit ledger. Specifically: page-chassis abstraction happened via `<StoryPage>` between R3 authoring and HEAD; maximalist-chassis primitives were retired; the gestalt R3 prescribed already converged.

The cartoon-card-adoption gap (8 stories with raw `rounded-card border bg-card shadow-cartoon` that should consume `<CartoonCard>`) is a separate vocabulary-convergence finding. It is **out of scope for W5.D** (which owned StoryChassis, not cartoon-card adoption) and is logged here for forwarding into J's post-close audit (β / per-story-consumption-sweep lane) or into a K-tranche convergence wave.

## Hard-gate verification

| Gate | Path | Result |
|---|---|---|
| (a) Survey ledger documents actual chassis-pattern count at HEAD | `W5-D-story-chassis-survey.md` | done — count 0 |
| (b) IF count ≥ 5: ship StoryChassis + migrate 5 stories | n/a | does not fire |
| **(c) IF count < 5: scope reveal documented; defer/re-cast** | this doc | **done** |
| (d) Migrated stories render identically | n/a | no migrations |
| (e) `npm run typecheck` green | unchanged at HEAD | n/a — Lane D wrote no code |
| (f) `npm run build` green | unchanged at HEAD | n/a |
| (g) `npm run test` green | unchanged at HEAD | n/a |
| (h) `rg "<StoryChassis" demo/` ≥ 5 hits | n/a | does not fire |
| (i) Two proof docs | this doc + `W5-D-story-chassis-survey.md` | done |

## Files touched by Lane D

- **CREATE**: `docs/tranches/J/audit/W5-D-story-chassis-survey.md`
- **CREATE**: `docs/tranches/J/audit/W5-D-story-chassis-proof.md` (this file)

No code changes. No `demo/_internal/StoryChassis.vue`. No `demo/stories/**/*.vue` migration.

## Forward-looking notes

If a future tranche reintroduces the maximalist cream + DisplayHero + FlourishDivider design language (per `CLAUDE.md` design-language axis identity), the StoryChassis composition prescribed by R3 may become buildable again. At that point, the substrate-with-consumer precept reapplies: ≥ 2 stories must consume the new substrate as part of the same wave that ships it. Until those primitives return to `src/`, no StoryChassis exists to ship.

The 8 inline-tile sites surfaced by the survey query are candidates for a `<CartoonCard>` adoption sweep. Recommended target: J post-close audit (β lane / per-story-consumption sweep) or K-tranche convergence wave. Not Lane D's territory.
