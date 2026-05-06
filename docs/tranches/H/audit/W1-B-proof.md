# H.W1 Lane B — Composables Retire + Demote (Proof)

**Lane**: H.W1 Lane B (composables).
**Date**: 2026-05-05.
**Scope**: 3 retires + 4 demotes per `audit/W0-reconciliation.md` §4.

## A. Retires (3 flat)

Each composable was exported from a package barrel + `src/index.ts` but had zero
in-repo consumer beyond its own def + barrel. Retire = delete file + remove
barrel export + remove `src/index.ts` re-export when the package barrel collapses
to empty.

### A.1 `useCollapse`

| Field | Value |
|---|---|
| def-site (deleted) | `src/composables/motion/useCollapse.ts` |
| barrel updated | `src/composables/motion/index.ts` (exports for `useCollapse` + `UseCollapseOptions` + `UseCollapseReturn` + `UseCollapseStyle` removed) |
| dir kept | `src/composables/motion/` retains `useRAFLoop`, `useSpringOrchestrator`, `useStaggerReveal`, `useScrollProgress`, `useAnimatedNumber`, `useDarkModeSync`, `useIntersectionPause`, `constants` |
| `src/index.ts` | unchanged (motion barrel still re-exported) |

Zero-consumer proof at retire-completion:
```
$ rg -l '\buseCollapse\b' src/ demo/
(empty — no matches)
```

### A.2 `useContrastSafeAccent`

| Field | Value |
|---|---|
| def-site (deleted) | `src/composables/color/useContrastSafeAccent.ts` |
| barrel deleted | `src/composables/color/index.ts` (was the only export — barrel collapsed) |
| dir deleted | `src/composables/color/` removed |
| `src/index.ts` | `export * from "./composables/color"` line removed |

Zero-consumer proof:
```
$ rg -l '\buseContrastSafeAccent\b' src/ demo/
(empty — no matches)
```

### A.3 `useMonacoTheme`

| Field | Value |
|---|---|
| def-site (deleted) | `src/composables/monaco/useMonacoTheme.ts` |
| barrel deleted | `src/composables/monaco/index.ts` (was the only export — barrel collapsed) |
| dir deleted | `src/composables/monaco/` removed |
| `src/index.ts` | `export * from "./composables/monaco"` line removed |

Zero-consumer proof:
```
$ rg -l '\buseMonacoTheme\b' src/ demo/
(empty — no matches)
```

## B. Demotes (4 blob sub-composables → `_internal/`)

Each sub-composable was a public surface consumed only by sibling composables
inside the blob package (β audit §4 verdict: `library-orphan-as-primitive`).
Demote = move to `src/composables/blob/_internal/`, drop from the package
barrel, leave only facades (`useBlob` + `useWatercolorBlob`) + types public.

| composable | old path | new path |
|---|---|---|
| `useMetaballRenderer` | `src/composables/blob/useMetaballRenderer.ts` | `src/composables/blob/_internal/useMetaballRenderer.ts` |
| `useBlobMood` | `src/composables/blob/useBlobMood.ts` | `src/composables/blob/_internal/useBlobMood.ts` |
| `useBlobPointer` | `src/composables/blob/useBlobPointer.ts` | `src/composables/blob/_internal/useBlobPointer.ts` |
| `useBlobSatellites` | `src/composables/blob/useBlobSatellites.ts` | `src/composables/blob/_internal/useBlobSatellites.ts` |

### B.1 Sibling import updates

`src/composables/blob/useBlob.ts` (the facade in the blob package):

```diff
-import { useBlobMood } from "./useBlobMood";
-import { useBlobPointer } from "./useBlobPointer";
-import { useBlobSatellites } from "./useBlobSatellites";
-import { useMetaballRenderer } from "./useMetaballRenderer";
+import { useBlobMood } from "./_internal/useBlobMood";
+import { useBlobPointer } from "./_internal/useBlobPointer";
+import { useBlobSatellites } from "./_internal/useBlobSatellites";
+import { useMetaballRenderer } from "./_internal/useMetaballRenderer";
```

`src/composables/blob/useWatercolorBlob.ts` — no sibling-composable imports
required updates. Imports `useRAFLoop` from `../motion` and `mulberry32` from
`../utils/mulberry32`; both unchanged paths (`mulberry32` stays at
`composables/utils/` per W0 default — see §B.4).

### B.2 Internal-imports re-pathed (4 files)

`_internal/useMetaballRenderer.ts`:
- `./blob.frag.glsl?raw` → `../blob.frag.glsl?raw`
- `./blob.vert.glsl?raw` → `../blob.vert.glsl?raw`
- `./types` → `../types`
- `./canvas2d-fallback` → `../canvas2d-fallback` (lazy `import()` form)

`_internal/useBlobMood.ts`:
- `./types` → `../types`

`_internal/useBlobPointer.ts`:
- no relative imports inside the package (only `vue` + `@vueuse/core`)

`_internal/useBlobSatellites.ts`:
- `../utils/mulberry32` → `../../utils/mulberry32`
- `./types` → `../types`
- `./useBlobMood` → `./useBlobMood` (sibling within `_internal/`, unchanged)

### B.3 Barrel update

`src/composables/blob/index.ts` — now exports only the facades + shared types:

```ts
// Public barrel for the Blob composable family. The mood / pointer / satellites
// / metaball-renderer sub-composables are package-private under `./_internal/`
// (H.W1.B demote per W0-reconciliation §4); only the facades (`useBlob`,
// `useWatercolorBlob`) and the shared types ship as public surface.

export {
    BLOB_CONFIG_DEFAULTS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type MetaballSource,
    type RendererHandle,
} from "./types";

export {
    useWatercolorBlob,
    type UseWatercolorBlobOptions,
} from "./useWatercolorBlob";
export {
    useBlob,
    type UseBlobProps,
    type UseBlobReturn,
} from "./useBlob";
```

Removed exports (now private under `_internal/`):
- `useMetaballRenderer`
- `useBlobMood`, `BLOB_MOOD_PARAMS`, `MoodParams`
- `useBlobPointer`, `PointerState`
- `useBlobSatellites`

### B.4 `mulberry32` decision

Per the W0 default (audit §4 row 11), `mulberry32` stays at
`src/composables/utils/mulberry32.ts`. Its consumer set still spans the
public/private boundary — the public `useWatercolorBlob` facade plus the now-
private `_internal/useBlobSatellites`. Keeping it in `composables/utils/`
preserves the existing `composables/utils` barrel re-export and the
`@mkbabb/glass-ui/utils`-style consumer ergonomic.

```
$ rg -l '\bmulberry32\b' src/ demo/
src/composables/blob/useWatercolorBlob.ts
src/composables/utils/index.ts
src/composables/utils/mulberry32.ts
src/composables/blob/_internal/useBlobSatellites.ts
```

### B.5 Component-package re-export trim (scope reveal — direct demote consequence)

`src/components/custom/blob/index.ts` previously re-exported
`BLOB_MOOD_PARAMS` (constant) and `MoodParams` (type) from the
`composables/blob` barrel for "ergonomic component-package imports". Both were
sourced from the now-private `useBlobMood` sub-composable, and pre-demote a
grep across `src/` + `demo/` found zero external consumers (only the component
package barrel re-export itself). Per the H invariant 5 demote — "collapses 4
public exports to 0" — both were removed from the component re-export so the
public surface of the blob component package matches the new composables-
barrel surface.

```
$ rg -l '\bBLOB_MOOD_PARAMS\b' src/ demo/
src/components/custom/blob/index.ts        ← removed in this lane
src/composables/blob/_internal/useBlobMood.ts

$ rg -l '\bMoodParams\b' src/ demo/
src/components/custom/blob/index.ts        ← removed in this lane
src/composables/blob/_internal/useBlobSatellites.ts
src/composables/blob/_internal/useBlobMood.ts
```

This is a direct mechanical consequence of the demote (the re-export targeted
a now-private symbol), not an opportunistic refactor of the custom component
package. It fits within Lane B's "drop from the public surface" scope.

### B.6 Consumer typecheck

- `<Blob>` (`src/components/custom/blob/Blob.vue`) imports `useBlob` directly
  via `../../../composables/blob/useBlob` — typechecks green.
- `<Swatch>` (`src/components/custom/swatch/Swatch.vue`) imports
  `useWatercolorBlob` directly via
  `../../../composables/blob/useWatercolorBlob` — typechecks green.

## Verify-row

### Typecheck
```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(exit 0; no diagnostics)
```

### Build (clean rebuild)
```
$ rm -rf dist && npm run build
…
[vite:dts] Declaration files built in 235753ms.
✓ built in 4m 11s
```

(Build artefact: `dist/glass-ui.js` 190.75 kB / 36.61 kB gz; `dist/blob.js`,
`dist/canvas2d-fallback-*.js`, `dist/swatch.js` all emitted; per-package
subpaths under the new `_internal/` layout dts-rolled cleanly.)

## `git status --short` (Lane B-relevant rows)

```
 M src/components/custom/blob/index.ts
 M src/composables/blob/index.ts
 M src/composables/blob/useBlob.ts
 D src/composables/blob/useBlobMood.ts
 D src/composables/blob/useBlobPointer.ts
 D src/composables/blob/useBlobSatellites.ts
 D src/composables/blob/useMetaballRenderer.ts
 D src/composables/color/index.ts
 D src/composables/color/useContrastSafeAccent.ts
 D src/composables/monaco/index.ts
 D src/composables/monaco/useMonacoTheme.ts
 M src/composables/motion/index.ts
 D src/composables/motion/useCollapse.ts
 M src/index.ts
?? src/composables/blob/_internal/
```

The `?? src/composables/blob/_internal/` line covers the four moved files at
their new path. Other modified rows in the worktree at this audit time
(`demo/stories/motion/*.vue`, `src/components/custom/dock/*`,
`src/components/ui/*`, etc.) belong to Lanes A / C / D / E running in parallel
and are out of Lane B's bounds.

## Authority

Surgical edits via Read / Edit / Write only; no `git stash`,
`git stash pop`, `git checkout HEAD --`, `git reset`, or other destructive git
commands run. All retire / demote operations followed clean-break discipline
per `feedback_no_backwards_compat`: no shim re-exports, no `_v2` paths, no
commented-out code.
