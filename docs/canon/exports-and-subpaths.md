# Exports & subpaths (canon home)

The public surface has three parts: a vueuse-free curated root barrel, flat
semantic JavaScript subpaths, and CSS/font asset exports. The former
`@mkbabb/glass-ui/api` discovery layer was dropped at the 5.0.0 clean break.

## The root barrel (`@mkbabb/glass-ui`)

`src/index.ts` re-exports selected flat component-family owners and
dependency-free composables. Vueuse-bearing or otherwise isolated surfaces stay
on dedicated subpaths, whose entries point directly at their owning source.

```ts
import { Button, Card, Skeleton } from "@mkbabb/glass-ui";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
```

## The flat semantic subpaths

Each published component or composable family ships through a flat subpath such
as `@mkbabb/glass-ui/dock`, `/aurora`, or `/sidebar`. The build emits one
independently tree-shakable `dist/<name>.js` entry per family. Entries resolve
straight to owner barrels; there is no `src/subpaths/` mirror layer or root
pass-through layer.

CSS consumers use `@mkbabb/glass-ui/styles` or
`@mkbabb/glass-ui/styles.css`; fonts use
`@mkbabb/glass-ui/styles/fonts`. The retired critical/deferred CSS split is not
part of the public surface.

Each JavaScript export carries `{ types, import }` conditions (plus `default`
for the root); no `development` condition is published.

## The `/api` discovery layer (through 4.x)

`@mkbabb/glass-ui/api` was a pure types-and-constants discovery layer. Its key
was dropped at 5.0.0 and its retained symbols moved to their owning family
subpaths; `MIGRATION.md` records the consumer re-homes.

## One semantic entry graph

`scripts/lib/subpath-policy.mjs` owns the publish/internal classification and
semantic owner map. Its `libraryEntryMap` feeds Vite, `scripts/regen-exports.mjs`
projects it into `package.json`, and `scripts/flatten-subpath-types.mjs` uses the
same entries for declaration output. `scripts/verify-export-types.mjs` checks
that published JavaScript entries resolve to emitted declarations.

## The `manualChunks` recipe

To split glass-ui out of app code, use the single-argument `manualChunks` form
at `build.rolldownOptions.output.manualChunks`, ordered
`glass-ui → vueuse → vendor` so the `node_modules` catch-all does not swallow
the named splits. Do not combine `manualChunks` with
`output.advancedChunks`; Rolldown ignores the former when the latter is present.
