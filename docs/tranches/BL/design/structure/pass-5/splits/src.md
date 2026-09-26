# D1 pass 5 · B-S11 split rows, src zone

Seat: SPLIT-AUTHOR, route D1-B, zone `src`. Model claude-opus-5-5. Rows are authored on pass-4's chained tree (base `5e278aa7`, replay digest `6618df1f…`). Every number here comes from a command this seat ran on 2026-09-26; the commands and their filtered output are in `pass-5/B-kit/authored/splits/src/results.txt`. This seat authors rows only. It landed nothing in the chain and edited no tracked file in the checkout.

## 1 · Result

The src zone had 23 B6 lines on the pass-4 tree: 21 files over 500 lines, `src/index.ts` (585), and `dock/__tests__/` at 16 files. Fifteen rows split the 21 files into named modules. `src/index.ts` gets a written counterexample (§4). `dock/__tests__/` stays at 16 and is reported under P4-R5 (§5).

| reading (wt2: fresh replay + rows 01-15) | base | after |
|---|---|---|
| seal B6, all zones | 62 | **41** (0 new, 21 gone) |
| B6 lines left in `src/` | 23 | 2 (`src/index.ts`, `dock/__tests__/`) |
| seal B0 / B2 | 430 / 67 | 430 / 67 (lines re-pointed, none added) |
| seal B1, B3-B5, B7-B17 | 0 | 0 |
| vitest, whole suite | 2,331: 2,324 pass, 6 fail, 1 skip | the same 2,331 and the same 6 failures (boot-graph × 3, seal B0/B2/B6) |
| test files | 723 | 729 |
| `npm run build`, `vue-tsc` (app), `vue-tsc -p tsconfig.test.json` | — | exit 0, 0, 0 |
| `surface.mjs check` | — | 0 differences (69 keys, 583 runtime, 1,241 type names) |
| cascade `verify` | — | fonts, theme identical; styles and styles.css read RED "content" on row 03 only (§6.1) |
| `apply.mjs --check` against the authoring tree | — | IDENTICAL |

## 2 · What this seat wrote

Under `docs/tranches/BL/design/structure/pass-5/`:

- `B-kit/authored/splits/src/NN-<name>.mjs` (15 rows). Each row exports `why` and `edits` in derive/edits.mjs's vocabulary (`create`, `remove`, exact `from`/`to`), and every edit carries its own `why`.
- `B-kit/authored/splits/src/02-dock-styles.moves.json`. The one move list, applied through the floor engine before row 02's edits. It declares 9 scan deltas.
- `B-kit/authored/splits/src/ORDER.json`. The apply order.
- `B-kit/authored/splits/src/refused/dock-shell.moves.json`. The dock/shell design that FD-2 refused, with the evidence (§5).
- `B-kit/authored/splits/src/tools/gen-row.mjs`. Writes a row from the tree before a split and the tree after it.
- `B-kit/authored/splits/src/tools/apply.mjs`. Applies the rows in order to a linked worktree. It runs moves through the tree's `move.mjs`, applies edits by derive/edits.mjs's rules through pass-4's `lib/row.mjs`, and supports `--only`, `--through` and `--check <dir>`. It refuses the main checkout.
- `B-kit/authored/splits/src/tools/scopecmp.mjs`. The cascade comparison with Vue scope ids erased (§6.1).
- `B-kit/authored/splits/src/results.txt`. The final verification.
- `splits/src.md`. This report.

To reproduce, run from an untouched worktree at `5e278aa7` (`kitwt`):

```
node kitwt/docs/tranches/BL/design/structure/pass-4/B-kit/replay.mjs --root <wt>
node <checkout>/docs/tranches/BL/design/structure/pass-5/B-kit/authored/splits/src/tools/apply.mjs --root <wt>
```

The checkout's current pass-4 kit does not replay the chain: its floor rows moved with the P5 floor commit, and S1 stops on a digest mismatch (`fb00dafd…` against `a974a609…`).

## 3 · The splits

Line counts are `wc -l` on the tree before the row and after it. "new" means the file is created.

| row | file (before) | split | lines after | verification |
|---|---|---|---|---|
| 01 | `dock/GlassDock.vue` 545 | `composables/useDockKeyboard.ts` (summaryIsDisclosure, onSummaryKeydown, onFullKeydown) · `legibility/useDockBackdropLuminance.ts` (the live backdrop-luminance observer); the legibility door publishes it; the pin gains 1 line | 484 · 73 · 45 | build, both vue-tsc, dock tests; `dock/composables` reaches 12, the bound |
| 02 | `dock/styles/run.css` 599, `shell.css` 527 | `dock/styles` held 12 files, so moves go first: `layers.css`, `layer-group.css` and `crossfade.css` become the CSS module `dock/layers/` with an `index.css` door that `core.css` imports at the same position. `run.css` → `run-cap.css` (the W5 cut cap, live region, keyframes). `shell.css` → `shell-plates.css`. `g-dock-lattice.test.ts` and `radius-role-canon.test.ts` read the new paths. The pin gains the module. | run 417 · run-cap 190 · shell 427 · plates 109 · door 8 | cascade identical on all 4 entries |
| 03 | `timeline/Timeline.vue` 723 | `TimelineMarks.vue` (the mark list: roving tabindex, press, the mark styles and tl-check keyframes) · `geometry.ts` gains stateOf, isIndeterminate, accentOf; `timeline.contract.test.ts` reads both SFCs | 454 · 312 · geometry 171 | timeline tests; cascade §6.1 |
| 04 | `pager-dots/PagerDots.vue` 606 | `usePagerWindow.ts` (win, shown, nextPolicy, pipRank) · `usePagerKeys.ts` (rovingTabindex, onKeydown, the focus-survival watch) | 467 · 88 · 116 | pager tests, vue-tsc |
| 05 | `easing/EasingPicker.vue` 626 | `useEasingModel.ts` · `useEasingSweep.ts` (drawn) · `useEasingCopy.ts`; the handle overlay stays because a test reads `ev.clientX` in the SFC | 477 · 71 · 64 · 66 | easing tests |
| 06 | `configurator/Configurator.vue` 508, `styles.css` 591 | `types.ts` (five public types; the door and useConfiguratorState re-point) · `gallery.css` + `placement.css`, imported in order through `index.css` | 444 · 74 · styles 430 · 109 · 67 | surface 0 differences; cascade identical |
| 07 | `slider/styles.css` 506, `sheet/styles.css` 578 | `slider/loupe.css` (unlayered; `orphan-css-partial.test.ts` lists it in LAYER_EXCEPTIONS with a one-line edit) · `sheet/graded-edge.css`; `slider-cursor-affordance`, `sheet-reach`, `sheet-graded-edge` and `focus-veil` read both sheets | 359 · 154 · 315 · 271 | cascade identical |
| 08 | `music-staff/staffGeometry.ts` 606, `__tests__/music-staff.geometry.test.ts` 504 | `types.ts` (the vocabulary, note contract and geometry interfaces) · `staffPitch.ts` (RHYTHMS, rhythmOf, spell, musicPitchName, staffPos); the door, midiAdapter and MusicStaff.vue re-point · the test splits into `.glyphs` and `.pitch` | 455 · 102 · 67 · test 267 · 200 · 36 | 55 = 55 tests |
| 09 | `sortable-list/drag/drag.ts` 631 | `vacancy.ts` (createVacancy: the Origin type, arrival, ARMED_ATTR, VACANCY_BLOCK_PROP) · `landing.ts` (createLanding: fly, dispose) | 472 · 147 · 67 | 39 = 39 tests |
| 10 | `aurora/config/presets.ts` 566 | `config/types.ts`; the door's type exports point at it; four aurora tests re-point; `harness.test.ts` takes AuroraConfig from the public entry `@glass/components/aurora/aurora-config` | 204 · 370 | B2 stays 67 |
| 11 | `aurora/runtime/runtime.ts` 524 | `runtime/contract.ts` (the modes, options, returned shape and the pure policies; shouldInitEagerly, shouldPreserveDrawingBuffer, REDUCED_MOTION_TIME exported for runtime.ts); `runtime/index.ts`, two aurora tests, `harness.test.ts` and `AuroraStage.vue` re-point | 342 · 199 | B2 stays 67 |
| 12 | `blob/renderer/webgl/metaball.frag.ts` 530, `webgpu/metaball.wgsl.ts` 528 | `webgl/metaball-field.glsl.ts` (breath, sceneDistG, surfaceNormalFromGrad, softShadow2D, samplePaletteOklch, blendSatColor) · `webgpu/metaball-field.wgsl.ts` (sceneDistG, surfaceNormalFromGrad, softShadow2D), each spliced where the text stood; README's shader tree and fwidth citations follow | 353 · 191 · 429 · 114 | both assembled strings byte-identical (42,475 chars, sha256 `2f79be4a305c`; 28,956 chars, `5d589891ecfc`); `gl-excise` passes (the new partial has no live-code register token) |
| 13 | `composables/glass/webgpu/useWebGPUCanvas.ts` 510 | `sharedDevice.ts` (supportsWebGPU, the memoised device promise, its test reset, acquireSharedDevice); `useGpuSubstrate.ts` and the test re-point; no re-export | 395 · 125 | glass tests, vue-tsc |
| 14 | `constellation/__tests__/constellationField.test.ts` 825 | by subject: the field engine + generalized engine + kVis floor stay · `constellationWarp.test.ts` (focal warp spring, ω-reconcile, gravity well) · `constellationWander.test.ts` (refit, auto-drift wander) · `fieldFixture.ts` (makeField, read by the three) | 303 · 350 · 162 · 23 | 41 = 20 + 14 + 7 |
| 15 | `composables/glass/__tests__/useWebGLCanvas.test.ts` 540, `useWebGPUCanvas.test.ts` 507 | the WebGL consumer contract stays · `useWebGLCanvas.breaker.test.ts` (the circuit-breaker) · `webglHarness.ts` (the fake DOM, `installFakeDom()`, `advanceClock()`). The WebGPU prelude stays · the two picker describes go to `webgpu/__tests__/useGpuSubstrate.test.ts` | 289 · 142 · 129 · 273 · 285 | 10 = 6 + 4; 8 = 4 + 4; B16 0 |

Notes on rows 13 to 15:

- `useWebGPUCanvas.test.ts` was 509 lines on the pass-4 tree. Row 13's import re-point takes it to 507.
- Row 15 drops `flushFrames` from the WebGPU test. It was defined there and no test read it.
- Row 15's first design put the picker tests in `glass/__tests__/` beside a shared `webgpuHarness.ts`. The gate read B16 1, because those tests read only the webgpu module. B16 homes them in `webgpu/__tests__/`, and a helper in one slot may not be read from another. So the picker file and the prelude file each carry their own copy of the fake DOM: `makeCanvas` and the two hooks, about 50 lines. The base already had the same duplication between the WebGL and WebGPU files.

## 4 · Counterexample: `src/index.ts` (585)

The root barrel cannot split into modules without breaking a law or a gate. Three things hold it to one file:

- **B14 (door purity).** It is a door, so it holds only `export … from`.
- **G-BARREL-EXPLICIT (`tests/public-surface.spec.ts:741`).** The barrel may not use `export * from`.
- **`scripts/verify-export-types.mjs:547` (`sourceRootSurface`).** It reads the root surface from `src/index.ts` alone and throws unless every statement names its exports.

A second file could hold part of the list in only two ways, and both are closed:

- `index.ts` re-exports that file's names. The second file then is not a door but re-exports, which is a relay (B12). `index.ts` would also have to repeat the names, since `export *` is barred.
- The second file becomes a second entry. That changes the package surface, which `surface.mjs` pins and R-10 / P4-R1 hold the consumer zones to.

The file's size is prose plus explicit names. It has 178 comment lines (the import-shape canon, the heavy-peer exclusion table, the root-inclusion bar), 12 blank lines and 395 lines of `export { … } from`. The one lawful reduction is to move the 178 comment lines out, which leaves 407 lines. That is a decision about where the import-shape canon lives, not a split, so this seat leaves it to the route seat or the owner.

## 5 · P4-R5: `dock/__tests__/` after the GlassDock split

The count stays at **16** direct files on the final tree (B6 line `src/components/dock/__tests__/: 16 direct files > 12`).

GlassDock.vue splits in place (row 01), so no dock test changes its subject. The design that would have lowered the count was refused. It moved GlassDock.vue and the five hooks only it reads into a module `dock/shell/`, and its five single-subject tests would have followed, taking the count from 16 to 11. The floor engine refused it at FD-2 on the chained tree:

```
node scripts/structure/move.mjs refused/dock-shell.moves.json --root <wt> --dry
→ addedPairs 1, refused true, "FD-2 CO-CYCLIC (new) src/components/dock ↔ src/components/dock/shell", residue 0, 18 undeclared scan deltas
```

The dock door reads the child, since it publishes GlassDock. GlassDock reads dock-level files: `constants.ts`, `composables/dockContext.ts`, `composables/useDockState.ts`, and `useDockSpring.ts` through useDockMorph and useDockRun. LAW §4's base rule would move those into a sibling base module, which re-carves the whole dock rather than splitting one file.

The tests seat's report (`splits/tests.md` §5.1) adds `lattice/reach.test.ts` to this slot, which makes it **17**. The slot needs its own carve, either a module for the dock's run/lattice tests or the base-module re-carve above. That belongs to the route seat.

## 6 · Open gaps

1. **Row 03 reads RED under `cascade.mjs verify`.** Timeline.vue's mark styles move into TimelineMarks.vue, so cascade.mjs numbers the scope ids differently and reports "content changed" on `./styles` and `./styles.css` (17 rules only-base, 17 only-now). `tools/scopecmp.mjs` erases the scope ids and finds:
   - Both multisets are equal (1,970 and 365 rules).
   - 10 of Timeline's own rules now follow TimelineMarks' 17 rules.
   - The one element both SFCs style, `.tl__marks`, gets `grid-area` and `align-self` from the parent and six other properties from the child. No property is set by both, so the order change resolves to the same values.

   This is an argument from the rule text, not a paint capture. The route needs either a browser check of the timeline story or a cascade verdict that understands an SFC style move.
2. **Cross-zone test edits.** Rows 02, 07, 10 and 11 edit `tests/` files, and the tests seat re-carves several of them: `g-dock-lattice`, `radius-role-canon`, `orphan-css-partial`, `sheet-graded-edge`, `focus-veil`, and `harness.test` in aurora. Land these rows before the tests seat's `split.mjs` runs. That tool derives from the tree it runs on, so it carries these edits into its parts. The other order breaks these rows' exact `from` text.
3. **The seal pin.** Rows 01 and 02 edit `scripts/structure/records/seal-pin.json` (1,629 → 1,631 lines: one door name, one module). The route re-derives the pin with the gate's `--write-pin` if it lands rows in another order.
4. **Authored on pass-4's tree, not the P5 floor.** The route re-derives on the P5 floor, so any row whose `from` text the P5 floor changed must be re-generated with `tools/gen-row.mjs` from the same before/after pair.
5. **Type origins move.** Rows 06, 08, 10 and 11 move type declarations to new files, and the doors re-point. The surface check is names-only and reads 0 differences. The `.d.ts` paths inside `dist/` change for those types.
6. **B0 and B2 hold, not fall.** Rows 02, 07, 10 and 11 re-point 4 B0 lines and 3 B2 lines to the files that now hold the names. The counts stay 430 and 67 and are P4-R1/P4-R2's to cure.
7. **`src/index.ts`** is a counterexample (§4). The prose relocation that would take it to 407 lines is open for the route seat or the owner.
8. **`dock/__tests__/`** is at 16, or 17 with the tests seat's rows (§5).
