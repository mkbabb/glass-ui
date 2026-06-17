# BB.W-CARVE3 — DELTA (the carve-correctness record)

The three over-bound god-modules carved under 500, the `proof:no-god-module`
ratchet drained to ∅ for the three CARVE3 files (the MONOTONIC drain honoured —
the rows DELETED in the same diff that carved the files), and the FourierField
renderer lifted into `composables/useFourierField.ts` (the
aurora/goo-blob/constellation colocation symmetry restored).

**This is a STRUCTURAL wave — it changes ZERO paint by construction.** The two
CSS carves move rules without changing one declaration; the FourierField
extraction is a pure JS refactor whose render output is identical. The binding
truth is `proof:no-god-module` GREEN-for-the-three + the byte-isomorphism
witness + typecheck. There is NO `proof:ba-gestalt` requirement (BB inv-4 binds
VISUAL waves only).

## §0 RE-GROUND DRIFT (recorded; the spec premise had moved)

The spec authored against a `RATCHET_BASELINES == {}` premise (the three files
"un-grandfathered breaches"). At this wave's HEAD the premise had DRIFTED:

1. **The ratchet was NOT `{}`.** BB.W-CI-GREEN re-armed it with three
   `BOOK(BB.W-CARVE3)` rows at the live counts — `offsets-sizing.css: 574`,
   `utilities/base.css: 516`, `FourierField.vue: 505` (the honest deferral the
   BA `--run local`-only false-close-class repair installed). So the three files
   were GRANDFATHERED, not raw violations. The carve still owed; the close-state
   path is the same (carve under 500 + DRAIN the rows).
2. **The line counts moved.** `offsets-sizing.css` 562 → **574** (grew at
   BB.W-PERF-PRODUCER — the density-ratio `--dock-icon-glyph` block);
   `base.css` 541 → **516** (W-SCROLL-FADE-RETIRE already deleted the dead
   `.scroll-fade-*` masks); `FourierField.vue` **505** (unchanged).
3. **An extra direct reader the spec census missed.** `proof-perf-producer.mjs:47`
   (`PATHS.offsetsSizing`) reads `offsets-sizing.css` for the `--dock-icon-glyph`
   block (which lands in §10 → `sizing.css`). It landed in Batch 3 AFTER the
   spec was written, so it is NOT on the spec's reader-re-point list — but it is
   a direct reader of a file this wave deletes, so leaving it would red master
   CI. Re-pointed to `sizing.css` as a §0-required reader fix (no other Batch-4
   wave touches `proof-perf-producer.mjs`).
4. **A foreign violation outside this wave's bounds.** `src/styles/tokens/glass.css`
   is **503** at this working-tree HEAD (committed HEAD = 499; a SIBLING Batch-4
   in-flight edit — W-DARK-INK-WARM's `oklch(from …)` recipe — added 6 lines).
   It is NOT in this wave's bounds and NOT carved here. After this wave's carve +
   ratchet drain, `proof:no-god-module`'s SOLE remaining violation is `glass.css`
   — a sibling's responsibility (see coordination).
5. **`proof-no-god-module.mjs` was edited (the monotonic drain).** The spec's
   "Do NOT touch proof-no-god-module.mjs" fence was predicated on the empty
   ratchet. With the ratchet re-armed, the gate's OWN stale-row guard reds a row
   whose file dropped under 500 ("delete the row — the ratchet only drains"), so
   the three rows MUST be deleted in this diff. `proof-no-god-module.mjs` is NOT
   one of the four orchestrator-owned shared files, and the rows are this wave's
   own (`BOOK(BB.W-CARVE3)`). The deletion IS the literal close-state goal
   (`RATCHET_BASELINES == {}`).

## The three line-count deltas

| file | before | after | shape |
|---|---|---|---|
| `src/styles/tokens/offsets-sizing.css` | 574 | **DELETED** | carved at the §9/§10 `═══` seam |
| → `src/styles/tokens/offsets.css` (new) | — | **93** | §9 ANIMATION OFFSETS `:root` partial |
| → `src/styles/tokens/sizing.css` (new) | — | **499** | §10 SIZING `:root` partial |
| `src/styles/utilities/base.css` | 516 | **288** | the @property fade pair + the FORM/INTERACTION half (→ `.tap-squish`) |
| → `src/styles/utilities/base-misc.css` (new) | — | **250** | the post-tap-squish tail (status-dot → kbd + the fading-scroll recipe) |
| `src/components/custom/fourier-field/FourierField.vue` | 505 | **100** | the thin SFC (props + 2 refs + the `useFourierField` call) |
| → `…/fourier-field/composables/useFourierField.ts` (new) | — | **465** | the lifted ~475-line renderer |

Every carved file is under 500. `sizing.css` (499) is the tightest — the lone
inter-section blank line and the trailing `:root` blank were normalized away
(whitespace inside `:root`; the dist collapses it either way).

## The byte-isomorphism witness (W3 — the binding carve-correctness floor)

The carve moves rules, never paint. Verified analytically (the binding
`dist/glass-ui.css` empty-diff witness is captured at the orchestrator's
consolidated post-merge build; this agent does not run `vite build` — the
concurrent-build fence):

- **tokens** — `git show HEAD:offsets-sizing.css` declarations diffed against
  `offsets.css + sizing.css` declarations: the ONLY deltas are the two new
  file-header CSS comments + the `:root }` close (offsets.css) / `:root {` open
  (sizing.css) boundary. NO design-token declaration line moved or changed. The
  comments are stripped by the dist CSS minifier; two adjacent `:root {}` blocks
  in the same `@import` cascade resolve identically to one logical `:root`.
- **utilities** — `git show HEAD:base.css` declarations diffed against
  `base.css + base-misc.css` declarations: the ONLY deltas are the two header
  comments + the `@layer components }` close / `@layer components {` open
  boundary. NO recipe rule moved or changed. Two adjacent `@layer components {}`
  blocks in source order compose into one logical layer. The `@property
  --fade-start/--fade-end` registrations stay in `base.css` (source-order BEFORE
  the `.fading-scroll` rules in `base-misc.css`).

## The import-order soundness (W3 — `assertMonolithImportOrder`)

```
tokens   importOrderPreserved: true  missing: []
  order: scheme-motion → color-radius → shadow → glass → offsets → sizing → scale-paper → light-dark → dark-arm → property-regs
utilities importOrderPreserved: true  missing: []
  order: animate → base → base-misc → components → btn → a11y-overrides
```

`tokens.css` re-points `@import "./tokens/offsets-sizing.css"` →
`@import "./tokens/offsets.css"; @import "./tokens/sizing.css";` at the same
cascade slot (the parent DELETED). `utilities.css` inserts
`@import "./utilities/base-misc.css";` immediately after `base.css`. The
`read-css-monoliths.mjs` `tokens.order` + `utilities.order` arrays move in
lockstep with the `@import` sequences.

## The `proof:no-god-module` born-RED → GREEN(-for-the-three) log

**Born-RED at HEAD (pre-carve):** the three files grandfathered at 574/516/505,
plus the foreign `glass.css` raw violation:
```
3 file(s) GRANDFATHERED by the ratchet:
  ▣ src/styles/tokens/offsets-sizing.css is 574 (baseline 574)
  ▣ src/styles/utilities/base.css is 516 (baseline 516)
  ▣ src/components/custom/fourier-field/FourierField.vue is 505 (baseline 505)
VIOLATIONS:
  ✗ src/styles/tokens/glass.css is 503 lines (> 500)
status: FAIL
```

**After the carve + ratchet drain:** the three CARVE3 files are OFF the over-list,
the ratchet is ∅, and the SOLE remaining violation is the foreign `glass.css`:
```
RATCHET_BASELINES drained to ∅ — every file is under bound.
ratchetDrained: true   ratchetBaselineCount: 0
cssMonoliths: [{name:tokens, importOrderPreserved:true, missing:[]},
               {name:utilities, importOrderPreserved:true, missing:[]}]
VIOLATIONS:
  ✗ src/styles/tokens/glass.css is 503 lines (> 500)   ← FOREIGN (sibling W-DARK-INK-WARM in-flight)
status: FAIL (modulo the foreign glass.css; GREEN for the three CARVE3 files)
```

The wave reaches its declared close state FOR ITS THREE FILES: their rows are
gone from the ratchet AND they are off the violation list. The `glass.css`
violation is a sibling's responsibility (it must trim `glass.css` back under 500
OR add a ratchet row OR carve it). When the orchestrator reconciles the sibling
arm, `proof:no-god-module` goes GREEN.

## The FourierField colocation symmetry restored (W4)

FourierField was the LONE GL/canvas sibling whose renderer was inline (every
other factors it into `composables/`):

| primitive | SFC lines | renderer composable |
|---|---|---|
| Aurora | 235 | `composables/useAurora.ts` |
| GooBlob | 316 | `composables/useMetaballRenderer.ts` |
| Constellation | 105 | `composables/useConstellation.ts` |
| **FourierField (after)** | **100** | **`composables/useFourierField.ts`** ← NEW |

The SFC keeps `<script setup>` thin (the doc comment, the `withDefaults(defineProps<…>(), …)`
shape, the two `useTemplateRef` host/canvas refs, and the single
`useFourierField(props, { hostRef, canvasRef })` call); the `<template>` + `<style
scoped>` are byte-untouched. The composable owns `resolveColorString` /
`refreshResolvedColor` / `buildSpectrum`, the `useGlobalDark` retint watch, the
`onMounted` wiring, and the `useCanvas2D({ setup: () => ({ render }) })` handle
with the epicycle/comet/curve draw passes. The `clock?: () => number` prop STAYS
in the SFC `defineProps`; the `clock ? clock()` branch + the autonomous
`(now / preset.durationMs) % 1` loop moved to the composable's render body.

- **`/fourier-field` barrel surface unchanged** — `index.ts` is byte-identical
  (the `FourierField` default export, `FourierFieldVariant`, `FourierFieldProps`,
  and the re-exported `math.ts` symbols all resolve unchanged). `verify-export-types`
  is run by the orchestrator post-build.
- **typecheck GREEN** — `vue-tsc --noEmit` exit 0 (the `withDefaults` resolved
  props thread cleanly into the composable's `FourierFieldRenderProps`).
- **`useCanvas2D` NOT edited** — the lifted composable CONSUMES the substrate
  (W-CANVAS-UNIFY's bound); the `useCanvas2D` import resolves at
  `../../../../composables/glass/canvas2d`.

## The re-pointed reader gates (each re-run GREEN after its re-point)

| gate | re-point | result |
|---|---|---|
| `proof:config-chassis` | `offsets` read → `sizing.css` (the `--configurator-divider*` token home) | exit 0 |
| `proof:hierarchy` | `offsets` read → `sizing.css` (the Configurator HIERARCHY vocabulary) | exit 0 |
| `proof:fading-scroll` | `offsets` read → `offsets.css` + `DIST_OFFSETS` → `dist/styles/tokens/offsets.css` (the `--fade-scroll-width`/`--mask-fade-width` home) | exit 0 |
| `proof:perf-producer` | `PATHS.offsetsSizing` → `sizing.css` (the `--dock-icon-glyph` block; §0 RE-GROUND reader) | PASS |
| `proof:fourier-studio` | `fieldVue` read → SFC + composable CONCATENATED (the clock-seam W2 regexes find the moved render expressions) | exit 0 |
| `proof:fourier-field-intensity` | `FIELD_FILES` += the composable (the `OUTLINE_PEAK_ALPHA`-absent negative assert + render-body/clamp/blend-fork/sort asserts cover the moved code) | PASS |
| `proof:substrate-cohesion` | NO touch — `intensity?: number` stays in the SFC `defineProps`; the regex still matches the trimmed SFC | the FOURIER recession arm 4/4 ✓ (the gate's only FAIL is a FOREIGN `<Constellation :opacity-ceiling=0.4>` live-π readback, not fourier — see coordination) |
| `proof:register-ios` | NO touch — reads via `readMonolith(ROOT, "tokens")` (covers the new partials automatically) | exit 0 |
| `proof:no-dead-token` | NO touch — walks the whole `src/styles` tree (picks up offsets.css/sizing.css/base-misc.css automatically) | PASS |
| `proof:css-critical` / `proof:emission` | NO touch — bucket at the thin-root (`tokens.css`/`utilities.css`) level, resolving partials recursively | exit 0 |

## Commit plan (orchestrator-applied)

- CSS arm: `refactor(styles): carve offsets-sizing.css → tokens/{offsets,sizing}.css + base.css tail → utilities/base-misc.css, dist byte-isomorphic (BB.W-CARVE3)`
- SFC arm: `refactor(fourier-field): lift the 475-line renderer to composables/useFourierField.ts — the aurora/goo-blob/constellation colocation symmetry (BB.W-CARVE3)`
- doc/status: the `W-CARVE3-DELTA.md` + the BB PROGRESS row + the `proof-no-god-module.mjs` ratchet drain + the CLAUDE.md fourier-field/ colocation note (deferred-to-or-coordinated-with W-PRECEPT-SYNC).
