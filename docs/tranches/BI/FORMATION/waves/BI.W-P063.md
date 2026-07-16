# BI.W-P063 — Surface apotheosis — semantic material/elevation primitive

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S15
**Formation family:** component-display
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator

## Intent

Surface is the sole public authority for a plate's material, elevation, specular treatment, shadow, and texture. It never implies content grouping or command behavior. Components that need a plate compose Surface instead of copying a glass recipe.

## Landed disposition

- `/surface` exports the runtime `Surface` plus `SurfaceProps`, `SurfaceDecoration`, `SurfaceTier`, `SurfaceMaterial`, and `SurfaceSpecular` types. It exports no runtime resolver.
- Surface alone resolves material role, effective tier, glass/veil/opaque decoration, deep eligibility, shadow, grain, and specular tracking. Deep glass reports the floating tier it paints.
- The shared `Surface` axis alias remains in `_shared/axes.ts`; one private tier/deep resolver serves Surface and internal portaled primitives.
- Card-owned material writers and the dead clear decoration rule are removed. Material-role CSS now supplies only semantic shadow tokens.
- `display/surface.vue` is the single labelled role-by-decoration story; the duplicate taxonomy route is gone.

## Public contract

- Keep `Surface`, `SurfaceProps`, `SurfaceTier`, and the existing decoration type as the public component vocabulary.
- Add one typed material-role prop and type for `content | elevated | functional | overlay`. Use a name that does not collide with the native `role` attribute; `material` is the preferred API.
- Move the existing `off | subtle | full` specular register and its pointer tracking from Card to Surface. Specular remains opt-in and only arms on a compatible glass material.
- Preserve the tier, decoration, deep, shadow, and grain capabilities, but expose the effective rendered tier/material through truthful data attributes. `deep` must not claim a different tier from the one it paints.
- Do not export class resolvers from `/surface`. Shared internal consumers may use one internal resolver; application consumers compose `Surface`.
- Do not add pressable, selected, content-anatomy, or command props to Surface.

## Implementation order

1. Make `Surface.vue` resolve one effective material state and own its data attributes, specular directive, grain-off state, and shadow eligibility.
2. Collapse the shared axis implementation to one internal resolver and one typed vocabulary. Remove stale `clear` documentation unless `clear` remains a real member at implementation time.
3. Move all plate paint, including content/elevated roles, into the Surface-owned CSS seam. Delete Card selectors from `material-roles.css`; Card may select a Surface role but may not repaint it.
4. Stop exporting resolver helpers from `/surface`; export the component contract and material-role type.
5. Consolidate the existing Surface taxonomy story into the canonical display story. Rename/rehome it rather than creating a second Surface route, and remove its Card demonstrations.
6. Repair public API assertions and the existing Surface-axis tests around the final contract. Do not add a parallel test suite when an existing focused test can own the assertion.

## Exact file plan

| action | path | required change |
| --- | --- | --- |
| modify | `src/components/surface/Surface.vue` | Sole material/specular owner; truthful effective state; no raw pseudo utility. |
| modify | `src/components/surface/index.ts` | Export component props/types; remove public class resolvers. |
| reconcile | `src/components/_shared/useSurfaceAxis.ts` | Retain one internal resolver for Surface and portaled primitives only. |
| reconcile | `src/components/_shared/axes.ts` | One source for the shared tier/decoration vocabulary. |
| modify | `src/styles/glass/surface-axis.css` | Surface-owned decoration and effective-state selectors. |
| modify | `src/styles/glass/material-roles.css` | Role paint keyed by Surface state; no Card exception. |
| rename/consolidate | `demo/stories/foundations/surface-taxonomy.vue` → `demo/stories/display/surface.vue` | One labelled role/tier specimen; delete duplicate Card material content. |
| modify | `demo/stories/manifest.ts` | Point the existing Surface entry at the consolidated story. |
| modify | `DESIGN.md` | Document Surface as the only material/elevation authority. |
| modify | `tests/public-surface.spec.ts` | Assert the final exports and absence of public resolver helpers. |
| modify if still applicable | `tests-visual/surface-axis.spec.ts` | Reuse the existing scenario coverage; do not create a duplicate contract spec. |

## Product acceptance

- Content, elevated, functional, and overlay roles are visibly ordered on the same live backdrop in light and dark modes.
- The role/tier matrix has explicit row and column labels and no empty phantom column.
- `deep`, ordinary tiers, decoration, shadow, grain, and specular each have one visible, typed effect; reported data attributes match the computed material.
- Dark mode and reduced-transparency keep text, boundaries, focus, and role hierarchy legible. Reduced motion disables moving specular without removing the static plate affordance.
- Narrow/coarse presentation does not clip the plate, its labels, or any story control.
- Surface has no command behavior. A Surface rendered as a native element remains only that element unless a Button or Link is explicitly composed.
- Existing Atlas and sci-report `/surface` consumers retain their component import. Any removed helper export must first be checked against real consumers.

## Verification

After the Surface/Card implementation batch, run the focused public/unit checks and typecheck once. Inspect the consolidated story with the native in-app browser at wide/light, wide/dark, narrow/coarse, reduced motion, and reduced transparency. Use screenshots only where visual comparison helps; do not introduce receipt, attestation, lock, or local proof machinery.

## Dependency

P109 follows this wave and consumes its settled Surface contract. No Card material exception may be used to make P109 pass.
