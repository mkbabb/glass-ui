# B2 residual names: both arms, one recommendation each (pass 6, P5-R3)

B2 read 61 consumer references into non-published `src` files on the P6 floor cut (the gate
of pass 6 run on the rebased chain before S60). The table gives, for every name a consumer
read past a door, the two arms P5-R3 names:

- **(a) consumer-local**: the consumer stops reading the name. It re-points at a published
  name that already carries the same contract, keeps its own copy, or (a test) moves to the
  name's unit, where B2 does not reach.
- **(b) publish**: the name is published on the entry that owns it, through the doors
  between, with one MIGRATION "added" row and one surface-pin row.

The arm that landed is in the last column. The chain steps are in `B-kit/frozen/SEQUENCE.json`:
S64 publishes (derive/publish.mjs, which builds the tree and refuses any surface difference
the rows do not name), S65 re-points consumers, S66-S68 home the tests.

"Ruled" means P5-R3 decides it. Every other row is a recommendation, landed so B2 reads 0,
for the driver to confirm or flip. Flipping a (b) row to (a) is one S64 row out and one S65
edit in.

## Library names read by demo, scripts and tests-visual

| Name | Owner file | Read by | (a) consumer-local | (b) publish | Landed |
|---|---|---|---|---|---|
| `useDockState` | `dock/composables/useDockState.ts` | demo dock-search | none: `useDockSearch` needs a `dockState` the consumer constructs | `./dock` | **(b), ruled** |
| `SearchableItem`, `SearchResult`, `FuzzySearchState` | `dock/search/types.ts` | demo search, catalogue, dock-search | `Parameters<typeof useDockSearch>` spelled at every site | `./dock` (the contract types of a published composable) | **(b), ruled** |
| `SectionHierarchy` | `composables/sidebar/types.ts` | demo virtual layout | restate the base shape locally | `./sidebar` (the base of the published `TreeIndexEntry`) | **(b), ruled** |
| `useFuzzySearch` | `dock/search/useFuzzySearch.ts` | demo `/data/search` | drive the engine through `useDockSearch` and read its `fuzzy` handle (no dock mounted; `rootEl` null) | `./dock` beside `useDockSearch` | **(a), recommended**: BK #42 / SE-4 made the dock the engine's one public expression; publishing it re-opens the second entry SE-4 closed |
| `GLASS_BACKDROP_SHARED_ATTR`, `useGlassBackdropLuminance` | `dock/legibility/useGlassBackdropLuminance.ts` | demo DockStage, glass-material | the story frame keeps its own sampler | `./dock` | **(b), recommended**: the attribute is the contract a consumer sets on a shared backdrop; a second sampler is a second authority |
| `springProjection` | `motion/spring/springProjection.ts` | demo springs (2), `scripts/regen-spring-tokens.mjs` | each consumer re-derives `linear()` stops from keyframes.js | `./motion` (it evaluates keyframes.js's `SpringProgress`, so not `./motion-core`) | **(b), recommended**: the tokens are generated from it; a consumer re-derivation is a third copy of the projection |
| `springSettleDurationSeconds` | the same file | `scripts/regen-spring-tokens.mjs` | the script reads `springProjection(row).settleSeconds`, which is the same value | publish a second name for one number | **(a), recommended** |
| `useScrollScene` (+ its options and return types) | `motion/scroll/useScrollScene.ts` | demo scroll | the story keeps a damped register of its own | `./motion-core` (engine-free) | **(b), recommended** |
| `motionTempo` | `motion/core/tempo/motionTempo.ts` | demo springs (2) | restate the tempo ladder | `./motion-core` | **(b), recommended** |
| `pendingRenderer` | `composables/glass/webgpu/rendererStatus.ts` | demo aurora, blob, constellation, fourier-field | each story writes the pending literal | the root, beside the published `RendererStatus` | **(b), recommended**: four copies of one literal otherwise |
| `RendererStatus` (type) | the same file | the same four stories | already on the root | n/a | **(a)**: re-pointed at the root |
| `isAuroraPointerEnabled` | `aurora/runtime/contract.ts` | demo AuroraStage | restate the predicate (interactivity on, PRM aside) | `./aurora-config` | **(b), recommended**: a predicate on a published config type |
| `MAX_SATS` | `blob/mood/constants.ts` | demo blob | the story hard-codes the bound | `./blob-config` | **(b), recommended** |
| `FOURIER_STROKE_RUNGS` | `fourier-field/register/constants.ts` | demo fourier-field | restate the rung ladder | `./fourier-field` | **(b), recommended**: the rungs a published config field takes |
| `mulberry32`, `hashString` | `composables/glass/procedural/prng.ts` | demo fourier-field sources | a demo-local `prng.ts` | publish two seeding primitives | **(a), ruled** |
| `FOURIER_QUANTUM_FINE` | `fourier-field/register/constants.ts` | tests surface.smoke | the test states the quantum it observes (`1 / 64`) | publish an internal keyboard step | **(a), recommended** |
| `sampleAuroraField`, `auroraFallbackGround`, `DEFAULT_AURORA_CONFIG`, `isSoftwareWebGLRenderer`, `createAurora` | aurora internals | tests-visual aurora-swraster, aurora-vibrancy (page imports) | the page imports the entry sources that already publish them (`/src/components/aurora/aurora-config.ts`, `/src/components/aurora/index.ts`) | n/a (already published) | **(a)** |

## Library names read by tests

A test that reads a unit's inside lives in that unit's `__tests__/` slot (R-3, LAW §9), where
B2 does not reach, so arm (a) is the move and arm (b) would publish a name for a test.
Arm (b) is recommended for none of these.

| Test | Names | Landed |
|---|---|---|
| avatar.contract | the avatar unit (no entry of its own) | colocated in `avatar/__tests__`; the status-slot arm (StatusDot, a second unit) stays in `tests/` on the root and `./status-dot` |
| public-contracts.test-d | `_shared` interaction, primitive, selection, axes | colocated in `_shared/__tests__` (LAW §9 pass 6: the kernel container's own files have one test slot); the dark row moves to `composables/dark/__tests__` |
| useMotionAxis | `_shared/useMotionAxis.ts` | colocated in `_shared/__tests__` |
| aurora harness | presets, runtime contract, a mocked runtime | split: library half in `aurora/__tests__/probe-harness.test.ts`; the probe surface (the story) stays in `tests/` on `./aurora` and `./aurora-config` |
| g-hm-mark | `handmark/stroke` | split: the arms in `handmark/__tests__`; the story's rung count stays in `tests/` |
| easing frame | `easing/constants` | split: unit arms in `easing/__tests__`; the gallery-route and configurator-importer arms stay in `tests/` |
| fourier field.smoke | mint, clock | split three ways: the law across src and demo stays (text reads only); the mint's own claims, rings and clock colocate (re-stated on the library's figures and a seeded elliptic spectrum); the studio shapes' claims read the published mint |
| wgsl-splice-contract | five assembled modules, the shared chunks | split: census in `tests/` (it walks src), each module's claims in the module that assembles it, chunk requirements in `procedural/__tests__`, the resolver in `tests/harness/wgsl.ts` |
| sheet-motion | `useSpringMount` | stays; the spy sits on `./motion`, the door the sheet calls through |
| use-accent-tone | `useAccentTone`, the solve leaf | stays in `tests/` (its subject spans color and the styles tokens); the isolated load reads `./color`; the leaf's call shape is stated where it is read |
| springProjection, springs-story | `springProjection` | re-pointed at `./motion` |
| search-contracts | match, useFuzzySearch, types | split: cache and debounce in `dock/search/__tests__`; the listbox (the route) stays in `tests/` |
| tabs-seam | the eyeglass law | colocated in `tabs/__tests__`, the law read through the motion morph door; the two arms that walk the styles directory stay in `tests/` |
