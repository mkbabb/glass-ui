# L.W1 Lane C — subpath flatten + carousel subpath proof (v1.0)

**Date**: 2026-05-11
**Lane**: C (HEADLINE wave's subpath-flatten + carousel-subpath transposition)
**Source spec**: `docs/tranches/L/waves/W1.md` Lane C; `docs/tranches/L/research/Rε-architectural-transpositions.md` §B.3
**Worktree HEAD at start**: `2f4fb91` (test(public-surface): retarget keyboard-shortcuts type-surface checks to subpath barrel)
**Status**: fix applied in worktree; build + typecheck + dist self-containment + runtime probes + synthetic-consumer tsc probe all green. Orchestrator pending integration with Lane A + Lane B before W1 close commit.

## § Subpath state — before vs after

### Before (v0.9.4 HEAD)

```
@mkbabb/glass-ui/composables/dark      → dist/dark-subpath.{js,d.ts}     (W0 Lane III transitional shape)
@mkbabb/glass-ui/composables/keyboard  → dist/keyboard-subpath.{js,d.ts}  (W0 Lane III transitional shape)
@mkbabb/glass-ui/carousel              → (does not exist; useCarousel reachable only via root barrel)
```

The nested `/composables/*` forms violate the flat-naming convention (every other subpath — `/forms`, `/dock`, `/configurator`, `/aurora`, ...). They were introduced at W0 Lane III as a dts-publication-gap workaround that preserved the v0.9.3 consumer-facing names. The flat dist filenames (`dark-subpath` / `keyboard-subpath`) were transitional artefacts always slated to retire at L.W1 (see `docs/tranches/L/audit/W0-Lane-III-typing-gap-proof.md` § Fix chosen — bullet 3).

### After (this Lane C change)

```
@mkbabb/glass-ui/dark      → dist/dark.{js,d.ts}      (canonical flat subpath)
@mkbabb/glass-ui/keyboard  → dist/keyboard.{js,d.ts}  (canonical flat subpath)
@mkbabb/glass-ui/carousel  → dist/carousel.{js,d.ts}  (new — `useCarousel` + `CarouselApi` type)
```

The nested `/composables/dark` + `/composables/keyboard` subpaths are RETIRED per L invariant 4 (no backwards-compat hacks, no legacy aliases). The v0.9.x → v1.0 migration is documented in CHANGELOG.md (Lane C section) and binds into MIGRATION.md at L.W5.

## § File list — NEW top-level barrels

### `src/dark.ts` (NEW, 12 LOC)

```ts
// @mkbabb/glass-ui/dark — vueuse-bearing dark-mode composable (v1.0 flat subpath)
//
// L.W1 Lane C — flattens the v0.9.x nested subpath `/composables/dark` to the
// v1.0 canonical flat subpath `/dark`. Per Rε §B.3.1+3.2: every other public
// subpath in the library is flat (`/forms`, `/dock`, `/configurator`); the
// nested form was the lone exception introduced as a W0 Lane III transitional
// shape. L invariant 4 retires the nested form with no legacy alias.
//
// Implementation home remains `src/composables/dark.ts` (per W0 Lane III lift);
// this file is a thin re-export so the file structure stays coherent and W2's
// modularization sweep has a known re-organization target.
export { useGlobalDark } from "./composables/dark";
```

### `src/keyboard.ts` (NEW, 11 LOC)

```ts
// @mkbabb/glass-ui/keyboard — vueuse-bearing keyboard-shortcuts registry (v1.0 flat subpath)
//
// L.W1 Lane C — flattens the v0.9.x nested subpath `/composables/keyboard` to
// the v1.0 canonical flat subpath `/keyboard`. Per Rε §B.3.1+3.2: every other
// public subpath is flat; the nested form was the lone W0 Lane III transitional
// shape. L invariant 4 retires the nested form with no legacy alias.
//
// Implementation home remains `src/composables/keyboard.ts` (per W0 Lane III
// lift); this file is a thin re-export so the file structure stays coherent
// and W2's modularization sweep has a known re-organization target.
export * from "./composables/keyboard";
```

### `src/carousel.ts` (NEW, 17 LOC)

```ts
// @mkbabb/glass-ui/carousel — vueuse-bearing carousel composable (v1.0 subpath)
//
// L.W1 Lane C — new public subpath for `useCarousel` (the embla-carousel-vue
// + `createInjectionState`-based composable that powers `<Carousel>` and the
// `Carousel*` family). The composable was previously reachable only via the
// root barrel (`@mkbabb/glass-ui` re-exports it through the `ui/carousel/`
// package), which drags `@vueuse/core` into the consumer's tree-shake walk —
// the same SCC trap Phase 2 closes for `useGlobalDark` / `registerShortcut`.
//
// Lane A removes `useCarousel` from the root-barrel re-export chain; consumers
// reach it here. The component package `<Carousel>` + subcomponents remain on
// the root barrel (they re-export `useCarousel` internally only for their own
// `provide`/`inject` wiring, not as a public surface).
//
// Implementation home: `src/components/ui/carousel/useCarousel.ts`.
export { useCarousel } from "./components/ui/carousel/useCarousel";
export type { CarouselApi } from "./components/ui/carousel";
```

The implementation files `src/composables/dark.ts` + `src/composables/keyboard.ts` (W0 Lane III's canonical implementation homes) are UNCHANGED — Lane C is strictly additive on the src/ side. Only public subpath plumbing moves.

## § package.json + vite.library.ts diff summary

### `package.json` (typesVersions block)

```
- "composables/dark":     ["dist/dark-subpath.d.ts"]      (REMOVED)
- "composables/keyboard": ["dist/keyboard-subpath.d.ts"]  (REMOVED)
+ "dark":     ["dist/dark.d.ts"]      (ADDED)
+ "keyboard": ["dist/keyboard.d.ts"]  (ADDED)
+ "carousel": ["dist/carousel.d.ts"]  (ADDED)
```

### `package.json` (exports block)

```
- "./composables/dark":     { development: "./src/composables/dark.ts",     types: "./dist/dark-subpath.d.ts",     import: "./dist/dark-subpath.js" }
- "./composables/keyboard": { development: "./src/composables/keyboard.ts", types: "./dist/keyboard-subpath.d.ts", import: "./dist/keyboard-subpath.js" }
+ "./dark":     { development: "./src/dark.ts",     types: "./dist/dark.d.ts",     import: "./dist/dark.js" }
+ "./keyboard": { development: "./src/keyboard.ts", types: "./dist/keyboard.d.ts", import: "./dist/keyboard.js" }
+ "./carousel": { development: "./src/carousel.ts", types: "./dist/carousel.d.ts", import: "./dist/carousel.js" }
```

### `vite.library.ts` (libraryEntries)

```
- "dark-subpath":     resolve(rootDir, "src/composables/dark.ts")      (REMOVED)
- "keyboard-subpath": resolve(rootDir, "src/composables/keyboard.ts")  (REMOVED)
+ dark:     resolve(rootDir, "src/dark.ts")      (ADDED — flat top-level barrel)
+ keyboard: resolve(rootDir, "src/keyboard.ts")  (ADDED — flat top-level barrel)
+ carousel: resolve(rootDir, "src/carousel.ts")  (ADDED — new subpath)
```

The transitional W0 Lane III comment block in `vite.library.ts` is retired and replaced with a Lane C comment block. Entry-key shape is now uniformly flat across all library entries — there are zero remaining nested entry-keys, so the `vite-plugin-dts` nested-entry-key bug (W0 Lane III root cause) can no longer regress here.

`libraryExternal` and `libraryGlobals` were not touched (`embla-carousel` / `embla-carousel-vue` already external via the v0.9.x peer-dep list).

## § CHANGELOG.md entry (verbatim, Lane C section)

Inserted as the top-of-file v1.0.0 stanza (alongside placeholder space for Lane A + Lane B sections to append):

```markdown
## v1.0.0 — unreleased — L.W1 HEADLINE (root-barrel Phase 2 + curated surface + api/ discovery + subpath flatten)

L.W1 HEADLINE — bundles four architectural transpositions into the v1.0
cohort: (A) root-barrel Phase 2 strips vueuse-bearing re-exports to close
the SCC trap; (B) `src/api/` discovery layer for canonical public types +
constants; (C) flat subpath rename for the v0.9.x nested composables
subpaths + new `/carousel` subpath; (D) self-contained dts verified for
every public subpath.

See `MIGRATION.md` (authored in L.W5) for the consumer-facing migration
path.

### BREAKING — Lane C (subpath flatten)

- **`@mkbabb/glass-ui/composables/dark` REMOVED** — use
  `@mkbabb/glass-ui/dark`. The nested form was a v0.9.x transitional
  shape introduced at the W0 Lane III dts-publication-gap fix; v1.0
  flattens it to match every other public subpath (`/forms`, `/dock`,
  `/configurator`, ...). Per L invariant 4, no legacy alias is shipped.
- **`@mkbabb/glass-ui/composables/keyboard` REMOVED** — use
  `@mkbabb/glass-ui/keyboard`. Same rationale.
- **`dist/dark-subpath.{js,d.ts}` + `dist/keyboard-subpath.{js,d.ts}`
  artefacts retire** — the v0.9.4 transitional dist filenames are
  replaced by canonical `dist/dark.{js,d.ts}` + `dist/keyboard.{js,d.ts}`.

### ADDED — Lane C (carousel subpath)

- **`@mkbabb/glass-ui/carousel`** subpath barrel at `src/carousel.ts`.
  Re-exports `useCarousel` (the embla-carousel-vue + `createInjectionState`
  composable that powers `<Carousel>` and the `Carousel*` family) plus the
  `CarouselApi` type. `useCarousel` imports `createInjectionState` from
  `@vueuse/core`, so isolating it on its own subpath keeps it off the
  consumer's root-barrel tree-shake walk — the same SCC-trap mechanism
  that motivates the `/dark` + `/keyboard` carve.
```

Note: the `v1.0.0` header is currently marked `unreleased`; the orchestrator should append Lane A + Lane B subsections under the same heading and update the date on v1.0 release tag.

## § dist verification

### Emission

```
$ ls -la dist/dark.* dist/keyboard.* dist/carousel.*
-rw-r--r-- 716 dist/carousel.d.ts
-rw-r--r--  83 dist/carousel.js
-rw-r--r-- 400 dist/dark.d.ts
-rw-r--r--  78 dist/dark.js
-rw-r--r-- 1355 dist/keyboard.d.ts
-rw-r--r-- 207 dist/keyboard.js
```

### Self-containment (no broken `'../src/...'` re-exports)

```
$ grep -E "'\.\./src/" dist/dark.d.ts dist/keyboard.d.ts dist/carousel.d.ts
(empty — no matches)
```

The W0 Lane III pathology is structurally absent: every entry-key is flat, so `vite-plugin-dts` writes the rolled self-contained dts at the entry-key location with no nested-path computation.

### Retired artefacts

```
$ ls dist/ | grep -E "dark-subpath|keyboard-subpath|composables"
(empty — both transitional dist filenames retired; no dist/composables/ subdir)
```

### Inlined dts shape (sampled)

- `dist/dark.d.ts`: 12 lines — full inlined `useGlobalDark` signature with `Ref` from vue + `UseDarkReturn` from `@vueuse/core` re-imported.
- `dist/keyboard.d.ts`: 44 lines — full inlined `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac` + 4 interfaces / types.
- `dist/carousel.d.ts`: 20 lines — full inlined `useCarousel` signature + `CarouselApi` type alias (compiled to `CarouselApi_2` private name + public `CarouselApi` re-export, plus `Ref` + `UnwrapRef` from vue and `EmblaCarouselType` from embla-carousel).

### Runtime probes (this worktree)

```
$ node -e "import('./dist/dark.js').then(m => console.log('dark:', Object.keys(m)))"
dark: [ 'useGlobalDark' ]

$ node -e "import('./dist/keyboard.js').then(m => console.log('keyboard:', Object.keys(m)))"
keyboard: [
  'formatCombo',
  'formatComboParts',
  'isMac',
  'registerShortcut',
  'useRegisteredShortcuts'
]

$ node -e "import('./dist/carousel.js').then(m => console.log('carousel:', Object.keys(m)))"
carousel: [ 'useCarousel' ]
```

All three subpaths resolve at runtime with their expected named exports.

## § Synthetic-consumer probe transcript

Probe lives at `/tmp/glass-ui-flat-subpaths-probe/` per L invariant 18.

### Layout

```
/tmp/glass-ui-flat-subpaths-probe/
├── package.json    # depends on glass-ui worktree via file: protocol
├── tsconfig.json   # strict + verbatimModuleSyntax + Bundler resolution + noEmit
└── probe.ts        # imports useGlobalDark + keyboard family + useCarousel + types
```

### `probe.ts` (load-bearing)

```ts
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import {
    registerShortcut,
    useRegisteredShortcuts,
    formatCombo,
    formatComboParts,
    isMac,
} from "@mkbabb/glass-ui/keyboard";
import type {
    ShortcutOptions,
    ShortcutCombo,
    RegisteredShortcut,
    ShortcutEventType,
} from "@mkbabb/glass-ui/keyboard";
import { useCarousel } from "@mkbabb/glass-ui/carousel";
import type { CarouselApi } from "@mkbabb/glass-ui/carousel";
// (light-shape exercise of every imported symbol follows)
```

### Outputs

```
$ cd /tmp/glass-ui-flat-subpaths-probe && npm install --silent
(no errors; @mkbabb/glass-ui resolves via file: protocol to the worktree's
 dist/ — package.json exports + typesVersions + types fields all consulted)

$ npx tsc
(exit 0; zero errors)

$ node -e "Promise.all([import('@mkbabb/glass-ui/dark'), import('@mkbabb/glass-ui/keyboard'), import('@mkbabb/glass-ui/carousel')]).then(([d,k,c]) => { console.log('dark:', Object.keys(d)); console.log('keyboard:', Object.keys(k)); console.log('carousel:', Object.keys(c)); })"
dark: [ 'useGlobalDark' ]
keyboard: [ 'formatCombo', 'formatComboParts', 'isMac', 'registerShortcut', 'useRegisteredShortcuts' ]
carousel: [ 'useCarousel' ]
```

### Retired-subpath probe (confirms clean break)

```
$ node -e "import('@mkbabb/glass-ui/composables/dark').then(m => console.log('UNEXPECTED:', Object.keys(m))).catch(e => console.log('EXPECTED FAIL:', e.code))"
EXPECTED FAIL: ERR_PACKAGE_PATH_NOT_EXPORTED
```

The retired nested subpath fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` (Node's standard package-exports gate), confirming v1.0's breaking-change shape is real and enforced at the `package.json` `exports` boundary — exactly what L invariant 4 mandates.

### Worktree-diff verification

```
$ git status --short
 M CHANGELOG.md
 M package.json
 M vite.library.ts
?? src/carousel.ts
?? src/dark.ts
?? src/keyboard.ts
```

Six files touched (3 modified + 3 created). No file outside Lane C's declared bounds was modified. `src/composables/dark.ts` + `src/composables/keyboard.ts` (W0 territory) untouched per dispatch's MUST NOT TOUCH clause. `src/index.ts` (Lane A) untouched. `src/api/` (Lane B) untouched. `dist/` is the build product, not tracked.

## § Build + typecheck transcript

```
$ npm run typecheck
> vue-tsc --noEmit
(exit 0; zero errors)

$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
... (vite-plugin-dts API-Extractor warnings about TS 5.9 newer than bundled
 5.8.2 — pre-existing, not introduced by this change)
[vite:dts] Declaration files built in 33866ms.
✓ built in 34.95s
```

Build green; dist artefacts emit at expected locations; no nested entry-key warnings.

## § v1.0 breaking-change list (feeds MIGRATION.md at W5)

| Old (v0.9.x) | New (v1.0) | Notes |
|---|---|---|
| `import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark"` | `import { useGlobalDark } from "@mkbabb/glass-ui/dark"` | One-line consumer rename. |
| `import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard"` | `import { registerShortcut } from "@mkbabb/glass-ui/keyboard"` | One-line consumer rename. (Same for the rest of the keyboard family.) |
| `import { useCarousel } from "@mkbabb/glass-ui"` (root barrel) | `import { useCarousel } from "@mkbabb/glass-ui/carousel"` | Lane A removes the root-barrel re-export at the same v1.0 cut. New subpath added here. |
| `dist/dark-subpath.{js,d.ts}` | `dist/dark.{js,d.ts}` | Dist filename change (consumer-invisible if using package-name + subpath). |
| `dist/keyboard-subpath.{js,d.ts}` | `dist/keyboard.{js,d.ts}` | Dist filename change. |

Consumers that already migrated to the v0.9.3 / v0.9.4 nested subpath need a one-line rename per call-site (or a tsconfig path-alias if many call-sites). The migration is mechanical (sed-able). Consumers that stayed on root-barrel imports for `useGlobalDark` / `registerShortcut` / `useCarousel` get a slightly louder break — they must move to the new subpath shape entirely. Lane A's root-barrel curation is the canonical site for that piece of guidance.

## § Open questions for orchestrator

1. **CHANGELOG header date** — the v1.0.0 stanza currently reads `unreleased`. Should the orchestrator update to a concrete date at W1 close commit, or defer to the actual v1.0 tag-push wave?

2. **MIGRATION.md timing** — the dispatch references "MIGRATION.md (W5 forthcoming)" but the existing v0.9.4 CHANGELOG references the v0.9.3 → v1.0 path inline. Should Lane C produce a draft MIGRATION.md snippet now (matching the breaking-change table above), or wait for W5 to consume this proof doc as a source?

3. **Lane A coordination** — Lane A's root-barrel curation must also remove `useCarousel` re-export (per W1 spec Step 2). Lane C exposed the new `/carousel` subpath; Lane A removes the root-barrel exit. The orchestrator must confirm Lane A's diff includes that removal before the W1 hard gate (a) is satisfied. Lane C did NOT modify `src/index.ts` (territory boundary respected).

4. **Speedtest re-link** — the W1 hard gate (j) requires a speedtest re-link commit. Lane C's flat-subpath rename means any speedtest call-site using the v0.9.4 transitional nested path will break at re-link. The orchestrator's re-link wave should include a `rg "@mkbabb/glass-ui/composables/(dark|keyboard)"` sweep in the speedtest tree and rewrite to the flat form.

5. **`scripts/release.sh` subpath-probe block** — the W0 Lane III patch added a per-subpath `node -e "import('@mkbabb/glass-ui/<sp>')"` probe in the release script. That probe list should be updated at v1.0 to drop `composables/dark` + `composables/keyboard` and add `dark` + `keyboard` + `carousel`. This is outside Lane C's file bounds (release.sh) — flagging for orchestrator's W1 close ceremony or the W5 doc cohort, whichever is closer.

6. **`src/composables/index.ts` re-export coverage** — the internal barrel still re-exports from `./useGlobalDark` and `./useKeyboardShortcuts` shims (per W0 Lane III importer-graph table). Lane C did not touch that file (it's NOT in the public-surface plumbing — it's internal). Confirm whether L.W2 modularization sweep should retire those shims or whether they remain as internal-import smoothing throughout v1.0.

## § Brittleness window declaration

Per W1 spec line 8: `breaking_changes_during_wave: yes`. Lane C's contribution to the wave-level brittleness window is bounded to:

- The retirement of `@mkbabb/glass-ui/composables/{dark,keyboard}` (Node `ERR_PACKAGE_PATH_NOT_EXPORTED` for any unmigrated consumer call-site).
- The dist filename rename `dark-subpath` → `dark` / `keyboard-subpath` → `keyboard` (consumer-invisible if consumed via package-name + subpath, but loud for any direct `node_modules/.../dist/dark-subpath.js` resolver).

No other Lane C change is breaking. The new `/carousel` subpath is additive on the subpath surface (the breaking piece — root-barrel removal of `useCarousel` — is owned by Lane A).
