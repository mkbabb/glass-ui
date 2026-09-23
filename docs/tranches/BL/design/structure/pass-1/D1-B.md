# D1-B · pass 1 · Sealed family modules (vertical slices, one door each)

| | |
|---|---|
| seat | D1 pass-1 research, family D1-B |
| model | `claude-opus-5-5` |
| HEAD | `b7099ea6` (the worktree landed on `6433284a`, one docs-only commit ahead) |
| instruments | TS-AST tracer over `src/ demo/ tests/ tests-visual/ scripts/` and root configs (1263 files, 2790 edges, 0 unresolved at HEAD); Louvain with co-assignment consensus; vue-tsc, vitest, vite 8/rolldown, `publishStyleAssets`, `scripts/profile-bundle.mjs`; a one-symbol consumer app built with vite per subpath |
| scratch | `$S` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-B/` (every script and log named below lives there; the worktree `$S/wt` was removed before return) |

Terms used throughout:

- **module**: a directory with an `index.ts`; its `index.ts` is the **door**. Sealing is recursive: a module nested in a module is private to its parent.
- **containers** (`src`, `src/components`, `src/composables`, `src/styles`) are not modules.
- **kind slots** (`composables|styles|constants|shaders|utils`) carry no door.
- **V2 visibility**: from outside M, a specifier into M must resolve to `M/index.ts` or to a published entry of `libraryEntryMap()`.

---

## Q1 · The family partition, two ways

**Method.** The community-detection reading comes from `$S/louvain.mjs`, which runs over the component graph.

- Five edge sets were used: D (direct imports), C (kernel co-dependency), H (`_shared`-only), O (`_shared` plus L13's 34 OWNED units), and S (CSS register co-usage).
- Each set was run at γ 1–3 in steps of 0.25, for 18 runs per consensus.
- `$S/consensus2.mjs` builds the co-assignment matrix.
- `$S/cohesion.mjs` scores each family by its mean pairwise co-assignment.

The domain reading is L13's six code-declared families: PROC, OVERLAY, PAGER, TRACK, BINARY and SEGMENTED. It is set against the PORTFOLIO draft of 13 families.

```
node $S/consensus2.mjs DO,DOS      # 18 runs, the edge set of record
node $S/q1-summary.mjs             # DC / DH / DO side by side
node $S/cohesion.mjs
```

**Result, edge set DO:**

- 20 of 55 components have a best-fit family that differs from the draft. Edge set DC gives 25 and DH gives 19.
- 8 components have no stable partner (co-assignment ≥ 0.5 with nobody): `metric dark-mode-toggle handmark music-staff typewriter alert avatar separator`.

| family (draft) | cohesion DC | DO | DH | verdict |
|---|---|---|---|---|
| overlay (6) | 0.77 | 0.67 | 0.62 | holds |
| overlay + select | 0.72 | 0.54 | 0.51 | holds |
| fields (6, with select) | 0.59 | **0.47** | 0.42 | fails at DO |
| fields − select | 0.88 | 0.70 | 0.63 | holds |
| forms = fields + binary − select | 0.87 | 0.72 | 0.66 | holds (competes with the split) |
| binary | 0.89 | 0.78 | 0.74 | holds |
| track | 0.56 | 0.53 | 0.52 | holds, thin |
| pager | 1.00 | 1.00 | 1.00 | holds |
| procedural | 1.00 | 1.00 | 0.17 | holds on DC/DO; H sees no `_shared` tie |
| disclosure (3) | 0.33 | 0.33 | 0.33 | fails; the accordion+collapsible pair is 1.00 |
| surfaces (4) | 0.17 | 0.17 | 0.17 | fails; the card+surface pair is 1.00 |
| data (6) | 0.10 | 0.12 | 0.10 | fails; table+data-table+skeleton is 1.00 |
| controls (4) | 0.25 | 0.36 | 0.30 | fails |
| feedback (5) | 0.19 | 0.22 | 0.21 | fails |
| expressive (6) | 0.11 | 0.01 | 0.01 | fails |
| SEGMENTED (L13: tabs + toggle-group) | 0.50 | 0.11 | 0.00 | fails |

Seven of the twelve multi-member draft families score below 0.5 under DO: fields, disclosure, surfaces, data, controls, feedback and expressive. Dock is a singleton.

**Every disagreement under DO** (draft family → best-fit family):

- toggle-group controls→binary
- data-table data→feedback
- fading-scroll data→disclosure
- infinite-scroll data→controls
- sortable-list data→overlay
- table data→feedback
- expandable-container disclosure→data
- configurator expressive→disclosure
- easing expressive→controls
- alert feedback→dock
- skeleton feedback→data
- toast feedback→overlay
- input, label, labeled-field, number-field and textarea fields→binary (five rows)
- select fields→controls
- menu overlay→dock
- separator surfaces→pager

The disagreements between L13 and the draft are these:

- L13's OVERLAY has four members and omits tooltip and command.
- L13's SEGMENTED has no draft counterpart.
- L13 names no family for 29 components.

The four components the task names:

| component | draft | L13 | measured (DO) | placement |
|---|---|---|---|---|
| select | fields | — | fit to fields **0.00**; partners menu 0.61, tabs 0.61, toggle-group 0.50; overlay+select 0.54 | **overlay** (amended) |
| command | overlay | not in OVERLAY | fit to overlay 0.73; dialog 1.00, sheet 1.00, popover 0.72, tooltip 0.72 | overlay (draft right, L13 short) |
| dark-mode-toggle | expressive | — | no co-assignment ≥ 0.5 under DO or DH; DC ties it to procedural through a shared kernel import only | singleton module |
| tabs | controls | SEGMENTED | fit to controls 0.48; toggle-group co 0; dock+tabs 0.94 under DC, 0.17 under DO | singleton module |

The measured partition used below (`CORROBORATED` in `$S/families.mjs`) keeps a family only if its cohesion under DO is at least 0.5:

- overlay (7, with select)
- fields (5)
- binary (3)
- track (4)
- pager (3)
- procedural (4)
- disclosure pair
- surfaces pair
- data trio (table, data-table, skeleton)

That puts 33 components in 9 families. Dock and 21 other components remain single-component first-level modules.

## Q2 · The door-growth bill

```
node $S/q2-head.mjs $S/head.json                 # HEAD modules
node $S/gate.mjs $S/head.json corroborated v2    # virtual placement, V2
node $S/kdoors.mjs $S/head.json                  # kernel doors re-exporting family-owned files
```

**At HEAD**, `src` has 445 edges that pass a module's door:

- 26 of them are CSS and 91 are type-only.
- They reach **195 distinct symbols**.
- 51 of those symbols are already on the door, so **144 must be added**.

| module | edges | symbols | already on door | door growth |
|---|---|---|---|---|
| `components/_shared` | 268 | 52 | 1 | 51 |
| `composables/motion` | 63 | 60 | 14 | 46 |
| `composables/glass` | 35 | 29 | 3 | 26 |
| `components/dock/composables` | 18 | 23 | 12 | 11 |
| `composables/motion/core` | 20 | 9 | 7 | 2 |
| 21 others | 71 | 22 | 14 | 8 |

**After placement** (the CORROBORATED families with V2 visibility, 300 src files moved):

- 341 edges pass a door, reaching 177 symbols with 140 new on a door, across 19 modules.
- The AMENDED draft (13 families with select moved to overlay) gives 346 edges, 189 symbols and 152 new, across 20 modules.

The bill is dominated by modules that are not families:

- `_shared`: 35 new names.
- `composables/motion`: 23.
- `procedural`: 30, because its members reach each other's composables.
- `disclosure`: 11.
- `dock`: 10.

**Where the growth lands.** 48 of the 144 HEAD growth symbols would go onto published kernel doors: `./motion` 46 and `./motion-core` 2. `./dom` and `./color` take 1 each, for a total of 50. The kernel doors are published subpaths, so every R1 fix against the kernel adds public API.

**Consumer zones** also resolve specifiers to files that are not published:

| zone | specifiers |
|---|---|
| demo | 90 |
| tests | 241 |
| tests-visual | 18 |
| scripts | 2 |
| root | 1 |

**Kernel doors that carry family code.** Seven kernel doors re-export 17 files that the placement moves into families, 62 distinct names in all:

- `composables/color`, `dom`, `glass`, `glass/canvas2d`, `motion`, `motion/core` and `search`.
- By family: procedural 9 files, dock 5, and chip, slider and overlay 1 each.

Through the published subpaths, those files account for **44 name-slots on four kernel subpaths**:

- `./motion` 13
- `./motion-core` 25
- `./color` 3
- `./dom` 3

The root `.` carries 28 more, but it is the aggregate door and keeps them.

## Q3 · Seal overlay in a scratch copy: gzip before and after

The prototype (see "Prototype probe" below) sealed the overlay family in `$S/wt`. Both trees were built with `publishStyleAssets` and profiled:

```
node scripts/profile-bundle.mjs            # in the HEAD worktree state and after the seal → pb-head.json / pb-seal.json
node $S/closure.mjs <dist>                 # entry gzip + static-closure gzip per subpath → closure-head.json / closure-seal.json
node $S/tshake/run.mjs $S                  # one-symbol consumer app per subpath, minified, externals = peers
node $S/cssflat.mjs <dist> <rules.json>    # dist/styles/index.css flattened, rule set and order
```

**Entries.** 63 public entries in both builds. 15 of the 63 changed, and the entry gzip totals −108 B.

**Static closure** (the entry plus every chunk it statically reaches, gzip):

| subpath | entry gzip | closure head → seal | Δ | files |
|---|---|---|---|---|
| `./dock` | 14393 → 14391 | 38367 → 43424 | **+5057** | 27 → 33 |
| `./command` | 183 → 183 | 14730 → 18523 | +3793 | 19 → 19 |
| `./dialog` | 191 → 172 | 11434 → 14894 | +3460 | 14 → 13 |
| `./menu` | 266 → 245 | 11098 → 9459 | −1639 | 13 → 11 |
| `.` | 5324 → 5281 | 89848 → 88561 | −1287 | 75 → 73 |
| `./popover` | 115 → 115 | 8275 → 7276 | −999 | 10 → 9 |
| `./tooltip` | 131 → 131 | 5553 → 4558 | −995 | 8 → 7 |
| `./select` | 186 → 186 | 7385 → 6394 | −991 | 9 → 8 |
| `./sheet` | 259 → 235 | 13199 → 12666 | −533 | 13 → 12 |
| `./tabs` | 88 → 88 | 19458 → 19186 | −272 | 18 |
| `./labeled-field`, `./slider`, `./easing` | ±1 | +207, +207, +204 | | +1 file each |

Across all 63 subpaths the closure sum is +6190 B.

**Tree-shaking.** For each subpath a consumer app imports one symbol, is minified, and is compressed with gzip -9. This is the number a consumer pays:

| import | head | sealed | Δ |
|---|---|---|---|
| `GlassDock` from `./dock` | 10130 | 10771 | **+641** |
| `DropdownMenuTrigger` from `./menu` | 4395 | 3714 | −681 |
| `Popover` from `./popover` | 2662 | 1947 | −715 |
| `Select` from `./select` | 1705 | 1013 | −692 |
| `Tooltip` from `./tooltip` | 1451 | 753 | −698 |
| `CommandDialog` from `./command` | 7200 | 7077 | −123 |
| `DialogContent` from `./dialog` | 6301 | 6288 | −13 |
| `SheetContent` from `./sheet` | 8161 | 8154 | −7 |

Why the numbers move:

- **Dock grows.** It now reaches overlay through the overlay door: `DockTrigger` and `dockContext` import `../overlay`. Rolldown assigns chunks by static reachability, so the whole overlay chunk group joins dock's closure, and tree-shaking recovers only part of it.
- **Popover, select, tooltip and menu shrink.** Participation no longer imports `dock/composables/dockContext.ts`, so the dock chunk leaves their closure.
- **Command and dialog closures grow +3.5 to 3.8 KB, but their consumer bytes do not.** The closure counts chunks that are reachable but then shaken out.

**CSS.** The flattened `dist/styles/index.css` has 1935 rules in both builds, and gzip went from 56693 to 56681. The rule sets are equal apart from one layer-block boundary. **76 rules changed their relative order**: the sheet and dialog blocks moved from their own rungs to the overlay door's row rung. Paint was not verified.

## Q4 · Door-level SCCs after sealing

```
node $S/scc.mjs $S/head.json head 1
node $S/scc.mjs $S/head.json amended 1 [cuts]
node $S/scc.mjs $S/head.json amended 2 [cuts]
```

- **At HEAD** (first level, value edges) there are 2 SCCs:
  - M02 = `[_shared composables/glass composables/motion dock menu select tabs]`
  - M03 = `[dialog sheet]`
- **After placement**, with no inversion, the first level collapses into one 10-node SCC: `[_shared color dom glass motion controls dock overlay procedural track]`. Moving files into families does not dissolve M02; it widens it.
- **At level 2** (inside families) there are 3 SCCs: an 11-node knot, `chip ↔ composables/color`, and `overlay/dialog ↔ overlay/sheet`.

Each named inversion removes a set of edges:

| cut | what it does | first-level value SCC after |
|---|---|---|
| — | | 1 × 10 |
| `kernelDoors` | kernel `index.ts` stops re-exporting family-owned files (the 17 files and 62 names from Q2) | 1 × 6 `[_shared glass motion controls dock overlay]` |
| + `participation` | overlay owns an `OverlayHost` key and dock provides it; `_shared/overlay/participation.ts` stops importing `dock/composables/dockContext.ts` | 1 × 5 `[_shared glass motion controls overlay]` |
| + `roving` | `useTabRovingFocus` moves from `tabs/composables` to `composables/motion/morph`, beside the `useSelectionGroup` that composes it | **0** |
| + `modal` (level 2) | `ModalOverlay` moves to `overlay/modal/` behind its own door; sheet imports the modal door, dialog imports the sheet door | level 2: **0** |

**Three inversions plus one sub-module carve reduce the value SCCs to zero at both levels.** The `dockHold` cut (Slider → `useDockHold`) is not needed, because once dock no longer reaches `track`, that edge is acyclic.

One type-only 2-cycle survives every cut. `_shared/useMotionAxis.ts` makes a value import of `core/useReducedMotion.ts`, and `morph/useSelectionGroup.ts` makes a type import of `_shared/selection.ts`. Its policy is an open gap.

The prototype confirms the count. `door-gate.mjs` R4 (value cycles at every depth) goes from 2 at HEAD to **0** on the sealed worktree.

## Q5 · Can the demo compile against doors only?

```
node $S/q5.mjs $S/head.json /Users/mkbabb/Programming/glass-ui demo
node $S/q5-compile.mjs $S/wt          # tsconfig.demo-doors.json paths generated from libraryEntryMap(); demo imports rewritten to @mkbabb/glass-ui/<name>
npx vue-tsc --noEmit -p tsconfig.demo-doors.json   # in $S/wt → tc-demo-doors.log
```

The demo has 137 importers into `src`. Their 368 specifiers classify as follows:

| class | count |
|---|---|
| resolves to a published door | 277 |
| reroute (the symbol is on a published door, but the specifier names a private file) | 72 |
| **private** (the symbol is on no published door) | **18** specifiers in **11** files, **16** distinct symbols |
| CSS door | 1 |

The private targets:

- 4× `composables/glass/webgpu/rendererStatus.ts`
- 3× `composables/search/index.ts`
- 2× `composables/glass/useGlassBackdropLuminance.ts`
- 1× each:
  - `sidebar/types.ts`
  - `dock/composables/useDockState.ts`
  - `motion/scroll/useScrollScene.ts`
  - `motion/spring/springProjection.ts`
  - `motion/core/motionTempo.ts`
  - `aurora/composables/runtime.ts`
  - `blob/constants.ts`
  - `fourier-field/constants.ts`
  - `glass/procedural/prng.ts`

**Compile probe.** 66 path aliases were generated from `libraryEntryMap()`, and 134 demo files were rewritten to `@mkbabb/glass-ui/<name>`. vue-tsc then reports **33 errors**:

- 18 TS2307, one for each private specifier.
- **1** TS2307 at a deliberate leaf import: `demo/shell/AppShell.vue` loads `@glass/components/aurora/Aurora.vue` asynchronously "so the async chunk carries the component, not the whole export surface".
- 14 cascades (TS2339, TS7006, TS2344) from types that did not resolve.

Answer: **not as the tree stands**. Door-only demo compilation needs one of two things for the 16 symbols: publish them, or move them out of the demo's reach. It also needs a per-site exception for the leaf-import pattern, or accepting its boot-graph cost, which was not measured.

The regex rewriter also mangled imports next to comments in three files (`aurora-hero.ts`, `slider.vue`, `tabs.vue`). A real migration codemod has to rewrite by AST.

## Q6 · Prior art

| system | seal shape | how it fails | bearing |
|---|---|---|---|
| Nx `@nx/enforce-module-boundaries` | ESLint rule over the Nx *project* graph; tags + `depConstraints`; relative-path reach fails with "Projects cannot be imported by a relative or absolute path, and must begin with a npm scope" (W §1.1) | graph reload per linted file outside terminal runs (nx#36611); npm imports flagged self-circular (#15957); pressure to disable the cycle check (#13842) | presupposes projects; glass-ui has neither Nx nor ESLint |
| eslint-plugin-boundaries v7 | path-pattern element types; `relationship` selector (child/sibling/uncle…); "B child of A is private to A, only A may use it" | API churn (v6 widened nodes to `export *`/`import()`, a green tree turned red); ESLint-hosted | the recursive V1 seal as an off-the-shelf rule; V2 (published-door exemption) needs a custom selector |
| dependency-cruiser | forbidden rules by path regex with group back-references; `no-deep-into-sibling-component` style | SFC resolution must be configured or edges go unresolved (399 unresolved at HEAD by default, per W); `scope: folder` supports `circular` but no `via` | W measured 255 deep module edges vs PORTFOLIO's 268; folder scope finds M02 + M03 |
| Sheriff | folder with `index.ts` is a module; "files that are not exported are encapsulated"; barrel-less mode uses `internal/` | flat semantics: a nested door is visible everywhere, not only to its parent | closest shipped tool; differs from the recursive seal |
| Go `internal/` | compiler: importable only from the tree rooted at the parent of `internal/` | none in the compiler; over-application of layout conventions (project-layout#117) | the recursive seal enforced by the toolchain; tests `_test.go` beside source, which is S5's shape |
| Angular `public_api.ts` / ng-packagr secondary entry points | each entry point dir has `ng-package.json` + `public-api.ts`; entry points import each other by package name, not relative path | 376 `BUILD.bazel` files in Angular Material; Bazel visibility carries enforcement, not the TS | the published-door-as-in-repo-door rule (V2) is Angular's rule; `button/` holds 26 files with spec beside source |
| Node `exports` / `imports` | `ERR_PACKAGE_PATH_NOT_EXPORTED` for bare specifiers | relative paths bypass it (W's probe: `../a/src/internal/secret.js` runs, typechecks, builds) | resolver privacy covers bare specifiers only; a directory seal inside one package needs a gate |
| Packwerk (privacy removed in 3.0) | `app/public` dir per package | "people mostly fix violations by moving things"; todo files grew with every feature | the door-bloat risk in Q2 is the same failure |

None of these tools implements the recursive V2 seal (a module's own door, plus any published door) over `.vue` SFCs and CSS `@import`. The gate below is custom.

---

## Strongest form

- **S1. Units.** A module is a directory with an `index.ts` door. The containers (`src`, `src/components`, `src/composables`, `src/styles`) are not modules. Kind slots (`composables|styles|constants|shaders|utils`) are plain folders inside a module and carry no door. At HEAD, R5 finds two kind slots that do: `dock/composables/index.ts` and `infinite-scroll/composables/index.ts`.
- **S2. Visibility (V2, recursive).**
  - From outside M, the only legal targets in M are `M/index.ts` and published entries of `libraryEntryMap()`. A nested module is private to its parent unless it is published.
  - There is one door per symbol inside the repo: no door re-exports a sibling's door. The root `src/index.ts` is the single aggregate door.
  - A file does not import its own module's door. There are 2 such files at HEAD: `alert/Alert.vue` and `badge/Badge.vue`.
- **S3. Published entries are doors.** Every `libraryEntryMap()` source is an `index.ts`. `blob/config.ts`, `fourier-field/math.ts`, `_shared/axes.ts` and `styles/tokens.ts` become sub-module doors. Subpath names are keyed by an explicit `NESTED_COMPONENTS` name → path map, so a subpath is not the directory name.
- **S4. CSS door.** `M/styles.css` is the only CSS file importable from outside M. It aggregates partials of the same cascade layer, in their original order.
- **S5. Tests.**
  - A unit test sits beside its source inside the module. It is a sink: excluded from acyclicity and from the size bound, but still bound by R1.
  - A test that spans two or more first-level modules stays in `tests/` and imports published doors only.
  - Scanners that walk `src/` exclude `*.test.ts` and `*.test-d.ts`.
- **S6. Acyclicity.** There are no value-edge cycles between sibling modules at any depth. Type-only edges are listed separately.
- **S7. Kernel.**
  - The kernel is the `composables/*` domains, `styles/`, and a sealed component-vocabulary `_shared` (class names, axes, selection, rows). The kernel imports no family.
  - No kernel door re-exports family-owned code. A composable owned by one family lives in that family, and the family's door exports it.
- **S8. Admission.** A family exists only if its measured cohesion under DO is at least 0.5 (the CORROBORATED set in Q1). Every other component is its own first-level module.

## Prototype probe

The probe ran in `$S/wt` (`git worktree add … HEAD`, with `node_modules` supplied as per-entry symlinks) and is now removed. It changed the following:

1. **Moves.** A codemod rewrote specifiers in place:
   - `$S/move.mjs`: directory moves first, then file overrides. It preserves the specifier style (`@glass`, relative, dir/index, extension, `?raw`).
   - Scope: 16 overlay moves (`dialog sheet popover menu tooltip command select`, `_shared/overlay`, `_shared/menu` and `ModalOverlay`), 6 menu `sub/`/`items/` moves, the roving move, and 20 test moves beside source.
   - Result: `src/components/overlay/` holds 102 files in 12 directories, 22 of them tests beside source.
2. **Participation inversion.**
   - `overlay/composables/participation.ts` now owns `OverlayHost`, `DockHoldKind` and `provideOverlayHost`.
   - `provideDockContext` calls `provideOverlayHost(context)`, so dock depends on overlay and overlay no longer depends on dock.
3. **Doors.**
   - New doors: `overlay/index.ts`, `overlay/modal/index.ts`, `menu/sub/index.ts` and `menu/items/index.ts`, with `menu/index.ts` re-exporting `./items` and `./sub`.
   - Hand-routed imports: DockTrigger, the dock composables door, useDockState, CommandDialog, command/types, DialogContent and SheetContent.
4. **CSS door.**
   - `overlay/styles.css` imports `./row.css`, `./sheet/styles.css` and `./dialog/styles.css`. `src/styles/index.css` imports it at the row rung.
   - `sheet/styles.css` (583 lines) became a door over `styles-a.css` (316) and `styles-b.css` (267) to meet the 500-line bound.
5. **Subpath policy.**
   - `scripts/lib/subpath-policy.mjs` classifies `overlay` as `INTERNAL`.
   - `NESTED_COMPONENTS` maps `command dialog menu popover select sheet tooltip` to their nested doors, so the subpath names are unchanged.
6. **Test and config.**
   - vitest includes `src/**/*.{test,spec}.{ts,tsx}`.
   - `tsconfig.json` excludes the test suffixes, while `tsconfig.test.json` includes them. `tsconfig.build.json` excludes `*.test-d.ts`.
   - Self-scan filters were added in `dialog-dismiss` and `picker-lane`.
   - `overfit-structure` gained a `srcFiles` filter and the `menu/sub` path.
   - Three test files that read sheet CSS now read both partials.

**Outcome:**

| check | HEAD | sealed |
|---|---|---|
| vue-tsc (`tsconfig.json`, `tsconfig.test.json`) | 0 errors | **0 errors** |
| vitest (239 files) | 2304 pass / 9 fail | **2306 pass / 7 fail** |
| `publishStyleAssets` | exit 0, 63 entries | **exit 0, 63 entries** |
| `door-gate --scope src/components/overlay` | FAIL | **PASS, all six rules** |
| `door-gate` full tree | 788 violations, R4 2 | 667, **R4 0** |

The failures in both columns:

- The 3 `boot-graph` failures appear in both columns; neither tree has a built `dist-demo`.
- 6 HEAD failures did not recur (a dirty tree for `comment-ratio`, and aurora-fuzz, menu-contract and glass-subtlety under load).
- The sealed tree's 4 new failures are all `gate-register`. Its roster in closed-tranche records names six test paths that moved. They were left red on purpose: fixing them means editing closed records.

**What broke on the way.** The first seal had 31 failing tests:

- **17 tests in 3 files** (`sheet-reach`, `sheet-graded-edge`, `focus-veil`) read `sheet/styles.css` as text and broke when the size bound forced the CSS carve.
- **4 self-scanning tests** (`dialog-dismiss` ×3, `picker-lane`) scan `src/` for a pattern and found their own source once they moved beside it.
- **2 `overfit-structure` failures** came from a gate that walks `src/` and counts files.
- **1 `public-surface` failure** came from a stale dist.
- **4 in `gate-register`.**

Other breaks, each fixed as it came up:

- The classifier failed closed on the new directory (`unclassified dir components/overlay`), which is the right behaviour.
- A move-ordering bug moved a directory over a file override.
- The demo regex codemod mangled imports next to comments.

## Enforcement gate

`$S/door-gate.mjs` (64 lines) uses `$S/trace.mjs` (110 lines, TS AST plus SFC `<script>`/`<style src>` plus CSS `@import`).

Usage:

```
node door-gate.mjs <repoRoot> [--scope dir] [--max-files 12] [--max-lines 500] [--verbose]
```

It reads the published doors from `<root>/scripts/lib/subpath-policy.mjs` `libraryEntryMap()` and checks six rules:

- **R1 door.** A `src` specifier into module M must resolve to `M/index.ts` or a published door. M is the outermost module that holds the target but not the importer.
- **R2 consumer.** Specifiers from `demo/`, `tests/`, `tests-visual/` and `scripts/` into `src` must resolve to a published door.
- **R3 CSS door.** A CSS specifier that crosses a module must resolve to `M/styles.css` (or `M/index.css`).
- **R4 acyclic.** No value-edge cycle between sibling modules at any depth. Tests are sinks, and kernel lifting applies only at the root.
- **R5 kind slot.** No `index.ts` in a kind slot.
- **R6 bound.** At most 12 direct source files per module directory and at most 500 lines per file. Test files and `@generated` files are excluded.

**RED at HEAD** (`node $S/door-gate.mjs /Users/mkbabb/Programming/glass-ui`):

```
FAIL R1 379
   src/components/_shared/overlay/participation.ts -> src/components/dock/composables/dockContext.ts   (door: src/components/dock/index.ts)
   src/components/_shared/useMotionAxis.ts -> src/composables/motion/core/useReducedMotion.ts   (door: src/composables/motion/index.ts)
   src/components/accordion/Accordion.vue -> src/components/_shared/class-names.ts   (door: src/components/_shared/index.ts)
   … 376 more
FAIL R2 353
   demo/chassis/code/Code.vue -> src/components/_shared/class-names.ts
   demo/chassis/code/CodeBlock.vue -> src/composables/dom/useClipboard.ts
   … 351 more
FAIL R3 26
   src/components/accordion/Accordion.vue -> src/components/_shared/disclosure/disclosure.css
   src/styles/glass.css -> src/components/chip/accent-tone.css
   … 24 more
FAIL R4 2
   cycle [src/components/menu src/components/select src/components/tabs src/composables/motion src/composables/glass src/components/dock src/components/_shared]
   cycle [src/components/sheet src/components/dialog]  via SheetContent.vue -> dialog/ModalOverlay.vue ; DialogContent.vue -> sheet/motion.ts
FAIL R5 2
   src/components/dock/composables/index.ts
   src/components/infinite-scroll/composables/index.ts
FAIL R6 26
   src/index.ts: 585 lines > 500
   src/components/aurora/composables: 16 direct files > 12
   src/components/aurora/composables/runtime.ts: 528 lines > 500
   … 23 more
door-gate scope=src modules=69 published-doors=66: FAIL (788 violations)
exit=1
```

**How it passes.** The overlay scope already passes on the prototype:

```
PASS R1 0 … PASS R6 0
door-gate scope=src/components/overlay modules=72 published-doors=66: PASS
exit=0
```

The full-tree run on the prototype leaves R1 363, R2 263, R3 15, R4 0, R5 2 and R6 24. Driving it to zero takes six steps:

1. Put the 140 growth symbols on their doors (Q2), or re-home them.
2. Rewrite 72 demo reroutes, and publish or remove the 16 private demo symbols (Q5).
3. Rewrite the 241 test specifiers, or move 165 test files beside their module.
4. Replace the 21 cross-module CSS `@import`s in `src/styles/index.css` with module `styles.css` doors.
5. Remove the 2 kind-slot doors.
6. Carve the 24 bound violations. `src/index.ts` at 585 lines needs the aggregate door exempted from the line bound, or split into per-family doors.

The gate fails loud on an unresolved `src` specifier, and it has no allow-list.

## Migration cost

`node $S/cost.mjs $S/head.json /Users/mkbabb/Programming/glass-ui <partition>` runs as a dry run and writes nothing to the repo:

| | CORROBORATED (9 families) | AMENDED draft (13 families) |
|---|---|---|
| src files moved | 300 (`_shared` 6, component 259, OWNED composables 35) | 409 (6 / 368 / 35) |
| specifier rewrites | 836 in 353 files | 1118 in 463 files |
| rewrites by importer zone | src 405, demo 187, tests 226, tests-visual 18 | src 515, demo 288, tests 297, tests-visual 18 |
| path strings naming a moved dir (tests, tests-visual, scripts, demo, vite) | 187 in 52 files | 241 in 64 files |
| `tests/` files (248) | 165 colocate into one module; 56 stay (span ≥ 2 modules); 27 have no src target | same |

On top of the moves:

- 140 door additions (Q2).
- 44 kernel-subpath name-slots re-homed or kept (Surface).
- 3 inversions and 1 carve (Q4).
- About 26 R6 carves.
- 72 + 18 demo sites (Q5).
- The `subpath-policy` re-key and the vitest and tsconfig include changes.
- The source-reading and scanning tests of the classes listed under "What broke on the way".
- Every closed-record roster that names a moved path (the `gate-register` class).

The overlay prototype alone was 102 files moved, 261 files changed, 134 demo files rewritten, and 11 hand edits.

## Consumer surface

- **The prototype's exports-map diff is empty.** All 68 keys in `package.json` `exports` are byte-identical. Every `dist/<name>.js` and `.d.ts` that they point at keeps its filename. `NESTED_COMPONENTS` carries `./dialog`, `./menu` and the rest to their nested sources.
- **Inside `dist`, 30 or more `.d.ts` and CSS files relocate** under `dist/components/overlay/`. Two shared chunk names disappear (`DialogContent-*`, `DropdownMenuTrigger-*`). None of these can be reached through the exports map, so this is not a break.
- **Behaviour change without an exports diff.**
  - Overlay participation now reads the overlay-owned `OverlayHost` key, which only `provideDockContext` provides.
  - A consumer that provides the public `DOCK_CONTEXT_KEY` directly, without `provideDockContext`, loses overlay participation.
  - None of the sibling repos provides it directly (grep across `~/Programming`, read-only).
- **S7 break.** Moving family-owned composables out of the kernel takes 44 name-slots off four published subpaths: `./motion` 13, `./motion-core` 25, `./color` 3 and `./dom` 3. Examples are `useScrollChrome`, the pointer-field mappings, `useAccentTone` and `useDragVelocity`. Consumers must re-import them from `./dock`, `./chip`, `./slider` or a procedural door. The alternative is to keep those files in the kernel and let the family seal stay incomplete.
- **Additive growth.** Kernel door growth under R1 is public API growth (Q2: 50 names onto `./motion`, `./motion-core`, `./dom` and `./color`). One example is `TabActivation`, which the tabs module needs once the roving machine moves into `motion/morph`.
- **Bytes.** Consumer bytes change by +641 B for `./dock`, −681 to −715 B for `./menu`, `./popover`, `./select` and `./tooltip`, and by little for the rest (Q3). 76 CSS rules reorder inside `./styles` (Q3), and paint was not verified.

## Backend analogue: `scripts/` and a sibling backend

**glass-ui `scripts/`.** The directory holds 12 top-level tools plus `release.sh`, and `lib/` holds 4 modules. The import map (grep, recorded above the gate) has 26 specifiers that touch `scripts/`:

- 21 come from `tests/`, `tests-visual/` and `vite.*.ts`:
  - 8 `tests-visual` specs import `lib/paint-arm.mjs`.
  - `vite.library.ts`, `vite.style-fold.ts` and 2 gates import `lib/subpath-policy.mjs`.
- 3 are internal to scripts. `paint-arm` reaches up into `reflect-capture-verify`.
- 2 go from scripts into `src` privates: `regen-spring-tokens.mjs` imports `springPresets.ts` and `springProjection.ts`, which is R2's `scripts:value 2`.

The sealed form is `scripts/<domain>/index.mjs`, one door per domain:

- `policy`: subpath-policy, regen-exports, flatten-subpath-types, verify-export-types.
- `styles`: gen-component-styles, minify-css.
- `paint`: paint-arm, reflect-capture-verify, safari-probe.
- `census`: comment-census, gate-register, import-dag, profile-bundle.
- `tokens`: regen-spring-tokens.

A CLI stays a leaf that `node` runs. The door is the import surface. Once doored, 23 of the 26 specifiers cross a domain and are born RED. The 8 root `vite.*.ts` configs form a `build/` module with a door, or stay a consumer zone under R2. The scripts→src reach goes through the published `./motion` door.

**Sibling backend (value.js `api/src/`, read-only).** The layout is `modules/{admin,color,meta,palette,session}` over `platform/{cache,db,http,migrations,text}`. This is already the family-over-kernel shape, but it has **0 module doors**. Measured specifiers:

- 12 cross-module deep specifiers: admin→palette 7, admin→session 3, admin→color 2.
- 69 module→platform reaches: http 65, text 2, db 1, cache 1.

The gate carries over unchanged once `index.ts` doors exist:

- R1 needs `modules/<m>/index.ts` and one door per platform service.
- S7 becomes "platform imports no module".
- R2's published set is the HTTP route table instead of `libraryEntryMap()`.

That is 81 born-RED edges. Node `imports` (`#platform/*`) would add resolver privacy for bare specifiers, but relative paths bypass it (W §2.3), so the gate is still needed.

## Weaknesses (named counterexamples)

1. **Taxonomy is a judgment the data only partly supports.**
   - 20 disagreements with the draft and 8 components with no partner.
   - 7 of the 12 multi-member draft families fall below 0.5.
   - The bar does not decide between two forms that both pass: `forms` (fields+binary, 0.72) versus `fields` (0.70) plus `binary` (0.78).
   - `track` passes at 0.53.
   - `tabs` and `dark-mode-toggle` join nothing.
2. **Door routing costs bytes where one family consumes another.**
   - `./dock` gains +5057 B of closure and +641 B for a consumer, because rolldown pulls whole chunk groups through a door.
   - The seal trades a one-symbol leaf import for a whole-door import.
3. **Leaf-versus-barrel sites exist on purpose.** `demo/shell/AppShell.vue` imports `Aurora.vue` directly to keep the async chunk lean. A door-only rule forbids that, and its boot-graph cost was not measured.
4. **Kernel doors carry family-owned code.**
   - 17 files and 62 names sit on 7 kernel doors, with 44 name-slots on published subpaths.
   - S7 either breaks those subpaths or leaves the families unsealed.
5. **The CSS door fights cascade order.** Routing sheet and dialog through `overlay/styles.css` reordered 76 rules. The 500-line bound forced a carve of `sheet/styles.css`, and that carve broke 17 source-reading tests.
6. **Tests beside source bring their own defect classes.**
   - Self-scanning tests find themselves (4).
   - Gates that walk `src` miscount (2).
   - Closed-record rosters name the old paths (4 still red).
   - Bound pressure grows: menu goes from 16 to 19 direct files before its `sub/` and `items/` carve.
   - A cross-module test (`DropdownMenuTrigger.action` imports dock privates) has no single home.
   - 56 tests span modules and stay in `tests/`.
7. **The public `DOCK_CONTEXT_KEY` changes meaning under the participation inversion.** No sibling consumer is affected (0 direct providers), but the change is invisible to the exports map.
8. **The roving move leaks onto a public door.** `TabActivation` must go on `./motion` or `./motion-core` for tabs to reach it through a door. In the prototype it is still a deep import, so R1 stays red.
9. **`_shared` does not dissolve.** 20 of its 26 units stay in the kernel because two or more families import them. The kernel vocabulary module remains the largest door, with 35 new names.
10. **No off-the-shelf tool implements recursive V2.** Sheriff is flat, eslint-plugin-boundaries needs ESLint and custom selectors, and dependency-cruiser needs SFC resolution. The gate is 174 lines of custom code to maintain.
11. **`profile-bundle` measures one level only.** Its per-chunk table misses the closure effect, so Q3 needed `closure.mjs` and the consumer build.

## Open gaps

- The demo-side Vite alias (the runtime mirror of the tsconfig paths) and the boot-graph weight of door-only imports were not measured.
- The 76 reordered CSS rules were not paint-verified (live π per band).
- The fix for the `gate-register` roster touches closed-tranche records, and needs a ruling.
- The full-tree seal was not run. The prototype sealed overlay only; the other 8 families and the kernel moves are dry-run numbers.
- The kernel vocabulary module (`_shared`) needs a name and a door surface.
- The 13 OWNED composable modules (17 files, 62 names) need per-symbol surface decisions: move them and break 44 name-slots, or keep them in the kernel.
- Type-only kernel cycles (`_shared` ↔ `composables/motion`) need a policy.
- The bound values (12 files, 500 lines) are not justified by measurement. The root aggregate door (585 lines) needs a ruling.
- Cross-module tests need a placement rule by subject, e.g. `DropdownMenuTrigger.action` importing dock privates.
