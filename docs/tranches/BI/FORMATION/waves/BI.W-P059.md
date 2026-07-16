# BI.W-P059 — One useful specimen surface

**Status:** DONE — native accepted
**Product slice:** D · specimen-frame consolidation
**Depends on:** Slices A and C

## Owner ruling

The demo needs live specimens and causal controls, not a generic state-control framework. Keep the existing data-body seam for its current consumers, consolidate overlapping frame components, and repair state/reset/failure behavior only where a real story needs it.

## Product outcome

- `ShowcaseFrame` is the one reusable specimen surface.
- Variant matrices are ordinary responsive grids, not a second frame hierarchy.
- A control changes a visible or semantic product state and exposes reset/recovery when that state can become confusing.
- Decorative knobs, stale readouts, and simulated-only states are removed rather than generalized.

## Final contract

- `StorySection` is the sole owner of section headings and ledes.
- `ShowcaseFrame` is the sole reusable specimen plate and caption band.
- `StoryBodyRenderer` keeps flat specimens bare and frames only labeled permutation cells.
- Permutation axes, per-cell reactive scope isolation, model binding, automatic accessible names, and the `minCell` reflow seam remain intact.
- The data-body seam remains live for `StoryPage` and its four story consumers: select, inputs, badge, and alert.
- The chassis interaction example exposes an observable run state and reset; its decorative System button is now a non-interactive status badge.

## Slice D — exact files

| action | path                                      |
| ------ | ----------------------------------------- |
| modify | `demo/chassis/showcase/ShowcaseFrame.vue` |
| delete | `demo/chassis/showcase/SpecimenFrame.vue` |
| delete | `demo/chassis/PermutationGrid.vue`        |
| modify | `demo/chassis/body/StoryBodyRenderer.vue` |
| modify | `demo/chassis/body/story-body.ts`         |
| modify | `demo/chassis/index.ts`                   |
| modify | `demo/stories/compositions/chassis.vue`   |

## Required implementation

1. Render the few permutation specimens as a plain responsive grid of `ShowcaseFrame` cells.
2. Preserve the existing data-body consumers, but remove frame-specific schema fields or helpers that no longer have multiple consumers.
3. Keep section heading/lede responsibility in `StorySection`; a specimen frame does not automatically mint another header and divider.
4. Size isolated controls by their own semantics rather than a selector carve that guesses which descendants are interactive.
5. Keep `StoryPlayButton` and other small semantic helpers that already have a clear single responsibility.
6. Add no generic `StateControls` component until repeated real stories require the same control composition.

## Explicit removals

- `SpecimenFrame` as a second material/padding owner.
- `PermutationGrid` as a one-purpose wrapper around a normal CSS grid.
- Automatic inner card headers and dividers when the surrounding section already names the specimen.
- New schema fields justified by one story.

## Acceptance

- Existing data-bodied stories render the same live components and model updates.
- Matrices reflow to one column without overflow at 390×844.
- A lone control keeps an intentional width without CSS selectors that target arbitrary roles/tags.
- Nested glass plates and redundant dividers are reduced.
- Keyboard and pointer use produce the same observable state on touched specimens.
- Review Slice D with Slice E in the native in-app browser; do not use Playwright.

## Verification

- `npx vitest run tests/stories.smoke.spec.ts tests/demo/landing.test.ts` — 9/9 passed.
- `npm run iter-check` — passed after the concurrent P046 source edit settled.
- `git diff --check` on the Slice D file set — passed.
- Native in-app browser — `/display/badge` and `/compositions/chassis` passed at 390px: permutation grids reflowed without overflow, interaction state and reset were observable, and the status badge remained non-interactive.

## Scope boundary

This slice does not standardize every story control or rewrite bespoke compositions.
