# D1 · pass 1 · D1-F-critique: lifecycle capsules

| field | value |
|---|---|
| seat | adversarial critic for family D1-F, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `41405986`. `git diff 2b188e72 HEAD -- . ':!docs'` is 0 lines, so the code is the prototype's |
| inputs, read in full | `CHARTER.md` (last four paragraphs), `SPECS.md` §0, §D1-F, "Shared facts"; `D1-F.md`; `D1-F-proto.md`; every prototype tool (`capsule-gate.mjs` 491 lines, `carve-{a,b,c,config}.mjs`, `door-route.mjs`, `move-engine.mjs`, `mutate.mjs`, the shell drivers) |
| instruments | the prototype's tools copied unchanged to `$K = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-F-crit/tools/`, with only their hard-coded scratch path repointed to `$K`. My own scripts are `crit-mutate.mjs` (17 plants), `f-measures.mjs`, `door-dup.mjs`, `edict-probe.mjs` and `story-caps.mjs`. Logs are in `$K/logs/` |
| fences kept | Two worktrees: `$K/wt` (HEAD → P → F) and `$K/wth` (pristine HEAD, for baselines). Both had `node_modules` symlinked; `tests-visual/node_modules` does not exist in the repo. Both were removed with `git worktree remove --force` before return. No repo edit besides this file, no sibling touched, and no browser seat (the chrome-devtools and playwright MCP servers failed to connect) |

**Verdict: BANK. Convergence 30%.**

What stands:

- Entry-rooted declarations. The pack holds 0 lifecycle files, the export map is `JSON.stringify`-equal at 68 keys, and HEAD's `src/**` declaration config fails the build loudly on the migrated tree.
- The move engine. It made 526 moves and 387 specifier rewrites with 0 unresolved, and P runs with 0 vitest failures.
- The `preProcessFile` resolver, with C0 on imports and R2 on the entry closure.
- Suffix routing, which ends filename-listed runner projects.

As a route to the edict, the family fails:

- It moves **0 of 658** `src` source files.
- Long dirs get worse.
- C1 is green by construction.
- C2 goes green by minting barrels.
- 13 of 17 new plants pass the gate untouched.

---

## 1 · The key claims, re-run

Every row ran in `$K/wt` with the prototype's tools.

| claim | command | result | matches |
|---|---|---|---|
| RED at HEAD | `capsule-gate.mjs $K/wt` (no pack) | exit 1, **1,251** (0.51 s): C1 unsuffixed 260 · misplaced 419 · cross 91 · C2 479 · C5 2 (`logs/h-gate-nopack.log`) | yes |
| RED at HEAD with pack | `npm run build` (exit 0, 6 s); `npm pack --dry-run --json` (841 entries); gate `--pack` | **1,255**; C3 = the 4 unreachable `.d.ts` (`logs/h-gate.log`) | yes |
| P | `run-all.sh carve-c.mjs` (18 s) | phase B: 526 moves (510 + 16), 302 `#` specs; carve-c: 68 URL re-roots, 21 scanner filters, roster `282d05cf → b8cc954f` (`logs/run-all.log`) | yes |
| P battery | `checks.sh p` | build 0 · regen 0 · demo 0 (276 JS chunks) · **typecheck exit 2 (93 errors in 47 files)** · vitest 2,320/2,321, 0 fail · Playwright 1,995 in 168 · gate **489** (C2 485, story door 4) | yes |
| F | `floor.sh` | 442 + 4 routed, 26 + 1 doors minted, 170 + 1 exports; phase B again moved 22; roster `→ d5980f4f` (`logs/floor.log`) | yes |
| F battery | `checks.sh f` | build 0 · pack **840** · demo 279 chunks · typecheck 93 · vitest 2,319 pass, **1 fail** (`demo/shell/boot-graph.test.ts`, frame-0 ground EAGER) · gate **44** (C2 43, story door 1) | yes |
| F dist against HEAD | `join` on `h-dist.sha` / `f-dist.sha` | 130 files change, 91 added or removed | yes |
| the prototype's mutations | `mutate.mjs $K/wt $K/logs` | 13/13 CAUGHT; restored tree identical | yes |
| M-F1 teeth | read in `mutate.mjs` and the proto's `mf1-*` logs, not re-run | — | — |

Every prototype number holds. The problems are in what the numbers mean.

---

## 2 · Planted violations the prototype did not try

`node $K/tools/crit-mutate.mjs $K/wt $K/logs` runs on F. For each plant it writes the bytes, runs the gate with the base pack, and restores. After all 17, the tree gates identical to base (`restoredIdentical: true`, `logs/crit-mutations.json`).

| id | the violation | should fire | gate delta |
|---|---|---|---|
| K1 | `card/card.story.vue` moved to `demo/compositions/` (uses card + button) | C1 on the story | **story not flagged**; +8 `crossNotInvariant` on visual specs, remedy "move them to `tests-visual/invariants/`" |
| K2 | `card/card.story.vue` moved into `button/` (a capsule it imports) | C1 on the story | **story not flagged**; +5 `misplaced` on card's visual specs, remedy "move them to `src/components/button/`" |
| K3a | control: `Badge.vue` deep-imports `motion/number/useAnimatedNumber` | C2 | C2 +1 (caught) |
| K3b | the same reach through a new one-line `motion/number/index.ts` (`export *`) | C2 | **+0** (laundered) |
| K4 | `motion/spring/useSpringPress.ts` imports `../morph/useSelectionIndicator`, which morph's door does not export | C2 (F.1: "capsules nest through their doors") | **+0** |
| K5 | vitest `exclude: ["src/components/button/Button.test.ts"]` | C5 (a name-listed exclusion) | **+0** |
| K6 | a capsule test reads `src/components/button/zz-gone.css` by literal | C0 | **+0** |
| K7 | `import.meta.glob("/src/**/*.stroy.vue")` (matches nothing) | C0 | **+0** |
| K8a | `button/Button.stories.vue` | C1 foreign shape | **+0** |
| K8b | `button/button.test.mts` | C1 foreign shape | **+0** |
| K8c | `button/Button.cy.ts` | C1 foreign shape | **+0** |
| K9 | an unsuffixed `button/button-fixture.ts`, imported only by `Button.test.ts` | C1 (closed suffix set) | **+0** |
| K10 | a ghost `dist/components/zz-ghost/ghost.d.ts` with no source, re-packed | C3 | **+0** |
| K11 | webkit project `testMatch: "src/components/aurora/*.visual.ts"` (routes by directory) | C5 | **+0** |
| K12 | `card.story.vue` imports `#demo/chassis/page/StoryPage.vue`, a second alias for `#stage/page/StoryPage.vue` | one harness form | **+0** |
| K13 | a template-literal dynamic import of `#stage/${x}.ts` in `Badge.vue` (entry closure) | R2 | **+0** |
| K14 | a test reading only `demo/shell/AppShell.vue`, placed in `button/` | C1 | +1 (caught, → `demo/shell/`) |

The tally:

- 13 missed outright.
- 2 were flagged only by collateral, with a remedy that points the wrong way (K1, K2).
- 2 were caught: K3a (the control) and K14.

**The fail-open printout.**

- With a story added to `package.json` `files` and present in the tarball, the gate run *without* `--pack` prints `C3_pack: 0` and `C4_size: 0`, and RED 44. With `--pack` it prints `C3_pack: 1` and RED 45.
- An unevaluated clause reports as a pass.

---

## 3 · The checklist

### 3.1 Vacuous convergence. Yes, on C1, C2 and the harness clause.

**C1 is the migration's output function.**

- `carve-b.mjs:1-4` states it outright: it moves "every lifecycle artifact to the home the subject law names (the gate's own law, so migration and enforcement cannot disagree)". C1 = 0 at P and F therefore certifies the carve against itself.
- The law also reads the artifact's own position:
  - a story sitting in any capsule it uses takes that capsule as its subject (`capsule-gate.mjs:320`, "declared by location");
  - `demo/compositions/` with 2 or more capsules short-circuits to harness (`:321`);
  - ties break on `tokensOf(f)`, which splits the whole path, directories included (`:300-301`).

**Measured absorption.**

- I moved card's own story into `demo/compositions/` on F and re-ran the carve's fixpoint (`carve-b.mjs`, `logs/absorb/`). It moved 8 visual specs *out* of their capsules to `tests-visual/invariants/` in one pass: 4 of card's (`_veil-capture`, `card-composite`, `paper-grid`, `selection-card`), plus `aurora/glass-legibility`, `input/page-hierarchy`, `popover/card-padding` and `styles/glass/glass-identity`. The second pass moved 0.
- The gate returned to exactly **44**, the base. Card was left with its tile but not its story.
- `node $K/tools/story-caps.mjs` finds **54 of 79** `src` stories using 2 or more capsules, so any of them can take this hatch.

**The harness clause is still missing, and the gate is green over the research's own named misfiles.**

- D1-F §1.2 and §13.2 name `dock-stage-field-layout` and `feedback-motion-tune` as harness invariants that the law misfiles.
- On F:
  - `src/components/aurora/dock-stage-field-layout.test.ts` reads `demo/stories/dock/_frame/DockStage.vue`;
  - `src/styles/tokens/feedback-motion-tune.test.ts` imports `#demo/stories/feedback/loop-driver.ts` and reads the progress story.
- The gate is GREEN in scope for both capsules. Literal `demo/stories/…` reads count for nothing, because `capsuleOf` returns `null` for `demo/stories/` (`:206`).

**C2's 485 → 43 does not remove a single cross-capsule dependency.** See 3.5: every routed reach still lands on the same file, now through a barrel minted from the violation list.

### 3.2 Spec-cites-itself circularity. Yes, in five places.

1. C1 is computed by the law that performed the moves (above).
2. The story subject takes the story's location as input. F.1 "declared by location, checked by use" is location plus one import.
3. `door-route.mjs` mints doors from the C2 violation list, and C2 then accepts any `index.ts` as a door (`capsule-gate.mjs:420`).
4. The authored story rulings (`DECLARED_HARNESS`, 10 ids; `DECLARED_TOKENS`, 12 ids; `carve-b.mjs:34-35`) live only in the migration tool. After the carve, no file holds them. The gate re-derives placement from location, so a re-seated token page or family page is accepted wherever it lands.
5. `repin.mjs` recomputes `PINNED_ROSTER_SHA256` from the docs roster the carve just rewrote (`282d05cf → b8cc954f → d5980f4f`). The pin then certifies the tool's own output.

A sixth, milder case: the 13-plant battery was finished after its first run missed a plant and the gate was widened to catch it (proto §5).

### 3.3 Gates that cannot fail. 13 plants in §2, plus four structural holes.

- **C3 and C4 are opt-in and report 0 when skipped** (§2). C4 counts only `src/` (`:459`), so the backend has no size bound in any mode.
- **The closed suffix set is a blacklist.**
  - `FOREIGN_SHAPE` (`:41`) lists shapes to reject. Any lifecycle file whose shape it does not name passes (K8a-c, K9).
  - `LEGACY` (`:33`) is defined and never used.
  - The set is written in five places: gate `ARTIFACT` (`:30`), `tests/_support/source.ts` `LIFECYCLE`, the C3 pack regex (`:449`), vitest `include`, and Playwright `testMatch`. That is duplicated derived data with no check that the copies agree.
- **C5 reads `testMatch|include|testIgnore` only** (`:465`). Vitest's `exclude` and directory-scoped globs pass (K5, K11).
- **C0 exempts path literals and globs** (`:394`). Shared fact 2 names this class as the one that passes silently (K6, K7).

### 3.4 The elegant-reduction trap. Yes, on five load-bearing steps.

| step | spec | on F |
|---|---|---|
| F.4 step 12, the C2 floor | "split `_shared` into nearest-common-ancestor capsules with doors" | replaced by minting doors in place. `_shared` keeps all its files and gains 5 doors (`_shared/{disclosure,feedback,field,menu,surface}/index.ts`). 44 left for authored rulings, 26 of them CSS reaches for which F.1 defines no door at all |
| step 11, sub-capsule design | "not costed" | dock root 51 files, aurora 32, blob 29; C4 off; no feature sub-capsule created |
| step 4, the R3 frame inversion | "removes the story → StoryPage → manifest cycle" | not built. `#stage` is 192 refs in 78 `src` files (`logs/f-measures.json`) |
| step 9, router metadata; R5 family data | `<story lang="json">`, `"family"` | not built. A `loadStory(id)` index stands in |
| step 10, one strict program | cost stated as 85 errors | 93 errors. `npm run typecheck` exits 2, which blocks CI `verify` (`.github/workflows/ci.yml:22`) and `prepublishOnly` (`package.json:493`). The migrated tree can neither merge nor publish |

Besides these:

- 1,984 of 1,995 listed visual tests never ran.
- F.2's byte-identity holds at P only; F changes 130 dist files.

### 3.5 Legacy aliases or dual paths smuggled in. Yes, four.

1. **Minted doors create second doors per symbol.** `door-dup.mjs` counts symbols exported by 2 or more doors:
   - HEAD (`$K/wth`): **379** of 974.
   - F: **429** of 1,056. 77 of these go through a door the floor created, 47 of them inside one top-level capsule.
   - Example: `auroraFallbackGround` is exported by both `aurora/index.ts` (the published entry) and the minted `aurora/composables/index.ts`. `door-route` prefers "the target's own directory door … minted into" over an existing door that already exports the name (`door-route.mjs:131-150`). This dual path is the one that broke `boot-graph`.
   - The common floor's first row is one door per symbol.
2. **The minted doors are re-export shims by the repo's own definition.** `overfit-structure.test.ts` (NO-SHIM arm) defines a barrel as "a module the package PUBLISHES as an entry" and warns that "a hand-list would let a shim hide behind an invented exemption". Yet `isBarrel` exempts any file named `index.ts`. The 23 created doors are unpublished and pass by that filename. 7 of them are reached **only by lifecycle artifacts** (`f-measures.json`), for example `motion/{dissolve,engage,route}/index.ts` and `{aurora/constants,blob,fourier-field}/shaders/index.ts`.
3. **Two harness aliases for one file.** `#demo/*` → `./demo/*` contains `#stage/*` → `./demo/chassis/*` (K12 passes). `#visual/*` resolves only in `src`, so `tests-visual` reaches the same `_support` files relatively (proto break 6).
4. **Two alias systems.** The `@glass/` alias stays at its 4 tool sites (vitest `resolve.alias` is visible in the F `vitest.config.ts`), next to the new published `imports` field, whose targets are absent from the tarball.

No dev-condition export was added: the exports map is equal.

### 3.6 Masked fallbacks. Three.

- **C3 and C4 print 0 when not evaluated** (§2).
- **C3 skips any packed `.d.ts` with no matching source** (`:453-454`, `srcs.length &&`). So "every packed `dist/**.d.ts` maps to a source in the entry closure" really reads "every `.d.ts` that has a source …" (K10).
- **The gate's file set falls back.**
  - It falls back from `git ls-files` to a raw walk (`:63-66`).
  - `probe` accepts any `existsSync` file outside the tracked set as a target (`:83`).
  - An edge into an ignored or generated file therefore resolves instead of failing C0.

### 3.7 Unverified gestalt. Walked on F: button, dock, aurora (plus search and `_shared`).

- **button** (9 files) reads well:
  - `Button.vue`, `index.ts`, `styles.css`;
  - `Button.test.ts`, `buttons.story.vue`, `buttons.tile.vue`;
  - 3 `*.visual.ts`.

  It is the case the family was designed on.
- **dock root: 51 direct files, 40 of them artifacts.**
  - Source: 9 SFCs, `constants.ts`, `index.ts` and `README.md`.
  - Artifacts: 15 tests, 16 visual specs, 9 stories/tiles.
  - A newcomer sees `GlassDock.vue` among `GlassDock.{backdrop-mode,click-integrity,motion-parity,posture,press-keepalive,scroll-overflow,stagger,touch-gate,vertical-collapse,vt-names}.test.ts` and `dock-{animation-live,cockpit,items-lag-capture,luma-share,morph-family,morph-insitu,plate-clearance,rail-cohesion}.visual.ts`.
  - The L12-06 features (morph, layers, search) are not dirs. `dock/composables/` (15 files) and `dock/styles/` (15) are unchanged.
- **aurora root: 32 files, 28 of them artifacts.**
  - Source: `Aurora.vue`, `index.ts`, `DESIGN.md` and `README.md`.
  - The only sub-capsules are kind dirs that gained minted doors: `composables/`, `constants/` and `constants/shaders/`.
  - The two renderer backends are not separated.
  - It holds the misfiled `dock-stage-field-layout.test.ts` (3.1).
- **13 capsule roots of 6 or more files are majority artifacts**, among them aurora 28/32, blob 22/29, dock 40/51, dialog 10/19, `composables/motion` 10/12 and `composables/search` 5/9.
- **The gestalt reads.** This is the test-and-story tree colocated; source colocation is untouched (§4).

### 3.8 Consumer-less substrate

| substrate | consumer |
|---|---|
| 7 minted doors | only lifecycle artifacts (3.5) |
| `.touch.visual.ts` suffix | 0 files; the `coarse-touch` project has no `testMatch`, so nothing routes by it |
| `.webkit.visual.ts` "one runner, one environment" | the 2 webkit specs list in **3** projects (15 chromium, 15 coarse-touch, 13 webkit, `f-pwlist.log`); suffix routing only adds a project, it never excludes one |
| the published `package.json` `imports` | resolves only inside the repo; ships 4 keys whose targets are not in the tarball |
| `LEGACY` in the gate | none |
| 11 of 17 `scripts/<tool>/` and `build/<plugin>/` dirs | one file each (a dir per file) |

---

## 4 · Edict fidelity

`comm` of the `src` non-artifact file lists at HEAD and at F: **658 → 681, 0 removed, 23 added**, all 23 being minted `index.ts` barrels. No component, composable, constant or stylesheet moved.

| clause | D1-F on this tree | evidence |
|---|---|---|
| **1. Colocate components with sub-components, composables, skeletons, constants, styles, recursively** | Absent for source; present for tests, stories and visual specs only. There is no placement law, gate clause or migration step for a source file. Recursion is unenforced even for privacy: C2 judges top-level capsules (K4) | `comm`; K4 |
| **2. Only truly global composables in `composables/`** | Unenforced, and F.1's own "a composable one capsule uses lives in that capsule" has no clause. **Counterexample:** `src/composables/search/` (`match.ts`, `types.ts`, `useFuzzySearch.ts`) is internal: `subpath-policy.mjs:112-116` says "the `./search` key is CUT". It is read only by `dock/composables/useDockSearch.ts:58`. D1-F grew it into a full capsule (door, 2 tests, a story, a visual spec) and the gate is GREEN in scope. `edict-probe.mjs` lists 15 single-component composables at HEAD and 12 at F. The drop comes from routing, not moves. `_shared` is not split | `edict-probe.mjs`; `--scope src/composables/search` |
| **3. Long dirs broken into encapsulated common modules** | Inverted. Dirs with ≥ 10 direct `src` files: **15 → 39**. With ≥ 20: **2 → 8** (dock 51, `styles/glass` 38, aurora 32, styles 32, blob 29, `styles/tokens` 28, menu 22, sortable-list 20). With > 12: 23. C4 is off, and N is unruled | `f-measures.json` |
| **4. Backend treated befittingly** | Weak; details below | `find`, `wc -l` |

Clause 4 in detail:

- **One dir per tool, mostly empty.** 11 of 17 dirs hold one file.
- **No carve into modules.** 7 files exceed 500 lines: `verify-export-types` 1,079, `profile-bundle` 938, `comment-census` 725, `import-dag` 628, `style-fold` 586, `reflect-capture-verify` 583, and the test `scripts/lib/overfit-structure.test.ts` 547.
- **Whole-tree invariants filed as tool tests.** `scripts/lib/` now holds `overfit-structure.test.ts` and `orphan-css-partial.test.ts`, which are harness tests.
- **F.5's "one walker, one repo root, one sha256" is not built.** carve-c adds `storyFiles()` (another walker) and `tests/_support/root.ts` (another root).
- **The value.js carry is prose.**

---

## 5 · Open gaps (exact list)

1. **No source colocation.** 0 of 658 source files move. There is no law, clause or step for sub-components, composables, constants or styles (edict clause 1). Counterexample: `src/composables/search/`, which only dock uses (§4).
2. **`composables/` global-only is unenforced.** F.1's single-consumer rule has no clause. `_shared` is not split to nearest-common-ancestor capsules, as F.1 and F.4 step 12 require. 5 doors were minted inside it instead.
3. **Long dirs are worse, and nothing bounds them.** 15 → 39 dirs with ≥ 10 files; 2 → 8 with ≥ 20; dock root 51. C4 is off, `src`-only and skipped silently. Sub-capsules need authored names (shared fact 11), and step 11 is uncosted.
4. **C1 is vacuous.** The carve uses the gate's law, and the story law reads the artifact's location. A planted misplacement is absorbed back to the base count (K1: 8 visual specs expelled, gate 44). 54 of 79 stories can take the `demo/compositions` hatch.
5. **The harness-primary clause is missing.** The research's named misfiles are gate-green (`aurora/dock-stage-field-layout.test.ts`, `styles/tokens/feedback-motion-tune.test.ts`). The 22 authored story rulings live only in `carve-b.mjs`.
6. **The C2 floor launders.**
   - Any `index.ts` is a door (K3b).
   - Doors are minted from the violation list.
   - Symbols with 2 or more doors: 379 → 429, 77 of them via minted doors.
   - 7 doors serve only tests.
   - The repo's NO-SHIM arm exempts them by filename.
   - The `boot-graph` failure is this dual path.
7. **No recursion in privacy.** Nested-capsule private reaches pass (K4).
8. **The closed suffix set is open.** It is a blacklist (K8a-c, K9) written in 5 places, with a dead `LEGACY` predicate.
9. **Runner routing is partial.** `exclude` and directory-scoped patterns pass C5 (K5, K11). `.webkit.visual.ts` runs in 3 projects. `.touch.visual.ts` routes nothing.
10. **Fail-open reporting.** C3 and C4 print 0 when skipped. C3 skips a sourceless `.d.ts` (K10).
11. **C0 is blind to path literals and globs** (K6, K7). R2 is blind to non-literal dynamic `import()` (K13).
12. **Dual harness paths.** `#demo/chassis` ≡ `#stage` (K12). `#visual` works in `src` only. `@glass/` is kept beside a published `imports` field.
13. **The tree is red.** Typecheck has 93 errors in 47 files, which blocks CI `verify` and `prepublishOnly`. F adds 1 vitest failure (`boot-graph`).
14. **Unbuilt load-bearing steps.**
    - The R3 StoryPage inversion (192 `#stage` refs in 78 stories).
    - `<story lang="json">` router metadata and the R5 family key.
    - The `GlassDock.stagger` port.
15. **Runtime unproven.**
    - 1,984 of 1,995 visual tests were not run.
    - No paint check was made of F's rehashed scope ids or the re-chunking (43 → 29).
16. **F.2's byte-identity is false at F.** 130 dist files change and 91 are added or removed.
17. **The 44 residual reaches need rulings.**
    - 26 CSS reaches: F.1 defines no CSS door for a component capsule.
    - 8 private files beside a published entry.
    - 5 mocks.
    - 2 tool → source reaches.
    - 1 `boot-graph` pin.
    - 1 type-position import.
    - 1 story door, which is common-floor row 3: `useScrollScene` is still in `src`.
18. **Backend.**
    - 11 of 17 tool and build dirs hold one file.
    - 7 files over 500 lines are not carved.
    - The F.5 helper dedupe is not built, and carve-c adds a walker and a root.
    - 2 whole-tree invariants are filed in `scripts/lib/`.
19. **The common floor was not run.** `src/components/index.ts` (a dead door with 0 importers) and `useScrollScene` are still in `src`.
20. **The sha-pin is re-certified by the migration tool** (`repin.mjs`). A real migration owes an authored edit to the docs record.

---

## 6 · Convergence and verdict

**Convergence: 30%.**

| sound (measured) | unsound (measured) |
|---|---|
| entry-rooted declarations: pack 841 → 837 at P with 0 lifecycle files; exports 68 `JSON.stringify`-equal; the old config fails the build loudly | edict clauses 1-3 (gaps 1-3) |
| the move engine: 526 moves, 387 specifier rewrites, 111 URL re-roots, 0 unresolved; P vitest 0 failures | C1 vacuity and the missing harness clause (gaps 4-5) |
| the `preProcessFile` resolver with literal `#` mapping; C0 on imports; C2 judged on the resolved file (the proto's relative-deep plant); R2 on `#` and suffixed files | the C2 floor (gaps 6-7) |
| suffix routing ends the filename-listed webkit project (M-F2 class) | gate holes (gaps 8-11) |
| the `isSource` predicate as a single suffix rule for scanners | tree red, unbuilt, unrun (gaps 13-16) |

**Verdict: BANK.** The family works as a lifecycle layer and is dominated as a structure route.

**Why not ADVANCE.**

- The edict is about where source lives. D1-F moves no source file and makes long dirs worse.
- Its one source-side mechanism, the C2 floor, reaches green by minting unpublished barrels, which the repo's own NO-SHIM law defines as shims.
- A second pass that fixed this would have to import another family's source-placement law. The result would no longer be D1-F.

**Why not RETIRE.** Its artifact layer fills the gap other families leave open. D1-E's critique lists "tests and stories are not colocated" as its gap 17. Five parts are worth harvesting into whichever route advances:

1. entry-rooted declarations, with `tsconfig.build.json` losing `include` and `exclude`;
2. the move engine, including URL, `__dirname` and literal re-roots;
3. the `preProcessFile` resolver with fail-closed C0 on imports and the R2 entry-closure walk;
4. runner routing by suffix, plus C5 widened to `exclude` and to directory-scoped patterns;
5. one `isSource` predicate. It must be generated from a single suffix declaration, not written in five places.

**Re-trigger.** Reopen D1-F as the lifecycle step of the chosen route once that route's source placement lands. It then needs:

- a whitelist suffix clause: every `src` file is either in the entry closure or suffixed;
- a harness-primary clause that counts `demo/stories` literals;
- C1 that no longer reads location;
- doors bound to the published surface, or declared per nested capsule;
- the R3 inversion built;
- a strict program that is green.

**Reproduce.**
```
K=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-F-crit
# HEAD gate: git worktree add $K/wt HEAD; ln -s <repo>/node_modules $K/wt/node_modules
node $K/tools/capsule-gate.mjs $K/wt                       # RED 1,251 (1,255 with --pack after npm run build)
bash $K/tools/run-all.sh carve-c.mjs && bash $K/tools/checks.sh p    # P: gate 489, tc exit 2, vitest 0 fail
bash $K/tools/floor.sh && bash $K/tools/checks.sh f                  # F: gate 44, vitest 1 fail, 130 dist files changed
node $K/tools/mutate.mjs $K/wt $K/logs                     # 13/13 caught
node $K/tools/crit-mutate.mjs $K/wt $K/logs                # 13 missed, 2 misdirected, 2 caught
node $K/tools/f-measures.mjs $K/wt; node $K/tools/door-dup.mjs $K/wt $K/logs/door-route-mint.json
node $K/tools/edict-probe.mjs $K/wt; node $K/tools/story-caps.mjs $K/wt
# absorption: mv src/components/card/card.story.vue demo/compositions/; node $K/tools/carve-b.mjs $K/wt $K/logs/absorb; gate → 44
```
