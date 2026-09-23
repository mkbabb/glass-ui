# D1 · pass 1 · D1-A-critique: graph-derived home (the LCA placement law)

| field | value |
|---|---|
| seat | adversarial critic for family D1-A, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7362b3bf` (the prototype's HEAD; later commits touch only `docs/`) |
| inputs, read in full | `CHARTER.md` (last four paragraphs), `SPECS.md` §0, §D1-A, "Shared facts"; `D1-A.md`; `D1-A-proto.md`; the prototype's gate (`graph.mjs`, `place.mjs`, `css.mjs`, `scc.mjs`, `home.mjs`, 698 lines) and tools (`pipeline.sh`, `plan.mjs`, `carve.mjs`, `run.mjs`, `mutate.mjs`, `verify.sh`) |
| instruments | the prototype's gate and tools, copied unchanged into `$K = …/scratchpad/D1/p1/D1-A-crit/` with only the worktree-path guard retargeted. My own scripts in `$K`: `crit-mutate.mjs` (19 plants), `k7b.mjs`, `k20.mjs` (3 plants), `census.mjs`, `explain.mjs`, `subj.mjs`, `onehome.mjs`, `sccgrain.mjs`, `churn.mjs`. Outputs in `$K/out/` |
| fences kept | one worktree `$K/wt` (pipeline-rebuilt at HEAD), `node_modules` symlinked (the repo has no `tests-visual/node_modules`), removed with `git worktree remove --force` before return. Every plant was restored from saved bytes, not git; a `shasum` of every tree file before and after the 19-plant run is identical. `scripts/import-dag.mjs` was run read-only in the repo (no `--out`) for the HEAD baseline. No sibling was touched. No browser seat: the chrome-devtools and playwright MCP servers failed to connect |
| load | load average 18-45 over the session (`uptime`) |

**Verdict: BLOCK. Convergence 35%.**

What stands:
- The published surface is unchanged, and an independent witness agrees: `tests/invariants/surface/public-surface.spec.ts` passes all 96 assertions on the migrated tree.
- The AST move-and-rewrite engine is real. It made 549 moves, the build and demo build stayed green at every stage, and 0 path strings were ambiguous.
- The LCA core has the converse D1-E lacked: a file in `src/composables` with one unpublished component reader leaves (for example, `search/*` goes to dock).
- Churn is small: one planted import moves 0-2 files.

The family stalls where the edict is hardest:

- **The depth half destroys authored modules and passes by construction.** 26 HEAD dirs dissolve entirely, among them `demo/shell` (21 files), `sheet/detents` and `fourier-field/renderer`. The lexical carve can only create dirs the depth rule already accepts.
- **Module identity is left to "names a person writes".** 10 dirs stay over the bound, 7 of them grown by the migration, and 54 files stay over 500 lines.
- **The CSS arm scatters component styles into `src/styles/<component>/`.** It produces 27 mechanical `-N` pieces, and duplicate CSS basenames go from 3 to 38.
- **The gate is blind to 19 of 23 plants aimed at its rules' intent.**

The missing primitive is a module or feature boundary. The graph cannot derive one (shared fact 11), and that boundary is the substance of edict clause 3 and of the recursion in clause 1.

---

## 1 · The key claims, re-run

Every row ran in `$K/wt` with the prototype's code unchanged.

| claim | command | result | matches the prototype |
|---|---|---|---|
| RED at HEAD | `node $K/gate/home.mjs $K/wt --json` | exit 1 · `P0 0 P1 141 P2 18 P3 57 P4 211 P5 2 P6 43 = 472` (1.46 s) | yes |
| the migration | `bash $K/tools/pipeline.sh` (2 min 43 s) | stage gates S0 472 → S1 454 → S2 402 → S3 333 → S4 325 → 292 → S5 72 → S7 66 → S7b 65 → S9 65 | yes, stage for stage |
| final gate | `node scripts/structure/home.mjs` in `wt` | exit 1 · `P1 1 · P2 10 · P3 54`, all else 0 | yes |
| build battery | `bash $K/tools/verify.sh $K/wt …` | library build 0 (13 s), `vue-tsc` src 0, test 0, `regen-exports` 0, `npm pack` 0, demo build 0 | yes |
| vitest | same | 2,203 tests collected: 2,086 pass, **116 fail in 38 files**, 5 files fail to load, 1 skipped. At HEAD 2,324 are collected and 2,323 pass, so **237 tests stop passing**: 116 fail and 121 are never collected, because their files ENOENT on load | yes. The prototype printed the 2,203 denominator but not the 121 |
| surface | `public-surface.spec.ts` in the same run | passed, 96 assertions | an independent witness the prototype did not cite |
| HEAD's own cycle tool | `node scripts/import-dag.mjs` | HEAD: exit 0 (value module SCCs 3, all owned). Migrated: **exit 1**, `FAIL-CLOSED: 3 module(s) inside a cycle carry no owner: demo, demo/composables, demo/landing`, plus a **new value SCC `src/components/dock ↔ src/styles/_root`** | not run by the prototype |
| the prototype's 12 mutations | re-covered by my plants P0/P1/P4/P5/P6 below; not re-run verbatim | — | — |

The prototype's numbers hold. Two things it did not report: 121 tests are never collected, and the repo's existing fail-closed cycle gate goes RED.

---

## 2 · Planted violations aimed at each rule's intent

`node $K/crit-mutate.mjs $K/wt` (K-1 … K-19), `node $K/k7b.mjs`, `node $K/k20.mjs` (K-20, K-20b, K-21). Each plant runs the landed gate in a fresh process and diffs its violations against the base run (65). Every row printed `restored=true`.

**19 of 23 pass blind.** The four the gate catches: one correctly, one only because a dir crossed the 12-file bound, one by a clause whose cure moves the wrong file, and one false positive.

| id | plant | gate | what it violates |
|---|---|---|---|
| K-1 | a hook `useChipZz.ts` in `chip/styles/`, read by `Chip.vue` | PASS | rule 5: hooks go to `composables/`. Kind slots are folded (`unit()`), never checked against content |
| K-2 | `chip/composables/styles/constants/utils/shaders/zz.ts` | PASS | rule 7: `depthOk` skips every kind-slot segment, so five nested slots are legal |
| K-3 | a global hook read by chip and dock, placed at `src/composables/color/zz/deeper/useZzShared.ts` | PASS | rule 4 and rule 7. A slot row is `ok` whenever `within(slot, dir)`, so the whole `src/composables/**` subtree is one slot with no depth check |
| K-4 | an unrelated helper read by chip and dock, dropped into the lexical dir `_shared/veil/` | PASS | the same hole in `_shared/**`. The lexical-dir invariant is never applied inside a global slot |
| K-5 | a dead `scripts/zz-dead.mjs` with a shebang | PASS | rule 8, orphan. A shebang pins the file (`place.mjs:130`) |
| K-6 | a dead `demo/composables/zzDead.ts` whose **comment** says `process.argv[1]` | PASS | rule 8. The CLI signal is a text regex over the whole file |
| K-7 | a dead `ZzDead.vue` in `demo/stories/display/` | P2 +1 only | caught because the dir hit 13 files, not by the orphan rule |
| K-7b | the same file in `demo/stories/navigation/` (4 files) | PASS | the route glob `demo/stories/*/*.vue` pins any SFC there. It now pins **21 helper SFCs** that the migration moved into story dirs; HEAD had 0 |
| K-8 | `chip/zz-relay.ts` re-exports `chipVariants` and declares one `zzTag` | PASS | the non-door barrel rule. One own export makes a relay "not pure" |
| K-9 | ``import(`./${n}-helper`)`` in `Chip.vue`, target missing | PASS | P0 "every edge kind". A non-literal dynamic import is not recorded |
| K-10 | a test reads `"src/components/chip/zz-gone.css"`, which names no file | PASS | P0. An unresolved `literal` edge resolves to `null` and is dropped (`graph.mjs:146`). This is the class behind 115 of the 116 breaks |
| K-11 | `<style>@import "./zz-missing.css"; @import "../dock/styles/dock.css";</style>` in `Chip.vue` | PASS | P0 and P6. Inline SFC `<style>` bodies are never parsed |
| K-12 | a value cycle `dock/backdrop ↔ dock/composables` | PASS | recursion. P5 runs at module grain (`moduleOf`), so cycles between nested modules are invisible |
| K-13 | `composables/dom/useBreakpoint.ts` value-imports `separator/Separator.vue` | PASS | clause 2. A global composable depends on a component, and there is no direction rule |
| K-14 | `chip/zz-data.json`, read only by dock | PASS | rule 1. `.json` is outside `inScope`, so the edge is dropped (`graph.mjs:171`) |
| K-15 | a dead 600-line `scripts/zz-dead.sh` | PASS | clause 4 and P3. Shell is invisible to P1 and P3 (`scripts/release.sh` at HEAD is the same) |
| K-16 | a dead 600-line `scripts/zz-long.cjs` | PASS | P1 and P3. `.cjs` is outside `CODE` |
| K-17 | a dock spec copied into `tests-visual/aurora/` | PASS | P4. Every `tests-visual` spec is pinned, so the carved `tests-visual/<feature>/` dirs are never judged |
| K-18 | a chip test imports `src/components/dock/composables/useDockMorph` by relative path | P4 +1 | caught, but P4's cure moves the **test** to `tests/invariants/`; the deep reach stays. Cross-zone readers never vote |
| K-19 | `src/composables/dom/zz-chip.css` styling `.glass-chip` | P6 +1 | correctly caught |
| K-20 | `.glass-chip .dock-icon-button {…}` appended to chip's `glass-chip.css` | PASS | P6. A block whose context class belongs to another unit is inferred to be a co-selector and does not vote (`css.mjs:96`). The spec calls co-selectors "the one declared fact"; no declaration exists |
| K-20b | `.glass-dock .glass-chip {…}` appended to dock's `dock.css` | PASS | the same exemption, in reverse |
| K-21 | one string literal `"glass-chip"` in `GlassDock.vue`, never emitted as a class | P6 +1, **false positive** | `glass-chip.css → MIXED (GLOBAL \| chip): split`. The emitter index is a bag of every string token in `src`, and the gate's cure would exile chip's rules to `src/styles` |

The prototype's 11 planted violations each hit a rule's exact trigger, and all were caught. These 23 target what each rule is for.

---

## 3 · The checklist

### 3.1 Vacuous convergence. Yes, on three clauses. P5 is real but partial.

**P1 depth half, 47 → 0, by construction.**
- The only legal sub-dir below a home is a kind slot or a lexical dir (a dir whose name is a stem token every member shares).
- S3 flattens everything else, and the carve (`carve.mjs:41-55`) creates only dirs named by a shared stem token, so it cannot produce a depth violation.
- Measured, dirs with direct files 159 → 177: **26 HEAD dirs dissolve entirely**, 45 are created.

| dissolved (HEAD files) | where the files went |
|---|---|
| `demo/shell` (21), with `configurator/` (12), `configurator/preset-editor/` (6) and `configurator/presets/` (2) | `demo/` root, 5 → 25 direct files: `store.ts`, `persistence.ts`, `css-writers.ts`, `stylesheet-swap.ts` beside `App.vue` and `main.ts` |
| `demo/stories/substrates/aurora` (17), with `config/` and `sections/` | `demo/stories/substrates/`, 6 → 27, mixed with fourier-field helpers and route SFCs |
| `sheet/detents` (2) | `sheet/composables/use.ts` and `sheet/projection.ts` |
| `fourier-field/renderer`, `fourier-field/shaders`, `src/styles/theme`, `_shared/disclosure`, `composables/{context,search}`, `composables/motion/{reveal,route,dissolve}`, `composables/glass/{procedural,webgl/shaders}`, and 7 more | flattened, then partly re-carved under different, stem-derived names |

**P4, 211 → 0, and P6, 43 → 0: the fixer is the gate.**
- `plan.mjs` imports `judge`, `mirrorOf`, `homeDir` and `depthOk` from the gate, and `cssstage.mjs` imports `cssHomes`. Zero is reached by construction wherever a move exists.
- What that zero certifies: `tests/components/button/Button.test.ts` (HEAD, the right place) is now `tests/invariants/Button.test.ts`.
- `tests/invariants/` holds 96 tests, 33 of them named for a component (`node $K/subj.mjs`). Examples: `badge.contract`, `select.contract`, `avatar.contract`, `metric.contract`, and 7 dialog tests under `invariants/dialog/`.
- A component test lands there as soon as it reads one global stylesheet.

**The two home functions disagree for 68 files.**
- `node $K/explain.mjs` on `button/styles.css` gives P1 status `outside`, home `src/styles`, because its only importer is `src/styles/index.css`. P6 homes the same file in `src/components/button`.
- `home.mjs:41` silences P1 for any `src` CSS that has a P6 home. `node $K/onehome.mjs`: **68** stylesheets carry a P6 component home and a P1/P4 `src/styles` home.
- P4 reads the P1 home, so **8 tests are mirrored off the home P6 assigns**. For example, `dialog-dismiss.test.ts` should mirror to `tests/components/dialog`.

**P5, 2 → 0, is a real extraction, seen through a narrow window.**
- The cut edges persist, now inside one module: `src/composables/participation.ts:14 → ./dockContext` and `composables/motion/morph/useSelectionGroup.ts:20 → ./useTabRovingFocus`.
- Moving both ends into one module is the portfolio's "neutral key at the LCA". But nothing was renamed: the dock's context file and all its constants (`DOCK_SPRING`, `DOCK_CONTEXT_LABEL`, `DOCK_COLLAPSE_DELAY_MS`, `MORPH_SETTLE_MS`) now sit at the `src/composables` root as `dockContext.ts` and `constants.ts`.
- P5 counts only `value`/`dynamic` edges inside `src`, at module grain. `node $K/sccgrain.mjs`:

| grain | HEAD | migrated |
|---|---:|---:|
| module (P5's) | 2 | 0 |
| directory | 9 | **11** |
| file | 2 (`Alert ↔ alert/index`, `Badge ↔ badge/index`) | 2 (the same) |

- New directory-grain knots include `menu · menu/item · menu/sub` and `aurora · aurora/composables · …/atoms · …/uniform · constants/shaders`. The carve's new modules are cyclic with their parent.
- The migration also creates a style-channel cycle. `src/styles/index.css` imports `dock/styles/index.css`, which imports `src/styles/{layers,run,group/layer-group*}.css`, the GLOBAL pieces of dock's own split stylesheets. HEAD's `import-dag.mjs` reports it as the new value SCC `dock ↔ src/styles/_root`.

### 3.2 Spec-cites-itself circularity. Yes, in three places. The surface claim is not one of them.

1. **P4, P6 and the depth half.** The migration writes what the gate computes, and the gate then confirms it (§3.1).
2. **The co-selector "declared fact".**
   - SPECS A.1 rule 12 says context co-selectors and list co-registrations "are the one declared fact: they are marked global and stay in `src/styles/`".
   - The implementation declares nothing. `css.mjs:96-97` infers a co-selector from the block itself and drops it from the vote.
   - Any cross-unit rule written with a foreign context class exempts itself (K-20, K-20b).
3. **The 68/68 export keys.**
   - This part is circular: doors are pinned, so the law cannot move one, and `regen-exports` reads the same `subpath-policy.mjs` that the gate reads as E.
   - Independent evidence carries the claim instead: 1,279 names across 63 doors (the prototype's `doornames`), the flattened cascade sequences, and `public-surface.spec.ts` (96 passing).

### 3.3 Gates that cannot fail. 19 plants in §2, plus two structural ones.

- **Any file in a global slot passes wherever it sits in that subtree** (K-3, K-4). The `src/composables` root went from 0 to 12 direct files, and nothing checks the root either.
- **The gate is wired to nothing.** `package.json` gains only `gate:home`. `test`, `prepublishOnly` and CI do not call it. It ships RED at 65.

### 3.4 The elegant-reduction trap. Yes. The stop point is the edict's hard part.

- **Module identity.** The prototype stops at "P2: 10 dirs that need names a person writes" and "P3: splitting a file by its content is not a placement act". Measured against HEAD (`git ls-tree`), the migration made most of those 10 dirs:

  | P2 dir | HEAD | migrated |
  |---|---:|---:|
  | `demo/` | 5 | 25 |
  | `demo/stories/substrates/` | 6 | 27 |
  | `src/styles/` | 19 | 40 |
  | `src/components/_shared/` | 9 | 18 |
  | `tests/invariants/` | 0 | 45 |
  | `src/components/dock/` | 11 | 13 |
  | `demo/stories/containers/`, `…/foundations/` | 13, 13 | 14, 14 |
  | `src/components/sortable-list/` | 13 | 13 |
  | `tests-visual/` | 177 | 67 |

  Only `tests-visual/` got smaller. In `src` and `demo`, the dirs over the bound hold 180 files across 11 dirs at HEAD and 164 across 8 on the migrated tree.
- **CSS ownership is a heuristic.**
  - The emitter index is a bag of every string token in every `src` `.ts`/`.vue` file (`css.mjs:22-25`). K-21 shows one string literal relocating a stylesheet.
  - A dock-only rule, `.glass-dock.vertical .dock-run > [aria-current]…`, was classed GLOBAL and exiled to `src/styles/run.css`, which dock's own `styles/index.css` imports back.
- **Rule 13 (tokens) was not run and has no clause.** The spec counts 96 single-component custom properties. `--dock-hairline` is still declared in `src/styles/sizing/sizing.css:223`.
- **115 test repairs** are left as "not a placement act", and so are the owner rulings (`springProjection.ts`, the orphans, and `shaders/` against `@source`; `picker-lane` G1 is still red).

### 3.5 Legacy aliases or dual paths smuggled in

No path alias was added, no re-export shim remains (P1 catches pure relays), and the exports map has no dev-condition export. Four dual paths remain:

1. **Two cycle gates now disagree.** P5 says 0. `scripts/import-dag.mjs` (628 lines, with an `OWNER_MANIFEST` naming M02 owners that no longer exist) exits 1. The migration kept both.
2. **HEAD's path-pinning structure tests stay beside the new gate.** The 115 failures are that old regime. `gate-register`'s sha-pinned roster names `tests/public-surface.spec.ts`, which is now under `tests/invariants/surface/`.
3. **Provenance names.** 27 CSS pieces are named `<source>-N.css`, and pieces are named after the file they came from: `components/dialog/sheet.css`, `components/sheet/sheet-2.css`, `styles/sheet/sheet-{2,3}.css`, `styles/deck.css`. `tests-visual/w38/` is a dir named after a wave id. Each keeps history in the tree.
4. **Two homes per stylesheet.** 68 files are homed once by P6 and once by P1/P4 (§3.1).

### 3.6 Masked fallbacks. Six.

1. `home.mjs:41` silences the P1 verdict for 68 stylesheets, and P4 still uses that silenced home.
2. `css.mjs:96-97`: an inferred co-selector does not vote (K-20, K-20b).
3. `graph.mjs:146`: an unresolved literal path becomes `null`, so it is not P0 (K-10). `graph.mjs:171` drops an edge to an out-of-scope file: `.json`, `.sh` or `.cjs` (K-14, K-15, K-16).
4. A non-literal `import()` and an inline SFC `<style>` produce no edge and no P0 (K-9, K-11).
5. The CLI pin is a regex over file text (`place.mjs:130`), so a comment pins a file (K-6).
6. The route glob pins helper SFCs (K-7b). The migration put 21 helpers under that pin, and their placement is now never judged.

### 3.7 Unverified gestalt. Walked on the migrated tree: dock, deck, sheet. Tests walked too.

**dock** (43 → 53 files):
- The search engine is split three ways: `match.ts` and `types.ts` at the dock root (so `dock/types.ts` holds `SearchableItem`, not dock types), `useFuzzySearch.ts` in `composables/`, and `styles/search.css`.
- The backdrop trio is split between `backdrop/` and `composables/useGlassBackdropLuminance.ts`.
- `dockContext.ts` and the dock's constants left for the `src/composables` root, and `useDockHold.ts` now lives in `slider/composables/`.
- `styles/group/` holds `dock-layer-group.css`, `layer-group.css`, `layer-group-2.css` and `layer-group-3.css`. `styles/glass-capsule.css` shares its name with `src/styles/glass-capsule.css`.

**deck:**
- `useDeck.ts`, `useDeckSnap.ts` and `slideContext.ts` moved to the `src/composables` root; carousel reads them. deck's `types.ts` became `src/composables/types.ts`, holding `DeckAxis` and `SlideEntry`.
- `deck/composables/` keeps only the peripheral hooks. A newcomer opening `src/components/deck/` does not find the deck's engine.

**sheet:**
- HEAD's one `sheet/styles.css` became seven files in three dirs, imported in interleaved order by `src/styles/index.css:264-270`: `components/sheet/styles.css`, `styles/sheet/sheet.css`, `components/sheet/sheet.css`, `styles/sheet/sheet-2.css`, `components/dialog/sheet.css`, `styles/sheet/sheet-3.css`, `components/sheet/sheet-2.css`.
- `detents/` dissolved into `composables/use.ts` and a root `projection.ts`.

**tests:** `Button.test.ts` moved from `tests/components/button/` to `tests/invariants/`. Dialog's tests are split 1 : 7 between `tests/components/dialog/` and `tests/invariants/dialog/`.

**Counted across `src`:**
- Duplicate basenames (excluding index, styles and README) go from 15 to 50; CSS alone from 3 to 38.
- 11 non-hook files still sit in component `composables/` dirs, as at HEAD (aurora 6, blob 4, `infinite-scroll/composables/types.ts`).

The tree does not read as colocated. A component's files, and especially its styles, are harder to find than at HEAD.

### 3.8 Consumer-less substrate

| substrate | consumer |
|---|---|
| `scripts/structure/home.mjs` (698 lines) | none. Only `npm run gate:home` calls it, and it is RED |
| H2's widened style copier | `dist/composables/**` ships; `dist` gains 55 files and the pack 3,220 B, none of them export-reachable (the prototype's own §3) |
| `tests/invariants/` (96 tests) | the mirror's fallback, holding 33 component-named tests |
| the kind slot `shaders` in `KIND_SLOTS` | folded, never populated by the law (shaders land at unit roots: `aurora/flow.glsl.ts` beside `aurora/constants/shaders/flow.glsl.ts`) |

---

## 4 · Edict fidelity

| clause | D1-A on this tree | evidence |
|---|---|---|
| **1. Colocate components with sub-components, composables, skeletons, constants, styles, recursively** | Partial, and inverted for authored nesting | See the list below |
| **2. Only truly global composables in `composables/`** | The converse holds; the direction does not | See the list below |
| **3. Long dirs broken into encapsulated common modules** | Not met | See the list below |
| **4. Backend treated befittingly** | JS-only and flat | See the list below |

Clause 1 in detail:
- Single-reader files move to their reader: `search/*` to dock, the flow shaders to aurora, `useDockHold` to slider.
- 17 files leave their own component (the list from `$K/out/final/stages.txt`): the deck engine ×4, `dock/constants`, `dockContext`, `sheet/motion` and `ModalOverlay.vue` to `_shared`, `tabs/useTabRovingFocus` to `motion/morph`, the `input`/`slider`/`tabs` `types.ts` to `_shared` under qualified names, `aurora/budget`, `deck/window`, and 2 stylesheets.
- 26 authored dirs dissolve (§3.1). Recursion exists only as "lexical name", and the sheet's styles scatter across three dirs.

Clause 2 in detail:
- At HEAD, 12 `src/composables` files have exactly one component reader. The 6 unpublished ones leave or dissolve (`search/*` ×2, the flow shaders ×2, `useGlassBackdropLuminance`, the `canvas2d` barrel). The 7 that remain on the migrated tree are all published.
- 31 of 95 non-door `src/composables` code files are held there only by publication (7 read by one component, 24 by none; `census.mjs` (b)).
- The migration moves component-specific code *into* the global root: dock's `constants.ts`, `dockContext.ts`, the deck engine, `types.ts`.
- A stylesheet now sits in `src/composables/dark/`, and `useDockCtaReceive` stays in `motion/morph/`.
- K-13 shows no direction rule exists.

Clause 3 in detail:
- P2 is at 10 dirs (7 grown by the migration) and P3 at 54 files, with no carve of content.
- Encapsulation has no clause. Cross-zone edges into non-door `src` files are unchanged at 84 → 85 (demo), 236 → 236 (tests) and 19 → 19 (tests-visual).
- Demo reaches into a component's nested dirs go from 4 to 6.
- The carve's new sub-dirs are cyclic with their parents (directory SCCs 9 → 11).
- Carve names are stem tokens: `group`, `deep`, `w38`, and `-N` pieces.

Clause 4 in detail:
- `.sh` and `.cjs` are invisible (K-15, K-16), and `scripts/release.sh` is never judged.
- A CLI is pinned by a regex over its text (K-5, K-6).
- 5 scripts over 500 lines are not carved.
- `paint-arm.mjs` and `reflect-capture-verify.mjs` move into `tests-visual/`, which becomes the backend's overflow.
- The gate adds another tree walker and graph builder, where X §3.1 asked for consolidation.
- The sibling carry needs the "wiring files" anchor class, which is unbuilt, and it moves domain models into `platform/` (research §13).

---

## 5 · Open gaps (exact list)

1. **The depth half dissolves authored modules and is satisfied by construction.** 26 HEAD dirs are gone. The lexical rule is the only legal sub-dir, and the carve makes only lexical dirs.
2. **Module identity cannot be derived.**
   - P2 is at 10 dirs (7 grown by the migration) and P3 at 54 files.
   - Carve and split names are mechanical (27 `-N` pieces, `w38`).
   - Duplicate basenames go from 15 to 50.
3. **Borrowed engines leave their owners.** 17 component files moved out: the deck engine, the dock's context and constants, `useDockHold`, `useTabRovingFocus`, and 3 `types.ts` files.
4. **Global slots are unchecked subtrees** (K-3, K-4). The publication exemption holds 31 of 95 `src/composables` files. There is no direction rule (K-13).
5. **Kind slots are unchecked** (K-1, K-2). 11 non-hook files sit in component `composables/` dirs, and CSS sits in `src/composables/dark/`.
6. **Two home functions.** 68 stylesheets have both a P6 home and a P1/P4 home. `home.mjs:41` masks it, and 8 tests are mis-mirrored.
7. **The test mirror dumps component tests into `tests/invariants/`.** 96 tests sit there, 33 named for a component, `Button.test.ts` among them.
8. **P5 is blind to style-channel and sub-module cycles.**
   - The migration creates `dock ↔ src/styles`, and HEAD's `import-dag.mjs` goes from exit 0 to exit 1.
   - Directory SCCs go from 9 to 11 (K-12).
9. **CSS ownership is a string-bag heuristic.**
   - Co-selectors are inferred, not declared (K-20, K-20b).
   - A string literal flips a stylesheet (K-21).
   - Dock-only rules are exiled to `src/styles/run.css`.
   - Sheet's single stylesheet became 7 files in 3 dirs.
10. **No encapsulation clause.**
    - Cross-zone readers never vote (the prototype's X; K-18's cure moves the test).
    - Deep demo, test and tests-visual reaches are unchanged at 85, 236 and 19.
11. **Pins by regex and glob mask orphans** (K-5, K-6, K-7b). 21 helper SFCs are now route-pinned.
12. **Graph-invisible edges are not P0:**
    - non-literal `import()` (K-9);
    - stale literal paths (K-10, the 115-test class);
    - inline `<style>@import` (K-11);
    - `.json`, `.sh` and `.cjs` files (K-14, K-15, K-16);
    - a one-export relay (K-8);
    - `tests-visual` specs (K-17).
13. **Rule 13 (tokens) is neither run nor gated.** The spec counts 96 properties; `--dock-hairline` is still in `src/styles/sizing/sizing.css:223`.
14. **Not GREEN.**
    - The gate sits at 65.
    - 237 of 2,323 HEAD-passing tests no longer pass: 116 fail and 121 are not collected.
    - `import-dag` is RED.
15. **Dual regimes are left in place.**
    - `import-dag`'s `OWNER_MANIFEST`, HEAD's path-pinning structure tests and the sha-pinned `gate-register` roster all sit beside the new gate.
    - The gate is wired to nothing.
    - H2 ships the unreachable `dist/composables/**`.
16. **Backend.** The treatment is JS-only, CLIs are pinned by regex, 5 scripts over 500 lines are not carved, `tests-visual/` absorbs backend modules, and the composition-root carry is not built.
17. **Owed rulings.**
    - `springProjection.ts`;
    - the deletes `pi-runner-manifest.mjs`, `safari-probe.mjs`, `canon-doc.mjs` and `Code.vue`;
    - whether a CLI with a test importer is a pin;
    - `shaders/` against `@source` (`picker-lane` G1 red);
    - door moves for published single-consumer composables.
18. **Not run.**
    - The floor rows.
    - Paint and a Playwright execution; no browser seat was available.
    - Historical M-A2. Replayed here only as three planted imports: 2, 0 and 2 moves, converging in ≤ 2 rounds (`node $K/churn.mjs`).

---

## 6 · Convergence and verdict

**Convergence: 35%.**

| sound (measured) | unsound (measured) |
|---|---|
| surface: 68 keys, 1,279 names, the cascade sequences and `public-surface.spec` (96) | depth half and module identity (gaps 1, 2) |
| build, both typechecks, regen, pack and the demo build: 0 | de-colocation by borrowing (gap 3) and global-slot laxity (gap 4) |
| the move engine: 549 moves, green at every stage, 0 ambiguous rewrites | kind slots, two homes, the test mirror (gaps 5-7) |
| P0 for literal specifiers, `vi.mock` strings and globs (P0-a, P0-b) | P5's window, the CSS heuristic, tokens (gaps 8, 9, 13) |
| the LCA core, with its converse. Same-zone reaches to unpinned files are caught (the prototype's P1-law plant), and a class-owned stylesheet off its home is caught (K-19) | encapsulation, pins, invisible edges (gaps 10-12) |
| churn: 0-2 moves per planted import | not GREEN, dual regimes, backend (gaps 14-16) |

**Verdict: BLOCK.**
- The route stalls at a missing primitive: a declared module or feature boundary. The import graph cannot produce it (shared fact 11, reconfirmed: the carve's only source of names is file stems).
- The law's attempt to derive one lexically is refuted on this tree. The depth half flattens 26 authored dirs, the carve replaces them with stem-named dirs that are cyclic with their parents, and the CSS arm scatters component styles under mechanical names.
- That boundary is the substance of edict clause 3 and the recursive half of clause 1. So the stall is as hard as the problem, and a second pass of the same law meets the same wall where the prototype stopped.

**Why not RETIRE.** Four parts are worth harvesting into any route that advances:
- **the LCA placement invariant as a checker:** "no file is read from outside its home subtree", with its converse, over resolved files in every zone;
- **the AST move engine:** the specifier, glob, `vi.mock`, `new URL` and path-string rewriters, and the stage-by-stage build check;
- **the P0 resolver**, once gaps 12's holes are closed;
- **the cascade-sequence verifier** (`flatten-css.mjs` + `cascade-seq.mjs`), which proved rule-for-rule order across 7,740 leaf rules.

**Reopen trigger.** Reopen D1-A only with a materially new mechanism. Every part below is needed:
1. **Declared module boundaries replace the lexical depth rule.** A module is one authored fact per dir, for example the D1-E manifest or a D1-B door. The LCA law then places files *within* declared modules, and a sibling's read through a module's door does not lift the implementation (this answers gap 3 without reopening M02).
2. **One home function** shared by P1, P4 and P6.
3. **P5 over style edges and at every declared-module grain.**
4. **Pins from a declared list, not text regex or route glob.**
5. **A P0 that fails on every dropped edge kind.**

Without all five, the pass-1 result repeats.

**Reproduce.**

```sh
K=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-A-crit
node $K/gate/home.mjs <fresh HEAD worktree> --json          # RED 472
bash $K/tools/pipeline.sh                                    # rebuilds $K/wt at HEAD and migrates; 65 at the end
bash $K/tools/verify.sh $K/wt $K/out/final-verify            # builds 0; vitest 2,086/2,203, 116 fail
node $K/crit-mutate.mjs $K/wt; node $K/k7b.mjs $K/wt; node $K/k20.mjs $K/wt   # 23 plants, 19 blind
node $K/census.mjs $K/wt; node $K/sccgrain.mjs $K/wt; node $K/onehome.mjs $K/wt; node $K/subj.mjs $K/wt <test>
node $K/churn.mjs $K/wt                                      # one import → 2 / 0 / 2 moves
(cd $K/wt && node scripts/import-dag.mjs)                    # exit 1 (HEAD: exit 0)
```
