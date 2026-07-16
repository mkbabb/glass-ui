# BI.W-P057 — Honest rendered-story manifest

**Status:** DONE — PRODUCT COMPLETE
**Product slice:** C · manifest truth
**Depends on:** Slice B and P091 manifest reconciliation — complete

## Owner ruling

Keep one typed, hand-authored manifest as the route and navigation authority. The proposed generated public-concept bijection and catalogue-wide orchestration are superseded: they add machinery without improving the rendered product. This wave now removes silent route/module masking and nothing broader.

## Product outcome

- Each retained route is explicitly present once in the manifest.
- Family pages may compose helper/member SFCs without pretending those helpers are routes.
- A manifest row with no module fails immediately instead of rendering an empty placeholder.
- Removed routes resolve to the semantic 404; they do not survive through aliases or filtering registries.
- Router, landings, search, and navigation continue to read the same manifest data.

## Slice C — exact files

| action | path |
| --- | --- |
| modify | `demo/stories/manifest.ts` |
| modify | `demo/stories/manifest/lazy.ts` |
| modify | `tests/stories.smoke.spec.ts` |
| modify | `tests/demo/router.test.ts` |

## Required implementation

1. Reconcile the files above after P091 so no active sibling work is overwritten.
2. Remove `FOLDED_STORY_IDS` and `foldFamilies` as route truth. Only retained routes belong in the routed category arrays.
3. Allow a family page to import its private member stories directly; disk presence alone does not earn a route.
4. Make `makeLazy` reject a missing key rather than returning a render-null `MissingStory` component.
5. Retain small tests for unique canonical paths, module resolution, category/story routing, and honest 404 behavior.
6. Keep manifest fields that have live consumers; do not create scenario, mode, or generated-export fields for hypothetical future use.

## Superseded work

- Generated manifest production.
- Global public-export-to-story mapping.
- Disk-file bijection that treats every helper SFC as a routed concept.
- Silent missing-module placeholders.
- Folded or relocated route compatibility registries.

## Acceptance

- Every routed row resolves to a real component.
- A deliberately absent module key throws with the missing category/story key in the error.
- Family helper SFCs can exist without a route and without a manifest exception set.
- Unknown and removed paths reach the semantic not-found page without redirects.
- Native-browser review after Slice C confirms category landings, direct story routes, family switching, back/forward navigation, and 404 recovery.

## Scope boundary

This is not a package export audit and does not alter the public component graph.

## Landed disposition

- The category arrays now contain only genuine routes; private family-member SFCs remain ordinary implementation details.
- Missing story modules throw with their category/story key during manifest construction.
- Removed and unknown paths resolve through the semantic not-found route without redirects.
- Generated catalogues, compatibility registries, disk bijection, and render-null placeholders remain superseded.
