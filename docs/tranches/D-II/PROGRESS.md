# D-II — Progress Log

## 2026-04-30 — Opened From Scope Reveal

Cause:

- User-visible issue: the vertical dock rail did not read like a blurred `Dock` because it was a separate `Rail` component using `.glass-subtle`.
- Tooling issue: D.W4 had landed beyond its declared tooling-only bounds and was not honestly closable until root smoke tests, `@utils` alias parity, and type emission were fixed.
- Process issue: E assumed `d-close`, but D.W4/W5 were still open.

Six audit lanes completed:

- Dock implementation and blur audit.
- D current-state and W4 gate audit.
- A/B/C process retro synthesis.
- E/F future-plan fold-in.
- Dead/legacy dock/public-surface audit.
- Tooling and velocity substrate audit.

Redress landed:

- `GlassDock` now has a `variant="rail"` path.
- App category rail and `/navigation/rail` consume `GlassDock variant="rail"`.
- Legacy `.dock-icon-btn*` demo usage has been replaced with `DockIconButton` or local semantic button styles.
- Vitest includes root `tests/**/*.spec.ts`.
- The `@utils` alias dependency was removed from `src/` and from build/test/TS config after consumer validation showed adjacent repos do not share glass-ui-local aliases.
- `useTouchGate` is now consumed by `GlassDock` collapsed touch activation; `useTimer` is consumed by `useTouchGate`.
- The unused public `useInterval` helper and tests were deleted because it had no source, demo, or consumer use.
- `emit-types` now overrides `noEmit` and produces `dist/index.d.ts` plus `dist/tokens.d.ts`.
- `scripts/validate-consumers.sh` passed for `fourier-analysis/web`, `words/frontend`, and `bbnf-lang/playground`.
- `npm run verify-export-types` passed.

Proof:

- `npm run iter` passed with 186 tests across 9 files.
- Browser Use route proof passed for `/compositions/empty-states`, `/navigation/rail`, `/navigation/dock`, and `/navigation/dock-layers`; no fallback route rendered, and all affected routes exposed `GlassDock` surfaces.
- Final `scripts/ay-close.sh` passed after the touch-gate/useInterval correction: clean dist, full typecheck, full build, 186 tests, all three consumer builds, and dist-size report.

Open until commit:

- Commit redress slices and place the D close tag.
