# Exports & subpaths (canon home)

The public surface is three layers — a vueuse-FREE root barrel, flat per-package subpaths,
and (through 4.x) a pure types/constants `@mkbabb/glass-ui/api` discovery layer.

## The root barrel (`@mkbabb/glass-ui`)

`src/index.ts` is the v1.0 curated public barrel — **vueuse-free** (L.W1 Lane A SCC-trap
closure). It re-exports the vueuse-free `ui/` package barrels, a small cherry-picked set of
`custom/` packages, the vueuse-free composable sub-trees, and `cn()`. The 4 vueuse-bearing
surfaces (`input`, `textarea`, `combobox`, `carousel`) are reachable only via subpath. The
remaining `custom/` packages reach consumers only via their dedicated subpath.

```ts
import { Button, Card, Skeleton } from "@mkbabb/glass-ui";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";       // vueuse-bearing → flat subpath
import { GlassDock } from "@mkbabb/glass-ui/dock";           // per-package substrate isolation
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
```

## The flat per-package subpaths

Each component family / composable subtree ships via a flat subpath (`@mkbabb/glass-ui/dock`,
`/aurora`, `/sidebar`, …) that tree-shakes independently (one `dist/<name>.js` chunk per
subpath). CSS imports the unified bundle via `@mkbabb/glass-ui/styles` (or the split
`./styles/critical` + `./styles/deferred` — see `consumer-wiring.md`). Each `exports` entry
carries the contract-v2 shape — `{ types, import, default }` for the `./` root,
`{ types, import }` for the subpaths; no `development` condition.

## The `/api` discovery layer (through 4.x; dropped at the 5.0.0 clean break)

`@mkbabb/glass-ui/api` is a pure types + constants discovery layer (no runtime component).
It is the ONE dropped key of the 5.0.0 export reshape (`./api` folds into per-surface
re-homes — a clean break, the single MIGRATION row); every other published key is preserved
(the regen proves the key-set reproduces).

## The classification is machine truth, not prose

The PUBLISH / INTERNAL / CURATED classification + the generated entry set live in the fail-
CLOSED `scripts/lib/subpath-policy.mjs` + `scripts/regen-exports.mjs` — the entry map is
re-derived from the real colocated barrels (key-preserving), and `--inject-unclassified` /
`--break-fidelity` each exit 1. This home carries the prose; that seam is the machine truth.
Subpath publication is binary (`scripts/release.sh` probes each published subpath before
`git tag`). Verified by `npm run verify-export-types` + the fail-closed `proof:resolution`.

## The `manualChunks` recipe

To split glass-ui out of app code, use the single-arg `manualChunks` form
(`build.rollupOptions.output.manualChunks`), ordered `glass-ui → vueuse → vendor` so the
`node_modules` catch-all does not swallow the named splits. Do NOT set both `manualChunks`
and `output.advancedChunks` (Rolldown ignores the former if the latter is present).
