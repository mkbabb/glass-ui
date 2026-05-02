# E.W4 Residuals

Date: 2026-05-02

## Actionable Count

Actionable residuals blocking E close: 0.

## Redressed During W4

- Removed broad source barrels:
  - `src/components/index.ts`
  - `src/components/custom/index.ts`
- Removed unused `golden-shimmer` keyframe.
- Removed stale `legacy` / `backward-compatible` framing from current sidebar pure helpers and gold token comments.
- Removed `vue-router` declaration leakage by scoping declaration generation to `tsconfig.src.json`.
- Added installed packed-tarball fixture proof.

## Accepted Current Surface

The subpaths with no current external consumer import are still intentional public design-system surfaces because they are first-party story/demo-backed and smoke-tested:

- `aurora`
- `metric-badge`
- `status-dot`
- `pulse`
- `paper-backdrop`
- `toggle-chip`
- `glass-panel`
- `metaballs`
- `sortable-list`
- `timeline`
- `labeled-field`
- `expandable-container`
- `icon-tooltip`

These are not compatibility shims. They are explicit package entries for existing component families that were previously exposed through the broad root/custom barrel.

## Routed Later Work

- Consumer bundle-size optimization is not an E blocker. W3 recorded final consumer output snapshots as the post-cutover baseline because W0 was recovered after implementation had already started and no reliable pre-W1 consumer build artifact exists.
- `words/frontend` clean-install metadata risk should be fixed in the `words` repository if that repo is prepared for a dependency metadata pass.
