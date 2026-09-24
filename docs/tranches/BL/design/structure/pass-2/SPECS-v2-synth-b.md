> Provenance: a second D1 pass-2 synthesis, run concurrently with the seat that wrote `SPECS-v2.md` (a duplicate started by a driver message to the live seat). Independent measurements; where it differs from `SPECS-v2.md`, see its report's differences table (the driver's cursor records the X-10 ruling it prompted). Banked verbatim from scratch.

# D1 · pass 2 · SPECS-v2 (synthesis seat b): one spec per live route, built on the floor

| field | value |
|---|---|
| seat | D1 pass-2 SYNTHESIS. One spec each for the live routes B, D′ and G, each built on the floor and applying R-1..R-10 with R-2 in its amended form. No ranking and no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `20911dce` (R-2 amended by the driver in that commit). `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines, so every pass-2 seat measured the same code. The floor has been tracked since `ed188a86` (30 files) |
| where this file lives | a second synthesis seat, running the same task at the same time, wrote `pass-2/SPECS-v2.md` between this seat's appends. The checkout's file is that seat's complete document: this seat removed only the section it had appended there and left the rest byte-identical. This document is at `scratchpad/D1/p2/synth/SPECS-v2.synth-b.md`. §7 lists where the two syntheses differ |
| inputs, read in full | `REGISTRY.md`; `RULINGS.md`, with the amended R-2 row re-read after the driver's note; `CHARTER.md` (last four paragraphs); `pass-2/FLOOR-REPORT.md`, `B-research.md` (including Appendix A, `seal.mjs`), `Dp-research.md`, `G-research.md`; `floor/FLOOR.md`. The floor CLIs, `lib/placement.mjs` and `cascade.mjs` were read for exact interfaces |
| instruments | the floor itself, read-only, over the main checkout (no worktree, no build). Seven scratch scripts under `scratchpad/D1/p2/synth/` (§6) |
| fences | no source edit and no git write. In the checkout, the only write was to `pass-2/SPECS-v2.md`, since reverted as described above |

Short citations: `B §5.1` is `B-research.md` §5.1, `D′ §7` is `Dp-research.md` §7, `G §7` is `G-research.md` §7, `FR §4.2` is `FLOOR-REPORT.md` §4.2. A number cited to a report stays that report's measurement (P-3). This seat re-measures only what §6 lists.

---

## 0 · In brief

- **The amended R-2 is one F-7 parameter that all three routes call (§1.2).** At HEAD, F-7 has 53 move-or-global rows. Under the anchored form, 23 remain. 55 unit-root doors anchor 226 files, and 30 of those are files F-7 would otherwise move. NEEDS-NAME falls from 5 to 1: each of the four `types.ts` collisions is anchored by its own door, and `flow.glsl.ts` remains.
- **One reading of the amended text is open, and at HEAD it affects one file.** The question is whether a door inside a kind slot (`dock/composables/index.ts`) counts as "its own unit's door". B's api arm counted it and got 22 rows. This spec reads unit-root doors only and gets 23, because a kind slot is not a unit (R-2, R-4) and B's own clause B5 removes slot doors. The file is `dock/composables/useDockHold.ts`, whose only reader is `slider/Slider.vue:20`. The ruling's own word settles it: no entry publishes `useDockHold` (0 occurrences in `surface-pin.json`, absent from `dock/index.ts` and `src/index.ts`). Only the unexported slot barrel re-exports it. Under the unit-root reading, all 30 anchored files are published by some entry; B's arm adds the one file that nothing publishes. Flagged to the driver as X-10; the other synthesis seat reads it the other way (§7).
- **The amendment changes G.** The five compound families that G flattened into `src/` (CE2) are anchored by their record doors, 19 of 19 SFCs. G's R-2 hazard shrinks from 14 files to the 2 that G's own eponymy-pin prediction let go.
- **Eleven floor deltas are owed before any route prototype (§1.3).** This seat found four of them by running the floor:
  - the kind-slot anchor question (X-10);
  - `proposedPath` minting `composables/` slots inside `src/composables/`;
  - `dirUnits()` reading `src/styles` as a kind slot of `src`;
  - the cascade verifier not normalising scoped `@keyframes` suffixes.
- **D′'s two measured holes are reproduced by the floor's F-1, measured here.**
  - Hole 1: F-1 resolves `resolve(import.meta.dirname, "../..")` in `material-css-syntax.test.ts` as an anchored path-literal to the repo root.
  - Hole 2: F-1 expands `demo/demo.css`'s `@source` globs file by file (412 edges, 23 into `_shared/`), so a test that arrives there is a gained edge the image check refuses.
  
  D′ measured both on its own scratch engine. A plant for each on the floor engine confirms the behaviour (FD-4, FD-5).
- **D′'s carve placed 8 files with its own reader function, and F-7 disagrees on each (X-7).** One placement function binds all three routes (M-1), so D′'s placement block is re-derived on F-7.
- **By F-1 at HEAD, nothing reads `scripts/import-dag.mjs` or `scripts/lib/canon-doc.mjs`** except the floor ledger rows that describe them. No `package.json` script or CI workflow invokes them. R-8 as written deletes both, which closes floor gap 1 by deletion (FD-11).
- **Each route spec (§2 B, §3 D′, §4 G) states exactly where the route cannot satisfy a ruling.** Every open gap from the seat returns and G §14 is carried verbatim, with a status (§2.10, §3.10, §4.10, §5).

---

## 1 · The shared substrate (one source of record; the route specs cite it)

### 1.1 Floor tools every route calls

| need | floor tool | contract |
|---|---|---|
| graph | `floor/lib/graph.mjs` `buildGraph(root, {overlay})`; CLI `floor/graph.mjs` | F-1: every S-4 edge kind; the verdict is on the resolved file; exit 1 on any violation. At HEAD: 7,171 edges, 0 violations |
| moves | `floor/move.mjs <list.json> --root <wt>`, which calls `lib/move.mjs` `runMoves` | F-2 has three phases. **Preflight**, before any write: a clean graph, residue 0, every scan delta declared. **Image check**: the new graph must equal the old one under the move map, or the tree rolls back byte for byte. **Idempotent**, and it refuses the main checkout |
| entry record | `floor/records/entry-record.json`; `lib/entries.mjs` `validateRecord`, `emitExports`; CLI `floor/entries.mjs check\|write`; row `rows/f3-entry-record.mjs` | F-3: `exports` (68) and `typesVersions` (62) are emitted byte-equal. The build guard throws on an undeclared `index.ts` at any depth. The row deletes `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs` |
| cascade | `floor/cascade.mjs contract \| snapshot --dist D --out DIR --sha S \| verify --baseline DIR --dist D`; row `rows/f4-terminal-role.mjs` | F-4: a declared terminal role. A move-only leaf-rule verifier runs over the four CSS export entries against a baseline named by SHA, and classifies each divergence as `reorder` or `content` |
| placement | `floor/lib/placement.mjs` `placeAll(graph, units, {zones})`, `dirUnits()`, `proposedPath()`; CLI `floor/placement.mjs` | F-7: readers are counted by symbol through barrels (`lib/symbols.mjs` `makeOrigins`). Only loads count, and a door is never a reader. `NEEDS-NAME` rows are never emitted as moves. It gains `anchors` (FD-1) |
| surface | `floor/surface.mjs check\|pin`; `records/surface-pin.json` | 68 keys, 62 `typesVersions`, 603 runtime and 1,279 declaration names. Any difference is a reviewed row |
| bounds | `floor/bounds.mjs` | the R-5 measure; a measurement, not a gate |
| gates, wiring | `floor/gates.mjs` (F-1, F-3, F-4, surface pin); row `rows/f9-wire.mjs` installs `tests/gates/floor.test.ts` under `npm test` | each route's gate joins as a fifth check (FD-10) |
| the common cut | `floor/rows/apply.mjs --root <wt>` | rows F-3, F-4, M02, M03, F-9, applied in order and fail-fast; each row is all-or-nothing |

Every route runs the same way: `git worktree add <wt> HEAD` (the floor is tracked, so the worktree carries it), link `node_modules` (FLOOR.md), `rows/apply.mjs`, then its own steps. No route writes to the main checkout.

**The structure-wave manifest** is one JSON document per wave, the input F-2 and the route gates read:

```json
{ "base": "<sha the rows ran on>",
  "anchors": { "<file>": "<door>" },
  "passes": [ { "moves": [ {"from": "…", "to": "…"} ], "scanDeltas": [ … ] } ],
  "names":  [ { "dir": "…", "members": ["…"] } ],
  "hunks":  [ { "id": "…", "file": "…", "class": "code-cut|config|split|r6-row|ruling" } ] }
```

Every field is literal. No field is recomputed by the gate that judges the wave (F-9).

### 1.2 R-2 as amended, operationalised

The ruling text (RULINGS.md, amended 2026-09-23 on B §5.1): placement is by readers. A file that its own unit's door publishes is anchored in that unit; the door anchors, it does not read. A kernel door anchors nothing.

**Definitions.** These are stated once here; B, D′ and G call them.

| term | definition |
|---|---|
| `KERNEL(f)` | `f` is under `src/composables/`, `src/styles/`, `src/fonts/` or `src/components/_shared/`. `src/fonts/` is in F-7's `GLOBAL_ZONES`; B's `KERNEL` omits it, and B aligns |
| `UNIT(d)` | a dir under `src/components/` that is not `_shared/**`, is not a kind slot (`composables/`, `styles/`, `__tests__/`) and is not inside one. This is R-2's unit, recursively |
| `DOORS(U)` | two kinds of file. (1) `U/index.ts`, when it is a `record.js` entry source or a `record.doors` door. (2) Any `record.js` entry source whose dir is `U`. A kind slot's `index.ts` is not a unit door, and a kernel door is never one |
| `anchors` | for each unit `U`, each door `d` in `DOORS(U)`, each name `d` exports (`makeOrigins(g).exportsOf(d)`), and each origin file `o` of that name with `o` under `U` and `o ≠ d`: `anchors.set(o, d)`. When doors nest, the deepest door wins |
| F-7 change (FD-1) | `placeAll(graph, units, { zones, anchors })`. A file in `anchors` gets class `anchored`, with home `U`; it is never `move` or `global`. Nothing else in F-7 changes |

**Measured at HEAD** (this seat, §6):

| reading | unit doors | files anchored | F-7 move/global rows | anchored among them | remaining | NEEDS-NAME |
|---|---:|---:|---:|---:|---:|---:|
| literal (before the amendment) | — | — | 53 (39 move, 14 global) | — | 53 | 5 |
| B's api arm (any non-kernel `index.ts`, slot doors included) | — | — | 53 | 31 | 22 | — |
| **this spec: unit-root doors** | **55** | **226** | 53 | **30** (19 move, 11 global) | **23** (20 move, 3 global) | **1** |

By F-7 class, the 226 anchored files are 119 `published`, 76 `ok`, 19 `move`, 11 `global`, and 1 that is not a placement row. The non-index unit entries (`blob/config.ts`, `fourier-field/math.ts`) anchor none of the 53. In the B's-api-arm row, "—" means not recomputed here: B §5.1 measured that arm, and this seat reproduced only its 31/22 split.

**The 30 anchored rows.** These files stay in their unit (paths under `src/components/`):
- `deck/`: `composables/useDeck.ts`, `composables/useDeckSnap.ts`, `slideContext.ts`, `types.ts`, `window.ts`
- `dialog/`: `Dialog.vue`, `DialogContent.vue`
- `dock/composables/dockContext.ts` (anchored by `dock/index.ts`)
- `expandable-container/ExpandableContainer.vue`, `fading-scroll/FadingScroll.vue`
- `fourier-field/renderer/mint.ts`
- `input/`: `Input.vue`, `types.ts`
- `menu/DropdownMenuTrigger.vue`
- `sheet/motion.ts`
- `skeleton/Skeleton.vue` (R-9)
- `slider/types.ts`, `surface/Surface.vue`, `switch/Switch.vue`
- `table/`: `Table.vue`, `TableBody.vue`, `TableCell.vue`, `TableEmpty.vue`, `TableHead.vue`, `TableHeader.vue`, `TableRow.vue`
- `tabs/`: `SegmentedTabs.vue`, `types.ts`
- `typewriter/utils/`: `keyboard.ts`, `timing.ts`

All six published roots in FR §4.2 are among them.

**The 23 remaining rows** are the F-7 input every route starts from. Paths are relative to `src/`; "proposed" is `proposedPath`'s output.

| file | proposed | class | reader units |
|---|---|---|---|
| `components/_shared/overlay/isTeleportedTarget.ts` | `components/dock/` | move | dock |
| `components/aurora/constants/budget.ts` | `composables/` | global | aurora, blob |
| `components/dialog/ModalOverlay.vue` | `components/_shared/` | global | dialog, sheet |
| `components/fourier-field/shaders/compute.wgsl.ts`, `render.wgsl.ts` | `components/fourier-field/renderer/` | move | fourier-field/renderer |
| `components/tabs/composables/useTabRovingFocus.ts` | `composables/`; row M03 sends it to `composables/motion/morph/` | global | tabs, composables/motion/morph |
| `components/dock/composables/useDockHold.ts` | `components/slider/` | move | slider |
| `composables/dom/useClipboard.ts` | `components/easing/` | move | easing |
| `composables/dom/useDocumentVisibility.ts` | `composables/motion/core/` | move | motion/core |
| `composables/dom/useDragVelocity.ts` | `components/slider/` | move | slider |
| `composables/glass/canvas2d/useCanvas2D.ts` | `components/constellation/composables/` | move | constellation |
| `composables/glass/useGlassBackdropLuminance.ts` | `components/dock/composables/` | move | dock |
| `composables/glass/webgl/createCanvasLifecycle.ts` | `composables/glass/composables/` (FD-3b) | move | glass/canvas2d, glass/webgl, glass/webgpu |
| `composables/glass/webgl/shaders/flow.glsl.ts` | **NEEDS-NAME**: the target exists in aurora | move | aurora/constants/shaders |
| `composables/glass/webgl/shaders/flow.wgsl.ts` | `components/aurora/constants/shaders/` | move | aurora/constants/shaders |
| `composables/motion/core/useRAFLoop.ts` | `composables/glass/` | move | composables/glass |
| `composables/motion/core/useViewTransition.ts` | `composables/motion/route/` | move | motion/route |
| `composables/motion/morph/useElementMorph.ts` | `composables/motion/composables/` (FD-3b) | move | motion/morph, motion/reveal |
| `composables/motion/pointer/useRoutePointer.ts` | `components/constellation/composables/` | move | constellation |
| `composables/motion/scroll/useScrollChrome.ts` | `components/dock/composables/` | move | dock |
| `composables/motion/scroll/useScrollProgress.ts` | `components/aurora/composables/` | move | aurora |
| `composables/reactive/useTimer.ts` | `composables/dom/` | move | composables/dom |
| `composables/search/useFuzzySearch.ts` | `components/dock/composables/` | move | dock |

This is one pass. The fixpoint (FD-2) adds the files that follow their readers: B found 26 over 3 passes (B §5.2), and D′ found `search/` ×4 and the backdrop-luminance trio.

**Anti-construction clause (F-9).** A door that a migration grows publishes more files, and so anchors them. Placement could then converge by door growth, which is what B-crit G8 found. The clause has three parts:
- In a structure wave, the anchor set is computed once, on the base tree after `rows/apply.mjs`, and frozen in the manifest's `anchors` field.
- The route gate recomputes the set on the result. It fails any file anchored only through a name the wave added to a door (`anchor-by-growth`), unless that name is a reviewed row of the surface-pin diff or the door-name-pin diff.
- At steady state, the pins already make any door growth a reviewed diff.

### 1.3 Floor deltas owed before any route prototype

Every delta applies to all three routes (B, D′ and G).

| id | delta | source and measurement |
|---|---|---|
| FD-1 | `anchors` in `placeAll`, per §1.2 | the amended R-2; this seat |
| FD-2 | **A fixpoint driver**, `placement.mjs --fixpoint --root <wt>`, looping until a pass proposes 0 moves. Each pass: (1) propose moves under FD-1; (2) stop at any `NEEDS-NAME` row that has no authored `names` row; (3) apply through `move.mjs`; (4) rebuild the graph. Each pass is written to the manifest as a literal pass | B ran 3 passes over 26 files (B §5.2). D′'s carve placed files by calling its gate's own `runGate` and `testHomes` (D′ gap 8). The gate judges the result; it never re-derives the moves |
| FD-3 | **F-7 inside the kernel and inside modules.** (a) **Within a module**, run the same least-common-ancestor (LCA) law: `createCanvasLifecycle` moved up while it still read `webgl/backingSize` and `webgl/visibility`, which made a cycle that B4 caught and B10 did not. (b) **Kernel homes.** `proposedPath` emits `src/composables/glass/composables/createCanvasLifecycle.ts` and `src/composables/motion/composables/useElementMorph.ts`, a `composables/` slot inside the global `composables/`. B placed both at the LCA dir itself. Default: a kernel home is its LCA dir (X-9). (c) **The `styles` strip.** `dirUnits()` strips a trailing `styles` segment at any depth, so `src/styles/*` reads as unit `src`, and a file whose only reader is a `./styles` aggregator sheet classifies `ok` wherever it lives. At HEAD these are `chip/accent-tone.css` and 5 `src/styles/glass/*.css`. The cure: strip kind slots only inside a module (depth > 2, as B's `isSlot` does). Kernel-to-unit direction is then judged by B8a or D′'s `upward`, never by F-7 | (a) B §5.2. (b) and (c) this seat, §6 |
| FD-4 | **Root-anchored paths under relocation.** F-1 sees the form. In `tests/styles/material-css-syntax.test.ts` it records `resolve(import.meta.dirname, "../..")` as an anchored path-literal to `.` and `resolve(ROOT, "src/styles/glass/material.css")` as one to that file (§6). A relocation therefore changes an edge, and the image check sees the change. The plant: move that test into `src/styles/glass/__tests__/` on the floor engine. Pass: a rewrite of `"../.."` or a refusal. Fail: a silent move. At HEAD, 10 files outside `src/` reference `__dirname` or `import.meta.dirname` (by grep: 3 `tests/` suites, 5 `tests-visual` specs, `demo/vite.demo-dist.config.ts`, `scripts/import-dag.mjs`). So does `tests/gates/floor.test.ts`, which row f9-wire installs (`resolve(__dirname, "../..")`) | D′ hole 1 (2 vitest failures while the arm passed) was D′'s scratch graph. F-1 reproduces the edge (this seat) |
| FD-5 | **Glob arrivals.** F-1 expands `@source` globs file by file: `demo/demo.css` has 412 `css-source` edges, 23 of them into `src/components/_shared/` (§6). A test that arrives under `_shared/**/*.ts` is a gained edge, and the image check refuses a gained glob member (FR §2.2: `Code.vue` into `demo/stories/zzplant/` was rolled back). The plant: move the `cn` test into `src/components/_shared/__tests__/` and expect a refusal. A refusal hands the question to X-3 | D′ hole 2 (+4.60 kB demo CSS) was D′'s scratch engine. F-1 expands the glob (this seat) |
| FD-6 | **Scoped keyframes in the cascade verifier.** `cascade.mjs` numbers `data-v-*` ids and `--<hash>-` vars (`cascade.mjs:64-65`), but not scoped `@keyframes` suffixes (`skeleton-breathe-<hash>`; B found 12 on flatQ). Port D′'s renaming into `leafSequence`. R-7's byte diff needs it on any wave that edits an SFC | B §10.3; D′ §7 |
| FD-7 | **F-6's harness reader.** `tests/harness/` exports the F-1 graph and a `sourceOf(unit \| file)` read, and every scanning suite reads through it (R-3) | B: B0 505 (168 walks, 334 computed reads). D′: 38 directory-walking unit tests (8 suites red, `easing.contract` uncollected). G: 17 single-subject tests read `src` by path literal |
| FD-8 | **F-5, entry-rooted declarations**, so that `src/**/__tests__/` leaves dist with no exclusion list (R-3, S-13). The 3 `tsconfig.build.json` excludes wait on it | FR §5.5, §5.9 |
| FD-9 | **Cross-zone placement for tooling.** Across `scripts`, `tests` and `tests-visual`, a file whose readers all sit in one other tooling zone belongs to that zone. F-7 counts only readers in the file's own zone | `scripts/lib/paint-arm.mjs` has 8 readers, all in `tests-visual` (§6); `reflect-capture-verify.mjs` is read by `paint-arm` (B §9.3); S-15, 5 of 6 families |
| FD-10 | **Landing.** The floor (tracked since `ed188a86`) moves to a `scripts/structure/` module: its CLIs, `lib/`, `records/`, `rows/` and `plants/`. F-1 does not parse `docs/`, so the floor's own path constants are declared hunks: `RECORD_PATH`, `LEDGER_PATH`, `PIN_PATH`, `FLOOR_RECORDS` and the depth of `DEFAULT_ROOT`. The readers the rows installed (the vite config and the gate suites) move by F-2. Each route's gate lands beside the floor, is born RED at HEAD, and joins `gates.mjs` in the commit that turns it GREEN | FR §5.6; REGISTRY §3.2 F-9 |
| FD-11 | **R-8 over `scripts/`.** By F-1 at HEAD, nothing reads `scripts/import-dag.mjs` (628 lines) or `scripts/lib/canon-doc.mjs` except `floor/records/opaque-ledger.json:6,13,20`, the rows that describe them. There are 0 `json-command` edges into either, and 0 mentions in `.github/workflows/` or `package.json` (grep; F-1 parses no `.yml`). `safari-probe.mjs` and `regen-exports.mjs` have 0 readers, and row F-3 deletes `regen-exports.mjs`. R-8 as written deletes all four. `lib/graph.mjs` `valueSccs`/`moduleSccs` replaces import-dag's SCC report, which closes floor gap 1 by deletion. One loss: the floor seat used import-dag as its independent SCC witness (FR §2.1) | this seat, §6 |

### 1.4 The rulings as every route applies them

| ruling | common application | where the routes differ |
|---|---|---|
| R-1 | W-REGISTER-COLLAPSE lands before any structure wave. No route edits a closed BK or BJ record. D′'s 4 `gate-register` failures and the 740-line `scripts/gate-register.mjs` leave with it | none |
| R-2 | §1.2 | B10; D′'s `placement` rule; G's anchored edges |
| R-3 | One slot, `<unit>/__tests__/`, with visual specs as `*.visual.ts` in the same slot. Suites with no single subject stay in a top-level harness. Scanners read the graph (FD-7). Dist excludes the slots by reachability (FD-8) | the subject function (§2.7, §3.7, §4.7); X-1, X-3, X-4 |
| R-4 | `composables/` is kept, at two grains | FD-3b for the kernel |
| R-5 | 12 direct files and 500 lines, in all five zones; a generated file is exempt only when a checked generator produces it; SFCs split by extraction. Run strict (X-1) | each route's counterexamples (§2.9, §3.9, §4.9) |
| R-6 | One symbol, one door. The second door drops the symbol, with a MIGRATION row | the counts differ (X-6) |
| R-7 | `./styles.css` keeps its HEAD rule set, verified by a normalised byte diff (FD-6) | B needs the channel collapse (B3) and G needs it for CE6; D′ does not |
| R-8 | F-7 places a file that has readers; a file with none is deleted (E-7) unless it is exported | FD-9, FD-11, X-8 |
| R-9 | The generic Skeleton is its own unit, anchored by `skeleton/index.ts` (§1.2). HEAD has no component-specific skeleton (`find src demo -iname '*skeleton*'` finds the primitive, its dir and one story) | none |
| R-10 | The demo imports doors only. The async boundary imports `@mkbabb/glass-ui/aurora` dynamically | X-2, X-5 |

### 1.5 Open items shared by the three routes

| id | item | evidence |
|---|---|---|
| X-1 | **R-5's slot arm.** Either a kind slot is itself bounded at 12 (strict), or it is exempt. The gates run strict, because it cannot mask a long dir; exempt is kept as a measuring arm. Ruling owed | B gap 10: `dock/__tests__` 17. D′ gap 2: exempt hides `dock/composables` at 19 and `aurora/composables` at 17; `dock/__tests__` 21 and `aurora/__tests__` 19 (D′ §8) |
| X-2 | **`./aurora-config`.** R-10 doors-only puts the demo's eager boot graph at 685,510 B, over the 503,808 B ceiling. The leaf entry brings it to 477,899 B. It adds 1 export key (68 → 69) and 3 R-6 removal rows from `./aurora`. Every route that applies R-10 meets this; only B measured it | B §8 |
| X-3 | **`__tests__/` under Tailwind `@source`.** Test slots enter the demo scan. FD-5 predicts a refusal on the floor engine; the answer is either a narrowed glob or a ruling | D′ §7 hole 2 |
| X-4 | **Typecheck program boundaries against R-3's "no exclusion list".** D′'s T4 (`tsconfig.json` excludes `src/**/__tests__/**`, otherwise 39 errors) and T5 (`tsconfig.test.json` excludes `*.visual.ts`, otherwise 23 errors) | D′ §8 |
| X-5 | **The R-10 count.** The ruling says 7 edges. B counts 71 reroutes, 18 private reads and 1 dynamic, by resolved file. D′ counts 90: 79 deep paths to published symbols and 11 to unpublished files. Private demo symbols: B 16, D′ 11 files | B §9.2; D′ §11 |
| X-6 | **The R-6 counts.** The ruling says 29. B counts 40 multi-entry keys at HEAD and 46 on flatQ. D′ drops 59 names, all second doors. value.js imports `BLOB_CONFIG_KEY` from both `./blob` and `./blob-config` | B §10.4; D′ §4 |
| X-7 | **How CSS and shared files are placed.** F-7 counts loads by symbol. D′'s `placement: owned` counts CSS class users. At HEAD the two disagree on 8 files that D′ moved: `useAccentTone.ts` (F-7: read by chip and `composables/color`, so `ok` in the kernel); `accent-tone-solve.ts` (`ok`); the 5 `src/styles/glass/{dissolve,glass-atom,glass-chip,squircle,surface-axis}.css` (`ok`, their only loader being the styles aggregator); and `tabs/styles/drag.css` (`published`, with no load reader). The spec binds every route to F-7. Placing CSS by emission is not F-7; G's CE6 raises the same question | this seat, §6 |
| X-8 | **`springProjection.ts` (R-8).** Its readers are `demo/stories/motion/springs.vue:14`, `scripts/regen-spring-tokens.mjs:27` and 2 tests. None is in `src`, and it is not published. D′ put it in `scripts/`, which then holds 13 files; B lists it as a deletion candidate. It needs FD-9's cross-zone reading plus R-10 (the demo read is past a door), or a ruling | FR §4.3; §6 |
| X-9 | **Kernel homes (FD-3b).** Either the LCA dir itself, or R-4's `<module>/composables/` slot inside `src/composables/`. The spec defaults to the LCA dir. Flagged | §6 |
| X-10 | **The anchor door (§1.2).** Unit-root doors only, or any non-kernel `index.ts`. At HEAD this decides 1 file (`useDockHold.ts`). Under the unit-root reading, every anchored file among the 53 is published by an entry (30 of 30). The other reading adds `useDockHold.ts`, which no entry publishes (0 occurrences in `surface-pin.json`); only the slot barrel `dock/composables/index.ts:12` re-exports it. Flagged; the two syntheses read it differently (§7) | §6 |
| X-11 | **π and Playwright.** No pass-2 seat had a browser seat, and F-10 is not built | FR §5.5; B G19; D′ gap 16 |
| X-12 | **Independent batteries (F-9).** Each route's critic writes an intent battery before reading the route's gate. None exists | REGISTRY §3.2 F-9 |

### 1.6 Acceptance bar

The bar is REGISTRY §6.4, unchanged. The specs below cite it and do not restate it.

---

## 2 · Spec B: sealed modules, B-flat

Sources of record: B §0-§12 and Appendix A (`seal.mjs`, 267 lines). B's own convergence estimate is about 60% (B §11), cited and not re-scored here.

### 2.1 The unit set, declared once

The declarations sit in one block at the head of `seal.mjs`:

| declaration | value |
|---|---|
| sealed zones | `src`, `scripts` |
| containers | `src`, `src/components`, `src/composables`, `scripts` |
| kind slots | `composables/`, `styles/`, `__tests__/` (R-3, R-4, R-5). A slot sits inside a module: never directly under a container, and at depth > 2 |
| door basenames | `index.ts` (the JS door in `src`), `index.mjs` (the JS door in `scripts`), `index.css` (the CSS door) |
| module | every code dir in a sealed zone that is neither a container nor a slot. Modules are derived from the tree, not declared, and every one of them must have a door (B7, G4) |
| kernel | `KERNEL` from §1.2. B aligns its own `KERNEL` by adding `src/fonts/` |
| unit | `UNIT` from §1.2 |
| aggregates | `src/index.ts` and `src/styles/index.css`: doors, not readers (R-7) |
| harness | `tests/harness/`, the one module that walks the tree or reads it by path (R-3, FD-7) |
| families | none. B-flat: families add 9 doors (5 of them empty), 33 dir moves over 339 edited files and 19 more F-7 moves, and change nothing in bytes, surface or boot (B §6) |

### 2.2 Placement law

- **P-B1.** Placement runs first, before any door is written: F-7 with FD-1 anchors over `dirUnits()`, per zone, iterated by FD-2 until a pass proposes 0 moves. Sealing first costs +36,280 B summed across the subpaths, +34,745 B of it on `./blob` through the aurora door for `budget.ts` (B §10.5).
- **P-B2.** The same law runs inside the kernel and inside modules (FD-3a). Both webgl helpers follow `createCanvasLifecycle` up to `composables/glass/`.
- **P-B3.** A kernel file whose one reader unit is a component moves into that unit, because kernel doors anchor nothing. At HEAD these are the kernel rows among the 23 in §1.2. `flow.glsl.ts` and `flow.wgsl.ts` land in aurora under B's authored names `curlNoise.glsl.ts` and `curlNoise.wgsl.ts` (the one NEEDS-NAME row).
- **P-B4.** B's measured fixpoint, in B's arm, is 28 rows over 3 passes, covering 26 distinct files plus M03 (B §5.2). Under §1.2's unit-root reading, `useDockHold.ts` also moves, to `slider/`. Re-measure. On flatQ, B5 is 0, so the slot door that anchored it no longer exists. `useDockHold.ts` is still in `dock/composables/` there with B10 at 0, so either `dock/index.ts` grew to publish it, which is `anchor-by-growth` and fails under §1.2, or it has another reader. This seat did not measure which.
- **P-B5.** CSS is placed by F-7 loads. A CSS crossing must target `M/index.css` or a published CSS entry (B3), so the R-7 channel collapse is part of B's migration (M-B12).

### 2.3 Module naming law

- **N-B1.** Every module name is authored and names what the dir holds: the door's role, or a concept its members share. The reference set is B §7.1's 27 built dirs:
  - aurora: `atoms/`, `webgl/`, `webgl/palette/`, `webgpu/`
  - dock: `search/`, `legibility/`, `morph/`, `layers/`, `controls/`
  - menu: `sub/`, `items/`
  - sortable-list: `drag/`
  - `styles/glass/`: `material/`, `engage/`, `surfaces/`, `shapes/`, `plates/`, `transitions/`, `decoration/`
  - `styles/tokens/`: `motion/`, `surface/`, `sizing/`, `scheme/`, `properties/`
  - `styles/`: `surface/`, `motion/`, `scroll/`
- **N-B2.** Every dir a wave creates has a row in the manifest's `names` block. The gate fails a created dir that has no row.
- **N-B3.** A syntactic floor fails a name that matches `^part-?\d+$`, `-\d+$` or `^w\d+`, or that repeats a pass-1 placeholder (`group`, `deep`, `part-1`). This is a floor, not the law: syntax does not stand in for judgement (S-15), and a reviewer judges N-B1.
- **N-B4.** Placement collisions are authored. Under §1.2, one is left at HEAD: `flow.glsl.ts`, which B named `curlNoise.glsl.ts`.

### 2.4 Bounds (R-5)

- **B6** covers all five zones, with tests counted. It runs the strict slot arm by default (X-1), and `--slot-arm literal` is kept as a measuring arm.
- **Line counting uses one regex.** `seal.mjs`'s `CODE` counts shader sources (glsl, wgsl) and `sh`/`py`; `bounds.mjs`'s `SOURCE` does not. The gate uses `CODE`, because shader sources are hand-written, and `bounds.mjs` aligns to it.
- **Generated files** are exempt only through `records/generated.json`, with a checked generator (G6). The candidate is `src/index.ts`, generated from F-3 as a checked file.
- **SFCs over 500 lines** split by extracting sub-components and composables into their unit (R-5); B §7.3 is the 16-file plan.
- **Measured** (B §2 G5): HEAD 75 (18 dirs, 57 files) → flatQ 65 (9 dirs, 56 files). `src` dirs over the bound go 9 → 0.

### 2.5 Gate contract

**Program and inputs.** `seal.mjs` (B Appendix A) lands at `scripts/structure/seal.mjs` (FD-10). It reads the floor's `lib/graph.mjs` (`buildGraph`, `VALUE_KINDS`), `lib/symbols.mjs` (`makeOrigins`) and `lib/placement.mjs` (`placeAll`, `dirUnits`, plus FD-1's `anchors`).

**Fail-closed edges.** Every F-1 violation is a B0 line. Every clause judges `e.to`, the resolved file, never the specifier. Clauses read these edge kinds:
- module kinds: `import`, `import-type`, `import-type-node`, `import-side-effect`, `reexport`, `reexport-star`, `reexport-ns`, `dynamic`, `dynamic-template`, `require`, `vi-mock`, `sfc-style-src`, `sfc-template-src`, `sfc-script-src`, `css-import`, `sfc-inline-css-import`, `css-url`, `css-reference`, `template-asset`, `glob`
- read kinds: `path-literal`, `path-helper`, `new-url`, `ts-reference`
- walk kinds: `scan`, `glob-literal`

There is no comment opt-out.

**Clauses.** The HEAD and flatQ counts are B §1's.

| clause | rule |
|---|---|
| B0 | F-1 violations. Walks into a sealed zone from outside the harness. Computed-path reads in `tests`, `tests-visual` and `scripts` outside the harness |
| B1 | the recursive door (V2): from outside a module M, only M's door or a published entry. A member never imports its own door |
| B2 | the consumer zones reach `src` through published entries only (R-10, R-3) |
| B3 | a CSS crossing targets `M/index.css` or a published CSS entry |
| B4 | no value or type cycle among sibling nodes, at any depth |
| B5 | no door in a kind slot, and no dir inside a kind slot |
| B6 | R-5 over five zones (§2.4) |
| B7 | every code dir in a sealed zone is a module, a slot or a container. A dir with script code needs its JS door, not only a CSS door |
| B8 | the kernel reads no unit, type-only and re-exports included, aggregates excepted (B8a). `src` reads no consumer zone (B8b) |
| B9 | a door re-exports only its own subtree (B9a). A symbol sits on one non-root entry (R-6) |
| B10 | F-7 over R-2 units with FD-1 anchors, plus `anchor-by-growth` (§1.2) |
| B11 | door names match the pin. An internal door exports no name that nothing outside its module reads. A door that exports nothing fails |
| B12 | only a door re-exports: no relays, no declaration mirror |

**Changes this spec makes to `seal.mjs`:**
1. B10 reads FD-1 `anchors`, replacing the `--anchor none|vue|api` arms. Of those, the `api` arm is the one that matches the amendment, but it counted slot doors. Its door set narrows to unit-root doors. At HEAD, B10 reads 23 under §1.2 against 22 in B's arm (§6).
2. B10 gains `anchor-by-growth`.
3. `KERNEL` adds `src/fonts/`.
4. B6 runs strict by default.
5. The B0 false positive (the `"src"` literal in `auroraImageSource.ts`) is cured in F-1 with a plant, not by an exception in B0.

**Must catch.** All of these run in one invocation, each plant an in-memory overlay (`--overlay`):
- **B's regression battery.** 37 plants: P1-P13, C-1..C-16 plus C-1b, and N-1..N-7. 37 of 37 are caught, and 35 of them in the expected clause (B §3).
- **The REGISTRY §6.4 B rows.** C-6 fails B7. C-1b, C-2 and C-14 fail B8.
- **The floor's 59 F-1 plants** (`plants/graph-plants.mjs`) stay caught.
- **New with this spec:**
  - add `useDockHold` to `dock/index.ts` on a tree where only `slider/` reads it: B10 `anchor-by-growth`;
  - a created dir with no `names` row: N-B2;
  - FD-4's and FD-5's plants, on the floor engine.
- **The critic's intent battery (F-9, X-12)**, written before the critic reads `seal.mjs`.

**Does not judge:**
- computed reads in `src` and `demo`, which stay census (FLOOR.md, declared limits);
- CSS order, which F-4's verifier judges;
- paint.

**Born RED.** The gate is RED at HEAD in every clause (B §1). It joins `gates.mjs` in the commit that turns it GREEN (FD-10).

### 2.6 Migration steps, in order

After every step, `graph.mjs` exits 0, the seal counts and the tree digest are recorded, and every move goes through F-2.

| step | action | source |
|---|---|---|
| M-B0 | Preconditions: R-1 collapse landed; FD-1..FD-11 built; a worktree from HEAD; `rows/apply.mjs` | §1 |
| M-B1 | Baselines: `cascade.mjs snapshot --sha <base>`; `surface.mjs check`; `seal.mjs --write-pin` (door names); `anchors` frozen in the manifest | §1.2 |
| M-B2 | The F-7 fixpoint (FD-2). Expected: B's `flat-place-{1,1b,2,3}` rows plus `useDockHold → slider` | B §4.2, §5.2 |
| M-B3 | The module carve, from `flat-carve.json`: 62 moves (88 files, 209 rewrites; 0 residue, 0 lost, 0 violations) | B §4.3 |
| M-B4 | Code cuts, as declared hunks. The aurora uniform table (71 lines) moves `webgl/glSetup.ts` → `composables/uniformBridge.ts`, curing a type cycle. The overlay door's unread `isTeleportedTarget` line goes | B §4.4 |
| M-B5 | The dock CSS carve (`flat-css.json`: 15 moves, 44 rewrites), then the module CSS doors (`css-dock.mjs`) | B §4.5, §7.1 |
| M-B6 | The style-kernel carve and the style doors. B's `style-carve2.mjs` ran with 3 residues and `flat-style-doors.json` with 2. F-2 refuses any residue, so this step is re-expressed as F-2 move lists that reach 0 | B §4.6 |
| M-B7 | The G14 splits: 16 files, B §7.3's plan, as authored hunks plus F-2 moves. Then FD-2 runs again and must propose 0 | B §7.3 |
| M-B8 | Doorify: kernel doors split or stripped; empty kernel doors removed; 32 mandatory doors; slot doors removed (B5); importers rerouted through doors; doors grown. Every grown name is a pin-diff row, and `anchor-by-growth` must stay 0 | B §4.7 |
| M-B9 | R-6: B9 → 0 through MIGRATION removal rows. The 46 multi-entry keys on flatQ are reconciled against the ruling's 29 (X-6). B9a's 18 door re-exports outside their subtree are cut | B §2 G1, §10.4 |
| M-B10 | B12: importers rewired to the origin and the 11 relay lines deleted. The `minify-css.d.mts` mirror is placed or deleted under R-8 | B §2 G10 |
| M-B11 | B4: `SelectionValue` moves to `motion/morph` and its 17 readers are rerouted. The motion kernel's internal cycle (present at HEAD) is cured | B §11.7 |
| M-B12 | The R-7 channel collapse for B3: each unit's `index.css` door enters the aggregator, and `gen-component-styles.mjs` derives `./styles.css`. Then `cascade.mjs verify` must read GREEN (FD-6) | B §11.5 |
| M-B13 | R-10: the demo reroute (135 files, 348 specifiers). `./aurora-config` in its seal-clean form, an `aurora/config/` module split from `presets.ts` (X-2). `AppShell` imports `./aurora` dynamically. The 16 private demo symbols get a disposition (X-5) | B §8, §9.2 |
| M-B14 | R-3: FD-7's harness first, then the tests move (160 colocate). The config hunks follow D′'s T1-T3 form: the vitest `include`, the Playwright `testDir`/`testMatch`, the webkit list. X-3 and X-4 must be answered | B §9.1 |
| M-B15 | The other zones: `demo` (`containers/disclosure/`, `foundations/surfaces/`, the manifest split); `scripts` (§2.8); the `tests-visual` carve (§2.7) | B §7.2, §9.3 |
| M-B16 | Verify against REGISTRY §6.4. Plus: `cascade.mjs verify` GREEN on the 4 entries; the surface-pin diff equals the ruled R-6 and X-2 rows; `seal.mjs` GREEN and wired; a replay from a fresh worktree is byte-identical; a rerun proposes 0 moves; π on the dock band (its CSS file boundaries changed); Playwright on the specs whose routes moved | §1.6 |

### 2.7 Tests and stories under R-3

- **Subject.** A test's subject is found by F-7 over the test zone (B §9.1). At HEAD: 160 colocate (143 into `src` units, 9 into `scripts`, 8 into `demo`), 94 stay in the harness, and 162 have no derivable subject.
- **Slot.** `<module>/__tests__/`, at the deepest module that holds the subject; visual specs go there as `*.visual.ts`. On flatQ, dock's 17 tests spread across `dock/{search,legibility,morph,layers,controls}/__tests__/` by subject. This is unmeasured; B measured 17 in `dock/__tests__/` against HEAD's undivided dock.
- **Crossings.** Colocated tests add 26 B1 crossings, where a test reads a sibling module's internals. A test reads its subject's own module privately and any other module through its door. The 26 are rerouted, or their subject assignment is wrong.
- **The harness** is `tests/harness/`. It is the only place allowed B0 walks and B2 reads.
- **`tests-visual`** has 177 direct files: 62 specs name one story literal, 71 name one category, 54 name none, and 14 are `_*capture` scratch specs. B's plan groups the harness specs by the demo category they drive. The names come from `demo/stories/<category>/`. This is authored and not built.
- **Stories** stay declared by the manifest (R-10). The manifest (`manifest.ts`, 1,099 lines) splits into one file per category. The category dirs over 12 files split as B §7.2 authored.

### 2.8 `scripts/`, the backend analogue

- **Seal.** `scripts` is a sealed zone: modules have `index.mjs` doors, `scripts/` is the container, and B7's last line is `scripts/lib/`.
- **Direct files (12, at the bound).** After FD-11's deletions (`import-dag`, `safari-probe`; `regen-exports` goes with row F-3), R-1 (`gate-register`) and FD-9 (`reflect-capture-verify.mjs` moves to `tests-visual`), 7 direct files remain.
- **FD-9.** `paint-arm.mjs` leaves `scripts/lib/` for `tests-visual`, beside `reflect-capture-verify.mjs`. That leaves `scripts/lib/` with `minify-css.mjs` and its mirror (B12), plus `canon-doc.mjs` (FD-11) and `subpath-policy.mjs` (row F-3), both of which go.
- **The floor** lands in `scripts/structure/` with `seal.mjs` (FD-10).
- **Scripts over 500 lines:** `verify-export-types` 1,080, `profile-bundle` 939, `comment-census` 726, `paint-arm` 587, `reflect-capture-verify` 584 (B §7.3). No split plan is authored for them.
- **Sibling backends (G18):** the same seal with `SEALED` set per repo. The floor's `ZONES` constant (`lib/tree.mjs:9`) is specific to glass-ui, so an F-1 run over value.js needs `openTree(root, {zones})`. value.js is born RED with 127 edges by regex census, not by F-1.

### 2.9 Where B does not satisfy a ruling

| ruling | exactly where |
|---|---|
| R-2 (amended) | **Placement: satisfied**; B10 is 0 on flatQ (B §5.1). Open: the X-10 reading and `useDockHold.ts` (P-B4). **Decoupling from the surface: not satisfied for kernel entries.** R-2 says placement is decoupled from the JS surface and the entry record points at wherever a file lives. But when placement moves a file that a kernel entry publishes into a unit, the seal leaves no way to keep publishing it from that entry: the kernel door reaching past the unit's door fails B1; a kernel door re-exporting a unit file fails B8a and B9a; publishing it on both entries is a dual door (R-6). So the names change entry: +36/−25 across entries, including `./motion-core` −15 and `./dom` −10 (B §5.2, §10.4). No ruling makes those MIGRATION rows. D′ keeps the same names on their kernel entries by treating those entries as aggregates (0 names left the package, D′ §4). That mechanism is not earned for B (REGISTRY §6.5) |
| R-3 | X-4 was not measured by B. The 26 test B1 crossings (§2.7). The strict slot arm, if dock's tests do not spread by subject |
| R-5 | the demo, `scripts` and `tests-visual` carves are authored, not built. The 5 long scripts have no split plan. X-1 |
| R-6 | 46 multi-entry keys against 29 (X-6); 25 kernel name-slots leave `./motion-core` (−15) and `./dom` (−10) |
| R-7 | B3 is 24 until the channel collapse (M-B12) is built. The byte diff needs FD-6 |
| R-8 | `useScrollScene.ts`, `springProjection.ts` (X-8) |
| R-10 | doors-only is 685,510 B, over the 503,808 B boot ceiling. R-10 holds only with the X-2 leaf, which is a new export key and needs a ruling |

### 2.10 B's open gaps, carried verbatim

Each gap is quoted from the B-research seat return. The source of record is B §11.

| # | gap (verbatim) | status |
|---|---|---|
| 1 | R-2 needs an amendment: literal placement moves 17 component SFCs, including Skeleton against R-9; the api-anchor rule reaches 0 | closed by the amendment (`20911dce`); X-10 remains, worth 1 file |
| 2 | ./aurora-config adds 1 export key and 3 R-6 removal rows from ./aurora and needs a ruling; the seal-clean config/ module (the presets.ts split) is not built and its bytes are not measured | open (X-2) |
| 3 | Harness: B0 505 and B2 733 (402 edges stay in the harness after R-3), plus 19 tests and 2 uncollected suites that read source by computed path; all wait on F-6's harness reader | open (FD-7) |
| 4 | R-6: B9 has 46 multi-entry keys against the ruling's 29, 18 door re-exports outside their subtree, and 25 kernel name-slots leaving ./motion-core and ./dom | open (X-6). The 25 name-slots are also a conflict with R-2's decoupling of placement from the surface (§2.9) |
| 5 | B3 24: component CSS enters ./styles at two rungs (card, tabs, _shared), 5 SFCs import _shared partials directly, accessibility.css imports 2 utilities members; needs the R-7 channel collapse with π | open (M-B12, X-11) |
| 6 | B12 12: 11 relays and 1 .d.mts mirror are not cut; the 5 composables/glass relays become B9a lines unless R-6 names the owner | open (M-B10) |
| 7 | B4 2: the motion/_shared cycle through SelectionValue (authored cure: move the type, reroute 17 readers; not built) and the motion kernel's internal cycle from HEAD | open (M-B11) |
| 8 | G14: 16 src files over 500 lines have a split plan that is not built | open (M-B7) |
| 9 | demo, scripts and tests-visual carves are authored, not built: scripts/lib door, demo containers and foundations, manifest.ts at 1,099 lines, 177 direct files in tests-visual | open (M-B15). The `scripts/lib` door may be moot once FD-9 and FD-11 empty it (§2.8) |
| 10 | Slot bound ruling: dock/__tests__ would hold 17 under R-3 | open (X-1); may spread by subject on flatQ (§2.7) |
| 11 | 16 private demo symbols need a surface decision | open (X-5) |
| 12 | G19: π not run because no browser seat connected; the dock CSS carve changed file boundaries at a stable order | open (X-11) |
| 13 | F-9: the critic's independent plant battery is still owed | open (X-12) |
| 14 | F-7 should also place within modules: LCA placement created one cycle (createCanvasLifecycle), caught by B4 | specified (FD-3a); not built |
| 15 | The R-7 verifier must normalize Vue scope ids, or every migration that edits an SFC fails the byte diff | narrowed: floor `cascade.mjs` already numbers `data-v-*` ids and v-bind hashes. Scoped keyframe suffixes remain (FD-6) |
| 16 | 5 failures not traced: 3 constellation tests (mock seam) and 2 aurora-harness tests | open |
| 17 | Not run: replay determinism, 'rerun proposes 0 moves', npm pack, verify:package | open (M-B16) |
| 18 | R-8: 2 unread src files and 4 scripts with no reader need a check of package.json script invocations before deletion | answered for the 4 scripts: F-1's `json-command` edges and a grep of `.github/workflows/` find 0 invocations (FD-11). The 2 `src` files are open (X-8; `useScrollScene` has a cross-zone reader, G §3) |
| 19 | B0 has 1 false positive from F-1 (the "src" literal in auroraImageSource) | open (§2.5, change 5) |
| 20 | G18: value.js starts with 127 violating edges (regex count, not F-1) | open (§2.8) |

---

## 3 · Spec D′: a rank table over today's dirs

Sources of record: D′ §0-§13. D′'s own convergence estimate is 55% standalone and about 70% as an enforcement arm (D′ §13), cited and not re-scored here. In this section, "anchor" keeps its R-2 meaning (§1.2). D′'s rank-9 "anchors" are called **aggregates** so the two words do not collide.

### 3.1 The unit set, declared once

**The rank table** (D′ §1, source of record). 11 rows, each exactly `[prefix, stratum, grain]`. No row carries prose, and there is no root row.

```
src/styles/                       foundation  self:foundation
src/fonts/                        foundation  self:foundation
src/html-attributes.d.ts          foundation  self:foundation
src/composables/                  primitives  child
src/composables/glass/webgl/      substrate   self
src/composables/glass/webgpu/     substrate   self
src/composables/glass/canvas2d/   substrate   self
src/composables/glass/procedural/ substrate   self
src/composables/motion/pointer/   substrate   self
src/components/_shared/           patterns    child
src/components/                   components  child
```

**Ranks:** foundation 0, primitives 1, substrate 2, patterns 3, components 4, aggregate 9, outside 10. The longest prefix wins. A `src` file under no row that is not an aggregate fails `unzoned`.

**Aggregates** are computed from the tree, never from a file's position:
- `src/index.ts`;
- every entry-map file that re-exports from a unit ranked above its own. It must be a pure door, and nothing in the library may import it;
- every CSS export entry, together with the import-only sheets it reaches inside foundation.

At HEAD there are 9 aggregates; the carved tree has 11.

**Units.** A component unit is a first-level dir under `src/components/` (grain `child`). Its sub-dirs are R-2 units inside it. `below` and `below-direction` judge them, and D′ mints none. The kernel is `KERNEL` from §1.2, which is the union of the foundation, primitives, substrate and patterns rows.

### 3.2 Placement law

- **P-D1 · Placement.** F-7 with FD-1 anchors, iterated by FD-2. This replaces D′'s own `placement: owned` function inside the carve (D′ gap 8). At HEAD the two disagree on the 8 files of X-7. Under this spec, those 8 stay where F-7 places them until X-7 is ruled.
- **P-D2 · Direction.** An edge from a lower rank to a higher one fails `upward`. Each stratum is acyclic over every ranked edge kind, CSS and type included (`cycle`).
- **P-D3 · Composition.** The composition class is derived (D′ §6). A component unit's read into another unit's non-door file fails `placement: reach`. An unread, unpublished unit fails `placement: dead`. Compositions of compositions are allowed while the components stratum stays a DAG.
- **P-D4 · Below the unit.** `below` moves a file into an existing, non-kind sub-dir when all its in-unit readers sit there. `below-direction` keeps a kind slot from reading upward within its unit. No dir is minted.
- **P-D5 · The amendment.** D′'s carve left its component with 5 files: `useTabRovingFocus`, `ModalOverlay`, `budget`, `drag.css` and `useDockHold`. None is anchored at HEAD under §1.2, so the amendment moves none of them back. `drag.css` is an X-7 file: F-7 reads it as `published`, with no load reader. `sheet/motion.ts` is anchored by the `./sheet` door. D′'s declaration split takes only the scrim half to `_shared/overlay/scrim.ts`, as a cycle cure; the file itself stays in `sheet/`.

### 3.3 Module naming law

D′ names only today's dirs and mints none. Two derived names are allowed:
- `curl-fbm.glsl.ts` and `curl-fbm.wgsl.ts` for the `flow.*` collision, taken from their one export `CURL_FBM_GLSL`/`_WGSL`;
- `useTokenColor.resolver.test.ts`, authored for a test-slot collision.

A table row that invents a dir (`toast/toaster/`) would put an authored name into the structure table, which is exactly what C24 bans (D′ §5). What D′ therefore cannot name is in §3.9.

### 3.4 Bounds (R-5)

- **The `bound` rule** runs under `--bounds`, over five zones. The spec runs it strict (X-1). D′ ran it exempt.
- **Measured** (D′ §11): HEAD 68 (11 dirs, 57 files) → final 66 (9 dirs, 57 files). Under strict, `dock/composables` (19), `aurora/composables` (17), `dock/__tests__` (21) and `aurora/__tests__` (19) are added.
- **Two violations the carve added:**
  - `scripts/` at 13 files, from `springProjection.ts` (X-8);
  - `FourierField.smoke.test.ts` at 505 lines, because D′'s re-point writer used a 100-column statement shape.

  The floor's F-2 keeps the author's spelling (FLOOR.md F-2), so the second is expected to disappear on the floor engine. Unmeasured.
- **SFCs over 500 lines** split by extracting sub-components into the unit root. The new files take component names, not dir names, so D′ can do this. A unit root pushed past 12 by the extraction then needs a sub-dir, which D′ cannot name (§3.9).

### 3.5 Gate contract

**Program and inputs.** `gate-dp.mjs` lands at `scripts/structure/gate-dp.mjs` with the table as a record (`scripts/structure/records/rank-table.json`). It reads F-1 (`lib/graph.mjs`) in place of D′'s scratch graph, which leaves one graph builder (D′ gap 9, registry gap 18). It reads F-7 plus FD-1 in place of D′'s `owned` computation.

**Fail-closed edges.**
- `unresolved` is F-1's violation list.
- `self-name` fails any `src` module edge that F-1 resolved through `self-name`. There are 0 in `src` at HEAD; font `url()` edges in `fonts.css` are consumer asset references, resolved and existence-checked.
- Ranked edges are every F-1 kind with a file target, CSS and type included.

**Rules.** The rule set is D′ §1's: `unresolved`, `self-name`, `unzoned`, `upward`, `cycle`, `door-impure`, `door-reads-door`, `table`, `placement` (`owned`, `dead`, `reach`, `dead barrel`), `below`, `below-direction`, `dual-door` (R-6), `bound` (R-5) and `test-home` (R-3). This spec adds:
- **`css-door-purity`** (D′ gap 10). A CSS file with an `@import` edge into `src/components/**` declares no style rule of its own; only `@import`, `@layer` order statements and comments are allowed. `fonts.css` has rules and no such edge, so it passes.
- **`anchor-by-growth`** (§1.2).
- **`bin-bin` and the scripts `upward`** (§3.8, C20).

**Freezing (F-9).** `test-home` and `placement` judge the result. The migration's placement and test maps are literal manifest passes, never produced by `runGate` or `testHomes` (D′ gap 8).

**The cascade.** CSS order is judged by floor `cascade.mjs verify` against a baseline named by SHA (FD-6). D′'s file classification stays as the manifest check `wave-diff`: every changed file must be move-only through the map, a resolution-preserving re-point, a `vi.mock` re-aim or a declared hunk. It caught the smuggled `button/styles.css` rule (D′ §7).

**Must catch:**
- D′ §3's battery: 39 caught, the 4 legal probes passing, 0 false positives;
- C20 (bin imports bin), now through §3.8;
- M-D2, the chip band-strength plant, through `cascade.mjs verify`;
- P01, the M02 regression;
- a rule added to `glass.css` (`css-door-purity`);
- `anchor-by-growth`;
- FD-4's and FD-5's plants;
- the critic's intent battery (X-12).

**Does not judge:**
- colocation below the unit where a new dir is needed (§3.9);
- computed reads, which stay census;
- paint.

**Born RED.** At HEAD the core reads 80, and 320 with `--bounds --tests` (D′ §9). The gate joins `gates.mjs` when GREEN (FD-10).

### 3.6 Migration steps, in order

After every step, `graph.mjs` exits 0 and the gate counts and the tree digest are recorded. Every move goes through F-2.

| step | action | source |
|---|---|---|
| M-D0 | Preconditions: R-1 collapse landed; FD-1..FD-11 built; a worktree; `rows/apply.mjs`. The base now contains M02 (D′'s F hunks) and M03. Row F-3 deletes `subpath-policy.mjs`, which addresses D′'s owed `search: "INTERNAL"` hunk and gap 7. Re-measure on this base; D′ ran from `5dd68ca9`, without the rows | §1.1 |
| M-D1 | Baselines: `cascade.mjs snapshot --sha <base>`; `surface.mjs check`; `anchors` frozen | §1.2 |
| M-D2 | The F-7 fixpoint (FD-2): §1.2's 23 rows plus their followers. This replaces D′'s 26 owner returns | P-D1 |
| M-D3 | The direction moves F-7 does not make: `_shared/selection.ts` and `_shared/interaction.ts` → `composables/motion/morph/` (a primitive read them). The kernel sub-dirs for `ModalOverlay` (`_shared/overlay/`) and `budget` (`composables/glass/webgl/`), which F-7 sends to the global zone, are authored rows (X-9) | D′ §4 |
| M-D4 | `below`: the fourier-field shaders move to `fourier-field/renderer/` (these are also among the 23) | D′ §4 |
| M-D5 | The dead barrel `src/components/index.ts` is deleted. Two declaration splits: `color/index.ts` → `color/color.ts`, and the scrim half of `sheet/motion.ts` → `_shared/overlay/scrim.ts` | D′ §4 |
| M-D6 | The hunks: D′'s H 11 (including H5, literal shader imports, which cures the opaque path at `webgpu-everywhere.spec.ts:178`) and P 4 (3 barrel trims, 1 readerless barrel deleted). The F hunks are the base's M02 row and the R-6 trims (M-D7) | D′ §4 |
| M-D7 | R-6: 59 names dropped from second doors, each a MIGRATION row (X-6) | D′ §4 |
| M-D8 | `.bundle-ratchet` rebound to the new unpacked size, as a declared hunk. It was 2,910,608 on D′'s tree; re-measure | D′ §4 omission 2 |
| M-D9 | R-10: 79 deep demo paths rerouted to entries; the 11 unpublished reads each get a disposition (X-5); X-2 | D′ §11 |
| M-D10 | R-3: FD-7's harness, then the tests move (171 into 74 slots) with hunks T1-T3. T4 and T5 wait on X-4, and X-3 must be answered. A rerun proposes 0 moves | D′ §8 |
| M-D11 | The bounds report: every remaining violation listed as an R-5 counterexample with no nameable module (§3.9) | R-5 |
| M-D12 | Verify against REGISTRY §6.4, plus: `cascade.mjs verify` GREEN on the 4 entries; `wave-diff` 0 undeclared; a replay byte-identical; π on any band whose cascade changed (D′'s carve changed none); Playwright executed | §1.6 |

### 3.7 Tests and stories under R-3

- **The home rule** (D′ §8), one function shared by `test-home` and the move tool:
  1. A test's subject files are the files that declare the names it imports (a door is never a subject), plus its literal, url, CSS and glob targets.
  2. The subject unit is the highest-ranked unit among them. A tie between component units goes to the one that reaches the others.
  3. The home is the deepest dir inside that unit that holds every subject file, lifted out of kind slots. The slot is `<dir>/__tests__/`, and visual specs become `*.visual.ts`.
  4. A test that reads a door whole, walks directories, or has more than one subject unit stays in the top-level harness.
- **Measured:** 171 tests move into 74 slots, and a rerun proposes 0 moves. The harness keeps 82 unit tests and 163 visual specs. Collection is unchanged: 239 vitest files, and 1,989 Playwright tests in 167 files.
- **Visual specs** home by route. At most 9 of 167 resolve to one unit. `tests-visual/` stays a flat harness of 170 files, over the bound, with no name D′ can mint.
- **Stories** are not placed by D′. The manifest declares them (R-10).

### 3.8 `scripts/`, the backend analogue (specified, not built)

- **A second table over `scripts/`.** Stratum `lib` (rank 0) covers `scripts/lib/` and `scripts/structure/lib/`. Stratum `bin` (rank 1) covers the rest of `scripts/`.
- **What a bin is.** A bin is a `scripts` file that no other `scripts` file imports, read from F-1: it is a `json-command` target of `package.json`, or it has no importer in its zone. This avoids a shebang or text regex (S-15).
- **Rules.**
  - `upward`: a `lib` file that imports a bin fails.
  - `bin-bin`: an import edge between two bins fails. This is C20.
  - `bound` covers `scripts/`, which after FD-11 holds 7 direct files (§2.8).
- **Placement.** FD-9 moves `paint-arm.mjs` and `reflect-capture-verify.mjs` to `tests-visual`. X-8 decides `springProjection.ts`: D′ placed it at `scripts/` root, which reached 13 files. On the post-FD-11 tree that is 8, but R-8 still places it by its readers.
- **Sibling backends.** The same pair of rules applies to layered servers, with their strata taken from their dirs (value.js: `modules/*` over `platform/*`). Not measured.

### 3.9 Where D′ does not satisfy a ruling or the edict

| ruling | exactly where |
|---|---|
| the edict's recursion clause ("colocated with their sub-components ... recursively") | 7 sub-components in 6 units need new dirs, and so names (11 files after the carve): `card/CardHeader` ⇐ `scroll.css`; `carousel/CarouselContent` ⇐ `projection.ts`; `dock/DockBackgroundToggle` ⇐ `DockControl.vue`; `dock/DockLayerGroup` ⇐ `DockCrossfade.vue`; `easing/EasingPicker` ⇐ `usePicker.ts`, `useClipboard.ts`; `select/SelectContent` ⇐ `SelectScrollButton.vue`; `toast/Toaster` ⇐ `ToastClose`, `ToastDescription`, `ToastTitle`, `use-toast.ts` (D′ §5). D′ judges whatever dirs exist; it cannot create them |
| R-5, strict | the modules a split needs cannot be named: `src/styles/glass/` 24, `src/styles/tokens/` 20, `aurora/constants/shaders/` 16 (both backends still in one dir), `tests-visual/` 170; under strict also `dock/composables` 19, `aurora/composables` 17, `dock/__tests__` 21, `aurora/__tests__` 19. R-5 requires each to be reported as a counterexample before formation, and these are the counterexamples |
| R-3 | T4 and T5 are exclusion globs (X-4) |
| R-2 (amended) | satisfiable only through F-7 and FD-1. D′'s own placement function differs on the 8 files of X-7 |
| R-8 | `springProjection.ts` at `scripts/` root (X-8) |
| R-10 | 90 bypasses against the ruling's 7 (X-5) |

### 3.10 D′'s open gaps, carried verbatim

Each gap is quoted from the D-prime research seat return. The source of record is D′ §13.

| # | gap (verbatim) | status |
|---|---|---|
| 1 | Colocation below the unit: 7 sub-components in 6 units (11 files) need new, named dirs; D-prime has no naming rule and must compose with a placement route (G's eponymy is the candidate) | open (§3.9). The D′ + G pairing is not earned (REGISTRY §6.5) |
| 2 | Bounds: 66 violations need modules D-prime cannot name (styles/glass 24, styles/tokens 20, aurora/constants/shaders 16, tests-visual 170); the kind-slot exemption hides dock/composables at 19 and aurora/composables at 17 | open (§3.9, X-1) |
| 3 | F-1 lacks a root edge kind: resolve(import.meta.dirname\|__dirname, '<rel>') is invisible to the move engine and the arm (1 file, 2 vitest failures) | answered for the floor: F-1 resolves the form as an anchored path-literal (measured, §6). This was D′'s scratch graph. The FD-4 plant confirms how the engine handles relocation |
| 4 | @source arrivals: test slots enter the demo Tailwind scan (+4.60 kB demo CSS); needs a two-way glob residue check and a ruling for __tests__ under @source | answered for the floor mechanism: F-1 expands `@source` per file (412 edges from `demo.css`, measured) and the image check refuses gained glob members (FR §2.2). The FD-5 plant is owed; the `__tests__` ruling remains (X-3) |
| 5 | tsconfig exclusion hunks T4/T5 conflict with R-3's 'no exclusion list'; needs a ruling or a program design | open (X-4) |
| 6 | The carve owes 3 hunks: delete search INTERNAL in subpath-policy.mjs, rebind .bundle-ratchet to 2,910,608, place springProjection.ts inside a scripts/ module (scripts/ at 13 files) | hunk 1 is addressed by row F-3 on the floor base (M-D0; re-measure); hunk 2 open (M-D8); hunk 3 open (X-8) |
| 7 | subpath-policy COMPONENT_CLASS/COMPOSABLE_CLASS is a second per-dir declaration next to the rank table (registry gap 17) | addressed by row F-3: the entry record carries no per-dir class, and `subpath-policy.mjs` is deleted. Re-measure on the floor base |
| 8 | F-9: the carve's P block and tests-place call runGate/testHomes, so the aggregator-reader, dead-barrel and test-home zeros come from the gate's own functions; freeze them as literal manifest rows | specified (FD-2, §3.5 freezing); not built |
| 9 | The gate is wired to nothing (still in scratch; needs a tracked home, npm test or CI wiring, and one graph builder) | specified (FD-10, §3.5); not built |
| 10 | CSS door purity is not gated (a rule added to glass.css passes) | specified (`css-door-purity`); not built |
| 11 | No backend arm (C20 missed) | specified (§3.8); not built |
| 12 | R-3 scanner rewrites: 8 suites plus easing.contract (uncollected) must read the graph instead of walking src/; 38 directory-walking unit tests are in this class | open (FD-7) |
| 13 | R-1 register collapse and R-6 MIGRATION rows (59 names; value.js BLOB_CONFIG_KEY) are follow-through | R-1 is a precondition (M-D0); R-6 open (X-6) |
| 14 | R-10: 90 demo door bypasses at HEAD vs the ruling's count of 7; the definitions need reconciling | open (X-5) |
| 15 | Name residues: slider/useDockHold.ts still says Dock; curl-fbm.* names are derived from the export on a collision | open. §1.2's reading agrees with D′ that `useDockHold.ts` goes to slider (X-10) |
| 16 | Runtime: Playwright only listed, not executed; demo CSS delta unverified in paint | open (X-11) |

## 4 · Spec G: eponymous closures

Sources of record: G §0-§14. G's own convergence estimate is 30% standalone, or 40% as the rule below declared units (G §13), cited and not re-scored here. G has no prototype and no critique. REGISTRY §6.4 builds G only once §5's counterexamples 1-4 are answered:
- CE1 is answered.
- CE4 is answered for registrars.
- CE3 is answered in glass-ui, with 3 NEEDS-NAME rows.
- CE2 was conceded. The amendment now covers its compound-family half (§4.2). Its peer-set half is reported here as R-5 counterexamples (§4.9).

### 4.1 The unit set

- **Entry sets per zone** (G §1): `src` 67 (the 63 JS entries, 3 CSS entries and `html-attributes.d.ts`), `demo` 99, `tests` 252, `tests-visual` 171, `scripts` 13.
- **Roots:** every SFC, every entry, and every file that is the immediate dominator of 2 or more files (`rootMin` 2).
- **Declared units from R-2:** every `UNIT` with a door (§1.2) anchors its published files. This is G's one declared layer, and at HEAD it covers the five compound families (§4.2).
- **Wiring files** have 3 or more registration edges (G §8) and do not dominate. There are 0 in glass-ui's `src` and `demo`.
- **Shared:** a file whose dominator chain reaches ⊤ without meeting a root is placed by F-7 (§4.2, P-G4).

**The edge arm.** G's RVT, rebuilt on F-1:
- reads resolve by symbol through re-exports (`makeOrigins`);
- only F-7's load kinds count: module edges, CSS imports, SFC block `src`, `url()`, `new URL` and globs. A Tailwind `@source` scan, a path string and a write are not loads;
- a pure non-entry barrel is transparent;
- **door edges under the amendment:**
  - an edge from a unit door to a file in `anchors` for that door is strong, and it fixes the file's unit;
  - an edge from a kernel door is weak (it keeps only an edge to a file with no other reachable reader, as in G's RVT);
  - an edge from one door to another stays unresolved;
- registration edges are weak.

### 4.2 Placement law

- **P-G1 · Owner.** `owner(f)` is the nearest root ancestor of `f` in the dominator tree, computed with Cooper-Harvey-Kennedy from a super-root ⊤ over the zone's entry set.
- **P-G2 · Home.** `home(f)` is the G dir of `owner(f)`:
  - an `index.*` entry names its own dir;
  - any other entry stays where it is, and holds its closure in a sibling dir named for it;
  - a non-entry root with a closure heads a dir `rootName(root)`, nested in its owner's dir, and collapsed into the owner's dir when the two names are equal.
- **P-G3 · Anchored.** An anchored file stays inside its door's unit `U`. If `owner(f)` lies inside `U`, P-G2 applies; otherwise the file sits at `U`'s root.
- **P-G4 · Shared.** A file with owner ⊤ is placed by F-7 with FD-1, and within kernel modules by FD-3a (R-4). G keeps the authored kernel and demo-chassis dirs, and moves a file out of one only when F-7 does.

  This departs from G §3, which dissolved 19 shared-zone dirs in `src` and 17 in `demo` with nothing in their place. That was A's failure mode: the depth half destroyed authored modules (REGISTRY §2 D1-A).
- **P-G5 · CSS.** A sheet whose only loaders are CSS aggregators is not moved by dominance. At HEAD that is 44 of 54 component sheets (CE6). Under FD-3c, F-7 classifies them `ok` where they are. They wait for the R-7 channel collapse, after which their SFC or their unit door loads them and P-G1 places them.

**What the amendment changes in G** (this seat, §6):

| G finding | before the amendment (G) | under §1.2 |
|---|---|---|
| compound families (accordion, alert, avatar, skeleton, table) | flattened into `src/`, 12 files (CE2) | 19 of 19 SFCs anchored in their unit: accordion 4, alert 3, avatar 3, skeleton 1, table 8. Nothing is flattened. `alert/index.ts` does re-export its three SFCs, although G §2 describes it as holding "only a variant recipe" |
| the R-2 hazard: component parts moved into another unit | 14 (G §7) | 12 anchored and staying: `Dialog`, `DialogContent`, the 7 `Table*`, `Skeleton`, `Surface`, `DropdownMenuTrigger`. 2 move: `useDockHold.ts` → slider, `isTeleportedTarget.ts` → dock. This is exactly the split G §7 predicted for its unrun eponymy pin |
| the `src` G dir | 14 files | expected 2, since the 12 flattened files return to their units. Not re-measured |
| the `data-table` G dir | 14 files | expected 6, since `Table*` and `Skeleton` stay home. Not re-measured |
| menu | 14 SFCs, peers under the door | 14 of 14 anchored in `menu/`. The 3 sub-features are still 0 of 3 for G |

### 4.3 Naming law

- **N-G1 · `rootName(f)`.** Take the basename. Strip the extension chain: the language extension (`.vue`, `.ts`, `.mjs`, `.css`) and the module-kind suffixes `.frag`, `.vert`, `.glsl`, `.wgsl`. Drop a leading `use` before an uppercase letter. Read `index` as its dir's name. Write the result in kebab case.
- **N-G2 · Matching.** Case- and hyphen-insensitive, so `HandMark.vue` matches `handmark/`. Two forms are eponymous:
  - strict: the root sits inside its dir;
  - sibling: `foo.ext` sits beside `foo/`, the Rust 2018 form. 10 roots take this form at HEAD (G §2 CE3).
- **N-G3 · New dirs.** 40 roots need a new dir (G §2 CE3). The law names each one with no authoring: for example `sortable-list/sortable/` with `drag/` nested, `dock/dock-search/`, and `aurora/runtime/gl-setup/` and `wgpu-setup/`.
- **N-G4 · NEEDS-NAME rows.** These are authored in the manifest's `names` block:
  - (a) Five dirs repeat an ancestor segment once a suffix is stripped: `aurora/runtime/gl-setup/aurora`, `aurora/runtime/wgpu-setup/aurora`, `typewriter/typewriter-text/typewriter`, `command/command-dialog/command`, `demo/main/demo`. Chain compression, which G proposed, has not been run.
  - (b) Three roots head an authored dir under another name: `useDockSearch.ts` heads `search/`, `SheetContent.vue` heads `detents/`, `AuroraConfigDock.vue` heads `aurora/config/`. Each is either renamed through F-2 (the exported symbol does not change) or yields its authored dir name.
  - (c) Placement collisions.

### 4.4 Bounds (R-5)

- **Dirs.** G nests along dominance. A dir still over 12 after nesting is a peer set, a shared set or a declared-entry set (G §2 CE2). G does not split it; §4.9 lists them. Test dirs over the bound dissolve under R-3 (§4.7).
- **Lines.** G has no line rule of its own, so it enforces R-5's 500 through the split method. An SFC over 500 lines is split by extracting sub-components and composables. An extracted sub-component with a private closure is a root, and P-G1 nests it under its own name. This is the one place where G mints a module name with no authoring. At HEAD `bounds.mjs` lists 17 `src` files over 500 lines (FR §4.4). G authors its own split per file; the B §7.3 plan belongs to B.
- **The gate** runs strict over five zones (X-1).

### 4.5 Gate contract

**Program and inputs.** `eponymy.mjs`, not written, lands at `scripts/structure/`. It reads F-1, `makeOrigins` and `placeAll` with FD-1. Dominators are computed over F-1's load edges, and each verdict is on the resolved file.

**Clauses:**

| clause | rule |
|---|---|
| G0 | F-1 violations |
| G1 | every file that is neither anchored nor shared sits at `home(f)` (P-G1, P-G2) |
| G2 | every code dir in `src` and `demo` that is not a container, a zone root, a kind slot or an authored kernel dir kept by P-G4 holds an eponymous root, strict or sibling (N-G2), or is a unit whose door names it |
| G3 | every anchored file sits inside its door's unit (P-G3). `anchor-by-growth` (§1.2) |
| G4 | shared files follow F-7 with FD-1, and FD-3a inside kernel modules |
| G5 | R-5, strict, five zones. The peer-set counterexamples (§4.9) keep G5 RED until they are ruled or given an authored name; no record exempts them |

**Must catch.** G has no battery yet. These plants are specified:
1. a private helper moved into another unit's dir → G1;
2. a second importer from another unit added to a private file, which lifts its dominator → G1 at the file's old dir. This is the only way G sees a deep reach;
3. a dir that no root names (`dock/misc/` with two files) → G2;
4. a root renamed so that its dir no longer matches → G2;
5. a door-published SFC moved into its consumer's dir → G3;
6. a name added to a door so that a cross-unit file becomes anchored → G3 `anchor-by-growth`;
7. a registrar with 3 registration edges planted in `demo`: its targets stay where they were authored;
8. positive checks on the result: aurora's WebGL closure (12 of 12) and WebGPU closure (6 of 6) in separate named dirs; the sortable drag engine named; the `sheet-content` dir holding what `detents/` held (G §2, §3);
9. the floor's 59 F-1 plants, and FD-4's and FD-5's plants;
10. the critic's intent battery (X-12).

**Does not judge:**
- an import that goes past a door into an anchored file. G has no privacy clause, because the form of an import is not a fact G reads;
- cycles between units, since G has no direction clause;
- CSS held only by aggregators (P-G5);
- computed reads;
- paint.

**Born RED** at HEAD; it joins `gates.mjs` when GREEN (FD-10).

### 4.6 Migration steps, in order

After every step, `graph.mjs` exits 0 and the clause counts and the tree digest are recorded. Every move goes through F-2.

| step | action | source |
|---|---|---|
| M-G0 | Preconditions: R-1 collapse landed; FD-1..FD-11 built; a worktree; `rows/apply.mjs` | §1 |
| M-G1 | Port G's instrument onto F-1 and `makeOrigins` (G gap 1). Before any move, reproduce G §3 on F-1: the dir verdicts (66 kept, 8 renamed, 42 dissolved, 31 new in `src`) and the 15-row score. List every difference | G §3 |
| M-G2 | Freeze `anchors`. Compute dominators per zone with §4.1's edge arm, then the root set, then the wiring files | §4.1 |
| M-G3 | The proposal: `home(f)` for every file, and a `names` row for each NEEDS-NAME (N-G4), written as a literal manifest | §4.2, §4.3 |
| M-G4 | The F-7 fixpoint for shared files (FD-2). It runs over §1.2's 23 rows, less the kernel files that P-G1 gives to a root inside a unit (`useFuzzySearch` → `dock-search/`, for example) | P-G4 |
| M-G5 | Apply M-G3 through F-2, parent dirs first, one pass per nesting level | FLOOR.md F-2 |
| M-G6 | The R-5 extraction splits, as authored hunks. Then M-G2..M-G5 run again until nothing is proposed | §4.4 |
| M-G7 | R-10: the demo reroute; X-2; X-5 | §1.4 |
| M-G8 | R-3: FD-7's harness, then tests by the subject law (§4.7). X-3 and X-4 must be answered | §4.7 |
| M-G9 | The R-7 channel collapse (CE6). It is not needed for G1 to go GREEN, but it is needed before G places any sheet | P-G5 |
| M-G10 | Verify against REGISTRY §6.4. Plus: the churn replay on F-1, with each commit's own entry map, under the amended arm (G CE5 measured 14.5% of commits in RVT, with 10 flip-flops); §5's six counterexamples re-measured on the result; π on any band whose CSS moved; Playwright | §1.6 |

### 4.7 Tests and stories under R-3

- **The subject law** (G §10). A test's subject is the named dominator (in `src`, RVT) of everything the test and its private test-zone closure import from `src`. Placement:

  | case | tests at HEAD | where it goes |
  |---|---:|---|
  | subject at a door | 84 | `<unit>/__tests__/` |
  | subject at a nested root | 38 | `<root dir>/__tests__/` (depth 1 below the unit: 25; deeper: 3) |
  | several units | 40 | the harness |
  | no import subject | 61 | the harness |
  | subject files in one unit dir with no nested root | 29 | `<unit>/__tests__/`: the unit is R-2's component dir, and under §1.2 its door serves as the subject root. Specified here; unmeasured |

- **17 single-subject tests read `src` by path literal.** They move to the harness reader (FD-7).
- **Visual specs.** 9 move beside their subject as `*.visual.ts`. 158 stay in the harness, a flat set of peers (§4.9).
- **Stories** are declared by the manifest (R-10): 18 have one subject, 62 several, and 10 import nothing from `src`. G does not place them.

### 4.8 `scripts/`, the backend analogue

- **`scripts/` in glass-ui.** Every CLI is an entry, so G gives the zone no structure (G gap 9). A CLI dominates only its private helpers. Files in `scripts/lib/` shared by several CLIs are shared, and F-7 places them. FD-9 and FD-11 apply as in §2.8. The floor, landed at `scripts/structure/`, has its CLIs as entries and its `lib/` as that module's shared set.
- **Layered backends** (value.js `api/`, speedtest `server/`, read only). The registrar rule (k ≥ 3) turns registered-only targets into declared units at their authored places:
  - value.js: `modules/admin/routes` 9, `modules/palette/routes` 6, `modules/color/routes` 3;
  - speedtest: `routes/admin` 7, `routes/dashboard` 5, `routes` 6.
  
  Module identity there lives in the dir: 0 of value.js's 5 module dirs holds an eponymous root. DI containers (`inject-services.ts`, `wire-services.ts`) are not placed by any structural rule (G gap 4).

### 4.9 Where G does not satisfy a ruling or the edict

| ruling | exactly where |
|---|---|
| R-5 and the edict's "long running dirs must and always be broken into common modules" | G does not split peer sets. The counterexamples it reports before formation, with G's pre-amendment counts: `tests-visual` 171 (entries with no import subject); `src/styles/glass` 29 (28 registers, all leaves under `glass.css`); `src/styles/tokens` 21 (peers under `tokens.css`); `menu` 14 (13 SFC peers under the door); `aurora` 13 (the door, `Aurora.vue`, 10 non-runtime leaves and `useScrollProgress.ts`); `demo/stories/foundations` 13 and `demo/stories/containers` 13 (the category is part of the manifest glob key `./*/*.vue`). The test dirs dissolve under R-3 |
| the edict, for backend files | layered modules have no eponymous root, and DI containers leave no import edge. Both need a declared fact (G gap 4) |
| R-2 (amended) | satisfied only by changing G's door arm (§4.1). Every G number predates that change, and M-G1 re-measures them |
| R-3 | the 29 one-dir-no-root tests are placed by the unit door, which is specified and unmeasured |
| R-10 | X-2, X-5 |
| R-4 | satisfied by P-G4, which keeps `src/composables/` and the authored kernel dirs |

### 4.10 G's open gaps, carried verbatim

Each gap is quoted from G §14, the source of record; list formatting inside an item is flattened.

1. "The graph is a scratch builder, not F-1. `@source` is recorded but not resolved. Path-literal detection is a regex over string literals. CSS emission is a text-token heuristic: 11 aggregator-held sheets have no unique-class emitter."
   Status: open (M-G1).
2. "The churn entry map is A's approximation, not each commit's own `libraryEntryMap`."
   Status: open (M-G10).
3. "Four variants are proposed but not run: **eponymy pin**: a published file eponymous to its door's dir stays (§7; 12 of 14 expected kept); **chain compression**: a root whose whole closure is one root collapses (§2 CE4: `demo/main/app/app-shell`, and 5 src levels); **affix and hyphen-insensitive naming**: 35 affix-only dirs, `handmark`; **a churn stabiliser**: `rootMin` hysteresis, or a dir name chain not built from every ancestor root."
   Status:
   - eponymy pin: subsumed by the amended R-2, and measured here: the anchors keep exactly those 12 (§4.2);
   - chain compression: open (N-G4a);
   - hyphen-insensitive naming: specified (N-G2), unmeasured;
   - churn stabiliser: open.
4. "DI containers (value.js `inject-services.ts`, speedtest `wire-services.ts`) are not placed by any structural rule found. They need a declared fact."
   Status: open (§4.9).
5. "The shared zone's internal grouping (the 19 src dirs under `composables/` and `_shared/`) is outside G. Something else must declare it, or it keeps its authored names unverified."
   Status: specified by P-G4, which keeps the authored dirs and places files in them with F-7. The grouping itself is still unverified by G.
6. "Compound families with no subpath door (accordion, alert, avatar, skeleton, table) need a declared unit. Menu needs one for its sub-features."
   Status: the compound families are closed by the amended R-2. Their record doors anchor 19 of 19 SFCs (measured, §6). Menu's sub-features are open (§4.9).
7. "Q7's 29 one-dir-no-root tests: R-3's unit and G's roots disagree there. Unmeasured beyond the count."
   Status: specified (§4.7), unmeasured.
8. "R-9 conflicts with R-2 plus F-7 (`Skeleton.vue` → data-table). This is a driver-ruling question."
   Status: closed by the amendment. `Skeleton.vue` is anchored by `skeleton/index.ts` (measured, §6).
9. "glass-ui's own `scripts/` zone: all 13 files are entries, so G gives it no structure."
   Status: open (§4.8).
10. "Not done: prototype, migration, toolchain (build, vue-tsc, tests), π, Playwright, and an independent critic battery (F-9). REGISTRY §6.4 bars the prototype until CE1-4 are answered. CE2 and part of CE3 are conceded, so the prototype would have to run as the below-unit rule under a declared layer."
    Status: open. CE2's compound families are now answered by §1.2, and the prototype runs as §4.6 specifies, with the peer sets reported (§4.9).


---

## 5 · The floor seat's open gaps, carried verbatim

Each gap is quoted from the floor seat's return. The source of record is FR §5.

| # | gap (verbatim) | status |
|---|---|---|
| 1 | scripts/import-dag.mjs still builds its own graph (628 lines, over the 500 bound). Rebasing it onto lib/graph.mjs is not built; its path-derived module labels cause most of the declared scan deltas | closes by deletion under R-8: 0 readers except the ledger rows that describe it, 0 invocations (FD-11) |
| 2 | 453 computed reads are census, not verdicts. Single-segment names in literal lists over a scanned dir are not resolved against the scanner's base, and paths assembled from pieces none of which names a location are unseen | open. B0 judges the 334 in `tests`, `tests-visual` and `scripts` (B §2 G7); FD-7 moves the scanners onto the harness reader |
| 3 | A scanner's sensitivity is declared, not derived. Scan-delta declarations are human-reviewed, and `all: true` is coarse | open. FD-7 reduces the number of scanners |
| 4 | 24 of the 59 plants are this seat's own, so not an independent battery (F-9). Each route's critic writes its own | open (X-12) |
| 5 | Not built: F-5 (entry-rooted declarations), F-6 beyond the scan-delta bridge, F-10 (pi/Playwright per band). No browser seat ran, so no reorder was paint-checked and the cascade proofs are structural | open (FD-8, FD-7, X-11) |
| 6 | The records and the readers the rows install live under docs/.../floor/ and move to scripts/ at landing (a route decision). The floor is untracked, so routes copy it into their worktrees until it is committed | the floor has been tracked since `ed188a86` (30 files), so a worktree from HEAD carries it and the copy step is gone. Landing: FD-10 |
| 7 | R-2 as written moves 6 published component roots into other components. This needs a ruling (for example, a unit-root/eponymous law, which F-7 can take as a parameter) | closed by the amendment (`20911dce`); all 6 are anchored (measured, §6) |
| 8 | 5 NEEDS-NAME collisions (4 types.ts files onto src/composables/types.ts; flow.glsl.ts target exists) need authored names (S-7) | narrowed to 1: the four `types.ts` files are each anchored by their own door, and `flow.glsl.ts` remains (measured, §6) |
| 9 | springProjection.ts disposition (R-8: unread in src, demo edge past a door per R-10) needs a ruling | open (X-8) |
| 10 | The dialog<->sheet value SCC (import-dag M03) survives the floor rows. B's 4th inversion (ModalOverlay behind overlay/modal/) is not a floor row | open. Under §1.2, F-7 proposes `ModalOverlay.vue` → `_shared/` (global; readers dialog and sheet). D′ built the move to `_shared/overlay/` with the scrim split and read 0 cycles (D′ §6, §12) |
| 11 | R-5 bounds are measured, not enforced; HEAD is over them (18 dirs, 57 files) | enforced by each route's gate (§2.4, §3.4, §4.4); X-1 |
| 12 | 2 dead vitest.config.ts includes are cure candidates; 3 tsconfig.build.json excludes wait on R-3 | open. The excludes wait on FD-8 |
| 13 | The floor's tool files were copied into the checkout with rsync plus a sha256 manifest (30 files identical) rather than written with the Write tool. The report itself was written with Write/Edit | a provenance note. No action; the floor is committed (`ed188a86`) |

---

## 6 · What this seat measured

All measurements are read-only, over the main checkout at `20911dce`, through the floor's own library. Scripts are in `scratchpad/D1/p2/synth/`.

| id | measurement | result | how |
|---|---|---|---|
| m1 | code identity | `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines; `src demo scripts tests tests-visual package.json` are clean | git |
| m2 | F-7 at HEAD, literal | 545 `src` files: ok 309, published 181, move 39, global 14, unread 2 (reproduces FR §4.1) | `anchor.mjs` |
| m3 | F-7 with the unit-root anchor | 55 unit doors anchor 226 files (by class: 119 published, 76 ok, 19 move, 11 global, 1 not a row). Of the 53 move/global rows, 30 are anchored (19 move, 11 global) and 23 remain (20 move, 3 global). NEEDS-NAME 1 (`flow.glsl.ts`) | `anchor-noslot.mjs`, `anchor-fam.mjs`, `scripts-readers.mjs` |
| m4 | B's api arm, reproduced | 31 anchored, 22 remain; the one extra is `dock/composables/useDockHold.ts` | `anchor.mjs` |
| m5 | "publishes", read literally | unit-root reading: 30 of 30 anchored files are published by some entry. B's arm: the 31st, `useDockHold.ts`, is published by none. `useDockHold` appears 0 times in `surface-pin.json`; `dock/index.ts` does not re-export it and `dock/composables/index.ts:12` does | `anchor-pub.mjs`; grep |
| m6 | compound families | 19 of 19 SFCs anchored: accordion 4, alert 3, avatar 3, skeleton 1, table 8. Menu 14 of 14. Their names are published (`TableBody`, `Skeleton`, `AccordionItem`, `AvatarImage`, `AlertTitle`, each found in the pin) | `anchor-fam.mjs`; grep |
| m7 | non-index unit entries | `blob/config.ts` and `fourier-field/math.ts` anchor 0 of the 53 | `anchor-entries.mjs` |
| m8 | F-7 against D′'s placement (X-7) | `useAccentTone.ts` ok (readers chip, `composables/color`); `accent-tone-solve.ts` ok; `styles/glass/{dissolve,glass-atom,glass-chip,squircle,surface-axis}.css` ok (reader unit `src`); `tabs/styles/drag.css` published with no load reader; `chip/accent-tone.css` ok (reader unit `src`) | `rows.mjs` |
| m9 | `proposedPath` in the kernel (FD-3b) | `createCanvasLifecycle.ts` → `src/composables/glass/composables/`; `useElementMorph.ts` → `src/composables/motion/composables/` | `anchor.mjs` |
| m10 | `scripts/` readers (FD-11) | `scripts/` has 12 direct files and `scripts/lib/` 5. `import-dag.mjs` is read only by `opaque-ledger.json:6,13`, `canon-doc.mjs` only by `opaque-ledger.json:20`; `safari-probe.mjs` and `regen-exports.mjs` have 0 readers; `paint-arm.mjs` has 8 import readers; `minify-css.d.mts` 0. No mention of the four in `.github/workflows/` or `package.json` | `scripts-readers.mjs`, `jr.mjs`; grep |
| m11 | root anchors and `@source` in F-1 (FD-4, FD-5) | `material-css-syntax.test.ts`: `resolve(import.meta.dirname, "../..")` → `.` and `resolve(ROOT, "src/styles/glass/material.css")` → that file, both anchored path-literals. `demo/demo.css`: 412 `css-source` edges, file by file, 23 into `src/components/_shared/` | `fd45.mjs` |
| m12 | cascade normalisation (FD-6) | `cascade.mjs:64-65` renames `data-v-<8hex>` and `--<8hex>-` only | code read |
| m13 | dirname forms outside `src` | 10 files (FD-4 list) | grep |
| m14 | the floor is tracked | 30 files at `ed188a86` | git |

---

## 7 · Where this document and the checkout's `SPECS-v2.md` differ

The checkout's `SPECS-v2.md` is the other synthesis seat's document. This comparison covers the parts of it this seat read: §0, §1.1, FD-1..FD-5, §2.9, §3.9, §4.9, and every line that names `useDockHold`.

| topic | the checkout's document | this document | measurement |
|---|---|---|---|
| which door anchors (X-10) | anchors through any declared non-kernel door, slot doors included: 31 anchored, 22 remain. It says `useDockHold.ts` stays in dock "because dock's door re-exports it" | unit-root doors only: 30 anchored, 23 remain; `useDockHold.ts` → slider | `dock/index.ts` does not re-export `useDockHold`; only the slot barrel `dock/composables/index.ts:12` does. No entry publishes it: 0 occurrences in `surface-pin.json`. The unit-root reading anchors 30 of 30 published files (m5) |
| `Skeleton.vue` under each reading | says the any-declared-door reading is "the only one under which `Skeleton.vue` stays in `skeleton/`" | both readings anchor it: `skeleton/index.ts` is a unit-root record door | m3, m6 |
| D′'s move-only diff classifier | promoted to a floor delta (its FD-5) | kept as D′'s `wave-diff` manifest check, because cross-route adoption is not earned (REGISTRY §6.5) | not a measurement; a placement choice for the driver |
| D′'s holes 1 and 2 | F-1 already sees both forms | the same, measured independently (m11) | agree |
| scoped keyframes | 6 names, 12 occurrences in `dist/glass-ui.css` | cites B's 12 | agree |
| B and R-2's decoupling | B cannot keep a kernel entry publishing a file placement moved into a unit (+36/−25) | the same, added here after reading it and checked against B §5.2, §10.4 and the seal clauses | agree |

---

## Appendix · reproduce

```sh
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/synth
node $S/anchor.mjs            # m2, m4, m9: F-7 literal; B's api arm (slot doors included)
node $S/anchor-noslot.mjs     # m3: the unit-root anchor
node $S/anchor-fam.mjs        # m3, m6: anchored files by class; compound families
node $S/anchor-entries.mjs    # m7: non-index unit entries
node $S/anchor-pub.mjs        # m5: anchored files published by an entry
node $S/rows.mjs              # m8: the X-7 rows
node $S/scripts-readers.mjs   # m3 NEEDS-NAME; m10 script readers
node $S/jr.mjs                # m10: the ledger-only readers
node $S/fd45.mjs              # m11: root anchors and @source expansion
grep -c '"useDockHold"' docs/tranches/BL/design/structure/floor/records/surface-pin.json   # m5: 0
grep -rn "import-dag\|canon-doc\|safari-probe\|regen-exports" .github package.json         # m10: none
```
