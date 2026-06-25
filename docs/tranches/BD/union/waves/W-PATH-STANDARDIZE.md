# W-PATH-STANDARDIZE — the storybook import-label / route convention (one convention, no drift)

**Surfaced by:** the user — "Most of the paths are not standardized, like /motion/scroll-choreography but then on others it's @mkbabb or something — each and every page needs to be audited." (28 pages use a local `/cat/slug` label, 90 use `@mkbabb/glass-ui/<subpath>` — the inconsistency.)

## The defect
The storybook page chrome chip + the SFC imports drift: a demo-only page (no public export) shows a local `/cat/slug` label, while an exported-component page shows `@mkbabb/glass-ui/<subpath>` — AND some SFCs import the relative deep path while the chip advertises the subpath (the rail.vue:23 class). No single convention.

## The convention (one rule)
- A page that demos an EXPORTED component → the chip + the SFC import BOTH use the canonical `@mkbabb/glass-ui/<subpath>` (the published surface — what a consumer types).
- A page that demos a DEMO-ONLY facility (no public export — a foundations token tour, a composition) → a local `/cat/slug` label (clearly NOT a published import).
- The SFC import MUST match the chip (no relative-deep-path while the chip says subpath — the binding-verification consistency).
- The manifest `importPath` is the single source; the chip + the audit read it.

## Gate
`proof:path-standardize` (every manifest row's `importPath` matches its kind — exported→subpath, demo-only→local; the SFC import matches the chip; born-RED on the current 28-vs-90 drift + the relative-deep-path mismatches) + the Pass-E audit's path-label arm. A census + a one-edit-per-page reconcile (the chassis reads the manifest). Folds into W-STORY-PAGE-STANDARD's conformity.
