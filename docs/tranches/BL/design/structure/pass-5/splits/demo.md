# D1 pass 5 · B-S11 split rows, demo zone

Seat: SPLIT-AUTHOR, route D1-B, zone `demo`. Model claude-opus-5-5, asserted from the seat's own identity. Every number below comes from a command this seat ran on 2026-09-26. Each command and its filtered output is in `pass-5/B-kit/authored/splits/demo/results.txt`. This seat authored rows only. It landed nothing in the chain and edited no tracked file in the checkout.

## 1 · Result

All 8 demo files over 500 lines split into named modules. There is no counterexample: every output is at or under 500 lines, and the largest is 430 (`aurora/mediums/painterly.ts`).

| reading | before | after the split |
|---|---|---|
| `bounds.mjs` files over 500, demo zone (arm F) | 8 | **0** |
| `bounds.mjs` dirs over 12, demo zone (arm F) | 2 | 2 (B-S14's; §5.5) |
| seal B6 on the route's pass-4 tree (arm C) | 62 | **54** (−8, exactly these files) |
| seal B0 / B2 (arm C) | 444 / 67 | 445 / 70 (§5.1) |
| every other seal clause (arm C) | 0 | 0 |
| whole vitest suite, arm F | — | 2,313 tests, 2,312 passed, 0 failed, 1 skipped |
| whole vitest suite, arm C | — | 2,331 tests, 2,327 passed, 3 failed (seal B0/B2/B6, red before), 1 skipped |
| F-1 graph, arm F | 7,436 edges, 0 violations | 7,549 edges, 0 violations |
| F-1 graph, arm C | — | 7,934 edges, 0 violations |
| typecheck (`vue-tsc`, both programs), build, demo build | — | all exit 0 on both arms |
| pi-lane scene list (`tests-visual/pi-manifest.ts`) | 80 scenes | 80 scenes, byte-identical (both arms) |
| Playwright, 15 specs / 51 tests (arm F) | 26 passed, 25 failed | 26 passed, 25 failed; the same 51 outcomes, 0 differ |

Arms: **F** is HEAD at seat start (`f5bc31bd`) plus the pass-5 floor rows. **C** is `5e278aa7` plus the pass-4 chain, replayed from a kit home at `5e278aa7` (chain final `6618df1f…` MATCH). The checkout's pass-4 kit stops at S1, because the P5 floor changed the S1 digest.

## 2 · What this seat wrote

Under `docs/tranches/BL/design/structure/pass-5/`:

- `B-kit/authored/splits/demo/rows.json`: the row spec. Each row lists its id, source, why and every file it touches, with each file's own why.
- `B-kit/authored/splits/demo/0N-*.mjs`: the eight rows for arm C, the route's tree. They are authored inputs to pass-4's `derive/edits.mjs` (`{file, why, create}` and `{file, why, from, to}`).
- `B-kit/authored/splits/demo/arm-f/0N-*.mjs`: the same rows cut on arm F. Rows 01, 04 and 08 are byte-identical across the arms.
- `B-kit/authored/splits/demo/tools/author/*.mjs`: the derive scripts. There is one script per file plus `lib.mjs`, and `pi-manifest.edits.json` holds the pi lane's three exact-text edits.
- `B-kit/authored/splits/demo/tools/gen-row.mjs`: writes the rows from a before tree and an after tree. It stops if a changed file is claimed by no row, if a file is claimed by two rows, or if a claimed file is unchanged.
- `B-kit/authored/splits/demo/tools/apply.mjs`: applies the rows using `edits.mjs`'s rules (a `from` must match once, a `create` must find no file), through pass-4's `makeRow`/`applyRow`. `--check` compares the zones byte for byte, and the tool refuses to run on the main checkout.
- `B-kit/authored/splits/demo/tools/conserve.mjs`: prints each source line that is missing from the row's outputs.
- `B-kit/authored/splits/demo/tools/reach.mjs`: counts `@glass/…` reaches to non-entry sources, the way B2 does.
- `B-kit/authored/splits/demo/results.txt` and `splits/demo.md` (this report).

**Why both frozen rows and derive scripts.** The chain has already re-pointed imports in 6 of the 8 sources on arm C (for example, `@glass/components/aurora` becomes `…/aurora/aurora-config`). A row frozen at HEAD would therefore miss at its chain position. The derive scripts find every block by its own text, never by line number, and take each import a new module needs from the source's own import statements by local name, re-based to the new module's directory. The same script cuts the same split on both arms. Re-deriving from a copy of each before-snapshot reproduces the worktree with 0 differences on both arms. The frozen arm C rows are for the route seat to land if the route's tree at B-S11 is still `6618df1f…` in these files. If it is not, the route seat should run the eight scripts and then `gen-row.mjs`.

## 3 · The splits

Line counts are from `wc -l` on arm F. The only differences on arm C are fourier-field (533 → 378) and springs `preview.ts` (62).

| source | before → after | new modules (lines) |
|---|---|---|
| `demo/stories/manifest.ts` | 1,098 → 303 | `manifest/types.ts` (140), `manifest/row.ts` (16), `manifest/categories/{foundations 85, substrates 89, forms 69, display 50, containers 91, navigation 36, dock 75, data 70, feedback 35, motion 64, compositions 69}.ts` |
| `substrates/aurora/presets.ts` | 740 → 106 | `aurora/mediums/preset.ts` (18), `mediums/smooth.ts` (218), `mediums/painterly.ts` (430) |
| `substrates/blob.vue` | 785 → 440 | `blob/presets.ts` (218), `blob/useBlobStage.ts` (146) |
| `dock/overview.vue` | 674 → 421 | `dock/overview/TriggerSection.vue` (157), `dock/overview/PopoverSection.vue` (122) |
| `data/search.vue` | 632 → 225 | `data/search/catalogue.ts` (411) |
| `motion/springs.vue` | 541 → 38 | `motion/springs/preview.ts` (65), `NamedRegisters.vue` (178), `CustomAuthoring.vue` (307) |
| `substrates/fourier-field.vue` | 531 → 376 | `fourier-field/presets.ts` (128), `fourier-field/sources.ts` (36) |
| `substrates/constellation.vue` | 514 → 415 | `constellation/overlays.ts` (114) |

Each module sits in a directory named after the story that owns it (recursive colocation). The manifest globs `./*/*.vue`, so a `.vue` file one level deeper is never read as a route.

- **manifest.** The eleven category blocks move verbatim, one file per category. Each file exports a `CategoryRow` whose `stories` are `StoryRow`s, which the row factory `s()` in `row.ts` builds. `Story`, `Category` and the rest of the vocabulary move to `types.ts`, and `manifest.ts` re-exports `Category`, `Story` and `StoryBackground` as types. The manifest keeps the globs, the background and landing maps, the resolver `story(row)` (the old body of `s()`), `sectionLanding`, `heroScaleForDepth`, `assignDepths`, the assembly (`[foundations, …].map(… stories.map(story))`), the act order and the lookups.
- **aurora presets.** The 17 configurations move verbatim: 6 smooth and 11 painterly. Their builder `cfg()` moves to `mediums/preset.ts`. `presets.ts` keeps the table, its keys and its metadata, so `aurora-vibrancy.spec.ts`, which imports it by path, and pi-manifest's PRESETS reader are unchanged. The preset keys have an identical md5 before and after.
- **blob.** The studio's data (`BlobStudioCfg`, option lists, chroma ceiling, geometry base, five emotion presets) moves to `blob/presets.ts`. The live stage (palette ramp, lean register, reactive `BlobConfig`, and the watch that threads each edit onto it) moves to `useBlobStage(studio)`, which is called where its code used to stand.
- **dock overview.** Two sections leave together with their state. `PopoverSection` writes the page's track through `defineModel("track")` / `v-model:track`, because the transport section prints it. The page's one tile rule becomes `:deep(.dock-stage-tile)`, which keeps the same specificity with no copied rule.
- **search.** The 200-row catalogue moves verbatim: the row type, the curated seeds and the procedural extension.
- **springs.** Each section becomes a component with its own state. The preset rows, the managed preview and the responsive travel that both sections use move to `preview.ts`.
- **fourier-field.** The view model, colour choices and five presets go to `presets.ts`. The source minting (figure labels, `ELLIPTIC_SEED`, `mintFor`) goes to `sources.ts`, beside the existing `fourier-paths.ts`.
- **constellation.** The three `drawOverlay` painters become builders that take their colour as a getter, `computed(() => builder(() => token.value))`, so each still reads its token's live value on every frame. Their bodies are verbatim except for that read.

**Readers outside the zone that the rows carry.** `tests-visual/pi-manifest.ts` parsed `s("cat","id"` rows out of `manifest.ts`. It now reads the category files named by the manifest's `from "./manifest/categories/<id>"` imports, and it throws if there are none (row 01). The source witness in `tests-visual/blob-page.spec.ts` now reads `orbitRadius` from `blob/presets.ts` (row 03). The following text readers stay green unchanged:
- `story-preview-card.test.ts`: `heroScaleForDepth(` stays in `manifest.ts`.
- `FourierField.smoke.test.ts`
- `springs-story`
- `search-contracts`

**Conservation.** The number of non-blank source lines that do not appear verbatim in the outputs is:

| row | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| arm F | 22 | 1 | 8 | 4 | 0 | 6 | 2 | 10 |
| arm C | 22 | 1 | 8 | 4 | 0 | 9 | 3 | 10 |

Each of these lines is one of the following:
- an import statement or specifier that was re-based or regrouped
- a rewritten header sentence
- a category-array brace
- the renamed resolver's `): Story {`
- the overview tile note and rule, now `:deep()`
- a constellation painter wrapper or `.value` read, now a getter

## 4 · Verification

**Arm F** (`results.txt`, "Arm F checks"):
- build, demo build and typecheck all exit 0
- F-1 graph: 7,549 edges, 0 violations
- vitest: 2,313 tests, 0 failed
- The specs that read the split files all pass:

| spec | tests |
|---|---:|
| springs-story | 5 |
| search-contracts | 7 |
| story-preview-card | 68 |
| FourierField.smoke | 30 |
| landing | 3 |
| router-field-ownership | 3 |
| story-lazy | 2 |
| aurora-stage-affordance | 5 |
| route-transition | 2 |

- pi scenes: 80 before and 80 after, byte-identical
- blob witness: 0.3 > 0.22
- A B15-shaped name check over the 36 new or changed paths finds 0 hits.
- `apply.mjs --rows arm-f --check`: 651 files, 0 differ. A second apply stops because the `from` no longer matches.

**Arm C** (`results.txt`, "Arm C checks"):
- seal before → after: B0 444 → 445, B2 67 → 70, B6 62 → 54, every other clause 0 → 0. The "before" counts reproduce the registry's.
- build, demo build and typecheck all exit 0
- F-1 graph: 7,934 edges, 0 violations
- vitest: 2,331 tests. The 3 failures are the seal gate's B0/B2/B6, which were red before the split.
- pi scenes are identical before and after.
- `apply.mjs --check`: 502 files, 0 differ.

**Playwright** (arm F, chromium-headless-new, 15 specs, 51 tests):
- The base arm is `e00fb901` (docs-only commits past `f5bc31bd`) plus the floor rows: 26 passed, 25 failed.
- The 25 failures are aurora-studio:132, aurora-vibrancy:200 ×2, blob-page:191, dock-morph-family ×4, dock-with-slider-live ×4, motion-demo ×5 and tunable-anim ×8. They fail on the base arm too.
- The first hand-cut after-arm had the same 26/25 outcome with the same failing tests. The final derived arm F tree was re-run and compared test by test with the base: 26 passed, 25 failed, 51 of 51 outcomes identical, 0 new failures.
- Playwright was not run on arm C.

## 5 · Open gaps (for the route seat)

1. **B0 +1 and B2 +3 on arm C.**
   - B0: `tests-visual/pi-manifest.ts:47` now builds the category-file path from the manifest's imports. This is a computed read of the kind B0 counts, and B-S12 (the pi lane) or B-S16 (tests-visual carve) owns that reader.
   - B2: `data/search/catalogue.ts` carries search.vue's existing `@glass/components/dock/search/types` type import. `springProjection` and `motionTempo` are now imported by both springs sections, where the old file imported them once. The fourier reaches only moved.
   - Each of these is a reach that already existed, now counted at its new site. Re-pointing them to entries is P4-R2's work in B-S12/B-S14 and is not part of this split. `reach.mjs` on arm F: 15 → 22.
2. **Row order against B-S16 and B-S14.**
   - Rows 01 and 03 edit `tests-visual/pi-manifest.ts` and `tests-visual/blob-page.spec.ts`. If B-S16 moves those files first, re-derive the rows after it.
   - B-S14's story-glob and nested-directory change must keep `./*/*.vue` from picking up `dock/overview/*.vue` and `motion/springs/*.vue`.
3. **Row 04 is one whole-file hunk.** `hunksOf` falls back to a single hunk for `overview.vue`. It applies exactly, but any earlier row that touches `overview.vue` breaks it. The derive script `tools/author/dock-overview.mjs` is the robust path.
4. **Frozen rows are tied to the arm C tree.** If the route's tree at B-S11 differs in these files, run the eight derive scripts and `gen-row.mjs` there.
5. **`demo/stories/containers/` and `demo/stories/foundations/` hold 13 files each.** That is B6 dir work for B-S14 and is not part of this zone's file split.
6. **Playwright ran on arm F only.**
