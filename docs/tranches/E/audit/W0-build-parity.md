# E.W0 Build Parity

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

| Surface | `vite.config.ts` | `vite.iter.config.ts` | `vitest.config.ts` | `tsconfig.json` / `tsconfig.src.json` | Decision | W1 action |
|---|---|---|---|---|---|---|
| `@` alias | present | present | present | present | keep | no change |
| `@utils` alias | present | missing | present | present | supported internal build infrastructure for E | add to `vite.iter.config.ts`; keep configs aligned |
| library entries | `index`, `tokens` only | `index` only | n/a | source include only | out of parity | add W0 export-map entries to both Vite configs; iter build skips dts only |
| declarations | `vite-plugin-dts` with `rollupTypes: true` | none | n/a | no emit by default | real build only | ensure real build emits one d.ts per package export; iter build verifies JS graph only |
| styles | Tailwind/Vite emits `dist/glass-ui.css` and source CSS remains Tailwind v4 input | Tailwind/Vite emits iter CSS | n/a | n/a | keep one CSS entry | point package `./styles` at `./src/styles/index.css`; package `src/styles` only |
| tests | n/a | n/a | happy-dom with aliases | tests include root and source | keep | update tests to root allowlist and package subpath checks |

## Current Drift Recorded At W0

- `vite.iter.config.ts` lacked `@utils`, so it did not prove the same source graph as the real build.
- `vite.iter.config.ts` built only root, so it did not prove subpath entry graphs.
- `verify-export-types` passed despite missing subpath targets because it only checked existing object-form exports.

## W1 Resolution

- `vite.config.ts` and `vite.iter.config.ts` now share `vite.library.ts`.
- `vite.iter.config.ts` now compiles the same package JS entry graph as the real build.
- `verify-export-types` now rejects wildcard exports, catchall `typesVersions`, non-style source exports, missing targets, TypeScript resolution failures, and `vue-router` declaration leakage.
- `vite-plugin-dts` now uses `tsconfig.src.json` so demo-only `vue-router` types do not enter package declarations.

## W1 Rule

Real build and iter build must share the same entry map and externals. Iter build may omit declaration generation, but it must compile the same JS entry graph. The style entry remains source CSS because consumer builds proved the compiled `dist/glass-ui.css` target drops Tailwind v4 source semantics that downstream apps still need.
