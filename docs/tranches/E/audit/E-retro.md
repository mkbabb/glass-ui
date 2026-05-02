# E Retro

Date: 2026-05-02

## What Sped Work Up

- Shared `vite.library.ts` removed build/iter drift and kept package entries in one place.
- The consumer validation script caught the incorrect compiled-CSS style export quickly.
- The CDP route checker gave repeatable browser evidence without adding a package dependency.
- Final-state public-surface tests now name every subpath symbol directly.

## What Slowed Work Down

- W0 had to be reconstructed after implementation-like commits already existed.
- External consumers were dirty before E, so consumer commits could not be safely made from this package repo.
- `vite-plugin-dts` declaration output pulled demo-only `vue-router` types until the build was scoped to `tsconfig.src.json`.
- The packed fixture exposed third-party declaration noise under `skipLibCheck: false`; the final fixture matches normal Vue consumer settings and the package-owned leakage is guarded separately.

## Process Change

For the next tranche, run W0 ledgers before any implementation commit and store raw command logs or summarized command artifacts immediately after each hard gate. Do not let evidence lag behind code.
