# W-CARVE5 DELTA — the FINAL ratchet re-drain (RATCHET_BASELINES → ∅ before W-CLOSE)

BB Batch-6 residual carve, the SECOND (and final) ratchet drain. `proof:no-god-module`
was ∅ at the W-CARVE4 close-state; the Batch-V / B-ask waves re-grew THREE files past
the 500-line bound (legitimate capability growth — the kuwahara medium, the BB api
publications, the curl-warp NOISE fan), BOOK'd to W-CARVE5. This wave RE-DRAINS those
three rows to ∅ — the close-state requirement (`violations == []` AND
`RATCHET_BASELINES == {}`), the FINAL bar before W-CLOSE.

A MECHANICAL, BYTE-ISOMORPHIC carve: each block RELOCATED into a sibling module behind
the same public surface, ZERO value/token/symbol/behaviour change. The GL shader carve
RELOCATES the GLSL bytes (never edits a value — the assembled shader string is proven
byte-identical); the api carve preserves the exact 164-symbol `@mkbabb/glass-ui/api`
surface; the atoms carve preserves the public door + every grep-locked source witness.

## The per-file carve map

| # | drained file | old | new | new sibling | sibling lines | mechanism |
|---|---|---|---|---|---|---|
| 1 | `components/custom/aurora/constants/shaders/mediums.glsl.ts` | 595 | 495 | `shaders/oil-modes.glsl.ts` | 112 | the `StrokeProfile profileFor(int medium, int mode)` (medium,mode)→StrokeProfile SELECTOR (the if-ladder whose knobs are the profile's fields) carved into a sibling GLSL-in-TS module + spliced back into `AURORA_MEDIUMS_POST_BRUSH_GLSL` via a template join (`… + AURORA_OIL_MODES_GLSL + /* glsl */ \`…`) immediately after the `StrokeProfile` struct, before `paintStrokeLayers`. The ASSEMBLED POST_BRUSH string is byte-identical to HEAD (44949 chars, proven) — GLSL declaration order preserved (`profileFor` defined before its `mediumOil`/`mediumOilPastel` callers). |
| 2 | `api/index.ts` | 543 | 483 | `api/types-extra.ts` | 76 | the contiguous composable-return + motion-curve type re-export run (Count-up animator · `useDragMorph` · `useLiquidReveal` · `useDockCtaReceive` · the motion suite + curve library) carved into a sibling, re-joined via `export type * from "./types-extra"`. The `@mkbabb/glass-ui/api` public symbol set is byte-identical (164 symbols, verified). |
| 3 | `components/custom/aurora/composables/atoms.ts` | 506 | 414 | `composables/atoms-fields.ts` | 120 | the FIELD-MAPPING leaves (the `lerp`/`unlerp` math, the `COLOR_ENERGY` poles + the `MOTION_FIELDS` table + `MotionFields`, the textured-medium `applyTexture` fan + its `textureAmountFor` inverse, the `motionFor` classifier) carved into a sibling, imported back. The ZONES `nucleiPrior` + the NOISE `applyNoise`/`warpModeFor` fan + the `{ kind: "smooth" }` arm + the public door (`resolveAtoms`/`configToAtoms`/`DEFAULT_ATOMS` + the atom TYPE shapes) STAY in `atoms.ts`. |

Every drained file < 500 AND every new sibling < 500. `RATCHET_BASELINES == {}` — the
close-state reached.

## The carve target re-pick (carve 1 — the gate-coupling judgment call)

The W-CARVE5 BOOK marker named "the kuwahara medium body" as the mediums carve target.
That body is GREP-LOCKED to `mediums.glsl.ts` by `proof:aur-kuwahara` (W3/BUILD greps
`vec3 mediumKuwahara(` + the SOFT variance-weighted sector blend IN `mediums.glsl.ts`).
Moving it out reds that CI gate (assessed + confirmed). The BINDING byte-isomorphism +
master-CI-green bounds override the marker's suggested scope: the carve re-points to
`profileFor` — a same-size cohesive non-grep-locked block whose move drains mediums to
495 (< 500) while EVERY grep-locked body (`mediumKuwahara` · `structureTensorField` ·
`mediumOilPastel` · `mediumCrayon`) and the `relightImpasto`-call witness stay. The
marker's intent (re-drain the kuwahara-grown file) is met by a different, gate-safe cut.

## The byte-isomorphism proof

### Carve 1 — the GL shader fence (the binding bound)

The ASSEMBLED `AURORA_MEDIUMS_POST_BRUSH_GLSL` string (the actual shader bytes the
`aurora.frag` composes) is BYTE-IDENTICAL to HEAD:
- PRE_BRUSH literal: identical.
- POST_BRUSH (= literal-A + `AURORA_OIL_MODES_GLSL` + literal-B + `AURORA_VANGOGH_MEDIUM_GLSL` + oil-pastel literal): identical, 44949 chars both.

The `proof:composable-return-types` clause-7 GLSL recompose hash legitimately moves
(`1858a1d9…` → `27d2e720…`) because the `MEDIUM_SIBLINGS` concat order
(mediums → oil-modes → vangogh) re-orders the SAME GLSL byte MULTISET — verified
identical length (50458) AND identical char-multiset, every moved byte preserved. This
is an INTERNAL gate hash (a re-snapshot the wave brief sanctions), NOT the shader value.
The `proof:aurora-*` shader source gates (tensor-field, oilpastel-medium,
impasto-relight, stroke-composite, curl-warp, vangogh-preset) + `proof:aur-kuwahara` all
stay GREEN — the behaviour witnesses.

### Carve 2 — the api public surface

The `@mkbabb/glass-ui/api` symbol set is byte-identical: 164 exported names across
`index.ts` ∪ `types-extra.ts` = the 164 names HEAD's `index.ts` exported (0 missing,
0 extra). Every grep-locked per-surface discovery type
(`BorderProgress*`/`EasingPicker*`/`Surface`/`IconChip*`/`HandMark*`/`PagerDotsProps`/
`SpaViewProps`) STAYS textually in `index.ts` for its source gate; only the
non-grep-locked composable-return + motion-curve run moved. `flatten-subpath-types.mjs`
keeps `dist/api.d.ts` flat at the close build, so the published subpath dts is byte-
identical (`verify-export-types` is the close-build probe — typecheck green here).

### Carve 3 — the atoms door

`resolveAtoms` / `configToAtoms` / `DEFAULT_ATOMS` / `nucleiPrior` + the atom TYPE shapes
remain exported from `atoms.ts` (the aurora barrel + `atoms.test.ts` import from there,
unchanged). The 18-test roundtrip suite (`tests/components/custom/aurora/atoms.test.ts`)
passes 18/18 — `resolveAtoms` stays total + `DEFAULT_ATOMS` still deep-equals the
wispy-sky default. `proof:aurora-atoms-roundtrip` stays GREEN (its source witnesses —
`function nucleiPrior` exactly once, the `warpMode`/`warpScale`/`noiseOctaves` NOISE fan,
the `{ kind: "smooth" }` arm — all read `atoms.ts` where they remain). The
`atoms-fields.ts` ↔ `atoms.ts` cycle is a `import type`-only back-edge (erased at
runtime under `verbatimModuleSyntax`), no runtime circular dependency.

## Gates

- `proof:no-god-module` — RED (3 stale baseline rows) → GREEN (`RATCHET_BASELINES == {}`,
  every file under bound). The monotonic-drain guard fired on the carved files (the
  rows deleted in the same diff).
- `proof:composable-return-types` — GREEN (barrel-parity intact; GLSL recompose hash
  re-snapshot to `27d2e720…`; the carve sibling enrolled via the pre-existing
  `oil-modes.glsl.ts` MEDIUM_SIBLINGS slot).
- `proof:aur-kuwahara` / the aurora source-gate fleet — GREEN (GL fence held).
- The api-coupled CI gates (border-progress, easing-primitive, surface-axis, icon-chip,
  handmark, pager-ring, spa-view, no-legacy-commentary, no-retired-survivor,
  subpath-enumeration) — GREEN.
- typecheck — GREEN. The atoms roundtrip unit suite — 18/18.

The live-π aurora gates (`proof:aurora-painterly-statistics`/`-studio`/`-arresting`) are
`local`-only and fail here for the environmental reason (no `:5199` demo + real GPU in
the headless agent), NOT this carve — the binding live-π rides W-REFLECT3, and the
shader bytes are proven identical.
